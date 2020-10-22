class RequestError {
    constructor(status, message, field){
        this.status = status;
        this.error = {field, message}
    }

    static badRequest(message, field) {
        return new RequestError(400, message, field);
    }

    static forbidden(message) {
        return new RequestError(403, message);
    }

    static notFound(message) {
        return new RequestError(404, message || "Not found");
    }

    static unauthorized(message) {
        return new RequestError(401, message);
    }

    static invalidToken(){
        return this.unauthorized("Invalid Token")
    }

}   

module.exports= RequestError;