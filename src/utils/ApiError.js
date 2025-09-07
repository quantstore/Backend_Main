// this is a custom error class that extends the built-in Error class.
// it is used to create custom error objects with additional properties like statusCode, data, success, errors, and stack trace.
// it is useful for handling errors in a consistent way across the application.

class ApiError extends Error {
    constructor(
        message="Something Went Wrong !",
        statusCode,
        errors = [],
        stack=""
){
        super(message);// this is used to set the message property of the error object.
        this.statusCode = statusCode;// this is used to set the http status code.
        this.data = null;// this is used to send any additional data if required.
        this.success = false;// this is used to indicate whether the request was successful or not.
        this.errors = errors;// this is used to send any additional error details if required.
        // this is used to capture the stack trace of the error.
        if(stack){
            this.stack = stack;// this is used to set the stack trace of the error.
        }else{
            Error.captureStackTrace(this, this.constructor);// this is used to capture the stack trace of the error.
        }
    }
}

export default ApiError;
// Example usage:
// throw new ApiError("Resource not found", 404);
// throw new ApiError("Internal Server Error", 500);
// throw new ApiError("Bad Request", 400);  