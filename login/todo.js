// 1. 画面表示時に保存データを読み込む
window.onload = function() {
    displayTodos();
};

// 2. TODOを追加する
function addTodo() {
    const input = document.getElementById('todoInput');
    const task = input.value.trim();
    if (!task) return;

    const todos = JSON.parse(localStorage.getItem('myTodos')) || [];
    todos.push(task);
    localStorage.setItem('myTodos', JSON.stringify(todos));
    
    input.value = "";
    displayTodos();
}

// 3. TODOを表示する
function displayTodos() {
    const list = document.getElementById('todoList');
    const todos = JSON.parse(localStorage.getItem('myTodos')) || [];
    
    list.innerHTML = "";
    todos.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task}
            <button class="delete-btn" onclick="deleteTodo(${index})">削除</button>
        `;
        list.appendChild(li);
    });
}

// 4. TODOを削除する
function deleteTodo(index) {
    const todos = JSON.parse(localStorage.getItem('myTodos')) || [];
    todos.splice(index, 1);
    localStorage.setItem('myTodos', JSON.stringify(todos));
    displayTodos();
}

// 5. ログアウト
function logout() {
    window.location.href = "login.html";
}