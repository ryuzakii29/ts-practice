import mongoose from 'mongoose';
import { config } from '../config/config';
export const db = async () => {
    beforeAll(async () => {
        mongoose.set('strictQuery', false);
        await mongoose.connect(config.mongo.test_url);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
};
