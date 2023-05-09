const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

const VERTEX_SHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
  }
`;

const FRAG_SHADER_SOURCE = `
  precision mediump float;
  uniform float u_drawingWidth;
  uniform float u_drawingHeight;
  void main() {
    gl_FragColor = vec4(gl_FragCoord.x / u_drawingWidth, 0.0, gl_FragCoord.y / u_drawingHeight, 1.0);
  }
`;

const program = createProgram(gl, VERTEX_SHADER_SOURCE, FRAG_SHADER_SOURCE);
const a_Position = gl.getAttribLocation(program, 'a_Position');
const u_drawingWidth = gl.getUniformLocation(program, 'u_drawingWidth');
const u_drawingHeight = gl.getUniformLocation(program, 'u_drawingHeight');

const vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);

initVertexBuffer(gl, vertices, a_Position);

gl.clearColor(1.0, 1.0, 1.0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.uniform1f(u_drawingWidth, canvas.width);
gl.uniform1f(u_drawingHeight, canvas.height);
gl.drawArrays(gl.TRIANGLES, 0, 3);
