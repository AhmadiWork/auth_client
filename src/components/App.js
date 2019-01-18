import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Route, withRouter, Switch, Redirect} from "react-router-dom";
import {Container} from "reactstrap";
import {PermissibleRender} from '@brainhubeu/react-permissible';

import {IS_AUTHENTICATED_PER, IS_NOT_AUTHENTICATED_PER} from "../config/permission/types";
import Error from './base/Error';
import Header from './base/Header';
import Welcome from './pages/Welcome';
import Feature from './pages/Feature';
import SignUp from './auth/SignUp';
import SignOut from "./auth/SignOut";
import SignIn from "./auth/SignIn";

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header/>
                <Container>
                    <Switch>
                        <Route path="/" exact component={Welcome}/>

                        <Route path="/sign-up">
                            <PermissibleRender
                                userPermissions={this.props.userPermissions}
                                requiredPermissions={[IS_NOT_AUTHENTICATED_PER]}
                                renderOtherwise={<Redirect to="/"/>}
                            >
                                <SignUp/>
                            </PermissibleRender>
                        </Route>

                        <Route path="/sign-in">
                            <PermissibleRender
                                userPermissions={this.props.userPermissions}
                                requiredPermissions={[IS_NOT_AUTHENTICATED_PER]}
                                renderOtherwise={<Redirect to="/"/>}
                            >
                                <SignIn/>
                            </PermissibleRender>
                        </Route>

                        <Route path="/sign-out" >
                            <PermissibleRender
                                userPermissions={this.props.userPermissions}
                                requiredPermissions={[IS_AUTHENTICATED_PER]}
                                renderOtherwise={<Redirect to="/"/>}
                            >
                                <SignOut/>
                            </PermissibleRender>
                        </Route>

                        <Route path="/feature">
                            <PermissibleRender
                                userPermissions={this.props.userPermissions}
                                requiredPermissions={[IS_AUTHENTICATED_PER]}
                                renderOtherwise={<Error code="403" description="Access denied"/>}
                            >
                                <Feature/>
                            </PermissibleRender>
                        </Route>

                        <Route><Error code="404" description="Not found"/></Route>
                    </Switch>
                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        userPermissions: state.auth.permissions
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps)
)(App);
