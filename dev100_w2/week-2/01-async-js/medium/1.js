const fs = new require('fs')

fs.readFile("sample2.txt","utf8",function(error, data){
    console.log(data)
    let updatedStr = data.replace(/\s+/g,' ').trim()

    console.log(updatedStr)
    console.log("updation done")


    fs.writeFile("sample2.txt", updatedStr, function(error){
        console.log("Inside write")
        console.log(fs.readFileSync("sample2.txt","utf8"))
    })


})