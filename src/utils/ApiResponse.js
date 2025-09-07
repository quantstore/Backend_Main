class ApiResponse{
    constructor(
        message="Request Processed Successfully !",
        statusCode,
        data
    ){
        this.message = message;// this is used to set the message property of the response object.
        this.statusCode = statusCode;// this is used to set the http status code.
        this.data = data;// this is used to send any additional data if required.
        this.success = statusCode < 400;// this is used to indicate whether the request was successful or not.
    }
}