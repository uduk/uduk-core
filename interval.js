
/**
*
* UDUK Interval 1.0
* require: JQuery UdukUtil.js
*
*/

var UdukInterval = {

  id: "interval 1.0",

  isCycle: function(interval)
  {
    var cycle = 0;
    $.each (interval, function (key, val) {
      cycle += val;
    });

    if (cycle == 0)
      return true;
    else
      return false;
  },

  isLoop: function(interval)
  {
    var loop = 0;
    var test = false;
    var mid = (interval.length - 1) / 2;
    $.each (interval, function (key, val) {
      loop += val;
      if (loop == 0 && key == mid) {
        var a1 = interval.slice(0, mid);
        var a2 = interval.slice(mid + 1, interval.length);
        test = JSON.stringify(a1) == JSON.stringify(a2);
      }

    });
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

  isChromatic: function(interval)
  {
    var ret = true;
    $.each (interval, function (key, val) {
      if ( (interval[key] != 1) && (interval[key] != -1) )  {
        ret = false 
      }
    });
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

    $.each (set, function (key, val) {
      var test = JSON.stringify(set[key]) == JSON.stringify(interval);
      if (test) {
        r = true;
      }
    });
    return r;
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
    $.each (interval, function (key, val) {
      range += val;
    });
    return range;
  },

  scale: function(interval)
  {
    var scale = [];	
    $.each (interval, function (key, val) {
      scale.push(val/Math.abs(val));
    });
    return scale;
  },

  cost: function(interval)
  {
    var flowCostP = 0.20;
    var flowCostN = 0.30;
    var flowCostSum = 0.00;

    $.each (interval, function (key, val) {
      if (val > 0) {
        flowCostSum += val * flowCostP;
      }
      else if (val < 0) {
        flowCostSum += -1 * val * flowCostN;
      }
    });
    return flowCostSum;
  },

  findCycle: function(interval)
  {
    var cyc = 0;
    var cycIdx = [];
    $.each (interval, function (key, val) {
      cyc += val;
      if (cyc == 0) {
        cycIdx.push(key);
      }
    });
    return cycIdx;
  },

  fingerBlock: function(interval)
  {
    var v = [0, 0, 0, 0];
  },

  shapeAlign: function(interval)
  {
  }

};
