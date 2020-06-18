const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

function logRequest(rec, res, next) {
  const { method, url } = rec;
  const label = `[${method.toUpperCase()}] ${url}`;
  console.log(label);
  return next();
}

function validateID(rec, res, next) {
  const { id } = rec.params;

  if (!isUuid(id)) {
    return res.status(400).json({ error: "ID invalido" });
  }

  return next();
}

const repositories = [];

app.get("/repositories", (rec, res) => {
  return res.json(repositories);
});

app.post("/repositories", (rec, res) => {
  const { title, url, techs } = rec.body;
  const repositorie = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repositorie);
  return res.json(repositorie);
});

app.put("/repositories/:id", (rec, res) => {
  const { id } = rec.params;
  const { title, url, techs } = rec.body;

  const repositorieIndex = repositories.findIndex(
    repositorie => repositorie.id === id
  );

  if (repositorieIndex < 0) {
    return res.status(400).json({ error: "Repositorio não encontrado" });
  }

  const putRepositorie = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositorieIndex].likes
  };
  repositories[repositorieIndex] = putRepositorie;

  return res.status(200).json(putRepositorie);
});

app.delete("/repositories/:id", (rec, res) => {
  const { id } = rec.params;

  const repositorieIndex = repositories.findIndex(
    repositorie => repositorie.id === id
  );

  if (repositorieIndex < 0) {
    return res.status(400).json({ error: "Repositorio não encontrado" });
  }

  repositories.splice(repositorieIndex, 1);

  return res.status(204).json();
});

app.post("/repositories/:id/like", (rec, res) => {
  const { id } = rec.params;

  const repositorieIndex = repositories.findIndex(
    repositorie => repositorie.id === id
  );

  if (repositorieIndex < 0) {
    return res.status(400).json({ error: "Repositorio não encontrado" });
  }

  repositories[repositorieIndex].likes++;

  return res.status(200).json({ likes: repositories[repositorieIndex].likes });
});

module.exports = app;
