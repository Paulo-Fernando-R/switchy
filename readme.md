# Switchy

## API

### Node

<p>Antes de iniciar o projeto, execute o comando abaixo para instalar as dependências:</p>

````
npm i
````

### Swagger

<p>Para atualizar o Swagger da aplicação, execute o comando abaixo:</p>

````javascript
npm run swagger
````

## App

### Compile

Para compilar para o ambiente de produção, é necessário executar o comando abaixo:

````powershell
eas build --profile production
````

Para compilar para Play Store, é necessário o comando abaixo:

````powershell
eas submit --platform android 
````