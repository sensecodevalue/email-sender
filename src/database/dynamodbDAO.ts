import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const dynamodbClient = new DynamoDBClient({ region: process.env.REGION });

export default  dynamodbClient ;
