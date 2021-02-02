const initialState = {
	monthDate: null,
	weekDate: null
};

const viewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MONTH_VIEW':
      return {
        ...state,
        monthDate: action.payload,
			}

		case 'WEEK_VIEW':
			return {
				...state,
				weekDate: action.payload,
			}

		default: 
			return state;
	}
};

export default viewReducer;