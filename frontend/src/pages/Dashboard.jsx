import { useEffect, useState, useContext } from "react"
import axios from "axios"

import { LanguageContext } from "../LanguageContext"
import translations from "../translations"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"

function Dashboard() {

  const [reports, setReports] = useState([])

  const { language } =
    useContext(LanguageContext)

  useEffect(() => {

    axios.get("http://localhost:5000/api/reports")
      .then((res) => {
        setReports(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

  }, [])

  const getSeverity = (type) => {

    if (type.toLowerCase() === "earthquake")
      return { level: "Critical", color: "bg-red-600" }

    if (type.toLowerCase() === "flood")
      return { level: "High", color: "bg-orange-500" }

    if (type.toLowerCase() === "fire")
      return { level: "Medium", color: "bg-yellow-500 text-black" }

    if (type.toLowerCase() === "cyclone")
      return { level: "Severe", color: "bg-purple-600" }

    return { level: "Low", color: "bg-green-600" }

  }

  const getTranslatedDisaster = (type) => {

    const disasterTranslations = {

      en: {
        Earthquake: "Earthquake",
        Landslide: "Landslide",
        Fire: "Fire",
        Cyclone: "Cyclone",
        Flood: "Flood"
      },

      te: {
        Earthquake: "భూకంపం",
        Landslide: "కొండచరియలు విరిగిపడటం",
        Fire: "అగ్ని ప్రమాదం",
        Cyclone: "తుఫాను",
        Flood: "వరద"
      },

      hi: {
        Earthquake: "भूकंप",
        Landslide: "भूस्खलन",
        Fire: "आग",
        Cyclone: "चक्रवात",
        Flood: "बाढ़"
      },

      ta: {
        Earthquake: "நிலநடுக்கம்",
        Landslide: "மண்சரிவு",
        Fire: "தீ விபத்து",
        Cyclone: "சூறாவளி",
        Flood: "வெள்ளம்"
      },

      ml: {
        Earthquake: "ഭൂകമ്പം",
        Landslide: "മണ്ണിടിച്ചിൽ",
        Fire: "തീപിടിത്തം",
        Cyclone: "ചുഴലിക്കാറ്റ്",
        Flood: "വെള്ളപ്പൊക്കം"
      },

      kn: {
        Earthquake: "ಭೂಕಂಪ",
        Landslide: "ಭೂಕುಸಿತ",
        Fire: "ಬೆಂಕಿ ಅವಘಡ",
        Cyclone: "ಚಂಡಮಾರುತ",
        Flood: "ನೆರೆ"
      },

      ur: {
        Earthquake: "زلزلہ",
        Landslide: "لینڈ سلائیڈ",
        Fire: "آگ",
        Cyclone: "طوفان",
        Flood: "سیلاب"
      }

    }

    return disasterTranslations[language]?.[type] || type

  }

  const disasterCounts = {
  Flood: 0,
  Fire: 0,
  Earthquake: 0,
  Landslide: 0,
  Cyclone: 0
}

reports.forEach((report) => {
  if (disasterCounts.hasOwnProperty(report.disaster)) {
    disasterCounts[report.disaster]++
  }
})

  const chartData = Object.keys(disasterCounts).map((key) => ({
    name: key,
    translatedName: getTranslatedDisaster(key),
    value: disasterCounts[key]
  }))

  const COLORS = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#8b5cf6"
  ]

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold text-blue-400 mb-10">
        {translations[language].dashboard}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 rounded-3xl shadow-2xl hover:scale-105 hover:-translate-y-2 hover:rotate-1 transition duration-300">

          <h2 className="text-xl font-semibold">
            {translations[language].totalReports}
          </h2>

          <p className="text-5xl font-bold mt-4">
            {reports.length}
          </p>

        </div>

        {chartData.map((item, index) => {

          const cardColors = [
            "from-red-600 to-red-400",
            "from-orange-500 to-yellow-400",
            "from-yellow-500 to-yellow-300",
            "from-purple-600 to-pink-500",
            "from-green-600 to-emerald-400"
          ]

          return (

            <div
              key={index}
              className={`bg-gradient-to-r ${cardColors[index % cardColors.length]} p-6 rounded-3xl shadow-2xl hover:scale-105 hover:-translate-y-2 hover:rotate-1 transition duration-300`}
            >

              <h2 className="text-xl font-semibold leading-snug break-words">
                {item.translatedName}
              </h2>

              <p className="text-5xl font-bold mt-4">
                {item.value}
              </p>

            </div>

          )

        })}

      </div>

      <div className="grid lg:grid-cols-2 gap-10 mb-14">

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-700">

          <h2 className="text-2xl font-bold text-blue-300 mb-6">
            {translations[language].barChart}
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={chartData}>

              <XAxis
  dataKey="translatedName"
  tick={{ fill: "#ffffff", fontSize: 12 }}
  axisLine={{ stroke: "#555" }}
  tickLine={{ stroke: "#555" }}
/>

<YAxis
  tick={{ fill: "#ffffff", fontSize: 12 }}
  axisLine={{ stroke: "#555" }}
  tickLine={{ stroke: "#555" }}
/>

<Tooltip
  contentStyle={{
    backgroundColor: "#111827",
    border: "1px solid #374151",
    color: "#ffffff"
  }}
  labelStyle={{ color: "#ffffff" }}
/>

              <Bar
                dataKey="value"
                fill="#3b82f6"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-700">

          <h2 className="text-2xl font-bold text-blue-300 mb-6">
            {translations[language].distribution}
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="translatedName"
                outerRadius={120}
                label
              >

                {chartData.map((entry, index) => (

                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {reports.map((report) => {

          const severity = getSeverity(report.disaster)

          return (

            <div
              key={report._id}
              className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700 hover:scale-105 hover:-translate-y-2 transition duration-300"
            >

              <h2 className="text-2xl font-bold text-red-400 mb-3">
                {getTranslatedDisaster(report.disaster)}
              </h2>

              <p className="mb-3">

                {translations[language].severity}

                <span
                  className={`ml-2 px-3 py-1 rounded-full text-sm ${severity.color}`}
                >
                  {severity.level}
                </span>

              </p>

              <p className="mb-2">
                <span className="font-bold text-blue-300">
                  {translations[language].name}
                </span>{" "}
                {report.name}
              </p>

              <p className="mb-2">
                <span className="font-bold text-blue-300">
                  {translations[language].location}
                </span>{" "}
                {report.location}
              </p>

              <p className="mb-4">
                <span className="font-bold text-blue-300">
                  {translations[language].description}
                </span>{" "}
                {report.description}
              </p>

              {report.file && (

                <div className="mb-4">

                  {report.file.toLowerCase().endsWith(".pdf") ? (

                    <a
                      href={`http://localhost:5000/${report.file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg inline-block"
                    >
                      {translations[language].viewPdf}
                    </a>

                  ) : (

                    <div className="overflow-hidden rounded-2xl border border-gray-700">

                      <img
                        src={`http://localhost:5000/${report.file}`}
                        alt="Disaster"
                        className="w-full h-72 object-cover hover:scale-105 transition duration-500"
                      />

                    </div>

                  )}

                </div>

              )}

              <p className="text-sm text-gray-400 mt-4">
                {new Date(report.createdAt).toLocaleString()}
              </p>

            </div>

          )

        })}

      </div>

    </div>

  )

}

export default Dashboard