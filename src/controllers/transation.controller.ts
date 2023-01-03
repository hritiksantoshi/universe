// import {
//     Route,
//     Controller,
//     Tags,
//     Post,
//     Get,
//     Body,
//     Delete,
//     Query,
//     Security,
//     FormField,
//     UploadedFile,
// } from "tsoa";
// import { IResponse } from "../utils/interfaces.util";
// import { Request, Response } from "express";
// import {
//     findOne,
//     getAll,
//     upsert,
//     deleteById,
//     update,
//     getFilterMonthDateYear,
//     getCSVFromJSON,
// } from "../helpers/db.helpers";
// import featureTypeModel from "../models/feature-type.model";
// import transactionModel from "../models/transation.model";
// import logger from "../configs/logger.config";
// import { validateObjectId } from "../validations/objectId.validator";
// import mongoose from "mongoose";
// import moment from "moment";

// @Tags("Transaction")
// @Route("api/transaction")
// export default class FeatureTypeController extends Controller {
//     req: Request;
//     res: Response;
//     userId: string;
//     constructor(req: Request, res: Response) {
//         super();
//         this.req = req;
//         this.res = res;
//         this.userId = req.body.user ? req.body.user.id : "";
//     }

//     /**
//      * Save a transaction
//      */
//     @Post("/save")
//     public async save(
//         @Body()
//         request: {
//             stripeTransactionId: string;
//             amount: number;
//             paymentStatus: string;
//             customerId: string;
//             transactionHash: any;
//         }
//     ): Promise<IResponse> {
//         try {
//             let {
//                 stripeTransactionId,
//                 amount,
//                 paymentStatus,
//                 customerId,
//                 transactionHash,
//             } = request;

//             const saveresponse = await upsert(transactionModel, {
//                 stripeTransactionId,
//                 amount,
//                 paymentStatus,
//                 customerId,
//                 transactionHash,
//             });
//             return {
//                 data: saveresponse.toObject(),
//                 error: "",
//                 message: "Transaction Added successfully",
//                 status: 200,
//             };
//         } catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`);
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: "",
//                 status: 400,
//             };
//         }
//     }

//     /**
//      * Get all transaction, requires admin token
//      */
//     @Get("/getAll")
//     public async getAll(
//         @Query() filter = "",
//         @Query() pageNumber = 1,
//         @Query() pageSize = 20,
//         @Query() paymentStatus = "",
//         @Query() fromDate = "",
//         @Query() toDate = "",
//         @Query() exportRequest = "false"
//     ): Promise<IResponse> {
//         try {
//             const getAllresponse = await getAll(
//                 transactionModel,
//                 {
//                     ...(filter
//                         ? {
//                             $or: [
//                                 {
//                                     email: { $regex: filter, $options: "i" },
//                                 },
//                                 {
//                                     stripeTransactionId: { $regex: filter, $options: "i" },
//                                 },
//                             ],
//                         }
//                         : null),
//                     ...(paymentStatus
//                         ? {
//                             paymentStatus,
//                         }
//                         : null),
//                     ...(fromDate || toDate
//                         ? {
//                             createdAt: {
//                                 ...(fromDate
//                                     ? {
//                                         $gte: new Date(`${fromDate}T00:00:00Z`),
//                                     }
//                                     : null),
//                                 ...(toDate
//                                     ? {
//                                         $lte: `${getFilterMonthDateYear(toDate)}`,
//                                     }
//                                     : null),
//                             },
//                         }
//                         : null),
//                 },
//                 pageNumber,
//                 pageSize,
//                 null,
//                 exportRequest === "false" ? true : false
//             );

//             if (exportRequest === "true") {
//                 // create csv and send to client
//                 const csv = getCSVFromJSON(
//                     [
//                         "Sno",
//                         "Customer Id",
//                         "Stripe TransactionId",
//                         "Payment Status",
//                         "Paid On",
//                     ],
//                     getAllresponse.items.map((val, index) => {
//                         return {
//                             ...val,
//                             Sno: index + 1,
//                             "Customer Id": val.customerId || "-",
//                             "Stripe TransactionId": val.stripeTransactionId || "-",
//                             "Payment Status": val.paymentStatus || "-",
//                             "Paid On": moment(val.createdAt).format("MMMM DD YYYY, h:mm a"),
//                         };
//                     })
//                 );
//                 this.res.header("Content-Type", "text/csv");
//                 this.res.attachment(`payment_.csv`);
//                 return {
//                     data: csv,
//                     error: "",
//                     message: "Fetched Successfully",
//                     status: 200,
//                 };
//             }


//             return {
//                 data: getAllresponse,
//                 error: "",
//                 message: "Fetched Successfully",
//                 status: 200,
//             };
//         } catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`);
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: "",
//                 status: 400,
//             };
//         }
//     }
// }
