// 擴展原有的介面，添加事件鏈相關屬性
export interface GameEvent {
    phase: Phase;
    source: string;
    chainId?: number;
    data: EventData;
    timestamp: number;
    priority?: number;
}
export enum Phase{
    TurnStart,
    TurnEnd,
    BeforeAction,
    AfterAction,
    SpecialAction,
    MagicActionBefore,
    MagicActionAfter,
    Startup,
    AttackBefore,
    AttackAfter,
    Attacked,
    Hit,
    Miss,
    UseLightning,
    UseShield,
    Challenge,
    Healing,
    realCauseDamage,
    ReceivedDamage,
    BeforeHeal,
    AfterHeal,
    Discarded,
    Refined,
    DecreasedMorale,
    useSheild,
    removeBaseParticle,
    YellowSoulAdded,
    BlueSoulAdded,
    EventAfter,
    AsteroidGrailAdded
}


interface EventData{
    amount: number;
    type: string;
    target?: Player[];
}

interface Player{
    id: string;
    name: string;
}
