import React from 'react';
import {compose} from 'redux';
import {connect} from "react-redux";
import {Field, reduxForm} from 'redux-form';
import {Button, Form, FormGroup, Label, Input, FormFeedback, Alert} from 'reactstrap';

import {FormattedMessage} from 'react-intl';
import {signUp} from "../../redux/actions";

class SignUp extends React.Component {
    renderFieldError = ({error, touched}) => {
        if (error && touched) {
            return (
                <FormFeedback>{error}</FormFeedback>
            );
        }
    };

    renderInput = ({input, label, type, meta}) => {
        const inputValidation = `${meta.error && meta.touched ? 'is-invalid' : ''}`;

        return (
            <FormGroup>
                <Label>{label}</Label>
                <Input className={inputValidation} type={type} {...input} />
                {this.renderFieldError(meta)}
            </FormGroup>
        );
    };

    renderFormError = () => {
        if (this.props.errorMessage) {
            return (
                <Alert color="danger">
                    {this.props.errorMessage}
                </Alert>
            );
        }
    };

    onSubmit = formValues => {
        this.props.signUp(formValues, () => {
            this.props.history.push('/feature');
        })
    };

    render() {
        const {handleSubmit} = this.props;

        return (
            <React.Fragment>
                {this.renderFormError()}
                <Form onSubmit={handleSubmit(this.onSubmit)}>
                    <Field
                        name="email"
                        component={this.renderInput}
                        type="email"
                        label={<FormattedMessage id='signUp.email' defaultMessage='Email'/>}
                    />
                    <Field
                        name="password"
                        component={this.renderInput}
                        type="password"
                        label={<FormattedMessage id='signUp.password' defaultMessage='Password'/>}
                    />
                    <Button>
                        <FormattedMessage
                            id='signUp.submit'
                            defaultMessage='Submit'
                        />
                    </Button>
                </Form>
            </React.Fragment>
        );
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.email) {
        errors.email = <FormattedMessage id='signUp.error.reqEmail' defaultMessage='Email field can not be empty'/>;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
        errors.email = <FormattedMessage id='signUp.error.inValidEmail' defaultMessage='Invalid email address'/>;
    }

    if (!formValues.password) {
        errors.password = <FormattedMessage id='signUp.error.password' defaultMessage='Password field can not be empty'/>;
    }

    return errors;
};

const mapStateToProps = state => {
    return {
        errorMessage: state.auth.errorMessage
    }
};

export default compose(
    connect(mapStateToProps, {signUp}),
    reduxForm({form: 'signUp', validate})
)(SignUp);