import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, Search, Eye, Edit, ChevronLeft, ChevronRight, X } from "lucide-react";


const mockPatients = [
  { id: 1, name: 'John Smith', age: 45, gender: 'Male', diagnosis: 'Hypertension', admissionDate: '2025-03-10' },
  { id: 2, name: 'Emily Johnson', age: 32, gender: 'Female', diagnosis: 'Diabetes Type 2', admissionDate: '2025-03-15' },
  { id: 3, name: 'Michael Brown', age: 58, gender: 'Male', diagnosis: 'Pneumonia', admissionDate: '2025-03-05' },
  { id: 4, name: 'Sarah Wilson', age: 27, gender: 'Female', diagnosis: 'Appendicitis', admissionDate: '2025-03-18' },
  { id: 5, name: 'David Lee', age: 65, gender: 'Male', diagnosis: 'COPD', admissionDate: '2025-02-28' },
  { id: 6, name: 'Jennifer Garcia', age: 41, gender: 'Female', diagnosis: 'Migraine', admissionDate: '2025-03-20' },
  { id: 7, name: 'Robert Martinez', age: 53, gender: 'Male', diagnosis: 'Gastritis', admissionDate: '2025-03-12' },
  { id: 8, name: 'Lisa Anderson', age: 36, gender: 'Female', diagnosis: 'Anemia', admissionDate: '2025-03-22' },
  { id: 9, name: 'James Taylor', age: 49, gender: 'Male', diagnosis: 'Lower Back Pain', admissionDate: '2025-03-08' },
  { id: 10, name: 'Mary Thomas', age: 61, gender: 'Female', diagnosis: 'Rheumatoid Arthritis', admissionDate: '2025-03-01' },
  { id: 11, name: 'Kevin Wilson', age: 38, gender: 'Male', diagnosis: 'Asthma', admissionDate: '2025-03-25' },
  { id: 12, name: 'Patricia Moore', age: 55, gender: 'Female', diagnosis: 'Hypothyroidism', admissionDate: '2025-03-14' },
  { id: 13, name: 'Daniel White', age: 42, gender: 'Male', diagnosis: 'Influenza', admissionDate: '2025-03-19' },
  { id: 14, name: 'Nancy Harris', age: 29, gender: 'Female', diagnosis: 'Urinary Tract Infection', admissionDate: '2025-03-21' },
  { id: 15, name: 'George King', age: 70, gender: 'Male', diagnosis: 'Congestive Heart Failure', admissionDate: '2025-02-25' },
  { id: 16, name: 'Laura Scott', age: 34, gender: 'Female', diagnosis: 'Acute Bronchitis', admissionDate: '2025-03-17' },
  { id: 17, name: 'Charles Young', age: 51, gender: 'Male', diagnosis: 'Kidney Stones', admissionDate: '2025-03-09' },
  { id: 18, name: 'Amanda Wright', age: 44, gender: 'Female', diagnosis: 'Depression', admissionDate: '2025-03-11' },
  { id: 19, name: 'Mark Baker', age: 62, gender: 'Male', diagnosis: 'Osteoarthritis', admissionDate: '2025-03-03' },
  { id: 20, name: 'Karen Adams', age: 39, gender: 'Female', diagnosis: 'Anxiety Disorder', admissionDate: '2025-03-24' }
];

const formatDate = (dateString) => {
  const option = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', option);
}

