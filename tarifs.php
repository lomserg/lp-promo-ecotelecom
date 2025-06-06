<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <pre>
<?php 
$tarifs = file_get_contents(__DIR__ . '/data/', 'tarifs.json');
var_dump($tarifs);
var_dump(__DIR__);
?>
</pre>
</body>

</html>