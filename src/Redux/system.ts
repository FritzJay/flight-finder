import { ISystemState, Links } from "../types";

/* Types */

export const SET_SELECTED_LINK = "SET_SELECTED_LINK";
export const ADD_ACTIVE_LINK = "ADD_ACTIVE_LINK";
export const REMOVE_ACTIVE_LINK = "REMOVE_ACTIVE_LINK";
export const SET_DRAWER_OPEN = "SET_DRAWER_OPEN";

interface SetSelectedLinkAction {
  type: typeof SET_SELECTED_LINK;
  payload: number;
}

interface AddActiveLinkAction {
  type: typeof ADD_ACTIVE_LINK;
  payload: Links;
}

interface RemoveActiveLinkAction {
  type: typeof REMOVE_ACTIVE_LINK;
  payload: Links;
}

interface SetDrawerOpenAction {
  type: typeof SET_DRAWER_OPEN;
  payload: boolean;
}

export type SystemActionTypes =
  | SetSelectedLinkAction
  | SetDrawerOpenAction
  | AddActiveLinkAction
  | RemoveActiveLinkAction;

/* Actions */

export const setSelectedLink = (link: Links) => ({
  type: SET_SELECTED_LINK,
  payload: link,
});

export const addActiveLink = (link: Links) => ({
  type: ADD_ACTIVE_LINK,
  payload: link,
});

export const removeActiveLink = (link: Links) => ({
  type: REMOVE_ACTIVE_LINK,
  payload: link,
});

export const setDrawerOpen = (isOpen: boolean) => ({
  type: SET_DRAWER_OPEN,
  payload: isOpen,
});

/* Reducer */

const initialState: ISystemState = {
  selectedLink: Links.CreateEstimate,
  activeLinks: [Links.CreateEstimate],
  isDrawerOpen: true,
};

export const systemReducer = (
  state = initialState,
  action: SystemActionTypes
) => {
  switch (action.type) {
    case SET_SELECTED_LINK:
      return {
        ...state,
        actionLink: action.payload,
      };
    case ADD_ACTIVE_LINK:
      return {
        ...state,
        activeLinks: state.activeLinks.includes(action.payload)
          ? state.activeLinks
          : state.activeLinks.concat([action.payload]),
      };
    case REMOVE_ACTIVE_LINK:
      return {
        ...state,
        activeLinks: state.activeLinks.filter((l) => l !== action.payload),
      };
    case SET_DRAWER_OPEN:
      return {
        ...state,
        isDrawerOpen: action.payload,
      };
    default:
      return state;
  }
};
