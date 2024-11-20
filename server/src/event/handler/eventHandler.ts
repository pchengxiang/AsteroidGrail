import { GameEvent } from "../GameEvent";

export interface EventHandler {
    priority: number;
    condition?: (event: GameEvent) => boolean;
    effect: (event: GameEvent) => Promise<GameEvent[]>;
}