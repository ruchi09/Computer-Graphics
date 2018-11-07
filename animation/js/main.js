

var cubeRotation = new Array(5);   // rotation for the cubes resp
cubeRotation[0] =0;
cubeRotation[1] =0;
cubeRotation[2]=0;
cubeRotation[4] =0;
cubeRotation[3]=0;

var cubeScale_x = 1.0;
var cubeScale_y = 1.0;
var cubeScale_z = 1.0;
var t=new Array(5); // texture to be applied for the cubes resp
t[0]=1;
t[1]=1;
t[2]=1;
t[3]=1;
t[4]=1;

// will set to true when video can be copied to texture
var copyVideo = false;
var flag=0; // for controlling cube animation

var ztranslation =0.0;
var xtranslation=0.0;
var ytranslation =0.0;

var look_at = new Array(5);  // look at for the cubes resp

look_at[0] =[0 ,2,-10];
look_at[1] =[-3,2,-12];
look_at[2] =[3 ,2,-12];
look_at[3] =[-5,2,-14];
look_at[4] =[5 ,2,-14];

const zoomSpeed =0.3;  // speed with which translation (actually change in lookAt ) will happen
const originSpeed=0.15; // speed with which origin will be changed

var part=0;  // part to be executed (cube animation)
var scene=0; // the scene to be displayed


const per_look_at = new Array(5);   // permanent lookat of the cubes (when stationary)
per_look_at[0] =[0 ,2,-10];
per_look_at[1] =[-3,2,-12];
per_look_at[2] =[3 ,2,-12];
per_look_at[3] =[-5,2,-14];
per_look_at[4] =[5 ,2,-14];



const disp_look_at = new Array(5); // display lookat (value when playing video)

disp_look_at[0] =[0,0,-3.5];
disp_look_at[1] =[0,0,-3.5];
disp_look_at[2] =[0,0,-3.5];
disp_look_at[3] =[0,0,-3.5];
disp_look_at[4] =[0,0,-3.5];




var origin = new Array(5); // origins of cubes

origin[0] =[0 ,0,0];
origin[1] =[-3,0,0];
origin[2] =[3,0,0];
origin[3] =[-5,0,-5];
origin[4] =[5,0,-5];


const per_origin = new Array(5); // permanent origin of cubes

per_origin[0] =[0 ,0,0];
per_origin[1] =[-3,0,0];
per_origin[2] =[3,0,0];
per_origin[3] =[-5,0,-5];
per_origin[4] =[5,0,-5];



main();


//
// Start here
//
function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl');

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }
  // Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;

      // Apply lighting effect

      highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
      highp vec3 directionalLightColor = vec3(1, 1, 1);
      highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    uniform sampler2D uSampler;

    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

      gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    }
  `;

  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    },
  };


// scene0 buffers and textures`
  const buff_blackhole = initBuffers(gl,1 );
  const tex_blackhole = loadImageTexture(gl,"resources/screen0.png");
  const end_texture = loadImageTexture(gl,"resources/thankyou.jpg");

// scene1 buffers and textures
  const scene1_textures = new Array(2);
  const scene1_buffers = initBuffers(gl,0 );
  const video = new Array(10);

  scene1_textures[0] = initVideoTexture(gl);
  scene1_textures[1] = loadImageTexture(gl,"resources/black.jpeg");

  video[0] = setupVideo('resources/1.mp4');
  video[1] = setupVideo('resources/2.mp4');
  video[2] = setupVideo('resources/3.mp4');
  video[3] = setupVideo('resources/4.mp4');
  video[4] = setupVideo('resources/5.mp4');
  video[5] = setupVideo('resources/6.mp4');
  video[6] = setupVideo('resources/7.mp4');
  video[7] = setupVideo('resources/8.mp4');
  video[8] = setupVideo('resources/9.mp4');
  video[9] = setupVideo('resources/10.mp4');
