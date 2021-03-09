
var socket = io();
var side = 12;

function setup() {
    createCanvas(40 * side, 40 * side);
    background("#acacac");
}



function nkarel(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                // console.log(matrix[1])
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("red");
                rect(x * side, y * side, side, side);
            }



        }

    }
}



setInterval(
    function () {
        socket.on('send matrix', nkarel)
    }, 1000
)

function kill() {
    socket.emit("kill")
}
function addgrEater() {
    socket.emit("add grass eater")
}
function addlava() {
    socket.emit("add lava")
}