document.addEventListener('DOMContentLoaded', () => {
    displayTodos();
    
    document.getElementById('addBtn')?.addEventListener('click', addTodo);
    document.getElementById('logoutBtn')?.addEventListener('click', logout);
    document.getElementById('todoInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });
});

function addTodo() {
    const input = document.getElementById('todoInput');
    const taskText = input.value.trim();
    if (!taskText) return;

    const todos = getTodos();
    todos.push({ text: taskText, completed: false });
    
    saveTodos(todos);
    input.value = "";
    displayTodos();
}

function displayTodos() {
    const list = document.getElementById('todoList');
    const todos = getTodos();
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        const text = typeof todo === 'string' ? todo : todo.text;
        const isCompleted = todo.completed === true;

        const li = document.createElement('li');
        li.innerHTML = `
            <label class="todo-item">
                <input type="checkbox" ${isCompleted ? 'checked' : ''}>
                <span class="todo-text ${isCompleted ? 'completed' : ''}"></span>
            </label>
            <button class="delete-btn">削除</button>
        `;

        // セキュリティ対策：テキストを安全に挿入
        li.querySelector('.todo-text').textContent = text;

        // イベント設定
        li.querySelector('input').onchange = () => toggleTodo(index);
        li.querySelector('.delete-btn').onclick = () => deleteTodo(index);

        list.appendChild(li);
    });
}

function toggleTodo(index) {
    const todos = getTodos();
    if (typeof todos[index] === 'string') {
        todos[index] = { text: todos[index], completed: true };
    } else {
        todos[index].completed = !todos[index].completed;
    }
    saveTodos(todos);
    displayTodos();
}

function deleteTodo(index) {
    const todos = getTodos();
    todos.splice(index, 1);
    saveTodos(todos);
    displayTodos();
}

function logout() {
    window.location.href = "login.html";
}

function getTodos() {
    return JSON.parse(localStorage.getItem('myTodos')) || [];
}

function saveTodos(todos) {
    localStorage.setItem('myTodos', JSON.stringify(todos));
}