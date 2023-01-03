// import { Route, Controller, Tags, Post, Body, Security, FormField, Get, Delete, Query } from 'tsoa'
// import { IResponse } from '../utils/interfaces.util';
// import { Request, Response } from 'express'
// import logger from '../configs/logger.config';
// import { findOne, upsert, getAll, getById, getAllWithoutPaging, deleteById, getAllBySort, findAll } from '../helpers/db.helpers';
// // import { createPaymentIntent, createCustomer } from '../helpers/common.helper';
// import { createPaymentIntent, createCustomer, createSubscription } from '../helpers/common.helper';
// import { validatePayment } from '../validations/subscription.validator';
// import { updateLocale } from 'moment';
// import sectionModel from '../models/section.model';
// import { validateObjectId } from '../validations/objectId.validator';
// import { camelize } from '../utils/common.util';

// import mongoose from 'mongoose'
// import { log } from 'handlebars';
// @Tags('Section')
// @Route('api/section')
// export default class sectionController extends Controller {
// 	req: Request;
// 	res: Response;
// 	userId: string
// 	constructor(req: Request, res: Response) {
// 		super();
// 		this.req = req;
// 		this.res = res;
// 		this.userId = req.body.user ? req.body.user.id : ''
// 	}

// 	/**
//  * Save saveSection
//  */
// 	@Security('Bearer')
// 	@Post("/saveSection")
// 	public async saveSection(@Body() request: { sectionName: string }): Promise<IResponse> {
// 		try {
// 			const { sectionName } = request;
// 			const exists = await findOne(sectionModel, { sectionName: sectionName, isActive: true })
// 			if (exists) {
// 				throw new Error(`Name is alredy exist`)
// 			}
// 			const checkIndex = await getAll(sectionModel, { isActive: true })
// 			let newIndex = checkIndex.totalItems

// 			let sectionKey = await camelize(sectionName)
// 			const saveresponse = await upsert(sectionModel, { sectionName, sectionkey: sectionKey, sectionIndex: newIndex + 1 })
// 			return {
// 				data: saveresponse,
// 				error: '',
// 				message: 'successfully',
// 				status: 200
// 			}
// 		}
// 		catch (err: any) {
// 			logger.error(`${this.req.ip} ${err.message}`)
// 			return {
// 				data: null,
// 				error: err.message ? err.message : err,
// 				message: '',
// 				status: 400
// 			}
// 		}
// 	}



// 	/**
// * Update Section
// */
// 	@Security('Bearer')
// 	@Post("/updateSection")
// 	public async updateSection(@Body() request: { sectionName: string, id: string }): Promise<IResponse> {
// 		try {
// 			const { sectionName, id } = request;
// 			let sectionKey = await camelize(sectionName)
// 			const exists = await findOne(sectionModel, { _id: id })
// 			const saveresponse = await upsert(sectionModel, { sectionName, sectionkey: sectionKey }, exists._id)
// 			return {
// 				data: saveresponse,
// 				error: '',
// 				message: 'successfully',
// 				status: 200
// 			}
// 		}
// 		catch (err: any) {
// 			logger.error(`${this.req.ip} ${err.message}`)
// 			return {
// 				data: null,
// 				error: err.message ? err.message : err,
// 				message: '',
// 				status: 400
// 			}
// 		}
// 	}




// 	/**
// * Update Section
// */
// 	@Security('Bearer')
// 	@Post("/updateSectionIndex")
// 	public async updateSectionIndex(@Body() request: { sectionIndex: any }): Promise<IResponse> {
// 		try {
// 			const { sectionIndex } = request;
// 			for (const [i, val] of sectionIndex.entries()) {
// 				let data = {sectionIndex :`${Number(i)+1}` }
// 				let saveresponse = await upsert(sectionModel, data, val._id)
// 			}

// 			return {
// 				data: {},
// 				error: '',
// 				message: 'Updated Sucsessfully!!',
// 				status: 200
// 			}
// 		}
// 		catch (err: any) {
// 			logger.error(`${this.req.ip} ${err.message}`)
// 			return {
// 				data: null,
// 				error: err.message ? err.message : err,
// 				message: '',
// 				status: 400
// 			}
// 		}
// 	}





// 	/**
//  * Get saveSection
//  */
// 	@Security('Bearer')
// 	@Get("/getSection")
// 	public async getSection(): Promise<IResponse> {
// 		try {
// 			//   check for a valid id
// 			const getResponse = await getAllBySort(sectionModel, { isActive: true }, 1, 100, {}, true, { sectionIndex: 1 });
// 			return {
// 				data: getResponse || {},
// 				error: '',
// 				message: 'getSection fetched Successfully',
// 				status: 200
// 			}
// 		}
// 		catch (err: any) {
// 			logger.error(`${this.req.ip} ${err.message}`)
// 			return {
// 				data: null,
// 				error: err.message ? err.message : err,
// 				message: '',
// 				status: 400
// 			}
// 		}
// 	}


// 	/**
//   * Delete a Domain 
//  */
// 	@Security('Bearer')
// 	@Delete("/delete")
// 	public async delete(@Query() id: string): Promise<IResponse> {
// 		try {
// 			//  check for a valid id
// 			const validated = await validateObjectId(id)
// 			if (validated.error) {
// 				throw new Error(validated.error.message)
// 			}

// 			let checkFeatures = await getAll(sectionModel, { typeId: mongoose.Types.ObjectId(id) });
// 			if (checkFeatures.totalItems > 0) {
// 				throw new Error('You dont have a data to delete!!')
// 			}

// 			const deleted = await deleteById(sectionModel, id);

// 			return {
// 				data: deleted,
// 				error: '',
// 				message: 'Domain successfully removed.',
// 				status: 200
// 			}
// 		}
// 		catch (err: any) {
// 			logger.error(`${this.req.ip} ${err.message}`)
// 			return {
// 				data: null,
// 				error: err.message ? err.message : err,
// 				message: '',
// 				status: 400
// 			}
// 		}
// 	}

// }


