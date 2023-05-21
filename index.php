<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log-int</title>
    <link rel="stylesheet" href="logintest.css">

</head>
<body>

<form action="includes/signup.inc.php" method="post">
	<div class="form-structor">
		<div class="signup">
			<h2 class="form-title" id="signup">Sign up</h2>
			<div class="form-holder">
				<input type="text" name="uid" class="input" placeholder="Username" />
				<input type="password" name="pwd" class="input" placeholder="Password" />
				<input type="password" name="pwdRepeat" class="input" placeholder="Repeat Password" />
				<input type="text" name="email" class="input" placeholder="Email" />
			</div>
			<button name="submit" class="submit-btn">Sign up</button>
			
			</div>
		</form>
		
		<form action="includes/login.inc.php" method="post">
		<div class="login slide-up">
			<div class="center">
				<h2 class="form-title" id="login">Log in</h2>
				<div class="form-holder">
					<input type="text" name="uid" class="input" placeholder="Username" />
					<input type="password" name="pwd" class="input" placeholder="Password" />
				</div>
				<button name="submit" class="submit-btn">Log in</button>
			</div>
		</div>
	</div>
</form>

<script src="logintest.js"></script>
</body>
</html>