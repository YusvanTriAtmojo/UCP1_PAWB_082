const router = require('express').Router();
const bibitController = require('../controllers').bibit;

router.get('/', bibitController.getBibit);
router.get('/bibit/add', bibitController.formBibit);
router.post('/bibit/save', bibitController.saveBibit);
router.get('/bibit/edit/:id', bibitController.editBibit);
router.post('/bibit/update/:id', bibitController.updateBibit);
router.get('/bibit/delete/:id', bibitController.deleteBibit);

module.exports = router;