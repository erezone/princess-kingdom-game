// ═══════════════════════════════════════════════════════════════════════════════
// Princess Kingdom Adventure — Three.js 3D First-Person Engine
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Config ──────────────────────────────────────────────────────────────────
const MOVE_SPEED = 5.0;
const MOUSE_SENS = 0.002;
const COLLISION_R = 0.3;
const INTERACT_DIST = 2.5;
const GEM_COLLECT_DIST = 1.0;
const WALL_HEIGHT = 3.0;
const MAP_W = 24;
const MAP_H = 24;

// ─── World Map ───────────────────────────────────────────────────────────────
// 0=empty  1=castle_stone  2=dark_stone  3=wood  4=tree  5=hedge  6=brick  7=dungeon
// prettier-ignore
const worldMap = [
  [2,2,2,2,2,2,2,2,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4],
  [2,0,0,0,0,0,0,2,1,0,0,0,0,1,4,0,0,0,0,0,0,0,0,4],
  [2,0,0,0,0,0,0,2,1,0,0,0,0,1,4,0,0,0,0,0,0,0,0,4],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,1,4,0,0,4,4,0,0,0,0,4],
  [2,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,4,4,0,0,0,0,4],
  [2,0,0,0,0,0,0,2,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,4],
  [2,0,0,0,0,0,0,2,1,0,0,0,0,1,4,0,0,0,0,0,4,0,0,4],
  [2,2,2,0,0,2,2,2,1,1,0,0,1,1,4,4,0,0,0,0,0,0,4,4],
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

function getZoneName(px, py) {
  if (px < 8 && py < 8) return "הטירה המלכותית";
  if (px < 8 && py >= 8 && py < 15) return "חצר הטירה";
  if (px < 8 && py >= 15) return "הגינה המלכותית";
  if (px >= 8 && px < 15 && py >= 8) return "כיכר הכפר";
  if (px >= 8 && px < 15 && py < 8) return "שער הכפר";
  if (px >= 15) return "היער הקסום";
  return "הממלכה";
}

// ─── Wall Materials ──────────────────────────────────────────────────────────
const WALL_DEFS = {
  1: { color: 0x8a8299, name: "castle_stone" },
  2: { color: 0x5a5070, name: "dark_stone" },
  3: { color: 0x9a7040, name: "wood" },
  4: { color: 0x2a6a2a, name: "tree" },
  5: { color: 0x3a7a3a, name: "hedge" },
  6: { color: 0x8a5535, name: "brick" },
  7: { color: 0x3a3548, name: "dungeon" },
};

// ─── NPCs ────────────────────────────────────────────────────────────────────
const npcDefs = [
  { x: 4, z: 2, name: "המלך אלדריק", bodyColor: 0x6a1b9a, capeColor: 0x8e24aa, height: 1.8,
    dialog: ["ברוכה הבאה, בתי הנסיכה היקרה!", "הממלכה שלנו זקוקה לעזרתך.", "תושבי הכפר מספרים על אורות מוזרים ביער הקסום.", "אני מבקש ממך לאסוף את אבני החן הקסומות ולהחזיר את השלום לממלכה."] },
  { x: 2, z: 5, name: "היועצת המלכותית מירה", bodyColor: 0x1565c0, capeColor: 0x1976d2, height: 1.7,
    dialog: ["הוד מעלתך, אבני החן פזורות בכל רחבי הממלכה.", "כדאי לך לדבר עם התושבים, אולי הם יוכלו לעזור לך למצוא אותן."] },
  { x: 10, z: 10, name: "האופה רוזלינד", bodyColor: 0xd4a054, capeColor: 0xe8c170, height: 1.6,
    dialog: ["אוי, נסיכה! איזה כבוד! טוב שבאת!", "ראיתי אבן חן נוצצת ליד הגינה, היא בערה באור כחול.", "היזהרי אם את הולכת ליער, הוא מלא בהפתעות."] },
  { x: 4, z: 11, name: "השומר תומס", bodyColor: 0x546e7a, capeColor: 0x78909c, height: 1.9,
    dialog: ["הוד מעלתך! השביל שמוביל דרומה אל היער פתוח.", "שמעתי שמועות על אוצרות חבויים בין העצים.", "אם תישארי על השבילים, תהיי בטוחה."] },
  { x: 11, z: 14, name: "אלרה הקטנה", bodyColor: 0x43a047, capeColor: 0x66bb6a, height: 1.2,
    dialog: ["נסיכה! נסיכה! שלום! את כל כך יפה!", "מצאתי אבן נוצצת אבל אמא שלי אמרה לי לא לגעת.", "בבקשה, תמצאי את כל אבני החן הקסומות!"] },
  { x: 3, z: 18, name: "הגננת פלורה", bodyColor: 0x2e7d32, capeColor: 0x4caf50, height: 1.65,
    dialog: ["שלום נסיכה! הגינה המלכותית מלאה בסודות.", "כדאי לך לחפש בין הפרחים, אני חושבת שאבן חן מתחבאת פה.", "הפרחים לוחשים לי שאת בדרך הנכונה!"] },
  { x: 19, z: 3, name: "פיית היער לומה", bodyColor: 0x7b1fa2, capeColor: 0xce93d8, height: 1.4,
    dialog: ["ברוכה הבאה ליער הקסום, נסיכה יקרה!", "העצים העתיקים האלה שומרים על סודות רבים.", "אם תאספי את כל אבני החן, הצל הכבד ייעלם מהארץ הזו."] },
  { x: 20, z: 19, name: "הנזיר הזקן סדריק", bodyColor: 0x4e342e, capeColor: 0x6d4c41, height: 1.75,
    dialog: ["הנסיכה בכבודה ובעצמה מגיעה ליער העמוק!", "אני חי כאן כבר עשרות שנים, וצופה ביער משתנה.", "אספי את כל האבנים, ואז היער ישיר שוב."] },
];

