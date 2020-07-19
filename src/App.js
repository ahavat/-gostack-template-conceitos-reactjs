import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    //setRepositories([...repositories, `New Repository ${Date.now()}`]);
    const response = await api.post('repositories', {
      title: `New Repository ${Date.now()}`,
      url: "github.com/ahavat",
      techs: "Node JS, React, Rails",
    });
    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete("repositories/" + id);
  }

  return (
    <>
      <ul data-testid="repository-list">
        <>
          {repositories.map(repository => <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>)}
        </>
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
