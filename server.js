const express = require("express");
const server = express();

// utilizar arquivos estáticos
server.use(express.static("public"));

// habilitar body no form
server.use(express.urlencoded({ extended: true }));

// configurar conexão com banco de dados
const Pool = require("pg").Pool
const db = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "donors"
})

// template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
  express: server,
  noCache: true
})

server.get("/", (req, res) => {
  db.query("SELECT * FROM donors", function(err, result) {
    if(err) return res.send("Erro de banco de dados.");
    
    const donors = result.rows;
    return res.render("index.html", { donors });
  })
});

server.post("/", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const blood = req.body.blood;

  if (name == "" || email == "" || blood == "") {
    return res.send("Todos os campos são obrigatórios.")
  }

// colocar valores dentro do banco de dados
  const query = `INSERT INTO donors ("name", "email", "blood") VALUES ($1, $2, $3)`;
  const values = [name, email, blood];
  db.query(query, values, function(err) {
    if(err) return res.send("Erro no banco de dados.")
    console.log(err)

    return res.redirect("/");
  })
});

server.listen(3000, () => {
  console.log("server start");
});