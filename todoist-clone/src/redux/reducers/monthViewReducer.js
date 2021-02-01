const initialState = {
	date: null
};

const monthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MONTH_VIEW':
      return {
        ...state,
        date: action.payload,
			};

		default: 
			return state;
	}
};

export default monthReducer;