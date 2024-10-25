export class AppError extends Error {
  public statusCode: number;
  public page?: string;
  public data?: { [key: string]: string|boolean };

  constructor(
    message: string,
    statusCode: number,
    page?: string,
    data?: { [key: string]: string|boolean }
  ) {
    super(message);
    this.statusCode = statusCode;
    this.page = page;
    this.data = data;
  }
}

