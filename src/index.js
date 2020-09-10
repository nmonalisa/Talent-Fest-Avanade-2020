//const fs = require('fs')
//Manipulação do dom
const video = document.querySelector("#video");
const canvas = document.querySelector("#canvas");
const snap = document.querySelector("#snap");

//Renderizar imagem da webcam no navegador
async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    handleSuccess(stream);
  } catch (error) {
    console.log(error);
  }
}

// Função para sucesso
const handleSuccess = (stream) => {
  window.stream = stream;
  video.srcObject = stream;
};

// Função para desenhar imagem na tela
const toDrawCapturedSnap = () => {
  var context = canvas.getContext("2d");
  //desenhar canvas (x,y,width, height)
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  //Transformar canva em imagem jpeg com qualidade 0.7
  const dataURI = canvas.toDataURL("image/jpeg", 0.7);

  const getRef = firebase.storage().ref('photos')
  const renameImg = getRef.child(`${new Date().getTime()}.jpeg`)
  renameImg.putString(dataURI, 'data_url').then(() => renameImg.getDownloadURL().then(url => getFaceId(url)))
};


//----- MANIPULAÇÃO DA API

const getNameUser = (response) => {
  //Identificação única do usuário
  const personId = response[0].candidates[0].personId

  //Endpoint da requisição fetch
  const url = `https://facelaboratoria2.cognitiveservices.azure.com/face/v1.0/persongroups/laboratoria/persons/${personId}`

  //Headers da requisição fetch
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Ocp-Apim-Subscription-Key", "47261e48623f48d285178161fb892cb8");

  //Parâmetros da requisição fetch
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  //Requisição
  fetch(url, requestOptions)
    .then(response => response.json())
    .then(user => messageToUser(user))
    .catch(error => console.log('error', error));
}

const messageToUser = (userData) => {
  const userName = userData.name
  console.log(`Que bom ver você novamente, ${userName}! (:`)
}


const getFaceId = url => {
  const myHeaders = new Headers();
  myHeaders.append("Ocp-Apim-Subscription-Key", "47261e48623f48d285178161fb892cb8");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ "url": url });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://facelaboratoria2.cognitiveservices.azure.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise", requestOptions)
    .then(response => response.json())
    .then(result => validateImage(result))
    .catch(error => console.log('error', error));
}

function validateImage(result) {
  console.log(result)
  const resultImage = result[0].faceId
  console.log(typeof (resultImage))
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Ocp-Apim-Subscription-Key", "47261e48623f48d285178161fb892cb8");

  const raw = JSON.stringify({ "personGroupId": "laboratoria", "faceIds": [resultImage], "maxNumOfCandidatesReturned": 1, "confidenceThreshold": 0.5 });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://facelaboratoria2.cognitiveservices.azure.com/face/v1.0/identify", requestOptions)
    .then(response => response.json())
    .then(result => getNameUser(result))
    .catch(error => console.log('error', error));
}
//Atribuir captura com o click
snap.addEventListener("click", toDrawCapturedSnap);

//Iniciar com o carregamento da página!
window.onload = init();