

var side = 9;
var matrix = [];


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

dshjsdhds = true

// if (obj != 0 && obj.index != 5) {
//     kdfjdfikdfjfd = false;
// }

// if (true) {
//     sax meran
// }

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');


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
    // console.log(matrix);
}


function draw() {

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
    background("#acacac");
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            var obj = matrix[y][x];

            if (obj.index == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
                // console.log(obj)
            }
            else if (obj.index == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);

            }
            else if (obj.index == 3) {
                fill("#5d42f5");
                rect(x * side, y * side, side, side);
            }
            else if (obj.index == 4) {
                fill("#2f3019");
               rect(x * side, y * side, side, side);
            }
            else if (obj.index == 5) {
                fill("red");
               rect(x * side, y * side, side, side);
        }
    }





}
}
