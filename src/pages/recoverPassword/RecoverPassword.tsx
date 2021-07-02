import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import {AppRootState} from "../../redux/store";
import {forgotPasswordThunk, isSentInstructions, setError} from "../../redux/recoverPasswordReducer";
import {PATH} from "../../components/routes/Routes";
import SuperInputText from "../../components/common/c1-SuperInput/SuperInput";
import {Preloader} from "../../components/common/preloader/Preloader";
import SuperButton from "../../components/common/c2-SuperButton/SuperButton";
import c from '../../components/common/commonStyle/commonStyle.module.css'
import {useCleanUp} from "../../components/common/utills/CustomHook";
import {useFormik} from "formik";
import {errorSpan} from "../../components/common/utills/SpanError";
import {CheckEmail} from "../../components/common/checkEmailComponent/CheckEmail";

type FormErrorType = {
    email?:string
}
export const ResetPassword = () => {
    const dispatch = useDispatch()
    const isSent = useSelector<AppRootState, boolean>(state => state.reset.isSent)
    const error = useSelector<AppRootState, string>(state => state.reset.error)
    const isLoader = useSelector<AppRootState, boolean>(state => state.reset.isLoader)
    const [remember, setRemember] = useState(false)
    const [email, setEmail] = useState('')
    useCleanUp(setError(''))
    useCleanUp(isSentInstructions(false))

    const formik = useFormik({
        initialValues:{
            email:''
        },
        validate:(values) => {
            const errors: FormErrorType = {}
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: values => {
            formik.resetForm()
            setEmail(formik.values.email)
            dispatch(forgotPasswordThunk(values.email))

        }
    })

    if (remember) {
        return <Redirect to={PATH.LOGIN} />
    }
    if (isSent) {
        return <CheckEmail email={email}/>
    }

    return <div className={c.wrap}>
        <div className={c.formBlock}>
            <h3>Forgot your password?</h3>
            <form onSubmit={formik.handleSubmit}>
                {formik.errors.email ? errorSpan(formik.errors.email) : error && errorSpan(error)}
                <SuperInputText
                    {...formik.getFieldProps('email')}
                    placeholder={'email'}/>
                <div className={c.textWrap}>
        <span>Enter your email address and we will send you
        further instructions</span>
                </div>
                <div>
                    {isLoader ? <div><Preloader/></div> :
                        <SuperButton title={'Send instructions'}/>
                    }
                </div>

                <div className={c.textWrap}>
                    <span>Did you remember your password?</span><br/>
                </div>
                <div>
                    <NavLink to={PATH.LOGIN}>Try logging in</NavLink>
                    {/* <button onClick={() => {
                        setRemember(true)
                    }}><span>Try logging in</span>
                    </button>*/}

                </div>
            </form>
        </div>
    </div>
}

