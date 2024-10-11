import React, { useState } from 'react';
import axios from 'axios';

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.title);
  const desc = task.description ?? ".";
  const status = task.status ? 1 : 0; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); 

      await axios.put(`http://localhost:8000/task/updateById/${task.id}`, {
        title: value,
        description: desc,
        status: status
      }, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      editTodo(value, task.id); 

    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      const token = localStorage.getItem('token'); 

      await axios.put(`http://localhost:8000/task/updateStatusById/${task.id}`, {
        status: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });


    } catch (error) {
      console.error("Erro ao atualizar status da tarefa:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Atualizar tarefa"
        required
      />
      <button type="submit" className="todo-btn">Editar</button>
      <button type="button" className="status-btn" onClick={() => updateStatus(status === 1 ? 0 : 1)}>
        {status === 1 ? 'Marcar como Incompleto' : 'Marcar como Completo'}
      </button>
    </form>
  );
};
