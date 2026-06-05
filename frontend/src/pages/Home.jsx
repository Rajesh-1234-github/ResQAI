import { useContext } from "react"
import { LanguageContext } from "../LanguageContext"
import translations from "../translations"
import "../animations.css"
import { Link } from "react-router-dom"

function Home() {

  const { language } = useContext(LanguageContext)

  return (

    <div className="flex flex-col items-center justify-center text-center mt-32 px-6">

      <h1 className="text-6xl md:text-7xl font-extrabold text-blue-400 mb-6">
        ResQAI
      </h1>

      <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-8">
        {translations[language].homeDescription}
      </p>

      <div className="flex gap-6">

  <Link to="/report">
    <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl text-lg font-semibold transition duration-300 shadow-lg">
      {translations[language].reportDisaster}
    </button>
  </Link>

  <Link to="/map">
  <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl text-lg font-semibold transition duration-300 shadow-lg">
    {translations[language].viewLiveMap}
  </button>
</Link>

</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full max-w-6xl">

        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg text-center card-hover">
          <h2 className="text-5xl font-bold text-red-400 mb-4">128</h2>
          <p className="text-xl text-gray-300">
            {translations[language].totalReports}
          </p>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg text-center card-hover">
          <h2 className="text-5xl font-bold text-yellow-400 mb-4">42</h2>
          <p className="text-xl text-gray-300">
            {translations[language].activeEmergencies}
          </p>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg text-center card-hover">
          <h2 className="text-5xl font-bold text-green-400 mb-4">76</h2>
          <p className="text-xl text-gray-300">
            {translations[language].safeZones}
          </p>
        </div>

      </div>

      <div className="mt-24 w-full max-w-6xl">

        <h2 className="text-4xl font-bold text-center text-blue-400 mb-14">
          {translations[language].coreFeatures}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:scale-105 transition duration-300">

            <h3 className="text-2xl font-bold text-red-400 mb-4">
              {translations[language].aiDetection}
            </h3>

            <p className="text-gray-300 text-lg">
              {translations[language].aiDetectionDesc}
            </p>

          </div>

          <div className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:scale-105 transition duration-300">

            <h3 className="text-2xl font-bold text-yellow-400 mb-4">
              {translations[language].liveDisasterMap}
            </h3>

            <p className="text-gray-300 text-lg">
              {translations[language].liveDisasterMapDesc}
            </p>

          </div>

          <div className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:scale-105 transition duration-300">

            <h3 className="text-2xl font-bold text-green-400 mb-4">
              {translations[language].emergencyAlerts}
            </h3>

            <p className="text-gray-300 text-lg">
              {translations[language].emergencyAlertsDesc}
            </p>

          </div>

        </div>

      </div>

      <footer className="mt-28 w-full bg-gray-900 py-8 text-center rounded-t-3xl">

        <h2 className="text-2xl font-bold text-blue-400 mb-3">
          ResQAI
        </h2>

        <p className="text-gray-400 text-lg">
          {translations[language].footerText}
        </p>

        <p className="text-gray-500 mt-4">
          © 2026 ResQAI. All rights reserved.
        </p>

      </footer>

    </div>

  )

}

export default Home