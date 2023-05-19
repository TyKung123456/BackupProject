<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Junior</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"rel="stylesheet" 
    integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lilita+One&display=swap" rel="stylesheet">
</head>
<body style="background-image: url('images/wall.png'); background-size: 100% auto;min-height: 100vh; background-repeat: no-repeat, repeat; color:white";  font-family:  >

    <div class="header">  
        <div class="signin"> 
            <?php
                if(isset($_SESSION["userid"]))
                {
            ?>
                <li><a href="#"></a><?php echo $_SESSION["useruid"]; ?></a></li>
                <li><a href="includes/logout.inc.php" class="header-login-a">LOGOUT</a></li>
            <?php
                }
                else
                {
            ?>
                <li><a href="#"></a></li>
                <li><a href="#" class="header-login-a"></a></li>
            <?php
                }
            ?>
         
        </div>
    </div>


   <h4>CODE JUNIOR ★</h4>

<div class="quiz-select">
    <p>✨ Let's test our code ✨</p><br>
    <div class="link_wrapper">
    <ul>
       <li><a href="lang_c.html" class="btn border"> <img src="images/P1.png" width="85" alt="yeah">C</a></li> 
       <li><a href="lang_python.html" class="btn border "><img src="images/P3.png" width="85" alt="yeah">PYTHON</li></a> 
       <li><a href="lang_html.html" class="btn border "><img src="images/P2.png" width="85" alt="yeah">HTML</a></li>
    </ul>
    <ul>
       <li><a href="lang_java.html" class="btn border"><img src="images/P4.png" width="120"  alt="yeah">JAVA</a></li>
       <li><a href="lang_css.html" class="btn border "><img src="images/P5.png" width="85" alt="yeah">CSS</a></li>
       <li><a href="lang_js.html" class="btn border "><img src="images/P6.png" width="85" alt="yeah">JAVA SCRIPT</a></li>
       <li><a href="score.php" class="btn border "><img src="images/P6.png" width="85" alt="yeah">Score</a></li>
    </ul>
    </div>
    
</div>

<script src="script.js"></script>

</div>

</body>
</html>

