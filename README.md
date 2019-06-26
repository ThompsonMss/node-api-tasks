# node-api-tasks
Uma pequena API REST em node de aplicação TASKS sem bando de dados.

Os projetos e suas tarefas são armazenadas em um Array.

URLs:

GET "http://localhost:3000/projects" -> Lista todos os projetos e tarefas.

POST "http://localhost:3000/projects" -> Cria um novo projeto
  Body JSON: {
    id: SEU ID,
    title: SEU TITLE
  }

POST "http://localhost:3000/projects/SEUID/tasks" -> Cria uma nova tarefa em um projeto específico
  Body JSON: {
    title: SUA TAREFA
  }

PUT "http://localhost:3000/projects/SEUID" -> Altera o titulo de um projeto específico
  Body JSON: {
    title: EDIÇÃO DO TITULO DO PROJETO
  }
  
DELETE "http://localhost:3000/projects/SEUID" -> Deleta um projeto específico


----------------------------------------------------------------------------------------------------

