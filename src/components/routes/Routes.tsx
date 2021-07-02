import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Test} from "../../pages/test/Test";

import NewPassword from "../../pages/newPassword/NewPassword";
import Profile from "../../pages/profile/Profile";
import Error404 from "../../pages/error404/Error404";
import {Registration} from "../../pages/registration/Registration";
import {ResetPassword} from "../../pages/recoverPassword/RecoverPassword";
import Login from "../../pages/login/Login";


export const PATH = {
    LOGIN: '/login',
    NEW_PASSWORD: '/new-password/',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    PASSWORD_RECOVERY: '/recover_password',
    TEST_COMPONENT: '/testComponent',
    ERROR_404: '/404',
}

export const Routes = () => {
    return (
        <div>
            {/*Switch выбирает первый подходящий роут*/}
            <Switch>
                {/*в начале мы попадаем на страницу "/" и переходим сразу на страницу LOGIN*/}
                {/*exact нужен чтоб указать полное совподение (что после "/" ничего не будет)*/}
                <Route path={'/'} exact render={() => <Redirect to={PATH.LOGIN}/>}/>
                <Route path={PATH.LOGIN} render={() => <Login />}/>
                <Route path={PATH.REGISTRATION} render={() => <Registration />}/>
                <Route path={PATH.NEW_PASSWORD} render={() => <NewPassword />}/>
                <Route path={PATH.PROFILE} render={() => <Profile />}/>
                <Route path={PATH.PASSWORD_RECOVERY} render={() => <ResetPassword />}/>
                <Route exact path={PATH.TEST_COMPONENT} render={() => <Test />}/>
                <Route path={PATH.ERROR_404} render={() => <Error404 />}/>
                <Redirect from={'*'} to={PATH.ERROR_404}/>

            </Switch>
        </div>
    )
}


export default Routes;
