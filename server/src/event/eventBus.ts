import { listeners } from "process";
import { GameEvent, Phase } from "./GameEvent";
import { EventHandler } from "./handler/eventHandler";
import { TurnStartEventHandler } from "./handler/TurnStartEventHandler";

// 擴展 EventBus
export class EventBus {
    // 事件堆疊
    private static eventStack: GameEvent[] = [];
    private static isProcessing: boolean = false;
    private static chainLogs: Map<number, GameEvent[]> = new Map();
    private static chainCounter: number = 0;

    // 觸發事件並加入堆疊
    static async emit(phase: Phase, eventData: Partial<GameEvent>) {
        const event: GameEvent = {
            phase,
            timestamp: Date.now(),
            chainId: eventData.chainId || ++this.chainCounter,
            source: eventData.source || '',
            data: eventData.data!
        };

        // 將事件推入堆疊
        this.eventStack.push(event);
        
        // 如果不在處理中，開始處理堆疊
        if (!this.isProcessing) {
            await this.processEventStack();
        }
    }

    // 處理事件堆疊
    private static async processEventStack() {
        this.isProcessing = true;

        try {
            while (this.eventStack.length > 0) {
                // 取出堆疊頂部的事件（後進先出）
                const currentEvent = this.eventStack.pop()!;
                
                // 記錄事件鏈
                if (!this.chainLogs.has(currentEvent.chainId!)) {
                    this.chainLogs.set(currentEvent.chainId!, []);
                }
                this.chainLogs.get(currentEvent.chainId!)!.push(currentEvent);

                // 處理事件
                const newEvents = await this.handleEvent(currentEvent);
                
                // 將新產生的事件推入堆疊頂部
                this.eventStack.push(...newEvents);
            }
        } finally {
            this.isProcessing = false;
        }
    }

    // 事件處理邏輯
    private static async handleEvent(event: GameEvent): Promise<GameEvent[]> {
        const newEvents: GameEvent[] = [];

        switch(event.phase){
            case Phase.TurnStart:
                return TurnStartEventHandler.effect(event);
            default:
                return [];
        }

        return newEvents;
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