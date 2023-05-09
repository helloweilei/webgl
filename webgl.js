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
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
`;

const program = createProgram(gl, VERTEX_SHADER_SOURCE, FRAG_SHADER_SOURCE);
const a_Position = gl.getAttribLocation(program, 'a_Position');
const u_FragColor = gl.getUniformLocation(program, 'u_FragColor');

if (!u_FragColor) {
  console.error('Failed to get uniform u_FragColor');
}

const vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);

initVertexBuffer(gl, vertices, a_Position);

gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.uniform4f(u_FragColor, 1.0, 0.0, 1.0, 1);
gl.drawArrays(gl.LINE_LOOP, 0, 3);

// const points = [];
// canvas.addEventListener('click', (e) => {
//   const { clientX, clientY } = e;
//   const point = toWebglCoords(canvas, clientX, clientY);
//   points.push(point);

//   drawPoints(points, a_Position, u_FragColor, ([x, y]) => {
//     if (x > 0 && y > 0) {
//       return new Float32Array([1.0, 0, 0, 1.0]);
//     } else if (x < 0 && y < 0) {
//       return new Float32Array([0, 1.0, 0, 1.0]);
//     } else {
//       return new Float32Array([1.0, 1.0, 1.0, 1.0]);
//     }
//   });
// });
