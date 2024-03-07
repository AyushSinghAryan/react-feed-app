import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';

const store = configureStore ({
    reducer:{
        auth:authSlice
    }
});

export default store;

// yeh store check karega user loggin hai ki nhi yeh info store karey ga