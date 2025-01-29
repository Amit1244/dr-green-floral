import CredentialsProvider from "next-auth/providers/credentials";
import { FindUser } from "@/lib/mongodb/db-queries";
import GenerateSignature from "@/lib/dapp/generate-signature";
import { revalidatePath } from "next/cache";
const bcrypt = require("bcryptjs");

export const options = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials) {
                // return user if correct
                const user = await FindUser({
                    username: credentials?.username,
                });
                const userObj = JSON.parse(user);
                if (userObj?.hash) {
                    const hashMatch = await bcrypt
                        .compare(credentials?.password, userObj?.hash)
                        .then((res) => res);
                    if (hashMatch) {
                        revalidatePath("/");
                        return userObj;
                    }
                }
                return null;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        // Set it as jwt instead of database if an adaptor exists
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (user) {
                // token.accessToken = user.accessToken;
                token._id = user._id;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token and user id from a provider.
            const user = await FindUser(
                { _id: token._id },
                { _id: 1, clientId: 1, username: 1, scheduledAppointmentAt: 1 }
            );
            const userObj = JSON.parse(user);

            // ADD DAPP USER
            const payload = { clientId: userObj.clientId };
            const getClient = await fetch(
                `https://stage-api.drgreennft.com/api/v1/dapp/clients/${payload.clientId}`,
                {
                    method: "GET",
                    redirect: "follow",
                    headers: {
                        "x-auth-apikey": process.env.DAPP_API,
                        "x-auth-signature": GenerateSignature(payload),
                        "Content-Type": "application/json",
                    },
                }
            );
            userObj.dappUser = (await getClient.json()).data;

            if (user) {
                session.user = userObj;
            }

            return session;
        },
    },
    pages: {
        signIn: "/login",
        signOut: "/signout",
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
};
