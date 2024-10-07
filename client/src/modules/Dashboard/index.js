import React from 'react'
import Input from '../../components/Input'

const Dashboard = () => {

  const Contacts = [
    {
      name: "John",
      status: "Available",
      image: "https://www.svgrepo.com/show/81103/avatar.svg"
    },
    {
      name: "Rahul",
      status: "Available",
      image: "https://www.svgrepo.com/show/81103/avatar.svg"
    },
    {
      name: "Srinivas",
      status: "Available",
      image: "https://www.svgrepo.com/show/81103/avatar.svg"
    },
    {
      name: "Anuj",
      status: "Available",
      image: "https://www.svgrepo.com/show/81103/avatar.svg"
    },
    {
      name: "Parsha",
      status: "Available",
      image: "https://www.svgrepo.com/show/81103/avatar.svg"
    },
    {
      name: "Karan",
      status: "Available",
      image: "https://www.svgrepo.com/show/81103/avatar.svg"
    },
  ]
  return (
    <div className='w-screen flex'>
      <div className='w-[25%] h-screen bg-secondary'>
        <div className='flex items-center my-6 mx-6'>
          <div className='border border-primary p-[2px] rounded-full'><img src='https://www.svgrepo.com/show/81103/avatar.svg' width={50} height={50}/></div>
          <div className='ml-6'>
            <h3 className='text-xl'>Tutorials Dev</h3>
            <p className='text-xs font-light'>My Account</p>
          </div>
        </div>
        <hr className='border-black'/>
         <div className='mx-10 mt-6'>
        <div className='text-primary text-lg'>Message</div>
        <div>
          {Contacts.map(({name, status, image}) => {
            return (
              <div className='flex items-center py-2 border-b border-b-gray-300'>
          <div className='flex cursor-pointer items-center'>
            <div className='border border-primary p-[2px] rounded-full'><img src={image} width={25} height={25}/></div>
          <div className='ml-6'>
            <h3 className='text-xs'>{name}</h3>
            <p className='text-xs font-light text-gray-600'>{status}</p>
          </div>
          </div>
        </div>
            )
          })}
        </div>
      </div>
      </div>
      <div className='w-[50%] h-screen bg-white flex flex-col items-center'>
        <div className='w-[75%] bg-secondary h-[50px] my-8 rounded-full flex items-center px-10'>
          <div className='cursor-pointer'>
            <img src='https://www.svgrepo.com/show/81103/avatar.svg' width={25} height={25}/>
          </div>
          <div className='ml-6 mr-auto'>
            <h1 className='text-xs'>Anuj</h1>
            <p className='text-xs font-light text-gray-600'>online</p>
          </div>
          <div className='cursor-pointer'>
          <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  
          stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-phone-incoming"><path stroke="none" 
          d="M0 0h24v24H0z" fill="none"/><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
          <path d="M15 9l5 -5" /><path d="M15 5l0 4l4 0" /></svg>
          </div>
        </div>
        <div className='h-[75%] w-full overflow-scroll shadow-sm'>
          <div className='p-8'>
            <div className='max-w-[60%] bg-secondary rounded-b-xl rounded-tr-xl text-xs p-2 mb-6'>
              lorem is the figure akshitha i love u yogesh it is the first thing</div>
            <div className='max-w-[60%] bg-primary rounded-b-xl rounded-tl-xl text-xs p-2 ml-auto text-white mb-6'>
            lorem is the figure akshitha i love u yogesh it is the first thing
            </div>
            <div className='max-w-[60%] bg-secondary rounded-b-xl rounded-tr-xl text-xs p-2 mb-6'>
              lorem is the figure akshitha i love u yogesh it is the first thing</div>
            <div className='max-w-[60%] bg-primary rounded-b-xl rounded-tl-xl text-xs p-2 ml-auto text-white mb-6'>
            lorem is the figure akshitha i love u yogesh it is the first thing
            </div>
            <div className='max-w-[60%] bg-secondary rounded-b-xl rounded-tr-xl text-xs p-2 mb-6'>
              lorem is the figure akshitha i love u yogesh it is the first thing</div>
            <div className='max-w-[60%] bg-primary rounded-b-xl rounded-tl-xl text-xs p-2 ml-auto text-white mb-6'>
            lorem is the figure akshitha i love u yogesh it is the first thing
            </div>
            <div className='max-w-[60%] bg-secondary rounded-b-xl rounded-tr-xl text-xs p-2 mb-6'>
              lorem is the figure akshitha i love u yogesh it is the first thing</div>
            <div className='max-w-[60%] bg-primary rounded-b-xl rounded-tl-xl text-xs p-2 ml-auto text-white mb-6'>
            lorem is the figure akshitha i love u yogesh it is the first thing
            </div>
          </div>
        </div>
        <div className='px-8 py-4 w-full flex items-center'>
          <Input placeholder='Type a Message' className='w-[75%]' inputClassName='p-2 shadow-md 
          rounded-full bg-light focus:ring-0 focus:border-0 outline-none'/>
          <div className='ml-3 p-2 cursor-pointer bg-light rounded-full'>
          <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  
          stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  
          class="icon icon-tabler icons-tabler-outline icon-tabler-send">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M10 14l11 -11" />
            <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
          </div>
          <div className='ml-3 p-2 cursor-pointer bg-light rounded-full'>
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  
          stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M9 12h6" />
          <path d="M12 9v6" /></svg>
          </div>
        </div>
      </div>
      <div className='w-[25%] h-screen bg-light'></div>
    </div>
  )
}

export default Dashboard
