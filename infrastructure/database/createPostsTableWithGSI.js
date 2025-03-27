import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "eu-west-1",
});

const createPostsTableWithGSI = async () => {
  const params = {
    TableName: "PostsTable",
    AttributeDefinitions: [
      { AttributeName: "PostType", AttributeType: "S" }, //same value for all posts in order to be able to sort them by createdAt attribute
      { AttributeName: "ForumPostID", AttributeType: "S" },
      { AttributeName: "Username", AttributeType: "S" },
      { AttributeName: "CreatedAt", AttributeType: "N" },
      //{ AttributeName: "Content", AttributeType: "S" }, //TODO: check if correct
      //{ AttributeName: "MediaFileURL", AttributeType: "S" },
    ],
    KeySchema: [
      { AttributeName: "ForumPostID", KeyType: "HASH" },
      { AttributeName: "CreatedAt", KeyType: "RANGE" },
    ],
    GlobalSecondaryIndexes: [
      //TODO: think regarding the right indexes
      {
        IndexName: "POSTTYPE_CREATED_AT_GSI",
        KeySchema: [
          { AttributeName: "PostType", KeyType: "HASH" },
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
      /*{
        IndexName: "CONTENT_CREATED_AT_GSI",
        KeySchema: [
          { AttributeName: "Content", KeyType: "HASH" },
          { AttributeName: "CreatedAt", KeyType: "RANGE" },
        ],
        Projection: {
          ProjectionType: "ALL",
        },
      },*/
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

createPostsTableWithGSI();
