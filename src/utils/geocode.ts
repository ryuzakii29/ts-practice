import { Client } from '@googlemaps/google-maps-services-js';
const client = new Client({});
import Logging from '../library/Logging';

interface AddressDetails {
    floorRoomNumber: string;
    houseBuildingNumber: string;
    buildingName: string;
    street: string;
    barangayDistrict: string;
    poBox: string;
    city: string;
    province: string;
    postalCode: string;
    timeZone: string;
    country: string;
    deliveryArea: string;
    latitude: number;
    longitude: number;
    municipality: string;
    region: string;
    area: string;
    MEFAddress: {
        id: string;
        formattedAddress: string;
        city: string;
        country: string;
        locality: string;
        postcode: string;
        postcodeExtension: string;
        stateOrProvince: string;
        streetName: string;
        streetNr: string;
        streetNrLast: string;
        streetNrLastSuffix: string;
        streetNrSuffix: string;
        streetSuffix: string;
        streetType: string;
        geographicSubAddress: {
            buildingName: string;
            subUnit: string; // subUnitNumber or subUnitType
            levelType: string;
            levelNumber: string;
            privateStreetNumber: string;
            privateStreetName: string;
        };
    };
}

const getLoc = async (address: string) => {
    const details: AddressDetails = {
        floorRoomNumber: '',
        houseBuildingNumber: '',
        buildingName: '',
        street: '',
        barangayDistrict: '',
        poBox: '',
        city: '',
        province: '',
        postalCode: '',
        timeZone: '',
        country: '',
        deliveryArea: '',
        latitude: 0,
        longitude: 0,
        municipality: '',
        region: '',
        area: '',
        MEFAddress: {
            id: '',
            formattedAddress: '',
            city: '',
            country: '',
            locality: '',
            postcode: '',
            postcodeExtension: '',
            stateOrProvince: '',
            streetName: '',
            streetNr: '',
            streetNrLast: '',
            streetNrLastSuffix: '',
            streetNrSuffix: '',
            streetSuffix: '',
            streetType: '',
            geographicSubAddress: {
                buildingName: '',
                subUnit: '', // subUnitNumber or subUnitType
                levelType: '',
                levelNumber: '',
                privateStreetNumber: '',
                privateStreetName: ''
            }
        }
    };

    return await client
        .geocode({
            params: {
                address,
                key: process.env.GOOGLEMAPS_KEY || ''
            },
            timeout: 1000 // milliseconds
        })
        .then((r) => {
            let { address_components, geometry, formatted_address, place_id }: any = r.data.results[0];

            for (const component of address_components) {
                if (component.types.includes('floor')) {
                    details.floorRoomNumber = component.long_name;
                    details.MEFAddress.geographicSubAddress.levelType = component.long_name;
                }
                if (component.types.includes('room')) {
                    details.floorRoomNumber += ' ' + component.long_name;
                    details.MEFAddress.geographicSubAddress.levelNumber = component.long_name;
                }
                if (component.types.includes('street_number')) {
                    details.street = component.long_name;
                    details.MEFAddress.streetNr = component.short_name;
                }
                if (component.types.includes('route')) {
                    details.street += ' ' + component.long_name;
                    details.MEFAddress.streetName = component.long_name;
                    details.MEFAddress.streetType = component.short_name;
                }
                if (component.types.includes('premise')) {
                    details.buildingName = component.long_name;
                    details.MEFAddress.geographicSubAddress.buildingName = component.long_name;
                }
                if (component.types.includes('subpremise')) {
                    details.buildingName += ' ' + component.long_name;
                    details.MEFAddress.geographicSubAddress.buildingName += ' ' + component.long_name;
                }
                if (component.types.includes('neighborhood')) {
                    details.barangayDistrict = component.long_name;
                    details.MEFAddress.locality = component.long_name;
                }
                if (component.types.includes('postal_code_prefix')) {
                    details.postalCode = component.long_name;
                    details.MEFAddress.postcode = component.long_name;
                }
                if (component.types.includes('postal_code')) {
                    details.postalCode += ' ' + component.long_name;
                    details.MEFAddress.postcode += ' ' + component.long_name;
                }
                if (component.types.includes('postal_code_suffix')) {
                    details.postalCode += ' ' + component.long_name;
                    details.MEFAddress.postcodeExtension = component.long_name;
                }
                if (component.types.includes('post_box')) {
                    details.poBox = component.long_name;
                }
                if (component.types.includes('locality')) {
                    details.city = component.long_name;
                    details.MEFAddress.city = component.long_name;
                }
                if (component.types.includes('administrative_area_level_1')) {
                    details.province = component.long_name;
                    details.MEFAddress.stateOrProvince = component.long_name;
                }
                if (component.types.includes('country')) {
                    details.country = component.long_name;
                    details.MEFAddress.country = component.long_name;
                }
                if (component.types.includes('time_zone')) {
                    details.timeZone = component.long_name;
                }
                if (component.types.includes('postal_town')) {
                    details.deliveryArea = component.long_name;
                    details.MEFAddress.locality = component.long_name;
                }
                if (component.types.includes('municipality')) {
                    details.municipality = component;
                    details.MEFAddress.locality += ' ' + component.long_name;
                }
            }
            details.latitude = geometry.location.lat;
            details.longitude = geometry.location.lng;
            details.MEFAddress.formattedAddress = formatted_address;
            details.MEFAddress.id = place_id;

            // Logging.warning(r.data.results[0].address_components);
            // console.log('Details:', details);
            return details;
        })
        .catch((e) => {
            console.log(e.response.data.error_message);
        });
};

export default getLoc;
