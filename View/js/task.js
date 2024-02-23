var tarjetas = document.getElementsByClassName('tarjet'); //se usa para el for

let nameUser = localStorage.getItem('user');// Se usa para almacenar el nombre del usuario en localStorage

const btnCreate = document.getElementById('createTask');//Boton para crear una nueva tarea

const btnCerrar = document.getElementById('cerrarSesion');

let contador = 0



async function getDocUser() {
    const data = await fetch('http://localHost:1234/task/' + nameUser)
    const datos = await data.json()
    const docUser = datos[0].docUser
    return docUser

}

//Funcion para guardar tareas
async function getTask() {
    const docUser = await getDocUser();
    const response = await fetch('http://localHost:1234/task/get/' + docUser)
    const datos = await response.json()

    datos.forEach(datos => {
        contador = contador + 1
        const formattedDate = newDate(datos.dateStart)
        let div = document.createElement('div');
        div.innerHTML = `
            <div id = 'tarjet${contador}' class="tarjet" data-bs-toggle="modal" data-bs-target="#miModal">
            <div class="contenido"> 
            <h4>${datos.nameTask}</h4> <br>
            <p>Tarea: #${datos.numTask} </p>
            <p>categoria: ${datos.cateTask} </p>
            <p>Fecha de creacion: ${formattedDate}</p>
            <p>Estado: ${datos.stateTask}</p>
            </div>
        </div> `;
        document.getElementById('container').appendChild(div);
        // Añadir evento click para cada tarjeta creada
        document.querySelector('#tarjet' + contador).addEventListener('click', function () {
            // aquí puedes ejecutar una función cuando se hace clic en la tarjeta
            llenarModal(datos.numTask)
        });
    });
};

async function postTask() {
    const datos = await getDocUser(); //Se la llama la funcion para saber el documento del usaurio con el nombre del mismo
    const nameTask = document.getElementById('document').value;
    const descTask = document.getElementById('description').value;
    const cateTask = document.getElementById('category').value;
     
    try {
        await fetch('http://localHost:1234/task/save', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "docUser": datos,
                "nameTask": nameTask,
                "descTask": descTask,
                "stateTask": 1,
                "cateTask": cateTask
            })
        });
        location.reload()//Actualizamos el formulario para que cargue de una vez la nueva tarea
    } catch (error) {
        console.log('Hubo un error al guardar la tarjeta :('+ error)
    }
    }

// 1. Crea el modal una sola vez, fuera de la función
let div = document.createElement('div');
div.innerHTML = `
    <div class="modal" id="miModal"> 
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 id="modalTitle"></h4> <br>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="modalContent"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger">Eliminar</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>`;
document.getElementById('modalcont').appendChild(div);


async function llenarModal(num) {
    const response = await fetch('http://localHost:1234/task/doc/' + num);
    const datos = await response.json();
    console.log(datos[0].nameTask);

    // Actualiza el título del modal
    document.getElementById('modalTitle').innerText = datos[0].nameTask;

    // Puedes personalizar el contenido del modal como desees con los datos que recibes
    document.getElementById('modalContent').innerHTML = `
        <p>Descripción: ${datos[0].descTask}</p>
        <p>Fecha de inicio: ${datos[0].cateTask}</p>
        <p>Fecha de incio: ${datos[0].dateStart}</p>
    `;

}

//Esta función es solo para darle un formato de fecha que se trae desde MySQL
function newDate(date) {
    const fomat = new Date(date);
    const formattedDate = fomat.toLocaleString("es-CO", {
        timeZone: "America/Bogota",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    return formattedDate
}

document.addEventListener('DOMContentLoaded', function () {
    getTask()


});

btnCreate.addEventListener('click', () => {
    postTask()
})

function closeSession() {
    var nuevaPestana = window.open("../../index.html", "_blank");
    setTimeout(function () {
        window.open('about:blank', '_self').close();
    }, 2)
}

btnCerrar.addEventListener('click', () => {
    closeSession()
})

