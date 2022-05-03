/**
 * @FileName: Detail
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/7 9:39
 */
import React, {useEffect, useState} from "react";
import BetterMarked from "../../../../components/OhMyMarked/BetterMarked";

import styles from './Detail.module.scss'
import Page from "../../../../components/Page/Page";
import {Affix, Avatar, Button, Card, Col, Empty, List, message, Row, Skeleton, Space} from "antd";
import {marked, Renderer} from "marked";
import hljs from "highlight.js";
import Tocify from "../../../../components/Tocify/Tocify";
import "highlight.js/styles/monokai-sublime.css";
import {render} from "react-dom";
import {
  ArrowRightOutlined,
  ClockCircleOutlined,
  EditOutlined, EyeOutlined, LikeFilled,
  LikeOutlined,
  MessageOutlined,
  StarOutlined
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import {checkIsLike, doLike, getArticleDetail, IArticle, initArticle} from "../../../../api/admin/article";
import {Link, useParams} from "react-router-dom";
import moment from "moment";
import {DATE_TIME_FORMAT_WITHOUT_TIME, DEFAULT_DATE_TIME_FORMAT, EMPTY_IMAGE} from "../../../../config/config";
import ProblemMarked from "../../../../components/OhMyMarked/ProblemMarked";
import ArticleMarked from "../../../../components/OhMyMarked/ArticleMarked";
import store from "../../../../store";

interface IProps {

}

interface IState {

}

const IconText = ({icon, text}: any) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const Detail: React.FC<IProps> = ({}) => {
  const [loading, setLoading] = useState<boolean>(false),
    [isLike, setIsLike] = useState<boolean>(false)
  const {articleId} = useParams();
  const tocify = new Tocify()
  const renderer = new Renderer()
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  const [article, setArticle] = useState<IArticle>(initArticle);
  // const [content, setContent] = useState<string>(initContent);
  const fetchData = () => {
    setLoading(true)
    getArticleDetail(Number(articleId)).then(res => {
      const {data} = res.data
      setArticle(data)
      // console.log()
      setLoading(false)
    })
    checkIsLike({userId: store.getState().user.id, articleId: Number(articleId)}).then(res => {
      const {data} = res.data
      setIsLike(data)
    })
  }

  const clickLike = () => {
    setLoading(true)
    doLike({userId: store.getState().user.id, articleId: Number(articleId)}).then(res => {
      // const {data} = res.data
      message.success(res.data.msg)
      fetchData()
      // setLoading(false)
    })
  }
  useEffect(() => {
    fetchData()

  }, [])
  marked.setOptions({
    renderer,
    // renderer: new marked.Renderer(),
    gfm: true, // 允许 Git Hub标准的markdown.
    pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
    sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
    breaks: true, // 允许回车换行（该选项要求 gfm 为true）
    smartLists: true, // 使用比原生markdown更时髦的列表
    smartypants: false, // 使用更为时髦的标点
    headerPrefix: 'lancel',
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  })
  return (
    <Row gutter={48}>
      <Skeleton active loading={loading}>
        <Col lg={18}>
          <Card
            title={<Title level={2}>
              {article.title}
            </Title>}
            extra={
              <>
                {
                  isLike ? <Button onClick={clickLike} danger icon={<LikeOutlined/>}>取消</Button> :
                    <Button onClick={clickLike} icon={<LikeOutlined/>}>点赞</Button>
                }

                {/*<Button type={"primary"} icon={<LikeFilled/>}>点赞</Button>*/}
              </>
            }
          >
            <Row gutter={[24, 12]}>
              <Col lg={24}>
                <div>
                  <List
                  >
                    <List.Item
                      actions={[
                        <IconText icon={ClockCircleOutlined}
                                  text={moment(article.updatedAt)
                                    .format(DEFAULT_DATE_TIME_FORMAT)
                                  }
                                  key="list-vertical-star-o"/>,
                        <IconText icon={EyeOutlined} text={article.click} key="list-vertical-click-o"/>,
                        <IconText icon={LikeOutlined} text={article.likeNumber} key="list-vertical-like-o"/>,
                        // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Link to={`/user/${article.userId}`}><Space>
                          <Avatar
                            src={article.avatar}/>
                          {article.username}
                        </Space>
                        </Link>}
                        // avatar={<Avatar src={item.avatar} />}
                        // title={<a href={item.href}>{item.title}</a>}
                        // description={item.description}
                      />
                    </List.Item>
                  </List>
                </div>
              </Col>
              <Col lg={24}>
                <div
                  className={styles.detailedContent}
                >
                  {/*<ArticleMarked heading={heading} data={article?.content}/>*/}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: marked(article?.content)
                    }}/>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col lg={6}>

          <Affix offsetTop={75}>
            <Row gutter={[24, 12]}>
              <Col lg={24}>
                <Link to={'/article/create'}>
                  <Button
                    icon={<EditOutlined/>
                    }
                    type={"primary"} style={{width: '100%'}}
                  >
                    发布一个
                  </Button>
                </Link>
              </Col>
              <Col lg={24}>
                {!article.problemId ? <></> :
                  <Link to={`/problem/detail/${article.problemId}`}>
                    <Button
                      icon={<ArrowRightOutlined/>}
                      style={{width: '100%'}}>
                      前往原题
                    </Button>
                  </Link>
                }
              </Col>
              <Col lg={24}>
                <Card>
                  <div className="detailed-nav comm-box">
                    <div className={styles.navTitle}>文章目录</div>
                    <div className="toc-list">
                      {tocify && tocify.tocItems.length ? tocify.render() :
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
                    </div>
                  </div>

                </Card>

              </Col>
            </Row>

          </Affix>
        </Col>
      </Skeleton>
    </Row>

  )
}
export default Detail;
