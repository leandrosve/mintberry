
class RequestError extends Error {
    constructor(status, message, field){   
        super();
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
        return new RequestError(404, message || "errors.notFound");
    }

    static unauthorized(message) {
        return new RequestError(401, message);
    }

    static invalidToken(){
        return this.unauthorized("errors.auth.invalidToken")
    }

    static unhandled(){
        return new RequestError(500, "errors.unhandled");
    }

}   

module.exports= RequestError;