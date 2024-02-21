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
        console.log(response.status)
        if (response.status === 201) {
            goodAlert();
        
        } else {
            // La solicitud falló (código de estado 400 o superior)
            badAlert()
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
    })
    }



function goodAlert(){
    Swal.fire({
        position: 'center',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        stopKeydownPropagation: true,
        title: '¡Éxito!',
        html: `<b class="texto-alerta">REGISTRADO CON ÉXITO </b>`,
        icon: 'success',
        iconColor: '#00003d',
        showConfirmButton: false, // Esta línea es la que se ha añadido
        timer: 2000
    });
    setTimeout(() => {
        location.reload();
    }, 2000);
}

function badAlert(){
    Swal.fire({
        position: 'center',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        stopKeydownPropagation: true,
        title: '¡ ERROR !',
        html: '<b class="texto-alerta"> ¡Error al registrar el usuario, intentelo nuevamente! </b>',
        icon: 'error',
        iconColor: '#00003d',
        confirmButtonColor: '#00003d',
        timer: 8000
    });
}

function cleanInput(){

}

register.addEventListener('click',()=>{
    registerUser()
})