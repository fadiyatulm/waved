import express from "express";
import con from "./connection.js";
import router from "./route.js";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
	
const port = process.env.PORT || 5000;

con.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`)
})