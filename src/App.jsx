import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════
   STORY DATA
═══════════════════════════════════════════════ */
const STORY = [
    {
        id: "ice",
        chapter: "Глава I",
        title: "IceParty",
        icon: "⛸️",
        bg: ["#e8f4fd", "#f0e8ff"],
        accent: "#6b7fd7",
        scenes: [
            {
                speaker: null,
                text: "Мы знали друг друга только по голосу — звонки в Telegram, общая компания, Shadows…",
                mood: "narrator",
            },
            {
                speaker: null,
                text: "А потом было IceParty. Автобусы. Куча народу. И вдруг — ты.",
                mood: "narrator",
            },
            {
                speaker: "я",
                text: "Подожди. Это та самая Асель?",
                mood: "surprised",
            },
            {
                speaker: null,
                text: "Вообще не так себе представлял тебя тогда. И ты была легко одета :/",
                mood: "dreamy",
            },
            {
                speaker: null,
                text: "А через некоторое время ты носила мою толстовку ",
                mood: "narrator",
            },
            {
                type: "choice",
                question: "Как ты думаешь — зачем я это сделал?",
                options: [
                    { text: "Просто пожалел 🧊", response: "Ну-ну. «Просто пожалел» — это когда дают денег на такси. А не отдают любимую толстовку, еще и на пару дней" },
                    { text: "Это был знак судьбы ✨", response: "Может, и знак. Но точно не осознанный. Просто хотелось, чтобы тебе было тепло." },
                    { text: "Блмим 🌸", response: "Это твоя фраза, супергерл" },
                ],
            },
            {
                speaker: null,
                text: "В тот вечер я смотрел на тебя в своей толстовке и думал — а тебе идет. Оценивая не только образ, но и остальные характеристики",
                mood: "warm",
            },
        ],
    },
    {
        id: "sdu",
        chapter: "Глава II",
        title: "СДУ",
        icon: "💄",
        bg: ["#fdf0f8", "#fff0e8"],
        accent: "#e06b9a",
        scenes: [
            {
                speaker: null,
                text: "Мне нужна была помощь с образом. Я знал, что ты делаешь всё красиво и аккуратно.",
                mood: "narrator",
            },
            {
                speaker: "я",
                text: "Эля, может Асель позвать, пусть она сделает, пхп",
                mood: "sneaky",
            },
            {
                speaker: "Эля",
                text: "Зови, у тебя есть ее номер?",
                mood: "sneaky",
            },
            {
                speaker: "Я",
                text: "Аэ...инста, ща напишу?",
                mood: "sneaky",
            },
            {
                speaker: null,
                text: "И ты пришла. Пропустила пары. Просто — взяла и пришла.",
                mood: "warm",
            },
            {
                type: "tap",
                prompt: "Нажимай✂️",
                taps: [
                    "Ты открыла телефон и нашла референсы",
                    "Собрала хвост но моих мелких волосах",
                    "Поворачиваешь к себе и я смотрю в тебя 😶",
                    "Поправляешь макияж",
                    "— Ну вот, теперь нормально 🎀",
                ],
            },
            {
                speaker: null,
                text: "В тот момент я думал только одно: не хочу, чтобы кто-то другой тоже получил такую 'консультацию'.",
                mood: "honest",
            },
            {
                speaker: "я",
                text: "Я обожаю Асель.",
                mood: "confession",
                note: "— говорил я тогда вслух. И думал, что это просто слова.",
            },
        ],
    },
    {
        id: "secret",
        chapter: "Глава III",
        title: "Секрет",
        icon: "🤫",
        bg: ["#f0f8e8", "#f8f0e8"],
        accent: "#7ab85c",
        scenes: [
            {
                speaker: null,
                text: "Очередной звонок с Шэдоус. Обычный вечер. И тут Эля с хитрой улыбкой:",
                mood: "narrator",
            },
            {
                speaker: "Эля",
                text: "Ера… у Асель есть секрет... А ладно, она сама расскажет",
                mood: "mischief",
            },
            {
                speaker: "я",
                text: "Что??? Какой секрет???",
                mood: "shocked",
            },
            {
                speaker: null,
                text: "С этого момента я превратился в следователя. Каждый удобный момент — новый допрос.",
                mood: "narrator",
            },
            {
                type: "investigation",
                label: "🔍 Допросы",
                clues: [
                    { place: "В коридоре Байзака", text: "— Асель, а что за секреет? — Нет 😌" },
                    { place: "На выходе Главки", text: "— Ты вообще собираешься говорить? — Нууу, может летом... когда уеду 🙃" },
                    { place: "В библиотеке", text: "— Хотя бы про что! — Летом узнаешь 😂" },
                    { place: "У турникета", text: "Турникет тебя не пропустил. Ты застряла:\n— Вот. Судьба. Говори." },
                ],
            },
            {
                speaker: null,
                text: "Хехе.",
                mood: "amused",
            },
        ],
    },
    {
        id: "confession",
        chapter: "Глава IV",
        title: "Признание",
        icon: "💌",
        bg: ["#fff0f5", "#f5f0ff"],
        accent: "#c9184a",
        scenes: [
            {
                speaker: null,
                text: "Я всё-таки тебя раскололил. После очередного допроса ты сдалась.",
                mood: "narrator",
            },
            {
                speaker: "Асель",
                text: "Ладно… секрет...",
                mood: "shy",
            },
            {
                speaker: null,
                text: "Я завис. Буквально.",
                mood: "shocked",
            },
            {
                type: "pause",
                emoji: "🫀",
                text: "Сердце решило напомнить о своём существовании.",
            },
            {
                speaker: "я",
                text: "…Подожди.",
                mood: "processing",
            },
        ],
    },
    {
        id: "answer",
        chapter: "Глава V",
        title: "Неделя и концерт",
        icon: "🎶",
        bg: ["#fdf5e8", "#fff0f5"],
        accent: "#e8833a",
        scenes: [
            {
                speaker: null,
                text: "Неделю мы «дружили». Это были самые странные и самые приятные семь дней.",
                mood: "narrator",
            },
            {
                speaker: null,
                text: "Я знал. Ты знала. Мы оба знали. Но что-то не давало мне сказать.",
                mood: "tension",
            },
            {
                speaker: null,
                text: "А потом был концерт. Последняя песня",
                mood: "cinematic",
            },
            {
                type: "moment",
                text: "И тогда я сказал.",
            },
            {
                speaker: "я",
                text: "Я. Люблю. Тебя",
                mood: "final",
            },
        ],
    },
];

