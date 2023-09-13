let failedResponse = async(res, status, message, success) => {
    return res.status(status).json({
        message: message,
        success: success,
    })
};

let successResponse = async(res, status, message, success, data) => {
    return res.status(status).json({
        message: message,
        success: success,
        data: data
    });
};

export {
    failedResponse,
    successResponse
}