// background
  const background_buffer = initBuffers(gl,2 );
  const background_texture = loadImageTexture(gl,"resources/gala.jpeg");


  function render(now) {

    if(scene == 0)
      scene0(gl, programInfo, buff_blackhole, tex_blackhole);
    else if(scene ==1)
    {
      if (copyVideo)
      {
        if(part==0 || part==1)
          updateVideoTexture(gl, scene1_textures[0], video[0]);
        else if(part==2 || part==3)
          updateVideoTexture(gl, scene1_textures[0], video[1]);
        else if(part==4 || part==5)
          updateVideoTexture(gl, scene1_textures[0], video[2]);
        else if(part==6 || part==7)
          updateVideoTexture(gl, scene1_textures[0], video[3]);
        else if(part==8 || part==9)
          updateVideoTexture(gl, scene1_textures[0], video[4]);
        else if(part==10 || part==11)
          updateVideoTexture(gl, scene1_textures[0], video[5]);
        else if(part==12 || part==13)
          updateVideoTexture(gl, scene1_textures[0], video[6]);
        else if(part==14 || part==15)
          updateVideoTexture(gl, scene1_textures[0], video[7]);
        else if(part==16 || part==17)
          updateVideoTexture(gl, scene1_textures[0], video[8]);
        else if(part==18 || part==19)
          updateVideoTexture(gl, scene1_textures[0], video[9]);

      }
      background(gl, programInfo, background_buffer, background_texture,[0,0,-50]);
      console.log("part=%d , x=%f, y=%f, zi%f",part,xtranslation,ytranslation,ztranslation);
      cube1(gl, programInfo, scene1_buffers, scene1_textures,video);
      cube2(gl, programInfo, scene1_buffers, scene1_textures,video);
      cube3(gl, programInfo, scene1_buffers, scene1_textures,video);
      cube4(gl, programInfo, scene1_buffers, scene1_textures,video);
      cube5(gl, programInfo, scene1_buffers, scene1_textures,video);
    }
    else if (scene==2)
      end(gl, programInfo, background_buffer, end_texture,[0,0,50]);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

}// end main




//--------------------------------------------------------------------------------------------------------
//                              BACKGROUND IMAGE
//--------------------------------------------------------------------------------------------------------


function background(gl, programInfo, buffers, texture,trans) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.
  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [trans[0],trans[1],trans[2]]);  // amount to translate


  mat4.lookAt(modelViewMatrix,[0,0,25],[0,0,0],[0,1,0]);
  const normalMatrix = mat4.create();
  mat4.invert(normalMatrix, modelViewMatrix);
  mat4.transpose(normalMatrix, normalMatrix);

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the texture coordinates from
  // the texture coordinate buffer into the textureCoord attribute.
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(
        programInfo.attribLocations.textureCoord,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.textureCoord);
  }

  // Tell WebGL how to pull out the normals from
  // the normal buffer into the vertexNormal attribute.
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexNormal,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexNormal);
  }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.normalMatrix,
      false,
      normalMatrix);

  // Specify the texture to map onto the faces.

  // Tell WebGL we want to affect texture unit 0
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.uniform1i(programInfo.uniformLocations.uSampler, 1);

  {
    const vertexCount = 6;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  // Update the rotation for the next draw

}





//--------------------------------------------------------------------------------------------------------
//                              Draw the cube scenes
//--------------------------------------------------------------------------------------------------------

function cube1(gl, programInfo, buffers, texture,video)
{

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  const modelViewMatrix = mat4.create();

  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [-0.0, 0.0, -10.0]);  // amount to translate

  mat4.lookAt(modelViewMatrix,look_at[0],[0,0,0],[0,1,0]);

  mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              cubeRotation[0],// amount to rotate in radians
              [1, 0, 0]);       // axis to rotate around (X)

  mat4.scale(modelViewMatrix, modelViewMatrix,[ cubeScale_x,cubeScale_y,cubeScale_z]);
  const normalMatrix = mat4.create();
  mat4.invert(normalMatrix, modelViewMatrix);
  mat4.transpose(normalMatrix, normalMatrix);

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the texture coordinates from
  // the texture coordinate buffer into the textureCoord attribute.
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(
        programInfo.attribLocations.textureCoord,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.textureCoord);
  }

  // Tell WebGL how to pull out the normals from
  // the normal buffer into the vertexNormal attribute.
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexNormal,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexNormal);
  }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  // Tell WebGL to use our program when drawing
  gl.useProgram(programInfo.program);
    // Set the shader uniforms
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.normalMatrix,
      false,
      normalMatrix);


  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture[0]);

  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, texture[1]);



t[0]=1;

