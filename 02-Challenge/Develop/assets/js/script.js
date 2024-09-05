// Retrieve tasks and nextId from localStorage
// ask
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const toDo = $('#todo-cards');
const inProgress = $('#in-progress-cards');
const doneCards = $('#done-cards');

const isForm = false;

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
        task.id = 1;
    }

    tasks.push(task);
    saveLocal(tasks);
    createTaskCard();
    cleanForm();
}

// Todo: create a function to create a task card
function createTaskCard() {

    // ask
    const todoList = $('#todo-cards');
    todoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();

    const tasks = loadData();

    if (tasks.length >= 0) {
        tasks.forEach(task => {

            const cardColumnEl = $('<div>');
            cardColumnEl.addClass('col-12 col-sm-4 col-md-3 col-lg-4 m-1 dif').attr('data-project-id', task.id);

            const cardEl = $('<div>');
            cardEl.addClass('card h-100  toDo');
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


            const buttomDelete = $('<p>')
                .append('<button type="button" onclick="handleDeleteTask()" class="btn btn-danger delete" >Delete</button>')
                .attr('data-project-id', task.id);
            buttomDelete.appendTo(cardBodyEl);

            if (task.status === "toDo") {
                toDo.append(cardColumnEl);

            } else if (task.status === "in-progress") {
                inProgress.append(cardColumnEl);
            } else {
                doneCards.append(cardColumnEl);
            }

        });
    }


}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // ask
    $(".dif").draggable({
        helper: "original"
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    // ask


}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
                                // can i change this?
    const projectId = $(this).attr('data-project-id');
    const projects = loadData();

    console.log("projectId",projectId);
    

    projects.forEach((project) => {
        if (project.id === projectId) {
            projects.splice(projects.indexOf(project), 1);
        }
    });

    saveLocal(projects);
    createTaskCard();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

    const tasks = loadData();

    // ask
    //   const taskId = ui.draggable[0].dataset.projectId;

    const taskId = ui.draggable[0].attributes[1].value;

    const newStatus = event.target.id;

    for (let task of tasks) {
        if (task.id == taskId) {
            task.status = newStatus;
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    createTaskCard();
}

function cleanForm() {
    document.getElementById("formModal").reset();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
});

createTaskCard();

$('.lane').droppable(
    {
        accept: '.dif',
        drop: handleDrop,
    });

$(function () {
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true
    });
});
