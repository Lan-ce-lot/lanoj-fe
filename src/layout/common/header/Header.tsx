import React, {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import {
  Row
  , Col
  , Menu
  , Button
  , Modal, Avatar, Layout, Tag
} from "antd";
import {
  HomeOutlined
  , AppstoreOutlined
  , FileDoneOutlined
  , TrophyOutlined
  , StockOutlined
  , ReadOutlined, UsergroupAddOutlined, TeamOutlined
} from '@ant-design/icons';


import styles from './Header.module.scss'
import LoginForm from '../loginForm/LoginForm'
import Context from "../../../utils/createContext";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {userLogin} from '../../../store/actions'
import {delUserToken} from "../../../store/actions";
import {parseToken} from "../../../utils/jwt";
import Cookies from "js-cookie";
import {getUserInfo} from "../../../api/common/userInfo";
import Logo from "../../../components/Logo/Logo";
import {IUser} from "../../../api/admin/user";
import {commonMenuList} from "../../../router/commonMenuList";

const {SubMenu} = Menu

interface HeaderProps {
  style?: React.CSSProperties;
  className?: string;
  token?: string;
  onDelUserToken?: any;
}

const Header: React.FC<HeaderProps> = ({onDelUserToken, token}) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [user, setUser] = useState<IUser>()
  // const [userAvatar, setUserAvatar] = useState('https://joeschmoe.io/api/v1/random')
  // const [username, setUsername] = useState('lancel')
  const navigate = useNavigate()
  const showModal = () => {
    navigate('/login')
    // setVisible(true);
  };
  if (Cookies.get('token')) {
    console.log(parseToken(Cookies.get('token')!))
  }

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
    // onUserLogin(true)
  };
  useEffect(() => {
    if (Cookies.get('token')) {
      getUserInfo().then((res) => {
        const data = res.data.data
        console.log(data)
        setUser(data)
        // setUserAvatar(data.avatar)
        // setUsername(data.username)
      })
    }
  }, [])
  const rightContent = [
    <Menu key="user" mode="horizontal">
      <SubMenu
        key="head"
        title={
          <>
              <span style={{color: '#999', marginRight: 4}}>
                <span>欢迎</span>
              </span>
            <span style={{marginRight: 4}}>{user?.username}</span>
            <Tag color={"error"}>{user?.role?.name}</Tag>
            <Avatar style={{marginLeft: 8}} src={user?.avatar}/>
          </>
        }
      >
        <Menu.Item key="userCenter">
          <Link to={`/user/${user?.id}`}>
            <span>个人中心</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="userSetting">
          <Link to={`/setting/${user?.id}`}>
            <span>个人设置</span>
          </Link>
        </Menu.Item>
        {
          Cookies.get('token') &&
          (parseToken(Cookies.get('token')!).role === 'Root' ||
            parseToken(Cookies.get('token')!).role === 'Admin' ||
            parseToken(Cookies.get('token')!).role === 'Teacher'
          ) &&
          <Menu.Item key="admin">
            <Link to={'/admin'}>
              <span>管理后台</span>
            </Link>
          </Menu.Item>
        }
        <Menu.Item key="SignOut" onClick={() => onDelUserToken()}>
          <span>退出</span>
        </Menu.Item>
      </SubMenu>
    </Menu>,
  ]
  // 指尖跃动的换行符, 是我此生不变的信仰
  return (
    <Layout.Header style={{
      backgroundColor: '#fff',
    }}>
      <Row gutter={24}>
        <Col xs={20} sm={20} md={8} lg={7}>
          <Row gutter={24} justify={'start'}>
            <Col xs={24} sm={24} md={24} lg={24}>
              {/*<Link to={'/'}>*/}
              {/*  <Logo/>*/}
              {/*</Link>*/}

              <Link to={'/'}>
                <span className={styles.headerLog}><img alt="logo"
                  // src={'/svg/Penrose_triangle.svg'}
                                                        src={'/logo192.png'}
                />LANOJ</span></Link>
            </Col>
            {/*<Col xs={0} sm={0} md={0} lg={14}>*/}
            {/*  <span className={styles.headerText}>${'占位符'}</span>*/}
            {/*</Col>*/}
          </Row>
        </Col>
        <Col xs={0} sm={0} md={12} lg={12}>
          <Row gutter={24} justify={'space-between'}>
            <Col xs={0} sm={0} md={14} lg={24}>
              <Menu mode="horizontal"
              // menu={commonMenuList}
              >
                {/*<Menu.Item className="common-menu-item" key="/home" icon={<HomeOutlined/>}*/}
                {/*>*/}
                {/*  <Link to={'/home'}>*/}
                {/*    首页*/}
                {/*  </Link>*/}
                {/*</Menu.Item>*/}
                {/*<Menu.Item className="common-menu-item" key="problem" icon={<AppstoreOutlined/>}>*/}
                {/*  <Link to={'/problems'}>*/}
                {/*    题库*/}
                {/*  </Link>*/}
                {/*</Menu.Item>*/}
                {/*<Menu.Item className="common-menu-item" key="class" icon={<TeamOutlined/>}>*/}
                {/*  <Link to={'/class'}>*/}
                {/*    班级*/}
                {/*  </Link>*/}
                {/*</Menu.Item>*/}
                {/*<Menu.Item className="common-menu-item" key="contest" icon={<TrophyOutlined/>}>*/}
                {/*  <Link to={'/contest'}>*/}
                {/*    比赛*/}
                {/*  </Link>*/}
                {/*</Menu.Item>*/}
                {/*<Menu.Item className="common-menu-item" key="status" icon={<StockOutlined/>}>*/}
                {/*  <Link to={'/status'}>*/}
                {/*    状态*/}
                {/*  </Link>*/}
                {/*</Menu.Item>*/}
                {/*<Menu.Item*/}
                {/*  // disabled*/}
                {/*  className="common-menu-item" key="article" icon={<ReadOutlined/>}>*/}
                {/*  <Link to={'/article'}>*/}
                {/*    题解*/}
                {/*  </Link>*/}
                {/*</Menu.Item>*/}
              </Menu>
            </Col>
          </Row>
        </Col>
        <Col xs={4} sm={4} md={4} lg={5}>
          <Row justify={"end"}>
            <Col xs={12} sm={12} md={12} lg={24} className={styles.headRight}>
              {
                !token ?
                  <Button
                    // size="large"
                    type="primary"
                    // htmlType="submit"
                    onClick={showModal}
                    // shape="round"
                  >登录
                  </Button> : rightContent
              }
            </Col>
            <Modal
              // title={<h2 style={{textAlign: "center", color:"#16b8f3"}}>LANOJ</h2>}
              title={null}
              visible={visible}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
              destroyOnClose={true}
              footer={null}
              width={320}
            >
              <Context.Provider value={visible}>
                <LoginForm
                />
              </Context.Provider>
            </Modal>
          </Row>
        </Col>

      </Row>

    </Layout.Header>
  )
}

const mapStateToProps = (state: any) => {
  return {
    ...state.user,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onDelUserToken() {
      dispatch(delUserToken())
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
