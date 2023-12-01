const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use(express.static('public'))

app.get('/users/add', (req, res) => {
    res.render('userform')
    })
    
    app.post('/users/save', (req, res) => {
    const nameP = req.body.nameP
    const nameF = req.body.nameF
    const cate = req.body.cate
    const dataComp = req.body.dataComp
    const compra = req.body.compra
    const venda = req.body.venda
    const user = { nameP: nameP, nameF: nameF, cate: cate, dataComp: dataComp, compra: compra, venda: venda}
    res.render('viewuser', { user: user })
    
    })

const usuario = {
    login: 'teste',
    senha: 123
}

app.get('/', (req, res) => {
    res.render('login')
})

var auth = false

app.post('/user/login', (req, res) => {
    const login = req.body.login
    const senha = req.body.senha
    let message = ""
    
    if (login == usuario.login && senha == usuario.senha) {
    auth = true
    message = "Usuário logado com sucesso!"
    res.render('home', { usuario: usuario, auth, message })
    }
    else {
    auth = false
    message = "Usuário e/ou senha inválidos!"
    res.render('login', { auth, message })
    }
    
    })
    
    //PAGINA 404
    app.use(function (req, res, next) {
    res.status(404).render('404')
    })



app.listen(port, () => {
    console.log('Server online')
  })