/* ═══════════════════════════════════════════════
   FLOATING PARTICLES
═══════════════════════════════════════════════ */
function Particles({ accent }) {
    const emojis = ["✿", "❀", "·", "°", "✦", "★"];
    const particles = Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: `${4 + (i * 6.3) % 92}%`,
        delay: `${(i * 0.9) % 14}s`,
        dur: `${12 + (i * 1.1) % 9}s`,
        size: 10 + (i * 2.3) % 12,
        e: emojis[i % emojis.length],
    }));
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
            {particles.map(p => (
                <div key={p.id} style={{
                    position: "absolute", left: p.left, top: "-20px",
                    fontSize: p.size, opacity: 0.4, color: accent,
                    animation: `particleFall ${p.dur} linear ${p.delay} infinite`,
                }}>{p.e}</div>
            ))}
        </div>
    );
}

/* ═══════════════════════════════════════════════
   TYPEWRITER
═══════════════════════════════════════════════ */
function useTypewriter(text, speed = 28, run = true) {
    const [out, setOut] = useState("");
    const [done, setDone] = useState(false);
    useEffect(() => {
        if (!run) return;
        setOut(""); setDone(false);
        let i = 0;
        const iv = setInterval(() => {
            i++; setOut(text.slice(0, i));
            if (i >= text.length) { clearInterval(iv); setDone(true); }
        }, speed);
        return () => clearInterval(iv);
    }, [text, run]);
    return { out, done };
}

/* ═══════════════════════════════════════════════
   STATIC BUBBLE — past scenes, no typewriter
═══════════════════════════════════════════════ */
function StaticBubble({ speaker, text, accent, note }) {
    const isMe = speaker === "я";
    const isNarrator = !speaker;
    return (
        <div style={{
            display: "flex", flexDirection: "column",
            alignItems: isMe ? "flex-end" : isNarrator ? "center" : "flex-start",
        }}>
            {speaker && (
                <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic", fontSize: 11,
                    letterSpacing: "2px", textTransform: "uppercase",
                    color: isMe ? accent : "#e06b9a",
                    marginBottom: 5,
                    marginLeft: isMe ? 0 : 4, marginRight: isMe ? 4 : 0,
                    opacity: 0.8,
                }}>{speaker === "я" ? "ты" : speaker}</div>
            )}
            <div style={{
                maxWidth: isNarrator ? 460 : 340,
                background: isNarrator ? "transparent" : isMe ? `linear-gradient(135deg, ${accent}22, ${accent}11)` : "rgba(255,255,255,0.82)",
                backdropFilter: isNarrator ? "none" : "blur(12px)",
                border: isNarrator ? "none" : `1.5px solid ${isMe ? accent + "44" : "rgba(255,182,193,0.4)"}`,
                borderRadius: isNarrator ? 0 : isMe ? "20px 4px 20px 20px" : "4px 20px 20px 20px",
                padding: isNarrator ? "6px 8px" : "14px 20px",
                boxShadow: isNarrator ? "none" : "0 4px 20px rgba(0,0,0,0.06)",
                textAlign: isNarrator ? "center" : "left",
            }}>
                <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: isNarrator ? "italic" : "normal",
                    fontSize: isNarrator ? 16 : 17,
                    lineHeight: 1.75,
                    color: isNarrator ? "#7a4a5a" : "#3a1a2a",
                    fontWeight: isNarrator ? 400 : 500,
                }}>{text}</p>
                {note && (
                    <p style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: "italic", fontSize: 13, color: "#b07090",
                        marginTop: 6, opacity: 0.75,
                    }}>{note}</p>
                )}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   SPEECH BUBBLE
