import mongoose, { Document, Schema } from 'mongoose';

interface IGeographicSubAddress {
    buildingName: string;
    subUnit: string;
    levelType: string;
    levelNumber: string;
    privateStreetNumber: string;
    privateStreetName: string;
}

interface IAssociatedGeographicAddress {
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
    hasPublicSite: string;
    '@type': string;
    allowsNewSite: boolean;
    id: string;
    href: string;
    '@schemaLocation': string;
    longitude: string;
    latitude: string;
}

interface IBestMatchGeographicAddress {
    hasPublicSite: string;
    '@type': string;
    allowsNewSite: boolean;
    id: string;
    href: string;
    schemaLocation: object;
    associatedGeographicAddress: IAssociatedGeographicAddress;
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

export interface IGeographicAddress {
    validationResult: string;
    provideAlternative: boolean;
    submittedGeographicAddress: ISubmittedGeographicAddress;
    bestMatchGeographicAddress: IBestMatchGeographicAddress;
}

export interface IGeographicAddressModel extends IGeographicAddress, Document {}

const GeographicSubAddressSchema: Schema = new Schema(
    {
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
        hasPublicSite: { type: String },
        '@type': { type: Array },
        allowsNewSite: { type: Boolean },
        id: { type: String },
        href: { type: String },
        '@schemaLocation': { type: String },
        associatedGeographicAddress: { type: AssociatedGeographicAddressSchema },
        longitude: { type: String },
        latitude: { type: String }
    },
    { _id: false }
);
const BestMatchGeographicAddress: Schema = new Schema(
    {
        hasPublicSite: { type: String },
        '@type': { type: Array },
        allowsNewSite: { type: Boolean },
        id: { type: String },
        href: { type: String },
        schemaLocation: { type: String },
        associatedGeographicAddress: { type: AssociatedGeographicAddressSchema },
        country: { type: String },
        streetType: { type: String },
        postcodeExtension: { type: String },
        city: { type: String },
        streetNr: { type: String },
        locality: { type: String },
        postcode: { type: String },
        streetNrLast: { type: String },
        streetNrSuffix: { type: String },
        streetName: { type: String },
        stateOrProvince: { type: String },
        streetNrLastSuffix: { type: String },
        geographicSubAddress: { type: String },
        streetSuffix: { type: String }
    },
    { _id: false }
);
const AddressSchema: Schema = new Schema({
    validationResult: { type: String },
    provideAlternative: { type: String },
    submittedGeographicAddress: { type: SubmittedGeographicAddressSchema },
    bestMatchGeographicAddress: { type: BestMatchGeographicAddress }
});

export default mongoose.model<IGeographicAddressModel>('GeographicAddress', AddressSchema);
