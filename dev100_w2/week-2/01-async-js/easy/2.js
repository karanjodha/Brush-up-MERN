


let i=0;

function time(){
    console.log(i++)
    setTimeout(time, 1000)
}

time();