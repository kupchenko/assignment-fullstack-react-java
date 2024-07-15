export type Movie = {
  id: number,
  name: string,
  description: string,
  imageUrl: string,
  year: string,
  duration: string,
  rating: string,
  directors: string,
  actors: string,
  genres: string,
}

export type Comment = {
  id: number,
  content: string,
  userName: string,
  userAvatarUrl: string,
  timestamp: string
}
