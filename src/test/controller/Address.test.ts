import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Address from '../../models/Address';
import controller from '../../controllers/Address';
import { config } from '../../config/config';
import getLoc from '../../utils/geocode';

const req = {} as Request;
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
} as unknown as Response;
const next = jest.fn();
beforeAll(async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.mongo.test_url);
});

afterAll(async () => {
    await mongoose.connection.close();
});

// afterEach(async () => {
//     await Address.deleteMany({});
// }); ----------> clear database
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
describe('Address Controller', () => {
    it('should return all addresses', async () => {
        await controller.readAll(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
    });
    it('should return an address', async () => {
        const request: any = {
            params: {
                addressId: '645b9e930702476379c8fcfc'
            }
        };
        await controller.readAddress(request, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
    });
    it('should save an addresses', async () => {
        const request: any = {
            body: {
                address: 'Yondu Inc'
            }
        };
        // let geocodeResult = await getLoc(request.body.address);
        // const saveMock = new Address({
        //     ...geocodeResult,
        //     _id: '6106da80a0549e1234567890'
        // });
        // const ControllerMock = jest.fn();

        // jest.spyOn(controller, 'createAddress').mockResolvedValue(ControllerMock(request, res, next));

        // const data = ControllerMock(request, res, next);
        await controller.createAddress(request, res, next);
        expect(res.status).toHaveBeenCalledWith(201);
        // expect(data).toEqual({
        //     saveMock
        // });
    });
});

describe('Address Controller Error handling', () => {
    it('should return an error for readAll', async () => {
        jest.spyOn(Address, 'find').mockRejectedValueOnce(new Error('Database connection error'));

        await controller.readAll(req, res, jest.fn());

        expect(res.status).toHaveBeenCalledWith(500);
    });
});
