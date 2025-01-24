// import React from 'react'

function Navbar() {
  return (
    <>
      <nav className="bg-gray-800 text-white  top-0 left-0 w-full z-10 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-2 md:py-3">
        {/* Left: App Icon and Name */}
        <div className="flex items-center">
          <div className="bg-blue-500 p-2 rounded-lg mr-4">
            {/* Replace with your app icon */}
            <img
              src="/xantacrox_icon.jpeg"
              alt="App Icon"
              className="w-8 h-8 md:w-9 md:h-9"
            />
          </div>
          <h1 className="text-base font-bold md:text-lg lg:text-xl">
            Your App Name
          </h1>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-4">
          {/* Icon 1 */}
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition">
            <img src="/path/to/icon1.png" alt="Icon 1" className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          {/* Icon 2 */}
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition">
            <img src="/path/to/icon2.png" alt="Icon 2" className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          {/* Icon 3 */}
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition">
            <img src="/path/to/icon3.png" alt="Icon 3" className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar
