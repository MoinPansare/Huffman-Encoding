$(document).ready(function() {
  $("#Evaluate").click(function(){
      $("#graph").html("");
      $('.container').height($(window).height() - 150);
      $('.container').width($(window).width() - 50);
      this.inputString = $("input").val();//"Build the Huffman tree for the set of characters in this question. Include all characters including punctuation and spaces. How many bits are saved in the storage of this question using Huffman trees versus a storage based on a fixed-length encoding such as ASCII?";
      this.initiArray = [];
      this.arrayToTraverse = [];
      this.removedList = [];
      this.maxLevel = 0;
      var levelArray = [];
      // function setPositionForChildNodes(level, arrayToTraverse, that){
      //   // var parentLevelArray = arrayToTraverse.filter(arr){return arr.level ===  i - 1};
      //   var childLevelArray = arrayToTraverse.filter(function(arr){return arr.level ===  level});

      //   if(level !== 0){
      //     for(var j = 0; j < childLevelArray.length; j++){
      //       var p1 = arrayToTraverse.find(function(arr){return arr.id === childLevelArray[j].parent1});
      //       var p2 = arrayToTraverse.find(function(arr){return arr.id === childLevelArray[j].parent2});

      //       var childIndex = arrayToTraverse.findIndex(function(arr){return arr.id === childLevelArray[j].id});

      //       var parent1Position = $("#"+ p1.id).position();
      //       var parent2Position = $("#"+ p2.id).position();

      //       if(p1 && p2){
      //         arrayToTraverse[childIndex].left = ((parent1Position.left < parent2Position.left) ? parent1Position.left : parent2Position.left) + Math.abs((Math.abs(parent1Position.left) - Math.abs(parent2Position.left))/2);
      //         // if(that.maxLevel > 2){
      //           arrayToTraverse[childIndex].top = (((parent1Position.top < parent2Position.top) ? parent1Position.top : parent2Position.top)) - 60;
      //         // }else{
      //         //   arrayToTraverse[childIndex].top = (((parent1Position.top < parent2Position.top) ? parent1Position.top : parent2Position.top)) - 100;
      //         // }
      //       }
      //     }
      //   }else{
      //     for(var j = 0; j < childLevelArray.length; j++){
      //       var childIndex = arrayToTraverse.findIndex(function(arr){return arr.id === childLevelArray[j].id});
      //       debugger
      //       // if(that.maxLevel > 2){
      //         arrayToTraverse[childIndex].left = 10 + (30 * j);
      //       // }else{
      //       //   arrayToTraverse[childIndex].left = 10 + (100 * j);
      //       // }
      //       arrayToTraverse[childIndex].bottom = 0;
      //     }
      //   }
      // }

      function prepareArrays (rootItem, level, mainArr){
        var p1_id = rootItem.parent1;
        var p2_id= rootItem.parent2;
debugger
        var parent1 = mainArr.find(function(arr){return arr.id === p1_id});
        var parent2 = mainArr.find(function(arr){return arr.id === p2_id});

        if(levelArray[level - 1]){
          levelArray[level - 1].push(parent1);
          levelArray[level - 1].push(parent2);
        }else{
          levelArray[level - 1] = parent1;
          levelArray[levelArray].push([parent2]);
        }
        
       if(parent1.level !== 0){
          prepareArrays(parent1, level - 1, mainArr);
       }
       if(parent1.level !== 0){
          prepareArrays(parent2, level - 1, mainArr);
       }
      }

      var draw = function(arrayToTraverse){
        var that = this;
        var level;
        var oldLevel;debugger
        prepareArrays(arrayToTraverse[arrayToTraverse.length-1], that.maxLevel, arrayToTraverse);
          for (var i = 0; i <= that.maxLevel; i++){
              if(i === 0){
                var list = arrayToTraverse.filter(function(arr){return arr.level === 0 });
                for (var i1 = 0; i1 < list.length; i1++) {
                  for (var j1 = i1+1; j1 < list.length; j1++) {
                    if (parseInt(list[i1].binary, 2) > parseInt(list[j1].binary, 2)) {
                      var temp = list[i1];
                      list[i1] = list[j1];
                      list[j1] = temp;
                    }
                  }
                }
                drawLevel(list, that, 0, arrayToTraverse);
              } else{             
                drawLevel(arrayToTraverse.filter(function(arr){return arr.level === i}), that, i, arrayToTraverse);
              }
          }
      }

      function drawLevel(array, that, level, mainArr){debugger
          var top; 
          for(var j = 0; j < array.length; j++){
              if(level === 0){
              $( "<div id="+array[j].id+" class='numberCircle' title='"+array[j].binary+"''>"+array[j].frequency+"</div>").appendTo("#graph");
              }else{
              $( "<div id="+array[j].id+" class='numberCircle' title='"+array[j].character+"''>"+array[j].frequency+"</div>").appendTo("#graph");
              }

              if(array[j].parent1 === -1){
                $("#"+array[j].id).html(array[j].character);
              }

              if(level === 0){
                $("#"+ array[j].id).css("bottom", 0);  
                $("#"+ array[j].id).css("bottom", 0);  
                $("#"+ array[j].id).css("left", 10 + (30 * j));
              }

                if(array[j].top)
                {
                  $("#"+ array[j].id).css("top", array[j].top);
                  $("#"+ array[j].id).css("left", array[j].left);
                }
                else{
                  top = $("#"+ array[j].id).position().top;
                  $("#"+ array[j].id).css("top", top);
                  $("#"+ array[j].id).css("left", 10 + (30 * j)); 
                }
          }
          setPositionForChildNodes(array, that, mainArr, level);
      }


      function setPositionForChildNodes(levelPrinted, that, mainArr, level){debugger
        var top;
        if(level !== 0){
          top = $("#"+ mainArr.find(function(arr){ return arr.level === 0 }).id).position().top;
        }
        for(var i=0; i<levelPrinted.length; i++){
          var childIndex = mainArr.findIndex(function(arr){ return arr.parent1 === levelPrinted[i].id });
          if(childIndex === -1){
            childIndex = mainArr.findIndex(function(arr){ return arr.parent2 === levelPrinted[i].id });
          }
          if(childIndex !== -1){
            var parent1 = mainArr.find(function(arr){ return arr.id === mainArr[childIndex].parent1 });
            var parent2 = mainArr.find(function(arr){ return arr.id === mainArr[childIndex].parent2 });
            var parent1Position = $("#"+ parent1.id).position();
            var parent2Position = $("#"+ parent2.id).position();

            mainArr[childIndex].left = ((parent1Position.left < parent2Position.left) ? parent1Position.left : parent2Position.left) + (Math.abs((Math.abs(parent1Position.left) - Math.abs(parent2Position.left)))/2);
            mainArr[childIndex].top = (top || parent2Position.top) - (30  * (mainArr[childIndex].level + 1));
          }
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

      this.initiArray = sortArray(this.initiArray);
      var that = this;
      debugger
      while (this.initiArray.length > 1) {
        getNewObject(that);
        this.initiArray = sortArray(this.initiArray);
      }

      // for (var i = 0; i < this.initiArray.length; i++) {
      //   console.log("Character : " + this.initiArray[i].character + "\tFrequency : " + this.initiArray[i].frequency);
      // }

      this.removedList.push(this.initiArray[0]);

      var currentSize = 0;
      var that = this;
      for (var i = 0; i < this.arrayToTraverse.length; i++) {
        var binary = getBinaryFor(this.arrayToTraverse[i].character, that);
        this.arrayToTraverse[i].binary = binary;
        console.log("Character : " + this.arrayToTraverse[i].character + "\t encoding : " + binary);
        currentSize = currentSize + binary.length * that.arrayToTraverse[i].frequency;
      }
      // this.removedList = sortBinaryArray(this.removedList);
      draw(this.removedList);

      $("#totalSize").text((this.inputString.length * 8) + " bits");
      $("#compressedSize").text(currentSize + " bits");
      $("#PercentageCompression").text(currentSize + (100 - (Math.round((currentSize/(this.inputString.length * 8))*100 * 100) / 100)) + "%");

      for (var i = 0; i < this.removedList.length; i++) {
        console.log("Character : " + this.removedList[i].character + "\t Level : " + this.removedList[i].level);
      }

      function getBinaryFor(character, that){
        var truncatedList = [];
        for (var i = 0; i < that.removedList.length; i++) {
          if ((that.removedList[i].character.split(character).length - 1) != 0) {
            truncatedList.push(that.removedList[i]);
          }
        }
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
        
        this.maxLevel = that.maxLevel > max ? that.maxLevel : max;

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

        obj1.level = max - 1;
        obj2.level = max - 1;

        that.removedList.push(obj1);
        that.removedList.push(obj2);

        that.initiArray.splice(1, 1);
        that.initiArray.splice(0, 1);

        that.initiArray.push(newObject);
        that.initiArray = sortArray(that.initiArray);
        return that;
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
      function sortBinaryArray(removedList){debugger
        var list = removedList.filter(function(arr){return arr.level === 0 });
        for (var i = 0; i < list.length; i++) {
          for (var j = i+1; j < list.length; j++) {
            if (parseInt(list[i].binary, 2) > parseInt(list[j].binary, 2)) {
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
