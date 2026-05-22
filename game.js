// ═══════════════════════════════════════════════════════════════════════════════
// Princess Kingdom Adventure — First-Person Raycasting Engine
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Config ──────────────────────────────────────────────────────────────────
const W = 800;
const H = 600;
const MAP_W = 24;
const MAP_H = 24;
const MOVE_SPEED = 3.0;
const ROT_SPEED = 2.5;
const MOUSE_SENS = 0.002;
const COLLISION_R = 0.25;
const INTERACT_DIST = 1.5;
const GEM_COLLECT_DIST = 0.7;

// ─── Wall types ──────────────────────────────────────────────────────────────
// 0 = empty, 1 = castle stone, 2 = castle stone dark, 3 = wood,
// 4 = tree, 5 = hedge, 6 = castle door trim, 7 = dark stone
const WALL_COLORS = {
  1: { r: 140, g: 130, b: 155 }, // castle stone
  2: { r: 100, g: 90, b: 120 },  // dark castle stone
  3: { r: 160, g: 120, b: 70 },  // wood / village buildings
  4: { r: 30, g: 90, b: 30 },    // trees
  5: { r: 50, g: 120, b: 50 },   // hedge
  6: { r: 120, g: 80, b: 50 },   // door trim
  7: { r: 60, g: 55, b: 75 },    // dark dungeon stone
};

// ─── World Map ───────────────────────────────────────────────────────────────
// Castle (top-left), Village (top-right & center), Forest (bottom)
// prettier-ignore
const worldMap = [
  [2,2,2,2,2,2,2,2,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4],
  [2,0,0,0,0,0,0,2,1,0,0,0,0,1,4,0,0,0,0,0,0,0,0,4],
  [2,0,0,0,0,0,0,2,1,0,0,0,0,1,4,0,0,0,0,0,0,0,0,4],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,1,4,0,0,4,4,0,0,0,0,4],
  [2,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,4,4,0,0,0,0,4],
  [2,0,0,0,0,0,0,2,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,4],
  [2,0,0,0,0,0,0,2,1,0,0,0,0,1,4,0,0,0,0,0,4,0,0,4],
  [2,2,2,0,0,2,2,2,1,1,0,0,1,1,4,0,0,0,0,0,0,0,0,4],
  [1,1,1,0,0,1,1,1,3,3,0,0,3,3,4,4,0,0,0,0,0,0,4,4],
  [1,0,0,0,0,0,0,3,3,0,0,0,0,3,3,0,0,0,0,0,0,0,0,4],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,4],
  [1,0,0,0,0,0,0,3,3,0,0,0,0,3,3,0,0,4,4,4,0,0,0,4],
  [1,1,1,0,0,1,1,3,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,4],
  [5,5,5,0,0,5,5,3,0,0,0,0,0,0,3,4,0,0,0,0,0,0,4,4],
  [5,0,0,0,0,0,0,3,0,0,0,0,0,0,3,4,0,0,0,0,0,0,0,4],
  [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,4],
  [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,4],
  [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
  [5,0,0,0,0,0,0,3,0,0,0,0,0,0,3,4,0,0,0,0,0,4,0,4],
  [5,0,0,0,0,0,0,3,0,0,0,0,0,0,3,4,0,0,0,0,0,0,0,4],
  [5,5,5,0,0,5,5,3,3,0,0,0,0,3,3,4,0,0,0,0,0,0,0,4],
  [5,5,5,5,5,5,5,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4],
];

// Zone detection based on player position
function getZoneName(px, py) {
  if (px < 8 && py < 8) return "הטירה המלכותית";
  if (px < 8 && py >= 8 && py < 15) return "חצר הטירה";
  if (px < 8 && py >= 15) return "הגינה המלכותית";
  if (px >= 8 && px < 15 && py >= 8) return "כיכר הכפר";
  if (px >= 8 && px < 15 && py < 8) return "שער הכפר";
  if (px >= 15) return "היער הקסום";
  return "הממלכה";
}

