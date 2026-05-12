/**
 * Eurovision 2026 Data
 * Host: Austria · Vienna · Wiener Stadthalle
 * Semi Final 1: 12 May 2026
 * Semi Final 2: 14 May 2026
 * Grand Final:  16 May 2026
 */

export const BIG_FOUR_AND_HOST = ['France', 'Germany', 'Italy', 'United Kingdom', 'Austria']

export const countries = [
  // ── Semi Final 1 ──────────────────────────────────────────────────────────
  { id: 'md', country: 'Moldova',        artist: 'Satoshi',                          song: 'Viva, Moldova!',         runningOrder: 1,  semi: 1, flag: '🇲🇩', score: 0 },
  { id: 'se', country: 'Sweden',         artist: 'Felicia',                          song: 'My System',              runningOrder: 2,  semi: 1, flag: '🇸🇪', score: 0 },
  { id: 'hr', country: 'Croatia',        artist: 'Lelek',                            song: 'Andromeda',              runningOrder: 3,  semi: 1, flag: '🇭🇷', score: 0 },
  { id: 'gr', country: 'Greece',         artist: 'Akylas',                           song: 'Ferto',                  runningOrder: 4,  semi: 1, flag: '🇬🇷', score: 0 },
  { id: 'pt', country: 'Portugal',       artist: 'Bandidos do Cante',                song: 'Rosa',                   runningOrder: 5,  semi: 1, flag: '🇵🇹', score: 0 },
  { id: 'ge', country: 'Georgia',        artist: 'Bzikebi',                          song: 'On Replay',              runningOrder: 6,  semi: 1, flag: '🇬🇪', score: 0 },
  { id: 'fi', country: 'Finland',        artist: 'Linda Lampenius & Pete Parkkonen', song: 'Liekinheitin',           runningOrder: 7,  semi: 1, flag: '🇫🇮', score: 0 },
  { id: 'me', country: 'Montenegro',     artist: 'Tamara Živković',                  song: 'Nova zora',              runningOrder: 8,  semi: 1, flag: '🇲🇪', score: 0 },
  { id: 'ee', country: 'Estonia',        artist: 'Vanilla Ninja',                    song: 'Too Epic to Be True',    runningOrder: 9,  semi: 1, flag: '🇪🇪', score: 0 },
  { id: 'il', country: 'Israel',         artist: 'Noam Bettan',                      song: 'Michelle',               runningOrder: 10, semi: 1, flag: '🇮🇱', score: 0 },
  { id: 'be', country: 'Belgium',        artist: 'Essyla',                           song: 'Dancing on the Ice',     runningOrder: 11, semi: 1, flag: '🇧🇪', score: 0 },
  { id: 'lt', country: 'Lithuania',      artist: 'Lion Ceccah',                      song: 'Sólo quiero más',        runningOrder: 12, semi: 1, flag: '🇱🇹', score: 0 },
  { id: 'sm', country: 'San Marino',     artist: 'Senhit',                           song: 'Superstar',              runningOrder: 13, semi: 1, flag: '🇸🇲', score: 0 },
  { id: 'pl', country: 'Poland',         artist: 'Alicja',                           song: 'Pray',                   runningOrder: 14, semi: 1, flag: '🇵🇱', score: 0 },
  { id: 'rs', country: 'Serbia',         artist: 'Lavina',                           song: 'Kraj mene',              runningOrder: 15, semi: 1, flag: '🇷🇸', score: 0 },

  // ── Semi Final 2 ──────────────────────────────────────────────────────────
  { id: 'bg', country: 'Bulgaria',       artist: 'Dara',                             song: 'Bangaranga',             runningOrder: 1,  semi: 2, flag: '🇧🇬', score: 0 },
  { id: 'az', country: 'Azerbaijan',     artist: 'Jiva',                             song: 'Just Go',                runningOrder: 2,  semi: 2, flag: '🇦🇿', score: 0 },
  { id: 'ro', country: 'Romania',        artist: 'Alexandra Căpitănescu',            song: 'Choke Me',               runningOrder: 3,  semi: 2, flag: '🇷🇴', score: 0 },
  { id: 'lu', country: 'Luxembourg',     artist: 'Eva Marija',                       song: 'Mother Nature',          runningOrder: 4,  semi: 2, flag: '🇱🇺', score: 0 },
  { id: 'cz', country: 'Czechia',        artist: 'Daniel Žižka',                     song: 'Crossroads',             runningOrder: 5,  semi: 2, flag: '🇨🇿', score: 0 },
  { id: 'am', country: 'Armenia',        artist: 'Simón',                            song: 'Paloma Rumba',           runningOrder: 6,  semi: 2, flag: '🇦🇲', score: 0 },
  { id: 'ch', country: 'Switzerland',    artist: 'Veronica Fusaro',                  song: 'Alice',                  runningOrder: 7,  semi: 2, flag: '🇨🇭', score: 0 },
  { id: 'cy', country: 'Cyprus',         artist: 'Antigoni',                         song: 'Jalla',                  runningOrder: 8,  semi: 2, flag: '🇨🇾', score: 0 },
  { id: 'lv', country: 'Latvia',         artist: 'Atvara',                           song: 'Ēnā',                    runningOrder: 9,  semi: 2, flag: '🇱🇻', score: 0 },
  { id: 'dk', country: 'Denmark',        artist: 'Søren Torpegaard Lund',            song: 'Før vi går hjem',        runningOrder: 10, semi: 2, flag: '🇩🇰', score: 0 },
  { id: 'au', country: 'Australia',      artist: 'Delta Goodrem',                    song: 'Eclipse',                runningOrder: 11, semi: 2, flag: '🇦🇺', score: 0 },
  { id: 'ua', country: 'Ukraine',        artist: 'Leléka',                           song: 'Ridnym',                 runningOrder: 12, semi: 2, flag: '🇺🇦', score: 0 },
  { id: 'al', country: 'Albania',        artist: 'Alis',                             song: 'Nân',                    runningOrder: 13, semi: 2, flag: '🇦🇱', score: 0 },
  { id: 'mt', country: 'Malta',          artist: 'Aidan',                            song: 'Bella',                  runningOrder: 14, semi: 2, flag: '🇲🇹', score: 0 },
  { id: 'no', country: 'Norway',         artist: 'Jonas Lovv',                       song: 'Ya Ya Ya',               runningOrder: 15, semi: 2, flag: '🇳🇴', score: 0 },

  // ── Big 4 + Host — Auto Grand Final ───────────────────────────────────────
  { id: 'fr', country: 'France',         artist: 'Monroe',                           song: 'Regarde !',              runningOrder: 1,  semi: null, flag: '🇫🇷', score: 0 },
  { id: 'de', country: 'Germany',        artist: 'Sarah Engels',                     song: 'Fire',                   runningOrder: 2,  semi: null, flag: '🇩🇪', score: 0 },
  { id: 'it', country: 'Italy',          artist: 'Sal Da Vinci',                     song: 'Per Sempre Sì',          runningOrder: 3,  semi: null, flag: '🇮🇹', score: 0 },
  { id: 'gb', country: 'United Kingdom', artist: 'LOOK MUM NO COMPUTER',             song: 'Eins, Zwei, Drei',       runningOrder: 4,  semi: null, flag: '🇬🇧', score: 0 },
  { id: 'at', country: 'Austria',        artist: 'COSMÓ',                            song: 'Tanzschein',             runningOrder: 5,  semi: null, flag: '🇦🇹', score: 0 },
]

export const semi1Countries = countries.filter(c => c.semi === 1)
export const semi2Countries = countries.filter(c => c.semi === 2)
export const autoFinalistsCountries = countries.filter(c => c.semi === null)

export const POINT_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12]

export const VOTING_PHASES = {
  SEMI_1: 'semi-1',
  SEMI_2: 'semi-2',
  GRAND_FINAL: 'grand-final',
}

export const APP_CONFIG = {
  title: 'Eurovision 2026',
  subtitle: 'Friends Scoreboard',
  year: 2026,
  host: 'Austria',
  hostCity: 'Vienna',
  venue: 'Wiener Stadthalle',
  theme: '70th Eurovision Song Contest',
  dates: {
    semi1: '12 травня 2026',
    semi2: '14 травня 2026',
    grandFinal: '16 травня 2026',
  },
}