if(video[0].ended && part==0)
{
  t[0]=1;
  part=1;
}


 if(video[9].ended && part ==18)
   {
     t[0]=1;
     part=19;
   }



 if( part==0)
 {
   console.log(disp_look_at[0]);
   console.log(compare(look_at[0],disp_look_at[0],zoomSpeed));
   if(compare(look_at[0],disp_look_at[0],zoomSpeed))
   {
     console.log("hi");
     if(flag==0)
     {
       cubeScale_x+=0.1;
       if(cubeScale_x>=1.7)
       flag=1;
     }
     else
     {
       t[0]=0;
       video[0].play();
     }
   }
   else
   look_at[0]=update_coordinates(disp_look_at[0],look_at[0],zoomSpeed);
 }




   else if(part==1)
   {
      if(cubeScale_x<=1.0)
      {
        if(compare(look_at[0],per_look_at[0],zoomSpeed))
        {
          flag=0;
          cubeScale_x=1;

          part=2;
        }

        else
          look_at[0]=update_coordinates(per_look_at[0],look_at[0],zoomSpeed);
      }
      else
      {
        cubeScale_x-=0.1;
      }

   }




    else if(part==18)
    {
      console.log("ifeskkmnsdokde part 6");
      if(cubeRotation[0]>=Math.PI/2)
      {

        console.log("done rotation");
        if(compare(look_at[0],disp_look_at[0],zoomSpeed))
        {
          if(flag==0)
          {
            cubeScale_x+=0.1;
            if(cubeScale_x>=1.7)
             flag=1;
          }
          else
          {
            t[0]=0;
            video[9].play();
          }
        }
        else
        look_at[0]=update_coordinates(disp_look_at[0],look_at[0],zoomSpeed);
      }
      else cubeRotation[0]+=0.07;
    }



   else if(part==19)
   {
     console.log("inside 7")
      if(cubeScale_x<=1.0)
      {
        if(compare(look_at[0],per_look_at[0],zoomSpeed))
        {
          // t[0]=1;
          part=20;
          // scene=2;
          cubeScale_x=1;
          cubeScale_y=1;
          cubeScale_z=1;
          flag=40;
        }

        else
          look_at[0]=update_coordinates(per_look_at[0],look_at[0],zoomSpeed);
      }
      else
      {
        cubeScale_x-=0.1;
      }

   }

   else if (part==20)
   {
     flag--;
     if(flag<-10)
      scene=2;

   }



  console.log(look_at[0]);
  console.log(" cu = %f     flag=%f, part=%d",cubeRotation[0],flag,part);

    gl.uniform1i(programInfo.uniformLocations.uSampler, t[0]);

    {
      const vertexCount = 36;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }

}// end cube1





