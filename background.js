chrome.runtime.onInstalled.addListener(() => {
  // Request notification permission if not already granted
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
});


chrome.alarms.create("pomodoroTimer", {
  periodInMinutes : 1/60,
})

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer") {
    chrome.storage.local.get(["timer", "isRunning", "workTime", "breakTime", "isBreak"], (res) => {
      if (res.isRunning) {
        let timer = res.timer + 1;
        let isRunning = true;
        let timeRemaining  = res.isBreak ? res.breakTime : res.workTime
        let isBreak = res.isBreak
        if (timer === 60 * timeRemaining) {
          chrome.notifications.create({
            type: "basic",
            iconUrl: "favicon_io/favicon-32x32.png", 
            title: "Pomodoro Timer",
            message: res.isBreak ?  "Time to get back to work" : "Good Job! You Desrve a break"
          });

          timer = 0;  
          isRunning = false;
          isBreak = !res.isBreak;
        }

        chrome.storage.local.set({
          timer,
          isRunning,
          isBreak
        });
      }
    });
  }
});


chrome.storage.local.get(["timer", "isRunning", "workTime", "breakTime", "isBreak"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    workTime: "workTime" in res ? res.workTime : 25,
    breakTime: "breakTime" in res ? res.breakTime : 5,
    isBreak: "isBreak" in res ? res.isBreak : false,
    isRunning: "isRunning" in res ? res.isRunning : false,
  })
})