import { useState } from 'react'
import { ConfigProvider, Tag, Button } from '@nutui/nutui-react-taro'

import { Todo } from '@/pages/index'
import './collapse.scss'


export default function Collapse({ todo }: { todo: Todo }) {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const tagTheme = {
        nutuiTagBackgroundColor: 'aquamarine',
    }

    const handleClick = () => {
        setIsClicked(!isClicked);
    }

    const buttonClick = () => {
        console.log('Button clicked.');
    }

    const collapseContent = (click: boolean) => {
        if (click) {
            return (
                <div className='main-clicked'>
                    <div className='color-tag'></div>
                    <div className='card-content'>
                        <div className='card-header' onClick={handleClick}>
                            <div className='content'>
                                <div className='head'>{ todo.topic }</div>
                                <div className='tag'>
                                    <ConfigProvider theme={tagTheme}><Tag>hahaaaa</Tag></ConfigProvider>
                                </div>
                            </div>
                            <div className='time'>02-17</div>
                        </div>
                        <div className='card-body'>
                            { todo.content }
                        </div>
                        <div className='card-footer'>
                            <Button size='mini' onClick={buttonClick} className='button' 
                              style={{
                                margin: 8,
                                '--nutui-button-default-border-color': '#5d6fbb',
                                '--nutui-button-default-color': '#fff',
                                '--nutui-button-default-background-color': '#5d6fbb',
                              }}>编辑</Button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='main-unclicked' onClick={handleClick}>
                    <div className='color-tag'></div>
                    <div className='content'>
                        <div className='head'>{ todo.topic }</div>
                        <div className='body'>{ todo.content }</div>
                    </div>
                    <div className='time'>{ todo.deadline }</div>
                </div>
            );
        }
    }

    return (
        <div className='collapse-card'>
            {collapseContent(isClicked)}
        </div>
    );
}