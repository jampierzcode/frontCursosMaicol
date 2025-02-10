import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";
import axios from "axios";

const Courses = () => {
  const { auth } = useAuth();

  const apiUrl = process.env.REACT_APP_API_URL;

  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const buscar_categorias = async () => {
    try {
      const response = await axios.get(`${apiUrl}/categories`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log(response);
      if (response.data.status === "success") {
        setCategories(response.data.data);
        setFilterCategories(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error al obtener las categories:", error);
    }
  };
  useEffect(() => {
    buscar_categorias();
  }, [auth, apiUrl]);

  return <div>Courses</div>;
};

export default Courses;
