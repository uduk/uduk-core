/**
*
* UDUK Harmonizer 1.0
*
*/

var UdukHarmonizer = {

  id: "harmonizer 1.0",

  chaoticInterval: function(min, max, numOfResults)
  {
    var chaotic = [];
    for (var i = 0; i < numOfResults; i++) {
    var rnd = Math.floor(Math.random() * (max - min)) + min;
    chaotic.push(rnd);
    }
    return chaotic
  },

  functionalInterval: function(start, callbackFunction, numOfResults)
  {
    var s = start;
    var func = [];
    for (var i = 0; i < numOfResults; i++) {
      var r = callbackFunction(s);
      s = r;
      func.push(r);
    }
    return func;
  },

  basicMarkov: function(seed, map, markovMatrix, numOfResults) 
  {
    /* basicMarkov: http://explodingart.com/jmusic/jmtutorial/Markov1.html */
    var ret = [];
    var output = 0;
    ret.push(map[seed]);

    for(var i = 0; i < numOfResults; i++) {
      var choice = Math.random();
      var currentSum = 0.0;
      for(;output<markovMatrix.length;output++) {
        currentSum += markovMatrix[seed][output];
        if (choice <= currentSum) {
          break;
        }
      }
      ret.push(map[output]);
      seed = output;
      output = 0;
    }
    return ret;
  },

  stochasticMatrix: function(matrix, numOfResults)
  {
    /* stochasticMatrix: http://explodingart.com/jmusic/jmtutorial/Markov0.html */
    var ret = [];
    for (var i = 0; i < numOfResults; i++) {
      var choice = Math.random();
      var currentSum = 0.0;
      var result = 0;
      for(; result < matrix[0].length; result++) {
        currentSum += matrix[1][result];
        if (choice <= currentSum){
          break;
        }
      }
      ret.push(matrix[0][result]);
    }
    return ret;
  }

};
