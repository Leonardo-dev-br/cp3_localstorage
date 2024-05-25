
const form = document.getElementById("todo-form");
const newTask = document.getElementById("new-task");
const todoList = document.getElementById("todo-list");

// Adiciona um listener ao formulário para capturar a submissão
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o recarregamento da página ao submeter o formulário
    addTask(newTask.value); // Adiciona a nova tarefa
    newTask.value = ''; // Limpa o campo de input
});

// Função para adicionar uma nova tarefa
function addTask(taskText) {
    // Cria os elementos necessários para a nova tarefa
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = taskText;
    span.classList.add('todo-item');

    // Cria um botão de remover
    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Ícone de lixeira
    removeButton.classList.add('remove-btn');

    // Adiciona um listener ao botão de remover
    removeButton.addEventListener('click', function() {
        li.remove();
        saveTasks(); // Salva a lista de tarefas atualizada
    });

    // Adiciona os elementos à lista
    li.appendChild(span);
    li.appendChild(removeButton);
    todoList.appendChild(li);
    saveTasks(); // Salva a nova tarefa no LocalStorage
}

// Função para salvar tarefas no LocalStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(function(li) {
        tasks.push({
            text: li.querySelector('.todo-item').textContent
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para carregar tarefas do LocalStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        addTask(task.text);
    });
}

// Carrega as tarefas ao carregar a página
document.addEventListener('DOMContentLoaded', loadTasks);
