<?php
    session_start();

    class scoresContr{
        private $uid;
        private $scores;

        public function __construct($uid, $scores) {
            $this->uid = $uid;
            $this->scores = $scores;

        }
        public function getUserscores() {
            
        }
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Score</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
    <link rel="stylesheet" type="text/css" href="score.css">
</head>
<body>


    <div class="sum-score">
        <section class="table_header">
        <h2>Code Junior Score</h2>
        </section>
        <?php
        if(isset($_SESSION["userid"])) {
        ?>  
        <h1><?php echo $_SESSION["useruid"]; ?></h1>
        <?php
        }
        ?>
        <section class="table_body">
        <table>
            <tr>
                <td>C</td>
                <td>Best Score</td>
            </tr>
            <tr>
                <td>PYTHON</td>
                <td>Best Score</td>
            </tr>
            <tr>
                <td>JAVA</td>
                <td>Best Score</td>
            </tr>
            <tr>
                <td>JAVA SCRIPT</td>
                <td>Best Score</td>
            </tr>
            <tr>
                <td>HTML</td>
                <td>Best Score</td>
            </tr>
            <tr>
                <td>CSS</td>
                <td>Best Score</td>
            </tr>
        </table>
    </section>
</body>
</html>
