/**
 * Dollar - sleeping dog on the couch
 * Position is defined in image UV space (same coords as the shader frame mask)
 * so Dollar stays on the couch at any window size.
 */
(function () {
  const overlay = document.getElementById('dollar-overlay');
  if (!overlay) return;

  const IMAGE_ASPECT = 1200 / 630; // background image aspect ratio

  // ── Couch surface zones in image UV coords ──
  // UV: (0,0) = bottom-left of image, (1,1) = top-right
  // type: 'rect' {xMin,xMax,yMin,yMax} or 'tri' {points: [[x,y],[x,y],[x,y]]}
  // Dollar's bottom-center point must land inside one of these
  const couchZones = [
    { type: 'tri', points: [[0.250,0.250],[0.310,0.270],[0.290,0.230]] },  // left side couch
    { type: 'rect', xMin: 0.300, xMax: 0.430, yMin: 0.230, yMax: 0.270 },  // left-center couch
    { type: 'rect', xMin: 0.530, xMax: 0.660, yMin: 0.230, yMax: 0.270 },  // right-center couch
    { type: 'tri', points: [[0.660,0.230],[0.660,0.270],[0.780,0.230]] },  // right side couch
  ];

  // Random point inside a triangle using barycentric coordinates
  function randomInTriangle(p0, p1, p2) {
    var r1 = Math.random(), r2 = Math.random();
    if (r1 + r2 > 1) { r1 = 1 - r1; r2 = 1 - r2; }
    var r3 = 1 - r1 - r2;
    return [
      r1 * p0[0] + r2 * p1[0] + r3 * p2[0],
      r1 * p0[1] + r2 * p1[1] + r3 * p2[1]
    ];
  }

  // Current position
  var imgX, imgY;

  // Pick a new random spot on the couch
  // On mobile, only use the center rect zones (indices 1 and 2) since
  // the left/right triangle zones may be off-screen due to cover cropping
  function pickRandomSpot() {
    var zones = couchZones;
    if (window.innerWidth <= 640) {
      zones = couchZones.filter(function (z) { return z.type === 'rect'; });
    }
    var zone = zones[Math.floor(Math.random() * zones.length)];
    if (zone.type === 'tri') {
      var pt = randomInTriangle(zone.points[0], zone.points[1], zone.points[2]);
      imgX = pt[0]; imgY = pt[1];
    } else {
      imgX = zone.xMin + Math.random() * (zone.xMax - zone.xMin);
      imgY = zone.yMin + Math.random() * (zone.yMax - zone.yMin);
    }
  }

  /**
   * Convert image UV to screen position (%).
   */
  function imageUVToScreen(ix, iy) {
    var screenAspect = window.innerWidth / window.innerHeight;
    var sx, sy;
    if (screenAspect > IMAGE_ASPECT) {
      var scale = screenAspect / IMAGE_ASPECT;
      sx = ix;
      sy = (iy - 0.5) * scale + 0.5;
    } else {
      var scale = IMAGE_ASPECT / screenAspect;
      sx = (ix - 0.5) * scale + 0.5;
      sy = iy;
    }
    return { left: sx * 100, bottom: sy * 100 };
  }

  // Position Dollar at current imgX/imgY
  function positionDollar() {
    var pos = imageUVToScreen(imgX, imgY);
    var dollarWidth = window.innerWidth <= 640 ? 15 : 9;
    overlay.style.width = dollarWidth + 'vw';
    overlay.style.left = 'calc(' + pos.left + 'vw - ' + (dollarWidth / 2) + 'vw)';
    overlay.style.bottom = pos.bottom + '%';
  }

  // Move Dollar to a new random spot with a fade transition
  function moveDollar() {
    overlay.style.transition = 'opacity 0.5s ease';
    overlay.style.opacity = '0';
    setTimeout(function () {
      pickRandomSpot();
      positionDollar();
      // Random flip
      overlay.style.transform = Math.random() > 0.5 ? 'scaleX(-1)' : '';
      overlay.style.opacity = '1';
    }, 500);
  }

  // Create image
  var img = document.createElement('img');
  img.src = 'assets/dollar_final.png';
  img.alt = 'Dollar sleeping';

  overlay.appendChild(img);

  // Initial position
  pickRandomSpot();
  positionDollar();
  if (Math.random() > 0.5) overlay.style.transform = 'scaleX(-1)';

  // Reposition on resize
  window.addEventListener('resize', positionDollar);

  // Fade in
  setTimeout(function () {
    overlay.style.opacity = '1';
  }, 500);

  // Move every 60 seconds
  setInterval(moveDollar, 60000);

  // Move on page change
  window.addEventListener('hashchange', function () {
    moveDollar();
  });

  // ── DEBUG MODE ──
  var debugSpots = false;
  if (debugSpots) {
    overlay.style.border = '2px solid lime';
    overlay.style.opacity = '1';

    // Draw all zones — rectangles as divs, triangles as SVG overlays
    var colors = ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,255,0,0.3)'];

    function drawZones() {
      document.querySelectorAll('.debug-zone').forEach(function(el) { el.remove(); });

      couchZones.forEach(function (z, i) {
        if (z.type === 'tri') {
          // Draw triangle using an SVG overlay
          var pts = z.points.map(function(p) { return imageUVToScreen(p[0], p[1]); });
          // Convert to pixel coords
          var W = window.innerWidth, H = window.innerHeight;
          var svgPts = pts.map(function(p) {
            return (p.left / 100 * W) + ',' + (H - p.bottom / 100 * H);
          }).join(' ');
          var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('class', 'debug-zone');
          svg.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:998;pointer-events:none;';
          var poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
          poly.setAttribute('points', svgPts);
          poly.setAttribute('fill', colors[i]);
          poly.setAttribute('stroke', 'white');
          poly.setAttribute('stroke-width', '1');
          svg.appendChild(poly);
          // Label
          var cx = (pts[0].left + pts[1].left + pts[2].left) / 3;
          var cy = H - (pts[0].bottom + pts[1].bottom + pts[2].bottom) / 3 / 100 * H;
          var txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          txt.setAttribute('x', cx / 100 * W);
          txt.setAttribute('y', cy);
          txt.setAttribute('fill', 'white');
          txt.setAttribute('font-size', '14');
          txt.setAttribute('font-weight', 'bold');
          txt.textContent = i;
          svg.appendChild(txt);
          document.body.appendChild(svg);
        } else {
          // Draw rectangle
          var tl = imageUVToScreen(z.xMin, z.yMax);
          var br = imageUVToScreen(z.xMax, z.yMin);
          var div = document.createElement('div');
          div.className = 'debug-zone';
          div.style.cssText = 'position:fixed;z-index:998;pointer-events:none;'
            + 'background:' + colors[i] + ';border:1px solid white;'
            + 'left:' + tl.left + 'vw;bottom:' + br.bottom + '%;'
            + 'width:' + (br.left - tl.left) + 'vw;'
            + 'height:' + (tl.bottom - br.bottom) + '%;'
            + 'display:flex;align-items:center;justify-content:center;'
            + 'color:white;font-size:12px;font-weight:bold;';
          div.textContent = i;
          document.body.appendChild(div);
        }
      });
    }

    drawZones();
    window.addEventListener('resize', drawZones);

    // Show Dollar's anchor point
    var dot = document.createElement('div');
    var anchorPos = imageUVToScreen(imgX, imgY);
    dot.style.cssText = 'position:fixed;z-index:999;pointer-events:none;'
      + 'width:8px;height:8px;border-radius:50%;background:magenta;'
      + 'left:calc(' + anchorPos.left + 'vw - 4px);bottom:calc(' + anchorPos.bottom + '% - 4px);';
    document.body.appendChild(dot);
    window.addEventListener('resize', function () {
      var np = imageUVToScreen(imgX, imgY);
      dot.style.left = 'calc(' + np.left + 'vw - 4px)';
      dot.style.bottom = 'calc(' + np.bottom + '% - 4px)';
    });
  }
})();
