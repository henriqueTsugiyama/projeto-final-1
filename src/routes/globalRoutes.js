import { Router } from "express";
import multer from "multer";

import ProductController from "../controllers/ProductController";
import ImageController from "../controllers/ImageController";
import UserController from "../controllers/UserController";
import AuthController from "../controllers/AuthController";
import AuthMiddleware from '../middlewares/AuthMiddleware';
import PDFController from "../controllers/PdfController";
const routes = new Router();
const upload = multer();

/***
 *  METODOS QUE PODEMOS TER NOS CONTROLLERS
index – Lista os dados da tabela
show – Mostra um item específico
create – Retorna a View para criar um item da tabela
store – Salva o novo item na tabela
edit – Retorna a View para edição do dado
update – Salva a atualização do dado
destroy – Remove o dado
 * 
 */

/*Rotas de Login*/
routes.post("/signin", upload.none(), AuthController.store);

/*Rotas de Produto*/
routes.get("/product", AuthMiddleware, ProductController.index);
routes.get("/product/:id", AuthMiddleware, ProductController.show);

routes.post("/product", AuthMiddleware, ProductController.store);
routes.put("/product/:id", AuthMiddleware, ProductController.update);
routes.delete("/product/:id", AuthMiddleware, ProductController.delete);

/*Rota do PDF */
routes.get("/pdf/:id", PDFController.store);

/*Rotas de Imagem*/
routes.post("/image", ImageController.store);
routes.put("/image/:id", ImageController.update); /*(o id se refere ao id do produto que se quer modificar a imagem)*/

/*Rotas de Usuário*/
routes.post("/user", upload.none(), UserController.store);

/*Rotas privadas de Usuário*/
routes.put("/user", upload.none(), AuthMiddleware, UserController.update);
routes.delete("/user", AuthMiddleware, UserController.delete);


/*Rota para testar Auth*/
routes.get("/", AuthMiddleware, function(req, res){ res.json({ user : req.user })});

export default routes;