═══════════════════════════════════════════════ */
function SpeechBubble({ speaker, text, accent, note, onDone }) {
    const { out, done } = useTypewriter(text, 26, true);
    useEffect(() => { if (done) setTimeout(onDone, 500); }, [done]);

    const isMe = speaker === "я";
    const isNarrator = !speaker;

    return (
        <div style={{
            display: "flex", flexDirection: "column",
            alignItems: isMe ? "flex-end" : isNarrator ? "center" : "flex-start",
            marginBottom: 0,
            animation: "bubbleIn 0.35s cubic-bezier(.34,1.56,.64,1) both",
        }}>
            {speaker && (
                <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: 11,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: isMe ? accent : "#e06b9a",
                    marginBottom: 5,
                    marginLeft: isMe ? 0 : 4,
                    marginRight: isMe ? 4 : 0,
                    opacity: 0.8,
                }}>{speaker === "я" ? "ты" : speaker}</div>
            )}
            <div style={{
                maxWidth: isNarrator ? 460 : 340,
                background: isNarrator
                    ? "transparent"
                    : isMe
                        ? `linear-gradient(135deg, ${accent}22, ${accent}11)`
                        : "rgba(255,255,255,0.82)",
                backdropFilter: isNarrator ? "none" : "blur(12px)",
                border: isNarrator ? "none" : `1.5px solid ${isMe ? accent + "44" : "rgba(255,182,193,0.4)"}`,
                borderRadius: isNarrator ? 0 : isMe ? "20px 4px 20px 20px" : "4px 20px 20px 20px",
                padding: isNarrator ? "6px 8px" : "14px 20px",
                boxShadow: isNarrator ? "none" : "0 4px 20px rgba(0,0,0,0.06)",
                textAlign: isNarrator ? "center" : "left",
            }}>
                <p style={{
                    fontFamily: isNarrator ? "'Cormorant Garamond', serif" : "'Cormorant Garamond', serif",
                    fontStyle: isNarrator ? "italic" : "normal",
                    fontSize: isNarrator ? 16 : 17,
                    lineHeight: 1.75,
                    color: isNarrator ? "#7a4a5a" : "#3a1a2a",
                    fontWeight: isNarrator ? 400 : 500,
                }}>
                    {out}
                    {!done && <span style={{
                        display: "inline-block", width: 2, height: "1em",
                        background: accent, marginLeft: 2, verticalAlign: "middle",
                        animation: "blink .7s step-end infinite",
                    }} />}
                </p>
                {note && done && (
                    <p style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: "italic", fontSize: 13, color: "#b07090",
                        marginTop: 6, opacity: 0.75,
                    }}>{note}</p>
                )}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   INTERACTIVE: CHOICE
═══════════════════════════════════════════════ */
function ChoiceBlock({ data, accent, onDone }) {
    const [chosen, setChosen] = useState(null);
    const [showResponse, setShowResponse] = useState(false);
    const { out, done: rDone } = useTypewriter(chosen ? chosen.response : "", 28, showResponse);
    useEffect(() => { if (rDone) setTimeout(onDone, 700); }, [rDone]);

    return (
        <div style={{ animation: "bubbleIn 0.4s ease both" }}>
            {!chosen ? (
                <div style={{ textAlign: "center" }}>
                    <p style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: "italic", fontSize: 15, color: "#9d6070",
                        marginBottom: 16, letterSpacing: "0.5px",
                    }}>{data.question}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
                        {data.options.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => { setChosen(opt); setTimeout(() => setShowResponse(true), 300); }}
                                style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontSize: 15, color: accent,
                                    background: "rgba(255,255,255,0.75)",
                                    backdropFilter: "blur(8px)",
                                    border: `1.5px solid ${accent}44`,
                                    borderRadius: 50, padding: "10px 22px",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                                }}
                                onMouseEnter={e => { e.target.style.background = accent + "18"; e.target.style.transform = "scale(1.04)"; }}
                                onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.75)"; e.target.style.transform = "scale(1)"; }}
                            >{opt.text}</button>
                        ))}
                    </div>
                </div>
            ) : (
                <div style={{
                    background: `linear-gradient(135deg, ${accent}15, rgba(255,255,255,0.7))`,
                    backdropFilter: "blur(12px)",
                    border: `1.5px solid ${accent}33`,
                    borderRadius: 16, padding: "14px 20px",
                    maxWidth: 380, margin: "0 auto",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}>
                    <p style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: "italic", fontSize: 16,
                        color: "#3a1a2a", lineHeight: 1.7,
                    }}>{out}</p>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════
   INTERACTIVE: TAP / HAIRDO
