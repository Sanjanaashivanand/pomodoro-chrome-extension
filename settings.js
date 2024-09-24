const workTime = document.getElementById("work-time")
workTime.addEventListener("change", (event)=>{
    const val = event.target.value;
    if(val<1 || val>60 ){
        workTime.value = 25
    }
})

const breakTime = document.getElementById("break-time")
breakTime.addEventListener("change", (event) => {
    const val = event.target.value;
    if(val<1 || val>15){
        breakTime.value = 5
    }
})

const saveBtn = document.getElementById("save-btn")
saveBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        breakTime: breakTime.value,
        workTime: workTime.value,
        timer: 0,
        isRunning: false
    })
})

chrome.storage.local.get(["workTime", "breakTime"], (res)=>{
    workTime.value = res.workTime
    breakTime.value = res.breakTime
})