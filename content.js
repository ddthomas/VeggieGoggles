// CONTENT SCRIPT


// Helpful thread on ways to pass objects between JS files
// stack overflow user Makyen: https://stackoverflow.com/users/3773011/makyen
// https://stackoverflow.com/questions/40645538/communicate-data-from-popup-to-content-script-injected-by-popup-with-executescri/40666096

chrome.storage.sync.get("Vegetarian", function (items) {
    console.log(items.Vegetarian);
    replaceTextOnPage("Vegetarian", items.Vegetarian);
    console.log(items);
    //chrome.storage.sync.remove("userInput"); // why do I need this??
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

























  
// function highlightText(nodeList, what) {

//     // traverse all the children nodes
//     for (var x = 0; x < nodeList.length; x++) {
  
//       // text node, search directly
//       if (nodeList[x].nodeType == 3) {
  
//         // if it contains the text that you are looking for, proceed with the replacement
//         if (nodeList[x].textContent.indexOf(what) >= 0) {
  
//           // your code (mostly :P)
//           var ID = "result" + counter;
//           var replacement = '<span id="'+ID+'" style="background-color:#f0da1e">'+what+'</span>';
//           var textBlock = nodeList[x].textContent;
//           var searchIndex = nodeList[x].textContent.indexOf(what);
//           while(searchIndex >= 0)
//           {
//             ++counter;
//             ID = "result" + counter;
//             replacement = '<span id="'+ID+'" style="background-color:#f0da1e">'+what+'</span>';           
//             textBlock = textBlock.substring(0, searchIndex) + replacement + textBlock.substring(searchIndex + what.length, textBlock.length);
//             searchIndex = textBlock.toLowerCase().indexOf(what.toLowerCase(), (searchIndex + replacement.length));
//           }
  
//           // create a new element with the replacement text
//           var replacementNode = document.createElement("span");
//           replacementNode.innerHTML = textBlock;
  
//           // replace the old node with the new one
//           var parentN = nodeList[x].parentNode;
//           parentN.replaceChild(replacementNode, parentN.childNodes[x]);
  
//         }
//       } else {
//         // element node --> search in its children nodes
//         highlightText(nodeList[x].childNodes, what);
//       }
//     }
//   }

//RegEx
//document.body.innerHTML = document.body.innerHTML.replace(/hello/g, 'hi');



//stack overflow https://stackoverflow.com/questions/26199593/how-to-access-innerhtml-but-ignore-script-tags
// var matches = document.querySelectorAll("*:not(html):not(head):not(script):not(meta):not(link)");
// console.log(matches);
// [].forEach.call(matches, function(elem) {
//   var text = ('innerText' in elem) ? 'innerText' : 'textContent';
//   elem[text] = elem[text].replace("vegetarian", "NOTNOTNOT");
// });



// //Stack Overflow: https://stackoverflow.com/questions/1972515/javascript-find-strings-in-dom-and-emphasize-it/1972664#1972664
// keywords = ['hi world','goodbye cruel world'];
// function replaceKeywords (domNode) {
//     if (domNode.nodeType === Node.ELEMENT_NODE) { // We only want to scan html elements
//         var children = domNode.childNodes;
//         for (var i=0;i<children.length;i++) {
//             var child = children[i];

//             // Filter out unwanted nodes to speed up processing.
//             // For example, you can ignore 'SCRIPT' nodes etc.
//             if (child.nodeName != 'EM') {
//                 replaceKeywords(child); // Recurse!
//             }
//         }
//     }
//     else if (domNode.nodeType === Node.TEXT_NODE) { // Process text nodes
//         var text = domNode.nodeValue;

//         // This is another place where it might be prudent to add filters

//         for (var i=0;i<keywords.length;i++) {
//             var match = text.indexOf(keywords[i]); // you may use search instead
//             if (match != -1) {
//                 // create the EM node:
//                 var em = document.createElement('EM');

//                 // split text into 3 parts: before, mid and after
//                 var mid = domNode.splitText(match);
//                 mid.splitText(keywords[i].length);

//                 // then assign mid part to EM
//                 mid.parentNode.insertBefore(em,mid);
//                 mid.parentNode.removeChild(mid);
//                 em.appendChild(mid);
//             }
//         }
//     }
// }