
/**
*
* UDUK Sequence 1.0
* require: util.js
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
      var splitP = this.splitNote(sequence[p]);
      var splitN = this.splitNote(sequence[n]);
      var senarP = splitP[0];
      var fretP = splitP[1];
      var senarN = splitN[0];
      var fretN = splitN[1];
      
      var dist = (senarN - senarP);
      if (dist == 0) {
        var itv = fretN - fretP;
        interval.push(itv);		
      }
      else if (dist > 0) {
        if (senarP == 2 && senarN == 3) {
          var itv = (4 * dist) - (fretN - fretP);
          interval.push(itv);  
        }
        else {
          var itv = (5 * dist) - (fretN - fretP);
          interval.push(itv);  
        }
      }
      else if (dist < 0) {
        if (senarP == 3 && senarN == 2) {
          var itv = (-4 * dist) + (fretN - fretP);
          interval.push(itv);  
        }
        else {  
          var itv = (-5 * dist) + (fretN - fretP);
          interval.push(itv);  
        }
      }
    }
    return interval;
  },

  toMIDINote: function(s, f) {
    var six  =    [ "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2", "C3", "C#3", "D3", "D#3",
                    "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", 
                    "E4"];
    var five  =   [ "A2", "A#2", "B2", "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", 
                    "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4",
                    "A4"];
    var four  =   [ "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", 
                    "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5",
                    "D5"];
    var three =   [ "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", 
                    "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", 
                    "G5"];
    var two   =   [ "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", 
                    "B4", "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", 
                    "B5"];
    var one   =   [ "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5", "D#5", 
                    "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5", "C6", "C#6", "D6", "D#6",
                    "E6"];

    var midiNoteTable = [];
        midiNoteTable.push(["0"]);
        midiNoteTable.push(one); 
        midiNoteTable.push(two);
        midiNoteTable.push(three);
        midiNoteTable.push(four);
        midiNoteTable.push(five);
        midiNoteTable.push(six);

    s = parseInt(s);
    f = parseInt(f);
    return midiNoteTable[s][f];
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

  splitByString: function(sequence)
  {
    var stringSequence = []; 
    var skipIdx = [];

    for (var i = 0; i < sequence.length; i++) {
      var noteArray = this.splitNote(sequence[i]);
      var senar = parseInt(noteArray[0]);
      var note = parseInt(noteArray[1]);
      stringSequence.push(senar);
    }

    var n = 1;
    var p = 0;
    for (var i = 0; i < stringSequence.length - 1; i++, n++, p++) {
      var y = stringSequence[n] - stringSequence[p];
      if(y != 0) {
        skipIdx.push(i);
      }
    }
    return skipIdx;
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
  },

  fPosition: function(sequence)
  {
    var fretSize = 24;
    var itv = this.toInterval(sequence);

    var fret = [];
    for (var z = 0; z <= fretSize; z++) {
      fret.push(0);
    }

    var pointer = this.splitNote(sequence[0]);
    var c = parseInt(pointer[1]);
    var min = 0;
    var max = 0;

    fret[c]++;
    min = max = c;

    for (var i = 0; i < itv.length; i++) {
      c += itv[i]; 
      (c < min) ? min = c : min = min;
      (c > max) ? max = c : max = max;
      fret[c]++;
    }

    var fpos = fret.slice(min, max + 1);
    for (var j = 0; j < fpos.length; j++) {
      if (fpos[j] != 0) {
        fpos[j] = fpos[j] / fpos[j];
      }
    }

    return fpos;
  },

  fGap: function(fpos)
  {
    var count = 0;
    for (var i = 0; i < fpos.length; i++) {
      if (fpos[i] == 0) {
        count += 1;
      }
    }
    return count;
  }

};
