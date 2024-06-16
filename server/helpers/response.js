
const success = ({res, data, status=200, message = 'Success'}) =>{
    return res.status(200).json({
        success: true,
        message,
        data
    });
}


const serverError = ({res,status=500,message, error}) =>{
    return res.status(status).json({
        success: false,
        message: message?message:error?.message??"Internal Server Error"
    });
}

module.exports = {success, serverError}