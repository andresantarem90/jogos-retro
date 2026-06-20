// ===== ANIMAÇÕES ESPECÍFICAS POR JOGO =====

function animarMario(canvas) {
  const ctx = canvas.getContext('2d');
  let x = 20, y = 60, velocidadeY = 0, noChao = true, frame = 0;

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // tijolos no chão
    ctx.fillStyle = '#c0392b';
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.fillRect(i, 80, 18, 8);
    }

    // bloco de interrogação flutuante
    ctx.fillStyle = '#ffd93d';
    ctx.fillRect(140, 25, 16, 16);
    ctx.fillStyle = '#0a0a1a';
    ctx.font = '10px monospace';
    ctx.fillText('?', 144, 37);

    frame++;
    if (frame % 50 === 0 && noChao) { velocidadeY = -8; noChao = false; }
    velocidadeY += 0.5;
    y += velocidadeY;
    if (y >= 60) { y = 60; velocidadeY = 0; noChao = true; }

    x += 1.2;
    if (x > canvas.width) x = -20;

    // "boneco" vermelho com boné (genérico, sem ser o Mario real)
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(x, y - 6, 14, 6); // boné
    ctx.fillStyle = '#f5c28e';
    ctx.fillRect(x + 2, y, 10, 8); // cara
    ctx.fillStyle = '#3498db';
    ctx.fillRect(x, y + 8, 14, 10); // corpo

    requestAnimationFrame(loop);
  }
  loop();
}

function animarSonic(canvas) {
  const ctx = canvas.getContext('2d');
  let x = -20;

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(15,195,217,0.3)';
    for (let i = 0; i < 5; i++) {
      const ly = 10 + i * 18;
      ctx.beginPath();
      ctx.moveTo(0, ly);
      ctx.lineTo(canvas.width, ly);
      ctx.stroke();
    }

    x += 5;
    if (x > canvas.width + 20) x = -20;

    // esfera azul a rolar com "espinhos"
    ctx.fillStyle = '#2980b9';
    ctx.beginPath();
    ctx.arc(x, 50, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#1abc9c';
    ctx.lineWidth = 2;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 5) {
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(a) * 14, 50 + Math.sin(a) * 14);
      ctx.lineTo(x + Math.cos(a) * 22, 50 + Math.sin(a) * 22);
      ctx.stroke();
    }

    requestAnimationFrame(loop);
  }
  loop();
}

function animarTetris(canvas) {
  const ctx = canvas.getContext('2d');
  const cores = ['#e94560', '#0fc3d9', '#ffd93d', '#9b59b6', '#2ecc71'];
  let pecas = [];
  let frame = 0;

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    frame++;
    if (frame % 35 === 0) {
      pecas.push({
        x: Math.floor(Math.random() * 10) * 16,
        y: -16,
        cor: cores[Math.floor(Math.random() * cores.length)]
      });
    }

    pecas.forEach(p => {
      p.y += 1.3;
      ctx.fillStyle = p.cor;
      ctx.fillRect(p.x, p.y, 14, 14);
      ctx.strokeStyle = '#0a0a1a';
      ctx.strokeRect(p.x, p.y, 14, 14);
    });

    pecas = pecas.filter(p => p.y < canvas.height);

    requestAnimationFrame(loop);
  }
  loop();
}

function animarZelda(canvas) {
  const ctx = canvas.getContext('2d');
  let brilho = 0, cresce = true;

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // fundo tipo "floresta" simples
    ctx.fillStyle = '#1e3a2f';
    ctx.fillRect(0, 70, canvas.width, 20);

    if (cresce) { brilho += 1.2; if (brilho > 22) cresce = false; }
    else { brilho -= 1.2; if (brilho < 6) cresce = true; }

    const cx = canvas.width / 2, cy = 45;
    const gradiente = ctx.createRadialGradient(cx, cy, 0, cx, cy, brilho * 2);
    gradiente.addColorStop(0, 'rgba(46,204,113,0.7)');
    gradiente.addColorStop(1, 'rgba(46,204,113,0)');
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // triângulo tipo "Triforce"
    ctx.fillStyle = '#ffd93d';
    ctx.beginPath();
    ctx.moveTo(cx, cy - brilho * 0.7);
    ctx.lineTo(cx + brilho * 0.6, cy + brilho * 0.5);
    ctx.lineTo(cx - brilho * 0.6, cy + brilho * 0.5);
    ctx.closePath();
    ctx.fill();

    requestAnimationFrame(loop);
  }
  loop();
}

