// *********************************************************************************************************************************
// NAME: RUCHI SAHA
// ROLL NO: CED15I023
// PROBLEM STATEMENT: Move a circle in a straight line path
//*********************************************************************************************************************************


var mov = -5


var canvas = document.createElement('canvas');
canvas.height = 512;
canvas.width = 1000;
document.body.appendChild(canvas);
function initShaders () {
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader,
	`
	attribute vec3 aVertexPosition;

	uniform mat4 uMVMatrix;
	uniform mat4 uPMatrix;

	void main(void) {
	    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
	}
	`
	);
	gl.compileShader(vertexShader);

	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader,
	`
	precision mediump float;

	void main(void) {
	    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
	}
	`);
	gl.compileShader(fragmentShader);


	program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);

	//If creating the shader program failed, alert
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
	   alert("Unable to initialize the shader program.");
	} else {
	   //use the program
	   gl.useProgram(program);
	   program.vertexPositionAttribute = gl.getAttribLocation(program, "aVertexPosition");
       gl.enableVertexAttribArray(program.vertexPositionAttribute);

       program.pMatrixUniform = gl.getUniformLocation(program, "uPMatrix");
       program.mvMatrixUniform = gl.getUniformLocation(program, "uMVMatrix");
	}
}
var gl, program;
function initGL(canvas) {
    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}

var mvMatrix = mat4.create();
var pMatrix = mat4.create();

function setMatrixUniforms() {
    gl.uniformMatrix4fv(program.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(program.mvMatrixUniform, false, mvMatrix);
}



var circleVertexPositionBuffer;
var squareVertexPositionBuffer;

function initBuffers() {
    circleVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexPositionBuffer);
    var vertices = [];
    var vertexCount = 100;
    var radius = 1.0;
    for (var i = 0; i < vertexCount; i++)
    {

        vertices.push(radius * Math.cos((i / vertexCount) * 2.0 * Math.PI));

        vertices.push(radius * Math.sin((i / vertexCount) * 2.0 * Math.PI));

    }
    vertices.push(vertices[0]);
    vertices.push(vertices[1]);
    vertexCount += 1;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    circleVertexPositionBuffer.itemSize = 2;
    circleVertexPositionBuffer.numItems = vertexCount;
}


function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

    mat4.identity(mvMatrix);

    mat4.translate(mvMatrix,[mov, 0.0, -20.0]);
    mat4.scale(mvMatrix, [1.0, 1.0, 1.0]);
    gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexPositionBuffer);
    gl.vertexAttribPointer(program.vertexPositionAttribute, circleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.LINE_STRIP, 0, circleVertexPositionBuffer.numItems);


		mov=mov+0.05
}

function webGLStart() {
    initGL(canvas);
    initShaders();
    initBuffers();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

		function render(now)
		{

			drawScene();

			requestAnimationFrame(render);
		}
		requestAnimationFrame(render);


}

webGLStart();
