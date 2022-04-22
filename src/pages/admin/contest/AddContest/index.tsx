/**
 * @FileName: index
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/23 14:47
 */
import React from "react";
import Page from "../../../../components/Page/Page";
import {Button, Col, Divider, Form, Input, message, Row, Table} from "antd";
import {DatePicker} from 'antd';
import TextArea from "antd/es/input/TextArea";
import {addContest} from "../../../../api/admin/contest";
import {useForm} from "antd/es/form/Form";
import {DEFAULT_DATE_TIME_FORMAT, validateMessages} from "../../../../config/config";
import {useNavigate} from "react-router-dom";
import moment from "moment";

const {RangePicker} = DatePicker;

//import styles from './index.module.scss'

interface IProps {

}

interface IState {

}

const AddContest: React.FC<IProps> = ({}) => {
  const navigate = useNavigate()
  const [form] = useForm()
  const handleOnSubmit = () => {
    console.log(form.getFieldValue('time'))
    const time = [moment(form.getFieldValue('time')[0]).format(DEFAULT_DATE_TIME_FORMAT),
      moment(form.getFieldValue('time')[1]).format(DEFAULT_DATE_TIME_FORMAT),
    ]

    addContest({
      ...form.getFieldsValue(true), startTime: time[0]
      , endTime: time[1]
    }).then(res => {
      if (res.data.code === 200) {
        message.success('创建比赛成功')
        navigate(`/admin/contest/edit/${res.data.data}`)
      }
    })
  }
  return (
    <Page inner>
      <Divider orientation="left">基本信息</Divider>
      <Form
        validateMessages={validateMessages}
        form={form}
        onFinish={handleOnSubmit}
      >
        <Row gutter={24}>
          <Col lg={12}>
            <Form.Item
              rules={[{required: true},]}
              name={'name'}
              label={'比赛名称'}>
              <Input
                placeholder={'比赛名称'}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={12}>
            <Form.Item
              rules={[{required: true},]}
              name={'time'}
              label={'时间限制'}>
              <RangePicker
                showTime
                placeholder={['开始时间', '结束时间']}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          rules={[{required: true},]}
          name={'description'}
          label={'内容描述'}>
          <TextArea
            showCount
            maxLength={200}
            placeholder="输入比赛描述"
            autoSize={{minRows: 3, maxRows: 6}}
          />
        </Form.Item>
        <Form.Item>
          <Button type={"primary"} htmlType={"submit"}>
            保存
          </Button>
        </Form.Item>
      </Form>
      {/*<Divider orientation="left">比赛题目</Divider>*/}
      {/*<Row gutter={24}>*/}
      {/*  <Col lg={20}>*/}

      {/*  </Col>*/}
      {/*  <Col lg={4}>*/}
      {/*    <Button>增加题目</Button>*/}
      {/*  </Col>*/}
      {/*</Row>*/}
      {/*<br/>*/}
      {/*<Table*/}
      {/*  columns={*/}
      {/*    [*/}
      {/*      {*/}
      {/*        dataIndex: 'numberId',*/}
      {/*        title: '序号',*/}
      {/*      },*/}
      {/*      {*/}
      {/*        dataIndex: 'problemId',*/}
      {/*        title: '题目id',*/}
      {/*      },*/}
      {/*      {*/}
      {/*        dataIndex: 'name',*/}
      {/*        title: '题目名',*/}
      {/*      },*/}
      {/*      {*/}
      {/*        dataIndex: 'tag',*/}
      {/*        title: '标签',*/}
      {/*      },*/}
      {/*    ]*/}
      {/*  }*/}
      {/*/>*/}
    </Page>)
}
export default AddContest;
