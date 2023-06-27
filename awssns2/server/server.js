const PORT = 8000;
const express = require("express");
const app = express();
const AWS = require("aws-sdk");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

// Configure AWS SDK with your AWS credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

// Create an instance of the AWS SNS client
const SNS = new AWS.SNS();

// Function to send a push notification using AWS SNS
const sendPushNotification = async (targetArn, message) => {
  try {
    const SNS = new AWS.SNS({ correctClockSkew: true });
    const params = {
      Message: message,
      TargetArn: targetArn,
    };
    const result = await SNS.publish(params).promise();
    console.log("Push notification sent successfully:", result);
  } catch (error) {
    console.log("Failed to send push notification:", error);
  }
};
app.get("/", (req, res) => {
  res.json({
    info: "Node.js, Express and Postgres API",
    // key: process.env.AWS_ACCESS_KEY,
  });
});

app.get("/sendpn", (req, res) => {
  console.log(req.body);
  const { targetArn, message } = req.body;
  sendPushNotification(targetArn, message);
  res.sendMessage(200);
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
