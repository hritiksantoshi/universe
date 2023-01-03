import express, { Request, Response } from "express";
import CollectionController from "../../controllers/collection.controller";
import { authenticate } from "../../middlewares/auth.middleware";
// import multerMiddleware from '../../middlewares/multer.middleware'
import adminMulter from "../../middlewares/admin.multer";
import { responseWithStatus } from "../../utils/response.util";
const router = express.Router();

router.post(
    "/createcollection",
    authenticate,
    adminMulter.fields([
      { name: "logoImg", maxCount: 1 },
      { name: "bannerImg", maxCount: 1 },
    ]),
    async (req: Request | any, res: Response) => {
      const { name, royalties, description } = req.body;
      const controller = new CollectionController(req, res);
      console.log(req.files, "files");
      const response = await controller.createCollection(
        name,
        royalties,
        description,
        req.files.logoImg[0],
        req.files.bannerImg[0]
      );
      const { status } = response;
      return responseWithStatus(res, status, response);
    }
  );
  
  router.get(
    "/getcollections",
    authenticate,
    async (req: Request | any, res: Response) => {
      const controller = new CollectionController(req, res);
      const response = await controller.getCollections();
      const { status } = response;
      return responseWithStatus(res, status, response);
    }
  );

  module.exports = router;