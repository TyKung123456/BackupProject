<?php

if(isset($_POST["submit"]))
{
    // Grabbing the data
    $uid = $_POST["uid"];
    $pwd = $_POST["pwd"];

    // instantiate loginContr class
    include "../classes/dbh.classes.php";
    include "../classes/login.classes.php";
    include "../classes/login-contr.classes.php";
    $login = new LoginContr($uid,$pwd);

    // running error and user login
    $login->loginUser();


    // going back to front page
    header("location: ../landingPage.php?error=none");
}