const initialState = {
  domElementsClassNames: {
    modal: 'Modal',
    nav: 'Nav',
  },
};

const domElementsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        domElementsClassNames: {
          ...state.domElementsClassNames,
          modal:
            initialState.domElementsClassNames.modal + ' Modal_show',
        },
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        domElementsClassNames: {
          ...state.domElementsClassNames,
          modal: initialState.domElementsClassNames.modal,
        },
      };

    case 'SHOW_NAV':
      return {
        ...state,
        domElementsClassNames: {
          ...state.domElementsClassNames,
          nav: initialState.domElementsClassNames.nav + ' Nav_show',
        },
      };

    case 'CLOSE_NAV':
      return {
        ...state,
        domElementsClassNames: {
          ...state.domElementsClassNames,
          nav: initialState.domElementsClassNames.nav,
        },
      };

    default:
      return state;
  }
};

export default domElementsReducer;
