import { useState, useContext } from "react"
import axios from "axios"

import translations from "../translations"
import { LanguageContext } from "../LanguageContext"

function Report() {

  const { language } = useContext(LanguageContext)

  const [name, setName] = useState("")
  const [disaster, setDisaster] = useState("")
  const [severity, setSeverity] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState(null)

  const [fileKey, setFileKey] = useState(Date.now())

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const geoResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
      )

      if (!geoResponse.data.length) {
        alert("Location not found")
        return
      }

      const latitude = geoResponse.data[0].lat
      const longitude = geoResponse.data[0].lon

      const formData = new FormData()

      formData.append("name", name)
      formData.append("disaster", disaster)
      formData.append("severity", severity)
      formData.append("location", location)
      formData.append("lat", latitude)
      formData.append("lng", longitude)
      formData.append("description", description)

      if (file) {
        formData.append("file", file)
      }

      await axios.post(
        "http://localhost:5000/api/report",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )

      alert(translations[language].reportSuccess)

      setName("")
      setDisaster("")
      setSeverity("")
      setLocation("")
      setDescription("")

      setFile(null)
      setFileKey(Date.now())

    } catch (error) {

      console.log(error)
      alert(translations[language].reportError)

    }

  }

  return (

    <div className="min-h-screen bg-black text-white flex justify-center items-center px-6 py-20">

      <div className="bg-gray-900 p-10 rounded-3xl shadow-2xl w-full max-w-2xl border border-gray-800">

        <h1 className="text-5xl font-bold text-blue-400 text-center mb-10">
          {translations[language].reportDisaster}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >

          <input
            type="text"
            placeholder={translations[language].enterName}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 w-full outline-none"
            required
          />

          <select
            value={disaster}
            onChange={(e) => setDisaster(e.target.value)}
            className="p-4 rounded-xl bg-gray-800 text-white border border-gray-700 w-full outline-none"
            required
          >

            <option value="">
              {translations[language].selectDisaster}
            </option>

            <option>
              {translations[language].flood}
            </option>

            <option>
              {translations[language].fire}
            </option>

            <option>
              {translations[language].earthquake}
            </option>

            <option>
              {translations[language].landslide}
            </option>

            <option>
              {translations[language].cyclone}
            </option>

          </select>

          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="p-4 rounded-xl bg-gray-800 text-white border border-gray-700 w-full outline-none"
            required
          >

            <option value="">
              {translations[language].selectSeverity}
            </option>

            <option>
              {translations[language].critical}
            </option>

            <option>
              {translations[language].high}
            </option>

            <option>
              {translations[language].medium}
            </option>

            <option>
              {translations[language].low}
            </option>

          </select>

          <input
            type="text"
            placeholder={translations[language].enterLocation}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 w-full outline-none"
            required
          />

          <textarea
            placeholder={translations[language].describeSituation}
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 w-full outline-none"
            required
          />

          <div className="flex flex-col gap-3">

            <label className="text-blue-300 font-semibold">
              {translations[language].uploadFile}
            </label>

            <input
              key={fileKey}
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="p-3 rounded-xl bg-gray-800 text-white border border-gray-700 w-full"
            />

            {file && (

              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">

                <p className="text-green-400 font-semibold">
                  {translations[language].selectedFile}
                </p>

                <p className="text-sm mt-1 break-all text-white">
                  {file.name}
                </p>

              </div>

            )}

          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 py-4 rounded-xl text-xl font-bold transition duration-300"
          >
            {translations[language].submitReport}
          </button>

        </form>

      </div>

    </div>

  )

}

export default Report