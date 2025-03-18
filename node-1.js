const fs = require('fs');

const a = 100;
Promise.resolve("promise").then(console.log);

fs.readFile("./file.txt","utf8",()=>{
    console.log("File Reading CB");
})

process.nextTick(()=>console.log("process"));

function printA(){
    console.log("a =",a);
}

printA();

console.log("last line of the file.")