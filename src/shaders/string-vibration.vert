uniform float u_time;
uniform float u_pluckTime;
uniform float u_frequency;
uniform float u_amplitude;
uniform float u_damping;
uniform float u_hover;

varying vec2 vUv;
varying float vVibration;

void main() {
  vUv = uv;

  vec3 pos = position;
  float vibration = 0.0;

  float elapsed = u_time - u_pluckTime;

  if (u_pluckTime > 0.0 && elapsed < 4.0 && elapsed > 0.0) {
    // Decaimento exponencial
    float envelope = exp(-u_damping * elapsed);

    // Onda estacionaria: maximo no centro da corda
    float standingWave = sin(3.14159 * uv.x);

    // Fundamental + 2o harmonico
    float freq = u_frequency * 0.05; // escala reduzida para visual
    float wave = sin(6.28318 * freq * elapsed) * standingWave;
    wave += 0.3 * sin(12.56637 * freq * elapsed) * sin(6.28318 * uv.x);

    vibration = u_amplitude * envelope * wave;
    pos.y += vibration;
  }

  // Hover: leve oscilacao
  if (u_hover > 0.0) {
    float hoverWave = sin(u_time * 8.0) * 0.001 * u_hover * sin(3.14159 * uv.x);
    pos.y += hoverWave;
  }

  vVibration = abs(vibration) / max(u_amplitude, 0.001);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