// ─── Gems ────────────────────────────────────────────────────────────────────
const gemDefs = [
  { x: 5.5, z: 4.5 }, { x: 1.5, z: 1.5 },
  { x: 10.5, z: 12.5 }, { x: 4.5, z: 9.5 }, { x: 12.5, z: 10.5 },
  { x: 3.5, z: 20.5 }, { x: 1.5, z: 17.5 },
  { x: 16.5, z: 5.5 }, { x: 21.5, z: 11.5 }, { x: 19.5, z: 21.5 },
];

const collectedGems = new Set();

// ─── Three.js Globals ────────────────────────────────────────────────────────
let scene, camera, renderer;
let clock;
const keys = {};
let pointerLocked = false;
let yaw = Math.PI / 2; // facing south into castle
let pitch = 0;
let showMinimap = true;
let dialogActive = false;
let dialogLines = [];
let dialogIndex = 0;

// ─── Text-to-Speech ──────────────────────────────────────────────────────────
let ttsVoice = null;

function initTTS() {
  const pickVoice = () => {
    const voices = speechSynthesis.getVoices();
    // Prefer Hebrew voice
    ttsVoice = voices.find(v => v.lang.startsWith("he")) || null;
    if (!ttsVoice) {
      // Fallback: any voice that can handle Hebrew
      ttsVoice = voices.find(v => v.lang.startsWith("he-IL")) || voices[0] || null;
    }
  };
  pickVoice();
  speechSynthesis.addEventListener("voiceschanged", pickVoice);
}

function speak(text) {
  // Cancel any ongoing speech
  speechSynthesis.cancel();

  // Use niqqud version if available for better pronunciation
  const ttsText = niqqudMap[text] || text;

  // Strip emojis for cleaner speech
  const clean = ttsText.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}✨🎉]/gu, "").trim();
  if (!clean) return;

  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.lang = "he-IL";
  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  if (ttsVoice) utterance.voice = ttsVoice;
  speechSynthesis.speak(utterance);
}

