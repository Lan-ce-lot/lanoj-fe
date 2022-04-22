/**
 * @FileName: Login
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/13 15:31
 */
import React, {Fragment, useEffect, useState} from "react";
import {Button, Col, Form, Input, message, Row} from "antd";
import GlobalFooter from "../../../components/common/footer/Footer";

import styles from './index.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {CheckCircleOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import {getCheckCodeInfo, userSubmitLogin} from "../../../api/common/login";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {userLogin, setUserToken} from "../../../store/actions";

interface IProps {
  token?: string;
  onSetUserToken?: any;
  loading?:boolean;
}

interface IState {

}

const Login: React.FC<IProps> = ({token, onSetUserToken, loading}) => {

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
    })
  }
  // 验证码被按下
  const onCheckCodeClick = () => {
    getCheckCode();
  }
  useEffect(() => {
    getCheckCode()
    // alert(isUserLogin)
    if (token) {
      navigate('/home')
    }
  }, [])
  const handleOk = (values: any) => {
    // form.setFieldsValue
    userSubmitLogin({...form.getFieldsValue(true), checkCodeKey}).then(
      (res) => {
        const {data} = res;
        if (data.code === 200) {
          message.success(data.msg);
          onSetUserToken(data.data)
          navigate('/home')
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
              loading={loading}
            >
              登录
            </Button>

            <p>
                <span className="margin-right">
                  <Link to={'/register'}
                  >没有账号?立即注册</Link>
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
