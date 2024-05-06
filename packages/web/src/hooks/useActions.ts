import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

// Explicitly type check for action creators without payloads
function isActionWithoutPayload(
  action: any,
): action is ActionCreatorWithoutPayload {
  return (
    typeof action.match === "function" &&
    action.type &&
    !("payload" in action())
  );
}

export function useActions<
  T extends Record<
    string,
    ActionCreatorWithPayload<any, any> | ActionCreatorWithoutPayload<any>
  >,
>(
  actions: T,
): {
  [K in keyof T]: T[K] extends ActionCreatorWithPayload<infer P, any>
    ? P extends undefined
      ? () => void
      : (payload: P) => void
    : () => void;
} {
  const dispatch = useDispatch();

  return useMemo(() => {
    const boundActions: any = {};

    Object.keys(actions).forEach((key) => {
      const action = actions[key];
      if (isActionWithoutPayload(action)) {
        // It's an ActionCreatorWithoutPayload
        boundActions[key] = () => dispatch(action());
      } else {
        // Default to ActionCreatorWithPayload
        boundActions[key] = (payload: any) => dispatch(action(payload));
      }
    });

    return boundActions;
  }, [actions, dispatch]);
}
