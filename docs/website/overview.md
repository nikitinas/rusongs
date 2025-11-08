# Project Document: Rusongs.org

## Project Overview

**Rusongs.org** is a modern encyclopedia of Russian songs and a curated catalog of their performances. It is the place to discover any favorite song across dozens of versions, from archival recordings to contemporary covers.

### Project Motto

_"The entire rich history of the Russian song in one place."_

## Problem and Solution

### Problems We Address

1. **Scattered performances** – listeners have to search the entire internet to find different versions of a song.
2. **No structure or side-by-side comparison** – it is difficult to compare, evaluate, and discuss performances.
3. **Unreliable lyrics and chords** – most lyrics/chords online contain errors.
4. **Disappearing recordings** – rare performances are getting lost in archives.

### Our Solution

- **Unified performance catalog** for every song with structured comparison.
- **Verified lyrics and chords** curated by the community.
- **Smart rating system** where the community highlights the best performances.
- **Preservation of cultural heritage** through digitizing rare recordings and live performances.

## Target Audience

### Primary Segments

#### 1. Music lovers and connoisseurs (35%)

- **Description**: Listeners who love deep dives into music history and comparing interpretations.
- **Needs**: Discover rare recordings and study how performances evolved.
- **Use case**: “I want to hear ten different versions of ‘Evening on the Roadstead’.”

#### 2. Musicians and performers (25%)

- **Description**: Guitarists, vocalists, instrumentalists – both amateurs and professionals.
- **Needs**: Accurate chords and inspiration from other artists.
- **Use case**: “I need the chords for ‘Kalinka’ and want to watch how other bands perform it.”

#### 3. Nostalgic listeners (20%)

- **Description**: 45+ audience who want to revisit songs from their youth.
- **Needs**: Find specific versions they remember from radio, TV, or family archives.
- **Use case**: “I’m looking for that exact 1970s version of ‘Smuglyanka’ we listened to as kids.”

#### 4. Cultural enthusiasts (20%)

- **Description**: Younger listeners and international audiences interested in Russian culture.
- **Needs**: Understand songs within their historical and cultural context.
- **Use case**: “I want to understand why ‘Katyusha’ became an iconic folk song.”

## Key Features

### Core Features

#### 1. Comprehensive performance catalog

```typescript
interface Performance {
  id: string;
  songId: string;
  type: "studio" | "live" | "cover" | "folk" | "amateur";
  artists: string[];
  year: number;
  source: "youtube" | "vk" | "rutube" | "soundcloud" | "user_upload";
  quality: {
    audio: number; // Audio quality 1-5
    video: number; // Video quality 1-5
    authenticity: number; // Historical authenticity
  };
  context?: string; // Recording context: "1968 recording, Pyatnitsky Choir"
}
```

#### 2. Comparison and rating system

- **Community rating** for highlighting standout performances.
- **Scoring dimensions**: sound quality, arrangement, emotional impact.
- **Leaderboards** such as “Best studio performance” or “Best live recording.”
- **Expert-curated collections** to surface hidden gems.

#### 3. Musician tools

```tsx
// components/SongTools.tsx
export function SongTools({ song }) {
  return (
    <div className="song-tools">
      <ChordTransposer chords={song.chords} />
      <Metronome tempo={song.defaultTempo} />
      <ChordDiagrams chords={song.chords} />
      <PrintLayout lyrics={song.lyrics} chords={song.chords} />
    </div>
  );
}
```

#### 4. Smart discovery and collections

- **Automated**: “All performances from the 1950s.”
- **Thematic**: “Spring folk songs,” “Wartime romances.”
- **User-generated**: “My favorite versions of Russian songs.”
- **Expert**: “Russian romance masterpieces curated by a musicologist.”

#### 5. Community and collaboration

- **Comments and discussions** for every performance.
- **Song history threads** to capture cultural background.
- **User submissions** to expand the catalog.
- **Crowdsourced corrections** for lyrics and chords.

## Design Concept

### Style: “Modern Musical Library”

```css
/* Color palette */
--primary: #2c5530;   /* Deep green – nature, folk traditions */
--secondary: #8b4513; /* Earthy brown – heritage */
--accent: #b8860b;    /* Gold – value and quality */

--background: #fdf6e3;     /* Warm, readable background */
--surface: #ffffff;        /* Card surfaces */
--text-primary: #2d3748;   /* Dark text for readability */
```

### Key Screens

#### 1. Homepage – music discovery

```
┌────────────────────────────────────────────────────────┐
│ Rusongs • [Search] Catalog Collections Community       │
├────────────────────────────────────────────────────────┤
│                                                        │
│  "Discover the rich world of Russian songs"            │
│                                                        │
│  ┌─────────────────┐ ┌─────────────────┐               │
│  │ Performance     │ │ Performance     │  Featured     │
│  │   of the day    │ │   of the week   │  highlights   │
│  └─────────────────┘ └─────────────────┘               │
│                                                        │
│  New additions | Rare recordings | Live performances   │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐               │
│  │     │ │     │ │     │ │     │ │     │               │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘               │
│                                                        │
│  Monthly themes: Folk songs | Soviet classics          │
└────────────────────────────────────────────────────────┘
```

