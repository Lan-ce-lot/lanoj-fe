/**
 * @FileName: index
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/4 11:51
 */
import React, {useEffect, useRef, useState} from "react";
import {useParams, Outlet, useNavigate, Link} from "react-router-dom";
import {Alert, Avatar, Button, Card, Col, message, Row, Select, Skeleton, Space, Table, Tabs} from "antd";
import {RedoOutlined, SendOutlined, CalendarOutlined, PieChartOutlined} from "@ant-design/icons";

// markdown
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// codr
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
// 风格对应的样式
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/theme/material.css';
// highlightSelectionMatches
import 'codemirror/addon/scroll/annotatescrollbar.js';
import 'codemirror/addon/search/matchesonscrollbar.js';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/search/match-highlighter.js';

// mode
import 'codemirror/mode/clike/clike.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/pascal/pascal.js'; //pascal
import 'codemirror/mode/go/go.js'; //go
import 'codemirror/mode/d/d.js'; //d
import 'codemirror/mode/haskell/haskell.js'; //haskell
import 'codemirror/mode/mllike/mllike.js'; //OCaml
import 'codemirror/mode/perl/perl.js'; //perl
import 'codemirror/mode/php/php.js'; //php
import 'codemirror/mode/ruby/ruby.js'; //ruby
import 'codemirror/mode/rust/rust.js'; //rust
import 'codemirror/mode/javascript/javascript.js'; //javascript
import 'codemirror/mode/fortran/fortran.js'; //fortran

// active-line.js
import 'codemirror/addon/selection/active-line.js';

// foldGutter
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldgutter.js';

import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/matchtags.js';
import 'codemirror/addon/edit/closetag.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/anyword-hint.js';
import 'codemirror/addon/selection/mark-selection.js';

import Title from "antd/es/typography/Title";
import SplitPane from "react-split-pane";
import styles from './index.module.scss'
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {addSubmission, ISubmissionProps} from "../../../../../../api/common/submission";
import Page from "../../../../../../components/Page/Page";
import ScrollBar from "react-perfect-scrollbar";
import BetterMarked from "../../../../../../components/OhMyMarked/BetterMarked";
import {changeLoading} from "../../../../../../store/actions";
import {parseToken} from "../../../../../../utils/jwt";
import {
  getContestProblemDetail,
  IContestProblem,
  initContestProblem
} from "../../../../../../api/common/contestProblem";
import {getProblemDetail} from "../../../../../../api/admin/problem";
import store from "../../../../../../store";

const {Option} = Select;
const {TabPane} = Tabs;

interface IProps {
  loading?: boolean;
}

interface IState {

}

