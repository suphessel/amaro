import { connection } from "./connection";
import { productsTable } from "./model/Product";

connection
  .raw(
    `
      CREATE TABLE IF NOT EXISTS ${productsTable}(
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         tags VARCHAR(255) NOT NULL  
      );
   `
  )
  .then(() => console.log("MySql tables were succcessfully created"))
  .catch((error) => console.log(error.message))
  .finally(() => {
    connection.destroy;
  });
