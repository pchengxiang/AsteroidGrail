interface BaseAction{
    cost: Cost;
    type: ActionType;
}

interface Cost{
    type: CostType;
    amount: number;
}

interface ConditionalAction extends BaseAction{
    condition: Condition;
}

type Condition = (event: Event)=>boolean;


enum ActionType{
    Damage,
    Healing,
    Transfer,
    DrawCard,
    DiscardCard
}

enum CostType{
    Healing,
    YellowSoul,
    BlueSoul
}