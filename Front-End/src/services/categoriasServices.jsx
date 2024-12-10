const token = sessionStorage.getItem('token')

// GET
export async function getCategorias() {
    try {
        console.log(token);
        
      const response = await fetch("http://localhost:3000/categorias/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization":token
        },
      })

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
  export async function postCategorias(data) {
    try {
      const response = await fetch("http://localhost:3000/categorias", {
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
  export async function putCategorias(id) {
    try {
      const response = await fetch(
        `http://localhost:3000/categorias/${id}`,
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
  
  // DELETE
  export async function deleteCategorias(id) {
    try {
      const response = await fetch(`http://localhost:3000/categorias/${id}`, {
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
  