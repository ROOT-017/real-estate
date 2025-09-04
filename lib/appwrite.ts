import { Property } from "@/types/types";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
  Query,
} from "react-native-appwrite";

export const config = {
  platform: "com.restate.com",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPRITE_DATABASE_ID,
  galleries_table: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_TABLE,
  agents_table: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_TABLE,
  reviews_table: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_TABLE,
  properties_table: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_TABLE,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

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

export const getLatestProperties = async () => {
  try {
    const results = await databases.listDocuments<Property>(
      config.databaseId ?? "",
      config.properties_table ?? "",
      [Query.orderAsc("$createdAt"), Query.limit(5)]
    );
    return results.documents;
  } catch (err) {
    console.log(err);
  }
};

export const getProperties = async ({
  filter,
  query,
  limit,
}: {
  limit?: number;
  query?: string;
  filter?: string;
}) => {
  // console.log({ filter, query, limit });

  try {
    const buildQuery = [Query.orderAsc("$createdAt")];
    if (filter && filter !== "All") {
      buildQuery.push(Query.equal("type", filter));
    }

    if (query) {
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ])
      );
    }

    if (limit) {
      buildQuery.push(Query.limit(limit));
    }

    const results = await databases.listDocuments<Property>(
      config.databaseId ?? "",
      config.properties_table ?? "",
      buildQuery
    );
    return results.documents;
  } catch (err) {
    console.log(err);
  }
};

export const getPropertyById = async ({ id }: { id: string }) => {
  try {
    const results = await databases.getDocument<Property>(
      config.databaseId ?? "",
      config.properties_table ?? "",
      id
    );

    return results;
  } catch (err) {
    console.log(err);
  }
};
