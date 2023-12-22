const fs = new require('fs');

console.log("start")

fs.readFile("sample.txt", "utf-8", function(error, data){
    console.log(data)
})


console.log("before for")

for(i=0;i<1000000000;i++){}

console.log("end")