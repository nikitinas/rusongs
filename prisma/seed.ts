import { PrismaClient, Role, PerformanceSource, PerformanceType, CollectionType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const songsSeed = [
  {
    id: "kalinka",
    slug: "kalinka",
    title: "Калинка",
    era: "Народная песня",
    genre: "Народные",
    language: "ru",
    summary:
      "Одна из самых узнаваемых русских народных песен. На Rusongs представлены десятки концертных и студийных версий от хоров и современных коллективов.",
    lyrics: `Калинка, калинка, калинка моя!\nВ саду ягода малинка, малинка моя!`,
    chords: `Am | E7 | Am | E7\nAm | Dm | E7 | Am`,
    defaultTempo: 128,
    tags: ["народная", "хор", "концерт"],
    featuredImage: "/images/songs/placeholder.svg",
    historicalContext:
      "Песня была создана в 1860 году композитором Иваном Ларионовым и быстро стала народной, благодаря сочетанию яркой мелодии и простого текста.",
    performances: [
      {
        id: "kalinka-choir-1968",
        title: "Хор им. Пятницкого (1968)",
        type: PerformanceType.LIVE,
        artists: ["Государственный русский народный хор им. М. Е. Пятницкого"],
        year: 1968,
        duration: 210,
        source: PerformanceSource.YOUTUBE,
        sourceUrl: "https://www.youtube.com/watch?v=example1",
        quality: { audio: 4, video: 3, authenticity: 5 },
        rating: { overall: 4.8, votes: 321 },
        context: "Запись концерта в Колонном зале Дома союзов",
        tempoBpm: 126,
        arrangement: "Хоровая",
      },
      {
        id: "kalinka-balalaika-1998",
        title: 'Ансамбль "Балалайка" (1998)',
        type: PerformanceType.STUDIO,
        artists: ["Ансамбль Балалайка"],
        year: 1998,
        duration: 185,
        source: PerformanceSource.YOUTUBE,
        sourceUrl: "https://www.youtube.com/watch?v=example2",
        quality: { audio: 5, video: 4, authenticity: 4 },
        rating: { overall: 4.6, votes: 210 },
        highlights: ["Современная аранжировка", "Яркая хореография"],
        tempoBpm: 130,
        arrangement: "Фолк-ансамбль",
      },
      {
        id: "kalinka-electro-2020",
        title: "KALINKA 2.0 (Live Sessions)",
        type: PerformanceType.COVER,
        artists: ["DJ Samovar", "Мария Орлова"],
        year: 2020,
        duration: 240,
        source: PerformanceSource.SOUNDCLOUD,
        sourceUrl: "https://soundcloud.com/example/kalinka-20",
        quality: { audio: 4, video: 0, authenticity: 3 },
        rating: { overall: 4.1, votes: 88 },
        highlights: ["Электронная обработка", "Сохранённый народный мотив"],
        tempoBpm: 122,
        arrangement: "Электронная",
      },
    ],
    collections: ["folk-classics", "spring-moods"],
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
    featuredImage: "/images/songs/placeholder.svg",
    historicalContext: "Песня создана в 1940 году композитором Анатолием Новиковым и поэтом Яковом Шведовым.",
    performances: [
      {
        id: "smuglyanka-leontiev-1980",
        title: "Валерий Леонтьев (1980)",
        type: PerformanceType.LIVE,
        artists: ["Валерий Леонтьев"],
        year: 1980,
        duration: 230,
        source: PerformanceSource.YOUTUBE,
        sourceUrl: "https://www.youtube.com/watch?v=example3",
        quality: { audio: 4, video: 3, authenticity: 4 },
        rating: { overall: 4.7, votes: 198 },
        highlights: ["Энергичная подача", "Современная аранжировка"],
        tempoBpm: 112,
      },
      {
        id: "smuglyanka-choir-1944",
        title: "Ансамбль песни и пляски Красной армии (1944)",
        type: PerformanceType.LIVE,
        artists: ["Ансамбль песни и пляски Советской Армии"],
        year: 1944,
        duration: 215,
        source: PerformanceSource.VK,
        sourceUrl: "https://vk.com/video-1944",
        quality: { audio: 3, video: 2, authenticity: 5 },
        rating: { overall: 4.9, votes: 452 },
        context: "Редкая архивная запись фронтового выступления",
        tempoBpm: 108,
      },
      {
        id: "smuglyanka-jazz-2019",
        title: "Ольга Красько Jazz Trio (2019)",
        type: PerformanceType.COVER,
        artists: ["Ольга Красько", "Jazz Trio"],
        year: 2019,
        duration: 260,
        source: PerformanceSource.YOUTUBE,
        sourceUrl: "https://www.youtube.com/watch?v=example4",
        quality: { audio: 5, video: 4, authenticity: 3 },
        rating: { overall: 4.3, votes: 102 },
        arrangement: "Джазовая баллада",
        tempoBpm: 96,
      },
    ],
    collections: ["war-time-voices", "expert-romance"],
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
    featuredImage: "/images/songs/placeholder.svg",
    historicalContext:
      "Песня была впервые представлена в 1938 году и быстро получила широкое распространение на фронте и в тылу.",
    performances: [
      {
        id: "katusha-lyube-2005",
        title: "Любэ (Красная площадь, 2005)",
        type: PerformanceType.LIVE,
        artists: ["Любэ"],
        year: 2005,
        duration: 240,
        source: PerformanceSource.YOUTUBE,
        sourceUrl: "https://www.youtube.com/watch?v=example5",
        quality: { audio: 4, video: 4, authenticity: 4 },
        rating: { overall: 4.2, votes: 310 },
        context: "День Победы на Красной площади",
        tempoBpm: 118,
      },
      {
        id: "katusha-chorus-1950",
        title: "Государственный народный хор (1950)",
        type: PerformanceType.STUDIO,
        artists: ["Государственный народный хор"],
        year: 1950,
        duration: 200,
        source: PerformanceSource.RUTUBE,
        sourceUrl: "https://rutube.ru/video/example",
        quality: { audio: 3, video: 2, authenticity: 5 },
        rating: { overall: 4.8, votes: 521 },
        tempoBpm: 116,
      },
      {
        id: "katusha-indie-2021",
        title: "Irina Nova (Indie Cover, 2021)",
        type: PerformanceType.COVER,
        artists: ["Irina Nova"],
        year: 2021,
        duration: 230,
        source: PerformanceSource.YOUTUBE,
        sourceUrl: "https://www.youtube.com/watch?v=example6",
        quality: { audio: 4, video: 5, authenticity: 3 },
        rating: { overall: 4.0, votes: 76 },
        highlights: ["Акустическое звучание", "Двуголосие"],
        tempoBpm: 120,
      },
    ],
    collections: ["spring-moods", "expert-romance"],
  },
];

const collectionsSeed = [
  {
    id: "folk-classics",
    slug: "folk-classics",
    title: "Народная классика",
    description: "Подборка канонических народных песен в лучших исполнениях",
    featuredSongIds: ["kalinka", "katusha"],
    curator: "Команда Rusongs",
    type: CollectionType.THEMATIC,
    songs: ["kalinka", "katusha"],
  },
  {
    id: "war-time-voices",
    slug: "war-time-voices",
    title: "Голоса военных лет",
    description: "Сильные и трогательные исполнения песен периода ВОВ",
    featuredSongIds: ["smuglyanka", "katusha"],
    curator: "Историк Марина Кузнецова",
    type: CollectionType.EXPERT,
    songs: ["smuglyanka", "katusha"],
  },
  {
    id: "spring-moods",
    slug: "spring-moods",
    title: "Весенние настроения",
    description: "Музыка для первых тёплых дней и пробуждения природы",
    featuredSongIds: ["kalinka", "katusha"],
    curator: "Сообщество Rusongs",
    type: CollectionType.COMMUNITY,
    songs: ["kalinka", "katusha"],
  },
  {
    id: "expert-romance",
    slug: "expert-romance",
    title: "Романтика и эксперименты",
    description: "Выбор редакции Rusongs для внимательного прослушивания",
    featuredSongIds: ["smuglyanka", "katusha"],
    curator: "Редакция Rusongs",
    type: CollectionType.EXPERT,
    songs: ["smuglyanka", "katusha"],
  },
];

const usersSeed = [
  {
    email: "admin@rusongs.test",
    name: "Admin User",
    role: Role.ADMIN,
    password: "admin123",
  },
  {
    email: "editor@rusongs.test",
    name: "Editor User",
    role: Role.EDITOR,
    password: "editor123",
  },
  {
    email: "contributor@rusongs.test",
    name: "Contributor User",
    role: Role.CONTRIBUTOR,
    password: "contrib123",
  },
];

async function seedUsers() {
  for (const user of usersSeed) {
    const passwordHash = await bcrypt.hash(user.password, 10);

    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        role: user.role,
        passwordHash,
      },
      create: {
        email: user.email,
        name: user.name,
        role: user.role,
        passwordHash,
      },
    });
  }
}

