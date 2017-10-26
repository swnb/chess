import React from 'react';
import ReactDOM from 'react-dom';
import 'src/form.css';
import { Form, Input, Slider, Switch, Button } from 'antd';
const FormItem = Form.Item;

class CheckBoardForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: 'vertical',
            info: '定义棋盘',
            passwordRequired: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswdChange = this.handlePasswdChange.bind(this);
    }
    handlePasswdChange(value) {
        this.setState({
            passwordRequired: value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            err ? void 0 : this.props.initGame(values);
        });
    }
    render() {
        const { formLayout } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout =
            null &&
            {
                // labelCol: { span: 6 },
                // wrapperCol: { span: 14 }
            };

        return (
            <div className="form">
                <Form
                    onSubmit={this.handleSubmit}
                    layout={formLayout}
                    hideRequiredMark={true}
                >
                    <FormItem {...formItemLayout} label="自定义棋盘房间名称">
                        {getFieldDecorator('roomId', {
                            rules: [
                                {
                                    required: true,
                                    whitespace: true,
                                    transform: id => (id ? id.trim() : id),
                                    message: '输入你的房间名称,名称的最大长度是10',
                                    max: 10
                                }
                            ]
                        })(<Input size="large" placeholder="房间名称" />)}
                    </FormItem>

                    <Switch
                        checkedChildren="开"
                        unCheckedChildren="关"
                        onChange={this.handlePasswdChange}
                    />
                    <FormItem {...formItemLayout} label="是否需要密码呢?">
                        {getFieldDecorator('passwd', {
                            initialValue: null
                        })(
                            <Input
                                size="large"
                                placeholder="输入密码，可以不填写"
                                disabled={!this.state.passwordRequired}
                            />
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="选择你自己的棋盘尺寸 (n X n)">
                        {getFieldDecorator('size', {
                            initialValue: 30
                        })(
                            <Slider
                                min={3}
                                max={100}
                                marks={{
                                    3: '3 X 3',
                                    10: '10 X 10',
                                    20: '20 X 20',
                                    30: '30 X 30',
                                    40: '40 X 40',
                                    50: '50 X 50',
                                    60: '60 X 60',
                                    100: {
                                        style: {
                                            color: '#1886b2'
                                        },
                                        label: <strong>100 X 100</strong>
                                    }
                                }}
                                included={false}
                            />
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="判断输赢的棋子相连数目">
                        {getFieldDecorator('winCount', {
                            initialValue: 5
                        })(
                            <Slider
                                min={3}
                                max={20}
                                included={false}
                                marks={{
                                    5: '5子棋',
                                    7: '7子棋',
                                    10: '10子棋',
                                    20: {
                                        style: {
                                            color: '#1886b2'
                                        },
                                        label: <strong>20子棋</strong>
                                    }
                                }}
                            />
                        )}
                    </FormItem>

                    <FormItem wrapperCol={{ span: 12, offset: 12 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(CheckBoardForm);
