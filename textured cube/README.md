
Reference:                                                                                 
      1) [Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL)          
      2) [Code](https://github.com/mdn/webgl-examples/blob/gh-pages/tutorial/sample7/webgl-demo.js)



Note:                                                                                                         
      1) The changes can be found by searching for 'Ruchi Saha' in the js code. 

Following lines were modified:


1) line 73:
```javascript
        const texture = new Array(6);
        texture[0] = loadTexture(gl, 'dot.png');
        texture[1] = loadTexture(gl, 'dot1.png');
        texture[2] = loadTexture(gl, 'dot2.png');
        texture[3] = loadTexture(gl, 'dot3.png');
        texture[4] = loadTexture(gl, 'dot4.png');
        texture[5] = loadTexture(gl, 'dot5.png');
```
        
2) line 398:
        
 ```javascript
        //////////////// Applying textures//
        //--------------------------- Modified by RUCHI SAHA (CED15I023)---------------------------------------------------

          // Tell WebGL we want to affect texture unit 0

          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, texture[0]);
          gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
          {
            const vertexCount = 6;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
          }


          gl.activeTexture(gl.TEXTURE1);
          gl.bindTexture(gl.TEXTURE_2D, texture[1]);
          gl.uniform1i(programInfo.uniformLocations.uSampler, 1);
          {
            const vertexCount = 6;
            const type = gl.UNSIGNED_SHORT;
            const offset = 12;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
          }


          gl.activeTexture(gl.TEXTURE2);
          gl.bindTexture(gl.TEXTURE_2D, texture[2]);
          gl.uniform1i(programInfo.uniformLocations.uSampler, 2);
          {
            const vertexCount = 6;
            const type = gl.UNSIGNED_SHORT;
            const offset = 24;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
          }


          gl.activeTexture(gl.TEXTURE3);
          gl.bindTexture(gl.TEXTURE_2D, texture[3]);
          gl.uniform1i(programInfo.uniformLocations.uSampler, 3);
          {
            const vertexCount = 6;
            const type = gl.UNSIGNED_SHORT;
            const offset = 36;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
          }


          gl.activeTexture(gl.TEXTURE4);
          gl.bindTexture(gl.TEXTURE_2D, texture[4]);
          gl.uniform1i(programInfo.uniformLocations.uSampler, 4);
          {
            const vertexCount = 6;
            const type = gl.UNSIGNED_SHORT;
            const offset = 48;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
          }

          gl.activeTexture(gl.TEXTURE5);
          gl.bindTexture(gl.TEXTURE_2D, texture[5]);
          gl.uniform1i(programInfo.uniformLocations.uSampler, 5);
          {
            const vertexCount = 6;
            const type = gl.UNSIGNED_SHORT;
            const offset = 60;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
          }
        //-------------------------------------- End of modifications by Ruchi Saha---------------------------------------

```
