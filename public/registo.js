document.getElementById('btnRegisto').addEventListener('click', async () => {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch('/api/auth/registo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, password })
  });

  const dados = await res.json();

  if (res.ok) {
    alert('Conta criada com sucesso!');
    window.location.href = '/login.html';
  } else {
    alert(dados.erro);
  }
});