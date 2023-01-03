import {
    Route,
    Controller,
    Tags,
    Post,
    Body,
    Get,
    Security,
    Query,
    UploadedFile,
    FormField,
    Delete,
    Put,
  } from "tsoa";
  import { IResponse } from "../utils/interfaces.util";
  import { Request, Response } from "express";
  import {
    findOne,
    getById,
    upsert,
    getAll,
    findAll,
    deleteById,
  } from "../helpers/db.helpers";
  import { verifyHash, signToken, genHash } from "../utils/common.util";
  import {
    validateChangePassword,
    validateForgotPassword,
    validateProfile,
    validateResetPassword,
    validateAdmin,
  } from "../validations/admin.validator";
  import adminModel from "../models/admin.model";
  import collectionModel from "../models/collection.model";
  import categoryModel from "../models/category.model";
  import logger from "../configs/logger.config";
  import { sendEmail } from "../configs/nodemailer";
  import { readHTMLFile } from "../services/utils";
  import path from "path";
  import handlebar from "handlebars";
  
  @Tags("Collection")
  @Route("api/collection")
  export default class CollectionController extends Controller {
    req: Request;
    res: Response;
    userId: string;
    constructor(req: Request, res: Response) {
      super();
      this.req = req;
      this.res = res;
      this.userId = req.body.user ? req.body.user.id : "";
    }

     /**
   * Create Collection
   */
  @Security("Bearer")
  @Post("/createcollection")
  public async createCollection(
    @FormField() name: string,
    @FormField() royalties: string,
    @FormField() description: string,
    @UploadedFile("logoImg") logoImg: Express.Multer.File,
    @UploadedFile("bannerImg") bannerImg: Express.Multer.File
  ): Promise<IResponse> {
    try {
      console.log(name, "req");

      const exists = await findOne(collectionModel, { name });
      if (exists) {
        throw new Error("Collection already exists!");
      }

      const collection = await upsert(collectionModel, {
        name: name,
        royalties: royalties,
        description: description,
        logoImg: `uploads/${logoImg.filename}`,
        bannerImg: `uploads/${bannerImg.filename}`,
      });

      return {
        data: { collection },
        error: "",
        message: "Category created successfully",
        status: 200,
      };
    } catch (err: any) {
      logger.error(`${this.req.ip} ${err.message}`);
      return {
        data: null,
        error: err.message ? err.message : err,
        message: "",
        status: 400,
      };
    }
  }

  /**
   * Get Collection
   */
  @Security("Bearer")
  @Get("/getcollections")
  public async getCollections(): Promise<IResponse> {
    try {
      const collection = await findAll(collectionModel, {});
      return {
        data: { collection },
        error: "",
        message: "Got Collection successfully",
        status: 200,
      };
    } catch (err: any) {
      logger.error(`${this.req.ip} ${err.message}`);
      return {
        data: null,
        error: err.message ? err.message : err,
        message: "",
        status: 400,
      };
    }
  }
}

    

