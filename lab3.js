var gl;
var myShaderProgram;
var alpha = 0;
var beta = 0;
var gamma = 0;
var rX = false;
var rY = false;
var rZ = false;
var tXp = false;
var tYp = false;
var tXn = false;
var tYn = false;
var sX = false;
var sZ = false;
var movex = 0.0;
var movey = 0.0;
var posx = 0.0;
var posy = 0.0;
var scalex = 1.0;
var scalez = 1.0;

function initGL() {
    var canvas=document.getElementById("gl-canvas");
    gl=WebGLUtils.setupWebGL(canvas);
    
    if (!gl) { alert( "WebGL is not available" ); }
    
    gl.viewport( 0, 0, 512, 512 );
    
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);``
    
    
    myShaderProgram =
        initShaders( gl,"vertex-shader", "fragment-shader" );
    gl.useProgram( myShaderProgram );
    
    setupShape();
    
    render();

}

function setupShape() {
    
    // Vertices of Shape
    var vertices = [vec4( -.2,   0, -.2,  1), // p0
                    vec4(  .2,  .2,  .2,  1), // p1
                    vec4( -.2,  .2,  .2,  1), // p2
                    vec4( -.2, -.2,  .2,  1), // p3
                    vec4(  .2, -.2,  .2,  1), // p4
                    vec4(  .2,   0, -.2,  1)];// p5  

    // Colors at Vertices of Shape
    var vertexColors = [vec4( 0.0, 0.0, 1.0, 1.0), // p0
                        vec4( 1.0, 0.0, 1.0, 1.0), // p1
                        vec4( 0.0, 1.0, 1.0, 1.0), // p2
                        vec4( 1.0, 1.0, 1.0, 1.0), // p3
                        vec4( 0.3, 0.3, 0.3, 1.0), // p4
                        vec4( 0.0, 1.0, 0.0, 1.0)];// p5

    var indexList = [
        0, 2, 3,
        5, 1, 4,
        5, 0, 3,
        5, 3, 4,
        0, 5, 1,
        0, 2, 1,
        2, 4, 1,
        2, 4, 3
    ];

    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indexList), gl.STATIC_DRAW);

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    var myPosition = gl.getAttribLocation( myShaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPosition );
    
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW );
    
    var myColor = gl.getAttribLocation( myShaderProgram, "myColor" );
    gl.vertexAttribPointer( myColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myColor );
    
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    if (rX) rotateX();
    if (rY) rotateY();
    if (rZ) rotateZ();
    if (tXn || tXp) translateX();
    if (tYn || tYp) translateY();
    if (sX) scaleX();
    if (sZ) scaleZ();
    gl.uniform1f(gl.getUniformLocation(myShaderProgram, "scalex"), scalex);
    gl.uniform1f(gl.getUniformLocation(myShaderProgram, "scalez"), scalez);

    gl.drawElements(gl.TRIANGLES, 24, gl.UNSIGNED_BYTE, 0);
    
    requestAnimationFrame(render);
    
}

function transformS (event) {
    var keycode = event.keyCode;
    if (keycode == 88) { //x Rotate around x axis
        rX = true;
    }
    if (keycode == 89) { //y Rotate around y axis
        rY = true;
    }
    if (keycode == 90) { //z Rotate around z axis
        rZ = true;
    }
    if (keycode == 65 && !tXp) { //a translate left
        tXn = true;
        movex = -1.0;
    }
    if (keycode == 68 && !tXn) { //d translate right
        tXp = true;
        movex = 1.0;
    }
    if (keycode == 83 && !tYp) { //s translate down
        tYn = true;
        movey = -1.0;
    }
    if (keycode == 87 && !tYn) { //w translate up
        tYp = true;
        movey = 1.0;
    }
    if (keycode == 39) { //right Scale along the X axis
        sX = true;
    }
    if (keycode == 40) { //down Scale along the Z axis
        sZ = true;
    }
}

function transformF (event) {
    var keycode = event.keyCode;
    if (keycode == 88) { //x Rotate around x axis
        rX = false;
    }
    if (keycode == 89) { //y Rotate around y axis
        rY = false;
    }
    if (keycode == 90) { //z Rotate around z axis
        rZ = false;
    }
    if (keycode == 65 && !tXp) { //a translate left
        tXn = false;
        movex = 0.0;
    }
    if (keycode == 68 && !tXn) { //d translate right
        tXp = false;
        movex = 0.0;
    }
    if (keycode == 83 && !tYp) { //s translate down
        tYn = false;
        movey = 0.0;
    }
    if (keycode == 87 && !tYn) { //w translate up
        tYp = false;
        movey = 0.0;
    }
    if (keycode == 39) { //right Scale along the X axis
        sX = false;
    }
    if (keycode == 40) { //down Scale along the Z axis
        sZ = false;
    }
}

function rotateX() {
    alpha += .1;
    gl.uniform1f(gl.getUniformLocation(myShaderProgram, "alpha"), alpha);
}

function rotateY() {
    beta += .1;
    gl.uniform1f(gl.getUniformLocation(myShaderProgram, "beta"), beta);
}

function rotateZ(){
    gamma += .1;
    gl.uniform1f(gl.getUniformLocation(myShaderProgram, "gamma"), gamma);
}

function translateX() {
    posx += movex * 0.015;
    gl.uniform1f(gl.getUniformLocation(myShaderProgram, "posx"), posx);
}

function translateY() {
    posy += movey * 0.015;
    gl.uniform1f(gl.getUniformLocation(myShaderProgram, "posy"), posy);
}

function scaleX() {
    scalex +=  0.1;
    gl.uniform1f(gl.getUniformLocation(myShaderProgram, "scalex"), scalex);
}

function scaleZ() {
    scalez += 0.1;
    gl.uniform1f(gl.getUniformLocation(myShaderProgram, "scalez"), scalez);
}
