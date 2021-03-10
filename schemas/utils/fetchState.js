export const TYPES = {
  loading: 'loading',
  success: 'success',
  failure: 'failure',
};

export const STATUSES = {
  idle: 'idle',
  pending: 'pending',
  rejected: 'rejected',
  resolved: 'resolved',
};

export const INITIAL_STATE = { status: STATUSES.idle, data: null, error: null };

const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.loading: {
      return { ...state, status: STATUSES.pending, data: null };
    }
    case TYPES.failure: {
      return { ...state, status: STATUSES.rejected, error: action.error };
    }
    case TYPES.success: {
      return { ...state, status: STATUSES.resolved, data: action.data };
    }
    default: {
      return state;
    }
  }
};

export const actionCreators = {
  loading: () => ({ type: TYPES.loading }),
  failure: error => ({ type: TYPES.failure, error }),
  success: data => ({ type: TYPES.success, data }),
};

export default reducer;
