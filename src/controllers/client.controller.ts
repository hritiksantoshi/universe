// // @ts-ignore
// import { Route, Controller, Tags, Post, Body, Security, Query, UploadedFile, Get } from 'tsoa'
// import handlebar from 'handlebars';
// import path from 'path';
// import { Request, Response } from 'express'

// import { IResponse } from '../utils/interfaces.util';
// import { findOne, upsert, getAll, getAllBySort, findAll, getFilterMonthDateYear, deleteById, getAllWithoutPaging } from '../helpers/db.helpers';
// import { genHash, encrypt, camelize } from '../utils/common.util';
// import clientModel from '../models/client.model';
// import logger from '../configs/logger.config';
// import { sendEmail } from '../configs/nodemailer';
// import { readHTMLFile } from '../services/utils';
// import { registrationEmailTemplate } from './../template/newRegistration';
// import { createClientDataBase, deleteClientDataBase } from '../helpers/common.helper';
// import mongoose from 'mongoose';
// import moment from 'moment'

// @Tags('Client')
// @Route('api/client')
// export default class ClientController extends Controller {
//     req: Request;
//     res: Response;
//     userId: string
//     constructor(req: Request, res: Response) {
//         super();
//         this.req = req;
//         this.res = res;
//         this.userId = req.body.user ? req.body.user.id : ''
//     }

//     /**
//     * Save a client
//     */
//     @Post("/save")
//     public async save(@Body() request: { email: string, firstName: string, lastName: string, password: string, file: string, countryCode: string, phoneNumber: number, country: string, city: string, state: string, businessName: string, websiteDomain: string, adminDomain: string, latitude: string, longitude: string, subscriptionPlanId: string }): Promise<IResponse> {
//         try {
//             const { email, firstName, lastName, password, countryCode, phoneNumber, country, city, state, businessName, file, websiteDomain, adminDomain, latitude, longitude, subscriptionPlanId } = request;
//             // check if client exists
//             const userEmail = await findOne(clientModel, { email });
//             if (userEmail) {

//                 throw new Error(`Email ${email} is already exists`)
//             }
//             const userNumber = await findOne(clientModel, { phoneNumber });

//             if (userNumber) {
//                 throw new Error(`Number ${phoneNumber} is already exists`)
//             }
//             let hashed = await genHash('123456');
//             const saveResponse = await upsert(clientModel, { email, firstName, lastName, password: hashed, countryCode, phoneNumber, file, country, city, state, businessName, websiteDomain, adminDomain, latitude, longitude, subscriptionPlanId })
//             return {
//                 data: { ...saveResponse.toObject() },
//                 error: '',
//                 message: 'User registered successfully',
//                 status: 200

//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }


//     /**
//     * register a client
//     */
//     @Post("/registerClient")
//     public async registerClient(@Body() request: { email: string, firstName: string, lastName: string, websiteDomain: string, workPhoneNumber: string, adminDomain: string, stripCustomerId: string, address: string, phoneNumber: number, country: string, city: string, state: string, businessName: string, postCode: number, subscriptionPlanId: string, admin_Domain: string, lp_Domain: string, templateUniqueId: string }): Promise<IResponse> {
//         try {
//             let businessName = request.businessName;
//             let templateData = null;
//             let email, firstName, lastName, phoneNumber, country, city, state, websiteDomain, adminDomain, workPhoneNumber, stripCustomerId, address, postCode, subscriptionPlanId, admin_Domain, lp_Domain;

//             const checkBusinessName = businessName.toLowerCase().split(' ').join('-');

//             const userBusinessName = await findOne(clientModel, { businessName: checkBusinessName, isProspect: true });
//             if (userBusinessName) {

//                 email = userBusinessName.email;
//                 firstName = userBusinessName.firstName;
//                 lastName = userBusinessName.lastName;
//                 phoneNumber = userBusinessName.phoneNumber;
//                 country = userBusinessName.country;
//                 city = userBusinessName.city;
//                 state = userBusinessName.state;
//                 websiteDomain = request.websiteDomain;
//                 adminDomain = request.adminDomain;
//                 workPhoneNumber = userBusinessName.workPhoneNumber;
//                 stripCustomerId = request.stripCustomerId;
//                 address = userBusinessName.address;
//                 postCode = userBusinessName.postCode;
//                 subscriptionPlanId = request.subscriptionPlanId;
//                 admin_Domain = request.admin_Domain;
//                 lp_Domain = request.lp_Domain;
//             } else {