#### 2. Song page – the heart of the product

```tsx
// app/songs/[id]/page.tsx
<SongPage>
  <SongHeader>
    <Title>Kalinka</Title>
    <Metadata>Traditional song, 1860 • 247 performances</Metadata>
    <Actions>[♡ Add to favorites] [➕ Add to collection]</Actions>
  </SongHeader>

  <TabNavigation>
    <Tab name="Performances">
      <PerformanceBrowser
        performances={performances}
        sortOptions={["rating", "year", "popularity"]}
        filterOptions={["studio", "live", "folk", "modern"]}
      />
    </Tab>

    <Tab name="Lyrics and chords">
      <LyricsWithChords lyrics={lyrics} chords={chords} />
      <SongTools song={song} />
    </Tab>

    <Tab name="History and discussion">
      <SongHistory context={historicalContext} />
      <CommentsSection songId={song.id} />
    </Tab>
  </TabNavigation>
</SongPage>
```

#### 3. Performance browser

```tsx
// components/PerformanceBrowser.tsx
export function PerformanceBrowser({ performances }) {
  return (
    <div className="performance-browser">
      <div className="filters">
        <DecadeFilter /> {/* 1950s, 1960s, etc. */}
        <TypeFilter /> {/* Studio, live, covers */}
        <QualityFilter /> {/* Sound quality */}
        <ArtistFilter /> {/* Performers */}
      </div>

      <div className="performances-grid">
        {performances.map((performance) => (
          <PerformanceCard
            key={performance.id}
            performance={performance}
            showRating={true}
            showComparison={true}
          />
        ))}
      </div>
    </div>
  );
}
```

## Special Capabilities

### 1. Performance comparison

```tsx
// components/PerformanceComparator.tsx
export function PerformanceComparator({ performances }) {
  return (
    <div className="comparator">
      <table>
        <thead>
          <tr>
            <th>Performance</th>
            <th>Year</th>
            <th>Rating</th>
            <th>Tempo</th>
            <th>Arrangement</th>
            <th>Highlights</th>
          </tr>
        </thead>
        <tbody>
          {performances.map((performance) => (
            <PerformanceRow key={performance.id} performance={performance} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### 2. Recommendation engine

```typescript
// Recommendation system
interface Recommendation {
  type: "similar_performances" | "historical_evolution" | "artist_versions";
  title: string;
  description: string;
  performances: Performance[];
}

// Example: "The evolution of 'Smuglyanka' from 1944 to today"
```

### 3. Optional music tools

- **Karaoke mode** for sing-along sessions.
- **Chord transposition** tailored to instrument or vocal range.
- **Metronome** with rhythm presets for iconic songs.
- **Audio analysis** to compare tempo, key, and arrangement.

## Roadmap

### Phase 1: Foundation (2 months)

- [ ] 100+ songs with five or more performances each.
- [ ] Base rating and commenting system.
- [ ] Search and filtering.
- [ ] Comfortable view for lyrics and chords.

### Phase 2: Community (3 months)

- [ ] User-created collections and playlists.
- [ ] Submission workflow for new performances.
- [ ] Moderation and content review.
- [ ] Activity feed and notifications.

### Phase 3: Depth (2 months)

- [ ] Expanded catalog to 500+ songs.
- [ ] Advanced comparison tools.
- [ ] Historical notes and cultural context.
- [ ] Mobile application.

### Phase 4: Ecosystem (2 months)

- [ ] Developer API.
- [ ] Integrations with music schools and educational partners.
- [ ] Partnerships with archives and museums.
- [ ] Offline mode.

## Unique Value Proposition

### For Users

“Rusongs.org is your personal guide through the world of Russian songs. Not just lyrics, but the full story of every performance, a way to compare versions across decades, and a chance to find the interpretation that resonates with you.”

### Key Advantages

1. **Depth over breadth** – every song is presented through dozens of interpretations.
2. **Community of experts** – discover and preserve the best versions together.
3. **Cultural context** – understand the story, not just listen to the track.
4. **Living archive** – an ever-growing collection instead of a static museum.

## Monetization

### Free tier

- Full access to performances.
- Participate in ratings and discussions.
- Create personal collections.

### Premium (199 RUB / month)

- Offline access to favorite collections.
- Extended listening history and insights.
- Early access to new submissions.
- Priority in moderation suggestions.

---

**Rusongs.org** will become the home where the Russian song stays alive in all its diversity – not a frozen monument, but a living tradition to study, compare, and enjoy with fresh depth.
