/**
 * @FileName: CommonCarousel
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/4 10:41
 */
import React, {CSSProperties} from "react";
import {Carousel, Image} from 'antd';
//import styles from './CommonCarousel.module.scss'

interface IProps {

}

interface IState {

}
const contentStyle:CSSProperties = {
  height: '380px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const CommonCarousel: React.FC<IProps> = ({}) => {
  return (<>
    <Carousel autoplay>
      <Image preview={false} loading={"lazy"} src={'/img/CommonCarousel_1.png'}/>
      {/*<div>*/}
      {/*  <h3 style={contentStyle}>1</h3>*/}
      {/*</div>*/}

      <Image preview={false} loading={"lazy"} src={'/img/CommonCarousel_2.jpg'}/>
      <Image preview={false} src={'/img/CommonCarousel_3.png'}/>

      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>,
  </>)
}
export default CommonCarousel;
