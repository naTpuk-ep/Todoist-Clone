const initialState = {
  domElementsClassNames: {
    modal: 'Modal',
    nav: 'Nav',
    overlay: 'Overlay',
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
          overlay:
            initialState.domElementsClassNames.overlay +
            ' Overlay_show',
        },
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        domElementsClassNames: {
          ...state.domElementsClassNames,
          modal: initialState.domElementsClassNames.modal,
          overlay: initialState.domElementsClassNames.overlay,
        },
      };

    case 'SHOW_NAV':
      return {
        ...state,
        domElementsClassNames: {
          ...state.domElementsClassNames,
          nav: initialState.domElementsClassNames.nav + ' Nav_show',
          overlay:
            initialState.domElementsClassNames.overlay +
            ' Overlay_show',
        },
      };

    case 'CLOSE_NAV':
      return {
        ...state,
        domElementsClassNames: {
          ...state.domElementsClassNames,
          nav: initialState.domElementsClassNames.nav,
          overlay: initialState.domElementsClassNames.overlay,
        },
      };

    default:
      return state;
  }
};

export default domElementsReducer;
