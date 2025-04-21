// Artist: 가수 정보
export interface Artist {
  id: string;
  name: string;
  image: string;
  bio: string;
}

// Album: 앨범 정보
export interface Album {
  id: string;
  artistId: string;
  title: string;
  cover: string;
  release_date: string;
  description: string;
}

// Music: 트랙 혹은 음악 정보 (개인화 리스트에서는 album, artist가 중첩되어 있음)
export interface Music {
  id: string;
  title: string;
  duration_ms: number;
  explicit: boolean;
  track_number?: number;
  // 개인화된 데이터에서 중첩된 정보를 사용할 경우 포함할 수 있음.
  album?: Album;
  artist?: Artist;
  src: string;
}

// Category: 카테고리 정보 (browse by category 용)
export interface Category {
  id: string;
  label: string;
  bgColor: string;
  albumId: number;
}

// RecentlyPlayed: 최근 재생 내역 (트랙과 재생 시각 포함)
export interface RecentlyPlayed {
  track: Music;
  played_at: string;
}

// DayBased: 요일 기반 추천 트랙 (트랙 정보만 포함)
export interface DayBased {
  track: Music;
}

// OldFavorites: 오래된 즐겨찾기 내역 (트랙 정보와 마지막 재생 시각 포함)
export interface OldFavorites {
  track: Music;
  last_played: string;
}
