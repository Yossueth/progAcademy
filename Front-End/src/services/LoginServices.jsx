// POST
export async function postUsersLogin(correo, contrasena) {
    const data = {
      correo,
      contrasena,
    };
    try {
      const response = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
      
    } catch (error) {
      console.error("Error in POST request:", error.message);
      throw error;
    }
  }
  

  

