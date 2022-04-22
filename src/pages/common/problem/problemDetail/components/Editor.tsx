/**
 * @FileName: Editor
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/4 16:17
 */
import React, {useState} from "react";
import {Alert, Button, Card, Col, Collapse, Form, message, Row, Select, Space, Tabs} from "antd";
import {LoadingOutlined, RedoOutlined, RightSquareOutlined} from "@ant-design/icons";
import styles from "../index.module.scss";
import {SubmitIcon} from "../../../../../assets/icon/icon";
import TextArea from "antd/es/input/TextArea";


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
// import '../../../../components/OhMyMarked/BetterMarked/markdown.css'
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
import {useForm} from "antd/es/form/Form";
import {addSubmission, ISubmissionProps} from "../../../../../api/common/submission";
import store from "../../../../../store";
import {remoteRunCode} from "../../../../../api/common/run";
import {useNavigate, useParams} from "react-router-dom";
import loading from "../../../../../components/Loading";
import Split from "@uiw/react-split";
//import styles from './Editor.module.scss'
const {Option} = Select;
const {TabPane} = Tabs;

interface IProps {
  // loading: boolean;
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
const Editor: React.FC<IProps> = ({}) => {
  let {id} = useParams();
  const navigate = useNavigate();
  const [height, setHeight] = useState(`50%`);
  const onClick = () => {
    setHeight(
      height === `0%` ? `20%` : `0%`,
    );
  }
  const styl: any = {};
  if (height === `0%`) {
    styl.height = `0%`;
  } else {
    styl.height = height;
  }
  const
    [compileError, setCompileError] = useState<boolean>(false),
    [value, setValue] = useState<string>(''),
    [theme, setTheme] = useState<string>('material'),
    [language, setLanguage] = useState<string>('C++'),
    [loading, setLoading] = useState<boolean>(false)
  const [form] = useForm()
  const onThemeChange = (newTheme: string) => {
    setTheme(newTheme)
  }
  const onLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    message.info(`${newLanguage}语言`)
  }
  const problemId = parseInt(id!)
  const onCodeSubmit = () => {
    if (value && value.length >= 7) {
      const data: ISubmissionProps = {
        language,
        problemId,
        userId: store.getState().user.id,
        codeContent: value
      }
      if (data.language === 'C++') {
        data.language = 'C_PLUS_PLUS'
      }
      addSubmission(data).then((res) => {
        const {data} = res
        if (data.code === 200) {
          message.success(data.msg);
          navigate('submission')
        } else {
          message.error(data.msg);
        }
      })
    } else {
      message.warn('代码长度不少于7字符')
    }
  }
  const onRefresh = () => {
    setValue('')
    message.info('清空代码')
  }
  const onCodeRun = () => {
    if (height === `0%`) {
      setHeight(`25%`)
    } else {
      if (value && value.length >= 7) {
        remoteRunCode({
          ...form.getFieldsValue(true),
          submissionCode: value,
          language: language === 'C++' ? "C_PLUS_PLUS" : language
        }).then(res => {
          const {data} = res.data
          if (res.data.code === 200) {
            form.setFieldsValue(data)
            if (!data.condition || data.condition === 1) {

            } else {
            }
          }
        })
      } else {
        message.warn('代码长度不少于7字符')
      }
    }

  }
  // const [width, setWidth] = useState(`50%`);
  // const onClick = () => {
  //   setWidth(
  //     width === `0%` ? `50%` : `0%`,
  //   );
  // }
  // const styl: any = {};
  // if (width === `0%`) {
  //   styl.width = `0%`;
  // } else {
  //   styl.width = width;
  // }

