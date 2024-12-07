import { EventBus } from '../event/eventBus';
import { GameEvent, Phase } from '../event/gameEvent';

describe('EventBus', () => {
  beforeEach(() => {
    // 每個測試前重置 EventBus
    // EventBus['listeners'] = {
    //     [Phase.TurnStart]: [],
    //     [Phase.TurnEnd]: [],
    //     [Phase.Attacked]: [],
    //     [Phase.Discarded]: [],
    //     [Phase.Refined]: [],
    //     [Phase.DecreasedMorale]: [],
    //     [Phase.BeforeAction]: [],
    //     [Phase.AfterAction]: [],
    //     [Phase.Startup]: [],
    //     [Phase.SpecialEvent]: [],
    //     [Phase.BeforeAttack]: [],
    //     [Phase.AfterAttack]: [],
    //     [Phase.Hit]: [],
    //     [Phase.Miss]: [],
    //     [Phase.Healing]: [],
    //     [Phase.realCauseDamage]: [],
    //     [Phase.ReceivedDamage]: [],
    //     [Phase.BeforeHeal]: [],
    //     [Phase.AfterHeal]: [],
    //     [Phase.useSheild]: [],
    //     [Phase.removeBaseParticle]: [],
    //     [Phase.YellowSoulAdded]: [],
    //     [Phase.BlueSoulAdded]: [],
    //     [Phase.AsteroidGrailAdded]: [],
    //     [Phase.EventAfter]: [],
    //     [Phase.UseLightning]: [],
    //     [Phase.UseShield]: [],
    //     [Phase.Challenge]: []
    // };
    EventBus['chainLogs'].clear();
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