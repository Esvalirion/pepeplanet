import PlayerConnect from './PlayerConnect.js';
import PlayerDisconnect from './PlayerDisconnect.js';
import PlayerChat from './PlayerChat.js';
import BeginMap from './BeginMap.js';
import BeginMatch from './BeginMatch.js';
import EndMap from './EndMap.js';
import EndMatch from './EndMatch.js';
import MapListModified from './MapListModified.js';
import PlayerAlliesChanged from './PlayerAlliesChanged.js';
import PlayerInfoChanged from './PlayerInfoChanged.js';
import PlayerManialinkPageAnswer from './PlayerManialinkPageAnswer.js';
import StatusChanged from './StatusChanged.js';
import TunnelDataReceived from './TunnelDataReceived.js';
import VoteUpdated from './VoteUpdated.js';

import WayPoint from './WayPoint.js';
import GiveUp from './GiveUp.js';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

export default {
  PlayerConnect,
  PlayerDisconnect,
  PlayerChat,
  BeginMap,
  BeginMatch,
  EndMap,
  EndMatch,
  MapListModified,
  PlayerAlliesChanged,
  PlayerInfoChanged,
  PlayerManialinkPageAnswer,
  StatusChanged,
  TunnelDataReceived,
  VoteUpdated,
  WayPoint,
  Event: {
    // 'Trackmania.Event'
    WayPoint,
    GiveUp,
  },
};