// ─── NPCs (sprites) ─────────────────────────────────────────────────────────
const npcs = [
  // Castle
  { x: 4, y: 2, name: "המלך אלדריק", color: "#8e44ad", symbol: "👑", size: 1.0,
    dialog: ["!ברוכה הבאה, נסיכה יקרה שלי", "הממלכה זקוקה לעזרתך.", "אורות מוזרים נראו ביער הקסום.", "!אספי את אבני החן הקסומות כדי להחזיר את השלום"] },
  { x: 2, y: 5, name: "היועצת המלכותית מירה", color: "#2980b9", symbol: "📜", size: 0.9,
    dialog: ["הוד מעלתך, אבני החן פזורות ברחבי הממלכה.", ".דברי עם התושבים — אולי הם יודעים היכן למצוא אותן"] },

  // Village
  { x: 10, y: 10, name: "האופה רוזלינד", color: "#e67e22", symbol: "🍞", size: 0.9,
    dialog: ["!אוי, נסיכה! תודה לאל שבאת", "ראיתי אבן חן נוצצת ליד הגינה.", "!היזהרי ביער — הוא מלא הפתעות"] },
  { x: 4, y: 11, name: "השומר תומס", color: "#7f8c8d", symbol: "⚔️", size: 1.0,
    dialog: ["!הוד מעלתך! השביל דרומה ליער פתוח", "שמעתי לחישות על אוצר חבוי בין העצים.", "!הישארי על השבילים ותהיי בטוחה"] },
  { x: 11, y: 14, name: "אלרה הקטנה", color: "#27ae60", symbol: "🧒", size: 0.7,
    dialog: ["!נסיכה! נסיכה! את כל כך יפה", "מצאתי אבן נוצצת אבל אמא אמרה להשאיר אותה.", "?את תמצאי את כל אבני החן הקסומות? בבקשה"] },

  // Garden
  { x: 3, y: 18, name: "הגננת פלורה", color: "#2ecc71", symbol: "🌸", size: 0.9,
    dialog: ["הגינה המלכותית מלאה בסודות!", "חפשי בין הפרחים — אבן חן מתחבאת כאן.", ".הפרחים לוחשים לי שאת בדרך הנכונה"] },

  // Forest
  { x: 19, y: 3, name: "פיית היער לומה", color: "#a569bd", symbol: "🧚", size: 0.8,
    dialog: ["!✨ ברוכה הבאה ליער הקסום, נסיכה", "העצים העתיקים מחזיקים סודות רבים.", "!אספי את כל אבני החן כדי להסיר את הצל מהארץ הזו"] },
  { x: 20, y: 19, name: "הנזיר הזקן סדריק", color: "#6e4b3a", symbol: "🧙", size: 1.0,
    dialog: ["!אה, הנסיכה מעזה להיכנס ליער העמוק", "חייתי כאן עשרות שנים, צופה ביער משתנה.", ".אספי את כולן והיער ישיר שוב"] },
];

// ─── Gems ────────────────────────────────────────────────────────────────────
const gems = [
  // Castle
  { x: 5.5, y: 4.5 },
  { x: 1.5, y: 1.5 },
  // Village
  { x: 10.5, y: 12.5 },
  { x: 4.5, y: 9.5 },
  { x: 12.5, y: 10.5 },
  // Garden
  { x: 3.5, y: 20.5 },
  { x: 1.5, y: 17.5 },
  // Forest
  { x: 16.5, y: 5.5 },
  { x: 21.5, y: 11.5 },
  { x: 19.5, y: 21.5 },
];

const collectedGems = new Set();

// ─── Player State ────────────────────────────────────────────────────────────
const player = {
  x: 4.5,
  y: 3.5,
  dir: -Math.PI / 2, // facing "north" initially; will look into room
  fov: Math.PI / 3,
};
// Start facing south (into the castle room)
player.dir = Math.PI / 2;

// ─── Input State ─────────────────────────────────────────────────────────────
const keys = {};
let pointerLocked = false;
let showMinimap = true;

// ─── Dialog State ────────────────────────────────────────────────────────────
let dialogActive = false;
let dialogLines = [];
let dialogIndex = 0;

// ─── Canvas Setup ────────────────────────────────────────────────────────────
let canvas, ctx;
let imageData, buf;
let zBuffer;

// ─── Input Handlers ──────────────────────────────────────────────────────────
window.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;

  if (e.key === " ") {
    e.preventDefault();
    if (dialogActive) {
      dialogIndex++;
      if (dialogIndex >= dialogLines.length) {
        dialogActive = false;
        document.getElementById("dialog-box").classList.add("hidden");
      } else {
        document.getElementById("dialog-text").textContent = dialogLines[dialogIndex];
      }
    } else {
      tryTalk();
    }
  }

  if (e.key.toLowerCase() === "m") {
    showMinimap = !showMinimap;
  }
});

window.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

