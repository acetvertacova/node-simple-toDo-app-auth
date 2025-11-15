import { AppError } from "./AppError.js";

class NotFoundError extends AppError {
    constructor(resource = "Resource") {
        super(`${resource}`, 404);
        this.name = "NotFoundError";
    }
}

export { NotFoundError };