═══════════════════════════════════════════════ */
function TapBlock({ data, accent, onDone }) {
    const [step, setStep] = useState(-1);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setVisible(true), 100);
    }, []);

    const tap = () => {
        if (step >= data.taps.length - 1) { onDone(); return; }
        setStep(s => s + 1);
    };

    return (
        <div style={{ textAlign: "center", animation: "bubbleIn 0.4s ease both" }}>
            <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontSize: 14,
                color: "#9d6070", letterSpacing: "1px", marginBottom: 20,
            }}>{data.prompt}</p>

            {/* Touch zone */}
            <div
                onClick={tap}
                style={{
                    width: 140, height: 140, borderRadius: "50%",
                    background: step < 0
                        ? `radial-gradient(circle, ${accent}22, ${accent}08)`
                        : `radial-gradient(circle, ${accent}40, ${accent}15)`,
                    border: `2px dashed ${accent}55`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", margin: "0 auto 16px",
                    transition: "all 0.25s",
                    boxShadow: step >= 0 ? `0 0 30px ${accent}33` : "none",
                    animation: step < 0 ? "gentlePulse 2s ease-in-out infinite" : "none",
                }}
            >
        <span style={{ fontSize: step < 0 ? 40 : 32, transition: "font-size 0.2s" }}>
          {step < 0 ? "✋" : step < data.taps.length - 1 ? "💆" : "🎀"}
        </span>
            </div>

            {step >= 0 && (
                <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 15, color: "#3a1a2a",
                    lineHeight: 1.7, maxWidth: 320, margin: "0 auto",
                    animation: "fadeIn 0.3s ease both",
                    minHeight: 48,
                }}>
                    {data.taps[step]}
                </div>
            )}

            <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontSize: 12,
                color: accent, opacity: 0.7, marginTop: 12, letterSpacing: "1px",
            }}>
                {step < data.taps.length - 1 ? "нажимай ещё →" : "нажми, чтобы продолжить ✓"}
            </p>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   INTERACTIVE: INVESTIGATION
═══════════════════════════════════════════════ */
function InvestigationBlock({ data, accent, onDone }) {
    const [opened, setOpened] = useState([]);
    const [allDone, setAllDone] = useState(false);

    const toggle = (i) => {
        if (!opened.includes(i)) {
            const next = [...opened, i];
            setOpened(next);
            if (next.length === data.clues.length) setTimeout(() => setAllDone(true), 600);
        }
    };

    return (
        <div style={{ animation: "bubbleIn 0.4s ease both" }}>
            <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontSize: 14, color: "#9d6070",
                textAlign: "center", marginBottom: 16, letterSpacing: "0.5px",
            }}>{data.label} — открой каждый</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {data.clues.map((clue, i) => {
                    const isOpen = opened.includes(i);
                    return (
                        <div
                            key={i}
                            onClick={() => toggle(i)}
                            style={{
                                background: isOpen ? `${accent}12` : "rgba(255,255,255,0.7)",
                                backdropFilter: "blur(8px)",
                                border: `1.5px solid ${isOpen ? accent + "44" : "rgba(200,160,180,0.3)"}`,
                                borderRadius: 14, padding: "12px 16px",
                                cursor: isOpen ? "default" : "pointer",
                                transition: "all 0.3s ease",
                                boxShadow: isOpen ? `0 4px 16px ${accent}18` : "none",
                            }}
                        >
                            <div style={{
                                display: "flex", alignItems: "center", gap: 8,
                            }}>
                                <span style={{ fontSize: 16 }}>{isOpen ? "📂" : "📁"}</span>
                                <span style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontWeight: 600, fontSize: 14,
                                    color: isOpen ? accent : "#7a4a5a",
                                    fontStyle: "italic",
                                }}>{clue.place}</span>
                            </div>
                            {isOpen && (
                                <p style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontSize: 15, color: "#3a1a2a", lineHeight: 1.65,
                                    marginTop: 8, paddingLeft: 24,
                                    animation: "fadeIn 0.3s ease both",
                                    whiteSpace: "pre-line",
                                }}>{clue.text}</p>
                            )}
                        </div>
                    );
                })}
            </div>

            {allDone && (
                <div style={{
                    textAlign: "center", marginTop: 16,
                    animation: "fadeIn 0.4s ease both",
                }}>
                    <button
                        onClick={onDone}
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontStyle: "italic", fontSize: 15, color: accent,
                            background: `${accent}15`, border: `1.5px solid ${accent}44`,
                            borderRadius: 50, padding: "10px 28px", cursor: "pointer",
                        }}
                    >читать дальше →</button>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════
   INTERACTIVE: PAUSE / HEARTBEAT
