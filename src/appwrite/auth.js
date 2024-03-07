// import conf from "../conf/conf";
// import { Client, Account, ID } from "appwrite";


// export class AuthServices{
    
//  client = new Client();// these property provided by appwrite
//  account; // these are varaibles
//   account tabh  baney jab constrcutor call hu 
//  constructor() {
//     this.client
//         .setEndpoint(conf.appwriteUrl)
//         .setProject(conf.appwriteProjectId);
//     this.account = new Account(this.client);
        
// }
    

//     async createAccount({email,password,name}){ // email,password,name we get these value by destructure
//       try{
//          muje await karna account create karney ka
//         const userAccount = await this.account.create(ID.unique(),
//         email,
//         password,
//         name);
//          now we have to check that userAccount is created or not 
//         if(userAccount){
//              ager userAccount  exist karta hai then 
//             call another method to login the user  ,agaar account hai tho direct login kar do
//            return this.login({email,password});
//         }else{
//             agar nhi to create the user account
//          return  userAccount; 
//         }
//       } catch(error) {
//         throw error;
//       } 
//     }

//     async login({email,password}){
//         try{
//            return await this.account.createEmailSession(email,password);
//            //! Allow the user to login into their account by providing a valid email and password combination. This route will create a new session for the user
            // user deyga email and password 
//         } catch (error){
//             throw error;
//         }
//     }

    // async getCurrentUser(){
        // useful when to know ki user login hai ki nhi
    //     try{
    //        return await this.account.get();

    //     }catch(error){
    //         console.log("Appwrite service :: getCurrentUser :: error",error);
    //     }
        // agar try catch mey problem hu jati hai tabhi return null hoga
    //     return null;
    // }

//     async getCurrentUser() {
//         try {
//             return await this.account.get();
//         } catch (error) {
//             console.log("Appwrite serive :: getCurrentUser :: error", error);
//         }

//         return null;
//     }
  
    // ! delete session hi logout hai, sessions will delete all session
//     async logout(){
//         try {
//             await this.account.deleteSessions();
//         }
//         catch (error){
//             console.log("Appwrite service :: logout :: error",error);
//         }
//     }
// }

// const authService = new AuthServices();
// export default authService; // direct object export
// export default AuthServices; // class export

// we have exported class so we to create obj to use this class
// yaha direct obj bankar export kar do

// constructor as we know it calls automatically that why we call client property inside constructor so the user automatically use

// createAccount yaha baney sey logo under the hood kaam kesey chala raha wo nhi pata hoga they can directly access this

// ! services aesi bani under the hood kewal is file ko pata hai 
// ! frontend ko sirf method call karney hai 
import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService

