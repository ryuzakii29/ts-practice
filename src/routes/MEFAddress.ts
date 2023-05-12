import express from 'express';
import controller from '../controllers/MEFAddress';

const router = express.Router();

router.post('/', controller.createAddress);
router.get('/:addressId', controller.readAddress);
router.get('/', controller.readAll);

export = router;