═══════════════════════════════════════════════ */
function PauseBlock({ data, accent, onDone }) {
    const [beat, setBeat] = useState(0);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let count = 0;
        const iv = setInterval(() => {
            count++; setBeat(b => b + 1);
            if (count >= 4) { clearInterval(iv); setReady(true); }
        }, 700);
        return () => clearInterval(iv);
    }, []);

    return (
        <div style={{ textAlign: "center", animation: "bubbleIn 0.4s ease both" }}>
            <div style={{ fontSize: 52, marginBottom: 12, animation: "heartPulse 0.7s ease-in-out 4" }}>
                {data.emoji}
            </div>
            <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontSize: 16, color: "#7a4a5a",
                lineHeight: 1.7,
            }}>{data.text}</p>
            {ready && (
                <button
                    onClick={onDone}
                    style={{
                        marginTop: 20,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: "italic", fontSize: 14, color: accent,
                        background: "rgba(255,255,255,0.7)",
                        border: `1.5px solid ${accent}44`,
                        borderRadius: 50, padding: "10px 28px", cursor: "pointer",
                        animation: "fadeIn 0.5s ease both",
                    }}
                >продолжить…</button>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════
   INTERACTIVE: CONCERT MOMENT
═══════════════════════════════════════════════ */
function MomentBlock({ data, accent, onDone }) {
    const [lit, setLit] = useState(false);
    useEffect(() => { setTimeout(() => setLit(true), 200); }, []);

    return (
        <div
            onClick={() => { setLit(true); setTimeout(onDone, 1200); }}
            style={{
                textAlign: "center", cursor: "pointer",
                animation: "bubbleIn 0.4s ease both",
            }}
        >
            <div style={{
                fontSize: 48, marginBottom: 14,
                filter: lit ? `drop-shadow(0 0 20px ${accent})` : "none",
                transition: "filter 0.8s ease",
                animation: lit ? "none" : "gentlePulse 2s ease-in-out infinite",
            }}>🎶</div>
            <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontSize: 17,
                color: lit ? accent : "#9d6070",
                letterSpacing: "0.5px", lineHeight: 1.7,
                transition: "color 0.8s ease",
            }}>{data.text}</p>
            <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontSize: 12,
                color: "#b07090", opacity: 0.7,
                marginTop: 12, letterSpacing: "1.5px",
            }}>нажми, чтобы дослушать ✦</p>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   CHAPTER SCENE (renders scene by scene)
