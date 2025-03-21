export interface Quote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export interface QuoteApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: Quote;
}