function animarStreetFighter(canvas) {
  const ctx = canvas.getContext('2d');
  let vida1 = 100, vida2 = 100, frame = 0, flash = 0;

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    frame++;
    if (frame % 55 === 0) {
      vida1 = Math.max(10, vida1 - Math.random() * 20);
      vida2 = Math.max(10, vida2 - Math.random() * 20);
      flash = 6;
    }
    if (vida1 <= 10 && vida2 <= 10) { vida1 = 100; vida2 = 100; }
    if (flash > 0) flash--;

    ctx.fillStyle = '#444';
    ctx.fillRect(5, 10, 80, 8);
    ctx.fillRect(canvas.width - 85, 10, 80, 8);
    ctx.fillStyle = '#e94560';
    ctx.fillRect(5, 10, vida1 * 0.8, 8);
    ctx.fillStyle = '#0fc3d9';
    ctx.fillRect(canvas.width - 85, 10, vida2 * 0.8, 8);

    ctx.fillStyle = '#e94560';
    ctx.fillRect(35, 50, 14, 24);
    ctx.fillStyle = '#0fc3d9';
    ctx.fillRect(canvas.width - 49, 50, 14, 24);

    if (flash > 0) {
      ctx.fillStyle = `rgba(255,255,255,${flash / 10})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    requestAnimationFrame(loop);
  }
  loop();
}

// animação genérica de reserva (para jogos sem animação própria ainda)
function animarGenerico(canvas) {
  const ctx = canvas.getContext('2d');
  let angulo = 0;

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2, cy = canvas.height / 2;
    angulo += 0.05;

    ctx.fillStyle = '#0fc3d9';
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angulo);
    ctx.fillRect(-10, -10, 20, 20);
    ctx.restore();

    requestAnimationFrame(loop);
  }
  loop();
}
function animarPacMan(canvas) {
  const ctx = canvas.getContext('2d');
  let x = -20;
  let bocaAberta = true;
  let frame = 0;
  let pontos = [];

  // gerar pontinhos espalhados
  for (let i = 0; i < 8; i++) {
    pontos.push({ x: i * 28 + 10, comido: false });
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    frame++;
    if (frame % 8 === 0) bocaAberta = !bocaAberta;

    x += 2;
    if (x > canvas.width + 20) {
      x = -20;
      pontos.forEach(p => p.comido = false);
    }

    // pontinhos
    ctx.fillStyle = '#fff';
    pontos.forEach(p => {
      if (!p.comido) {
        ctx.beginPath();
        ctx.arc(p.x, 50, 2, 0, Math.PI * 2);
        ctx.fill();
        if (Math.abs(p.x - x) < 12) p.comido = true;
      }
    });

    // Pac-Man (círculo amarelo com "boca")
    ctx.fillStyle = '#ffd93d';
    ctx.beginPath();
    if (bocaAberta) {
      ctx.arc(x, 50, 14, 0.25 * Math.PI, 1.75 * Math.PI);
      ctx.lineTo(x, 50);
    } else {
      ctx.arc(x, 50, 14, 0, Math.PI * 2);
    }
    ctx.closePath();
    ctx.fill();

    requestAnimationFrame(loop);
  }
  loop();
}

function animarDonkeyKong(canvas) {
  const ctx = canvas.getContext('2d');
  let barris = [];
  let frame = 0;

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // plataformas inclinadas (estilo rampas)
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 25);
    ctx.lineTo(canvas.width, 35);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 65);
    ctx.lineTo(canvas.width, 75);
    ctx.stroke();

    frame++;
    if (frame % 45 === 0) {
      barris.push({ x: 10, y: 15, fase: 0 });
    }

    ctx.fillStyle = '#a0522d';
    barris.forEach(b => {
      b.fase += 0.05;
      b.x += 1.8;
      b.y = 15 + Math.sin(b.fase) * 3 + (b.x / canvas.width) * 50;

      ctx.beginPath();
      ctx.arc(b.x, b.y, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    barris = barris.filter(b => b.x < canvas.width + 10);

    requestAnimationFrame(loop);
  }
  loop();
}

function animarSpaceInvaders(canvas) {
  const ctx = canvas.getContext('2d');
  let deslocamento = 0;
  let direcao = 1;
  let frame = 0;
  const linhas = 3;
  const colunas = 6;

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    frame++;
    if (frame % 20 === 0) {
      deslocamento += direcao * 4;
      if (deslocamento > 20 || deslocamento < 0) direcao *= -1;
    }

    ctx.fillStyle = '#2ecc71';
    for (let l = 0; l < linhas; l++) {
      for (let c = 0; c < colunas; c++) {
        const px = 15 + c * 28 + deslocamento;
        const py = 15 + l * 18;
        // "alienígena" simples em pixel art (cruz)
        ctx.fillRect(px, py, 10, 4);
        ctx.fillRect(px + 3, py + 4, 4, 4);
        ctx.fillRect(px - 2, py + 8, 14, 3);
      }
    }

    // "nave" do jogador
    ctx.fillStyle = '#0fc3d9';
    ctx.fillRect(canvas.width / 2 - 8, 78, 16, 6);
    ctx.fillRect(canvas.width / 2 - 2, 72, 4, 6);

    requestAnimationFrame(loop);
  }
  loop();
}
// ===== MAPA: nome do jogo -> animação específica =====
const animacoesPorJogo = {
  'Super Mario Bros': animarMario,
  'Sonic the Hedgehog': animarSonic,
  'Tetris': animarTetris,
  'The Legend of Zelda': animarZelda,
  'Street Fighter II': animarStreetFighter,
  'Pac-Man': animarPacMan,
  'Donkey Kong': animarDonkeyKong,
  'Space Invaders': animarSpaceInvaders
};

function iniciarAnimacao(canvas, nomeJogo) {
  const funcao = animacoesPorJogo[nomeJogo] || animarGenerico;
  funcao(canvas);
}