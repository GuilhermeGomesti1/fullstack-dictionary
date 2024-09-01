# Fullstack Challenge - Dictionary

## Introdução

Este é um desafio para que possamos ver as suas habilidades como Fullstack Developer.

Nesse desafio você deverá desenvolver um aplicativo para listar palavras em inglês, utilizando como base a API [Free Dictionary API](https://dictionaryapi.dev/). O projeto a ser desenvolvido por você tem como objetivo exibir termos em inglês e gerenciar as palavras visualizadas, conforme indicado nos casos de uso que estão logo abaixo.

[SPOILER] As instruções de entrega e apresentação do challenge estão no final deste Readme (=

## Estrutura e informações iniciais do projeto

Optei por iniciar o projeto usando o Next.js 14.2.3 e TailwindCSS, pois estão nos requisitos da vaga. A estrutura do projeto é a seguinte:

- client/: Pasta para o front-end.
- server/: Pasta para o código do back-end.

## Backend

O backend do projeto é construído com Express e MongoDB. Abaixo estão os detalhes da estrutura do diretório, configuração e como iniciar o servidor.

### Estrutura do Diretório

- **`server/`**: Pasta contendo o código do backend.

  - **`middlewares/`**

    - `authenticateToken.ts`: Middleware que autentica o token JWT presente no cabeçalho da requisição.

  - **`models/`**: Contém os modelos Mongoose para o MongoDB.

    - `user.ts`: Define o esquema do modelo User no MongoDB usando Mongoose, incluindo campos para email, password, favorites e history, e exporta o modelo User para interações com o banco de dados.
    - `word.ts`: Define o esquema do modelo Word no MongoDB usando Mongoose, com um campo word, e exporta o modelo Word para interações com a coleção dicWords no banco de dados.

  - **`routes/`**: Contém as rotas do Express.

    - `auth.ts`: Define as rotas para registro e login de usuários usando o middleware authenticateUser.
    - `entries.ts`: Define rotas para buscar palavras no dicionário, visualizar detalhes de uma palavra específica, adicionar ou remover palavras dos favorites do usuário e registrar palavras no history, utilizando autenticação JWT para proteger essas rotas.
    - `user.ts`: Define rotas para acessar e manipular os dados do perfil do usuário, incluindo seus dados gerais, histórico e favoritos, e utiliza JWT para garantir que apenas usuários autenticados possam acessar essas informações.

  - **`services/`**: Manipulação de dados e regras de aplicação relacionadas ao banco de dados.

    - `fileService.ts:`: Contém a lógica para baixar um arquivo de palavras, ler seu conteúdo e salvar as palavras no MongoDB e também verifica se as palavras já foram salvas no banco de dados antes de realizar as operações.
    - `authService.ts`: Gerencia a autenticação de usuários, incluindo registro e login, utilizando bcrypt para hash de senhas e jsonwebtoken para geração de tokens JWT.
    - `userService.ts`: Fornece funções para buscar usuários pelo ID, lidando com possíveis erros e garantindo que o usuário exista antes de retornar os dados.
    - `wordService.ts`: Realiza operações relacionadas às palavras, buscando palavras com base nos filtros passados, obtendo detalhes de uma palavra específica e gerencia a lógica de paginação.

    - **`Types/`**: Definições personalizadas para tipos de requisição, incluindo informações do usuário e parâmetros de consulta.
    - `express.d.ts`: Aqui, criei a interface CustomRequest como uma extensão da interface Request do Express para resolver um erro ao usar o Request global (erro: incompatibilidade de tipos entre Request e authRequest). Após buscar em várias documentações, descobri que essa abordagem, mencionada em um blog, vi que é uma solução boa para evitar problemas associados à alteração direta de variáveis globais. fonte: https://www.reddit.com/r/node/comments/nin8fs/help_node_express_typescript_how_should_i_type_a/

    - **`scripts/`**:
    - `initialize-db.ts`: Script para inicializar o banco de dados. Baixa o arquivo, le e converte as palavras e salva no banco de dados MongoDB, se ainda não estiverem presentes. executado com: - `npm run initialize-db`.

    - **`server.ts`**: Arquivo principal que configura o servidor Express e conecta ao MongoDB.

- **`.env`**: Certifique-se de configurar suas variáveis de ambiente no arquivo `.env`.

Como este é um teste, seguem as credenciais para acesso ao banco de dados, criadas especificamente para este projeto. Estou fornecendo essas informações para que você possa configurar o ambiente local com facilidade, caso seja necessário.

      ```env

MONGO_URI=mongodb+srv://guilhermegomesti1:9diPem91eOvPieb1@cluster0.sh4ko.mongodb.net/myDictionaryDB?retryWrites=true&w=majority
FILE_URL=https://raw.githubusercontent.com/meetDeveloper/freeDictionaryAPI/master/meta/wordList/english.txt
JWT_SECRET=e7d3bfa8c9a0a5d2a8eabfa7c4e8a16d9b99b934f10b8e9f2b7fc6ab54697b2e
PORT=5000

````

## FrontEnd

O frontend do projeto é construído com Next.js 14.2.3 e TailwindCSS. Abaixo estão os detalhes da estrutura do diretório, configuração e como iniciar o frontend.

### Estrutura do Diretório

**`client/`**: Pasta contendo o código do frontend.

- **`public/`**: Contém arquivos estáticos e globais.
- **`src/`**: Contém o código-fonte da aplicação.

- **`app/`**: Componentes e páginas da aplicação.
  - **`AlphabetMenu/`**: Componente para o menu de alfabeto.
  - **`Footer/`**: Componente de rodapé.
  - **`Icons/`**: Ícones usados na aplicação.
  - **`Login/`**: Componente para o Login.
  - **`MarkAsViewed/`**: Componente para marcar palavras como visualizadas.
  - **`PhonectsPanel/`**: Componente para exibir painéis de fonética.
  - **`Providers/`**: Provedores de contexto e configuração global.
  - **`SearchBar/`**: Componente para a barra de pesquisa.
  - **`ToggleFavorite/`**: Componente para alternar favoritos.
  - **`WordModal/`**: Modal para exibir detalhes da palavra.
  - **`dashboard/`**: Página do painel principal do dicionário e usuário.
  - **`register/`**: Página para signUp.
  - **`services/`**: Serviços para chamadas de API.
    - `api.ts`: Configuração das chamadas à API.
    - `authService.ts`: Serviços relacionados à autenticação.
    - `favoriteService.ts`: Serviços para gerenciar favoritos.

- **`.env`**: Arquivo de configuração de variáveis de ambiente.
- **`.gitignore`**: Arquivo para ignorar arquivos e pastas no Git.
- **`Dockerfile`**: Arquivo para construir a imagem Docker do frontend.
- **`tsconfig.json`**: Configuração do TypeScript.
- **`types.ts`**: Definições de tipos TypeScript personalizados.

### Instalação e Execução

Para rodar o frontend localmente, siga os passos abaixo:

1. **Instalar as dependências**:

 ```bash
 cd client
 npm install
````

2. **Executar o aplicativo**:

   ```bash
   npm run dev
   ```

   Isso iniciará o servidor de desenvolvimento em `http://localhost:3000`.

### Configuração

- **`.env`**: Certifique-se de configurar suas variáveis de ambiente no arquivo `.env`.

  ```env
  REACT_APP_API_URL=http://localhost:5000
  ```
[Assista ao vídeo](vid-desktop.mp4)

### Antes de começar

- Prepare o projeto para ser disponibilizado no Github, copiando o conteúdo deste repositório para o seu (ou utilize o fork do projeto e aponte para o Github). Confirme que a visibilidade do projeto é pública (não esqueça de colocar no readme a referência a este challenge);
- O projeto deve utilizar a Linguagem específica na sua Vaga (caso esteja se candidatando). Por exempo: Python, R, Scala e entre outras;
- Considere como deadline 5 dias a partir do início do desafio. Caso tenha sido convidado a realizar o teste e não seja possível concluir dentro deste período, avise a pessoa que o convidou para receber instruções sobre o que fazer.
- Documentar todo o processo de investigação para o desenvolvimento da atividade (README.md no seu repositório); os resultados destas tarefas são tão importantes do que o seu processo de pensamento e decisões à medida que as completa, por isso tente documentar e apresentar os seus hipóteses e decisões na medida do possível.

### Instruções iniciais obrigatórias

- Utilize as seguintes tecnologias:

#### Tecnologias (Front-End):

- Com ou sem framework (React, Angular, Vue.js, Javascript Vanilla, ou outro da sua escolha)
- Estilização (Material UI, Semantic UI, Styled Components, etc). Ou escrever o seu proprio sob medida 👌
- CSS Flexbox + CSS Grid
- Design Mobile First
- Gestão de dados (Redux, Context API, Localstorage, etc)
- Conceitos de Programação Funcional em JS (pelo menos .map, .filter e .reduce)

Atente-se, ao desenvolver a aplicação front-end, para conceitos de usabilidade e adeque a interface com elementos visuais para os usuários do seu sistema.

#### Tecnologias (Back-End):

- API (Node.js, PHP, Ruby, ou outra da sua escolha) com ou sem uso de frameworks
- Banco de dados (Postgres, MySQL, MongoDB, etc).

Como sugestões, pode criar um banco de dados grátis **MongoDB** usando Atlas: https://www.mongodb.com/cloud/atlas. Para conhecer outras plataformas de banco de dados, acesse https://coodesh.com/blog/candidates/heroku-acabou-e-agora-veja-alternativas/

#### Organização:

- Separar o repositório do back do front
- Aplicação de padrões Clean Code
- Validação de chamadas assíncronas para evitar travamentos

### Modelo de Dados:

Conforme indicado na documentação da API, a estrutura de dados presente retorna as seguintes informações:

```json
[
  {
    "word": "hello",
    "phonetics": [
      {
        "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3",
        "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=75797336",
        "license": {
          "name": "BY-SA 4.0",
          "url": "https://creativecommons.org/licenses/by-sa/4.0"
        }
      },
      {
        "text": "/həˈləʊ/",
        "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3",
        "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=9021983",
        "license": {
          "name": "BY 3.0 US",
          "url": "https://creativecommons.org/licenses/by/3.0/us"
        }
      },
      {
        "text": "/həˈloʊ/",
        "audio": ""
      }
    ],
    "meanings": [
      {
        "partOfSpeech": "noun",
        "definitions": [
          {
            "definition": "\"Hello!\" or an equivalent greeting.",
            "synonyms": [],
            "antonyms": []
          }
        ],
        "synonyms": ["greeting"],
        "antonyms": []
      },
      {
        "partOfSpeech": "verb",
        "definitions": [
          {
            "definition": "To greet with \"hello\".",
            "synonyms": [],
            "antonyms": []
          }
        ],
        "synonyms": [],
        "antonyms": []
      },
      {
        "partOfSpeech": "interjection",
        "definitions": [
          {
            "definition": "A greeting (salutation) said when meeting someone or acknowledging someone’s arrival or presence.",
            "synonyms": [],
            "antonyms": [],
            "example": "Hello, everyone."
          },
          {
            "definition": "A greeting used when answering the telephone.",
            "synonyms": [],
            "antonyms": [],
            "example": "Hello? How may I help you?"
          },
          {
            "definition": "A call for response if it is not clear if anyone is present or listening, or if a telephone conversation may have been disconnected.",
            "synonyms": [],
            "antonyms": [],
            "example": "Hello? Is anyone there?"
          },
          {
            "definition": "Used sarcastically to imply that the person addressed or referred to has done something the speaker or writer considers to be foolish.",
            "synonyms": [],
            "antonyms": [],
            "example": "You just tried to start your car with your cell phone. Hello?"
          },
          {
            "definition": "An expression of puzzlement or discovery.",
            "synonyms": [],
            "antonyms": [],
            "example": "Hello! What’s going on here?"
          }
        ],
        "synonyms": [],
        "antonyms": ["bye", "goodbye"]
      }
    ],
    "license": {
      "name": "CC BY-SA 3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    "sourceUrls": ["https://en.wiktionary.org/wiki/hello"]
  }
]
```

### Back-End:

Nessa etapa você deverá construir uma API Restful com as melhores práticas de desenvolvimento.

**Obrigatório 1** - Você deverá atender aos seguintes casos de uso:

- Como usuário, devo ser capaz de realizar login com usuário e senha
- Como usuário, devo ser capaz de visualizar a lista de palavras do dicionário
- Como usuário, devo ser capaz de guardar no histórico palavras já visualizadas
- Como usuário, devo ser capaz de visualizar o histórico de palavras já visualizadas
- Como usuário, deve ser capaz de guardar uma palavra como favorita
- Como usuário, deve ser capaz de apagar uma palavra favorita
- Internamente, a API deve fazer proxy da API Free Dictionary, pois assim o front irá acessar somente a sua API

**Obrigatório 2** - Você deverá desenvolver as seguintes rotas com suas requisições e respostas:

<details open>
<summary>[GET] /</summary>
<p>
Retornar a mensagem "Fullstack Challenge 🏅 - Dictionary"
</p>

```json
{
  "message": "Fullstack Challenge 🏅 - Dictionary"
}
```

</details>
<details open>
<summary>[POST] /auth/signup</summary>

```json
{
  "name": "User 1",
  "email": "example@email.com",
  "password": "test"
}
```

```json
{
  "id": "f3a10cec013ab2c1380acef",
  "name": "User 1",
  "token": "Bearer JWT.Token"
}
```

</details>
<details open>
<summary>[POST] /auth/signin</summary>

```json
{
  "email": "example@email.com",
  "password": "test"
}
```

```json
{
  "id": "f3a10cec013ab2c1380acef",
  "name": "User 1",
  "token": "Bearer JWT.Token"
}
```

</details>
<details open>
<summary>[GET] /entries/en</summary>
<p>
Retornar a lista de palavras do dicionário, com paginação e suporte a busca. O endpoint de paginação de uma busca hipotética deve retornar a seguinte estrutura:
<br/>
[GET]/entries/en?search=fire&limit=4
</p>

```json
{
  "results": ["fire", "firefly", "fireplace", "fireman"],
  "totalDocs": 20,
  "page": 1,
  "totalPages": 5,
  "hasNext": true,
  "hasPrev": false
}
```

</details>
<details open>
<summary>[GET] /entries/en/:word</summary>
<p>
Retornar as informações da palavra especificada e registra o histórico de acesso.
</p>
</details>
<details open>
<summary>[POST] /entries/en/:word/favorite</summary>
<p>
Salva a palavra na lista de favoritas (retorno de dados no body é opcional)
</p> 
</details>
<details open>
<summary>[DELETE] /entries/en/:word/unfavorite</summary>
<p>
Remover a palavra da lista de favoritas (retorno de dados no body é opcional)
</p>
</details> 
<details open>
<summary>[GET] /user/me</summary>
<p>
Retornar o perfil do usúario
</p>
</details> 
<details open>
<summary>[GET] /user/me/history</summary>
<p>
Retornar a lista de palavras visitadas
</p>

```json
{
  "results": [
    {
      "word": "fire",
      "added": "2022-05-05T19:28:13.531Z"
    },
    {
      "word": "firefly",
      "added": "2022-05-05T19:28:44.021Z"
    },
    {
      "word": "fireplace",
      "added": "2022-05-05T19:29:28.631Z"
    },
    {
      "word": "fireman",
      "added": "2022-05-05T19:30:03.711Z"
    }
  ],
  "totalDocs": 20,
  "page": 2,
  "totalPages": 5,
  "hasNext": true,
  "hasPrev": true
}
```

</details> 
<details open>
<summary>[GET] /user/me/favorites</summary>
<p>
Retornar a lista de palavras marcadas como favoritas
</p>

```json
{
  "results": [
    {
      "word": "fire",
      "added": "2022-05-05T19:30:23.928Z"
    },
    {
      "word": "firefly",
      "added": "2022-05-05T19:30:24.088Z"
    },
    {
      "word": "fireplace",
      "added": "2022-05-05T19:30:28.963Z"
    },
    {
      "word": "fireman",
      "added": "2022-05-05T19:30:33.121Z"
    }
  ],
  "totalDocs": 20,
  "page": 2,
  "totalPages": 5,
  "hasNext": true,
  "hasPrev": true
}
```

</details>

Além disso, os endpoints devem utilizar os seguintes códigos de status:

- 200: sucesso com body ou sem body
- 204: sucesso sem body
- 400: mensagem de erro em formato humanizado, ou seja, sem informações internas e códigos de erro:

```json
{
  "message": "Error message"
}
```

**Obrigatório 3** - Você deve criar um script para baixar a lista de palavras do repositório e importar estas palavras para o banco de dados. A Free Dictionary API não possui endpoint com a lista de palavras. Para criar este endpoint será necessário alimentar o seu banco de dados com o [arquivo existente dentro do projeto no Github](https://github.com/meetDeveloper/freeDictionaryAPI/tree/master/meta/wordList).

**Diferencial 1** - Descrever a documentação da API utilizando o conceito de Open API 3.0;

**Diferencial 2** - Escrever Unit Tests para os endpoints da API;

**Diferencial 3** - Configurar Docker no Projeto para facilitar o Deploy da equipe de DevOps;

**Diferencial 4** - Deploy em algum servidor, com ou sem automatização do CI.

**Diferencial 5** - Implementar paginação com cursores ao inves de usar page e limit . Ao realizar este diferencial, o retorno dos endpoints deve possuir a seguinte estrutura:

```json
{
  "results": ["fire", "firefly", "fireplace", "fireman"],
  "totalDocs": 20,
  "previous": "eyIkb2lkIjoiNTgwZmQxNmjJkOGI5In0",
  "next": "eyIkb2lkIjoiNTgwZmQxNm1NjJkOGI4In0",
  "hasNext": true,
  "hasPrev": true
}
```

**Diferencial 6** - Salvar em cache o resultado das requisições ao Free Dictionary API, para agilizar a resposta em caso de buscas com parâmetros repetidos. Sugestões são usar o Redis e/ou MongoDB;

O cache pode ser feito a guardar todo o corpo das respostas ou para guardar o resultado das queries do banco. Para identificar a presença de cache, será necessário adicionar os seguintes headers nas respostas:

- x-cache: valores HIT (retornou dados em cache) ou MISS (precisou buscar no banco)
- x-response-time: duração da requisição em milissegundos

### Front-End:

Nessa etapa você deverá desenvolver uma aplicação web para consumir a API que você criou.

**Obrigatório 1** - Você deverá atender aos seguintes casos de uso:

- Como usuário, devo ser capaz de realizar login com usuário e senha
- Como usuário, devo ser capaz de visualizar uma lista de palavras com rolagem infinita
- Como usuário, devo ser capaz de visualizar uma palavra, significados e a fonética
- Como usuário, devo ser capaz de salvar a palavra como favorito
- Como usuário, devo ser capaz de remover a palavra como favorito
- Como usuário, devo ser capaz de visitar uma lista com as palavras que já vi anteriormente

**Obrigatório 2** - Seguir o wireframe para a página de listagem dos dados.

<img src="./img/wireframe.png" width="100%" />

**Diferencial 1** - Escrever Unit Tests ou E2E Test. Escolher a melhor abordagem e biblioteca;

**Diferencial 2** - Configurar Docker no Projeto para facilitar o Deploy da equipe de DevOps;

**Diferencial 3** - Colocar na URL os parametros utilizados na busca, para que seja possível compartilhar a URL;

**Diferencial 4** - Implementar SSR no projeto;

**Diferencial 5** - Implementar o projeto com PWA.

## Readme do Repositório

- Deve conter o título do projeto
- Uma descrição sobre o projeto em frase
- Deve conter uma lista com linguagem, framework e/ou tecnologias usadas
- Como instalar e usar o projeto (instruções)
- Não esqueça o [.gitignore](https://www.toptal.com/developers/gitignore)
- Se está usando github pessoal, referencie que é um challenge by coodesh:

> This is a challenge by [Coodesh](https://coodesh.com/)

## Suporte

Use a [nossa comunidade](https://discord.gg/rdXbEvjsWu) para tirar dúvidas sobre o processo ou envie uma mensagem diretamente a um especialista no chat da plataforma.
