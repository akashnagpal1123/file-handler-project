import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import fileRoutes from './routes/fileRoutes.js';


const app = express();

const port = process.env.PORT || 5007;
console.log(port)

//authentication - routing
app.use('', authRoutes);
//file upload and download - routing
app.use('/file', fileRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});