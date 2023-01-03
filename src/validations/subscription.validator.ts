import joi from '@hapi/joi';


const subscriptionSchema = joi.object({
    name : joi.string().trim().min(4).max(20).required(),
    type: joi.string().min(4).max(20).required(),
    interval: joi.number(),
    price: joi.number().required()
})

const paymentSchema = joi.object({
    fullname : joi.string().trim().min(4).max(20).required(),
    currency : joi.string().trim().required(),
    email: joi.string().required(),
    amount: joi.number(),
    stripeToken: joi.string().required(),
    // planId: joi.string().required(),
})

export const validateSubcription = (subscription: any) => {
    return subscriptionSchema.validate(subscription)
}

export const validatePayment = (payment: any) => {
    return paymentSchema.validate(payment)
}
