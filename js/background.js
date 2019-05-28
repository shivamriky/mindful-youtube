//alert('Here on the page')


// receive messages from content script but cannot receive message from the injected
chrome.runtime.onConnect.addListener((port) => {
  console.assert(port.name == "MINDFUL_YT");

  port.onMessage.addListener((msg) => {
    if(msg.sender == "CS") {
      console.log("Background got message from CS: " + msg.message);
      //console.log(port);
      if (msg.num == "1")
        port.postMessage({sender: "BS", message: "Hello! from BS"});
    }
    else if(msg.sender == "Injected")
      console.log("Background got message from Injected: " + msg.message);
  });



  //Test for chrome tab update and draw the lightbox each time the tab is updated
  chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    // read changeInfo data and do something with it
    // like send the new url to contentscripts.js
    if (changeInfo.url) {
      chrome.tabs.sendMessage( tabId, {
        sender: 'BS',
        message: 'hello!',
        url: changeInfo.url
      })
    }
  });


});



/*
chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    // read changeInfo data and do something with it
    // like send the new url to contentscripts.js
    if (changeInfo.url) {
      chrome.tabs.sendMessage( tabId, {
        message: 'hello!',
        url: changeInfo.url
      })

      chrome.tabs.executeScript(tab.ib, {
        file: 'inject.js'
      });
    }
  }
);


chrome.runtime.onInstalled.addListener(function() {
    var id = chrome.contextMenus.create({"title": "View in Lightbox", "contexts":["page"],
                                         "id": "ViewInLightbox"
        });
});


function contextClicked(info, tab) {
  if (info.menuItemId == "ViewInLightbox" ) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {"action": "startLightbox"});
      });
        
    } 
};


//Instruct Chrome to launch a particular function when context menu items are clicked.
chrome.contextMenus.onClicked.addListener(contextClicked);

*/