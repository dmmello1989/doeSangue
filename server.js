const express = require("express");
const server = express();

// utilizar arquivos estáticos
server.use(express.static("public"));

// habilitar body no form
server.use(express.urlencoded({ extended: true }));

// template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
  express: server,
  noCache: true
})

// lista de doadores
const donors = [
  {
    name: "Diego Fernandes",
    blood: "AB+"
  },
  {
    name: "Daniel Mello",
    blood: "A+"
  },
  {
    name: "Giovanna Santana",
    blood: "B+"
  },
  {
    name: "Michael Jackson",
    blood: "O-"
  }
];

server.get("/", (req, res) => {
  return res.render("index.html", { donors });
});

server.post("/", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const blood = req.body.blood;

  donors.push({ 
    name: name,
    blood: blood,
  });

  return res.redirect("/");
});

server.listen(3000, () => {
  console.log("server start");
});