# Desafio de Desenvolvimento Full-Stack – To-Do List

## Objetivo
<div id="objetivo"></div>
Uma aplicação simples que simule uma lista de tarefas (To-Do List),
integrando Back-end (Node.js), Front-end (HTML/CSS), banco de dados, e
implementando funcionalidades de segurança e uso de ferramentas em nuvem.
Você também precisará utilizar o Git para versionamento do código


## conteúdos
   * [Objetivo](#objetivo)
   * [Implementação](#implementacao)
      * [minha implementação](#minha)
      * [resolução de problemas](#problema)
   * [Instalação](#instalacao)
   * [Endpoints](#como-usar)
   * [Tecnologias](#tecnologias)

## Implementação
<div id="minha"></div>
Escolhi o Desafio de NodeJs, e para implementar a solução usei o framework express e começei a desenvolver a API primeiro, gastei por volta de uns 5 minutos para decidir a estrutura do banco de dados, e como o desafio pedia uma autenticação de usuario, então estabeleci um relacionamento da tabela de usuario com a tabela de tarefa, onde para criar uma tarefa precisaria do id do usuario, então criei a rota do usuario e fiz dois endpoints, um de registrar usuario e outro de logar, usei a ORM do sequelize para mapear as duas entidades, ao testar as rotas no postman parti para a proxima etapa, onde criei uma pasta de helpers que funciona como sendo um Middleware para autenticação, criei nela um arquivo para gerar o token JWT, verificar o token e resgatar o usuario a parir dele, em seguida criei as rotas da tarefa e já coloquei o middleware de autenticação para proteger as rotas, criei as funções de adicionar tarefa, listar todas, listar por id, atualizar status, atualizar a tarefa inteira e deletar tarefa. A partir desse momento a api está quase finalizada, faltava implementar o redis, e para esse eu precisei aprender um pouco sobre antes de implementar pois nunca tinha usado, mas quando entendi sua utilização para o cache usando chave e valor, consegui implementar ele, criando um cache na rota de listar todas as tarefas com uma expiração de 20 segundos e um reset toda vez que um dado é alterado nas rotas de put/post ou delete.

#### resolução de problemas
<div id="problema"></div>

-Ao longo do desenvolvimento tive de lidar com alguns erros, dentre eles teve um que ao criar o usuario ele me retornava um status de 500 na requisição, e ao enviar o mesmo json ele caia na validação se o usuário já existia no banco, e para resolver eu usei o console.log para descobrir se os dados estavam vindo certo, mas ao checar que no banco o usuario tinha sido cadastrado, deduzi que o problema estava no final do código, e era o problema no arquivo do jwt onde eu tinha esquecido de exportar o arquivo. 

-Teve um erro onde ao listar todas as tasks me retornava um array vazio, e isso foi simples, olhando o código percebi que faltava um await.

-No metodo de delete, teve um erro que ao fazer a requisição ele ficava em loading infinito, mas ao conferir no banco o dado tinha sido apagado, e como imaginei que se apagou então o problema estava na ultima linha e percebi que por eu não retornar nada pensei que podia retornar apenas um resp.status(205) ao invés de mandar um json vazio junto

-Erro no docker-compose, estava dando erro na ultima etapa do build, e esse eu fiquei um tempo, mas ao conferir os caminhos relativos, percebi que o problema estava no volume

-Erro ao inciar o container no docker, onde o node não conseguia conectar com o banco e isso aconteceu porque ants o host era localhost e ao subir o container o host é o nome do container

## Instalação
<div id="instalacao"></div>
Caso deseje rodar o projeto, na pasta Backend onde está a API, tem o arquivo do Docke-compose
que sobe tanto o Node,Postgres e o Redis

`cd Backend`

`docker-compose-up`

### Features

- [x] Cadastro de usuário
- [x] Login de usuário
- [x] Adicionar uma nova tarefa
- [x] Listar todas as tarefas.
- [x] Listar tarefa por id.
- [x] Atualizar status da tarefa.
- [x] Atualizar tarefa por inteiro.
- [x] Deletar tarefa.
- [x] Cache de tarefa usando Redis.
- [x] Validações.

### Tecnologias

<div style="display: inline_block"><br>
    <img align="center" alt="docker" height="40" width="40" src="https://github.com/tandpfun/skill-icons/blob/main/icons/Docker.svg">
    <img align="center" alt="js" height="40" width="40" />
  <img align="center" alt="Rafa-Js" height="40" width="40" src="https://github.com/tandpfun/skill-icons/blob/main/icons/JavaScript.svg">
  <img align="center" alt="node" height="40" width="40" src="https://github.com/tandpfun/skill-icons/blob/main/icons/NodeJS-Light.svg">
    <img align="center" alt="postgres" height="40" width="40" src="https://github.com/tandpfun/skill-icons/blob/main/icons/PostgreSQL-Light.svg">
        <img align="center" alt="redis" height="40" width="40" src="https://github.com/tandpfun/skill-icons/blob/main/icons/Redis-Light.svg">
</div>