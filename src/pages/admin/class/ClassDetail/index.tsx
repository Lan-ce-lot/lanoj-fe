/**
 * @FileName: index
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/10 18:37
 */
import React, {useEffect} from "react";
import Page from "../../../../components/Page/Page";
import Exercise from "./components/ExerciseList";
import Member from "./components/Member";
import {Button, Card, Col, Form, Input, message, Row} from "antd";
import {useParams} from "react-router-dom";
import {validateMessages} from "../../../../config/config";
import TextArea from "antd/es/input/TextArea";
import {useForm} from "antd/es/form/Form";
import {createClass, getClassDetail, updateClass} from "../../../../api/admin/classes";

//import styles from './index.module.scss'

interface IProps {

}

interface IState {

}

const ClassDetail: React.FC<IProps> = ({}) => {
  const {classId} = useParams();
  const [form] = useForm()
  const handleOnSubmit = () => {
    updateClass({...form.getFieldsValue(true)}).then(res => {
      message.success(res.data.msg)
    })
  }
  useEffect(() => {
    getClassDetail(Number(classId)).then(res => {
      const {data} = res.data
      form.setFieldsValue({...data})
    })
  }, [])
  return (<Page>

    <Row gutter={[24, 12]}>
      <Col lg={24}>
        <Card>
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
              name={'creatorName'}
              label={'负责人'}>
              <Input
                disabled placeholder={'负责人'}
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
        </Card>

      </Col>
      <Col lg={24}>
        <Exercise/>
      </Col>
      <Col lg={24}>
        <Member classId={Number(classId)}/>
      </Col>
    </Row>
  </Page>)
}
export default ClassDetail;
