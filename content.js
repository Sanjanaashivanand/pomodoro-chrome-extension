chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showAlert") {
      alert(request.message); // Show alert on the webpage
    }
  });
  