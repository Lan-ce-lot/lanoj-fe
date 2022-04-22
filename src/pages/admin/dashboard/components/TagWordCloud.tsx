/**
 * @FileName: TagWordCloud
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/25 14:54
 */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { WordCloud } from '@ant-design/plots';


//import styles from './TagWordCloud.module.scss'

interface IProps {

}

interface IState {

}

const TagWordCloud: React.FC<IProps> = ({}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  //  [{ "value": 2, "name": "Domo" },
  //   { "value": 2, "name": "GPL" },]
  const config = {
    data,
    wordField: 'name',
    weightField: 'value',
    colorField: 'name',
    // imageMask: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [8, 32] as [number, number],
    },
  };

  return (
    <WordCloud
      {...config}
    />
);

}
export default TagWordCloud;
