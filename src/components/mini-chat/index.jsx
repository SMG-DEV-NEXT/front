// ✅ Full React Chat Widget (No TypeScript) with Socket.IO, React Query, and CreatePortal
import ChatService from "@/services/chat";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import Icon from "../Icons";
import Input from "../Input";
import { useSettings } from "@/context/Middle";
import { useSelector } from "react-redux";

// userId: string;
//     username: string;
//     text: string;
//     chat: string;

const getUserId = () => {
  let id = localStorage.getItem("anon_user_id");
  if (!id) {
    id = uuidv4();
    localStorage.setItem("anon_user_id", id);
  }
  return id;
};

export default function ChatWidget({ user }) {
  const [open, setOpen] = useState(false);
  // const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState("admin");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState("");
  const [admin, setAdmin] = useState([]);
  const [support, setSupport] = useState([]);
  const role = "user";

  const blokRef = useRef();

  const { settings } = useSettings();
  const data = settings.data.find((e) => e.title === "main")?.settings || {};
  const socket = useRef(null);

  const getQuery = useQuery({
    queryKey: "messages",
    enabled: !!userId,
    queryFn: () => ChatService.getMessages(userId),
  });

  useEffect(() => {
    const id = user ? user.id : getUserId();
    socket.current = io("http://localhost:4000");

    setUserId(id);
    socket.current.on("connect", () => {
      socket.current.emit("register", userId); // send userId after connection
    });

    socket.current.on("new-message", (data) => {
      if (data.role !== "admin") {
        setSupport((e) => [...e, data]);
        return;
      }
      setAdmin((e) => [...e, data]);
    });
  }, []);

  useEffect(() => {
    if (!getQuery.isPending && getQuery.data) {
      setAdmin(getQuery.data.data.filter((e) => e.role === "admin"));
      setSupport(
        getQuery.data.data.filter((e) => {
          return e.role !== "admin" && e.userId === userId;
        })
      );
    }
  }, [getQuery.isPending]);

  useEffect(() => {
    if (blokRef.current) {
      blokRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeTab, admin, support]);

  const sendMessage = () => {
    const newMessage = {
      userId,
      name: user?.name || "Anonymus",
      text,
      role,
      chat: "support",
    };
    socket.current.emit("send-message", newMessage);
    setSupport([...support, newMessage]);
    // mutation.mutate(newMessage);
    setText("");
  };

  const messages = activeTab === "admin" ? admin : support;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline (for textarea) or form submit
      if (text.trim() !== "") {
        sendMessage(); // call your query function here
      }
    }
  };
  return (
    <>
      {createPortal(
        <div className="fixed bottom-6 right-6 z-50">
          {!open ? (
            <button
              onClick={() => setOpen(true)}
              className="w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:scale-105 transition-all flex items-center justify-center"
            >
              <Icon name="message" />
            </button>
          ) : (
            <div className="fixed bottom-4 right-4 z-50  overflow-hidden w-[350px] rounded-2xl shadow-2xl bg-input/90 backdrop-blur-xl border border-primary80">
              <div className="flex items-center justify-between px-4 py-2 border-b border-primary80">
                <div className="flex gap-2">
                  <button
                    className={`px-3 py-2 rounded-xl outline-none transition-all duration-700 text-sm font-medium ${
                      activeTab === "admin"
                        ? "bg-primary text-white"
                        : "bg-input text-primary border border-primary80 hover:bg-primary80 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("admin")}
                  >
                    Admin Group
                  </button>
                  <button
                    className={`px-3 py-2 rounded-xl outline-none transition-all duration-700  focus:outline-none focus:ring-0 text-sm font-medium ${
                      activeTab === "support"
                        ? "bg-primary text-white"
                        : "bg-input text-primary border border-primary80 hover:bg-primary80 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("support")}
                  >
                    Support
                  </button>
                </div>
                <button
                  className="text-gray-500 hover:scale-125 transaction-all duration-300"
                  onClick={() => setOpen(false)}
                >
                  <Icon name="Close" />
                </button>
              </div>

              <div className="px-4 py-2 max-h-64 min-h-64 overflow-y-auto space-y-2 comment-scroll">
                {messages.map((msg) => (
                  <div
                    key={uuidv4()}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-xl px-3 py-2 text-sm max-w-[80%] ${
                        msg.role !== "user"
                          ? "bg-linkColor text-white"
                          : "bg-primary text-white "
                      }`}
                    >
                      {msg.text}
                      <div className="text-[10px] text-gray-400 mt-1 text-right">
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={blokRef}></div>
              </div>

              {activeTab === "support" && (
                <div className="flex items-center gap-2 px-4 py-3 border-t border-primary80 mt-auto">
                  <Input
                    value={text}
                    onKeyDown={handleKeyDown}
                    setValue={setText}
                    styleDiv={{ border: "1px solid #8767CF", height: "38px" }}
                  />
                  <button
                    className={`px-3 py-2 rounded-xl outline-none transition-all duration-300  focus:outline-none focus:ring-0 text-sm font-medium ${"bg-input text-primary border border-primary80 hover:bg-primary80 hover:text-white"}`}
                    onClick={() => sendMessage()}
                  >
                    Send
                  </button>
                </div>
              )}
              {activeTab === "admin" && (
                <div className="px-4 py-3  bg-input/80 backdrop-blur-md text-center">
                  <button
                    onClick={() => (window.location.href = data.link)}
                    className={`px-3 py-2 rounded-xl outline-none transition-all duration-300 w-full focus:outline-none focus:ring-0 text-sm font-medium ${"bg-input text-primary border border-primary80 hover:bg-primary80 hover:text-white"}`}
                  >
                    Go to Group
                  </button>
                </div>
              )}
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
}
