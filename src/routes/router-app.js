const router = require('express').Router();
const homeController = require('../controllers').home;
const controllerPupuk = require('../controllers/controller-pupuk');
const controllerBibit = require('../controllers/controller-bibit');

router.get('/', homeController.home);
router.get('/pupuk', controllerPupuk.getPupuk);
router.get('/pupuk/add', controllerPupuk.formPupuk);
router.post('/pupuk/save', controllerPupuk.savePupuk);
router.get('/pupuk/edit/:id', controllerPupuk.editPupuk);
router.post('/pupuk/update/:id', controllerPupuk.updatePupuk);
router.get('/pupuk/delete/:id', controllerPupuk.deletePupuk);
router.get('/bibit', controllerBibit.getBibit);
router.get('/bibit/add', controllerBibit.formBibit);
router.post('/bibit/save', controllerBibit.saveBibit);
router.get('/bibit/edit/:id', controllerBibit.editBibit);
router.post('/bibit/update/:id', controllerBibit.updateBibit);
router.get('/bibit/delete/:id', controllerBibit.deleteBibit);


module.exports = router;