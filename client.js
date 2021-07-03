const socket=io();


 // to send the message here ('#textarea is id')
  
let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector('.message_area')


 let name;
do {
    name=prompt('enter your name ')

} while(!name)
 


textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})


function sendMessage(message){
    let msg={
        user:name,
        message:message.trim()
    }
//for appending the message that are typed
 appendMessage(msg,'outgoing')
 textarea.value=' '
 scrollToBottom()

 // for sending message to server

 socket.emit('message',msg)

}

function appendMessage(msg,type){
    let mainDiv=document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'message')


    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>

    `
 mainDiv.innerHTML=markup

 messageArea.appendChild(mainDiv)
}

//receive messages

socket.on('message',(msg) =>{
    appendMessage(msg,'incoming')
    scrollToBottom()

})
function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight

}
