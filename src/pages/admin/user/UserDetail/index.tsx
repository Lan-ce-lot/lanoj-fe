/**
 * @FileName: index
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/26 22:43
 */
import React, {useEffect, useState} from "react";
import Page from "../../../../components/Page/Page";
import {useParams} from "react-router-dom";
import {
  Avatar,
  Badge,
  Button,
  Descriptions,
  Form,
  Input,
  message,
  PageHeader,
  Select,
  Skeleton,
  Space,
  Switch,
  Tag
} from "antd";
import {RoleToColorMap, UserStatusToColorMap} from "../../../../common/map";
import {UserRole, UserRoleObjectList, UserStatus} from "../../../../common/enumerations";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {getUserInfo, getUserList, IUser, resetUserPassword, updateUserInfo} from "../../../../api/admin/user";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT} from "../../../../config/config";
import {useForm} from "antd/es/form/Form";

//import styles from './index.module.scss'

interface IProps {

}

interface IState {

}

let _isMounted = false;
const InitUserInfo: IUser = {
  id: 1,
  username: 'lancel',
  email: 'email',
  avatar: 'a',
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'Normal',
  introduction: 'Hello LANOJ',
  role: {
    id: 1,
    name: 'Admin',
  }
}

const UserDetail: React.FC<IProps> = ({}) => {
  const {id} = useParams()
  const [loading, setLoading] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<IUser>(
    InitUserInfo
  )
  const fetchData = () => {
    setLoading(true);
    getUserInfo({id: Number(id)}).then((res) => {

      if (_isMounted) {
        // setRole(res.data.data.role.name)
        setUserInfo({...res.data.data, role: {...res.data.data.role}})
        setLoading(false)
      }
    });
  };
  useEffect(() => {
    _isMounted = true
    fetchData()
    return () => {
      _isMounted = false
    }
  }, [])

  const handleReset = () => {
    resetUserPassword({id: userInfo.id!}).then(res => {
      message.success(res.data.msg)
    })
  }
  const userRoleSelect = (
    <Select
      placeholder={'??????'}
      defaultValue={userInfo.role?.name}
      onChange={(value) => {
        setUserInfo({...userInfo, role: UserRoleObjectList.filter((item) => item.name === value)[0]})
      }}
    >
      {
        UserRoleObjectList.map(item => {
          return (
            <Select.Option key={item.id} value={item.name}>
              {item.name}
            </Select.Option>
          )
        })
      }
    </Select>
  )
  const handleSubmit = () => {
    const user: IUser = {
      ...userInfo,
      role:
        UserRoleObjectList.filter(item => {
          return item.name === userInfo.role?.name
        })[0]

    }
    updateUserInfo(user).then((res) => {
      message.success("????????????")
    })
  }

  return (
    <Page inner>
      {
        loading ? <Skeleton active/> :
          <Form
            onFinish={handleSubmit}
          >
            <Descriptions title="????????????" size={'middle'} bordered column={2}>
              <Descriptions.Item label="??????">
                <Avatar size={50} shape={"square"} src={userInfo.avatar}/>
              </Descriptions.Item>
              <Descriptions.Item label="?????????">{userInfo.username}</Descriptions.Item>
              <Descriptions.Item label="??????" span={2}>
                <Space size={18}>
                  <Switch
                    defaultChecked={userInfo.status === UserStatus.NORMAL}
                    onChange={(checked) => {
                      setUserInfo({...userInfo!, status: checked ? UserStatus.NORMAL : UserStatus.BANNED})
                    }}
                    checkedChildren={<CheckOutlined/>}
                    unCheckedChildren={<CloseOutlined/>}
                  />
                  <Badge status={UserStatusToColorMap[userInfo!.status]} text={userInfo?.status}/>
                </Space>


              </Descriptions.Item>
              <Descriptions.Item label="??????" span={2}>
                {userRoleSelect}
              </Descriptions.Item>
              <Descriptions.Item
                label="????????????">{moment(userInfo.createdAt).format(DEFAULT_DATE_TIME_FORMAT)}</Descriptions.Item>
              <Descriptions.Item
                label="????????????">{moment(userInfo.updatedAt).format(DEFAULT_DATE_TIME_FORMAT)}</Descriptions.Item>
              <Descriptions.Item label="????????????" span={2}>{userInfo.email}</Descriptions.Item>
              <Descriptions.Item label="????????????" span={2}>
                <Input.TextArea
                  onChange={(e) => {
                    setUserInfo({...userInfo, introduction: e.target.value})
                  }
                  }
                  defaultValue={userInfo.introduction}
                  // value={userInfo.introduction}
                  autoSize
                  maxLength={100}
                  showCount
                />
              </Descriptions.Item>
              <Descriptions.Item label="????????????" span={1}>
                <Space>
                  {/*<Input type={"password"} value={'111111'} disabled/>*/}
                  <Button onClick={handleReset}>??????</Button>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label={'????????????'} span={1}>
                <Button type={"primary"} onClick={handleSubmit
                }>??????</Button>
              </Descriptions.Item>
            </Descriptions>
          </Form>
      }
    </Page>
  )
}


export default UserDetail;
