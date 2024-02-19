const register = document.getElementById('btnReg')

async function registerUser (){

    const docUser = document.getElementById('docu').value;
    const nameUser = document.getElementById('nombre').value;
    const passUser = document.getElementById('pass').value;

    await fetch ('http://localhost:1234/user/register',{
        method: 'POST',
        body: JSON.stringify({
            "docUser": docUser,
            "nameUser": nameUser,
            "passUser": passUser
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            // La solicitud fue exitosa (código de estado 200-299)
            return response.json(); // Convertir la respuesta en formato JSON
        } else {
            // La solicitud falló (código de estado 400 o superior)
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
    })
    .catch(error =>{
        console.log('Error al intentar cargar los datos'+error)
    })
}
register.addEventListener('click',()=>{
    registerUser()
})