let  general = require('./general.js')
module.exports = class Grass extends general{
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 5;
    }
    mul() {
        this.multiply++;
        if (this.multiply >= 10) {
            let emptyCells = super.chooseCell(0)
            let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            if (this.multiply >= 5 && newCell) {
                let x = newCell[0]
                let y = newCell[1]
                matrix[newCell[1]][newCell[0]] = 1;
                var gr = new Grass(x, y, 1)
                grassArr.push(gr)
                this.multiply = 0;
            }
        }
    }
}
