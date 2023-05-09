import { Client } from '@googlemaps/google-maps-services-js';
const client = new Client({});
import Logging from '../library/Logging';

const getLoc = async (address: string) => {
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
            // return r.data.results[0].address_components;
            return r.data.results[0];
        })
        .catch((e) => {
            console.log(e.response.data.error_message);
        });

    return add;
};

export default getLoc;
