<?php
session_start();

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

 // อัปเดตคะแนนของผู้ใช้ในฐานข้อมูล
 $sql = 'SELECT * FROM `scoreboard` WHERE `users_uid`= '.$_SESSION["userid"].' AND `game_name` = "CSS"';

 $result = mysqli_query($conn, $sql);

 $user_score = mysqli_fetch_assoc($result);

 if (mysqli_num_rows($result) > 0) {
      $score = $user_score["score"];
 } else {
      $score = 0;
  
 }
 
 // ปิดการเชื่อมต่อฐานข้อมูล
 mysqli_close($conn);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>CODE JUNIOR Quiz</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
    <link rel="stylesheet" href="./langstyles.css.">

</head>

<body>

    <input type="hidden" name="userid" id="user_id" value="<?= $_SESSION["userid"];?>">
    <!-- partial:index.partial.html -->
    <h1>✨CODE JUNIOR Quiz✨</h1>
    <h2>Score : <span id="score-holder"><?=$score?></span></h2>
    <div class="question-container" id="question-container">
        <p class="question-container-question"> CSS ★ </p>
    </div>
    <div class="text-center">
        <p class="btn-center btn" id="main-btn">Start</p>


    </div>
    <!-- partial -->
    <script src="./lang_css.js"></script>

</body>

</html>