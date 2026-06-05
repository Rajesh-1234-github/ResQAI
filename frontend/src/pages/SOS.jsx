import { useState, useContext } from "react"
import axios from "axios"

import { LanguageContext } from "../LanguageContext"
import sosTranslations from "../sosLang"

function SOS() {

  const { language } =
    useContext(LanguageContext)

  const t = sosTranslations[language]

  const [alertSent, setAlertSent] =
    useState(false)

  const [locationData, setLocationData] =
    useState({
      lat: "",
      lng: "",
      state: "",
      district: "",
      pincode: "",
      address: ""
    })

  const handleSOS = () => {

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const lat =
          position.coords.latitude

        const lng =
          position.coords.longitude

        try {

          const response =
            await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            )

          const data = response.data

          setLocationData({
            lat,
            lng,

            state:
              data.address.state || "N/A",

            district:
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "N/A",

            pincode:
              data.address.postcode || "N/A",

            address:
              data.display_name || "N/A"
          })

          setAlertSent(true)

        } catch (error) {

          console.log(error)

          alert(
            t.locationError ||
            "Unable to fetch location details"
          )

        }

      },

      (error) => {

        console.log(error)

        alert(
          t.locationDenied ||
          "Location access denied"
        )

      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }

    )

  }

  return (

    <div className="min-h-screen bg-black text-white flex justify-center items-center px-6 py-16">

      <div className="bg-gray-900 w-full max-w-3xl p-10 rounded-3xl shadow-2xl border border-red-700 text-center">

        <h1 className="text-5xl font-bold text-red-500 mb-6">
          🚨 {t.sos}
        </h1>

        <p className="text-gray-300 text-lg mb-10">
          {t.sosDescription}
        </p>

        <button
          onClick={handleSOS}
          className="bg-red-600 hover:bg-red-700 text-white text-3xl font-bold px-14 py-8 rounded-full shadow-2xl transition duration-300 hover:scale-110"
        >
          🚨 {t.sendSOS}
        </button>

        {alertSent && (

          <div className="mt-12 bg-red-950 border border-red-500 p-8 rounded-2xl text-left">

            <h2 className="text-3xl font-bold text-red-400 mb-6 text-center">

              {t.sosSuccess}

            </h2>

            <div className="space-y-4 text-lg">

              <p>
                <span className="text-green-400 font-bold">
                  {t.latitude}:
                </span>{" "}
                {locationData.lat}
              </p>

              <p>
                <span className="text-green-400 font-bold">
                  {t.longitude}:
                </span>{" "}
                {locationData.lng}
              </p>

              <p>
                <span className="text-blue-400 font-bold">
                  {t.state}:
                </span>{" "}
                {locationData.state}
              </p>

              <p>
                <span className="text-blue-400 font-bold">
                  {t.district}:
                </span>{" "}
                {locationData.district}
              </p>

              <p>
                <span className="text-yellow-400 font-bold">
                  {t.pincode}:
                </span>{" "}
                {locationData.pincode}
              </p>

              <p>
                <span className="text-purple-400 font-bold">
                  {t.address}:
                </span>{" "}
                {locationData.address}
              </p>

            </div>

          </div>

        )}

        <div className="grid sm:grid-cols-2 gap-6 mt-12">

          <div
            onClick={() =>
              alert("🚑 Ambulance Team Notified")
            }
            className="bg-gray-800 p-6 rounded-2xl border border-gray-700 cursor-pointer hover:bg-blue-700 hover:scale-105 transition duration-300 shadow-lg"
          >

            <h2 className="text-2xl font-bold text-blue-400 mb-3">
              🚑 {t.ambulance}
            </h2>

            <p className="text-xl">
              108
            </p>

          </div>

          <div
            onClick={() =>
              alert("🚓 Police Emergency Activated")
            }
            className="bg-gray-800 p-6 rounded-2xl border border-gray-700 cursor-pointer hover:bg-yellow-600 hover:scale-105 transition duration-300 shadow-lg"
          >

            <h2 className="text-2xl font-bold text-yellow-400 mb-3">
              🚓 {t.police}
            </h2>

            <p className="text-xl">
              100
            </p>

          </div>

          <div
            onClick={() =>
              alert("🔥 Fire Rescue Alerted")
            }
            className="bg-gray-800 p-6 rounded-2xl border border-gray-700 cursor-pointer hover:bg-red-700 hover:scale-105 transition duration-300 shadow-lg"
          >

            <h2 className="text-2xl font-bold text-red-400 mb-3">
              🔥 {t.fireRescue}
            </h2>

            <p className="text-xl">
              101
            </p>

          </div>

          <div
            onClick={() =>
              alert("🆘 Disaster Team Contacted")
            }
            className="bg-gray-800 p-6 rounded-2xl border border-gray-700 cursor-pointer hover:bg-green-700 hover:scale-105 transition duration-300 shadow-lg"
          >

            <h2 className="text-2xl font-bold text-green-400 mb-3">
              🆘 {t.disasterHelpline}
            </h2>

            <p className="text-xl">
              1070
            </p>

          </div>

        </div>

      </div>

    </div>

  )

}

export default SOS