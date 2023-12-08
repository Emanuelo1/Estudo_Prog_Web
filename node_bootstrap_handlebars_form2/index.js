const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const { LocalStorage } = require("node-localstorage");

// Construtor de função criando o diretório no projeto LocalStorage
var localStorage = new LocalStorage("./scratch");

// Configuração do Template handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static("public"));

app.get("/users/add", (req, res) => {
  res.render("userform");
});

app.post("/users/save", (req, res) => {
  const name = req.body.name;
  const marca = req.body.marca;
  const potencia = req.body.potencia;
  const cor = req.body.cor;
  const ano = req.body.ano;
  const user = {
    name: name,
    marca: marca,
    potencia: potencia,
    cor: cor,
    ano: ano,
  };

  localStorage.setItem("name", `${name}`);
  localStorage.setItem("marca", `${marca}`);
  localStorage.setItem("potencia", `${potencia}`);
  localStorage.setItem("cor", `${cor}`);
  localStorage.setItem("ano", `${ano}`);

  console.log(localStorage.getItem("name"));
  console.log(localStorage.getItem("marca"));
  console.log(localStorage.getItem("potencia"));
  console.log(localStorage.getItem("cor"));
  console.log(localStorage.getItem("ano"));

  res.render("viewuser", { user: user });
});

const usuario = {
  login: "emanuel@gmail.com",
  senha: 123,
};

app.get("/", (req, res) => {
  res.render("login");
});

var auth = false;

app.post("/user/login", (req, res) => {
  const login = req.body.login;
  const senha = req.body.senha;
  let message = "";

  if (login == usuario.login && senha == usuario.senha) {
    auth = true;
    message = "Usuário logado com Sucesso!";
    res.render("home", { usuario: usuario, auth, message });
  } else {
    auth = false;
    message = "Usuário e/ou senha Iválidos!";
    res.render("login", { auth, message });
  }
});
//pagina 404
app.use(function (req, res, next) {
  res.status(404).render("erro404");
});

//Sevidor
app.listen(port, () => {
  console.log("Server online");
});
