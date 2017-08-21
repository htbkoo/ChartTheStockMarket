import {} from 'dotenv/config';

export default {
    retrieve(key) {
        return process.env[key];
    }
}