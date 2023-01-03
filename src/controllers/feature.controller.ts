// import { Route, Controller, Tags, Post, Get, Body, Delete, Query, Security } from 'tsoa'
// import { IResponse } from '../utils/interfaces.util';
// import { Request, Response } from 'express'
// import { findOne, getAll, upsert, deleteById } from '../helpers/db.helpers';
// import featureModel from '../models/feature.model';
// import subscriptionPlanFeatureModel from '../models/subscription-plan-feature.model'
// import logger from '../configs/logger.config';
// import { validateObjectId } from '../validations/objectId.validator';
// import mongoose from 'mongoose';



// @Tags('Feature')
// @Route('api/feature')
// export default class FeatureController extends Controller {
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
//      * Save a feature
//      */
//     @Security('Bearer')
//     @Post("/save")
//     public async save(@Body() request: { name: string, keyValue: any, typeId: string }): Promise<IResponse> {
//         try {
//             const { name, keyValue, typeId } = request;
//             let checkExisting = await findOne(featureModel, { name, isDeleted: false });

//             if (checkExisting) {
//                 throw new Error('Feature already exists!');
//             }

//             const saveResponse = await upsert(featureModel, { name, keyValue, typeId })

//             return {
//                 data: saveResponse,
//                 error: '',
//                 message: 'Feature successfully created!',
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
//      * Update a feature
//      */
//     @Security('Bearer')
//     @Post("/update")
//     public async update(@Body() request: { name: string, keyValue: string, id: string, typeId: string }): Promise<IResponse> {
//         try {
//             const { name, keyValue, typeId, id } = request;
//             // let checkExisting = await findOne(featureModel, { name, isDeleted: false });

//             // if (checkExisting) {
//             //     throw new Error('Feature already exists!');
//             // }


//             const saveResponse = await upsert(featureModel, { name, keyValue, typeId }, id)

//             return {
//                 data: saveResponse,
//                 error: '',
//                 message: 'Feature successfully updated!',
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
//     @Delete("/softdelete")

//     public async delete(@Query() id: string, @Query() isDeleted: boolean): Promise<IResponse> {
//         try {
//             //  check for a valid id
//             const validated = await validateObjectId(id)
//             if (validated.error) {
//                 throw new Error(validated.error.message)
//             }

//             const deleted = await upsert(featureModel, { _id: id, isDeleted: isDeleted}, id);
//             if (!deleted) {
//                 throw new Error('Document not found')
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
//  * Delete Feature a subscription-plan
// */
//     @Security('Bearer')
//     @Delete("/deletefeature")

//     public async deletefeature(@Query() id: string): Promise<IResponse> {
//         try {
//             //  check for a valid id
//             const validated = await validateObjectId(id)
//             if (validated.error) {
//                 throw new Error(validated.error.message)
//             }

//             let checkFeatures = await getAll(subscriptionPlanFeatureModel, { featureId: mongoose.Types.ObjectId(id) });
//             if (checkFeatures.totalItems > 0) {
//                 throw new Error('This feature is already assign in subscription package!!')
//             }

//             const deleted: any = await deleteById(featureModel, id);

//             if (!deleted) {
//                 throw new Error('Document not found')
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
//     @Security('Bearer')
//     @Get("/list")
//     public async getList(@Query() pageNumber = 1, @Query() pageSize = 20): Promise<IResponse> {
//         try {
//             const [getAllresponse] = await featureModel.aggregate([
//                 {
//                     $match: {}
//                 },
//                 {
//                     $sort: { createdAt: -1 }
//                 },
//                 {
//                     $facet: {
//                         items: [
//                             {
//                                 $skip: (pageNumber - 1) * pageSize
//                             },
//                             {
//                                 $limit: pageSize
//                             },
//                             {
//                                 $lookup: {
//                                     from: 'featuretypes',
//                                     // let: { fileId: "$fileId" },
//                                     // pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$fileId"] } } }, {
//                                     //     $project: {
//                                     //         fileUrl: { $concat: [getAssetUrl(), { $first: "$fileDoc.file" }] }
//                                     //     }
//                                     // }],
//                                     localField: 'typeId',
//                                     foreignField: '_id',
//                                     as: 'type'
//                                 }
//                             },
//                             {
//                                 $unwind: "$type"
//                             },
//                             { $project: { name: 1, keyValue: 1, type: 1, isDeleted:1 } }
//                         ],
//                         totalCount: [
//                             { $count: 'totalItems' }
//                         ],
//                     }
//                 },
//                 {
//                     $replaceWith: {
//                         totalItems: {
//                             $sum: '$totalCount.totalItems'
//                         },
//                         items: "$items",
//                     }
//                 },
//                 {
//                     $addFields: {
//                         pageNumber: pageNumber,
//                         pageSize: pageSize,
//                     }
//                 }
//             ]).exec();
//             //  const getAllresponse = await getAll(featureModel, {isDeleted: false}, pageNumber, pageSize)
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
//     * Get all faetures for subscription
//     */
//     @Security('Bearer')
//     @Get("/listForPackages")
//     public async getListForPackages(@Query() pageNumber = 1, @Query() pageSize = 20): Promise<IResponse> {
//         try {
//             const [getAllresponse] = await featureModel.aggregate([
//                 {
//                     $match: { isDeleted: false }
//                 },
//                 {
//                     $sort: { createdAt: -1 }
//                 },
//                 {
//                     $facet: {
//                         items: [
//                             {
//                                 $skip: (pageNumber - 1) * pageSize
//                             },
//                             {
//                                 $limit: pageSize
//                             },
//                             {
//                                 $lookup: {
//                                     from: 'featuretypes',
//                                     // let: { fileId: "$fileId" },
//                                     // pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$fileId"] } } }, {
//                                     //     $project: {
//                                     //         fileUrl: { $concat: [getAssetUrl(), { $first: "$fileDoc.file" }] }
//                                     //     }
//                                     // }],
//                                     localField: 'typeId',
//                                     foreignField: '_id',
//                                     as: 'type'
//                                 }
//                             },
//                             {
//                                 $unwind: "$type"
//                             },
//                             { $project: { name: 1, keyValue: 1, type: 1, isDeleted:1 } }
//                         ],
//                         totalCount: [
//                             { $count: 'totalItems' }
//                         ],
//                     }
//                 },
//                 {
//                     $replaceWith: {
//                         totalItems: {
//                             $sum: '$totalCount.totalItems'
//                         },
//                         items: "$items",
//                     }
//                 },
//                 {
//                     $addFields: {
//                         pageNumber: pageNumber,
//                         pageSize: pageSize,
//                     }
//                 }
//             ]).exec();
//             //  const getAllresponse = await getAll(featureModel, {isDeleted: false}, pageNumber, pageSize)
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
//     * Get plan detail 
//     */
//     @Security('Bearer')
//     @Get("/detail")
//     public async detail(@Query() id: string): Promise<IResponse> {
//         try {
//             const getAllresponse = await findOne(featureModel, { _id: id })
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