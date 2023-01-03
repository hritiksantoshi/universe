// import { Route, Controller, Tags, Post, Get, Body, Delete, Query, Security, FormField, UploadedFile } from 'tsoa'
// import { IResponse } from '../utils/interfaces.util';
// import { Request, Response } from 'express'
// import { findOne, getAll, upsert, deleteById, update } from '../helpers/db.helpers';
// import featureTypeModel from '../models/feature-type.model';
// import domainModel from '../models/domain.model';
// import logger from '../configs/logger.config';
// import { validateObjectId } from '../validations/objectId.validator';
// import mongoose from 'mongoose';

// @Tags('Domain')
// @Route('api/domain')
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
//     public async save(@Body() request: { domainName: string }): Promise<IResponse> {
//         try {
//             const { domainName } = request;
//             let checkExisting = await findOne(domainModel, { domainName: domainName });
//             if (checkExisting) {
//                 throw new Error('Name is already exist!');
//             }

//             const saveResponse = await upsert(domainModel, { domainName })

//             return {
//                 data: saveResponse,
//                 error: '',
//                 message: 'Save successfully!',
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
//      * Delete a Domain 
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

//             let checkFeatures = await getAll(domainModel, { typeId: mongoose.Types.ObjectId(id) });
//             if (checkFeatures.totalItems > 0) {
//                 throw new Error('You dont have a data to delete!!')
//             }

//             const deleted = await deleteById(domainModel, id);

//             return {
//                 data: deleted,
//                 error: '',
//                 message: 'Domain successfully removed.',
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
//     * Get all Domain
//     */
//     @Security('Bearer')
//     @Get("/list")
//     public async getList(@Query() pageNumber = 1, @Query() pageSize = 20): Promise<IResponse> {
//         try {
//             const getAllresponse = await getAll(domainModel, {}, pageNumber, pageSize)
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