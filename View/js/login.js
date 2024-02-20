const boton = document.getElementById('btn')
async function login() {
    const user = document.getElementById('nombre').value;
    const pass = document.getElementById('pas').value;


    await fetch(`http://localHost:1234/user/login/${user}/${pass}`)
        .then(response => {
            if (response.ok) {            
                Swal.fire({
                    position: 'center',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    stopKeydownPropagation: true,
                    title: '¡Éxito!',
                    html: `<b class="texto-alerta">BIENVENIDO ${user} </b>`,
                    icon: 'success',
                    iconColor: '#00003d',
                    showConfirmButton: false, // Esta línea es la que se ha añadido
                    timer: 8000
                });
                setTimeout(() => {
                    var nuevaPestana = window.open("../../View/hola.html", "_blank");
            setTimeout(function () {
                window.open('about:blank', '_self').close();
            }, 2)
                }, 3000);
            } else {
                alertaNegativa()
            }
        })
}


async function alertaNegativa(){
    Swal.fire({
        position: 'center',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        stopKeydownPropagation: true,
        title: '¡ ERROR !',
        html: '<b class="texto-alerta"> ¡Usuario o contraseña incorrecta! </b>',
        icon: 'error',
        iconColor: '#00003d',
        confirmButtonColor: '#00003d',
        timer: 8000
    });
  
    // alet('papi sea serio')
}

boton.addEventListener('click', () => {
    login()

})

