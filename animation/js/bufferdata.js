const NoOfItems = 4;
const indices = new Array(NoOfItems);
const positions =new Array(NoOfItems);
const vertexNormals = new Array(NoOfItems);
const textureCoordinates = new Array(NoOfItems);

function initBuffers(gl,i) {

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions[i]), gl.STATIC_DRAW);


  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals[i]),gl.STATIC_DRAW);

  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates[i]),gl.STATIC_DRAW);


  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices[i]), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    normal: normalBuffer,
    textureCoord: textureCoordBuffer,
    indices: indexBuffer,
  };
}


//----------------------------------------------------------------------------------------------------------------
//                                  GEOMETRY OF THE FIRST CUBE (SCENE 1)
//---------------------------------------------------------------------------------------------------------------


indices[0] = [
  0,  1,  2,      0,  2,  3,    // front
  4,  5,  6,      4,  6,  7,    // back
  8,  9,  10,     8,  10, 11,   // top
  12, 13, 14,     12, 14, 15,   // bottom
  16, 17, 18,     16, 18, 19,   // right
  20, 21, 22,     20, 22, 23,   // left
];

positions[0] = [
  // Front face
  -1.0, -1.0,  1.0,
  1.0, -1.0,  1.0,
  1.0,  1.0,  1.0,
  -1.0,  1.0,  1.0,

  // Back face
  -1.0, -1.0, -1.0,
  -1.0,  1.0, -1.0,
  1.0,  1.0, -1.0,
  1.0, -1.0, -1.0,

  // Top face
  -1.0,  1.0, -1.0,
  -1.0,  1.0,  1.0,
  1.0,  1.0,  1.0,
  1.0,  1.0, -1.0,

  // Bottom face
  -1.0, -1.0, -1.0,
  1.0, -1.0, -1.0,
  1.0, -1.0,  1.0,
  -1.0, -1.0,  1.0,

  // Right face
  1.0, -1.0, -1.0,
  1.0,  1.0, -1.0,
  1.0,  1.0,  1.0,
  1.0, -1.0,  1.0,

  // Left face
  -1.0, -1.0, -1.0,
  -1.0, -1.0,  1.0,
  -1.0,  1.0,  1.0,
  -1.0,  1.0, -1.0,
];


vertexNormals[0] = [
  // Front
  0.0,  0.0,  1.0,
  0.0,  0.0,  1.0,
  0.0,  0.0,  1.0,
  0.0,  0.0,  1.0,

  // Back
  0.0,  0.0, -1.0,
  0.0,  0.0, -1.0,
  0.0,  0.0, -1.0,
  0.0,  0.0, -1.0,

  // Top
  0.0,  1.0,  0.0,
  0.0,  1.0,  0.0,
  0.0,  1.0,  0.0,
  0.0,  1.0,  0.0,

  // Bottom
  0.0, -1.0,  0.0,
  0.0, -1.0,  0.0,
  0.0, -1.0,  0.0,
  0.0, -1.0,  0.0,

  // Right
  1.0,  0.0,  0.0,
  1.0,  0.0,  0.0,
  1.0,  0.0,  0.0,
  1.0,  0.0,  0.0,

  // Left
  -1.0,  0.0,  0.0,
  -1.0,  0.0,  0.0,
  -1.0,  0.0,  0.0,
  -1.0,  0.0,  0.0,
];



textureCoordinates[0] = [
  // Front
  0.0,  0.0,
  0.0,  1.0,
  1.0,  1.0,
  1.0,  0.0,
  // Back
  1.0,  1.0,
  1.0,  0.0,
  0.0,  0.0,
  0.0,  1.0,
  // Top
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
  0.0,  1.0,
  // Bottom
  1.0,  0.0,
  0.0,  0.0,
  0.0,  1.0,
  1.0,  1.0,
  // Right
  1.0,  1.0,
  1.0,  0.0,
  0.0,  0.0,
  0.0,  1.0,
  // Left
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
  0.0,  1.0,
];


//----------------------------------------------------------------------------------------------------------------
//                                  GEOMETRY OF THE FIRST SCREEN (BLACK HOLE TEXT)
//---------------------------------------------------------------------------------------------------------------

indices[1] = [  0,  1,  2,  0,  2,  3,  ];

positions[1] = [
  // Front face
  1.0,  1.0,  1.0,
  -1.0,  1.0,  1.0,
  -1.0, -1.0,  1.0,
  1.0, -1.0,  1.0,
];


  vertexNormals[1] = [
    // Front
    0.0,  0.0, 1.0,
    0.0,  0.0, 1.0,
    0.0,  0.0, 1.0,
    0.0,  0.0, 1.0,
];

textureCoordinates[1] = [
  // Front
  1.0,  0.0,
  0.0,  0.0,
  0.0,  1.0,
  1.0,  1.0,
];





//----------------------------------------------------------------------------------------------------------------
//                                  GEOMETRY OF THE BACKGROUND
//---------------------------------------------------------------------------------------------------------------


indices[2] = [  0,  1,  2,  0,  2,  3,  ];

positions[2] = [
  // Front face
  -20.0, -10.0,  1.0,
  -20.0,  10.0,  1.0,
  20.0,  10.0,  1.0,
  20.0, -10.0,  1.0,
];


  vertexNormals[2] = [
    // Front
    0.0,  0.0,  1.0,
    0.0,  0.0,  1.0,
    0.0,  0.0,  1.0,
    0.0,  0.0,  1.0,
];


textureCoordinates[2] = [
  // Front
  0.0,  1.0,
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
];
