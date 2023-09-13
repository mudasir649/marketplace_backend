export const successResponse = async(res, status, message, success, data) => {
    return res.status(status).json({
        message: message,
        success: success,
        data: data
    })
}

export const failedResponse = async(res, status, message, success) => {
    return res.status(status).json({
        message: message,
        success: success,
    })
}