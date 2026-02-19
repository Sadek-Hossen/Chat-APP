import React, { useState, useRef } from "react";
import useSendMessage from "../../../context/useSendMessage.js";

function Send() {
  const { loading, sendMessages } = useSendMessage();
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setMessage(e.target.value);

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await sendMessages(message);
    setMessage("");
    textareaRef.current.style.height = "auto";
  };

  //  NEW: Enter key handler
  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // newline      
      if (!message.trim()) return;

      await sendMessages(message);
      setMessage("");
      textareaRef.current.style.height = "auto";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 p-3 bg-gray-800 border-t border-gray-600"
    >
      <textarea
        ref={textareaRef}
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}   //  ADD THIS
        placeholder="Type a message..."
        rows={1}
        className="
          flex-1 resize-none rounded-lg
          bg-gray-700 text-white p-3
          outline-none focus:ring-2 focus:ring-blue-500
          max-h-40 overflow-y-auto
        "
      />

      <button
        type="submit"
        disabled={loading}
        className="
          px-5 py-3 bg-blue-600 rounded-lg
          hover:bg-blue-700 active:scale-95
          transition disabled:opacity-50
        "
      >
        Send
      </button>
    </form>
  );
}

export default Send;
