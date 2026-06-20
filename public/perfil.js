const token = localStorage.getItem('token');
const nome = localStorage.getItem('nome');

if (!token) {
  window.location.href = '/login.html';
}

document.getElementById('titulo').textContent = `Coleção de ${nome}`;

function carregarColecao() {
  fetch('/api/colecao', {
    headers: { 'Authorization': token }
  })
    .then(res => res.json())
    .then(itens => {
      const container = document.getElementById('colecao');
      container.innerHTML = '';

      if (itens.length === 0) {
        container.innerHTML = '<p>A tua coleção está vazia. Vai ao catálogo e adiciona jogos!</p>';
        return;
      }

      itens.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card-jogo';
        div.innerHTML = `
          <h3>${item.jogo.nome}</h3>
          <p>Plataforma: ${item.jogo.plataforma}</p>
          <p>Ano: ${item.jogo.ano}</p>
          <p>Estado: <strong>${item.estado}</strong></p>
          <button class="btn-remover" data-id="${item._id}">Remover da coleção</button>
        `;
        container.appendChild(div);
      });

      // adicionar o evento de clique a cada botão "Remover"
      document.querySelectorAll('.btn-remover').forEach(botao => {
       botao.addEventListener('click', async (e) => {
  const id = e.target.dataset.id;
  const confirmar = await mostrarConfirmacao('Tens a certeza que queres remover este jogo da tua coleção?');
  if (!confirmar) return;

  const res = await fetch(`/api/colecao/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': token }
  });

  if (res.ok) {
    carregarColecao();
  } else {
    alert('Erro ao remover o jogo da coleção.');
  }
});
      });
    });
}

carregarColecao();