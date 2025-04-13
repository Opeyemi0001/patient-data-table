import DataTable from "react-data-table-component"
import { data } from "./assets/data"
import { useState } from "react"

const columns = [
  {
    name: "Patient Name",
    selector: (row) => row.name,
  },
  {
    name: "Age",
    selector: (row) => row.age,
    sortable: true,
  },
  {
    name: "Gender",
    selector: (row) => row.gender,
  },
  {
    name: "Diagnosis",
    selector: (row) => row.diagnosis,
    sortable: true,
  },
  {
    name: "Admission",
    selector: (row) => row.admissionDate,
    sortable: true,
    format: (row) => new Date(row.admissionDate).toLocaleDateString(),
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
]

const customStyles = {
  headCells: {
    style: {
      fontSize: "1.2rem",
      fontWeight: "bolder",
      color: "#fff",
      backgroundColor: "#000",
    }
  }
}


function App() {
  const [records, setRecords] = useState(data);

  const handleChange = (e) => {
    let query = e.target.value;
    const newrecords = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()))
    setRecords(newrecords);
  };


  return (
    <div className="container mx-auto px-4 py-4" >
      <div className="mb-4 mt-1">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center">Patient Table data</h1>
        <input className="w-full sm:w-1/2 rounded-xl py-2 px-4 bg-amber-400 block mx-auto focus:outline-none"
          type="text" placeholder="search by patient name" onChange={handleChange} />
      </div>

      <div className="overflow-x-auto">
        <DataTable columns={columns}
          customStyles={customStyles}
          data={records}
          pagination
          responsive
        ></DataTable>
      </div>

    </div>
  )
}

export default App


// import DataTable from "react-data-table-component";
// import { data } from "./assets/data";
// import { useState } from "react";

// const columns = [
//   {
//     name: "Patient Name",
//     selector: (row) => row.name,
//   },
//   {
//     name: "Age",
//     selector: (row) => row.age,
//     sortable: true,
//   },
//   {
//     name: "Gender",
//     selector: (row) => row.gender,
//   },
//   {
//     name: "Diagnosis",
//     selector: (row) => row.diagnosis,
//     sortable: true,
//   },
//   {
//     name: "Admission",
//     selector: (row) => row.admissionDate,
//     sortable: true,
//     format: (row) => new Date(row.admissionDate).toLocaleDateString(),
//   },
//   {
//     name: "Action",
//     selector: (row) => row.action,
//   },
// ];

// const customStyles = {
//   headCells: {
//     style: {
//       fontSize: "1.2rem",
//       fontWeight: "bolder",
//       color: "#fff",
//       backgroundColor: "#000",
//     },
//   },
// };

// function App() {
//   const [records, setRecords] = useState(data);

//   const handleChange = (e) => {
//     let query = e.target.value;
//     const newrecords = data.filter((item) =>
//       item.name.toLowerCase().includes(query.toLowerCase())
//     );
//     setRecords(newrecords);
//   };

//   return (
//     <div className="container mx-auto px-4 py-4">
//       <div className="mb-4">
//         <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
//           Patient Table Data
//         </h1>
//         <input
//           className="w-full sm:w-1/2 rounded-xl py-2 px-4 bg-amber-400 block mx-auto focus:outline-none"
//           type="text"
//           placeholder="Search by patient name"
//           onChange={handleChange}
//         />
//       </div>

//       <div className="overflow-x-auto">
//         <DataTable
//           columns={columns}
//           customStyles={{
//             ...customStyles,
//             rows: {
//               style: {
//                 flexDirection: 'column',
//                 alignItems: 'flex-start',
//                 padding: '1rem',
//                 '@media (min-width: 640px)': {
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                 },
//               },
//             },
//             cells: {
//               style: {
//                 paddingLeft: '0',
//                 paddingRight: '0',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'flex-start',
//                 '@media (min-width: 640px)': {
//                   display: 'table-cell',
//                   padding: '10px',
//                 },
//               },
//             },
//           }}
//           data={records}
//           pagination
//           responsive
//         />
//       </div>
//     </div>
//   );
// }

// export default App;
