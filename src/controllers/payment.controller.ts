// import { Route, Controller, Tags, Post, Body } from 'tsoa'
// import { IResponse } from '../utils/interfaces.util';
// import { Request, Response } from 'express'
// import logger from '../configs/logger.config';
// import { findOne, upsert, getAll, getById } from '../helpers/db.helpers';
// // import { createPaymentIntent, createCustomer } from '../helpers/common.helper';
// import { createPaymentIntent, createCustomer, createSubscription } from '../helpers/common.helper';
// import { validatePayment } from '../validations/subscription.validator';
// import { updateLocale } from 'moment';
// import clientModel from '../models/client.model';

// @Tags('Payment')
// @Route('api/payment')
// export default class PaymentController extends Controller {
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
// 	 * Create a payment
// 	 */
// 	// @Post("/create")
// 	// public async save(@Body() request: { stripeToken: string, email: string, fullname: string, amount: number, currency: string, planId: string }): Promise<IResponse> {
// 	// 	try {

// 	// 		const { email, fullname, amount, currency, stripeToken, planId } = request;

// 	// 		const validatedProfile = validatePayment({ email, fullname, amount, currency, stripeToken });

// 	// 		if (validatedProfile.error) {
// 	// 			throw new Error(validatedProfile.error.message)
// 	// 		}

// 	// 		const customerPayload = {
// 	// 			email: request.email,
// 	// 			name: request.fullname,
// 	// 			stripe: request.stripeToken,
// 	// 		};

// 	// 		const newCustomerResponse = await createCustomer(customerPayload);
// 	// 		const stripeCharges = await createPaymentIntent(request.amount, newCustomerResponse.id, request.currency, stripeToken);
// 	// 		const userSubscription = await createSubscription(newCustomerResponse.id, planId);

// 	// 		return {
// 	// 			data: stripeCharges,
// 	// 			error: '',
// 	// 			message: 'Payment completed successfully',
// 	// 			status: 200
// 	// 		}
// 	// 	}
// 	// 	catch (err: any) {
// 	// 		logger.error(`${this.req.ip} ${err.message}`)
// 	// 		return {
// 	// 			data: null,
// 	// 			error: err.message ? err.message : err,
// 	// 			message: '',
// 	// 			status: 400
// 	// 		}
// 	// 	}
// 	// }


// 	/**
// 	 * Create a payment
// 	 */
// 	@Post("/create")
// 	public async save(@Body() request: { stripeToken: string, email: string, fullname: string, amount: number, currency: string, planId: string }): Promise<IResponse> {
// 		try {
			
// 			const { email, fullname, amount, currency, stripeToken, planId } = request;
// 			const stripeCharges = request;
// 			// console.log(stripeCharges,">>>>>>>")
// 			// const validatedProfile = validatePayment({ email, fullname, amount, currency, stripeToken });

// 			// if (validatedProfile.error) {
// 			// 	throw new Error(validatedProfile.error.message)
// 			// }

// 			// const customerPayload = {
// 			// 	email: request.email,
// 			// 	name: request.fullname,
// 			// 	stripe: request.stripeToken,
// 			// };


// 			// let stripCustomerId;


// 			// const userDetails = await findOne(clientModel, { stripCustomerId: { $exists: true } });
// 			// console.log(userDetails, "????????????????")
// 			// // if (userDetails) {
// 			// // 	stripCustomerId = userDetails.stripCustomerId;
// 			// // }
// 			// // else {
// 			// 	const newCustomerResponse = await createCustomer(customerPayload);
// 			// 	console.log(newCustomerResponse, ">>>>>>")
// 			// 	// stripCustomerId = newCustomerResponse.id;
// 			// 	// const saveResponse = await upsert(clientModel, {stripCustomerId:stripCustomerId} );
// 			// // }

// 			// // const stripeCharges = await createPaymentIntent(request.amount, newCustomerResponse.id, request.currency,request.stripeToken);
// 			// // const userSubscription = await createSubscription(newCustomerResponse.id, planId);

// 			// const stripeCharges = await createPaymentIntent(request.amount, newCustomerResponse.id, request.currency, request.stripeToken);
// 			// const userSubscription = await createSubscription(newCustomerResponse.id, planId);
// 			return {
// 				data: stripeCharges,
// 				// data: stripeCharges.next_action?.use_stripe_sdk,
// 				error: '',
// 				message: 'Payment completed successfully',
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


