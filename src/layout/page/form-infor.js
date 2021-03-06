import React, { useState,useRef } from 'react'
import firebase from '../../firebase/config'
import Layout from '../component/layout'
import { Row, Col, Input, InputNumber, Button, Form, Space, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { FormInstance } from 'antd/lib/form'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function FormInfor() {
  const formRef = useRef(<FormInstance/>);

  let db = firebase.firestore();

  // data fake k dung
  var docData = {
    stringExample: "Hello world!",
    booleanExample: true,
    numberExample: 3.14159265,
    dateExample: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),
    arrayExample: [5, true, { name: 'hieu' }],
    nullExample: null,
    objectExample: {
      a: 5,
      b: {
        nested: "foo"
      }
    }
  };

  //luu thong tin vao firabase
  const onFinish = values => {
    console.log(values)
    db.collection('Farm')
      .doc(values.id).set(
        {
          lat: values.lat,
          lng: values.lng,
          product: values.product,
          m2: values.m2,
        }
      )
      .then(function () {
        console.log('ghi du lieu thanh cong');
        message.success('Lưu thành công', 2);
      })
      .catch(function (e) {
        console.log('ghi that bai', e);
        message.success('Lưu thất bại',2);
      })
    console.log(db);
    formRef.current.resetFields();
  }

  return (
    <>
      <Layout>
        <Row>
          <Col span={12} offset={4}>
            <h1 style={{ textAlign: 'center', margin: '10px 0px 10px 150px' }}>Nhập thông tin trang trại</h1>
            <Row>
              <Col span={24}>
                <p style={{ textAlign: 'center', margin: '10px 0 10px 150px' }}>Nhập vào vị trí trại của bạn</p>
                <Form
                  ref={formRef}
                  onFinish={onFinish}
                  {...layout}
                  name="basic"
                  initialValues={{ remember: true }}
                >
                  <Form.Item
                    label="Tên cơ sở"
                    name="id"
                    rules={[{ required: true, message: 'Hãy nhập tên trang trại!' }]}
                  >
                    <Input type="text" />
                  </Form.Item>
                  <Form.Item
                    label="Diện tích"
                    name="m2"
                  >
                    <InputNumber style={{ width: '417px' }} />
                  </Form.Item>
                  <Form.Item
                    label="Vĩ độ (Lat):"
                    name="lat"
                    rules={[{ required: true, message: 'Hãy nhập vào vĩ độ!' }]}
                  >
                    <InputNumber style={{ width: '417px' }} />
                  </Form.Item>
                  <Form.Item
                    label="Kinh độ (Lng):"
                    name="lng"
                    rules={[{ required: true, message: 'Hãy nhập vào kinh độ!' }]}
                  >
                    <InputNumber style={{ width: '417px' }} />
                  </Form.Item>
                  <Form.Item>
                    <Row>
                      <Col span={24} offset={8}>
                        <p style={{ textAlign: 'center', margin: '10px 0px 10px 80px' }}>Nhập nông sản</p>
                        <Form.List name='product'>
                          {(fields, { add, remove }) => (
                            <>
                              {fields.map(field => (
                                <Space key={field.key} style={{width:'500px', display: 'flex', marginBottom: 8, marginLeft: -7 }} align="baseline">
                                  <Form.Item
                                    label='Cây/Con:'
                                    {...field}
                                    name={[field.name, 'name']}
                                    fieldKey={[field.fieldKey, 'name']}
                                    rules={[{ required: true, message: 'Nhập vào tên cây/con!' }]}
                                  >
                                    <Input style={{ width:'145px'}} placeholder="Cây/Con" type='text' />
                                  </Form.Item>
                                  <Form.Item
                                    label='Số lượng:'
                                    {...field}
                                    name={[field.name, 'amount']}
                                    fieldKey={[field.fieldKey, 'amount']}
                                    rules={[{ required: true, message: 'Nhập vào số lượng!' }]}
                                  >
                                    <InputNumber style={{ width:'145px'}} placeholder="Số lượng" type='number' />
                                  </Form.Item>
                                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                                </Space>
                              ))}
                              <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ width: '500px' }}>
                                  Thêm nông sản
                                </Button>
                              </Form.Item>
                            </>
                          )}
                        </Form.List>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ margin: '20px 0 0 350px' }}>
                      Lưu thông tin
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout>
    </>
  )
}

export default React.memo(FormInfor);