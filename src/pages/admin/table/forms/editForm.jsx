import React, { Component } from "react";
import { Form, Input, DatePicker, Select, Rate, Modal } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
class EditForm extends Component {
  render() {
    const {
      visible,
      onCancel,
      onOk,
      // form,
      confirmLoading,
      currentRowData,
    } = this.props;
    // const { getFieldDecorator } = form;
    console.log(currentRowData)
    const { id, author, date, readings, star, status, title } = currentRowData;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        title="编辑"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
        destroyOnClose={true}
      >
        <Form {...formItemLayout}
              // ref={this.formRef}
        >
          <Form.Item label="序号:" name="id" initialValue={id}>
            <Input id="name" disabled />
          </Form.Item>
          <Form.Item label="标题:" name="title" rules={[{ required: true, message: "请输入标题!" }]} initialValue={title}>
            <Input id="title" placeholder="标题" />
          </Form.Item>
          <Form.Item label="作者:" name="author" initialValue={author}>
            <Input id="author" disabled />
          </Form.Item>
          <Form.Item label="阅读量:" name="readings" initialValue={readings} >
            <Input id="readings" disabled />
          </Form.Item>
          <Form.Item label="推荐指数:" name="star" initialValue={star.length}>
            <Rate id="star" count={3} />
          </Form.Item>
          <Form.Item label="状态:" name="status" initialValue={status}>
            <Select id="status" style={{ width: 120 }}>
              <Select.Option value="published">published</Select.Option>
              <Select.Option value="draft">draft</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="时间:"
            name="data"
            rules={[{ type: 'object', required: true, message: '请选择时间!' }]}
            initialValue={moment(date || "YYYY-MM-DD HH:mm:ss")}
          >
            <DatePicker
              id="data"
              showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default EditForm;
