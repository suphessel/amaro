import { Product, productsTable } from "../model/Product";
import { connection } from "../connection";

class ProductDatabase {
  async save(product: Product) {
    const productDB = {
      id: product.id,
      name: product.name,
      tags: product.tags,
    };
    await connection.insert(productDB).into(`${productsTable}`);
    return;
  }

  async selectProductById(id: string) {
    const result = await connection(productsTable).select("*").where({ id });

    console.debug("selectProductById", result);

    return result;
  }
  async selectProductByName(name: string) {
    const result = await connection(productsTable).select("*").where({ name });
    console.debug("selectProductByName", result);

    return result;
  }
  async selectProductByTags(tags: string) {
    const result = await connection(productsTable).select("*").where({ tags });

    console.debug("selectProductByTags", result);

    return result;
  }
  async selectProductByTagsAndNameAndId(tags: string, name: string, id: string) {
    const result = await connection(productsTable)
      .select("*")
      .where({ tags, name, id })
    console.debug("selectProductByTagsAndNameAndId", result);
    return result;
  }
}

export default new ProductDatabase();
