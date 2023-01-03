import { Schema, model } from 'mongoose';
import { USER_STATUS, PAYMENT_STATUS } from '../constants/app.constants';

const ClientSchema = new Schema(
    {
        email: { type: String, required: false },
        firstName: { type: String, required: false, minLength: 2 },
        lastName: { type: String, required: false},
        password: { type: String, minLength: 4, maxLength: 80 },
        // countryCode: { type: String, required: true },
        phoneNumber: { type: String, required: true},
        // workCountryCode: { type: String, required: false },
        workPhoneNumber: { type: Number, default:null },
        country: { type: String, required: false },
        postCode: { type: Number, required: false },
        city: { type: String, required: false },
        address: { type: String, required: false },
        state: { type: String, required: false },
        businessName: { type: String, required: true },
        file: { type: String },
        latitude: { type: String, default: 0 },
        longitude: { type: String, default: 0 },
        accessToken: { type: String, required: false },
        stripCustomerId: { type: String, required: false },
        isSubscribe: { type: Boolean, default: 0 },
        subscriptionPlanId: { type: Schema.Types.ObjectId, ref: "subscription_plan", required: false },
        websiteDomain: { type: String, required: false },
        adminDomain: { type: String, required: false },
        admin_Domain: { type: String, required: false ,default:null },
        lp_Domain: { type: String, required: false  ,default:null},
        databaseName: { type: String, required: false },
        dbSecretKey: { type: String, required: false },
        isFreeTrial: { type: Boolean, default: 0 },
        trialDays: { type: Number, default: 0 },
        isWhiteLabel: { type: Boolean, default: 0 },
        paymentStatus: { type: String, enum: [PAYMENT_STATUS.PENDING, PAYMENT_STATUS.PAID], default: PAYMENT_STATUS.PENDING },
        isBlocked: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
        isProspect: { type: Boolean, default: false },
        status: {type: String, enum: [USER_STATUS.PENDING, USER_STATUS.APPROVED, USER_STATUS.DECLINED], default: USER_STATUS.PENDING }
    }, { timestamps: true, versionKey: false }
)
export default model('client', ClientSchema)



