//alert('Here on Yt page')
( function () {

  // Inject seed
  const seed = document.createElement('script');
  seed.textContent = '(function(){"use strict";console.log("From seed: ");console.log(window)})();';
  seed.async = false;
  (document.head || document.documentElement).prepend(seed);


  //util functions to append the inject script when the page has loaded
  const utils = {

    //Send message to inject script that the page has loaded
    inform_inject() {
      console.log("Inform inject function called");
      window.postMessage({
        sender: 'CS',
        message: 'Page has loaded'
      }, document.location.origin);
    },
    //Inject the script in the DOM
    inject_script() {
      console.log("Inject script executed...");
      const script_tag = document.createElement('script');
      script_tag.src = chrome.extension.getURL('js/inject.js');
      console.log(chrome.extension.lastError);
      script_tag.onload = utils.inform_inject;
      script_tag.async = false;
      (document.head).appendChild(script_tag);
    }
  }


  const port = chrome.runtime.connect({name: "MINDFUL_YT"});
 
  //Testing sending and receiving messages to and from the background script
  port.postMessage({sender: "CS", message: "from_cs", num: "1"});
  port.onMessage.addListener((msg) => {
    if (msg.sender == "BS")
      port.postMessage({sender: "CS", message: "cs_got_bs_msg", num : "2"});

  });

  //Get message from background page and forward to inject script
  //Called when onChromeTab changed function sends a  message
  //Forward the request to inject script to execute the test function
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    window.postMessage({
        sender: 'CS',
        message: 'execute test'
      }, document.location.origin);
    console.log(sender);
    console.log(request);
  });

  /*
  //eventlistener is not working
  window.addEventListener("DOMContentLoaded", function() {
      const video1 = document.querySelector('video');
    video1.pause();
    alert("DOM LOADED");
  }, false);
  */

  
  //Messaged from injected script are sent using browser window.
  window.addEventListener('message', (event) => {
    //console.log(event);
    if(event.data.sender == "Injected") {
        console.log(event);
        window.postMessage({sender: "CS", message: "cs_got_inject_msg", num : "2"});
    }
  }, true);



  //var parsedUrl = new URL(window.location.href);
  //console.log(parsedUrl);

  utils.inject_script();
} ());

/*
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'hello1!') {
		background = document.createElement('div');
		background.id = "lightbox_background";
		lightbox = document.createElement('div');
		lightbox.id = "lightbox";
		lightbox.innerHTML = '<h1>Hello, world.</h1>';

		document.body.appendChild(background);
		background.appendChild( lightbox );
		closeScriptureLightbox = function() {

			var lb = document.getElementById('lightbox_background');
			lb.parentNode.removeChild( lb );

		}
		button = document.createElement('button');
		button.onclick=closeScriptureLightbox;
		button.textContent='Close';
		lightbox.appendChild(button);
		sendResponse({farewell: "goodbye"});
    	//alert("Inside content script")
	    console.log(request.url) // new url is now in content scripts!
    }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if ( request.action == "startLightbox" ) {
  
  background = document.createElement('div');
  background.id = "lightbox_background";
  lightbox = document.createElement('div');
  lightbox.id = "lightbox_extension";
  
  
  lightbox.innerHTML = '<h1>Hello, world.</h1>';
         
      
  document.body.appendChild(background);
  background.appendChild( lightbox );
  closeScriptureLightbox = function() {
      
      var lb = document.getElementById('lightbox_background');
      lb.parentNode.removeChild( lb );
      
  }
  button = document.createElement('button');
  button.onclick=closeScriptureLightbox;
  button.textContent='Close';
  lightbox.appendChild(button);
  sendResponse({farewell: "goodbye"});
  
      }
  });*/