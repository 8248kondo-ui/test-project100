document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // フォームの標準送信をキャンセル

    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const message = document.getElementById('message');

    // 本来はここでサーバーに問い合わせます（以下はデモ用）
    if (user === "admin" && pass === "password123") {
        alert("ログイン成功！管理画面へ移動します。");
        // window.location.href = "dashboard.html"; // 成功時の遷移先
    } else {
        message.textContent = "ユーザー名またはパスワードが正しくありません。";
    }
});