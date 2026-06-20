function criarNavbar() {
  const token = localStorage.getItem('token');
  const nome = localStorage.getItem('nome');

  const nav = document.createElement('nav');
  nav.className = 'navbar';

  let conteudoDireita = '';

  if (token) {
    const inicial = nome ? nome.charAt(0).toUpperCase() : '?';
    conteudoDireita = `
      <div class="navbar-perfil" id="navbarPerfil">
        <div class="navbar-avatar">${inicial}</div>
        <span class="navbar-nome">${nome}</span>
        <div class="navbar-dropdown" id="navbarDropdown">
          <a href="/perfil.html">A Minha Coleção</a>
          <button id="btnLogoutNav">Sair</button>
        </div>
      </div>
    `;
  } else {
    conteudoDireita = `
      <a href="/login.html" class="navbar-link">Login</a>
      <a href="/registo.html" class="navbar-link navbar-link-destaque">Registo</a>
    `;
  }

  nav.innerHTML = `
    <a href="/" class="navbar-logo">🕹️ Jogos Retro</a>
    <div class="navbar-direita">
      ${conteudoDireita}
    </div>
  `;

  document.body.insertBefore(nav, document.body.firstChild);

  // abrir/fechar o dropdown ao clicar no avatar
  const perfilEl = document.getElementById('navbarPerfil');
  if (perfilEl) {
    perfilEl.addEventListener('click', (e) => {
      document.getElementById('navbarDropdown').classList.toggle('aberto');
      e.stopPropagation();
    });

    document.addEventListener('click', () => {
      document.getElementById('navbarDropdown').classList.remove('aberto');
    });

    document.getElementById('btnLogoutNav').addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('nome');
      window.location.href = '/';
    });
  }
}

criarNavbar();