// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCLqv7hRZcyn5TJm8OnRgm1e2dNNIb9N0",
  authDomain: "prograacademystore.firebaseapp.com",
  projectId: "prograacademystore",
  storageBucket: "prograacademystore.firebasestorage.app",
  messagingSenderId: "996322586768",
  appId: "1:996322586768:web:980791eefd3c3541526815"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const cargarArchivos = async (file) => {
  if (!file) {
      console.error("No se ha proporcionado un archivo para subir.");
  }
  try {
      const fileRef = ref(storage, v4());
      console.log("Referencia del archivo creada:", fileRef);

      await uploadBytes(fileRef, file);
      console.log("Archivo subido exitosamente");

      const downloadURL = await getDownloadURL(fileRef);
      
      console.log("URL de descarga:", downloadURL);
      return downloadURL;

  } catch (error) {
      console.error("Error al subir el archivo o obtener la URL:", error);
      throw error;
  }
};


export default cargarArchivos;