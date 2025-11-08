import { Collection, Performance, Song } from "./types";

const performances = <T extends Performance[]>(entries: T) => entries;

export const SAMPLE_SONGS: Song[] = [
  {
    id: "kalinka",
    slug: "kalinka",
    title: "Калинка",
    era: "Народная песня",
    genre: "Народные",
    language: "ru",
    summary:
      "Одна из самых узнаваемых русских народных песен. На Rusongs представлены десятки концертных и студийных версий от хоров и современных коллективов.",
    lyrics: `Калинка, калинка, калинка моя!\nВ саду ягода малинка, малинка моя!` ,
    chords: `Am | E7 | Am | E7\nAm | Dm | E7 | Am`,
    defaultTempo: 128,
    tags: ["народная", "хор", "концерт"],
    performances: performances([
      {
        id: "kalinka-choir-1968",
        songId: "kalinka",
        title: "Хор им. Пятницкого (1968)",
        type: "live",
        artists: ["Государственный русский народный хор им. М. Е. Пятницкого"],
        year: 1968,
        duration: 210,
        source: "youtube",
        sourceUrl: "https://www.youtube.com/watch?v=example1",
        quality: { audio: 4, video: 3, authenticity: 5 },
        rating: { overall: 4.8, votes: 321 },
        context: "Запись концерта в Колонном зале Дома союзов",
        tempoBpm: 126,
        arrangement: "Хоровая"
      },
      {
        id: "kalinka-balalaika-1998",
        songId: "kalinka",
        title: "Ансамбль \"Балалайка\" (1998)",
        type: "studio",
        artists: ["Ансамбль Балалайка"],
        year: 1998,
        duration: 185,
        source: "youtube",
        sourceUrl: "https://www.youtube.com/watch?v=example2",
        quality: { audio: 5, video: 4, authenticity: 4 },
        rating: { overall: 4.6, votes: 210 },
        highlights: ["Современная аранжировка", "Яркая хореография"],
        tempoBpm: 130,
        arrangement: "Фолк-ансамбль"
      },
      {
        id: "kalinka-electro-2020",
        songId: "kalinka",
        title: "KALINKA 2.0 (Live Sessions)",
        type: "cover",
        artists: ["DJ Samovar", "Мария Орлова"],
        year: 2020,
        duration: 240,
        source: "soundcloud",
        sourceUrl: "https://soundcloud.com/example/kalinka-20",
        quality: { audio: 4, video: 0, authenticity: 3 },
        rating: { overall: 4.1, votes: 88 },
        highlights: ["Электронная обработка", "Сохранённый народный мотив"],
        tempoBpm: 122,
        arrangement: "Электронная"
      }
    ]),
    collections: ["folk-classics", "spring-moods"],
    featuredImage: "/images/songs/placeholder.svg",
    historicalContext:
      "Песня была создана в 1860 году композитором Иваном Ларионовым и быстро стала народной, благодаря сочетанию яркой мелодии и простого текста."
  },
  {
    id: "smuglyanka",
    slug: "smuglyanka",
    title: "Смуглянка",
    era: "1940-е",
    genre: "Песни военных лет",
    language: "ru",
    summary:
      "Легендарная песня времён Великой Отечественной войны, получившая вторую жизнь после фильма 'В бой идут одни старики'.",
    lyrics: `Однажды в студёную зимнюю пору...`,
    chords: `Dm | Gm | A7 | Dm\nDm | Bb | A7 | Dm`,
    defaultTempo: 110,
    tags: ["военные песни", "романс", "каверы"],
    performances: performances([
      {
        id: "smuglyanka-leontiev-1980",
        songId: "smuglyanka",
        title: "Валерий Леонтьев (1980)",
        type: "live",
        artists: ["Валерий Леонтьев"],
        year: 1980,
        duration: 230,
        source: "youtube",
        sourceUrl: "https://www.youtube.com/watch?v=example3",
        quality: { audio: 4, video: 3, authenticity: 4 },
        rating: { overall: 4.7, votes: 198 },
        highlights: ["Энергичная подача", "Современная аранжировка"],
        tempoBpm: 112
      },
      {
        id: "smuglyanka-choir-1944",
        songId: "smuglyanka",
        title: "Ансамбль песни и пляски Красной армии (1944)",
        type: "live",
        artists: ["Ансамбль песни и пляски Советской Армии"],
        year: 1944,
        duration: 215,
        source: "vk",
        sourceUrl: "https://vk.com/video-1944",
        quality: { audio: 3, video: 2, authenticity: 5 },
        rating: { overall: 4.9, votes: 452 },
        context: "Редкая архивная запись фронтового выступления",
        tempoBpm: 108
      },
      {
        id: "smuglyanka-jazz-2019",
        songId: "smuglyanka",
        title: "Ольга Красько Jazz Trio (2019)",
        type: "cover",
        artists: ["Ольга Красько", "Jazz Trio"],
        year: 2019,
        duration: 260,
        source: "youtube",
        sourceUrl: "https://www.youtube.com/watch?v=example4",
        quality: { audio: 5, video: 4, authenticity: 3 },
        rating: { overall: 4.3, votes: 102 },
        arrangement: "Джазовая баллада",
        tempoBpm: 96
      }
    ]),
    collections: ["war-time-voices", "expert-romance"],
    featuredImage: "/images/songs/placeholder.svg",
    historicalContext:
      "Песня создана в 1940 году композитором Анатолием Новиковым и поэтом Яковом Шведовым."
  },
  {
    id: "katusha",
    slug: "katusha",
    title: "Катюша",
    era: "1930-е",
    genre: "Советская классика",
    language: "ru",
    summary:
      "Песня Матвея Блантера и Михаила Исаковского, ставшая символом отечественной культуры и соревновательного духа.",
    lyrics: `Расцветали яблони и груши...`,
    chords: `Gm | Cm | D7 | Gm\nGm | Eb | D7 | Gm`,
    defaultTempo: 120,
    tags: ["советская классика", "народ", "женский вокал"],
    performances: performances([
      {
        id: "katusha-lyube-2005",
        songId: "katusha",
        title: "Любэ (Красная площадь, 2005)",
        type: "live",
        artists: ["Любэ"],
        year: 2005,
        duration: 240,
        source: "youtube",
        sourceUrl: "https://www.youtube.com/watch?v=example5",
        quality: { audio: 4, video: 4, authenticity: 4 },
        rating: { overall: 4.2, votes: 310 },
        context: "День Победы на Красной площади",
        tempoBpm: 118
      },
      {
        id: "katusha-chorus-1950",
        songId: "katusha",
        title: "Государственный народный хор (1950)",
        type: "studio",
        artists: ["Государственный народный хор"],
        year: 1950,
        duration: 200,
        source: "rutube",
        sourceUrl: "https://rutube.ru/video/example",
        quality: { audio: 3, video: 2, authenticity: 5 },
        rating: { overall: 4.8, votes: 521 },
        tempoBpm: 116
      },
      {
        id: "katusha-indie-2021",
        songId: "katusha",
        title: "Irina Nova (Indie Cover, 2021)",
        type: "cover",
        artists: ["Irina Nova"],
        year: 2021,
        duration: 230,
        source: "youtube",
        sourceUrl: "https://www.youtube.com/watch?v=example6",
        quality: { audio: 4, video: 5, authenticity: 3 },
        rating: { overall: 4.0, votes: 76 },
        highlights: ["Акустическое звучание", "Двуголосие"],
        tempoBpm: 120
      }
    ]),
    collections: ["spring-moods", "expert-romance"],
    featuredImage: "/images/songs/placeholder.svg",
    historicalContext:
      "Песня была впервые представлена в 1938 году и быстро получила широкое распространение на фронте и в тылу."
  }
];

export const SAMPLE_COLLECTIONS: Collection[] = [
  {
    id: "folk-classics",
    slug: "folk-classics",
    title: "Народная классика",
    description: "Подборка канонических народных песен в лучших исполнениях",
    featuredSongIds: ["kalinka", "katusha"],
    curator: "Команда Rusongs",
    type: "thematic"
  },
  {
    id: "war-time-voices",
    slug: "war-time-voices",
    title: "Голоса военных лет",
    description: "Сильные и трогательные исполнения песен периода ВОВ",
    featuredSongIds: ["smuglyanka", "katusha"],
    curator: "Историк Марина Кузнецова",
    type: "expert"
  },
  {
    id: "spring-moods",
    slug: "spring-moods",
    title: "Весенние настроения",
    description: "Музыка для первых тёплых дней и пробуждения природы",
    featuredSongIds: ["kalinka", "katusha"],
    curator: "Сообщество Rusongs",
    type: "community"
  }
];
