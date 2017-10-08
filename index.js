

var inputString = "Hiabhijeet";
var initiArray = [];
var arrayToTraverse = [];
var removedList = [];

for (var i = 0, len = inputString.length; i < len; i++) {

  let obj = {
    "parent1" : -1,
    "parent2" : -1,
    "id" : guid(),
    "character" : inputString[i],
    "frequency" : (inputString.split(inputString[i]).length - 1),
    "level" : 0
  };

  var found = false;
  for (var j = 0; j < initiArray.length; j++) {
    if (initiArray[j].character == obj.character) {
      found = true;
      break;
    }
  }
  if (!found) {
    initiArray.push(obj);
    arrayToTraverse.push(obj);
  }
}

for (var i = 0; i < initiArray.length; i++) {
  console.log("Character : " + initiArray[i].character + "\tFrequency : " + initiArray[i].frequency);
}

// console.log("\n\n\n Adding first 2 objects");
// // getNewObject();
// for (var i = 0; i < initiArray.length; i++) {
//   console.log("Character : " + initiArray[i].character + "\tFrequency : " + initiArray[i].frequency);
// }

initiArray = sortArray(initiArray);

while (initiArray.length > 1) {
  getNewObject();
  initiArray = sortArray(initiArray);
}

for (var i = 0; i < initiArray.length; i++) {
  console.log("Character : " + initiArray[i].character + "\tFrequency : " + initiArray[i].frequency);
}

removedList.push(initiArray[0]);

// for (var i = 0; i < removedList.length; i++) {
//   console.log(removedList[i].character);
// }

var currentSize = 0;
for (var i = 0; i < arrayToTraverse.length; i++) {
  var binary = getBinaryFor(arrayToTraverse[i].character);
  console.log("Character : " + arrayToTraverse[i].character + "\t encoding : " + binary);
  currentSize = currentSize + binary.length * arrayToTraverse[i].frequency;
}

console.log("Total Size Requirement : " + (inputString.length * 8) + " bits");
console.log("Compressed Size : " + currentSize + " bits");
console.log("Percentage Compression : " + (100 - (Math.round((currentSize/(inputString.length * 8))*100 * 100) / 100)) + "%");

for (var i = 0; i < removedList.length; i++) {
  console.log("Character : " + removedList[i].character + "\t Level : " + removedList[i].level);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Functions

function getBinaryFor(character){
  var truncatedList = [];
  for (var i = 0; i < removedList.length; i++) {
    if ((removedList[i].character.split(character).length - 1) != 0) {
      truncatedList.push(removedList[i]);
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


function getNewObject(){
  var obj1 = initiArray[0];
  var obj2 = initiArray[1];

  var newObject = {
    "parent1" : obj1.id,
    "parent2" : obj2.id,
    "character" : obj1.character + "" + obj2.character,
    "frequency" : obj1.frequency + obj2.frequency,
    "id" : guid(),
    "level" : obj1.level + 1,
  };

  removedList.push(obj1);
  removedList.push(obj2);

  initiArray.splice(1, 1);
  initiArray.splice(0, 1);

  initiArray.push(newObject);
  initiArray = sortArray(initiArray);

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
