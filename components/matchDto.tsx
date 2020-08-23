import Reack from 'react';

type MatchDto = {
  metadata: MetadataDto;
  info: InfoDto;
};

type MetadataDto = {
  data_version: string;
  match_id: string;
  participants: string[];
};

type InfoDto = {
  game_datetime: number;
  game_length: number;
  game_variation: string;
  game_version: string;
  queue_id: number;
  tft_set_number: number;
  participants: ParticipantDto[];
};

type ParticipantDto = {
  companion: CompanionDto;
  gold_left: number;
  last_round: number;
  level: number;
  placement: number;
  players_eliminated: number;
  puuid: string;
  time_eliminated: number;
  total_damage_to_players: number;
  traits: TraitDto[];
  units: UnitDto[];
};

type CompanionDto = {
  content_ID: string;
  skin_ID: number;
  species: string;
};

type TraitDto = {
  name: string;
  num_units: number;
  tier_current: number;
  tier_total: number;
};

type UnitDto = {
  items: number[];
  character_id: string;
  name: string;
  rarity: number;
  tier: number;
};

export default MatchDto;
