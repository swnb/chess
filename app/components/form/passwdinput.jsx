import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

let getPasswd;

class HorizontalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        getPasswd = () => {
            return this.props.form.getFieldValue('password');
        };
    }
    componentDidMount() {
        this.props.form.validateFields();
    }
    render() {
        const {
            getFieldDecorator,
            getFieldError,
            isFieldTouched
        } = this.props.form;

        // Only show error after a field is touched.

        const passwordError =
            isFieldTouched('password') && getFieldError('password');
        return (
            <Form layout="vertical" onSubmit={this.props.handleSubmit}>
                <FormItem
                    validateStatus={passwordError ? 'error' : ''}
                    help={passwordError || ''}
                >
                    {getFieldDecorator('password')(
                        <Input
                            prefix={
                                <Icon type="lock" style={{ fontSize: 13 }} />
                            }
                            onChange={this.passwdChange}
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </FormItem>
            </Form>
        );
    }
}

const PasswdForm = Form.create()(HorizontalLoginForm);
export { PasswdForm, getPasswd };
