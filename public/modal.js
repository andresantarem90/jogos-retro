// ===== MODAL DE CONFIRMAÇÃO (Cancelar / Confirmar) =====
function mostrarConfirmacao(mensagem) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    overlay.innerHTML = `
      <div class="modal-caixa">
        <p class="modal-mensagem">${mensagem}</p>
        <div class="modal-botoes">
          <button class="modal-btn modal-btn-cancelar">Cancelar</button>
          <button class="modal-btn modal-btn-confirmar">Confirmar</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const btnCancelar = overlay.querySelector('.modal-btn-cancelar');
    const btnConfirmar = overlay.querySelector('.modal-btn-confirmar');

    function fechar(resultado) {
      overlay.remove();
      resolve(resultado);
    }

    btnCancelar.addEventListener('click', () => fechar(false));
    btnConfirmar.addEventListener('click', () => fechar(true));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) fechar(false); // clicar fora fecha e cancela
    });
  });
}

// ===== MODAL DE AVISO (apenas OK) =====
function mostrarAviso(mensagem) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    overlay.innerHTML = `
      <div class="modal-caixa">
        <p class="modal-mensagem">${mensagem}</p>
        <div class="modal-botoes">
          <button class="modal-btn modal-btn-confirmar">OK</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const btnOk = overlay.querySelector('.modal-btn-confirmar');

    function fechar() {
      overlay.remove();
      resolve();
    }

    btnOk.addEventListener('click', fechar);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) fechar();
    });
  });
}