import { useState } from "react";

// ─── Design Tokens (Publer teal + Superhuman indigo/warm-grey system) ────────
const tokens = {
  primary: "#1b1938",
  primaryDeep: "#0e0c1f",
  tealDeep: "#0e3030",
  tealMid: "#155555",
  tealBrand: "#14a89e", // Publer's signature teal-green
  tealLight: "#e6f7f6",
  violetSoft: "#c9b4fa",
  canvas: "#ffffff",
  canvasSoft: "#fafaf8",
  ink: "#292827",
  inkMute: "#73706d",
  inkFaint: "#9a9794",
  hairline: "#e8e4dd",
  hairlineDark: "#3f3a52",
  onDarkMute: "#bcbac9",
  onDarkFaint: "#5a5772",
};

// ─── Fake Data ────────────────────────────────────────────────────────────────
const CHANNELS = [
  { id: "all", label: "All", icon: "⬛", count: 24 },
  { id: "email", label: "Email", icon: "✉️", count: 9 },
  { id: "instagram", label: "Instagram", icon: "📸", count: 5 },
  { id: "facebook", label: "Facebook", icon: "👍", count: 4 },
  { id: "twitter", label: "Twitter / X", icon: "𝕏", count: 3 },
  { id: "linkedin", label: "LinkedIn", icon: "💼", count: 2 },
  { id: "whatsapp", label: "WhatsApp", icon: "💬", count: 1 },
];

const LABELS = [
  { id: "urgent", label: "Urgent", color: "#e55" },
  { id: "leads", label: "Leads", color: tokens.tealBrand },
  { id: "support", label: "Support", color: "#f5a623" },
  { id: "partner", label: "Partner", color: tokens.violetSoft },
];

const MESSAGES = [
  {
    id: 1, channel: "email", from: "Sarah Chen", handle: "sarah@acme.com",
    avatar: "SC", subject: "Partnership proposal — Q3 co-marketing",
    preview: "Hi, I wanted to follow up on our call last Tuesday about the co-marketing initiative for Q3. We've put together a brief deck...",
    time: "9:42 AM", unread: true, labels: ["leads"],
    body: `Hi there,\n\nI wanted to follow up on our call last Tuesday about the co-marketing initiative for Q3. We've put together a brief deck outlining three campaign concepts we think would resonate with both our audiences.\n\nThe headline numbers look strong — our initial modeling shows a potential 18% lift in trial sign-ups if we run the joint webinar series in late August.\n\nWould you have 30 minutes this week to walk through the deck together?\n\nBest,\nSarah Chen\nHead of Partnerships, Acme Corp`,
  },
  {
    id: 2, channel: "instagram", from: "Jordan Mills", handle: "@jordanmills",
    avatar: "JM", subject: "Comment on your reel",
    preview: "This is exactly what I needed to see today 🔥 Do you offer any consulting services for small brands?",
    time: "8:51 AM", unread: true, labels: ["leads"],
    body: `Comment on your reel "5 social media mistakes brands make 👀"\n\n@jordanmills: This is exactly what I needed to see today 🔥 Do you offer any consulting services for small brands? We're a 3-person team and we're completely lost on our content strategy.\n\nReplied to by 2 others ↓`,
  },
  {
    id: 3, channel: "facebook", from: "Publer Community", handle: "Publer Group",
    avatar: "PC", subject: "New mention in group",
    preview: "Alex Rivera mentioned you: 'Has anyone used @YourBrand for scheduling? Looking for alternatives to Buffer...'",
    time: "Yesterday", unread: true, labels: ["support"],
    body: `New mention in Publer Community Group\n\nAlex Rivera: Has anyone used @YourBrand for scheduling? Looking for alternatives to Buffer for a team of 10. We need approval workflows and decent analytics.\n\n14 reactions · 6 comments`,
  },
  {
    id: 4, channel: "twitter", from: "TechInsider", handle: "@techinsider",
    avatar: "TI", subject: "You were mentioned in a thread",
    preview: "@YourBrand just dropped a new feature that makes scheduling way easier. Thread 🧵👇",
    time: "Yesterday", unread: false, labels: [],
    body: `@techinsider mentioned you in a thread:\n\n"@YourBrand just dropped a new feature that makes scheduling way easier. Thread 🧵👇\n\n1/ The new bulk composer lets you create 50+ posts at once with AI-generated variations. Game-changer for agencies.\n\n2/ The best part? It respects each platform's character limits and image specs automatically.\n\n327 likes · 89 retweets`,
  },
  {
    id: 5, channel: "linkedin", from: "Marcus Webb", handle: "VP Marketing at Orbit",
    avatar: "MW", subject: "Re: Your article on AI content",
    preview: "Really insightful piece. I'm curious — how does your team handle the brand voice consistency issue when using AI at scale?",
    time: "Mon", unread: false, labels: ["partner"],
    body: `Hi,\n\nReally insightful piece on AI content workflows. I'm curious — how does your team handle the brand voice consistency issue when using AI at scale? We've been experimenting with a custom GPT fine-tuned on our content library, but the results are still hit-or-miss.\n\nWould love to compare notes if you're open to a quick call.\n\nBest,\nMarcus Webb\nVP Marketing, Orbit`,
  },
  {
    id: 6, channel: "email", from: "Notion", handle: "notify@notion.so",
    avatar: "N", subject: "New comment on 'Content Calendar Q3'",
    preview: "Priya commented: 'I updated the Instagram slots — can you double-check the captions before we schedule?'",
    time: "Mon", unread: false, labels: ["support"],
    body: `Priya Sharma commented on "Content Calendar Q3":\n\n"I updated the Instagram slots — can you double-check the captions before we schedule? A few of them feel a bit off-brand for the July campaign."\n\nView in Notion →`,
  },
  {
    id: 7, channel: "whatsapp", from: "Elena Rossi", handle: "+39 02 ···",
    avatar: "ER", subject: "WhatsApp · Client check-in",
    preview: "Ciao! Quick question about the reports we discussed — can we schedule a call this week?",
    time: "Sun", unread: true, labels: ["leads"],
    body: `WhatsApp message from Elena Rossi:\n\nCiao! Quick question about the reports we discussed — can we schedule a call this week? I want to show the Q2 results to my CEO and need to make sure we're aligned on the numbers before I present.\n\nThursday or Friday work best for me 🙏`,
  },
  {
    id: 8, channel: "instagram", from: "Camille Dupont", handle: "@camillecreates",
    avatar: "CD", subject: "DM: Collab request",
    preview: "Hey! I'm a lifestyle creator with 48k followers. I'd love to discuss a potential collaboration 🌿",
    time: "Sun", unread: false, labels: ["partner"],
    body: `Direct message from @camillecreates:\n\nHey! I'm a lifestyle creator with 48k followers in the sustainability space. I'd love to discuss a potential collaboration 🌿 I've been using your product for 6 months and genuinely love it — I think my audience would too.\n\nOpen to a gifted partnership or commission structure, whatever works for your team!`,
  },
];

