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
  const [flavor, setFlavor] = useState("");

  //Datos de usuario
  const [currentUser, setCurrentUser] = useState(null);

  useEffect( () => {
      const user = JSON.parse(localStorage.getItem("usuarioActual"));
      setCurrentUser(user);
  }, [] );


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
    try {
      const response = await axios.post('http://localhost:3000/order/new_order', {
          user_id: currentUser.user_id,
      });
      if(response.status === 201){
        alert(`Orden Creada con ID: ${response.data.order.order_id}`);
      }
      else if(response.status === 400){
        alert("Error, la orden no pudo ser creada");
      }
    } catch(error){
      alert("Error, la orden no pudo ser creada");
    }
  };
  
  const handleRemoveImage = () => {
    setImageUrl(null);
    setProgress(0);
    setFile(null);
    setSuccess(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
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

      <label htmlFor="flavorSelect" className="block text-sm mb-1 mt-1 font-medium text-gray-700 bm-2">
        Selecciona un sabor para el medicamento:
      </label>
      <select
        id="flavorSelect"
        value={flavor}
        onChange={(e) => setFlavor(e.target.value)}
        className="block w-full mt-3 mb-3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
        >
          <option value="">--Selecciona un sabor--</option>
          <option value="fresa">Fresa</option>
          <option value="mango">Mango</option>
          <option value="chocolate">Chocolate</option>
          <option value="vainilla">Vainilla</option>
        </select>

      <div className="buttons">
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
          className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center animate-fade-in"
        >
          <CheckCircle className="mr-2 animate-bounce" size={24} />
          <span>La receta ha sido cargada exitosamente.</span>
        </div>
      )}
    </div>
  );

};

export default UploadComponent;