═══════════════════════════════════════════════ */
function ChapterScene({ chapter, onComplete }) {
    const [sceneIdx, setSceneIdx] = useState(0);
    const [shownScenes, setShownScenes] = useState([]);
    const [interactiveDone, setInteractiveDone] = useState(false);
    const scrollRef = useRef(null);

    const currentScene = chapter.scenes[sceneIdx];
    const isInteractive = currentScene && ["choice", "tap", "investigation", "pause", "moment"].includes(currentScene.type);
    const isLast = sceneIdx >= chapter.scenes.length - 1;

    const advance = useCallback(() => {
        if (isLast) {
            setTimeout(onComplete, 400);
            return;
        }
        setShownScenes(prev => [...prev, currentScene]);
        setSceneIdx(i => i + 1);
        setInteractiveDone(false);
        setTimeout(() => scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" }), 100);
    }, [isLast, currentScene, onComplete]);

    const handleSpeechDone = useCallback(() => {
        if (!isInteractive) setTimeout(advance, 300);
    }, [isInteractive, advance]);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
    }, [sceneIdx, shownScenes]);

    return (
        <div ref={scrollRef} style={{
            height: "calc(100vh - 160px)",
            overflowY: "auto", padding: "24px 20px 40px",
            display: "flex", flexDirection: "column", gap: 18,
            scrollbarWidth: "none",
        }}>
            <style>{`div::-webkit-scrollbar{display:none}`}</style>

            {/* Past scenes */}
            {shownScenes.map((s, i) => (
                <div key={i} style={{ opacity: 0.45, filter: "blur(0.3px)", transition: "opacity 0.3s" }}>
                    {s.type === "choice" || s.type === "tap" || s.type === "investigation" || s.type === "pause" || s.type === "moment"
                        ? <div style={{ textAlign: "center", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 13, color: chapter.accent, opacity: 0.7 }}>✓</div>
                        : <StaticBubble speaker={s.speaker} text={s.text} accent={chapter.accent} note={s.note} />
                    }
                </div>
            ))}

            {/* Current scene */}
            {currentScene && (() => {
                const t = currentScene.type;
                if (t === "choice") return <ChoiceBlock data={currentScene} accent={chapter.accent} onDone={advance} />;
                if (t === "tap") return <TapBlock data={currentScene} accent={chapter.accent} onDone={advance} />;
                if (t === "investigation") return <InvestigationBlock data={currentScene} accent={chapter.accent} onDone={advance} />;
                if (t === "pause") return <PauseBlock data={currentScene} accent={chapter.accent} onDone={advance} />;
                if (t === "moment") return <MomentBlock data={currentScene} accent={chapter.accent} onDone={advance} />;
                return (
                    <SpeechBubble
                        speaker={currentScene.speaker}
                        text={currentScene.text}
                        accent={chapter.accent}
                        note={currentScene.note}
                        onDone={handleSpeechDone}
                    />
                );
            })()}

            {/* Manual next for non-interactive non-auto scenes */}
            {isInteractive && interactiveDone && !isLast && (
                <div style={{ textAlign: "center" }}>
                    <button onClick={advance} style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: "italic", fontSize: 14, color: chapter.accent,
                        background: "rgba(255,255,255,0.7)",
                        border: `1.5px solid ${chapter.accent}44`,
                        borderRadius: 50, padding: "10px 28px", cursor: "pointer",
                    }}>дальше →</button>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════
   ENVELOPE SCREEN
═══════════════════════════════════════════════ */
function EnvelopeScreen({ onOpen }) {
    const [opening, setOpening] = useState(false);
    const open = () => { if (!opening) { setOpening(true); setTimeout(onOpen, 900); } };

    return (
        <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            minHeight: "100vh", textAlign: "center", padding: 24,
        }}>
            <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontSize: 13,
                color: "#c9184a", letterSpacing: "3px",
                marginBottom: 48, opacity: 0.8,
                animation: "fadeInUp 0.8s ease both",
            }}>Для Асёки · 14 февраля</p>

            <div
                onClick={open}
                style={{
                    position: "relative", width: 200, height: 140, cursor: "pointer",
                    animation: opening ? "envelopeOpen 0.9s ease forwards" : "gentleBob 3s ease-in-out infinite",
                    filter: "drop-shadow(0 16px 40px rgba(201,24,74,0.25))",
                }}
            >
                <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(160deg, #fff5f8, #ffd6e7)",
                    borderRadius: 16,
                    border: "1.5px solid rgba(255,182,193,0.5)",
                }} />
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 70,
                    background: "linear-gradient(160deg, #ffc8dd, #ffb3c6)",
                    borderRadius: "16px 16px 0 0",
                    clipPath: "polygon(0 0, 50% 64%, 100% 0)",
                    transformOrigin: "top",
                    animation: opening ? "flapOpen 0.5s ease 0.2s forwards" : "none",
                }} />
                <div style={{
                    position: "absolute", top: 38, left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: 30,
                    animation: "heartPulse 1.6s ease-in-out infinite",
                    zIndex: 2,
                }}>💌</div>
            </div>

            <p style={{
                marginTop: 36,
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontSize: 13,
                color: "#e5739a", letterSpacing: "2px",
                animation: "fadeInUp 0.8s ease 0.5s both", opacity: 0,
            }}>нажми, чтобы открыть ✿</p>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   CHAPTER CARD (chapter selection / transition)
