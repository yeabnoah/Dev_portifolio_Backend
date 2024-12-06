import authClient from "@/lib/auth-client";

export default function useSession() {
  const { data: session, isPending, error } = authClient.useSession();

  return { session, isPending, error };
}
