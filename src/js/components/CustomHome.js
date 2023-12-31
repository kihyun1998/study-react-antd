/* eslint-disable*/
import '../../css/App.css';
import React from "react";
import {useLocation } from 'react-router-dom';
import CustomProTable from './CustomTable';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';


function CustomHome(props) {
    const pwd = useLocation()
    // 0번 인덱스는 공백임
    const pwdArr = pwd.pathname.split('/')
    return (
        <div className='in-table'>
            <div className='table-header'>
                <h2 style={{color : props.isDarkMode ? "#ffffff" : "#000000"}}>
                    accessEvent
                </h2>
                <div>
                <Breadcrumb
                    items={[
                    {
                        href: '',
                        title: <HomeOutlined />,
                    },
                    {
                        href: '',
                        title: "access",
                    },
                    {
                        title: "accessEvent",
                    },
                    ]}
                />
                </div>
            </div>
            <hr style={{background : props.isDarkMode ? "#444444" : "#000000"}}/>
            <CustomProTable/>
        </div>
    );
}

export default CustomHome;