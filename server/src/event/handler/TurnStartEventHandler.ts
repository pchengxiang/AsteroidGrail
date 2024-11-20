import { GameEvent } from "../GameEvent";
import { EventHandler } from "./eventHandler";

export const TurnStartEventHandler: EventHandler = {
    priority: 0,
    effect: async (event: GameEvent) => {
        return [];
    }
}