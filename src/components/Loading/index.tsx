import React, { useEffect } from "react";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";
import {useLocation} from "react-router-dom";
import {Spin} from "antd";
import {connect} from "react-redux";
import Loader from "../Loader/Loader"; // progress bar style

NProgress.configure({ showSpinner: false }); // NProgress Configuration
interface IPorps {
  loading?:boolean
}
const Loading:React.FC<IPorps> = ({loading = false}) => {
  // useEffect(() => {
  //   NProgress.start();
  //   return () => {
  //     NProgress.done();
  //   };
  // }, []);
  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [loading])
  //npm install <一些参数> --registry=https://registry.npm.taobao.org
  return (
    <div className="app-container">
      {/*<Loader/>*/}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {...state.app};
};
export default connect(mapStateToProps)(Loading);
