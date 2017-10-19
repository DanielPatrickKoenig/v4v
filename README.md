# v4v
v4v is a library for vector drawing and svg manipulation

To get started reference v4v.js in your file.

For a simple test put the following code into a file

<html>
    <head>
        <script src="js/v4v.js"></script>
        <script>
        v4v.ready(function(){
            var stage = v4v.stage(document.getElementById("v4vexample"));
            v4v.circle(stage,{cx:20,cy:30,r:10,fill:"#cc0000"}).Drag();
            v4v.rect(stage,{x:90,y:70,width:100,height:200,stroke:"#00cc00",fill:"transparent"}).Drag();
        });
        </script>
    </head>
    <body>
        <svg id="v4vexample" style="width:1000px;height:700px;">
        </svg>
    </body>
</html>

Check out the examples for more.
