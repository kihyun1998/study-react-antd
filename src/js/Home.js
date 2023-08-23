/* eslint-disable*/
import '../css/App.css';
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import CustomPage from './pages/CustomPage';

import menuData from '../data/menu.json'

import koKR from 'antd/lib/locale/ko_KR';
import { ConfigProvider, theme, Button, FloatButton } from "antd";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  HistoryOutlined
} from '@ant-design/icons';

import { MdDarkMode,MdOutlineLightMode } from "react-icons/md";
import CustomMenu from './components/CustomMenu';



function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
  };
}

const iconList = [<DesktopOutlined />,<TeamOutlined />,<ContainerOutlined />,<HistoryOutlined />,<AppstoreOutlined />]

const setItems = ()=>{
  let itemsArr=[]
  let cnt = 0
  for (let [k, v] of Object.entries(menuData.Children)) {
    if (v.Show == true){
      let subArr = []

      for (let [ck,cv] of Object.entries(v.Children)){
        if(cv.Show == true){
          let sub_itm = getItem(ck,ck)
          subArr.push(sub_itm)
        }
      }
      let itm = getItem(k,k,iconList[cnt-1],subArr)
      itemsArr.push(itm)
    }
    cnt++
  }

  return itemsArr
}

const setItemsCol = ()=>{
  let itemsArr=[]
  let cnt = 0
  for (let [k, v] of Object.entries(menuData.Children)) {
    if (v.Show == true){
      let subArr = []
      let subArr2 = []
      for (let [ck,cv] of Object.entries(v.Children)){
        if(cv.Show == true){
          let sub_itm = getItem(ck,ck)
          subArr2.push(sub_itm)
        }
      }

      let itmArr = []
      let itm2 = getItem(k,`${k}_${cnt}`,null,subArr2,'group')
      itmArr.push(itm2)

      let itm = getItem(k,k,iconList[cnt-1],itmArr)
      itemsArr.push(itm)
    }
    cnt++
  }

  return itemsArr
}



function Home(props) {
  let isDarkMode = props.isDarkMode
  let keyPath = props.keyPath

  
  let items = setItems()
  let colItems = setItemsCol()
  const { defaultAlgorithm, darkAlgorithm } = theme;
  

  const handleClick = () => {
    props.setIsDarkMode((previousValue) => !previousValue);
  }

  // 메뉴를 위한 부분
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="App" style={{backgroundColor : isDarkMode ? "#000000" : "#ffffff"}}>
      {/* 삼항연산자 사용하기 */}
      
      
      <div className='body'>
        
        <ConfigProvider locale={koKR} theme={{
            algorithm : isDarkMode ? darkAlgorithm : defaultAlgorithm
            }}>
            <FloatButton
              icon={ isDarkMode ? <MdOutlineLightMode/> : <MdDarkMode/>}
              onClick={handleClick}
            />

            <div className="head-space">
              <div className="header" style={{backgroundColor : isDarkMode ? "#141414" : "#1C71C4"}}>
                <div className='btn-menu'>
                  <Button
                    type="primary"
                    onClick={toggleCollapsed}
                  >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  </Button>
                </div>
                <h1>ACRA Point</h1>
                <div className="color-card"></div> 
              </div>
            </div>
            
            <div className='main'>
              {/* 메뉴부분 */}
              <div className='menu'>
                <CustomMenu items={items} colItems={colItems} keyPath={keyPath} setKeyPath={props.setKeyPath} isDarkMode={isDarkMode} collapsed={collapsed}></CustomMenu> 
              </div>

              <CustomPage keyPath={keyPath} isDarkMode={isDarkMode}/>
              

              <div className='blank'></div>
            </div>
        </ConfigProvider>
      </div>
      
    </div>
  );
}

export default Home;