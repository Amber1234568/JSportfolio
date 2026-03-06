import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Work } from './pages/Work';
import { Daplink } from './pages/Daplink';
import { StudyPal } from './pages/StudyPal';
import { AdhdCoach } from './pages/AdhdCoach';

export function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/work" replace />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/daplink" element={<Daplink />} />
        <Route path="/work/studypal" element={<StudyPal />} />
        <Route path="/work/adhd-coach" element={<AdhdCoach />} />
        <Route path="*" element={<Navigate to="/work" replace />} />
      </Routes>
    </HashRouter>
  );
}
