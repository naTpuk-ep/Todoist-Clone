import React, { useEffect } from 'react';
import './All.scss';

import TodoList from '../../components/TodoList';
import { todosData } from '../../persistance/network';
import { createTodo } from '../../redux/actions/actions';
import { connect } from 'react-redux';

function All(props) {
  const { todos, groupProps, createTodo } = props;

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await todosData.get();
        const prevTodos = res || [];
        prevTodos.forEach((el) => createTodo(el));
      } catch (e) {
        console.log(e.message);
      }
    };
    getTodos();
  }, [createTodo]);

  return (
    <div className='All'>
      <TodoList todos={todos} groupProps={groupProps} />
    </div>
  );
}

const mapDispatchToProps = {
  createTodo,
};

export default connect(null, mapDispatchToProps)(All);
