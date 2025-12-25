import { LocaleKeys } from "@shared/types"

export class CustomError extends Error {
  public readonly status: number
  public readonly code: string
  public readonly params: Record<string, any>

  constructor(code: LocaleKeys, params: Record<string, any> = {}, status = 400) {
    super(code)             
    this.code = code
    this.params = params
    this.status = status
  }
}
