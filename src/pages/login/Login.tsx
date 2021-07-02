import React from "react";
import c from '../../components/common/commonStyle/commonStyle.module.css'
import s from "./Login.module.css"
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {NavLink, Redirect} from "react-router-dom";
import {errorSpan} from "../../components/common/utills/SpanError";
import SuperCheckbox from "../../components/common/c3-SuperCheckbox/SuperCheckbox";
import {Preloader} from "../../components/common/preloader/Preloader";
import SuperButton from "../../components/common/c2-SuperButton/SuperButton";
import {AppRootState} from "../../redux/store";
import {RequestStatusType} from "../../redux/appReducer";
import {loginTC} from "../../redux/loginReducer";
import {PATH} from "../../components/routes/Routes";
import SuperInputText from "../../components/common/c1-SuperInput/SuperInput";


type FormErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
 const Login = () => {
    const dispatch = useDispatch()
    const error = useSelector<AppRootState, string>(state => state.reset.error)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)
    const isLoading = useSelector<AppRootState, RequestStatusType>(state => state.app.status)



    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 7) {
                errors.password = 'Must be 7 characters at least';
            }
            return errors;
        },
        onSubmit: values => {
            const email = values.email
            const password = values.password
            const rememberMe = values.rememberMe
            formik.resetForm()
            dispatch(loginTC({email, password, rememberMe}))
        },
    })

    if (isLoggedIn) return <Redirect to={PATH.PROFILE}/>

    return (
        <div className={c.wrap}>
            <div className={c.formBlock}>

                <div>
                    <h3>Sign In</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    {formik.touched.email &&
                    formik.errors.email ? errorSpan(formik.errors.email) : error && errorSpan(error)}
                    <SuperInputText placeholder={'email'}
                                    {...formik.getFieldProps('email')}
                    />

                    <div>

                        {formik.touched.email &&
                        formik.errors.password ? errorSpan(formik.errors.password) : error && errorSpan(error)}
                        <SuperInputText type={"password"} placeholder={'Password'}
                                        {...formik.getFieldProps('password')}
                        />
                    </div>

                    <div className={c.textWrap}>
                        <span>Remember me</span>
                        <SuperCheckbox
                            {...formik.getFieldProps('rememberMe')}
                        />
                    </div>
                    <div className={s.forgotPassword}>
                        <NavLink to={PATH.PASSWORD_RECOVERY}>Forgot Password?</NavLink>
                    </div>
                    <div>
                        {isLoading === 'loading' ? <Preloader/> :
                            <SuperButton title={"Login"}/>
                        }
                    </div>
                </form>

                <div className={c.textWrap}>
                    <span>Don't have an account?</span>
                </div>
                <NavLink to={PATH.REGISTRATION}>Sign Up</NavLink>

            </div>
        </div>
    )
}

export default Login;