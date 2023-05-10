import express from 'express';
import controller from '../controllers/Address';

const router = express.Router();

router.post('/', controller.createAddress);
router.get('/:addressId', controller.readAddress);
router.get('/', controller.readAll);
// router.patch('/:addressId', controller.updateAddress);
// router.delete('/:addressId', controller.deleteAddress);

export = router;
