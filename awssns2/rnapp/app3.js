import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import AWS from "aws-sdk";

import { Notifications } from "react-native-notifications";

import {
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  REGION,
  TOPIC_ARN,
  PLATFORM_ARN,
  IOS_PLATFORM_ARN,
  EXPO_PROJECT_ID,
} from "@env";

export default function App() {
  useEffect(() => {
    // Configure AWS SDK
    AWS.config.update({
      region: REGION,
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    });

    const onRegistration = async (event) => {
      try {
        console.log("Device Token Received", event.deviceToken);
        const endpointParams = {
          PlatformApplicationArn:
            Platform.OS === "android" ? PLATFORM_ARN : IOS_PLATFORM_ARN,
          Token: event.deviceToken,
        };

      

        const endpointARN = await createARNAsync(endpointParams);
        if (!endpointARN) {
          throw new Error("error creating endpointARN");
        }
        console.log("endpointARN:", endpointARN);
        //get endpoint attributes
        let attributes = await getAttributesAsync({
          EndpointArn: endpointARN,
        });
        console.log("attributes:", attributes);
        //if token does not match current token
        //or the endpoint is disabled, throw an error
        if (
          (attributes && !attributes.Enabled) ||
          attributes.Token !== event.deviceToken
        ) {
          throw new Error("endpoint error");
        }
        //send the data to the backend
        //registerDevice(endpointARN, event.deviceToken);
      } catch (e) {
        //create the endpoint again and store it
        console.log(e);
        return 0;
      }
    };

    //register the device with the push service
    Notifications.registerRemoteNotifications();
    //setup the onRegistration listener (lambda for clarity)
    Notifications.events().registerRemoteNotificationsRegistered((token) =>
      onRegistration(token)
    );

    const createARNAsync = (params) =>
      new Promise((resolve, reject) => {
        const sns = new AWS.SNS();
        sns.createPlatformEndpoint(params, (err, data) => {
          console.log("created endpoint", err, data);
          if (err || !data.EndpointArn) {
            return err ? reject(err) : reject("arn is missing");
          }
          resolve(data.EndpointArn);
        });
      });
    const getAttributesAsync = (params) => {
    const SNS = new AWS.SNS({ correctClockSkew: true });
      new Promise((resolve, reject) => {

        SNS.getEndpointAttributes(params, (err, data) => {
          console.log("got attrs:", err, data);
          if (err || !data.Attributes) {
            return err
              ? reject(err)
              : reject("attributes are missing in the response");
          }
          resolve(data.Attributes);
        });
      });

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
