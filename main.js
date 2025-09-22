window.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('showFlowersBtn');
  btn.addEventListener('click', () => {
    btn.style.transition = 'opacity 0.5s';
    btn.style.opacity = '0';
    setTimeout(() => {
      btn.style.display = 'none';
      document.body.classList.remove('container');
    }, 500);
  });
});

document.getElementById('showFlowersBtn').addEventListener('click', () => {
  const msg = document.getElementById('loveMessage');
  msg.classList.remove('show');
  void msg.offsetWidth; // reinicia animación
  msg.classList.add('show');
});


(function(){
  const cursor = document.getElementById('cursor');
  let mouseX = window.innerWidth/2;
  let mouseY = window.innerHeight/2;

  // Mueve el cursor
  function place(el, x, y) {
    el.style.left = x + 'px';
    el.style.top  = y + 'px';
  }

  // --- Flower Trace Logic ---
  let lastTraceTime = 0;
  const traceInterval = 80; // ms

  function leaveFlowerTrace(x, y) {
    // Clone the SVG inside #cursor
    const svg = cursor.querySelector('svg');
    if (!svg) return;
    const trace = document.createElement('div');
    trace.className = 'flower2 cursor-flower flower-trace';
    trace.style.left = x + 'px';
    trace.style.top = y + 'px';
    trace.style.position = 'absolute';
    trace.style.pointerEvents = 'none';
    trace.style.transform = 'translate(-50%, -50%)';
    trace.innerHTML = svg.outerHTML;
    document.body.appendChild(trace);
    setTimeout(() => {
      trace.style.transition = 'opacity 1.2s linear';
      trace.style.opacity = '0';
      setTimeout(() => trace.remove(), 1200);
    }, 10);
  }

  // Actualizar posición con el mouse
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    place(cursor, mouseX, mouseY);
    // Dejar rastro con menos frecuencia
    const now = Date.now();
    if (now - lastTraceTime > traceInterval) {
      lastTraceTime = now;
      leaveFlowerTrace(mouseX, mouseY);
    }
  });

  window.addEventListener('touchmove', e => {
    const t = e.touches[0];
    if (!t) return;
    mouseX = t.clientX;
    mouseY = t.clientY;
    place(cursor, mouseX, mouseY);
    // Dejar rastro en touch
    const now = Date.now();
    if (now - lastTraceTime > traceInterval) {
      lastTraceTime = now;
      leaveFlowerTrace(mouseX, mouseY);
    }
  }, {passive:true});

  // Colocar inicialmente en el centro
  place(cursor, mouseX, mouseY);

})();