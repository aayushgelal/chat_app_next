import express from 'express';
import customRouter from './routes/AuthRoutes.js'
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config()

const app = express();
app.use(cors("*"));
// Parse JSON bodies (Equivalent to previous body-parser.json())
app.use(express.json());

// Parse URL-encoded bodies (Equivalent to previous body-parser.urlencoded())
app.use(express.urlencoded({ extended: true }));
app.use('/auth', customRouter); 



app.listen(process.env.PORT, () => {
  console.log(`⚡️[server]: Server is running at 4000`);
});