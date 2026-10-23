# Translation System - Passo a passo para rodar

## Pré-requisitos
- Node.js instalado
- MongoDB rodando localmente (mongodb://localhost:27017)
- RabbitMQ rodando localmente (amqp://localhost)

## Rodando a API (translation-api)
1. Acesse a pasta `translation-api`:
```
cd translation-api
```
2. Instale as dependências:
```
npm install
```
3. Inicie a API:
```
npm start
```
A API estará rodando em `http://localhost:3000`.

## Rodando o worker (translation-worker)
1. Em outro terminal, acesse a pasta `translation-worker`:
```
cd translation-worker
```
2. Instale as dependências:
```
npm install
```
3. Inicie o worker:
```
npm start
```
O worker vai escutar a fila e processar traduções.

## Testando a API
- Envie um POST para `http://localhost:3000/translations` com o JSON:
```json
{
  "text": "hello world",
  "targetLanguage": "es"
}
```
- A resposta retornará um `requestId` para acompanhar o status.

- Consulte o status e resultado com GET em:
```
http://localhost:3000/translations/<requestId>
```

## Observações
- A tradução é simulada, substituindo "hello" por "hola" para o idioma espanhol (es).
- Você pode expandir a função de tradução no arquivo `worker.js` para integrar APIs reais.
