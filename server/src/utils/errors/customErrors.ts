import { CustomError } from "./customError";

export class InternalServerError extends CustomError {
    constructor(message: string = 'Internal Server Error'){
        super(message, 500, 'InternalServerError');
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message: string = 'Unauthorized Error'){
        super(message, 401, 'UnauthorizedError');
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string = 'Bad Request Error'){
        super(message, 400, 'BadRequestError');
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string = 'Not Found Error'){
        super(message, 404, 'NotFoundError');
    }
}

export class ConflictError extends CustomError {
    constructor(message: string = 'Conflict Error'){
        super(message, 409, 'ConflictError');
    }
}

export class ValidationError extends CustomError {
    constructor(message: string = 'ValidationError'){
        super(message, 400, 'ValidationError');
    }
}

export class ForbiddenError extends CustomError {
    constructor(message: string = 'ForbiddenError'){
        super(message, 403, 'ForbiddenError');
    }
}

export class ExpiredSessionError extends Error {
    public name: string = 'ExpiredSession';
    constructor( public readonly accessToken: string){
      super('Session Expired.');
    }
}


