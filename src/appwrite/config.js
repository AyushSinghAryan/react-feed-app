// import conf from "../conf/conf";
// import { Client,ID, Databases,Storage,Query } from "appwrite";

// export class Service{
//  client = new Client();
//  databases;
//  bucket;// bucket hi storage hai 
 // these are variables

//  //! account tabh  baney jab constrcutor call hu 

//  constructor(){
//     this.client
//     .setEndpoint(conf.appwriteUrl)
//     .setProject(conf.appwriteProjectId);
    // databases bhi similar way  sey create hu tey hai 
//     this.databases = new Databases(this.client);
//     this.bucket = new Storage(this.client);
//  }
// agar koi post banana hai 
// async createPost({title,slug,content,featuredImage,status,userId}){
//     try{
//         return await this.databases.createDocument(
//             conf.appwriteDatabaseId,
//             conf.appwriteCollectionId,
//             slug, //! jo bhi slug value pass usko(slug) we assume  doc id here , because createDocument required a docu id , we can also take ID.unique
//             {
//                 title, // pass extra info in this object 
//                 content,
//                 featuredImage,
//                 status,
//                 userId


//             }
//         )
//     }catch (error){
//         console.log("Appwrite service :: createPost :: error",error);
//     }


// }

// updating the post 
//     async updatePost(slug, {title,content,featuredImage,status}){
//         //! database mey konsa document update karna so doc ka id lagey ga
        // yaha slug sey uniquely identify karey gey
        // step 1 update the document and a updateDocument method provide by DB class

//         try{
//             return await this.databases.updateDocument(
//               conf.appwriteDatabaseId,
//               conf.appwriteCollectionId,
//               slug, //! here slug use as document id , because updateDocument required a docu id 
//               {
                // in this we put the things we want to update 
//                 title,
//                 content,
//                 featuredImage,
//                 status,
//               }


//             )
//         }
//         catch(error){
//             console.log("Appwrite service :: updatePost :: error",error);
//         }
//     }

    // deleteing the post
    // yaha per document id hi tho chaiye so we pass the slug
//     async deletePost(slug){
//         try{
//             await this.databases.deleteDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug
//             )
//             return true; // means post delete hogaya
//         }
//         catch(error){
//             console.log("Appwrite service :: deletePost :: error",error);
//             return false; // agar koi error agya 
//         }
//     }
//     //! hu shakta hai we want ek post or we want sare post 
    // ! ek post key liye hum id tho pass karey gey and here id === slug
    // ! docs are very important 

    // getPost() method for getting the single post 
//     async getPost(slug){
//         try{
//             return await this.databases.getDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug
//             )
//         }
//         catch(error){
//             console.log("Appwrite service :: getPost :: error",error);
//             return false; // agar koi error agya 
//         }
//     }
    // for sare(all) post 
//     //! doc method give us all "Document" dey ga woo bhi jinka status active nhi hai 
//     //! so we use queries  query hogi mujhe woo sare post chaiye status === active

//     async getPosts(queries = [Query.equal("status","active")]){
        // we can also  give aray of queries , and here "status" is key
//         //? agaer appwrite key DB mey indexes mey status key tabhi we can use query else we can't
        // ! status = key and active = value here
//         try{
//             return await this.databases.listDocuments(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
                // hum iskey ander bhi queries likh shaktey the
                // [
                //     Query.equal("status","active")
                // ]  but humney uper use kar liye
//                 queries,
                //100, //kitna pagination chaiye

//             )
//         }
//         catch(error){
//             console.log("Appwrite service :: getPosts :: error",error);
//             return false; // agar koi error agya 
//         }
//     }

    // file upload services

    // two file services we will use here first one is upload file and second is delete file
//     async uploadFile(file){
        // we have to give actual file here not only the name 
        // upload sey phele create karna hoga
//         try{
//             return await this.bucket.createFile(
//                 conf.appwriteBucketId,
//                 ID.unique(),
//                 file,   // using this our file will be upload
//             )
//         }
//         catch(error){
//             console.log("Appwrite service :: uploadFile :: error",error);
//             return false; // agar koi error agya 
//         }
//     }

    // delete file - yaha per file "ID" deni hogi  hai wahi above wali
//     async deleteFile(fileId){
//         try{
//             await this.bucket.deleteFile(
//                 //! Delete a file by its unique ID. Only users with write permissions have access to delete this resource.
//                 conf.appwriteBucketId,
//                 fileId
//             )
//             return true// if file deleted then return true
//         }
//         catch(error){
//             console.log("Appwrite service :: deleteFile :: error",error);
//             return false; // agar koi error agya 
//         }
        
//     }

    // file preview 
//     getFilePreview(fileId){
//         return this.bucket.getFilePreview(
//             conf.appwriteBucketId,
//             fileId
//         )
//     }
// }

// const service = new Service();

// export default service

import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service()
export default service