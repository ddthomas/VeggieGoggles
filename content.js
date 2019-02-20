// CONTENT SCRIPT


// Helpful thread on ways to pass objects between JS files
// stack overflow user Makyen: https://stackoverflow.com/users/3773011/makyen
// https://stackoverflow.com/questions/40645538/communicate-data-from-popup-to-content-script-injected-by-popup-with-executescri/40666096

chrome.storage.sync.get("Vegetarian", function (items) {
    //console.log(items.Vegetarian);
    replaceTextOnPage("Vegetarian", items.Vegetarian);
    replaceTextOnPage("vegetarian", items.Vegetarian.toLowerCase());
    //chrome.storage.sync.remove(""); 
});


// Helpful thread on traversing DOM tree to replace text (avoiding links and images)
// https://stackoverflow.com/questions/18474497/replace-text-in-a-website
// stack overflow user Paulpro https://stackoverflow.com/users/772035/paulpro


function replaceTextOnPage(from, to){
    getAllTextNodes().forEach(function(node){
      node.nodeValue = node.nodeValue.replace(new RegExp(quote(from), 'g'), to);  // nodeValue returns content of a text node
    });
  
    function getAllTextNodes(){
      const result = [];
  
      (function scanSubTree(node){
        if(node.childNodes.length) 
          for(var i = 0; i < node.childNodes.length; i++) 
            scanSubTree(node.childNodes[i]);
        else if(node.nodeType == Node.TEXT_NODE) 
          result.push(node);
      })(document);
  
      return result;
    }

    function quote(str){
      return (str+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }
  }

  console.log("END of script");

