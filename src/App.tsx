import { BrowserRouter as  Router, Routes, Route } from 'react-router'
import PublicLayout from "./layouts/public-layout"
import HomePage from "./pages/HomePage"
import { AuthenticatedLayout } from './layouts/auth-layout'
import { SignIn } from './pages/Signin'
import { SignUp } from './pages/Signup'
import { ProtectedLayout } from './layouts/protected-layout'
import MainLayout from './layouts/main-layout'


function App() {

  return (
    <Router>
      <Routes>
        {/* public route */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        {/* authenticated route */}
        <Route element={<AuthenticatedLayout />}>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
        </Route>

        {/* protected route */}
        <Route element={
          <ProtectedLayout> 
            <MainLayout /> 
          </ProtectedLayout>
        }>
          {/* all the protected routes */}
        </Route>
      </Routes>
    </Router>
    
  )
}


export default App
