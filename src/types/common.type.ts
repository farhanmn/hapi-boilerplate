interface Metadata {
  total: number;
  page: number;
  limit: number;
}

interface ErrorResponse {
  status: number;
  message: string;
}

export {
  Metadata,
  ErrorResponse
}