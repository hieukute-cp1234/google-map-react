import React, { useState } from 'react'
import { Form, Input, Button, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import firebase from '../../firebase/config'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function LoginFrom() {

  const click = () => {
    history.push('/registration');
  }

  const history = useHistory();

  const onFinish = value => {
    // email: "hieu@gmail.com"
    // password: "hieu1234"
    console.log(value);
    let userSignIn = firebase.auth().currentUser;
    
    console.log(userSignIn);
    if(userSignIn){
      console.log(userSignIn.email);
    } 
    //history.push('/infor');
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Row>
        <Col span={12} offset={4}>
          <h1 style={{ textAlign: 'center', margin: '30px 0 30px 130px' }}>Đăng nhập</h1>
          <Row>
            <Col span={24}>
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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
                  label="Mật khẩu"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  {...tailLayout}
                >
                  <Button style={{ marginLeft: '70px' }} type="primary" htmlType="submit">
                    Đăng nhập
                  </Button>
                  <Button type="primary" onClick={click} style={{ marginLeft: '30px' }}>
                    Đăng kí
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default LoginFrom;