//                 email = request.email;
//                 firstName = request.firstName;
//                 lastName = request.lastName;
//                 phoneNumber = request.phoneNumber;
//                 country = request.country;
//                 city = request.city;
//                 state = request.state;
//                 websiteDomain = request.websiteDomain;
//                 adminDomain = request.adminDomain;
//                 workPhoneNumber = request.workPhoneNumber;
//                 stripCustomerId = request.stripCustomerId;
//                 address = request.address;
//                 postCode = request.postCode;
//                 subscriptionPlanId = request.subscriptionPlanId;
//                 admin_Domain = request.admin_Domain;
//                 lp_Domain = request.lp_Domain;

//                 // const { email, firstName, lastName, phoneNumber, country, city, state, websiteDomain, adminDomain, workPhoneNumber, stripCustomerId, address, postCode, subscriptionPlanId, admin_Domain, lp_Domain } = request;                

//                 const userBusinessName = await findOne(clientModel, { businessName: checkBusinessName, isProspect: false });
//                 if (userBusinessName) {
//                     throw new Error(`Business name  ${userBusinessName.businessName} is already exists`)
//                 }
//             }
//             if (request.templateUniqueId) {
//                 templateData = await findOne(templateModel, { uniqueId: request.templateUniqueId })
//             }

//             const clientAdminDomain = await findOne(clientModel, { adminDomain });
//             if (clientAdminDomain) {
//                 throw new Error(`This AdminDomain ${adminDomain} is already exists`)
//             }

//             let admindomain = `https://${checkBusinessName}-admin.block-brew.com/`;
//             let webDomain = `https://${checkBusinessName}.block-brew.com/`;

//             let keyValue = [];

//             if (subscriptionPlanId) {
//                 let subscriptionPlanFeatures = await findAll(subscriptionPlanFeatureModel, { planId: mongoose.Types.ObjectId(subscriptionPlanId) });
//                 for (let subscriptionPlanFeature of subscriptionPlanFeatures) {
//                     let features = await findOne(featureModel, { _id: subscriptionPlanFeature.featureId, isDeleted: false });
//                     if (features && features.keyValue && features.keyValue.length > 0) {
//                         let featuerType = await findOne(featureTypeModel, { _id: features.typeId });
//                         for (let key of features.keyValue) {
//                             delete key._id
//                             key.name = features.name
//                             key.key = await key.key.split(' ').join('_')
//                             key.featureType = featuerType.name
//                             key.isActive = true
//                             key.value = null
//                             keyValue.push(key)
//                         }
//                     }
//                 }
//             }
//             var password = Math.random().toString(36).slice(-8);
//             var databaseName = `${checkBusinessName}-client`;

//             var encrypt_database = await encrypt(databaseName);

//             let saveResponse;

//             if (userBusinessName) {
//                 saveResponse = await upsert(clientModel, { email, firstName, lastName, phoneNumber, country, city, state, address, stripCustomerId, workPhoneNumber, businessName: checkBusinessName, websiteDomain: webDomain, adminDomain: admindomain, postCode, subscriptionPlanId, databaseName: databaseName, dbSecretKey: encrypt_database, isProspect: false }, userBusinessName._id)
//             } else {
//                 saveResponse = await upsert(clientModel, { email, firstName, lastName, phoneNumber, country, city, state, address, stripCustomerId, workPhoneNumber, businessName: checkBusinessName, websiteDomain: webDomain, adminDomain: admindomain, postCode, subscriptionPlanId, databaseName: databaseName, dbSecretKey: encrypt_database })
//             }

//             await createClientDataBase({ email, firstName, lastName, password, admindomain, webDomain, saveResponse }, databaseName, encrypt_database, templateData, keyValue);

//             //   send an email
//             const html = await readHTMLFile(path.join(__dirname, '../', 'template', 'newregistration.html'))
//             const template = handlebar.compile(registrationEmailTemplate)

//             // const template = 'hello'
//             await sendEmail(process.env.EMAIL_NOTIFICATION_ADDRESS, 'Thanks for Register with us', email, template({ email, firstName, lastName, webDomain, admindomain, password }))


