const startEle = document.getElementById("start") 
const stopEle = document.getElementById("stop")
const reset = document.getElementById("reset")
const timerEle = document.getElementById("timer")
const headlineEle = document.getElementById("headline")

let interval 
let IsBreak = false
let remainingTime = IsBreak ? 300 : 1500
headlineEle.innerHTML= IsBreak ? "Break Time" : "Study Time"

function updateTime(){
    let mins = Math.floor(remainingTime/60)
    let secs = remainingTime%60
    let time = `${mins.toString().padStart(2, "0")}` + ":" + `${secs.toString().padStart(2, "0")}`

    timerEle.innerHTML = time
}

function startTimer(){
    interval = setInterval(()=>{
        remainingTime--;
        updateTime();
        if(remainingTime == 0){
            clearInterval(interval);
            if(IsBreak){
                alert("Time to get back to work!")
            }
            else{
                alert("God job! You deserve a break")
            }
            IsBreak = !IsBreak
            remainingTime=  IsBreak ? 300 : 1500
            headlineEle.innerHTML= IsBreak ? "Break Time" : "Study Time";
            updateTime();
        }
    },1000)
}

function stopTimer(){
    headlineEle.innerHTML= IsBreak ? "Break Time" : "Study Time";
    clearInterval(interval);
}

function resetTimer(){
    clearInterval(interval);
    remainingTime=  IsBreak ? 300 : 1500
    updateTime();
}

startEle.addEventListener("click", startTimer)
stopEle.addEventListener("click", stopTimer)
reset.addEventListener("click",resetTimer)