<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Memory Game</title>
    <script type="text/javascript" src="resource/jquery-3.0.0.min.js"></script>
    <script type="text/javascript" src="resource/d3.min.js"></script>

    <link rel="stylesheet" href="app/mem_game.css" />
</head>
<body>
	<h1>Hello {{name.title()}}!</h1>
	<p>Welcome to a simple memory game. I hope you like it.</p>
	Timer: <span id="timer">0</span>&nbsp;&nbsp;
	Score: <span id="score">?</span>&nbsp;&nbsp;
	Message: <span id="message"></span>&nbsp;&nbsp;
	<button onclick="gameDone();">Done!</button>&nbsp;&nbsp;
	<button onclick="setUpPage();" />Restart</button><br>&nbsp;&nbsp;<br>

    <svg id="force"></svg>

	<script type="text/javascript" src="app/mem_game_d3.js"></script>
    <script type="text/javascript" src="app/page_control.js"></script>

</body>
</html>