═══════════════════════════════════════════════ */
function ChapterCard({ chapter, onStart }) {
    const [vis, setVis] = useState(false);
    useEffect(() => { setTimeout(() => setVis(true), 80); }, []);

    return (
        <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            minHeight: "100vh", padding: 32,
            opacity: vis ? 1 : 0, transform: vis ? "scale(1)" : "scale(0.97)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
        }}>
            <div style={{
                background: "rgba(255,255,255,0.82)",
                backdropFilter: "blur(24px)",
                borderRadius: 28, padding: "44px 40px",
                textAlign: "center", maxWidth: 380,
                border: `1.5px solid ${chapter.accent}33`,
                boxShadow: `0 24px 60px ${chapter.accent}15, inset 0 1px 0 rgba(255,255,255,0.9)`,
            }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>{chapter.icon}</div>
                <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic", fontSize: 12,
                    letterSpacing: "3px", textTransform: "uppercase",
                    color: chapter.accent, marginBottom: 8, opacity: 0.8,
                }}>{chapter.chapter}</div>
                <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "clamp(22px, 4vw, 30px)",
                    color: "#3a1a2a", marginBottom: 0,
                }}>{chapter.title}</h2>
            </div>

            <button
                onClick={onStart}
                style={{
                    marginTop: 32,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic", fontSize: 16,
                    color: "white",
                    background: `linear-gradient(135deg, ${chapter.accent}, ${chapter.accent}cc)`,
                    border: "none", borderRadius: 50,
                    padding: "14px 44px", cursor: "pointer",
                    boxShadow: `0 8px 28px ${chapter.accent}44`,
                    letterSpacing: "0.5px",
                    transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { e.target.style.transform = "scale(1)"; }}
            >начать главу →</button>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   FINAL SCREEN
═══════════════════════════════════════════════ */
function FinalScreen() {
    const [ans, setAns] = useState(null);
    const [noPos, setNoPos] = useState({ x: 0, y: 0 });
    const [vis, setVis] = useState(false);

    useEffect(() => { setTimeout(() => setVis(true), 100); }, []);

    const runAway = () => {
        const nx = (Math.random() - 0.5) * (window.innerWidth * 0.7);
        const ny = (Math.random() - 0.5) * (window.innerHeight * 0.5);
        setNoPos({ x: nx, y: ny });
    };

    if (ans === "yes") return (
        <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            minHeight: "100vh", padding: 32, textAlign: "center",
        }}>
            {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} style={{
                    position: "fixed",
                    left: `${5 + i * 7}%`, top: "-30px",
                    fontSize: 18 + (i % 3) * 10,
                    animation: `particleFall ${7 + (i % 4)}s linear ${(i * 0.4) % 3}s infinite`,
                    pointerEvents: "none", zIndex: 0,
                }}>{["💗","💕","🌸","✿"][i % 4]}</div>
            ))}
            <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: 80, marginBottom: 24, animation: "heartBurst 0.6s ease both", filter: "drop-shadow(0 0 24px rgba(201,24,74,0.5))" }}>💗</div>
                <h1 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "clamp(28px, 5vw, 46px)",
                    color: "transparent",
                    background: "linear-gradient(135deg, #c9184a, #ff4d6d, #ff8fab)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: 20, lineHeight: 1.2,
                    animation: "fadeInUp 0.6s ease 0.3s both", opacity: 0,
                }}>Я так и знал, Асёка ♥</h1>
                <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic", fontSize: 19,
                    color: "#9d174d", lineHeight: 1.85,
                    maxWidth: 420, margin: "0 auto 16px",
                    animation: "fadeInUp 0.6s ease 0.55s both", opacity: 0,
                }}>
                    Спасибо за всееее,<br />
                    И спасибо турникету
                </p>
                <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic", fontSize: 14,
                    color: "#e5739a", letterSpacing: "2px",
                    animation: "fadeInUp 0.6s ease 0.8s both", opacity: 0,
                }}>С Днём Влюблённых, Хлопушек 🌸</p>
            </div>
        </div>
    );

    return (
        <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            minHeight: "100vh", padding: 32,
            opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
            <div style={{ fontSize: 72, marginBottom: 28, animation: "heartPulse 1.4s ease-in-out infinite", filter: "drop-shadow(0 0 20px rgba(201,24,74,0.4))" }}>💝</div>
            <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700, fontSize: "clamp(22px, 4vw, 36px)",
                color: "#c9184a", marginBottom: 12, textAlign: "center",
            }}>Асёка…</h2>
            <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontSize: "clamp(18px, 2.5vw, 22px)",
                color: "#9d174d", textAlign: "center",
                lineHeight: 1.85, maxWidth: 400, marginBottom: 44,
            }}>Будешь моей валентинкой?</p>

            <div style={{ display: "flex", gap: 20, alignItems: "center", position: "relative" }}>
                <button
                    onClick={() => setAns("yes")}
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 17, fontWeight: 600, color: "white",
                        background: "linear-gradient(135deg, #ff4d6d, #c9184a)",
                        border: "none", borderRadius: 50,
                        padding: "16px 48px", cursor: "pointer",
                        boxShadow: "0 8px 28px rgba(255,77,109,0.4)",
                        transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={e => { e.target.style.transform = "scale(1.06)"; e.target.style.boxShadow = "0 12px 36px rgba(255,77,109,0.5)"; }}
                    onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 8px 28px rgba(255,77,109,0.4)"; }}
                >Да, конечно! 💗</button>

                <button
                    onMouseEnter={runAway}
                    onClick={runAway}
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: "italic", fontSize: 15,
                        color: "#e5739a",
                        background: "rgba(255,255,255,0.65)",
                        border: "1.5px solid rgba(255,182,193,0.4)",
                        borderRadius: 50, padding: "14px 30px", cursor: "pointer",
                        backdropFilter: "blur(8px)",
                        transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                        transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                        userSelect: "none",
                    }}
                >нет…</button>
            </div>

            <p style={{
                marginTop: 28, fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontSize: 11,
                color: "#e5a0b8", letterSpacing: "1.5px", opacity: 0.65,
            }}>✿ правильный ответ — только один ✿</p>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   CHAPTER HEADER BAR
