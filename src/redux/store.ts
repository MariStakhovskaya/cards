import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {appReducer} from "./appReducer";
import {authReducer} from "./registrationReducer";
import {loginReducer} from "./loginReducer";
import {ProfileActionsType, profileReducer} from "./profileReducer";
import {ResetActionsType, resetReducer} from "./recoverPasswordReducer";


const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    login:loginReducer,
    profile: profileReducer,
    reset: resetReducer
})
export type AppRootState = ReturnType<typeof rootReducer>
export type AppActionsType = ResetActionsType | ProfileActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>
export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store
