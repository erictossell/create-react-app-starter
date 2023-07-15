import './App.css';

// App.js
import React from 'react';
import Header from './components/Header';
import MainSection from './components/MainSection';
import Footer from './components/Footer';
import InteractiveComponent from './components/Interactive';

function App() {
  return (
    <div className="App">
      <Header />
      <MainSection />
      <InteractiveComponent />
      <Footer />
    </div>
  );
}

export default App;

