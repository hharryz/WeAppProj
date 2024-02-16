import NoteCard, { Note } from "@/components/notecard/notecard"
import { useEffect, useState } from "react"
import Taro, { useLoad } from "@tarojs/taro"
// import Taro, { useLoad } from '@tarojs/taro'
import './moments.scss'

// import { Note, User } from '@/components/notecard/notecard'



export default function Moments() {
    // useLoad(() => {
    //     // Taro.showTabBar()
    // })

    // const note: Note = {
    //     id: 1,
    //     userid: '2',
    //     time: '20211010',
    //     tag: 'Life',
    //     mark: 0,
    //     share: true,
    //     star: true,
    //     content: 'this is content.'
    // }

    // const user: User = {
    //     name: 'Matilda',
    //     userid: '1',
    //     avatar: 'https://t7.baidu.com/it/u=1700588201,792130339&fm=193&f=GIF'
    // }

    // const getUsers = () => {
    //     const res = Taro.cloud.callContainer({
    //         "config": {
    //           "env": "prod-7gbkokc9486b1064"
    //         },
    //         "path": "/api/login",
    //         "header": {
    //           "X-WX-SERVICE": "myapp-demo",
    //           "content-type": "application/json"
    //         },
    //         "method": "GET",
    //       }).then(result => {
    //         console.log(result.data)
    //         result.data.data.map((item: any) => {
    //             getNotes(item.userid)
    //         })
    //       })
    //     //   console.log(res)
    // }

    // const getNotes = async (userid: string) => {
        
    //     Taro.cloud.callContainer({
    //         "config": {
    //           "env": "prod-7gbkokc9486b1064"
    //         },
    //         "path": `/api/note?userid=${userid}`,
    //         "header": {
    //           "X-WX-SERVICE": "myapp-demo",
    //           "content-type": "application/json"
    //         },
    //         "method": "GET",
    //     }).then(res => {
    //         console.log(res.data.data)
    //         res.data.data.map((item: any) => {
    //             // console.log("mapping over the id", item)
    //             const mynote: Note = {
    //                 id: item.id,
    //                 userid: item.userid,
    //                 time: item.time,
    //                 tag: item.tag,
    //                 mark: item.mark,
    //                 share: item.share,
    //                 star: item.star,
    //                 content: item.content
    //             }
    //             setNoteList([...noteList, mynote])
    //         })
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

    // var noteList: Note[] = []
    const [noteList, setNoteList] = useState<Note[]>([])

    const getUsers = async () => {
        try {
            const result = await Taro.cloud.callContainer({
                "config": {
                    "env": "prod-7gbkokc9486b1064"
                },
                "path": "/api/login?me=true",
                "header": {
                    "X-WX-SERVICE": "myapp-demo",
                    "content-type": "application/json"
                },
                "method": "GET",
            });
            
            // // 使用 Promise.all 等待所有的 getNotes 函数执行完毕
            // await Promise.all(result.data.data.map((item: any) => getNotes(item.userid)));
    
            // // 在所有的 getNotes 函数执行完毕后进行排序和设置
            // setNoteList([...noteList].sort((a, b) => parseInt(a.time) - parseInt(b.time)));
            const allNotes = await Promise.all(result.data.data.map((item: any) => getNotes(item.userid)));

        // 合并所有笔记到一个数组
        const mergedNotes = allNotes.reduce((acc, notes) => acc.concat(notes), []);

        // 对合并后的笔记进行排序
        const sortedNotes = mergedNotes.sort((a, b) => parseInt(b.time) - parseInt(a.time));

        // 设置笔记列表
        setNoteList(sortedNotes);
        } catch (error) {
            console.error(error);
        }
    }
    
    const getNotes = async (userid: string) => {
        try {
            const res = await Taro.cloud.callContainer({
                "config": {
                    "env": "prod-7gbkokc9486b1064"
                },
                "path": `/api/note?userid=${userid}`,
                "header": {
                    "X-WX-SERVICE": "myapp-demo",
                    "content-type": "application/json"
                },
                "method": "GET",
            });
    
            // 将获取的笔记添加到临时数组中
            const notes = res.data.data.map((item: any) => ({
                id: item.id,
                userid: item.userid,
                time: item.time,
                tag: item.tag,
                mark: item.mark,
                share: item.share,
                star: item.star,
                content: item.content
            }));
    
            // 返回获取的笔记数组
            return notes;
        } catch (error) {
            console.error(error);
            // 如果出错返回空数组
            return [];
        }
    }

    const getMe = async () => {
        try{
            // var myid: string
            await Taro.cloud.callContainer({
            "config": {
                "env": "prod-7gbkokc9486b1064"
            },
            "path": "/api/login?me=true",
            "header": {
                "X-WX-SERVICE": "myapp-demo",
                "content-type": "application/json"
            },
            "method": "GET",
        }).then(res => {
            console.log(res.data.data.userid)
            return res.data.data.userid
        })
        // return myid
        } catch (error) {
            console.error(error);
            return ""
        }
    }
    

    const getAllNotes = () => {
        Taro.cloud.callContainer({
            "config": {
                "env": "prod-7gbkokc9486b1064"
            },
            "path": "/api/login?me=true",
            "header": {
                "X-WX-SERVICE": "myapp-demo",
                "content-type": "application/json"
            },
            "method": "GET",
        }).then(res => {
            console.log(res.data.data.userid)
            return res.data.data.userid
        }).then(myid => {
        const result = Taro.cloud.callContainer({
            "config": {
                "env": "prod-7gbkokc9486b1064"
            },
            "path": "/api/login",
            "header": {
                "X-WX-SERVICE": "myapp-demo",
                "content-type": "application/json"
            },
            "method": "GET",
        }).then(res => {
            console.log(res.data.data)
            setNoteList(res.data.data.map((item: any) => {
                // console.log(item.userid, myid, item.userid == myid)
                return {
                    id: item.id,
                    userid: item.userid,
                    time: item.time,
                    tag: item.tag,
                    mark: item.mark,
                    share: item.share,
                    star: item.star,
                    content: item.content,
                    name: item.name,
                    avatar: item.avatar,
                    ismine: item.userid == myid
                }
            }).sort((a: any, b: any) => parseInt(b.time) - parseInt(a.time)))
        })
    })
    }
    
    useLoad(() => {
        getAllNotes()
        // getUsers()
        // console.log("noteList: ", noteList)
    })
    return (
        <div className='moments'>
            
            {noteList.map((item) => {
                // console.log(item)
                return (
                    <NoteCard note={item} key={item.id} />
                )

            })}
            {/* <NoteCard note={note} user={user} /> */}
            {/* <NoteCard note={note}  user={user} /> */}
        </div>
    )
}