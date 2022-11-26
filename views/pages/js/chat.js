const socket = io.connect()

const render = (data) => {
    const html = data.map(item => {
        return (`<div> <strong>${item.author}</strong>: <em>${item.text}</em></div>`)
    }).join(' ')

    document.getElementById('message').innerHTML = html 
}


const sendMensaje = () => {
    const emailAutor = document.getElementById('autor').value
    const textAutor = document.getElementById('texto').value
    const mensaje = {
        autor: emailAutor,
        texto: textAutor
    }
    document.getElementById('texto').value = ''
    socket.emit('new-message', mensaje)

    return false
}

socket.on('message', data => {
    render(data)
})