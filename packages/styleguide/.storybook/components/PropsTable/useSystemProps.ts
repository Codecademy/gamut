import { useReducer } from 'react';

interface PropsTableState {
  activeGroups: string[];
  showAll: boolean;
}

interface Actions {
  toggleAll: () => void;
  toggleGroup: (group: string) => void;
}

const INITIAL_STATE: PropsTableState = {
  activeGroups: [],
  showAll: true,
};

const actions = {
  TOGGLE_GROUP: 'TOGGLE_GROUP',
  TOGGLE_ALL: 'TOGGLE_ALL',
};

const reducer = (state: PropsTableState = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case actions.TOGGLE_GROUP: {
      const isActive = state.activeGroups.includes(payload);
      return {
        ...state,
        activeGroups: isActive
          ? state.activeGroups.filter((group) => group !== payload)
          : [...state.activeGroups, payload],
      };
    }
    case actions.TOGGLE_ALL: {
      return {
        ...state,
        showAll: !state.showAll,
      };
    }
  }
};

export const useSystemProps = (
  initialState: PropsTableState = INITIAL_STATE
): [PropsTableState, Actions] => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleAll = () => dispatch({ type: actions.TOGGLE_ALL });
  const toggleGroup = (group: string) =>
    dispatch({ type: actions.TOGGLE_GROUP, payload: group });

  return [
    state,
    {
      toggleAll,
      toggleGroup,
    },
  ];
};
