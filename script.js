// --- MENU SANDUÍCHE ---
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('open');
  menuToggle.classList.toggle('active'); // ativa animação X
});

// --- FADE-IN BRANCO AO CARREGAR ---
window.addEventListener("load", () => {
  const overlay = document.querySelector(".fade-overlay");
  setTimeout(() => {
    overlay.classList.add("hidden");
  }, 150);
});

// === Carrossel de Feedbacks ===

  const carrossel = document.querySelector('.carrossel');
  const clone = carrossel.innerHTML;
  carrossel.innerHTML += clone; // Duplicar os cards para loop infinito


// === Acordeão dos Benefícios ===
const beneficios = document.querySelectorAll('.beneficio');
beneficios.forEach(b => {
  const header = b.querySelector('.beneficio-header');
  if (header) {
    header.addEventListener('click', () => {
      b.classList.toggle('ativo');
    });
  }
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




// === Filtros e Pills ===
document.addEventListener('DOMContentLoaded', function () {
  const pills = Array.from(document.querySelectorAll('.pill'));
  const btnLimpar = document.getElementById('btn-limpar');
  const form = document.getElementById('filtros-form');
  const card = document.getElementById('busca') || document.querySelector('.card');

  // Toggle visual das pills
  pills.forEach(p => {
    p.addEventListener('click', () => {
      pills.forEach(x => x.classList.remove('active'));
      p.classList.add('active');
    });
  });

  // Botão limpar filtros
  if (btnLimpar && form) {
    btnLimpar.addEventListener('click', (e) => {
      e.preventDefault();
      card.classList.remove('fade-in');
      card.classList.add('fade-out');

      // Reset selects
      const selects = form.querySelectorAll('select');
      selects.forEach(s => s.selectedIndex = 0);

      // Reset pills
      pills.forEach(x => x.classList.remove('active'));
      if (pills[0]) pills[0].classList.add('active');

      setTimeout(() => {
        card.classList.remove('fade-out');
        card.classList.add('fade-in');
      }, 600);
    });
  }

  // Acessibilidade com teclado
  pills.forEach(p => {
    p.setAttribute('tabindex', '0');
    p.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') p.click();
    });
  });  
  });


  // Função utilitária
  window.getFiltroAtivo = function(){
    const ativo = document.querySelector('.pill.active');
    return {
      grupo: ativo ? ativo.dataset.value : null,
      segmento: form?.elements['segmento']?.value,
      modelo: form?.elements['modelo']?.value,
      tamanho: form?.elements['tamanho']?.value,
      anos: form?.elements['anos']?.value,
      estagio: form?.elements['estagio']?.value,
      cidade: form?.elements['cidade']?.value,
      estado: form?.elements['estado']?.value,
      sigla: form?.elements['sigla']?.value,
    };
  };
