const initialState = {
  todos: [],
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_TODO':
      return {
        ...state,
        todos: state.todos.concat([action.payload]),
      };

    case 'COMPLETE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        }),
      };

    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(
          (el) => el.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
};

export default todosReducer;