  return (
    <>
      {/*<div style={{marginBottom: 10}}>*/}
      {/*  <Button type="primary" onClick={onClick.bind(null)}>{height === `0%` ? '隐藏菜单' : '展示菜单'}</Button>*/}
      {/*</div>*/}
      <Split
        lineBar
        mode="vertical" style={{
        padding: '8px 8px 0 8px',
        width: 'auto',
        height: "100%",
        // border: '1px solid #d5d5d5', borderRadius: 3
      }}
        onDragEnd={(preSize: number, nextSize: number, paneNumber: number) => {
          setHeight(`${nextSize}`)
          if (nextSize <= 15) {
            // alert(nextSize)
            setHeight(
              `0%`
              // height === `0%` ? `20%` : `0%`,
            );
          }
        }}
      >
        <div style={{
          flex: 1,
          height: '70%'
          , minHeight: '63%'
        }}>
          <div style={{
            height: '100%'
            // , padding: '8px'
          }}>

            {/*<Card*/}
            {/*  style={{height: '100%'}}*/}
            {/*  size={"small"}*/}
            {/*  bordered={false}*/}
            {/*  // bodyStyle={{minHeight:'450px'}}*/}
            {/*>*/}
            <div style={{
              height: '32px',
              marginBottom: '4px', display: "flex", justifyContent: 'space-between'
            }}>
              <div>
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

              </div>
              <div>
                <Button
                  onClick={onRefresh}
                  icon={<RedoOutlined/>}
                />
              </div>
              <div>
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

              </div>
            </div>
            <div

              // id={}
              style={{
                height: `calc(100% - 75px)`

              }}
            >
              <CodeMirror
                className={styles.codeContent}
                value={value}
                options={{...options, theme}}
                onBeforeChange={(editor, data, value) => {
                  setValue(value);
                }}
                onChange={(editor, data, value) => {
                }}
              />
            </div>
            <Space
              style={{
                padding: '5px',
                display: "flex", justifyContent: "right"
              }}
            >
              <Button
                loading={loading}
                icon={<RightSquareOutlined/>}
                // type={"primary"}
                onClick={onCodeRun}
              >
                运行
              </Button>
              <Button
                loading={loading}
                // disabled={value === null || value === '' || value === undefined}
                icon={<SubmitIcon/>}
                type={"primary"}
                onClick={onCodeSubmit}
              >
                提交
              </Button>
            </Space>


            {/*<Row gutter={[24, 8]}>*/}
            {/*  /!*<Col md={24} lg={8}>*!/*/}
            {/*  /!*  <span>语言 </span>*!/*/}
            {/*  /!*  <Select defaultValue="C++" style={{width: 120}} onChange={onLanguageChange}>*!/*/}
            {/*  /!*    {*!/*/}
            {/*  /!*      languages.map((item: any) => {*!/*/}
            {/*  /!*        return (<Option key={item.value} value={item.value}>*!/*/}
            {/*  /!*            {item.label}*!/*/}
            {/*  /!*          </Option>*!/*/}
            {/*  /!*        )*!/*/}
            {/*  /!*      })*!/*/}
            {/*  /!*    }*!/*/}
            {/*  /!*  </Select>*!/*/}
            {/*  /!*</Col>*!/*/}
            {/*  /!*<Col md={24} lg={8}>*!/*/}
            {/*  /!*  <Button*!/*/}
            {/*  /!*    onClick={onRefresh}*!/*/}
            {/*  /!*    icon={<RedoOutlined/>}*!/*/}
            {/*  /!*  />*!/*/}
            {/*  /!*</Col>*!/*/}
            {/*  /!*<Col md={24} lg={8}>*!/*/}
            {/*  /!*  <span>主题 </span>*!/*/}
            {/*  /!*  <Select defaultValue="material" style={{width: 120}} onChange={onThemeChange}>*!/*/}
            {/*  /!*    {*!/*/}
            {/*  /!*      themes.map((item: any) => {*!/*/}
            {/*  /!*        return (<Option key={item.value} value={item.value}>*!/*/}
            {/*  /!*            {item.label}*!/*/}
            {/*  /!*          </Option>*!/*/}
            {/*  /!*        )*!/*/}
            {/*  /!*      })*!/*/}
            {/*  /!*    }*!/*/}
            {/*  /!*  </Select>*!/*/}
            {/*  /!*</Col>*!/*/}
            {/*  <Col lg={24} md={24} sm={24} xs={24}>*/}


            {/*  </Col>*/}
            {/*  <Col lg={24} md={24}>*/}

            {/*  </Col>*/}
            {/*</Row>*/}
            {/*<div style={{marginTop: '5px', overflow: "auto"}}>*/}
            {/*  <Form*/}
            {/*    form={form}*/}
            {/*  >*/}
            {/*    <Form.Item*/}
            {/*      label={"输入"}*/}
            {/*      name={"stdIn"}*/}
            {/*    >*/}
            {/*      <TextArea placeholder="输入" autoSize/>*/}
            {/*    </Form.Item>*/}
            {/*    <Form.Item*/}
            {/*      label={"输出"}*/}
            {/*      name={"stdOut"}>*/}
            {/*      <TextArea*/}
            {/*        disabled*/}
            {/*        placeholder="输出" autoSize*/}
            {/*      />*/}
            {/*    </Form.Item>*/}
            {/*  </Form>*/}
            {/*</div>*/}
            {/*</Split>*/}
            {/*</Card>*/}
            {/*</div>*/}

          </div>
        </div>
        <div
          style={{
            ...styl,
            // height: '30%',
            marginTop: '5px',
            overflowY: 'auto',
            overflowX: 'hidden',
            // padding: '10px'
          }}>
          <Form
            form={form}
          >
            <Form.Item
              label={"输入"}
              name={"stdIn"}
            >
              <TextArea placeholder="输入" autoSize/>
            </Form.Item>
            <Form.Item
              label={"输出"}
              name={"stdOut"}>
              <TextArea
                disabled
                placeholder="输出" autoSize
              />
            </Form.Item>
          </Form>
        </div>
      </Split>
    </>

  )
}
export default Editor;
