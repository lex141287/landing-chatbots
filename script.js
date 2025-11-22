// ✅ 1. Countdown (inicio 25/11)
// Si quieres otra hora, cambia el "19:00:00"
const startDate = new Date("2025-11-25T19:00:00");

function updateCountdown(){
  const now = new Date();
  const diff = startDate - now;

  if(diff <= 0){
    document.getElementById("d").textContent = "00";
    document.getElementById("h").textContent = "00";
    document.getElementById("m").textContent = "00";
    document.getElementById("s").textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff / (1000*60*60)) % 24);
  const mins = Math.floor((diff / (1000*60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  document.getElementById("d").textContent = String(days).padStart(2,"0");
  document.getElementById("h").textContent = String(hours).padStart(2,"0");
  document.getElementById("m").textContent = String(mins).padStart(2,"0");
  document.getElementById("s").textContent = String(secs).padStart(2,"0");
}

setInterval(updateCountdown, 1000);
updateCountdown();


// ✅ 2. Enviar a WhatsApp automático
function enviarWhats(){
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const whats = document.getElementById("whats").value.trim();
  const motivo = document.getElementById("motivo").value;
  const mensaje = document.getElementById("mensaje").value.trim();

  const texto = `Hola profe Lesvidia 👋
Soy: ${nombre}
Correo: ${correo}
WhatsApp: ${whats}
Motivo: ${motivo}
Mensaje: ${mensaje}`;

  // ⚠️ Cambia aquí tu número real si es otro:
  const tuNumero = "51949031132"; // sin +, sin espacios

  const url = `https://wa.me/${tuNumero}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank");
}

// ===== Carrusel de logros =====
(function initLogrosCarousel(){
  const carousel = document.getElementById("logrosCarousel");
  if(!carousel) return;

  const track = carousel.querySelector(".carousel__track");
  const slides = Array.from(track.children);
  const btnPrev = carousel.querySelector(".carousel__btn.prev");
  const btnNext = carousel.querySelector(".carousel__btn.next");
  const dotsBox = carousel.querySelector(".carousel__dots");

  let index = 0;
  let autoPlay = null;

  // Crear dots
  slides.forEach((_, i)=>{
    const dot = document.createElement("span");
    dot.className = "carousel__dot" + (i===0 ? " active":"");
    dot.addEventListener("click", ()=>goTo(i));
    dotsBox.appendChild(dot);
  });
  const dots = Array.from(dotsBox.children);

  function update(){
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(d=>d.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function goTo(i){
    index = (i + slides.length) % slides.length;
    update();
    resetAuto();
  }

  btnPrev.addEventListener("click", ()=>goTo(index-1));
  btnNext.addEventListener("click", ()=>goTo(index+1));

  function startAuto(){
    autoPlay = setInterval(()=>goTo(index+1), 4000);
  }
  function resetAuto(){
    clearInterval(autoPlay);
    startAuto();
  }

  startAuto();
})();

// Parallax 3D SUAVE (premium)
(function heroParallaxSmooth(){
  const hero = document.querySelector(".hero--bg");
  if(!hero) return;

  let targetX = 0, targetY = 0;   // a dónde queremos llegar
  let currentX = 0, currentY = 0; // dónde estamos ahora
  const ease = 0.06;              // ✅ suavidad (más bajo = más suave)

  function animate(){
    // interpolación suave
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;

    hero.style.backgroundPosition =
      `calc(100% + ${currentX}px) calc(50% + ${currentY}px)`;

    requestAnimationFrame(animate);
  }
  animate();

  hero.addEventListener("mousemove", (e)=>{
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // ✅ MENOS intensidad
    targetX = x * 12;  // antes 30
    targetY = y * 8;   // antes 20
  });

  hero.addEventListener("mouseleave", ()=>{
    targetX = 0;
    targetY = 0;
  });
})();

