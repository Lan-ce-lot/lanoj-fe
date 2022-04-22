import React from "react";
import styles from './Footer.module.scss'
import classNames from 'classnames';
import {Link} from 'react-router-dom'
import {Row
  , Col
  , Menu
  , Button
} from "antd";
import {HomeOutlined
  ,AppstoreOutlined
  ,FileDoneOutlined
  ,TrophyOutlined
  ,StockOutlined
  ,ReadOutlined
} from '@ant-design/icons';
interface FooterProps {
  links?: Array<{
    key?: string;
    title: React.ReactNode;
    href: string;
    blankTarget?: boolean;
  }>;
  copyright?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}
const Footer: React.FunctionComponent<FooterProps>  = (props) => {
  const links = props.links
  const copyright = props.copyright || 'Lan Online Judge ©2022 lancel'
  return (
    <footer className={styles.globalFooter}>
      {links && (
        <div className={styles.links}>
          {links.map(link => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && <div className={styles.copyright}>{copyright}</div>}
    </footer>
  )
}
export default Footer;
