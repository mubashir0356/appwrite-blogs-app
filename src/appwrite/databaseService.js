import { Client, Databases, Storage, ID, Query } from "appwrite";
import configVariables from "../config/envVariable";

class Services {
    client = new Client
    database
    bucket

    constructor() {
        this.client
            .setEndpoint(configVariables.appwriteURL)
            .setProject(configVariables.appwriteProjectId)

        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.database.createDocument(
                configVariables.appwriteDBId,
                configVariables.appwriteCollectionId,
                slug, // document id
                { title, content, featuredImage, status, userId } // body
            )
        } catch (error) {
            console.log("Appwriten batabase service :: create post :: error", error)
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.database.updateDocument(
                configVariables.appwriteDBId,
                configVariables.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status }
            )
        } catch (error) {
            console.log("Appwriten batabase service :: update post :: error", error)
        }
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(
                configVariables.appwriteDBId,
                configVariables.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwriten batabase service :: get post :: error", error)
            return false
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                configVariables.appwriteDBId,
                configVariables.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwriten batabase service :: delete post :: error", error)
            return false
        }
    }

    // upload file - image to storage(bucket)

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                configVariables.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwriten batabase service :: uploading featured Image :: error", error)
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                configVariables.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwriten batabase service :: deleting featured Image :: error", error)
            return false
        }
    }

    // get file preview
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            configVariables.appwriteBucketId,
            fileId
        )
    }

}

const datbaseServices = new Services()

export default datbaseServices