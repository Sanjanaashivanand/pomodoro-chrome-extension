const startTimerBtn = document.getElementById("start")

startTimerBtn.addEventListener("click", () => {
    chrome.storage.local.get(["isRunning"], (res) => {
        chrome.storage.local.set({
            isRunning: !res.isRunning,
        }, () => {
            startTimerBtn.textContent = res.isRunning ? "Stop" : "Start"
        })
    })
})

const resetTimerBtn = document.getElementById("reset")

resetTimerBtn.addEventListener("click", () => {
    chrome.storage.local.get(["isRunning", "timer"], (res) => {
        chrome.storage.local.set({
            isRunning: false,
            timer: 0
        }, () => {
            startTimerBtn.textContent = "Start"
        })
    })
})

const skipBtn = document.getElementById("skip")

skipBtn.addEventListener("click", () => {
    chrome.storage.local.get(["isRunning", "timer", "isBreak"], (res)=>{
        chrome.storage.local.set({
            isRunning: false,
            isBreak: !res.isBreak,
            timer: 0,
        }, () => {
            updateTime()
        })
    })
})


function updateTime() {
    chrome.storage.local.get(["timer", "workTime", "breakTime", "isBreak"], (res) => {
        let displayTime = res.isBreak ? res.breakTime : res.workTime;
        const heading = document.getElementById("headline");
        heading.textContent = res.isBreak ? "Break Time! :)" : "Productivity Time!"
        const timer = document.getElementById("timer");
        const minutes = `${displayTime - Math.ceil(res.timer / 60)}`.padStart(2, "0");
        let seconds = "00"
        if(res.timer % 60!=0){
            seconds = `${60 - res.timer % 60}`.padStart(2, "0");
        }
        timer.textContent = `${minutes}:${seconds}`;
    })
}

updateTime()
setInterval(updateTime,1000)