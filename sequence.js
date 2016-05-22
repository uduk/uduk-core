
/**
  *
	* UDUK Sequence 1.0
	*
	*/

var UdukSequence = {

  id: "sequence 1.0",

  toInterval: function(sequence)
  {
    var n = 1;
    var p = 0;
    var interval = [];
    for (var i = 0; i < sequence.length - 1; i++, n++, p++) {
      var itv = sequence[n] - sequence[p];
      interval.push(itv);		
    }
    return interval;
  },

  splitNote: function(note)
  {
    var x = note.toString();
    var root = x.charAt(0).toString();
    var two = x.substr(1, 2).toString();
    var z = two.charAt(0).toString();
    var subroot = "";

    if (parseInt(z) == 0) {
      subroot = two.charAt(1);
    } else {
      subroot = two;
    }
    return [root, subroot];
  },

  fundamentalFlow: function(note)
  {
    // must be decomposed minimally
    var ff = [];
    var min = Math.min(... seq);
    var max = Math.max(... seq);
    ff.push(min);
    ff.push(max);
    return ff;
  },

  spin: function(sequence)
  {
    var len = sequence.length;
    var tmp = sequence;
    var i = len - 1;
    var spin = [];
    spin.push(tmp);

    do {
      var newSpin = [];
      newSpin.push(tmp[tmp.length - 1]);

      for (var j = 0; j < len - 1; j++) {
        newSpin.push(tmp[j]);
      }

      tmp = newSpin;
      spin.push (tmp);

      i--; 
    } while (i > 0);

    return spin;
  }

};
