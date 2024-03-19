import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {  editarDoc } from '../../redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';

// Opciones de ejemplo para los dropdowns
const provincias = ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Guanacaste', 'Puntarenas', 'Limón'];
const cantones = ['Canton 1', 'Canton 2', 'Canton 3']; // Ejemplo de opciones de cantones
const distritos = ['Distrito 1', 'Distrito 2', 'Distrito 3']; // Ejemplo de opciones de distritos
const generos = ['Masculino', 'Femenino', 'Otro']; // Ejemplo de opciones de género


const MiPerfil: React.FC = () => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState<any>(null); // Cambié el tipo a 'any' para simplificar

    // Redux Hooks & Access
    const dispatch = useDispatch();
    const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
    const user = useSelector((state: RootState) => state.auth.user);

    // Efecto para inicializar el formulario cuando el usuario cambia
    useEffect(() => {
        if (user) {
            setFormData({ ...user }); // Clonar el objeto user para evitar mutar el estado original
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleCancelClick = () => {
        setEditMode(false);
        // Reiniciar el formulario con los datos originales del usuario
        if (user) {
            setFormData({ ...user });
        }
    };

    const handleSaveClick = () => {
        console.log(formData);
        console.log(user?.correo);
        // Dispatch de la acción para actualizar los datos del usuario en Firebase Firestore
        dispatch(editarDoc(formData, user?.correo || '') as any);
        setEditMode(false);
    };

    // LOGICA PARA REDIRECCIONAR SI NO SE ESTA LOGUEADO, PARA QUE NO SE PUEDA ACCEDER MENDIATE URL DIRECTA
    // React-router-dom
    const navigate = useNavigate();
    // Redux Hooks & Access
    console.log('Conectado: ', loggedIn);
    // Redireccionar si está no logueado, y no hay usuario
    useEffect(() => {
        if (!loggedIn && !user) {
            navigate("/");
        }
    }, [loggedIn, user, navigate]);

    return (
        <div className="container">
            <h2>Mi Perfil</h2>
            <div className="row">
                {formData && Object.entries(formData).map(([key, value]) => {
                    if (key === 'correo' || key === 'user_type' || key === 'estado') {
                        return null; // Salta email, user_type y estado
                    }
    
                    if (key === 'fechaNacimiento') {
                        // Renderizar el selector de fecha para fecha de nacimiento
                        return (
                            <div key={key} className="col-md-3 mb-3">
                                <label className="form-label">{key}</label>
                                {!editMode ? (
                                    <div className="form-control">{value}</div>
                                ) : (
                                    <input
                                        title='fecha-nacimiento'
                                        type="date"
                                        name={key}
                                        value={value} // value debe ser un string en formato 'yyyy-mm-dd'
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                )}
                            </div>
                        );
                    }
    
                    if (key === 'canton' || key === 'provincia' || key === 'distrito' || key === 'genero') {
                        // Renderizar dropdowns para canton, provincia, distrito y genero
                        return (
                            <div key={key} className="col-md-3 mb-3">
                                <label className="form-label">{key}</label>
                                {!editMode ? (
                                    <div className="form-control">{value}</div>
                                ) : (
                                    <select
                                        title='form-select'
                                        name={key}
                                        value={formData[key]}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="">Seleccionar {key}</option>
                                        {key === 'provincia' && provincias.map((prov, index) => (
                                            <option key={index} value={prov}>{prov}</option>
                                        ))}
                                        {key === 'canton' && cantones.map((canton, index) => (
                                            <option key={index} value={canton}>{canton}</option>
                                        ))}
                                        {key === 'distrito' && distritos.map((distrito, index) => (
                                            <option key={index} value={distrito}>{distrito}</option>
                                        ))}
                                        {key === 'genero' && generos.map((genero, index) => (
                                            <option key={index} value={genero}>{genero}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        );
                    }
    
                    return (
                        <div key={key} className="col-md-3 mb-3">
                            <label className="form-label">{key}</label>
                            {!editMode ? (
                                <div className="form-control">{value}</div>
                            ) : (
                                <input
                                    title='contraseña'
                                    type={(key === 'password') ? 'password' : 'text'}
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            )}
                        </div>
                    );
                })}
            </div>
            {!editMode ? (
                <button onClick={handleEditClick} className="btn btn-primary me-2">Editar</button>
            ) : (
                <>
                    <button onClick={handleCancelClick} className="btn btn-secondary me-2">Cancelar</button>
                    <button onClick={handleSaveClick} className="btn btn-success">Guardar</button>
                </>
            )}
        </div>
    );
    
};

export default MiPerfil;
