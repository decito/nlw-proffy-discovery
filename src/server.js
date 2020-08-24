// Configuração do servidor.
const express = require('express')
const server = express()
const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages.js')

// Configurando o Nunjucks.
const nunjucks = require('nunjucks')

nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

// Início e configurações
server
// Receber os dados do body
.use(express.urlencoded( { extended: true } ))
// Configuração de arquivos estáticos (css, scripts, imagens).
.use(express.static("public"))
// Rotas da aplicação.
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
// Porta da aplicação.
.listen(5500)

// const { request, request } = response('express')