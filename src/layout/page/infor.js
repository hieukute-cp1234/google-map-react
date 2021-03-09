import React, { useState, useEffect } from 'react'
import Layout from '../component/layout'
import { HomeFilled, DeleteFilled, EditFilled } from '@ant-design/icons'
import { Row, Col, Input, Form, Space, Collapse, InputNumber, Button } from 'antd'
import firebaseData from '../../service/firebaseAPI'
import firebase from '../../firebase/config'

const Product = (props) => {
  const [check, setCheck] = useState(true);

  const updateProduct = (index) => {
    setCheck(false);
    console.log(index);
  }

  const deleteProduct = (item) => {

  }

  const submit = (value) => {
    const db = firebase.firestore();
    db.collection('Farm').doc(props.farm).update({
      product:[
        { 
          name:value.name,
          amount: value.amount
        }
      ]
    })
    .then(function(){
      console.log('thanh cong')
    })
    .catch(function(e){
      console.log('that bai',e)
    })
    console.log(value);
  }

  return (
    <>
      {props.product.map((item, index) => (
        <Row>
          <Col span={12} offset={2} style={{ display: 'flex' }}>
            <HomeFilled style={{ fontSize: '16px' }} />
            {check ? (
              <>
                <p style={{
                  marginTop: '-2px',
                  marginLeft: '20px'
                }} >{item.name}</p>
                <br />
                <p style={{
                  marginTop: '-2px',
                  marginLeft: '20px'
                }}>{item.amount}</p>
              </>
            ) : (
              <Form onFinish={submit}>
                <Form.Item  name="name">
                  <Input
                    style={{
                      backgroundColor: '#FAFAFA',
                      border: 'none',
                      marginTop: '-5px',
                      marginLeft: '10px'
                    }}
                    defaultValue={item.name}
                  />
                </Form.Item>
                <Form.Item  name="amount">
                  <InputNumber
                    style={{
                      backgroundColor: '#FAFAFA',
                      border: 'none',
                      marginTop: '-5px',
                      marginLeft: '10px'
                    }}
                    defaultValue={item.amount}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                  >
                    Sửa
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Col>
          <Col span={6} offset={2}>
            <EditFilled
              title='Sửa'
              onClick={() => updateProduct(props.product.name)}
            />
            <DeleteFilled
              style={{ marginLeft: '10px' }}
              title='Xóa'
              onClick={() => deleteProduct(item)}
            />
          </Col>
        </Row>
      )
      )}
    </>
  )
}

const Infor = () => {

  const [check1, setCheck1] = useState(true);
  const [data, setData] = useState([]);

  const { Panel } = Collapse;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await firebaseData.fetchData();
        console.log(response)
        setData(response)
      } catch (error) {
        console.log('loi', error)
      }
    }
    fetchData();
  }, [])

  const click1 = (index) => {
    setCheck1(false);
    console.log(index);
  }

  const submit = (e) => {
    console.log(e);
  }

  const [icon, setIcon] = useState(<DeleteFilled />)
  return (
    <Layout>
      <Row>
        <Col span={12} offset={6}>
          <h2 style={{ textAlign: 'center' }}>Thông tin trang trại của bạn</h2>
          <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <HomeFilled rotate={isActive ? 360 : 0} />}
            className="site-collapse-custom-collapse"
          >
            {data.map((item, index) => {
              const daleteItemProduct = () => {

              }

              const deleteItemId = (e) => {
                console.log(item.id)
                const db = firebase.firestore();
                db.collection('Farm').doc(item.id).delete()
                  .then(function () {
                    console.log('xoa thanh cong')
                  })
                  .catch(function (error) {
                    console.log('xoa that bai', error)
                  });
                data.splice(index, 1)
                setData([...data])
              }
              return (
                <Panel
                  Panel header={`Trang trại ${item.id}`}
                  extra={<DeleteFilled
                    title='Xóa'
                    onClick={() => deleteItemId(item)} />}
                  key={index}
                  className="site-collapse-custom-panel"
                >
                  <Form>
                    <Form.Item key={index} sytle={{ display: 'flex' }}>
                      <Row>
                        <Col span={12} offset={2} style={{ display: 'flex' }}>
                          <HomeFilled style={{ fontSize: '16px' }} />
                          {check1 ? (
                            <p style={{
                              marginTop: '-2px',
                              marginLeft: '20px'
                            }}>Diện tích: {item.m2} m2</p>
                          ) : (
                            <Form>
                              <Form.Item>
                                <Input
                                  style={{
                                    backgroundColor: '#f0f2f5',
                                    border: 'none',
                                    marginTop: '-5px',
                                    marginLeft: '10px'
                                  }}
                                  defaultValue={item.m2}
                                />
                              </Form.Item>
                            </Form>
                          )}
                        </Col>
                        <Col span={6} offset={2}>
                          <EditFilled
                            title='Sửa'
                            onClick={() => click1(item.name)}
                          />
                          <DeleteFilled
                            style={{ marginLeft: '10px' }}
                            title='Xóa'
                            onClick={() => deleteItemId(item)}
                          />
                        </Col>
                      </Row>
                    </Form.Item>
                    <Form.Item>
                      <Product product={item.product} check1={check1} farm={item.id} />
                    </Form.Item>
                  </Form>
                </Panel>
              )
            })}
          </Collapse>
        </Col>
      </Row>
    </Layout>
  )
}

export default React.memo(Infor);