const router = require('express').Router();
const pupukController = require('../controllers').pupuk;

router.get('/', pupukController.getPupuk);
router.get('/pupuk/add', pupukController.formPupuk);
router.post('/pupuk/save', pupukController.savePupuk);
router.get('/pupuk/edit/:id', pupukController.editPupuk);
router.post('/pupuk/update/:id', pupukController.updatePupuk);
router.get('/pupuk/delete/:id', pupukController.deletePupuk);

module.exports = router;