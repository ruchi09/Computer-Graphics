
## Reference
1. [Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL)
2. [Code](https://github.com/mdn/webgl-examples/blob/gh-pages/tutorial/sample7/webgl-demo.js)



## Note
- The changes can be found by searching for 'Ruchi Saha' in the js code.      
- This code took reference from rotating cube and removed that cube for a blank canvas     
- The code contains total 9 rectangles (1 for background, 4 for bottom borders, 2 side borders and 2 top borders)    
      



## The lines below are modified



1) line no: 70

```javascript
        const texture = new Array(3);
        texture[0] = loadTexture(gl, 'back.jpg');
        texture[1] = loadTexture(gl, 'border2.png');
        texture[2] = loadTexture(gl, 'border.png');
        

        var then = 0;

        // Draw the scene repeatedly
        //------------------ Changed function render (by Ruchi Saha ,CED15I023)----------------------------------------------
        function render(now)
        {

          drawScene(gl, programInfo, buffers, texture);

          requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
      





```





2)   line no: 98


```javascript
           function initBuffers(gl)    // changed/added the vertex coordinates to the required ones
                                        // added indices
                                        // added and changed texture coordinates
    
```






3) Line no: 333


```javascript
    function drawScene(gl, programInfo, buffers, texture)
    
            a) removed the rotation code
            b) applying textures

                //--------------------- MODIFIED BY (by Ruchi Saha ,CED15I023) -----------------------------------------------

              // Tell WebGL we want to affect texture unit 0


              // applying cloth texture
              gl.activeTexture(gl.TEXTURE0);
              gl.bindTexture(gl.TEXTURE_2D, texture[0]);
              gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
              {
                const vertexCount = 6;
                const type = gl.UNSIGNED_SHORT;
                const offset = 0;
                gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
              }


              gl.activeTexture(gl.TEXTURE2);
              gl.bindTexture(gl.TEXTURE_2D, texture[2]);

                // side borders
              gl.uniform1i(programInfo.uniformLocations.uSampler, 2);
              {
                const vertexCount = 6;
                const type = gl.UNSIGNED_SHORT;
                const offset = 84;
                gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
              }

              // side borders
              gl.uniform1i(programInfo.uniformLocations.uSampler, 2);
              {
                const vertexCount = 6;
                const type = gl.UNSIGNED_SHORT;
                const offset = 96;
                gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
              }


              // lower borders
              gl.activeTexture(gl.TEXTURE1);
              gl.bindTexture(gl.TEXTURE_2D, texture[1]);
              gl.uniform1i(programInfo.uniformLocations.uSampler, 1);
              {
                const vertexCount = 6;
                const type = gl.UNSIGNED_SHORT;
                const offset = 12;
                gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
              }


                // lower borders
              gl.uniform1i(programInfo.uniformLocations.uSampler, 1);
              {
                const vertexCount = 6;
                const type = gl.UNSIGNED_SHORT;
                const offset = 24;
                gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
              }


                // lower borders
              gl.uniform1i(programInfo.uniformLocations.uSampler, 1);
              {
                const vertexCount = 6;
                const type = gl.UNSIGNED_SHORT;
                const offset = 36;
                gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
              }




                  // lower borders
              gl.uniform1i(programInfo.uniformLocations.uSampler, 1);
              {
                const vertexCount = 6;
                const type = gl.UNSIGNED_SHORT;
                const offset = 48;
                gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
              }



                // upper borders
              gl.uniform1i(programInfo.uniformLocations.uSampler, 1);
              {
                const vertexCount = 6;
                const type = gl.UNSIGNED_SHORT;
                const offset = 60;
                gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
              }


                // upper borders
              gl.uniform1i(programInfo.uniformLocations.uSampler, 1);
              {
                const vertexCount = 6;
                const type = gl.UNSIGNED_SHORT;
                const offset = 72;
                gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
              }


            //------------------- end of modifications-----------------------------------------------------------------
```
