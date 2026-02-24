import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Selectors from './pages/Selectors'
import BoxModel from './pages/BoxModel'
import Colors from './pages/Colors'
import Typography from './pages/Typography'
import Display from './pages/Display'
import Flexbox from './pages/Flexbox'
import Grid from './pages/Grid'
import Positioning from './pages/Positioning'
import Backgrounds from './pages/Backgrounds'
import Transitions from './pages/Transitions'
import Transforms from './pages/Transforms'
import Animations from './pages/Animations'
import Filters from './pages/Filters'
import Variables from './pages/Variables'
import Pseudo from './pages/Pseudo'
import Responsive from './pages/Responsive'
import Modern from './pages/Modern'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/selectors"    element={<Selectors />} />
          <Route path="/box-model"    element={<BoxModel />} />
          <Route path="/colors"       element={<Colors />} />
          <Route path="/typography"   element={<Typography />} />
          <Route path="/display"      element={<Display />} />
          <Route path="/flexbox"      element={<Flexbox />} />
          <Route path="/grid"         element={<Grid />} />
          <Route path="/positioning"  element={<Positioning />} />
          <Route path="/backgrounds"  element={<Backgrounds />} />
          <Route path="/transitions"  element={<Transitions />} />
          <Route path="/transforms"   element={<Transforms />} />
          <Route path="/animations"   element={<Animations />} />
          <Route path="/filters"      element={<Filters />} />
          <Route path="/variables"    element={<Variables />} />
          <Route path="/pseudo"       element={<Pseudo />} />
          <Route path="/responsive"   element={<Responsive />} />
          <Route path="/modern"       element={<Modern />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
