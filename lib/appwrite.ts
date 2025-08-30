import { Account, Avatars, Client } from "react-native-appwrite";

export const config = {
  platform: "com.restate.com",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
  try {
  } catch {}
}
