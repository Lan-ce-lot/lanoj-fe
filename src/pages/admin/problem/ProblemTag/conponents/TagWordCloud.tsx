/**
 * @FileName: TagWordCloud
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/25 14:54
 */
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {WordCloud} from '@ant-design/plots';
import {getTagList} from "../../../../../api/admin/tag";


//import styles from './TagWordCloud.module.scss'

interface IProps {
  // data:any;
}

interface IState {

}

const TagWordCloud: React.FC<IProps> = ({}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let isRequestCancelled = false;
    getTagList({}).then(res => {
      // if (!isRequestCancelled) {
        setData(res.data.data.records)
      // }
    })
    return () => {
      isRequestCancelled = true;
    };
  }, []);
  const config = {
    data,
    wordField: 'name',
    weightField: 'problemNumber',
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
