import { useState } from 'react'
import { ConfigProvider, Tag, Button } from '@nutui/nutui-react-taro'

import { Todo } from '@/pages/index'
import './collapse.scss'
import Taro from '@tarojs/taro';


export default function Collapse({ todo }: { todo: Todo }) {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const doneTagTheme = {
        nutuiTagBackgroundColor: '#77bba5',
    }

    const undoneTagTheme = {
        nutuiTagBackgroundColor: '#d67976',
    }

    const handleClick = () => {
        setIsClicked(!isClicked);
    }

    const buttonClick = () => {
        console.log('Button clicked.' + todo.id);
        Taro.navigateTo({url: `../../pages/new_todo/new_todo?param1=todo&param2=${todo.id}`});
    }

    const lessTime = (time: string) => {
        if (time.length == 12 || time.length == 8) {
            return (time.slice(4, 6) + '-' + time.slice(6, 8));
        } else {
            return time;
        }
    }

    const moreTime = (time: string) => {
        if (time.length == 12) {
            return (time.slice(4, 6) + '-' + time.slice(6, 8) + ' ' + time.slice(8, 10) + ':' + time.slice(10, 12));
        } else if (time.length == 8) {
            return (time.slice(4, 6) + '-' + time.slice(6, 8));
        } else {
            return time;
        }
    }

    const lessTime = (time: string) => {
        if (time.length == 12 || time.length == 8) {
            return (time.slice(4, 6) + '-' + time.slice(6, 8));
        } else {
            return time;
        }
    }

    const moreTime = (time: string) => {
        if (time.length == 12) {
            return (time.slice(4, 6) + '-' + time.slice(6, 8) + ' ' + time.slice(8, 10) + ':' + time.slice(10, 12));
        } else if (time.length == 8) {
            return (time.slice(4, 6) + '-' + time.slice(6, 8));
        } else {
            return time;
        }
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
                                    <ConfigProvider theme={todo.done? doneTagTheme : undoneTagTheme}><Tag>{todo.done? "DONE" : "UNDONE"}</Tag></ConfigProvider>
                                </div>
                            </div>
                            <div className='time'>{ moreTime(todo.deadline) }</div>
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
                        <div className='head'>{ 
                            todo.topic.length > 10? 
                            (todo.topic.slice(0, 10) + '...') : todo.topic
                        }</div>
                        <div className='body'>{ 
                            todo.content.length > 15? 
                            (todo.content.slice(0, 15) + '...') : todo.content
                        }</div>
                    </div>
                    <div className='time'>{ lessTime(todo.deadline) }</div>
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