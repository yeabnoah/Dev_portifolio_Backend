import { Context } from "hono";
import { auth } from "../lib/auth";
import userCookieInterface from "../interface/user_cookie_interface";

const getUser = async (c: Context): Promise<userCookieInterface | null> => {
  try {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    const user = session?.user;
    if (!user || !user.id) {
      return null;
    }
    return user as userCookieInterface;
  } catch (error) {
    console.error("Failed to get user session:", error);
    return null;
  }
};

export default getUser;
