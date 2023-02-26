import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export interface FindParams {
  length: number;
  offset: number;
  ids?: FindByIdParam[];
  state?: string;
}

export type FindByIdParam = string;

export interface BaseModalInterface<M> {
  create?: (form: M) => M;
  findById?: (id: FindByIdParam) => Promise<M>;
  find?: (params: FindParams) => M[];
  update?: (id: FindByIdParam, form: Partial<Omit<M, "id">>) => M;
  delete?: (id: FindByIdParam) => M;
}

export abstract class Model {
  protected dao: DynamoDBClient;
  
  constructor(dao: DynamoDBClient) {
    this.dao = dao;
  }
}
