# Sistema de cadastro de funcionário.

Este projeto é um sistema no qual possui um design bem simples e responsiva, com toda a parte de componentização e cores estruturada. Neste projeto os dados são salvos no firebase utilizando o nodeJS do repositório totalmente dedicado a este front ``` https://github.com/LuizSoares1/cadastro-funcionario-backend ```, no qual também utilizei o Vercel para rodar o servidor.

## USO

```
git clone <link-do-projeto>
cd cadastro-funcionarios-frontend
npm install
ng serve

```

## Login

A parte de login contém uma área de usuário e senha no qual deixei "admin" para ambos e redirecionar para a tela de dashboard(via backend).

## Dashboard

A Dashboard exibe uma header com saudação personalizada ao usuário logado, um botão de logout e um menu centralizado com 2 opções, "Cadastrar Funcionário" e "Listar Funcionários".

## Cadastro

Na tela de cadastro, você de deparará com um switch para acionar se o funcionário é ativo ou não, Labels e Inputs para nome, email, data de contratação, cpf, endereço, foto no qual possui uma função que envia a foto para o servidor da ImgBB e ele retorna uma URL e o botão cadastrar. A partir do momento que o usuário preenche CEP, ele puxa o preenchimento automático dos campos de Rua, bairro, cidade e estado através da API ViaCEP que inseri em services. Dentro do componente há uma função que verifica se há foto para pre-visualização, se houver ele amostrará uma pequena prévia da foto anexada. Foi utilizado o NGXMask para formatação do CEP e CPF. Uso de signals para controle reativo do estado do formulário.

## Lista de Funcionários

Na tela de vizualização da lista, ele amostra tudo o que foi cadastrado puxando as informações do firebase. O componente do HTML possui um verificador se o funcionário é ativo ou não, amostrando bolinha verde para ativo e vermelha para inativo. Dentro do componente, possui também funções para, formatar CPF, CEP e Endereço.

## Tecnologias utilizadas:

TypeScript, Angular 20, SCSS, NGXMask, FormsMudule, Router, Signals, ImgBB API, API Via CEP.




