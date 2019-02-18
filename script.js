const fs = require('fs');

var Lines = fs.readFileSync('input.txt', (err, data) => {
    if (err) throw err;
}).toString().split("\n"); // read input and store in an array line by line

let counter = 0; // number of dirt patches cleaned
var room_limit = [Lines[0][0], Lines[0][1]]; //wall limit
let line1 = Lines[1].split(" ");
const position = [line1[0], line1[1]]; // current position of hte vacuum

Lines.splice(0,2);

const commands = Lines[Lines.length - 1].split(""); //driving instructions for the vacuum

for (let i = 0; i < commands.length; i++) {

    switch(commands[i]){
        case "N": North(); break;
        case "E": East(); break;
        case "S": South(); break;
        case "W": West(); break;
    }
    checkForDirt(); //check if there is dirt in current postion
}

console.log(position + "\n" +counter);

function North(){
    position[1]++;
    if(!hasHitWall()){
        position[1]--;
    }
}

function East() {
    position[0]++;
    if(!hasHitWall()){
        position[0]--;
    }
}

function South() {
    position[1]--;
    if(!hasHitWall()){
        position[1]++;
    }
}


function West() {
    position[0]--;
    if(!hasHitWall()){
        position[0]++;
    }
}

function checkForDirt(){

    let index = Lines.indexOf(position[0] + " " + position[1]);
    if (index > -1) {
        counter++;
        if (index > -1) {
            Lines.splice(index, 1); //remove dirt patch coordinate from array
        }
    }
}

function hasHitWall() {
    if(position[0] > room_limit[0] || position[1] > room_limit[1]) return true;
}
