const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IO } = require('socket.io')
const PORT = 8080

const app = express()
const httpServer = new HttpServer(app)
const io = new IO(httpServer)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', './views/pages')
app.set('view engine', 'ejs')

const products = []
const messages = [{
    author: 'Lautaro', text: 'Hola'
}]

io.on('connection', socket => {
    console.log('Nuevo cliente conectado!!');
    socket.emit('message', messages)
    socket.on('new-message', data => {
        messages.push(data)
        io.sockets.emit('message', messages)
    })
})

app.get('/', (req, res) => {
    res.render('stock', { products })
})

app.get('/cargaProd', (req, res) => {
    res.render('inicio', { products })
})

app.post('/', (req, res) => {
    products.push(req.body)
    res.redirect('/')
})

httpServer.listen(PORT, () => {
    console.log(`Server corriendo en ${PORT}`);
})