function tryTalk() {
  for (const npc of npcs) {
    const dx = npc.x - player.x;
    const dy = npc.y - player.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < INTERACT_DIST) {
      dialogActive = true;
      dialogLines = npc.dialog;
      dialogIndex = 0;
      const box = document.getElementById("dialog-box");
      box.classList.remove("hidden");
      document.getElementById("dialog-speaker").textContent = npc.name;
      document.getElementById("dialog-text").textContent = npc.dialog[0];
      return;
    }
  }
}

// ─── Mouse Look ──────────────────────────────────────────────────────────────
function onMouseMove(e) {
  if (!pointerLocked) return;
  player.dir += e.movementX * MOUSE_SENS;
}

// ─── Movement & Collision ────────────────────────────────────────────────────
function update(dt) {
  if (dialogActive) return;

  // Rotation via keyboard
  if (keys["arrowleft"] || keys["q"]) player.dir -= ROT_SPEED * dt;
  if (keys["arrowright"] || keys["e"]) player.dir += ROT_SPEED * dt;

  // Movement
  let moveX = 0, moveY = 0;
  const cos = Math.cos(player.dir);
  const sin = Math.sin(player.dir);

  if (keys["arrowup"] || keys["w"]) { moveX += cos; moveY += sin; }
  if (keys["arrowdown"] || keys["s"]) { moveX -= cos; moveY -= sin; }

  // Strafe
  if (keys["a"]) { moveX += sin; moveY -= cos; }
  if (keys["d"]) { moveX -= sin; moveY += cos; }

  if (moveX !== 0 || moveY !== 0) {
    const len = Math.sqrt(moveX * moveX + moveY * moveY);
    moveX = (moveX / len) * MOVE_SPEED * dt;
    moveY = (moveY / len) * MOVE_SPEED * dt;

    // Separate axis collision with radius
    const nx = player.x + moveX;
    const ny = player.y + moveY;

    if (worldMap[Math.floor(player.y)][Math.floor(nx + COLLISION_R * Math.sign(moveX))] === 0) {
      player.x = nx;
    }
    if (worldMap[Math.floor(ny + COLLISION_R * Math.sign(moveY))][Math.floor(player.x)] === 0) {
      player.y = ny;
    }
  }

  // Collect gems
  for (let i = 0; i < gems.length; i++) {
    if (collectedGems.has(i)) continue;
    const dx = gems[i].x - player.x;
    const dy = gems[i].y - player.y;
    if (Math.sqrt(dx * dx + dy * dy) < GEM_COLLECT_DIST) {
      collectedGems.add(i);
      updateHUD();

      if (collectedGems.size >= gems.length) {
        setTimeout(() => {
          dialogActive = true;
          dialogLines = [
            "✨ !אספת את כל אבני החן הקסומות ✨",
            "!הממלכה שבה לתפארתה המלאה",
            "!העם חוגג את הנסיכה האהובה",
            "🎉 !כל הכבוד — סיימת את ההרפתקה 🎉",
          ];
          dialogIndex = 0;
          const box = document.getElementById("dialog-box");
          box.classList.remove("hidden");
          document.getElementById("dialog-speaker").textContent = "✨ קסם הממלכה ✨";
          document.getElementById("dialog-text").textContent = dialogLines[0];
        }, 200);
      }
    }
  }

  // Interact hint
  let nearNPC = false;
  for (const npc of npcs) {
    const dx = npc.x - player.x;
    const dy = npc.y - player.y;
    if (Math.sqrt(dx * dx + dy * dy) < INTERACT_DIST) { nearNPC = true; break; }
  }
  const hint = document.getElementById("interact-hint");
  if (nearNPC && !dialogActive) hint.classList.remove("hidden");
  else hint.classList.add("hidden");

  // Zone name
  document.getElementById("zone-name").textContent = getZoneName(player.x, player.y);
}

function updateHUD() {
  document.getElementById("gems").textContent = `${collectedGems.size} / ${gems.length}`;
}

