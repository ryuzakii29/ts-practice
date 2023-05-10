import Address from '../../models/Address';

describe('address model', () => {
    it('should have address', () => {
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

        // console.log(author);
    });
});
