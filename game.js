// ─── Constants ───────────────────────────────────────────────────────────────
const TILE = 40;
const COLS = 20;
const ROWS = 15;
const WIDTH = COLS * TILE;
const HEIGHT = ROWS * TILE;

// ─── World Zones ─────────────────────────────────────────────────────────────
// Legend: 0=grass, 1=wall/tree, 2=water, 3=path, 4=flower, 5=bridge,
//         6=castle_floor, 7=castle_wall, 8=door
const ZONES = {
  castle: {
    name: "Royal Castle",
    bgColor: "#3b2a5e",
    map: [
      [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
      [7,6,6,6,6,7,6,6,6,6,6,6,6,6,7,6,6,6,6,7],
      [7,6,6,6,6,7,6,6,6,6,6,6,6,6,7,6,6,6,6,7],
      [7,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7],
      [7,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7],
      [7,7,7,6,6,7,6,6,6,6,6,6,6,6,7,6,6,7,7,7],
      [7,6,6,6,6,7,6,6,6,6,6,6,6,6,7,6,6,6,6,7],
      [7,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7],
      [7,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7],
      [7,6,6,6,6,7,6,6,6,6,6,6,6,6,7,6,6,6,6,7],
      [7,7,7,7,7,7,6,6,6,6,6,6,6,6,7,7,7,7,7,7],
      [7,7,7,7,7,7,6,6,6,6,6,6,6,6,7,7,7,7,7,7],
      [7,7,7,7,7,7,6,6,6,8,8,6,6,6,7,7,7,7,7,7],
      [7,7,7,7,7,7,6,6,6,8,8,6,6,6,7,7,7,7,7,7],
      [7,7,7,7,7,7,7,7,7,8,8,7,7,7,7,7,7,7,7,7],
    ],
    exits: [{ x: 9, y: 14, to: "village", spawnX: 10, spawnY: 1 },
            { x: 10, y: 14, to: "village", spawnX: 10, spawnY: 1 }],
    npcs: [
      { x: 3, y: 3, sprite: "king", name: "King Aldric",
        dialog: ["Welcome, my dear princess!", "The kingdom needs your help.", "Villagers report strange lights in the Enchanted Forest.", "Collect magical gems to restore peace!"] },
      { x: 16, y: 3, sprite: "advisor", name: "Royal Advisor Mira",
        dialog: ["Your Highness, the gems are scattered across the kingdom.", "Talk to the villagers — they may know where to find them."] },
    ],
    gems: [{ x: 3, y: 8 }, { x: 16, y: 8 }],
  },

  village: {
    name: "Cozy Village",
    bgColor: "#2d5a27",
    map: [
      [1,1,1,1,1,1,1,1,1,3,3,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,1],
      [1,0,4,0,0,1,1,0,0,3,3,0,0,1,1,0,0,4,0,1],
      [1,0,0,0,0,1,1,0,0,3,3,0,0,1,1,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,3,0,0,0,0,3,0,0,0,0,0,0,1],
      [1,0,4,0,0,0,0,3,0,4,4,0,3,0,0,0,0,4,0,1],
      [1,0,0,0,0,0,0,3,0,0,0,0,3,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,1],
      [1,0,0,1,1,0,0,0,0,3,3,0,0,0,0,1,1,0,0,1],
      [1,0,0,1,1,0,0,0,0,3,3,0,0,0,0,1,1,0,0,1],
      [1,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,3,3,1,1,1,1,1,1,1,1,1],
    ],
    exits: [{ x: 9, y: 0, to: "castle", spawnX: 9, spawnY: 13 },
            { x: 10, y: 0, to: "castle", spawnX: 10, spawnY: 13 },
            { x: 9, y: 14, to: "forest", spawnX: 10, spawnY: 1 },
            { x: 10, y: 14, to: "forest", spawnX: 10, spawnY: 1 }],
    npcs: [
      { x: 4, y: 6, sprite: "baker", name: "Baker Rosalind",
        dialog: ["Oh, Princess! Thank goodness you're here!", "I saw a shimmering gem near the old fountain.", "Be careful in the forest — it's full of surprises!"] },
      { x: 15, y: 6, sprite: "guard", name: "Guard Thomas",
        dialog: ["Your Highness! The forest path to the south is open.", "I've heard whispers of treasure hidden among the trees.", "Stay on the paths and you'll be safe!"] },
      { x: 10, y: 9, sprite: "child", name: "Little Elara",
        dialog: ["Princess! Princess! You're so pretty!", "I found a sparkly rock but Mama said to leave it.", "Will you find all the magic gems? Please?"] },
    ],
    gems: [{ x: 9, y: 7 }, { x: 2, y: 2 }, { x: 17, y: 7 }],
  },

  forest: {
    name: "Enchanted Forest",
    bgColor: "#0d2b0d",
    map: [
      [1,1,1,1,1,1,1,1,1,3,3,1,1,1,1,1,1,1,1,1],
      [1,0,0,1,0,0,0,1,0,3,3,0,1,0,0,0,1,0,0,1],
      [1,0,0,0,0,4,0,0,0,3,3,0,0,0,4,0,0,0,0,1],
      [1,1,0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,1,1],
      [1,0,0,0,1,0,0,3,3,0,0,3,3,0,0,1,0,0,0,1],
      [1,0,4,0,0,0,0,3,0,0,0,0,3,0,0,0,0,4,0,1],
      [1,0,0,0,0,0,0,3,0,1,1,0,3,0,0,0,0,0,0,1],
      [1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
      [1,0,4,0,0,0,0,0,4,0,0,4,0,0,0,0,0,4,0,1],
      [1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
      [1,1,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,1,1],
      [1,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,2,2,2,2,2,2,1,1,1,1,1,1,1],
    ],
    exits: [{ x: 9, y: 0, to: "village", spawnX: 9, spawnY: 13 },
            { x: 10, y: 0, to: "village", spawnX: 10, spawnY: 13 }],
    npcs: [
      { x: 5, y: 5, sprite: "fairy", name: "Forest Fairy Luma",
        dialog: ["✨ Welcome to the Enchanted Forest, Princess!", "The ancient trees hold many secrets.", "Collect all the gems to lift the shadow from this land!", "The magic grows stronger with each gem you find."] },
      { x: 14, y: 9, sprite: "hermit", name: "Old Hermit Cedric",
        dialog: ["Ah, the princess ventures into the deep woods!", "I've lived here for decades, watching the forest change.", "The gems pulse with energy — can you feel it?", "Gather them all and the forest will sing once more."] },
    ],
    gems: [{ x: 2, y: 10 }, { x: 17, y: 10 }, { x: 9, y: 5 }, { x: 11, y: 5 }, { x: 8, y: 10 }],
  },
};

// ─── Tile rendering ──────────────────────────────────────────────────────────
const TILE_COLORS = {
  0: "#4a8c3f",  // grass
  1: "#2d5a27",  // tree/wall
  2: "#2a6496",  // water
  3: "#c4a35a",  // path
  4: "#4a8c3f",  // flower (grass base)
  5: "#8B7355",  // bridge
  6: "#6b5b8a",  // castle floor
  7: "#3b2a5e",  // castle wall
  8: "#8B7355",  // door
};

function drawTile(ctx, type, px, py) {
  ctx.fillStyle = TILE_COLORS[type] || "#000";
  ctx.fillRect(px, py, TILE, TILE);

  if (type === 1) {
    // tree / forest wall
    ctx.fillStyle = "#1a4a14";
    ctx.beginPath();
    ctx.arc(px + TILE / 2, py + TILE / 2 - 4, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#5a3a1a";
    ctx.fillRect(px + 16, py + 22, 8, 14);
    ctx.fillStyle = "#228B22";
    ctx.beginPath();
    ctx.arc(px + TILE / 2, py + TILE / 2 - 6, 14, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 2) {
    // water shimmer
    ctx.fillStyle = "rgba(100,200,255,0.15)";
    const offset = (Date.now() / 600 + px) % 20;
    ctx.fillRect(px + offset, py + 8, 12, 2);
    ctx.fillRect(px + (offset + 10) % TILE, py + 22, 10, 2);
  } else if (type === 4) {
    // flowers
    const colors = ["#ff6b9d", "#ffb347", "#ff6b6b", "#c39bd3"];
    const c = colors[(px + py) % colors.length];
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(px + 12, py + 12, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(px + 28, py + 28, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffeb3b";
    ctx.beginPath();
    ctx.arc(px + 12, py + 12, 1.5, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 7) {
    // castle wall detail
    ctx.strokeStyle = "#2a1a4e";
    ctx.lineWidth = 1;
    ctx.strokeRect(px + 2, py + 2, TILE - 4, TILE / 2 - 2);
    ctx.strokeRect(px + 2, py + TILE / 2 + 1, TILE - 4, TILE / 2 - 3);
  } else if (type === 8) {
    // door
    ctx.fillStyle = "#A0522D";
    ctx.fillRect(px + 4, py + 2, TILE - 8, TILE - 2);
    ctx.fillStyle = "#ffd700";
    ctx.beginPath();
    ctx.arc(px + TILE / 2 + 6, py + TILE / 2, 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 0) {
    // grass detail
    ctx.fillStyle = "rgba(60,120,50,0.4)";
    ctx.fillRect(px + 8, py + 12, 2, 6);
    ctx.fillRect(px + 24, py + 6, 2, 5);
    ctx.fillRect(px + 16, py + 26, 2, 6);
  } else if (type === 6) {
    // castle floor tiles
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    ctx.strokeRect(px, py, TILE, TILE);
  }
}

// ─── Sprite Drawing ──────────────────────────────────────────────────────────
function drawPrincess(ctx, x, y, frame, dir) {
  const px = x * TILE;
  const py = y * TILE;

  // Dress
  ctx.fillStyle = "#d63384";
  ctx.beginPath();
  ctx.moveTo(px + 10, py + 18);
  ctx.lineTo(px + 6, py + 36);
  ctx.lineTo(px + 34, py + 36);
  ctx.lineTo(px + 30, py + 18);
  ctx.closePath();
  ctx.fill();

  // Dress highlight
  ctx.fillStyle = "#e75a9d";
  ctx.beginPath();
  ctx.moveTo(px + 14, py + 18);
  ctx.lineTo(px + 12, py + 32);
  ctx.lineTo(px + 22, py + 32);
  ctx.lineTo(px + 22, py + 18);
  ctx.closePath();
  ctx.fill();

  // Head
  ctx.fillStyle = "#fdd9b5";
  ctx.beginPath();
  ctx.arc(px + 20, py + 13, 9, 0, Math.PI * 2);
  ctx.fill();

  // Hair
  ctx.fillStyle = "#ffd700";
  ctx.beginPath();
  ctx.arc(px + 20, py + 10, 9, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(px + 11, py + 8, 3, 12);
  ctx.fillRect(px + 26, py + 8, 3, 12);

  // Crown
  ctx.fillStyle = "#ffd700";
  ctx.fillRect(px + 14, py + 2, 12, 5);
  ctx.fillStyle = "#ff6b6b";
  ctx.fillRect(px + 15, py + 1, 2, 3);
  ctx.fillRect(px + 19, py + 0, 2, 3);
  ctx.fillRect(px + 23, py + 1, 2, 3);

  // Eyes
  ctx.fillStyle = "#2c3e50";
  if (dir === "left") {
    ctx.fillRect(px + 15, py + 12, 2, 2);
    ctx.fillRect(px + 20, py + 12, 2, 2);
  } else if (dir === "right") {
    ctx.fillRect(px + 18, py + 12, 2, 2);
    ctx.fillRect(px + 23, py + 12, 2, 2);
  } else {
    ctx.fillRect(px + 16, py + 12, 2, 2);
    ctx.fillRect(px + 22, py + 12, 2, 2);
  }

  // Smile
  ctx.strokeStyle = "#c0392b";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(px + 20, py + 15, 3, 0.1, Math.PI - 0.1);
  ctx.stroke();

  // Walking animation bounce
  if (frame % 2 === 1) {
    ctx.fillStyle = "#fdd9b5";
    ctx.fillRect(px + 12, py + 34, 4, 4);
    ctx.fillRect(px + 24, py + 34, 4, 4);
  } else {
    ctx.fillStyle = "#fdd9b5";
    ctx.fillRect(px + 14, py + 34, 4, 4);
    ctx.fillRect(px + 22, py + 34, 4, 4);
  }
}

function drawNPC(ctx, npc) {
  const px = npc.x * TILE;
  const py = npc.y * TILE;
  const sprites = {
    king:    { body: "#4a0e8f", head: "#fdd9b5", hat: "#ffd700", detail: "#daa520" },
    advisor: { body: "#1a5276", head: "#fdd9b5", hat: "#5dade2", detail: "#2e86c1" },
    baker:   { body: "#f5f5dc", head: "#fdd9b5", hat: "#fff", detail: "#d4ac0d" },
    guard:   { body: "#717d7e", head: "#fdd9b5", hat: "#515a5a", detail: "#c0392b" },
    child:   { body: "#58d68d", head: "#fdd9b5", hat: null, detail: "#27ae60" },
    fairy:   { body: "#a569bd", head: "#fdebd0", hat: null, detail: "#f9e79f" },
    hermit:  { body: "#6e4b3a", head: "#fdd9b5", hat: "#4a3728", detail: "#8B7355" },
  };
  const s = sprites[npc.sprite] || sprites.guard;

  // Body
  ctx.fillStyle = s.body;
  ctx.fillRect(px + 10, py + 16, 20, 20);

  // Detail (belt/apron)
  ctx.fillStyle = s.detail;
  ctx.fillRect(px + 10, py + 26, 20, 3);

  // Head
  ctx.fillStyle = s.head;
  ctx.beginPath();
  ctx.arc(px + 20, py + 12, 8, 0, Math.PI * 2);
  ctx.fill();

  // Eyes
  ctx.fillStyle = "#2c3e50";
  ctx.fillRect(px + 16, py + 11, 2, 2);
  ctx.fillRect(px + 22, py + 11, 2, 2);

  // Hat/hair
  if (s.hat) {
    ctx.fillStyle = s.hat;
    ctx.fillRect(px + 12, py + 3, 16, 6);
  }

  // Interaction indicator
  const bobble = Math.sin(Date.now() / 400 + npc.x) * 3;
  ctx.fillStyle = "#ffd700";
  ctx.font = "14px serif";
  ctx.textAlign = "center";
  ctx.fillText("❗", px + 20, py - 2 + bobble);
}

function drawGem(ctx, gx, gy) {
  const px = gx * TILE + TILE / 2;
  const py = gy * TILE + TILE / 2;
  const pulse = Math.sin(Date.now() / 300 + gx * gy) * 3;

  // Glow
  ctx.fillStyle = "rgba(100, 200, 255, 0.2)";
  ctx.beginPath();
  ctx.arc(px, py, 14 + pulse, 0, Math.PI * 2);
  ctx.fill();

  // Diamond shape
  ctx.fillStyle = "#5dade2";
  ctx.beginPath();
  ctx.moveTo(px, py - 10);
  ctx.lineTo(px + 8, py);
  ctx.lineTo(px, py + 10);
  ctx.lineTo(px - 8, py);
  ctx.closePath();
  ctx.fill();

  // Highlight
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.beginPath();
  ctx.moveTo(px, py - 10);
  ctx.lineTo(px + 4, py - 2);
  ctx.lineTo(px, py);
  ctx.lineTo(px - 4, py - 2);
  ctx.closePath();
  ctx.fill();

  // Sparkle
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(px - 3, py - 4, 1.5, 0, Math.PI * 2);
  ctx.fill();
}

// ─── Game State ──────────────────────────────────────────────────────────────
const game = {
  canvas: null,
  ctx: null,
  running: false,
  player: { x: 9, y: 6, dir: "down", frame: 0, moveTimer: 0 },
  currentZone: "castle",
  gems: 0,
  totalGems: 0,
  collectedGems: new Set(),
  dialogActive: false,
  dialogLines: [],
  dialogIndex: 0,
  dialogSpeaker: "",
  keys: {},
  moveDelay: 120, // ms between moves
};

// Count total gems
for (const z of Object.values(ZONES)) game.totalGems += z.gems.length;

function isWalkable(type) {
  return type === 0 || type === 3 || type === 4 || type === 5 || type === 6 || type === 8;
}

function gemKey(zone, gx, gy) {
  return `${zone}:${gx},${gy}`;
}

function getZone() {
  return ZONES[game.currentZone];
}

// ─── Input ───────────────────────────────────────────────────────────────────
window.addEventListener("keydown", (e) => {
  game.keys[e.key] = true;

  if (e.key === " ") {
    e.preventDefault();
    if (game.dialogActive) {
      game.dialogIndex++;
      if (game.dialogIndex >= game.dialogLines.length) {
        game.dialogActive = false;
        document.getElementById("dialog-box").classList.add("hidden");
      } else {
        document.getElementById("dialog-text").textContent = game.dialogLines[game.dialogIndex];
      }
    } else {
      tryTalk();
    }
  }
});

window.addEventListener("keyup", (e) => {
  game.keys[e.key] = false;
});

function tryTalk() {
  const zone = getZone();
  const p = game.player;
  for (const npc of zone.npcs) {
    const dx = Math.abs(npc.x - p.x);
    const dy = Math.abs(npc.y - p.y);
    if (dx + dy <= 2) {
      game.dialogActive = true;
      game.dialogLines = npc.dialog;
      game.dialogIndex = 0;
      game.dialogSpeaker = npc.name;
      const box = document.getElementById("dialog-box");
      box.classList.remove("hidden");
      document.getElementById("dialog-speaker").textContent = npc.name;
      document.getElementById("dialog-text").textContent = npc.dialog[0];
      return;
    }
  }
}

// ─── Update ──────────────────────────────────────────────────────────────────
function update(dt) {
  if (game.dialogActive) return;

  game.player.moveTimer -= dt;
  if (game.player.moveTimer > 0) return;

  let dx = 0, dy = 0;
  if (game.keys["ArrowUp"] || game.keys["w"] || game.keys["W"]) { dy = -1; game.player.dir = "up"; }
  else if (game.keys["ArrowDown"] || game.keys["s"] || game.keys["S"]) { dy = 1; game.player.dir = "down"; }
  else if (game.keys["ArrowLeft"] || game.keys["a"] || game.keys["A"]) { dx = -1; game.player.dir = "left"; }
  else if (game.keys["ArrowRight"] || game.keys["d"] || game.keys["D"]) { dx = 1; game.player.dir = "right"; }

  if (dx === 0 && dy === 0) return;

  const nx = game.player.x + dx;
  const ny = game.player.y + dy;
  const zone = getZone();

  // Check zone exit
  for (const exit of zone.exits) {
    if (nx === exit.x && ny === exit.y) {
      game.currentZone = exit.to;
      game.player.x = exit.spawnX;
      game.player.y = exit.spawnY;
      game.player.moveTimer = game.moveDelay;
      game.player.frame++;
      updateHUD();
      return;
    }
  }

  // Bounds & collision
  if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) return;
  const tile = zone.map[ny][nx];

  // Check NPC collision
  for (const npc of zone.npcs) {
    if (npc.x === nx && npc.y === ny) return;
  }

  if (!isWalkable(tile)) return;

  game.player.x = nx;
  game.player.y = ny;
  game.player.moveTimer = game.moveDelay;
  game.player.frame++;

  // Gem collection
  const gk = gemKey(game.currentZone, nx, ny);
  if (!game.collectedGems.has(gk)) {
    for (const g of zone.gems) {
      if (g.x === nx && g.y === ny) {
        game.collectedGems.add(gk);
        game.gems++;
        updateHUD();

        if (game.gems >= game.totalGems) {
          setTimeout(() => {
            game.dialogActive = true;
            game.dialogLines = [
              "✨ You collected all the magical gems! ✨",
              "The kingdom is restored to its full glory!",
              "The people celebrate their beloved princess!",
              "🎉 Congratulations — You completed the adventure! 🎉"
            ];
            game.dialogIndex = 0;
            game.dialogSpeaker = "✨ Kingdom Magic ✨";
            const box = document.getElementById("dialog-box");
            box.classList.remove("hidden");
            document.getElementById("dialog-speaker").textContent = game.dialogSpeaker;
            document.getElementById("dialog-text").textContent = game.dialogLines[0];
          }, 200);
        }
        break;
      }
    }
  }
}

function updateHUD() {
  document.getElementById("gems").textContent = `${game.gems} / ${game.totalGems}`;
  document.getElementById("zone-name").textContent = getZone().name;
  document.getElementById("quest-tracker").textContent =
    game.gems >= game.totalGems ? "🎉 Quest Complete!" : `🔮 Find ${game.totalGems - game.gems} more gems`;
}

// ─── Render ──────────────────────────────────────────────────────────────────
function render() {
  const { ctx } = game;
  const zone = getZone();

  // Draw tiles
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      drawTile(ctx, zone.map[y][x], x * TILE, y * TILE);
    }
  }

  // Draw uncollected gems
  for (const g of zone.gems) {
    if (!game.collectedGems.has(gemKey(game.currentZone, g.x, g.y))) {
      drawGem(ctx, g.x, g.y);
    }
  }

  // Draw NPCs
  for (const npc of zone.npcs) {
    drawNPC(ctx, npc);
  }

  // Draw princess
  drawPrincess(ctx, game.player.x, game.player.y, game.player.frame, game.player.dir);

  // Exit indicators
  for (const exit of zone.exits) {
    const pulse = Math.sin(Date.now() / 500) * 0.3 + 0.5;
    ctx.fillStyle = `rgba(255, 215, 0, ${pulse * 0.3})`;
    ctx.fillRect(exit.x * TILE, exit.y * TILE, TILE, TILE);
  }
}

// ─── Game Loop ───────────────────────────────────────────────────────────────
let lastTime = 0;
function gameLoop(timestamp) {
  if (!game.running) return;
  const dt = timestamp - lastTime;
  lastTime = timestamp;

  update(dt);
  render();
  requestAnimationFrame(gameLoop);
}

// ─── Init ────────────────────────────────────────────────────────────────────
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("hud").style.display = "flex";

  game.canvas = document.getElementById("gameCanvas");
  game.canvas.width = WIDTH;
  game.canvas.height = HEIGHT;
  game.ctx = game.canvas.getContext("2d");
  game.running = true;

  updateHUD();
  lastTime = performance.now();
  requestAnimationFrame(gameLoop);
});
