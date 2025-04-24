// /hooks/useCurrentUser.ts
import { useEffect, useState } from "react";
import { useFetch } from "@/lib/fetch";
import { useUser } from "@clerk/clerk-expo";
import { User as UserDef } from "@/lib/definitions";

interface UserResponse {
  data: UserDef | null;
}

export const useCurrentUser = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [returnedUser, setReturnedUser] = useState<UserDef | null>(null);

  const userId = user?.id ?? "";
  const {
    data: res,
    loading,
    error,
    refetch,
  } = useFetch<UserResponse>(`/(api)/user/${userId}`, {
    method: "GET",
  });

  // Only fetch when Clerk has loaded and user is signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      refetch();
    }
  }, [isLoaded, isSignedIn]);

  // Sync returnedUser state when response changes
  useEffect(() => {
    if (res?.data !== undefined) {
      setReturnedUser(res.data);
    }
  }, [res]);

  return { returnedUser, loading, error };
};
