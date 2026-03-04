// 画面読み込み時に保存されたTODOを表示
window.onload = function() {
    displayTodos();
};

// TODOを追加する関数
function addTodo() {
    const input = document.getElementById('todoInput');
    const task = input.value.trim();

    if (task === "") return; // 空入力は無視

    // ローカルストレージから既存のリストを取得（なければ空配列）
    const todos = JSON.parse(localStorage.getItem('myTodos')) || [];
    
    // 新しいタスクを追加
    todos.push(task);
    
    // ローカルストレージに保存
    localStorage.setItem('myTodos', JSON.stringify(todos));
    
    input.value = ""; // 入力欄をクリア
    displayTodos();   // リストを再描画
}

// TODOを表示する関数
function displayTodos() {
    const listElement = document.getElementById('todoList');
    const todos = JSON.parse(localStorage.getItem('myTodos')) || [];
    
    // リストを一度空にする
    listElement.innerHTML = "";

    todos.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task}
            <button class="delete-btn" onclick="deleteTodo(${index})">削除</button>
        `;
        listElement.appendChild(li);
    });
}

// TODOを削除する関数
function deleteTodo(index) {
    const todos = JSON.parse(localStorage.getItem('myTodos')) || [];
    todos.splice(index, 1); // 指定した要素を削除
    localStorage.setItem('myTodos', JSON.stringify(todos));
    displayTodos();
}

function logout() {
    location.href = "login.html"; // ログイン画面へ戻る
}