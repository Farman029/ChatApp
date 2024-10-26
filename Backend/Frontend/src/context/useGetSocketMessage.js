import { useEffect } from "react";
import {useSocketContext} from "./SocketContext.jsx"
import useConversation from "../zustand/useConversation.js"

const useGetSocketMessage=()=>{
  const { socket } = useSocketContext();
  const { messages, setMessage } = useConversation();

useEffect(()=>{
socket.on("newMessage",(newMessage)=>{
//   console.log(" messages -------", messages )  
// console.log(" newMessage------",  newMessage);
setMessage([...messages,newMessage]);
return () => {
  socket.off("newMessage");
};
}), [socket, messages, setMessage]})

}

export default useGetSocketMessage;
