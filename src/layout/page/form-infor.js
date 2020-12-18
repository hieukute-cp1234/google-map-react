import React from 'react'
import Layout from '../component/layout'
import { Row, Col, Input, Button, Form , Space} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function FormInfor() {
  const onFinish = values => {
    console.log('Received values of form:', values);
  };
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
                  {...layout}
                  name="basic"
                >
                  <Form.Item
                    label="Vĩ độ (Lat):"
                  >
                    <Input type="number" />
                  </Form.Item>
                  <Form.Item
                    label="Kinh độ (Lng):"
                  >
                    <Input type='number' />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col span={24} offset={6}>
                <p style={{ textAlign:'center', margin:'0px 0 10px -150px'}}>Nhập vào số lượng cây trong trại (nếu có)</p>
                <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                  <Form.List name=''>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(field => (
                          <Space key={field.key} style={{ display: 'flex', marginBottom: 8 , marginLeft:-7}} align="baseline">
                            <Form.Item
                             label='Tên cây:'
                            >
                              <Input placeholder="Tên cây" type='text'/>
                            </Form.Item>
                            <Form.Item
                              label='Số lượng:'
                            >
                              <Input placeholder="Số lượng" type='number' />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{width:'500px'}}>
                            Thêm cây
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col span={24} offset={6}>
              <p style={{ textAlign:'center', margin:'0px 0 10px -150px'}}>Nhập vào số lượng vật nuôi trong trại (nếu có)</p>
                <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                  <Form.List name=''>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(field => (
                          <Space key={field.key} style={{ display: 'flex', marginBottom: 8 , marginLeft:-7}} align="baseline">
                            <Form.Item
                             label='Tên vật nuôi:'
                            >
                              <Input placeholder="Tên cây" type='text'/>
                            </Form.Item>
                            <Form.Item
                              label='Số lượng:'
                            >
                              <Input placeholder="Số lượng" type='number' />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{width:'500px'}}>
                            Thêm vật nuôi
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form>
              </Col>
            </Row>
            <Button type='primary' htmlType='submit' style={{margin:'20px 0 0 350px'}}>Lưu thông tin</Button>
          </Col>
        </Row>
      </Layout>
    </>
  )
}

export default FormInfor;