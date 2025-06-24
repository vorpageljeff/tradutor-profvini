function validarEntrada(texto, idioma) {
    if (!texto || typeof texto !== 'string') return 'Texto é obrigatório e deve ser uma string.';
    if (!idioma || typeof idioma !== 'string') return 'Idioma de destino é obrigatório e deve ser uma string.';
    return null;
}

module.exports = { validarEntrada };