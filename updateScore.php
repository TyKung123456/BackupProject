<?php
    header('Access-Control-Allow-Origin: *'); 
    header("Content-Type: application/json; charset=UTF-8");
    $data = json_decode(trim(file_get_contents("php://input")));
    $user_id = $data->user_id;
    $score = $data->score;
    $game_name = $data->game_name;
    echo($user_id);
    echo($score);
    echo($game_name);

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
    //New Commers 
    $sql = "SELECT * FROM scoreboard WHERE users_uid = '$user_id' AND game_name = '$game_name'";

    $result = mysqli_query($conn, $sql);

    $count = mysqli_num_rows($result);

    if ($count > 0) {
        //Update
        $user_score = mysqli_fetch_assoc($result);
        if ($user_score["score"] < $score) {
        $sql = "UPDATE scoreboard SET score = $score WHERE users_uid = '$user_id' AND game_name = '$game_name'";
        if (mysqli_query($conn, $sql)) {
            echo "Score updated successfully";
        } else {
            echo "Error updating score: " . mysqli_error($conn);
        }
    }
    } else {
        //Insert
        $sql = "INSERT INTO `scoreboard`(`users_uid`, `game_name`, `score`) VALUES ('$user_id','$game_name','$score')";
        if (mysqli_query($conn, $sql)) {
            echo "Score insert successfully";
        } else {
            echo "Error inserting score: " . mysqli_error($conn);
        }
    }
    
    // ปิดการเชื่อมต่อฐานข้อมูล
    mysqli_close($conn);
?>