const container = document.getElementById('lista-jogos');
const inputPesquisa = document.getElementById('pesquisa');

function carregarJogos(query = '') {
  fetch(`/api/jogos${query}`)
    .then(res => res.json())
    .then(jogos => {
      container.innerHTML = '';
      jogos.forEach(jogo => {
        const card = document.createElement('div');
        card.className = 'card-jogo';
        card.innerHTML = `
          <canvas class="mini-canvas" width="200" height="90"></canvas>
          <h3>${jogo.nome}</h3>
          <p>Plataforma: ${jogo.plataforma}</p>
          <p>Ano: ${jogo.ano}</p>
          <a href="/jogo.html?id=${jogo._id}">Ver detalhes</a>
        `;
        container.appendChild(card);

        const canvas = card.querySelector('.mini-canvas');
        iniciarAnimacao(canvas, jogo.nome);
      });
    });
}

carregarJogos();

inputPesquisa.addEventListener('input', (e) => {
  const valor = e.target.value;
  carregarJogos(valor ? `?nome=${valor}` : '');
});