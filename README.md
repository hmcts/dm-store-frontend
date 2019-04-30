# dm-store-frontend
A frontend angular application showcasing the dm-store backend APIs

## Setup

Terminal one
```
az login
az acr login --name hmcts --subscription 1c4f0704-a29e-403d-b719-b90c34ef14c9
DOCMOSIS_ACCESS_KEY=xxx docker-compose -f docker-compose-dependencies.yml up
```

Terminal two

```
npm install
npm run setup
npm start
```
