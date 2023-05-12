import express from 'express';
import controller from '../controllers/GeographicAddressValidation';
import { Schemas, ValidateJoi } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateJoi(Schemas.addressValidation.req.query), controller.validateAddress);

export = router;