//             return {
//                 data: { ...saveResponse },
//                 error: '',
//                 message: 'User registered successfully',
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }


//     /**
//    * update a client
//    */
//     @Post("/registerClientUpdate")
//     public async registerClientUpdate(@Body() request: { email: string, firstName: string, lastName: string, phoneNumber: number, country: string, city: string, state: string, businessName: string, websiteDomain: string, adminDomain: string, clientId: string, subscriptionPlanId: string }): Promise<IResponse> {
//         try {

//             const { firstName, lastName, email, clientId, phoneNumber, websiteDomain, adminDomain, country, city, state, subscriptionPlanId } = request;
//             console.log(clientId, ">>>>>")

//             // check if user exists
//             const exists = await findOne(clientModel, { _id: clientId });
//             console.log(exists, ">>>>>")
//             if (!exists) {
//                 throw new Error('Invalid Client ')
//             }

//             var payload: { [k: string]: any } = {};
//             if (firstName)
//                 payload.firstName = firstName;

//             if (lastName)
//                 payload.lastName = lastName;

//             if (email)
//                 payload.email = email;

//             if (phoneNumber)
//                 payload.phoneNumber = phoneNumber;
//             if (websiteDomain)
//                 payload.websiteDomain = websiteDomain;
//             if (adminDomain)
//                 payload.adminDomain = adminDomain;

//             if (country)
//                 payload.country = country;

//             if (city)
//                 payload.city = city;

//             if (state)
//                 payload.state = state;

//             if (subscriptionPlanId)
//                 payload.subscriptionPlanId = subscriptionPlanId;


//             const saveResponse = await upsert(clientModel, payload, clientId)
//             // create a temp token
//             return {
//                 data: saveResponse,
//                 error: '',
//                 message: 'Client successfully updated!',
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }


//     /**
//     * Update client
//     */
//     @Security('Bearer')
//     @Post("/update")
//     public async update(@Body() request: { email: string, firstName: string, lastName: string, phoneNumber: number, businessName: string, websiteDomain: string, adminDomain: string, clientId: string }): Promise<IResponse> {
//         try {

//             const { firstName, lastName, email, clientId, phoneNumber, websiteDomain, adminDomain } = request;

//             // check if user exists
//             const exists = await findOne(clientModel, { _id: clientId });

//             if (!exists) {
//                 throw new Error('Invalid Client')
//             }

//             // if (email) {
//             //     const emailExists = await findOne(clientModel, { _id: { $ne: clientId }, email: email });
//             //     if (emailExists) {
//             //         throw new Error(`Email ${email} is already registered with us`)
//             //     }
//             // }

//             var payload: { [k: string]: any } = {};
//             if (firstName)
//                 payload.firstName = firstName;

//             if (lastName)
//                 payload.lastName = lastName;

//             if (email)
//                 payload.email = email;

//             if (phoneNumber)
//                 payload.phoneNumber = phoneNumber;
//             if (websiteDomain)
//                 payload.websiteDomain = websiteDomain;
//             if (adminDomain)
//                 payload.adminDomain = adminDomain;


//             const saveResponse = await upsert(clientModel, payload, clientId)
//             // create a temp token
//             return {
//                 data: saveResponse,
//                 error: '',
//                 message: 'Client successfully updated!',
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }


//     /**
//     * Update client
//     */
//     @Post("/updateLinks")
//     public async updateLinks(@Body() request: { godClientId: string, admin_Domain: string, lp_Domain: string }): Promise<IResponse> {
//         try {

//             const { godClientId, admin_Domain, lp_Domain } = request;
//             var payload: { [k: string]: any } = {};
//             if (admin_Domain)
//                 payload.admin_Domain = admin_Domain;

//             if (lp_Domain)
//                 payload.lp_Domain = lp_Domain;



//             const saveResponse = await upsert(clientModel, payload, godClientId)
//             // create a temp token
//             return {
//                 data: saveResponse,
//                 error: '',
//                 message: 'Client successfully updated!',
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }

