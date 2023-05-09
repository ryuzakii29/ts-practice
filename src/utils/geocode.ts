import { Client } from '@googlemaps/google-maps-services-js';
const client = new Client({});
import Logging from '../library/Logging';

interface AddressDetails {
    floorRoomNumber: string;
    houseBuildingNumber: string;
    buildingName: string;
    streetNumberName: string;
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
}

const getLoc = async (address: string) => {
    const details: AddressDetails = {
        floorRoomNumber: '',
        houseBuildingNumber: '',
        buildingName: '',
        streetNumberName: '',
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
        area: ''
    };

    let add = await client
        .geocode({
            params: {
                address,
                key: process.env.GOOGLEMAPS_KEY || ''
            },
            timeout: 1000 // milliseconds
        })
        .then((r) => {
            // Logging.warning(r.data.results[0].formatted_address);
            Logging.warning(r.data.results[0].address_components);
            let { address_components, geometry }: any = r.data.results[0];

            for (const component of address_components) {
                if (component.types.includes('floor')) {
                    details.floorRoomNumber = component.long_name;
                }
                if (component.types.includes('room')) {
                    details.floorRoomNumber += ' ' + component.long_name;
                }
                if (component.types.includes('street_number')) {
                    details.streetNumberName = component.long_name;
                }
                if (component.types.includes('route')) {
                    details.streetNumberName += ' ' + component.long_name;
                }
                if (component.types.includes('premise')) {
                    details.buildingName = component.long_name;
                }
                if (component.types.includes('subpremise')) {
                    details.buildingName += ' ' + component.long_name;
                }
                if (component.types.includes('neighborhood')) {
                    details.barangayDistrict = component.long_name;
                }
                if (component.types.includes('postal_code')) {
                    details.postalCode = component.long_name;
                }
                if (component.types.includes('postal_code_prefix')) {
                    details.postalCode += '-' + component.long_name;
                }
                if (component.types.includes('postal_code_suffix')) {
                    details.postalCode += '-' + component.long_name;
                }
                if (component.types.includes('post_box')) {
                    details.poBox = component.long_name;
                }
                if (component.types.includes('locality')) {
                    details.city = component.long_name;
                }
                if (component.types.includes('administrative_area_level_1')) {
                    details.province = component.long_name;
                }
                if (component.types.includes('country')) {
                    details.country = component.long_name;
                }
                if (component.types.includes('time_zone')) {
                    details.timeZone = component.long_name;
                }
                if (component.types.includes('postal_town')) {
                    details.deliveryArea = component.long_name;
                }
                if (component.types.includes('municipality')) {
                    details.municipality = component;
                }
                if (component.types.includes('postal_code')) {
                    details.postalCode = component.long_name;
                }
            }
            details.latitude = geometry.location.lat;
            details.longitude = geometry.location.lng;
            console.log('Details:', details);
            return details;
        })
        .catch((e) => {
            console.log(e.response.data.error_message);
        });

    return add;
};

export default getLoc;
