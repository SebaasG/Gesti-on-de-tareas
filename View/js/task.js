var tarjetas = document.getElementsByClassName('tarjet'); //se usa para el for

let nameUser = localStorage.getItem('user');// Se usa para almacenar el nombre del usuario en localStorage

const btnCreate = document.getElementById('createTask');//Boton para crear una nueva tarea
let contador = 0
async function getTask() {
    
    const response = await fetch('http://localHost:1234/task/get')
    const datos = await response.json()
    datos.forEach(datos => {
        contador = contador+1
    // console.log(contador)
        const formattedDate = newDate(datos.dateStart)
        let div = document.createElement('div');
        div.innerHTML = `
            <div id = 'tarjet${contador}' class="tarjet" data-bs-toggle="modal" data-bs-target="#miModal">
            <div class="contenido"> 
            <h3>${datos.nameTask}</h3>
            <p>categoria: ${datos.cateTask} </p>
            <p>Fecha de creacion: ${formattedDate}</p>
            <p>Estado: ${datos.stateTask}</p>
            </div>
        </div> `;
        document.getElementById('container').appendChild(div);
    });
};



async function getDocUser() {
    const data = await fetch('http://localHost:1234/task/' + nameUser)
    const datos = await data.json()
    const docUser = datos[0].docUser
    return docUser

}

//Funcion para guardar tareas
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


// for (var i = 0; i < tarjetas.length; i++) {
//     tarjetas[i].addEventListener('click', function () {
// alert('Este es mi modal'+[i])
//     });
// }

document.addEventListener('DOMContentLoaded', function () {
    getTask()
});

btnCreate.addEventListener('click', () => {
    postTask()
})


