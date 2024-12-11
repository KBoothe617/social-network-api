// connect to mongodb database

import { connect, connection } from 'mongoose';

connect(process.env.MONGODB_URI || 'mongodb://localhost/fitness-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export default connection;