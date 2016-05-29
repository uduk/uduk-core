
<pre>
o   o o-o   o   o o  o 
|   | |  \  |   | | /  
|   | |   O |   | OO   
|   | |  /  |   | | \  
 o-o  o-o    o-o  o  o 
</pre>

```html
<script src="util.js"></script>
<script src="interval.js"></script>
<script src="sequence.js"></script>
<script src="alignment.js"></script>
<script src="harmonizer.js"></script>
```

### z type
s = sweep<br>
a = alternate<br>
l = legato<br>
t = tap<br>

short int {start, end}

<b>uduk-notation></b> a[a, l]!t!s[a] <br>
output: real-time / vexflow / midi / fl ?

<b>uduk-beat-alignment></b>

<pre>
o.......o.......  2n
....o.......o...  2
o...o...o...o...  4
.o.o.o.o.o.o.o.o  8
o.o.o.o.o.o.o.o.  8
oooooooooooooooo 16
</pre>
playrate 16 x2   32