function cube2(gl, programInfo, buffers, texture,video)
{

    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
                     fieldOfView,
                     aspect,
                     zNear,
                     zFar);

    const modelViewMatrix = mat4.create();

    mat4.translate(modelViewMatrix,     // destination matrix
                   modelViewMatrix,     // matrix to translate
                   [-3.0+xtranslation, 0.0+ytranslation, -20.0+ztranslation]);  // amount to translate

    // mat4.rotate(modelViewMatrix,  // destination matrix
    //             modelViewMatrix,  // matrix to rotate
    //             cubeRotation[0],     // amount to rotate in radians
    mat4.lookAt(modelViewMatrix,look_at[1],origin[1],[0,1,0]);
    //             [0, 0, 1]);       // axis to rotate around (Z)
    mat4.rotate(modelViewMatrix,  // destination matrix
                modelViewMatrix,  // matrix to rotate
                cubeRotation[1],// amount to rotate in radians
                [0, 1, 0]);       // axis to rotate around (X)

    mat4.scale(modelViewMatrix, modelViewMatrix,[ cubeScale_x,cubeScale_y,cubeScale_z]);
    const normalMatrix = mat4.create();
    mat4.invert(normalMatrix, modelViewMatrix);
    mat4.transpose(normalMatrix, normalMatrix);

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute
    {
      const numComponents = 3;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexPosition);
    }

    // Tell WebGL how to pull out the texture coordinates from
    // the texture coordinate buffer into the textureCoord attribute.
    {
      const numComponents = 2;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
      gl.vertexAttribPointer(
          programInfo.attribLocations.textureCoord,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.textureCoord);
    }

    // Tell WebGL how to pull out the normals from
    // the normal buffer into the vertexNormal attribute.
    {
      const numComponents = 3;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
      gl.vertexAttribPointer(
          programInfo.attribLocations.vertexNormal,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexNormal);
    }

    // Tell WebGL which indices to use to index the vertices
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
    // Tell WebGL to use our program when drawing
    gl.useProgram(programInfo.program);
      // Set the shader uniforms
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.normalMatrix,
        false,
        normalMatrix);



    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture[0]); // video

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture[1]); //image



  t[1]=1; // image

  if(video[1].ended && part==2)
  {
    t[1]=1;
    part=3;

  }


   if(video[5].ended && part==10)
     {
       t[1]=1;
       part=11;
     }



   if( part==2)
   {

     xtranslation=3;
     ytranslation=0;
     ztranslation=10.0;


     console.log("cubescale:  %f,%f,%f",cubeScale_x,cubeScale_y,cubeScale_z);


     if(compare(look_at[1],disp_look_at[1],zoomSpeed) && compare(origin[1],origin[0],originSpeed))
     {
       if(flag==0)
       {
         cubeScale_x+=0.1;
         if(cubeScale_x>=1.7)
         flag=1;
       }
       else
       {
         t[1]=0;
         video[1].play();
       }
     }
     else
     {
       origin[1] = update_coordinates(origin[0],origin[1],originSpeed);
       look_at[1]=update_coordinates(disp_look_at[1],look_at[1],zoomSpeed);
     }
   }


     else if(part==3)
     {
        if(cubeScale_x<=1.0)
        {
          if(compare(look_at[1],per_look_at[1],zoomSpeed) && compare(origin[1],per_origin[1],originSpeed))
          {
            flag=0;
            xtranslation=0.0;
            ytranslation=0.0;
            ztranslation=0.0;
            part=4;
          }
          else
          {
            look_at[1]=update_coordinates(per_look_at[1],look_at[1],zoomSpeed);
            origin[1] = update_coordinates(per_origin[1],origin[1],originSpeed);
          }

        }
        else
        {
          cubeScale_x-=0.1;
        }

     }


      else if(part==10)
      {
        xtranslation=3;
        ytranslation=0;
        ztranslation=10.0;
        console.log("ifeskkmnsdokde part 10");
        if(cubeRotation[1]>=Math.PI/2 - 0.03)
        {
          // origin[1]=origin[0];

          console.log("done rotation");
          if(compare(look_at[1],disp_look_at[1],zoomSpeed) && compare(origin[1],origin[0],originSpeed))
          {
            if(flag==0)
            {
              cubeScale_z+=0.1;
              if(cubeScale_z>=1.7)
               flag=1;
            }
            else
            {
              t[1]=0;
              video[5].play();
            }
          }
          else
          {
            look_at[1]=update_coordinates(disp_look_at[1],look_at[1],zoomSpeed);
            origin[1] = update_coordinates(origin[0],origin[1],originSpeed);
          }
        }
        else cubeRotation[1]+=0.07;
      }

     else if(part==11)
     {
       console.log("inside 11")
        if(cubeScale_z<=1.0)
        {
          if(compare(look_at[1],per_look_at[1],zoomSpeed) && compare(origin[1],per_origin[1],originSpeed))
          {
            cubeScale_x=1;
            cubeScale_y=1;
            cubeScale_z=1;
            flag=0;
            part=12;
          }

          else
          {
            origin[1] = update_coordinates(per_origin[1],origin[1],originSpeed);
            look_at[1]=update_coordinates(per_look_at[1],look_at[1],zoomSpeed);
          }
        }
        else
        {
          cubeScale_z-=0.1;
        }

     }



    console.log(look_at[1]);
    console.log(" cu = %f     flag=%f, part=%d",cubeRotation[0],flag,part);

      gl.uniform1i(programInfo.uniformLocations.uSampler, t[1]);

      {
        const vertexCount = 36;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
      }

  }// end cube2


