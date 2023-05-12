import mongoose, { Document, Schema } from 'mongoose';

interface IGeographicSubAddress {
    description: string;
    buildingName: string;
    subUnit: string;
    levelType: string;
    levelNumber: string;
    privateStreetNumber: string;
    privateStreetName: string;
}

interface IAssociatedGeographicAddress {
    description: string;
    country: string;
    streetType: string;
    postcodeExtension: string;
    city: string;
    streetNr: string;
    locality: string;
    postcode: string;
    streetNrLast: string;
    streetNrSuffix: string;
    streetName: string;
    stateOrProvince: string;
    streetNrLastSuffix: string;
    geographicSubAddress: IGeographicSubAddress;
    streetSuffix: string;
}

interface ISubmittedGeographicAddress {
    description: string;
    hasPublicSite: string;
    '@type': string;
    allowsNewSite: boolean;
    id: string;
    href: string;
    '@schemaLocation': string;
    associatedGeographicAddress: IAssociatedGeographicAddress;
}

export interface IGeographicAddress {
    description: string;
    provideAlternative: boolean;
    buyerId: string;
    sellerId: string;
    authorizationCode: string;
    submittedGeographicAddress: ISubmittedGeographicAddress;
}

export interface IGeographicAddressModel extends IGeographicAddress, Document {}

const GeographicSubAddressSchema: Schema = new Schema(
    {
        description: { type: String },
        buildingName: { type: String }, //tobe Required
        subUnit: { type: String },
        levelType: { type: String },
        levelNumber: { type: String },
        privateStreetNumber: { type: String },
        privateStreetName: { type: String }
    },
    { _id: false }
);

const AssociatedGeographicAddressSchema: Schema = new Schema(
    {
        description: { type: String },
        country: { type: String, required: false }, //tobe Required
        streetType: { type: String }, //tobe Required
        city: { type: String, required: false }, //tobe Required
        streetNr: { type: String },
        locality: { type: String },
        postcode: { type: String },
        streetNrLast: { type: String },
        streetNrSuffix: { type: String },
        streetName: { type: String, required: false },
        stateOrProvince: { type: String }, //tobe Required
        streetNrLastSuffix: { type: String },
        geographicSubAddress: { type: GeographicSubAddressSchema },
        streetSuffix: { type: String }
    },
    { _id: false }
);

const SubmittedGeographicAddressSchema: Schema = new Schema(
    {
        description: { type: String },
        hasPublicSite: { type: String },
        '@type': { type: Array },
        allowsNewSite: { type: Boolean },
        id: { type: String },
        href: { type: String },
        '@schemaLocation': { type: String },
        associatedGeographicAddress: { type: AssociatedGeographicAddressSchema }
    },
    { _id: false }
);

const AddressSchema: Schema = new Schema({
    description: { type: String },
    provideAlternative: { type: Boolean },
    buyerId: { type: String }, //tobe Required
    sellerId: { type: String }, //tobe Required
    authorizationCode: { type: String }, //tobe Required
    submittedGeographicAddress: { type: SubmittedGeographicAddressSchema }
});

export default mongoose.model<IGeographicAddressModel>('GeographicAddress', AddressSchema);
