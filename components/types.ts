export interface Server {
  num: number;
  hostname: string;
  address: string;
  players: string;
  maxplayers: string;
  map: string;
  status: string;
  id: string;
}
export interface Player {
  Id: number;
  Name: string;
  Frags: number;
  Time: number;
  TimeF: string;
}

export interface Totals {
  servers: string;
  players: string;
  maxPlayers: string;
  percentage: string;
}

export interface ServersResponse {
  boostedServers: Server[];
  top50servers: Server[];
  total: Totals;
}

export interface ServerInfoResponse {
  server: Server;
  players: { Id: number; Name: string; Frags: number }[];
}
