import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.mjs";

export const getCategoryValidator = [
  check("id").isMongoId().withMessage("Category ID is not valid"),
  validatorMiddleware,
];

export const createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({
      min: 3,
      max: 32,
    })
    .withMessage("Category name must be between 3 and 32 characters"),
  validatorMiddleware,
];

export const updateCategoryValidator = [
  check("id").isMongoId().withMessage("Category ID is not valid"),
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({
      min: 3,
      max: 32,
    })
    .withMessage("Category name must be between 3 and 32 characters"),
  validatorMiddleware,
];

export const deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Category ID is not valid"),
  validatorMiddleware,
];
