
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);



matrix = [] 


function matrixGen(matY, matX, khot, khotaker, gishatich, Lava, LavaUtox ) {
    for (let i = 0; i < matY; i++) {
        matrix[i] = [];
        for (let j = 0; j < matX; j++) {
            matrix[i][j] = 0
        }
    }

    for (let i = 0; i < khot; i++) {

        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < khotaker; i++) {

        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < gishatich; i++) {

        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    for (let i = 0; i < Lava; i++) {

        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }
    for (let i = 0; i < LavaUtox; i++) {

        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
    }
    return matrix
}

matrixGen(90, 110, 5000, 50, 150,16,50);


    io.sockets.emit('send matrix', matrix)
    
     Grass = require("./grass")
     GrassEater = require("./grasseater")
     Gishatich = require("./gishatich.js")
     Lava = require("./lava.js")
     LavaUtox = require("./lavautox.js")

    function createObject(matrix) {
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 1) {
                    matrix[y][x] = new Grass(x, y, 1);
                }
                else if (matrix[y][x] == 2) {
                    matrix[y][x] = new GrassEater(x, y, 2);
                }
                else if (matrix[y][x] == 3) {
                    matrix[y][x] = new Gishatich(x, y, 3);
                }
                else if (matrix[y][x] == 4) {
                    matrix[y][x]=new Lava(x, y,4);
                }
                else if (matrix[y][x] == 5){
                    matrix[y][x]= new LavaUtox(x, y,5);
                }
            }
        }
  
        io.sockets.emit('send matrix', matrix)


    }



    function game() {
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                var obj = matrix[y][x];
    
                if (obj.index == 1) {
                    obj.mul();
                }
    
                else if (obj.index == 2) {
                    obj.eat();
                }
                else if (obj.index == 3) {
                    obj.eat();
                    // obj.mul();
                }
                else if (obj.index == 4) {
                    for (var i = 0; i<1; i++){
                        if(i<10){
                            obj.mul();
                        }
                    }
                }
                else if (obj.index == 5){
                    obj.eat();
                    
                }
            }
        }
        io.sockets.emit("send matrix", matrix);
    }

   
    setInterval(game, 1000)
    


io.on('connection', function (socket) {
    createObject(matrix)
})

