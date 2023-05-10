import Address from '../../models/Address';

describe('author model', () => {
    it('should have author name', () => {
        const address = new Address({
            floorRoomNumber: '',
            houseBuildingNumber: 'Yondu Inc',
            buildingName: '',
            streetNumberName: '',
            barangayDistrict: '',
            poBox: '',
            city: 'Taguig',
            province: 'Metro Manila',
            postalCode: '',
            timeZone: '',
            country: '',
            deliveryArea: '',
            latitude: '',
            longitude: '',
            municipality: '',
            region: '',
            area: ''
        });

        // console.log(author);
    });
});
