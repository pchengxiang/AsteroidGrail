import { GameEvent } from "./gameEvent";

export class Action {
    constructor(
        public description: string = "",
        private trigger: () => Promise<void>,
        public type: ActionType,
        private condition?: () => boolean,
        public cost?: Cost,
        public amount?: number,
    ) { }
}

interface Cost {
    type: CostType;
    amount: number;
}
export type Condition = () => boolean;


export enum ActionType {
    Damage,
    Healing,
    Transfer,
    DrawCard,
    DiscardCard
}

enum CostType {
    Healing,
    HandCard,
    Fold,
    YellowResource,
    BlueResource
}