import NoteCard from "@/components/notecard/notecard"
// import Taro, { useLoad } from '@tarojs/taro'

import './moments.scss'
export interface Note {
  id: number;
  userid: string;
  time: string;
  tag: string;
  mark: number;
  share: boolean;
  star: boolean;
  content: string;
}

export interface User {
  name: string;
  userid: string;
  avatar: string;
}
export default function Moments() {
    // useLoad(() => {
    //     // Taro.showTabBar()
    // })
    const note: Note = {  
      id: 1,  
      userid: "user123",  
      time: "20240215",  
      tag: "note",  
      mark: 4,  
      share: true,  
      star: false,  
      content: "This is a note content.",  
    };  
      
    const user: User = {  
      name: "John Doe",  
      userid: "user123",  
      avatar: "https://example.com/avatar.jpg",  
    };  
    return (
        <div className='moments'>
            <NoteCard note={note} user={user} />
        </div>
    )
}