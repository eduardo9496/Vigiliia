  const canvas = document.getElementById("worm");
  const ctx = canvas.getContext("2d");

  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  // Gusano más corto
  const segments = 18; // menos segmentos
  const length = 8;   // más compacto
  let worm = Array.from({ length: segments }, () => ({ x: w / 2, y: h / 2 }));

  let mouse = { x: w / 2, y: h / 2 };

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function animate() {
    ctx.clearRect(0, 0, w, h);

    worm[0].x += (mouse.x - worm[0].x) * 0.2;
    worm[0].y += (mouse.y - worm[0].y) * 0.2;

    for (let i = 1; i < worm.length; i++) {
      let prev = worm[i - 1];
      let seg = worm[i];
      let dx = prev.x - seg.x;
      let dy = prev.y - seg.y;
      let angle = Math.atan2(dy, dx);

      seg.x = prev.x - Math.cos(angle) * length;
      seg.y = prev.y - Math.sin(angle) * length;
    }

    ctx.beginPath();
    ctx.moveTo(worm[0].x, worm[0].y);
    for (let i = 1; i < worm.length; i++) {
      ctx.lineTo(worm[i].x, worm[i].y);
    }

    const gradient = ctx.createLinearGradient(
      worm[0].x, worm[0].y,
      worm[worm.length - 1].x, worm[worm.length - 1].y
    );
    gradient.addColorStop(0, "rgba(0, 200, 255, 1)");
    gradient.addColorStop(1, "rgba(0, 200, 255, 0)");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 6;
    ctx.shadowBlur = 20;
    ctx.shadowColor = "rgba(0,200,255,1)";
    ctx.stroke();

    requestAnimationFrame(animate);
  }

  animate();