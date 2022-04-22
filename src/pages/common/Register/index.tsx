/**
 * @FileName: Register
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/13 21:23
 */
import React, {Fragment, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button, Col, Form, Input, message, Row} from "antd";
import {getCheckCodeInfo} from "../../../api/checkCode";
import {CheckCircleOutlined, LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import GlobalFooter from "../../../layout/common/footer/Footer";
import {Dispatch} from "redux";
import {setUserToken} from "../../../store/actions";
import {connect} from "react-redux";
import styles from './index.module.scss'
import {userSubmitRegister} from "../../../api/common/register";
import {userSubmitLogin} from "../../../api/common/login";
import {log} from "util";

interface IProps {
  token?: string
  onSetUserToken?: any
}

interface IState {

}

const Register: React.FC<IProps> = ({onSetUserToken}) => {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [checkCode, setCheckCode] = useState('')
  const [checkCodeKey, setCheckCodeKey] = useState('')
  // 获取验证码信息
  const getCheckCode = () => {
    getCheckCodeInfo().then(res => {
      let checkCode: string = res.data.data.image
      setCheckCode(checkCode)
      setCheckCodeKey(res.data.data.key)
      console.log(res.data.data.key)
    })
  }
  // 验证码被按下
  const onCheckCodeClick = () => {
    getCheckCode();
  }
  useEffect(() => {
    getCheckCode()
    // alert(isUserLogin)
  }, [])
  const handleOk = (values: any) => {
    // console.log(checkCodeKey)
    userSubmitRegister({...form.getFieldsValue(true), checkCodeKey}).then(
      (res) => {
        const {data} = res;
        if (data.code === 200) {
          message.success(data.msg);
          userSubmitLogin({...form.getFieldsValue(['username', 'password', 'email', 'checkCode']),
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

  return (<>
    <Fragment>
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt="logo" src={'./hui.png'}/>
          <span>{'LANOJ'}</span>
        </div>
        <Form
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

                     ]}
                     hasFeedback
          >
            <Input
              prefix={<MailOutlined />}
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
          <Form.Item name="confirmPassword" rules={[{required: true, message: '请输入确认密码'}]} hasFeedback>
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
                  <Link to={'/login'}
                  >已有账号?立即登录</Link>
                </span>
            </p>
          </Row>
        </Form>
      </div>
      <div className={styles.footer}>
        <GlobalFooter/>
      </div>
    </Fragment>
  </>)
}


const mapStateToProps = (state: any) => {
  return {
    ...state.user,
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
export default connect(mapStateToProps, mapDispatchToProps)(Register);
