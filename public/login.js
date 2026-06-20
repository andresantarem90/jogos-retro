document.getElementById('btnLogin').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const dados = await res.json();

  if (res.ok) {
    localStorage.setItem('token', dados.token);
    localStorage.setItem('nome', dados.nome);
    window.location.href = '/perfil.html';
  } else {
    alert(dados.erro);
  }
});