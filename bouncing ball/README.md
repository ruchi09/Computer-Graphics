

Reference:                                                                                 
      1) [Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL)          
      2) [Code](https://github.com/mdn/webgl-examples/blob/gh-pages/tutorial/sample7/webgl-demo.js)



Note:                                                                                                         
      1) The changes can be found by searching for 'Ruchi Saha' in the js code. 

Below lines were modified:

//****************************************************************************************************************************

1) line 80
```javascript
        const texture = new Array(1);
        texture[0] = loadTexture(gl, 'ball2.jpg')
```
 
 
 
//**************************************************************************************************************************
        
2)  line 107:
```javascript        
          function initBuffers(gl) {

          // Create a buffer for the cube's vertex positions.

          const positionBuffer = gl.createBuffer();

          // Select the positionBuffer as the one to apply buffer
          // operations to from here out.

          gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

          // Now create an array of positions for the cube.

          const positions = [
            // rectangle
            -0.5, -0.5,  -90.0,
             0.5, -0.5,  -90.0,
             0.5,  0.5,  -90.0,
            -0.5,  0.5,  -90.0,

          ];

          // Now pass the list of positions into WebGL to build the
          // shape. We do this by creating a Float32Array from the
          // JavaScript array, then use it to fill the current buffer.

          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

          // Now set up the texture coordinates for the faces.

          const textureCoordBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

          const textureCoordinates = [
            // 3d ball
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
          ];

          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
                        gl.STATIC_DRAW);

          // Build the element array buffer; this specifies the indices
          // into the vertex arrays for each face's vertices.

          const indexBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

          // This array defines each face as two triangles, using the
          // indices into the vertex array to specify each triangle's
          // position.

          const indices = [
            0,  1,  2,      0,  2,  3,    // ball
          ];

          // Now send the element array to GL

          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
              new Uint16Array(indices), gl.STATIC_DRAW);

          return {
            position: positionBuffer,
            textureCoord: textureCoordBuffer,
            indices: indexBuffer,
          };
        }

//***************************************************************************************************************************
```

   3) function drawScene(gl, programInfo, buffers, texture, deltaTime)
   
```javascript   
        a) line 274:
    
        mat4.translate(modelViewMatrix,     // destination matrix
        modelViewMatrix,     // matrix to translate
        [-0.0, bounce_y,bounce_z]);  // amount to translate
        
        b) line 348:
        
          // applying 3d ball texture
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, texture[0]);
          gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
          {
            const vertexCount = 6;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
          }

        //---------- coordinate calculation for bouncing ball  (by Ruchi Saha, CED15I023)---------------------------------
          bounce_z += 0.2;
          if (flag==0)
            bounce_y+=0.1;
          else
            bounce_y-=0.1;

          if (bounce_y<=0.0)
              flag =0;
          else if (bounce_y >= 5.0)
              flag=1;


```
