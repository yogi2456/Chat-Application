import React, { useEffect, useState } from 'react'
import Input from '../../components/Input'
import { estimatedDocumentCount } from '../../../../server/modals/users'

const Dashboard = () => {


  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')))
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState({})
  const [message, setMessage] = useState('')
  console.log('user >>:', user);
  console.log('conversations :>>', conversations);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user:detail'))
    const fetchConversations = async () => {
      const res = await fetch(`http://localhost:8000/api/conversation/${loggedInUser?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const resData = await res.json();
      console.log('resData >>:', resData)
      setConversations(resData)
    }
    fetchConversations()
  }, [])


  const fetchMessages = async (conversationId, user) => {
    const res = await fetch(`http://localhost:8000/api/message/${conversationId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const resData = await res.json();
      console.log('resData >>:', resData)
      setMessages({messages: resData, receiver: user, conversationId})
  }

  const sendMessage = async (e) => {
    const res = await fetch(`http://localhost:8000/api/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'applicaion/json'
      },
      body: JSON.stringify({
        conversationId: messages?.conversationId?.id,
        senderId: user?.id,
        message,
        receiverId: messages?.receiver?.id
      })
    });
    // const resData = await res.json()
    // console.log('resData', resData);
    setMessage('')
  }

  return (
    <div className='w-screen flex'>
      <div className='w-[25%] h-screen bg-secondary'>
        <div className='flex items-center my-6 mx-6'>
          <div className='border border-primary p-[2px] rounded-full'><img src='https://www.svgrepo.com/show/81103/avatar.svg' width={50} height={50}/></div>
          <div className='ml-6'>
            <h3 className='text-xl'>{user.fullName}</h3>
            <p className='text-xs font-light'>My Account</p>
          </div>
        </div>
        <hr className='border-black'/>
         <div className='mx-10 mt-6'>
        <div className='text-primary text-lg'>Message</div>
        <div>
          {
            !conversations.length > 0 ?
          conversations.map(({ conversationId, user}) => {
            return (
              <div className='flex items-center py-2 border-b border-b-gray-300'>
          <div className='flex cursor-pointer items-center' onClick={() => fetchMessages(conversationId, user)}>
            <div className='border border-primary p-[2px] rounded-full'><img src={"https://www.svgrepo.com/show/81103/avatar.svg"} width={25} height={25}/></div>
          <div className='ml-6'>
            <h3 className='text-xs'>{user?.fullName}</h3>
            <p className='text-xs font-light text-gray-600'>{user?.email}</p>
          </div>
          </div>
        </div>
            )
          }) : <div className='text-center text-lg font-semibold'>No Conversations</div>
        }
        </div>
      </div>
      </div>
      <div className='w-[50%] h-screen bg-white flex flex-col items-center'>
       {
        messages?.receiver?.fullName &&
        <div className='w-[75%] bg-secondary h-[50px] my-8 rounded-full flex items-center px-10'>
        <div className='cursor-pointer'>
          <img src='https://www.svgrepo.com/show/81103/avatar.svg' width={25} height={25}/>
        </div>
        <div className='ml-6 mr-auto'>
          <h1 className='text-xs'>{messages?.receiver?.fullName}</h1>
          <p className='text-xs font-light text-gray-600'>{messages?.receiver?.email}</p>
        </div>
        <div className='cursor-pointer'>
        <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  
        stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-phone-incoming"><path stroke="none" 
        d="M0 0h24v24H0z" fill="none"/><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
        <path d="M15 9l5 -5" /><path d="M15 5l0 4l4 0" /></svg>
        </div>
      </div>
       }
        <div className='h-[75%] w-full overflow-scroll shadow-sm'>
          <div className='p-8'>
            {
              messages?.messages?.length > 0 ?
              messages.messages.map(({ message, user : { id } = {}}) => {
                return (
                  <div className={`max-w-[40%] rounded-b-xl p-4 mb-6 ${id === user?.id ?
                    'bg-primary text-white rounded-tl-xl ml-auto' : 'bg-secondary rounded-tr-xl'
                  }`}>
                    {message}
                  </div>
                )
              }) : <div className='text-center text-lg font-semibold mt-24'>No Messages or No Conversation Selected</div>
            }
          </div>
        </div>
        {
          messages?.receiver?.fullName &&
          <div className='px-8 py-4 w-full flex items-center'>
          <Input placeholder='Type a Message' value={message} onChange={(e) => setMessages(e.target.value)} className='w-[75%]' inputClassName='p-2 shadow-md 
          rounded-full bg-light focus:ring-0 focus:border-0 outline-none'/>
          <div className={`ml-3 p-2 cursor-pointer bg-light rounded-full ${!message && 'pointer-events-none'}`} onClick={() => sendMessage()}>
          <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  
          stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  
          class="icon icon-tabler icons-tabler-outline icon-tabler-send">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M10 14l11 -11" />
            <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
          </div>
          <div className={`ml-3 p-2 cursor-pointer bg-light rounded-full ${!message && 'pointer-events-none'}`}>
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  
          stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M9 12h6" />
          <path d="M12 9v6" /></svg>
          </div>
        </div>
        }
      </div>
      <div className='w-[25%] h-screen bg-light'></div>
    </div>
  )
}

export default Dashboard
