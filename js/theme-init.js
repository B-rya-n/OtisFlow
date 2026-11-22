/* Aplica a preferência antes de carregar os estilos para evitar flash de tema. */
try {
  if (localStorage.getItem('otisflow.theme') === 'dark') {
    document.documentElement.dataset.theme = 'dark';
  }
} catch (error) {
  // O seletor ainda funciona em memória quando o navegador bloqueia o storage.
}
