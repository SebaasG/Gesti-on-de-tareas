
//#region DeclaracióneditButton
var tarjetas = document.getElementsByClassName('tarjet'); //se usa para el for

let nameUser = localStorage.getItem('user');// Se usa para 

const btnCreate = document.getElementById('createTask');//Boton para crear una nueva tarea

const btnCerrar = document.getElementById('cerrarSesion');

let contador = 0
//#endregion

//#region traer tareas

async function getTask() {
    const docUser = await getDocUser();
    const response = await fetch('http://localHost:1234/task/get/' + docUser)
    const datos = await response.json()

    datos.forEach(datos => {
        contador = contador + 1
        let valor;
        const formattedDate = newDate(datos.dateStart)
        const states = state(datos.stateTask);
        const cate = validarCate(datos.cateTask);
        let div = document.createElement('div');
        div.innerHTML = `   
            <div id = 'tarjet${contador}' class="tarjet" data-bs-toggle="modal" data-bs-target="#miModal">
            <div class="contenido"> 
            <h4>${datos.nameTask}</h4> <br>
            <p>Tarea: #${datos.numTask} </p>
            <p>categoria: ${cate} </p>  
            <p>Fecha de creacion: ${formattedDate}</p>
            <p>Estado: ${states}</p>
            </div>
        </div> `;
        document.getElementById('container').appendChild(div);
        // Añadir evento click para cada tarjeta creada
        document.querySelector('#tarjet' + contador).addEventListener('click', function () {
            // aquí puedes ejecutar una función cuando se hace clic en la tarjeta
            const hola = localStorage.setItem('task', datos.id)
            llenarModal(datos.id)
        });
    });
};
//#endregion

//#region guardar Tareas
async function postTask() {
    const datos = await getDocUser();
    const numTasks = await numTask() //Se la llama la funcion para saber el documento del usaurio con el nombre del mismo

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
                "numTask": numTasks,
                "docUser": datos,
                "nameTask": nameTask,
                "descTask": descTask,
                "stateTask": 1,
                "cateTask": cateTask
            })
        });
        location.reload()//Actualizamos el formulario para que cargue de una vez la nueva tarea
    } catch (error) {
        console.log('Hubo un error al guardar la tarjeta :(' + error)
    }
}
//#endregion

//#region creación de modales
let div = document.createElement('div');
div.innerHTML = `
<div class="modal" id="miModal">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h4 id="modalTitle"></h4> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div id="modalContent"></div> </div>
    <div class="modal-footer">
     
      <button type="button" class="btn btn-outline-primary" id="editButton" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
      <button type="button" id = "deleteModal" class= "btn btn-outline-danger" >delete</button>
    </div>
  </div>
</div>
</div>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <form>
        <div class="mb-3" id = "averprueba">
        </div>
        <div class="mb-3">
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" id = "pruebamoda" class="btn btn-primary">
      Save changes</button>
    </div>
  </div>
</div>
</div>
`;
document.getElementById('modalcont').appendChild(div);
//#endregion

//#region Actualizar Tareas

async function updateTask() {

    const nameTask = document.getElementById('nameTaskM2').value;
    const descTask = document.getElementById('descTaskM2').value;
    const stateTask = document.getElementById('radios1');
    const comboElement = document.getElementById("cboCate").value;
    const valorLocal = localStorage.getItem('task')
    let resultState;

    if (stateTask.checked) {
        resultState = 1;
    } else {
        resultState = 2;
    }

        await fetch('http://localHost:1234/task/update', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify({
            "idTask": valorLocal,
            "nameTask": nameTask,
            "descTask": descTask,
            "stateTask": resultState,
            "cateTask": comboElement
        })
    })
location.reload()
}
//#endregion
async function deleteTask(){
    const id = localStorage.getItem('task')

    const data = await fetch('http://localHost:1234/task/delete',{
        method:"DELETE",
        headers: {
            "Content-Type": "application/json"
        },body: JSON.stringify({
            "idTask": id,
        })
    })
    if(data){
        console.log('Eliminado con éxito')
        location.reload()
    }
    console.log('ALgo pasa ahi cachito')

}
//#region llenar modales
async function llenarModal(doc) {
    const response = await fetch('http://localHost:1234/task/doc/' + doc);
    const datos = await response.json();
    const cate = validarCate(datos[0].cateTask);
    const formDate = newDate(datos[0].dateStart, true);
    const states = state(datos[0].stateTask);

    document.getElementById('modalTitle').innerText = datos[0].nameTask;

    document.getElementById('modalContent').innerHTML = `
        <label  class="col-form-label">Description task:</label> 
        <p> ${datos[0].descTask}</p>
        <label  class="col-form-label">Date:</label> 
        <p> ${formDate}</p>
        <label  class="col-form-label">State:</label> 
        <p> ${states}</p>
        <label  class="col-form-label">Category:</label> 
        <p> ${cate}</p> `;
}

