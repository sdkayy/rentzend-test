const initialState = {
  toasts: [],
};

/*
  Payload shape:
  payload: {
    kind: 'error' | 'success',
    message: string
  }
  */
export default function toasts(state: any = initialState, action: any) {
  switch (action.type) {
    case 'ADD_TOAST': {
      return (Object as any).assign({}, state, {
        ...state,
        toasts: [...state.toasts, action.payload],
      });
    }
    case 'REMOVE_TOAST': {
      const toasts = state.toasts.filter(toast => {
        return toast.id !== action.id;
      });
      return (Object as any).assign({}, state, {
        ...state,
        toasts,
      });
    }
    default:
      return state;
  }
}
