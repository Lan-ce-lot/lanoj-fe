/**
 * @FileName: Edit
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/7 14:04
 */
import React, {useEffect, useRef, useState} from "react";
import {Button, Card, Col, Form, Input, message, Row, Select, Space} from "antd";
import {Editor} from "@toast-ui/react-editor";
import TextArea from "antd/es/input/TextArea";
import {useParams} from "react-router-dom";
import {getArticleDetail, updateArticle} from "../../../../api/admin/article";
import {validateMessages} from "../../../../config/config";

//import styles from './Edit.module.scss'

interface IProps {

}

interface IState {

}

const Edit: React.FC<IProps> = ({}) => {
  const {articleId} = useParams();
  const [article, setArticle] = useState<any>();
  const [form] = Form.useForm()
  if (articleId === undefined) {

  } else {

  }
  const fetchData = () => {
    getArticleDetail(Number(articleId)).then(res => {
      const {data} = res.data
      form.setFieldsValue(data)
      markdownEditor.current.getInstance().setMarkdown(data.content)
      setArticle(data)
    })
  }
  const markdownEditor = useRef<any>()
  useEffect(() => {
    fetchData()
  }, [])
  const handleFinish = () => {
    updateArticle({
      ...article,
      ...form.getFieldsValue(true),
      content: markdownEditor.current.getInstance().getMarkdown(),
    }).then(res => {
      message.success(res.data.msg)
    })
  }
  return (<>
    <Form
      validateMessages={validateMessages}
      form={form}
      onFinish={handleFinish}
      layout={"vertical"}
    >
      <Row gutter={[24, 12]}>
        <Col lg={18} md={24} sm={24} xs={24}>
          <Card>
            <Form.Item
              rules={[{required: true},]}
              label={'标题'}
              name={'title'}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              rules={[{required: true},]}
              label={'内容'}
              name={'content'}
            >
              <Editor
                ref={markdownEditor}
                initialValue={'无内容'}
                previewStyle="vertical"
                height={'400px'}
                initialEditType="markdown"
                useCommandShortcut={true}
              />
            </Form.Item>
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <Form.Item
            >
              <Button htmlType={"submit"} type={"primary"} style={{width: '100%'}}>保存</Button>
            </Form.Item>
            <Form.Item
              label={'选择题目'}
              name={'problemId'}
            >
              <Select style={{width: '100%'}}>
                <Select.Option>
                  1001
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label={'简介'}
              name={'description'}
              rules={[{required: true},]}
            >
              <TextArea
                // value={value}
                // onChange={this.onChange}

                placeholder="输入简介"
                autoSize={{minRows: 3, maxRows: 5}}
              />
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </Form>
  </>)
}
export default Edit;
