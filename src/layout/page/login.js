import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(`người dùng ${user.email} vừa đăng nhập!`)
      } else {
        console.log('không có người dùng nào đăng nhập!')
      }
    });
  })

  const click = () => {
    history.push('/registration');
  }

  const history = useHistory();

  const onFinish = value => {
    console.log(value);
    let user = firebase.auth().currentUser;
    console.log(user.providerId,user.emailVerified,user.email);
    firebase.auth()
      .signInWithEmailAndPassword(value.email,value.password)
      .then(function(){
        history.push('/infor')
      })
      .catch(function (error) {
        if (error) {
          console.log(error.code,'Email hoặc PassWord không hợp lệ!');
        }
      })
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

export default React.memo(LoginFrom);