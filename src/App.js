import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterList from './CharacterList';
import Game from './Game';
import CreateCharacter from './CreateCharacter'; // Import the new form component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/game/:characterId" element={<Game />} />
        <Route path="/create-character" element={<CreateCharacter />} />
      </Routes>
    </Router>
  );
};

export default App;
