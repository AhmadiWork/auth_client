import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Link, withRouter} from "react-router-dom";
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import {PermissibleRender} from '@brainhubeu/react-permissible';

import {IS_AUTHENTICATED_PER, IS_NOT_AUTHENTICATED_PER} from "../../config/permission/types";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div style={{marginBottom: '20px'}}>
                <Navbar color="light" light expand="md">

                    <NavbarBrand tag={Link} to="/">
                        <FormattedMessage
                            id="navBar.brandName"
                            defaultMessage="Auth"
                        />
                    </NavbarBrand>

                    <NavbarToggler onClick={this.toggle}/>

                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>

                            <PermissibleRender
                                userPermissions={this.props.userPermissions}
                                requiredPermissions={[IS_NOT_AUTHENTICATED_PER]}
                            >
                                <NavItem className={window.location.pathname === '/sign-in' ? 'active' : ''}>
                                    <NavLink tag={Link} to="/sign-in">
                                        <FormattedMessage
                                            id="navBar.signIn"
                                            defaultMessage="Sign In"
                                        />
                                    </NavLink>
                                </NavItem>

                                <NavItem className={window.location.pathname === '/sign-up' ? 'active' : ''}>
                                    <NavLink tag={Link} to="/sign-up">
                                        <FormattedMessage
                                            id="navBar.singUp"
                                            defaultMessage="Sing Up"
                                        />
                                    </NavLink>
                                </NavItem>
                            </PermissibleRender>

                            <PermissibleRender
                                userPermissions={this.props.userPermissions}
                                requiredPermissions={[IS_AUTHENTICATED_PER]}
                            >
                                <NavItem className={window.location.pathname === '/feature' ? 'active' : ''}>
                                    <NavLink tag={Link} to="/feature">
                                        <FormattedMessage
                                            id="navBar.featurePage"
                                            defaultMessage="Feature Page"
                                        />
                                    </NavLink>
                                </NavItem>

                                <NavItem className={window.location.pathname === '/sign-out' ? 'active' : ''}>
                                    <NavLink tag={Link} to="/sign-out">
                                        <FormattedMessage
                                            id="navBar.singOut"
                                            defaultMessage="Sing Out"
                                        />
                                    </NavLink>
                                </NavItem>
                            </PermissibleRender>

                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
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
)(Header);
