import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = () => {
    axios.get('http://localhost:3000/characters')
      .then(response => setCharacters(response.data))
      .catch(error => console.error("Error fetching characters:", error));
  };

  // Handle selecting a character
  const selectCharacter = (characterId) => {
    navigate(`/game/${characterId}`);
  };

  return (
    <div>
      <h1>Character List</h1>

      <ul>
        {characters.map(character => (
          <li key={character.id} onClick={() => selectCharacter(character.id)}>
            {character.name} (Level: {character.level})
          </li>
        ))}
      </ul>

      {/* Button to navigate to the character creation form */}
      <button onClick={() => navigate('/create-character')}>Create New Character</button>
    </div>
  );
};

export default CharacterList;