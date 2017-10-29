import { EVENTS_COMPLETE } from '../actions/complete.actions';

const initState = {
  type: null,
  payload: {
    isCompleted: false,
  },
};

export default (stateCopy = initState, { type, payload }) => {
  const state = { ...stateCopy };

  switch (type) {
    case EVENTS_COMPLETE.TYPE_COMPLETED_FORMS:
      state.type = EVENTS_COMPLETE.TYPE_COMPLETED_FORMS;
      state.payload = {
        isCompleted: true,
      };
      return state;
    case EVENTS_COMPLETE.TYPE_COMPLETE_LOADED:
      state.type = EVENTS_COMPLETE.TYPE_COMPLETE_LOADED;
      state.payload = {
        isCompleted: payload.isCompleted ? payload.isCompleted : false,
      };
      return state;
    default:
      return state;
  }
};
