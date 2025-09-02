import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";

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
    const redirectUri = Linking.createURL("/");

    const response = account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    if (!response) throw new Error("Failed to sign in");

    const browserResults = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );    

    if (browserResults.type !== "success") throw new Error("Failed to sign in");

    const url = new URL(browserResults.url);
    const userId = url.searchParams.get("userId")?.toString();
    const secret = url.searchParams.get("secret")?.toString();

    if (!userId || !secret)
      throw new Error("Failed to sign in, No user or code");

    // Create session with OAuth credentials
    const session = await account.createSession(userId, secret);

    if (!session) throw new Error("Failed to create session");

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export const logout = async () => {
  try {
    const session = await account.deleteSession("current");

    if (!session) throw new Error();

    return true;
  } catch (err) {
    console.log(err);

    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await account.get();

    if (response.$id) {
      const userAvatar = avatar.getInitialsURL(response.name);

      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }

    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
