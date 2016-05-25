
/**
*
* UDUK Interval 1.0
* require: util.js
*
*/

var UdukInterval = {

  id: "interval 1.0",

  isCycle: function(interval)
  {
    var cycle = 0;
    for (var i = 0; i < interval.length; i++) {
      cycle += interval[i];
    }

    if (cycle == 0) {
      return true;
    }
    else {
      return false;
    }
  },

  isLoop: function(interval)
  {
    var loop = 0;
    var test = false;
    var mid = (interval.length - 1) / 2;
    for (var i = 0; i < interval.length; i++) {
      loop += interval[i];
      if (loop == 0 && i == mid) {
        var a1 = interval.slice(0, mid);
        var a2 = interval.slice(mid + 1, interval.length);
        test = JSON.stringify(a1) == JSON.stringify(a2);
      }

    }
    return test;
  },

  isReverse: function(interval)
  {
    var a1 = [];
    var a2 = [];
    var mid = (interval.length - 1) / 2;
    if (interval[mid] == 0) {
      for(var i = 0; i < mid; i++) {
        a1.push(interval[i]);
      }
      for(var i = mid + 1; i < interval.length; i++) {
        a2.push(interval[i] * -1);
      }
    }
    return JSON.stringify(a1) == JSON.stringify(a2.reverse());
  },

  isFlow: function(interval)
  {
    var mid = (interval.length - 1) / 2;
    var a1 = interval.slice(0, mid);
    var a2 = interval.slice(mid + 1, interval.length);
    return JSON.stringify(a1) == JSON.stringify(a2);
  },

  isSimilarFlow: function(interval1, interval2)
  {
    var len = interval1.length;
    var ret = true;
    if (interval1.length == interval2.length) {
      var s1 = this.scale(interval1);
      var s2 = this.scale(interval2);
      for (var i = 0; i < len; i++) {
        if (s1[i] != s2[i]) {
          ret = false;
        }
      }
    }
    else {
      ret = false;
    }
    return ret;
  },

  isChromatic: function(interval)
  {
    var ret = true;
    for (var i = 0; i < interval.length; i++) {
      if ( (interval[i] != 1) && (interval[i] != -1) )  {
        ret = false 
      }
    }
    return ret;
  },

  isTriplet: function(interval)
  {
    var r = false;
    var set = [];
    set.push([1, 2]);
    set.push([2, 1]);
    set.push([-1, -2]);
    set.push([-2, -1]);

    for (var i = 0; i < set.length; i++) {
      var test = JSON.stringify(set[i]) == JSON.stringify(interval);
      if (test) {
        r = true;
      }
    }
    return r;
  },

  isOneWay: function(interval)
  {
    var c = this.locateChange(interval);
    if (c.length == 0) {
      return true;
    }
    else {
      return false;
    }
  },

  measureDirection: function(interval1, interval2)
  {
    var len = interval2.length;
    var p = (100 / len) / 100;
    var counter = 0;

    if (interval1.length == interval2.length) {
      var diff = UdukUtil.diff ( this.scale(interval1), this.scale(interval2) );

      for (var i = 0; i < len; i++) {
        if (diff[i] != 0) {
          counter++;
        }
      }
    }
    else {
      return -1;
    }
    return (counter * p);
  },

  measureRange: function(interval)
  {
    var range = 0;
    for (var i = 0; i < interval.length; i++) {
      range += interval[i];
    }
    return range;
  },

  scale: function(interval)
  {
    var scale = [];	
    for (var i = 0; i < interval.length; i++) {
      if (interval[i] == 0) {
        scale.push(interval[i]);
      }
      else if(interval[i] != 0) {
        scale.push(interval[i]/Math.abs(interval[i]));
      }
    }
    return scale;
  },

  toNote: function (start, interval)
  {
    var s = start;
    var ret = [];
    ret.push(s);
    for (var i = 0; i < interval.length; i++) {
      s += interval[i];
      ret.push(s);
    }
    return ret;
  },

  reverse: function (interval)
  {
    return (interval.reverse());
  },

  mirror: function (interval)
  {
    var ret = [];
    for (var i = 0; i < interval.length; i++) {
      if (interval[i] == 0) {
        ret.push(interval[i]);
      }
      else if (interval[i] != 0) {
        ret.push(interval[i] * -1);
      }
    }
    return ret;
  },

  cost: function(interval)
  {
    var flowCostP = 0.20;
    var flowCostN = 0.30;
    var flowCostSum = 0.00;

    for (var i = 0; i < interval.length; i++) {
      if (interval[i] > 0) {
        flowCostSum += interval[i] * flowCostP;
      }
      else if (interval[i] < 0) {
        flowCostSum += -1 * interval[i] * flowCostN;
      }
    }
    return flowCostSum;
  },

  findCycle: function(interval)
  {
    var cyc = 0;
    var cycIdx = [];
    for (var i = 0; i < interval.length; i++) {
      cyc += interval[i];
      if (cyc == 0) {
        cycIdx.push(i);
      }
    }
    return cycIdx;
  },

  sumFlow: function(interval)
  {
    var flow = [0, 0, 0];
    for (var i = 0; i < interval.length; i++) {
      if (interval[i] == 0) {
        flow[1] += 1;
      }
      else if (interval[i] > 0) {
        flow[2] += 1;
      }
      else if (interval[i] < 0) {
        flow[0] += 1;
      }
    }
    return flow;
  },

  locateChange: function(interval)
  {
    var change = [];
    var scaled = this.scale(interval);
    var c = scaled[0];
    for (var i = 0; i < scaled.length; i++) {
      if (c != scaled[i]) {
        c = scaled[i]
        change.push(i);
      }
    }
    return change;
  },

  changeSet: function(change)
  {
    var s = 0;
    var e = 0;
    var set = [];
    for (var i = 0; i < c.length; i++) {
      s = e;
      e = c[i] + 1;
      set.push(seq.slice(s, e));
    }
    s = e;
    set.push(seq.slice(s, seq.length));
    return set;
  }

};
