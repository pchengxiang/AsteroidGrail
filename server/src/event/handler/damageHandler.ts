import { Action } from "../action";
import { Condition, ActionHandler } from "./actionHandler";
import { ConditionalAction } from "../action";
import { ResultValue } from "../resultValue"

export class DamageActionHandler implements ActionHandler {
    condition?: Condition | undefined;
    action: Action;

    constructor(action: Action) {
        this.action = action;
    }

    handle = (action: Action) => {
        if (action.condition()) {
            console.log("處理 " + action.description)
        }
        return ResultValue
    }
}