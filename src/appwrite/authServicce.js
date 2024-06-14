import { Client, Account, ID } from 'appwrite';
import configVariables from '../config/envVariable';

class AuthService {
    client = new Client()
    account

    constructor() {
        this.client
            .setEndpoint(configVariables.appwriteURL)
            .setProject(configVariables.appwriteProjectId)

        this.account = new Account(this.client)
    }

    // signup function
    async signup({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            console.log(userAccount, "***user acount created****")
            if (userAccount) {
                this.login(email, password)
            }
        } catch (error) {
            console.log("Appwriten auth service :: create account :: error", error)
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Appwrite auth service :: login user :: error", error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite auth service :: get user :: error", error)
        }

        return null
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite auth service :: logout user :: error", error)
        }
    }
}

const authService = new AuthService()

export default authService