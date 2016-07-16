<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Memory Game</title>
    <script type="text/javascript" src="resource/jquery-3.0.0.min.js"></script>
    <script type="text/javascript" src="resource/d3.js"></script>
    <link rel="stylesheet" href="app/family.css" />
</head>
<body>
	%if name == 'World':
		<h1>Hello {{name}}!</h1>
	%else:
		<h1>Hello {{name.title()}}!</h1>
	%end
	<p>Welcome to a simple memory game. I hope you like it.</p>

    <font class="bodyText">Colored by Database.</font>
    <svg class="force"></svg>
	<button type="button" id="conn_count" onclick="conn_show()">Only Show 3+ Connections</button> 
	 

    <script type="text/javascript" src="app/mem_game.js"></script>

</body>
</html>
