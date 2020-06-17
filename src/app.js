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
    const { title } = rec.query;

    const result = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return res.json(result);

});

app.post("/repositories", (rec, res) => {
    const { title, url, techs } = rec.body;
    const repositorie = { id: uuid(), title, url, techs, likes: 0 };

    repositories.push(repositorie);
    return res.json(project);

});

app.put("/repositories/:id", (rec, res) => {
    // TODO
});

app.delete("/repositories/:id", (rec, res) => {
    // TODO
});

app.post("/repositories/:id/like", (rec, res) => {
    // TODO
});

module.exports = app;
