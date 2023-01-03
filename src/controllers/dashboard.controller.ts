// // @ts-ignore
// import { Route, Controller, Tags, Post, Get, Body, Delete, Query, Security } from 'tsoa'
// import { IResponse } from '../utils/interfaces.util';
// import { Request, Response } from 'express'
// import { findOne, getAll, getAllWithoutPaging, findAll, getAllBySort, upsert, deleteById, deleteMany } from '../helpers/db.helpers';
// import subscriptionModel from '../models/subscription-plan.model';
// import clientModel from '../models/client.model';
// import logger from '../configs/logger.config';
// import mongoose from 'mongoose';
// import featureModel from '../models/feature.model';
// import featureTypeModel from '../models/feature-type.model';
// import transactionModel from '../models/transation.model';

// @Tags('Dashboard plan')
// @Route('api/dashboard')
// export default class DashboardController extends Controller {
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
//     * Analytics
//     */
//     @Security('Bearer')
//     @Get("/analytics")
//     public async get(): Promise<IResponse> {
//         try {
//             let response: { [k: string]: any } = {};
//             response.graphData = []

//             let subscriptions = await getAll(subscriptionModel, { isDeleted: false }, 1, 200, { name: 1 }, true)
//             for (let i of subscriptions.items) {
//                 let clients = await getAllWithoutPaging(clientModel, { subscriptionPlanId: { "$in": [i._id] }, isDeleted: false, isProspect: false }, {})
//                 i.clientCount = clients.totalItems
//                 response.graphData.push(i)
//             }

//             let clients = await getAllWithoutPaging(clientModel, { isDeleted: false, isProspect: false }, {})
//             let prospectClients = await getAllWithoutPaging(clientModel, { isProspect: true, isDeleted: false }, {})
//             // let getAllresponse = await findAll(transactionModel, {})

//             // let numbers = [1, 2, 3];

//             // let sum = 0;
//             // for (const items of getAllresponse) {
//             //     console.log(items)
//             // }
//             const getAllresponse = await transactionModel.aggregate([
//                 {
//                     $match: {}
//                 },
//                 {
//                     $group: {
//                         _id: null,
//                         amount: { $sum: "$amount" }

//                     }
//                 }
//             ])
//             console.log(getAllresponse, "getAllresponse")
//             response.totalSubscriptions = subscriptions.totalItems
//             response.totalClients = clients.totalItems
//             response.prospectClients = prospectClients.totalItems
//             response.totalSales = getAllresponse ? getAllresponse[0]?.amount : 0
//             return {
//                 data: response,
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

// }