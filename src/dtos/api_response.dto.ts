export class ApiResponse {
  code: number;
  message: string;
  data: any;

  constructor(payload: { code: number; message: string; data?: any }) {
    this.code = payload.code;
    this.message = payload.message;
    this.data = payload.data;
  }
}
