// utils/logger.js
import winston from "winston";

const logger = winston.createLogger({
    level: "info", // Минимальный уровень логирования

    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.errors({ stack: true }), // Сохранять stack trace
        winston.format.json() // Формировать логи в JSON
    ),

    // Где сохранять логи
    transports: [
        // Логи об ошибках в файл
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),

        // Все логи в файл
        new winston.transports.File({
            filename: "logs/combined.log",
        }),

        // В разработке показывать в консоль
        ...(process.env.NODE_ENV !== "production"
            ? [new winston.transports.Console()]
            : []),
    ],
});

export default logger;
