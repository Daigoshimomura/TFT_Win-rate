declare module '*/galaxies.json' {
  interface Galaxies {
    key: string;
    name: string;
    janame: string;
    description: string;
  }
  interface GalaxiesJson {
    galaxies: Galaxies[];
  }

  const galaxiesJson: GalaxiesJson;
  export = galaxiesJson;
}
