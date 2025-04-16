import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, Search } from "lucide-react";


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
    <div>
      <h1>Patients Records</h1>

      {/* search and filter */}
      <div>
        <div>
          <Search className="text-gray-400 w-5 h-5" />
          <input
          type="text"
          placeholder="Search by name or diagnosis"
          value={searchTerm}
          onChange={(e)=> setSearchTerm(e.target.value)}
          className="w-full pl-2 focus:outline-none" 
          />
        </div>
      </div>

      {/* Table  for medium and larger screens */}
      <div>
        <table>
          <thead>
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
              onClick={()=> requestSort('age')}
              >
                Age{getSortIcon('age')}
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  )
}

export default PatientTable