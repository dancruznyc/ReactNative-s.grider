import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AWS from "aws-sdk";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import * as Notifications from "expo-notifications";

import {
  TEST,
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  REGION,
  TOPIC_ARN,
  PLATFORM_ARN,
  EXPO_PROJECT_ID,
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_SENDER_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_APP_ID,
} from "@env";

// Initialize Firebase
// const firebaseConfig = {
//   // Your Firebase config options here
//   apiKey: FIREBASE_API_KEY,
//   projectId: FIREBASE_PROJECT_ID,
//   messagingSenderId: FIREBASE_SENDER_ID,
//   storageBucket: FIREBASE_STORAGE_BUCKET,
//   appId: FIREBASE_APP_ID,
// };
// const app = initializeApp(firebaseConfig);
//const messaging = getMessaging(app);

export default function App() {
  console.log("ev", TEST);
  useEffect(() => {
    // Request permission to receive notifications
    const requestUserPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to receive notifications was denied.");
      }
      console.log(status);
    };

    // Register device token with AWS SNS
    const registerDeviceTokenWithSNS = async () => {
      try {
        const deviceToken = (
          await Notifications.getExpoPushTokenAsync({
            projectId: EXPO_PROJECT_ID,
          })
        ).data;
        console.log("Device Token:", deviceToken);

        // Configure AWS SDK
        AWS.config.update({
          region: REGION,
          accessKeyId: AWS_ACCESS_KEY,
          secretAccessKey: AWS_SECRET_ACCESS_KEY,
        });

        const SNS = new AWS.SNS({ correctClockSkew: true });
        const platformApplicationArn = PLATFORM_ARN; // ARN of your platform application in AWS SNS

        // Create platform endpoint and subscribe to topic
        const endpointParams = {
          PlatformApplicationArn: platformApplicationArn,
          Token: deviceToken,
        };
        const createEndpointResponse = await SNS.createPlatformEndpoint(
          endpointParams
        ).promise();
        const endpointArn = createEndpointResponse.EndpointArn;

        const subscribeParams = {
          TopicArn: TOPIC_ARN, // ARN of the topic you want to subscribe to
          Protocol: "Application",
          Endpoint: endpointArn,
        };
        await SNS.subscribe(subscribeParams).promise();
        console.log(endpointArn);

        console.log("Successfully registered device with AWS SNS.");
      } catch (error) {
        console.log("Failed to register device with AWS SNS:", error);
      }
    };

    requestUserPermission();
    registerDeviceTokenWithSNS();
  }, []);

  return (
    <View style={styles.container}>
      <Text>AWS SNS Demo</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
