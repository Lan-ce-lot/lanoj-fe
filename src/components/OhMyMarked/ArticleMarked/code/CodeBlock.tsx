/**
 * @FileName: CodeBlock
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/18 3:14
 */
/*
 * File: Code
 * -9-10 01:13:59
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import styles from './CodeBlock.module.scss';
import CodeTool from './components/CodeTool';
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
// @ts-ignore
// import {cpp, c, java, python} from 'react-syntax-highlighter/dist/esm/languages/prism';

// import {coy} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {solarizedLight} from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeBlockProps {
  language: string;
  value: string;
}

const CodeBlock: React.FunctionComponent<CodeBlockProps> = (props) => {

  // useEffect(() => {
  //   SyntaxHighlighter.registerLanguage('c', c);
  //   SyntaxHighlighter.registerLanguage('cpp', cpp);
  //   SyntaxHighlighter.registerLanguage('java', java);
  //   SyntaxHighlighter.registerLanguage('python', python);
  // }, []);

  // 样式类
  // const codeClassNames = classNames(styles.code_block, {
  //   [styles.code_block_language_in]: props.language === 'in',
  //   [styles.code_block_language_out]: props.language === 'out',
  // });

  // 代码区鼠标悬停与否
  const [isCodeHover, setIsCodeHover] = useState<boolean>(false);


  return (
    <div
      onMouseOver={() => setIsCodeHover(true)}
      onMouseLeave={() => setIsCodeHover(false)}
    >
      <div className={styles.code_block_tools_wrap}>
        {
          // isCodeHover &&

          <CodeTool code={props.value} classNames={styles.code_block_tools}/>}
      </div>
      <SyntaxHighlighter language={props.language}
        // style={coy}
                         style={solarizedLight}

                         customStyle={{
                           backgroundColor: 'transparent'
                         }}
      >
        {props.value}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock;
