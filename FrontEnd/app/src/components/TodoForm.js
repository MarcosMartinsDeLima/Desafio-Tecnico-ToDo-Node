import React, { useState } from 'react';
import axios from 'axios';

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');
  const [desc, setDesc] = useState('');

  
  const userId = localStorage.getItem('userId'); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (value) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:8000/task/create', {
          title: value,
          description: desc,
          userId: userId
        }, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        addTodo(response.data.task);

        setValue('');
        setDesc('');

      } catch (error) {
        console.error("Erro ao criar tarefa:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Digite o título"
        required
      />
      <input
        type="textarea"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="todo-input"
        placeholder="Descrição (opcional)"
      />
      <button type="submit" className="todo-btn">Criar tarefa</button>
    </form>
  );
};
