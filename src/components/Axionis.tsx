import { useState } from 'react'
import useChat from '../hooks/useChat.tsx';

import AxionisImg from '/public/axionis.jpg';
import CharmingdcImg from '../assets/charmingdc.jpg';



const Axionis = () => {
  const [input, setInput] = useState<string>('');
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [about, setAbout] = useState<boolean>(false);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  let { history, getResponse } = useChat();

  
  const handleSubmit = async () => {
    await getResponse(input); // await response from ai
    setIsloading(false); // set loading state to false
  };
  
  const handleClear = () => {
    history = []; // clear all past conversations 
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
        <li onClick={() => setOpenMenu(!openMenu)}>
         <i className="fa-solid fa-ellipsis-vertical" id="three-dot"></i>
        </li>
       </ul>
       
       
       {
        openMenu && (
         <ul className="action-tab">
           <li onClick={() => setAbout(!about)}>
             <i className="fa-solid fa-circle-user"></i> Developer
           </li>
           <li onClick={() => setOpenModel(!openModel)}>
             <i className="fa-solid fa-info-circle"></i> View details
           </li>
           <li onClick={handleClear}>
             <i className="fa-solid fa-edit"></i> New chat
           </li>
         </ul>
        )
       }
       
       
      {
       about && (
        <div className="about-dev">
          <ul>
           <li>
          
           </li>
           <li onClick={() => setAbout(!about)}>
             <i className="fa-solid fa-circle-xmark"></i>
           </li>
          </ul>
          
          <img 
            src={CharmingdcImg} 
            alt="Charmingdc" />
            
          <h2>
           Charmingdc
          </h2><br />
          
          <p>
           I'm <strong>Adebayo Muis</strong> but also known as <strong>Charmingdc</strong>. I'm a creative web developer with lot of passion for tech.
         </p>
         
         <p>
           I design beautiful and responsive web interface while also paying close attention to user experience thus making vistors addicted to the websites I build. 
         </p>
         
         <p>
           I'm availabe for any job opportunity as a frontend developer as well as internships and freelance projects. <br /><br />
           Github profile: <a href="https://github.com/Charmingdc" target="_blank"> https://github.com/Charmingdc </a> <br />
           My personal website: <a href="https://taplink.cc/charmingdc" target="_blank"> https://taplink.cc/charmingdc </a>
          </p>
        </div>
       )
      }
      
      
      {
       openModel && (
        <div className="about-ai"> 
          <ul>
           <li>
            { /* made empty on purpose */ }
           </li>
           <li onClick={() => setOpenModel(!openModel)}>
             <i className="fa-solid fa-circle-xmark"></i>
           </li>
         </ul>
         
         <img 
          src={AxionisImg}
          alt="Axionis" />
         
         <h2>
          Axionis
         </h2>
       
         <p>
          Friendly ai chatbot.
         </p>
       
         <p>
           Model info: <br/><br/>
           • gemini-1.5-flash <br/>
           • generative model
         </p>
        </div>
       )
      }
      
      
      <div className="chatbox">
        { 
          history.length > 0 ? (
           history.map((chat, index) => (
            chat.role === 'user' ? (
              <div key={index} className="usr-message">
                {chat.parts[0].text}
              </div>
             ) : (
              <div key={index} className="ai-divwrap">
               <div className="ai-dp"></div>
               
               <div className="ai-message">
                <div className="ai-response">
                  {chat.parts[0].text}
                </div>
               </div>
              </div>
             )
           ))
          ) : (
           <div className="default-screen">
             <h2>
               How can i help you today?
            </h2>
            
            <div className="prompt-wrapper">
             <div>
              <div>
                How do i create a resume 
              </div>
           
              <div>
                can you suggest a unique hobby to try?
              </div>
           
              <div>
                what's the best way to learn guitar 
              </div>
           
              <div>
                what's the best way to learn guitar 
              </div>
             </div>
            
            </div>
           </div>
        )}
        
        {isLoading && (
          <div className="ai-divwrap">
           <div className="ai-dp"></div>
           
           <div className="ai-message">
            <div className="ai-response">
             <div className="loader" />
            </div>
           </div>
          </div>
         )
        }
       </div>
      
      
       <div className="chat-sender">
        <input 
          type="text"
          value={input}
          className="chat-input"
          placeholder="Send a message"
          onChange={(e) => setInput(e.target.value)} />
          
        <button className="send-button" onClick={handleSubmit} >
         <i className="fa-solid fa-arrow-up" id="send-icon"></i>
        </button>
       </div>
       
      </section>
    </>
  )
}

export default Axionis
