# Project Base React vite TypeScript

## Run Locally

Clone the project

```bash
  git clone 
  // or
  git clone 
```

Go to the project directory

```bash
  cd taller-3-microservicios && cd src
```

Install dependencies

```bash
  npm install
  //or
  yarn install
```

Start the server

```bash
  npm start
  //or
  yarn start
```


## Run in Docker

Clone the project
```bash
  git clone 
  // or
  git clone 
```

Go to the project directory
```bash
  cd taller-3-microservicios
```

Build the container image on your local machine and start the container with the following command:
```bash
  docker-compose up --build --no-recreate -d
```

This command only needs to be run the first time, and whenever you make changes to the docker-compose.yml file. For subsequent runs, you can use:
```bash
  docker-compose up -d
```
With this, you will have the project up and running, either locally or via Docker.

**IMPORTANT:!** It is necessary to have docker installed and running, to be able to run the above command line successfully.

## Tecnologias

**Client:** React, Ajax, Vite

