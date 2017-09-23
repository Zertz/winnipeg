const DynamoDB = require('aws-sdk/clients/dynamodb')

module.exports = function ({ accessKeyId, secretAccessKey, region, TableName }) {
  const client = new DynamoDB.DocumentClient({
    accessKeyId,
    secretAccessKey,
    region
  })

  return {
    async get (short) {
      const result = await client.get({
        TableName,
        Key: {
          short
        }
      }).promise()

      if (result && result.Item) {
        client.update({
          TableName,
          Key: {
            short
          },
          UpdateExpression: 'set hits = hits + :inc',
          ExpressionAttributeValues: {
            ':inc': 1
          }
        }).promise().catch(console.error)
      }

      return result.Item.url
    },
    set (short, url) {
      return client.put({
        TableName,
        Item: {
          short,
          url,
          hits: 0
        }
      }).promise()
    }
  }
}
