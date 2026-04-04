import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './lib/theme';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/learn/:conceptId" element={<div>Concept</div>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
