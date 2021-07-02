import {authResponseType, profileApi} from "../api/recoverPasswordApi";
import {AppThunk} from "./store";
import {setError, setLoader} from "./recoverPasswordReducer";

const SET_AUTH_DATA = 'profile/SET_AUTH_DATA'
export type ProfileInitialStateType = {
    id: string
    email: string
    name:string
    avatar?:string
    publicCardPacksCount: number | null

}
export type ProfileActionsType = ReturnType<typeof setAuthData>
export const initState: ProfileInitialStateType = {
    id: '',
    email: '',
    name:'',
    avatar:'',
    publicCardPacksCount: null
}
export const profileReducer = (state: ProfileInitialStateType = initState, action: ProfileActionsType)
    : ProfileInitialStateType => {
    switch (action.type) {
        case "profile/SET_AUTH_DATA":
            return {...state, ...action.data}
    }
    return state
}
export const setAuthData = (data:authResponseType) => {
    return {type:SET_AUTH_DATA, data} as const
}
export const authMeThunk = ():AppThunk => async (dispatch) => {
    try {
        dispatch(setLoader(true))
        const res = await profileApi.authMe()
        dispatch(setAuthData(res.data))
    } catch (e) {
        dispatch(setError(''))
    }
    dispatch(setLoader(false))
}
