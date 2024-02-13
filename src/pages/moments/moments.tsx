import NoteCard from "@/components/notecard/notecard"
import './moments.scss'
import  React, { useState } from "react"
import { ActionSheet,Cell } from '@nutui/nutui-react-taro'

export default function Moments() {

    const [isVisible5, setIsVisible5] = useState(false)
    return (
        <div>
        {/* <div className='moments'>
            <NoteCard />
        </div> */}
      <Cell  onClick={() => setIsVisible5(!isVisible5)}>
        <span>自定义内容</span>
      </Cell>
      hello????
      <ActionSheet
        visible={isVisible5}
        cancelText='cancel'
        onSelect={() => {
          setIsVisible5(false)
        }}
        onCancel={() => setIsVisible5(false)}
      >
        <div style={{ textAlign: 'left', padding: '10px 20px' }}>
          新建表格
        </div>
        <div style={{ textAlign: 'left', padding: '10px 20px' }}>
          新建文档
        </div>
      </ActionSheet>
      </div>
    )

    
}