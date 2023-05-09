function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (!compiled) {
    const err = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);

    throw new Error('compile shader error: ' + err);
  }

  return shader;
}

function createProgram(gl, vShader, fShader) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vShader);
  const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fShader);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);

  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    const error = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragShader);

    throw new Error('link program error: ' + error);
  }

  gl.useProgram(program);
  return program;
}

function toWebglCoords(canvas, clientX, clientY) {
  const { left, top, width, height } = canvas.getBoundingClientRect();
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  return [
    (clientX - left - halfWidth) / halfWidth,
    -(clientY - top - halfHeight) / halfHeight
  ];
}

function drawPoints(
  points,
  vertexLocation,
  fragColorLocation,
  colorGenerator = () => Float32Array([1.0, 0, 0, 1.0]),
  clearColor = [0.0, 0.0, 0.0, 1]
) {
  gl.clearColor(...clearColor);
  gl.clear(gl.COLOR_BUFFER_BIT);
  for (let index = 0; index < points.length; index++) {
    const point = points[index];
    gl.vertexAttrib3f(vertexLocation, point[0], point[1], 0);
    gl.uniform4fv(fragColorLocation, colorGenerator(point));
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}

function initVertexBuffer(gl, vertices, attribLocation) {
  // 1. 创建缓冲区对象对象
  const buffer = gl.createBuffer();
  if (!buffer) {
    throw new Error('Failed to create buffer.');
  }

  // 2. 将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  // 3. 将数据写入到缓冲区
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // 4. 将缓冲区对象分配给attribute变量
  gl.vertexAttribPointer(attribLocation, 2, gl.FLOAT, false, 0, 0);

  // 5. 开启attribute变量
  gl.enableVertexAttribArray(attribLocation);
}
