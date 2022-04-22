/**
 * @FileName: WithProgress
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/1 19:01
 */
import React, { Component } from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

export const WidthProgress = (WrappedComponent) => {
  class NewComponent extends Component {
    componentWillMount() {
      Nprogress.start();
      console.log(111)
    }

    componentDidMount() {
      Nprogress.done();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  // 拷贝「包装组件」的静态方法到「新组件」
  hoistNonReactStatic(NewComponent, WrappedComponent);
  return NewComponent;
};