// ─── Helper Components ────────────────────────────────────────────────────────
const Avatar = ({ initials, size = 36, bg = tokens.primary }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: bg, color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size * 0.35, fontWeight: 600, flexShrink: 0,
    letterSpacing: "-0.5px",
  }}>
    {initials}
  </div>
);

const Badge = ({ count }) => count > 0 ? (
  <span style={{
    background: tokens.tealBrand, color: "#fff",
    fontSize: 11, fontWeight: 700, borderRadius: 9999,
    padding: "1px 7px", lineHeight: "18px", minWidth: 18,
    textAlign: "center",
  }}>{count}</span>
) : null;

const LabelPill = ({ label }) => {
  const l = LABELS.find(x => x.id === label);
  if (!l) return null;
  return (
    <span style={{
      background: l.color + "22", color: l.color,
      fontSize: 10, fontWeight: 600, borderRadius: 4,
      padding: "1px 6px", letterSpacing: "0.3px",
    }}>{l.label.toUpperCase()}</span>
  );
};

const ChannelDot = ({ channel }) => {
  const colors = {
    email: "#4a90e2", instagram: "#e1306c", facebook: "#1877f2",
    twitter: "#1da1f2", linkedin: "#0077b5", whatsapp: "#25d366",
  };
  return (
    <span style={{
      width: 7, height: 7, borderRadius: "50%",
      background: colors[channel] || tokens.tealBrand,
      display: "inline-block", flexShrink: 0,
    }} />
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function UnifiedInbox() {
  const [activeChannel, setActiveChannel] = useState("all");
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [starred, setStarred] = useState(new Set());

  const filtered = MESSAGES.filter(m => {
    if (activeChannel !== "all" && m.channel !== activeChannel) return false;
    if (search && !m.from.toLowerCase().includes(search.toLowerCase()) &&
        !m.subject.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selected = MESSAGES.find(m => m.id === selectedId);

  const avatarColors = [
    tokens.primary, tokens.tealDeep, "#7c4daf", "#c0392b", "#e67e22", "#16a085"
  ];
  const avatarColor = (id) => avatarColors[id % avatarColors.length];

  return (
    <div style={{
      fontFamily: "'Inter var', 'Inter', system-ui, -apple-system, sans-serif",
      height: "100vh", display: "flex", flexDirection: "column",
      background: tokens.canvasSoft, color: tokens.ink,
      overflow: "hidden",
    }}>
      {/* ── Top Nav ── */}
      <header style={{
        background: tokens.primary, color: "#fff",
        display: "flex", alignItems: "center", gap: 16,
        padding: "0 24px", height: 52, flexShrink: 0,
        borderBottom: `1px solid ${tokens.hairlineDark}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: tokens.tealBrand,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15,
          }}>📬</div>
          <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-0.3px" }}>
            Unified Inbox
          </span>
        </div>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: 400, position: "relative" }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: tokens.onDarkFaint, fontSize: 13 }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search conversations…"
            style={{
              width: "100%", background: "rgba(255,255,255,0.08)",
              border: `1px solid ${tokens.hairlineDark}`,
              borderRadius: 8, padding: "6px 12px 6px 32px",
              color: "#fff", fontSize: 13,
              outline: "none", boxSizing: "border-box",
              "::placeholder": { color: tokens.onDarkFaint },
            }}
          />
        </div>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, color: tokens.onDarkMute }}>
            {MESSAGES.filter(m => m.unread).length} unread
          </span>
          <Avatar initials="YB" size={30} bg={tokens.tealBrand} />
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* ── Left Sidebar ── */}
        <aside style={{
          width: 220, background: tokens.primary, flexShrink: 0,
          display: "flex", flexDirection: "column",
          borderRight: `1px solid ${tokens.hairlineDark}`,
          overflowY: "auto",
        }}>
          <div style={{ padding: "16px 12px 8px" }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.8px", color: tokens.onDarkFaint, margin: "0 0 8px 8px" }}>
              CHANNELS
            </p>
            {CHANNELS.map(ch => {
              const isActive = activeChannel === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannel(ch.id)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 10,
                    padding: "8px 10px", borderRadius: 8, border: "none", cursor: "pointer",
                    background: isActive ? "rgba(20,168,158,0.2)" : "transparent",
                    color: isActive ? tokens.tealBrand : tokens.onDarkMute,
                    fontWeight: isActive ? 600 : 400,
                    fontSize: 13, transition: "all 0.12s",
                    marginBottom: 2, textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: 14 }}>{ch.icon}</span>
                  <span style={{ flex: 1 }}>{ch.label}</span>
                  {ch.count > 0 && <Badge count={ch.count} />}
                </button>
              );
            })}
          </div>

          <div style={{ padding: "8px 12px", borderTop: `1px solid ${tokens.hairlineDark}`, marginTop: 8 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.8px", color: tokens.onDarkFaint, margin: "8px 0 8px 8px" }}>
              LABELS
            </p>
            {LABELS.map(l => (
              <div key={l.id} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "7px 10px", borderRadius: 8, cursor: "pointer",
                fontSize: 13, color: tokens.onDarkMute,
                marginBottom: 2,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: l.color, flexShrink: 0 }} />
                {l.label}
              </div>
            ))}
          </div>

          <div style={{ padding: "12px", marginTop: "auto", borderTop: `1px solid ${tokens.hairlineDark}` }}>
            <button style={{
              width: "100%", background: tokens.tealBrand, color: "#fff",
              border: "none", borderRadius: 8, padding: "10px",
              fontWeight: 700, fontSize: 13, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              ✏️ Compose
            </button>
          </div>
        </aside>

        {/* ── Message List ── */}
        <div style={{
          width: 340, borderRight: `1px solid ${tokens.hairline}`,
          display: "flex", flexDirection: "column", background: tokens.canvas, flexShrink: 0,
          overflowY: "auto",
        }}>
          <div style={{
            padding: "14px 16px 10px",
            borderBottom: `1px solid ${tokens.hairline}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, letterSpacing: "-0.4px" }}>
                {CHANNELS.find(c => c.id === activeChannel)?.label || "All"}
              </h2>
              <p style={{ margin: 0, fontSize: 12, color: tokens.inkMute }}>
                {filtered.length} conversations
              </p>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button style={{ background: tokens.canvasSoft, border: `1px solid ${tokens.hairline}`, borderRadius: 6, padding: "5px 10px", fontSize: 11, color: tokens.inkMute, cursor: "pointer" }}>
                Filter
              </button>
              <button style={{ background: tokens.canvasSoft, border: `1px solid ${tokens.hairline}`, borderRadius: 6, padding: "5px 10px", fontSize: 11, color: tokens.inkMute, cursor: "pointer" }}>
                Sort
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={{ padding: 32, textAlign: "center", color: tokens.inkFaint }}>
              No messages found
            </div>
          ) : (
            filtered.map(msg => {
              const isSelected = msg.id === selectedId;
              return (
                <div
                  key={msg.id}
                  onClick={() => setSelectedId(msg.id)}
                  style={{
                    padding: "14px 16px",
                    borderBottom: `1px solid ${tokens.hairline}`,
                    cursor: "pointer",
                    background: isSelected ? tokens.tealLight : msg.unread ? "#fff" : tokens.canvasSoft,
                    borderLeft: isSelected ? `3px solid ${tokens.tealBrand}` : "3px solid transparent",
                    transition: "background 0.1s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <Avatar initials={msg.avatar} size={36} bg={avatarColor(msg.id)} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                        <ChannelDot channel={msg.channel} />
                        <span style={{ fontWeight: msg.unread ? 700 : 500, fontSize: 13, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {msg.from}
                        </span>
                        <span style={{ fontSize: 11, color: tokens.inkFaint, whiteSpace: "nowrap" }}>
                          {msg.time}
                        </span>
                        {msg.unread && (
                          <span style={{ width: 7, height: 7, borderRadius: "50%", background: tokens.tealBrand, flexShrink: 0 }} />
                        )}
                      </div>
                      <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: msg.unread ? 600 : 400, color: tokens.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {msg.subject}
                      </p>
                      <p style={{ margin: 0, fontSize: 11, color: tokens.inkMute, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {msg.preview}
                      </p>
                      {msg.labels.length > 0 && (
                        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                          {msg.labels.map(l => <LabelPill key={l} label={l} />)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ── Detail Pane ── */}
        {selected ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", background: tokens.canvas, minWidth: 0, overflow: "hidden" }}>
            {/* Thread header */}
            <div style={{
              padding: "16px 24px", borderBottom: `1px solid ${tokens.hairline}`,
              display: "flex", alignItems: "flex-start", justifyContent: "space-between",
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 600, letterSpacing: "-0.4px", color: tokens.ink }}>
                  {selected.subject}
                </h1>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <ChannelDot channel={selected.channel} />
                  <span style={{ fontSize: 13, color: tokens.inkMute }}>{selected.from}</span>
                  <span style={{ fontSize: 12, color: tokens.inkFaint }}>· {selected.handle}</span>
                  {selected.labels.map(l => <LabelPill key={l} label={l} />)}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0, marginLeft: 16 }}>
                <button
                  onClick={() => setStarred(s => { const n = new Set(s); n.has(selected.id) ? n.delete(selected.id) : n.add(selected.id); return n; })}
                  style={{ background: "none", border: `1px solid ${tokens.hairline}`, borderRadius: 6, padding: "6px 10px", cursor: "pointer", fontSize: 14 }}
                >
                  {starred.has(selected.id) ? "⭐" : "☆"}
                </button>
                <button style={{ background: "none", border: `1px solid ${tokens.hairline}`, borderRadius: 6, padding: "6px 10px", cursor: "pointer", fontSize: 13, color: tokens.inkMute }}>
                  Archive
                </button>
                <button style={{ background: tokens.primary, color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                  Mark Done
                </button>
              </div>
            </div>

            {/* Message body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
              <div style={{
                background: tokens.canvasSoft, borderRadius: 12,
                border: `1px solid ${tokens.hairline}`, padding: "24px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <Avatar initials={selected.avatar} size={40} bg={avatarColor(selected.id)} />
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{selected.from}</p>
                    <p style={{ margin: 0, fontSize: 12, color: tokens.inkMute }}>{selected.handle} · {selected.time}</p>
                  </div>
                </div>
                <p style={{
                  margin: 0, fontSize: 14, lineHeight: 1.7,
                  color: tokens.ink, whiteSpace: "pre-line",
                }}>
                  {selected.body}
                </p>
              </div>
            </div>

            {/* Reply box */}
            <div style={{
              padding: "16px 24px", borderTop: `1px solid ${tokens.hairline}`,
              background: tokens.canvas,
            }}>
              <div style={{
                border: `1px solid ${tokens.hairline}`, borderRadius: 10,
                overflow: "hidden",
              }}>
                <textarea
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Reply…"
                  rows={3}
                  style={{
                    width: "100%", border: "none", outline: "none",
                    padding: "12px 14px", fontSize: 14, resize: "none",
                    color: tokens.ink, background: tokens.canvas,
                    fontFamily: "inherit", boxSizing: "border-box",
                  }}
                />
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "8px 12px", borderTop: `1px solid ${tokens.hairline}`,
                  background: tokens.canvasSoft,
                }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["😊", "📎", "🖼️"].map(e => (
                      <button key={e} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, padding: "2px 4px" }}>{e}</button>
                    ))}
                  </div>
                  <button
                    style={{
                      background: replyText.trim() ? tokens.tealBrand : tokens.hairline,
                      color: replyText.trim() ? "#fff" : tokens.inkFaint,
                      border: "none", borderRadius: 7, padding: "8px 18px",
                      fontWeight: 700, fontSize: 13, cursor: replyText.trim() ? "pointer" : "default",
                      transition: "all 0.15s",
                    }}
                    onClick={() => setReplyText("")}
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: tokens.inkFaint }}>
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}
