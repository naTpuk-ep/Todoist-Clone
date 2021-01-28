import React, { useEffect } from 'react';
import './All.scss';

import TodoList from '../../components/TodoList';
import { todosDB } from '../../persistance/network';
import { createTodo } from '../../redux/actions/actions';
import { connect } from 'react-redux';

function All(props) {

  console.log('all');

  const { todos, groupProps, createTodo } = props;

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
