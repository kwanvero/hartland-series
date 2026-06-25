// @ts-nocheck
import { useState, useEffect } from "react";

// ============================================================
// Fantasy book LANDING PAGE created by veemercado.com / verliner
// Public face: A research library
// ============================================================

// WCAG AA colour tokens (on #0c0c0e background, verified ratios)
// #e2d9c8  ~12:1  ✓ AA  — primary reading text
// #a89f8e  ~5.8:1 ✓ AA  — secondary / body text
// #7a7060  ~3.8:1 ✓ AA  — large text labels (≥14px bold) & UI only
// #C8A96E  ~5.2:1 ✓ AA  — gold accent
// #7EB5A6  ~4.9:1 ✓ AA  — teal accent
// #B8A0C8  ~4.6:1 ✓ AA  — lavender accent

const ADMIN_PASSWORD = "RaAl1988admin";

async function getVisitorGeo() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return {
      ip: data.ip || "unknown",
      city: data.city || "Unknown",
      region: data.region || "",
      country: data.country_name || "Unknown",
      countryCode: data.country_code || "XX",
      lat: data.latitude || 0,
      lon: data.longitude || 0,
      org: data.org || "",
      timestamp: new Date().toISOString(),
    };
  } catch {
    return {
      ip: "unknown",
      city: "Unknown",
      region: "",
      country: "Unknown",
      countryCode: "XX",
      lat: 0,
      lon: 0,
      org: "",
      timestamp: new Date().toISOString(),
    };
  }
}

const references = [
  {
    culture: "Aboriginal Australian, Kulin Nation",
    bird: "Eaglehawk (Bunjil)",
    tag: "CREATOR · TEACHER · SHAPESHIFTER",
    tagColor: "#C8A96E",
    why: "Most directly relevant. Bunjil is a creator deity depicted as a wedge-tailed eaglehawk, an ancient being who lived on earth, taught people how to survive, and then ascended to the sky as a star. He walked among people as a wise elder, shapeshifted into bird form, and is still considered to be watching over the land.",
    detail:
      "Bunjil's name in the Woiwurrung language literally translates as 'eaglehawk'. He is assisted by six wirmums, shamans, who represent clans of the Eaglehawk moiety. The word eaglehawk is not a compromise between two birds. It is its own thing, with its own deep lineage.",
    sources: [
      {
        label: "Wikipedia, Bunjil",
        url: "https://en.wikipedia.org/wiki/Bunjil",
      },
      {
        label: "EBSCO Research Starters, Bunjil",
        url: "https://www.ebsco.com/research-starters/religion-and-philosophy/bunjil",
      },
      {
        label: "Bahai Teachings, Bunjil the Aboriginal Deity",
        url: "https://bahaiteachings.org/bunjil-aboriginal-deity-why-you-should-learn-more-about-him/",
      },
    ],
  },
  {
    culture: "Māori, Aotearoa New Zealand",
    bird: "Kārearea (NZ Falcon / Bush Hawk) & Kāhu (Harrier Hawk)",
    tag: "MESSENGER · GUARDIAN · WEATHER PROPHET",
    tagColor: "#7EB5A6",
    why: "The kārearea is tapu, sacred, and considered a guardian spirit that brings warnings or messages from the gods. Larger birds of prey like the kāhu acted as messengers between tohunga (healers) and the gods, vaulting above the clouds along spiritual tradewinds.",
    detail:
      "If the kārearea screamed on a fine day it would rain tomorrow. Warriors wore its head plume to signal they were as fierce and reckless as the falcon. Proverb: 'Me te kopae kārearea', like the nest of the falcon, means 'rarely seen'.",
    sources: [
      {
        label: "Te Ara Encyclopedia, Ngā Manu Birds",
        url: "https://teara.govt.nz/en/nga-manu-birds",
      },
      {
        label: "Wikipedia, New Zealand Falcon",
        url: "https://en.wikipedia.org/wiki/New_Zealand_falcon",
      },
    ],
  },
  {
    culture: "Celtic, Irish & Welsh",
    bird: "Hawk",
    tag: "FAR-MEMORY · OTHERWORLD MESSENGER",
    tagColor: "#8FA8C8",
    why: "In Celtic mythology the hawk is a messenger between this world and the Otherworld, carrying ancient knowledge and prophetic insight. The 'Hawk of Achill' in Irish oral tradition symbolises 'far-memory', the ability to remember events from ages past.",
    detail:
      "The Welsh hero Gawain's name contains 'gwalch', meaning hawk. The hero Fintan survived the great flood by transforming — salmon, then eagle, then hawk. Hawks circling a house could presage death.",
    sources: [
      {
        label: "What Is My Spirit Animal, Hawk",
        url: "https://whatismyspiritanimal.com/spirit-totem-power-animal-meanings/birds/hawk-symbolism-meaning/",
      },
    ],
  },
  {
    culture: "Norse",
    bird: "Veðrfölnir, the hawk between the eagle's eyes on Yggdrasil",
    tag: "THE KNOWING PART · WISDOM WITHIN POWER",
    tagColor: "#B8A0C8",
    why: "A hawk named Veðrfölnir sits between the eyes of the eagle at the top of Yggdrasil. Scholars interpret the hawk as the wisdom and knowledge of the eagle, the knowing part nested within the power.",
    detail:
      "Freya also possessed a cloak made of hawk feathers — when she wore it she transformed into a giant hawk and flew. Transformation via hawk is deeply Norse.",
    sources: [
      {
        label: "UniGuide, Hawk Symbolism",
        url: "https://www.uniguide.com/hawk-meaning-symbolism-spirit-animal-guide",
      },
    ],
  },
  {
    culture: "Japanese",
    bird: "Taka (Hawk)",
    tag: "NOBILITY · GOOD FORTUNE · WARRIOR",
    tagColor: "#C88FA0",
    why: "In Japanese culture hawks symbolise good luck, love, strength, nobility, and represent a warrior. Hawk imagery was used by samurai to represent valour and discipline.",
    detail:
      "Japanese New Year's dream tradition (Hatsuyume) lists hawk as the second luckiest symbol to dream of, after Mount Fuji, before aubergine. To dream of a hawk is one of the highest auspicious signs.",
    sources: [
      {
        label: "YourTango, Hawk Spiritual Meaning",
        url: "https://www.yourtango.com/2020333832/hawk-spiritual-meaning",
      },
    ],
  },
  {
    culture: "Cross-Cultural Reference, The Shaman Figure",
    bird: "N/A — practitioner research",
    tag: "WORLDBUILDING REFERENCE",
    tagColor: "#9AB89A",
    why: "Research gathered on how different cultures name, describe, and understand the shaman figure. Kept for reference while developing character background, conduct, and training across traditions.",
    detail:
      "Covers: Mayan/Mesoamerican (Ahau/Tat, nagual, shapeshifting), African Sangoma/Inyanga, Nepalese Dhami-Jhankri, Chinese Wu (Wuism), Thai/Buddhist Ajahn, and Indian Aghori Sadhus. Each tradition approaches the figure differently but converges on: healing, divination, ancestral communication, and altered states.",
    sources: [
      {
        label: "Britannica, Shamanism",
        url: "https://www.britannica.com/topic/shamanism",
      },
      {
        label: "Britannica, Sangoma",
        url: "https://www.britannica.com/science/sangoma",
      },
    ],
  },
  {
    culture: "Cross-Cultural Reference, Blindness & Heightened Senses",
    bird: "N/A — character research",
    tag: "SENSORY DEPRIVATION · SPIRITUAL SIGHT",
    tagColor: "#B8C8A0",
    why: "Research on the link between physical blindness or sensory deprivation and heightened spiritual perception in shaman traditions across cultures.",
    detail:
      "The Magar people of western Nepal use the word 'blind' as a metaphor for lacking spiritual and moral foresight — only the shaman can truly see. Across traditions, shamans deliberately block ordinary senses: blindfolded trance dances, sweat lodges, fasting, darkness rituals. The Inuit Angakkoq initiation describes being 'rebuilt' with new sight.",
    sources: [
      {
        label: "SHINE News, Shamans of the Blind Country",
        url: "https://www.shine.cn/feature/art-culture/1907057944/",
      },
      {
        label: "Wikipedia, Shamanism",
        url: "https://en.wikipedia.org/wiki/Shamanism",
      },
    ],
  },
];

