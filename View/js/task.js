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
        let valor = 2
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
            const hola = localStorage.setItem('num', datos.numTask)
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
        console.log('Hubo un error al guardar la tarjeta :(' + error)
    }
}

let div = document.createElement('div');
div.innerHTML = `
<div class="modal" id="miModal">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h4 id="modalTitle"></h4> <button type="button" class="btn-close" data-bs-dismiss="modal" aria    -label="Close"></button>
    </div>
    <div class="modal-body">
      <div id="modalContent"></div> </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-danger" id="editButton" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
  
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
`; document.getElementById('modalcont').appendChild(div);


const botnmodal2 = document.getElementById('editButton')
botnmodal2.addEventListener('click', () => {
    const valorLocal = localStorage.getItem('num')
    llenarModal2(valorLocal)
})

async function llenarModal(num) {
    const response = await fetch('http://localHost:1234/task/doc/' + num);
    const datos = await response.json();
    const formDate = newDate(datos[0].dateStart, true);
    const states = state(datos[0].stateTask);
    document.getElementById('modalTitle').innerText = datos[0].nameTask;
    document.getElementById('modalContent').innerHTML = `
        <p>Descripción de tarea: ${datos[0].descTask}</p>
        <p>Fecha de creación: ${formDate}</p>
        <p>Estado: ${states}</p>
        <p>Categoria: ${datos[0].cateTask}</p>
    `;

}
async function llenarModal2(num) {
    const response = await fetch('http://localHost:1234/task/doc/' + num);
    const datos = await response.json();
    
   
    localStorage.setItem('cate',datos[0].cateTask )

    document.getElementById('exampleModalLabel').innerText = `Tarea # ${datos[0].numTask}`
    document.getElementById('averprueba').innerHTML = `
        <label for="recipient-name"  class="col-form-label">Name task:</label> 
        <textarea class="form-control" id="message-text2">${datos[0].nameTask}</textarea>
        <label for="recipient-name"  class="col-form-label">Description:</label> 
        <textarea class="form-control" id="message-text">${datos[0].descTask}</textarea>
        <label for="recipient-name"  class="col-form-label">Category:</label> 
        <select class="form-select" id = "cboCate" aria-label="Default select example">
        <option selected>Select...</option>
        <option value="1">Personal</option>
        <option value="2">Trabajo</option>
        </select>
        <br>
        <label for="recipient-name"  class="col-form-label">Status:</label> 
        <div class="form-check">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
        <label class="form-check-label" for="exampleRadios1">
        Pendiente
        </label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
        <label class="form-check-label" for="exampleRadios2">
        Terminado
        </label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" disabled>
        </div>`
        LlenarCbo()
      
}

function LlenarCbo() {
    const valorCombo = localStorage.getItem('cate');
    console.log(valorCombo);
  
    const comboElement = document.getElementById("cboCate"); // Obtén el elemento del combobox por su ID
  
    if (valorCombo === '1') {
      alert("Entro aquí");
      comboElement.selectedIndex = 1; // Selecciona la opción 1
    } else {
      comboElement.selectedIndex = 2; // Selecciona la opción 2
    }
  }

function state(state) {
    if (state === 1) {
        return "Creado"
    } else {
        return "Terminado"
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


function closeSession() {
    var nuevaPestana = window.open("../../index.html", "_blank");
    setTimeout(function () {
        window.open('about:blank', '_self').close();
    }, 2)
}


document.addEventListener('DOMContentLoaded', function () {
    getTask()
});

btnCreate.addEventListener('click', () => {
    postTask()
})

btnCerrar.addEventListener('click', () => {
    closeSession()
})

