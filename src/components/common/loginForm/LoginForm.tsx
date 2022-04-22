/**
 *
 *
 */

import React, {useContext, useEffect, useState} from 'react'
import 'antd/dist/antd.css'
import { useNavigate } from 'react-router-dom'
import styles from './LoginForm.module.scss'
import {Card, Form, Input, Button, Spin, Row, Col, Image} from "antd";
import Context from "../../../utils/createContext";
// import './Login.css'
import {
  UserOutlined,
  LockOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import {getCheckCodeInfo} from "../../../api/checkCode";

interface LoginFormProps {
  visible?: boolean;
  onConfirm?: (val: any) => void;
  validateRequired?: boolean;
  checkCode?: string;
  onCheckCodeClick?: () => void;
  className?: string;
}

const LoginForm: React.FunctionComponent<LoginFormProps> = (props) => {
  // const [userName, setUserName] = useState('')
  // const [password, setPassword] = useState('')
  const [isLoading, setInLoading] = useState(false)
  const [checkCode, setCheckCode] = useState('')
  let navigate = useNavigate();
  // 登录按钮被按下
  const onLoginConfirmed = (values: any) => {
    setInLoading(true)
    setTimeout(() => {
      setInLoading(false)
      // navigate("/");
    }, 1000)

  }

  // 获取验证码信息
  const getCheckCode = () => {
    getCheckCodeInfo().then(res => {
      let checkCode: string = res.data.data.image
      if (res.data.status !== 200) {
        checkCode = "data:image/png;base64,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"
      }
      setCheckCode(checkCode)
      // setCheckCodeInfo(info)
    }).catch(err => {
      let checkCode: string = "data:image/png;base64,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"
      setCheckCode(checkCode)
    })
  }
  // 验证码被按下
  const onCheckCodeClick = () => {
    getCheckCode();
  }
  useEffect(() => {
    getCheckCode()
  }, [])
  return (
    <Spin tip="Loading..." spinning={isLoading}>
      <h2 className={styles.loginTitle}>LANOJ</h2>
        <Form
          onFinish={onLoginConfirmed}
        >
          <Form.Item
            name="username"
            rules={[{required: true, message: '请输入用户名!'}]}
            hasFeedback
          >
            <Input
              id="username"
              // size="large"
              placeholder="用户名"
              prefix={<UserOutlined/>}
              style={{color: 'rgb(0,0,0,.25'}}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{required: true, message: '请输入密码!'}]}
            hasFeedback
          >
            <Input.Password
              id="password"
              // size="large"
              placeholder="密码"
              prefix={<LockOutlined/>}
              style={{color: 'rgb(0,0,0,.25'}}
            />
          </Form.Item>
          {
            <Row>
              <Col span={11}>
                <Form.Item
                  // className={style.check_code_form_item}
                  rules={[{required: true, message: '请输入验证码!'}]}
                  name="checkCodeContent"
                  hasFeedback
                >
                  <Input
                    id="checkCode"
                    // size="large"
                    prefix={<CheckCircleOutlined/>}
                    style={{color: 'rgb(0,0,0,.25'}}
                    placeholder="验证码"
                  />
                </Form.Item>
              </Col>
              <Col span={11}>
                {
                  // <Image
                  //   src={props.checkCode}
                  //   alt={'checkCode'}
                  // />
                  <img
                    src={checkCode}
                    alt={'checkCode'}
                    style={{marginLeft:10}}
                    onClick={() => onCheckCodeClick()}
                  />
                }
              </Col>
            </Row>
          }
          <Form.Item style={{marginBottom:0}}>
            <Button
              // size="large"
              type="primary"
              htmlType="submit"
              // shape="round"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
    </Spin>
  )
}

export default LoginForm
