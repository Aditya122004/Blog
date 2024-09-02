import { Navigate } from 'react-router-dom'
import { useFirebase } from '../context/useFirebase'

// eslint-disable-next-line react/prop-types
function ProtectedRouting({ children }) {
    const { user } = useFirebase()

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRouting