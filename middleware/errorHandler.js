const errorHandler = (err, req, res, next) => {
    const isDev = process.env.NODE_ENV === "development";
    const statusCode = err.statusCode || 500;

    // Базовая структура ответа
    const response = {
        status: "error",
        message: err.message || "Unexpected error occurred",
    };

    // Добавляем детали валидации, если они есть
    if (Array.isArray(err.errors) && err.errors.length > 0) {
        response.errors = err.errors;
    }

    // В режиме разработки добавляем стек
    // if (isDev) {
    //     response.stack = err.stack;
    // }

    // Логирование
    //console.error(`[${new Date().toISOString()}] ${err.name}: ${err.message}`);

    // Отправляем ответ
    res.status(err.isOperational ? statusCode : 500).json(response);
};

export default errorHandler;