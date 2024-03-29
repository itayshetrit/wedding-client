import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login'
import Answer from './Answer';
import Routes from '../routes/index'
const UnAuthNav = () => {
	return (
		<Switch>
			<Route path={Routes.LogAndReg.login} component={Login} exact={true}></Route>
			<Route path={Routes.LogAndReg.answer} component={Answer} exact={true}></Route>
			<Redirect from="/" to="/login" />
		</Switch>
	)
}

export default UnAuthNav;