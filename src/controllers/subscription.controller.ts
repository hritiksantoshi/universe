// // @ts-ignore
// import { Route, Controller, Tags, Post, Get, Body, Delete, Query, Security } from 'tsoa'
// import { IResponse } from '../utils/interfaces.util';
// import { Request, Response } from 'express'
// import { findOne, getAll, findAll, getAllBySort, upsert, deleteById, deleteMany } from '../helpers/db.helpers';
// import { createStripePlan } from '../helpers/common.helper';
// import { validateSubcription } from '../validations/subscription.validator';
// import { validateObjectId } from '../validations/objectId.validator';
// import subscriptionModel from '../models/subscription-plan.model';
// import subscriptionPlanFeatureModel from '../models/subscription-plan-feature.model';
// import logger from '../configs/logger.config';
// import { Mongoose, ObjectId } from 'mongoose';
// import mongoose from 'mongoose';
// import featureModel from '../models/feature.model';
// import featureTypeModel from '../models/feature-type.model';

// @Tags('Subscription plan')
// @Route('api/subscription-plan')
// export default class SubscriptionController extends Controller {
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
//      * Save a subscription-plan
//      */
//     @Security('Bearer')
//     @Post("/save")
//     public async save(@Body() request: { name: string, type: string, price: number, interval: number }): Promise<IResponse> {
//         try {
//             const { name, type, price, interval } = request;
//             const validatedProfile = validateSubcription({ name, type, interval, price });
//             if (validatedProfile.error) {
//                 throw new Error(validatedProfile.error.message)
//             }

//             const plan = await createStripePlan({ name, type, price, interval });
//             const saveResponse = await upsert(subscriptionModel, { name, type, price, interval, planId: plan.id })

//             return {
//                 data: saveResponse,
//                 error: '',
//                 message: 'Subscription plan successfully created!',
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
//      * Update a subscription-plan
//      */
//     @Security('Bearer')
//     @Post("/update")
//     public async update(@Body() request: { name: string, type: string, price: number, interval: number, id: string, kyc: boolean, coins: number, crowdSale: number, softDeleteForInvestor: boolean }): Promise<IResponse> {
//         try {
//             const { name, type, price, interval, id, kyc, coins, crowdSale, softDeleteForInvestor } = request;
//             const validatedProfile = validateSubcription({ name, type, interval, price });
//             if (validatedProfile.error) {
//                 throw new Error(validatedProfile.error.message)
//             }

//             const plan = await createStripePlan({ name, type, price, interval });

//             const saveResponse = await upsert(subscriptionModel, { name, type, price, interval, planId: plan.id, kyc, coins, crowdSale, softDeleteForInvestor }, id)

//             return {
//                 data: saveResponse,
//                 error: '',
//                 message: 'Subscription plan successfully created!',
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
//      * Delete a subscription-plan
//     */
//     @Security('Bearer')
//     @Delete("/delete")
//     public async delete(@Query() id: string, @Query() hardDelete: any): Promise<IResponse> {
//         try {
//             //  check for a valid id
//             const validated = await validateObjectId(id)
//             if (validated.error) {
//                 throw new Error(validated.error.message)
//             }

//             let deleted;
//             if (hardDelete == "true") {
//                 deleted = await deleteById(subscriptionModel, id);
//                 await deleteMany(subscriptionPlanFeatureModel, { planId: id });
//             } else {
//                 deleted = await upsert(subscriptionModel, { isDeleted: true }, id);
//                 if (!deleted) {
//                     throw new Error('Document not found')
//                 }
//             }
//             return {
//                 data: deleted,
//                 error: '',
//                 message: 'Record successfully removed.',
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
//     * Get all plans
//     */
//     // @Security('Bearer')
//     @Get("/list")
//     public async getList(@Query() pageNumber: any, @Query() pageSize: any, @Query() isDeleted: any): Promise<IResponse> {
//         try {
//             let myBool = (isDeleted === 'true');
           
