const initialState = {
  authState: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH':
      return {
        ...state,
        authState: action.payload,
			};

		default: 
			return state;
	}
};

export default authReducer;