import { useEffect, useState, useContext } from "react"
import axios from "axios"
import translations from "../translations"

import { LanguageContext } from "../LanguageContext"

import {
  Flame,
  ShieldAlert,
  Ambulance,
  Waves,
  Mountain,
  Wind
} from "lucide-react"

const sendNotification = (title, body) => {

  if (Notification.permission === "granted") {

    new Notification(title, {
      body: body,
      icon: "https://cdn-icons-png.flaticon.com/512/564/564619.png"
    })

  }

}

function Map() {

  const [reports, setReports] = useState([])

  const { language } =
    useContext(LanguageContext)

  useEffect(() => {

    Notification.requestPermission()

    axios.get("http://localhost:5000/api/reports")
      .then((res) => {
        setReports(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

  }, [])

  const getBorderColor = (severity) => {

    if (!severity)
      return "border-green-500"

    if (severity.toLowerCase() === "critical") {
      return "border-red-600"
    }

    if (severity.toLowerCase() === "high") {
      return "border-orange-500"
    }

    if (severity.toLowerCase() === "medium") {
      return "border-yellow-500"
    }

    return "border-green-500"

  }

  const getEmergencyService = (disaster) => {

    if (!disaster) {
      return {
        name: "Emergency Response Team",
        icon: <ShieldAlert className="text-red-500 w-6 h-6" />
      }
    }

    const type = disaster.toLowerCase()

    if (type.includes("fire")) {
      return {
        name: "Nearby Fire Station",
        icon: <Flame className="text-orange-500 w-6 h-6" />
      }
    }

    if (type.includes("earthquake")) {
      return {
        name: "Police & Rescue Teams",
        icon: <ShieldAlert className="text-yellow-500 w-6 h-6" />
      }
    }

    if (type.includes("flood")) {
      return {
        name: "Disaster Response Force",
        icon: <Waves className="text-blue-500 w-6 h-6" />
      }
    }

    if (type.includes("landslide")) {
      return {
        name: "NDRF Landslide Rescue Team",
        icon: <Mountain className="text-brown-500 w-6 h-6" />
      }
    }

    if (type.includes("cyclone")) {
      return {
        name: "Cyclone Emergency Unit",
        icon: <Wind className="text-cyan-400 w-6 h-6" />
      }
    }

    if (type.includes("medical")) {
      return {
        name: "Ambulance & Hospital",
        icon: <Ambulance className="text-green-500 w-6 h-6" />
      }
    }

    return {
      name: "Emergency Response Team",
      icon: <ShieldAlert className="text-red-500 w-6 h-6" />
    }

  }

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold text-blue-400">
            {translations[language].title}
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            {translations[language].subtitle}
          </p>

        </div>

        <div className="bg-gray-900 px-6 py-4 rounded-2xl border border-blue-500">

          <p className="text-lg">

            🚨 {translations[language].active}:

            <span className="text-red-400 font-bold ml-2">
              {reports.length}
            </span>

          </p>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {reports.map((report) => (

          <div
            key={report._id}
            className={`bg-gray-900 p-6 rounded-3xl border-2 ${getBorderColor(report.severity)} shadow-2xl`}
          >

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-3xl font-bold text-red-400">
                {report.disaster || "Unknown Disaster"}
              </h2>

              <span className="bg-red-600 px-4 py-2 rounded-full text-sm font-bold">

                {report.severity || "Low"}

              </span>

            </div>

            <div className="mt-4 flex items-center gap-3 bg-gray-800 p-3 rounded-xl">

              {getEmergencyService(report.disaster).icon}

              <span className="text-lg font-semibold text-white">

                {getEmergencyService(report.disaster).name}

              </span>

            </div>

            <div className="space-y-3 text-lg mt-5">

              <p>
                <span className="text-blue-300 font-bold">
                  👤 Reporter:
                </span>{" "}
                {report.name}
              </p>

              <p>
                <span className="text-blue-300 font-bold">
                  📍 Location:
                </span>{" "}
                {report.location}
              </p>

              <p>
                <span className="text-blue-300 font-bold">
                  🌐 Coordinates:
                </span>{" "}
                {report.lat}, {report.lng}
              </p>

              <p>
                <span className="text-blue-300 font-bold">
                  📝 Description:
                </span>{" "}
                {report.description}
              </p>

            </div>

            {report.lat && report.lng && (

              <div className="mt-6 overflow-hidden rounded-2xl border border-gray-700">

                <iframe
                  title={report.location}
                  width="100%"
                  height="350"
                  className="rounded-2xl"
                  src={`https://maps.google.com/maps?q=${report.lat},${report.lng}&t=k&z=12&output=embed`}
                  allowFullScreen
                  loading="lazy"
                >
                </iframe>

              </div>

            )}

            <div className="mt-5 flex justify-between items-center">

              <p className="text-gray-400 text-sm">

                {report.createdAt
                  ? new Date(report.createdAt).toLocaleString()
                  : "No Date"}

              </p>

              <div className="flex gap-3">

                <a
                  href={`https://www.google.com/maps?q=${report.lat},${report.lng}&t=k`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-bold transition duration-300"
                >
                  {translations[language].satellite}
                </a>

                <button
                  onClick={() => {

                    const location =
                      report.location || "Unknown Location"

                    const disaster =
                      report.disaster || "Unknown Disaster"

                    const service =
                      getEmergencyService(disaster)

                    alert(
`${translations[language].live}

📍 Location: ${location}

🚨 Disaster: ${disaster}

✅ Alert Sent To:
${service.name}

🚑 Emergency teams are responding immediately.`
                    )

                    const siren =
                      new Audio("/sounds/siren.mp3")

                    siren.volume = 1

                    siren.play()

                    sendNotification(
                      "🚨 Disaster Alert",
                      `${disaster} detected at ${location}`
                    )

                  }}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-sm font-bold transition duration-300"
                >
                  {translations[language].live}
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}

export default Map