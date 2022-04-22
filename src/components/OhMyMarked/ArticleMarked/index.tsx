/**
 * @FileName: index
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/18 0:52
 */
import React, {useState} from "react";
import Markdown from 'marked-react';
import hljs from "highlight.js";
import styles from './index.module.scss'
import 'katex/dist/katex.min.css';
// @ts-ignore
import {InlineMath, BlockMath} from 'react-katex';
import {dracula} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import {randomUUID} from "crypto";
import CodeBlock from "./code/CodeBlock";
import Tocify from "../../Tocify/Tocify";
import {marked} from "marked";

interface IProps {
  data: string;
  heading?: any;
}

interface IState {

}


const ArticleMarked: React.FC<IProps> = ({
                                           data, heading
                                         }) => {
  const renderer = {
    heading,
    code: (text: string, lang: string) => <CodeBlock value={text} language={lang}/>
    ,
    paragraph: (textList: string[]) =>
      <p>      {textList.map((text, key) => {
        const isTeXInline = /\$(.*)\$/g.test(text);
        // isTeXLine - 该文本是否有行间公式
        const isTeXLine = /^\$\$(\s*.*\s*)\$\$$/.test(text);

        // console.log(text)
        if (!isTeXLine && isTeXInline) {
          // 如果不是行间公式，但是行内公式，则使用<span class="marked_inline_tex">包裹公式内容，消除$定界符
          // @ts-ignore
          // text = text.replace(/(\$([^\$]*)\$)+/g, function ($1, $2) {
          //   // 避免和行内代码冲突
          //   if ($2.indexOf('<code>') >= 0 || $2.indexOf('</code>') >= 0) {
          //     return <>{$2}</>
          //   } else {
          //     return <InlineMath>{$2}</InlineMath>
          //     // return "<span class=\"marked_inline_tex\">" + $2.replace(/\$/g, "") + "</span>"
          //   }
          // })
          // const reverseReg = /\$(.*)\$/
          // console.log(text.match(reverseReg))
          // console.log(text.split(reverseReg));
          // const textList = text.match(/([\u4e00-\u9fa5]+)/g).map(it => `\\text\{${it}\}`)
          // console.log(text.match(/([\u4e00-\u9fa5]+)/g));
          const newText = text
            .replace(/([\u4e00-\u9fa5|\uff00-\uffff|\u3002|\u3001|\u201c|\u201d|\u2018|\u2019|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\u3014|\u3015|\u2026|\u2014]+)/g, function (word) {
              console.log(word)
              return `\\text\{${word}\}`
            })
          console.log(newText)
          // console.log(text.match(/\$/g))
          return <InlineMath key={key}>{newText.replace(/\$/g, "")}</InlineMath>
        } else if (isTeXLine) {
          // 如果是行间公式，则使用<div class='marked_tex'>包裹公式内容，消除$$定界符
          // 如果不是LaTex公式，则直接返回原文本
          // text = (isTeXLine) ? "<div class=\"marked_tex\">" + text.replace(/\$/g, "") + "</div>" : text


          return <BlockMath key={key}>{text.replace(/\$/g, "")}</BlockMath>
        } else {
          // 使用渲染器原有的`paragraph()`方法渲染整段文本
          // text =  this.old_paragraph(text)
          // return text
          return (
            <span key={key}>{text}</span>
            // NewRenderer.paragraph(text)
          )
        }
      })}
      </p>
  }
  const options = {
    gfm: true, // 允许 Git Hub标准的markdown.
    pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
    sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
    tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
    breaks: true, // 允许回车换行（该选项要求 gfm 为true）
    smartLists: true, // 使用比原生markdown更时髦的列表
    smartypants: false, // 使用更为时髦的标点
    renderer
  }


  return (
    <div
      className={styles.detailedContent}
    >
      <Markdown
        {...options}
        value={data}
      />
    </div>
  )
}
export default ArticleMarked;
