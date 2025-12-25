import { LocaleKeys } from "@shared/types"
import { CustomError } from "./customError"

export class BadRequestError extends CustomError {
  constructor(code: LocaleKeys, params: Record<string, any> = {}) {
    super(code, params, 400)
  }
}

export class UnauthorizedError extends CustomError {
  constructor(code: LocaleKeys, params: Record<string, any> = {}) {
    super(code, params, 401)
  }
}

export class ForbiddenError extends CustomError {
  constructor(code: LocaleKeys, params: Record<string, any> = {}) {
    super(code, params, 403)
  }
}

export class NotFoundError extends CustomError {
  constructor(code: LocaleKeys, params: Record<string, any> = {}) {
    super(code, params, 404)
  }
}

export class ConflictError extends CustomError {
  constructor(code: LocaleKeys, params: Record<string, any> = {}) {
    super(code, params, 409)
  }
}

export class InternalServerError extends CustomError {
  constructor(code: LocaleKeys = "error.internal", params: Record<string, any> = {}) {
    super(code, params, 500)
  }
}
