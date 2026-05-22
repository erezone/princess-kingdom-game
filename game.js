// ═══════════════════════════════════════════════════════════════════════════════
// Princess Kingdom Adventure — Three.js 3D First-Person Engine (Multi-Level)
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Config ──────────────────────────────────────────────────────────────────
const MOVE_SPEED = 5.0;
const MOUSE_SENS = 0.002;
const COLLISION_R = 0.3;
const INTERACT_DIST = 2.5;
const GEM_COLLECT_DIST = 1.0;
const WALL_HEIGHT = 3.0;
const TREE_TRUNK_R = 0.18; // collision radius for standalone trees

// ─── Wall types ──────────────────────────────────────────────────────────────
// 0=empty 1=castle_stone 2=dark_stone 3=wood 4=tree 5=hedge 6=brick 7=dungeon
const WALL_DEFS = {
  1: { color: 0x8a8299, name: "castle_stone" },
  2: { color: 0x5a5070, name: "dark_stone" },
  3: { color: 0x9a7040, name: "wood" },
  4: { color: 0x2a6a2a, name: "tree" },
  5: { color: 0x3a7a3a, name: "hedge" },
  6: { color: 0x8a5535, name: "brick" },
  7: { color: 0x3a3548, name: "dungeon" },
};

// ─── Level Definitions ───────────────────────────────────────────────────────
const levels = [
  // ── Level 1: Royal Castle ──────────────────────────────────────────────────
  {
    name: "הטירה המלכותית",
    levelNum: 1,
    mapW: 16, mapH: 16,
    spawn: { x: 4.5, y: 3.5, rot: Math.PI / 2 },
    fog: { color: 0x0a0815, density: 0.06 },
    ambientColor: 0x303050, ambientIntensity: 0.3,
    hemiSky: 0x6666aa, hemiGround: 0x332222, hemiIntensity: 0.4,
    sunColor: 0xffeedd, sunIntensity: 0.5, sunPos: [10, 15, 5],
    hasCeiling: true,
    floorType: "castle",
    torches: [[2.5, 2, 1.5],[5.5, 2, 1.5],[1.5, 2, 5],[5.5, 2, 7],[8.5, 2, 3],[12.5, 2, 5]],
    // prettier-ignore
    map: [
      [2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1],
      [2,0,0,0,0,0,0,2,1,0,0,0,0,0,0,1],
      [2,0,0,0,0,0,0,2,1,0,0,0,0,0,0,1],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [2,0,0,0,0,0,0,2,1,0,0,0,0,0,0,1],
      [2,0,0,0,0,0,0,2,1,0,0,0,0,0,0,1],
      [2,0,0,0,0,0,0,2,1,0,0,0,0,0,0,1],
      [2,2,2,0,0,2,2,2,1,1,0,0,1,1,1,1],
      [1,1,1,0,0,1,1,1,1,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    npcs: [
      { x: 3, z: 2, name: "המלך אלדריק", bodyColor: 0x6a1b9a, capeColor: 0x8e24aa, height: 1.8,
        dialog: ["ברוכה הבאה, בתי הנסיכה היקרה!", "הממלכה שלנו זקוקה לעזרתך.", "תושבי הכפר מספרים על אורות מוזרים ביער הקסום.", "אני מבקש ממך לאסוף את אבני החן הקסומות ולהחזיר את השלום לממלכה."],
        tts: ["בְּרוּכָה הַבָּאָה, בִּתִּי הַנְּסִיכָה הַיְּקָרָה!", "הַמַּמְלָכָה שֶׁלָּנוּ זְקוּקָה לְעֶזְרָתֵךְ.", "תּוֹשְׁבֵי הַכְּפָר מְסַפְּרִים עַל אוֹרוֹת מוּזָרִים בַּיַּעַר הַקָּסוּם.", "אֲנִי מְבַקֵּשׁ מִמֵּךְ לֶאֱסוֹף אֶת אַבְנֵי הַחֵן הַקְּסוּמוֹת וּלְהַחֲזִיר אֶת הַשָּׁלוֹם לַמַּמְלָכָה."] },
      { x: 5, z: 5, name: "היועצת המלכותית מירה", bodyColor: 0x1565c0, capeColor: 0x1976d2, height: 1.7,
        dialog: ["הוד מעלתך, אבני החן פזורות בכל רחבי הטירה.", "כדאי לך לחפש בכל חדר וכל פינה."],
        tts: ["הוֹד מַעֲלָתֵךְ, אַבְנֵי הַחֵן פְּזוּרוֹת בְּכָל רַחֲבֵי הַטִּירָה.", "כְּדַאי לָךְ לְחַפֵּשׂ בְּכָל חֶדֶר וְכָל פִּנָּה."] },
    ],
    gems: [
      {x:1.5,z:1.5},{x:5.5,z:1.5},{x:1.5,z:5.5},{x:5.5,z:4.5},{x:3.5,z:6.5},
      {x:10.5,z:2.5},{x:13.5,z:3.5},{x:10.5,z:9.5},{x:13.5,z:12.5},{x:2.5,z:12.5},
    ],
    trees: [], // castle has no standalone trees
  },

  // ── Level 2: Cozy Village ──────────────────────────────────────────────────
  {
    name: "הכפר הנעים",
    levelNum: 2,
    mapW: 18, mapH: 18,
    spawn: { x: 9.5, y: 1.5, rot: Math.PI / 2 },
    fog: { color: 0x0a1510, density: 0.035 },
    ambientColor: 0x405040, ambientIntensity: 0.5,
    hemiSky: 0x88aacc, hemiGround: 0x443322, hemiIntensity: 0.6,
    sunColor: 0xfff0dd, sunIntensity: 0.9, sunPos: [12, 20, 8],
    hasCeiling: false,
    floorType: "grass",
    torches: [],
    // prettier-ignore
    map: [
      [3,3,3,3,3,3,3,3,0,0,3,3,3,3,3,3,3,3],
      [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
      [3,0,0,3,3,0,0,0,0,0,0,0,0,3,3,0,0,3],
      [3,0,0,3,3,0,0,0,0,0,0,0,0,3,3,0,0,3],
      [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
      [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
      [3,0,0,0,0,0,3,3,0,0,3,3,0,0,0,0,0,3],
      [3,0,0,0,0,0,3,0,0,0,0,3,0,0,0,0,0,3],
      [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
      [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
      [3,0,0,0,0,0,3,0,0,0,0,3,0,0,0,0,0,3],
      [3,0,0,0,0,0,3,3,0,0,3,3,0,0,0,0,0,3],
      [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
      [3,0,0,3,3,0,0,0,0,0,0,0,0,3,3,0,0,3],
      [3,0,0,3,3,0,0,0,0,0,0,0,0,3,3,0,0,3],
      [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
      [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
      [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    ],
    npcs: [
      { x: 4, z: 5, name: "האופה רוזלינד", bodyColor: 0xd4a054, capeColor: 0xe8c170, height: 1.6,
        dialog: ["אוי, נסיכה! איזה כבוד שבאת לכפר שלנו!", "ראיתי אבני חן נוצצות ליד הבתים.", "היזהרי, חלקן מתחבאות במקומות חשוכים."],
        tts: ["אוֹי, נְסִיכָה! אֵיזֶה כָּבוֹד שֶׁבָּאת לַכְּפָר שֶׁלָּנוּ!", "רָאִיתִי אַבְנֵי חֵן נוֹצְצוֹת לְיַד הַבָּתִּים.", "הִזָּהֲרִי, חֶלְקָן מִתְחַבְּאוֹת בִּמְקוֹמוֹת חֲשׁוּכִים."] },
      { x: 13, z: 8, name: "השומר תומס", bodyColor: 0x546e7a, capeColor: 0x78909c, height: 1.9,
        dialog: ["הוד מעלתך! הכפר שלנו מלא בהפתעות.", "שמעתי שאחרי הכפר מחכה גינה יפהפייה.", "אספי את כל האבנים וגלי מה מחכה לך."],
        tts: ["הוֹד מַעֲלָתֵךְ! הַכְּפָר שֶׁלָּנוּ מָלֵא בְּהַפְתָּעוֹת.", "שָׁמַעְתִּי שֶׁאַחֲרֵי הַכְּפָר מְחַכָּה גִּנָּה יְפֵהפִיָּה.", "אִסְפִי אֶת כָּל הָאֲבָנִים וְגַלִּי מָה מְחַכֶּה לָךְ."] },
      { x: 9, z: 12, name: "אלרה הקטנה", bodyColor: 0x43a047, capeColor: 0x66bb6a, height: 1.2,
        dialog: ["נסיכה! נסיכה! שלום! את כל כך יפה!", "מצאתי אבן נוצצת אבל אמא שלי אמרה לי לא לגעת.", "בבקשה, תמצאי את כולן!"],
        tts: ["נְסִיכָה! נְסִיכָה! שָׁלוֹם! אַתְּ כָּל כָּךְ יָפָה!", "מָצָאתִי אֶבֶן נוֹצֶצֶת אֲבָל אִמָּא שֶׁלִּי אָמְרָה לִי לֹא לָגַעַת.", "בְּבַקָּשָׁה, תִּמְצְאִי אֶת כֻּלָּן!"] },
    ],
    gems: [
      {x:1.5,z:1.5},{x:16.5,z:1.5},{x:1.5,z:16.5},{x:16.5,z:16.5},{x:9.5,z:8.5},
      {x:4.5,z:8.5},{x:14.5,z:8.5},{x:7.5,z:4.5},{x:11.5,z:13.5},{x:9.5,z:15.5},
    ],
    trees: [
      {x:3.5,z:3.5,s:1.0},{x:14.5,z:3.5,s:0.9},{x:3.5,z:14.5,s:1.1},{x:14.5,z:14.5,s:0.8},
      {x:9.5,z:5.5,s:0.7},{x:9.5,z:13.5,s:0.85},
    ],
  },

  // ── Level 3: Royal Garden ──────────────────────────────────────────────────
  {
    name: "הגינה המלכותית",
    levelNum: 3,
    mapW: 18, mapH: 18,
    spawn: { x: 9.5, y: 1.5, rot: Math.PI / 2 },
    fog: { color: 0x081808, density: 0.03 },
    ambientColor: 0x406040, ambientIntensity: 0.5,
    hemiSky: 0xaaccaa, hemiGround: 0x334422, hemiIntensity: 0.7,
    sunColor: 0xfff8ee, sunIntensity: 1.0, sunPos: [10, 22, 10],
    hasCeiling: false,
    floorType: "grass",
    torches: [],
    // prettier-ignore
    map: [
      [5,5,5,5,5,5,5,5,0,0,5,5,5,5,5,5,5,5],
      [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
      [5,0,0,0,0,5,0,0,0,0,0,0,5,0,0,0,0,5],
      [5,0,0,0,0,5,0,0,0,0,0,0,5,0,0,0,0,5],
      [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
      [5,0,5,5,0,0,0,0,0,0,0,0,0,0,5,5,0,5],
      [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
      [5,0,0,0,0,0,0,5,0,0,5,0,0,0,0,0,0,5],
      [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
      [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
      [5,0,0,0,0,0,0,5,0,0,5,0,0,0,0,0,0,5],
      [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
      [5,0,5,5,0,0,0,0,0,0,0,0,0,0,5,5,0,5],
      [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
      [5,0,0,0,0,5,0,0,0,0,0,0,5,0,0,0,0,5],
      [5,0,0,0,0,5,0,0,0,0,0,0,5,0,0,0,0,5],
      [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
      [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
    ],
    npcs: [
      { x: 5, z: 9, name: "הגננת פלורה", bodyColor: 0x2e7d32, capeColor: 0x4caf50, height: 1.65,
        dialog: ["שלום נסיכה! הגינה המלכותית מלאה בסודות.", "חפשי בין הגדרות והפרחים.", "הפרחים לוחשים לי שאת בדרך הנכונה!"],
        tts: ["שָׁלוֹם נְסִיכָה! הַגִּנָּה הַמַּלְכוּתִית מְלֵאָה בְּסוֹדוֹת.", "חַפְּשִׂי בֵּין הַגְּדֵרוֹת וְהַפְּרָחִים.", "הַפְּרָחִים לוֹחֲשִׁים לִי שֶׁאַתְּ בַּדֶּרֶךְ הַנְּכוֹנָה!"] },
      { x: 13, z: 9, name: "הפרפר הקסום", bodyColor: 0xab47bc, capeColor: 0xce93d8, height: 1.0,
        dialog: ["שלום נסיכה יפה!", "אני מכיר כל פרח בגינה הזאת.", "חפשי ליד הגדרות הגבוהות, שם מתחבאים היהלומים."],
        tts: ["שָׁלוֹם נְסִיכָה יָפָה!", "אֲנִי מַכִּיר כָּל פֶּרַח בַּגִּנָּה הַזּאֹת.", "חַפְּשִׂי לְיַד הַגְּדֵרוֹת הַגְּבוֹהוֹת, שָׁם מִתְחַבְּאִים הַיַּהֲלוֹמִים."] },
    ],
    gems: [
      {x:1.5,z:1.5},{x:16.5,z:1.5},{x:1.5,z:16.5},{x:16.5,z:16.5},{x:9.5,z:9.5},
      {x:3.5,z:6.5},{x:14.5,z:6.5},{x:3.5,z:11.5},{x:14.5,z:11.5},{x:9.5,z:4.5},
    ],
    trees: [
      {x:4.5,z:4.5,s:0.7},{x:13.5,z:4.5,s:0.6},{x:4.5,z:13.5,s:0.8},{x:13.5,z:13.5,s:0.65},
      {x:9.5,z:7.5,s:0.5},{x:8.5,z:10.5,s:0.55},{x:10.5,z:10.5,s:0.5},
    ],
  },

  // ── Level 4: Enchanted Forest ──────────────────────────────────────────────
  {
    name: "היער הקסום",
    levelNum: 4,
    mapW: 20, mapH: 20,
    spawn: { x: 10.5, y: 1.5, rot: Math.PI / 2 },
    fog: { color: 0x040a04, density: 0.055 },
    ambientColor: 0x203020, ambientIntensity: 0.25,
    hemiSky: 0x446644, hemiGround: 0x221a11, hemiIntensity: 0.35,
    sunColor: 0xccddaa, sunIntensity: 0.4, sunPos: [15, 18, 12],
    hasCeiling: false,
    floorType: "grass",
    torches: [],
    // prettier-ignore
    map: [
      [4,4,4,4,4,4,4,4,4,0,0,4,4,4,4,4,4,4,4,4],
      [4,0,0,0,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,4],
      [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
      [4,0,0,4,0,0,0,4,0,0,0,0,4,0,0,0,4,0,0,4],
      [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
      [4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4],
      [4,0,0,0,0,0,4,0,0,0,0,0,0,4,0,0,0,0,0,4],
      [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
      [4,0,0,4,0,0,0,0,0,4,4,0,0,0,0,0,4,0,0,4],
      [4,0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,4],
      [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
      [4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4],
      [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
      [4,0,0,0,0,0,4,0,0,0,0,0,0,4,0,0,0,0,0,4],
      [4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4],
      [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
      [4,0,0,4,0,0,0,4,0,0,0,0,4,0,0,0,4,0,0,4],
      [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
      [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
      [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    ],
    npcs: [
      { x: 5, z: 4, name: "פיית היער לומה", bodyColor: 0x7b1fa2, capeColor: 0xce93d8, height: 1.4,
        dialog: ["ברוכה הבאה ליער הקסום, נסיכה יקרה!", "העצים העתיקים האלה שומרים על סודות רבים.", "אספי את כל אבני החן והאור יחזור ליער."],
        tts: ["בְּרוּכָה הַבָּאָה לַיַּעַר הַקָּסוּם, נְסִיכָה יְקָרָה!", "הָעֵצִים הָעַתִּיקִים הָאֵלֶּה שׁוֹמְרִים עַל סוֹדוֹת רַבִּים.", "אִסְפִי אֶת כָּל אַבְנֵי הַחֵן וְהָאוֹר יַחֲזוֹר לַיַּעַר."] },
      { x: 15, z: 14, name: "הנזיר הזקן סדריק", bodyColor: 0x4e342e, capeColor: 0x6d4c41, height: 1.75,
        dialog: ["הנסיכה בכבודה ובעצמה ביער העמוק!", "אני חי כאן כבר עשרות שנים.", "אספי את כל האבנים, ואז היער ישיר שוב."],
        tts: ["הַנְּסִיכָה בִּכְבוֹדָהּ וּבְעַצְמָהּ בַּיַּעַר הֶעָמוֹק!", "אֲנִי חַי כָּאן כְּבָר עֲשָׂרוֹת שָׁנִים.", "אִסְפִי אֶת כָּל הָאֲבָנִים, וְאָז הַיַּעַר יָשִׁיר שׁוּב."] },
    ],
    gems: [
      {x:2.5,z:2.5},{x:17.5,z:2.5},{x:2.5,z:17.5},{x:17.5,z:17.5},{x:10.5,z:10.5},
      {x:5.5,z:10.5},{x:14.5,z:10.5},{x:10.5,z:5.5},{x:7.5,z:15.5},{x:13.5,z:5.5},
    ],
    trees: [
      {x:3.5,z:5.5,s:1.2},{x:7.5,z:3.5,s:1.0},{x:12.5,z:3.5,s:1.1},{x:16.5,z:7.5,s:0.9},
      {x:3.5,z:11.5,s:1.3},{x:16.5,z:11.5,s:1.0},{x:7.5,z:7.5,s:0.8},{x:12.5,z:7.5,s:0.85},
      {x:5.5,z:15.5,s:1.1},{x:14.5,z:15.5,s:1.0},{x:10.5,z:13.5,s:0.9},{x:8.5,z:11.5,s:0.7},
      {x:4.5,z:8.5,s:1.0},{x:15.5,z:4.5,s:1.15},{x:10.5,z:17.5,s:1.2},
    ],
  },

  // ── Level 5: Dark Dungeon ──────────────────────────────────────────────────
  {
    name: "המרתף האפל",
    levelNum: 5,
    mapW: 18, mapH: 18,
    spawn: { x: 1.5, y: 1.5, rot: Math.PI / 4 },
    fog: { color: 0x050308, density: 0.08 },
    ambientColor: 0x1a1020, ambientIntensity: 0.15,
    hemiSky: 0x221133, hemiGround: 0x110808, hemiIntensity: 0.2,
    sunColor: 0x8866aa, sunIntensity: 0.2, sunPos: [9, 10, 9],
    hasCeiling: true,
    floorType: "castle",
    torches: [[4.5,2,4.5],[13.5,2,4.5],[4.5,2,13.5],[13.5,2,13.5],[9.5,2,9.5],[1.5,2,9],[16.5,2,9]],
    // prettier-ignore
    map: [
      [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
      [7,0,0,0,7,0,0,0,0,0,0,0,0,7,0,0,0,7],
      [7,0,0,0,7,0,0,0,0,0,0,0,0,7,0,0,0,7],
      [7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
      [7,7,0,0,0,0,0,7,0,0,0,7,0,0,0,0,7,7],
      [7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
      [7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
      [7,0,0,0,7,0,0,0,0,0,0,0,0,7,0,0,0,7],
      [7,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,7],
      [7,0,0,0,0,0,0,0,7,7,7,0,0,0,0,0,0,7],
      [7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
      [7,0,0,0,7,0,0,0,0,0,0,0,0,7,0,0,0,7],
      [7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
      [7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
      [7,7,0,0,0,0,0,7,0,0,0,7,0,0,0,0,7,7],
      [7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
      [7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
      [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
    ],
    npcs: [
      { x: 9, z: 5, name: "רוח המרתף", bodyColor: 0x4a148c, capeColor: 0x7b1fa2, height: 1.9,
        dialog: ["מי מעזה להיכנס למרתף שלי?", "אה, הנסיכה! שמעתי עלייך.", "אבני החן האחרונות מוסתרות כאן בחושך.", "אם תמצאי את כולן, הממלכה תושיע!"],
        tts: ["מִי מְעֵזָה לְהִיכָּנֵס לַמַּרְתֵּף שֶׁלִּי?", "אָה, הַנְּסִיכָה! שָׁמַעְתִּי עָלַיִיךְ.", "אַבְנֵי הַחֵן הָאַחֲרוֹנוֹת מֻסְתָּרוֹת כָּאן בַּחוֹשֶׁךְ.", "אִם תִּמְצְאִי אֶת כֻּלָּן, הַמַּמְלָכָה תִּוָּשַׁע!"] },
      { x: 14, z: 14, name: "הלוחמת הנשכחת", bodyColor: 0x37474f, capeColor: 0x546e7a, height: 1.8,
        dialog: ["נסיכה, אני תקועה כאן כבר שנים.", "אם תאספי את כל האבנים, כולנו ניחלץ.", "היזהרי, המרתף הזה מבלבל את הכיוונים."],
        tts: ["נְסִיכָה, אֲנִי תְּקוּעָה כָּאן כְּבָר שָׁנִים.", "אִם תַּאַסְפִי אֶת כָּל הָאֲבָנִים, כֻּלָּנוּ נֵיחָלֵץ.", "הִזָּהֲרִי, הַמַּרְתֵּף הַזֶּה מְבַלְבֵּל אֶת הַכִּוּוּנִים."] },
    ],
    gems: [
      {x:1.5,z:1.5},{x:16.5,z:1.5},{x:1.5,z:16.5},{x:16.5,z:16.5},{x:9.5,z:6.5},
      {x:5.5,z:5.5},{x:12.5,z:12.5},{x:3.5,z:12.5},{x:14.5,z:5.5},{x:9.5,z:14.5},
    ],
    trees: [], // dungeon has no trees
  },
];

// ─── Victory Dialog ──────────────────────────────────────────────────────────
const victoryDialog = {
  dialog: [
    "הצלחת לאסוף את כל אבני החן בכל הממלכה!",
    "הממלכה חוזרת לתפארתה, והאור שב לזרוח בכל מקום.",
    "כל תושבי הממלכה חוגגים את הנסיכה האמיצה שלהם!",
    "כל הכבוד! סיימת את ההרפתקה בהצלחה!",
  ],
  tts: [
    "הִצְלַחַתְּ לֶאֱסוֹף אֶת כָּל אַבְנֵי הַחֵן בְּכָל הַמַּמְלָכָה!",
    "הַמַּמְלָכָה חוֹזֶרֶת לְתִפְאַרְתָּהּ, וְהָאוֹר שָׁב לִזְרוֹחַ בְּכָל מָקוֹם.",
    "כָּל תּוֹשְׁבֵי הַמַּמְלָכָה חוֹגְגִים אֶת הַנְּסִיכָה הָאַמִּיצָה שֶׁלָּהֶם!",
    "כָּל הַכָּבוֹד! סִיַּמְתְּ אֶת הָהַרְפַּתְקָה בְּהַצְלָחָה!",
  ],
};

const levelCompleteDialog = {
  dialog: [
    "מצאת את כל אבני החן בעולם הזה!",
    "שער חדש נפתח לפנייך...",
  ],
  tts: [
    "מָצָאת אֶת כָּל אַבְנֵי הַחֵן בָּעוֹלָם הַזֶּה!",
    "שַׁעַר חָדָשׁ נִפְתָּח לְפָנַיִיךְ...",
  ],
};

// ─── Three.js Globals ────────────────────────────────────────────────────────
let scene, camera, renderer, clock;
let levelGroup; // all level-specific objects go here
const keys = {};
let pointerLocked = false;
let yaw = 0, pitch = 0;
let showMinimap = true;
let dialogActive = false;
let dialogLines = [];
let dialogTTSLines = [];
let dialogIndex = 0;
let currentLevelIndex = 0;
let currentMap = null;
let currentMapW = 0, currentMapH = 0;
let collectedGems = new Set();
let npcMeshes = [];
let gemMeshes = [];
let gemLights = [];
let torchLights = [];
let treeTrunks = []; // {x, z} positions for collision
let gameState = "playing"; // playing | levelComplete | transitioning | victory | celebration
let portalMesh = null;

// ─── Text-to-Speech ──────────────────────────────────────────────────────────
let ttsVoice = null;
let ttsReady = false;

function initTTS() {
  const pickVoice = () => {
    const voices = speechSynthesis.getVoices();
    // Prefer high-quality Hebrew voices
    const hebrewVoices = voices.filter(v => v.lang.startsWith("he"));
    // Prefer non-default, non-compact voices (tend to be higher quality)
    ttsVoice = hebrewVoices.find(v => !v.localService) ||
               hebrewVoices.find(v => v.name.includes("Google")) ||
               hebrewVoices.find(v => v.name.includes("Premium")) ||
               hebrewVoices[0] || null;
    ttsReady = true;
  };
  pickVoice();
  speechSynthesis.addEventListener("voiceschanged", pickVoice);
}

function speak(text) {
  speechSynthesis.cancel();
  if (!text) return;

  // Clean emojis
  const clean = text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}✨🎉]/gu, "").trim();
  if (!clean) return;

  // Split on commas/periods for more natural pacing
  const parts = clean.split(/(?<=[.!?,])\s+/).filter(p => p.length > 0);

  for (let i = 0; i < parts.length; i++) {
    const utterance = new SpeechSynthesisUtterance(parts[i]);
    utterance.lang = "he-IL";
    utterance.rate = 0.92;
    utterance.pitch = 1.05;
    if (ttsVoice) utterance.voice = ttsVoice;
    speechSynthesis.speak(utterance);
  }
}

// ─── Texture Generation ─────────────────────────────────────────────────────
function generateTexture(type, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (type === "castle_stone" || type === "dark_stone") {
    const base = type === "dark_stone" ? [70, 60, 85] : [120, 115, 135];
    ctx.fillStyle = `rgb(${base[0]},${base[1]},${base[2]})`;
    ctx.fillRect(0, 0, width, height);
    const brickH = height / 6, brickW = width / 3;
    ctx.strokeStyle = "rgba(0,0,0,0.4)"; ctx.lineWidth = 2;
    for (let row = 0; row < 6; row++) {
      const y = row * brickH;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      const offset = (row % 2) * brickW / 2;
      for (let col = 0; col <= 4; col++) {
        ctx.beginPath(); ctx.moveTo(col * brickW + offset, y); ctx.lineTo(col * brickW + offset, y + brickH); ctx.stroke();
      }
    }
    for (let i = 0; i < 800; i++) {
      const v = Math.random() * 30 - 15;
      ctx.fillStyle = `rgba(${v > 0 ? 255 : 0},${v > 0 ? 255 : 0},${v > 0 ? 255 : 0},${Math.abs(v) / 100})`;
      ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }
  } else if (type === "wood") {
    ctx.fillStyle = "#8a6030"; ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 12; i++) {
      const y = Math.random() * height;
      ctx.strokeStyle = `rgba(60,35,10,${0.2 + Math.random() * 0.3})`;
      ctx.lineWidth = 1 + Math.random() * 2; ctx.beginPath(); ctx.moveTo(0, y);
      for (let x = 0; x < width; x += 10) ctx.lineTo(x, y + Math.sin(x * 0.05) * 3);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(0,0,0,0.3)"; ctx.lineWidth = 2;
    for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(i * width / 4, 0); ctx.lineTo(i * width / 4, height); ctx.stroke(); }
  } else if (type === "tree") {
    ctx.fillStyle = "#2a5a2a"; ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      ctx.strokeStyle = `rgba(20,40,15,${0.3 + Math.random() * 0.4})`;
      ctx.lineWidth = 2 + Math.random() * 4; ctx.beginPath(); ctx.moveTo(x, 0);
      for (let y = 0; y < height; y += 8) ctx.lineTo(x + Math.sin(y * 0.1) * 5, y);
      ctx.stroke();
    }
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(30,${80 + Math.random() * 80},20,0.5)`;
      ctx.beginPath(); ctx.arc(Math.random() * width, Math.random() * height * 0.6, 4 + Math.random() * 8, 0, Math.PI * 2); ctx.fill();
    }
  } else if (type === "hedge") {
    ctx.fillStyle = "#3a6a35"; ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 60; i++) {
      ctx.fillStyle = `rgba(25,${70 + Math.random() * 90},20,0.6)`;
      ctx.beginPath(); ctx.arc(Math.random() * width, Math.random() * height, 3 + Math.random() * 6, 0, Math.PI * 2); ctx.fill();
    }
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = ["#ff9999","#ffcc66","#cc99ff","#ff6699"][i % 4];
      ctx.beginPath(); ctx.arc(Math.random() * width, Math.random() * height, 2, 0, Math.PI * 2); ctx.fill();
    }
  } else if (type === "dungeon") {
    ctx.fillStyle = "#2a2535"; ctx.fillRect(0, 0, width, height);
    const brickH = height / 5, brickW = width / 3;
    ctx.strokeStyle = "rgba(0,0,0,0.5)"; ctx.lineWidth = 2;
    for (let row = 0; row < 5; row++) {
      const y = row * brickH;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      const offset = (row % 2) * brickW / 2;
      for (let col = 0; col <= 4; col++) {
        ctx.beginPath(); ctx.moveTo(col * brickW + offset, y); ctx.lineTo(col * brickW + offset, y + brickH); ctx.stroke();
      }
    }
    // Moss/grime
    for (let i = 0; i < 15; i++) {
      ctx.fillStyle = `rgba(30,${50 + Math.random() * 40},20,0.3)`;
      ctx.beginPath(); ctx.arc(Math.random() * width, height - Math.random() * height * 0.3, 5 + Math.random() * 10, 0, Math.PI * 2); ctx.fill();
    }
  } else {
    ctx.fillStyle = "#666"; ctx.fillRect(0, 0, width, height);
  }

  return new THREE.CanvasTexture(canvas);
}

function generateFloorTexture(type) {
  const s = 256;
  const canvas = document.createElement("canvas");
  canvas.width = s; canvas.height = s;
  const ctx = canvas.getContext("2d");

  if (type === "castle") {
    ctx.fillStyle = "#4a4050"; ctx.fillRect(0, 0, s, s);
    const tileSize = s / 4;
    ctx.strokeStyle = "rgba(0,0,0,0.3)"; ctx.lineWidth = 2;
    for (let i = 0; i <= 4; i++) {
      ctx.beginPath(); ctx.moveTo(i * tileSize, 0); ctx.lineTo(i * tileSize, s); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * tileSize); ctx.lineTo(s, i * tileSize); ctx.stroke();
    }
  } else if (type === "grass") {
    ctx.fillStyle = "#3a6630"; ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 300; i++) {
      ctx.strokeStyle = `rgba(30,${70 + Math.random() * 60},25,0.5)`;
      ctx.lineWidth = 1; ctx.beginPath();
      const x = Math.random() * s, y = Math.random() * s;
      ctx.moveTo(x, y); ctx.lineTo(x + (Math.random() - 0.5) * 3, y - 3 - Math.random() * 4); ctx.stroke();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// ─── Build Level ─────────────────────────────────────────────────────────────
function loadLevel(index) {
  gameState = "transitioning";
  speechSynthesis.cancel();

  // Clean up previous level
  if (levelGroup) {
    levelGroup.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (obj.material.map) obj.material.map.dispose();
        obj.material.dispose();
      }
    });
    scene.remove(levelGroup);
  }

  // Remove old lights
  const toRemove = [];
  scene.traverse((obj) => {
    if (obj.isLight && obj !== camera) toRemove.push(obj);
  });
  toRemove.forEach(l => scene.remove(l));

  // Reset state
  currentLevelIndex = index;
  const level = levels[index];
  currentMap = level.map;
  currentMapW = level.mapW;
  currentMapH = level.mapH;
  collectedGems = new Set();
  npcMeshes = [];
  gemMeshes = [];
  gemLights = [];
  torchLights = [];
  treeTrunks = [];
  portalMesh = null;
  gameState = "playing";

  // Player spawn
  camera.position.set(level.spawn.x, 1.5, level.spawn.y);
  yaw = level.spawn.rot;
  pitch = 0;

  // Fog
  scene.fog = new THREE.FogExp2(level.fog.color, level.fog.density);
  scene.background = new THREE.Color(level.fog.color);

  // Lighting
  const ambient = new THREE.AmbientLight(level.ambientColor, level.ambientIntensity);
  scene.add(ambient);

  const hemi = new THREE.HemisphereLight(level.hemiSky, level.hemiGround, level.hemiIntensity);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(level.sunColor, level.sunIntensity);
  sun.position.set(...level.sunPos);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -25; sun.shadow.camera.right = 25;
  sun.shadow.camera.top = 25; sun.shadow.camera.bottom = -25;
  scene.add(sun);

  levelGroup = new THREE.Group();

  // Wall textures
  const wallTextures = {};
  for (const [id, def] of Object.entries(WALL_DEFS)) {
    const tex = generateTexture(def.name, 256, 256);
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    wallTextures[id] = tex;
  }

  // Walls
  for (let y = 0; y < level.mapH; y++) {
    for (let x = 0; x < level.mapW; x++) {
      const tile = level.map[y][x];
      if (tile === 0) continue;
      let h = WALL_HEIGHT;
      if (tile === 4) h = WALL_HEIGHT * 1.8;
      const geo = new THREE.BoxGeometry(1, h, 1);
      const mat = new THREE.MeshStandardMaterial({ map: wallTextures[tile], roughness: 0.85, metalness: 0.05 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x + 0.5, h / 2, y + 0.5);
      mesh.castShadow = true; mesh.receiveShadow = true;
      levelGroup.add(mesh);

      if (tile === 4) {
        const fg = new THREE.SphereGeometry(0.7, 6, 5);
        const fm = new THREE.MeshStandardMaterial({ color: 0x2d7a2d, roughness: 0.9 });
        const f = new THREE.Mesh(fg, fm);
        f.position.set(x + 0.5, h + 0.3, y + 0.5); f.castShadow = true;
        levelGroup.add(f);
      }
    }
  }

  // Floor
  const floorMat = new THREE.MeshStandardMaterial({ map: generateFloorTexture(level.floorType), roughness: 0.8 });
  for (let y = 0; y < level.mapH; y++) {
    for (let x = 0; x < level.mapW; x++) {
      if (level.map[y][x] !== 0) continue;
      const geo = new THREE.PlaneGeometry(1, 1);
      const mesh = new THREE.Mesh(geo, floorMat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(x + 0.5, 0, y + 0.5);
      mesh.receiveShadow = true;
      levelGroup.add(mesh);
    }
  }

  // Ceiling
  if (level.hasCeiling) {
    const ceilMat = new THREE.MeshStandardMaterial({ color: 0x2a2035, roughness: 0.9 });
    for (let y = 0; y < level.mapH; y++) {
      for (let x = 0; x < level.mapW; x++) {
        if (level.map[y][x] !== 0) continue;
        const geo = new THREE.PlaneGeometry(1, 1);
        const mesh = new THREE.Mesh(geo, ceilMat);
        mesh.rotation.x = Math.PI / 2;
        mesh.position.set(x + 0.5, WALL_HEIGHT, y + 0.5);
        levelGroup.add(mesh);
      }
    }
  }

  // Torches
  for (const pos of level.torches) {
    const light = new THREE.PointLight(0xff8833, 1.2, 6);
    light.position.set(pos[0], pos[1], pos[2]);
    scene.add(light);
    torchLights.push(light);

    const flameGeo = new THREE.SphereGeometry(0.06, 4, 4);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xff6600 });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.copy(light.position);
    levelGroup.add(flame);
  }

  // NPCs
  for (const npc of level.npcs) {
    const group = buildNPC(npc);
    group.position.set(npc.x + 0.5, 0, npc.z + 0.5);
    levelGroup.add(group);
    npcMeshes.push(group);
  }

  // Gems
  for (let i = 0; i < level.gems.length; i++) {
    const g = level.gems[i];
    const { group, glow } = buildGem();
    group.position.set(g.x, 1.0, g.z);
    glow.position.set(g.x, 1.0, g.z);
    levelGroup.add(group);
    scene.add(glow);
    gemMeshes.push(group);
    gemLights.push(glow);
  }

  // Standalone Trees
  if (level.trees) {
    for (const t of level.trees) {
      const tree = buildTree(t.s || 1.0);
      tree.position.set(t.x, 0, t.z);
      levelGroup.add(tree);
      treeTrunks.push({ x: t.x, z: t.z });
    }
  }

  scene.add(levelGroup);

  // Update HUD
  updateHUD();
  document.getElementById("zone-name").textContent = `${level.name} (עולם ${level.levelNum})`;
}

// ─── Build NPC ───────────────────────────────────────────────────────────────
function buildNPC(npc) {
  const group = new THREE.Group();
  const h = npc.height;
  const legH = h * 0.3;
  const torsoH = h * 0.3;
  const headR = h * 0.1;
  const shoulderW = 0.22;

  // ── Feet / shoes ──
  const shoeGeo = new THREE.BoxGeometry(0.1, 0.06, 0.14);
  const shoeMat = new THREE.MeshStandardMaterial({ color: 0x3a2a1a, roughness: 0.8 });
  const shoeL = new THREE.Mesh(shoeGeo, shoeMat); shoeL.position.set(-0.08, 0.03, 0.02); group.add(shoeL);
  const shoeR = new THREE.Mesh(shoeGeo, shoeMat); shoeR.position.set(0.08, 0.03, 0.02); group.add(shoeR);

  // ── Legs ──
  const legGeo = new THREE.CylinderGeometry(0.05, 0.06, legH, 8);
  const legMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(npc.bodyColor).multiplyScalar(0.7), roughness: 0.7 });
  const legL = new THREE.Mesh(legGeo, legMat); legL.position.set(-0.08, 0.06 + legH / 2, 0); legL.castShadow = true; group.add(legL);
  const legR = new THREE.Mesh(legGeo, legMat); legR.position.set(0.08, 0.06 + legH / 2, 0); legR.castShadow = true; group.add(legR);

  const torsoBase = 0.06 + legH;

  // ── Torso ──
  const torsoGeo = new THREE.CylinderGeometry(0.14, 0.16, torsoH, 8);
  const torsoMat = new THREE.MeshStandardMaterial({ color: npc.bodyColor, roughness: 0.6 });
  const torso = new THREE.Mesh(torsoGeo, torsoMat); torso.position.set(0, torsoBase + torsoH / 2, 0); torso.castShadow = true; group.add(torso);

  // ── Cape / vest overlay ──
  const capeGeo = new THREE.CylinderGeometry(shoulderW, 0.18, torsoH * 0.55, 8, 1, true);
  const capeMat = new THREE.MeshStandardMaterial({ color: npc.capeColor, roughness: 0.5, side: THREE.DoubleSide });
  const cape = new THREE.Mesh(capeGeo, capeMat); cape.position.set(0, torsoBase + torsoH * 0.65, 0); group.add(cape);

  // ── Shoulders ──
  const shoulderGeo = new THREE.SphereGeometry(0.06, 6, 6);
  const shoulderMat = new THREE.MeshStandardMaterial({ color: npc.capeColor, roughness: 0.5 });
  const shL = new THREE.Mesh(shoulderGeo, shoulderMat); shL.position.set(-shoulderW, torsoBase + torsoH * 0.85, 0); group.add(shL);
  const shR = new THREE.Mesh(shoulderGeo, shoulderMat); shR.position.set(shoulderW, torsoBase + torsoH * 0.85, 0); group.add(shR);

  // ── Arms ──
  const armH = torsoH * 0.8;
  const armGeo = new THREE.CylinderGeometry(0.035, 0.04, armH, 6);
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xf0d0b0, roughness: 0.7 });
  const armL = new THREE.Mesh(armGeo, skinMat); armL.position.set(-shoulderW, torsoBase + torsoH * 0.5, 0); armL.castShadow = true; group.add(armL);
  const armR = new THREE.Mesh(armGeo, skinMat); armR.position.set(shoulderW, torsoBase + torsoH * 0.5, 0); armR.castShadow = true; group.add(armR);

  // ── Hands ──
  const handGeo = new THREE.SphereGeometry(0.04, 6, 6);
  const handL = new THREE.Mesh(handGeo, skinMat); handL.position.set(-shoulderW, torsoBase + torsoH * 0.1, 0); group.add(handL);
  const handR = new THREE.Mesh(handGeo, skinMat); handR.position.set(shoulderW, torsoBase + torsoH * 0.1, 0); group.add(handR);

  // ── Neck ──
  const neckGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.06, 6);
  const neck = new THREE.Mesh(neckGeo, skinMat); neck.position.set(0, torsoBase + torsoH + 0.03, 0); group.add(neck);

  const headY = torsoBase + torsoH + 0.06 + headR;

  // ── Head ──
  const headGeo = new THREE.SphereGeometry(headR, 12, 10);
  const headMat = new THREE.MeshStandardMaterial({ color: 0xf0d0b0, roughness: 0.65 });
  const head = new THREE.Mesh(headGeo, headMat); head.position.set(0, headY, 0); head.castShadow = true; group.add(head);

  // ── Hair ──
  const hairColor = npc.hairColor || 0x3a2a1a;
  // Hair top (dome)
  const hairTopGeo = new THREE.SphereGeometry(headR * 1.08, 10, 6, 0, Math.PI * 2, 0, Math.PI * 0.55);
  const hairMat = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.9 });
  const hairTop = new THREE.Mesh(hairTopGeo, hairMat);
  hairTop.position.set(0, headY + headR * 0.05, 0);
  group.add(hairTop);
  // Hair sides/back
  const hairBackGeo = new THREE.CylinderGeometry(headR * 0.9, headR * 0.7, headR * 0.8, 8, 1, true, Math.PI * 0.3, Math.PI * 1.4);
  const hairBack = new THREE.Mesh(hairBackGeo, hairMat);
  hairBack.position.set(0, headY - headR * 0.1, -headR * 0.1);
  group.add(hairBack);

  // ── Face: eyes ──
  const eyeWhiteGeo = new THREE.SphereGeometry(0.025, 6, 6);
  const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const ewL = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat); ewL.position.set(-0.04, headY + headR * 0.1, headR * 0.85); group.add(ewL);
  const ewR = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat); ewR.position.set(0.04, headY + headR * 0.1, headR * 0.85); group.add(ewR);

  const pupilGeo = new THREE.SphereGeometry(0.013, 4, 4);
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x222222 });
  const pL = new THREE.Mesh(pupilGeo, pupilMat); pL.position.set(-0.04, headY + headR * 0.1, headR * 0.9 + 0.01); group.add(pL);
  const pR = new THREE.Mesh(pupilGeo, pupilMat); pR.position.set(0.04, headY + headR * 0.1, headR * 0.9 + 0.01); group.add(pR);

  // ── Nose ──
  const noseGeo = new THREE.ConeGeometry(0.015, 0.03, 4);
  const noseMat = new THREE.MeshStandardMaterial({ color: 0xe8c0a0, roughness: 0.7 });
  const nose = new THREE.Mesh(noseGeo, noseMat); nose.rotation.x = -Math.PI / 2; nose.position.set(0, headY - headR * 0.05, headR * 0.95); group.add(nose);

  // ── Mouth ──
  const mouthGeo = new THREE.TorusGeometry(0.02, 0.005, 4, 8, Math.PI);
  const mouthMat = new THREE.MeshBasicMaterial({ color: 0xcc8888 });
  const mouth = new THREE.Mesh(mouthGeo, mouthMat); mouth.rotation.x = Math.PI * 0.1; mouth.position.set(0, headY - headR * 0.3, headR * 0.88); group.add(mouth);

  // ── Marker (floating !) ──
  const markerGeo = new THREE.SphereGeometry(0.08, 6, 6);
  const markerMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
  const marker = new THREE.Mesh(markerGeo, markerMat); marker.position.set(0, h + 0.4, 0); marker.name = "marker"; group.add(marker);

  return group;
}

// ─── Build Gem ───────────────────────────────────────────────────────────────
function buildGem() {
  const group = new THREE.Group();
  const r = 0.3, topH = 0.25, botH = 0.45, sides = 8;
  const vertices = [];
  const topPoint = [0, topH, 0], botPoint = [0, -botH, 0];
  const girdle = [];
  for (let s = 0; s < sides; s++) {
    const angle = (s / sides) * Math.PI * 2;
    girdle.push([Math.cos(angle) * r, 0, Math.sin(angle) * r]);
  }
  for (let s = 0; s < sides; s++) {
    const next = (s + 1) % sides;
    vertices.push(...topPoint, ...girdle[s], ...girdle[next]);
    vertices.push(...botPoint, ...girdle[next], ...girdle[s]);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geo.computeVertexNormals();

  const mat = new THREE.MeshPhysicalMaterial({
    color: 0x44ccff, emissive: 0x1166aa, emissiveIntensity: 0.6,
    roughness: 0.05, metalness: 0.3, clearcoat: 1.0, clearcoatRoughness: 0.05,
    transparent: true, opacity: 0.85,
  });
  const diamond = new THREE.Mesh(geo, mat); diamond.scale.set(1.2, 1.2, 1.2); group.add(diamond);

  const glowGeo = new THREE.SphereGeometry(0.12, 8, 8);
  const glowMat = new THREE.MeshBasicMaterial({ color: 0x88ddff, transparent: true, opacity: 0.4 });
  group.add(new THREE.Mesh(glowGeo, glowMat));

  const glow = new THREE.PointLight(0x4488ff, 1.2, 5);
  return { group, glow };
}

// ─── Build 3D Tree ───────────────────────────────────────────────────────────
function buildTree(scale) {
  const s = scale || 1.0;
  const group = new THREE.Group();

  const trunkH = 1.8 * s;
  const trunkRBot = 0.12 * s;
  const trunkRTop = 0.07 * s;

  // Trunk with slight taper
  const trunkGeo = new THREE.CylinderGeometry(trunkRTop, trunkRBot, trunkH, 8);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5a3a1a, roughness: 0.9 });
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.y = trunkH / 2;
  trunk.castShadow = true;
  group.add(trunk);

  // Roots at base
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2 + Math.random() * 0.5;
    const rootGeo = new THREE.CylinderGeometry(0.02 * s, 0.04 * s, 0.3 * s, 4);
    const root = new THREE.Mesh(rootGeo, trunkMat);
    root.position.set(Math.cos(angle) * 0.12 * s, 0.1 * s, Math.sin(angle) * 0.12 * s);
    root.rotation.z = Math.cos(angle) * 0.5;
    root.rotation.x = Math.sin(angle) * 0.5;
    group.add(root);
  }

  // Branches
  const branchMat = new THREE.MeshStandardMaterial({ color: 0x4a3015, roughness: 0.85 });
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2 + Math.random();
    const bLen = (0.3 + Math.random() * 0.3) * s;
    const bGeo = new THREE.CylinderGeometry(0.015 * s, 0.03 * s, bLen, 4);
    const branch = new THREE.Mesh(bGeo, branchMat);
    const bH = trunkH * (0.5 + i * 0.15);
    branch.position.set(Math.cos(angle) * bLen * 0.4, bH, Math.sin(angle) * bLen * 0.4);
    branch.rotation.z = Math.cos(angle) * 0.8;
    branch.rotation.x = Math.sin(angle) * 0.8;
    branch.castShadow = true;
    group.add(branch);
  }

  // Foliage layers (3 cone layers + sphere clusters)
  const leafColors = [0x2d7a2d, 0x3a8a2a, 0x228822, 0x1a6a1a];
  const foliageBase = trunkH * 0.6;

  // Main canopy: layered cones
  for (let layer = 0; layer < 3; layer++) {
    const ly = foliageBase + layer * 0.5 * s;
    const lr = (0.7 - layer * 0.15) * s;
    const lh = (0.7 - layer * 0.1) * s;
    const coneGeo = new THREE.ConeGeometry(lr, lh, 8);
    const coneMat = new THREE.MeshStandardMaterial({
      color: leafColors[layer],
      roughness: 0.85,
    });
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.position.set(0, ly + lh / 2, 0);
    cone.castShadow = true;
    cone.receiveShadow = true;
    group.add(cone);
  }

  // Additional foliage clusters for fullness
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const r = (0.25 + Math.random() * 0.2) * s;
    const y = foliageBase + 0.3 * s + Math.random() * 0.8 * s;
    const clusterR = (0.2 + Math.random() * 0.15) * s;
    const clusterGeo = new THREE.SphereGeometry(clusterR, 6, 5);
    const clusterMat = new THREE.MeshStandardMaterial({
      color: leafColors[Math.floor(Math.random() * leafColors.length)],
      roughness: 0.9,
    });
    const cluster = new THREE.Mesh(clusterGeo, clusterMat);
    cluster.position.set(Math.cos(angle) * r, y, Math.sin(angle) * r);
    cluster.castShadow = true;
    group.add(cluster);
  }

  return group;
}

// ─── Build Portal ────────────────────────────────────────────────────────────
function spawnPortal() {
  // Find a good spot: center-ish of the map
  const level = levels[currentLevelIndex];
  let px = Math.floor(level.mapW / 2), pz = Math.floor(level.mapH / 2);
  // Find nearest empty tile
  for (let r = 0; r < 5; r++) {
    for (let dx = -r; dx <= r; dx++) {
      for (let dz = -r; dz <= r; dz++) {
        const tx = px + dx, tz = pz + dz;
        if (tx > 0 && tx < level.mapW && tz > 0 && tz < level.mapH && level.map[tz][tx] === 0) {
          px = tx; pz = tz; r = 99; break;
        }
      }
    }
  }

  const group = new THREE.Group();

  // Portal ring
  const ringGeo = new THREE.TorusGeometry(0.6, 0.08, 8, 16);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 1.5;
  group.add(ring);

  // Portal inner glow
  const innerGeo = new THREE.CircleGeometry(0.55, 16);
  const innerMat = new THREE.MeshBasicMaterial({ color: 0x44aaff, transparent: true, opacity: 0.6, side: THREE.DoubleSide });
  const inner = new THREE.Mesh(innerGeo, innerMat);
  inner.rotation.x = Math.PI / 2;
  inner.position.y = 1.5;
  group.add(inner);

  // Portal light
  const portalLight = new THREE.PointLight(0x4488ff, 2, 8);
  portalLight.position.set(0, 1.5, 0);
  group.add(portalLight);

  group.position.set(px + 0.5, 0, pz + 0.5);
  group.userData = { mapX: px + 0.5, mapZ: pz + 0.5 };
  levelGroup.add(group);
  portalMesh = group;
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

        // Handle post-dialog actions
        if (gameState === "levelComplete") {
          if (currentLevelIndex < levels.length - 1) {
            loadLevel(currentLevelIndex + 1);
          }
        } else if (gameState === "victory") {
          startCelebration();
        }
      } else {
        document.getElementById("dialog-text").textContent = dialogLines[dialogIndex];
        speak(dialogTTSLines[dialogIndex] || dialogLines[dialogIndex]);
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

window.addEventListener("keyup", (e) => { keys[e.code] = false; });

function tryTalk() {
  const level = levels[currentLevelIndex];
  for (const npc of level.npcs) {
    const dx = (npc.x + 0.5) - camera.position.x;
    const dz = (npc.z + 0.5) - camera.position.z;
    if (Math.sqrt(dx * dx + dz * dz) < INTERACT_DIST) {
      showDialog(npc.dialog, npc.tts, npc.name);
      return;
    }
  }
}

function showDialog(lines, ttsLines, speaker) {
  dialogActive = true;
  dialogLines = lines;
  dialogTTSLines = ttsLines || lines;
  dialogIndex = 0;
  const box = document.getElementById("dialog-box");
  box.classList.remove("hidden");
  document.getElementById("dialog-speaker").textContent = speaker || "";
  document.getElementById("dialog-text").textContent = lines[0];
  speak(dialogTTSLines[0] || lines[0]);
}

function onMouseMove(e) {
  if (!pointerLocked) return;
  yaw -= e.movementX * MOUSE_SENS;
  pitch -= e.movementY * MOUSE_SENS;
  pitch = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, pitch));
}

// ─── Update ──────────────────────────────────────────────────────────────────
function update(dt) {
  if (dialogActive || gameState === "transitioning") return;

  const level = levels[currentLevelIndex];

  // Movement
  const forward = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
  const right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
  let moveX = 0, moveZ = 0;

  if (keys["KeyW"] || keys["ArrowUp"]) { moveX += forward.x; moveZ += forward.z; }
  if (keys["KeyS"] || keys["ArrowDown"]) { moveX -= forward.x; moveZ -= forward.z; }
  if (keys["KeyA"]) { moveX -= right.x; moveZ -= right.z; }
  if (keys["KeyD"]) { moveX += right.x; moveZ += right.z; }
  if (keys["ArrowLeft"] || keys["KeyQ"]) yaw += 2.0 * dt;
  if (keys["ArrowRight"] || keys["KeyE"]) yaw -= 2.0 * dt;

  if (moveX !== 0 || moveZ !== 0) {
    const len = Math.sqrt(moveX * moveX + moveZ * moveZ);
    moveX = (moveX / len) * MOVE_SPEED * dt;
    moveZ = (moveZ / len) * MOVE_SPEED * dt;
    const px = camera.position.x, pz = camera.position.z;
    const nx = px + moveX, nz = pz + moveZ;
    const checkX = Math.floor(nx + COLLISION_R * Math.sign(moveX));
    const checkZ = Math.floor(nz + COLLISION_R * Math.sign(moveZ));
    const curGX = Math.floor(px), curGZ = Math.floor(pz);

    if (checkX >= 0 && checkX < currentMapW && curGZ >= 0 && curGZ < currentMapH && currentMap[curGZ][checkX] === 0) camera.position.x = nx;
    if (curGX >= 0 && curGX < currentMapW && checkZ >= 0 && checkZ < currentMapH && currentMap[checkZ][curGX] === 0) camera.position.z = nz;

    // Tree trunk collision
    const cR = COLLISION_R + TREE_TRUNK_R;
    for (const t of treeTrunks) {
      const tdx = camera.position.x - t.x;
      const tdz = camera.position.z - t.z;
      const dist = Math.sqrt(tdx * tdx + tdz * tdz);
      if (dist < cR && dist > 0.001) {
        const push = (cR - dist);
        camera.position.x += (tdx / dist) * push;
        camera.position.z += (tdz / dist) * push;
      }
    }
  }

  camera.rotation.set(0, 0, 0);
  camera.rotateY(yaw);
  camera.rotateX(pitch);

  // Gem collection
  if (gameState === "playing") {
    for (let i = 0; i < level.gems.length; i++) {
      if (collectedGems.has(i)) continue;
      const dx = level.gems[i].x - camera.position.x;
      const dz = level.gems[i].z - camera.position.z;
      if (Math.sqrt(dx * dx + dz * dz) < GEM_COLLECT_DIST) {
        collectedGems.add(i);
        gemMeshes[i].visible = false;
        gemLights[i].intensity = 0;
        updateHUD();

        // Check level complete
        if (collectedGems.size >= level.gems.length) {
          if (currentLevelIndex < levels.length - 1) {
            gameState = "levelComplete";
            spawnPortal();
            setTimeout(() => {
              showDialog(levelCompleteDialog.dialog, levelCompleteDialog.tts, "קסם הממלכה");
            }, 500);
          } else {
            gameState = "victory";
            setTimeout(() => {
              showDialog(victoryDialog.dialog, victoryDialog.tts, "קסם הממלכה");
            }, 500);
          }
        }
      }
    }
  }

  // Portal interaction
  if (portalMesh && gameState === "levelComplete" && !dialogActive) {
    const dx = portalMesh.userData.mapX - camera.position.x;
    const dz = portalMesh.userData.mapZ - camera.position.z;
    if (Math.sqrt(dx * dx + dz * dz) < 1.5) {
      loadLevel(currentLevelIndex + 1);
    }
  }

  // Animate
  const t = clock.getElapsedTime();

  // NPCs face player + bob marker
  for (let i = 0; i < npcMeshes.length; i++) {
    npcMeshes[i].lookAt(camera.position.x, 0, camera.position.z);
    const marker = npcMeshes[i].getObjectByName("marker");
    if (marker) marker.position.y = level.npcs[i].height + 0.4 + Math.sin(t * 3 + i) * 0.1;
  }

  // Gems spin
  for (let i = 0; i < gemMeshes.length; i++) {
    if (collectedGems.has(i)) continue;
    gemMeshes[i].rotation.y = t * 2;
    gemMeshes[i].position.y = 1.0 + Math.sin(t * 3 + i * 1.5) * 0.1;
    gemLights[i].intensity = 0.8 + Math.sin(t * 4 + i) * 0.4;
  }

  // Torches flicker
  for (const tl of torchLights) {
    tl.intensity = 1.0 + Math.sin(t * 8 + tl.position.x * 3) * 0.3 + Math.random() * 0.2;
  }

  // Portal spin
  if (portalMesh) {
    portalMesh.rotation.y = t * 1.5;
    portalMesh.position.y = Math.sin(t * 2) * 0.1;
  }

  // Interact hint
  let nearNPC = false;
  for (const npc of level.npcs) {
    const dx = (npc.x + 0.5) - camera.position.x;
    const dz = (npc.z + 0.5) - camera.position.z;
    if (Math.sqrt(dx * dx + dz * dz) < INTERACT_DIST) { nearNPC = true; break; }
  }
  const hint = document.getElementById("interact-hint");
  if (nearNPC && !dialogActive) hint.classList.remove("hidden");
  else hint.classList.add("hidden");
}

function updateHUD() {
  const level = levels[currentLevelIndex];
  document.getElementById("gems").textContent = `${level.gems.length} / ${collectedGems.size}`;
  document.getElementById("zone-name").textContent = `${level.name} (עולם ${level.levelNum})`;
}

// ─── Minimap ─────────────────────────────────────────────────────────────────
function drawMinimap() {
  const mc = document.getElementById("minimapCanvas");
  const level = levels[currentLevelIndex];
  const s = Math.floor(160 / Math.max(level.mapW, level.mapH));
  mc.width = level.mapW * s; mc.height = level.mapH * s;
  const mctx = mc.getContext("2d");

  mctx.fillStyle = "#0a0a15"; mctx.fillRect(0, 0, mc.width, mc.height);

  for (let y = 0; y < level.mapH; y++) {
    for (let x = 0; x < level.mapW; x++) {
      const tile = level.map[y][x];
      if (tile === 0) { mctx.fillStyle = "#1a1a2a"; }
      else { const c = WALL_DEFS[tile].color; mctx.fillStyle = `rgb(${(c >> 16) & 255},${(c >> 8) & 255},${c & 255})`; }
      mctx.fillRect(x * s, y * s, s, s);
    }
  }

  for (let i = 0; i < level.gems.length; i++) {
    if (collectedGems.has(i)) continue;
    mctx.fillStyle = "#4db8ff";
    mctx.beginPath(); mctx.arc(level.gems[i].x * s, level.gems[i].z * s, 2, 0, Math.PI * 2); mctx.fill();
  }

  for (const npc of level.npcs) {
    mctx.fillStyle = "#ffd700";
    mctx.beginPath(); mctx.arc((npc.x + 0.5) * s, (npc.z + 0.5) * s, 2, 0, Math.PI * 2); mctx.fill();
  }

  if (portalMesh) {
    mctx.fillStyle = "#ff44ff";
    mctx.beginPath(); mctx.arc(portalMesh.userData.mapX * s, portalMesh.userData.mapZ * s, 3, 0, Math.PI * 2); mctx.fill();
  }

  mctx.fillStyle = "#ff3333";
  mctx.beginPath(); mctx.arc(camera.position.x * s, camera.position.z * s, 3, 0, Math.PI * 2); mctx.fill();
  mctx.strokeStyle = "#ff3333"; mctx.lineWidth = 1.5; mctx.beginPath();
  mctx.moveTo(camera.position.x * s, camera.position.z * s);
  mctx.lineTo(camera.position.x * s - Math.sin(yaw) * 10, camera.position.z * s - Math.cos(yaw) * 10);
  mctx.stroke();
}

// ─── Celebration Scene ───────────────────────────────────────────────────────
let celebrationActive = false;
let celebrationGroup = null;
let fireworkParticles = [];
let celebrationNPCs = [];
let celebrationMusic = null;

function startCelebration() {
  celebrationActive = true;
  gameState = "celebration";
  dialogActive = false;
  speechSynthesis.cancel();
  document.getElementById("dialog-box").classList.add("hidden");
  document.getElementById("minimapCanvas").style.display = "none";
  document.getElementById("crosshair").style.display = "none";

  // Clean up current level
  if (levelGroup) {
    levelGroup.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (obj.material.map) obj.material.map.dispose();
        obj.material.dispose();
      }
    });
    scene.remove(levelGroup);
  }
  const toRemove = [];
  scene.traverse((obj) => { if (obj.isLight && obj !== camera) toRemove.push(obj); });
  toRemove.forEach(l => scene.remove(l));

  celebrationGroup = new THREE.Group();

  // Sky and fog
  scene.fog = new THREE.FogExp2(0x0a0a30, 0.015);
  scene.background = new THREE.Color(0x0a0a30);

  // Ground — large festive courtyard
  const groundGeo = new THREE.PlaneGeometry(60, 60);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x3a6a3a, roughness: 0.9 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  celebrationGroup.add(ground);

  // Stone dance floor in center
  const floorGeo = new THREE.CylinderGeometry(8, 8, 0.05, 32);
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x8a8299, roughness: 0.7 });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.position.y = 0.03;
  floor.receiveShadow = true;
  celebrationGroup.add(floor);

  // Lighting — warm festive
  const ambient = new THREE.AmbientLight(0x2a2040, 0.4);
  scene.add(ambient);
  const hemi = new THREE.HemisphereLight(0x2244aa, 0x553311, 0.5);
  scene.add(hemi);

  // Colored spotlights
  const spotColors = [0xff4444, 0x44ff44, 0x4444ff, 0xffff44, 0xff44ff, 0x44ffff];
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const pl = new THREE.PointLight(spotColors[i], 2.0, 20);
    pl.position.set(Math.cos(angle) * 6, 4, Math.sin(angle) * 6);
    scene.add(pl);
  }

  // Central golden light
  const centerLight = new THREE.PointLight(0xffd700, 3.0, 25);
  centerLight.position.set(0, 6, 0);
  scene.add(centerLight);

  // Torch poles around the courtyard
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const r = 10;
    const poleGeo = new THREE.CylinderGeometry(0.08, 0.08, 3, 6);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x5a3a1a });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(Math.cos(angle) * r, 1.5, Math.sin(angle) * r);
    celebrationGroup.add(pole);

    const torchLight = new THREE.PointLight(0xff8833, 1.5, 8);
    torchLight.position.set(Math.cos(angle) * r, 3.2, Math.sin(angle) * r);
    scene.add(torchLight);
  }

  // Collect all NPC definitions from all levels
  const allNPCDefs = [];
  for (const level of levels) {
    for (const npc of level.npcs) {
      allNPCDefs.push(npc);
    }
  }

  // Place NPCs in a circle, dancing
  celebrationNPCs = [];
  const npcCount = allNPCDefs.length;
  const circleR = 5.5;
  for (let i = 0; i < npcCount; i++) {
    const angle = (i / npcCount) * Math.PI * 2;
    const npcDef = allNPCDefs[i];
    const npcGroup = buildNPC(npcDef);
    npcGroup.position.set(Math.cos(angle) * circleR, 0, Math.sin(angle) * circleR);
    npcGroup.rotation.y = angle + Math.PI; // face center
    celebrationGroup.add(npcGroup);
    celebrationNPCs.push({ mesh: npcGroup, baseAngle: angle, radius: circleR, phase: i * 0.7 });
  }

  // Princess in the center (taller, with crown)
  const princessDef = {
    name: "הנסיכה",
    bodyColor: 0xd4af37,
    capeColor: 0xffd700,
    height: 1.7,
  };
  const princess = buildNPC(princessDef);
  princess.position.set(0, 0, 0);
  celebrationGroup.add(princess);
  celebrationNPCs.push({ mesh: princess, baseAngle: 0, radius: 0, phase: 0, isPrincess: true });

  // Add a crown on the princess
  const crownGeo = new THREE.CylinderGeometry(0.15, 0.12, 0.12, 6);
  const crownMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.2 });
  const crown = new THREE.Mesh(crownGeo, crownMat);
  crown.position.y = princessDef.height + 0.05;
  princess.add(crown);
  // Crown points
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const pointGeo = new THREE.ConeGeometry(0.03, 0.1, 4);
    const point = new THREE.Mesh(pointGeo, crownMat);
    point.position.set(Math.cos(a) * 0.12, princessDef.height + 0.15, Math.sin(a) * 0.12);
    princess.add(point);
  }

  // Decorative trees around the edge
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 + 0.2;
    const tree = buildTree(0.8 + Math.random() * 0.5);
    tree.position.set(Math.cos(angle) * 14, 0, Math.sin(angle) * 14);
    celebrationGroup.add(tree);
  }

  scene.add(celebrationGroup);

  // Position camera looking at the scene from above at an angle
  camera.position.set(0, 8, 14);
  yaw = Math.PI;
  pitch = -0.4;

  // Update HUD
  document.getElementById("hud").style.display = "flex";
  document.getElementById("gems").textContent = "🎉 חגיגה! 🎉";
  document.getElementById("zone-name").textContent = "חגיגת הניצחון של הנסיכה";

  // Start fireworks
  fireworkParticles = [];

  // Start music
  startCelebrationMusic();
}

function startCelebrationMusic() {
  // Embed a small YouTube player with the song
  const yt = document.createElement("iframe");
  yt.id = "celebration-yt";
  yt.width = "280";
  yt.height = "158";
  yt.src = "https://www.youtube.com/embed/xmbmfDeEG-g?autoplay=1&loop=1&playlist=xmbmfDeEG-g";
  yt.allow = "autoplay; encrypted-media";
  yt.frameBorder = "0";
  yt.style.cssText = "position:fixed;bottom:16px;left:16px;z-index:1000;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.6);opacity:0.92;";
  document.body.appendChild(yt);
}

function spawnFirework() {
  const x = (Math.random() - 0.5) * 20;
  const z = (Math.random() - 0.5) * 20;
  const burstY = 8 + Math.random() * 6;
  const color = new THREE.Color().setHSL(Math.random(), 1, 0.6);
  const particleCount = 40 + Math.floor(Math.random() * 30);

  for (let i = 0; i < particleCount; i++) {
    const geo = new THREE.SphereGeometry(0.06, 4, 4);
    const mat = new THREE.MeshBasicMaterial({ color: color });
    const p = new THREE.Mesh(geo, mat);
    p.position.set(x, burstY, z);

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const speed = 2 + Math.random() * 4;
    p.userData.vx = Math.sin(phi) * Math.cos(theta) * speed;
    p.userData.vy = Math.cos(phi) * speed;
    p.userData.vz = Math.sin(phi) * Math.sin(theta) * speed;
    p.userData.life = 1.5 + Math.random() * 1.5;
    p.userData.age = 0;

    scene.add(p);
    fireworkParticles.push(p);
  }

  // Flash light at burst point
  const flash = new THREE.PointLight(color, 5, 20);
  flash.position.set(x, burstY, z);
  scene.add(flash);
  setTimeout(() => { scene.remove(flash); }, 300);
}

function updateCelebration(dt) {
  if (!celebrationActive) return;
  const t = clock.getElapsedTime();

  // Animate NPCs — dancing (bobbing + swaying + circling)
  for (const npc of celebrationNPCs) {
    if (npc.isPrincess) {
      // Princess spins slowly in center
      npc.mesh.rotation.y = t * 0.8;
      npc.mesh.position.y = Math.sin(t * 3 + npc.phase) * 0.15;
    } else {
      // NPCs dance around in circle, bobbing
      const circleSpeed = 0.3;
      const newAngle = npc.baseAngle + t * circleSpeed;
      npc.mesh.position.x = Math.cos(newAngle) * npc.radius;
      npc.mesh.position.z = Math.sin(newAngle) * npc.radius;
      npc.mesh.position.y = Math.abs(Math.sin(t * 4 + npc.phase)) * 0.3; // jumping
      npc.mesh.rotation.y = newAngle + Math.PI + Math.sin(t * 2 + npc.phase) * 0.3; // face center + sway
    }
  }

  // Camera slowly orbits the scene
  const camAngle = t * 0.15;
  const camR = 12 + Math.sin(t * 0.2) * 3;
  const camH = 6 + Math.sin(t * 0.3) * 2;
  camera.position.set(Math.cos(camAngle) * camR, camH, Math.sin(camAngle) * camR);
  camera.lookAt(0, 1.5, 0);

  // Fireworks — spawn every ~1.5 seconds
  if (Math.random() < dt * 0.7) {
    spawnFirework();
  }

  // Update firework particles
  for (let i = fireworkParticles.length - 1; i >= 0; i--) {
    const p = fireworkParticles[i];
    p.userData.age += dt;
    if (p.userData.age >= p.userData.life) {
      scene.remove(p);
      p.geometry.dispose();
      p.material.dispose();
      fireworkParticles.splice(i, 1);
      continue;
    }
    p.position.x += p.userData.vx * dt;
    p.position.y += p.userData.vy * dt;
    p.position.z += p.userData.vz * dt;
    p.userData.vy -= 3 * dt; // gravity
    p.userData.vx *= 0.98;
    p.userData.vz *= 0.98;
    // Fade out
    const fade = 1 - (p.userData.age / p.userData.life);
    p.material.opacity = fade;
    p.material.transparent = true;
    p.scale.setScalar(fade);
  }
}

// ─── Game Loop ───────────────────────────────────────────────────────────────
function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  if (celebrationActive) {
    updateCelebration(dt);
  } else {
    update(dt);
  }
  renderer.render(scene, camera);
  if (showMinimap && !celebrationActive) drawMinimap();
}

// ─── Init ────────────────────────────────────────────────────────────────────
function initGame(skipToParty) {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("hud").style.display = "flex";
  document.getElementById("crosshair").style.display = "block";
  document.getElementById("minimapCanvas").style.display = showMinimap ? "block" : "none";

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  document.getElementById("renderer-wrap").appendChild(renderer.domElement);

  clock = new THREE.Clock();

  renderer.domElement.addEventListener("click", () => { renderer.domElement.requestPointerLock(); });
  document.addEventListener("pointerlockchange", () => { pointerLocked = document.pointerLockElement === renderer.domElement; });
  document.addEventListener("mousemove", onMouseMove);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  initTTS();

  if (skipToParty) {
    loadLevel(0);
    startCelebration();
  } else {
    loadLevel(0);
  }
  animate();
}

document.getElementById("startBtn").addEventListener("click", () => { initGame(false); });

// Auto-skip to celebration if displayParty=1
if (new URLSearchParams(window.location.search).get("displayParty") === "1") {
  initGame(true);
}
