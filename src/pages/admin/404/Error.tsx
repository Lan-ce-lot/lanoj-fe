import React from 'react'
import {FrownOutlined} from '@ant-design/icons'

// import styles from './Error.sass'
import './Error.sass'
import Page from '../../../components/Page/Page';
import {Link} from "react-router-dom";

const Error = () => (
  <Page inner>
    <div className="error-page">
      <div>
        <h1 data-h1="404">404</h1>
        <p data-p="NOT FOUND">NOT FOUND</p>

      </div>
    </div>
    <Link to={'/'}>
      <a className="back" href="#">

        GO BACK

      </a></Link>
  </Page>
)

export default Error
