// ===== MENU NO CELULAR =====
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Fecha o menu ao clicar em um link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== ANIMAÇÃO AO ROLAR A PÁGINA =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Se tiver barras de habilidade dentro, preenche elas
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== CONTADORES (NÚMEROS) =====
function animarContador(el) {
  const alvo = Number(el.dataset.target);
  let atual = 0;
  const passo = Math.max(1, Math.ceil(alvo / 60));

  const timer = setInterval(() => {
    atual += passo;
    if (atual >= alvo) {
      atual = alvo;
      clearInterval(timer);
    }
    el.textContent = atual;
  }, 30);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animarContador(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// ===== MENU: DESTACA A SEÇÃO ATUAL + BOTÃO DE TOPO =====
const secoes = document.querySelectorAll('main section[id]');
const links = document.querySelectorAll('.nav-links a');
const botaoTopo = document.getElementById('toTop');

window.addEventListener('scroll', () => {
  let atual = '';

  secoes.forEach(secao => {
    if (window.scrollY >= secao.offsetTop - 120) {
      atual = secao.id;
    }
  });

  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + atual);
  });

  botaoTopo.classList.toggle('show', window.scrollY > 500);
});

botaoTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== GALERIA: AMPLIAR FOTO =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('open');
  });
});

lightbox.addEventListener('click', () => lightbox.classList.remove('open'));

// ===== FORMULÁRIO DE CONTATO (demonstração) =====
// Obs.: este formulário só mostra uma mensagem. Para receber e-mails de verdade,
// use um serviço como Formspree ou EmailJS.
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  formMsg.textContent = 'Obrigada, ' + nome + '! Sua mensagem foi enviada 💜';
  form.reset();
});

// ===== ANO AUTOMÁTICO NO RODAPÉ =====
document.getElementById('ano').textContent = new Date().getFullYear();
