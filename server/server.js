import express from 'express';
import customRouter from './routes/AuthRoutes.js'
import cors from 'cors'


const app = express();
const port = 5000;
app.use(cors("*"));
// Parse JSON bodies (Equivalent to previous body-parser.json())
app.use(express.json());

// Parse URL-encoded bodies (Equivalent to previous body-parser.urlencoded())
app.use(express.urlencoded({ extended: true }));
app.use('/auth', customRouter); 



app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});