// ─── Raycasting Renderer ────────────────────────────────────────────────────
function render() {
  const data = imageData.data;

  // Clear to black
  data.fill(0);

  // Draw ceiling and floor gradients
  for (let y = 0; y < H; y++) {
    const t = y / H;
    let r, g, b;
    if (y < H / 2) {
      // Ceiling
      const ct = 1 - (y / (H / 2));
      r = Math.floor(15 + ct * 20);
      g = Math.floor(10 + ct * 15);
      b = Math.floor(30 + ct * 40);
    } else {
      // Floor
      const ft = (y - H / 2) / (H / 2);
      r = Math.floor(20 + ft * 40);
      g = Math.floor(18 + ft * 30);
      b = Math.floor(15 + ft * 20);
    }
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * 4;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }

  // Raycasting
  zBuffer = new Float64Array(W);
  const halfFov = player.fov / 2;

  for (let x = 0; x < W; x++) {
    const cameraX = 2 * x / W - 1;
    const rayDirX = Math.cos(player.dir) + Math.cos(player.dir - Math.PI / 2) * cameraX * Math.tan(halfFov);
    const rayDirY = Math.sin(player.dir) + Math.sin(player.dir - Math.PI / 2) * cameraX * Math.tan(halfFov);

    let mapX = Math.floor(player.x);
    let mapY = Math.floor(player.y);

    const deltaDistX = Math.abs(1 / rayDirX);
    const deltaDistY = Math.abs(1 / rayDirY);

    let stepX, stepY;
    let sideDistX, sideDistY;

    if (rayDirX < 0) {
      stepX = -1;
      sideDistX = (player.x - mapX) * deltaDistX;
    } else {
      stepX = 1;
      sideDistX = (mapX + 1.0 - player.x) * deltaDistX;
    }
    if (rayDirY < 0) {
      stepY = -1;
      sideDistY = (player.y - mapY) * deltaDistY;
    } else {
      stepY = 1;
      sideDistY = (mapY + 1.0 - player.y) * deltaDistY;
    }

    // DDA
    let hit = false;
    let side = 0;
    let wallType = 1;

    while (!hit) {
      if (sideDistX < sideDistY) {
        sideDistX += deltaDistX;
        mapX += stepX;
        side = 0;
      } else {
        sideDistY += deltaDistY;
        mapY += stepY;
        side = 1;
      }
      if (mapX < 0 || mapX >= MAP_W || mapY < 0 || mapY >= MAP_H) { hit = true; wallType = 1; break; }
      if (worldMap[mapY][mapX] > 0) {
        hit = true;
        wallType = worldMap[mapY][mapX];
      }
    }

    // Perpendicular distance (fisheye correction)
    let perpWallDist;
    if (side === 0) {
      perpWallDist = (mapX - player.x + (1 - stepX) / 2) / rayDirX;
    } else {
      perpWallDist = (mapY - player.y + (1 - stepY) / 2) / rayDirY;
    }
    if (perpWallDist < 0.01) perpWallDist = 0.01;

    zBuffer[x] = perpWallDist;

    // Wall height
    const lineHeight = Math.floor(H / perpWallDist);
    let drawStart = Math.floor(-lineHeight / 2 + H / 2);
    let drawEnd = Math.floor(lineHeight / 2 + H / 2);
    if (drawStart < 0) drawStart = 0;
    if (drawEnd >= H) drawEnd = H - 1;

    // Wall color with distance shading and side darkening
    const wc = WALL_COLORS[wallType] || WALL_COLORS[1];
    const shade = Math.min(1, 1.2 / (1 + perpWallDist * 0.15));
    const sideMul = side === 1 ? 0.7 : 1.0;

    // Wall texture pattern
    let wallX;
    if (side === 0) wallX = player.y + perpWallDist * rayDirY;
    else wallX = player.x + perpWallDist * rayDirX;
    wallX -= Math.floor(wallX);

    for (let y = drawStart; y <= drawEnd; y++) {
      const idx = (y * W + x) * 4;
      // Simple "brick" pattern
      const texY = (y - (-lineHeight / 2 + H / 2)) / lineHeight;
      let patMul = 1.0;
      if (wallType === 1 || wallType === 2 || wallType === 7) {
        // Stone brick pattern
        const brickRow = Math.floor(texY * 4);
        const offset = (brickRow % 2) * 0.5;
        const brickCol = (wallX + offset) % 1.0;
        if (texY * 4 % 1 < 0.05 || brickCol < 0.03) patMul = 0.6;
      } else if (wallType === 3 || wallType === 6) {
        // Wood grain
        if (Math.abs(Math.sin(texY * 30 + wallX * 5)) < 0.1) patMul = 0.85;
      } else if (wallType === 4) {
        // Tree bark / leaves
        const n = Math.sin(texY * 20) * Math.cos(wallX * 15);
        patMul = 0.85 + n * 0.15;
      }

      data[idx] = Math.floor(wc.r * shade * sideMul * patMul);
      data[idx + 1] = Math.floor(wc.g * shade * sideMul * patMul);
      data[idx + 2] = Math.floor(wc.b * shade * sideMul * patMul);
      data[idx + 3] = 255;
    }
  }

  // ─── Sprite Rendering (NPCs + Gems) ─────────────────────────────────────
  const allSprites = [];

  for (const npc of npcs) {
    const dx = npc.x - player.x;
    const dy = npc.y - player.y;
    allSprites.push({
      x: npc.x, y: npc.y,
      dist: dx * dx + dy * dy,
      type: "npc",
      ref: npc,
    });
  }

  for (let i = 0; i < gems.length; i++) {
    if (collectedGems.has(i)) continue;
    const g = gems[i];
    const dx = g.x - player.x;
    const dy = g.y - player.y;
    allSprites.push({
      x: g.x, y: g.y,
      dist: dx * dx + dy * dy,
      type: "gem",
      ref: g,
      index: i,
    });
  }

  // Sort back to front
  allSprites.sort((a, b) => b.dist - a.dist);

  const dirX = Math.cos(player.dir);
  const dirY = Math.sin(player.dir);
  const planeX = Math.cos(player.dir - Math.PI / 2) * Math.tan(player.fov / 2);
  const planeY = Math.sin(player.dir - Math.PI / 2) * Math.tan(player.fov / 2);
  const invDet = 1.0 / (planeX * dirY - dirX * planeY);

  for (const sprite of allSprites) {
    const sx = sprite.x - player.x;
    const sy = sprite.y - player.y;

    const transformX = invDet * (dirY * sx - dirX * sy);
    const transformY = invDet * (-planeY * sx + planeX * sy);

    if (transformY <= 0.1) continue;

    const spriteScreenX = Math.floor((W / 2) * (1 + transformX / transformY));
    const spriteSize = sprite.type === "gem" ? 0.4 : (sprite.ref.size || 1.0);
    const spriteHeight = Math.abs(Math.floor(H / transformY * spriteSize));
    const spriteWidth = spriteHeight;

    const drawStartY = Math.floor(-spriteHeight / 2 + H / 2);
    const drawEndY = drawStartY + spriteHeight;
    const drawStartX = Math.floor(spriteScreenX - spriteWidth / 2);
    const drawEndX = drawStartX + spriteWidth;

    const shade = Math.min(1, 1.5 / (1 + transformY * 0.12));

    if (sprite.type === "npc") {
      drawNPCSprite(data, sprite.ref, drawStartX, drawEndX, drawStartY, drawEndY, spriteWidth, spriteHeight, transformY, shade);
    } else {
      drawGemSprite(data, drawStartX, drawEndX, drawStartY, drawEndY, spriteWidth, spriteHeight, transformY, shade);
    }
  }

  ctx.putImageData(imageData, 0, 0);

  // ─── Minimap ─────────────────────────────────────────────────────────────
  if (showMinimap) {
    drawMinimap();
  }
}

