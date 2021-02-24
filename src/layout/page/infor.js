import React, { useState } from 'react'
import Layout from '../component/layout'
import { HomeFilled, DeleteFilled, EditFilled } from '@ant-design/icons'
import { Row, Col, Input, Form, Space } from 'antd'
import data from '../../data.json'


export const Infor = () => {

  const [check1, setCheck1] = useState(true);
  const [school, setSchool] = useState(data);

  const click1 = (index) => {
    setCheck1(false);
    console.log(index);
  }

  const submit = (e) => {
    console.log(e);
  }
  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <h2 style={{ textAlign: 'center' }}>Thông tin trang trại của bạn</h2>
          {school.map((item, index) => {
            const deleteItem = (e) => {
              school.splice(index, 1)
              setSchool([...school])
            }
            return (
              <Form>
                <Form.Item key={index} sytle={{ display: 'flex' }}>
                  <Row>
                    <Col span={12} offset={4} style={{ display: 'flex' }}>
                      <HomeFilled style={{ fontSize: '16px' }} />
                      {check1 ? (
                        <p style={{
                          marginTop: '-2px',
                          marginLeft: '20px'
                        }}>{item.name}</p>
                      ) : (
                          <Input
                            onSubmit={submit}
                            style={{
                              backgroundColor: '#f0f2f5',
                              border: 'none',
                              marginTop: '-5px',
                              marginLeft: '10px'
                            }}
                            defaultValue={item.name}
                          />
                        )}
                    </Col>
                    <Col span={6} offset={2}>
                      <EditFilled
                        title='Sửa'
                        onClick={()=>click1(item.name)}
                      />
                      <DeleteFilled
                        style={{ marginLeft: '10px' }}
                        title='Xóa'
                        onClick={() => deleteItem(item)}
                      />
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            )
          })}
        </Col>
      </Row>
    </>
  )
}

function AppInfor() {
  const [check, setCheck] = useState(true);
  const [infor, setInfor] = useState(null);
  return (
    <Layout>
      {check ? infor : null}
      <Infor />
    </Layout>
  )
}

export default React.memo(AppInfor);