
/**
*
* UDUK Util 1.0
*
*/

var UdukUtil = {

  id: "utilities 1.0",

  unique: function(arr)
  {
    var f = {},
    i = 0,
    l = arr.length,
    r = [];
    while (i < l) {
      !f[arr[i]] && r.push(arr[i]);
      f[arr[i++]] = 1;
    }
    return r;
  },

  compare: function(arr1, arr2)
  {
    return JSON.stringify(arr1) == JSON.stringify(arr2);
  },

  diff: function(arr1, arr2)
  {
    var diff = [];
    var len = arr2.length;
    if (arr1.length == arr2.length) {
      for (var i = 0; i < len; i++) {
        diff.push(arr2[i] - arr1[i]);	
      }
    }
    return diff;
  },

  partition: function(arr, n)
  {
    var partition = [];
    var idx = 1;

    if (arr.length > n) {
      for (var i = 0; i < arr.length; i+=n, idx++) {
       var a = arr.slice(i, n * idx);
       partition.push(a);
      }
    }
    return partition;
  }
 
};