// ─── NPC Sprite Drawing ─────────────────────────────────────────────────────
function drawNPCSprite(data, npc, startX, endX, startY, endY, sw, sh, depth, shade) {
  const bodyColor = hexToRGB(npc.color);

  for (let x = startX; x < endX; x++) {
    if (x < 0 || x >= W) continue;
    if (depth >= zBuffer[x]) continue;

    const tx = (x - startX) / sw;

    for (let y = startY; y < endY; y++) {
      if (y < 0 || y >= H) continue;

      const ty = (y - startY) / sh;
      const idx = (y * W + x) * 4;

      // Simple humanoid shape
      const cx = tx - 0.5;
      const cy = ty - 0.5;

      // Head (top portion)
      if (ty < 0.35) {
        const hx = cx;
        const hy = (ty - 0.18);
        if (hx * hx + hy * hy < 0.025) {
          // Head - skin color
          data[idx] = Math.floor(240 * shade);
          data[idx + 1] = Math.floor(200 * shade);
          data[idx + 2] = Math.floor(170 * shade);
          data[idx + 3] = 255;
        }
      }
      // Body
      else if (ty < 0.75 && Math.abs(cx) < 0.2) {
        data[idx] = Math.floor(bodyColor.r * shade);
        data[idx + 1] = Math.floor(bodyColor.g * shade);
        data[idx + 2] = Math.floor(bodyColor.b * shade);
        data[idx + 3] = 255;
      }
      // Legs
      else if (ty >= 0.75 && ty < 0.95) {
        if ((cx > -0.15 && cx < -0.03) || (cx > 0.03 && cx < 0.15)) {
          data[idx] = Math.floor(bodyColor.r * shade * 0.7);
          data[idx + 1] = Math.floor(bodyColor.g * shade * 0.7);
          data[idx + 2] = Math.floor(bodyColor.b * shade * 0.7);
          data[idx + 3] = 255;
        }
      }
    }
  }
}

