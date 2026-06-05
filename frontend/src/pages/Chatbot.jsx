import {
  useState,
  useEffect,
  useContext
} from "react"

import OpenAI from "openai"

import {
  LanguageContext
} from "../LanguageContext"

import translations from "../translations"

function Chatbot() {

  const { language } =
    useContext(LanguageContext)

  const [message, setMessage] =
    useState("")

  const [showHistory,
    setShowHistory] =
    useState(false)

  const [loading,
    setLoading] =
    useState(false)

  const [chat, setChat] =
    useState([])

  const [history,
    setHistory] =
    useState(() => {

      const savedHistory =
        localStorage.getItem(
          "resqai-history"
        )

      return savedHistory
        ? JSON.parse(savedHistory)
        : []

    })

  useEffect(() => {

    localStorage.setItem(
      "resqai-history",
      JSON.stringify(history)
    )

  }, [history])

  const sendMessage =
    async () => {

      if (message.trim() === "")
        return

      const userMessage = {
        sender: "user",
        text: message
      }

      setChat((prev) => [
        ...prev,
        userMessage
      ])

      setHistory((prev) => [
        ...prev,
        userMessage
      ])

      const userQuestion =
        message

      setMessage("")

      setLoading(true)

      try {

        const apiKey =
          import.meta.env
            .VITE_GEMINI_API_KEY

        if (!apiKey) {

          const errorMessage = {
            sender: "bot",
            text:
              "❌ API Key not found."
          }

          setChat((prev) => [
            ...prev,
            errorMessage
          ])

          return
        }

        const openai =
          new OpenAI({
            apiKey,
            baseURL:
              "https://openrouter.ai/api/v1",
            dangerouslyAllowBrowser: true
          })

        const completion =
          await openai.chat.completions.create({
            model:
              "openai/gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are a Disaster Management Assistant. Help users with floods, fires, earthquakes, cyclones, rescue operations, first aid, emergency preparedness and safety."
              },
              {
                role: "user",
                content:
                  userQuestion
              }
            ]
          })

        const botReply =
          completion.choices[0]
            .message.content

        const botMessage = {
          sender: "bot",
          text: botReply
        }

        setChat((prev) => [
          ...prev,
          botMessage
        ])

        setHistory((prev) => [
          ...prev,
          botMessage
        ])

      } catch (error) {

        console.log(error)

        const errorMessage = {
          sender: "bot",
          text:
            `❌ AI Error:\n\n${error.message}`
        }

        setChat((prev) => [
          ...prev,
          errorMessage
        ])

      } finally {

        setLoading(false)

      }

    }

  const clearChat = () => {
    setChat([])
  }

  return (

    <div className="min-h-screen bg-black text-white flex justify-center items-center px-6 py-10">

      <div className="bg-gray-900 w-full max-w-3xl rounded-3xl shadow-2xl border border-gray-700 p-6">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-4xl font-bold text-blue-400">
            🤖 {translations[language]?.assistant || "AI Assistant"}
          </h1>

          <div className="flex gap-3">

            <button
              onClick={clearChat}
              className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-xl font-bold"
            >
              🗑 Clear Chat
            </button>

            <button
              onClick={() =>
                setShowHistory(!showHistory)
              }
              className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-xl font-bold"
            >
              💬 History
            </button>

          </div>

        </div>

        {showHistory && (

          <div className="bg-gray-800 p-4 rounded-2xl mb-6 max-h-60 overflow-y-auto">

            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              Chat History
            </h2>

            {history.map((msg, index) => (

              <div
                key={index}
                className="mb-3 p-3 rounded-xl bg-gray-700"
              >
                <span className="font-bold text-blue-300">
                  {msg.sender === "user"
                    ? "You"
                    : "Bot"}:
                </span>{" "}
                {msg.text}
              </div>

            ))}

          </div>

        )}

        <div className="bg-gray-800 rounded-2xl h-[500px] overflow-y-auto p-5 space-y-4">

          {chat.map((msg, index) => (

            <div
              key={index}
              className={`max-w-[80%] p-4 rounded-2xl text-lg whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-blue-600 ml-auto"
                  : "bg-gray-700"
              }`}
            >
              {msg.text}
            </div>

          ))}

          {loading && (

            <div className="bg-gray-700 max-w-[80%] p-4 rounded-2xl">
              ⏳ AI is typing...
            </div>

          )}

        </div>

        <div className="flex gap-4 mt-6">

          <input
            type="text"
            placeholder="Ask emergency or disaster questions..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage()
              }
            }}
            className="flex-1 p-4 rounded-2xl bg-gray-800 text-white outline-none border border-gray-700"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 px-8 rounded-2xl font-bold text-lg"
          >
            Send
          </button>

        </div>

      </div>

    </div>

  )

}

export default Chatbot