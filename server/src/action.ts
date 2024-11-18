interface BaseAction{
    cost: Cost;
    type: ActionType;
}

interface Cost{
    type: CostType;
    amount: number;
}

interface ConditionAction extends BaseAction{
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


enum Phase{
    TurnStart,
    TurnEnd,
    BeforeAction,
    AfterAction,
    SpecialEvent,
    Startup,
    BeforeAttack,
    AfterAttack,
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

// 擴展原有的介面，添加事件鏈相關屬性
interface GameEvent {
    phase: Phase;
    source: string;
    chainId?: number;
    data: EventData;
    timestamp: number;
    priority?: number;
}

interface EventData{
    amount: number;
    type: string;
    target?: Player[];
}

// 事件處理器介面
interface EventHandler {
    priority: number;
    condition?: (event: GameEvent) => boolean;
    effect: (event: GameEvent) => Promise<GameEvent[]>;
}

// 擴展 EventBus
class EventBus {
    private static listeners: Record<Phase, EventHandler[]> = {
        [Phase.TurnStart]: [],
        [Phase.TurnEnd]: [],
        [Phase.Attacked]: [],
        [Phase.Discarded]: [],
        [Phase.Refined]: [],
        [Phase.DecreasedMorale]: [],
        [Phase.BeforeAction]: [],
        [Phase.AfterAction]: [],
        [Phase.Startup]: [],
        [Phase.SpecialEvent]: [],
        [Phase.BeforeAttack]: [],
        [Phase.AfterAttack]: [],
        [Phase.Hit]: [],
        [Phase.Miss]: [],
        [Phase.Healing]: [],
        [Phase.realCauseDamage]: [],
        [Phase.ReceivedDamage]: [],
        [Phase.BeforeHeal]: [],
        [Phase.AfterHeal]: [],
        [Phase.useSheild]: [],
        [Phase.removeBaseParticle]: [],
        [Phase.YellowSoulAdded]: [],
        [Phase.BlueSoulAdded]: [],
        [Phase.AsteroidGrailAdded]: [],
        [Phase.EventAfter]: [],
        [Phase.UseLightning]: [],
        [Phase.UseShield]: [],
        [Phase.Challenge]: []
    };
    
    private static chainCounter: number = 0;
    private static eventQueue: GameEvent[] = [];
    private static isProcessing: boolean = false;
    private static chainLogs: Map<number, GameEvent[]> = new Map();

    // 註冊事件處理器
    static add(phase: Phase, handler: EventHandler) {
        if (!this.listeners[phase]) {
            this.listeners[phase] = [];
        }
        this.listeners[phase].push(handler);
        // 按優先級排序
        this.listeners[phase].sort((a, b) => a.priority - b.priority);
    }

    // 觸發事件
    static async emit(phase: Phase, eventData: Partial<GameEvent>) {
        const event: GameEvent = {
            phase,
            timestamp: Date.now(),
            chainId: eventData.chainId || ++this.chainCounter,
            source: eventData.source || '',
            data: eventData.data!,
            priority: eventData.priority
        };

        this.eventQueue.push(event);
        
        if (!this.isProcessing) {
            await this.processEventQueue();
        }
    }

    // 處理事件隊列
    private static async processEventQueue() {
        this.isProcessing = true;

        while (this.eventQueue.length > 0) {
            const currentEvent = this.eventQueue.shift()!;
            
            // 記錄事件鏈
            if (!this.chainLogs.has(currentEvent.chainId!)) {
                this.chainLogs.set(currentEvent.chainId!, []);
            }
            this.chainLogs.get(currentEvent.chainId!)!.push(currentEvent);

            const handlers = this.listeners[currentEvent.phase] || [];

            for (const handler of handlers) {
                try {
                    if (!handler.condition || handler.condition(currentEvent)) {
                        const newEvents = await handler.effect(currentEvent);
                        // 新事件繼承連鎖ID
                        newEvents.forEach(e => {
                            e.chainId = currentEvent.chainId;
                            this.eventQueue.push(e);
                        });
                    }
                } catch (error) {
                    console.error('Error processing event:', error);
                }
            }
        }

        this.isProcessing = false;
    }

    // 獲取事件鏈信息
    static getChainInfo(chainId: number): GameEvent[] | undefined {
        return this.chainLogs.get(chainId);
    }

    // 清理過期的事件鏈記錄
    static cleanupOldChains(maxAge: number = 3600000) { // 默認1小時
        const now = Date.now();
        for (const [chainId, events] of this.chainLogs) {
            const chainAge = now - events[events.length - 1].timestamp;
            if (chainAge > maxAge) {
                this.chainLogs.delete(chainId);
            }
        }
    }
}

class Player{
    heal: number;
    maxHeal: number;
}

// 使用示例
const healingOverflowHandler: EventHandler = {
    priority: 1,
    condition: (event: GameEvent) => {
        return event.phase === Phase.BeforeHeal && event.data.target![0].heal + event.data.amount > event.data.target![0].maxHeal;
    },
    effect: async (event: GameEvent) => {
        const newEvents: GameEvent[] = [];
        
        // 異端裁決所加治療
        newEvents.push({
            phase: Phase.Healing,
            source: 'FANATIC',
            data: { 
                type: 'COURT_HEALING',
                amount: 1 
            },
            timestamp: Date.now()
        });

        // 可能觸發獲得水晶
        if (event.data.target![0].heal + event.data.amount - event.data.target![0].maxHeal >= 2) {
            newEvents.push({
                phase: Phase.SpecialEvent,
                source: 'FANATIC',
                data: {
                    type: 'GAIN_CRYSTAL',
                    amount: 1
                },
                timestamp: Date.now()
            });
        }

        return newEvents;
    }
};
const player1 = new Player();
player1.heal = 1;
player1.maxHeal = 3;
// 註冊處理器
EventBus.add(Phase.Healing, healingOverflowHandler);

// 觸發事件
EventBus.emit(Phase.Healing, {
    source: 'GAME',
    data: {
        target: [player1],
        amount: 2,
        type: 'HEALING'
    }
});

// 查看事件鏈
const chainInfo = EventBus.getChainInfo(1);
console.log('Event chain:', chainInfo);
