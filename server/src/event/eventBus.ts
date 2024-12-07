import { listeners } from "process";
import { ActionHandler } from "./handler/actionHandler";
import { DamageActionHandler } from "./handler/damageHandler";
import { GameEvent, Phase } from "./gameEvent";
import { Action, ActionType } from "./action";
/**
 * 事件註冊系統
 * 在每個階段時將所有此階段事件的Action放入處理佇列中
 * 處理佇列會將條件符合的Action優先處理，其餘往後排
 */
export class EventBus {
    private static listeners: Map<Phase, GameEvent[]> = new Map();
    private static isProcessing: boolean = false;
    private static chainLogs: Map<number, GameEvent[]> = new Map();
    private static chainCounter: number = 0;

    //事件註冊功能
    static async register(event: GameEvent) {
        if (!this.listeners.has(event.phase)) {
            this.listeners.set(event.phase, []);
        }
        this.listeners.get(event.phase)!.push(event);
    }

    // 觸發事件並加入堆疊
    static async trigger(phase: Phase) {
        const events = this.listeners.get(phase);
        if (events) {
            for (const event of events) {
                this.processEvent(event)
            }
        }
    }

    private static async processEvent(event: GameEvent) {
        this.isProcessing = true;
        try {
            for (const currentAction of event.actions) {
                switch (currentAction.type) {
                    case ActionType.Damage:
                        new DamageActionHandler(currentAction)
                        break;
                    case ActionType.Healing:
                        break;
                    case ActionType.Transfer:
                        break;
                    case ActionType.DrawCard:
                        break;
                    case ActionType.DiscardCard:
                        break;
                }
            }
        } finally {
            this.isProcessing = false;
        }
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