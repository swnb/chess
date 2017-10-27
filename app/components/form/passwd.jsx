import React from 'react';
import 'src/form.css';
import passwdConfirm from 'api/passwdconfirm';
import { PasswdForm, getPasswd } from './passwdinput';
import { Form, Icon, Input, Modal, Button } from 'antd';
const FormItem = Form.Item;

class ConfirmPasswd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: '输入密码',
            visible: false,
            confirmLoading: false
        };
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }
    submit() {
        const roomId = this.props.roomId;
        const passwd = getPasswd() || null;
        const hooks = {
            success: () => {
                console.log('success');
                this.props.getIntoRoom();
            },
            err: () => {
                this.setState({
                    info: '输入密码错误'
                });
            },
            errRoom: () => {
                this.setState({
                    info: '房间错误'
                });
            }
        };
        passwdConfirm({ roomId, passwd }, hooks);
    }
    showModal() {
        this.setState({
            visible: true
        });
    }
    handleOk() {
        this.setState({
            confirmLoading: true
        });
        this.submit();
    }
    handleCancel() {
        this.setState({
            visible: false
        });
    }
    render() {
        const { visible, confirmLoading, info } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Open
                </Button>
                <Modal
                    title="输入房间密码"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <PasswdForm />
                    <p>{info}</p>
                </Modal>
            </div>
        );
    }
}

export default ConfirmPasswd;
