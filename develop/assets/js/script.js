// Retrieve tasks and nextId from localStorage
// ask
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));


const toDo = $('#todo-cards');
const inProgress = $('#in-progress-cards');
const doneCards = $('#done-cards');

let avoidLog = false;

const task = {
    id: null,
    title: null,
    date: null,
    description: null,
    status: null
};

function saveLocal(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadData() {
    let loadData = JSON.parse(localStorage.getItem('tasks'));

    if (!loadData) {
        loadData = [];
    }

    return loadData;
}

// Todo: create a function to generate a unique task id
function generateTaskId() {

    const title = $('#title');
    const date = $('#datepicker');
    const description = $('#description');

    const tasks = loadData();

    const task = {
        id: null,
        title: title.val(),
        date: date.val(),
        description: description.val(),
        status: "toDo"
    };

    if (tasks.length > 0) {
        task.id = tasks.length + 1;
    } else {
        // avoidLog = true;
        task.id = 1;
    }

    tasks.push(task);

    saveLocal(tasks);
    createTaskCard();
    cleanForm();
}

// Todo: create a function to create a task card
// function createTaskCard() {

//     const todoList = $('#todo-cards');
//     todoList.empty();

//     const inProgressList = $('#in-progress-cards');
//     inProgressList.empty();

//     const doneList = $('#done-cards');
//     doneList.empty();

//     const tasks = loadData();

//     if (tasks.length > 0) {
//         tasks.forEach(task => {

//             const cardColumnEl = $('<div>');
//             cardColumnEl
//                 .addClass('col-12 col-sm-4 col-md-3 col-lg-4 m-1 dif')
//                 .attr('data-project-id', task.id);

//             const cardEl = $('<div>');
//             cardEl.addClass('card h-100  toDo');

//             if (task.date && task.status !== 'done') {
//                 const now = dayjs();
//                 const taskDueDate = dayjs(task.date, 'DD/MM/YYYY');

//                 if (now.isSame(taskDueDate, 'day')) {
//                     cardEl.addClass('bg-warning text-white');
//                 } else if (now.isAfter(taskDueDate)) {
//                     cardEl.addClass('bg-danger text-white');
//                 }
//             }

//             cardEl.appendTo(cardColumnEl);

//             const cardName = $('<h5>')
//                 .addClass('card-header')
//                 .text(task.title);
//             cardName.appendTo(cardEl);

//             const cardBodyEl = $('<div>');
//             cardBodyEl.addClass('card-body');
//             cardBodyEl.appendTo(cardEl);

//             const cardDescription = $('<p>').addClass('card-text').text(task.description);
//             cardDescription.appendTo(cardBodyEl);

//             const cardDate = $('<p>').addClass('card-text date').text(task.date);
//             cardDate.appendTo(cardBodyEl);

//             const buttomDelete = $('<button>')
//             buttomDelete.addClass('btn btn-danger delete')
//                 .text("Delete")
//                 .attr('data-project-id', task.id);
//             buttomDelete.appendTo(cardBodyEl);
            


//             // const buttomDelete = $('<p>')
//             //     .append('<button type="button" onclick="displayButtons(this)" class="btn btn-danger delete" >Delete</button>')
//             //     .attr('data-project-id', task.id);
//             //     buttomDelete.appendTo(cardBodyEl);



//             if (task.status === "toDo") {
//                 toDo.append(cardColumnEl);

//             } else if (task.status === "in-progress") {
//                 inProgress.append(cardColumnEl);
//             } else {
//                 doneCards.append(cardColumnEl);
//             }

//         });
//     } else {
//         avoidLog = true;
//     }
// }

function createTaskCard() {
    const todoList = $('#todo-cards');
    const inProgressList = $('#in-progress-cards');
    const doneList = $('#done-cards');

    todoList.empty();
    inProgressList.empty();
    doneList.empty();

    const tasks = loadData();

    if (tasks.length > 0) {
        tasks.forEach(task => {
            const cardColumnEl = $('<div>');
            cardColumnEl
                .addClass('col-12 col-sm-4 col-md-3 col-lg-4 m-1 dif')
                .attr('data-project-id', task.id);

            const cardEl = $('<div>');
            cardEl.addClass('card h-100 toDo');

            if (task.date && task.status !== 'done') {
                const now = dayjs();
                const taskDueDate = dayjs(task.date, 'DD/MM/YYYY');

                if (now.isSame(taskDueDate, 'day')) {
                    cardEl.addClass('bg-warning text-white');
                } else if (now.isAfter(taskDueDate)) {
                    cardEl.addClass('bg-danger text-white');
                }
            }

            cardEl.appendTo(cardColumnEl);

            const cardName = $('<h5>')
                .addClass('card-header')
                .text(task.title);
            cardName.appendTo(cardEl);

            const cardBodyEl = $('<div>');
            cardBodyEl.addClass('card-body');
            cardBodyEl.appendTo(cardEl);

            const cardDescription = $('<p>').addClass('card-text').text(task.description);
            cardDescription.appendTo(cardBodyEl);

            const cardDate = $('<p>').addClass('card-text date').text(task.date);
            cardDate.appendTo(cardBodyEl);

            const buttonDelete = $('<button>')
                .addClass('btn btn-danger delete')
                .text("Delete")
                .attr('data-project-id', task.id);
            buttonDelete.appendTo(cardBodyEl);

            if (task.status === "toDo") {
                todoList.append(cardColumnEl);
            } else if (task.status === "in-progress") {
                inProgressList.append(cardColumnEl);
            } else {
                doneList.append(cardColumnEl);
            }
        });
        $('.delete').on('click', handleDeleteTask);
    }
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // ask}
}
// Todo: create a function to handle adding a new task
function handleDeleteTask(event) {
    const idDelete = event.target.getAttribute('data-project-id');
    let tasks = loadData();

    // Filtramos las tareas para eliminar la que coincide con el id
    tasks = tasks.filter(task => task.id != idDelete);

    // Guardamos la lista de tareas actualizada en localStorage
    saveLocal(tasks);

    // Volvemos a crear las tarjetas
    createTaskCard();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

    const idDelete = event.target.getAttribute('data-project-id');
    const tasks = loadData();

    tasks.forEach((task) => {
        if (task.id == idDelete) {
            tasks.splice(tasks.indexOf(task), 1);
        }
    });

    saveLocal(tasks);
    createTaskCard();
    // window.location.reload();
}

$(function() {
    console.log("here");
    
    $(".lane").droppable({
        accept: ".dif", // Acepta solo elementos con la clase .dif
        drop: function(event, ui) {
            handleDrop(event, ui); // Maneja el evento de caída
        }
    });
});

$(function() {
    $(".dif").draggable({
        helper: "clone", // Usa un clon del elemento arrastrable
        revert: "invalid", // Revierte el arrastre si no es válido
        start: function(event, ui) {
            ui.helper.addClass('dragging'); // Opcional: añadir una clase durante el arrastre
        }
    });
});



// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const tasks = loadData();
    const taskId = ui.draggable.data('project-id'); 
    const newStatus = $(event.target).attr('id'); 

    tasks.forEach(task => {
        if (task.id == taskId) {
            task.status = newStatus; 
        }
    });

    saveLocal(tasks); 
    createTaskCard(); 
}

function cleanForm() {
    document.getElementById("formModal").reset();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
});

createTaskCard();

$(function () {
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true
    });
});

