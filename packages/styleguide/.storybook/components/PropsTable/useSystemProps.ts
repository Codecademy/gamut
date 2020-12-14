import { useReducer, useMemo, useContext } from 'react';
import { propGroups, properties, PropGroups } from './constants';
import { intersection } from 'lodash';
import { DocsContext } from '@storybook/addon-docs/blocks';

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
  showAll: false,
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

interface UseSystemProps {
  state: PropsTableState & {
    hasSystemProps: boolean;
    allGroups: PropGroups[];
    excludedProps: string[];
  };
  actions: Actions;
}

export const useSystemProps = (
  initialState: PropsTableState = INITIAL_STATE
): UseSystemProps => {
  const {
    parameters: { argTypes },
  } = useContext(DocsContext);

  const [{ showAll, activeGroups }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const toggleAll = () => dispatch({ type: actions.TOGGLE_ALL });
  const toggleGroup = (group: string) =>
    dispatch({ type: actions.TOGGLE_GROUP, payload: group });

  const usedProps = useMemo<string[]>(
    () => Object.keys(argTypes).filter((prop) => properties.includes(prop)),
    [argTypes]
  );

  const hasSystemProps = usedProps.length > 0;

  const groups = useMemo(() => {
    return Object.entries(propGroups).reduce<PropGroups[]>(
      (carry, [groupKey, { propNames }]) =>
        intersection(propNames, usedProps).length > 0
          ? [...carry, groupKey as PropGroups]
          : carry,
      []
    );
  }, [usedProps]);

  const excludedProps = useMemo<string[]>(() => {
    if (showAll) return [];
    return Object.entries(propGroups).reduce(
      (carry, [group, { propNames }]) => {
        return !activeGroups.includes(group) ? [...carry, ...propNames] : carry;
      },
      []
    );
  }, [showAll, activeGroups]);

  return {
    state: {
      hasSystemProps,
      showAll,
      activeGroups,
      allGroups: groups,
      excludedProps,
    },
    actions: {
      toggleAll,
      toggleGroup,
    },
  };
};
