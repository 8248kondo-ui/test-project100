// 画面読み込み時の処理
window.onload = function() {
    displayTodos();
    
    // ボタンのクリックイベントを登録
    document.getElementById('addBtn').addEventListener('click', addTodo);
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Enterキー入力の検知
    document.getElementById('todoInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTodo();
    });
};

// TODOを追加する
function addTodo() {
    const input = document.getElementById('todoInput');
    const taskText = input.value.trim();
    if (!taskText) return;

    const todos = getTodos();
    const newTodo = { text: taskText, completed: false };
    todos.push(newTodo);
    
    saveTodos(todos);
    input.value = "";
    displayTodos();
}

// TODOを表示する
function displayTodos() {
    const list = document.getElementById('todoList');
    const todos = getTodos();
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        const text = typeof todo === 'string' ? todo : todo.text;
        const isCompleted = todo.completed === true;

        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${isCompleted ? 'checked' : ''}>
            <span class="todo-text ${isCompleted ? 'completed' : ''}">${text}</span>
            <button class="delete-btn">削除</button>
        `;

        // チェックボックスとテキストにクリックイベント（完了切り替え）を設定
        const toggleElements = li.querySelectorAll('input[type="checkbox"], .todo-text');
        toggleElements.forEach(el => {
            el.onclick = () => toggleTodo(index);
        });

        // 削除ボタンにイベントを設定
        li.querySelector('.delete-btn').onclick = () => deleteTodo(index);

        list.appendChild(li);
    });
}

// 完了切り替え
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

// 削除
function deleteTodo(index) {
    const todos = getTodos();
    todos.splice(index, 1);
    saveTodos(todos);
    displayTodos();
}

// ログアウト
function logout() {
    window.location.href = "login.html";
}

// データの取得と保存を共通化（ヘルパー関数）
function getTodos() {
    return JSON.parse(localStorage.getItem('myTodos')) || [];
}
function saveTodos(todos) {
    localStorage.setItem('myTodos', JSON.stringify(todos));
}