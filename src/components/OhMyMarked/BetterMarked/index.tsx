/**
 * @FileName: index
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/6 12:35
 */
import React from "react";
import {marked} from 'marked'
import hljs from "highlight.js";
// base16/solarized-dark.css
// import 'highlight.js/styles/atom-one-dark.css';
import styles from './index.module.scss'
// import './markdown-github.css'
// import './markdown.css'
import Tocify from "../../Tocify/Tocify";
// import 'highlight.js/styles/github.css';
// import 'highlight.js/styles/atom-one-dark.css';



interface IProps {
  children?: React.ReactNode
  content:string
}

interface IState {

}

const Options:any = {

}


const BetterMarked: React.FC<IProps> = ({content}) => {
  // console.log(marked)

  marked.setOptions({
    // renderer,

    renderer: new marked.Renderer(),

    gfm: true, // 允许 Git Hub标准的markdown.
    pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
    sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
    // tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
    breaks: false, // 允许回车换行（该选项要求 gfm 为true）
    smartLists: true, // 使用比原生markdown更时髦的列表
    smartypants: false, // 使用更为时髦的标点

    headerPrefix: 'lancel',
    highlight: function (code, lang) {
      return hljs.highlightAuto(code).value;
    },
  })
  return (<>
    <div
      className="markdown-body"
      // className={styles.betterMarked}
         dangerouslySetInnerHTML={{__html: marked(content)
        // .replace(/<pre>/g, "<pre class='hljs'>")
    }}/>
  </>)
}
export default BetterMarked;
