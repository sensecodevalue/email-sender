import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";

const dbClient = new DynamoDBClient({ region: process.env.REGION });
const command = new ListTablesCommand({});

(async () => {
  try {
    const results = await dbClient.send(command);
    console.log(results.TableNames?.join("\n"));
    // logger로 변경
  } catch (err) {
    console.error(err);
    // logger로 변경
  }
})();

export { dbClient };
