import * as Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

const dataSchema = Joi.object({
  firstname: Joi.string()
    .min(3)
    .max(20)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === "string.empty") {
          err.message = "First Name is required";
        } else if (err.code === "string.min") {
          err.message = "First Name must be at least 3 characters long";
        } else if (err.code === "string.max") {
          err.message = "First Name must be less than or equal to 20 characters long";
        }
      });
      return errors;
    }),
  lastname: Joi.string()
    .min(3)
    .max(20)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === "string.empty") {
          err.message = "Last Name is required";
        } else if (err.code === "string.min") {
          err.message = "Last Name must be at least 3 characters long";
        } else if (err.code === "string.max") {
          err.message = "Last Name must be less than or equal to 20 characters long";
        }
      });
      return errors;
    }),

  contact: Joi.number()
    .positive()
    .integer()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === "number.empty") {
          err.message = "Contact number is required"
        }
      })
    }),
});

export const dataResolver = joiResolver(dataSchema);
