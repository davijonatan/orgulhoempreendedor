// --- MENU SANDUÍCHE ---
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('open');
});

// --- FADE-IN BRANCO AO CARREGAR ---
window.addEventListener("load", () => {
  const overlay = document.querySelector(".fade-overlay");
  setTimeout(() => {
    overlay.classList.add("hidden");
  }, 150); // atraso de 150 ms para suavizar
});

// === Carrossel de Feedbacks ===
const carrossel = document.getElementById('carrossel');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

next.addEventListener('click', () => {
  carrossel.scrollBy({ left: 320, behavior: 'smooth' });
});

prev.addEventListener('click', () => {
  carrossel.scrollBy({ left: -320, behavior: 'smooth' });
});

// Rolagem automática a cada 5 segundos
setInterval(() => {
  carrossel.scrollBy({ left: 320, behavior: 'smooth' });
}, 5000);

// === Acordeão dos Benefícios ===
const beneficios = document.querySelectorAll('.beneficio');

beneficios.forEach(b => {
  b.querySelector('.beneficio-header').addEventListener('click', () => {
    b.classList.toggle('ativo');
  });
});

// === Animação da linha do tempo ===
const etapas = document.querySelectorAll('.etapa');

function mostrarEtapas() {
  etapas.forEach(etapa => {
    const topo = etapa.getBoundingClientRect().top;
    if (topo < window.innerHeight - 100) {
      etapa.classList.add('visivel');
    }
  });
}

window.addEventListener('scroll', mostrarEtapas);
mostrarEtapas();

/* Interações dos pills, limpar filtros e animações (puro JS) */

document.addEventListener('DOMContentLoaded', function () {
  const pills = Array.from(document.querySelectorAll('.pill'));
  const btnLimpar = document.getElementById('btn-limpar');
  const form = document.getElementById('filtros-form');
  const card = document.getElementById('busca') || document.querySelector('.card');

  // Toggle visual das pills (seleção única)
  pills.forEach(p => {
    p.addEventListener('click', () => {
      // se for clicar num já ativo, mantém ativo (ou poderíamos permitir desmarcar)
      pills.forEach(x => x.classList.remove('active'));
      p.classList.add('active');

      // aqui você pode propagar o filtro para uma busca real
      // exemplo: filtrarPerfis({ grupo: p.dataset.value })
    });
  });

  // Limpar filtros: reseta selects e volta pill "Todos"
  btnLimpar.addEventListener('click', (e) => {
    e.preventDefault();
    // animação visual
    card.classList.remove('fade-in');
    card.classList.add('fade-out');

    // reset selects
    const selects = form.querySelectorAll('select');
    selects.forEach(s => s.selectedIndex = 0);

    // reset pills para "Todos" (primeira pill)
    pills.forEach(x => x.classList.remove('active'));
    if (pills[0]) pills[0].classList.add('active');

    // depois de animação, remove fade-out e re-aplica fade-in
    setTimeout(() => {
      card.classList.remove('fade-out');
      card.classList.add('fade-in');
    }, 600);
  });

  // acessibilidade: permitir navegação teclado nas pills
  pills.forEach(p => {
    p.setAttribute('tabindex', '0');
    p.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') p.click();
    });
  });

  // Optional: exposição de estado para futura integração
  window.getFiltroAtivo = function(){
    const ativo = document.querySelector('.pill.active');
    const data = {
      grupo: ativo ? ativo.dataset.value : null,
      segmento: form.elements['segmento'].value,
      modelo: form.elements['modelo'].value,
      tamanho: form.elements['tamanho'].value,
      anos: form.elements['anos'].value,
      estagio: form.elements['estagio'].value,
      cidade: form.elements['cidade'].value,
      estado: form.elements['estado'].value,
      sigla: form.elements['sigla'].value,
    };
    return data;
  };
});