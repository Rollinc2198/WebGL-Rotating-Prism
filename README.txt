Carter Rollins
2/28/2019


I created a triangular prism. The vertices, in order, were colored blue, magenta, cyan, white, grey, and green.
You can rotate the triangular prism in the x, y, and z axes by pressing the key x, y, and z, respectively.
You can translate the triangular prism up (positive y), down (negative y), left (negative x), and right (positive x) by pressing w, s, a, and d, respectively.
You can scale the triangular prism in the x and z directions by pressing the right arrow key and the down arrow key, respectively.
For any of those key presses, the transformation will continue until you stop pressing the key. You can combine any number of these transformations together by holding down each respective key.
For translation, if you press s and then w and hold both keys, the triangular prism will continue to move down. This is intended behavior.
The transformations are composed as such:
    1. Scalar. Both x and z scaling are applied at the same time.
    2. Rotation in x.
    3. Rotation in y.
    4. Rotation in z.
    5. Translation. Both x and y translation are applied at the same time.
Scaling is applied at 0.1 unit per tick.
Rotation is applied at 0.1 radian per tick.
Translation is applied at 0.015 unit per tick.