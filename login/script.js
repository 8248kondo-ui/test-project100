document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // フォームの標準送信をキャンセル

    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const message = document.getElementById('message');

    // デモ用の判定ロジック
    if (user === "admin" && pass === "password123") {
        alert("ログイン成功！管理画面へ移動します。");
        // ここが重要：コメントアウトを外して有効化しました
        window.location.href = "./dashboard.html"; 
    } else {
        message.textContent = "ユーザー名またはパスワードが正しくありません。";
    }
});