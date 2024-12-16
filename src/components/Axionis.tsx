import { useState } from 'react'
import useChat from '../hooks/useChat.tsx';

import AxionisImg from '/public/axionis.jpg'
import ThreeDotsVertical from '../assets/threeDotsVertical.svg';
import SendIcon from '../assets/send.svg';

const Axionis = () => {
  const [input, setInput] = useState<string>('');
  const { history, getResponse } = useChat()
  
  
  const handleSubmit = async () => {
    await getResponse(input); // await response from ai
  };
  
  return (
    <>
      <section className="container">
        <ul className="topbar">
         <li>
          <img 
            src={AxionisImg} 
            alt="Axionis" 
            id="axionis-dp" />
           
          <h3 id="axionis-name">
            Axionis
          </h3>
        </li>
        <li>
          <img 
           src={ThreeDotsVertical}
           alt="Three dots vertical" />
        </li>
       </ul>
       
       <ul className="action-tab">
         <li>
           <i className="fa-solid fa-circle-user"></i> Developer
         </li>
         <li>
           <i className="fa-solid fa-info-circle"></i> View details
         </li>
         <li>
           <i className="fa-solid fa-edit"></i> New chat
         </li>
       </ul>
       
       <div className="chatbox">
        { 
          history.length > 0 ? (
           history.map((chat, index) => (
            <div key={index}>
             {chat.parts[0].text}
            </div>
           ))
          ) : (
           <div className="default-screen">
            <img 
              src={AxionisImg}
              alt="Axionis Chatbot" />
            <h3>
              Axionis
            </h3>
            <p>
              Hi, I'm Axionis. Your friendly ai chatbot.
            </p>
         </div>
        )}
       </div>
      
      
       <div className="chat-sender">
        <input 
          type="text"
          value={input}
          className="chat-input"
          placeholder="Send a message"
          onChange={(e) => setInput(e.target.value)} />
          
        <button className="send-button" onClick={handleSubmit} >
         <img 
           src={SendIcon}
           alt="Send icon" />
        </button>
       </div>
       
      </section>
    </>
  )
}

export default Axionis
