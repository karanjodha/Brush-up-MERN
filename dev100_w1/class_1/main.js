
// function printClock() {
//     let h = 0, m = 0, s = 0;

//     setInterval(() => {

//         console.log(`${h}:${m}:${s}`)
//         s++;
//         if (s == 60) {
//             m++;
//             s = 0;
//         }
//         if (m == 60) {
//             h++;
//             m = 0;
//         }
//         if (h == 24) {
//             h = 0;
//         }
//     }, 1000);



// }

function printClock() {
    setInterval(()=>{
        console.log(new Date().toLocaleTimeString());
    }, 1000);

}

printClock();