# Princess Kingdom Adventure 👑

A browser-based **3D first-person** adventure game built with Three.js. Play as a princess exploring her magical kingdom across 5 worlds — collect gems, talk to NPCs, and restore peace to the realm!

## 🎮 Play

**Live game:** [https://erezone.github.io/princess-kingdom-game/](https://erezone.github.io/princess-kingdom-game/)

**Debug shortcuts:**
- `?displayParty=1` — Skip to victory celebration scene (click Start first)

## 🕹️ Controls

| Input | Action |
|-------|--------|
| **WASD / Arrow Keys** | Move (forward/back/strafe) |
| **Mouse** | Look around (after clicking to lock pointer) |
| **Space** | Talk to nearby NPC / advance dialog |
| **M** | Toggle minimap |

---

## 🏗️ Architecture Overview

### File Structure

```
princess-kingdom-game/
├── index.html          # HTML shell: start screen, HUD, dialog box, minimap canvas
├── style.css           # Full-screen layout, RTL Hebrew, HUD, dialog, crosshair
├── game.js             # Entire game engine (~1730 lines)
├── README.md           # This file
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages deployment (actions/deploy-pages@v4)
```

### Tech Stack

- **Three.js r128** — 3D rendering (loaded from CDN, no build step)
- **Web Speech API** — Hebrew TTS with niqqud for NPC dialog
- **Web Audio API** — Sound effects (gem collect chime)
- **YouTube IFrame API** — Victory celebration music
- **Vanilla JS** — No framework, no bundler, single file

### Cache Busting

`index.html` loads `game.js?v=N` — bump the version number on every push to avoid stale browser cache. Also has `<meta http-equiv="Cache-Control" content="no-cache">`.

---

## 🧩 game.js Sections (in order)

| Lines (approx) | Section | Description |
|---|---|---|
| 1–12 | **Config** | Constants: `MOVE_SPEED`, `MOUSE_SENS`, `COLLISION_R`, `INTERACT_DIST`, `GEM_COLLECT_DIST`, `WALL_HEIGHT`, `TREE_TRUNK_R` |
| 14–24 | **Wall Types** | `WALL_DEFS` — maps tile IDs (1–7) to colors/names: castle_stone, dark_stone, wood, tree, hedge, brick, dungeon |
| 26–286 | **Level Definitions** | `levels[]` array — 5 levels with map grids, NPCs, gems, trees, torches, lighting, fog, spawn points |
| 288–313 | **Victory/Complete Dialogs** | `victoryDialog` and `levelCompleteDialog` with display text + TTS niqqud text |
| 315–336 | **Three.js Globals** | Scene, camera, renderer, clock, game state variables, mesh arrays |
| 338–379 | **Sound Effects** | `playGemSound()` — Web Audio API oscillator chime (3 rising tones + shimmer) |
| 381–420 | **Text-to-Speech** | `initTTS()`, `speak()` — Hebrew voice selection (prefers Google/Premium), sentence splitting, niqqud support |
| 422–532 | **Texture Generation** | `generateWallTexture()` — procedural canvas textures for each wall type (stone bricks, wood grain, bark, hedge, dungeon) |
| 534–788 | **Build Level** | `loadLevel(index)` — scene cleanup, level loading, wall/floor/ceiling geometry, lighting, torches, NPCs, gems, trees |
| 790–893 | **Build NPC** | `buildNPC(npc)` — detailed humanoid: shoes, legs, torso, cape, shoulders, arms, hands, neck, head with hair, eyes, nose, mouth, floating name marker |
| 895–928 | **Build Gem** | `buildGem()` — custom diamond BufferGeometry (8-facet crown + pavilion) with `MeshPhysicalMaterial` clearcoat + point light glow |
| 930–1012 | **Build 3D Tree** | `buildTree(scale)` — cylinder trunk with taper, roots, branches, 3 cone foliage layers + sphere clusters |
| 1014–1107 | **Build Portal** | `spawnPortal()` — wooden double doors (ajar) with golden frame, arch, handles, blue glow, sparkle stars |
| 1109–1174 | **Input** | Keyboard (WASD/arrows/space/M), mouse look, pointer lock, dialog advancement, NPC interaction |
| 1176–1316 | **Update** | `update(dt)` — movement with wall + tree collision, gem collection, level completion, portal interaction, NPC animation, torch flicker |
| 1318–1359 | **Minimap** | `drawMinimap()` — 2D canvas overlay showing walls, gems, NPCs, portal, player position + direction |
| 1361–1672 | **Celebration Scene** | `startCelebration()` — all NPCs dancing in circle, princess with crown, fireworks particles, YouTube music embed |
| 1674–1685 | **Game Loop** | `animate()` — requestAnimationFrame, delta time, routes to `update()` or `updateCelebration()` |
| 1687–1730 | **Init** | `initGame()` — scene/renderer/camera setup, event listeners, TTS init, `displayParty` query param |

---

## 🌍 Level System

### Level Data Structure

Each level in the `levels[]` array has:

```javascript
{
  name: "שם העולם",        // Hebrew display name
  levelNum: 1,              // Level number (1-5)
  mapW: 16, mapH: 16,       // Map dimensions
  spawn: { x, y, rot },     // Player start position + facing direction
  fog: { color, density },   // FogExp2 settings
  ambientColor, ambientIntensity,  // Ambient light
  hemiSky, hemiGround, hemiIntensity, // Hemisphere light
  sunColor, sunIntensity, sunPos,     // Directional sun light
  hasCeiling: true/false,    // Whether to render ceiling
  floorType: "castle"|"grass"|"garden"|"forest"|"castle",
  torches: [[x,y,z], ...],  // Wall torch positions (auto-snaps to nearest wall)
  map: [[...]],             // 2D grid — 0=empty, 1-7=wall types (see WALL_DEFS)
  npcs: [{ x, z, name, bodyColor, capeColor, height, dialog:[], tts:[] }, ...],
  gems: [{ x, z }, ...],    // 10 gems per level
  trees: [{ x, z, s }, ...] // Standalone trees (s=scale, optional)
}
```

### The 5 Levels

| # | Name | Theme | Key Features |
|---|------|-------|-------------|
| 1 | הטירה המלכותית | Royal Castle | Stone walls, ceiling, wall torches, King + Advisor NPCs |
| 2 | הכפר הנעים | Cozy Village | Wood/brick buildings, grass floor, open sky, standalone trees |
| 3 | הגינה המלכותית | Royal Garden | Hedge maze, flower beds, butterfly NPC, trees |
| 4 | היער הקסום | Enchanted Forest | Dense tree walls + standalone trees, forest floor, fairy + hermit NPCs |
| 5 | המרתף האפל | Dark Dungeon | Dungeon walls, very dark, heavy fog, ghost + warrior NPCs |

### Level Flow

1. Player collects all 10 gems → `gameState = "levelComplete"` (or `"victory"` on level 5)
2. Portal (door) spawns at center of map
3. Dialog appears explaining completion
4. Player closes dialog, walks to the door
5. Walking into door triggers `loadLevel(next)` or `startCelebration()`

---

## 🧱 Collision System

### Wall Collision
Tile-based. Movement checks the target tile in X and Z axes **independently** (slide along walls). Uses `COLLISION_R = 0.3` buffer.

### Tree Collision
Distance-based. Each standalone tree records its trunk position in `treeTrunks[]`. On movement, if player is within `COLLISION_R + TREE_TRUNK_R` of any trunk, a push-back force is applied.

### NPC/Gem Interaction
Distance-based checks each frame:
- **NPC talk:** within `INTERACT_DIST = 2.5` + press Space
- **Gem collect:** within `GEM_COLLECT_DIST = 1.0` (automatic)

---

## 🗣️ Text-to-Speech System

- Uses Web Speech API with Hebrew (`he-IL`)
- Each NPC has parallel arrays: `dialog[]` (display text) and `tts[]` (niqqud-vowelized text)
- Niqqud (נִיקוּד) dramatically improves Hebrew pronunciation
- Voice selection prefers non-local voices (Google/Premium) for quality
- Settings: rate 0.92, pitch 1.05
- Long sentences are split on punctuation for natural pacing

---

## 🎆 Celebration Scene

Triggered after completing all 5 levels and walking through the final door.

**Components:**
- Stone dance floor + grass ground
- All NPCs from all levels arranged in a circle, dancing (bobbing + circling)
- Princess in center with golden crown, spinning
- Colored spotlights (6 colors) + torch poles (12)
- Fireworks particle system — random bursts with gravity, fade, flash lights
- YouTube iframe (bottom-left) auto-playing "הילדים קופצים" by שוטי הנבואה
- Camera orbits the scene automatically

**Debug:** Add `?displayParty=1` to URL, then click Start to jump directly to celebration.

---

## 🎨 Visual Systems

### Procedural Textures
Wall textures are generated at runtime on `<canvas>` elements:
- **castle_stone / dark_stone:** Brick pattern with mortar lines, noise variation
- **wood:** Horizontal grain lines with knots
- **tree:** Vertical bark strips with rough texture
- **hedge:** Leaf clusters on green background
- **brick:** Red/brown brick pattern
- **dungeon:** Dark stone with moss spots

### Lighting (per level)
- **Ambient light** — base illumination
- **Hemisphere light** — sky/ground color gradient
- **Sun (directional)** — main shadow-casting light (PCF soft shadows)
- **Wall torches** — PointLights that auto-snap to nearest wall, with flicker animation
- **Gem glow** — PointLight per gem (removed on collection)

### Renderer Settings
- WebGL with antialiasing
- PCFSoftShadowMap
- ACES Filmic tone mapping
- FogExp2 per level

---

## 🔧 How to Add Content

### Adding a New Level

1. Add a new object to the `levels[]` array (after level 5, before `];`)
2. Define the map grid, NPCs, gems, trees, torches
3. The level system auto-detects the array length — no hardcoded level count
4. Update `victoryDialog` text if needed

### Adding a New NPC

Add to a level's `npcs[]` array:
```javascript
{ 
  x: 5, z: 8,                    // Grid position
  name: "שם הדמות",              // Hebrew name
  bodyColor: 0xff0000,            // Torso color
  capeColor: 0xcc0000,            // Cape color  
  height: 1.7,                    // Character height (affects all proportions)
  dialog: ["line1", "line2"],     // Display text (Hebrew)
  tts: ["לַיין1", "לַיין2"]      // Niqqud text for TTS
}
```

### Adding a New Wall Type

1. Add entry to `WALL_DEFS` with color and name
2. Add texture generation case in `generateWallTexture()`
3. Use the new ID number in level map grids

### Adding Sound Effects

Use the `getSfxCtx()` helper to get a shared AudioContext, then create oscillators:
```javascript
function playMySound() {
  const ctx = getSfxCtx();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  // ... configure and connect
}
```

---

## 🌐 Deployment

GitHub Pages via workflow (`.github/workflows/deploy.yml`):
- Triggers on push to `main`
- Uses `actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4`
- Deploys root directory as static site
- **Remember to bump `?v=N`** in index.html on each push

### GitHub Auth Note

The repo is under the `erezone` personal account. If working from a machine with multiple GitHub accounts, switch with:
```bash
gh auth switch --user erezone
```

---

## 📝 RTL / Hebrew Notes

- All UI text is right-to-left (RTL) via CSS `direction: rtl`
- Punctuation must be placed at the **logical end** of Hebrew strings
- Gem counter displays as `total / collected` (reversed from English) because RTL flips visual order
- All dialog is written in **feminine Hebrew** (the player is a princess)
