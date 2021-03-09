
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
const Gishatich = require('./gishatich');
const Grass = require('./grass');
const GrassEater = require('./grasseater');
const Lava = require('./lava');
const LavaUtox = require('./lavautox');

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(8000);

var value = 1000;

matrix = [] 

// matrix = [[2, 2, 1, 2, 1, 0, 1],
// [1, 2, 1, 0, 1, 1, 1],
// [1, 0, 2, 0, 1, 0, 1],
// [0, 1, 0, 1, 0, 0, 1],
// [1, 2, 1, 0, 1, 1, 1],
// [1, 0, 2, 0, 1, 0, 1],
// [0, 1, 0, 1, 0, 1, 1],
// [1, 2, 1, 0, 1, 1, 1],
// [1, 0, 2, 0, 1, 0, 1],
// [0, 1, 0, 1, 0, 0, 1],
// [1, 2, 1, 0, 1, 1, 1],
// [1, 0, 2, 0, 1, 0, 1],
// [0, 1, 0, 1, 0, 0, 1]]





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

matrixGen(40, 40, 70, 65, 25,12, 2);


    io.sockets.emit('send matrix', matrix)

    
    grassArr = []
    grassEaterArr = []
    GishatichArr = []
    LavaArr = []
    LavaUtoxArr = []
    
     grass = require("./grass.js")
     grassEater = require("./grasseater.js")
     gishatich = require("./gishatich.js")
     lava = require("./lava.js")
     lavaUtox = require("./lavautox.js")

    function createObject(matrix) {
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 1) {
                    var gr = new grass(x, y, 1);
                 
                    grassArr.push(gr)
                }
                else if (matrix[y][x] == 2) {
                    var grEater = new grassEater(x, y, 2);
                    
                    grassEaterArr.push(grEater)

                }
                else if (matrix[y][x] == 3) {
                    var gish = new gishatich(x, y, 3);
                   
                    GishatichArr.push(gish)
                }
                else if (matrix[y][x] == 4) {
                    var LAVA = new lava(x, y, 4);
                    LavaArr.push(LAVA)
                }
                else if (matrix[y][x] == 5) {
                    var Lavautox = new lavaUtox(x, y, 5);
                    LavaUtoxArr.push(Lavautox)
                

                }
            }
        }
  
        io.sockets.emit('send matrix', matrix)


    }



    function game() {
    
        for (var i in grassArr) {
            grassArr[i].mul()
        }
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
        for (var i in GishatichArr) {
           
            GishatichArr[i].eat()
        }
        for (var i in LavaArr) {
            LavaArr[i].eat();
        }
        for (var i in LavaUtoxArr) {
            LavaUtoxArr[i].eat();
        }
        io.sockets.emit("send matrix", matrix);
    }

   
    setInterval(game, value)

    function kill() {
        grassArr = [];
        grassEaterArr = []
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = 0;
                

            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    

    function addgrEater() {
        for (var i = 0; i < 7; i++) {   
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 2
                grassEaterArr.push(new GrassEater (x, y, 2))
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
  




io.on('connection', function (socket) {
    createObject(matrix)
    socket.on("kill", kill);
    socket.on("add grass eater", addgrEater);
})

var statistics = {};

setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.Gishatich = GishatichArr.length;
    statistics.Lava = LavaArr.length;
    statistics.LavaUtox = LavaUtoxArr.length;
    
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
    })
},1000)
