import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Row, Col,message } from 'antd';
import { useHistory } from 'react-router-dom';
import firebase from '../../firebase/config';
import { CheckUser } from '../checkUser/check'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function LoginFrom({check,setCheck}) {
  
  const history = useHistory();

  //lắng nghe người dùng đăng nhập
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(`người dùng ${user.email} vừa đăng nhập!`)
      } else {
        console.log('không có người dùng nào đăng nhập!')
      }
    });
  })

  //về trang đang kí
  const click = () => {
    history.push('/registration');
  }

  // đang nhập với dữ liệu trên firebase
  const onFinish = (value) => {
    console.log(value);
    firebase.auth()
    .signInWithEmailAndPassword(value.email, value.password)
    .then(function () {
      console.log('đăng nhập thành công!');
      message.success('Đăng nhập thành công!',1)
      history.push('/infor');
      return true;
    })
    .catch(function (error) {
      if (error) {
        console.log(error.code, 'Email hoặc PassWord không hợp lệ!');
        message.success('Email hoặc PassWord không hợp lệ!',3)
        return false;
      }
    })
    let userEmail = firebase.auth().currentUser;
    if (userEmail) {
      console.log(userEmail.email);
    }
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