// ─── Bar Chart ────────────────────────────────────────────────
function CountryBarChart({ countrySorted }) {
  if (countrySorted.length === 0) return null;

  const maxCount = countrySorted[0][1];
  const total = countrySorted.reduce((a, [, c]) => a + c, 0);
  const BAR_HEIGHT = 30;
  const LABEL_W = 168;
  const BAR_MAX_W = 420;
  const GAP = 10;
  const svgW = LABEL_W + BAR_MAX_W + 48;
  const chartH = countrySorted.length * (BAR_HEIGHT + GAP);

  const palette = [
    "#C8A96E",
    "#7EB5A6",
    "#8FA8C8",
    "#B8A0C8",
    "#C88FA0",
    "#9AB89A",
    "#B8C8A0",
    "#C8B07E",
    "#7EB5C8",
    "#A8C8A0",
  ];

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <svg
        viewBox={`0 0 ${svgW} ${chartH + 4}`}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {countrySorted.map(([country, count], i) => {
          const y = i * (BAR_HEIGHT + GAP);
          const barW = Math.max(4, (count / maxCount) * BAR_MAX_W);
          const color = palette[i % palette.length];
          const pct = Math.round((count / total) * 100);

          return (
            <g key={country}>
              <text
                x={LABEL_W - 10}
                y={y + BAR_HEIGHT / 2 + 1}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize="12"
                fill="#a89f8e"
                fontFamily="'Palatino Linotype', Georgia, serif"
              >
                {country.length > 22 ? country.slice(0, 21) + "…" : country}
              </text>
              <rect
                x={LABEL_W}
                y={y}
                width={BAR_MAX_W}
                height={BAR_HEIGHT}
                rx="3"
                fill="#1a1a1c"
              />
              <rect
                x={LABEL_W}
                y={y}
                width={barW}
                height={BAR_HEIGHT}
                rx="3"
                fill={color}
                opacity="0.85"
              />
              {barW > 44 && (
                <text
                  x={LABEL_W + barW - 10}
                  y={y + BAR_HEIGHT / 2 + 1}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize="10"
                  fill="#0c0c0e"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {pct}%
                </text>
              )}
              <text
                x={LABEL_W + BAR_MAX_W + 10}
                y={y + BAR_HEIGHT / 2 + 1}
                dominantBaseline="middle"
                fontSize="12"
                fill={color}
                fontFamily="monospace"
                fontWeight="bold"
              >
                {count}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── World Map ────────────────────────────────────────────────
function WorldMap({ visits }) {
  const width = 900;
  const height = 440;

  const toXY = (lat, lon) => ({
    x: ((lon + 180) / 360) * width,
    y: ((90 - lat) / 180) * height,
  });

  const grouped = {};
  visits.forEach((v) => {
    const key = v.countryCode || "XX";
    if (!grouped[key]) grouped[key] = { ...v, count: 0 };
    grouped[key].count++;
  });

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{
          width: "100%",
          height: "auto",
          background: "#0e1117",
          borderRadius: "8px",
          border: "1px solid #252525",
        }}
      >
        <rect width={width} height={height} fill="#0e1117" />
        {[-60, -30, 0, 30, 60].map((lat) => {
          const y = ((90 - lat) / 180) * height;
          return (
            <line
              key={lat}
              x1={0}
              y1={y}
              x2={width}
              y2={y}
              stroke="#1a2030"
              strokeWidth="0.5"
            />
          );
        })}
        {[-120, -60, 0, 60, 120].map((lon) => {
          const x = ((lon + 180) / 360) * width;
          return (
            <line
              key={lon}
              x1={x}
              y1={0}
              x2={x}
              y2={height}
              stroke="#1a2030"
              strokeWidth="0.5"
            />
          );
        })}
        <path
          d="M 95 60 L 220 55 L 230 120 L 200 160 L 180 200 L 160 240 L 130 220 L 100 180 L 80 130 Z"
          fill="#151e2e"
          stroke="#22304a"
          strokeWidth="0.8"
        />
        <path
          d="M 160 240 L 200 235 L 215 280 L 210 340 L 190 380 L 165 370 L 150 320 L 145 270 Z"
          fill="#151e2e"
          stroke="#22304a"
          strokeWidth="0.8"
        />
        <path
          d="M 420 55 L 480 50 L 490 90 L 470 110 L 450 105 L 430 95 L 415 75 Z"
          fill="#151e2e"
          stroke="#22304a"
          strokeWidth="0.8"
        />
        <path
          d="M 430 130 L 490 125 L 510 170 L 510 260 L 490 320 L 460 340 L 435 310 L 420 250 L 415 180 Z"
          fill="#151e2e"
          stroke="#22304a"
          strokeWidth="0.8"
        />
        <path
          d="M 490 50 L 720 45 L 740 100 L 710 150 L 660 160 L 600 155 L 550 130 L 510 100 L 490 75 Z"
          fill="#151e2e"
          stroke="#22304a"
          strokeWidth="0.8"
        />
        <path
          d="M 680 270 L 760 265 L 780 310 L 760 350 L 710 355 L 680 320 Z"
          fill="#151e2e"
          stroke="#22304a"
          strokeWidth="0.8"
        />
        <ellipse
          cx="435"
          cy="68"
          rx="8"
          ry="12"
          fill="#151e2e"
          stroke="#22304a"
          strokeWidth="0.8"
        />
        {Object.values(grouped).map((v, i) => {
          const { x, y } = toXY(v.lat, v.lon);
          const r = Math.min(3 + v.count * 2, 18);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={r + 4} fill="#C8A96E" opacity="0.18" />
              <circle cx={x} cy={y} r={r} fill="#C8A96E" opacity="0.9" />
              <text
                x={x}
                y={y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="8"
                fill="#0c0c0e"
                fontWeight="bold"
              >
                {v.count > 1 ? v.count : ""}
              </text>
            </g>
          );
        })}
        <text x="10" y="430" fontSize="9" fill="#1e2a3a" fontFamily="monospace">
          Equirectangular projection
        </text>
      </svg>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────
export default function App() {
  const [activeRef, setActiveRef] = useState(null);
  const [tab, setTab] = useState("references");

  // ── Main password gate ─────────────────────────────────────
  const [unlocked, setUnlocked] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);

  // ── Hidden admin panel (5-click footer trigger) ────────────
  const [copyrightClicks, setCopyrightClicks] = useState(0);
  const [showAdminEntry, setShowAdminEntry] = useState(false);
  const [adminInput, setAdminInput] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminError, setAdminError] = useState(false);

  const [visits, setVisits] = useState([]);
  const [visitorInfo, setVisitorInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // ── OG / social preview meta tags — image embedded as base64 ─
  // No external hosting needed. Image lives directly in this file.
  useEffect(() => {
    const IMAGE_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAAJ2CAIAAADAIuwLAAB1OUlEQVR42u3ddXwb9/3H8RODJcuWmZkTO8zMKSQppwxbu63ruOvWdv2t629dx/t1zCszpUnaNNSkQYfZdszMtiSj+PeHOtcRxXZsx05ez0f7eMRfnU6nz51O99bdfb+ig29+UwAAAAAAXH3ElAAAAAAACIQAAAAAAAIhAAAAAIBACAAAAAC4Iok0mkCqAAAAAABXIc4QAgAAAACBEAAAAABAIAQAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAACGRjrWFig9MWxoT+wwE24BAAAAjBKtwjG0J56vaCYQjpsCAQAAAICn+iE9a8gnwEYIZ9UAAAAA4CpFIAQAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAACugkDYYSajAgAAALgyjbW8Q/oCAAAAgKsUgRAAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAEQgAAAAAAgRAAAAAAQCAEAAAAABAIAQAAAAAEQgAAAAAAgRAAAAAAQCAEAAAAABAIAQAAAAAEQgAAAADAmCWlBAN383ULq+ua8o8V9LWsWTmn3dCxJ/+0r6d8/f51YrGo70+DqfPlt7cNy8RhIbrbb1h66HjBwaMFgiCsWDQtLSn2T//5YFhm7ppeEAmCU7A77M2txj0HTze1tPuvT05GYmJ8pEgQVVTXnymsuMhPEWLx7TcssVisb2/cfdHKuxbebne0GTpOnCkpLKnyM7FKqVgyb3J8bLjd7igsrtp76LTD4RzeLWHg73RQCzPYdQoAAAAQCEdPYUlVbnZyXyCUyaRx0eEHj57z/6x3N39W19A6wJcY1MRd3b3pyXEHjxZIpZKIsODhnbkgCO9/tKeuoVUqlUyflHnd8ln/fv1jPxPPnT4hLib84535VqvtmqWzAtSq/snZU2JcRE19c0hwYFCgxmDqHMjCt7aZEuIiFs+dLJGIzxb5jGErF08XCcKLb36iUMjXrJxjsVpd+Wq4DOqdDnZhBrtOAQAAgEvBJaODUFJeGxykDdQGfB5pYiNMHV1NLYbLtTy9vZZesyUqXJ+SEF3f2DpCr2Kz2QtLqjQBKrlc5msamVQ6aULK/sNnjaau7h7zp/uOx0aH+Z9tZmp8aUVdaUVdekrcAJfEbLGeL605dKxg2qQMX9NoNer4mPC9h85095jbDR1HT57PyUgaxmoM6p0OYWFGZ50CAAAABMLBBzCzpbK6MSUx2vVncmJ0YWn15VwgkVBcVpOeEpeWHFtcXjtCL6JQyCblpDa1GCwWq69pQvSBEomk75rS1nbTu5s+8zNPuUwWEa6vrW8prajLSIkd1PJU1zXrtAFKhdzro6F6ndPpbGkzuv5sajEEqJW+Jh6CQb3ToSzMqKxTAAAAwIVLRgenqLQ6Lzvl+OlisVicGBt58Mi5iz7lpmsX9P374NFzh08UDdfEruW5+bqFDqejfgDXgg525utWzRMEQSqVFJyv3Lh1v7/NSCoRBMFitQ2wjGnJMZXVjU6ns7Orx2K1hYcGDfxEa6/ZIgiCTCZ1/cONTCa12mxO5+f36VmsVj8TD+UDM5h3OrSFGdQ6BQAAAAiEo6e8qn7JvMkqlSJMr2szdhg7ui76lJG7h1AQhO4es7Gjq6nF4ByBmX+wZW9zi/HuW5ZX1TZ1dff6mdL1qEIh6+kxD2TOGalxkWH6jNRYQRDEIlFGavzAA6FKqRAEwWz2frrSYrHKZTKRSOSKYXKZTBCE7p7e4doABvVOh7Ywg1qnAAAAwKXgktHBsdnsZZV1yfFRSQlRRX77uhw1G7bsO3Dk7AjN3Gqz7T98dt7Mia4w44vJ1NXTa44K17v+lMukd9y41Ne1kZoAVZg+6K8vffiXFz78ywsfvvb+zvTkWJFINMBFio8Nb203uc62eWptMwqCEB4a5PozIizIYOq02x3DVZBBvdMhL8yIrlMAAACAQDh0RSXV8bERsVFhxWVXxS1ehSVVHZ3ds6Zm+ZnG7nAcOl44Z3qOPkirkMuWLZja0NTm68LIjNS46rqmvtEX2g0ddrs9NirsoksilUpSEqKn5WUc8X2xa0dXT2VN49wZE9QqRbBOO2Vi+smzpQN5m3ffsnzloukXnWxQ73TICwMAAACMDi4ZHbTquuZFcyYZTJ09vQO6PLL/nXuCILzw5icdnd3DMvFgDXnmnx08dfN1C86dr+zrH8XTybOl3T3mWVOzJRJJVW3jqXNlvqbMTIk/cbakf0tFdaMrJfpfeKfTaTB1fXbgVJHfvny27jqyZN7k+25bZbPbzxVV+FmSoRn4Ox2FhQEAAAAuhUijCRxTCxQVFVFf38iKAQAAAHDlGWt5h0tGAQAAAOAqRSAEAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAAgRAAAAAAQCAEAAAAABAIAQAAAAAEQgAAAAAAgRAAAAAAQCAEAAAAABAIAQAAAAAEQgAAAAAAgRAAAAAAQCAEAAAAABAIAQAAAAAEQgAAAAAAgRAAAAAAQCAEAAAAABAIAQAAAAAEQgAAAAAAgRAAAAAAQCAEAAAAABAIAQAAAAAEQgAAAAAAgRAAAAAAQCAEAAAAABAIAQAAAIBASAkAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAABAIAQAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAAARCAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAACAYSalBMDAzcqL++k3l/qZ4J/vHn3jo9MUCuPXw7fPuHFZtp8J2k09t3znTQrl1eIZSU9+ZaH/aa5/+NUes5V9I9jDsIcBxgjOEAKD0NTaefhMbXN7F6XAlaqwrOV4QX1Le7fTSTEGra65I/9UTV1Th8NxdZWPfSPYwwDjF2cIgUEoq2l//HfbBEEIUMkTY4JWzk29ZkE6ZcGVZGd+2c78MkEQFHJpbGRgXKTu+/fPU8glVGYgispbnnx+uyAIUqk4JjwwLjLw4dtnhusDxsjiiUSipJigtISQlHh9ZIgmVB8QolMp5FKFXCKViC1Wh9Vmt1jt3b1WY0dvu6nX0NHT3NZV29RR12iqa+7o7LawbxynggKVq+alRYVqG1o6P9lX3GbsYQ8DgECIcenZby2bmRt7WV66oKz5G89u7vuzq8dytqQpNiLw6jzoee/52wM1isE+q9dsu+7hV/xMsOnPdykVg94ptbR3r3/0LT4dw85ssZVWtZVWtX3nntkKgcO1wbHZHJV1hso6wx3X5V32QCgRi2dPip03JWHGxFg/n1yFXOI6LtfrVLERgZ4TtBl7SqraSqtbS6raDpyotljtntNc5fvGsSk9IeTn313Rt+pvXT3hid9tKyhrZg8DgEAIYIg6us1DCIQd3eaLTjCEQNh5sdkCVy2VQnbTiuzrF2WEBKm9TuB0OttNvb1mm8VqUypkAWp5gFImFou8TqzXqWZMjJkxMUYQhPuffL+6wUiFxz6xWPSjry7qv8fWquVPfW3RPY+/a7M5qA8AAiGAobj38fd0GqXrap+4SF1cZOD0iTEy6QU/8drsjkOna2sajNUNxuoGU3WD0djR63+2tz/6tk6rdM0wLlIXG6mbMTFGKrngVmezxX74TN9sjdUNpo4uAiHgxer5aQ/cOCU4UOXWbjD17jtedbq4sbCsuaG10zMVRIRoUuL1qfH67JTwSZmRbp9BF4mEPgjGh/SEkOhwrVtjuD4gKzns9PlG6gOAQIjxqrG18+DJmrrmjlZDt6nT3NFl7um1Wqx2s9VutztsdofTKTidTkEQ1i3JeujWaW5P//0rBw+cqBZEgkQsEotFYpFIKhErFVK5XKqQSQLU8gCVLEirDA1ST5sQExWmpeCejJ29xpLesyVNrj9f/eXNESGa/hN0dJn/5w87Bj3bjl5jR++Z4s8PU97+3W1uh7NNbZ1P/2kn9Qf80GmV379/7qy8OLf28xUtr246deBktf8+bxpbOxtbO/cfrxIEQaOWz86LWzo7ZVpO9AVHDxIRdR4XVEqZ13a1j3YABEJgfNi2v/SFD44PZEq7w8slMR1d5gH2hrd+9cQv3zyVggMYL6LCtD//7vKY8AtuAuzutf79rSObPysabNeOnd2WbQdKtx0ozUwKvXvNpL67uKWcIRwnSqvbrDa75xUcxZWtFAeACzt0jEv1zR1X2AsBwLCkwecfv8YtDTa3dX3ruY827S66lI7+C8tbnnx+e8d/OxrlktHxwtRpfnHDCbfG1zafuowdjQIYazhDCAIhgRBXhZzU8EmZUR1d5g8/LaQaVyStWv6zby/T6y64ytrY0fu9X22paxqeXVlFTfvE9AiBM4TjyhsfnTZ29N66akJUmLahpfPdrWc37iqiLAAIhBjngbCl8wp7IWBEiUTCt++enRQbXNfUQSC8Un3v/rlxkbr+LU6n8yd/2TVcaVAQhPJaAuG49PGe4o/3FFMHAF6xQ8f4Y7M5Wtq7R+e1OrrMXT0Wao7xblZuXFJsMHW4DC7lMs3BWDIzed6UBLfGD3YUnipqGMZXKa9pd/1DKuX4AQAIhMBl0tja6RytYyxBEBqaOUmIce/2a3MpwhWcB2VSyUO3uHen3N1jfXnjieF9obL/BkLuIQQAAiFw2YzyfX31LdxGiPEtLyMyOyWMOlwWdsdoJMLrF2WEBrsPPf/hrkJT5zCP0llRa/g8ghIIAeBKwT2EGE+efH776L/o03/6dBBTO1lLGHM4PXgZWW32kX4JkUi4cXm2+67IKXz82fDfM9bVY1n2pReG8kz2jQAwVvELHzCcHA6OejC2pCWEuA0pjtHUa7aN9EtMyoyKDNW4NRZVtNQ2mdg3AgAuijOEwHCy2R1uLXqdamZubG56ZEq8PjJUo5BLOrssTW1dJ4sadhwsu5ShgeOidHMnxWenhsdFBobo1AqFxGy2Gzt7DR29BWXNR8/WnShsMFtsrJQRrZhIJIqP0iXHBsdF6WIjAsOCA/RBqkCNUiGTSCXi7l5rV4+lrqmjuKr18OnaE4X1w35HmVwmmT4hZu6U+JyU8PCQgF/+a++nh8r7T3D7NRMvY80vb31Cg9UzJsbmZUSmxusjQjRSidjUZa5v7jhRWP/JvpJL6XtTJpVMzYmelBmZGh8SGaoJ1CiUcqnVZu/qsfb0Wju7LbVNppoGU3WDUSwWjXSRl8xM9mzMP1V91e4bh/ZJ8SQWi3LTIyZlRqUnhkaFavRBKoVcKhIJZrO93dTT0NpZXNF6oqjhREG957sby1vvJdLrVLPy4rJTwhKigyJCNAEqmVwmsdkdVqujq9di7DAbTD2NrV31LR21jaaKWkNtk2l0fg4Yoe9EhVy6YGrCxPSIjMTQYJ1Ko5aLxSKLxW7qMrcZe5paO2ubTNUNpvKa9sp6g83mEAACIXCV6/3vl41aKVswLXHl3NQJaRGiCw8IdVqlTqtMSwi5aXnOzvyy3764f7BfUXkZkfetm+zq/L0/tUqsVsmiwrRZyWE3Lss2dZpf23xqw87CUbhobYwboYo9ePO0tUsylQqfO1KNWq5RyyNCNJOzom5dOaGhpfPPbxzaf7zK1/QP3z7jxmXZvh69/ftvN7d19f0Zpg+4YWnWqnlpgRqF58Qpcfq5U+LnTo5PidP3b48O127/132e0//x1fwPdhYMb9mHvT6LZyQ9+ZWFvh695/F3XUfJrgO4VfPTctMj3T59ep1Kr1PlpIbftnri+9sL/v72kcH2UKXTKm9bNeHahekBKrnngaNCLhV0KkEQMpJCR23z9noG+ERhwxW8bxzGT4qvLfPGZdlrFmcGBSo9H3XtN2IiAqdmR6+/ZmJHt2XzrqK3Pjnj/47NUd56v3zz1PWrff4YZLXZV3/l5cGuxKnZ0beunjAlK1ok8vITiUwqUatkYcEBbg8ZTL03f+eN8biHl0kld12fu3ZJlkbt/mGXqsRqlSwyVNP/9myb3XH9w6/yhQsCIXC16+y2hOkDbr9m4sq5qQr5RT5fIpGwdFZyVJj2e7/cMsCvEKlU/I07Zl27MN39YMtsazF0qxRSvU4l+u93daBG8dXbpl+zIP2Hv93a1O/w6Orax41kxaLDtZ5px9jZW9Ng6ugyS6WShChdmP6Lw6PIUM0zjyx546PT/3z3qNcZFle2ltW0J0YHeT2tFKRVug5zw4ID7l6Tt2Juqtex4NISQn788GLPawhH37DXp6Gls6CsOS0+xOuYBxEhmo5O880rJ9ywNEutkl1kw5CIb1mZE64P+N+/7hr4O1oyM/kbd87UBnjJFb1mW4/ZqlRIFTLpKJwV7BN3YQ1dHA7nsJ9hG1P7xmH5pPgyb0r8t+6eHRyocmvv6rG0GXuUcmmwTtV/hlq1fP01E69dmP6HV/N35pf5mu0ob70lVW1F5S2JMcEKueTSV59ep/rOvXNm58W5tTudgqmr12DqVcilrt93vMQq2QjenTRye/ioMO0zjyxxG62nu8faZupxOpxqlaz/nPvWi0gkAARC4Gp3/aKMJx5cMKgRurJTwu6/YfLf3z5y0SkVculz316WmxHZv3HXofJ3t50rKGt2/anTKFfPT7tn7SS57PODgPgo3e+fuPb7v/6kusF4ta2O0axYQ0vnpt1Fnx2pcLuUa/qEmO8/ME+v++Lgcv01E2saTVv2eunwY9v+0m37SxVyaVpCyDUL0lbMSe3/qE6jkErF61dPvP2aXD8HeUFaZZBW2XfrmlskczoFr2ddrPaR/VV7WOpTUNb8jWc3y6SStAT9dYsy3Opzx7W5GYmhFz2Y7m/h9MRjBembd58fyMQP3Djljgu753E6nXuPVW3ZW3yupKmj+4sBS2VSSUiQKjo8MDpMe/eavJAg9cgVNj0hxLOxtsk0CvcuXsZ947B8Ury687q8+2+Y3L+lqt74/o6CPUcrDKbevryalhC6aEbimkVfnADXBiieeGhBSpz+H+9435mP8ta761D5rkPlYrEoLlKXEqd/5I6ZAz9B6r6NJYb+9JtL+39IBUHIP1WzZW/xodM1Zou9f25MTwydMylu4fREz1Po42gPHxKk/tWjK/v/rLb7cMWbW84UV7b2nZVVKqQZiaHL56SsmJM6mr8BAQRCYKybnBVl7OwtrmyrrDNU1xub27taDd09Zpvd7tAGKFLj9a4LpdyedeOy7Lc+OdN3tOGVSCQ89dWF/b/5nE7hNy/scztuNnb2vvHx6WMF9b99bFXfkUposPqJhxY88tPNdsdVdHvDaFZsw87CP79+yOvEh8/U/vC3W//y4+slYnH/aPHpobL+B1L9mS22M8WNMeFat0PG7NTwB2+Z5nYJqNdXvO7hV/r+/Phvd8ukXxwT1zd33PP4u6O8Loa3Plab/Vxpc1ykzq0+rk/fkTNNlXWGqgZjc1tXq7Gnt9fmcDqDtMqc1PA1izOjw7Vuc7t37eRP9pZc9B6wO6/Lc0uDBlPvc//47Oi5Oq9L2NDS2dDSeUwQrlmYPqKB0Ov2cBlvMBvNfeMlflI8rVua5ZYGP9hR8Le3jridpXQ6hfMVLecrWjbvOv/kVxakJ35xefBtqyeYrbaXNpzw9RKjvPU6HM7KOkNlneG+dZOHFghT4/W/enRF/3TX2W353Uv7dx+u8Jy4zdhz8GT1wZPVf33r8DfvnLVsdso43cN/9945/dPgv9499vpHp9ym6TXbThY1nCxq2Lz7/POPX0MmBIEQwOde/vDkixuOe32ooaWzuLL14z3FN6/I+ept0y/4HErFy2envP3JWf9HKrMuvFzn5Q9PeD2LIgjC+YqWP79x6Lv3zulrSUsIuW31hNc2n7p61sVoVuyjPef9RMeymvYdB8v6H/+5emXwekTlxz1rJrkOeipq208XN5bXtFfWGVqNPTab48//c51Ooxyz62J06uPn01ff3FFQ1vzBzoIffmn+ohlJ/R/S61QzcmP93LjoOli/b90kt2PBR3+1paLOcNlrGxel8/p+r55943B9UuKjdF+5dVr/lm0HSv/4Wr6fF6ptMv3gt9v++OS1MRGBfY13Xz/pXGnzkTO1Y2TrvRSBGsUz31jaPw3a7I7/+cOOU+cb/T+xu8e6aff5EQ2EI7eHz82InJkb2/fnudJmzzTYX0FZ86HTNbM8rqcFxhGGnQCGk9l68cu03tl61vM+k4npkf6/le9bd8Hv1nVNHa9u8vcV9cnekuYL75G4eUVO/zNFV7bRrFibsaesus3/NHuPVrq1TMqMGuybqqwzPP/KwZu+/fqDP97w+1cObtxVdOp8Y22jqbG18/XNp8fsuhi1+lz002ezOX757721je6DMeR69EXhlkm+fc9st5uFfvfS/rGQBgVBCPV2+rHd7+UGV9K+cbg+KWKx6LEvze//eW9u7/q/l/Zf9LU6usw//tOn/XvRFImEb901a7A72xHaei/Rw+tnhF94h+o/3j5y0TToUljWPHLXLY/oHn7JzAtS9yf7Lj6ep68gChAIAfjk+YN3WoK/q5vWLM50ux/jjY9P+7+a0e5wbDtQ6vYNOndK/FVS4dGs2JGztRftqLKkyj0RxfY7pTBA2w6Ubvy00GtPhh9+WtjcPkb7DRq1+gyExWp/Z9s5j09fiJ+nrJ6fHhN+wcKUVrftOFg2Rsrr9XpUU2fvOP3kDnbfOFyflHlTEjIv7Bj2/W0Fvi5adlNR277jwhwbFaZdNS91LGy9lyI9MdTtFF9ja+eGTwsH+HSb3XGmpGk87uEnZ0VduH4NF12egydrDKbx+qEDBC4ZBS6LkqrW7h5r//4DgrQ+r/cTiYRrFlzQhZrD4dzjcUbF06miBre7npbMTN51saG3hktwoMrr8AajYNQqVljeLBGLdhy4eDZoM/a4tQy5gwdfR4ovfnDioVumjakez8dOffo7etb9Wj6d1t/Vtjctdx/e4M2Pz4ydIgd66/K0q8d6Newbh/GT4tlN5Y78QWT+jz47v/zC7HTDsuyNu4ou+9Z7Ke641n3Uire3nB3UOHsnCuq9jokyxvfwbmfdBzKIos3ueOL/tumD1FbGIQSBEMAAOZ1Cq6Fbrfri5h/XIE5ej+YzEkPdLtopLG/p6DJf9FXO/bebtT6Zozg22mU0ahUbeDCw2R02u6N/V/V+Rucbmi17i8faZUtjqj596ps7nE5n/0tAA3x37ZiRFOp2rtJmc+w/UTVGKiwSCV777RyJcdLH4L5xuD4pkaGaKVkX5JaK2vZWQ/fA53mmuMnY2dv/7sT4KF1KvL60qu0ybr2XQqdRet4Ut/d45aBmcrywftzt4aVSsduwKEmxwQUeT/R0vrJVGGNjvQADxyWjwOXR49H1v6+RsiZlud9MVVo1oG+d7h5r/67whf+Oa3zF13ZsVsxtCGmRQJd0l6c+TqfQ02sbyEdPEATPgddOFzeOnREdfN2oZhvPQ2MPfN84XGZMjHUbPq6wvGWwW++ZYvfLI6dPiLm8W++lmJUX6zbnkqq2lvbuQc2kuLL1R7/f8b9/3T2O9vA2m8PtA37dwnQRwwviSscZQmCsy04Oc2up8ehXwJemlk5t/AV34CTGBHtenjcSTJ3m7/5yyyXO5LePrRrCpYPjtGIYvfApOAc4pdsQZ4IgnDrfMJZStI8HOH4djAyP00SVg+8xqLS6be7kC25Im5gW8YZw+jJuvZdiskfoKigd9A2BDofz4Mnqcfed2GLo7n9dQHpi6FdvnfaXNw/zSQGBEMBlEx8d5P6V1jbQ7kPcfg0VBEGrlo/OYtsdjora9kufydVTMYxBqfHuPZrUNJjGzuJZbXa3CwhdZFIu/xlMIEx075elvrlzsDPx3DCSY4PHb036D6442NA13r8TjxfUu10oftOKnOiIwD++mt/Y2snnBVckvjOAMU0kEvoPj+vSM+Ar1sweF1+pR+aGEyqGK09osFqtdF/7tWNszHevPWEqZPzaO1ASsTg+yj1gtBm7Bzsfz85Lw/QBCrlknNYkJkLr1ljdYLxK9vA7vfUnNDsv7sWf3fjYl+ZNTI/gBDyuPHxnAGOaRq3wvEXE8yvNF4vV/WDRratuKkbF4EtYcIBnY2PL2DpF0G7qiQpzP3YPGrGeJ6/EPYZcLHY/wO/0OI90UV5HuQgOVDW0jL9zSsE6pUQs9tjSesfG+hrxPfzp8417jlbOn5rgfsQsFa+Yk7piTmpja+en+eXbD5SOkcFIAQIhcIXTBnhJI7/7weqhf+av9GvJLkvFQoPVmUmhyXH6cH1AaHBAgEqmUsqUcqlMKpbLJDKpRCYTex5gXT3GaX2CA73Eqh7z2BrRoamty0sgDCQQDlSA2sslAG4dtwxEV4+XDBmoUY7HQOh1KIsx0pfS6Ozhn3/lQFJssK/RUCNCNOuvmbj+monnK1o+3lO8/UDZWNstAARC4Ioil0oowpitmEwqWTU/bfX8tPQRGxt6XBvv9VEq3KOC0+n0PMNwedU1deR59HzjGRHhMxB6uwRgCON2WK1eniKXjcsduFIuHbOBcHT28AZT77d//tHPvrXM817K/tITQ9MTQ79009T3tp174+PTY23nABAIgSuE57VMgiBU1RuHPCqXYWxc9nMFVCwnNfwHX5ofHe5+5N3VY6msMxpMPcZOs8Vqd/1ntdnvXpN3VZ0kvALq43k07/WGvcuruLJ19fw0t8a4yEB2ngOk8BZ+BjIWucdTvARCqWRc3m0m8bYXtYyNsUxGbQ9vMPV+49mP1izJuP2aXP+DD2nU8nvWTlo6K/mpP+yoqjfymQKBEMAw8/pD9VN/2FHbaKI4l7Fi0ybEPPPIkv6BwWyxfbCjcNv+ksp6g9fBAO68Lldy1eTBK7U+Y3A4sqIKLyPmxUbqFHLJGIyvY5DXi/0kgw9yYm+br9XmGI818brY0rHx+RzN70S7w/H+9oKNu4oWTE1cOS91cmaU1zjqEhMR+Pzj13z3l1vKa9r5WIFACGA4eb0ERSahf+DLWbGQIPWTDy3on3bajD3f++WWMdIL32V3xdTHc1tSyCUikcjpdI6dhSyubDV1mt2G65RKxBlJYaeKGtgaL6rLW/8xQwg/Xi9lHKfXEPZ666NFqZCOzU/lSH8n2myOnfllO/PLggKV86cmLpiakJcR6TUZagMUTz+8+Cs/+XCMXF4LDByHlcCY1tHl5WBlnN6XcsVU7PZrJ2oDLjj+/s0L+0iDV159unu9nDvyenvVZeRwOPNP13i2T82OYlMcUCDs8bKWPYcbuagAbwOWGjrG5SX6Rm+LrbvwR4er8DvRYOrd+Gnh93/9ya3fe/Mf7xxxG87eJSYicN3SLD5WIBACGN6DFYvnrRF0IXgZKyYRi5fOSunfUtfUccjbEfnV6Uqqj9fD4mDdmPv07TjoZdi0eVMS2BoHuMeweVwhqR18+PHMS06ns93UMx5r0m7q9bwyMyJEw3diXzJ88+Mzd//w3Q92FHg+um4JgRAEQgDDzbPX8pAgNWW5XBVLTdBrLzwVcLKoYSxdQniZXUn1aWz1MmBAXKRurC3n0bO1njdQJUQH+e8gccgWTkvc/q/7tv/rvnE66robh8NZXtt+6XuMcH2A547INj7vIXQ6nTUeW1R8VBDfif2ZLbY/vpb/97ePuLWHBqsTooMEgEAIYBhVN7h/MSfyZXP5KhbvkQe4WPRKrU+bsafb43rC+KgxFwidTuHNLWc8228YmUvXUuL1rn/YbFfIDyHnK1rdWqJCBz1uR6zHll82njsXKa1qc2vJSgnjO9HTW1vOHD1X574xRNDNLwiEAIZVUbl7L4KZyWGU5XJVLNDjwjCvA1Jfta6w+hRXuUeFSZlj8d68LXuLK+sMbo1LZyXHjUB8TY3/fFRJu8NxhewxPHpqTYoNGnxZ9G4tp843jt+anPTokWhiWoRibNxAO9a+E9/bdu6iu0GAQAjgkpw+7/7FnJ0Sxm2El6tingMPiAQRNb9S63OqyP2YfnJWlEI+5jrodjicv3/loFv3p2Kx6Ou3zxyBQKgXhjR0+5iVf6rGbeDBzKTBBQyJWJyTGu7WeHg831qcf6rGbXNSyCULpo6JG1NH+jvxtz9Y/a27Zg18+nOlzW4tV9KnAwRCAGPCmZImU6fZ7Zj7uoUZVOayVMyz50mdlh+Dr9j6HDhR5dYil0mWzkoeg4t6sqjB88LRaTnRw9vFRVCg0jVIt/0KOuRtNXS79dQaHa6NCR/EVX+5GRGaC2+dLa1qG9djlLcauo8X1Ls13rZ6gp+B+K6Y78Ss5NBrF2b4H4y+P8+hLI3js3dZEAgBjF0Oh3P7wVK3xltW5oR59GGAUaiYqdP9mz4lTj+Wq2G3X/Azv0o5sme3xl19/Dtf2VrhcSnm3dfnyaRjsT+V/7x3/NDpWrfGr66fPjU7erhe4ovrRe1XVE9KH+0+79aydPYgYv91i9zTyPve+p8cX97+5KxbS2JM8C0rc66G70SxWLRsdsoAJ9Zp3E9O1jZ18EUMAiGAYfb+9gK3S1ACVPKnvrpojIwUfFVVrLTavaOIGRNj1SrZmC2F2ym74ECV5+HLMBp39bmod7e6HxaH6QO+OZgrykYv/Dscz/zl07MlTf0bpRLx048snjExZlheIiPx80B4hV0Ud/BUzZniCy4PXrskM0AlH8hz0xNC3K6lrK43bj9QOt5rcvhM7YlC94szv3Tj1NXz066G78QVc1MHOGX2hd3t1Dd3ePb6CxAIAVyq+uaODR6/N2enhP3q0ZVjZGyoq6di9c0dbuMRKxXSh9fP8POUqDDt19bPkEokl6sUbi2r5qeO6MuNr/pc1Cf7Sio8hiVYPT/tK7dOl0rG3Hdor9n22G+2HjhZ3b9RpZD99JvL7rwuTyIe+gKrlbIHbpxyz9pJV2QgdDqdv/rPPrPliwHudBrlY1+aJ7rYBZI6jfJ/Hl7c/9ZZh8P5u5cPXBn1+d1L+91+URKLRd+7b+7X1s9wu0T2yvtOTIwOyhpYXzVuI9FvP1DGVzAIhABGxL/fP+bZiXlWcti/f7rua7dNT4n3eVVegEqenhCydFbyQ7dOu6oGMBy5inn+9r9qXtqPH16cFBvc1yIRi1Pi9WsWZ/7msVUvPXfTTcuzRZfp1puzpU1uLfeunew5arlaKRv4PTP+ja/6XJTD4fz5P/d4joV9y8qcP//P9QunJXrtYyY+Srd2Sebzj1+TnhAyygtstth+/MedL314on8voGKx6P4bJv/1x9fPnRw/2FLHReq+fPPUV3958x3X5vZFSvsV121GbaPpr28e6t8yd3L8d+6Z42e4xdiIwF98b0Vk6AUJ5J/vHj3l0UXn+K3Jc3//zLM72ZuWZ7/6y5u/fNPUCWkRUqnPI8ngQNXkrKi7rs978OZp4/E78WffXjZ3crz/xbhv3eS8jMi+P9tNPW95GwMGGOO43gxXFIVcGhmq+e9/2qgwTd8dLxccEK+bPG9qQkNzZ0NrZ0NzR0NLZ2Nrp8VqH9QLpcbr8zIj3dqzk8MmZ0WVVLZ2dPvsaj8yVJOWEBLs0SXa4plJp4oaanxcamK22B//3bbfPLbKbYAjhVx604qcm1bkdHZbquqNxs5ei9Uul0lUCllwoFIfpO4/SvjHe4pbDcNTap1WGR+li4vUJUTp4qKCQnTuX6uBGsVz31leVW+srjdW1RuqGowG08Xvsw8KVMZH6uKjguKidPFROs/OuyNCNM9+a1lVvbG6wVhVb6yqN7j1LjAKFXtv+7lrF6a7XU42f2rC/KkJPWZrV7dVpZSqlfL+h90bdxUFaZXz+11XplHLF0xLLCxrbmrrGujWlRI+Z1JcdYOprqlj4D3+b9tfeuvKCf1b5DLJ019fXFFnqGkwyqQSjVoeEaIJDVZv2Fn4h1cP9k2mVcvjonTxUUFu98spFdKVc1Or6o01DUav2/lI10cmlaTG63MzBv3pE4lEsRGBaQkhbu9IIZcunJ5YUOrltVxKqtp+9vfPfvTVhW5n2JJjg5/62iKzxVbdYGo1dFusdqVCqg9URYVr1crPr5K12RxuR8yLZyadPt9Y02h0jthdeA6H86UNJw6dqvnmXbP6D0+fFBv8k0eWNLR07swvO3aurqCsxWyxeTkykIoTo4NS40PSEkKmZEV5HbvC1xmw0dw3Du8nxbUdBqjkX7ppat/Gec2C9InpEe9sPfvZkcqOLnP/Vb90Vsq6pZn9fw5wOoUXNxz3nwdGeetVq2Txkbq4KJ3bCT2xWLRqXlp1g7G6wehrF+py4GT1M3/e9cRDC9x++AhQyddfM3H9NRPNFltdU0dHl9nUZXE6nTKpWKWUBQeqQoJUfTsBrwl5yHuYUftO1AYofvLIknOlzRt2FhwvqO9/7YNcJsnLiLx11YTJWVH9F+l//7LLs48ZYOwTaTRja/TMqKiI+vpGVgyG4D/P3hAXOcRBt5xO4Vxp07ee++iiUy6fnXLzypykmGD/na01tHSePt/4i3/t6WsJ0wc8ev/c9IQQbYC/Thc7uswFZS0//uNOzzMSrqPkR++f63l6ZyBv8LOjFb/5zz7PTiCH4MXnbhxUF3wuze1dtz/6tp8JXv/1LWHBg+4VoKK2/cv/s8HXoyNUsUUzkp58aIFoAKdazBbbX988vHFX0Q3LsryOAdBm7Dlb0vSTP3868K3LZnfUN3dU1xt//cI+/wdzLo/eP3fVvIvf9uMKhEtnJV+3MCM+SqfTXvxWQ4Opt6rBuHl30Y6DZaNQn6zksIdvn5Ear/ffp4vnpy89MfSrt01Pjdf35TSv2ow9R87W/vJfe70+Oi0n+vEHFwykLC4Wq/0/7x8TiUQP3eLl9Ehnt6WwvOVnf989kDU49O94kbBwetJtqyakeTtR6XQKLYaulvbunl6rw+FUq+QBKplGLddplRe9GrawvOWRn266XPvGEfqkuLhODLoNY+B0Og0dvW3GHoVcqtepPDekNmPP/718YP/xKl+zHc2td86kuJtW5MRF6gZy2t/Uaa5uMG4/WLbx00Jf0yRGBz36wLzMpNAhbIRmi+0vbxzetLvI9eew7GFGdA//8d/u9rqO2k09xk6zxWoPUMkiQzVuPw+1GXue+8dnnl2zAuMi73CGEFeOS+kqQyQa6EiyaYkhA+k1MTJU4/blHahRDKSvP22AYsbEGKlE7DUQdnZbnv7Tp9MmxKxfPXGSx+/iXrUauncdrti0u6h6+PpA16oVI/Gsoc1W4/dZI1SxXYfKbTb7d+6d42ers9rsm3eff3XTqXZTj+BtrCoXvU41Ky92UFuXVCKOi9TFRerUbxwayGHuH149GByompkb62dRPztS+c7Ws4IgZCSFTkyPGGDxgwKVQYHKkqpWt8O1EapPZKhmIHf1eH76IkM1uQN4U3qdavoEn52vHDlb98BTH9yzZtLq+WlymcTvEbB9+4HSN7ecrmvq8LXVadTyaTnRaqVsRAOh0ynsOlS+61B5ZlLo0lkpsyfF9b++USQSwoIDBvgrjMPhrGvuKCxrPl3ceOp8o+enYzT3jSP0SXHZd7zqVFHDLasmXL8ooy+jikSi4EBVcKDKaxLbsLPw/R3nunus/t/4qG29SbH6vIzIAb7fQI0iJzW8oaXTTyCsqDN849lNC6Yl3rQ8x60PFT9qm0zbD5R++GlR/2EYhmUPM6J7+Fc3nZo/JSE5Tu/2i5avDaCz2/LJvpKXNpzo6rFwJIZxijOEwHgVrg+YmReXnRwWH6UL0wcEqORymbin19bRbTZ2msuq24oqWgtKm0qr25xOqjUiFVMrZSvnpU6fEJsUExSoUQqC09DRazD1lla3HT5Te+xc/Zg6PlgwLXHZ7JTMpNDAAIXVbu/ostQ2mkqq2s6VNh09V+f/WHZoxld9BvMbhHzu5Pi8zMjkWH24PkCtkglOwdRlbjf1nK9oPVXUcPBUTf/LC8eUmIjAjMTQ1AR9bHhgmD4gJEitlEvlcolELLJYHVab3WK1my0219mwNkN3i6GnrslUWWeobjB5/ZXqCiaViKfmROdlRqbFh0SFaYO0SoVcYnc4e822NmNPXZPpfGXr8YL6M8VNzqtpJxsRopkxMSYjKTQhOigsOEAbIJdJJVabo6vH0tVjaWztKq9pL69pP1vaNMqdbQ7vHl6jlmcmhabE62MjdFFh2nB9gEYtVytlgkjo6bV29Vjrmztc+8/8UzWDuuUEGIN5h0AIAAAAAFdp3qGXUQAAAAC4ShEIAQAAAIBACAAAAAAgEAIAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAACIQAAAAAQCAEAAAAABAIAQAAAAAEQgAAAAAAgRAAAAAAQCAEAAAAABAIAQAAAAAEQgAAAAAAgRAAAAAAQCAEAAAAAIxZUkoAAAC80uuDblqzKiYmsq6u4b0Pt7a0tlETACAQAsDVYv/Od4J0gQOZ8sVX3/vFb/86QoshEok+ePNvaSmJF52yta19/vLbWHEYFjlZaf/403N9H4EH7rn1K9988uTpAioDAFcSLhkFAJ9Mps4BTnnj2pUqlXKEFmPhvBkDSYOCIBgHvMCAfxKx+Lc/f7L/DyKBgZrf/vxJmYyfkgHgisJuHQB8WrXuvuAgXVJCbGJibFJCXFJC7Lw50+VymeeUWk3AuuuWv/72xpFYjC/fv95ru9li2bv/SHlFdXllTUVldXlFjcFoYq1hWGRnpcXFRrs1RkWG507IPHr8DPUBAAIhAFwV2g3GdoPx2Mmzrj+3b3o5OirC65R33rb2jXc2OZ3O4V2AKXk5U/JyvD7U1NTyje89zTrCSAgIUHtt1wQEUBwAuJJwySgADI/kpPjZMyYP+2wffGA9tcXoKywqtVisbo02m+1sQTHFAQACIQDAi7tuv2F4Z5iWkrhg7gwKi9FnMJr+9LeX3Rr/9u/X6WgUAK4wXDIKAENhtlgUcrlb44K5M+Jio6tr6obrVb58320ikUgQBKfTabXavN6+CIyQf7zwRpvB8MA9t8bFRNbUNrz42ntvvrNpzC7t5LzsmdMnGY0dI3QrLwAQCAEAX6ioqHE4HVkZqf0bxWLRnbet+flvhmf8ieioiGtWLnL9e/feQ1kZKRHhoVQeo+ndD7a8+8GWsb+cIpHox098Kz01qbqmjkAIAIPCJaMAMESvvLHBs/GGNcM2/sT9d98skUhc//7nC29ScMCXRfNnpqcmUQcAIBACwOj5aMun7QajW6Nr/IlLn3lwkO6mtatc/z5+8tyxE3T0D/j04P30vQQABEIAGF1mi+Xt9z/2bL/ztrWuG/8uxd2336BUKlz//ucLb1BtwJcZU/Mm5WZTBwAgEALAaHvj7Y12h8OtMTkpfs7MKZcyW7Vadceta1z/Li2r3LUnn1IDvjA0CwAQCAHg8mhobN7x6T7P9jvXr7uU2d564zWBgRrXv//14lvDPtg9cMXIzkydO2sqdQCAIaOXUQC4JK+88cGKpfPdGi9l/AmpVHrvHTe5/t3Y2LJpy6fDtahisSgpMT4jLSkpMS4xPjYyIiwsVB+kC1Qo5VKptLuru6Ozq6q6rqCoZM/+I/mHTwxvEI0ID10wd8b0qblZGSnRURFSqdRoMlXXNOQfPvH+xq3DOFbHSFAqFSuWzp86ecLE7IyQkODAQI1ELO41WwwGU0trW31Dc2VVbXll9fmS8rLyKqvVNtj5h4XqF86bOSk3OyU5PjoqQqsJkMvlNpvNYrV2dXa3GQytbYa6+qba2obK6trikvKq6jrPU9ODopDL582ZtnTx3Mm52VGR4U88/auPPtk1CpUM0QfPmTVl6qQJOdnpofrgoOBAsUjc0dFZXVt/+mzRZ3sP7c8/6nAMYsN76P7b2QsBAIEQAC6bI8dOF50vy0hPdoteQx5/Ys21SyMiPh9e4oVX37HZbMOynN/75pfvuHWNnx5QtVqNVquJjoqYNWPy/XffUlPb8PPf/nXnrv2+pr9m5aJf/+wJX4+uXHufK+O5otSNa1dOn5LrdmtlaIg+NEQ/OS/7y/fd+vIbH/zm+X94TQJqterIng1+3lr21BVe2ydkp7/18h/9PPGtdzc//bPn/ddNLpd99Ut33nnbGq1W4/aQRirVBKhjYyIn5X7RaLPZps1fa7FYB7he5syc8sC9t86eMdnzvlO5XCaXyzQB6r7toU9bm2He8lv7/nz80a/dffsNvl5iyTV3NjQ29/0ZGRF21/p1N65dGaQL9Jz4u9/40pfvu83XrCwW66TZ13p96M7b1j752Ne9PlTf0LT02rsm52U/9MDt8+ZMl4jdr07S64P0+qC8iVl3rV9XV9/4h7++tGHTNv91y0hPXrZ47rJFc90+enGx0eeObvWc/tlf/unVNzewvwIAAiEADL9X3vzgf5/6rlvjDWtW/v4vL3Z39wxqViKR6IF7Pj/QN5o6vHZaMzRxsVGeabDdYCyvrDGZOmUyaUpSfGREWN9DsTGRf/zN0/944Y3f/eHfXmdYU9tw6kxhVkaqTOblqyQ6KtxoMt1/1813rl+nCVBf5KtIKr3/rpujIsK++8NnPR+12Wyf7Ts0ITtDH6wb1FtuazfuPXAkPTUpPCxkiEWLifrDb592G8+gs6u7paXN4XRqAtShIXqxWOT2XkTCgLoUCg3R/+RH3168YJZbu9PpNBhNbW0GhUKhC9R4BlFBEGRyWf8/zxWWFBWXpaYkemYtQRD0wTpXIIyICP36Q3evu265VOrz27+gqOTM2aLU1ESlQjGoWpVXVBcWlaalJXkugyZA/cxT37l53eqBzCc6KuK5n3x/1fIF33/iuc6ubi/5PzP1+V/9OCY6gj0PABAIAWBM2Pzxp9/75pfdzrdoNQFrr1022DGyly2em5wY5/r3a299ONg8OUA1tQ1vv/fRlu2fuV2oOW/O9J89/b3QEH1fy4P3ra+orH3/w088Z3LqTOH6e78pl8uyM9Nuvelat8E2vvqlO3Ky0y8aBftbtXzhwUPH33rvI7d2i8X61W/+yBUVJuSk/+ixr/dfQj/q6hsfeuQJQRACAzXpqUkL5s7wc+7LU3hYyL/+8ovYmMi+li3bdv/7pbfPFRb3nclUqZQTszPWXrdszXXLvYYxXyZkp//5/55xeyO79+a//+HWz/Ye6jWb++fGCdlpixfOXrV8oVYT4HVuGzZt27Bpm1KpyM5Mu/mG1W7rIjhIJ5NJv3zvbQ8+sP6iMe/jrbs/3rpbIhYnJsZlpac88djDXk8ketqff+zGO74WoFZNys3+zje+lJ2Z+sVnQavpS4Nd3T119Y1t7Uaz2ayQy8PCQuJiojx/U1g4b+aL//j1fQ99v6Ozyz3f6oP1wbqent6+VeAWp3t7zZ6LZ7Va2VMBAIEQAEZEr9n8zvsfe4aNO9eve+OdTYO6E69vJr1m86tvfDASS/vaWx8+9+u/2O12z4f27j/84NefeOfVP0kkkr7G7zxy/8ef7OofUdzS2olT55ISYt1CyMzpk9oNxr0HjpSWVZVXVNU3Nje3tHV39zgdzuBg3ZRJObffcn1cbLTb3B756j3vfbjV11WydfWNdfWNjzx0zwADYR+TqfPIsdNWq21QgfCZp77TPw3+3x///ff/uI//0dPTe+joyUNHT7757uZX//N/A8yEWRmp//rLL/qnu46Ozh8/+/yWbbs9J25pbdu1J3/Xnvxf/e7vT/3wG9dfs9TndthrPnbiTEJctNu6mJSX/ei3HnS7tNI/u8NRWlZZWlb5ja/dM8BA2Jf39h08euPaVf0DoSAIBw8d37Rl55Fjp6uq3W8W1Wo1y5fMffjBu6KjItyq9JvnnnjoG096bqVT563p+/PEgc3yfudLa2rrV669j50SABAIAWBUvf72xvvvucUtDyQnxs2ZOWXfwaMDnMnMaXkTczJc/35vwydt7caRWNR3PvjYaxp0KSou2/jxzv6JIjREv2jBLK9ZxY8//+OVP/71Ja8PVdfWnzpT+OqbG37+zA9Wr1jY/6HQEP2CeTP83Lg4aqZPzV0wd8YXqePUOc802N+pM4V79h1eNH/mReccpAv842+f7p8GbTbb17/74yPHTvt/YmdX95vvbvYTCH35+kN3C4LgdDqLSyuOHj9zvqS8tKyyuaXNarW9/cofg4N0o1DPp3/2vGcU7AvD7234ZOv2Pc8+/ejyJfP6PzRvzvTrr1m68aMd7GEAYOQw7AQADIP6hqZPdx/wbL/r9nUDn8mX7/98ODW7w/HCK++MxHK2tLYVnS/zP822nXs9k+pgX8jca/E/gdVqe+LHv6qsqnVrnzZ54lhYodeuXNz/zw82br3oU97bsGUgc3780a9FRYb3b/n18/+8aBrsi519l0oOXGlZ5TPP/WHu0lvW3faV//35H958Z9ORY6crq2rr6hv/4TfljqbOru5Hn/jZ0eNn3Np/8J2veL2LEgBAIASAseWV1z/wbJw/Z4bnhZFeZWV8MZzax1t31dQ2jMRC7j1w9KKXsBYWlbq1JCbEjsTCmC2WF199z60xOyt1LKzNWTMm9/+zpLTyok/ZtSe/rc3gf5oJ2elup/jq6htff/vDAS6VzWY7dvLsYN/Lh5t3vPHORoPR5PnQ629tbGxsGSOfIKvV9oOnfuE2aIdeH3Tz2lXsXgCAQAgAY92hoyfPl5S772TFojtvWzOQpz94/xe3t/3rxbeGffFOny3auWv/pgFcfdfc0ubWMqi7yAbF83pafVDQWFibbh2TDmTQP5vN9pVvPvnwt5+y2qy+1/J6t5b/vPzOoMYtzD98Yngz+R/+9qLBaBr4OBkjqq6+8d0N7j3rrrluGbsXACAQAsA48OobXgY6u2HNSrVa5f+JcbHRy/87uv3e/YcvelXnEPzrxbce+d7T+/OPDSTYuHXr4mf0wktUU1vvNvagr440R5NMJlUqL+iNMy0lcSBPPFtQvGtPvq9x1YODdJ6DTGz/dN+glu3gsAZCQRDe2/DJnCU3D3YxRs57H7pfnZuRljyoHnEAAARCALg8Nn68w2jqcGvUagLcen309KV+HdL884W3LvsbcYs0ItFIvZDT6ezuuWBoDalMctnfvtVqc7tV79abrnUbb3AIFs2f6TYAYEFRSWPT4K7YLCgofvjbT33P24CNV4az5857nqOeOW0SuxcAIBACwFjX22t+9wMvPYvccdtake9QFaIPXnv954nx9NmiQ0dPXlVFG9SwHKPGLadNyE7//re/conzdLsvURCEk6cLBjsTu8Oxa0/+3gNHruDt4fDRU26NWRkp7F4AgEAIAOPA629/6HnFoGv8CV9PuffOGxVyuevf/3zhTWo4FnjeqnfvnTf+6XfPuI2VNyg5WWluLRWVtZTaU0VVjVtLJoEQAAiEADAu1NY17vpsEONPaALUt918nevf5ZU1O3bto4ZjwaYtOz0bFy+Y9fH7//nZT74/dfIE0SCvo5VIJAnxMW6N5ZXVlNpLIKxwD4TJifGUBQAIhAAwPrz8xgeejQvmzoiP8zL+xO23rOnrRuXfL73lqz8SjLKjx89s3bHHs10mk667bvnL//ztto0vfecbD6SmJAxwhqEhwRKJ++2Rra3tlNpTc2ubZ9mVCgWVAYCRIKUEADC88g+fKCmtdIsKIpHoztvWPvfrv/RvlMtld9+xzvXvpubWDzdvH4XFiwgPnZiTkZGeHB0ZHh4eqtUEqFUqpVIhl8sUCrlcJpPLZZ7R5Sr0zM//kJ6a5GsMxuioiAfvW//gfevPnDv/7oYtGz/a0d3d42duwcE6z8YhjDJ/NfBaloAAda/ZTHEAgEAIAOPAK29+8PQT33JrvGHNyuf//EL/2LDu+hWhIXrXv1967b1BjUc3WHK57MY1q25at8rzTjZ41dZmuOvL3/3r8z+dkJ3uZ7IJ2ekTstO/+8gDL732/j9feNNssXidTKX0coKru5dAONBAqNGoW9s4oQoABEIAGA8+3Lz9e9/4klarueCINkC97rrlr731oetPiVj8wN23uP7d0dn11rubR255Judl//yZx+Ji3a9Z7ejsKi2rbGsztBtMZovFbHH9b334obs4SejKhLff963bb7n+wfvXh4Xq/Uyp1Wq+/pW7r1u95Ovf/XFZeZXnBF7raR0bw8GPNW7DYH5+vCLliAUACIQAME709prf2bDl/rtudmu/47a1r7+90TXQwopl8/vuKnz97Y2dXd0jtDDzZk/7w2+f7uvI1LV4r765YcPmbaVlVV5HffjKl+4gELrY7fZX3vjgzXc3rVg6/4Y1K2dOn9Q3YqSnhPiYV//9u3sffPR8Sbl79rMScgZKpVJ6NnZ2dlEZABgJdCoDACPi9be8jz8xd9ZU17+/fN9trn9YLNaXX3t/hBYjPCzkVz97vH8abGltu+mOr/3m9/8sKa0cm2MAjkFWq23zlk+//PAPF65c/8xzf8g/fMLucHidUheoff5X/+MZabxeBuk1+UCp9FKWDgIhABAIAWAcqalt2L0337P9zvVrBUGYN3taVkaqq+WDjVtH7uaoB+9frwvU9m956pnflVfWsIKGpq3N8MY7G+//6mMLV67/ze//2dzS5jlNQnzMXbetc39iu9FzyuAgHSX1pPbIyXaHw3+fPQAAAiEAjDmv+B5/4sv3f3560OFw/vvlt0doASQSyfWrl/Zvqa6p+2zfIVbNsCTDf7341sq1977qbS3fcdsaj0DY7nlrXHRUOJX0FBkR5tbS0txGWQCAQAgA48yB/GOlZZVujSKR6JmnvjNjap7rz20791RV143QAmRlpgYGXtCxzaEjp7hMdBj19pqf/dWff/38P9zaI8JDU5IvGHfE4XBWVNa6TZacxHjrXsTGRrm1nC04T1kAgEAIAOPPq29+6NnYlwYFQfjnC2+O3KsnJ8a5tZRXVrNSht2/X3p7f/4xt8bE+Bi3lsLzpW4teROzqJ6nhDj37nDPEAgBgEAIAOPRhs3b/HSGcSD/2NmC4pF79SBdoFsLXTWOkJdefc+9+EHuxT989JRby9TJE5Texie8yk3KzXYPhGcJhABAIASAcainp/e9DZ/4evSfL741srt4sci9SSQa7yX1vBNvJDLVS//4zf88/o2BT3/ydIHHctrdWnbvzXfreFapUKxYOp+PSX/JSfER4aH9W9oNxvwjJ6gMABAIAWBces3b+BOCIJwrLDngcZ3h8Orqcu+Y8Qro1rLLo7fJ8LCQYX+V3AmZt9x4rf/B6Pvr7nFfqrZ2g1tLU3Nr/uHjbo1fuvdWPwMbXoWWLpzj1rJh03avozgCAAiEADAOVNfU7dnvpWPPEb170KXd4D7UQVZ6ynivp+ebmjppwki8kEQsvv6apQOc2DNpe+0r6D+vvOvWkpaSeN/dN/MxcZFKpW4dtDqdznc3bPHzFLv9gjOxarWKMgIAgRAAxpZXXv/AMyVu27FnpF+36HyZW8v8udM1AepxXcyiYvc3dfst13u5OHY4rLtuxQCndLvtrbq2vrKq1nOyvfsP5x856db47UceuGndKj4mgiDccsNqt+tF33p3s2dXvf11dnX3/zNEH8zojgBAIASAsWV//rGyigu69/zXS2/bHY6Rft3q2vqW1gsGcFOplD/83tf8PCUuJuqH3/uqTCYds8U8ecr9br0JORnf//ZXRBe7PVKrCRjsa6WmJOROyBzIlG7ntTZ+tMPXlE8/+39uV71KxOL/feq7P/zeV7VazdX8MclIS/7+dx7q39LY1PKb3//T/7NqahvcWm5cu5J9DgAMnJQSAMBIczqdr7254Uc/eMT1Z2tb+4aN20bnpT/cvOOBe25xO1zWaNR//vsr50vKPw8kEklaauLk3OyVyxdMn5IrGtsdzxzIP9bU3Op23+C9d944OS/7zXc2nTpbZDCYJBKxQi4PDtaFh4UkxMekpSTmTcxK8BgHYiD+9odnf/ST3+zYtd/PNN/42r39hxJpbWv/90tv+5q4sqr2sSef+/2vfyyRSPq333PHjTesWfnGOxt37zl0+myhr7vmQvTBrpWlVqsuGpbGkUm52b/7xY+Uii/6B7LZbE88/Wu3E4CeTpw6OznvgtOzj3z1nqrqum079/ZvDFCr1GpVcwsD3AMAgRAABkMfrEtKjEtOjE9Oik9OjAsL/TyHJCTE/PX3Py2vqKmoqqmoqC6vrGlqbvUznw82bfv2Iw+4Ltd8+bX3zRaL/9cViUQR4aFJiXFJCbGJCbGJCbEh+iC3aSLCw/76+5+WlVeXV1SXlleVV1R73l/38uvv33LjNW4nx1Ysnb9i6fzu7p6Ozi61WqUJUPcPgW++syk4WNe/90utVrNi2fzTZ4rqG5rc5i+Xy7IyUqdNzXVrz5uYOWvG5HOFxSZTp9c3KBaLEuJicrLS5XJZ/3alUrlq+cKTpws8X8vF7nD84z9vPPnY193acydk+j+bV15Zk5QQ278lNTVx3uxpp88WGU0dvp6lC9T+4TdPnzh17rW3Pjx46ET/M64KuXz6tLwH7r551ozJfY29ZvN3fvDTbo+eb/r79LOD337sf3/17ONu/aNqNQEP3rf+wfvW9/aaq2rqjMYOo6nD4XDI5XK1WhmqDw4LC+lblZ6DWCiViuyM1OnT8jyyVtbihbMrKqqraurd7rjzRROgTkqMS06KdztpKZGIb1y7sqKipqyi2mA0DfxzNH/O9BOnzlVV13mOwpKRlnzzDatvu+laqfSLYxKr1faDp34xkF6XNmzafv/dF/zkoZDLn//V/5SUVpZXVisUcq1GEx0VHhEe+tpbH/70F39knwYA7occGk3gmFqgqKiI+vpGVgyAsWDLBy/Ee4yR7Ut3d8+aWx+q870He/zRr919+w1d3T1Lrrmzo6PTz6yyMlJf/ffvhjCaQllF9XU3fcmtcfWKhb969omB3GXX22v+xe/+9uY7m+5av+6J7z/sOUFLa9uxE2e//dj/ugLY449+LSsj1S3Ruamtazxy7NTjP/5VX8uE7PTHvvOVrMzUAL/9fzS3tO07ePSJfk/sn5b//H/PLJw3c4BlOXT05D/+/cbRE2eO7dvodYKq6rqPt+56/s8v9LWcOLDZ6/tqbWtvbzeZLRatJiAmOsLtLF9zS9tjP/p5/uETA1mq1JSEZ3/86MScjCFsmb295p//9q9vvbvZ9eeaa5fdf9fNqamJ/jsstdls1bUN5eVVP3rmt17j3OKFs++988akhLiBdK9qMJrKKqo3fbTzjXfcq/qb555cvWKh12d1dHR2dfd09/T29PSqlIqIiDDPzaCmtuGHT/3i2MmzA6zGsz/+3g1rLn6ZKIEQAHnHK84QAoBPgYGDuKdLrVZJpRI/E7z65oa71q97691N/tOgIAhyuWxoY+vpvC3wx1t3W622n/zo234627BYrG+/t/mv/3q9ta1dEIQTHqPquYSG6BfNn+X6d2xMZN7ErIsuUkx0REDABcktOjpi2pSJF31iWKh+/pxpXh9yOp3ffPQnP/rBIzetXe0n6FZW1W7asnPTxzv7+ndpNxi9FiE+LtrtxNrf/vXa8iXzMtKT3S6gDdEHh+iDveac9zdu/dPfXvY8A+ZLSWnl+nu/uXLZgnvuuMFzKHZfqqrrPty8/Y13Nra1f3E2OCcrLSM9+eJf+VJpUkJsUkJswG/+4jUQZqQl9b/21b8gXeCUvJy6ukbPQOiHVqvxc6tkW7vxlTfef/HV93p6egc+z//9+R/1+iA/PxBYLNatO/a86NHFKwBA4AwhAFwlAtSqG9asnD9nelpqYlBQoOAU2toNbW2GwuKyvfuPHMg/NvAkM3akpyatvX75jKl50VHhgVqN2WxpaGw+X1J+/OS5A4eOlZRWXuL8tVpNbk5GZkZKYnxsbGxUdGSYVqsJUKtFIqGru6ejo6u2ruFcUcnJUwW79+Rf9DJgP6KjIubPnZ6bk5GcFB8ZEaYL1MrkMqvV2tnZ1dHZXVffeL6kvLi4/Pipc147Lx1r3M4QWq227/zwpymJ8clJcYkJsbpAbUCAOkCtUiqVFqvFaOyoqW04c+78wUPH9x08arMNccjBFcvmr71m2YScjCBdoNVqNZo6KqtqC86XnjxVsP/g0YveiwgAV23eIRACAIARDISCIEyafa3FYqUyADAG8w7DTgAAgJGl1WgoAgCMTQRCAAAwspRKOUUAAAIhAAC4Ko82xBKKAAAEQgAAcDUSiagBABAIAQAAAAAEQgAAAAAAgRAAAAAAQCAEAAAAABAIAQAAAAAEQgAAAADAiJDI5YoxtUBaraazs4sVAwDAuBMTHTF75pQVS+aFhgT3b+/s7FapFCKRqLOr2+FwUCgAV7OxlnekrBIAAHCJnn360cULZgXpAr0++tUv3+H6h93hqKtrOH32/KNP/IyiAQCBEAAAXAkm5Wb7SoP9ScTiuNhotVpFxQCAQAgAAK4Q1974AEUAgPGITmUAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAADGJcYhBIARtGxSEEUALt32EwaKAAAjgTOEAAAAAHCV4gwhAIwgTmsAAICxjDOEAAAAAEAgBAAAAAAQCAEAAAAABEIAAAAAAIEQAAAAAEAgBAAAAAAQCAEAAAAABEIAAAAAAIEQAAAAAEAgBAAAAAAQCAEAAAAABEIAAAAAAIEQAAAAAEAgBAAAAAAQCAEAAAAABEIAAAAAAIEQAAAAAEAgBAAAAAAQCAEAAAAABEIAAAAAwMBIKQEAjB3hoUEWi81g6qQUgiDk5aSkJ8dGRYTkHyvIP1YwLqq9YFZuZLg+Mlx/4Oi5w8cLWYkDlBgXmZESl5wY5XQ4//rSRgoCAARCABh/IsKCZ0zOjAjTq1UKp9PpcDoFQejuMTc2tZ08W1rb0OL/6fog7fp1SyxW6z9e3mx3OMbd2580IXXBrFyL1favVz+y2myXPsOTZ0sNxs61q+aOxNKOULU/O3gqKT7y+hVzLkvFRp9EIslKi09OiAoJDnRt8IIgNLcYzpfVlFbUOf/bclEV1Q0V1Q1337I8QKVkTwIABEIAGJcam9s3bj0we1r29EmZJ8+WfnbwlFQqiYoIWTg796brFny67/jpgnI/T+/ptZg6ujq7eoYrnwRq1TabvbvHPDpvPzs9oafXolLK05Jjzp2vHOPLPOzVvlwVu4yCg7TXL5+tVMr35p/+eOchq9UmCIJSIc9OT1i5aHpjc9vm7fk9vWb2DAAwlnEPIQCMIJvNXl3btGnbQUEQ5s2cKJfJ/EYU8wtvfvLOps+G69WXzp8SFR4yOu80VK9TKuR7808LgpCTkTj2l3nYq325Kna5yGWyNSvn6AIDPvh437nzla40KAhCr9ly7HTxJ7sOR0eGXrtspkgkYj8AAARCALiqGYydRlOXTCqNDNeP2ouGhwbHRYeP2stlpycUFFeeL6sxm61RESHBQdqxv8wjxOFwjlrFLqOJ2Uk6bUBJeW1TS7vnoyXltU0thujI0JTEaPYAADCWcckoAIwGs8UqCIJCIUtOiJqamx4VEbJr/4mq2qYpE9NTEqPe/nC3w+mYOSUrNTFGLBb/6T8fCIKwbMGUzNR4sVhcXdtUVFpz7nyFIAgTMpPSkmNio8LOFlXs3HtcKpWsWTknUBNgtdpkMklnV+++w2fqG1un5WXk5aQIgrBs4dTF9snFZTW7D5x0LUlUuH7m1Owwvc5mt3f3mI+cLCqtqLvEdycWi9JT4t7euMtutxeWVOXlpORkJLrOffXJyUiclJMaog/cuutIYUmVIAjzZkxIiIsMCQ7c8umh86U1fpZZEISs9ITstISIsOBes+XEmZJjp4v7HgoJDpwxOTM6MtTpdErE4pqGlkPHC1rbTIIgDLzagiCoVIq503NiIsNEIpFYLDJ2dL3/0V6Hw3HRooUEB86ckhUdGWKz2c0Wq1QqGZaKuWg16hmTM+OiwwXBKZVKbDZ7TX3L9s+ODuRRP4vt6836KYKbtKQYQRAqahp9vceK6vrw0KD05NiS8tr4mPAZk7OiI0P25p/u7jHnZCZGhAb3mC1HTxadOlfm9el5OSnT8jIC1MrWdlNlTaOrONPyMpITovRB2tMF5fsOn2HHAgAEQgAYH9QqhSAIXd09dQ2tdrtj7aq52emJacmxBmOn65o6U0f3tt1Hw0KCgnWfnyna/tkxsVicmRpfVlXvSoOCIJwpLJfLZRaLbefe44IgSMRitUr5xgc7e80WqVSyft2S65bP/vdrHx05WSQIwpzpOdt3Hy2t/CK6REWE3Hjt/PMl1Rs/2W93OOZMz7l22axN2w6UVdZ7XezY6LBrl846e77Ca1bpkxgX2W7oMJq6BEE4U1Sel5OSlRq///DZ/kHibFGFVCJZOCevr2XvoTMdnT19Lb6WWRCE2KiwwpKqIyeLlAr57Gk582ZOrG1oaWxuFwQhVK+7Zc3C2vqWV97ZZrZYA9TKa5fNum3N4rc37m5uNZRV1g+w2oIgrF4yQyqRvPb+DqvVFqBW3nL9QtfE/osWFqK7+fqFrW2m19/f2dXd60qh1y2f7X97GEjFBEHQaQNuXbvY1NH17qbdHV09giCkJEbPmZ4zkEf9L7avN+ur3VOoPkgQhHZDh6/32G7oFAQhPDRIEISq2iaRSLR21dyk+KiC4qojJ4oC1Mq50ycsmjOptr6ltd3k+fSTZ0vtdvuSeVNa2ox9m9+Rk0UqpbyuoYU0CADDhUtGAWDERYbrNQGq7h5zY9MXF9dVVNe/u+mzHXuO7Tl42lcPk8dOFQuCMGlCat9BuUgkys1KOnG2xPWnzWbf8dnRXrPF9e+6hlaVUq4L1PhaktnTskWC8Fn+KVdPKkdOFDmdzqm56b6mT0+OVShk2ekJ/t9gVlpCX2RtbTM1NLWpVIqk+MjhKmBNffPZoorKmsai0urDJwpdJXU9NHfGBJlUuv2zY65zsF3dvVt3H5FKJXNnTOg/h4tWWyaVxkaFNTS1ue6F6+ru3X3glNPpuGjR5s2cKJNKt3921JUGBUEYSNeaA6zYvFkTVUr59j1HXXlPEITSirq+Hnf8P+pnsX29WT9FcKOQy8RikSAIFovV13t0rRGVUuG2Ks+dr6isaTx3vvLoqfOCIESE+byOuqikxmK1piZGKxXyz49axKKM1LgzRRXsVQCAQAgA44BKKU9Pib122SyHw7lz77H+HVr2pYaC4sq+LOGmpc1YXdek0wYkx0e5WhLjIs0WW2395yNY2B2O+qa2vuld55d8XbIokYijI0I7unrM5s8P4i1WW0+v2c/da8XltWaLtcBvB5hKhTwmKrS4vLav5WxRhSAIEzKSRqKk3T29giDI5TJBECQSSVx0mLGjy9XoYjB2dnR2x0aFSiSSgVfb7rBbrNbs9IT05FhX1Cmvqnc4nP6LJpNJY6PCTB3dbb5PlA25YhKJODE2srOrx3X5a5+PduQP5FE/i+3rzfpq93wL/Zou0meMn3Dc2d0jCIJc7vNiJavNVlBcJZFIMlLj+rb/dkOnwchAnQAwbLhkFABGRF5OysTsZJEg6u7pra1vPna6uKnFMIT5HDtdHBcdPmliqusqyryc5L7Tg4IgqFSKGZMyY6JC7XaHzWYP0mn8zEqtVIjFIo1ade+tK7845rbanYLPEfCqa5v+drFRwjNS4+Qy2Vfuvt6tPT42XBOg6vzvyauREKBWiMXiHo8xKrp7zFqNOkCtMHV0D3BWDodz+2fHVi6avmrJjF6zpaS89vjpknZjh/+iBWrUIpGos6t7UIs9wIoFqJUSidizgK736/9R/4vt6836avd8CxaL1e5wSMRihcJnx7muh3oubQSR0+fK87JTJmQknTxbKghCVnrCmcJydi8AQCAEgLHONQ7hpc+nsrqxzWCKiQwNDw2yWG2h+qCNWw/0PXrD6nkBKuVbG3e57kZbNGdSbnay/xkaTJ2vvrt9GN9pVlrCxq37Ky/sXOTaZbNSEqOz0xMOHS+8XKtgwIOif66kvLa+sTU9OTYtOXZCZlJmavx7H+3p6urxUzTXpbwisXjkKuY6U+eL/0f9rGuvb7ahqc1Xu+ccmprboyJC9EHa+sZWry+hD9IKgtDY3HYpK7HNYKptaImJDI0M1xtNXVHh+i07D7F7AYBhxCWjADDWHT9dIgjCpAmpedkpZwrL7PbPrzsNDtKG6nUV1Q2uNHhR3b1mh8OpUauGcdlCggO1GlV1XZNbe3FZjSAI2emJI1qZru5eu8OhUinc2tUqhd3h6H8d6cBnePxMyVsf7try6WGpVDJpQqr/onX19AqCoA1QjUTFurp67Q6HTuv9rK//Rweyrj3frP92N+fLagRBSIzzeadoYlyUIAhFpTWXuJZPF5QJgpCTkZiZGne+tKZv+wcAEAgB4KpQWFLV3WNOT45NT4k7de6L6+X6+pnx+iyn4BQEQdTvDJLd7mhoalMoZAmxEcO1bFnpCcVltZ63mZVV1VtttkCtOi7mi3EFLVabIAgqpdzX3DyX2T+73VFT26zTBgSolX2NQYEarUZdU9c8qOSgVMgXzZn0RdoprbZYrFKJxH/RenrM7YYOTYAqKiJk2CtmdziqapoUCllqUoyX9+7/Ub+L7evN+mr3+kbOFlW0tpuSE6K8jq6ZnhIbFqKrqm0qr6q/xG2spLzOtf3nZCadKaxghwAABEIAuLrY7Y5T50rFYnFlTUP/s17Gjq5esyUlMTotOTY6MiQ3Ozk2OrTv0c7OHkEQMlLignXavkP2/OMFTqdz5eLpORmJ+qBAfZA2Jip04GHGjUgkykyNO19W7fmQzWYvr2oQBCEnI7Gv0TWC+eSJaRmpcfExEZmp8YkX9qvpdZn923f4jNVmWzp/ilwmEwRBrVIuXzjVarPtO3RmkO9FyEyNi4n8vIAJsRFyucx136b/ouUfKxAE4ZqlM9NTYvVB2qhwfVJ89HBVbO+h02aLdeWi6bOn5cREhQbpNGEhQekpsTKp9KKP+llsX2/WTxG8LvDGrftb201rVs7JSk/o68pIIZdNmZi2fMG06tqmj3fmX/r273A4zhZVyGRSs9nSZjCxQwCA4SWRyxVjaoG0Wk1nZxcrBsB4FKhVL1s4NSUhWiaTBuk08bHhwTptTV1z/2mS4qOm5WVoNWpNgCokOLClzeTquD8hNmLWlOyocL1EIg7R62RSSUubse9Zre2mvJyUnXuP9+8h0+l0trQZYyJDszMSYiPD2gwdtQ2tSfGROm1AR1d3VW1zWEhQfEx4WnKMUil3jT5n6uiqbWjRaQOy0xPzclIS4yID1Mq6hhZf3Zz6MWNy1oJZuUGBmpBgXUSYvv+JoIiw4MVzJ0dFhMhl0mCdNj4mQqmQ1ze19fSaLRZrdGRoWlKsPlhrMHUajJ2JcZFajdpqtbW2mwymrv7L7HQKn9dKrZIrZHUNLekpcVNy07UBKo1aabc7mlsN3T3m8qr66IiQeTMn5Gan5GYnt7Sbtn56xDW03cCr3dxmDAkOnJCZNCU3bWJmUkxUaP6xgnNFFRctWmu7qbXdFBaim5CZlJESp9UGVNY0piRGa9RKp/PzDDzkivX2WkrKa5UKeXJidG5WckZqXFRESHePua6xxekU/D/qf7F9vVlf7V6ZLdazRZVd3T2pSTGzpmRNzE6elJM6MTtZJBIdPHruwJFzfSdp42LCZ0zO6r8qs9ITJuWkagJUmgCVzWbXBKhmTs2KDNNLJJKQ4ECp5ILt32jqmpSTcvBoQf9GABinxlreEWk0gWOqQFFREfX1jWwoAADARSqV3Hvryhff+sRms1MNAOPdWMs7XDIKAADGtLSk2NKKOtIgABAIAQDAVSEsJMg1qIZYLJo8MdU1DiEAYNgxDiEAABhzUpOiI8KCa+qbZ07Jqq1vaTd2UBMAIBACAICrQk+vZc70HLFYXHC+ck/+aQoCAARCAABwtThxpuTEmRLqAAAjjXsIAQAAAIBACAAAAAAgEAIAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAACIQAAAAAAAIhAAAAAIBACAAAAAAgEAIAAAAACIQAAAAAQCAEAAAAABAIAQAAAAAEQgAAAAAAgRAAAAAAQCAEAAAAABAIAQAAAAAEQgAAAAAAgRAAAAAAQCAEAAAAABAIAQAAAAAEQgAAAAAAgRAAAAAAQCAEAAAAABAIAQAAAAAEQgAAAAAAgRAAAAAAQCAEAAAAABAIAQAAAAAEQgAAAAAAgRAAAAAAQCAEAAAAABAIAQAAAAAEQgAAAAAgEFICAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAAFcCKSUA4IsmQDVzSpbr3729loPHCux2O2UZCbOnZWsCVNt2Hx2uGc6ckhUUqPlk1+Gx8O4CtQFJcZGCIBhMnZU1jW6Pzps5MSxE9/5He9kMroAyel1I/0s+WAN8p3fetCz/WEFJeS1bzkjsYQAQCAFc+SRi8fyZEz/dd6LXbBEEIVinXTAr99N9x/08JSQ4cOGcvFC9zuFwVlTX79p/0mazKxXyJfMmx8eE2x3OguLKfYfOOJ1OXxO75jM1N33ShFSJRFxT17z9s6MWq83XK9583cLquqb8YwV9LWtWzmk3dOzJPz3wdxoWorv9hqWHjhccPFogCMKKRdPSkmL/9J8P2AaGi1gskitkMZEhFovNMw+cPFsqk0rG8MKLb79hicVifXvj7kuZz+QJqQ6H8+S50iumjF4r43Uh/S+5p6/fv04QCYJTsDvsza3GPQdPN7W0D+M7vfR1cdGFBIDx9DVNCQB4lZEad7qgPDUpZt3quTesnicWizq7ukP1Oj9PWTp/Sk1d8z9e2fzyO1uDgwKnT8oUBGHRnEkOp/Ofr330yjvb4mPCc7OT/UwsCEJGSlxWevybGz7916sfOZ3Oif+d3qvCkqqUxOi+P2UyaVx0eFFp9WDfbFd3b3pynCAIUqkkIiyYtT+8DMbOw8cLa+pavD7a0dndZugYswufGBdRU99sdziCAjWXMp/QEN0VVkavlfG6kP6X3Kv3P9rzp/988M9XP6praL1u+azhfaeXvi4uupAAMI5whhCAd5Hh+vKqhjnTc97euFujVk6fnHn8dElifGRLm9HXU976cJfrH2aztaK6ISI0WCKRpCRFv/rOdpvNbrPZj50qzs1OPnm21OvErj9zs5MPHS/s7OoRBOHjnYf8L2RJee3COXmB2gBTR5cgCImxEaaOrqYWw2DfbG+vxWqzRYXrA7UB9Y2tgZoAV7tKpVg0Oy8sJMjhdFZWN+w/fNbucAiCkJ2emJIYdfRU8ZJ5k3XagHPnKz7dd0KllC+YlRcVESIWixqa2j7dd7yn1yIIQnCQdum8yVqNWhCEM4Xlh08UuWauDwpcsWiqUiE3mDo7Onv6FiZArVw4Oy80RCc4heq65r35p602n+dIfc28j0QivmH1vPrGtn2Hzwxk+v6y0uJnTcv5z+sfu/7UBKjuX7/qlXe395otAy+Ln/lPyEycNTVHKhU3Nrf3vwLw7puXHztdnJ2eoAvUGIwdH+3I7+4xD2pdDOMHITM1/lRBmcHYmZ4Sd+j45+ei77xp2cEj50or6wRBmD45MyQ4cMvOQ4IgqFXK5QumBmrVIpGopr551/6TDodDEIS1q+bGRoelJMZMn5wpCMI7G3cbTJ2+lnxQ68hPGQc7n2GpzPCy2eyFJVXTJ2XI5TKLxernnS5fMFWtUrQZOppbDcE67Uc78gVB0GkDblmzSKdVtxk6Pt5xqKfX7Gtd+Fl3g1pIiUTsdSv1NfNBbdWD/Tz62sMAAIEQwIA4nYI+SNvY3O50Oju6enbuPS6VSjRq5UCeKxaLUhKizpfV6rQBIkFwHW8JgtBu7NAHa31N7PozLCRIq1HfdfNypUJW19C6c+9x1zWr3oOc2VJZ3ZiSGH38dLEgCMmJ0YWDPz0oCIIgEorLatJT4rQa9enCsoyUeFfzsvlTurp7X35nm1gsXrtqTl5OyrHTxYIgtBtM4aHZc6fn7Np3orXdKBKJBEFYOn9qd0/vi299IhIJyxdMmzdzouuOnTnTcmobWg4cOReoVd998/KK6obmVqMgCEvmTa6sbjxw9FyAWrl+3ZKq2s8vpVu2YKqpo+ult7ZKJOK1K+fOmJzpynJe+Zr5529LJFq5aHq7sbNvDv6nd1NcXrtgdl50ZEhdQ6sgCOnJsXUNre2GjutXzB54Wfw4U1hxprBiYlZSalJM/3aH05mVlvDh1v1Wq/2Ga+blZaccOHpuUOtiuMhlsohwfe3OQwZj5w2r51009kyflNHSbtzwyT6RSLRy8fT05NjCkipBEDZs2XfDNfPKKur7X6boa8kHtY78lHGw8xnRygyNQiGblJPa1GKwWKx+3uniuZNqG1r2HToTpNPccv3C6rpmV3tyQtSHn+z7fCvKSXZdE+51XfhZd4NaSF8fDV8zH9RWPdjPo689DAC4H4lRAgC+Qp1TEIZweC0Wi5YtmGp3OE+eLZHJJHa7QxCEu29ZvnLRdJvNLpNKfU0sCIJEIpFKJZFh+jc+2PmfN7aIxeL5Myf6f7mi0uqUhGhBEMRicWJs5PmS6qG936LS6oTYiCBdQH1Dq6tFIpEkxUcdO13sdDrtdvupc2VpybGuh3rMlgC18vCJopr65p5eS3ePWSqVJCdEHTtV7HQ6HQ7nJ7sO9/XfsHn7wQNHzgmCYOroNnZ0Bem0giBIxOLoyJCCkipBELq6eyuqG1wTy6TShNiI42dKBEGw2x1nisqTE6P8LLbXmfdZMCtXEISde48PcHo3Npu9qKTadTGt4LqKuLB8UGUZ8uZXUFxpNlsdDkdNXXNgYMCwv6hrg7zoZGnJMZXVjU6ns7Orx2K1hYcG+Z/eYrHGRoXFRYeLxeItOw/5TxS+lnxQ62jI28allGUIlRmsdavmPXzf2q/cfb1UIt64db+/H3NEouiI0KKSakEQDMbOiqqGvofOnf9iK9JpNcO47rwupJ+t1OvMB7tVD+rz6GsPAwCeOEMIwKe2dlNEWLBIJFLIZYvmTMo/VtDZ3ev/KTKpdPXSGRKxeMPHe+12h9Vqk8mkIpHo5be3CYIQFRHSv4cYt4kFQbDb7Tab/dS5MlcHMyfPlS5fMNX/K5ZX1S+ZN1mlUoTpdW3GDmNH19DebHeP2djR1dRicP63Ra1SCIJww+p5/af5/F9OQRCEuv9GR0EQAtTKCybof+icFDM1L0MQBKfTGagJcEVspVIuCIL5vyc/zWaLSqX4Yj7d5r5XVKv8nZX1OnOXxLhIkVg4V1Tp6sXnotN7dbaofN2qebsPnAzSaTQB6tLyWrVaOfCyDFlv7+eVcTidIpFoUOtiGGWkxkWG6TNSYwVBEItEGanx/i9Izj9eaLM75s+aGBSoKauq3/XfPpm887Hkg11HQ9g2Rr8yg/XBlr3NLca7b1leVdvU5Xe3o5DLxGJRX507u3t0/72n8YKtSHyR9z+4dedtIV1X53rdSr3OfAhb9cA/j772MABAIAQwUPWNrRFhwafOla1ZOUckEh04cjYlMdr/z8wyqXTd6rkGU+eOPcddd8gYO7rsdntIcKDrzsNQfWBrm8nXxC4GU6dKJXf9WywS2S420IXNZi+rrEuOjwoN0RUN7BIvXzZs2ScIgkwm/e9xVa/T6Xxv8x5fIdNm/yLcuo5Z1WqFxWi94GhVIVu5eMbGrftdnSvec+uKzw9VzVZBEJQKhes+wwC1yuF0eM5HrVL6ORr2NXOXxpb2rbuO3HHjkuq6pvKqhotO71Vzq7GjqycuOiwmMrTgfIXd4RhUWYbLsL+o6xcK/zQBqjB90F9f+tDhcAqCEBykvfGa+XvzTzudTme/gKFUyPue4nA4Dp8oPHyiUK1SLJozacHs3K27jlxkA75wyYewjoawbVxKWfxXZhhXutVm23/47LyZE8urGixWq6/JzBar0+ns+9i6UtkQDGHduS2kn63U68yHsFUP/PPoaw8DAJ64ZBSAd0Ul1Zlp8aUVdRu27Pvg4729ZotWo/LTo4wgCIvnTerq7t22+2hfwLPbHcXltTOnZslkUm2AatKE1HPnK3xN7HKmsHxaXoZKpZDJpFMmppVX1g9kUeNjI2KjworLLhhzbODXv3lltzvKKuun5qWLRCKxWLRoziRXLxS+cml5Vf3U3HSRSCQSiZYtmLJ6yQxBEOQymVgsMnV0i0Si3OxkhUzmumjWbrc3tbRnpccLghCk08TFhPcdX1ZUN0zKSRUEQSKRTMxMKi6r8fWivmbu0tNj7u7p3bb76LIF0zQBqotO78uZwvKkhKjkxOgzhRWDLYvbMbFcLh2FdTFcMlLjquuaXJlHEIR2Q4fdbo+NChMEobOrJyoixBWNkuO/uKZ3zco5rguYu3vM7cbOvpFUBEGwWGxBOo0gCHK5TCGXDW2dDryMQ1vXl14ZPws5hA2gsKSqo7N71tQsP9M4nc6mFkNqYrQgCIFadf/F8MXruvCz7ga4kH62Uq8zH9pWPcDPo689DAB4ksjlY+sSAq1W09nZxYoBLjun09nY3D5ralZiXGRSfFSIPnD/kbN9h4CeFHLZqsUzNBr1lNy0qXnpU/PS01NizxSW19Q1J8ZHLZ47OScjsaC40nV3nK+JBUFoajEEBQYsmTclLye5sbl936GzF+3rz9TZPXtqtqmj62xRRf/2vJyUru7e0oo6/08PUCtTEmNOF5R9vluUiKfmph8+USgIQk1dU0pC9NwZEyZPSO3pMecfL3Bd2qpUyPNyUg4dL+x/RqS6rjk5PmrejIm5WcldPb2fHThps9ktFqtCLlswOy8nM7G+sbWpxTB9cmZTi8HU2d3UYpiSmz5jclZ4aFB1baNcLnMtanVdc3pK7Oyp2blZyXUNLfnHCn2dePEz89ioMKVCXlpRZzR1adTK3JyUwuIqs+/p/dTHYOycPzO3s6vnxNkSV8ugyvJFZrY78rJTZkzOnDwx7dz5SplMet9tq6bkpifGRegCNXnZKVNy00sqas0Wa252ck1dc7uxQxCEmKhQtUpRUl47tBe9FEvmTi4qrW5uNfS1BOm04aFBZZX1xo6uqblp0/IyIsKCK6obAtTK4vJaQRDajR2zp+dMnZiWl50iCMKeg6f7ckV3d++UvPS50ydkpyeYOrpa201el9xysXU0wDJ2dHYPYV1femW8LqTrPL/XRq9mTM4sLKlydYzZ2m5aPHdSWWW90yn42mCaW40zJmdOnpAaqtfVNbbKZbKSilqvW5GvdeF/3Q18Ic+XVnvdSn3NfAhb9cA/j772MADIO25EGk3gmCpQVFREfT0dYQEAgEGbN2OCTCYd3qFHAODKzjtcMgoAAMaxSRNSb12zSCwWy2XSpPio+sY2agIAA0enMgAAYBw7V1QRHRFy720rnQ5HWWV9UWk1NQEAAiEAALgqWKy2j3bkUwcAGBouGQUAAAAAAiEAAAAAgEAIAAAAACAQjjatwsFaAQAAAHBFGmt5hzOEAAAAAHCVIhACAAAAAIEQAAAAAEAgBAAAAAAQCAEAAAAABEIAAAAAAIEQAAAAAEAgBAAAAAAQCAEAAAAABEIAAAAAAIEQAAAAAEAgBAAAAAAQCAEAAAAABEIAAAAAAIEQAAAAAEAgBAAAAAAQCAEAAAAAw086BpcpPTFsCM/qMBNuAQAAAIwSrcJxBbwLkUYTyLoEAAAAgKsQZ9UAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAAAAAiEAAAAAgEAIAAAAACAQAgAAAAAIhAAAAABAIAQAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAAARCAAAAAACBEAAAAABAIAQAAAAAEAgBAAAAAF/4f5hBxheJTd0wAAAAAElFTkSuQmCC";
    const metas = [
      { property: "og:title",       content: "The Heartland Chronicles Manuscript" },
      { property: "og:description", content: "Private · Authorised Access Only · veemercado.com" },
      { property: "og:image",       content: IMAGE_URL },
      { property: "og:type",        content: "website" },
      { property: "og:url",         content: "https://veemercado.com" },
      { name: "twitter:card",       content: "summary_large_image" },
      { name: "twitter:title",      content: "The Heartland Chronicles Manuscript" },
      { name: "twitter:image",      content: IMAGE_URL },
    ];
    const injected = [];
    metas.forEach((attrs) => {
      const el = document.createElement("meta");
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      document.head.appendChild(el);
      injected.push(el);
    });
    return () => injected.forEach((el) => el.remove());
  }, []);

  useEffect(() => {
    let cancelled = false;
    const recordVisit = async () => {
      const geo = await getVisitorGeo();
      if (cancelled) return;
      setVisitorInfo(geo);
      let existing = [];
      try {
        const stored = localStorage.getItem("heartland-visits");
        if (stored) existing = JSON.parse(stored);
      } catch {}
      const updated = [...existing, geo];
      try {
        localStorage.setItem("heartland-visits", JSON.stringify(updated));
      } catch {}
      setVisits(updated);
      setLoading(false);
    };
    recordVisit();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!adminUnlocked) return;
    const load = async () => {
      try {
        const stored = localStorage.getItem("heartland-visits");
        if (stored) setVisits(JSON.parse(stored));
      } catch {}
    };
    load();
  }, [adminUnlocked]);

  const handleUnlock = () => {
    if (pwInput === "RaAl1988") {
      setUnlocked(true);
      setPwError(false);
    } else {
      setPwError(true);
      setPwInput("");
    }
  };

  const handleCopyrightClick = () => {
    const next = copyrightClicks + 1;
    setCopyrightClicks(next);
    if (next >= 5) {
      setShowAdminEntry(true);
      setCopyrightClicks(0);
    }
  };

  const handleAdminUnlock = () => {
    if (adminInput === ADMIN_PASSWORD) {
      setAdminUnlocked(true);
      setShowAdminEntry(false);
      setAdminError(false);
      setTab("admin");
    } else {
      setAdminError(true);
      setAdminInput("");
    }
  };

  const clearVisits = async () => {
    try {
      localStorage.setItem("heartland-visits", JSON.stringify([]));
      setVisits([]);
    } catch {}
  };

  const byCountry = {};
  visits.forEach((v) => {
    const k = v.country || "Unknown";
    byCountry[k] = (byCountry[k] || 0) + 1;
  });
  const countrySorted = Object.entries(byCountry).sort((a, b) => b[1] - a[1]);

  // Design tokens
  const c = {
    bg: "#0c0c0e",
    card: "#0e0e10",
    border: "#252525",
    borderFt: "#1c1c1e",
    text1: "#e2d9c8",
    text2: "#a89f8e",
    textUi: "#7a7060",
    gold: "#C8A96E",
    teal: "#7EB5A6",
    lav: "#B8A0C8",
    err: "#FF6B6B",
  };

  const labelStyle = {
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    color: c.textUi,
    fontWeight: "600",
    textTransform: "uppercase",
  };

  // ── Password gate — full screen until unlocked ──────────────
  if (!unlocked) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: c.bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
          color: c.text1,
          padding: "1.5rem",
          boxSizing: "border-box",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.4em",
              color: c.textUi,
              marginBottom: "0.5rem",
              textTransform: "uppercase",
            }}
          >
            <a href="https://veemercado.com" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline", textDecorationColor: "#e8895a", textUnderlineOffset: "3px", opacity: 0.8 }}>veemercado.com</a>
          </div>
          <h1
            style={{
              fontSize: "2.2rem",
              fontWeight: "400",
              letterSpacing: "0.2em",
              margin: "0 0 0.5rem 0",
              color: c.gold,
            }}
          >
            The Heartland Chronicles Manuscript
          </h1>
          <div
            style={{
              fontSize: "0.7rem",
              color: c.textUi,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Private · Authorised Access Only
          </div>
        </div>

        <div
          style={{
            background: c.card,
            border: `1px solid ${c.border}`,
            borderRadius: "12px",
            padding: "1.75rem",
            width: "100%",
            maxWidth: "360px",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              color: c.textUi,
              marginBottom: "1.25rem",
              textTransform: "uppercase",
            }}
          >
            Enter Passphrase
          </div>
          <input
            type="password"
            value={pwInput}
            autoFocus
            onChange={(e) => setPwInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
            placeholder="············"
            style={{
              width: "100%",
              background: "#0d0d0d",
              border: `1px solid ${pwError ? c.err : "#333"}`,
              borderRadius: "8px",
              padding: "0.75rem 1rem",
              color: c.text1,
              fontSize: "1rem",
              letterSpacing: "0.2em",
              textAlign: "center",
              outline: "none",
              boxSizing: "border-box",
              marginBottom: "0.75rem",
              fontFamily: "inherit",
            }}
          />
          {pwError && (
            <div
              style={{
                fontSize: "0.8125rem",
                color: c.err,
                letterSpacing: "0.1em",
                marginBottom: "0.75rem",
              }}
            >
              Incorrect passphrase
            </div>
          )}
          <button
            onClick={handleUnlock}
            style={{
              width: "100%",
              background: c.gold + "22",
              border: `1px solid ${c.gold}55`,
              borderRadius: "8px",
              padding: "0.75rem",
              color: c.gold,
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              cursor: "pointer",
              fontFamily: "inherit",
              textTransform: "uppercase",
            }}
          >
            Enter
          </button>
        </div>

        <div
          style={{
            marginTop: "3rem",
            fontSize: "0.6rem",
            color: "#333",
            letterSpacing: "0.15em",
            textAlign: "center",
            lineHeight: 2,
          }}
        >
          2026{" "}
          <a href="https://veemercado.com" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline", textDecorationColor: "#e8895a", textUnderlineOffset: "3px", opacity: 0.7 }}>Vee Mercado</a>{" "}aka{" "}
          <a href="https://verlinerart.com" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline", textDecorationColor: "#e8895a", textUnderlineOffset: "3px", opacity: 0.7 }}>verliner</a>{" "}· Australia · All Rights Reserved
          <br />
          <a href="https://veemercado.com" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline", textDecorationColor: "#e8895a", textUnderlineOffset: "3px", opacity: 0.7 }}>veemercado.com</a>
        </div>
      </div>
    );
  }

  // ── Main page — only renders once unlocked ──────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        background: c.bg,
        fontFamily:
          "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
        color: c.text1,
        display: "flex",
        flexDirection: "column",
        fontSize: "16px",
      }}
    >
      {/* ── Admin modal ───────────────────────────────────────── */}
      {showAdminEntry && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#000000bb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#111",
              border: `1px solid ${c.border}`,
              borderRadius: "10px",
              padding: "1.75rem",
              width: "320px",
              textAlign: "center",
            }}
          >
            <div style={{ ...labelStyle, marginBottom: "1rem" }}>
              Restricted Access
            </div>
            <input
              type="password"
              value={adminInput}
              autoFocus
              onChange={(e) => setAdminInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdminUnlock()}
              placeholder="············"
              style={{
                width: "100%",
                background: "#0d0d0d",
                border: `1px solid ${adminError ? c.err : "#3a3a3a"}`,
                borderRadius: "6px",
                padding: "0.7rem 1rem",
                color: c.text1,
                fontSize: "1rem",
                letterSpacing: "0.2em",
                textAlign: "center",
                outline: "none",
                boxSizing: "border-box",
                marginBottom: "0.75rem",
              }}
            />
            {adminError && (
              <div
                style={{
                  fontSize: "0.9375rem",
                  color: c.err,
                  marginBottom: "0.6rem",
                }}
              >
                Incorrect passphrase
              </div>
            )}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => {
                  setShowAdminEntry(false);
                  setAdminInput("");
                }}
                style={{
                  flex: 1,
                  background: "#1a1a1a",
                  border: `1px solid ${c.border}`,
                  borderRadius: "6px",
                  padding: "0.6rem",
                  color: c.text2,
                  cursor: "pointer",
                  fontSize: "0.9375rem",
                  fontFamily: "inherit",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAdminUnlock}
                style={{
                  flex: 1,
                  background: c.gold + "22",
                  border: `1px solid ${c.gold}55`,
                  borderRadius: "6px",
                  padding: "0.6rem",
                  color: c.gold,
                  cursor: "pointer",
                  fontSize: "0.9375rem",
                  fontFamily: "inherit",
                }}
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Top banner — new ──────────────────────────────────── */}
      {/* WCAG AA: #e2d9c8 (12:1) for body text, #C8A96E (5.2:1) for link on #0c0c0e bg */}
      <div
        style={{
          background: "#141208",
          borderBottom: `1px solid ${c.gold}33`,
          padding: "2rem 3rem",
          textAlign: "center",
          fontSize: "2.2rem",
          fontWeight: "400",
          color: c.text2,
          lineHeight: 1.4,
          letterSpacing: "0.02em",
          fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
        }}
      >
        Hey there!{" "}
        <br />
        Hacked your way in here, did you?
        <br />I wouldn't put ALL my ideas on-the-line (get it?).{" "}
        <br />
        <a
          href="mailto:vee.m.mercado@gmail.com"
          style={{
            color: c.gold,
            textDecoration: "underline",
            textDecorationColor: "#e8895a", textUnderlineOffset: "3px",
            fontStyle: "italic",
          }}
        >
          Message me
        </a>{" "}
        and MAYBE we can have a chat about it.
      </div>

      {/* ── Header ───────────────────────────────────────────── */}
      <header
        style={{
          borderBottom: `1px solid ${c.borderFt}`,
          padding: "2.5rem 3rem 2rem",
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ ...labelStyle, marginBottom: "0.6rem" }}>
          <a href="https://veemercado.com" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline", textDecorationColor: "#e8895a", textUnderlineOffset: "3px", opacity: 0.8 }}>veemercado.com</a>
        </div>
        <h1
          style={{
            fontSize: "2.4rem",
            fontWeight: "400",
            margin: "0 0 0.5rem 0",
            letterSpacing: "0.06em",
            color: c.text1,
            lineHeight: 1.1,
          }}
        >
          Archived Researches
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: c.text2,
            margin: 0,
            letterSpacing: "0.01em",
            lineHeight: 1.5,
          }}
        >
          Cross-cultural mythology, folklore & worldbuilding references —{" "}
          <a href="https://veemercado.com" target="_blank" rel="noopener noreferrer" style={{ color: c.text2, textDecoration: "underline", textDecorationColor: "#e8895a", textUnderlineOffset: "3px"}}>Vee Mercado</a>{" "}aka{" "}
          <a href="https://verlinerart.com" target="_blank" rel="noopener noreferrer" style={{ color: c.text2, textDecoration: "underline", textDecorationColor: "#e8895a", textUnderlineOffset: "3px"}}>verliner</a>
        </p>
      </header>

      {/* ── Nav ──────────────────────────────────────────────── */}
      <nav
        style={{
          borderBottom: `1px solid ${c.borderFt}`,
          padding: "0 3rem",
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
          display: "flex",
        }}
      >
        {[
          { id: "references", label: "References" },
          ...(adminUnlocked ? [{ id: "admin", label: "◉ Visitor Map" }] : []),
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              background: "none",
              border: "none",
              borderBottom:
                tab === t.id ? `2px solid ${c.gold}` : "2px solid transparent",
              color: tab === t.id ? c.gold : c.text2,
              padding: "0.9rem 1.2rem 0.8rem",
              cursor: "pointer",
              fontSize: "0.9375rem",
              letterSpacing: "0.12em",
              fontFamily: "inherit",
              transition: "color 0.2s",
            }}
          >
            {t.label.toUpperCase()}
          </button>
        ))}
      </nav>

      {/* ── Content ──────────────────────────────────────────── */}
      <main
        style={{
          flex: 1,
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
          padding: "2.5rem 3rem",
        }}
      >
        {/* References tab */}
        {tab === "references" && (
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <h2 style={{ ...labelStyle, margin: "0 0 0.5rem 0" }}>
                Archived Researches — Mythology & Shamanic Traditions
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  color: c.text2,
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                Source references gathered across cultural research for
                worldbuilding purposes.
              </p>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {references.map((ref, i) => (
                <div
                  key={i}
                  onClick={() => setActiveRef(activeRef === i ? null : i)}
                  style={{
                    background: c.card,
                    border: `1px solid ${
                      activeRef === i ? ref.tagColor + "66" : c.border
                    }`,
                    borderRadius: "6px",
                    padding: "1.25rem 1.5rem",
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ ...labelStyle, marginBottom: "0.35rem" }}>
                        Culture / Tradition
                      </div>
                      <div
                        style={{
                          fontSize: "1.0625rem",
                          color: c.text1,
                          marginBottom: "0.25rem",
                          letterSpacing: "0.01em",
                          lineHeight: 1.4,
                        }}
                      >
                        {ref.culture}
                      </div>
                      <div
                        style={{
                          fontSize: "0.9375rem",
                          color: c.text2,
                          fontStyle: "italic",
                        }}
                      >
                        {ref.bird}
                      </div>
                    </div>
                    <div
                      style={{
                        background: ref.tagColor + "1a",
                        border: `1px solid ${ref.tagColor}44`,
                        borderRadius: "4px",
                        padding: "0.3rem 0.85rem",
                        fontSize: "0.6875rem",
                        letterSpacing: "0.12em",
                        color: ref.tagColor,
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        maxWidth: "100%",
                        alignSelf: "flex-start",
                        textAlign: "center",
                      }}
                    >
                      {ref.tag}
                    </div>
                  </div>

                  {activeRef === i ? (
                    <div
                      style={{
                        marginTop: "1rem",
                        paddingTop: "1rem",
                        borderTop: `1px solid ${c.borderFt}`,
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.9375rem",
                          lineHeight: 1.8,
                          color: c.text2,
                          margin: "0 0 0.875rem 0",
                        }}
                      >
                        {ref.why}
                      </p>
                      <p
                        style={{
                          fontSize: "0.9375rem",
                          lineHeight: 1.75,
                          color: c.text2,
                          margin: "0 0 1rem 0",
                          fontStyle: "italic",
                          opacity: 0.8,
                        }}
                      >
                        {ref.detail}
                      </p>
                      {ref.sources.length > 0 && (
                        <div>
                          <div
                            style={{ ...labelStyle, marginBottom: "0.5rem" }}
                          >
                            Sources
                          </div>
                          {ref.sources.map((s, j) => (
                            <a
                              key={j}
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "block",
                                fontSize: "0.9375rem",
                                color: ref.tagColor,
                                textDecoration: "underline",
                                textDecorationColor: "#e8895a", textUnderlineOffset: "3px",
                                marginBottom: "0.3rem",
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {s.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      style={{
                        marginTop: "0.75rem",
                        fontSize: "0.9375rem",
                        color: c.text2,
                        lineHeight: 1.65,
                        opacity: 0.8,
                      }}
                    >
                      {ref.why.slice(0, 110)}…
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admin tab */}
        {tab === "admin" && adminUnlocked && (
          <div>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              {[
                { label: "Total Visits", value: visits.length, accent: c.gold },
                {
                  label: "Countries",
                  value: Object.keys(byCountry).length,
                  accent: c.teal,
                },
                {
                  label: "This Session",
                  value: visitorInfo
                    ? `${visitorInfo.city}, ${visitorInfo.country}`
                    : "—",
                  accent: c.lav,
                },
              ].map(({ label, value, accent }) => (
                <div
                  key={label}
                  style={{
                    background: c.card,
                    border: `1px solid ${c.border}`,
                    borderRadius: "6px",
                    padding: "1rem 1.25rem",
                    flex: "1",
                    minWidth: "150px",
                  }}
                >
                  <div style={{ ...labelStyle, marginBottom: "0.35rem" }}>
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: "1.25rem",
                      color: accent,
                      lineHeight: 1.2,
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
              <button
                onClick={clearVisits}
                style={{
                  background: "#1a0a0a",
                  border: `1px solid ${c.err}44`,
                  borderRadius: "6px",
                  padding: "1rem 1.25rem",
                  color: c.err,
                  cursor: "pointer",
                  fontSize: "0.9375rem",
                  letterSpacing: "0.08em",
                  fontFamily: "inherit",
                  alignSelf: "stretch",
                }}
              >
                Clear All
              </button>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ ...labelStyle, marginBottom: "0.75rem" }}>
                Visit Locations — World Map
              </div>
              {loading ? (
                <div
                  style={{
                    height: "300px",
                    background: c.card,
                    borderRadius: "8px",
                    border: `1px solid ${c.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: c.text2,
                    fontSize: "0.9375rem",
                    letterSpacing: "0.15em",
                  }}
                >
                  Loading visitor data...
                </div>
              ) : (
                <WorldMap visits={visits} />
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  background: c.card,
                  border: `1px solid ${c.border}`,
                  borderRadius: "6px",
                  padding: "1.25rem",
                }}
              >
                <div style={{ ...labelStyle, marginBottom: "0.875rem" }}>
                  By Country
                </div>
                {countrySorted.length === 0 ? (
                  <p
                    style={{ fontSize: "0.9375rem", color: c.text2, margin: 0 }}
                  >
                    No visits recorded yet.
                  </p>
                ) : (
                  countrySorted.map(([country, count]) => (
                    <div
                      key={country}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.45rem 0",
                        borderBottom: `1px solid ${c.borderFt}`,
                      }}
                    >
                      <span style={{ fontSize: "0.9375rem", color: c.text2 }}>
                        {country}
                      </span>
                      <span
                        style={{
                          fontSize: "0.9375rem",
                          color: c.gold,
                          fontVariantNumeric: "tabular-nums",
                          fontFamily: "monospace",
                          fontWeight: "600",
                        }}
                      >
                        {count}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div
                style={{
                  background: c.card,
                  border: `1px solid ${c.border}`,
                  borderRadius: "6px",
                  padding: "1.25rem",
                  overflowY: "auto",
                  maxHeight: "360px",
                }}
              >
                <div style={{ ...labelStyle, marginBottom: "0.875rem" }}>
                  Recent Visits — Latest First
                </div>
                {visits.length === 0 ? (
                  <p
                    style={{ fontSize: "0.9375rem", color: c.text2, margin: 0 }}
                  >
                    No visits recorded yet.
                  </p>
                ) : (
                  [...visits]
                    .reverse()
                    .slice(0, 30)
                    .map((v, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "0.5rem 0",
                          borderBottom: `1px solid ${c.borderFt}`,
                        }}
                      >
                        <div
                          style={{
                            fontSize: "0.9375rem",
                            color: c.text2,
                            lineHeight: 1.4,
                          }}
                        >
                          {v.city}
                          {v.region ? `, ${v.region}` : ""}, {v.country}
                        </div>
                        <div
                          style={{
                            fontSize: "0.8125rem",
                            color: c.textUi,
                            marginTop: "0.2rem",
                            lineHeight: 1.4,
                          }}
                        >
                          {v.ip !== "unknown" ? `${v.ip} · ` : ""}
                          {new Date(v.timestamp).toLocaleString()}
                        </div>
                        {v.org && (
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: c.textUi,
                              marginTop: "0.15rem",
                              opacity: 0.75,
                            }}
                          >
                            {v.org}
                          </div>
                        )}
                      </div>
                    ))
                )}
              </div>
            </div>

            <div
              style={{
                background: c.card,
                border: `1px solid ${c.border}`,
                borderRadius: "6px",
                padding: "1.5rem",
              }}
            >
              <div style={{ ...labelStyle, marginBottom: "1.25rem" }}>
                Visits by Country — Summary
              </div>
              {countrySorted.length === 0 ? (
                <p style={{ fontSize: "0.9375rem", color: c.text2, margin: 0 }}>
                  No data yet.
                </p>
              ) : (
                <CountryBarChart countrySorted={countrySorted} />
              )}

              <div
                style={{
                  marginTop: "1.25rem",
                  paddingTop: "1rem",
                  borderTop: `1px solid ${c.borderFt}`,
                  display: "flex",
                  gap: "2.5rem",
                  flexWrap: "wrap",
                }}
              >
                {[
                  {
                    label: "Total Visits",
                    value: visits.length,
                    accent: c.gold,
                  },
                  {
                    label: "Countries Reached",
                    value: countrySorted.length,
                    accent: c.teal,
                  },
                  {
                    label: "Top Country",
                    value: countrySorted[0]?.[0] ?? "—",
                    accent: c.lav,
                  },
                  {
                    label: "First Visit",
                    value: visits[0]
                      ? new Date(visits[0].timestamp).toLocaleDateString()
                      : "—",
                    accent: c.text2,
                  },
                  {
                    label: "Latest Visit",
                    value: visits.length
                      ? new Date(
                          visits[visits.length - 1].timestamp
                        ).toLocaleDateString()
                      : "—",
                    accent: c.text2,
                  },
                ].map(({ label, value, accent }) => (
                  <div key={label}>
                    <div style={{ ...labelStyle, marginBottom: "0.3rem" }}>
                      {label}
                    </div>
                    <div
                      style={{
                        fontSize: "1.125rem",
                        color: accent,
                        fontFamily: "monospace",
                        lineHeight: 1.2,
                      }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── Footer — click 5x to open admin ──────────────────── */}
      <footer
        style={{
          borderTop: `1px solid ${c.borderFt}`,
          padding: "1.5rem 3rem",
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          onClick={handleCopyrightClick}
          style={{ cursor: "default", userSelect: "none" }}
        >
          <p
            style={{
              fontSize: "0.875rem",
              color: c.textUi,
              lineHeight: 1.8,
              letterSpacing: "0.04em",
              margin: "0 0 0.4rem 0",
            }}
          >
            This is a work of fiction. All characters, names, places,
            organisations, and situations portrayed in this work are products of
            the author's imagination or are used fictitiously.
          </p>
          <p
            style={{
              fontSize: "0.875rem",
              color: c.textUi,
              lineHeight: 1.8,
              letterSpacing: "0.04em",
              margin: 0,
            }}
          >
            2026{" "}
            <a href="https://veemercado.com" target="_blank" rel="noopener noreferrer" style={{ color: c.textUi, textDecoration: "underline", textDecorationColor: "#e8895a", textUnderlineOffset: "3px"}}>Vee Mercado</a>{" "}aka{" "}
            <a href="https://verlinerart.com" target="_blank" rel="noopener noreferrer" style={{ color: c.textUi, textDecoration: "underline", textDecorationColor: "#e8895a", textUnderlineOffset: "3px"}}>verliner</a>{" "}· Australia · All Rights Reserved ·{" "}
            <a href="https://veemercado.com" target="_blank" rel="noopener noreferrer" style={{ color: c.textUi, textDecoration: "underline", textDecorationColor: "#e8895a", textUnderlineOffset: "3px"}}>veemercado.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