function cube3(gl, programInfo, buffers, texture,video)
{
  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  const modelViewMatrix = mat4.create();

  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [3.0+xtranslation, 0.0+ytranslation, -10.0+ztranslation]);  // amount to translate

  mat4.lookAt(modelViewMatrix,look_at[2],origin[2],[0,1,0]);
  //             [0, 0, 1]);       // axis to rotate around (Z)
  mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              cubeRotation[2],// amount to rotate in radians
              [0, 1, 0]);       // axis to rotate around (X)

  mat4.scale(modelViewMatrix, modelViewMatrix,[ cubeScale_x,cubeScale_y,cubeScale_z]);
  const normalMatrix = mat4.create();
  mat4.invert(normalMatrix, modelViewMatrix);
  mat4.transpose(normalMatrix, normalMatrix);

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the texture coordinates from
  // the texture coordinate buffer into the textureCoord attribute.
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(
        programInfo.attribLocations.textureCoord,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.textureCoord);
  }

  // Tell WebGL how to pull out the normals from
  // the normal buffer into the vertexNormal attribute.
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexNormal,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexNormal);
  }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  // Tell WebGL to use our program when drawing
  gl.useProgram(programInfo.program);
    // Set the shader uniforms
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.normalMatrix,
      false,
      normalMatrix);




  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture[0]);

  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, texture[1]);



  t[2]=1;

  if(video[2].ended && part==4)
  {
  t[2]=1;
  part=5;

  }


  if(video[8].ended && part==16)
   {
     t[2]=1;
     part=17;
   }

  if( part==4)
  {

    // look_at[2] =disp_look_at[2];
   xtranslation=-3;
   ytranslation=0;
   ztranslation=0.0;
   // origin[2]=origin[0];
   // cubeScale_x =2;


   if(compare(look_at[2],disp_look_at[2],zoomSpeed)  && compare(origin[2],origin[0],originSpeed))
   {
     if(flag==0)
     {
       cubeScale_x+=0.1;
       if(cubeScale_x>=1.7)
       flag=1;
     }
     else
     {
       t[2]=0;
       video[2].play();
     }
   }
   else
   {
     origin[2] = update_coordinates(origin[0],origin[2],originSpeed);
     look_at[2]=update_coordinates(disp_look_at[2],look_at[2],zoomSpeed);
   }


  }



   else if(part==5)
   {
      if(cubeScale_x<=1.0)
      {
        xtranslation=0.0;
        ytranslation=0.0;
        ztranslation=0.0;
        // origin[2]=per_origin[2];
        if(compare(look_at[2],per_look_at[2],zoomSpeed) && compare(origin[2],per_origin[2],originSpeed))
        {
          flag=0;
          part=6;
        }

        else
        {
          look_at[2]=update_coordinates(per_look_at[2],look_at[2],zoomSpeed);
          origin[2] = update_coordinates(per_origin[2],origin[2],originSpeed);
        }
      }
      else
      {
        cubeScale_x-=0.1;
      }

   }




    else if(part==16)
    {
      xtranslation=-3;
      ytranslation=0;
      ztranslation=0.0;
      console.log("ifeskkmnsdokde part 16");
      if(cubeRotation[2]>=Math.PI/2 - 0.1)
      {

        // origin[2]=origin[0];
        console.log("done rotation");
        if(compare(look_at[2],disp_look_at[2],zoomSpeed) && compare(origin[2],origin[0],originSpeed))
        {
          if(flag==0)
          {
            cubeScale_z+=0.1;
            if(cubeScale_z>=1.7)
             flag=1;
          }
          else
          {
            t[2]=0;
            video[8].play();
          }
        }
        else
        {
          look_at[2]=update_coordinates(disp_look_at[2],look_at[2],zoomSpeed);
          origin[2] = update_coordinates(origin[0],origin[2],originSpeed);
        }

      }
      else cubeRotation[2]+=0.07;
    }


   else if(part==17)
   {
     console.log("part 17");
     if(cubeScale_z<=1.0)
     {
       xtranslation=0.0;
       ytranslation=0.0;
       ztranslation=0.0;
       // origin[2]=per_origin[2];
       if(compare(look_at[2],per_look_at[2],zoomSpeed) && compare(origin[2],per_origin[2],originSpeed))
       {
         flag=0;
         part=18;
       }

       else
       {
         origin[2] = update_coordinates(per_origin[2],origin[2],originSpeed);
         look_at[2]=update_coordinates(per_look_at[2],look_at[2],zoomSpeed);
       }
     }
     else
     {
       cubeScale_z-=0.1;
     }

   }

  console.log(look_at[2]);
  console.log(" cu = %f     flag=%f, part=%d",cubeRotation[0],flag,part);

    gl.uniform1i(programInfo.uniformLocations.uSampler, t[2]);

    {
      const vertexCount = 36;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }

  }// end cube 3



