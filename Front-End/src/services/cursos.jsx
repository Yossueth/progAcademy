// GET
export async function getCursos() {
  try {
    const response = await fetch("http://localhost:3000/cursos/");
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
export const postCursos = async (curso) => {
  try {
    const response = await fetch("http://localhost:3000/cursos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(curso),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};


// PUT
export async function putCursos(data, id) {
  try {
    const response = await fetch(`http://localhost:3000/cursos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

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

// DELETE
export async function deleteCursos(id) {
  try {
    const response = await fetch(`http://localhost:3000/cursos/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log(`Task ${id} deleted`);
      return true;
    } else {
      console.error("Error deleting task:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}
