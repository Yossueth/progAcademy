const token = sessionStorage.getItem("token");
const permisosToken = 'Bearer ' + token

// GET
export async function getUsers() {
  try {
    const response = await fetch("http://localhost:3000/usuarios/");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error in GET request:", error.message);
    throw error;
  }
}

// POST
export async function postUsersRegister(data) {
  try {
    const response = await fetch("http://localhost:3000/usuarios/registro", {
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

// PUT
export async function putUsers(id) {
  try {
    const response = await fetch(
      `http://localhost:3000/usuarios/registro/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": permisosToken
        },
        body: JSON.stringify(id),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error in PUT request:", error.message);
    throw error;
  }
}

export async function patchUsers(newRolId, id) {
  try {
    const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
      method: 'PATCH',  // Método PATCH
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rol_id: newRolId }),  // Solo el campo que deseas actualizar
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud PATCH');
    }
    
    const data = await response.json();
    console.log('Respuesta del servidor:', data);
  } catch (error) {
    console.error('Error en PATCH request:', error);
  }
};

// DELETE
export async function deleteUsers(id) {
  try {
    const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return true;
    } else {
      console.error("Error deleting task:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}
