import { Request, Response } from "express";
import { Product, productsTable } from "../model/Product";
import { ProductDTO } from "../business/ProductBusiness";
import productBusiness from "../business/ProductBusiness";

class ProductController {
  async create(req: Request, res: Response) {
    try {
      // Monta o DTO
      const productDTO: ProductDTO = {
        name: req.body.name,
        tags: req.body.tags,
      };

      // Valida o DTO
      if (!productDTO.name || !productDTO.tags) {
        throw new Error("Algum parâmetro faltando");
      }

      // Invoca o caso de uso
      const output = await productBusiness.create(productDTO);
      res.status(200).send(output);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async search(req: Request, res: Response) {
    try {
      // Monta o DTO
      
      const input: Product = {
        id:  req.params.id,
        name:  req.params.name,
        tags:  req.params.tags,
      };
      console.debug("input", input)
      // Valida o DTO
      // if (!productDTO.name || !productDTO.tags) {
      //   throw new Error("Algum parâmetro faltando");
      // }

      // Invoca o caso de uso
      const output = await productBusiness.search(input);
      res.status(200).send(output);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}
export default new ProductController();
