
export class CustomError extends Error {
  public status: number;
  public name: string;
  public code: string | undefined;
  constructor(message: string, status: number, name: string, code?: string) {
    super(message);
    this.status = status;
    this.name = name;
    this.code = code;
  }
}