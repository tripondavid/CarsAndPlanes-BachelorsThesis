import {
  DynamoDBClient,
  CreateTableCommand,
  DeleteTableCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-west-1" });

const createCommentsTableWithGSI = async () => {
  const params = {
    TableName: "CommentsTable",
    AttributeDefinitions: [
      { AttributeName: "CommentID", AttributeType: "S" },
      { AttributeName: "Username", AttributeType: "S" },
      { AttributeName: "ForumPostID", AttributeType: "S" },
      { AttributeName: "CreatedAt", AttributeType: "N" },
      //{ AttributeName: "Content", AttributeType: "S" },
    ],
    KeySchema: [
      { AttributeName: "CommentID", KeyType: "HASH" },
      { AttributeName: "ForumPostID", KeyType: "RANGE" },
    ],
    GlobalSecondaryIndexes: [
      //TODO: think regarding the right indexes
      {
        IndexName: "FORUMPOSTID_CREATED_AT_GSI",
        KeySchema: [
          { AttributeName: "ForumPostID", KeyType: "HASH" },
          { AttributeName: "CreatedAt", KeyType: "RANGE" },
        ],
        Projection: {
          ProjectionType: "ALL",
        },
      },
      {
        IndexName: "USERNAME_CREATED_AT_GSI",
        KeySchema: [
          { AttributeName: "Username", KeyType: "HASH" },
          { AttributeName: "CreatedAt", KeyType: "RANGE" },
        ],
        Projection: {
          ProjectionType: "ALL",
        },
      },
    ],
    BillingMode: "PAY_PER_REQUEST",
  };

  try {
    const data = await client.send(new CreateTableCommand(params));
    console.log("Table with GSI created successfully:", data);
  } catch (error) {
    console.error("Error creating table with GSI:", error);
  }
};

createCommentsTableWithGSI();
