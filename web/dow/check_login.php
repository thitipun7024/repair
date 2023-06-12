<?php
session_start();
 
// Function to securely hash the password
function hashPassword($password) {
    $options = [
        'cost' => 10,
    ];
    return password_hash($password, PASSWORD_BCRYPT, $options);
}
 
// Function to verify the hashed password
function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}
 
// Validate the submitted credentials
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
 
    // Connect to the database (replace with your own connection code)
    include_once("connect.php");
 
    // Prepare and execute a SQL statement using a prepared statement
    $stmt = $conn->prepare("SELECT password FROM login WHERE username ='".$_SESSION["username"]."' ");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($hashedPassword);
    $stmt->fetch();
 
    // Verify the password
    if (verifyPassword($password, $hashedPassword)) {
        // Login successful, set up session
        $_SESSION['username'] = $username;
        echo "Login successful!";
        // Redirect to a secure page
        header("Location: dashboard.php");
        exit();
    } else {
        // Login failed, display error message
        echo "Invalid username or password.";
    }
 
    $stmt->close();
    $conn->close();
}
?>