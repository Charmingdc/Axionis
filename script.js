"use strict";

import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";


let threeDots = document.querySelector('#three-dot');
let actionTab = document.querySelector('.action-tab');
let input = document.querySelector("#chat-input");
let chatBox = document.querySelector(".chatbox");
let chatSender = document.querySelector('.chat-sender');
let sendButton = document.querySelector("#send-button");
let defaultScreen = document.querySelector('.default-screen');
let startNewChat = document.querySelector('#start-newchat');
let viewDetailBtn = document.querySelector('#view-detailbutton');
let hideAboutAi = document.querySelector('#hide-aboutai');
let aboutAi = document.querySelector('#about-ai');
let viewDev = document.querySelector('#view-dev');
let hideAboutDev = document.querySelector('#hide-aboutdev');
let aboutDev = document.querySelector('#about-dev');
let scrollButton = document.querySelector('.to-bottom-btn');;


const API_KEY = "AIzaSyCctnbLaK2K9QgUyspfv2cdTggjs8-f4pk";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: `Your name is Axionis and you are a friendly ai chatbot. Whenever you are asked about your creator say that You are created by a code wizard named Charmingdc and his real name is Adebayo Muis. Remove all * or ** from your response and most important don't talk about your creator unless you're asked.`,
});
const chat = model.startChat({
  history: [
  
  ],
});




const getResponse = async () => {
 
  defaultScreen.style.display = 'none';
  
  let aiDivWrap = document.createElement('div');
  aiDivWrap.classList.add('ai-divwrap');
  
  let aiDp = document.createElement('div');
  aiDp.classList.add('ai-dp');
  
  let aiDiv = document.createElement('div');
  aiDiv.classList.add('ai-message')
      
  let usrDiv = document.createElement('div');
  usrDiv.classList.add('usr-message')
  
  const prompt = input.value.trim(); // would typically be an input value
  
  if (prompt == '') {
    chatSender.style.border = '0.06rem solid red';
    
    setTimeout( () => {
      chatSender.style.border = 'none';
    }, 2000);
    
  } else {
    
    let loader = document.createElement('div');
    loader.classList.add('loader');
    usrDiv.textContent = input.value;
      
    aiDiv.appendChild(loader)
    aiDiv.style.background = 'transparent';
      
    aiDivWrap.appendChild(aiDp);
    aiDivWrap.appendChild(aiDiv);
      
    chatBox.appendChild(usrDiv);
    chatBox.appendChild(aiDivWrap);
    
    
    // send prompt to ai
   const result = await chat.sendMessageStream(prompt);
   
    for await (const chunk of result.stream) {
      let chunkText = chunk.text();
 
      
      // remove loader
      loader.remove();
      
      let aiText = document.createElement('div');
      aiText.classList.add('ai-response')
      aiText.innerText = chunkText;
      
      usrDiv.textContent = input.value;
      
      aiDiv.appendChild(aiText)
   
   
      aiDivWrap.appendChild(aiDp);
      aiDivWrap.appendChild(aiDiv);
      
      chatBox.appendChild(usrDiv);
      chatBox.appendChild(aiDivWrap);
      
    }
    
    input.value = ''; // clear the input after a message is sent
  }
};

sendButton.addEventListener("click", getResponse);



// Function to check if user is at the bottom
const isUserAtBottom = () => {
  return chatBox.scrollHeight - chatBox.scrollTop <= chatBox.clientHeight + 50;
}

// Function to scroll to bottom
const scrollToBottom = () => {
  chatBox.scrollTo({
    top: chatBox.scrollHeight,
    behavior: 'smooth' // Enable smooth scrolling
  });
  scrollButton.style.display = 'none'; // Hide the button once scrolled
}

// Detect new messages
const newMessageAdded = () => {
  if (!isUserAtBottom()) {
    scrollButton.style.display = 'flex'; // Show the button if user is not at the bottom
  }
}

// Scroll to bottom when button is clicked
scrollButton.addEventListener('click', scrollToBottom);

// Listen for new messages being added to the chat container
const observer = new MutationObserver(() => {
    newMessageAdded();
});
observer.observe(chatBox, { childList: true });

// Auto-scroll to the bottom if user is already at the bottom when a message is added
chatBox.addEventListener('scroll', () => {
  if (isUserAtBottom()) {
    scrollButton.style.display = 'none'; // Hide the button if user manually scrolls to the bottom
  }
});


threeDots.addEventListener('click', () => {
  actionTab.classList.toggle('show-actiontab')
});

startNewChat.addEventListener('click', () => {
  chatBox.innerHTML = "";
});

viewDetailBtn.addEventListener('click', () => {
  aboutAi.style.display = 'flex';
});

hideAboutAi.addEventListener('click', () => {
  aboutAi.style.display = 'none';
});

viewDev.addEventListener('click', () => {
  aboutDev.style.display = 'flex';
});

hideAboutDev.addEventListener('click', () => {
  aboutDev.style.display = 'none';
});
