import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Tooltip, Select, Row, Col, Button, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import firebase from '../../firebase/config'

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function Registration(props) {

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );

  const history = useHistory();

  const [form] = Form.useForm();

  const onFinish = values => {

    //values trả về
    var val = {
      confirm: "1",
      email: "hieu@gmail.com",
      nickname: "hieukute",
      password: "1"
    }

    firebase.auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .catch(function (error) {
        if (error.code) {
          console.log(error.code)
        }
      });
    console.log('thông tin:', values);

    //cập nhập tên cho người dùng
    let user = firebase.auth().currentUser;
    console.log(user);
    if (user != null) {
      values.nickname = user.displayName;
      user.providerData.forEach(function (index) {
        console.log('name', index.displayName);
      })
    }

    message.success('Đăng kí thành công', 2)
    setTimeout(() => {
      history.push('/login')
    }, 2000)
  };

  //thử
  const click = () => {
    let user = firebase.auth().currentUser;
    if (user) {
      user.updateProfile({
        displayName: 'minh',
      })
      console.log(user);
    }
  }

  return (
    <>
      <Row>
        <Col span={10} offset={6}>
          <h1 style={{ textAlign: 'center', margin: '10px 0px 10px 130px' }}>Đăng kí</h1>
          <Row>
            <Col span={24}>
              <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                  prefix: '86',
                }}
                scrollToFirstError
              >
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="nickname"
                  label={
                    <span>
                      Tên đăng nhập&nbsp;
                      <Tooltip title="What do you want others to call you?">
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </span>
                  }
                  rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Mật khẩu"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  label="Nhập lại mật khẩu"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject('Mật khẩu đã nhập không khớp!');
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Đăng kí
                  </Button>
                  <Button style={{ marginLeft: '30px' }} type="primary" onClick={() => history.push('/login')}>
                    Đăng nhập
                  </Button>
                  <Button onClick={click}>click</Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default React.memo(Registration);