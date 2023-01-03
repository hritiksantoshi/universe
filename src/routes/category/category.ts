import express, { Request, Response } from "express";
import CategoryController from "../../controllers/category.controller";
import { authenticate } from "../../middlewares/auth.middleware";
// import multerMiddleware from '../../middlewares/multer.middleware'
import adminMulter from "../../middlewares/admin.multer";
import { responseWithStatus } from "../../utils/response.util";
const router = express.Router();


router.post(
    "/createcategory",
    authenticate,
    adminMulter.fields([{ name: "categoryIcon", maxCount: 1 }]),
    async (req: Request | any, res: Response) => {
      const { name } = req.body;
      const controller = new CategoryController(req, res);
      const response = await controller.createCategory(
        name,
        req.files.categoryIcon[0]
      );
      const { status } = response;
      return responseWithStatus(res, status, response);
    }
  );

  router.get("/getcategories", authenticate, async (req: Request | any, res: Response) => {
    const controller = new CategoryController(req, res);
    const response = await controller.getCategory();
    const { status } = response;
    return responseWithStatus(res, status, response);
  });
  
  router.get("/deletecategory", authenticate, async (req: Request | any, res: Response) => {
    const { id } = req.query;
    const controller = new CategoryController(req, res);
    const response = await controller.deleteCategory(id);
    const { status } = response;
    return responseWithStatus(res, status, response);
  });
  
  router.put(
    "/updatecategory",
    authenticate,
    adminMulter.fields([{ name: "categoryIcon", maxCount: 1 }]),
    async (req: Request | any, res: Response) => {
      const { name } = req.body;
      const { id } = req.query;
      const controller = new CategoryController(req, res);
      let file: Express.Multer.File | undefined;
      if (req.files.categoryIcon?.length) {
        file = req.files.categoryIcon[0];
      }
      const response = await controller.updateCategory(id, name, file);
      const { status } = response;
      return responseWithStatus(res, status, response);
    }
  );
  module.exports = router;