let nameUser = localStorage.getItem('user');
async function getTask() {
    const response = await fetch('http://localHost:1234/task/get')
    const datos = await response.json()
    datos.forEach(datos => {
        const formattedDate =  newDate(datos.dateStart)
        let div = document.createElement('div');
        div.innerHTML = `
            <div class="tarjet" data-bs-toggle="modal" data-bs-target="#miModal">
            <div class="contenido"> 
            <h3>${datos.nameTask}</h3>
            <p>categoria: ${datos.cateTask} </p>
            <p>Fecha de creacion: ${formattedDate}</p>
            <p>Estado: ${datos.stateTask}</p>
            </div>
        </div>
                    `;
        document.getElementById('container').appendChild(div);
    });
};

var tarjetas = document.getElementsByClassName('tarjet');

for (var i = 0; i < tarjetas.length; i++) {
    tarjetas[i].addEventListener('click', function () {

    });
}

async function getDocUser() {
    const data = await fetch('http://localHost:1234/task/' + nameUser)
    const datos = await data.json()
    const docUser = datos[0].docUser
    return docUser

}
const btnCreate = document.getElementById('createTask');

async function postTask() {

    const datos = await getDocUser();
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
location.reload()
    } catch (error) {
        console.log(error)
    }
}

function newDate(date){
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


