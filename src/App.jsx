import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategorySelection from './pages/CategorySelection';
import ItemDetailsForm from './pages/ItemDetailsForm';
import ReviewSubmit from './pages/ReviewSubmit';
import SuccessPage from './pages/SuccessPage';
import ListingsPage from './pages/ListingsPage';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sell" element={<CategorySelection />} />
            <Route path="/sell/details" element={<ItemDetailsForm />} />
            <Route path="/sell/review" element={<ReviewSubmit />} />
            <Route path="/sell/success/:listingId" element={<SuccessPage />} />
            <Route path="/listings" element={<ListingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