//     /**
//    * Block client
//    */
//     @Security('Bearer')
//     @Post("/block-unblock")
//     public async block(@Body() request: { clientId: string }): Promise<IResponse> {
//         try {
//             const { clientId } = request;
//             let responseError = '';
//             // check if user exists
//             const block = await findOne(clientModel, { _id: clientId, isBlocked: false });
//             if (block) {
//                 const blockClient = await upsert(clientModel, {
//                     _id: clientId,
//                     $set: { isBlocked: true }
//                 }, clientId)
//                 var saveResponse = await upsert(clientModel, blockClient, clientId)
//                 let errorMessage = 'Client  successfully Blocked!'
//                 responseError += errorMessage
//             }
//             else {
//                 const unblock = await findOne(clientModel, { _id: clientId, isBlocked: true });
//                 const unblockClient = await upsert(clientModel, {
//                     _id: clientId,
//                     $set: { isBlocked: false }
//                 }, clientId)

//                 if (!unblock) {
//                     throw new Error('Invalid Client')
//                 }
//                 var saveResponse = await upsert(clientModel, unblockClient, clientId)
//                 let errorMessage = 'Client  successfully UnBlocked!'
//                 responseError += errorMessage
//             }

//             return {
//                 data: saveResponse,
//                 error: '',
//                 message: responseError,
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }



//     /**
//     * Getlist client
//     */
//     @Security('Bearer')
//     @Get("/getlist")
//     public async getlist(@Query() pageNumber: string, @Query() pageSize: string, @Query() startDate = null, @Query() endDate = null, @Query() searchByName = null): Promise<IResponse> {
//         try {

//             // let query: any = [{ isDeleted: false }];
//             // if (searchByName) {
//             //     query.push({
//             //         $or: [
//             //             { firstName: { $regex: searchByName, $options: 'i' } },
//             //             { lastName: { $regex: searchByName, $options: 'i' } }
//             //         ]
//             //     })
//             // }
//             // if (startDate && endDate) {
//             //     query.push({
//             //         createdAt: {
//             //             $gte: startDate,
//             //             $lte: endDate
//             //         }
//             //     });
//             // }

//             // console.log(query)

//             // const getAllresponse = await clientModel.aggregate([
//             //     {
//             //         $match: {
//             //             $and: query
//             //             // $and: [{isDeleted:false}]
//             //         }
//             //     },
//             //     {
//             //         $lookup: { from: 'subscription_plans', localField: 'subscriptionPlanId', foreignField: '_id', as: 'subscriptionPlanDetails' }
//             //     },
//             //     { $unwind: '$subscriptionPlanDetails' },
//             //     // { $project: { subscriptionPlanDetails: 1 } },
//             //     { $skip: Number(pageNumber) },
//             //     { $limit: Number(pageSize) },
//             //     { $sort: { _id: 1 } }
//             // ])

//             // const Sdate = moment(new Date(`${startDate}`)).format()
//             // const ldate = moment(new Date(`${endDate}`)).format()

//             const query: any = [{ isDeleted: false, isProspect: false }];
//             if (searchByName) {
//                 query.push({
//                     "$or": [
//                         { "firstName": { $regex: searchByName, $options: 'i' } },
//                         { "lastName": { $regex: searchByName, $options: 'i' } }
//                     ]
//                 })
//             }
//             if (startDate && endDate) {
//                 query.push({

//                     ...((startDate || endDate) ? {
//                         createdAt: {

//                             ...(startDate ? {
//                                 $gte: new Date(`${startDate}T00:00:00Z`)
//                             } : null),
//                             ...(endDate ? {
//                                 $lte: `${getFilterMonthDateYear(endDate)}T00:00:00Z`
//                             } : null),
//                         }
//                     } : null),

//                     // createdAt: {
//                     //     $gte: new Date(`${startDate}T00:00:00Z`),
//                     //     $lte: new Date(`${endDate}T00:00:00Z`)
//                     // }
//                 });
//             }

//             const getAllresponse = await getAllBySort(clientModel, { $and: query }, Number(pageNumber), Number(pageSize), {}, true, { createdAt: -1 })
//             for (const data of getAllresponse.items) {
//                 data.PlanDetails = [];
//                 if (Array.isArray(data.subscriptionPlanId)) {
//                     data.subscriptionPlanId = data.subscriptionPlanId[0]
//                 }
//                 let subdata = await findOne(subscriptionPalnModel, { _id: mongoose.Types.ObjectId(data.subscriptionPlanId), isDeleted: false })
//                 data.PlanDetails.push(subdata)
//             }

