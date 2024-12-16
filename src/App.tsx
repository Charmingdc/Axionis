import { useState } from 'react'


import AxionisImg from '/public/axionis.jpg'
import PWABadge from './PWABadge.tsx'
import './App.css'



const App = () => {
  const [prompt, setPrompt] = useState<string>('');
  
  

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
          <i className="fa-solid fa-ellipsis-vertical" id="three-dot"></i>
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
        
       </div>
      
      
       <div className="chat-sender">
        <input 
          type="text"
          value='Hello'
          className="chat-input"
          placeholder="Send a message"
          onChange={(e) => setPrompt(e.target.value)} />
          
        <button className="send-button" onClick={handleSubmit} >
         <i className="fa-solid fa-paper-plane" id="send-icon"></i>
        </button>
       </div>
       
      </section>
      
      <PWABadge />
    </>
  )
}

export default App
