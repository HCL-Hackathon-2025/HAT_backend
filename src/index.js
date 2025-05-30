import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './db/connection.js';
import apiRoutes from './routes/apiRoutes.js';

const app = express();
const corsOptions = {
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true // Allow credentials
};
app.use(cors(
    corsOptions
));
app.use(bodyParser.json({
    limit: '5mb' 
}));

app.use("/api/v1",apiRoutes);

const PORT = process.env.PORT || 3000;


app.listen(PORT, async() => {
    console.log(`Server is running on http://localhost:${PORT}`);
    try {
        await connectDB();
    } catch (error) {
        console.error(`Error connecting to the database: ${error.message}`);
    }
});