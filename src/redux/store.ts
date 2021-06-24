import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {loginReducer} from "./loginReducer";
import {registrationReducer} from "./registrationReducer";
import {profileReducer} from "./profileReducer";
import {recoverPasswordReducer} from "./recoverPasswordReducer";
import {newPasswordReducer} from "./newPasswordReducer";




const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    recoverPassword: recoverPasswordReducer,
    newPassword: newPasswordReducer,

})
export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))