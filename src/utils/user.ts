import { Context } from "hono";
import { auth } from "../lib/auth";
import userCookieInterface from "../interface/user_cookie_interface";

const getUser = async (c: Context) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });
  const user = session?.user;

  // if(user?.id !== userid){
  //     return c.json({
  //         error : "this is not your data",
  //     },402)
  // }

  return user as userCookieInterface;
};

export default getUser;
