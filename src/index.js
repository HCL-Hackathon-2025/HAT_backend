import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './db/connection.js';
import StaffListRoutes from './routes/StaffListRoutes.js';
import apiRoutes from './routes/apiRoutes.js';

const app = express();
app.use(cors());
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