import mongoose, { Document, Schema } from 'mongoose';

export interface ISubmittedGeographicAddress {
    hasPublicSite: string;
    '@type': string;
    city: string;
    streetName: string;
    streetNr: string;
    postcode: string;
    country: string;
    streetType: string;
    stateOrProvince: string;
    postcodeExtension: string;
    locality: string;
    streetNrLast: string;
    streetNrSuffix: string;
    streetNrLastSuffix: string;
    streetSuffix: string;
    buildingName: string;
}

export interface IGeographicAddress {
    provideAlternative: boolean;
    buyerId?: string;
    sellerId?: string;
    authorizationCode: string;
    submittedGeographicAddress: ISubmittedGeographicAddress;
}

export interface IGeographicAddressModel extends IGeographicAddress, Document {}

const SubmittedGeographicAddressSchema: Schema = new Schema(
    {
        hasPublicSite: { type: String },
        '@type': { type: String },
        city: { type: String, required: true },
        streetName: { type: String },
        streetNr: { type: String },
        postcode: { type: String },
        country: { type: String, required: true },
        streetType: { type: String },
        stateOrProvince: { type: String },
        postcodeExtension: { type: String },
        locality: { type: String },
        streetNrLast: { type: String },
        streetNrSuffix: { type: String },
        streetNrLastSuffix: { type: String },
        streetSuffix: { type: String },
        buildingName: { type: String }
    },
    { _id: false }
);

const AddressSchema: Schema = new Schema({
    provideAlternative: { type: Boolean },
    buyerId: { type: String }, //tobe Required
    sellerId: { type: String }, //tobe Required
    authorizationCode: { type: String }, //tobe Required
    submittedGeographicAddress: { type: SubmittedGeographicAddressSchema }
});

export default mongoose.model<IGeographicAddressModel>('GeographicAddress', AddressSchema);
