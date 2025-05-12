import React from 'react'
import { useDarkMode } from '../context/ThemeContext';

const DarkModeToggler = () => {
  const {darkMode, setDarkMode} = useDarkMode();  
  return (
    <button onClick={()=> setDarkMode(!darkMode)} className='px-6 py-2 bg-gray-200 cursor-pointer dark:bg-white/10 rounded-md transition-all' >
      {darkMode ? "☀️ light" : "🌙 dark"}
    </button >
  )
}

export default DarkModeToggler