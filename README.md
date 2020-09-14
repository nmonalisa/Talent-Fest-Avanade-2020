## Face Login

### O QUE É FACE LOGIN?

Face Login é uma aplicação que utiliza o serviço de Detecção Facial dos Serviços Cognitivos do Azure  (Microsoft) para realizar o reconhecimento facial a partir das imagens da câmera do dispositivo do usuário e permitir o seu login no sistema. Assim garantimos que ele tenha uma experiência de usuário ágil e agradável ao receber acesso a um ambiente virtual de forma segura e prática, sem a necessidade de digitação de senhas e e-mais!


### COMO FUNCIONA?
A partir de uma imagem capturada pela câmera do dispositivo, a API detecta com precisão a região do rosto do usuário. Essa imagem é então comparada com imagens de rostos já registrados na plataforma. Utilizando algoritmos de inteligência artificial que são abstraídos pelos métodos do serviço, a API detecta com precisão diferentes atributos da face capturada na foto, como por exemplo idade, gênero, presença de pêlos, profundidade dos olhos e outros. A partir daí pode-se obter a probabilidade daquele rosto pertencer a um dos usuários já registrados do grupo. Se a probabilidade for maior do que um grau de confiança pré-estabelecido, assumimos que o potencial candidato é a mesma pessoa fotografa e o acesso do sistema é liberado para o usuário. 


### POTENCIAIS APLICAÇÕES
* Controle de acesso em filas de eventos
* Controle de acesso em portarias de condomínios
* Controle de acesso ao sistema operacional de celulares e computadores
* Substituição de cartões de ponto tradicionais em estabelecimentos de trabalho
* Controle de autorizações bancárias
* Outros!
