export type City = {
  location: {
    latitude: number,
    longitude: number,
    zoom: number,
  }
  name: string,
}

export type Cities = City[]
