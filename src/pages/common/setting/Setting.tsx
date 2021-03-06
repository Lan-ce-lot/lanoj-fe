/**
 * @FileName: Setting
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/8 21:21
 */
import React, {useEffect, useState} from "react";
import {Avatar, Button, Col, Collapse, Form, Input, InputNumber, message, Row, Tabs} from "antd";
import UploadAvatar from "./components/UploadAvatar";
import MarkDownEditor from "./components/MarkDownEditor";
import {Typography} from 'antd';
import {CalendarOutlined, CaretRightOutlined, ProfileOutlined, SettingOutlined} from "@ant-design/icons";
import Page from "../../../components/Page/Page";
import TextArea from "antd/es/input/TextArea";
import {getUserInfo, IUser} from "../../../api/admin/user";
import store from "../../../store";
import {Dispatch} from "redux";
import {changeLoading, delUserToken} from "../../../store/actions";
import {connect} from "react-redux";
import {updateUserEmail, updateUserPassword, updateUserProfile} from "../../../api/common/setting";
import {validateMessages} from "../../../config/config";

const {Title} = Typography;
const {Panel} = Collapse;
const {TabPane} = Tabs;

//import styles from './Setting.module.scss'

interface IProps {
  loading?: boolean;
  setLoading?: any;
}

interface IState {

}

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};
const Setting: React.FC<IProps> = ({}) => {

  const id = store.getState().user.id
  const [user, setUser] = useState<IUser>();
  const [form] = Form.useForm()
  const [passwordForm] = Form.useForm()
  const [emailForm] = Form.useForm()
  const fetchData = () => {
    getUserInfo({}).then((res) => {
      const {data} = res.data
      console.log(data)
      form.setFieldsValue(data)
      emailForm.setFieldsValue({'oldEmail': data.email})
      setUser(data)
    })
  }

  useEffect(() => {
    fetchData()

  }, [])
  const handleProfileFinish = () => {
    const data = form.getFieldsValue(true)
    updateUserProfile(data).then(res => {
      message.success(res.data.msg)
    })
  }

  const handlePasswordFinish = () => {

    const data = passwordForm.getFieldsValue(true)
    updateUserPassword(data).then(res => {
      message.success(res.data.msg)

    })
  }

  const handleEmailFinish = () => {

    const data = emailForm.getFieldsValue(true)
    updateUserEmail(data).then(res => {
      message.success(res.data.msg)
      fetchData()
    })
  }
  const handlePasswordValidator = (rule: any, val: any, callback: any) => {

    console.log(val)

    return Promise.reject("???????????????????????????")
  }
  return (<>
    <Page inner>
      <Tabs
        type="card"
      >
        <TabPane tab={<span><ProfileOutlined />????????????</span>} key="profile">
          <Form
            validateMessages={validateMessages}
            layout={'vertical'}
            onFinish={handleProfileFinish}
            form={form}
          >

            <Row gutter={[24, 4]}>
              <Col lg={12}>
                <Form.Item
                  rules={[{required: true},]}
                  name={'username'}
                  label={'?????????'}>
                  <Input type="text"/>
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  name={'realName'}
                  label={'??????'}>
                  <Input type="text"/>
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  name={'phone'}
                  label={'?????????'}
                  rules={[{pattern:/^1[3|4|5|7|8|9]\d{9}$/, message:'??????${label}????????????????????????!'}]}
                >

                  <Input />
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  name={'number'}
                  label={'??????/??????'}>
                  <Input type="text"/>
                </Form.Item>
              </Col>
              <Col lg={24}>
                <Form.Item label={'????????????'}>
                  <UploadAvatar
                    avatar={user?.avatar}
                  />
                </Form.Item>
              </Col>
              <Col lg={24}>
                <Form.Item
                  name={'introduction'}
                  label={'????????????'}>
                  <TextArea
                    placeholder="??????????????????"
                    autoSize={{minRows: 4, maxRows: 6}}
                  />
                </Form.Item>
              </Col>
              <Col lg={24}>
                <Form.Item>
                  <Button type={"primary"} htmlType={"submit"}>
                    ??????
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>


        </TabPane>
        <TabPane tab={<span><SettingOutlined />????????????</span>} key="Account">
          <Row gutter={24}>
            <Col lg={12}>
              <Title level={4}>????????????</Title>
              <Form
                onFinish={handlePasswordFinish}
                form={passwordForm}
                {...layout} layout={'vertical'} name="nest-messages" validateMessages={validateMessages}>
                <Form.Item name={"oldPassword"} label="????????????" rules={[{required: true}]}>
                  <Input type={"password"}/>
                </Form.Item>
                <Form.Item name={'password'} label="?????????"
                           rules={[{
                             required: true
                           }]}
                >
                  <Input type={"password"}/>
                </Form.Item>
                <Form.Item
                  hasFeedback
                  name={"confirmPassword"} label="????????????" rules={[
                  {required: true},
                  ({getFieldValue}: any) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject("???????????????????????????")
                    }
                  })

                ]}>
                  <Input type={"password"}/>
                </Form.Item>
                <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                  <Button type="primary" htmlType="submit">
                    ????????????
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col lg={12}>
              <Title level={4}>????????????</Title>
              <Form
                onFinish={handleEmailFinish}
                form={emailForm}
                {...layout} layout={'vertical'} name="nest-messages" validateMessages={validateMessages}>
                <Form.Item name={"password"} label="????????????" rules={[{required: true}]}
                >
                  <Input type={"password"}/>
                </Form.Item>
                <Form.Item name={'oldEmail'} label="?????????" rules={[{type: 'email'}]}>
                  <Input disabled/>
                </Form.Item>
                <Form.Item name={'email'} label="?????????" rules={[{type: 'email'},
                  {required: true}
                ]}

                           hasFeedback
                >
                  <Input/>
                </Form.Item>
                <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                  <Button type="primary" htmlType="submit">
                    ????????????
                  </Button>
                </Form.Item>
              </Form>
            </Col>

          </Row>
        </TabPane>
        <TabPane
          disabled
          closable={true}
        >
          <MarkDownEditor/>
        </TabPane>
      </Tabs>
    </Page>
  </>)
}


const mapStateToProps = (state: any) => {
  return {
    ...state.app,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setLoading(loading: boolean) {
      dispatch(changeLoading(loading))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Setting);
