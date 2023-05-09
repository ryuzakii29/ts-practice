import mongoose, { Document, Schema } from 'mongoose';

export interface IAddress {
    roomNumber: string;
    bldgNumber: string;
    bldgName: string;
    street: string;
    barangay: string;
    poBox: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    delivery_area: string;
    longitude: string;
    latitude: string;
    municipality: string;
    region: string;
    area: string;
}

export interface IAddressModel extends IAddress, Document {}

const AddressSchema: Schema = new Schema(
    {
        roomNumber: { type: String, required: false },
        bldgNumber: { type: String, required: false },
        bldgName: { type: String, required: false },
        street: { type: String, required: false },
        barangay: { type: String, required: false },
        poBox: { type: String, required: false },
        city: { type: String, required: false },
        province: { type: String, required: false },
        postalCode: { type: String, required: false },
        country: { type: String, required: false },
        delivery_area: { type: String, required: false },
        longitude: { type: String, required: false },
        latitude: { type: String, required: false },
        municipality: { type: String, required: false },
        region: { type: String, required: false },
        area: { type: String, required: false }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IAddressModel>('Address', AddressSchema);
