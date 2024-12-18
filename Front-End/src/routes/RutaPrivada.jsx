import React, { useContext } from 'react'
import AcademyContext from '../components/Context/AcademyContext'
import { Navigate, useNavigate } from 'react-router-dom'


const RutaPrivada = ({children}) => {
    const { isAuthenticated } = useContext(AcademyContext)

  return isAuthenticated ? children : <Navigate to= '/login'/>
}

export default RutaPrivada