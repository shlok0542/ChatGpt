// import React, {useRef, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// const initialMessages = [
//   {
//     id: 1,
//     role: "assistant",
//     content: "Hello Shlok.\nHow can I help you today?",
//   },
// ];

// const ChatPage = () => {
//   const [messages, setMessages] = useState(initialMessages);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [listening, setListening] = useState(false);

//   const endRef = useRef(null);
//   const textareaRef = useRef(null);
//   const recognitionRef = useRef(null);

//   /* Auto resize textarea */
//   const autoResize = () => {
//     textareaRef.current.style.height = "auto";
//     textareaRef.current.style.height =
//       textareaRef.current.scrollHeight + "px";
//   };

//   /* Voice Input */
//   const startListening = () => {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Speech Recognition not supported in this browser.");
//       return;
//     }

//     const recognition = new window.webkitSpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.continuous = false;
//     recognition.interimResults = false;

//     recognition.onstart = () => setListening(true);
//     recognition.onend = () => setListening(false);
//     recognition.onresult = (e) => {
//       setInput(e.results[0][0].transcript);
//       autoResize();
//     };

//     recognitionRef.current = recognition;
//     recognition.start();
//   };

//   /* Typing effect */
//   const streamText = async (rawText) => {
//   // Ensure we always work with a valid string
//   const text = typeof rawText === "string" ? rawText : "";

//   if (!text) return;

//   const id = Date.now();

//   setMessages((prev) => [
//     ...prev,
//     { id, role: "assistant", content: "" },
//   ]);

// const CHUNK_SIZE = 5;
// const SPEED = 5;
// let index = 0;
// while (index < text.length) {
//   const chunk = text.slice(index, index + CHUNK_SIZE);

//   await new Promise((r) => setTimeout(r, SPEED));

//   setMessages((prev) =>
//     prev.map((m) =>
//       m.id === id
//         ? { ...m, content: m.content + chunk }
//         : m
//     )
//   );

//   index += CHUNK_SIZE;
// }
// };

//   /* Backend URL */
//   const API_URL = process.env.REACT_APP_BACKEND_URL;

//   /* Send Message */
//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = {
//       id: Date.now(),
//       role: "user",
//       content: input.trim(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch(`${API_URL}/api/gemini`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           "message": userMessage.content,
//          }),
//       });

//       const data = await res.json();
//       await streamText(data.reply || "No response from server.");
//     } catch {
//       await streamText("Server error. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-4">
//       <div className="w-full max-w-5xl h-[92vh] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-[0_0_70px_rgba(16,185,129,0.15)] flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="px-6 py-4 flex justify-between items-center border-b border-white/10">
//           <div>
//             <h1 className="text-lg font-semibold">AI Chat Console</h1>
//             <p className="text-xs text-slate-400">Gemini powered assistant</p>
//           </div>
//           <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
//             ● Online
//           </span>
//         </header>

//         {/* Messages */}
//         <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
//           {messages.map((msg) => (
//             <Bubble key={msg.id} {...msg} />
//           ))}
//           {loading && <TypingIndicator />}
//           <div ref={endRef} />
//         </main>

//         {/* Input */}
//         <form
//           onSubmit={handleSend}
//           className="border-t border-white/10 p-4 bg-black/40"
//         >
//           <div className="flex items-end gap-3">
//             <textarea
//               ref={textareaRef}
//               rows={1}
//               value={input}
//               onChange={(e) => {
//                 setInput(e.target.value);
//                 autoResize();
//               }}
//               placeholder="Ask anything..."
//               className="text-white flex-1 max-h-40 resize-none rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-500"
//             />

//             <button
//               type="button"
//               onClick={startListening}
//               className={`h-11 px-4 rounded-2xl border text-sm ${
//                 listening
//                   ? "bg-emerald-500 text-black"
//                   : "border-white/10 hover:bg-white/10"
//               }`}
//             >
//               🎤
//             </button>

//             <button
//               type="submit"
//               disabled={!input.trim() || loading}
//               className="h-11 px-6 rounded-2xl bg-emerald-500 text-black text-sm font-medium hover:bg-emerald-400 transition disabled:opacity-40"
//             >
//               Send
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// /* Message Bubble */
// const Bubble = ({ role, content }) => {
//   const isUser = role === "user";

//   return (
//     <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
//       <div
//         className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed relative ${
//           isUser
//             ? "bg-emerald-500 text-black rounded-br-md"
//             : "bg-white/5 border border-white/10 text-slate-100 rounded-bl-md"
//         }`}
//       >
//         <ReactMarkdown
//           remarkPlugins={[remarkGfm]}
//           components={{
//             code({ inline, className, children }) {
//               const match = /language-(\w+)/.exec(className || "");
//               return !inline && match ? (
//                 <SyntaxHighlighter
//                   style={oneDark}
//                   language={match[1]}
//                   PreTag="div"
//                 >
//                   {String(children).replace(/\n$/, "")}
//                 </SyntaxHighlighter>
//               ) : (
//                 <code className="bg-gray-700 px-1 py-0.5 rounded">
//                   {children}
//                 </code>
//               );
//             },
//           }}
//         >
//           {content}
//         </ReactMarkdown>
//       </div>
//     </div>
//   );
// };

// /* Typing Indicator */
// const TypingIndicator = () => (
//   <div className="flex justify-start">
//     <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-400 animate-pulse">
//       AI is typing...
//     </div>
//   </div>
// );

// export default ChatPage;


import Layout from "../components/layout";
import ChatHeader from "../components/ChatHeader";
import ChatArea from "../components/ChatArea";
import ChatInput from "../components/ChatInput";

const ChatPage = () => {
  return (
       <Layout>
      <ChatHeader />
      <ChatArea />
      <ChatInput />
    </Layout>
  );
};

export default ChatPage;
