import { useState, useEffect } from 'react'
import useChat from '../hooks/useChat.tsx';

import AxionisImg from '/public/axionis.jpg';
import CharmingdcImg from '../assets/charmingdc.jpg';



interface Suggestion {
  prompt: string; 
}

const Axionis = () => {
  const [input, setInput] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [about, setAbout] = useState<boolean>(false);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  let { history, getResponse } = useChat();
  
  
 
  useEffect(() => {
    getSuggestions();
  });
  
  const getSuggestions = async (): Promise<void> => {
    try {
      const response = await fetch('../assets/suggestions.json');
      const data: Suggestion[] = await response.json();
      
      const randomIndex: number = Math.floor(Math.random() * data.length)
      const selectedSuggestions: string[] = Array.from({ length: 5 }, (_, i) => data[(randomIndex + i) % data.length].prompt);


      setSuggestions(selectedSuggestions); 
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };
  
  const handleSubmit = async () => {
    setIsloading(true); // set loading state to true
    await getResponse(input); // await response from ai
    setIsloading(false); // set loading state to false
  };
  
  const setAsPrompt = (selectedIndex: number) => {
    const clickedSuggestion: string | undefined = suggestions.find((_, index) => index === selectedIndex);
    
    if (clickedSuggestion === undefined) return;
    
    setInput(clickedSuggestion); // set as input value
    handleSubmit(); // call submit function
  }
 
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
             <h3>
               How can i help you today?
            </h3>
            
            <div className="prompt-wrapper">
             <div>
              {suggestions.map((suggestion, index) => (
                <div key={index} onClick={() => setAsPrompt(index)}>
                  {suggestion}
                </div>
               ))}
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
