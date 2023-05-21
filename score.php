<?php
session_start();

// Check if the user is logged in and the score is submitted
if (isset($_SESSION["userid"]) && isset($_POST['submit'])) {
    // เข้ารหัสผู้ใช้เป็นตัวแปร uid
    $uid = $_SESSION["userid"];
    
    // เปลี่ยนชื่อตัวแปร $userid เป็น $uid
    $uid = $_SESSION["userid"];

    // เชื่อมต่อฐานข้อมูล
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "ooplogin";

    // ฟังก์ชันเรียกใช้สคริปต์เพื่อเปิดการเชื่อมต่อฐานข้อมูล
    $conn = mysqli_connect($servername, $username, $password, $dbname);

    // ตรวจสอบการเชื่อมต่อฐานข้อมูล
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // ดึงค่าคะแนนจากฟอร์มที่ส่งมา
    $score = $_POST['score'];

    // อัปเดตคะแนนของผู้ใช้ในฐานข้อมูล
    $sql = "UPDATE users SET users_score = $score WHERE users_id = $uid";

    if (mysqli_query($conn, $sql)) {
        echo "Score updated successfully";
    } else {
        echo "Error updating score: " . mysqli_error($conn);
    }

    // ปิดการเชื่อมต่อฐานข้อมูล
    mysqli_close($conn);
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Game</title>
</head>

<body>
    <h1>Quiz Game</h1>

    <?php
    if (isset($_SESSION["userid"])) {
        ?>
        <form id="score-form" action="score.php" method="POST">
            <input type="hidden" name="score" id="score-input">
        </form>

    <script>
    // Automatically submit the form after setting the score value
    document.getElementById("score-input").value = score; // Assuming the score is stored in the 'score' variable
    document.getElementById("score-form").submit();
    </script>
    <?php
    } else {
        echo "Please log in to submit your score.";
    }
    ?>
</body>

</html>