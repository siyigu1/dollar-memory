/**
 * Fall afternoon shader background
 * - Background image with WebGL shader overlay
 * - Falling maple leaves (masked to window regions only)
 * - Warm afternoon light with subtle god rays
 */
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
  if (!gl) {
    console.warn('WebGL not available, falling back to static background');
    canvas.style.backgroundImage = 'url(background/BlogFeature_FallLight_1200x630.webp)';
    canvas.style.backgroundSize = 'cover';
    canvas.style.backgroundPosition = 'center';
    return;
  }

  // ─── Shader sources ───

  const vertSrc = `
    attribute vec2 a_position;
    varying vec2 v_uv;
    void main() {
      v_uv = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragSrc = `
    precision highp float;

    varying vec2 v_uv;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform sampler2D u_image;
    uniform float u_imageAspect;

    #define PI 3.14159265359
    #define saturate(x) clamp(x, 0.0, 1.0)

    // ─── Hash functions (from reference shader) ───
    float hash11(float p) {
      p = fract(p * 0.1031);
      p *= p + 33.33;
      p *= p + p;
      return fract(p);
    }

    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    // ─── Noise for god rays ───
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash12(i);
      float b = hash12(i + vec2(1.0, 0.0));
      float c = hash12(i + vec2(0.0, 1.0));
      float d = hash12(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    // ─── 2D rotation ───
    vec2 rot2d(vec2 p, float a) {
      float c = cos(a);
      float s = sin(a);
      return vec2(c * p.x - s * p.y, s * p.x + c * p.y);
    }

    // ─── Rect helper: 1.0 if uv is inside the rectangle ───
    float rect(vec2 uv, float xMin, float yMin, float xMax, float yMax) {
      vec2 d = step(vec2(xMin, yMin), uv) * step(uv, vec2(xMax, yMax));
      return d.x * d.y;
    }

    // ─── Frame mask: 1.0 on any window frame/mullion, 0.0 on glass ───
    // Every frame bar measured from the 1200x630 image, converted to WebGL UV.
    float frameMask(vec2 uv) {
      float m = 0.0;

      // ── Thick structural frames (dark wood posts) ──
      // Left corner post
      m = max(m, rect(uv, 0.0, 0.3492, 0.2300, 0.8413));
      // Back divider 1 (left of center-left)
      m = max(m, rect(uv, 0.3400, 0.3492, 0.3680, 0.8175));
      // Center post
      m = max(m, rect(uv, 0.4705, 0.3492, 0.4950, 0.8175));
      // Back divider 2 (right of center-right)
      m = max(m, rect(uv, 0.5965, 0.3492, 0.6200, 0.8175));
      // Right corner post
      m = max(m, rect(uv, 0.8385, 0.3492, 0.8835, 0.8413));

      // Top beam (back windows top)
      m = max(m, rect(uv, 0.0, 0.7590, 1.0, 0.8580));
      // Bottom beam full
      m = max(m, rect(uv, 0.0, 0.3500, 1.0, 0.4050));

      // ── Thin mullions (black metal bars) ──

      // Horizontal mullion across all back panels
      m = max(m, rect(uv, 0.2, 0.6280, 0.7500, 0.6370));
      m = max(m, rect(uv, 0.2, 0.5000, 0.7500, 0.5060));

      // Left-back panel vertical mullions
      m = max(m, rect(uv, 0.2870, 0.3492, 0.2900, 0.8175));

      // Center-left panel vertical mullions
      m = max(m, rect(uv, 0.4170, 0.3492, 0.4200, 0.8175));

      // Center-right panel vertical mullions
      m = max(m, rect(uv, 0.5440, 0.3492, 0.5490, 0.8175));

      // Right-back panel vertical mullions
      m = max(m, rect(uv, 0.6700, 0.3492, 0.6730, 0.8175));
      m = max(m, rect(uv, 0.7200, 0.3492, 0.7500, 0.8175));
      m = max(m, rect(uv, 0.7885, 0.3492, 0.7910, 0.8175));

      // Left-side window vertical mullions
      m = max(m, rect(uv, 0.0792, 0.3492, 0.1100, 0.8375));
      m = max(m, rect(uv, 0.1570, 0.3492, 0.1610, 0.8375));


      // Left-side horizontal mullion
      //m = max(m, rect(uv, 0.0125, 0.6480, 0.2300, 0.6520));
      //m = max(m, rect(uv, 0.0125, 0.5100, 0.2300, 0.5130));

      // Right-side horizontal mullion
      //m = max(m, rect(uv, 0.84, 0.5841, 0.9833, 0.6063));



      // ── Gable diagonal roof beams ──
      // Left beam: UV (0.200, 0.810) to (0.496, 0.971), ~20px thick
      {
        vec2 a = vec2(0.200, 0.810);
        vec2 b = vec2(0.496, 0.971);
        vec2 ab = b - a;
        float t = clamp(dot(uv - a, ab) / dot(ab, ab), 0.0, 1.0);
        float d = length(uv - (a + ab * t));
        m = max(m, 1.0 - smoothstep(0.012, 0.018, d));
      }
      // Right beam: UV (0.504, 0.971) to (0.800, 0.810)
      {
        vec2 a = vec2(0.504, 0.971);
        vec2 b = vec2(0.800, 0.810);
        vec2 ab = b - a;
        float t = clamp(dot(uv - a, ab) / dot(ab, ab), 0.0, 1.0);
        float d = length(uv - (a + ab * t));
        m = max(m, 1.0 - smoothstep(0.012, 0.018, d));
      }

      return saturate(m);
    }

    // ─── Window mask: 1.0 = glass (outside visible), 0.0 = interior/wall/frame ───
    float windowMask(vec2 uv) {
      float mask = 0.0;
      float edge = 0.005;

      // Broad window regions (generous bounds that cover all glass)

      // Gable triangle: peak (0.50, 0.976), base at y=0.817
      {
        float baseY = 0.817;
        float peakY = 0.976;
        float leftX = 0.20;
        float rightX = 0.80;
        float tLeft = clamp((uv.x - leftX) / (0.50 - leftX), 0.0, 1.0);
        float tRight = clamp((rightX - uv.x) / (rightX - 0.50), 0.0, 1.0);
        float slopeY = mix(baseY, peakY, min(tLeft, tRight));
        float inTri = step(baseY, uv.y) * step(uv.y, slopeY)
                    * step(leftX, uv.x) * step(uv.x, rightX);
        mask = max(mask, inTri);
      }

      // All back wall + side windows: broad rect covering y 0.37 to 0.82
      {
        float inWin = step(0.005, uv.x) * step(uv.x, 0.995)
                    * step(0.37, uv.y) * step(uv.y, 0.82);
        mask = max(mask, inWin);
      }

      // Subtract frames — leaves are hidden on frame pixels
      mask *= (1.0 - frameMask(uv));

      return saturate(mask);
    }

    // ─── Maple leaf SDF (2D, simplified from reference's fMapleLeaf) ───
    float sdLeaf(vec2 p, float size) {
      p /= size;

      float a = atan(p.x, p.y);
      float r = length(p);

      // 5-lobed maple shape with serrated edges
      float lobes = 0.32
                  + 0.18 * cos(a * 5.0)   // 5 main pointed lobes
                  + 0.04 * cos(a * 10.0);  // serration on lobe edges

      // Taper: narrower at bottom, wider at top
      lobes *= 0.7 + 0.3 * smoothstep(-0.5, 0.2, p.y);

      float leaf = r - lobes;

      // Small stem — only below the leaf body (p.y < -0.25), clamped to center
      float stemDist = max(abs(p.x) - 0.04, -(p.y + 0.25));
      stemDist = max(stemDist, p.y + 0.6); // stem ends at y = -0.6
      leaf = min(leaf, stemDist);

      return leaf * size;
    }

    // ─── Single falling leaf ───
    // Returns: vec4(r, g, b, alpha) for this leaf
    vec4 fallingLeaf(vec2 uv, float id, float time) {
      float rand = hash11(id * 68.76);
      float rand2 = hash11(id * 137.531);
      float rand3 = hash11(id * 243.17);

      // Fall parameters (inspired by reference lines 656-662)
      float fallDuration = 12.0 + rand * 8.0;
      float fallTime = time * (0.8 + rand * 0.6) + rand * fallDuration;
      float iter = floor(fallTime / fallDuration);
      fallTime = fallTime - iter * fallDuration;

      // Start near top of window area, fall to bottom of windows
      // Window Y range: ~0.39 (bottom) to ~0.80 (top)
      float startX = 0.10 + rand2 * 0.80;
      float startY = 0.78 + rand3 * 0.10; // start near/above window top

      // Fall position — leaves fall downward (decreasing Y)
      float progress = fallTime / fallDuration;
      float y = startY - progress * 0.55; // fall ~0.55 units, reaching below window bottom

      // Sinusoidal side-to-side drift (from reference line 662)
      float xOff = sin(fallTime * 0.75 + iter * PI) + cos(fallTime * 1.5 + iter * PI) * 0.5;
      float x = startX + xOff * 0.06;

      // Leaf position relative to current UV
      vec2 leafCenter = vec2(x, y);
      vec2 p = uv - leafCenter;

      // ── Flat spin (reference line 672: pR(leafPos.xy, ...)) ──
      float rotation = fallTime * (rand + 1.0) * 0.8 + iter * PI;
      rotation += xOff * 0.5 * PI;
      p = rot2d(p, rotation);

      // ── 3D flip / tumble (reference line 671: pR(leafPos.yz, xOff * 0.5 * kPI)) ──
      float flipAngle = xOff * 0.5 * PI
                       + fallTime * (rand * 0.5 + 0.3)
                       + iter * PI * 0.7;
      float flipScale = cos(flipAngle);

      // Squish X to simulate perspective foreshortening of the flip
      p.x /= max(abs(flipScale), 0.12);

      // Size variation
      float size = 0.015 + rand * 0.015;

      float d = sdLeaf(p, size);

      // Color — fall palette
      vec3 color;
      float colorSel = mod(rand * 4.0, 4.0);
      if (colorSel < 1.0) color = vec3(0.85, 0.35, 0.08);       // orange
      else if (colorSel < 2.0) color = vec3(0.78, 0.18, 0.12);  // red
      else if (colorSel < 3.0) color = vec3(0.90, 0.65, 0.15);  // gold
      else color = vec3(0.55, 0.25, 0.08);                       // brown

      // Add slight color variation
      color += (rand2 - 0.5) * 0.1;

      // Back face is slightly darker/duller (underside of leaf)
      if (flipScale < 0.0) {
        color *= 0.7;
      }

      // Anti-aliased edge
      float alpha = smoothstep(0.002, -0.001, d);

      // Fade when nearly edge-on (leaf is a thin line — barely visible)
      alpha *= smoothstep(0.0, 0.25, abs(flipScale));

      // Fade in at top, fade out at bottom
      alpha *= smoothstep(0.0, 0.1, progress) * smoothstep(1.0, 0.85, progress);

      return vec4(color, alpha);
    }

    // ─── Multi-octave noise ───
    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p *= 2.1;
        a *= 0.5;
      }
      return v;
    }

    // ─── Procedural tree shadow ───
    // Returns shadow density (0.0 = no shadow, 1.0 = full shadow)
    // p is in shadow-local coords, centered on the tree trunk base
    float treeShadow(vec2 p, float time) {
      float shadow = 0.0;

      // Wind displacement — increases with height (top sways more)
      float windStrength = 0.03;
      float heightFactor = max(0.0, p.y);
      float wind = sin(time * 1.2 + p.y * 3.0) * windStrength * heightFactor
                 + sin(time * 0.7 + p.y * 5.0) * windStrength * 0.5 * heightFactor
                 + sin(time * 2.1 + p.y * 1.5) * windStrength * 0.3 * heightFactor;
      p.x += wind;

      // ── Trunk ──
      // Slightly curved trunk — thicker at base, thinner at top
      float trunkWidth = mix(0.035, 0.012, smoothstep(0.0, 0.55, p.y));
      float trunkCurve = sin(p.y * 2.0) * 0.02; // gentle curve
      float trunk = abs(p.x - trunkCurve) - trunkWidth;
      trunk = smoothstep(0.005, -0.005, trunk);
      trunk *= smoothstep(0.6, 0.0, p.y) * step(0.0, p.y); // only above base, fades near canopy
      shadow = max(shadow, trunk * 0.85);

      // ── Main branches ──
      // Branch 1: going right and up
      {
        vec2 bp = p - vec2(0.0, 0.25);
        float angle = 0.7;
        vec2 dir = vec2(cos(angle), sin(angle));
        float along = dot(bp, dir);
        float perp = abs(dot(bp, vec2(-dir.y, dir.x)));
        float branchWidth = mix(0.015, 0.003, smoothstep(0.0, 0.3, along));
        float branch = smoothstep(branchWidth + 0.003, branchWidth - 0.003, perp);
        branch *= smoothstep(-0.01, 0.02, along) * smoothstep(0.3, 0.0, along);
        shadow = max(shadow, branch * 0.45);
      }
      // Branch 2: going left and up
      {
        vec2 bp = p - vec2(0.0, 0.3);
        float angle = PI - 0.6;
        vec2 dir = vec2(cos(angle), sin(angle));
        float along = dot(bp, dir);
        float perp = abs(dot(bp, vec2(-dir.y, dir.x)));
        float branchWidth = mix(0.012, 0.003, smoothstep(0.0, 0.25, along));
        float branch = smoothstep(branchWidth + 0.003, branchWidth - 0.003, perp);
        branch *= smoothstep(-0.01, 0.02, along) * smoothstep(0.25, 0.0, along);
        shadow = max(shadow, branch * 0.45);
      }
      // Branch 3: smaller, right side lower
      {
        vec2 bp = p - vec2(0.0, 0.15);
        float angle = 0.5;
        vec2 dir = vec2(cos(angle), sin(angle));
        float along = dot(bp, dir);
        float perp = abs(dot(bp, vec2(-dir.y, dir.x)));
        float branchWidth = mix(0.010, 0.002, smoothstep(0.0, 0.2, along));
        float branch = smoothstep(branchWidth + 0.003, branchWidth - 0.003, perp);
        branch *= smoothstep(-0.01, 0.02, along) * smoothstep(0.2, 0.0, along);
        shadow = max(shadow, branch * 0.35);
      }

      // ── Canopy (leaf clusters) ──
      // Multiple overlapping soft blobs that sway with wind
      // Each blob is a soft circle with noise-distorted edges
      float canopy = 0.0;

      // Large central canopy mass
      {
        vec2 cp = p - vec2(0.0, 0.5);
        cp.x += sin(time * 0.9 + 1.0) * 0.015; // extra sway
        float r = length(cp);
        float noiseEdge = fbm(cp * 8.0 + time * 0.15) * 0.12;
        canopy = max(canopy, smoothstep(0.22 + noiseEdge, 0.10 + noiseEdge, r));
      }
      // Upper right cluster
      {
        vec2 cp = p - vec2(0.12, 0.58);
        cp.x += sin(time * 1.1 + 2.0) * 0.018;
        float r = length(cp);
        float noiseEdge = fbm(cp * 10.0 + time * 0.12) * 0.1;
        canopy = max(canopy, smoothstep(0.15 + noiseEdge, 0.06 + noiseEdge, r));
      }
      // Upper left cluster
      {
        vec2 cp = p - vec2(-0.10, 0.55);
        cp.x += sin(time * 0.8 + 3.0) * 0.02;
        float r = length(cp);
        float noiseEdge = fbm(cp * 9.0 + time * 0.18) * 0.11;
        canopy = max(canopy, smoothstep(0.16 + noiseEdge, 0.07 + noiseEdge, r));
      }
      // Lower right cluster
      {
        vec2 cp = p - vec2(0.15, 0.4);
        cp.x += sin(time * 1.3 + 4.0) * 0.015;
        float r = length(cp);
        float noiseEdge = fbm(cp * 8.0 + time * 0.14) * 0.09;
        canopy = max(canopy, smoothstep(0.13 + noiseEdge, 0.05 + noiseEdge, r));
      }
      // Lower left cluster
      {
        vec2 cp = p - vec2(-0.13, 0.38);
        cp.x += sin(time * 1.0 + 5.0) * 0.017;
        float r = length(cp);
        float noiseEdge = fbm(cp * 9.0 + time * 0.16) * 0.1;
        canopy = max(canopy, smoothstep(0.12 + noiseEdge, 0.04 + noiseEdge, r));
      }
      // Top tuft
      {
        vec2 cp = p - vec2(0.02, 0.68);
        cp.x += sin(time * 1.2 + 0.5) * 0.02;
        float r = length(cp);
        float noiseEdge = fbm(cp * 10.0 + time * 0.2) * 0.08;
        canopy = max(canopy, smoothstep(0.10 + noiseEdge, 0.03 + noiseEdge, r));
      }

      // Canopy has leaf-like holes — subtract noise to create dappled pattern
      float holes = fbm(p * 15.0 + vec2(time * 0.1, time * 0.08));
      canopy *= smoothstep(0.2, 0.45, holes); // punch holes where noise is low

      shadow = max(shadow, canopy * 0.8);

      return saturate(shadow);
    }

    // ─── Afternoon light effect ───
    vec3 afternoonLight(vec2 uv, vec3 baseColor, float time) {
      vec3 color = baseColor;

      // 1. Subtle warm color grade
      color *= vec3(1.03, 1.0, 0.96);

      // 2. Tree shadow on the floor/couch area
      // ── ADJUSTABLE SHADOW RECTANGLE ──
      // Change these 4 values to move/resize the shadow area:
      float shadowXMin = 0.10;  // left edge
      float shadowXMax = 0.85;  // right edge
      float shadowYMin = 0.0;   // bottom edge (floor)
      float shadowYMax = 0.38;  // top edge (above couch)
      {
        // Check if we're inside the shadow rectangle
        float inRect = step(shadowXMin, uv.x) * step(uv.x, shadowXMax)
                     * step(shadowYMin, uv.y) * step(uv.y, shadowYMax);

        if (inRect > 0.0) {
          // Map UV into shadow-local coords
          // x: -0.5 to 0.5 centered, y: 0.0 (bottom) to ~1.0 (top of tree)
          vec2 sp;
          sp.x = (uv.x - (shadowXMin + shadowXMax) * 0.5) / (shadowXMax - shadowXMin) * 1.2;
          // Flipped: tree top (canopy) projects to bottom of floor (far from window)
          // trunk base projects to top of rectangle (near window)
          sp.y = (1.0 - (uv.y - shadowYMin) / (shadowYMax - shadowYMin)) * 0.85;

          float shadow = treeShadow(sp, time);

          // Fade shadow at edges of the rectangle so it doesn't hard-clip
          float edgeFade = smoothstep(shadowXMin, shadowXMin + 0.05, uv.x)
                         * smoothstep(shadowXMax, shadowXMax - 0.05, uv.x)
                         * smoothstep(shadowYMin, shadowYMin + 0.03, uv.y)
                         * smoothstep(shadowYMax, shadowYMax - 0.03, uv.y);

          shadow *= edgeFade;

          // Apply shadow — darken the image with a grey tint
          // shadow=0: no change, shadow=1: fully darkened
          float shadowOpacity = 0.65; // how dark the shadow gets (adjust this)
          color *= 1.0 - shadow * shadowOpacity;
        }
      }

      // 3. Very gentle vignette
      float vignette = 1.0 - 0.12 * length((uv - 0.5) * vec2(1.1, 0.9));
      color *= vignette;

      return color;
    }

    void main() {
      // Correct UV for image aspect ratio (cover mode)
      vec2 uv = v_uv;
      float screenAspect = u_resolution.x / u_resolution.y;
      vec2 imageUV = uv;

      // Cover: scale image to fill screen, crop excess
      if (screenAspect > u_imageAspect) {
        // Screen is wider — fit width, crop height
        float scale = screenAspect / u_imageAspect;
        imageUV.y = (uv.y - 0.5) / scale + 0.5;
      } else {
        // Screen is taller — fit height, crop width
        float scale = u_imageAspect / screenAspect;
        imageUV.x = (uv.x - 0.5) / scale + 0.5;
      }

      // Sample background image
      vec3 baseColor = texture2D(u_image, imageUV).rgb;

      // Get window mask (using the image-space UV, not screen UV)
      float mask = windowMask(imageUV);

      // DEBUG: visualize mask — set to true to see frame overlay
      bool debugMask = false;

      // ─── Apply afternoon light to entire image ───
      vec3 color = afternoonLight(imageUV, baseColor, u_time);

      // ─── Falling leaves (only in window regions) ───
      // Multiple leaf layers for depth
      for (int layer = 0; layer < 3; layer++) {
        float layerOffset = float(layer) * 100.0;
        int leafCount = 6; // leaves per layer
        if (layer == 1) leafCount = 8;
        if (layer == 2) leafCount = 4;

        for (int i = 0; i < 8; i++) {
          if (i >= leafCount) break;
          float id = float(i) + layerOffset;
          vec4 leaf = fallingLeaf(imageUV, id, u_time);

          // Depth-based adjustments
          float depthDarken = 1.0 - float(layer) * 0.15;
          float depthBlur = 1.0 + float(layer) * 0.3; // slightly larger = "closer"
          if (layer == 0) depthBlur = 0.7; // background leaves are smaller

          leaf.rgb *= depthDarken;

          // Apply window mask — leaves only visible through windows
          leaf.a *= mask;

          // Composite
          color = mix(color, leaf.rgb, leaf.a * 0.9);
        }
      }

      // Debug mask visualization
      if (debugMask) {
        float fm = frameMask(imageUV);
        float wm = windowMask(imageUV);
        // Green = glass (leaves visible), Red = frame (leaves hidden), dim = interior
        color = baseColor * 0.4;
        color += vec3(0.0, 0.5, 0.0) * wm;      // green on glass
        color += vec3(0.6, 0.0, 0.0) * fm;        // red on frames
      }

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // ─── WebGL setup ───

  function createShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vert = createShader(gl.VERTEX_SHADER, vertSrc);
  const frag = createShader(gl.FRAGMENT_SHADER, fragSrc);
  if (!vert || !frag) return;

  const program = gl.createProgram();
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    return;
  }
  gl.useProgram(program);

  // Fullscreen quad
  const posBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1, 1, -1, -1, 1,
    -1, 1, 1, -1, 1, 1,
  ]), gl.STATIC_DRAW);

  const aPos = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  // Uniforms
  const uTime = gl.getUniformLocation(program, 'u_time');
  const uResolution = gl.getUniformLocation(program, 'u_resolution');
  const uImage = gl.getUniformLocation(program, 'u_image');
  const uImageAspect = gl.getUniformLocation(program, 'u_imageAspect');

  // Load background image as texture
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Flip Y so UV (0,0) = bottom-left matches image bottom-left
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  // Placeholder pixel while loading
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
    new Uint8Array([10, 10, 26, 255]));

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1f(uImageAspect, img.width / img.height);
  };
  img.src = 'background/BlogFeature_FallLight_1200x630.webp';

  // Resize handler
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener('resize', resize);

  // ─── Render loop ───
  const startTime = performance.now();

  function render() {
    const elapsed = (performance.now() - startTime) / 1000.0;

    gl.uniform1f(uTime, elapsed);
    gl.uniform2f(uResolution, canvas.width, canvas.height);
    gl.uniform1i(uImage, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  }

  render();
})();
