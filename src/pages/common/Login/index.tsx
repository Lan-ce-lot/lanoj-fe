/**
 * @FileName: Login
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/13 15:31
 */
import React, {Fragment, useEffect, useState} from "react";
import {Image, Button, Col, Form, Input, message, Row} from "antd";
import GlobalFooter from "../../../layout/common/footer/Footer";

import styles from './index.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {CheckCircleOutlined, LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import {getCheckCodeInfo, userSubmitLogin} from "../../../api/common/login";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {userLogin, setUserToken} from "../../../store/actions";
// @ts-ignore
import Lottie from 'react-lottie';
import * as animationData from './Blogging.json'
import {userSubmitRegister} from "../../../api/common/register";
import {validateMessages} from "../../../config/config";

interface IProps {
  token?: string;
  onSetUserToken?: any;
  loading?: boolean;
}

interface IState {

}

const Login: React.FC<IProps> = ({token, onSetUserToken, loading}) => {

  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [checkCode, setCheckCode] = useState('')
  const [checkCodeKey, setCheckCodeKey] = useState(''),
    [status, setStatus] = useState<boolean>(true)// true:login, false:register
  // 获取验证码信息

  const getCheckCode = () => {
    getCheckCodeInfo().then(res => {
      let checkCode: string = res.data.data.image
      setCheckCode(checkCode)
      setCheckCodeKey(res.data.data.key)
    })
  }
  // 验证码被按下
  const onCheckCodeClick = () => {
    getCheckCode();
  }
  useEffect(() => {
    // setTimeout(() => getCheckCode(), 5000)
    getCheckCode()
    form.resetFields()
    if (token) {
      navigate('/home')
    }
  }, [status])
  const handleOk = (values: any) => {
    // form.setFieldsValue
    if (status) {
      userSubmitLogin({...form.getFieldsValue(true), checkCodeKey}).then(
        (res) => {
          const {data} = res;
          // getCheckCode()
          if (data.code === 200) {
            message.success(data.msg);
            onSetUserToken(data.data)
            navigate('/home')
          } else {
            message.error(data.msg);
          }
        }
      )
    } else {
      userSubmitRegister({...form.getFieldsValue(true), checkCodeKey}).then(
        (res) => {
          const {data} = res;
          // getCheckCode()
          if (data.code === 200) {
            message.success(data.msg);
            userSubmitLogin({
              ...form.getFieldsValue(['username', 'password', 'email', 'checkCode']),
              checkCodeKey
            }).then(
              res => {
                onSetUserToken(res.data.data)
                navigate('/home')
              }
            )
          } else {
            message.error(data.msg);
          }
        }
      )
    }

  }

  return (<>


    <div className={styles.bigContent}>
      <div className={styles.formContent}>
        <div className={styles.right}>

          <Lottie options={
            {
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }
          }
                  height={280}
                  width={350}
          />
        </div>

        <div className={styles.form}>

          <div className={styles.logo}>
            <img alt="logo" src={'/logo.svg'}/>
            <span>{'LANOJ在线评测系统'}</span>
          </div>
          {
            status ?
              <Form
                validateMessages={validateMessages}
                form={form}
                onFinish={handleOk}
              >
                <Form.Item name="username"
                           rules={[{required: true, message: '请输入用户名'}]}
                           hasFeedback
                >
                  <Input
                    prefix={<UserOutlined/>}
                    placeholder={`用户名`}
                    style={{color: 'rgb(0,0,0,.25'}}
                  />
                </Form.Item>

                <Form.Item name="password" rules={[{required: true, message: '请输入密码'}]} hasFeedback>
                  <Input type='password'
                         style={{color: 'rgb(0,0,0,.25'}}
                         prefix={<LockOutlined/>}
                         placeholder={`密码`}/>
                </Form.Item>
                {
                  <Row>
                    <Col span={11}>
                      <Form.Item
                        rules={[{required: true, message: '请输入验证码!'}]}
                        name="checkCode"
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
                      <Image
                        preview={false}
                        placeholder
                        src={checkCode}
                        alt={'checkCode'}
                        style={{marginLeft: 10}}
                        onClick={() => onCheckCodeClick()}/>
                    </Col>
                  </Row>
                }
                <Row>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                  >
                    登录
                  </Button>

                  <p>
                <span className="margin-right">
                  <a
                    // href=""
                    onClick={() => {
                      setStatus((v) => !v)
                    }}
                  >
                    没有账号?立即注册
                  </a>
                  {/*<Link to={'/register'}*/}
                  {/*>没有账号?立即注册</Link>*/}
                </span>
                  </p>
                </Row>
              </Form>
              :
              <Form
                validateMessages={validateMessages}
                form={form}
                onFinish={handleOk}
              >
                <Form.Item name="username"
                           rules={[{required: true, message: '请输入用户名'}]}
                           hasFeedback
                >
                  <Input
                    prefix={<UserOutlined/>}
                    placeholder={`用户名`}
                    style={{color: 'rgb(0,0,0,.25'}}
                  />
                </Form.Item>

                <Form.Item name="email"
                           rules={[
                             {required: true, message: '请输入邮箱'},
                             {type: 'email'}
                           ]}
                           hasFeedback
                >
                  <Input
                    prefix={<MailOutlined/>}
                    placeholder={`邮箱`}
                    style={{color: 'rgb(0,0,0,.25'}}
                  />
                </Form.Item>
                <Form.Item name="password" rules={[{required: true, message: '请输入密码'}]} hasFeedback>
                  <Input type='password'
                         style={{color: 'rgb(0,0,0,.25'}}
                         prefix={<LockOutlined/>}
                         placeholder={`密码`}/>
                </Form.Item>
                <Form.Item name="confirmPassword" rules={[{required: true, message: '请输入确认密码'},
                  ({getFieldValue}: any) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject("两次密码输入不一致")
                    }
                  })

                ]} hasFeedback>
                  <Input type='password'
                         style={{color: 'rgb(0,0,0,.25'}}
                         prefix={<LockOutlined/>}
                         placeholder={`确认密码`}/>
                </Form.Item>
                {
                  <Row>
                    <Col span={11}>
                      <Form.Item
                        rules={[{required: true, message: '请输入验证码!'}]}
                        name="checkCode"
                        hasFeedback
                      >
                        <Input
                          id="checkCode"
                          prefix={<CheckCircleOutlined/>}
                          style={{color: 'rgb(0,0,0,.25'}}
                          placeholder="验证码"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      {
                        <img
                          src={checkCode}
                          alt={'checkCode'}
                          style={{marginLeft: 10}}
                          onClick={() => onCheckCodeClick()}
                        />
                      }
                    </Col>
                  </Row>
                }
                <Row>
                  <Button
                    type="primary"
                    htmlType="submit"
                  >
                    <span>注册</span>
                  </Button>

                  <p>
                <span className="margin-right">
                                    <a
                                      // href=""
                                      onClick={() => {
                                        setStatus((v) => !v)
                                      }}
                                    >
                    已有账号?立即登录
                  </a>
                  {/*<Link to={'/login'}*/}
                  {/*>已有账号?立即登录</Link>*/}
                </span>
                  </p>
                </Row>
              </Form>
          }


        </div>

      </div>

      <div className={styles.footer}>
        <GlobalFooter/>
      </div>
    </div>
  </>)
}


const mapStateToProps = (state: any) => {
  return {
    ...state.user,
    ...state.app
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSetUserToken(token: string) {


      localStorage.setItem('login_token', token)
      dispatch(setUserToken(token))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
