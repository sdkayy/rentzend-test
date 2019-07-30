import { combineReducers } from 'redux';
import toastReducer from './toast';

const _rootReducer = combineReducers({
  toasts: toastReducer,
});

export const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    default:
      return _rootReducer(state, action);
  }
};
