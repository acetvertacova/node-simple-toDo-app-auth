import { AppError } from "./AppError.js";

export default class ValidationError extends AppError {
    constructor(message = "Validation failed", errors = []) {
        super(message, 400, true); // 400 - стандартный HTTP-код для ошибок валидации
        this.name = "ValidationError"; // имя ошибки
        this.errors = errors; // массив объектов с деталями: { field, message }
    }
}

export { ValidationError };
