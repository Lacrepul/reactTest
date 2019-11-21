<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Notebook</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Liu+Jian+Mao+Cao&display=swap" rel="stylesheet">
        <style>
            #header{
                text-align:center;
                font-family: 'Liu Jian Mao Cao', cursive; 
                font-size:80px; 
                color:grey;
            }
            #container{
                width:300px;
                margin-top:3%;
            }
            .btn{
                width:270px;
            }
        </style>
    </head>
    <body>
        <div id="header" class="text">NOTEBOOK</div>
        <div id="app"></div>
        <script src="{{mix('js/marsh.js')}}" ></script>
    </body>
</html>