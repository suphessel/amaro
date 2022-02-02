import express from "express";
import ProductsController from "../controllers/ProductController";

export const productRouter = express.Router();

productRouter.post("/create", ProductsController.create);
productRouter.get("/search/:name?/:tags?/:id?", ProductsController.search);
