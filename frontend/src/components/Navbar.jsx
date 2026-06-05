import { Link } from "react-router-dom"

import translations from "../translations"

import { useContext, useState } from "react"

import { LanguageContext } from "../LanguageContext"

function Navbar() {

  const { language, setLanguage } =
    useContext(LanguageContext)

  const [menuOpen, setMenuOpen] =
    useState(false)

  return (

    <nav className="bg-gray-900 text-white shadow-lg border-b border-gray-800">

      <div className="flex justify-between items-center px-6 py-4">

        <Link to="/">
  <h1 className="text-3xl font-bold text-blue-400 tracking-wide cursor-pointer hover:text-blue-300 transition duration-300">
    ResQAI
  </h1>
</Link>

        <button
          className="md:hidden text-3xl"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </button>

        <ul className="hidden md:flex gap-6 text-lg items-center">

          <Link to="/">
            <li className="hover:text-blue-400 cursor-pointer transition duration-300">
              {translations[language].home}
            </li>
          </Link>

          <Link to="/report">
            <li className="hover:text-blue-400 cursor-pointer transition duration-300">
              {translations[language].report}
            </li>
          </Link>

          <Link to="/map">
            <li className="hover:text-blue-400 cursor-pointer transition duration-300">
              {translations[language].map}
            </li>
          </Link>

          <Link to="/dashboard">
            <li className="hover:text-blue-400 cursor-pointer transition duration-300">
              {translations[language].dashboard}
            </li>
          </Link>

          <Link to="/sos">
            <li className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full font-bold text-white shadow-lg hover:scale-105 transition duration-300 animate-pulse">
              🚨 {translations[language].sos}
            </li>
          </Link>

          <Link to="/chatbot">
            <li className="hover:text-blue-400 cursor-pointer transition duration-300">
              🤖 {translations[language].assistant}
            </li>
          </Link>

          {/* DESKTOP LANGUAGE DROPDOWN */}

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
            className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-blue-500 outline-none"
          >
            <option value="en">English</option>

            <option value="hi">Hindi</option>

            <option value="te">Telugu</option>

            <option value="ta">Tamil</option>

            <option value="ml">Malayalam</option>

            <option value="kn">Kannada</option>

            <option value="ur">Urdu</option>
          </select>

        </ul>

      </div>

      {menuOpen && (

        <div className="md:hidden bg-gray-900 px-6 pb-6">

          <ul className="flex flex-col gap-5 text-lg">

            <Link to="/">
              <li>
                {translations[language].home}
              </li>
            </Link>

            <Link to="/report">
              <li>
                {translations[language].report}
              </li>
            </Link>

            <Link to="/map">
              <li>
                {translations[language].map}
              </li>
            </Link>

            <Link to="/dashboard">
              <li>
                {translations[language].dashboard}
              </li>
            </Link>

            <Link to="/sos">
              <li className="bg-red-600 px-4 py-2 rounded-xl w-fit">
                🚨 {translations[language].sos}
              </li>
            </Link>

            <Link to="/chatbot">
              <li>
                🤖 {translations[language].assistant}
              </li>
            </Link>

            {/* MOBILE LANGUAGE DROPDOWN */}

            <select
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value)
              }
              className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-blue-500 outline-none"
            >
              <option value="en">English</option>

              <option value="hi">Hindi</option>

              <option value="te">Telugu</option>

              <option value="ta">Tamil</option>

              <option value="ml">Malayalam</option>

              <option value="kn">Kannada</option>

              <option value="ur">Urdu</option>
            </select>

          </ul>

        </div>

      )}

    </nav>

  )

}

export default Navbar