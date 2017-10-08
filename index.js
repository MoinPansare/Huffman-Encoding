$(document).ready(function() {
  $("#Evaluate").click(
 function(){
$(".graph").html("");
this.inputString = $("input").val();//"Build the Huffman tree for the set of characters in this question. Include all characters including punctuation and spaces. How many bits are saved in the storage of this question using Huffman trees versus a storage based on a fixed-length encoding such as ASCII?";
this.initiArray = [];
this.arrayToTraverse = [];
this.removedList = [];

// function setPositionForParents(levelToSet){debugger
//     if(arrayToTraverse[i].parent1 !== -1){
//              // that.setPositionForParents($("#"+arrayToTraverse[i].character+i), arrayToTraverse.filter(function (el) {return el.level = level + 1}));
//    // ---------------------
//       var node = $("#"+arrayToTraverse[i].character+i);
//       var position = node.position();
//       var y = position.top;
//       var x = position.left;

//       var parent1Index = arrayToTraverse.findIndex(el => el.id == arrayToTraverse[i].parent1);
//       var parent2Index = arrayToTraverse.findIndex(el => el.id == arrayToTraverse[i].parent2);
//       if(parent1Index !== -1){
//         arrayToTraverse[parent1Index].left = x - 5;
//         arrayToTraverse[parent1Index].top = y - 5;
//         arrayToTraverse[parent2Index].left = x + 5;
//         arrayToTraverse[parent2Index].top = y + 5;
//       }
//     // ----------------------------------------------
//   }
// }
function setPositionForParents(arrayToTraverse, levelToSet){debugger
  var parentArray = arrayToTraverse.filter(function(el) { return el.level === levelToSet });
  for(var i = 0; i < parentArray.length; i++){
    if(parentArray[i].parent1 !== -1){
             // that.setPositionForParents($("#"+parentArray[i].character+i), parentArray.filter(function (el) {return el.level = level + 1}));
   // ---------------------
      var node = $("#"+parentArray[i].character+parentArray[i].frequency);
      var position = node.position();
      var y = position.top;
      var x = position.left;

      var parent1Index = arrayToTraverse.findIndex(el => el.id == parentArray[i].parent1);
      var parent2Index = arrayToTraverse.findIndex(el => el.id == parentArray[i].parent2);

      if(parent1Index !== -1){
        $("#"+arrayToTraverse[parent1Index].character+parentArray[i].frequency).css("left", x - 5);
        $("#"+arrayToTraverse[parent1Index].character+parentArray[i].frequency).css("top", y - 5);
        $("#"+arrayToTraverse[parent2Index].character+parentArray[i].frequency).css("left", x + 5);
        $("#"+arrayToTraverse[parent2Index].character+parentArray[i].frequency).css("top", y + 5);
      }
    // ----------------------------------------------
   } 
  }
}
var draw = function(arrayToTraverse){
  var that = this;
  var level;
  var oldLevel;
  var count = 0;
  for (var i = arrayToTraverse.length-1; i>= 0; i--){
        if(arrayToTraverse[i].frequency !== level){
          $( "<div id=level"+arrayToTraverse[i].frequency+" class='nextLevel'>").appendTo(".graph");
          level = arrayToTraverse[i].frequency;
          if(oldLevel !== level && count > 1){
            setPositionForParents(arrayToTraverse, arrayToTraverse[i].level + 2);
          }
          oldLevel = level;
          count += 1;
        }
        $( "<div id="+arrayToTraverse[i].character+arrayToTraverse[i].frequency+" class='numberCircle'>"+"F: "+arrayToTraverse[i].frequency+"C: "+arrayToTraverse[i].character+"</p>" ).appendTo("#level"+level);
        
        // if(arrayToTraverse[i].top || arrayToTraverse[i].left){
        //   $("#"+ arrayToTraverse[i].character+arrayToTraverse[i].frequency).css("top", arrayToTraverse[i].top);
        //   $("#"+ arrayToTraverse[i].character+arrayToTraverse[i].frequency).css("left", arrayToTraverse[i].left);
        // }
  }
}

for (var i = 0, len = this.inputString.length; i < len; i++) {

  let obj = {
    "parent1" : -1,
    "parent2" : -1,
    "id" : guid(),
    "character" : this.inputString[i],
    "frequency" : (this.inputString.split(this.inputString[i]).length - 1),
    "level" : 0,
    "left": 0,
    "top": 0
  };

  var found = false;
  for (var j = 0; j < this.initiArray.length; j++) {
    if (this.initiArray[j].character == obj.character) {
      found = true;
      break;
    }
  }
  if (!found) {
    this.initiArray.push(obj);
    this.arrayToTraverse.push(obj);
  }
}

// console.log("\n\n\n Adding first 2 objects");
// // getNewObject();
// for (var i = 0; i < initiArray.length; i++) {
//   console.log("Character : " + initiArray[i].character + "\tFrequency : " + initiArray[i].frequency);
// }

this.initiArray = sortArray(this.initiArray);
var that = this;
while (this.initiArray.length > 1) {
  getNewObject(that);
  this.initiArray = sortArray(this.initiArray);
}

// for (var i = 0; i < this.initiArray.length; i++) {
//   console.log("Character : " + this.initiArray[i].character + "\tFrequency : " + this.initiArray[i].frequency);
// }

this.removedList.push(this.initiArray[0]);

// for (var i = 0; i < removedList.length; i++) {
//   console.log(removedList[i].character);
// }

var currentSize = 0;
var that = this;
for (var i = 0; i < this.arrayToTraverse.length; i++) {
  var binary = getBinaryFor(this.arrayToTraverse[i].character, that);
  // console.log("Character : " + this.arrayToTraverse[i].character + "\t encoding : " + binary);
  currentSize = currentSize + binary.length * that.arrayToTraverse[i].frequency;
}

draw(this.removedList);

$("#totalSize").text((this.inputString.length * 8) + " bits");
$("#compressedSize").text(currentSize + " bits");
$("#PercentageCompression").text(currentSize + (100 - (Math.round((currentSize/(this.inputString.length * 8))*100 * 100) / 100)) + "%");

// for (var i = 0; i < this.removedList.length; i++) {
//   console.log("Character : " + this.removedList[i].character + "\t Level : " + this.removedList[i].level);
// }
// console.log("Total Size Requirement : " + (this.inputString.length * 8) + " bits");
// console.log("Compressed Size : " + currentSize + " bits");
// console.log("Percentage Compression : " + (100 - (Math.round((currentSize/(this.inputString.length * 8))*100 * 100) / 100)) + "%");

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Functions

function getBinaryFor(character, that){
  var truncatedList = [];
  for (var i = 0; i < that.removedList.length; i++) {
    if ((that.removedList[i].character.split(character).length - 1) != 0) {
      truncatedList.push(that.removedList[i]);
    }
  }
  // for (var i = 0; i < truncatedList.length; i++) {
  //   console.log(truncatedList[i].character);
  // }

  let current = truncatedList[truncatedList.length - 1];
  var value = "";
  while (current.parent1 != -1 && current.parent2 != -1) {
    var val = checkIfParentIdExists(truncatedList,current)
    value = value + "" + val;
    var toGet;
    if (val == 1){
      toGet = current.parent2;
    }else{
      toGet = current.parent1;
    }

    for (var i = 0; i < truncatedList.length; i++) {
      if (truncatedList[i].id == toGet) {
        current = truncatedList[i];
        break;
      }
    }
  }

  // console.log(value);
  return value;

}

function checkIfParentIdExists(list,current){
  for (var i = 0; i < list.length; i++) {
    if (list[i].id == current.parent1){
      return 0;
    }
    if (list[i].id == current.parent2) {
      return 1;
    }
  }
  return -1;
}


function getNewObject(that){
  var obj1 = that.initiArray[0];
  var obj2 = that.initiArray[1];

  var max = obj1.level + 1;
  if (obj2.level > obj1.level) {
    max = obj2.level + 1;
  }

  var newObject = {
    "parent1" : obj1.id,
    "parent2" : obj2.id,
    "character" : obj1.character + "" + obj2.character,
    "frequency" : obj1.frequency + obj2.frequency,
    "id" : guid(),
    "level" : max,
    "left": 0,
    "top": 0
  };

  that.removedList.push(obj1);
  that.removedList.push(obj2);

  that.initiArray.splice(1, 1);
  that.initiArray.splice(0, 1);

  that.initiArray.push(newObject);
  that.initiArray = sortArray(that.initiArray);

}

//function to sort
function sortArray(someList){
  var list = someList;
  for (var i = 0; i < list.length; i++) {
    for (var j = i+1; j < list.length; j++) {
      if (list[i].frequency > list[j].frequency) {
        var temp = list[i];
        list[i] = list[j];
        list[j] = temp;
      }
    }
  }
  return list;
}

// function to get uniqueID
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
return this;
});
});