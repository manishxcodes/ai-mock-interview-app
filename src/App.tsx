import { BrowserRouter as  Router, Routes, Route } from 'react-router'
import PublicLayout from "./layouts/public-layout"
import HomePage from "./pages/HomePage"
import { AuthenticatedLayout } from './layouts/auth-layout'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { ProtectedLayout } from './layouts/protected-layout'
import MainLayout from './layouts/main-layout'
import { DashboardPage } from './pages/DashboardPage'
import { CreatePage } from './pages/CreatePage'
import { InterviewLoadPage } from './pages/InterviewLoadPage'
import { Generate } from './components/Generate'
import { MockInterviewPage } from './pages/MockInterviewPage'
import { InterviewDataProvider } from './context/InterviewDataContext'
import { Feedback } from './pages/Feedback'


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
          <Route path='/signup/*' element={<SignUp />} />
          <Route path='/signin/*' element={<SignIn />} />
        </Route>

        {/* protected route */}
        <Route element={
          <ProtectedLayout> 
            <MainLayout /> 
          </ProtectedLayout>
        }>
          {/* all the protected routes */}
          <Route path='/generate' element={
            <InterviewDataProvider>
              <Generate />
            </InterviewDataProvider>} >
            <Route index element={<DashboardPage />} />
            <Route path='create' element={<CreatePage />} />
            <Route path='create/:id' element={<CreatePage />} />
            <Route path='interview/:id' element={<InterviewLoadPage />} />
            <Route path='interview/:id/start' element={<MockInterviewPage />} />
            <Route path="feedback/:id" element={<Feedback />} />
          </Route>
        </Route>
      </Routes>
    </Router>
    
  )
}


export default App
