"use strict"; // Activa modo estricto: errores más claros

// --- REFERENCIAS AL DOM ---
const elements = {
    stars: document.getElementById("stars"),
    moon1: document.getElementById("moon1"),
    moon2: document.getElementById("moon2"),
    moon3: document.getElementById("moon3"),
    land: document.getElementById("land"),
    text: document.getElementById("hero-text"),
    header: document.getElementById("header"),
    cohete: document.getElementById("cohete"), 
};

// --- CONFIGURACIÓN DE VELOCIDADES ---
const config = {
    stars: { speedY: 0.15 }, // Movimiento vertical muy lento
    moon3: { speedX: 4, speedY: 0 }, // Movimiento puramente horizontal a la derecha
    moon1: { speedY: -1.5, speedX: 3 }, // Sube y se desplaza a la derecha
    moon2: { speedY: -1.5, speedX: -5 }, // Sube y se desplaza a la izquierda
    land: { speedY: -0.12 }, // Movimiento vertical descendente muy sutil
    text: { speedY: -0.2, baseTop: 40 }, // Flota hacia arriba partiendo del 40% de altura
    header: { speedY: 0.5 }, // Desciende suavemente al scrollear
    cohete: { speedY: -2.5, speedX: 2.0 },
};

// --- ESTADO ---
let scrollY = 0; // Almacena la posición de desplazamiento actual
let ticking = false; // Bandera de control para evitar sobrecarga de fotogramas

// --- FUNCIÓN DE ACTUALIZACIÓN ---
function updateParallax() {
    const s = scrollY; // Creamos una referencia corta y optimizada

// Aplicación matemática de las velocidades del config en px y %
    elements.stars.style.top = `${s * config.stars.speedY}px`;
    elements.moon3.style.left = `${s * config.moon3.speedX}px`;
    elements.moon1.style.top = `${s * config.moon1.speedY}px`;
    elements.moon1.style.left = `${s * config.moon1.speedX}px`;
    elements.moon2.style.top = `${s * config.moon2.speedY}px`;
    elements.moon2.style.left = `${s * config.moon2.speedX}px`;
    elements.land.style.top = `${s * config.land.speedY}px`;
    elements.text.style.top = `${config.text.baseTop + s * config.text.speedY}%`;
    elements.header.style.top = `${s * config.header.speedY}px`;
    elements.cohete.style.transform = `translate(${s * config.cohete.speedX}px, ${s * config.cohete.speedY}px)`;

    ticking = false; // Ponemos el semáforo en verde
}

// --- LISTENER DE SCROLL ---
window.addEventListener("scroll", () => {
    scrollY = window.scrollY; // Leemos la posición del scroll de manera global
    if (!ticking) {
    
// Si no hay ningún cuadro de animación pendiente
window.requestAnimationFrame(updateParallax); // Pedimos al navegador renderizar el frame
    ticking = true; // Bloqueamos la bandera (semáforo en rojo)
    }
});

// --- ACCESIBILIDAD: Respeta la preferencia del sistema ---
const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

if (mediaQuery.matches) {
    // Si el usuario prefiere reducir movimiento, desactivamos el parallax
    window.removeEventListener("scroll", updateParallax);
    console.info(
        "Parallax desactivado: preferencia de movimiento reducido detectada.",
    );
}