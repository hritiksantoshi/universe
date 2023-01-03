// import { Route, Controller, Tags, Post, Get, Body, Delete, Query, Security } from 'tsoa'
// import { IResponse } from '../utils/interfaces.util';
// import { Request, Response } from 'express'
// import { findOne, getAll, upsert, deleteById ,update} from '../helpers/db.helpers';
// import featureTypeModel from '../models/feature-type.model';
// import featureModel from '../models/feature.model';
// import subscriptionPlanFeatureModel from '../models/subscription-plan-feature.model'
// import logger from '../configs/logger.config';
// import { validateObjectId } from '../validations/objectId.validator';
// import mongoose from 'mongoose';

// @Tags('Feature type')
// @Route('api/feature-type')
// export default class FeatureTypeController extends Controller {
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
//     public async save(@Body() request: { name: string }): Promise<IResponse> {
//         try {
//             const { name } = request;
//             let checkExisting = await findOne(featureTypeModel, { name, isDeleted: false });

//             if (checkExisting) {
//                 throw new Error('Feature already exists!');
//             }

//             const saveResponse = await upsert(featureTypeModel, { name })

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
//     public async update(@Body() request: { name: string, id: string, }): Promise<IResponse> {
//         try {
//             const { name, id } = request;
//             let checkExisting = await findOne(featureTypeModel, { name, isDeleted: false, _id: { $ne: id } });

//             if (checkExisting) {
//                 throw new Error('Feature type already exists!');
//             }

//             const saveResponse = await upsert(featureTypeModel, { name }, id)

//             return {
//                 data: saveResponse,
//                 error: '',
//                 message: 'Feature type successfully updated!',
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
//      * Soft Delete a subscription-plan
//     */
//     @Security('Bearer')
//     @Delete("/softdelete")
//     public async softdelete(@Query() id: string, @Query() isDeleted: boolean): Promise<IResponse> {
//         try {
//             //  check for a valid id
//             const validated = await validateObjectId(id)
//             if (validated.error) {
//                 throw new Error(validated.error.message)
//             }

//             const deleted = await upsert(featureTypeModel, { _id: id, isDeleted: isDeleted }, id);
//             if (!deleted) {
//                 throw new Error('Document not found')
//             }
//             await update(featureModel, { isDeleted: isDeleted}, {typeId: deleted._id});
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
//      * Delete a subscription-plan
//     */
//     @Security('Bearer')
//     @Delete("/delete")
//     public async delete(@Query() id: string): Promise<IResponse> {
//         try {
//             //  check for a valid id
//             const validated = await validateObjectId(id)
//             if (validated.error) {
//                 throw new Error(validated.error.message)
//             }

//             let checkFeatures = await getAll(featureModel, { typeId: mongoose.Types.ObjectId(id), isDeleted: false });
//             if (checkFeatures.totalItems > 0) {
//                 throw new Error('please remove assign features first!!')
//             }

//             const deleted: any = await deleteById(featureTypeModel, id);

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
//             const getAllresponse = await getAll(featureTypeModel, {  }, pageNumber, pageSize)
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
//             const getAllresponse = await findOne(featureTypeModel, { _id: id })
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