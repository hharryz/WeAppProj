import { useState } from 'react'
import { ConfigProvider, Tag, TextArea } from '@nutui/nutui-react-taro'
import './collapse.scss'

export default function Collapse() {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const textAreaTheme = {
        nutuiTextareaPadding: '0 0',
    }

    const tagTheme = {
        nutuiTagBackgroundColor: 'aquamarine',
    }

    const handleClick = () => {
        setIsClicked(!isClicked);
    }

    const collapseContent = (click: boolean) => {
        if (click) {
            return (
                <div className='main-clicked'>
                    <div className='color-tag'></div>
                    <div className='card-content'>
                        <div className='card-header'>
                            <div className='content'>
                                <div className='head'>微信小程序大作业</div>
                                <div className='tag'>
                                    <ConfigProvider theme={tagTheme}><Tag>hahaaaa</Tag></ConfigProvider>
                                </div>
                            </div>
                            <div className='time'>02-17</div>
                        </div>
                        <div className='card-body'>
                            <ConfigProvider theme={textAreaTheme}>
                                <TextArea readOnly defaultValue='众所周知，微信小程序是一款。。。众所周知，微信小程序是一款。。。众所周知，微信小程序是一款。。。众所周知，微信小程序是一款。。。众所周知，微信小程序是一款。。。众所周知，微信小程序是一款。。。众所周知，微信小程序是一款。。。' />
                            </ConfigProvider>
                        </div>
                    </div>
                    
                </div>
            );
        } else {
            return (
                <div className='main-unclicked'>
                    <div className='color-tag'></div>
                    <div className='content'>
                        <div className='head'>微信小程序大作业</div>
                        <div className='body'>摆烂！</div>
                    </div>
                    <div className='time'>02-17</div>
                </div>
            );
        }
    }

    return (
        <div className='collapse-card' onClick={handleClick}>
            {collapseContent(isClicked)}
        </div>
    );
}