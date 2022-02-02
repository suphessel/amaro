import productDatabase from "../data/ProductDataBase";
import { Product } from "../model/Product";
import { IdGenerator } from "../services/idGenerator";

export interface ProductDTO {
  name: string;
  tags: string;
}

class ProductBusiness {
  async create(productDTO: ProductDTO) {
    // Gerar um id aleatório pro usuário
    const idGenerator = new IdGenerator();
    const randomId = idGenerator.generateId();

    // Criar modelo do usuário
    const productModel: Product = {
      id: randomId,
      name: productDTO.name,
      tags: productDTO.tags,
    };

    // Salvar o produto no banco
    const savedProduct = await productDatabase.save(productModel);

    return {
      product: productModel,
    };
  }

  async search(productDTO: Product) {
    const filteredProducts = {
      generalFilter: [],
      nameFilter: [],
      tagsFilter: [],
      idFilter: [],
    };
    if (
      productDTO.name !== ":name" &&
      productDTO.tags !== ":tags" &&
      productDTO.id !== ":id"
    ) {
      filteredProducts.generalFilter =
        await productDatabase.selectProductByTagsAndNameAndId(
          productDTO.tags,
          productDTO.name,
          productDTO.id
        );
    }

    if (productDTO.name !== ":name") {
      filteredProducts.nameFilter = await productDatabase.selectProductByName(
        productDTO.name
      );
    }

    if (productDTO.tags !== ":tags") {
      filteredProducts.tagsFilter = await productDatabase.selectProductByTags(
        productDTO.tags
      );
    }
    if (productDTO.id !== ":id") {
      filteredProducts.idFilter = await productDatabase.selectProductById(
        productDTO.id
      );
    }
    return {
      filteredProducts,
    };
  }
}
export default new ProductBusiness();
