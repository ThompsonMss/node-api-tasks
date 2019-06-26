//Requisitando o módulo express
const express = require("express");
const server = express();

//Definindo que o corpo das requisições serão JSON
server.use(express.json());

//Middlewares = Função Glocal que mostrar requisições chamadas
//E soma quantas chamadas até então
let numReq = 0;
server.use((req, res, next) => {
  numReq++;
  console.log(
    `Requisição: ${req.method} | URL: ${
      req.url
    } | Número de requisições: ${numReq}`
  );
  return next();
});

let projects = [];

//Middlewares - Função que verificar nas rotas que recebem ID na URL se existe o mesmo
function idInArray(req, res, next) {
  const { id } = req.params;
  let idExists = false;

  projects.forEach(v => {
    if (v.id == id) idExists = true;
  });

  if (idExists == false)
    return res.status(400).json({ message: "id not exists" });

  return next();
}

//Rota que cria um novo projeto passando params dentro do corpo
server.post("/projects", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  projects.push({
    id: id,
    title: title,
    tasks: []
  });

  res.json(projects);
});

//Rota que cria uma nova tarefa em um projeto específico
//Passando a tarefa pelo corpo da requisição
server.post("/projects/:id/tasks", idInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.forEach(v => {
    if (v.id == id) {
      v.tasks.push(title);
    }
  });

  //projects[id].tasks.push(title);

  res.json(projects);
});

//Rota que lista todos os projetos e suas tarefas
server.get("/projects", (req, res) => {
  res.json(projects);
});

//Rota que altera o titulo do projeto especifico
server.put("/projects/:id", idInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.forEach(v => {
    if (v.id == id) {
      v.title = title;
    }
  });

  res.json(projects);
});

//Rota deletando projeto específico
server.delete("/projects/:id", idInArray, (req, res) => {
  const { id } = req.params;
  projects.forEach(v => {
    if (v.id == id) {
      let idInArray = projects.indexOf(v);
      if (idInArray != -1) projects.splice(idInArray, 1);
    }
  });

  res.send();
});

//Escutando a porta 3000 (http://localhost:3000)
server.listen(3000);