//             return {
//                 data: getAllresponse,
//                 error: '',
//                 message: 'Fetched Successfully',
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }


//     /**
//     * getPlanAndFeature client
//     */
//     @Security('Bearer')
//     @Post("/getPlanAndFeature")
//     public async getPlanAndFeature(@Body() request: { websiteDomain: string }): Promise<IResponse> {
//         try {
//             const { websiteDomain } = request;

//             // check if user exists
//             const exists = await findOne(clientModel, { $or: [{ websiteDomain: websiteDomain }, { adminDomain: websiteDomain }] });

//             if (!exists) {
//                 throw new Error('Invalid Domain')
//             }

//             const [getAllresponse] = await clientModel.aggregate([
//                 {
//                     $match: { $or: [{ websiteDomain: websiteDomain }, { adminDomain: websiteDomain }] }
//                 },
//                 {
//                     $lookup: {
//                         from: 'subscription_plans',
//                         localField: 'subscriptionPlanId',
//                         foreignField: '_id',
//                         as: 'subDetails'
//                     }
//                 },
//                 {
//                     $unwind: '$subDetails'
//                 },
//                 {
//                     $lookup: {
//                         from: 'subscription_plan_features',
//                         localField: 'subscriptionPlanId',
//                         foreignField: 'planId',
//                         as: 'featureDetails'
//                     }
//                 },
//                 {
//                     $lookup: {
//                         from: 'features',
//                         localField: 'featureDetails.featureId',
//                         foreignField: '_id',
//                         as: 'featureAssigned'
//                     }
//                 },
//                 {
//                     $project: {
//                         subDetails: '$subDetails',
//                         fetaureDetails: '$featureAssigned',
//                     }
//                 },

//             ])

//             return {
//                 data: getAllresponse,
//                 error: '',
//                 message: 'Fetched Successfully',
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }

//     /**
//     * Getdetails client
//     */
//     @Security('Bearer')
//     @Post("/details")
//     public async details(@Body() request: { clientId: string }): Promise<IResponse> {
//         try {
//             const { clientId } = request;

//             // check if user exists
//             const exists = await findOne(clientModel, { _id: clientId, isDeleted: false });

//             if (!exists) {
//                 throw new Error('Invalid Client')
//             }

//             const saveResponse = await upsert(clientModel, exists, clientId)

//             return {
//                 data: saveResponse,
//                 error: '',
//                 message: 'Fetched Successfully',
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }



//     /**
//     *  client delete
//     */
//     @Security('Bearer')
//     @Post("/clientDelete")
//     public async clientDelete(@Body() request: { clientId: string }): Promise<IResponse> {
//         try {
//             const { clientId } = request;
//             let saveResponse;
//             // check if user exists
//             const exists = await findOne(clientModel, { _id: clientId, isDeleted: false });
//             if (!exists) {
//                 throw new Error('Invalid Client')
//             }
//             if (exists.dbSecretKey) {
//                 const checkDataBase = await deleteClientDataBase(exists.databaseName, exists.dbSecretKey)
//                 if (checkDataBase) {
//                     saveResponse = await deleteById(clientModel, clientId)
//                 }
//             } else {

//                 saveResponse = await deleteById(clientModel, clientId)
//             }
//             return {
//                 data: saveResponse,
//                 error: '',
//                 message: 'Client successfully Deleted!',
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }



//     /**
//     * Upload a file
//     */
//     @Security('Bearer')
//     @Post("/uploadFile")
//     public async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<IResponse> {
//         try {
//             const saveResponse = await upsert(clientModel, { file: file.filename })
//             return {
//                 data: saveResponse.toObject(),
//                 error: '',
//                 message: 'File successfully uploaded',
//                 status: 200
//             }
//         }

//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }


//     /**
//     * Check businessName client
//     */
//     @Post("/businessName")
//     public async businessName(@Body() request: { businessName: string }): Promise<IResponse> {
//         try {
//             const { businessName } = request;
//             const checkBusinessName = businessName.toLowerCase().split(' ').join('-');
//             // check if user exists
//             let checkDefaultName = await findOne(domainModel, { domainName: businessName, isRestricted: true })
//             if (checkDefaultName) {
//                 throw new Error(`Business name not available`)
//             }
//             const exists = await findOne(clientModel, { businessName: checkBusinessName, isProspect: false });

