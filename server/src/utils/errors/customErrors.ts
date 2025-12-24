import { CustomError } from "./customError";

export class InternalServerError extends CustomError {
    constructor(message: string = 'Internal Server Error', code?:string){
        super(message, 500, 'InternalServerError', code);
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message: string = 'Unauthorized Error', code?:string){
        super(message, 401, 'UnauthorizedError', code);
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string = 'Bad Request Error', code?:string){
        super(message, 400, 'BadRequestError', code);
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string = 'Not Found Error', code?:string){
        super(message, 404, 'NotFoundError', code);
    }
}

export class ConflictError extends CustomError {
    constructor(message: string = 'Conflict Error', code?:string){
        super(message, 409, 'ConflictError', code);
    }
}

export class ValidationError extends CustomError {
    constructor(message: string = 'ValidationError', code: string){
        super(message, 400, 'ValidationError', code);
    }
}

export class ForbiddenError extends CustomError {
    constructor(message: string = 'ForbiddenError', code: string){
        super(message, 403, 'ForbiddenError', code);
    }
}


