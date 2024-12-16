// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnKv4vv6rk7oHg8jdJ7xX5VfiPooaZC40",
  authDomain: "progracademy-95044.firebaseapp.com",
  projectId: "progracademy-95044",
  storageBucket: "progracademy-95044.firebasestorage.app",
  messagingSenderId: "797366203018",
  appId: "1:797366203018:web:4961f0c61cbadad8e43373",
  measurementId: "G-X58JDKRDE1"
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