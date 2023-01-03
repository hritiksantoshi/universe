// import { Route, Controller, Tags, Post, Get, Body, Delete, Query, Security, FormField, UploadedFile } from 'tsoa'
// import { IResponse } from '../utils/interfaces.util';
// import { Request, Response } from 'express'
// import { findOne, getAll, upsert, deleteById, update } from '../helpers/db.helpers';
// import featureTypeModel from '../models/feature-type.model';
// import templateModel from '../models/template.model';
// import logger from '../configs/logger.config';
// import { validateObjectId } from '../validations/objectId.validator';
// import mongoose from 'mongoose';

// @Tags('Tamplate')
// @Route('api/template')
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
//     public async save(@FormField() templateName: string, @FormField() templateSections: any, @UploadedFile() templateImage?: Express.Multer.File): Promise<IResponse> {
//         try {
//             const filePath = templateImage?.filename;
//             let data = JSON.parse(templateSections)

//             let uniqueId = templateName.toLowerCase().split(' ').join('_');
//             let checkExisting = await findOne(templateModel, { uniqueId: uniqueId });
//             if (checkExisting) {
//                 throw new Error('Name is already exist!');
//             }

//             const saveResponse = await upsert(templateModel, { templateName, uniqueId, templateSections: data, templateImage: filePath })

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
//      * Update a Template
//      */
//     @Security('Bearer')
//     @Post("/update")
//     public async update(@FormField() templateName?: string, @FormField() templateSections?: any, @FormField() clientId?: string, @UploadedFile() templateImage?: Express.Multer.File): Promise<IResponse> {
//         try {
//             var payload: { [k: string]: any } = {};
//             if (templateName){
//                 let uniqueId = templateName.toLowerCase().split(' ').join('_');

//                 let checkExisting1 = await findOne(templateModel, { uniqueId: uniqueId });
                
//                 if (checkExisting1) {
//                     throw new Error('Name is already exist!');
//                 }

                
//                 if (templateName) {
//                     payload.templateName = templateName;
//                 }
//                 if (uniqueId) {
//                     payload.uniqueId = uniqueId;
//                 }
//             }

//             let data = JSON.parse(templateSections)
//             if (data) {
//                 payload.templateSections = data;
//             }

//             const filePath = templateImage?.filename;
//             if (filePath) {
//                 payload.templateImage = filePath;
//             }

//             let checkExisting = await findOne(templateModel, { _id: mongoose.Types.ObjectId(clientId) });
//             if (!checkExisting) {
//                 throw new Error('You dont have a data to update!');
//             }

//             const saveResponse = await upsert(templateModel, payload, clientId)

//             return {
//                 data: saveResponse,
//                 error: '',
//                 message: 'Template successfully updated!',
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

//     // /**
//     //  * Soft Delete a subscription-plan
//     // */
//     // @Security('Bearer')
//     // @Delete("/softdelete")
//     // public async softdelete(@Query() id: string, @Query() isDeleted: boolean): Promise<IResponse> {
//     //     try {
//     //         //  check for a valid id
//     //         const validated = await validateObjectId(id)
//     //         if (validated.error) {
//     //             throw new Error(validated.error.message)
//     //         }

//     //         const deleted = await upsert(featureTypeModel, { _id: id, isDeleted: isDeleted }, id);
//     //         if (!deleted) {
//     //             throw new Error('Document not found')
//     //         }
//     //         await update(featureModel, { isDeleted: isDeleted}, {typeId: deleted._id});
//     //         return {
//     //             data: deleted,
//     //             error: '',
//     //             message: 'Record successfully removed.',
//     //             status: 200
//     //         }
//     //     }
//     //     catch (err: any) {
//     //         logger.error(`${this.req.ip} ${err.message}`)
//     //         return {
//     //             data: null,
//     //             error: err.message ? err.message : err,
//     //             message: '',
//     //             status: 400
//     //         }
//     //     }
//     // }



//     /**
//      * Delete a Template 
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

//             let checkFeatures = await getAll(templateModel, { typeId: mongoose.Types.ObjectId(id), isActive: false });
//             if (checkFeatures.totalItems > 0) {
//                 throw new Error('You dont have a data to delete!!')
//             }

//             const deleted = await deleteById(templateModel, id);

//             return {
//                 data: deleted,
//                 error: '',
//                 message: 'Template successfully removed.',
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
//     * Get all Template
//     */
//     @Security('Bearer')
//     @Get("/list")
//     public async getList(@Query() pageNumber = 1, @Query() pageSize = 20): Promise<IResponse> {
//         try {
//             const getAllresponse = await getAll(templateModel, { isActive: false }, pageNumber, pageSize)
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
//             const getAllresponse = await findOne(templateModel, { _id: id })
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