═══════════════════════════════════════════════ */
function ChapterBar({ chapter, chapterIdx, total }) {
    return (
        <div style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
            background: "rgba(255,248,252,0.88)", backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,182,193,0.25)",
            padding: "14px 24px 10px",
        }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 600, margin: "0 auto" }}>
                <div>
                    <div style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: "italic", fontSize: 11,
                        letterSpacing: "2px", textTransform: "uppercase",
                        color: chapter.accent, opacity: 0.75,
                    }}>{chapter.chapter}</div>
                    <div style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 600, fontSize: 16,
                        color: "#3a1a2a",
                    }}>{chapter.icon} {chapter.title}</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                    {Array.from({ length: total }).map((_, i) => (
                        <div key={i} style={{
                            width: i === chapterIdx ? 18 : 6, height: 6, borderRadius: 3,
                            background: i < chapterIdx
                                ? chapter.accent + "77"
                                : i === chapterIdx
                                    ? chapter.accent
                                    : "rgba(255,182,193,0.25)",
                            transition: "width 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.3s",
                        }} />
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   APP
═══════════════════════════════════════════════ */
const PHASES = ["envelope", "chapter-card", "chapter-read", "final"];

export default function App() {
    const [phase, setPhase] = useState("envelope");
    const [chapterIdx, setChapterIdx] = useState(0);
    const [fading, setFading] = useState(false);

    const chapter = STORY[chapterIdx];

    const transition = (fn) => {
        setFading(true);
        setTimeout(() => { fn(); setFading(false); }, 350);
    };

    const openEnvelope = () => transition(() => setPhase("chapter-card"));
    const startChapter = () => transition(() => setPhase("chapter-read"));
    const finishChapter = () => {
        if (chapterIdx < STORY.length - 1) {
            transition(() => { setChapterIdx(i => i + 1); setPhase("chapter-card"); });
        } else {
            transition(() => setPhase("final"));
        }
    };

    const bgGrad = phase === "envelope" || phase === "final"
        ? "linear-gradient(150deg, #fff5f8, #fff0f5, #fef2f7)"
        : `linear-gradient(150deg, ${chapter.bg[0]}, ${chapter.bg[1]}, #fff8fc)`;

    const accent = phase === "envelope" || phase === "final" ? "#c9184a" : chapter.accent;

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        button { outline: none; }
        button:focus-visible { outline: 2px solid #ff8fab; outline-offset: 2px; }

        @keyframes particleFall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
          8%   { opacity: 0.55; }
          90%  { opacity: 0.35; }
          100% { transform: translateY(110vh) rotate(300deg); opacity: 0; }
        }
        @keyframes gentleBob {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50%       { transform: translateY(-14px) rotate(1deg); }
        }
        @keyframes envelopeOpen {
          to { transform: translateY(-50px) scale(1.05); opacity: 0; }
        }
        @keyframes flapOpen {
          to { transform: rotateX(160deg); }
        }
        @keyframes heartPulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.13); }
        }
        @keyframes gentlePulse {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50%       { transform: scale(1.06); opacity: 1; }
        }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bubbleIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes heartBurst {
          0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
          60%  { transform: scale(1.35) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>

            <div style={{
                minHeight: "100vh",
                background: bgGrad,
                transition: "background 1s ease",
                position: "relative",
                overflow: "hidden",
            }}>
                {/* Ambient blobs */}
                <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                    <div style={{
                        position: "absolute", top: "-12%", left: "-6%",
                        width: 480, height: 480, borderRadius: "50%",
                        background: `radial-gradient(circle, ${accent}22, transparent 65%)`,
                        transition: "background 1s ease",
                    }} />
                    <div style={{
                        position: "absolute", bottom: "-8%", right: "-8%",
                        width: 380, height: 380, borderRadius: "50%",
                        background: `radial-gradient(circle, ${accent}18, transparent 65%)`,
                        transition: "background 1s ease",
                    }} />
                </div>

                <Particles accent={accent} />

                {/* Chapter header */}
                {(phase === "chapter-card" || phase === "chapter-read") && (
                    <ChapterBar chapter={chapter} chapterIdx={chapterIdx} total={STORY.length} />
                )}

                {/* Content */}
                <div style={{
                    opacity: fading ? 0 : 1,
                    transform: fading ? "translateY(10px)" : "translateY(0)",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                    position: "relative", zIndex: 10,
                    paddingTop: phase === "chapter-card" || phase === "chapter-read" ? 80 : 0,
                }}>
                    {phase === "envelope" && <EnvelopeScreen onOpen={openEnvelope} />}
                    {phase === "chapter-card" && <ChapterCard chapter={chapter} onStart={startChapter} />}
                    {phase === "chapter-read" && (
                        <ChapterScene key={chapter.id} chapter={chapter} onComplete={finishChapter} />
                    )}
                    {phase === "final" && <FinalScreen />}
                </div>
            </div>
        </>
    );
}