function cube4(gl, programInfo, buffers, texture,video)
{
  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  const modelViewMatrix = mat4.create();

  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [-5.0+xtranslation, 0.0+ytranslation, -30.0+ztranslation]);  // amount to translate

  mat4.lookAt(modelViewMatrix,look_at[3],origin[3],[0,1,0]);
  //             [0, 0, 1]);       // axis to rotate around (Z)
  mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              cubeRotation[3],// amount to rotate in radians
              [1, 0, 0]);       // axis to rotate around (X)

  mat4.scale(modelViewMatrix, modelViewMatrix,[ cubeScale_x,cubeScale_y,cubeScale_z]);
  const normalMatrix = mat4.create();
  mat4.invert(normalMatrix, modelViewMatrix);
  mat4.transpose(normalMatrix, normalMatrix);

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the texture coordinates from
  // the texture coordinate buffer into the textureCoord attribute.
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(
        programInfo.attribLocations.textureCoord,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.textureCoord);
  }

  // Tell WebGL how to pull out the normals from
  // the normal buffer into the vertexNormal attribute.
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexNormal,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexNormal);
  }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  // Tell WebGL to use our program when drawing
  gl.useProgram(programInfo.program);
    // Set the shader uniforms
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.normalMatrix,
      false,
      normalMatrix);



  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture[0]);

  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, texture[1]);



  t[3]=1;

  if(video[3].ended && part==6)
  {
  t[3]=1;
  part=7;

  }


  if(video[7].ended && part==14)
   {
     t[3]=1;
     part=15;
   }

  if( part==6)
  {

   xtranslation=5;
   ytranslation=0;
   ztranslation=20;



   if(compare(look_at[3],disp_look_at[3],zoomSpeed)&& compare(origin[3],origin[0],originSpeed))
   {
     if(flag==0)
     {
       cubeScale_x+=0.1;
       if(cubeScale_x>=1.7)
       flag=1;
     }
     else
     {
       t[3]=0;
       video[3].play();
     }
   }
   else
   {
     origin[3] = update_coordinates(origin[0],origin[3],originSpeed);
     look_at[3]=update_coordinates(disp_look_at[3],look_at[3],zoomSpeed);
   }

  }


   else if(part==7)
   {
      if(cubeScale_x<=1.0)
      {
        xtranslation=0.0;
        ytranslation=0.0;
        ztranslation=0.0;
        if(compare(look_at[3],per_look_at[3],zoomSpeed) && compare(origin[3],per_origin[3],originSpeed))
        {
          flag=0;
          part=8;
        }

        else
        {
          look_at[3]=update_coordinates(per_look_at[3],look_at[3],zoomSpeed);
          origin[3] = update_coordinates(per_origin[3],origin[3],originSpeed);
        }
      }
      else
      {
        cubeScale_x-=0.1;
      }

   }

    else if(part==14)
    {
      xtranslation=5;
      ytranslation=0;
      ztranslation=20;
      console.log("ifeskkmnsdokde part 14");
      if(cubeRotation[3]>=Math.PI/2)
      {
        console.log("done rotation");
        if(compare(look_at[3],disp_look_at[3],zoomSpeed)&& compare(origin[3],origin[0],originSpeed))
        {
          if(flag==0)
          {
            cubeScale_x+=0.1;
            if(cubeScale_x>=1.7)
             flag=1;
          }
          else
          {
            t[3]=0;
            video[7].play();
          }
        }
        else
        {
          look_at[3]=update_coordinates(disp_look_at[3],look_at[3],zoomSpeed);
          origin[3] = update_coordinates(origin[0],origin[3],originSpeed);
        }

      }
      else cubeRotation[3]+=0.07;
    }



   else if(part==15)
   {
     console.log("part 15");
     if(cubeScale_x<=1.0)
     {
       xtranslation=0.0;
       ytranslation=0.0;
       ztranslation=0.0;
       if(compare(look_at[3],per_look_at[3],zoomSpeed) && compare(origin[3],per_origin[3],originSpeed))
       {
         flag=0;
         part=16;
       }

       else
       {
         origin[3] = update_coordinates(per_origin[3],origin[3],originSpeed);
         look_at[3]=update_coordinates(per_look_at[3],look_at[3],zoomSpeed);
       }

     }
     else
     {
       cubeScale_x-=0.1;
     }

   }



  console.log(look_at[3]);
  console.log(" cu = %f     flag=%f, part=%d",cubeRotation[0],flag,part);

    gl.uniform1i(programInfo.uniformLocations.uSampler, t[3]);

    {
      const vertexCount = 36;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }

  }// end cube4




