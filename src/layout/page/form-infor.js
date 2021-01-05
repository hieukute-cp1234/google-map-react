import React from 'react'
import Layout from '../component/layout'
import { Row, Col, Input, Button, Form, Space, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import firebase from '../../firebase/config'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function FormInfor() {

  let db = firebase.firestore();

  const onFinishProduct = value => {
    console.log(value.product[0].name);
    for (let i = 0; i < value.product.length; i++) {
      db.collection('Product').doc(`${value.product[i].name}`).set({
        name: value.product[i].name,
        amount: value.product[i].amount
      })
        .then(function () {
          console.log('ghi dữ liệu thành công!')
        })
        .catch(function (e) {
          console.log('ghi dữ liệu thất bại!', e)
        })
    }
  }

  const onFinishLatLng = values => {
    console.log(values)
    db.collection(values.name)
      .doc(values.nameNumber).set({
        lat: values.lat,
        lng: values.lng
      })
      // .doc('01').set({
      //   name: values.product[0].name,
      //   amuount: values.prodcut[0].amuount
      // })
      .then(function () {
        console.log('ghi du lieu thanh cong')
      })
      .catch(function (e) {
        console.log('ghi that bai', e)
      })
    console.log(db);
    message.success('Lưu thành công', 2)
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
                  onFinish={onFinishLatLng}
                  {...layout}
                  name="basic"
                  initialValues={{ remember: true }}
                >
                  <Form.Item
                    label="Tên trang trại"
                    name="name"
                    rules={[{ required: true, message: 'Hãy nhập tên trang trại!' }]}
                  >
                    <Input type="text" />
                  </Form.Item>
                  <Form.Item
                    label="Cơ sở"
                    name="nameNumber"
                    rules={[{ required: true, message: 'Hãy nhập tên trang trại!' }]}
                  >
                    <Input type="text" />
                  </Form.Item>
                  <Form.Item
                    label="Vĩ độ (Lat):"
                    name="lat"
                    rules={[{ required: true, message: 'Hãy nhập vào vĩ độ!' }]}
                  >
                    <Input type="number" />
                  </Form.Item>
                  <Form.Item
                    label="Kinh độ (Lng):"
                    name="lng"
                    rules={[{ required: true, message: 'Hãy nhập vào kinh độ!' }]}
                  >
                    <Input type='number' />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ margin: '20px 0 0 350px' }}>
                      Lưu tọa độ
                    </Button>
                  </Form.Item>
                  {/* <Form.List name='product'>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(field => (
                          <Space key={field.key} style={{ display: 'flex', marginBottom: 8, marginLeft: -7 }} align="baseline">
                            <Form.Item
                              label='Cây/Con:'
                              {...field}
                              name={[field.name, 'name']}
                              fieldKey={[field.fieldKey, 'name']}
                              rules={[{ required: true, message: 'Nhập vào tên cây/con!' }]}
                            >
                              <Input placeholder="Cây/Con" type='text' />
                            </Form.Item>
                            <Form.Item
                              label='Số lượng:'
                              {...field}
                              name={[field.name, 'amount']}
                              fieldKey={[field.fieldKey, 'amount']}
                              rules={[{ required: true, message: 'Nhập vào số lượng!' }]}
                            >
                              <Input placeholder="Số lượng" type='number' />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ width: '500px' }}>
                            Thêm cây/con
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List> */}
                </Form>
              </Col>
            </Row>
            <Row>
              <Col span={24} offset={6}>
                <p style={{ textAlign: 'center', margin: '0px 0 10px -150px' }}>Nhập vào số lượng cây hoặc con trong trại</p>
                <Form name="dynamic_form_nest_item" onFinish={onFinishProduct} autoComplete="off">
                  <Form.List name='product'>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(field => (
                          <Space key={field.key} style={{ display: 'flex', marginBottom: 8, marginLeft: -7 }} align="baseline">
                            <Form.Item
                              label='Cây/Con:'
                              {...field}
                              name={[field.name, 'name']}
                              fieldKey={[field.fieldKey, 'name']}
                              rules={[{ required: true, message: 'Nhập vào tên cây/con!' }]}
                            >
                              <Input placeholder="Cây/Con" type='text' />
                            </Form.Item>
                            <Form.Item
                              label='Số lượng:'
                              {...field}
                              name={[field.name, 'amount']}
                              fieldKey={[field.fieldKey, 'amount']}
                              rules={[{ required: true, message: 'Nhập vào số lượng!' }]}
                            >
                              <Input placeholder="Số lượng" type='number' />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ width: '500px' }}>
                            Thêm cây/con
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  <Form.Item>
                    <Button type='primary' htmlType='submit' style={{ margin: '20px 0 0 190px' }}>
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