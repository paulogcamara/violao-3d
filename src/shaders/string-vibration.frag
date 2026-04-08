uniform vec3 u_baseColor;
uniform vec3 u_glowColor;
uniform float u_hover;

varying vec2 vUv;
varying float vVibration;

void main() {
  // Cor base com mistura para glow baseado na vibracao
  vec3 color = mix(u_baseColor, u_glowColor, vVibration * 2.0);

  // Boost de emissao no hover
  color += u_glowColor * u_hover * 0.3;

  // Intensidade emissiva para bloom (> 1.0 ativa bloom por threshold)
  float emissive = 1.0 + vVibration * 3.0 + u_hover * 0.5;

  gl_FragColor = vec4(color * emissive, 1.0);
}
