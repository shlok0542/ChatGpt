const errorResponse = require('../utils/errorResponse');
const errormidleware = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // mongoose bad object id
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        err = new errorResponse(message, 404);
    }
    // mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        err = new errorResponse(message, 400);
    }
    // mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message);
        err = new errorResponse(message, 400);
    }

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error'
    });
};

module.exports = errormidleware;
