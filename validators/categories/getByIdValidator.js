import { param } from "express-validator";

export const categoryIdValidationSchema = [
    param("id")
        .isUUID()
        .withMessage("Category ID must be a valid UUID")
];