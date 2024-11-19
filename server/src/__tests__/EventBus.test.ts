import { EventBus, Phase, GameEvent, EventHandler } from '../action';

describe('EventBus', () => {
  beforeEach(() => {
    // 每個測試前重置 EventBus
    EventBus['listeners'] = {
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
    EventBus['eventQueue'] = [];
    EventBus['chainLogs'].clear();
  });

  test('應該正確註冊事件處理器', () => {
    const handler = {
      priority: 1,
      effect: async (event: GameEvent) => Promise.resolve([event])
    };

    EventBus.add(Phase.Healing, handler);
    expect(EventBus['listeners'][Phase.Healing]).toHaveLength(1);
    expect(EventBus['listeners'][Phase.Healing][0]).toBe(handler);
  });

  test('事件處理器應該按優先級排序', () => {
    const handler1: EventHandler = {
      priority: 2,
      effect: async () => []
    };
    const handler2: EventHandler = {
      priority: 1,
      effect: async () => []
    };

    EventBus.add(Phase.Healing, handler1);
    EventBus.add(Phase.Healing, handler2);

    expect(EventBus['listeners'][Phase.Healing][0]).toBe(handler2);
    expect(EventBus['listeners'][Phase.Healing][1]).toBe(handler1);
  });

//   test('應該正確觸發事件鏈', async () => {
//     const mockEffect = jest.fn().mockResolvedValue([]);
//     const handler: EventHandler = {
//       priority: 1,
//       effect: mockEffect
//     };

//     EventBus.add(Phase.Healing, handler);
    
//     await EventBus.emit(Phase.Healing, {
//       source: 'TEST',
//       data: {
//         amount: 1,
//         type: 'TEST'
//       }
//     });

//     expect(mockEffect).toHaveBeenCalled();
//   });
});