function cube5(gl, programInfo, buffers, texture,video)
{
  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  const modelViewMatrix = mat4.create();

  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [5.0+xtranslation, 0.0+ytranslation, -30.0+ztranslation]);  // amount to translate

  mat4.lookAt(modelViewMatrix,look_at[4],origin[4],[0,1,0]);
  //             [0, 0, 1]);       // axis to rotate around (Z)
  mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              cubeRotation[4],// amount to rotate in radians
              [1, 0, 0]);       // axis to rotate around (X)

  mat4.scale(modelViewMatrix, modelViewMatrix,[ cubeScale_x,cubeScale_y,cubeScale_z]);
  const normalMatrix = mat4.create();
  mat4.invert(normalMatrix, modelViewMatrix);
  mat4.transpose(normalMatrix, normalMatrix);

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the texture coordinates from
  // the texture coordinate buffer into the textureCoord attribute.
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(
        programInfo.attribLocations.textureCoord,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.textureCoord);
  }

  // Tell WebGL how to pull out the normals from
  // the normal buffer into the vertexNormal attribute.
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexNormal,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexNormal);
  }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  // Tell WebGL to use our program when drawing
  gl.useProgram(programInfo.program);
    // Set the shader uniforms
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.normalMatrix,
      false,
      normalMatrix);




  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture[0]);

  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, texture[1]);



  t[4]=1;

  if(video[4].ended && part==8)
  {
  t[4]=1;
  part=9;

  }


  if(video[6].ended && part==12)
   {
     t[4]=1;
     part=13;
   }



  if( part==8)
  {

   xtranslation=-5;
   ytranslation=0;
   ztranslation=20;

   if(compare(look_at[4],disp_look_at[4],zoomSpeed) && compare(origin[4],origin[0],originSpeed))
   {
     if(flag==0)
     {
       cubeScale_x+=0.1;
       if(cubeScale_x>=1.7)
       flag=1;
     }
     else
     {
       t[4]=0;
       video[4].play();
     }
   }
   else
  {
   look_at[4]=update_coordinates(disp_look_at[4],look_at[4],zoomSpeed);
    origin[4] = update_coordinates(origin[0],origin[4],originSpeed);
 }

}

 else if(part==9)
   {
      if(cubeScale_x<=1.0)
      {
        xtranslation=0.0;
        ytranslation=0.0;
        ztranslation=0.0;
        if(compare(look_at[4],per_look_at[4],zoomSpeed) && compare(origin[4],per_origin[4],originSpeed))
        {
          // origin[4]=per_origin[4];
          flag=0;
          part=10;
        }

        else
        {
          look_at[4]=update_coordinates(per_look_at[4],look_at[4],zoomSpeed);
          origin[4] = update_coordinates(per_origin[4],origin[4],originSpeed);
        }
      }
      else
      {
        cubeScale_x-=0.1;
      }

   }




    else if(part==12)
    {
      xtranslation=-5;
      ytranslation=0;
      ztranslation=20;
      console.log("ifeskkmnsdokde part 12");
      if(cubeRotation[4]>=Math.PI/2 )
      {
        // origin[4]=origin[0];
        console.log("done rotation");
        if(compare(look_at[4],disp_look_at[4],zoomSpeed)&& compare(origin[4],origin[0],originSpeed))
        {
          if(flag==0)
          {
            cubeScale_x+=0.1;
            if(cubeScale_x>=1.7)
             flag=1;
          }
          else
          {
            t[4]=0;
            video[6].play();
          }
        }
        else
        {
        look_at[4]=update_coordinates(disp_look_at[4],look_at[4],zoomSpeed);
        origin[4] = update_coordinates(origin[0],origin[4],originSpeed);
      }
      }
      else cubeRotation[4]+=0.07;
    }





   else if(part==13)
   {
     console.log("part 13");
     if(cubeScale_x<=1.0)
     {
       xtranslation=0.0;
       ytranslation=0.0;
       ztranslation=0.0;
       // origin[4]=per_origin[4];
       if(compare(look_at[4],per_look_at[4],zoomSpeed) && compare(origin[4],per_origin[4],originSpeed))
       {
         flag=0;
         part=14;
       }

       else
       {
         origin[4] = update_coordinates(per_origin[4],origin[4],originSpeed);
         look_at[4]=update_coordinates(per_look_at[4],look_at[4],zoomSpeed);

       }
     }
     else
     {
       cubeScale_x-=0.1;
     }

   }



  console.log(look_at[4]);
  console.log(" cu = %f     flag=%f, part=%d",cubeRotation[0],flag,part);

    gl.uniform1i(programInfo.uniformLocations.uSampler, t[4]);

    {
      const vertexCount = 36;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }

  }// end cube5




  //------------------------------------------------------------------------------------------------------
  //                                END OF CUBE SCENES
  //------------------------------------------------------------------------------------------------------







  //--------------------------------------------------------------------------------------------------------
  //                              LAST THANK YOU SCENE
  //--------------------------------------------------------------------------------------------------------


  function end(gl, programInfo, buffers, texture,trans) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    // Clear the canvas before we start drawing on it.

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
                     fieldOfView,
                     aspect,
                     zNear,
                     zFar);

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();

    // Now move the drawing position a bit to where we want to
    // start drawing the square.

    mat4.translate(modelViewMatrix,     // destination matrix
                   modelViewMatrix,     // matrix to translate
                   [trans[0],trans[1],trans[2]]);  // amount to translate

    mat4.lookAt(modelViewMatrix,[0,0,30],[0,0,0],[0,1,0]);
    const normalMatrix = mat4.create();
    mat4.invert(normalMatrix, modelViewMatrix);
    mat4.transpose(normalMatrix, normalMatrix);
    mat4.scale(modelViewMatrix, modelViewMatrix,[0.8,1,1]);
    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute
    {
      const numComponents = 3;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexPosition);
    }

    // Tell WebGL how to pull out the texture coordinates from
    // the texture coordinate buffer into the textureCoord attribute.
    {
      const numComponents = 2;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
      gl.vertexAttribPointer(
          programInfo.attribLocations.textureCoord,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.textureCoord);
    }

    // Tell WebGL how to pull out the normals from
    // the normal buffer into the vertexNormal attribute.
    {
      const numComponents = 3;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
      gl.vertexAttribPointer(
          programInfo.attribLocations.vertexNormal,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexNormal);
    }

    // Tell WebGL which indices to use to index the vertices
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

    // Tell WebGL to use our program when drawing

    gl.useProgram(programInfo.program);

    // Set the shader uniforms

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.normalMatrix,
        false,
        normalMatrix);

    // Specify the texture to map onto the faces.

    // Tell WebGL we want to affect texture unit 0
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(programInfo.uniformLocations.uSampler, 1);

    {
      const vertexCount = 6;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }


  }





