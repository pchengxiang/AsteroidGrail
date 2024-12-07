import { Action, ActionType } from "../event/action";
import { EventBus } from "../event/eventBus";
import { GameEvent } from "../event/gameEvent";
import { Phase } from "../event/gameEvent";
import { Player } from "../event/gameEvent"

describe('skill', () => {
    beforeEach(() => {
        // 定義遊戲狀態
        let gameState = {
            required: ["聖類命格", "普通命格"], // 我方隊友
            hereticJudgement: 0, // 異端裁決所治療值
            healingLimit: 1, // 治療上限
            crystals: 0, // 水晶數量
            players: [
                new Player(0, "玩家1"),
                new Player(1, "玩家2")
            ]
        };

        const skill: GameEvent = {
            actions: [
                new Action("攻擊敵人一點傷害",
                    async () => { console.log("一點傷害") },
                    ActionType.Damage),
                new Action("棄一張牌",
                    async () => { console.log("棄一張牌") },
                    ActionType.DiscardCard
                )
            ],
            phase: Phase.TurnStart,
            data: {
                target: [
                    gameState.players[1]
                ]
            },
            timestamp: 0,
            priority: 0
        }

        EventBus.register(skill);
    });
    test("執行測試", async () => {
        EventBus.trigger(Phase.TurnStart)
    })
})