async function seedSongs() {
  for (const song of songsSeed) {
    await prisma.performance.deleteMany({ where: { songId: song.id } });

    await prisma.song.upsert({
      where: { slug: song.slug },
      update: {
        title: song.title,
        originalTitle: song.originalTitle ?? null,
        era: song.era,
        genre: song.genre,
        language: song.language,
        summary: song.summary,
        lyrics: song.lyrics,
        chords: song.chords,
        defaultTempo: song.defaultTempo,
        tags: song.tags,
        featuredImage: song.featuredImage ?? null,
        historicalContext: song.historicalContext ?? null,
      },
      create: {
        id: song.id,
        slug: song.slug,
        title: song.title,
        originalTitle: song.originalTitle ?? null,
        era: song.era,
        genre: song.genre,
        language: song.language,
        summary: song.summary,
        lyrics: song.lyrics,
        chords: song.chords,
        defaultTempo: song.defaultTempo,
        tags: song.tags,
        featuredImage: song.featuredImage ?? null,
        historicalContext: song.historicalContext ?? null,
      },
    });

    for (const performance of song.performances) {
      await prisma.performance.upsert({
        where: { id: performance.id },
        update: {
          title: performance.title,
          type: performance.type,
          artists: performance.artists,
          year: performance.year,
          duration: performance.duration,
          source: performance.source,
          sourceUrl: performance.sourceUrl,
          quality: performance.quality,
          rating: performance.rating,
          context: performance.context ?? null,
          highlights: performance.highlights ?? [],
          tempoBpm: performance.tempoBpm ?? null,
          arrangement: performance.arrangement ?? null,
        },
        create: {
          id: performance.id,
          songId: song.id,
          title: performance.title,
          type: performance.type,
          artists: performance.artists,
          year: performance.year,
          duration: performance.duration,
          source: performance.source,
          sourceUrl: performance.sourceUrl,
          quality: performance.quality,
          rating: performance.rating,
          context: performance.context ?? null,
          highlights: performance.highlights ?? [],
          tempoBpm: performance.tempoBpm ?? null,
          arrangement: performance.arrangement ?? null,
        },
      });
    }
  }
}

async function seedCollections() {
  await prisma.collectionSong.deleteMany();
  await prisma.collection.deleteMany();

  for (const collection of collectionsSeed) {
    await prisma.collection.create({
      data: {
        id: collection.id,
        slug: collection.slug,
        title: collection.title,
        description: collection.description,
        featuredSongIds: collection.featuredSongIds,
        curator: collection.curator,
        type: collection.type,
        songs: {
          create: collection.songs.map((songId, index) => ({
            songId,
            position: index,
          })),
        },
      },
    });
  }
}

async function main() {
  await prisma.collectionSong.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.performance.deleteMany();
  await prisma.song.deleteMany();

  await seedUsers();
  await seedSongs();
  await seedCollections();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
