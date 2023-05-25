import express from "express";
import con from "./connection.js";
import router from "./route.js";
import cors from "cors";

const app = express();

const port = process.env.PORT || 5000;

con.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");
});

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`)
})