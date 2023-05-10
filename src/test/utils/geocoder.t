import getLoc from '../../utils/geocode';
import { Client } from '@googlemaps/google-maps-services-js';
const client = new Client({});

describe('geocode getLocation', () => {
    it('should get location', () => {
        const mock_data = {
            floorRoomNumber: '',
            houseBuildingNumber: '',
            buildingName: 'The Globe Tower',
            street: ' 32nd Street',
            barangayDistrict: '',
            poBox: '',
            city: 'Taguig',
            province: 'Metro Manila',
            postalCode: '1634',
            timeZone: '',
            country: 'Philippines',
            deliveryArea: '',
            latitude: 14.5534542,
            longitude: 121.0499036,
            municipality: '',
            region: '',
            area: ''
        };
        console.log(getLoc('The Globe Tower'));
        expect(location).toEqual(mock_data);
    });
    // error
    it('throws an error for an invalid address', async () => {
        const address = 'Invalid Address';
        await expect(getLoc(address)).rejects.toEqual('ZERO_RESULTS');
    });
});
