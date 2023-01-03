import express from 'express';
const Route = express.Router();
const admin = require('./admin');
const category = require('./category');
const collection = require("./collection");

for (const property in admin) {
  Route.use('/admin', admin[property]);
}
for (const property in category) {
  Route.use('/category',category[property]);
}
for (const property in collection) {
  Route.use('/collection',collection[property]);
}

export default Route;