export class AppError extends Error {
  public statusCode: number;
  public title?: string;
  public pageInfo: {
      title:string,
      path:string,
      page:string
  }
  public data?: { [key: string]: string|boolean };

  constructor(
    message: string,
    statusCode: number,
    pageInfo: {
      title:string,
      path:string,
      page:string
    },
    data?: { [key: string]: string|boolean }
  ) {
    super(message);
    this.statusCode = statusCode;
    this.pageInfo = pageInfo;
    this.data = data;
  }
}