function PatientTable() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [editingPatient, setEditingPatient] = useState(null);
  const [viewPatient, setViewPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [patientsPerPage] = useState(5);

  //Fetch data (simulated with mock data)
  useEffect(() => {
    // In a real application, you would fetch data from an API
    setPatients(mockPatients);
    setFilteredPatients(mockPatients);
  }, []);

  //Handle search
  useEffect(() => {
    const results = patients.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(results);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, patients]);


  // sorting logic
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortData = [...filteredPatients].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascendiing' ? -1 : 1;
      }
      if (a[key] < b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setFilteredPatients(sortData);
  };

  // Get sorted data
  const getSortIcon = (name) => {
    if (sortConfig.key === name) {
      return sortConfig.direction === 'ascending' ?
        <ChevronUp className="inline w-4 h-4" /> :
        <ChevronDown className="inline w-4 h-4" />;
    }
    return null;
  }

  // Handle pagination
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  // Handle page change
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // handle edit patient
  const handleEditClick = (patient) => {
    setEditingPatient({ ...patient });
    setIsModalOpen(true);
  };

  // Handle view patient details
  const handleViewClick = (patient) => {
    setViewPatient({ ...patient });
    setIsModalOpen(true);
  };

  // Handle input change for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingPatient({
      ...editingPatient,
      [name]: value
    })
  };

  // Save edited patient
  const handleSaveEdit = () => {
    const updatedPatients = patients.map(patient =>
      patient.id === editingPatient.id ? editingPatient : patient
    );
    setPatients(updatedPatients);
    setFilteredPatients(
      filteredPatients.map(patient =>
        patient.id === editingPatient.id ? editingPatient : patient
      )
    );
    setEditingPatient(null);
    setIsModalOpen(false);
  }

  const closeModal = () => {
    setEditingPatient(null);
    setViewPatient(null);
    setIsModalOpen(false);
  }


  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Patients Records</h1>

      {/* search and filter */}
      <div className="mb-relative">
        <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or diagnosis"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-2 focus:outline-none"
          />
        </div>
      </div>

      {/* Table  for medium and larger screens */}
      <div className="hidden md:block overflow-auto-x rounded-lg shadow">
        <table className="min-w-full divid-y divide-gray-200 gb-whites">
          <thead className="gb-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('name')}>
                Patient Name {getSortIcon('name')}
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('age')}
              >
                Age {getSortIcon('age')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('gender')}
              >
                Gender {getSortIcon('gender')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('diagnosis')}
              >
                Diagnosis {getSortIcon('diagnosis')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('admissionDate')}
              >
                Admission Date {getSortIcon('admissionDate')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {currentPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap" >
                  <div className="font-medium text-gray-900">{patient.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap" >
                  <div className="font-medium text-gray-900">{patient.age}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap" >
                  <div className="font-medium text-gray-900">{patient.gender}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap" >
                  <div className="font-medium text-gray-900">{patient.diagnosis}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap" >
                  <div className="font-medium text-gray-900">{formatDate(patient.admissionDate)}</div>
                </td>
                <td>
                  <button
                    onClick={() => handleViewClick(patient)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Eye className="w-5 h-5 inline" />
                  </button>

                  <button
                    onClick={() => handleEditClick(patient)}
                    className="text-blue-600 hover:text-green-900"
                  >
                    <Edit className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="md:hidden space-y-4">
        {currentPatients.map((patient) => (
          <div key={patient.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-800">{patient.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleViewClick(patient)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Eye className="w-5 h-5 inline" />
                </button>

                <button
                  onClick={() => handleEditClick(patient)}
                  className="text-blue-600 hover:text-green-900"
                >
                  <Edit className="w-5 h-5 inline" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium text-gray-500" >Age: </span> {patient.age}
              </div>
              <div>
                <span className="font-medium text-gray-500" >Gender: </span> {patient.gender}
              </div>
              <div>
                <span className="font-medium text-gray-500" >Diagnosis: </span> {patient.diagnosis}
              </div>
              <div>
                <span className="font-medium text-gray-500" >Admitted: </span> {formatDate(patient.admissionDate)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination control */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-500 ">
          Showing {indexOfFirstPatient + 1} to {Math.min(indexOfLastPatient, filteredPatients.length)} of {filteredPatients.length} patients
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            <ChevronLeft className="w-5 h-5" />"
          </button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            // Show page numbers around the current page
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => paginate(pageNum)}
                className={`px-3 py-1 rounded ${currentPage === pageNum ? 'bg-blue-500t text-white' : 'gb-gray-700 hover:bg-gray-300'}`}

              >
                {pageNum}
              </button>
            )
          })}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* view/edit Modal */}
      {isModalOpen && (
        <div>
          <div>
            <div>
              <h3>
                {editingPatient ? 'Edit Patient' : 'Patient Details'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {editingPatient ? (
              <div>
                <div>
                  <label htmlFor=""> Patient Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editingPatient.name}
                    onChange={handleInputChange}
                    className=""
                  />
                </div>
                <div>
                  <label htmlFor=""> Age</label>
                  <input
                    type="text"
                    name="name"
                    value={editingPatient.name}
                    onChange={handleInputChange}
                    className=""
                  />
                </div>
                <div>
                  <label htmlFor=""> Gender</label>
                  <input
                    type="text"
                    name="name"
                    value={editingPatient.gender}
                    onChange={handleInputChange}
                    className=""
                  />
                </div>
                <div>
                  <label htmlFor=""> Diagnosis</label>
                  <input
                    type="text"
                    name="name"
                    value={editingPatient.diagnosis}
                    onChange={handleInputChange}
                    className=""
                  />
                </div>
                <div>
                  <label htmlFor=""> Admission Date</label>
                  <input
                    type="text"
                    name="name"
                    value={editingPatient.admissionDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus::border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2 border"
                  />
                </div>
                <div>
                  <button
                    onClick={closeModal}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-300"
                  >
                    cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
                  >Save Changes</button>
                </div>
              </div>

            ) : viewPatient && (
              <div className="space-y-3">
                <div>
                  <div>
                    <p>Patient Name</p>
                    <p>{viewPatient.name}</p>
                  </div>
                  <div>
                    <p>Age</p>
                    <p>{viewPatient.age}</p>
                  </div>
                  <div>
                    <p>Age</p>
                    <p>{viewPatient.age}</p>
                  </div>
                  <div>
                    <p>Gender</p>
                    <p>{viewPatient.gender}</p>
                  </div>
                  <div>
                    <p>Admission Date</p>
                    <p>{viewPatient.admissionDate}</p>
                  </div>
                  <div>
                    <p>Diagnosis</p>
                    <p>{viewPatient.diagnosis}</p>
                  </div>
                </div>
                <div>
                  <button
                  onClick={()=> handleEditClick(viewPatient)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center">
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PatientTable