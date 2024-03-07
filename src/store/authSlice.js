import {createSlice} from "@reduxjs/toolkit"

// this "authSlice" method is for to  track user authenticated hai ki nhi yeh mey store sey pucho ga

   // initState
const initialState = {
    status:false, //by default means abhi user is not authenticated
    userData:null , // initally no user info 
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status = true,// user login hoga tho userData bhi tho hoga
            state.userData = action.payload.userData;
        },
        logout:(state) =>{
            state.status = false; // user abb login nhi hai
            state.userData = null;

        }
    }
  
})
export const {login,logout} = authSlice.actions;
// ! actions yaha per login and logout are the actions 
// ! we have made auth slice not post lekin post bhi bana skate mey janey chaiye the
export default authSlice.reducer;