const options = {
  // codemirror options
  tabSize: 4,
  mode: 'text/x-csrc',
  theme: 'material',
  // 显示行号
  lineNumbers: true,
  line: true,
  // // 代码折叠
  foldGutter: true,
  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
  // lineWrapping: true,
  // 选中文本自动高亮，及高亮方式
  styleSelectedText: true,
  showCursorWhenSelecting: true,
  highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true},
  // extraKeys: { Ctrl: 'autocomplete' }, //自定义快捷键
  autoFocus: true,
  matchBrackets: true, //括号匹配
  indentUnit: 4, //一个块（编辑语言中的含义）应缩进多少个空格
  styleActiveLine: true,
  autoCloseBrackets: true,
  autoCloseTags: true,
  hintOptions: {
    // 当匹配只有一项的时候是否自动补全
    completeSingle: false,
  },
}
const themes = [
  {label: 'material', value: 'material'},
  {label: 'solarized', value: 'solarized'},
  {label: 'monokai', value: 'monokai'},
]
const languages = [
  {
    label: 'C++', value: 'C++'
  },
  {
    label: 'C', value: 'C'
  },
  {
    label: 'Java', value: 'Java'
  },
  {
    label: 'Python', value: 'Python'
  },
]
const ContestProblem: React.FC<IProps> = ({loading}) => {
  let {problemId, contestId} = useParams();
  const navigate = useNavigate();
  const
    [value, setValue] = useState<string>(''),
    [theme, setTheme] = useState<string>('material'),
    [language, setLanguage] = useState<string>('C++')
  const [problem, setProblem] = useState<IContestProblem>(
    // initProblem
    initContestProblem
  )

  const fetchData = () => {
    getContestProblemDetail({
      id: Number(problemId),
      contestId: Number(contestId),
      // userId: store.getState().user.id
    }).then((res: any) => {
      const {data} = res.data
      setProblem(data)
    })
  }
  const onThemeChange = (newTheme: string) => {
    setTheme(newTheme)
  }
  const onLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    message.info(`${newLanguage}语言`)
  }
  // const problemId = parseInt(id!)
  const onCodeSubmit = () => {
    const userId = parseToken(localStorage.getItem('login_token')!).userId
    const data: ISubmissionProps = {
      language,
      problemId: problem.problemId!,
      userId,
      codeContent: value,
      contestId:Number(contestId)
    }
    if (data.language === 'C++') {
      data.language = 'C_PLUS_PLUS'
    }
    console.log(data)
    addSubmission(data).then((res) => {
      const {data} = res
      if (data.code === 200) {
        message.success(data.msg);
        // navigate('submission')
      } else {
        message.error(data.msg);
      }
    })
  }
  const onRefresh = () => {
    setValue('')
    message.info('清空代码')
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (<Page className={styles.dashboard}>
      {/*<SplitPane*/}
      {/*  minSize={50}*/}
      {/*  split="vertical" defaultSize={200} primary="second">*/}
      <Row gutter={12}>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Skeleton loading={loading} active>
            <Card
              size={"small"}
            >
              <Tabs
                type="card"
                style={{backgroundColor: '#fff'}}
                defaultActiveKey="detail"
                onChange={(key) => {
                  navigate(key)
                }
                }>

                <TabPane tab={<span><CalendarOutlined/>题目描述</span>} key="detail">
                  <ScrollBar>
                    <div style={{maxHeight: '450px'}}>
                      <Title level={4}>{problem?.name}</Title>
                      <Space size={1} style={{display: "flex", justifyContent: 'right'}}>
                        <Button icon={<PieChartOutlined/>} type={"link"}>题目列表</Button>
                        {/*<Button icon={<PieChartOutlined/>} type={"link"}>全部提交</Button>*/}
                        {/*<Button icon={<PieChartOutlined/>} type={"link"}>相关题解</Button>*/}
                      </Space>
                      <div className={styles.questionIntr}>
                      <span>
                        {'时间限制'}：C/C++
                        {problem.timeLimit}MS，{'其他语言'}
                        {problem.timeLimit * 2}MS</span>
                        <br/>
                        <span>{'内存限制'}：C/C++
                          {problem.memoryLimit}KB，{'其他语言'}
                          {problem.memoryLimit * 2}KB</span><br/>
                        <span>{'出题人'}：<Link to={`/user/${problem.userId}`}>{problem?.username}</Link>
                       </span><br/>
                      </div>
                      <BetterMarked content={problem!.content}/>
                    </div>
                  </ScrollBar>
                  {/*<ReactMarkdown children={problemText} remarkPlugins={[remarkGfm]}/>*/}
                </TabPane>
                {/*<TabPane tab={<span><PieChartOutlined/>我的提交</span>} key="submission">*/}
                {/*  <Outlet/>*/}
                {/*</TabPane>*/}


              </Tabs>
            </Card>
          </Skeleton>
        </Col>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Card
            size={"small"}
            bordered={false}
            bodyStyle={{}}
          >

            <Row gutter={[24, 4]}>
              <Col md={24} lg={8}>
                <span>语言 </span>
                <Select defaultValue="C++" style={{width: 120}} onChange={onLanguageChange}>
                  {
                    languages.map((item: any) => {
                      return (<Option key={item.value} value={item.value}>
                          {item.label}
                        </Option>
                      )
                    })
                  }
                </Select>
              </Col>
              <Col md={24} lg={8}>
                <Button
                  onClick={onRefresh}
                  icon={<RedoOutlined/>}
                />
              </Col>
              <Col md={24} lg={8}>
                <span>主题 </span>
                <Select defaultValue="material" style={{width: 120}} onChange={onThemeChange}>
                  {
                    themes.map((item: any) => {
                      return (<Option key={item.value} value={item.value}>
                          {item.label}
                        </Option>
                      )
                    })
                  }
                </Select>
              </Col>
              <Col lg={24} md={24} sm={24} xs={24}>
                <CodeMirror
                  // className={
                  //   [styles.codeMirror].join(' ')
                  // }
                  // scroll={[500, 100] as any}
                  value={value}
                  options={{...options, theme}}
                  onBeforeChange={(editor, data, value) => {
                    setValue(value);
                  }}
                  onChange={(editor, data, value) => {
                  }}
                />
              </Col>


              <Col lg={12} md={24}>
                <Alert message="你已经解决了该问题!" type="success" showIcon/>
              </Col>
              <Col lg={12} md={24}>
                <Space

                  style={{display: "flex", justifyContent: "right"}}
                >
                  <Button
                    icon={<SendOutlined/>}
                    type={"primary"}
                    onClick={onCodeSubmit}
                  >
                    运行
                  </Button>
                  <Button
                    icon={<SendOutlined/>}
                    type={"primary"}
                    onClick={onCodeSubmit}
                  >
                    提交
                  </Button>
                </Space>

              </Col>
            </Row>
          </Card>
        </Col>
      </Row>


      {/*</SplitPane>*/}
    </Page>
  )
}


const mapStateToProps = (state: any) => {
  return {
    ...state.app,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setLoading(loading: boolean) {
      dispatch(changeLoading(loading))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContestProblem);

