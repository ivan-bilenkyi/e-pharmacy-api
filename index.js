import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRouter from "./route/user.js";
import storesRouter from './route/store.js'
import reviewsRouter from './route/review.js'
import productsRouter from "./route/product.js";
import cartRouter from "./route/cart.js"

dotenv.config();

const { DB_HOST, PORT } = process.env;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/user", usersRouter);
app.use("/api/stores", storesRouter);
app.use("/api/customer-reviews", reviewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);


app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
});

mongoose
    .connect(DB_HOST)
    .then(() => {
        app.listen(PORT, () => {
            console.log("DB connection success");
            console.log("Server is running. Use our API on port: 3333");
        });
    })
    .catch((e) => {
        console.log(e.message);
        process.exit(1);
    });
