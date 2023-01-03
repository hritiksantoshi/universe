import express, { Request, Response } from "express";
import AdminController from "../../controllers/admin.controller";
import { authenticate } from "../../middlewares/auth.middleware";
// import multerMiddleware from '../../middlewares/multer.middleware'
import adminMulter from "../../middlewares/admin.multer";
import { responseWithStatus } from "../../utils/response.util";
const router = express.Router();

router.post("/login", async (req: Request | any, res: Response) => {
  const { email, password } = req.body;
  const controller = new AdminController(req, res);
  const response = await controller.login({ email, password });
  const { status } = response;
  return responseWithStatus(res, status, response);
});
router.post("/forgotPassword", async (req: Request | any, res: Response) => {
    const { email} = req.body;
    const controller = new AdminController(req, res);
    const response = await controller.forgotPassword({ email});
    const { status } = response;
    return responseWithStatus(res, status, response);
  });

  router.post("/resetPassword",authenticate, async (req: Request | any, res: Response) => {
    const { password,confirmPassword} = req.body;
    const controller = new AdminController(req, res);
    const response = await controller.resetPassword({password,confirmPassword});
    const { status } = response;
    return responseWithStatus(res, status, response);
  });

  router.post("/changePassword",authenticate, async (req: Request | any, res: Response) => {
    const { oldPassword,newPassword} = req.body;
    const controller = new AdminController(req, res);
    const response = await controller.changePassword({oldPassword,newPassword});
    const { status } = response;
    return responseWithStatus(res, status, response);
  });







module.exports = router;
