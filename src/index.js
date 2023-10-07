import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import fileRoutes from './routes/fileRoutes.js';

dotenv.config();

const app = express();

//port selection
const port = process.env.PORT || 3007;

//route to authentication
app.use('', authRoutes);
//route to file upload
app.use('/file', fileRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});