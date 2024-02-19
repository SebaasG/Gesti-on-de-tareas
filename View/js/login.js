
const boton  = document.getElementById('btn')
const register = document.getElementById('reg')

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

async function register (){
    const docUser = document.getElementById('docu').values;
    const nameUser = document.getElementById('nombre').values;
    const passUser = document.getElementById('pass').values;

    console.log(docUser,nameUser,passUser)

    await fetch (`http://localHost:1234/user/register/${docUser}/${nameUser}/${passUser}`)
    method
}

boton.addEventListener('click',()=>{
    login()
    })

register.addEventListener('click',()=>{
    register()
})