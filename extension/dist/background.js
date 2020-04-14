

chrome.browserAction.onClicked.addListener(function(tab) {
    //chrome.tabs.executeScript(null, {file: "testScript.js"});
    window.open('localhost:8888', '_blank');
 });