// ─── Niqqud map: display text → vowelized text for TTS ───────────────────────
const niqqudMap = {
  // המלך אלדריק
  "ברוכה הבאה, בתי הנסיכה היקרה!": "בְּרוּכָה הַבָּאָה, בִּתִּי הַנְּסִיכָה הַיְּקָרָה!",
  "הממלכה שלנו זקוקה לעזרתך.": "הַמַּמְלָכָה שֶׁלָּנוּ זְקוּקָה לְעֶזְרָתֵךְ.",
  "תושבי הכפר מספרים על אורות מוזרים ביער הקסום.": "תּוֹשְׁבֵי הַכְּפָר מְסַפְּרִים עַל אוֹרוֹת מוּזָרִים בַּיַּעַר הַקָּסוּם.",
  "אני מבקש ממך לאסוף את אבני החן הקסומות ולהחזיר את השלום לממלכה.": "אֲנִי מְבַקֵּשׁ מִמֵּךְ לֶאֱסוֹף אֶת אַבְנֵי הַחֵן הַקְּסוּמוֹת וּלְהַחֲזִיר אֶת הַשָּׁלוֹם לַמַּמְלָכָה.",

  // היועצת מירה
  "הוד מעלתך, אבני החן פזורות בכל רחבי הממלכה.": "הוֹד מַעֲלָתֵךְ, אַבְנֵי הַחֵן פְּזוּרוֹת בְּכָל רַחֲבֵי הַמַּמְלָכָה.",
  "כדאי לך לדבר עם התושבים, אולי הם יוכלו לעזור לך למצוא אותן.": "כְּדַאי לָךְ לְדַבֵּר עִם הַתּוֹשָׁבִים, אוּלַי הֵם יוּכְלוּ לַעֲזוֹר לָךְ לִמְצוֹא אוֹתָן.",

  // האופה רוזלינד
  "אוי, נסיכה! איזה כבוד! טוב שבאת!": "אוֹי, נְסִיכָה! אֵיזֶה כָּבוֹד! טוֹב שֶׁבָּאת!",
  "ראיתי אבן חן נוצצת ליד הגינה, היא בערה באור כחול.": "רָאִיתִי אֶבֶן חֵן נוֹצֶצֶת לְיַד הַגִּנָּה, הִיא בָּעֲרָה בְּאוֹר כָּחוֹל.",
  "היזהרי אם את הולכת ליער, הוא מלא בהפתעות.": "הִזָּהֲרִי אִם אַתְּ הוֹלֶכֶת לַיַּעַר, הוּא מָלֵא בְּהַפְתָּעוֹת.",

  // השומר תומס
  "הוד מעלתך! השביל שמוביל דרומה אל היער פתוח.": "הוֹד מַעֲלָתֵךְ! הַשְּׁבִיל שֶׁמּוֹבִיל דָּרוֹמָה אֶל הַיַּעַר פָּתוּחַ.",
  "שמעתי שמועות על אוצרות חבויים בין העצים.": "שָׁמַעְתִּי שְׁמוּעוֹת עַל אוֹצָרוֹת חֲבוּיִים בֵּין הָעֵצִים.",
  "אם תישארי על השבילים, תהיי בטוחה.": "אִם תִּשָּׁאֲרִי עַל הַשְּׁבִילִים, תִּהְיִי בְּטוּחָה.",

  // אלרה הקטנה
  "נסיכה! נסיכה! שלום! את כל כך יפה!": "נְסִיכָה! נְסִיכָה! שָׁלוֹם! אַתְּ כָּל כָּךְ יָפָה!",
  "מצאתי אבן נוצצת אבל אמא שלי אמרה לי לא לגעת.": "מָצָאתִי אֶבֶן נוֹצֶצֶת אֲבָל אִמָּא שֶׁלִּי אָמְרָה לִי לֹא לָגַעַת.",
  "בבקשה, תמצאי את כל אבני החן הקסומות!": "בְּבַקָּשָׁה, תִּמְצְאִי אֶת כָּל אַבְנֵי הַחֵן הַקְּסוּמוֹת!",

  // הגננת פלורה
  "שלום נסיכה! הגינה המלכותית מלאה בסודות.": "שָׁלוֹם נְסִיכָה! הַגִּנָּה הַמַּלְכוּתִית מְלֵאָה בְּסוֹדוֹת.",
  "כדאי לך לחפש בין הפרחים, אני חושבת שאבן חן מתחבאת פה.": "כְּדַאי לָךְ לְחַפֵּשׂ בֵּין הַפְּרָחִים, אֲנִי חוֹשֶׁבֶת שֶׁאֶבֶן חֵן מִתְחַבֵּאת פֹּה.",
  "הפרחים לוחשים לי שאת בדרך הנכונה!": "הַפְּרָחִים לוֹחֲשִׁים לִי שֶׁאַתְּ בַּדֶּרֶךְ הַנְּכוֹנָה!",

  // פיית היער לומה
  "ברוכה הבאה ליער הקסום, נסיכה יקרה!": "בְּרוּכָה הַבָּאָה לַיַּעַר הַקָּסוּם, נְסִיכָה יְקָרָה!",
  "העצים העתיקים האלה שומרים על סודות רבים.": "הָעֵצִים הָעַתִּיקִים הָאֵלֶּה שׁוֹמְרִים עַל סוֹדוֹת רַבִּים.",
  "אם תאספי את כל אבני החן, הצל הכבד ייעלם מהארץ הזו.": "אִם תַּאַסְפִי אֶת כָּל אַבְנֵי הַחֵן, הַצֵּל הַכָּבֵד יֵיעָלֵם מֵהָאָרֶץ הַזּוֹ.",

  // הנזיר סדריק
  "הנסיכה בכבודה ובעצמה מגיעה ליער העמוק!": "הַנְּסִיכָה בִּכְבוֹדָהּ וּבְעַצְמָהּ מַגִּיעָה לַיַּעַר הֶעָמוֹק!",
  "אני חי כאן כבר עשרות שנים, וצופה ביער משתנה.": "אֲנִי חַי כָּאן כְּבָר עֲשָׂרוֹת שָׁנִים, וְצוֹפֶה בַּיַּעַר מִשְׁתַּנֶּה.",
  "אספי את כל האבנים, ואז היער ישיר שוב.": "אִסְפִי אֶת כָּל הָאֲבָנִים, וְאָז הַיַּעַר יָשִׁיר שׁוּב.",

  // ניצחון
  "הצלחת לאסוף את כל אבני החן הקסומות!": "הִצְלַחַתְּ לֶאֱסוֹף אֶת כָּל אַבְנֵי הַחֵן הַקְּסוּמוֹת!",
  "הממלכה חוזרת לתפארתה, והאור שב לזרוח בכל מקום.": "הַמַּמְלָכָה חוֹזֶרֶת לְתִפְאַרְתָּהּ, וְהָאוֹר שָׁב לִזְרוֹחַ בְּכָל מָקוֹם.",
  "כל תושבי הממלכה חוגגים את הנסיכה האמיצה שלהם!": "כָּל תּוֹשְׁבֵי הַמַּמְלָכָה חוֹגְגִים אֶת הַנְּסִיכָה הָאַמִּיצָה שֶׁלָּהֶם!",
  "כל הכבוד! סיימת את ההרפתקה בהצלחה!": "כָּל הַכָּבוֹד! סִיַּמְתְּ אֶת הָהַרְפַּתְקָה בְּהַצְלָחָה!",
};

