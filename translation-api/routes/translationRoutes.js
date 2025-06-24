const express = require('express');
const router = express.Router();
const { criarTraducao, obterTraducao } = require('../handlers/translationHandler');

router.post('/', criarTraducao);
router.get('/:requestId', obterTraducao);

module.exports = router;