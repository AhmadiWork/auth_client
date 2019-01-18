import React from 'react';
import {connect} from 'react-redux';

import {signOut} from "../../redux/actions";

class SignOut extends React.Component {
    componentDidMount() {
        this.props.signOut();
    }

    render() {
        return (
            <div>Sorry to see you go :(</div>
        );
    }
}

export default connect(null, {signOut})(SignOut);