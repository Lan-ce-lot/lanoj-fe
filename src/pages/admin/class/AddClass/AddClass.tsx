/**
 * @FileName: AddClass
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/9 21:17
 */
import React from "react";
import Page from "../../../../components/Page/Page";
import {useNavigate} from "react-router-dom";
import {useForm} from "antd/es/form/Form";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT, validateMessages} from "../../../../config/config";
import {addContest} from "../../../../api/admin/contest";
import {Button, Col, Divider, Form, Input, message, Row} from "antd";
import TextArea from "antd/es/input/TextArea";
import {createClass} from "../../../../api/admin/classes";
import store from "../../../../store";

//import styles from './AddClass.module.scss'

interface IProps {

}

interface IState {

}

const AddClass: React.FC<IProps> = ({}) => {
  const navigate = useNavigate()
  const [form] = useForm()
  const handleOnSubmit = () => {
    createClass({...form.getFieldsValue(true), creatorId: store.getState().user.id}).then(res => {
      message.success(res.data.msg)
      navigate(`/admin/class/${res.data.data}`)
      // .then(() => {
      //   navigate(`/admin/class/${res.data.data}`)
      // }
    })
  }
  return (
    <Page inner>
      <Form
        validateMessages={validateMessages}
        layout={"vertical"}
        // labelCol={{ span: 2 }}
        // wrapperCol={{ span: 22 }}
        form={form}
        onFinish={handleOnSubmit}
      >
        <Form.Item
          rules={[{required: true},]}
          name={'name'}
          label={'班级名'}>
          <Input
            placeholder={'班级名称'}
          />
        </Form.Item>
        <Form.Item
          rules={[{required: true},]}
          name={'description'}
          label={'简介'}>
          <TextArea
            showCount
            maxLength={400}
            placeholder="输入简介"
            autoSize={{minRows: 3, maxRows: 10}}
          />
        </Form.Item>
        <Form.Item
          // wrapperCol={{ offset: 2}}
        >
          <Button type={"primary"} htmlType={"submit"}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </Page>)
}
export default AddClass;
