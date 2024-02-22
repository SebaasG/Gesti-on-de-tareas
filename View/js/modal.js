

// async function getTask() {
//     await fetch('http://localHost:1234/task/get')
//         .then(response => response.json())



//         // .then(response => console.log(response.body))

//         .then(tareas => {
//             // Crear tarjetas para cada tarea
//             tareas.forEach(tarea => {
//                 let div = document.createElement('div');
//                 div.innerHTML = `
//             <div class="tarjet" data-bs-toggle="modal" data-bs-target="#miModal">
//             <h2>prueba</h2>
//             <p>categoria: </p>
//             <p>Fecha de creacion</p>
//             <p>Estado:</p>
//         </div>
//                     `;
//                 document.getElementById('container').appendChild(div);
//             });
//         });
// }
// var tarjetas = document.getElementsByClassName('tarjet');

// for (var i = 0; i < tarjetas.length; i++) {
//     tarjetas[i].addEventListener('click', function () {

//         // Aquí puedes agregar cualquier acción que desees que ocurra cuando se presione el elemento.
//     });
// }
// document.addEventListener('DOMContentLoaded', function () {
//     getTask()
// });


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

        // Aquí puedes agregar cualquier acción que desees que ocurra cuando se presione el elemento.
    });
}
document.addEventListener('DOMContentLoaded', function () {
    getTask()
});
