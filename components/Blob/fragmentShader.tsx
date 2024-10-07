const fragmentShader = `
uniform float u_intensity; // Expected to be between 0.0 (calm) and 1.0 (stressed)
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;

void main() {
    // Calculate distortion effect
    float distort = 2.0 * vDisplacement * u_intensity * sin(vUv.y * 10.0 + u_time);

    // Calculate color based on intensity
    vec3 calmBlue = vec3(0.592, 0.812, 0.819); // Calm Blue: #97CFD1
    vec3 moderateYellow = vec3(1.0, 0.957, 0.569); // Moderate Yellow: #FFF491
    vec3 stressedRed = vec3(0.894, 0.345, 0.388); // Stressed Red: #E45863

    vec3 color;

    // Determine color based on intensity range
    if (u_intensity < 0.5) {
        // Interpolate between calm blue and moderate yellow
        float t = u_intensity * 2.0; // Scale to [0, 1] for interpolation
        color = mix(calmBlue, moderateYellow, t);
    } else {
        // Interpolate between moderate yellow and stressed red
        float t = (u_intensity - 0.5) * 2.0; // Scale to [0, 1] for interpolation
        color = mix(moderateYellow, stressedRed, t);
    }

    // Apply distortion to the color
    color *= (1.0 - distort);
    
    gl_FragColor = vec4(color, 1.0);
}

`;

export default fragmentShader;
