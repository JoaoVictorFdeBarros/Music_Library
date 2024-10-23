import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:query" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App;
