document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const message = document.getElementById('message');

    message.textContent = ""; // メッセージの初期化

    // デモ用ログイン判定
    if (user === "admin" && pass === "password123") {
        alert("ログイン成功！");
        // 履歴を上書きして遷移（戻るボタンで戻らせない場合はreplace）
        window.location.assign("dashboard.html"); 
    } else {
        message.textContent = "ユーザー名またはパスワードが正しくありません。";
        document.getElementById('password').value = ""; // パスワードのみクリア
    }
});