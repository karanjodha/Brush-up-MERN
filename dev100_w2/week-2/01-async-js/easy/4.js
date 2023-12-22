

const fs = new require('fs')

let data = "this is updated data"

console.log("before code")

fs.writeFile("sample.txt", data, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log(fs.readFileSync("sample.txt","utf8"))
    }
})

console.log("done");