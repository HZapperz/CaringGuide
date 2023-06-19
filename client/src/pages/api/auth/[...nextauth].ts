//additional provider imports will be required for creating additional auth provider functions
import NextAuth, {NextAuthOptions} from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"
import GoogleProvider from "next-auth/providers/google"

/** 
 * Defines Authorization Options for NextAuth.js 
 * Each provider will have an ID, a secret, and sometime additional info
 * that need to be set as Environment Variables/Magic Numbers.
 * These Environment Variables will also need to be added to a process.d.ts file
 * and explicitly declared as string objects (following the structure provided in said file).
 */
export const authOptions: NextAuthOptions = {

providers: [

        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
            tenantId: process.env.AZURE_AD_TENANT_ID,
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })
    ]
}

export default NextAuth(authOptions)
