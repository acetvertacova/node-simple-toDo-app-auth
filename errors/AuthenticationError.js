// errors/AuthenticationError.js
import { AppError } from "./AppError.js";

class AuthenticationError extends AppError {
    constructor(message = "Authentication failed") {
        super(message, 401);
        this.name = "AuthenticationError";
    }
}

export { AuthenticationError };
