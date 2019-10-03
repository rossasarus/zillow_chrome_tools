// Listen for mutations so we can check for new values to calc
var mutationObserver = new MutationObserver(function(mutations) {
  console.log('mutation detected');
  callback()
});

var callback = function(){
    // Stop the MutationObserver from listening for changes.
    // Otherwise this snake will eat it's tail
    mutationObserver.disconnect();
    let cards = document.getElementsByClassName('list-card-heading')
    let regex_1 = /,/gi
    let numberPattern = /\d+/g;

    // modify cards in side pane.
    for (let card of cards){
      // see if we have already modified this card.
      if (card.getElementsByClassName('list-card-details')[0].children.length == 3){
        let liList = card.getElementsByClassName('list-card-details')[0].getElementsByTagName('li')
        let price = card.getElementsByClassName('list-card-price')[0].innerText.replace(regex_1,'').replace('$','').replace('+','')
        card.getElementsByClassName('list-card-price')[0].innerText = `$${price}`
        let area = liList[2].innerText.split(' ')[0].replace(',','')
        try { liList[0].getElementsByClassName('list-card-label')[0].innerText = 'bd' }
        catch {
          console.log('missing beds label')
        }
        try { liList[1].getElementsByClassName('list-card-label')[0].innerText = 'ba' }
        catch {
          console.log('missing bath label')
        }
        try { liList[2].getElementsByClassName('list-card-label')[0].innerText = 'sf' }
        catch {
          console.log('missing square feet label')
        }
        var node = document.createElement("LI");                 // Create a <li> node
        //grab the middle color from somewhere above soon, and user enterable eventually
        var textnode = document.createTextNode(`${Math.round(price / area)}$/sf`);         // Create a text node
        let cost_color = (Math.round(price/area) > 600 ? 'red' : 'green')
        node.appendChild(textnode);                              // Append the text to <li>
        node.style.color= cost_color
        card.getElementsByClassName('list-card-details')[0].appendChild(node);     // Append <li> to <ul> 
      }
    }

    // modify single hero listing header
    try {
      if (document.getElementsByClassName('ds-value').length > 0) {
        let price = document.getElementsByClassName('ds-value')[0].innerText.replace(regex_1,'').replace('$','').replace('+','')
        let area = document.getElementsByClassName('ds-bed-bath-living-area-container')[0].getElementsByClassName('ds-bed-bath-living-area')[3].getElementsByTagName('span')[0].innerText.replace(',','')
        // add divider class name 
        document.getElementsByClassName('ds-bed-bath-living-area-container')[0].children[2].classList.add('ds-vertical-divider')
        var innerNode = document.createElement("SPAN");                 // Create a <span> node
        var node = document.createElement("SPAN");                      // Create another <span> node
        //grab the middle color from somewhere above soon, and user enterable eventually
        var textnode = document.createTextNode(`${Math.round(price / area)}$/sf`);         // Create a text node
        let cost_color = (Math.round(price/area) > 600 ? 'red' : 'green')
        innerNode.appendChild(textnode);                                // Append the text to <span>
        node.appendChild(innerNode);                                    // Append the span to <span>
        node.style.color= cost_color
        node.classList.add("ds-bed-bath-living-area");
        // if the price per sqft isn't already injected, do it.
        if (document.getElementsByClassName('ds-bed-bath-living-area-container')[0].children.length < 4){
          document.getElementsByClassName('ds-bed-bath-living-area-container')[0].appendChild(node);     // Append <li> to <ul> 
        }
      }
    }
    catch {
      //do nothing
    }


    // modify small popup bubble (on map) for specific selected house
    try {
      // check that this hasn't been added already
      if (document.getElementsByClassName('mini-bubble-details')[0] != undefined){
        let area = document.getElementsByClassName('mini-bubble-details')[0].getElementsByTagName('div')[1].innerText.split(' ')[0].replace(',','')
        area = parseInt(area)
        let priceElement = document.getElementsByClassName('mini-bubble-details')[0].getElementsByTagName('strong')[0]
        let price = priceElement.innerText.split(' ')[0].replace('$','')
        if (price.split('').pop() == 'K'){
          price = parseInt(price.split('K')[0])*1000
        } else if (price.split('').pop() == 'M'){
          price = parseInt(price.split('K')[0])*1000000
        }

        if (priceElement.innerText.split('$/').length == 1){
          priceElement.innerText += ` ${Math.round(price/area)}$/sf  `
          //grab the middle color from somewhere above soon, and user enterable eventually
          let cost_color = (Math.round(price/area) > 600 ? 'red' : 'green')
          priceElement.style.color= cost_color
        }
      }
    }
    catch (err){
      console.log(err)
    }
    // Starts/Restarts listening for changes.
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true
    });
  };
  
  if (
      document.readyState === "complete" ||
      (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
    mutationObserver.disconnect();
    callback();
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true
    });
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }