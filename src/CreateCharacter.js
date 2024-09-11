import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateCharacter = () => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState(1);
  const navigate = useNavigate();

  // Handle form submission for creating a new character
  const createCharacter = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/characters', {
      name: name,
      level: level
    })
    .then(() => {
      navigate('/'); // Redirect back to the character list page after successful creation
    })
    .catch(error => console.error("Error creating character:", error));
  };

  // Handle going back to the character list
  const goBack = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Create a New Character</h1>
      <form onSubmit={createCharacter}>
        <input 
          type="text"
          placeholder="Character Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input 
          type="number"
          placeholder="Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
          min="1"
        />
        <button type="submit">Create Character</button>
      </form>

      {/* Add a back button to navigate to the character list */}
      <button onClick={goBack} style={{ marginTop: '20px' }}>
        Back to Character List
      </button>
    </div>
  );
};

export default CreateCharacter;