const npcMeshes = [];
const gemMeshes = [];
const gemLights = [];
let torchLights = [];

// ─── Texture Generation ─────────────────────────────────────────────────────
function generateTexture(type, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (type === "castle_stone" || type === "dark_stone") {
    const base = type === "dark_stone" ? [70, 60, 85] : [120, 115, 135];
    ctx.fillStyle = `rgb(${base[0]},${base[1]},${base[2]})`;
    ctx.fillRect(0, 0, width, height);

    // Brick pattern
    const brickH = height / 6;
    const brickW = width / 3;
    ctx.strokeStyle = `rgba(0,0,0,0.4)`;
    ctx.lineWidth = 2;
    for (let row = 0; row < 6; row++) {
      const y = row * brickH;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      const offset = (row % 2) * brickW / 2;
      for (let col = 0; col <= 4; col++) {
        const x = col * brickW + offset;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + brickH); ctx.stroke();
      }
    }

    // Noise
    for (let i = 0; i < 800; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const v = Math.random() * 30 - 15;
      ctx.fillStyle = `rgba(${v > 0 ? 255 : 0},${v > 0 ? 255 : 0},${v > 0 ? 255 : 0},${Math.abs(v) / 100})`;
      ctx.fillRect(x, y, 2, 2);
    }
  } else if (type === "wood") {
    ctx.fillStyle = "#8a6030";
    ctx.fillRect(0, 0, width, height);

    // Wood grain
    for (let i = 0; i < 12; i++) {
      const y = Math.random() * height;
      ctx.strokeStyle = `rgba(60,35,10,${0.2 + Math.random() * 0.3})`;
      ctx.lineWidth = 1 + Math.random() * 2;
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x < width; x += 10) {
        ctx.lineTo(x, y + Math.sin(x * 0.05) * 3);
      }
      ctx.stroke();
    }

    // Planks
    const plankW = width / 4;
    ctx.strokeStyle = "rgba(0,0,0,0.3)";
    ctx.lineWidth = 2;
    for (let i = 1; i < 4; i++) {
      ctx.beginPath(); ctx.moveTo(i * plankW, 0); ctx.lineTo(i * plankW, height); ctx.stroke();
    }
  } else if (type === "tree") {
    ctx.fillStyle = "#2a5a2a";
    ctx.fillRect(0, 0, width, height);

    // Bark texture
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      ctx.strokeStyle = `rgba(20,40,15,${0.3 + Math.random() * 0.4})`;
      ctx.lineWidth = 2 + Math.random() * 4;
      ctx.beginPath(); ctx.moveTo(x, 0);
      for (let y = 0; y < height; y += 8) {
        ctx.lineTo(x + Math.sin(y * 0.1) * 5, y);
      }
      ctx.stroke();
    }

    // Leaf patches
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height * 0.6;
      const g = 80 + Math.random() * 80;
      ctx.fillStyle = `rgba(30,${g},20,0.5)`;
      ctx.beginPath();
      ctx.arc(x, y, 4 + Math.random() * 8, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === "hedge") {
    ctx.fillStyle = "#3a6a35";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 60; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const g = 70 + Math.random() * 90;
      ctx.fillStyle = `rgba(25,${g},20,0.6)`;
      ctx.beginPath();
      ctx.arc(x, y, 3 + Math.random() * 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Small flowers
    for (let i = 0; i < 8; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      ctx.fillStyle = ["#ff9999","#ffcc66","#cc99ff","#ff6699"][i % 4];
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    ctx.fillStyle = "#666";
    ctx.fillRect(0, 0, width, height);
  }

  return new THREE.CanvasTexture(canvas);
}

function generateFloorTexture(type) {
  const s = 256;
  const canvas = document.createElement("canvas");
  canvas.width = s; canvas.height = s;
  const ctx = canvas.getContext("2d");

  if (type === "castle") {
    ctx.fillStyle = "#4a4050";
    ctx.fillRect(0, 0, s, s);
    const tileSize = s / 4;
    ctx.strokeStyle = "rgba(0,0,0,0.3)";
    ctx.lineWidth = 2;
    for (let i = 0; i <= 4; i++) {
      ctx.beginPath(); ctx.moveTo(i * tileSize, 0); ctx.lineTo(i * tileSize, s); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * tileSize); ctx.lineTo(s, i * tileSize); ctx.stroke();
    }
    for (let i = 0; i < 500; i++) {
      ctx.fillStyle = `rgba(${Math.random() > 0.5 ? 255 : 0},${Math.random() > 0.5 ? 255 : 0},${Math.random() > 0.5 ? 255 : 0},0.03)`;
      ctx.fillRect(Math.random() * s, Math.random() * s, 2, 2);
    }
  } else if (type === "grass") {
    ctx.fillStyle = "#3a6630";
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * s;
      const y = Math.random() * s;
      const g = 70 + Math.random() * 60;
      ctx.strokeStyle = `rgba(30,${g},25,0.5)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + (Math.random() - 0.5) * 3, y - 3 - Math.random() * 4);
      ctx.stroke();
    }
  } else if (type === "dirt") {
    ctx.fillStyle = "#5a4a35";
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 400; i++) {
      const v = Math.random() * 40 - 20;
      ctx.fillStyle = `rgba(${90 + v},${75 + v},${55 + v},0.4)`;
      ctx.fillRect(Math.random() * s, Math.random() * s, 2 + Math.random() * 3, 2 + Math.random() * 3);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// ─── Scene Building ──────────────────────────────────────────────────────────
function buildScene() {
  // Generate wall textures
  const wallTextures = {};
  for (const [id, def] of Object.entries(WALL_DEFS)) {
    const tex = generateTexture(def.name, 256, 256);
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    wallTextures[id] = tex;
  }

  // Build walls as box geometries with textures
  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      const tile = worldMap[y][x];
      if (tile === 0) continue;

      const def = WALL_DEFS[tile];
      const tex = wallTextures[tile];

      let h = WALL_HEIGHT;
      // Trees are taller
      if (tile === 4) h = WALL_HEIGHT * 1.8;

      const geo = new THREE.BoxGeometry(1, h, 1);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.85,
        metalness: 0.05,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x + 0.5, h / 2, y + 0.5);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);

      // Add top foliage for trees
      if (tile === 4) {
        const foliageGeo = new THREE.SphereGeometry(0.7, 6, 5);
        const foliageMat = new THREE.MeshStandardMaterial({
          color: 0x2d7a2d,
          roughness: 0.9,
        });
        const foliage = new THREE.Mesh(foliageGeo, foliageMat);
        foliage.position.set(x + 0.5, h + 0.3, y + 0.5);
        foliage.castShadow = true;
        scene.add(foliage);
      }
    }
  }

  // Floor - different materials per zone
  const floorMaterials = {
    castle: new THREE.MeshStandardMaterial({ map: generateFloorTexture("castle"), roughness: 0.7 }),
    grass: new THREE.MeshStandardMaterial({ map: generateFloorTexture("grass"), roughness: 0.95 }),
    dirt: new THREE.MeshStandardMaterial({ map: generateFloorTexture("dirt"), roughness: 0.9 }),
  };

  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      if (worldMap[y][x] !== 0) continue;

      let floorType = "grass";
      if (x < 8 && y < 8) floorType = "castle";
      else if (x >= 8 && x < 15 && y >= 8 && y < 15) floorType = "dirt";

      const geo = new THREE.PlaneGeometry(1, 1);
      const mesh = new THREE.Mesh(geo, floorMaterials[floorType]);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(x + 0.5, 0, y + 0.5);
      mesh.receiveShadow = true;
      scene.add(mesh);
    }
  }

  // Ceiling for castle area
  const ceilMat = new THREE.MeshStandardMaterial({ color: 0x2a2035, roughness: 0.9 });
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (worldMap[y][x] !== 0) continue;
      const geo = new THREE.PlaneGeometry(1, 1);
      const mesh = new THREE.Mesh(geo, ceilMat);
      mesh.rotation.x = Math.PI / 2;
      mesh.position.set(x + 0.5, WALL_HEIGHT, y + 0.5);
      scene.add(mesh);
    }
  }

  // ─── Lighting ────────────────────────────────────────────────────────────
  // Ambient
  const ambient = new THREE.AmbientLight(0x404060, 0.4);
  scene.add(ambient);

  // Hemisphere light (sky/ground)
  const hemi = new THREE.HemisphereLight(0x8899cc, 0x443322, 0.5);
  scene.add(hemi);

  // Directional sun
  const sun = new THREE.DirectionalLight(0xffeedd, 0.8);
  sun.position.set(15, 20, 10);
  sun.castShadow = true;
  sun.shadow.mapSize.width = 2048;
  sun.shadow.mapSize.height = 2048;
  sun.shadow.camera.left = -25;
  sun.shadow.camera.right = 25;
  sun.shadow.camera.top = 25;
  sun.shadow.camera.bottom = -25;
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 50;
  scene.add(sun);

  // Torch lights in castle
  const torchPositions = [
    [3.5, 2, 1.5], [6.5, 2, 1.5], [1.5, 2, 4], [6.5, 2, 6],
  ];
  for (const pos of torchPositions) {
    const light = new THREE.PointLight(0xff8833, 1.2, 6);
    light.position.set(pos[0], pos[1], pos[2]);
    scene.add(light);
    torchLights.push(light);

    // Flame visual
    const flameGeo = new THREE.SphereGeometry(0.06, 4, 4);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xff6600 });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.copy(light.position);
    scene.add(flame);
  }

  // ─── Fog ─────────────────────────────────────────────────────────────────
  scene.fog = new THREE.FogExp2(0x0a0a15, 0.04);

  // ─── Sky ─────────────────────────────────────────────────────────────────
  scene.background = new THREE.Color(0x0a0a1a);

  // ─── NPCs ────────────────────────────────────────────────────────────────
  for (const npc of npcDefs) {
    const group = new THREE.Group();

    const h = npc.height;
    const bodyH = h * 0.45;
    const headR = h * 0.12;
    const legH = h * 0.25;

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.06, 0.08, legH, 6);
    const legMat = new THREE.MeshStandardMaterial({ color: npc.bodyColor, roughness: 0.7 });
    const legL = new THREE.Mesh(legGeo, legMat);
    legL.position.set(-0.1, legH / 2, 0);
    legL.castShadow = true;
    group.add(legL);
    const legR = new THREE.Mesh(legGeo, legMat);
    legR.position.set(0.1, legH / 2, 0);
    legR.castShadow = true;
    group.add(legR);

    // Body
    const bodyGeo = new THREE.CylinderGeometry(0.18, 0.22, bodyH, 8);
    const bodyMat = new THREE.MeshStandardMaterial({ color: npc.bodyColor, roughness: 0.6 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(0, legH + bodyH / 2, 0);
    body.castShadow = true;
    group.add(body);

    // Cape / shoulders
    const capeGeo = new THREE.CylinderGeometry(0.22, 0.28, bodyH * 0.5, 8);
    const capeMat = new THREE.MeshStandardMaterial({ color: npc.capeColor, roughness: 0.5 });
    const cape = new THREE.Mesh(capeGeo, capeMat);
    cape.position.set(0, legH + bodyH * 0.7, 0);
    cape.castShadow = true;
    group.add(cape);

    // Head
    const headGeo = new THREE.SphereGeometry(headR, 8, 8);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xf0d0b0, roughness: 0.7 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.set(0, legH + bodyH + headR, 0);
    head.castShadow = true;
    group.add(head);

    // Eyes
    const eyeGeo = new THREE.SphereGeometry(0.02, 4, 4);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x222222 });
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(-0.04, legH + bodyH + headR, headR * 0.85);
    group.add(eyeL);
    const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
    eyeR.position.set(0.04, legH + bodyH + headR, headR * 0.85);
    group.add(eyeR);

    // Exclamation mark (floating)
    const markerGeo = new THREE.SphereGeometry(0.08, 6, 6);
    const markerMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
    const marker = new THREE.Mesh(markerGeo, markerMat);
    marker.position.set(0, h + 0.4, 0);
    marker.name = "marker";
    group.add(marker);

    group.position.set(npc.x + 0.5, 0, npc.z + 0.5);
    scene.add(group);
    npcMeshes.push(group);
  }

  // ─── Gems ────────────────────────────────────────────────────────────────
  for (let i = 0; i < gemDefs.length; i++) {
    const g = gemDefs[i];

    const group = new THREE.Group();

    // Real diamond shape using custom BufferGeometry
    // Top: wide crown with 8 facets tapering to a point at top
    // Bottom: inverted point (pavilion)
    const diamondGeo = new THREE.BufferGeometry();
    const r = 0.3;      // radius at widest (girdle)
    const topH = 0.25;  // crown height
    const botH = 0.45;  // pavilion depth
    const sides = 8;

    const vertices = [];
    const topPoint = [0, topH, 0];
    const botPoint = [0, -botH, 0];

    // Girdle vertices (ring at y=0)
    const girdle = [];
    for (let s = 0; s < sides; s++) {
      const angle = (s / sides) * Math.PI * 2;
      girdle.push([Math.cos(angle) * r, 0, Math.sin(angle) * r]);
    }

    // Crown triangles (top point to girdle)
    for (let s = 0; s < sides; s++) {
      const next = (s + 1) % sides;
      vertices.push(...topPoint, ...girdle[s], ...girdle[next]);
    }

    // Pavilion triangles (bottom point to girdle, wound opposite)
    for (let s = 0; s < sides; s++) {
      const next = (s + 1) % sides;
      vertices.push(...botPoint, ...girdle[next], ...girdle[s]);
    }

    diamondGeo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    diamondGeo.computeVertexNormals();

    const gemMat = new THREE.MeshPhysicalMaterial({
      color: 0x44ccff,
      emissive: 0x1166aa,
      emissiveIntensity: 0.6,
      roughness: 0.05,
      metalness: 0.3,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transparent: true,
      opacity: 0.85,
    });

    const diamond = new THREE.Mesh(diamondGeo, gemMat);
    diamond.scale.set(1.2, 1.2, 1.2);
    group.add(diamond);

    // Inner glow sphere
    const glowGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x88ddff,
      transparent: true,
      opacity: 0.4,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    group.add(glowMesh);

    group.position.set(g.x, 1.0, g.z);
    scene.add(group);
    gemMeshes.push(group);

    // Point light for gem glow
    const glow = new THREE.PointLight(0x4488ff, 1.2, 5);
    glow.position.set(g.x, 1.0, g.z);
    scene.add(glow);
    gemLights.push(glow);
  }
}

// ─── Input ───────────────────────────────────────────────────────────────────
window.addEventListener("keydown", (e) => {
  keys[e.code] = true;

  if (e.code === "Space") {
    e.preventDefault();
    if (dialogActive) {
      dialogIndex++;
      if (dialogIndex >= dialogLines.length) {
        dialogActive = false;
        document.getElementById("dialog-box").classList.add("hidden");
        speechSynthesis.cancel();
      } else {
        document.getElementById("dialog-text").textContent = dialogLines[dialogIndex];
        speak(dialogLines[dialogIndex]);
      }
    } else {
      tryTalk();
    }
  }

  if (e.code === "KeyM") {
    showMinimap = !showMinimap;
    document.getElementById("minimapCanvas").style.display = showMinimap ? "block" : "none";
  }
});

window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

function tryTalk() {
  for (const npc of npcDefs) {
    const dx = (npc.x + 0.5) - camera.position.x;
    const dz = (npc.z + 0.5) - camera.position.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    if (dist < INTERACT_DIST) {
      dialogActive = true;
      dialogLines = npc.dialog;
      dialogIndex = 0;
      const box = document.getElementById("dialog-box");
      box.classList.remove("hidden");
      document.getElementById("dialog-speaker").textContent = npc.name;
      document.getElementById("dialog-text").textContent = npc.dialog[0];
      speak(npc.dialog[0]);
      return;
    }
  }
}

function onMouseMove(e) {
  if (!pointerLocked) return;
  yaw -= e.movementX * MOUSE_SENS;
  pitch -= e.movementY * MOUSE_SENS;
  pitch = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, pitch));
}

// ─── Update ──────────────────────────────────────────────────────────────────
function update(dt) {
  if (dialogActive) return;

  // Movement
  const forward = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
  const right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));

  let moveX = 0, moveZ = 0;

  if (keys["KeyW"] || keys["ArrowUp"]) { moveX += forward.x; moveZ += forward.z; }
  if (keys["KeyS"] || keys["ArrowDown"]) { moveX -= forward.x; moveZ -= forward.z; }
  if (keys["KeyA"]) { moveX -= right.x; moveZ -= right.z; }
  if (keys["KeyD"]) { moveX += right.x; moveZ += right.z; }

  // Keyboard rotation
  if (keys["ArrowLeft"] || keys["KeyQ"]) yaw += 2.0 * dt;
  if (keys["ArrowRight"] || keys["KeyE"]) yaw -= 2.0 * dt;

  if (moveX !== 0 || moveZ !== 0) {
    const len = Math.sqrt(moveX * moveX + moveZ * moveZ);
    moveX = (moveX / len) * MOVE_SPEED * dt;
    moveZ = (moveZ / len) * MOVE_SPEED * dt;

    const px = camera.position.x;
    const pz = camera.position.z;
    const nx = px + moveX;
    const nz = pz + moveZ;

    // Collision detection - separate axes
    const checkX = Math.floor(nx + COLLISION_R * Math.sign(moveX));
    const checkZ = Math.floor(nz + COLLISION_R * Math.sign(moveZ));
    const curGX = Math.floor(px);
    const curGZ = Math.floor(pz);

    if (checkX >= 0 && checkX < MAP_W && curGZ >= 0 && curGZ < MAP_H && worldMap[curGZ][checkX] === 0) {
      camera.position.x = nx;
    }
    if (curGX >= 0 && curGX < MAP_W && checkZ >= 0 && checkZ < MAP_H && worldMap[checkZ][curGX] === 0) {
      camera.position.z = nz;
    }
  }

  // Camera rotation
  camera.rotation.set(0, 0, 0);
  camera.rotateY(yaw);
  camera.rotateX(pitch);

  // Gem collection
  for (let i = 0; i < gemDefs.length; i++) {
    if (collectedGems.has(i)) continue;
    const dx = gemDefs[i].x - camera.position.x;
    const dz = gemDefs[i].z - camera.position.z;
    if (Math.sqrt(dx * dx + dz * dz) < GEM_COLLECT_DIST) {
      collectedGems.add(i);
      gemMeshes[i].visible = false;
      gemLights[i].intensity = 0;
      updateHUD();

      if (collectedGems.size >= gemDefs.length) {
        setTimeout(showVictory, 300);
      }
    }
  }

  // NPC face player + marker bob
  const t = clock.getElapsedTime();
  for (let i = 0; i < npcMeshes.length; i++) {
    const group = npcMeshes[i];
    group.lookAt(camera.position.x, 0, camera.position.z);

    // Bob the marker
    const marker = group.getObjectByName("marker");
    if (marker) {
      marker.position.y = npcDefs[i].height + 0.4 + Math.sin(t * 3 + i) * 0.1;
    }
  }

  // Gem rotation
  for (let i = 0; i < gemMeshes.length; i++) {
    if (collectedGems.has(i)) continue;
    gemMeshes[i].rotation.y = t * 2;
    gemMeshes[i].position.y = 1.0 + Math.sin(t * 3 + i * 1.5) * 0.1;
    gemLights[i].intensity = 0.6 + Math.sin(t * 4 + i) * 0.3;
  }

  // Torch flicker
  for (const tl of torchLights) {
    tl.intensity = 1.0 + Math.sin(t * 8 + tl.position.x * 3) * 0.3 + Math.random() * 0.2;
  }

  // Interact hint
  let nearNPC = false;
  for (const npc of npcDefs) {
    const dx = (npc.x + 0.5) - camera.position.x;
    const dz = (npc.z + 0.5) - camera.position.z;
    if (Math.sqrt(dx * dx + dz * dz) < INTERACT_DIST) { nearNPC = true; break; }
  }
  const hint = document.getElementById("interact-hint");
  if (nearNPC && !dialogActive) hint.classList.remove("hidden");
  else hint.classList.add("hidden");

  // Zone name
  document.getElementById("zone-name").textContent = getZoneName(camera.position.x, camera.position.z);
}

function showVictory() {
  dialogActive = true;
  dialogLines = [
    "הצלחת לאסוף את כל אבני החן הקסומות!",
    "הממלכה חוזרת לתפארתה, והאור שב לזרוח בכל מקום.",
    "כל תושבי הממלכה חוגגים את הנסיכה האמיצה שלהם!",
    "כל הכבוד! סיימת את ההרפתקה בהצלחה!",
  ];
  dialogIndex = 0;
  const box = document.getElementById("dialog-box");
  box.classList.remove("hidden");
  document.getElementById("dialog-speaker").textContent = "✨ קסם הממלכה ✨";
  document.getElementById("dialog-text").textContent = dialogLines[0];
  speak(dialogLines[0]);
}

function updateHUD() {
  document.getElementById("gems").textContent = `${gemDefs.length} / ${collectedGems.size}`;
}

// ─── Minimap ─────────────────────────────────────────────────────────────────
function drawMinimap() {
  const mc = document.getElementById("minimapCanvas");
  const s = 6;
  mc.width = MAP_W * s;
  mc.height = MAP_H * s;

  const mctx = mc.getContext("2d");

  mctx.fillStyle = "#0a0a15";
  mctx.fillRect(0, 0, mc.width, mc.height);

  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      const tile = worldMap[y][x];
      if (tile === 0) {
        if (x < 8 && y < 8) mctx.fillStyle = "#2a2535";
        else if (x >= 15) mctx.fillStyle = "#0a1a0a";
        else mctx.fillStyle = "#1a2a1a";
      } else {
        const def = WALL_DEFS[tile];
        const c = def.color;
        mctx.fillStyle = `rgb(${(c >> 16) & 255},${(c >> 8) & 255},${c & 255})`;
      }
      mctx.fillRect(x * s, y * s, s, s);
    }
  }

  // Gems
  for (let i = 0; i < gemDefs.length; i++) {
    if (collectedGems.has(i)) continue;
    mctx.fillStyle = "#4db8ff";
    mctx.beginPath();
    mctx.arc(gemDefs[i].x * s, gemDefs[i].z * s, 2, 0, Math.PI * 2);
    mctx.fill();
  }

  // NPCs
  for (const npc of npcDefs) {
    mctx.fillStyle = "#ffd700";
    mctx.beginPath();
    mctx.arc((npc.x + 0.5) * s, (npc.z + 0.5) * s, 2, 0, Math.PI * 2);
    mctx.fill();
  }

  // Player
  mctx.fillStyle = "#ff3333";
  mctx.beginPath();
  mctx.arc(camera.position.x * s, camera.position.z * s, 3, 0, Math.PI * 2);
  mctx.fill();

  // Direction
  mctx.strokeStyle = "#ff3333";
  mctx.lineWidth = 1.5;
  mctx.beginPath();
  mctx.moveTo(camera.position.x * s, camera.position.z * s);
  mctx.lineTo(
    camera.position.x * s - Math.sin(yaw) * 10,
    camera.position.z * s - Math.cos(yaw) * 10
  );
  mctx.stroke();
}

// ─── Game Loop ───────────────────────────────────────────────────────────────
function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);

  update(dt);
  renderer.render(scene, camera);

  if (showMinimap) drawMinimap();
}

// ─── Init ────────────────────────────────────────────────────────────────────
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("hud").style.display = "flex";
  document.getElementById("crosshair").style.display = "block";
  document.getElementById("minimapCanvas").style.display = showMinimap ? "block" : "none";

  // Three.js setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(4.5, 1.5, 3.5);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  document.getElementById("renderer-wrap").appendChild(renderer.domElement);

  clock = new THREE.Clock();

  // Pointer lock
  renderer.domElement.addEventListener("click", () => {
    renderer.domElement.requestPointerLock();
  });
  document.addEventListener("pointerlockchange", () => {
    pointerLocked = document.pointerLockElement === renderer.domElement;
  });
  document.addEventListener("mousemove", onMouseMove);

  // Resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  buildScene();
  initTTS();
  updateHUD();
  document.getElementById("zone-name").textContent = getZoneName(camera.position.x, camera.position.z);

  animate();
});
