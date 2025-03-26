import { useState, useEffect, useRef } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import React from "react";
import "./Chatbot.css";
import OpenAI from "openai";
import {
  ChatCompletionCreateParamsStreaming,
  ChatCompletionMessageParam,
} from "openai/resources.mjs";

// TODO: replace this with your actual experiences (you can write MUCH more than I did...)
const USER_BACKGROUND = `
My Name is Evelyn Kwan.

I am a freshman at Boston University studying Data Science with a minor in Business Adminstration.
I worked at Game Development Intern at Boston Cyberarts in Summer 2024 where I used Unity, C#, and Figma.
I currently don't have any plans for Summer 2025 besides traveling.

I enjoy sleeping, playing games, crocheting, traveling, shopping, and trying different matchas.
I speak English fluently but I know a little bit of Cantonese, French, and Latin from school.
`;

/**
 * TODO: it is worth noting that `dangerouslyAllowBrowser: true` is NOT a safe configuration
 * for real websites. It is fine for temporary personal projects, but if you want to use this in
 * the long run, you should create a BACKEND and call the OpenAI client there.
 */
const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function Chatbot() {
  const [question, setQuestion] = useState<string>("");
  const [messages, setMessages] = useState<Array<ChatCompletionMessageParam>>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatboxRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const scrollToBottom = () => {
      if (isLoading && chatboxRef.current) {
        chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
      }
    };
  
    // Scroll to bottom immediately when loading starts
    scrollToBottom();
  
    // Set up an interval to continuously scroll while loading
    const scrollInterval = setInterval(scrollToBottom, 100);
  
    // Clear the interval when loading is false
    return () => {
      clearInterval(scrollInterval);
    };
  }, [isLoading]);

  // Load saved messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatbot_messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatbot_messages", JSON.stringify(messages));
    }
  }, [messages]);

  const clearMessages = async () => {
    localStorage.setItem("chatbot_messages", JSON.stringify([]));
    setMessages([]);
  };

  const handleSend = async () => {
    if (question.trim() === "") return;

    const newMessage: ChatCompletionMessageParam = {
      role: "user",
      content: question,
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    setQuestion("");

    try {
      // API key from environment variable
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      if (!apiKey) {
        throw new Error("API key not found in environment variables");
      }

      // Create messages payload for OpenAI
      const payload: ChatCompletionCreateParamsStreaming = {
        model: "gpt-4o", // You can change this to any OpenAI model
        messages: [
          {
            role: "system",
            content: `You are a personal assistant chatbot that responds to questions about the user's background and experiences. 
            Here is information about the user that you can reference:
            ${USER_BACKGROUND}
            
            Always respond in first person as if you are the user. Keep responses concise and relevant.
            If asked about something not covered in the user background, politely mention that you don't have 
            that information, it is CRUCIAL that you do not violate this condition.`,
          },
          ...updatedMessages,
        ],
        temperature: 0.7,
        max_tokens: 500,
        stream: true,
      };

      const stream = await client.chat.completions.create(payload);

      // New message that is currently being streamed
      const assistantMessage: ChatCompletionMessageParam = {
        role: "assistant",
        content: "",
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

      for await (const chunk of stream) {
        if (chunk.choices[0].delta.content) {
          assistantMessage.content += chunk.choices[0].delta.content;
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            newMessages[newMessages.length - 1] = { ...assistantMessage };
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error processing your request. Please check the API key in your environment variables and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <h2 id="chatbot">Chatbot</h2>
      <div className="chatbot-container">
        <div className="chatbox-messages" ref={chatboxRef}>
          {messages.length === 0 ? (
            <div className="empty-state">
              Ask me anything about my background or experience!
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <div className="message-content">{msg.content?.toString()}</div>
              </div>
            ))
          )}
          {/* {isLoading && (
            <div className="message assistant">
              <div className="message-content loading">Thinking...</div>
            </div>
          )} */}
        </div>
        <div className="chatbox-input" onKeyDown={handleKeyPress}>
          <Input
            placeholder="Enter your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <div className="chatbox-buttons">
            <span
              className={
                isLoading || question.trim() === ""
                  ? "button-wrapper disabled"
                  : "button-wrapper"
              }
            >
              <Button
                onClick={() => {
                  if (!isLoading && question.trim() !== "") {
                    handleSend();
                  }
                }}
              >
                Send
              </Button>
            </span>
            <Button onClick={() => clearMessages()}>Clear</Button>
          </div>
        </div>
      </div>
    </>
  );
}
