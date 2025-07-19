import { icon } from "#functions";
import { Presence, PresenceStatus } from "discord.js";

export function userStatus(status: PresenceStatus) {
  const cc = {
    online: `${icon.online} Online`,
    offline: `${icon.invisible} Offline`,
    dnd: `${icon.dnd} Ocupado`,
    invisible: `${icon.invisible} Invisível`,
    idle: `${icon.idle} Indisponível`,
  } satisfies Record<PresenceStatus, string>;

  return cc[status];
}
