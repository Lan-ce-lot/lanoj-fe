import React, {Component} from "react";
import {
  Table,
  Tag,
  Form,
  Button,
  Input,
  Collapse,
  Pagination,
  Divider,
  message,
  Select,
  Modal, Rate, DatePicker
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import {tableList, deleteItem, editItem} from "../../../api/admin/table";
import EditForm from "./forms/editForm"
import Page from "../../../components/Page/Page";
import moment from "moment";

const {Column} = Table;
const {Panel} = Collapse;

class TableComponent extends Component {
  _isMounted = false; // 这个变量是用来标志当前组件是否挂载
  formRef = React.createRef()
  state = {
    list: [],
    loading: false,
    total: 0,
    listQuery: {
      pageNumber: 1,
      pageSize: 10,
      title: "",
      star: "",
      status: ""
    },
    editModalVisible: false,
    editModalLoading: false,
    currentRowData: {
      id: 0,
      author: "",
      date: "",
      readings: 0,
      star: "★",
      status: "published",
      title: ""
    }

  };
  fetchData = () => {
    this.setState({loading: true});
    tableList(this.state.listQuery).then((response) => {
      this.setState({loading: false});
      const list = response.data.data.items;
      const total = response.data.data.total;
      if (this._isMounted) {
        this.setState({list, total});
      }
    });
  };

  componentDidMount() {
    this._isMounted = true;
    this.fetchData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  filterTitleChange = (e) => {
    let value = e.target.value
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        title: value,
      }
    }));
  };
  filterStatusChange = (value) => {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        status: value,
      }
    }));
  };
  filterStarChange = (value) => {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        star: value,
      }
    }));
  };
  changePage = (pageNumber, pageSize) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          pageNumber,
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };
  changePageSize = (current, pageSize) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          pageNumber: 1,
          pageSize,
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };
  handleDelete = (row) => {
    deleteItem({id: row.id}).then(res => {
      message.success("删除成功")
      this.fetchData();
    })
  }
  handleEdit = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      editModalVisible: true,
    });
  };

  handleOk = _ => {
    console.log(this.formRef)
    const {current} = this.formRef;
    const fieldsValue = this.formRef.current.getFieldsValue(true)
    console.log(fieldsValue)
    console.log(fieldsValue['id'])
    console.log(fieldsValue['star'])
    // console.log(fieldsValue['data'])
    const values = {
      ...fieldsValue,
      'star': "".padStart(fieldsValue['star'], '★'),
      'date': fieldsValue['date'].format('YYYY-MM-DD HH:mm:ss'),
    };
    // this.formRef.current.submit()
    this.setState({editModalLoading: true,});
    editItem(values).then((response) => {
      current.resetFields();
      this.setState({editModalVisible: false, editModalLoading: false});
      message.success("编辑成功!")
      this.fetchData()
    }).catch(e => {
      message.success("编辑失败,请重试!")
    })

  };

  handleCancel = _ => {
    this.setState({
      editModalVisible: false,
    });
  };

  render() {
    // console.log(this.formRef)

    return (
      <Page inner>
        <div className="app-container">
          <Collapse defaultActiveKey={["1"]}>
            <Panel header="筛选" key="1">
              <Form layout="inline"
                    onFinish={this.handleOk}
              >
                <Form.Item label="标题:">
                  <Input onChange={this.filterTitleChange}/>
                </Form.Item>
                <Form.Item label="类型:">
                  <Select
                    style={{width: 120}}
                    onChange={this.filterStatusChange}>
                    <Select.Option value="published">published</Select.Option>
                    <Select.Option value="draft">draft</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="推荐指数:">
                  <Select
                    style={{width: 120}}
                    onChange={this.filterStarChange}>
                    <Select.Option value={1}>★</Select.Option>
                    <Select.Option value={2}>★★</Select.Option>
                    <Select.Option value={3}>★★★</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" icon={<SearchOutlined/>} onClick={this.fetchData}>
                    搜索
                  </Button>
                </Form.Item>
              </Form>
            </Panel>
          </Collapse>
          <br/>
          <Table
            bordered
            rowKey={(record) => record.id}
            dataSource={this.state.list}
            loading={this.state.loading}
            pagination={false}
          >
            <Column title="序号" dataIndex="id" key="id" width={200} align="center" sorter={(a, b) => a.id - b.id}/>
            <Column title="标题" dataIndex="title" key="title" width={200} align="center"/>
            <Column title="作者" dataIndex="author" key="author" width={100} align="center"/>
            <Column title="阅读量" dataIndex="readings" key="readings" width={195} align="center"/>
            <Column title="推荐指数" dataIndex="star" key="star" width={195} align="center"/>
            <Column title="状态" dataIndex="status" key="status" width={195} align="center" render={(status) => {
              let color =
                status === "published" ? "green" : status === "deleted" ? "red" : "";
              return (
                <Tag color={color} key={status}>
                  {status}
                </Tag>
              );
            }}/>
            <Column title="时间" dataIndex="date" key="date" width={195} align="center"/>
            <Column title="操作" key="action" width={195} align="center" render={(text, row) => (
              <span>
              <Button type="primary" shape="circle" icon={<EditOutlined/>} title="编辑"
                      onClick={this.handleEdit.bind(null, row)}/>
              <Divider type="vertical"/>
              <Button type="primary" shape="circle" icon={<DeleteOutlined/>} title="删除"
                      onClick={this.handleDelete.bind(null, row)}/>
            </span>
            )}/>
          </Table>
          <br/>
          <Pagination
            total={this.state.total}
            pageSizeOptions={["10", "20", "40"]}
            showTotal={(total) => `共${total}条数据`}
            onChange={this.changePage}
            current={this.state.listQuery.pageNumber}
            onShowSizeChange={this.changePageSize}
            showSizeChanger
            showQuickJumper
            hideOnSinglePage={true}
          />
          <Modal
            title="编辑"
            visible={this.state.editModalVisible}
            onOk={this.handleOk}
            destroyOnClose={true}
            confirmLoading={this.state.editModalLoading}
            onCancel={this.handleCancel}
          >
            <Form
              ref={this.formRef}
              labelCol={{sm: {span: 8}}}
              wrapperCol={{sm: {span: 16}}}
            >
              <Form.Item label="序号:" name="id" initialValue={this.state.currentRowData.id}>
                <Input id="name" disabled/>
              </Form.Item>
              <Form.Item label="标题:" name="title" rules={[{required: true, message: "请输入标题!"}]}
                         initialValue={this.state.currentRowData.title}>
                <Input id="title" placeholder="标题"/>
              </Form.Item>
              <Form.Item label="作者:" name="author" initialValue={this.state.currentRowData.author}>
                <Input id="author" disabled/>
              </Form.Item>
              <Form.Item label="阅读量:" name="readings" initialValue={this.state.currentRowData.readings}>
                <Input id="readings" disabled/>
              </Form.Item>
              <Form.Item label="推荐指数:" name="star" initialValue={this.state.currentRowData.star.length}>
                <Rate id="star" count={3}/>
              </Form.Item>
              <Form.Item label="状态:" name="status" initialValue={this.state.currentRowData.status}>
                <Select id="status" style={{width: 120}}>
                  <Select.Option value="published">published</Select.Option>
                  <Select.Option value="draft">draft</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="时间:"
                name="date"
                rules={[{type: 'object', required: true, message: '请选择时间!'}]}
                initialValue={moment(this.state.currentRowData.date || "YYYY-MM-DD HH:mm:ss")}
              >
                <DatePicker
                  id="date"
                  showTime format="YYYY-MM-DD HH:mm:ss"/>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </Page>

    );
  }
}

export default TableComponent;
