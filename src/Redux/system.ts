import { ISystemState, Links } from "../types";

/* Types */

export const SET_SELECTED_LINK = "SET_SELECTED_LINK";
export const ADD_ACTIVE_LINK = "ADD_ACTIVE_LINK";
export const REMOVE_ACTIVE_LINK = "REMOVE_ACTIVE_LINK";
export const ADD_LOADING_LINK = "ADD_LOADING_LINK";
export const REMOVE_LOADING_LINK = "REMOVE_LOADING_LINK";
export const SET_DRAWER_OPEN = "SET_DRAWER_OPEN";
export const SET_SETTINGS_OPEN = "SET_SETTINGS_OPEN";
export const SET_CALCULATING = "SET_CALCULATING";

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

interface AddLoadingLinkAction {
  type: typeof ADD_LOADING_LINK;
  payload: Links;
}

interface RemoveLoadingLinkAction {
  type: typeof REMOVE_LOADING_LINK;
  payload: Links;
}

interface SetDrawerOpenAction {
  type: typeof SET_DRAWER_OPEN;
  payload: boolean;
}

interface SetSettingsOpenAction {
  type: typeof SET_SETTINGS_OPEN;
  payload: boolean;
}

interface SetCalculatingAction {
  type: typeof SET_CALCULATING;
  payload: boolean;
}

export type SystemActionTypes =
  | SetSelectedLinkAction
  | SetDrawerOpenAction
  | AddActiveLinkAction
  | RemoveActiveLinkAction
  | AddLoadingLinkAction
  | RemoveLoadingLinkAction
  | SetSettingsOpenAction
  | SetCalculatingAction;

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

export const addLoadingLink = (link: Links) => ({
  type: ADD_LOADING_LINK,
  payload: link,
});

export const removeLoadingLink = (link: Links) => ({
  type: REMOVE_LOADING_LINK,
  payload: link,
});

export const setDrawerOpen = (isOpen: boolean) => ({
  type: SET_DRAWER_OPEN,
  payload: isOpen,
});

export const setSettingsOpen = (isOpen: boolean) => ({
  type: SET_SETTINGS_OPEN,
  payload: isOpen,
});

export const setCalculating = (isCalculating: boolean) => ({
  type: SET_CALCULATING,
  payload: isCalculating,
});

/* Reducer */

const initialState: ISystemState = {
  selectedLink: Links.CreateEstimate,
  activeLinks: [Links.CreateEstimate],
  loadingLinks: [],
  isDrawerOpen: true,
  isSettingsOpen: false,
  isCalculating: false,
};

export const systemReducer = (
  state = initialState,
  action: SystemActionTypes
) => {
  switch (action.type) {
    case SET_SELECTED_LINK:
      return {
        ...state,
        selectedLink: action.payload,
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
    case ADD_LOADING_LINK:
      return {
        ...state,
        loadingLinks: state.loadingLinks.includes(action.payload)
          ? state.loadingLinks
          : state.loadingLinks.concat([action.payload]),
      };
    case REMOVE_LOADING_LINK:
      return {
        ...state,
        loadingLinks: state.loadingLinks.filter((l) => l !== action.payload),
      };
    case SET_DRAWER_OPEN:
      return {
        ...state,
        isDrawerOpen: action.payload,
      };
    case SET_SETTINGS_OPEN:
      return {
        ...state,
        isSettingsOpen: action.payload,
      };
    case SET_CALCULATING:
      return {
        ...state,
        isCalculating: action.payload,
      };
    default:
      return state;
  }
};