// ─── Gem Sprite Drawing ─────────────────────────────────────────────────────
function drawGemSprite(data, startX, endX, startY, endY, sw, sh, depth, shade) {
  const pulse = Math.sin(Date.now() / 300) * 0.2 + 0.8;

  for (let x = startX; x < endX; x++) {
    if (x < 0 || x >= W) continue;
    if (depth >= zBuffer[x]) continue;

    const tx = (x - startX) / sw - 0.5;

    for (let y = startY; y < endY; y++) {
      if (y < 0 || y >= H) continue;

      const ty = (y - startY) / sh - 0.5;

      // Diamond shape
      if (Math.abs(tx) + Math.abs(ty) < 0.35) {
        const idx = (y * W + x) * 4;
        const highlight = (tx < 0 && ty < 0) ? 1.3 : 1.0;
        data[idx] = Math.floor(Math.min(255, 80 * shade * pulse * highlight));
        data[idx + 1] = Math.floor(Math.min(255, 180 * shade * pulse * highlight));
        data[idx + 2] = Math.floor(Math.min(255, 255 * shade * pulse * highlight));
        data[idx + 3] = 255;
      }
    }
  }
}

// ─── Minimap ─────────────────────────────────────────────────────────────────
function drawMinimap() {
  const mapSize = 5;
  const mmX = W - MAP_W * mapSize - 10;
  const mmY = 10;

  ctx.globalAlpha = 0.7;
  ctx.fillStyle = "#000";
  ctx.fillRect(mmX - 2, mmY - 2, MAP_W * mapSize + 4, MAP_H * mapSize + 4);

  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      const tile = worldMap[y][x];
      if (tile === 0) {
        ctx.fillStyle = "#1a1a2a";
      } else {
        const wc = WALL_COLORS[tile];
        ctx.fillStyle = `rgb(${wc.r},${wc.g},${wc.b})`;
      }
      ctx.fillRect(mmX + x * mapSize, mmY + y * mapSize, mapSize, mapSize);
    }
  }

  // Gems on minimap
  for (let i = 0; i < gems.length; i++) {
    if (collectedGems.has(i)) continue;
    ctx.fillStyle = "#5dade2";
    ctx.fillRect(mmX + gems[i].x * mapSize - 1, mmY + gems[i].y * mapSize - 1, 3, 3);
  }

  // NPCs on minimap
  for (const npc of npcs) {
    ctx.fillStyle = "#ffd700";
    ctx.fillRect(mmX + npc.x * mapSize - 1, mmY + npc.y * mapSize - 1, 3, 3);
  }

  // Player on minimap
  ctx.fillStyle = "#ff4444";
  const px = mmX + player.x * mapSize;
  const py = mmY + player.y * mapSize;
  ctx.beginPath();
  ctx.arc(px, py, 3, 0, Math.PI * 2);
  ctx.fill();

  // Direction line
  ctx.strokeStyle = "#ff4444";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.lineTo(px + Math.cos(player.dir) * 8, py + Math.sin(player.dir) * 8);
  ctx.stroke();

  ctx.globalAlpha = 1;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function hexToRGB(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

// ─── Game Loop ───────────────────────────────────────────────────────────────
let lastTime = 0;

function gameLoop(timestamp) {
  const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
  lastTime = timestamp;

  update(dt);
  render();
  requestAnimationFrame(gameLoop);
}

// ─── Init ────────────────────────────────────────────────────────────────────
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("hud").style.display = "flex";
  document.getElementById("crosshair").style.display = "block";

  canvas = document.getElementById("gameCanvas");
  canvas.width = W;
  canvas.height = H;
  ctx = canvas.getContext("2d");
  imageData = ctx.createImageData(W, H);

  // Pointer lock for mouse look
  canvas.addEventListener("click", () => {
    canvas.requestPointerLock();
  });
  document.addEventListener("pointerlockchange", () => {
    pointerLocked = document.pointerLockElement === canvas;
  });
  document.addEventListener("mousemove", onMouseMove);

  updateHUD();
  document.getElementById("zone-name").textContent = getZoneName(player.x, player.y);

  lastTime = performance.now();
  requestAnimationFrame(gameLoop);
});
