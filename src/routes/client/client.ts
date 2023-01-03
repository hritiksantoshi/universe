import express, { Request, Response } from 'express'
import { authenticate } from '../../middlewares/auth.middleware'
// import multerMiddleware from '../../middlewares/multer.middleware'
import { responseWithStatus } from '../../utils/response.util'
const router = express.Router()

// router.post('/save', async (req: Request | any, res: Response) => {
//     const { email, firstName, lastName, password, countryCode, phoneNumber, country, city, state, businessName, websiteDomain, adminDomain, file, latitude, longitude, subscriptionPlanId } = req.body;
//     const controller = new ClientController(req, res)
//     const response = await controller.save({ email, firstName, lastName, password, countryCode, phoneNumber, country, city, state, businessName, file, websiteDomain, adminDomain, latitude, longitude, subscriptionPlanId });
//     const { status } = response;
//     return responseWithStatus(res, status, response)
// })

// router.post('/registerClient', async (req: Request | any, res: Response) => {
//     const { email, firstName, lastName, phoneNumber, country, city, state, businessName, websiteDomain, workPhoneNumber, adminDomain, address, stripCustomerId, postCode, subscriptionPlanId ,admin_Domain,lp_Domain ,templateUniqueId} = req.body;
//     const controller = new ClientController(req, res)
//     const response = await controller.registerClient({ email, firstName, lastName, phoneNumber, country, websiteDomain, workPhoneNumber, adminDomain, stripCustomerId, city, state, businessName, address, postCode, subscriptionPlanId ,admin_Domain,lp_Domain,templateUniqueId });
//     const { status } = response;
//     return responseWithStatus(res, status, response)
// })


// router.post('/registerClientUpdate', async (req: Request | any, res: Response) => {
//     const {email, firstName, lastName, phoneNumber, websiteDomain, adminDomain, country, city, state,businessName, subscriptionPlanId ,clientId } = req.body;
//     const controller = new ClientController(req, res)
//     const response = await controller.registerClientUpdate({email, firstName, lastName, phoneNumber, websiteDomain, adminDomain,country, city, state, businessName, subscriptionPlanId ,clientId} );
//     return responseWithStatus(res, response.status, response)
// })



// router.post('/update', authenticate, async (req: Request | any, res: Response) => {
//     const controller = new ClientController(req, res)
//     const response = await controller.update(req.body);
//     return responseWithStatus(res, response.status, response)
// })

// router.post('/updateLinks', async (req: Request | any, res: Response) => {
//     const controller = new ClientController(req, res)
//     const response = await controller.updateLinks(req.body);
//     return responseWithStatus(res, response.status, response)
// })


// router.post('/block-unblock', authenticate, async (req: Request | any, res: Response) => {
//     const controller = new ClientController(req, res)
//     const response = await controller.block(req.body);
//     return responseWithStatus(res, response.status, response)
// })

// router.get('/getlist', authenticate, async (req: Request | any, res: Response) => {
//     const { pageNumber, pageSize, startDate, endDate, searchByName } = req.query;
//     const controller = new ClientController(req, res)
//     const response = await controller.getlist(pageNumber, pageSize, startDate, endDate, searchByName);
//     return responseWithStatus(res, response.status, response)
// })

// router.post('/clientDelete', authenticate, async (req: Request | any, res: Response) => {
//     const controller = new ClientController(req, res)
//     const response = await controller.clientDelete(req.body);
//     return responseWithStatus(res, response.status, response)
// })

// router.post('/details', authenticate, async (req: Request | any, res: Response) => {
//     const controller = new ClientController(req, res)
//     const response = await controller.details(req.body);
//     return responseWithStatus(res, response.status, response)
// })

// router.post('/uploadFile', multerMiddleware.single('file'), async (req: Request | any, res: Response) => {
//     const controller = new ClientController(req, res)
//     const response = await controller.uploadFile(req.file as Express.Multer.File);
//     return responseWithStatus(res, response.status, response)
// })

// router.post('/getPlanAndFeature', authenticate, async (req: Request | any, res: Response) => {
//     const controller = new ClientController(req, res)
//     const response = await controller.getPlanAndFeature(req.body);
//     return responseWithStatus(res, response.status, response)
// })

// router.post('/businessName', async (req: Request | any, res: Response) => {
//     const controller = new ClientController(req, res)
//     const response = await controller.businessName(req.body);
//     return responseWithStatus(res, response.status, response)
// })


// router.post('/email', async (req: Request | any, res: Response) => {
//     const controller = new ClientController(req, res)
//     const response = await controller.email(req.body);
//     return responseWithStatus(res, response.status, response)
// })

// router.get('/key', async (req: Request | any, res: Response) => {
//     const { link } = req.query;
//     const controller = new ClientController(req, res)
//     const response = await controller.key(link);
//     const { status } = response;
//     return responseWithStatus(res, status, response)
// })

// router.post('/registerProspect', async (req: Request | any, res: Response) => {
//     const { email, firstName, lastName, phoneNumber, country, city, state, businessName, workPhoneNumber, address, postCode } = req.body;
//     const controller = new ClientController(req, res)
//     const response = await controller.registerProspect({ email, firstName, lastName, phoneNumber, country, workPhoneNumber, city, state, businessName, address, postCode });
//     const { status } = response;
//     return responseWithStatus(res, status, response)
// })

// router.get('/getlistProspect', authenticate, async (req: Request | any, res: Response) => {
//     const { pageNumber, pageSize, startDate, endDate, searchByName } = req.query;
//     const controller = new ClientController(req, res)
//     const response = await controller.getlistProspect(pageNumber, pageSize, startDate, endDate, searchByName);
//     return responseWithStatus(res, response.status, response)
// })

module.exports = router
