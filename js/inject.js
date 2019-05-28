
// this is the code which will be injected into a given page...
(function mindfulYT(){

  console.log("Injected script has executed");
  window.postMessage({ sender: 'Injected', message: "Injected" }, document.location.origin);

  //Receive messages from content script
  window.addEventListener('message', (event) => {
    //console.log(event);
    if(event.data.sender == "CS")
      console.log("Injected got a reply");
    if(event.data.message == 'Page has loaded')
      console.log("Page load complete");
  	if(event.data.message == 'execute test'){
  	  test();
  	  console.log("test function executed");
  	}
  });


  //Draw the lightbox code
  function test() {
  	console.log("Test function called");
  	// just place a div at top right
  	var div = document.createElement('div');
  	div.style.position = 'fixed';
  	div.style.top = 0;
  	div.style.right = 0;
  	div.textContent = 'Injected!';
  	document.body.appendChild(div);
  	
    background = document.createElement('div');
    background.id = "lightbox_background";
    lightbox = document.createElement('div');
    lightbox.id = "lightbox_extension";
    
    lightbox.innerHTML = '<h1>Do you this youtube video can wait....</h1>';
        
    document.body.appendChild(background);
    background.appendChild( lightbox );
    closeScriptureLightbox = function() {
        var lb = document.getElementById('lightbox_background');
        lb.parentNode.removeChild( lb );
    }
    button = document.createElement('button');
    button.onclick=closeScriptureLightbox;
    button.textContent='Let me watch, I am not wasting time';
    lightbox.appendChild(button);
  }

})();