//             if (exists) {
//                 throw new Error(`Business name ${businessName} is already registered with us`)
//             }

//             return {
//                 data: '',
//                 error: '',
//                 message: 'Success',
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }



//     /**
//     * Check email and number client
//     */
//     @Post("/email")
//     public async email(@Body() request: { clientEmail: string, clientNumber: number }): Promise<IResponse> {
//         try {
//             const { clientEmail, clientNumber } = request;

//             // check if user exists
//             const exists = await findOne(clientModel, { email: clientEmail });
//             const cNumber = await findOne(clientModel, { phoneNumber: clientNumber });
//             if (exists) {
//                 throw new Error(`Email ${clientEmail} is already registered with us`)
//             }
//             if (cNumber) {
//                 throw new Error(`Number ${clientNumber} is already registered with us`)
//             }
//             return {
//                 data: '',
//                 error: '',
//                 message: 'Success',
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }

//     /**
//     * Get key according to link
//     */
//     @Get("/key")
//     public async key(@Query() link: string): Promise<IResponse> {
//         try {
//             let link2 = link.replace(/^https?:\/\//, '').replace('/', '')
//             const getAllresponse = await findOne(clientModel, { $or: [{ websiteDomain: link }, { adminDomain: link }, { lp_Domain: link }, { admin_Domain: link }, { websiteDomain: link2 }, { adminDomain: link2 }, { lp_Domain: link2 }, { admin_Domain: link2 }] }, { dbSecretKey: 1, databaseName: 1 })
//             if (!getAllresponse) {
//                 throw new Error(`Invalid link!!`)
//             }
//             return {
//                 data: getAllresponse,
//                 error: '',
//                 message: 'Fetched Successfully',
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }

//     /**
// * register a Prospect
// */
//     @Post("/registerProspect")
//     public async registerProspect(@Body() request: { email: string, firstName: string, lastName: string, workPhoneNumber: string, address: string, phoneNumber: number, country: string, city: string, state: string, businessName: string, postCode: number }): Promise<IResponse> {
//         try {


//             const { email, firstName, lastName, phoneNumber, country, city, state, businessName, workPhoneNumber, address, postCode } = request;

//             const checkBusinessName = businessName.toLowerCase().split(' ').join('-');

//             let saveResponse;
//             const userBusinessName = await findOne(clientModel, { businessName: checkBusinessName });
//             if (!userBusinessName) {

//                 saveResponse = await upsert(clientModel, { email, firstName, lastName, phoneNumber, country, city, state, address, workPhoneNumber, businessName: checkBusinessName, postCode, isProspect: true })
//             }

//             return {
//                 data: saveResponse || {},
//                 error: '',
//                 message: 'User registered successfully',
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }


//     /**
//     * Getlist client
//     */
//     @Security('Bearer')
//     @Get("/getlistProspect")
//     public async getlistProspect(@Query() pageNumber: string, @Query() pageSize: string, @Query() startDate = null, @Query() endDate = null, @Query() searchByName = null): Promise<IResponse> {
//         try {

//             const query: any = [{ isDeleted: false, isProspect: true }];
//             if (searchByName) {
//                 query.push({
//                     "$or": [
//                         { "firstName": { $regex: searchByName, $options: 'i' } },
//                         { "lastName": { $regex: searchByName, $options: 'i' } }
//                     ]
//                 })
//             }
//             if (startDate && endDate) {
//                 query.push({

//                     ...((startDate || endDate) ? {
//                         createdAt: {

//                             ...(startDate ? {
//                                 $gte: new Date(`${startDate}T00:00:00Z`)
//                             } : null),
//                             ...(endDate ? {
//                                 $lte: `${getFilterMonthDateYear(endDate)}T00:00:00Z`
//                             } : null),
//                         }
//                     } : null),

//                 });
//             }

//             const getAllresponse = await getAllBySort(clientModel, { $and: query }, Number(pageNumber), Number(pageSize), {}, true, { createdAt: -1 })

//             return {
//                 data: getAllresponse,
//                 error: '',
//                 message: 'Fetched Successfully',
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }
// }
