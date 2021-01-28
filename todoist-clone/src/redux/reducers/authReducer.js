const initialState = {
  auhtState: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH':
      return {
        ...state,
        auhtState: state.auhtState,
			};

		default: 
			return state;
	}
};

export default authReducer;