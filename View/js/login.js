
const boton  = document.getElementById('btn')


async function login(){
    const user = document.getElementById('nombre').value
    const pass = document.getElementById('pas').value
console.log(user, pass)

await fetch(`http://localHost:1234/user/login/${user}/${pass}`)
.then(response =>{
    if(response.ok){
        alert('bienvenido')
        window.location.href = '../../View/hola.html'
    }else{
        alert('papi sea serio')
    }
})
}
boton.addEventListener('click',()=>{
    login()
    })