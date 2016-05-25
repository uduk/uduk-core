
/**
*
* UDUK Alignment 1.0
* require: util.js
*
*/

var UdukAlignment = {

  id: "alignment 1.0",

  list: function(set)
  {
    var setLen = set.length;
    console.log("setLen : " + setLen);
    for (var i = (setLen - 1); i >= 0; i--) {
      var chunkLen = set[i].length;
      console.log("i: " + i + " chunkLen: " + chunkLen + " val: " + set[i]);
      for (var j = 0; j < chunkLen; j++) {
        var chunk = set[i][j];
        console.log(chunk);
      }
    }
  },

  align: function(set)
  {
    var align = [];
    var i = (set.length - 1);
    do {

      var chunkLen = set[i].length;
      for (var j = 0; j < chunkLen; j++) {
        var chunk = set[i][j];
        for (var k = (j + 1); k < chunkLen; k++) {
          var c = UdukUtil.compare(chunk, set[i][k]);
          if (c) {
            var setIndex = i;
            var chunkIndex = j;
            align.push(set[setIndex][chunkIndex]);
          }
        }
      }

      i--;
    } while (i >= 0);
    return align;
  }

};
