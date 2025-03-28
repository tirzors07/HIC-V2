import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from './ProgressBar';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

const UploadComponent = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadCancelToken, setUploadCancelToken] = useState(null);
  const [success, setSuccess] = useState(false);
  const [medCount, setMedCount] = useState(1);
  const [flavors, setFlavors] = useState([]);
  const availableFlavors = ["Fresa", "Uva", "Plátano", "Mango", "Piña", "Chicle Rosa", "Chicle Azul", "Grosella"];

  //Datos de usuario
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioActual"));
    setCurrentUser(user);
    setFlavors(Array(medCount).fill("")); // ✅ Asegurar que flavors siempre tenga el tamaño correcto
}, [medCount]);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
        setErrorMessage("Formato no soportado. Solo se aceptan JPEG y PNG.");
        setFile(null);
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        setErrorMessage("El archivo es demasiado grande. El tamaño máximo es 10MB.");
        setFile(null);
        return;
      }
      setErrorMessage(""); 
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setImageUrl(objectUrl);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('image',file);
    formData.append('user_id',currentUser.user_id);
    formData.append("flavor", flavors);
    try {
      setIsUploading(true);
      const response = await axios.post('http://localhost:3000/prescriptions', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percent);
          },
          //user_id: currentUser.user_id,
      });
      if (response.status === 201) {
        alert(`Receta creada con ID: ${response.data.prescription.prescription_id}\nLa orden sera revisada y creada por un administrador, revise mas tarde`);  // Aquí usamos prescription_id
        setSuccess(true);
        setImageUrl(`http://localhost:3000${response.data.prescription.image_url}`);
      }
      else if(response.status === 400){
        alert("Error, la receta no pudo ser procesada");
      }
    } catch (error) {
      console.error("Error en la carga:", error);
    
      if (error.response) {
        // Respuesta con un error del servidor
        alert(`Error del servidor: ${error.response.status} - ${error.response.data.message || "Orden no creada"}`);
      } else if (error.request) {
        // El servidor no respondió
        alert("No se recibió respuesta del servidor. Verifica tu conexión.");
      } else {
        // Error en la configuración de la solicitud
        alert(`Error en la configuración: ${error.message}`);
      }
    }
     finally {
      setIsUploading(false);
    }
  };
  
  const handleRemoveImage = () => {
    setImageUrl(null);
    setProgress(0);
    setFile(null);
    setSuccess(false);
  };
  const handleFlavorChange = (index, value) => {
    const newFlavors = [...flavors];
    newFlavors[index] = value;
    setFlavors(newFlavors);
  };
  return (
    <div className="flex max-w-6xl mx-auto p-6 gap-6">
      {/* Formulario de paciente */}
      <div className="w-1/2 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Cuestionario</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
          <input type="text" className="w-full p-2 border rounded-lg bg-white text-black" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Peso (kg)</label>
          <input type="number" className="w-full p-2 border rounded-lg bg-white text-black" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
          <input type="date" className="w-full p-2 border rounded-lg bg-white text-black" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Diagnóstico o padecimiento</label>
          <input type="text" className="w-full p-2 border rounded-lg bg-white text-black" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">¿Intolerante a lactosa?</label>
          <select className="w-full p-2 border rounded-lg bg-white text-black">
            <option>No</option>
            <option>Sí</option>
          </select>
        </div>
      </div>
      
      {/* Subida de receta y sabores */}
      <div className="w-1/2 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Cargar Receta Médica</h2>
        <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700 mb-2">
        Selecciona una imagen:
      </label>
      <input 
        type="file" 
        id="fileInput" 
        onChange={handleFileChange} 
        accept="image/jpeg, image/png" 
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
        />
        {errorMessage && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
        <AlertCircle className="mr-2" size={20} />
        {errorMessage}
      </div>}

      {imageUrl && (
        <div className="mb-4">
          <h3>Imagen seleccionada:</h3>
          <img 
            src={imageUrl} 
            alt="Vista previa" 
            className="max-w-full h-auto rounded-lg border-2 border-gray-300 p-2"
          />
          <button onClick={handleRemoveImage} className="mt-2 text-red-500">Eliminar Imagen</button>
        </div>
      )}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Cantidad de medicamentos en la receta</label>
          <input 
            type="number" 
            min="1" 
            max="10" 
            value={medCount} 
            onChange={(e) => setMedCount(Number(e.target.value))} 
            className="w-full p-2 border rounded-lg bg-white text-black" 
          />
        </div>
        
        {flavors.map((flavor, index) => (
          <div key={index} className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Sabor para medicamento {index + 1}</label>
            <select 
              value={flavor} 
              onChange={(e) => handleFlavorChange(index, e.target.value)}
              className="w-full p-2 border rounded-lg bg-white text-black"
            >
              <option value="">Seleccione un sabor</option>
              {availableFlavors.map((f, i) => (
                <option key={i} value={f}>{f}</option>
              ))}
            </select>
          </div>
        ))}
        <div className="mt-6">
        <button onClick={handleUpload} disabled={isUploading || !file} className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isUploading || !file ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {isUploading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </>
          ) : (
            <>
              <Upload className="mr-2" size={20} />
              Subir Imagen
            </>
          )}
        </button>
      </div>

      {progress > 0 && <ProgressBar progress={progress} />}
      {success && (
        <div
          className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center animate-fade-in">
          <CheckCircle className="mr-2 animate-bounce" size={24} />
          <span>La receta ha sido cargada exitosamente.</span>
        </div>
      )}

      </div>
    </div>
  );

};

export default UploadComponent;
