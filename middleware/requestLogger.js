// middlewares/requestLogger.js
import logger from "../utils/logger.js";
import { v4 as uuidv4 } from "uuid"; // npm install uuid

const requestLogger = (req, res, next) => {
    const requestId = uuidv4(); // генерируем уникальный ID
    req.requestId = requestId; // 
    const start = Date.now();

    logger.info("Incoming request", {
        requestId,
        method: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.get("user-agent"),
    });

    // res.on('finish') - событие, которое срабатывает когда ответ отправлен
    // добавляем лог по завершению запроса
    res.on("finish", () => {
        logger.info("Request completed", {
            requestId,
            statusCode: res.statusCode,
            responseTime: Date.now() - req.startTime,
        });
    });

    next();
};

export default requestLogger;
