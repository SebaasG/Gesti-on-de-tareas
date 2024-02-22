let docUser = localStorage.getItem('user');
async function getTask() {
    const response = await fetch('http://localHost:1234/task/get')
    const datos = await response.json()
    console.log(datos)

    datos.forEach(datos => {
        let div = document.createElement('div');
        div.innerHTML = `
            <div class="tarjet" data-bs-toggle="modal" data-bs-target="#miModal">
            <h2>${datos.nameTask}</h2>
            <p>categoria: ${datos.cateTask} </p>
            <p>Fecha de creacion: ${datos.dateStart}</p>
            <p>Estado: ${datos.stateTask}</p>
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

async function getDocUser(){

    const data = await fetch('http://localHost:1234/task/'+docUser)
    const datos = await data.json()
    console.log(datos)

}   
const btnCreate = document.getElementById('createTask');

async function postTask(){


    const nameTask = document.getElementById('document').value;
    const descTask = document.getElementById('description').value;
    const cateTask = document.getElementById('category').value; 

console.log(docUser,nameTask,descTask,cateTask)

// await fetch('http://localHost:1234/task/save'),{
// method:'POST',
// body: JSON.stringify({
//     "docUser":userData ,
//     "nameTask": nameTask,
//     "descTask": descTask,
//     "stateTask": 1,
//     "cateTask": cateTask
    
// }),
// headers: {
//     "Content-Type": "application/json"
// }
// }
// }
}


document.addEventListener('DOMContentLoaded', function () {
    getTask()
});

btnCreate.addEventListener('click',()=>{
    getDocUser()
})

