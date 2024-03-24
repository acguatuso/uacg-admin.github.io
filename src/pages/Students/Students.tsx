import { useEffect, useState } from "react";
import DataTableBase from "../../components/dataTable/DataTableBase";
import { FaAddressCard, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { getFirebaseDocs } from "../../api/getFirebaseDocs/getFirebaseDocs";
import { Student } from "./Student.interface";

const columns = [
  // {
  //   name: "Número",
  //   selector: (row: any) => row.id,
  //   sortable: true,
  // },
  {
    name: "Nombre",
    selector: (row: any) => row.nombre,
    sortable: true,
  },

  {
    name: "Cédula",
    selector: (row: any) => row.cedula,
    sortable: true,
  },
  {
    name: "Télefono",
    selector: (row: any) => row.telefono,
    sortable: true,
  },
  {
    name: "Correo",
    selector: (row: any) => row.correo,
    sortable: true,
    width: "250px",
  },
  {
    name: "Estado",
    cell: (row: any) => (
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
        ></input>
      </div>
    ),
    width: "5vw",
  },
  {
    name: "Ver",
    cell: (row: any) => (
      <button
        className="btn btn-primary"
        onClick={() => handleButtonClick(row.name)}
      >
        <FaAddressCard />
      </button>
    ),
    width: "5vw",
  },
  {
    name: "Editar",
    cell: (row: any) => (
      <button
        className="btn btn-warning"
        onClick={() => handleButtonClick(row.name)}
      >
        <FaEdit />
      </button>
    ),
    width: "5vw",
  },
  {
    name: "Eliminar",
    cell: (row: any) => (
      <button
        className="btn btn-danger"
        onClick={() => handleButtonClick(row.name)}
      >
        <MdDelete />
      </button>
    ),
    width: "6vw",
  },
];

const Students = () => {
  // const [jsonData, setJsonData] = useState([]);
  const [filteredData, setFilteredData] = useState<Student[]>([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    // fetch("/src/pages/Students/data.json")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setJsonData(data);
    //     setFilteredData(data);
    //   })
    //   .catch((error) => console.error("Error fetching JSON:", error));
    getStudents();
  }, []);

  // useEffect(() => {
  //   const filtered = filteredData.filter((item) =>
  //     item.nombre.toLowerCase().includes(filterText.toLowerCase())
  //   );
  //   setFilteredData(filtered);
  // }, [filterText, []]);

  // const addStudent = () => {
  //   const newEntry = {
  //     id: jsonData.length + 1,
  //     name: "New Student",
  //     idCR: "1234567",
  //     phone: "12345678",
  //     email: "new.student@example.com",
  //   };
  //   setJsonData([newEntry, ...jsonData]);
  // };

  const getStudents = async () => {
    const data = await getFirebaseDocs("Usuarios");
    var formatedData: Student[] = [];
    formatedData = data.map((student: any) => ({
      canton: student.canton,
      cedula: student.cedula,
      correo: student.correo,
      direccion: student.direccion,
      distrito: student.distrito,
      estado: student.estado,
      fechaNacimiento: student.fechaNacimiento,
      genero: student.genero,
      nombre: student.nombre,
      provincia: student.provincia,
      telefono: student.telefono,
      user_type: student.user_type,
    }));
    setFilteredData(formatedData);
  };

  // LOGICA PARA REDIRECCIONAR SI NO SE ESTA LOGUEADO, PARA QUE NO SE PUEDA ACCEDER MENDIATE URL DIRECTA
  // React-router-dom
  const navigate = useNavigate();
  // Redux Hooks & Access
  const user = useSelector((state: RootState) => state.auth.user);
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  // Redireccionar si está no logueado, y no hay usuario
  useEffect(() => {
    if (!loggedIn && !user) {
      navigate("/");
    }
  }, [loggedIn, user, navigate]);

  return (
    <div style={{ top: "18%", left: "10%", right: "10%", bottom: "10%" }}>
      <h2 className="text-secondary mb-0 pt-3 ps-2">
        Listado General de Estudiantes
      </h2>
      <div className="d-flex justify-content-between mb-2">
        <div className="d-flex">
          <button
            className="btn btn-dark py-0 ms-2 mt-3"
            style={{ height: "35px" }}
            onClick={() => console.log("adding.....")}
          >
            Crear Estudiante
          </button>
        </div>
        <div className="col-3">
          <input
            type="text"
            className="form-control bg-secondary text-white mt-3"
            placeholder="Filtrar por Nombre"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
      </div>
      <DataTableBase columns={columns} data={filteredData} />
    </div>
  );
};

function handleButtonClick(id: any): void {
  console.log("Button clicked for:", id);
}

export default Students;
