const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const token = localStorage.getItem('token');

fetch(`/api/jogos/${id}`)
  .then(res => res.json())
  .then(jogo => {
    document.getElementById('detalhe-jogo').innerHTML = `
      <canvas id="canvas-detalhe" width="400" height="150"></canvas>
      <h1>${jogo.nome}</h1>
      <p><strong>Plataforma:</strong> ${jogo.plataforma}</p>
      <p><strong>Ano:</strong> ${jogo.ano}</p>
      <p><strong>Género:</strong> ${jogo.genero}</p>
      <p>${jogo.descricao || ''}</p>
    `;

    const canvas = document.getElementById('canvas-detalhe');
   iniciarAnimacao(canvas, jogo.nome);

    if (token) {
      document.getElementById('btnAdicionar').style.display = 'block';
    }
  });

document.getElementById('btnAdicionar').addEventListener('click', async () => {
  const res = await fetch('/api/colecao', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({ jogoId: id, estado: 'tenho' })
  });

  const dados = await res.json();

  if (res.ok) {
    await mostrarAviso('Jogo adicionado à tua coleção!');
  } else {
    await mostrarAviso(dados.erro);
  }
});