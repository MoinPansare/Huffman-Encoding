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

//shahista code starts

      function linedraw(ax,ay,bx,by)
      {
          if(ay>by)
          {
              bx=ax+bx;  
              ax=bx-ax;
              bx=bx-ax;
              by=ay+by;  
              ay=by-ay;  
              by=by-ay;
          }
          var calc=Math.atan((ay-by)/(bx-ax));
          calc=calc*180/Math.PI;
          var length=Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by));
          var div = document.getElementById('graph');

          div.innerHTML += "<div id='line' style='height:" + length + "px;width:1px;background-color:black;position:absolute;top:" + (ay) + "px;left:" + (ax) + "px;transform:rotate(" + calc + "deg);-ms-transform:rotate(" + calc + "deg);transform-origin:0% 0%;-moz-transform:rotate(" + calc + "deg);-moz-transform-origin:0% 0%;-webkit-transform:rotate(" + calc  + "deg);-webkit-transform-origin:0% 0%;-o-transform:rotate(" + calc + "deg);-o-transform-origin:0% 0%;'></div>"
      }

      function prepareArrays (rootItem, level, mainArr){
        var p1_id = rootItem.parent1;
        var p2_id= rootItem.parent2;

        var parent1 = mainArr.find(function(arr){return arr.id === p1_id});
        var parent2 = mainArr.find(function(arr){return arr.id === p2_id});
        if(parent1 || parent2){
          if(levelArray[level - 1]){
            levelArray[level - 1].push(parent1);
            levelArray[level - 1].push(parent2);
          }else{
            levelArray[level - 1] = [parent1];
            levelArray[level - 1].push(parent2);
          }
          
         if(parent1.level !== 0){
            prepareArrays(parent1, level - 1, mainArr);
         }
         if(parent1.level !== 0){
            prepareArrays(parent2, level - 1, mainArr);
         }
       }
       return levelArray;
      }

      var draw = function(arrayToTraverse){
        var that = this;

        var level;
        var oldLevel;
        levelArray = prepareArrays(arrayToTraverse[arrayToTraverse.length-1], that.maxLevel, arrayToTraverse);
        levelArray[levelArray.length] = [arrayToTraverse[arrayToTraverse.length-1]];
        debugger
          for (var i = levelArray.length - 1; i >= 0; i--){
              if(i === levelArray.length - 1){
                $( "<div id="+(levelArray[i])[0].id+" class='numberCircle' title='"+(levelArray[i])[0].character+"''>"+(levelArray[i])[0].frequency+"</div>").appendTo("#graph");  
                var left = ($(window).width() - 50)/2;
                (levelArray[i])[0].left = left;
                (levelArray[i])[0].top = i;
                $("#"+(levelArray[i])[0].id).css("left", left);
                $("#"+(levelArray[i])[0].id).css("top", i);
                setPositionForParentNodes(levelArray[i], levelArray, i);
              }else{
                var levelArray_each = levelArray[i];
                for(var k = 0; k < levelArray_each.length; k++){

                  if(levelArray_each[k].parent1 === -1){
                    var character = (levelArray_each[k].character === ' ') ? 'space' : levelArray_each[k].character;
                    $( "<div id="+levelArray_each[k].id+" class='numberCircle' title='"+levelArray_each[k].frequency+"''>"+ character +"</div>").appendTo("#graph");  
                  }else{
                    $( "<div id="+levelArray_each[k].id+" class='numberCircle' title='"+levelArray_each[k].character+"''>"+levelArray_each[k].frequency+"</div>").appendTo("#graph");  
                  }
                  if(levelArray_each[k].top)
                  {
                    $("#"+ levelArray_each[k].id).css("top", levelArray_each[k].top);
                    $("#"+ levelArray_each[k].id).css("left", levelArray_each[k].left);
                  }
                  // var parent = child1 || child2;
                  // linedraw(parent.left, parent.top, levelArray_each[k].left, levelArray_each[k].top);
                }
                if(i!=0){
                  setPositionForParentNodes(levelArray_each, levelArray, i);
                }
              }
          }
      }

      function setPositionForParentNodes(array, levelArray, arrayIndex){
          var previousParent2_left;
          var previousParent2_index;
          var previousParent1_index;
          var previousChild_id;


          var level3P2;

          for(var j = 0; j < array.length; j++){
            var p1 = levelArray[arrayIndex-1].find(function(arr){return arr.id === array[j].parent1});
            var p2 = levelArray[arrayIndex-1].find(function(arr){return arr.id === array[j].parent2});

            if(p1 !== undefined){
              var childPosition = $("#"+ array[j].id).position();
              p1Index = (levelArray[arrayIndex-1]).findIndex(function(arr){return arr.id === p1.id});
              p2Index = (levelArray[arrayIndex-1]).findIndex(function(arr){return arr.id === p2.id});
              if(arrayIndex === (levelArray.length - 2)){
                if(level3P2 === undefined){
                  (levelArray[arrayIndex-1])[p1Index].left = childPosition.left - (50 * arrayIndex);
                  (levelArray[arrayIndex-1])[p1Index].top = childPosition.top + (100);
                  (levelArray[arrayIndex-1])[p2Index].left = childPosition.left;
                  (levelArray[arrayIndex-1])[p2Index].top = childPosition.top + (100);
                  level3P2 = childPosition.left;
                }else{
                  (levelArray[arrayIndex-1])[p1Index].left = childPosition.left;
                  (levelArray[arrayIndex-1])[p1Index].top = childPosition.top + (100);
                  (levelArray[arrayIndex-1])[p2Index].left = childPosition.left + (50 * arrayIndex);
                  (levelArray[arrayIndex-1])[p2Index].top = childPosition.top + (100);
                }
              } else if(arrayIndex === (levelArray.length - 1)){
                (levelArray[arrayIndex-1])[p1Index].left = childPosition.left - (60 * arrayIndex);
                (levelArray[arrayIndex-1])[p1Index].top = childPosition.top + (100);
                (levelArray[arrayIndex-1])[p2Index].left = childPosition.left + (60 * arrayIndex);
                (levelArray[arrayIndex-1])[p2Index].top = childPosition.top + (100);
              }else{
                (levelArray[arrayIndex-1])[p1Index].left = childPosition.left - (40 * arrayIndex);
                (levelArray[arrayIndex-1])[p1Index].top = childPosition.top + (100);
                (levelArray[arrayIndex-1])[p2Index].left = childPosition.left + (40 * arrayIndex);
                (levelArray[arrayIndex-1])[p2Index].top = childPosition.top + (100);

                if(previousParent2_left !== undefined){debugger;
                  if((((levelArray[arrayIndex-1])[p1Index].left) - previousParent2_left) <= 30){
                    var previousChildPos = $("#"+ previousChild_id).position();
                    if((levelArray[arrayIndex-1])[previousParent1_index].left != previousChildPos.left){
                      (levelArray[arrayIndex-1])[previousParent2_index].left = previousChildPos.left;
                    }else{
                      (levelArray[arrayIndex-1])[previousParent1_index].left = previousChildPos.left - (20 * arrayIndex);
                      (levelArray[arrayIndex-1])[previousParent2_index].left = previousChildPos.left + (20 * arrayIndex);
                    }

                    (levelArray[arrayIndex-1])[p1Index].left = childPosition.left;

                    //check again
                    var diff = (levelArray[arrayIndex-1])[p1Index].left - ((levelArray[arrayIndex-1])[previousParent2_index].left);
                    if(diff < 30){
                      (levelArray[arrayIndex-1])[p1Index].left = (levelArray[arrayIndex-1])[p1Index].left + (20 * (levelArray[arrayIndex-1])[p1Index].frequency);
                      (levelArray[arrayIndex-1])[previousParent2_index].left = (levelArray[arrayIndex-1])[previousParent2_index].left - 20;
                    }

                    (levelArray[arrayIndex-1])[p2Index].left = childPosition.left + (50 * arrayIndex);
                  }
                }
                previousParent2_left = (levelArray[arrayIndex-1])[p2Index].left;
                previousChild_id = array[j].id;
                previousParent2_index = p2Index;
                previousParent1_index = p1Index;
              }
            }
          }
      }
//shahista code ends

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
      function sortBinaryArray(removedList){
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
