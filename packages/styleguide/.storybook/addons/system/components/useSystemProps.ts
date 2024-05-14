import { useReducer, useMemo, useContext } from 'react';
import intersection from 'lodash/intersection';
import { DocsContext } from '@storybook/addon-docs/blocks';
import { ALL_PROPS, PropGroups, PROP_GROUPS } from '../propMeta';

interface PropsTableState {
  activeGroups: string[];
  showAll: boolean;
}

const INITIAL_STATE: PropsTableState = {
  activeGroups: [],
  showAll: false,
};

enum ActionTypes {
  TOGGLE_GROUP = 'TOGGLE_GROUP',
  TOGGLE_ALL = 'TOGGLE_ALL',
}

type ActionShapes =
  | {
      type: ActionTypes.TOGGLE_GROUP;
      payload: string;
    }
  | { type: ActionTypes.TOGGLE_ALL };

const reducer = (
  state: PropsTableState = INITIAL_STATE,
  action: ActionShapes
) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_GROUP: {
      const { payload } = action;
      const isActive = state.activeGroups.includes(payload);
      return {
        ...state,
        activeGroups: isActive
          ? state.activeGroups.filter((group) => group !== payload)
          : [...state.activeGroups, payload],
      };
    }
    case ActionTypes.TOGGLE_ALL: {
      return {
        ...state,
        showAll: !state.showAll,
      };
    }
    default:
      return state;
  }
};

interface Actions {
  toggleAll: () => void;
  toggleGroup: (group: string) => void;
}

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

  const toggleAll = () => dispatch({ type: ActionTypes.TOGGLE_ALL });
  const toggleGroup = (group: string) =>
    dispatch({ type: ActionTypes.TOGGLE_GROUP, payload: group });

  const usedProps = useMemo<string[]>(
    () => Object.keys(argTypes).filter((prop) => ALL_PROPS.includes(prop)),
    [argTypes]
  );

  const hasSystemProps = usedProps.length > 0;

  const groups = useMemo(() => {
    return Object.entries(PROP_GROUPS).reduce<PropGroups[]>(
      (carry, [groupKey, { propNames }]) =>
        intersection(propNames, usedProps).length > 0
          ? [...carry, groupKey as PropGroups]
          : carry,
      []
    );
  }, [usedProps]);

  const excludedProps = useMemo<string[]>(() => {
    if (showAll) return [];
    return Object.entries(PROP_GROUPS).reduce<string[]>(
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
