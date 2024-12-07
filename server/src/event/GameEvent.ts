import { Action } from "./action";

// 擴展原有的介面，添加事件鏈相關屬性
export interface GameEvent {
    actions: Action[];
    phase: Phase;
    data: EventData;
    timestamp: number;
    priority: number;
}
// export enum Phase {
//     TurnStart,
//     TurnEnd,
//     BeforeAction,
//     AfterAction,
//     SpecialAction,
//     MagicActionBefore,
//     MagicActionAfter,
//     Startup,
//     AttackBefore,
//     AttackAfter,
//     Attacked,
//     Hit,
//     Miss,
//     UseLightning,
//     UseShield,
//     Challenge,
//     Healing,
//     realCauseDamage,
//     ReceivedDamage,
//     BeforeHeal,
//     AfterHeal,
//     Discarded,
//     Refined,
//     DecreasedMorale,
//     useShield,
//     removeBaseParticle,
//     AsteroidGrailAdded
// }

export enum Phase {
    TurnStart,
    TurnEnd,
    BeforeAction,
    AfterAction,
    SpecialAction,
    AttackBefore,
    AttackAfter,
    Attacked,
    Hit,
    Miss,
    UseLightning,
    UseShield,
    UsePoison,
    UseWeak,
    Challenge,
    Healing,
    realCauseDamage,
    ReceivedDamage,
    BeforeHeal,
    AfterHeal,
    Discarded,
    Refined,
    DecreasedMorale,
    AsteroidGrailAdded
}
interface EventData {
    target?: Player[];
    //usedCards: Card[];
}

export class Player {
    constructor(
        private id: number,
        public name: string
    ) { }
}
