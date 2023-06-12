<?php
$servername = "localhost";
$username = "root";
$password = "root";
$database = "stock";

// Create a connection
$conn = new mysqli($servername, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Perform database operations
// Example: Selecting data from a table
$sql = "SELECT * FROM stock";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "id: " . $row['id'] . "<br>";
        echo "asset: " . $row['asset'] . "<br>";
        // Display other data fields as needed
    }
} else {
    echo "No results found.";
}

// Close the connection
$conn->close();
?>`