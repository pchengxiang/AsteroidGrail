import { ConditionalAction, ActionType, Action } from "../action";
export type Condition = (action: ConditionalAction) => boolean;
export interface ActionHandler {
    condition?: Condition;
    action: Action;
    handle: (action: Action) => ResultValue<ActionType>;
}