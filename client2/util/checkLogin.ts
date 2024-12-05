import authClient from "@/lib/auth-client";

const checkLogin = async () => {
  const response = await authClient.getSession();

  const session = response.data?.session;
  const user = response.data?.user;

  return { session, user };
};

export default checkLogin;
