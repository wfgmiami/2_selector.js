var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }
  if (matchFunc(startEl)) {
     resultSet.push(startEl);
  }
  if (startEl.children.length > 0){
    [].slice.call(startEl.children).forEach(function(child){
      resultSet = resultSet.concat(traverseDomAndCollectElements(matchFunc, child))
    })

  }

  // traverse the DOM tree and collect matching elements in resultSet
  // use matchFunc to identify matching elements

  return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag

var selectorTypeMatcher = function(selector) {
  if (selector.substr(0,1) === "#"){
    return 'id';
  }else if(selector.substr(0,1) === "."){
    return 'class';
  }else if(selector.indexOf(".") !== -1){
    return "tag.class";
  }else {
    return "tag";
  }
};


// NOTE ABOUT THE MATCH FUNCTION
// remember, the returned matchFunction takes an *element* as a
// parameter and returns true/false depending on if that element
// matches the selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;

  if (selectorType === "id") {
    matchFunction = function(el){
      return el.id  && ("#" + el.id.toLowerCase() === selector.toLowerCase());
    }
  } else if (selectorType === "class") {
    matchFunction = function(el){
      var arr = el.className.split(" ");

      if (arr.length > 1){

          for (var i = 0; i < arr.length; i++){
              if (arr[i] && ("." + arr[i].toLowerCase() === selector.toLowerCase())){
                return true;
              }
          }
          return false;
      }else{
        return el.className && ("." + el.className.toLowerCase() === selector.toLowerCase());
      }
    }

  } else if (selectorType === "tag.class") {
    matchFunction = function(el){
      var arr = el.className.split(" ");
      if (arr.length > 1){
          for (var i = 0; i < arr.length; i++){
              if (el.tagName + arr[i] && ((el.tagName + "." + arr[i]).toLowerCase() === selector.toLowerCase())){
                return true;
              }
          }
          return false;
      }else{
       return el.tagName + el.className && ((el.tagName + "." + el.className).toLowerCase() ===  selector.toLowerCase());
      }
    }

  } else if (selectorType === "tag") {
     matchFunction = function(el){
      return el.tagName && (el.tagName.toLowerCase() === selector.toLowerCase());
    }

  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};


// re-done on 7/16/17
// function selectorTypeMatcher(selector){

//   var sel = selector.slice(0,1);
//   if( sel === '#'){
//     return 'id';
//   }else if( sel === '.' ){
//     return 'class';
//   }else if( selector.indexOf('.') !== -1 ){
//     return 'tag.class';
//   }else{
//     return 'tag';
//   }

// }

// function matchFunctionMaker(selector){

//   return function matcher(selectorName){
//     sel = selector.slice(1);
//     var type = selectorTypeMatcher(selector);

//     if( type === 'id' ){
//       return selectorName.id === sel;

//     }else if( type === 'class'){
//       var arrClasses = selectorName.className.split(' ');
//       var check = arrClasses.filter( item => item === sel )
//       var answer = check.length ? true : false;
//       return answer;

//     }else if( type === 'tag'){
//       return selectorName.tagName === selector.toUpperCase();

//     }else if( type === 'tag.class' ){

//       var pos = selector.indexOf('.');
//       var tagNm = selector.slice(0, pos);

//       if( tagNm.toUpperCase() === selectorName.tagName ){
//         var classNm = selector.slice(pos+1);
//         var arrClasses = selectorName.className.split(' ');
//         var check = arrClasses.filter( item => item === classNm );
//         var answer = check.length ? true : false;
//         return answer;
//       }else{
//         return false;
//       }
//     }

//   }

// }

// function traverseDomAndCollectElements(elem){
//   var root = document.body;
//   if( elem.toUpperCase() === root.tagName ) return [document.body];

//   var results = [];
//   var newArray = [];
//   var func = matchFunctionMaker(elem);
//   var children = root.children;
//   children = Array.prototype.slice.call( children );
//   var i = 0;

//   while( children.length ){
//       if(func(children[i])){
//         results.push(children[i])
//       }
//       if( children[i].children.length ){
//         var test = Array.prototype.slice.call(children[i].children)
//         children = children.concat(test);
//       }
//       children.shift();
//   }
//   return results;
// }


// function $(elem){
//   return traverseDomAndCollectElements(elem);
// }
