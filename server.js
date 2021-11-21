// Dependências...

const express = require('express')
const path = require('path')
const app = express()

// Informando para os protocolos o que utilizar / HTTP e WSS...

const server = require('http').createServer(app)
const io = require('socket.io')(server)

// Definições de pastas para nosso projeto...
// Indicamos onde ficará a pasta pública...
// A pasta views...
// Definição da engine para HTML...
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

// Renderização do index.html na página inicial...

 app.use('/', (req, res) => {
     res.render('index.html')
 })

 let messages = []


// Toda vez que o usuário se conectar com o socket.io...

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`)
    socket.on('sendMessage', data => {
        messages.push(data)
        socket.broadcast.emit('receivedMessage', data)
        socket.emit('previousMessages', data)
    })
})


 server.listen(3000)