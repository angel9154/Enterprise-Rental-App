import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tenant, Manager } from "@/types/prismaClient";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { createNewUserInDatabase } from "@/lib/utils";


export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
    const session = await fetchAuthSession();
    const { idToken } = session.tokens ?? {};
    if (idToken) {
      headers.set("Authorization", `Bearer ${idToken}`);
    }
    }
  }),
  reducerPath: "api",
  tagTypes: [],
  endpoints: (build) => ({
    getAuthUser: build.query<User, void>({
      queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ)  => {
        try {
          const session = await fetchAuthSession()
          const { idToken } = session.tokens ?? {}
          const user = await getCurrentUser(); 

          const userRole = idToken?.payload["custom:role"] as string;
          const endpoint = userRole === "manager"
          ? `/managers/${user.userId}`  // Use correct user ID property
           : `/tenants/${user.userId}`;  // Fix typo "tentants" → "tenants

          let userDetailsResponse = await fetchWithBQ(endpoint);

          //if user doesnt exist we are going to create a new user
          if(userDetailsResponse.error && userDetailsResponse.error.status === 404) {
              userDetailsResponse = await createNewUserInDatabase(
                user,
                userRole,
                idToken,
                fetchWithBQ,
                
              )
          }

          return {
            data: {
              cognitoInfo: {...user},
              userInfo: userDetailsResponse.data as Tenant | Manager,
              userRole 
            }
          }
          // if user does not exist we are going to create a new user
        } catch (error: any) {
          return {error: error.message || "Could not fetch user data "}
        }
       
      }
  }),
}),
});

export const {
  useGetAuthUserQuery
} = api;
