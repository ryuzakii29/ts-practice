import { Client } from '@googlemaps/google-maps-services-js';
import { IGeographicAddress } from '../models/Response/GeographicAddressValidation';
const client = new Client({});

const googleValidate = async (address: string) => {
    return await client
        .geocode({
            params: {
                address,
                key: process.env.GOOGLEMAPS_KEY || ''
            },
            timeout: 1000 // milliseconds
        })
        .then((r) => {
            if (r.data.results.length <= 0 || r.data.status == 'ZERO_RESULTS') {
                return { err: 404, message: '0 Results' };
            }
            let { address_components }: any = r.data.results[0];

            const details: IGeographicAddress = {
                validationResult: 'Success',
                provideAlternative: true,
                submittedGeographicAddress: {
                    hasPublicSite: '',
                    '@type': '',
                    allowsNewSite: true,
                    id: r.data.results[0].place_id,
                    href: '',
                    '@schemaLocation': '',
                    latitude: r.data.results[0].geometry.location.lat.toString(),
                    longitude: r.data.results[0].geometry.location.lng.toString()
                },
                bestMatchGeographicAddress: {
                    hasPublicSite: '',
                    '@type': '',
                    allowsNewSite: true,
                    id: r.data.results[0].place_id,
                    href: '',
                    schemaLocation: {},
                    country: '',
                    streetType: '',
                    postcodeExtension: '',
                    city: '',
                    streetNr: '',
                    locality: '',
                    postcode: '',
                    streetNrLast: '',
                    streetNrSuffix: '',
                    streetName: '',
                    stateOrProvince: '',
                    streetNrLastSuffix: '',
                    streetSuffix: '',
                    geographicSubAddress: {
                        buildingName: '',
                        subUnit: '',
                        levelType: '',
                        levelNumber: '',
                        privateStreetNumber: '',
                        privateStreetName: ''
                    },
                    associatedGeographicAddress: {
                        country: '',
                        streetType: '',
                        postcodeExtension: '',
                        city: '',
                        streetNr: '',
                        locality: '',
                        postcode: '',
                        streetNrLast: '',
                        streetNrSuffix: '',
                        streetName: '',
                        stateOrProvince: '',
                        streetNrLastSuffix: '',
                        geographicSubAddress: {
                            buildingName: '',
                            subUnit: '',
                            levelType: '',
                            levelNumber: '',
                            privateStreetNumber: '',
                            privateStreetName: ''
                        },
                        streetSuffix: ''
                    }
                }
            };

            for (const component of address_components) {
                if (component.types.includes('floor')) {
                    details.bestMatchGeographicAddress.geographicSubAddress.levelType = component.long_name;
                }
                if (component.types.includes('room')) {
                    details.bestMatchGeographicAddress.geographicSubAddress.levelNumber = component.long_name;
                }
                if (component.types.includes('street_number')) {
                    details.bestMatchGeographicAddress.streetNr = component.short_name;
                }
                if (component.types.includes('route')) {
                    details.bestMatchGeographicAddress.streetNr += ' ' + component.long_name;
                }
                if (component.types.includes('premise')) {
                    details.bestMatchGeographicAddress.geographicSubAddress.buildingName = component.long_name;
                }
                if (component.types.includes('subpremise')) {
                    details.bestMatchGeographicAddress.geographicSubAddress.buildingName += ' ' + component.long_name;
                }
                if (component.types.includes('neighborhood')) {
                    details.bestMatchGeographicAddress.locality = component.long_name;
                }
                if (component.types.includes('postal_code_prefix')) {
                    details.bestMatchGeographicAddress.postcode = component.long_name;
                }
                if (component.types.includes('postal_code')) {
                    details.bestMatchGeographicAddress.postcode += ' ' + component.long_name;
                }
                if (component.types.includes('postal_code_suffix')) {
                    details.bestMatchGeographicAddress.postcodeExtension = component.long_name;
                }
                if (component.types.includes('locality')) {
                    details.bestMatchGeographicAddress.city = component.long_name;
                }
                if (component.types.includes('administrative_area_level_1')) {
                    details.bestMatchGeographicAddress.stateOrProvince = component.long_name;
                }
                if (component.types.includes('country')) {
                    details.bestMatchGeographicAddress.country = component.long_name;
                }
                if (component.types.includes('postal_town')) {
                    details.bestMatchGeographicAddress.locality = component.long_name;
                }
                if (component.types.includes('municipality')) {
                    details.bestMatchGeographicAddress.locality += ' ' + component.long_name;
                }
            }

            return details;
        })
        .catch((e) => {
            console.log(e.response);
        });
};

export default googleValidate;
