function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      
      <h1 className="text-2xl font-bold text-blue-400">
        ResQAI
      </h1>

      <ul className="flex gap-6 text-lg">
        <li className="hover:text-blue-400 cursor-pointer">Home</li>
        <li className="hover:text-blue-400 cursor-pointer">Report</li>
        <li className="hover:text-blue-400 cursor-pointer">Map</li>
        <li className="hover:text-blue-400 cursor-pointer">Dashboard</li>
      </ul>

    </nav>
  )
}

export default Navbar