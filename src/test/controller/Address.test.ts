import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Address from '../../models/Address';
import controller from '../../controllers/Address';
import { config } from '../../config/config';

const req = {} as Request;
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
} as unknown as Response;
const next = jest.fn();
beforeAll(async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.mongo.url);
});

afterAll(async () => {
    await mongoose.connection.close();
});

afterEach(async () => {
    await Address.deleteMany({});
});

describe('Address Controller', () => {
    it('should return all addresses', async () => {
        await controller.readAll(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
    });
    it('should save an addresses', async () => {
        const address1 = new Address({
            floorRoomNumber: '',
            houseBuildingNumber: '',
            buildingName: 'Panorama Tower',
            street: 'corner 34th Street',
            barangayDistrict: '',
            poBox: '',
            city: 'Taguig',
            province: 'Metro Manila',
            postalCode: ' 1634',
            timeZone: '',
            country: 'Philippines',
            deliveryArea: '',
            latitude: '14.555986',
            longitude: '121.05011',
            municipality: '',
            region: '',
            area: '',
            MEFAddress: {
                city: 'Taguig',
                country: 'Philippines',
                locality: '',
                postcode: ' 1634',
                postcodeExtension: '',
                stateOrProvince: 'Metro Manila',
                streetName: '',
                streetNr: 'corner',
                streetNrLast: '',
                streetNrLastSuffix: '',
                streetNrSuffix: '',
                streetSuffix: '',
                streetType: '34th Street',
                geographicSubAddress: {
                    buildingName: 'Panorama Tower',
                    subUnit: '',
                    levelType: '',
                    levelNumber: '',
                    privateStreetNumber: '',
                    privateStreetName: ''
                }
            }
        });
        const request: any = {
            address: 'Yondu Inc'
        };

        await address1.save();
        await controller.createAddress(request, res, next);

        expect(res.status).toHaveBeenCalledWith(201);
    });
});
