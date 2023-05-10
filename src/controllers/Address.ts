import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Address from '../models/Address';
import getLoc from '../utils/geocode';
import Logging from '../library/Logging';

const createAddress = async (req: Request, res: Response, next: NextFunction) => {
    let combinedAddress: string = `${req.body.address}`;

    let geocodeResult = await getLoc(combinedAddress.replace(/ +(?= )/g, ''));
    let {
        MEFAddress,
        floorRoomNumber,
        houseBuildingNumber,
        buildingName,
        street,
        barangayDistrict,
        poBox,
        city,
        province,
        postalCode,
        timeZone,
        country,
        deliveryArea,
        latitude,
        longitude,
        municipality,
        region,
        area
    }: any = geocodeResult;

    const address = new Address({
        _id: new mongoose.Types.ObjectId(),
        floorRoomNumber,
        houseBuildingNumber,
        buildingName,
        street,
        barangayDistrict,
        poBox,
        city,
        province,
        postalCode,
        timeZone,
        country,
        deliveryArea,
        latitude,
        longitude,
        municipality,
        region,
        area,
        MEFAddress
    });

    // Logging.warning(combinedAddress.replace(/ +(?= )/g, ''));
    return address
        .save()
        .then((address) => {
            console.log(address);
            res.status(201).json({ address });
        })
        .catch((error) => res.status(500).json({ error }));
};

const readAddress = (req: Request, res: Response, next: NextFunction) => {
    const addressId = req.params.addressId;

    return Address.findById(addressId)
        .then((address) => (address ? res.status(200).json({ address }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Address.find()
        .then((address) => res.status(200).json({ address }))
        .catch((error) => res.status(500).json({ error }));
};

const updateAddress = (req: Request, res: Response, next: NextFunction) => {
    const addressId = req.params.addressId;

    return Address.findById(addressId)
        .then((address) => {
            if (address) {
                address.set(req.body);

                return address
                    .save()
                    .then((address) => res.status(201).json({ address }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteAddress = (req: Request, res: Response, next: NextFunction) => {
    const addressId = req.params.addressId;

    return Address.findByIdAndDelete(addressId)
        .then((address) => (address ? res.status(201).json({ address, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createAddress, readAddress, readAll, updateAddress, deleteAddress };
