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
  
  @Tags("Category")
  @Route("api/category")
  export default class CategoryController extends Controller {
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
   * Create Category
   */
  @Security("Bearer")
  @Post("/createCategory")
  public async createCategory(
    @FormField() name: string,
    @UploadedFile("categoryIcon") categoryIcon: Express.Multer.File
  ): Promise<IResponse> {
    try {
      console.log(name, "req");

      const exists = await findOne(categoryModel, { name });
      if (exists) {
        throw new Error("Category already exists!");
      }

      const category = await upsert(categoryModel, {
        name: name,
        categoryIcon: `uploads/${categoryIcon.filename}`,
      });

      return {
        data: { category },
        error: "",
        message: "Collection created successfully",
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
   * Get Categories
   */
  @Tags("Category")
  @Security("Bearer")
  @Get("/getcategories")
  public async getCategory(): Promise<IResponse> {
    try {
      const category = await getAll(categoryModel, {});

      return {
        data: { category },
        error: "",
        message: "Got categories successfully",
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
   * Delete a Category
   */
  @Tags("Category")
  @Security("Bearer")
  @Delete("/deletecategory")
  public async deleteCategory(@Query() categoryId: string): Promise<IResponse> {
    try {
      const category = await deleteById(categoryModel, categoryId);

      return {
        data: {},
        error: "",
        message: "Deleted Category successfully",
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
   * Update a Category
   */
  @Tags("Category")
  @Security("Bearer")
  @Put("/updatecategory")
  public async updateCategory(
    @Query() categoryId: string,
    @FormField() name: string,
    @UploadedFile("categoryIcon") categoryIcon?: Express.Multer.File
  ): Promise<IResponse> {
    try {
      let update: any = { name: name };
      if (categoryIcon) {
        update.categoryIcon = `uploads/${categoryIcon.filename}`;
      }
      await upsert(categoryModel, update, categoryId);

      return {
        data: {},
        error: "",
        message: "Category Updated successfully",
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