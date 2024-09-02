
// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const toDo = $('#todo-cards');

const isForm = false;
const tasks = [];

const task = {
    id: null,
    title: null,
    date: null,
    description: null
};

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const title = $('#title');
    const date = $('#datepicker');
    const description = $('#description');

    const task = {
        id: null,
        title: title.val(),
        date: date.val(),
        description: description.val()
    };

    if (tasks.length > 0) {
        task.id = tasks.length + 1;
    } else {
        task.id = 1;
    }

    tasks.push(task);
    createTaskCard(task);
    cleanForm();

}

// Todo: create a function to create a task card
function createTaskCard(tasks) {

    const cardColumnEl = $('<div>');
    cardColumnEl.addClass('col-12 col-sm-4 col-md-3 col-lg-4 m-1');

    const cardEl = $('<div>');
    cardEl.addClass('card h-100  toDo');
    cardEl.appendTo(cardColumnEl);

    const cardName = $('<h5>')
        .addClass('card-header')
        .text(tasks.title);
    cardName.appendTo(cardEl);

    const cardBodyEl = $('<div>');
    cardBodyEl.addClass('card-body');
    cardBodyEl.appendTo(cardEl);

    const cardDescription = $('<p>').addClass('card-text').text(tasks.description);
    cardDescription.appendTo(cardBodyEl);

    const cardDate = $('<p>').addClass('card-text date').text(tasks.date);
    cardDate.appendTo(cardBodyEl);


    const buttomDelete = $('<p>').append('<button type="button" class="btn btn-danger delete" >Delete</button>');
    buttomDelete.appendTo(cardBodyEl);

    toDo.append(cardColumnEl);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $("#todo-cards").draggable();
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {



    event.preventDefault();
    const button = $(this);

    console.log(this);

    button.parent().remove();
}

// shoppingListEl.on('click', '.delete' , function (event) {
//     // event.preventDefault();
//     const button=$(this);
//     button.parent().parent().parent().remove();
//   });

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});

$(function () {
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true
    });
});

function cleanForm() {
    document.getElementById("formModal").reset();
}