import PatientTable from "./components/PatientTable"
import { ThemeProvider } from "./context/ThemeContext"

function App() {

  return (
    <>
      <ThemeProvider>
        <div className="min-h-screen w-full dark:bg-gray-900 dark:text-white bg-white">
          <div className="container mx-auto px-4 py-4" >
            <PatientTable />
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App