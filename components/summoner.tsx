import Reack from 'react';

interface LeagueListDTO {
  tier: string;
  leagueId: string;
  queue: string;
  name: string;
  entries: LeagueItemDTO[];
}

interface LeagueItemDTO {
  summonerId: string;
  summonerName: string;
  leaguePoints: string;
  rank: string;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

interface SummonerDTO {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}
