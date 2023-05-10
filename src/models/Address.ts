import { array } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

export interface IAddress {
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
    latitude: string;
    longitude: string;
    municipality: string;
    region: string;
    area: string;
    MEFAddress: object;
}

export interface IAddressModel extends IAddress, Document {}

const AddressSchema: Schema = new Schema(
    {
        floorRoomNumber: { type: String, required: false },
        houseBuildingNumber: { type: String, required: false },
        buildingName: { type: String, required: false },
        street: { type: String, required: false },
        barangayDistrict: { type: String, required: false },
        poBox: { type: String, required: false },
        city: { type: String, required: false },
        province: { type: String, required: false },
        postalCode: { type: String, required: false },
        timeZone: { type: String, required: false },
        country: { type: String, required: false },
        deliveryArea: { type: String, required: false },
        latitude: { type: String, required: false },
        longitude: { type: String, required: false },
        municipality: { type: String, required: false },
        region: { type: String, required: false },
        area: { type: String, required: false },
        MEFAddress: { type: Object, required: false }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IAddressModel>('Address', AddressSchema);
