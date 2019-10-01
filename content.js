// what to do when a mutation is detected.
var mutationObserver = new MutationObserver(function(mutations) {
  console.log('mutation detected');
  callback()
});

var callback = function(){
    // Stops the MutationObserver from listening for changes.
    // Otherwise this snake will eat it's tail
    mutationObserver.disconnect();
    let cards = document.getElementsByClassName('list-card-heading')
    let regex_1 = /,/gi
    for (let card of cards){
      if (card.getElementsByClassName('list-card-details')[0].children.length == 3){
        let price = card.getElementsByClassName('list-card-price')[0].innerText.replace(regex_1,'').replace('$','').replace('+','')
        card.getElementsByClassName('list-card-price')[0].innerText = `$${price}`
        let area = card.getElementsByClassName('list-card-details')[0].getElementsByTagName('li')[2].innerText.split(' ')[0].replace(',','')
        try { card.getElementsByClassName('list-card-details')[0].getElementsByTagName('li')[0].getElementsByClassName('list-card-label')[0].innerText = 'bd' }
        catch {
          console.log('missing beds label')
        }
        try { card.getElementsByClassName('list-card-details')[0].getElementsByTagName('li')[1].getElementsByClassName('list-card-label')[0].innerText = 'ba' }
        catch {
          console.log('missing bath label')
        }
        try { card.getElementsByClassName('list-card-details')[0].getElementsByTagName('li')[2].getElementsByClassName('list-card-label')[0].innerText = 'sf' }
        catch {
          console.log('missing square feet label')
        }
        var node = document.createElement("LI");                 // Create a <li> node
        var textnode = document.createTextNode(`${Math.round(price / area)}$/sf`);         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        card.getElementsByClassName('list-card-details')[0].appendChild(node);     // Append <li> to <ul> with
      }
    }
    // Starts / Restarts listening for changes.
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