//------------------------------------------------------------------------------------------------------
//   This function tries to converge point l to p by given speed
//  and returns the modified coordinates
//------------------------------------------------------------------------------------------------------


  function update_coordinates(p,l,speed)
  {

    if( !(p[1] < l[1]+speed)  || !(p[1] > l[1]-speed))
    {
      if(p[1]<l[1])
          l[1]-=speed;

      else if(p[1]>l[1])
          l[1]+=speed;
    }

    else if( !(p[2] < l[2]+speed) || !(p[2] > l[2]-speed))
    {
      if(p[2]<l[2])
        l[2]-=speed;

      else if(p[2]>l[2])
        l[2]+=speed;
    }

    else if(  !(p[0] < l[0]+speed) || !(p[0] > l[0]-speed))
    {
      if(p[0]<l[0])
        l[0]-=speed;

      else if(p[0]>l[0])
        l[0]+=speed;
    }
      return l;

  }


  //------------------------------------------------------------------------------------------------------
  //   Below function compares two 3d coordinates and returns true if they
  //       are in the specified range
  //------------------------------------------------------------------------------------------------------

  function compare(a,b,speed)
  {
    if(  (a[0] < b[0]+speed) && (a[0] > b[0]-speed))
        if( (a[1] < b[1]+speed) && (a[1] > b[1]-speed))
            if( (a[2] < b[2]+speed) && (a[2] > b[2]-speed))
                return true;
    return false;
  }