async function llenarModal2(num) {
    const response = await fetch('http://localHost:1234/task/doc/' + num);
    const datos = await response.json();
    localStorage.setItem('cate', datos[0].cateTask)
    localStorage.setItem('state', datos[0].stateTask)
    document.getElementById('exampleModalLabel').innerText = `Tarea # ${datos[0].numTask}`

    document.getElementById('averprueba').innerHTML = `
        <label for="recipient-name"  class="col-form-label"><strong> Name task:</strong> </label> 
        <textarea class="form-control" id="nameTaskM2">${datos[0].nameTask}</textarea>
        <label for="recipient-name"  class="col-form-label">Description:</label> 
        <textarea class="form-control" id="descTaskM2">${datos[0].descTask}</textarea>
        <label for="recipient-name"  class="col-form-label">Category:</label> 
        <select class="form-select" id = "cboCate" aria-label="Default select example">
        <option selected>Select...</option>
        <option value="1">Personal</option>
        <option value="2">Trabajo</option>
        </select>
        <br>
        <label for="recipient-name"  class="col-form-label">Status:</label> 
        <div class="form-check">
        <input class="form-check-input" type="radio" name="exampleRadios" id="radios1" value = 1>
        <label class="form-check-label" for="exampleRadios1">
        Pendiente
        </label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="exampleRadios" id="radios2"  value = 2>
        <label class="form-check-label" for="exampleRadios2">
        Terminado
        </label>
        </div> `

    LlenarCbo()
    llenarRadio()
}
//#endregion

//#region Funciones de importancia secundaria
function validarCate(cate) {

    if (cate === 1) {
        return "Personal"
    } else if (cate === 2) {
        return "Trabajo"
    }
}

function state(state) {
    if (state === 1) {
        return "Pendiente"
    } else {
        return "Terminado"
    }
}

function LlenarCbo() {

    const valorCombo = localStorage.getItem('cate');
    const comboElement = document.getElementById("cboCate"); // Obtén el elemento del combobox por su ID

    if (valorCombo === '1') {
        comboElement.selectedIndex = 1; // Selecciona la opción 1
    } else {
        comboElement.selectedIndex = 2; // Selecciona la opción 2
    }
}

function llenarRadio() {
        const valorradio = localStorage.getItem('state')

    const radioElement = document.getElementById('radios1')
    const radioElement1 = document.getElementById('radios2')
    if (valorradio == 1) {
        radioElement.checked = true;
        radioElement1.checked = false;
    } else {
        radioElement1.checked = true;
        radioElement.checked = false;
    }
}

function newDate(fecha, incluirHora = false) {
    const formato = new Date(fecha);
    const opciones = {
        timeZone: "America/Bogota",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    };
    if (incluirHora) {
        opciones.hour = '2-digit';
        opciones.minute = '2-digit';
        opciones.second = '2-digit';
    }
    return formato.toLocaleString("es-CO", opciones);
}

async function getDocUser() {
    const data = await fetch('http://localHost:1234/task/' + nameUser)
    const datos = await data.json()
    const docUser = datos[0].docUser
    return docUser
}

function closeSession() {
    var nuevaPestana = window.open("../../index.html", "_blank");
    setTimeout(function () {
        window.open('about:blank', '_self').close();
    }, 2)
}

async function numTask() {
    const docUser = await getDocUser();
    const data = await fetch('http://localHost:1234/task/num/' + docUser)
    const datos = await data.json()
    const num = datos[0].numTaskUser + 1
    return num
}



//#endregion

//#region Eventos
document.addEventListener('DOMContentLoaded', function () {
    getTask()
    localStorage.setItem('numTask', numTask())
});

btnCreate.addEventListener('click', () => {
    postTask()
});

btnCerrar.addEventListener('click', () => {
    closeSession()
});
const botnmodal2 = document.getElementById('editButton')
botnmodal2.addEventListener('click', () => {
    const valorLocal = localStorage.getItem('task')

    llenarModal2(valorLocal)
});
//#endregion

const pruebamoda = document.getElementById('pruebamoda')
pruebamoda.addEventListener('click', () => {
    updateTask()
})

const deleteModal = document.getElementById('deleteModal')
deleteModal.addEventListener('click', ()=>{
    deleteTask()
})