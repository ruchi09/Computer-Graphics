var getWebGLContext = function(canvas) {
	var webglContextParams = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
	var webglContext = null;
	for (var index = 0; index < webglContextParams.length; index++) {
		try {
			webglContext = canvas.getContext(webglContextParams[index]);
			if(webglContext) {
				//breaking as we got our context
				break;
			}
		} catch (E) {
			console.log(E);
		}
	}
	if(webglContext === null) {
		alert('WebGL is not supported on your browser.');
	} else {
		//WebGL is supported in your browser, lets render the texture
	}
	fillGLForCleanUp(webglContext);
	return webglContext;
}
var createVertexShader = function (vertexShaderSource) {
	console.log(vertexShaderSource);
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, vertexShaderSource);
	gl.compileShader(vertexShader);
	return vertexShader;
}

var createFragmentShader = function (fragmentShaderSource) {
	console.log(fragmentShaderSource);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, fragmentShaderSource);
	gl.compileShader(fragmentShader);
	return fragmentShader;
}


var createAndLinkPrograms = function (vertexShader, fragmentShader) {
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        alert('Could not initialise shaders');
    }
	gl.useProgram(program);
	return program;
}

var createAndBindBuffer = function (verticesOrIndices, bufferType) {
	var buffer = gl.createBuffer();
	gl.bindBuffer(bufferType, buffer);
	gl.bufferData(bufferType, verticesOrIndices, gl.STATIC_DRAW);
	//clear memory
	//gl.bindBuffer(bufferType, null);
	return buffer;
}

var allowAllImageSizes = function() {
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.NEAREST);
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.NEAREST);
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	 // gl.bindTexture(gl.TEXTURE_2D, null);
} 

var createAndSetupTexture = function() {
	var texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);
	allowAllImageSizes();
	gl.textures.push(texture);
	return texture;
}

var getWebGL = function (canvas, width, height) {
	if(!canvas) {
		canvas = document.createElement('canvas');
		canvas.id = 'canvas';
		canvas.width = !width ? 512 : width;
		canvas.height = !height ? 512 : height;
		document.body.appendChild(canvas);
	} else {
		canvas.width = !width ? 512 : width;
		canvas.height = !height ? 512 : height;
	}
	return getWebGLContext(canvas);
}

var fillGLForCleanUp = function (gl) {
	gl.textures = [];
	gl.framebuffers = [];
	gl.array_buffer = [];
	gl.element_array_buffers = [];
}

var clearCanvas = function() {
		if(gl === undefined) return;
		var numTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
		for (var unit = 0; unit < numTextureUnits; ++unit) {
		  gl.activeTexture(gl.TEXTURE0 + unit);
		  gl.bindTexture(gl.TEXTURE_2D, null);
		  gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		gl.bindRenderbuffer(gl.RENDERBUFFER, null);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);

		gl.deleteTexture(pseudoPaletteTex);
		gl.deleteTexture(paletteTex);
		gl.deleteTexture(textures[0]);
		gl.deleteTexture(textures[1]);
		texture !== undefined ? gl.deleteTexture(texture) : texture = undefined;
		alphaLETexture !== undefined ? gl.deleteTexture(alphaLETexture) : alphaLETexture = undefined;
		alphaHETexture !== undefined ? gl.deleteTexture(alphaHETexture) : alphaHETexture = undefined;

		gl.deleteFramebuffer(framebuffers[0]);
		gl.deleteFramebuffer(framebuffers[1]);

		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, 1, gl.STATIC_DRAW);
		gl.deleteBuffer(vertexBuffer);

		gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, 1, gl.STATIC_DRAW);
		gl.deleteBuffer(textureCoordBuffer);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, 1, gl.STATIC_DRAW);
		gl.deleteBuffer(indicesBuffer);

		var buf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buf);
		var numAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
		for (var attrib = 0; attrib < numAttributes; ++attrib) {
		  gl.vertexAttribPointer(attrib, 1, gl.FLOAT, false, 0, 0);
		}
		gl.canvas.width = 1;
		gl.canvas.height = 1;
}