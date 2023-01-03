import { findOne, upsert } from '../helpers/db.helpers';
import clientModel from '../models/client.model';
import { genHash } from './common.util';
import adminModel from '../models/admin.model';

export const bootstrapAdmin = async function (cb: Function) {

  const admin = await findOne(adminModel, {})
   if (!admin) {
     await upsert(adminModel, {})
   }

  // const client = await findOne(clientModel, {})
  // if (!client) {
  //   await upsert(clientModel, {})
  // }

  // const customerFeature = await findOne(customerFeatureModel, {})
  // if (!customerFeature) {
  //   await upsert(customerFeatureModel, {})
  // }

  // const domain = await findOne(domainModel, {})
  // if (!domain) {
  //   await upsert(domainModel, {})
  // }

  // const featureType = await findOne(featureTypeModel, {})
  // if (!featureType) {
  //   await upsert(featureTypeModel, {})
  // }

  // const feature = await findOne(featureModel, {})
  // if (!feature) {
  //   await upsert(featureModel, {})
  // }

  // const subscriptionPlanFeature = await findOne(subscriptionPlanFeatureModel, {})
  // if (!subscriptionPlanFeature) {
  //   await upsert(subscriptionPlanFeatureModel, {})
  // }

  // const subscriptionPlan = await findOne(subscriptionPlanModel, {})
  // if (!subscriptionPlan) {
  //   await upsert(subscriptionPlanModel, {})
  // }

  // const template = await findOne(templateModel, {})
  // if (!template) {
  //   await upsert(templateModel, {})
  // }


  cb();
};