//             const getAllresponse = await getAllBySort(subscriptionModel, { isDeleted: myBool || false }, pageNumber, pageSize, {}, true, { price: 1 })
//             for (let items of getAllresponse.items) {
//                 items.featureTypes = [];
//                 let featureTypes = [];
//                 let featureDetail = await findAll(subscriptionPlanFeatureModel, { planId: items._id }, {})
//                 if (featureDetail.length>0){
//                     for (let feature of featureDetail) {
//                         let featureDetails = await findOne(featureModel, { _id: feature.featureId, isDeleted: false })
//                         if (featureDetails){
//                             let featureType = await findOne(featureTypeModel, { _id: featureDetails.typeId }, { _id: 1, name: 1 })
//                             if (featureType){
//                                 featureType.features = await getAll(featureModel, { typeId: featureType._id, isDeleted: false })
//                             }else{
//                                 featureType.features = []
//                             }
//                             featureTypes.push(featureType)
//                         }
//                     }
//                     delete items.featureDetails
//                     for (let features of featureTypes ){
//                         let index = items.featureTypes.findIndex((rank:any) => rank.name == features.name);
//                         if (index==-1){
//                             items.featureTypes.push(features)
//                         }
//                     }
    
//                 }
//             }
            
//             // const getAllresponse = await getAll(subscriptionModel, {isDeleted: false}, pageNumber, pageSize)
//             return {
//                 data: getAllresponse,
//                 error: '',
//                 message: 'Fetched Successfully ',
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
//     * Get plan detail 
//     */
//     @Get("/detail")
//     public async detail(@Query() id: string): Promise<IResponse> {
//         try {
//             const getAllresponse = await findOne(subscriptionModel, { _id: id });
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
//      * Update a subscription-plan feature
//      */
//     @Security('Bearer')
//     @Post("/assign-feature")
//     public async assignFeature(@Body() request: { planId: string, featureId: string }): Promise<IResponse> {
//         try {
//             const { planId, featureId } = request;

//             const validatedPlanId = await validateObjectId(planId)
//             if (validatedPlanId.error) {
//                 throw new Error(validatedPlanId.error.message)
//             }

//             const validated = await validateObjectId(featureId)
//             if (validated.error) {
//                 throw new Error(validated.error.message)
//             }
//             let saveResponse = '';
//             let findExisting = await findOne(subscriptionPlanFeatureModel, { planId: planId, featureId: featureId });
//             if (findExisting) {
//                 saveResponse = await subscriptionPlanFeatureModel.deleteOne({ planId, featureId });
//             } else {
//                 saveResponse = await upsert(subscriptionPlanFeatureModel, { planId, featureId });
//             }

//             return {
//                 data: saveResponse,
//                 error: '',
//                 message: 'Subscription plan feature successfully created!',
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
//      * Update a subscription-plan feature
//      */
//     //  @Security('Bearer')
//     @Get("/assign-feature")
//     public async getAssignFeature(@Query() planId: string): Promise<IResponse> {
//         try {

//             const validatedPlanId = await validateObjectId(planId)
//             if (validatedPlanId.error) {
//                 throw new Error(validatedPlanId.error.message)
//             }

//             let pipline = [
//                 { $match: { planId: mongoose.Types.ObjectId(planId) } },
//                 {
//                     $lookup: {
//                         from: 'features',
//                         localField: "featureId",
//                         foreignField: "_id",
//                         as: 'features'
//                     }
//                 },
//                 {
//                     $unwind: "$features"
//                 },
//                 {
//                     $group: {
//                         _id: "$planId",
//                         features: { $push: "$features" }
//                     }
//                 },
//                 {
//                     $project: {
//                         features: "$features",
//                         _id: 0
//                     }
//                 }
//             ]

//             const data = await subscriptionPlanFeatureModel.aggregate(pipline)

//             return {
//                 data: data.length > 0 ? data[0].features : [],
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
//    * Get plan data
//    */
//     @Get("/data-list")
//     public async getPlanData(): Promise<IResponse> {
//         try {
//             return {
//                 data: {
//                     coins: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//                     crowdSale: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//                 },
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
//    * restore a subscription-plan
//    */
//     @Security('Bearer')
//     @Post("/restore")
//     public async restore(@Body() request: { id: string }): Promise<IResponse> {
//         try {
//             const { id } = request;

//             const saveResponse = await upsert(subscriptionModel, { isDeleted: false }, id)

//             return {
//                 data: saveResponse,
//                 error: '',
//                 message: 'Subscription plan successfully restore!',
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