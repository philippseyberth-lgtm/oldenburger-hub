"use client";
// @ts-nocheck
import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0B0F1A", sf: "#131825", sfH: "#1A2035", card: "#161C2E", bd: "#1E2742",
  acc: "#C8A97E", accL: "#D4BA94", accD: "rgba(200,169,126,0.15)",
  tx: "#E8E4DF", txM: "#8A8F9E", txD: "#5A5F6E",
  g: "#4ADE80", r: "#F87171", b: "#60A5FA", p: "#A78BFA", o: "#FB923C", y: "#FBBF24",
  epic: "#7C3AED", mon: "#FF3D57", ms: "#00A4EF",
};

const Avatar = ({ name, size = 32 }) => {
  const ini = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  const cls = ["#C8A97E","#60A5FA","#A78BFA","#4ADE80","#FB923C","#F87171"];
  const c = cls[name.length % cls.length];
  return <div style={{ width: size, height: size, borderRadius: "50%", background: c + "22", border: `1.5px solid ${c}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.36, fontWeight: 600, color: c, flexShrink: 0 }}>{ini}</div>;
};

const Badge = ({ children, color = C.acc }) => (
  <span style={{ padding: "2px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: color + "18", color, border: `1px solid ${color}33`, whiteSpace: "nowrap" }}>{children}</span>
);

const SourceTag = ({ source }) => {
  const m = { epicor: ["Epicor", C.epic, "⬡"], monday: ["Monday", C.mon, "⬢"], m365: ["M365", C.ms, "◆"], hub: ["Hub", C.acc, "✦"] };
  const [label, color, icon] = m[source] || m.hub;
  return <span style={{ fontSize: 10, padding: "1px 7px", borderRadius: 4, background: color + "18", color, fontWeight: 600, border: `1px solid ${color}22` }}>{icon} {label}</span>;
};

const Stat = ({ label, value, sub, icon, color = C.acc, source }) => (
  <div style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 14, padding: "16px 18px", flex: 1, minWidth: 155 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
      <span style={{ fontSize: 11, color: C.txM }}>{label}</span>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>{source && <SourceTag source={source} />}<span style={{ fontSize: 15 }}>{icon}</span></div>
    </div>
    <div style={{ fontSize: 24, fontWeight: 700, color: C.tx }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color, marginTop: 2 }}>{sub}</div>}
  </div>
);

const Tab = ({ tabs, active, set }) => (
  <div style={{ display: "flex", gap: 4, marginBottom: 18, flexWrap: "wrap" }}>
    {tabs.map(t => (
      <button key={t} onClick={() => set(t)} style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${active === t ? C.acc : C.bd}`, background: active === t ? C.accD : "transparent", color: active === t ? C.acc : C.txM, fontSize: 12, fontWeight: active === t ? 600 : 400, cursor: "pointer" }}>{t}</button>
    ))}
  </div>
);

const Btn = ({ children, onClick, secondary }) => (
  <button onClick={onClick} style={{ padding: "10px 18px", borderRadius: 10, border: secondary ? `1px solid ${C.bd}` : "none", background: secondary ? "transparent" : `linear-gradient(135deg, ${C.acc}, #B8956A)`, color: secondary ? C.txM : C.bg, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{children}</button>
);

const Table = ({ cols, rows }) => (
  <div style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 14, overflow: "hidden" }}>
    <div style={{ display: "flex", padding: "10px 18px", borderBottom: `1px solid ${C.bd}`, background: C.sf }}>
      {cols.map((c, i) => <div key={i} style={{ flex: c.flex || 1, fontSize: 10, fontWeight: 600, color: C.txD, textTransform: "uppercase", letterSpacing: 0.5 }}>{c.label}</div>)}
    </div>
    {rows.map((r, ri) => (
      <div key={ri} style={{ display: "flex", padding: "12px 18px", borderBottom: ri < rows.length - 1 ? `1px solid ${C.bd}` : "none", alignItems: "center", cursor: r.onClick ? "pointer" : "default" }} onClick={r.onClick} onMouseEnter={e => { if (r.onClick) e.currentTarget.style.background = C.sfH; }} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
        {r.cells.map((cell, ci) => <div key={ci} style={{ flex: cols[ci]?.flex || 1, fontSize: 13, color: C.tx }}>{cell}</div>)}
      </div>
    ))}
  </div>
);

const IntegrationBar = () => (
  <div style={{ display: "flex", gap: 12, padding: "8px 0", marginBottom: 16, flexWrap: "wrap" }}>
    {[["Microsoft 365", C.ms, "◆", "Connected"], ["Monday.com", C.mon, "⬢", "12 boards synced"], ["Epicor Kinetic", C.epic, "⬡", "Production & Finance"]].map(([n, c, ic, d]) => (
      <div key={n} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 8, background: c + "10", border: `1px solid ${c}22` }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.g }} />
        <span style={{ fontSize: 11, color: c, fontWeight: 600 }}>{ic} {n}</span>
        <span style={{ fontSize: 10, color: C.txD }}>· {d}</span>
      </div>
    ))}
  </div>
);

// ─── DATA ──────────────

const projects = [
  { id: 1, name: "Swarovski Flagship", loc: "Vienna, AT", client: "Swarovski", status: "In Production", progress: 72, pm: "Lukas Meier", phase: "Manufacturing", due: "Apr 15, 2026", budget: 840000, spent: 605000, team: ["Lukas Meier","Anna Chen","Ravi Patel"], contact: "Maria Schmidt", contactEmail: "m.schmidt@swarovski.com", contactPhone: "+43 1 234 5678", mondayId: "MON-2841", epicorJob: "JOB-2026-0041" },
  { id: 2, name: "Ganni Store", loc: "Copenhagen, DK", client: "Ganni", status: "Design Review", progress: 35, pm: "Sophie van Dijk", phase: "Technical Dev", due: "Jun 22, 2026", budget: 520000, spent: 182000, team: ["Sophie van Dijk","Kai Tanaka"], contact: "Lars Andersen", contactEmail: "l.andersen@ganni.com", contactPhone: "+45 33 123 456", mondayId: "MON-2856", epicorJob: "JOB-2026-0055" },
  { id: 3, name: "Gaggenau Showroom", loc: "Shanghai, CN", client: "Gaggenau", status: "On Site", progress: 91, pm: "Anna Chen", phase: "Installation", due: "Mar 18, 2026", budget: 1200000, spent: 1092000, team: ["Anna Chen","Wei Liu","Ravi Patel","Lukas Meier"], contact: "Thomas Berger", contactEmail: "t.berger@gaggenau.com", contactPhone: "+86 21 5678 9012", mondayId: "MON-2803", epicorJob: "JOB-2025-0098" },
  { id: 4, name: "Kudos Boutique", loc: "Kuala Lumpur, MY", client: "Kudos", status: "Planning", progress: 12, pm: "Ravi Patel", phase: "Concept Design", due: "Sep 01, 2026", budget: 380000, spent: 45600, team: ["Ravi Patel","Sophie van Dijk"], contact: "Ahmad Razak", contactEmail: "a.razak@kudos.my", contactPhone: "+60 3 2345 6789", mondayId: "MON-2871", epicorJob: "JOB-2026-0067" },
  { id: 5, name: "De Bijenkorf Renovation", loc: "Amsterdam, NL", client: "De Bijenkorf", status: "In Production", progress: 58, pm: "Lukas Meier", phase: "Manufacturing", due: "May 30, 2026", budget: 1500000, spent: 870000, team: ["Lukas Meier","Sophie van Dijk","Kai Tanaka","Wei Liu"], contact: "Jan de Vries", contactEmail: "j.devries@debijenkorf.nl", contactPhone: "+31 20 987 6543", mondayId: "MON-2819", epicorJob: "JOB-2026-0012" },
];

const openPoints = [
  { id: 1, project: "Swarovski Flagship", title: "Approval needed: display wall finish", priority: "High", owner: "Client", assignedTo: "Maria Schmidt", created: "Feb 22", days: 8, desc: "Sign-off on oak veneer stain — 3 samples sent Feb 20" },
  { id: 2, project: "Swarovski Flagship", title: "Revised lighting layout feedback", priority: "Medium", owner: "Client", assignedTo: "Maria Schmidt", created: "Feb 26", days: 4, desc: "Updated layout sent, awaiting comments" },
  { id: 3, project: "Ganni Store", title: "Material selection: fitting room panels", priority: "High", owner: "Oldenburger", assignedTo: "Sophie van Dijk", created: "Feb 18", days: 12, desc: "3 material options presented, client prefers option B — need final costing" },
  { id: 4, project: "Ganni Store", title: "Floor plan revision — entrance area", priority: "Medium", owner: "Client", assignedTo: "Lars Andersen", created: "Feb 28", days: 2, desc: "Client requested wider entrance; structural feasibility check in progress" },
  { id: 5, project: "Gaggenau Showroom", title: "Delivery access confirmation for installation", priority: "Urgent", owner: "Client", assignedTo: "Thomas Berger", created: "Mar 01", days: 1, desc: "Need confirmed loading dock schedule for Mar 10-14 delivery window" },
  { id: 6, project: "De Bijenkorf", title: "Color sample approval — entrance fixtures", priority: "Medium", owner: "Client", assignedTo: "Jan de Vries", created: "Feb 20", days: 10, desc: "RAL color samples shipped, awaiting client sign-off" },
  { id: 7, project: "De Bijenkorf", title: "Structural engineer report pending", priority: "High", owner: "Oldenburger", assignedTo: "Kai Tanaka", created: "Feb 15", days: 15, desc: "Third-party structural assessment for ceiling mounts — report due Mar 5" },
  { id: 8, project: "Kudos Boutique", title: "Brand guidelines document", priority: "Low", owner: "Client", assignedTo: "Ahmad Razak", created: "Feb 25", days: 5, desc: "Requested full brand guidelines for concept design phase" },
];

const clientPMs = [
  { name: "Maria Schmidt", client: "Swarovski", projects: 1, openPoints: 2, urgent: 0, avgResponseDays: 3.2, email: "m.schmidt@swarovski.com" },
  { name: "Lars Andersen", client: "Ganni", projects: 1, openPoints: 1, urgent: 0, avgResponseDays: 2.1, email: "l.andersen@ganni.com" },
  { name: "Thomas Berger", client: "Gaggenau", projects: 1, openPoints: 1, urgent: 1, avgResponseDays: 1.5, email: "t.berger@gaggenau.com" },
  { name: "Ahmad Razak", client: "Kudos", projects: 1, openPoints: 1, urgent: 0, avgResponseDays: 4.8, email: "a.razak@kudos.my" },
  { name: "Jan de Vries", client: "De Bijenkorf", projects: 1, openPoints: 1, urgent: 0, avgResponseDays: 5.1, email: "j.devries@debijenkorf.nl" },
];

const contracts = [
  { name: "Swarovski AG — Flagship Vienna", type: "Project", value: "€ 840,000", end: "Apr 2026", status: "Active", src: "m365" },
  { name: "Ganni A/S — Copenhagen Store", type: "Project", value: "€ 520,000", end: "Jun 2026", status: "Active", src: "m365" },
  { name: "BSH (Gaggenau) — Shanghai", type: "Project", value: "€ 1,200,000", end: "Mar 2026", status: "Active", src: "m365" },
  { name: "Autodesk AutoCAD (25 seats)", type: "License", value: "€ 62,500/yr", end: "Dec 2026", status: "Active", src: "hub" },
  { name: "Epicor Kinetic ERP", type: "License", value: "€ 48,000/yr", end: "Sep 2026", status: "Active", src: "hub" },
  { name: "Monday.com Business (50 seats)", type: "License", value: "€ 24,000/yr", end: "Jul 2026", status: "Active", src: "hub" },
  { name: "Microsoft 365 E3 (50 seats)", type: "License", value: "€ 19,800/yr", end: "Mar 2026", status: "Expiring", src: "ms" },
  { name: "ISO 9001:2015", type: "Cert", value: "—", end: "Jun 2027", status: "Active", src: "hub" },
  { name: "FSC Chain of Custody", type: "Cert", value: "—", end: "Jan 2028", status: "Active", src: "hub" },
  { name: "DB Schenker Logistics", type: "Service", value: "€ 340,000/yr", end: "Apr 2026", status: "Active", src: "hub" },
];

const drawings = [
  { id: 1, name: "SWV-FL-DWG-001", project: "Swarovski Flagship", desc: "Main display wall — oak veneer panel layout", status: "Pending", by: "Kai Tanaka", date: "Feb 28", comments: 2, sharepoint: "Projects/Swarovski/Drawings/" },
  { id: 2, name: "GAN-CP-DWG-003", project: "Ganni Store", desc: "Fitting room partition — cross-section", status: "Revision", by: "Sophie van Dijk", date: "Feb 25", comments: 5, sharepoint: "Projects/Ganni/Drawings/" },
  { id: 3, name: "GAG-SH-DWG-012", project: "Gaggenau Showroom", desc: "Kitchen island — CNC cutting plan", status: "Approved", by: "Wei Liu", date: "Feb 20", comments: 1, sharepoint: "Projects/Gaggenau/Drawings/" },
  { id: 4, name: "BIJ-AM-DWG-007", project: "De Bijenkorf", desc: "Entrance fixture — steel frame detail", status: "Pending", by: "Kai Tanaka", date: "Mar 01", comments: 0, sharepoint: "Projects/Bijenkorf/Drawings/" },
];

const stCol = s => ({ "In Production": C.b, "Design Review": C.o, "On Site": C.g, Planning: C.p }[s] || C.txM);
const dwgCol = s => ({ Pending: C.o, Revision: C.r, Approved: C.g, "In Progress": C.b }[s] || C.txM);
const priCol = s => ({ Urgent: C.r, High: C.o, Medium: C.y, Low: C.txM }[s] || C.txM);
const months = ["Oct","Nov","Dec","Jan","Feb","Mar"];
const rev = [820,950,780,1100,980,1250];
const costs = [620,710,590,780,720,890];

const ShippingTracker = ({ project }) => {
  const [animPct, setAnimPct] = useState(0);
  const shipData = {
    1: { from: "Den Haag, NL", to: "Vienna, AT", carrier: "DB Schenker", method: "Road", containers: 3, departed: "Mar 28", eta: "Apr 01", status: "In Transit", pct: 62, stops: [{ name: "Den Haag", pct: 0 }, { name: "Duisburg", pct: 30 }, { name: "Munich", pct: 65 }, { name: "Vienna", pct: 100 }], events: [{ time: "Mar 28 08:00", text: "Departed Den Haag warehouse", done: true }, { time: "Mar 28 18:30", text: "Customs cleared — NL/DE border", done: true }, { time: "Mar 29 11:00", text: "Arrived Duisburg hub — reload", done: true }, { time: "Mar 29 22:00", text: "Departed Duisburg", done: true }, { time: "Mar 30 (est)", text: "Munich transit point", done: false }, { time: "Apr 01 (est)", text: "Arrival Vienna — site delivery", done: false }] },
    3: { from: "Den Haag, NL", to: "Shanghai, CN", carrier: "DB Schenker / Maersk", method: "Sea + Road", containers: 2, departed: "Feb 10", eta: "Mar 12", status: "Arrived", pct: 100, stops: [{ name: "Rotterdam", pct: 0 }, { name: "Suez Canal", pct: 30 }, { name: "Singapore", pct: 68 }, { name: "Shanghai", pct: 100 }], events: [{ time: "Feb 10", text: "Loaded at Rotterdam port", done: true }, { time: "Feb 18", text: "Suez Canal transit", done: true }, { time: "Mar 02", text: "Singapore transshipment", done: true }, { time: "Mar 10", text: "Arrived Shanghai port", done: true }, { time: "Mar 11", text: "Customs cleared", done: true }, { time: "Mar 12", text: "Delivered to site", done: true }] },
  };
  const ship = shipData[project.id] || shipData[1];
  useEffect(() => { const timer = setTimeout(() => setAnimPct(ship.pct), 100); return () => clearTimeout(timer); }, [ship.pct]);
  return (
    <div style={{ marginBottom: 18 }}>
      <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
        {"🚢 Shipping Progress"}
        <Badge color={ship.status === "Arrived" ? C.g : ship.status === "In Transit" ? C.b : C.o}>{ship.status}</Badge>
      </h3>
      <div style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 14, padding: 22 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
          {[["Carrier", ship.carrier], ["Method", ship.method], ["Containers", ship.containers], ["Departed", ship.departed], ["ETA", ship.eta]].map(([l, v]) => (
            <div key={l} style={{ background: C.sf, borderRadius: 8, padding: "8px 12px", minWidth: 80 }}>
              <div style={{ fontSize: 9, color: C.txD, textTransform: "uppercase" }}>{l}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.tx, marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ position: "relative", marginBottom: 20, padding: "0 8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: C.acc }}>{ship.from}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: C.acc }}>{ship.to}</span>
          </div>
          <div style={{ position: "relative", height: 12, background: C.bg, borderRadius: 99, overflow: "hidden", border: `1px solid ${C.bd}` }}>
            <div style={{ width: `${animPct}%`, height: "100%", background: ship.status === "Arrived" ? `linear-gradient(90deg, ${C.g}88, ${C.g})` : `linear-gradient(90deg, ${C.acc}88, ${C.acc})`, borderRadius: 99, transition: "width 1.8s cubic-bezier(0.4, 0, 0.2, 1)", position: "relative" }}>
              {ship.status !== "Arrived" && (
                <div style={{ position: "absolute", right: -1, top: -4, width: 20, height: 20, background: C.acc, borderRadius: "50%", border: `2px solid ${C.bg}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, boxShadow: `0 0 12px ${C.acc}66`, animation: "pulse 2s infinite" }}>
                  {ship.method.includes("Sea") ? "🚢" : "🚛"}
                </div>
              )}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, position: "relative" }}>
            {ship.stops.map((stop, i) => (
              <div key={i} style={{ textAlign: "center", position: "relative", flex: i === 0 || i === ship.stops.length - 1 ? "none" : 1 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: ship.pct >= stop.pct ? C.g : C.bd, border: `2px solid ${ship.pct >= stop.pct ? C.g : C.bd}`, margin: "0 auto 4px", transition: "background 0.5s" }} />
                <div style={{ fontSize: 10, color: ship.pct >= stop.pct ? C.tx : C.txD, fontWeight: ship.pct >= stop.pct ? 500 : 400 }}>{stop.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.tx, marginBottom: 8 }}>Tracking Events</div>
        <div style={{ position: "relative", paddingLeft: 20 }}>
          <div style={{ position: "absolute", left: 5, top: 4, bottom: 4, width: 2, background: C.bd, borderRadius: 99 }} />
          {ship.events.map((ev, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8, position: "relative" }}>
              <div style={{ position: "absolute", left: -16, top: 3, width: 10, height: 10, borderRadius: "50%", background: ev.done ? C.g : C.bd, border: `2px solid ${ev.done ? C.g : C.bd}`, zIndex: 1 }} />
              <div>
                <span style={{ fontSize: 10, color: ev.done ? C.txM : C.txD, marginRight: 8 }}>{ev.time}</span>
                <span style={{ fontSize: 12, color: ev.done ? C.tx : C.txD }}>{ev.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes pulse { 0%, 100% { box-shadow: 0 0 8px ${C.acc}44; } 50% { box-shadow: 0 0 18px ${C.acc}88; } }`}</style>
    </div>
  );
};

// ─── TECHNICAL TEAM ──────────────

const TechDashboard = () => {
  const [tab, setTab] = useState("Drawing Reviews");
  const [sel, setSel] = useState(null);
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: C.tx, margin: 0 }}>Technical Team</h1>
      <p style={{ color: C.txM, fontSize: 13, marginTop: 4, marginBottom: 16 }}>Drawing reviews, AI analysis, and production data from Epicor.</p>
      <IntegrationBar />
      <Tab tabs={["Drawing Reviews", "AI Drawing Analysis", "Production Data"]} active={tab} set={setTab} />
      {tab === "Drawing Reviews" && !sel && (
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <Stat label="Pending" value="2" icon="📋" color={C.o} source="m365" />
            <Stat label="Revisions" value="1" icon="✏️" color={C.r} source="m365" />
            <Stat label="Approved" value="1" icon="✅" color={C.g} source="m365" />
            <Stat label="Active Jobs" value="5" icon="⬡" color={C.epic} source="epicor" />
          </div>
          <Table cols={[{ label: "Drawing", flex: 1.2 }, { label: "Project", flex: 1.2 }, { label: "Description", flex: 2 }, { label: "Status", flex: 0.8 }, { label: "By", flex: 0.8 }]}
            rows={drawings.map(d => ({
              onClick: () => setSel(d),
              cells: [
                <span key="n" style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 600, color: C.acc }}>{d.name}</span>,
                d.project,
                <span key="d" style={{ color: C.txM, fontSize: 12 }}>{d.desc}</span>,
                <Badge key="s" color={dwgCol(d.status)}>{d.status}</Badge>,
                <span key="b" style={{ fontSize: 12, color: C.txM }}>{d.by.split(" ")[0]}</span>
              ]
            }))}
          />
        </div>
      )}
      {tab === "Drawing Reviews" && sel && (
        <div>
          <button onClick={() => setSel(null)} style={{ background: "none", border: "none", color: C.acc, fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 14 }}>{"<"}- Back</button>
          <div style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 14, padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: C.tx, margin: 0, fontFamily: "monospace" }}>{sel.name}</h2>
                <p style={{ color: C.txM, fontSize: 13, marginTop: 4 }}>{sel.project} — {sel.desc}</p>
              </div>
              <Badge color={dwgCol(sel.status)}>{sel.status}</Badge>
            </div>
            <div style={{ background: C.bg, borderRadius: 12, height: 200, display: "flex", alignItems: "center", justifyContent: "center", border: `1px dashed ${C.bd}`, marginBottom: 18 }}>
              <div style={{ textAlign: "center", color: C.txD }}>
                <div style={{ fontSize: 36, marginBottom: 6 }}>📐</div>
                <div style={{ fontSize: 12 }}>Drawing preview from SharePoint</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Btn>Approve</Btn>
              <Btn secondary>Request Revision</Btn>
              <Btn secondary>AI Review</Btn>
            </div>
          </div>
        </div>
      )}
      {tab === "AI Drawing Analysis" && (
        <div style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 14, padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.tx, marginBottom: 6 }}>✦ AI Drawing Review Assistant</div>
          <div style={{ fontSize: 12, color: C.txM, marginBottom: 18 }}>Cross-references Epicor BOM data and Monday.com specs.</div>
          <div style={{ background: C.bg, borderRadius: 12, border: `2px dashed ${C.bd}`, padding: 36, textAlign: "center", marginBottom: 18, cursor: "pointer" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📄</div>
            <div style={{ fontSize: 13, color: C.txM }}>Drop files or select from SharePoint</div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Dimension accuracy", "Material vs Epicor BOM", "CNC feasibility", "Tolerance check", "FSC traceability", "Cost estimate"].map(f => (
              <div key={f} style={{ padding: "6px 12px", borderRadius: 8, background: C.accD, color: C.acc, fontSize: 11, fontWeight: 500 }}>{f}</div>
            ))}
          </div>
        </div>
      )}
      {tab === "Production Data" && (
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <Stat label="Active Jobs" value="5" icon="🏭" source="epicor" color={C.epic} />
            <Stat label="Utilization" value="78%" icon="⚙️" source="epicor" color={C.g} />
            <Stat label="WIP Value" value="€ 1.2M" icon="📦" source="epicor" />
            <Stat label="On-Time" value="94%" icon="🎯" source="epicor" color={C.g} />
          </div>
          <Table cols={[{ label: "Epicor Job", flex: 1 }, { label: "Project", flex: 1.5 }, { label: "Phase", flex: 1 }, { label: "Material", flex: 0.8 }, { label: "Progress", flex: 1.2 }]}
            rows={projects.map(p => ({
              cells: [
                <span key="e" style={{ fontFamily: "monospace", fontSize: 11, color: C.epic, fontWeight: 600 }}>{p.epicorJob}</span>,
                <span key="n" style={{ fontWeight: 500 }}>{p.name}</span>,
                p.phase,
                <Badge key="m" color={p.progress > 50 ? C.g : C.o}>{p.progress > 50 ? "Allocated" : "Ordering"}</Badge>,
                <div key="p" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ flex: 1, height: 5, background: C.bg, borderRadius: 99, overflow: "hidden" }}><div style={{ width: `${p.progress}%`, height: "100%", background: `linear-gradient(90deg, ${C.epic}, ${C.p})`, borderRadius: 99 }} /></div>
                  <span style={{ fontSize: 10, color: C.txM }}>{p.progress}%</span>
                </div>
              ]
            }))}
          />
        </div>
      )}
    </div>
  );
};

// ─── ADMIN ──────────────

const myContracts = [
  { id: 1, cat: "License", name: "Business License — Subang Office", agency: "Majlis Bandaraya Subang Jaya", eff: "2026-02-14", exp: "2027-02-14", pic: "KC", file: "Business license Subang.pdf", cost: "" },
  { id: 2, cat: "License", name: "Business License Factory (PT 42835)", agency: "Majlis Bandaraya Seremban", eff: "", exp: "2026-11-13", pic: "KC", file: "MBS License PT 42835.pdf", cost: "" },
  { id: 3, cat: "License", name: "Business License Factory (PT 42836)", agency: "Majlis Bandaraya Seremban", eff: "", exp: "2026-07-28", pic: "KC", file: "Business license Warehouse.pdf", cost: "" },
  { id: 4, cat: "License", name: "Fire Extinguisher Certificate", agency: "BOMBA", eff: "", exp: "2026-11-12", pic: "Izzati", file: "Fire Extinguisher Cert.png", cost: "" },
  { id: 5, cat: "License", name: "Wholesale Retail Trade License", agency: "KPDNKK", eff: "2024-08-05", exp: "2026-08-04", pic: "", file: "WRT License.pdf", cost: "", note: "Renew 3 months before" },
  { id: 6, cat: "License", name: "Energy Commission", agency: "Suruhanjaya Tenaga", eff: "", exp: "2025-07-15", pic: "", file: "Energy Commission.pdf", cost: "", note: "Renew yearly" },
  { id: 7, cat: "License", name: "Competent Person — Scheduled Waste", agency: "DOE — Mr Izhar", eff: "2016-05-06", exp: "", pic: "Izhar", file: "Competent person.pdf", cost: "" },
  { id: 8, cat: "License", name: "Competent Person — Bag Filter (CePBFO)", agency: "DOE — Mr Danny", eff: "2025-05-15", exp: "", pic: "Danny", file: "Certificate Competent Person.pdf", cost: "" },
  { id: 9, cat: "License", name: "Manufacturing License", agency: "MIDA", eff: "2023-10-25", exp: "", pic: "", file: "Manufacturing license.pdf", cost: "" },
  { id: 10, cat: "License", name: "Import Permit", agency: "MTIB", eff: "2025-05-21", exp: "2030-06-30", pic: "Anis", file: "IMPORT (2025-2030).pdf", cost: "", note: "Renew every 5 years" },
  { id: 11, cat: "License", name: "CIDB Certified Pass — Niam", agency: "CIDB", eff: "", exp: "2027-03-22", pic: "Tamai", file: "CIDB-Niam.pdf", cost: "" },
  { id: 12, cat: "License", name: "CIDB Certified Pass — Nur Asyraff", agency: "CIDB", eff: "", exp: "2028-11-20", pic: "Tamai", file: "CIDB-Nur Asyraff.pdf", cost: "" },
  { id: 13, cat: "License", name: "Export & Supplier Permit", agency: "MTIB", eff: "2025-08-06", exp: "2030-06-30", pic: "Anis", file: "Supplier & Export (2025-2030).pdf", cost: "", note: "Renew every 5 years" },
  { id: 14, cat: "Contract", name: "Factory Rental — Production (PT 42835)", agency: "Countryhua Sdn. Bhd.", eff: "2023-12-12", exp: "", pic: "", file: "Tenancy Agreement PT 42835.pdf", cost: "", note: "3-year term" },
  { id: 15, cat: "Contract", name: "Factory Rental — Warehouse (PT 42836)", agency: "Countryhua Sdn. Bhd.", eff: "2023-12-12", exp: "", pic: "", file: "Tenancy Agreement PT 42836.pdf", cost: "", note: "3-year term" },
  { id: 16, cat: "Contract", name: "Subang Office Rental", agency: "Mr Tan Ban Kee", eff: "2026-03-01", exp: "2027-02-28", pic: "Alia", file: "Tenancy Renewal Subang.pdf", cost: "RM 1,850/mo" },
  { id: 17, cat: "Contract", name: "Accommodation — Anton, Tom, Huang", agency: "Goh Wei Pin", eff: "2025-03-15", exp: "2026-03-14", pic: "", file: "Kalista Agreement.pdf", cost: "RM 2,300/mo" },
  { id: 18, cat: "Insurance", name: "Office Car — Proton Exora (VLE1327)", agency: "Takaful Malaysia", eff: "2025-10-22", exp: "2026-10-21", pic: "KC", file: "Takaful insurance VLE1327.pdf", cost: "RM 2,083" },
  { id: 19, cat: "Insurance", name: "Office Car — Ford Ranger (DEG4499)", agency: "MSIG Insurance", eff: "2026-02-16", exp: "2027-02-15", pic: "KC", file: "Insurance DEG4499.pdf", cost: "RM 2,143" },
  { id: 20, cat: "Insurance", name: "Fire Policy — Warehouse (RM 1.5M)", agency: "MSIG Insurance", eff: "2025-09-06", exp: "2026-09-05", pic: "KC", file: "FIRE POLICY RM1.5M.pdf", cost: "RM 3,344" },
  { id: 21, cat: "Insurance", name: "Fire Policy — Main (RM 10.12M)", agency: "MSIG Insurance", eff: "2025-09-06", exp: "2026-09-05", pic: "KC", file: "FIRE POLICY RM10.12k.pdf", cost: "RM 72,037" },
  { id: 22, cat: "Insurance", name: "Public Liability", agency: "MSIG Insurance", eff: "2025-09-06", exp: "2026-09-05", pic: "KC", file: "Public Liability.pdf", cost: "RM 1,630" },
  { id: 23, cat: "Insurance", name: "All Risks Plus — Machinery", agency: "Tokio Marine", eff: "2025-02-20", exp: "2026-02-19", pic: "", file: "Tokio Marine Insurance.pdf", cost: "RM 2,033" },
  { id: 24, cat: "Insurance", name: "Fire Secure Insurance (Landlord)", agency: "Lonpac Insurance", eff: "2025-03-28", exp: "2026-03-27", pic: "", file: "Fire Secure Insurance.pdf", cost: "RM 8,831" },
  { id: 25, cat: "Insurance", name: "Directors & Officers Liability", agency: "Zurich General Insurance", eff: "2026-01-01", exp: "2026-12-31", pic: "", file: "Policy D&O.pdf", cost: "RM 17,564" },
  { id: 26, cat: "Insurance", name: "Health Insurance — Staff", agency: "MCIS Life", eff: "2025-08-01", exp: "2026-07-31", pic: "Tamainti", file: "", cost: "" },
  { id: 27, cat: "Service", name: "Pest Control", agency: "Dzach Pest Management", eff: "2025-10-01", exp: "2026-09-30", pic: "Izzati", file: "Pest Control Contract.pdf", cost: "RM 2,700/yr" },
  { id: 28, cat: "Service", name: "Water Dispenser", agency: "Coway", eff: "", exp: "", pic: "Danny", file: "", cost: "RM 123/mo", note: "5-year term" },
  { id: 29, cat: "Service", name: "Hygiene Service", agency: "Rentokil Initial", eff: "2025-06-01", exp: "2026-06-01", pic: "Tam", file: "Initial Contract.pdf", cost: "" },
  { id: 30, cat: "Service", name: "Printer Lease", agency: "Zenon Copier Sdn. Bhd.", eff: "2024-04-24", exp: "2029-04-23", pic: "Jega", file: "Zenon Copier.pdf", cost: "RM 99/mo", note: "60-month term" },
  { id: 31, cat: "Membership", name: "MGCC Corporate Membership", agency: "MGCC", eff: "2025-01-01", exp: "2025-12-01", pic: "Alia", file: "", cost: "RM 3,860" },
  { id: 32, cat: "Membership", name: "Malaysian Wood Industries Assoc.", agency: "MWIA", eff: "2025-07-01", exp: "2026-06-01", pic: "Anis", file: "MWIA Membership.pdf", cost: "RM 700" },
  { id: 33, cat: "Service", name: "Forklift Rental — EFL181", agency: "Allied Forklift", eff: "2025-04-08", exp: "2029-04-07", pic: "Aida", file: "Agreement Forklift.pdf", cost: "RM 1,800/mo" },
  { id: 34, cat: "Contract", name: "Accommodation — Antonio", agency: "Lim Pei Boon", eff: "2025-10-01", exp: "2026-09-30", pic: "KC", file: "Tenancy Kalista 2.pdf", cost: "RM 30,000" },
  { id: 35, cat: "Service", name: "Ride On Scrubber Dryer", agency: "Nilfisk Care", eff: "2025-06-01", exp: "2028-05-31", pic: "Tam", file: "Nilfisk Care Contract.pdf", cost: "RM 1,800/mo" },
];

const extLogins = [
  { id: 1, name: "MTIB — Import/Export Permits", url: "https://mcs4.mtib.gov.my", cat: "Government" },
  { id: 2, name: "MIDA — Investment Malaysia", url: "https://investmalaysia.mida.gov.my", cat: "Government" },
  { id: 3, name: "SST Customs Portal", url: "https://sst01.customs.gov.my", cat: "Government" },
  { id: 4, name: "Dagangnet — ePCO", url: "https://newepco.dagangnet.com.my", cat: "Trade" },
  { id: 5, name: "Dagangnet — ePermit", url: "https://newepermit2.dagangnet.com.my", cat: "Trade" },
  { id: 6, name: "DOSH (MyKKP)", url: "https://mykkp.dosh.gov.my", cat: "Government" },
  { id: 7, name: "DOE — Agrotrade", url: "https://agrotrade.kpkm.gov.my", cat: "Government" },
  { id: 8, name: "MBS — Click Portal", url: "https://click.mbs.gov.my", cat: "Government" },
  { id: 9, name: "Employment Hero (Payroll)", url: "https://secure.employmenthero.com", cat: "HR/Finance" },
  { id: 10, name: "PayWhiz", url: "https://www.paywhiz.my", cat: "HR/Finance" },
  { id: 11, name: "GDExpress Shipping", url: "https://my.gdexpress.com", cat: "Logistics" },
  { id: 12, name: "Lalamove", url: "https://web.lalamove.com", cat: "Logistics" },
  { id: 13, name: "GrabForBusiness", url: "https://weblogin.grab.com", cat: "Travel" },
  { id: 14, name: "TruTrip", url: "https://trutrip.co", cat: "Travel" },
  { id: 15, name: "TNB (Electricity)", url: "https://www.mytnb.com.my", cat: "Utilities" },
  { id: 16, name: "Foxit PDF", url: "https://account.foxit.com", cat: "Software" },
  { id: 17, name: "Odoo ERP", url: "https://oldenburger-interior-sdn-bhd.odoo.com", cat: "Software" },
  { id: 18, name: "MyEG Services", url: "https://www.myeg.com.my", cat: "Government" },
  { id: 19, name: "MBSJ Portal", url: "https://portal.mbsj.gov.my", cat: "Government" },
  { id: 20, name: "Income Tax (India)", url: "https://eportal.incometax.gov.in", cat: "Tax" },
  { id: 21, name: "MIDA OnTrack", url: "https://ontrack.mida.gov.my", cat: "Government" },
];

const today = new Date("2026-03-02");
const daysUntil = (d) => { if (!d) return null; const diff = Math.floor((new Date(d) - today) / 86400000); return diff; };

const AdminDashboard = () => {
  const [tab, setTab] = useState("Overview");
  const [catFilter, setCatFilter] = useState("All");
  const [alertDays, setAlertDays] = useState(90);
  const [showSettings, setShowSettings] = useState(false);
  const [selItem, setSelItem] = useState(null);
  const [loginCat, setLoginCat] = useState("All");
  const cats = ["All", "License", "Contract", "Insurance", "Service", "Membership"];
  const filtered = catFilter === "All" ? myContracts : myContracts.filter(c => c.cat === catFilter);
  const expiringSoon = myContracts.filter(c => { const d = daysUntil(c.exp); return d !== null && d >= 0 && d <= alertDays; });
  const expired = myContracts.filter(c => { const d = daysUntil(c.exp); return d !== null && d < 0; });
  const loginCats = ["All", ...new Set(extLogins.map(l => l.cat))];
  const filteredLogins = loginCat === "All" ? extLogins : extLogins.filter(l => l.cat === loginCat);

  if (selItem) {
    const d = daysUntil(selItem.exp);
    return (
      <div>
        <button onClick={() => setSelItem(null)} style={{ background: "none", border: "none", color: C.acc, fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 14 }}>{"<"}- Back</button>
        <div style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 14, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
            <div>
              <Badge color={({ License: C.b, Contract: C.o, Insurance: C.p, Service: C.g, Membership: C.y })[selItem.cat] || C.txM}>{selItem.cat}</Badge>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: C.tx, margin: "8px 0 4px" }}>{selItem.name}</h2>
              <div style={{ fontSize: 13, color: C.txM }}>{selItem.agency}</div>
            </div>
            {d !== null && <Badge color={d < 0 ? C.r : d <= alertDays ? C.o : C.g}>{d < 0 ? "Expired " + Math.abs(d) + "d ago" : d + " days remaining"}</Badge>}
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            {[["Effective", selItem.eff || "—"], ["Expires", selItem.exp || "No expiry"], ["Cost", selItem.cost || "—"], ["Person in Charge", selItem.pic || "—"]].map(([l, v]) => (
              <div key={l} style={{ background: C.sf, borderRadius: 8, padding: "10px 14px", minWidth: 100, flex: 1 }}>
                <div style={{ fontSize: 9, color: C.txD, textTransform: "uppercase" }}>{l}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.tx, marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>
          {selItem.note && <div style={{ padding: "8px 14px", background: C.acc + "10", borderRadius: 8, fontSize: 12, color: C.acc, marginBottom: 16 }}>{"📌 " + selItem.note}</div>}
          <div style={{ fontSize: 13, fontWeight: 600, color: C.tx, marginBottom: 10 }}>Attached Files</div>
          {selItem.file ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: C.sf, borderRadius: 10, border: `1px solid ${C.bd}`, marginBottom: 12, cursor: "pointer" }}>
              <span style={{ fontSize: 20 }}>📄</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: C.acc }}>{selItem.file}</div>
                <div style={{ fontSize: 10, color: C.txD }}>Uploaded · Click to view or download</div>
              </div>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 6, background: C.b + "18", color: C.b, cursor: "pointer" }}>View</span>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 6, background: C.g + "18", color: C.g, cursor: "pointer" }}>Download</span>
            </div>
          ) : (
            <div style={{ fontSize: 12, color: C.txD, marginBottom: 12 }}>No file attached yet.</div>
          )}
          <div style={{ background: C.bg, borderRadius: 10, border: `2px dashed ${C.bd}`, padding: 24, textAlign: "center", cursor: "pointer", marginBottom: 16 }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>📎</div>
            <div style={{ fontSize: 12, color: C.txM }}>Drop updated file here or click to upload</div>
            <div style={{ fontSize: 10, color: C.txD, marginTop: 4 }}>PDF, PNG, JPG accepted · File will be versioned chronologically</div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.tx, marginBottom: 8 }}>File History</div>
          <div style={{ background: C.sf, borderRadius: 8, padding: 12 }}>
            {[selItem.file && { name: selItem.file, date: "Current version", by: selItem.pic || "Admin" }, selItem.file && { name: selItem.file.replace(".pdf", "_v1.pdf"), date: "Previous version · 2025", by: "Admin" }].filter(Boolean).map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: i === 0 ? `1px solid ${C.bd}` : "none" }}>
                <span>📄</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: C.tx }}>{f.name}</div>
                  <div style={{ fontSize: 10, color: C.txD }}>{f.date} · By {f.by}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: C.tx, margin: 0 }}>Admin — Contracts, Licenses & Logins</h1>
          <p style={{ color: C.txM, fontSize: 13, marginTop: 4 }}>Malaysia entity · {myContracts.length} items tracked</p>
        </div>
        <button onClick={() => setShowSettings(!showSettings)} style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.bd}`, background: showSettings ? C.accD : "transparent", color: showSettings ? C.acc : C.txM, fontSize: 12, cursor: "pointer" }}>{"⚙️ Settings"}</button>
      </div>
      {showSettings && (
        <div style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 12, padding: 18, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.tx, marginBottom: 10 }}>Renewal Alert Settings</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: C.txM }}>Alert me</span>
            {[30, 60, 90, 120, 180].map(d => (
              <button key={d} onClick={() => setAlertDays(d)} style={{ padding: "4px 12px", borderRadius: 6, border: `1px solid ${alertDays === d ? C.acc : C.bd}`, background: alertDays === d ? C.accD : "transparent", color: alertDays === d ? C.acc : C.txM, fontSize: 12, cursor: "pointer" }}>{d} days</button>
            ))}
            <span style={{ fontSize: 12, color: C.txM }}>before expiry</span>
          </div>
        </div>
      )}
      {(expired.length > 0 || expiringSoon.length > 0) && (
        <div style={{ marginBottom: 16 }}>
          {expired.map(c => (
            <div key={c.id} onClick={() => setSelItem(c)} style={{ background: C.r + "12", border: `1px solid ${C.r}33`, borderRadius: 10, padding: "10px 16px", marginBottom: 4, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontSize: 12 }}>
              <span style={{ color: C.r }}>{"🔴 EXPIRED: " + c.name + " — " + c.agency}</span>
              <span style={{ color: C.r, fontWeight: 600 }}>{Math.abs(daysUntil(c.exp))}d overdue</span>
            </div>
          ))}
          {expiringSoon.map(c => (
            <div key={c.id} onClick={() => setSelItem(c)} style={{ background: C.o + "10", border: `1px solid ${C.o}22`, borderRadius: 10, padding: "10px 16px", marginBottom: 4, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontSize: 12 }}>
              <span style={{ color: C.o }}>{"⚠️ Expiring: " + c.name + " — " + c.exp}</span>
              <span style={{ color: C.o, fontWeight: 600 }}>{daysUntil(c.exp)}d left</span>
            </div>
          ))}
        </div>
      )}
      <Tab tabs={["Overview", "External Logins"]} active={tab} set={setTab} />
      {tab === "Overview" && (
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <Stat label="Total Items" value={myContracts.length} icon="📄" />
            <Stat label="Expiring Soon" value={expiringSoon.length} icon="⚠️" color={C.o} sub={alertDays + "d window"} />
            <Stat label="Expired" value={expired.length} icon="🔴" color={expired.length > 0 ? C.r : C.g} />
            <Stat label="Licenses" value={myContracts.filter(c => c.cat === "License").length} icon="📋" color={C.b} />
          </div>
          <div style={{ display: "flex", gap: 4, marginBottom: 14, flexWrap: "wrap" }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCatFilter(c)} style={{ padding: "5px 12px", borderRadius: 6, border: `1px solid ${catFilter === c ? C.acc : C.bd}`, background: catFilter === c ? C.accD : "transparent", color: catFilter === c ? C.acc : C.txM, fontSize: 11, cursor: "pointer" }}>
                {c} {c !== "All" ? "(" + myContracts.filter(x => x.cat === c).length + ")" : ""}
              </button>
            ))}
          </div>
          <Table cols={[{ label: "Name", flex: 2.5 }, { label: "Agency", flex: 1.5 }, { label: "Expires", flex: 0.8 }, { label: "PIC", flex: 0.6 }, { label: "Status", flex: 0.8 }, { label: "File", flex: 0.5 }]}
            rows={filtered.sort((a, b) => {
              const da = daysUntil(a.exp); const db = daysUntil(b.exp);
              if (da === null && db === null) return 0; if (da === null) return 1; if (db === null) return -1; return da - db;
            }).map(c => {
              const d = daysUntil(c.exp);
              return {
                onClick: () => setSelItem(c),
                cells: [
                  <div key="n"><span style={{ fontWeight: 500 }}>{c.name}</span><br/><span style={{ fontSize: 10, color: C.txD }}>{c.cat}</span></div>,
                  <span key="a" style={{ fontSize: 12, color: C.txM }}>{c.agency}</span>,
                  <span key="e" style={{ fontSize: 12, color: d !== null && d < 0 ? C.r : d !== null && d <= alertDays ? C.o : C.txM }}>{c.exp || "—"}</span>,
                  <span key="p" style={{ fontSize: 11, color: C.txM }}>{c.pic || "—"}</span>,
                  d !== null ? <Badge key="s" color={d < 0 ? C.r : d <= alertDays ? C.o : C.g}>{d < 0 ? "Expired" : d <= alertDays ? d + "d left" : "Active"}</Badge> : <Badge key="s" color={C.g}>Active</Badge>,
                  c.file ? <span key="f" style={{ fontSize: 14 }}>📄</span> : <span key="f" style={{ fontSize: 10, color: C.txD }}>—</span>
                ]
              };
            })}
          />
        </div>
      )}
      {tab === "External Logins" && (
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <Stat label="Total Portals" value={extLogins.length} icon="🔗" />
            <Stat label="Government" value={extLogins.filter(l => l.cat === "Government").length} icon="🏛️" color={C.b} />
            <Stat label="Trade / Logistics" value={extLogins.filter(l => l.cat === "Trade" || l.cat === "Logistics").length} icon="🚢" color={C.o} />
            <Stat label="HR / Finance" value={extLogins.filter(l => l.cat === "HR/Finance").length} icon="💰" color={C.g} />
          </div>
          <div style={{ display: "flex", gap: 4, marginBottom: 14, flexWrap: "wrap" }}>
            {loginCats.map(c => (
              <button key={c} onClick={() => setLoginCat(c)} style={{ padding: "5px 12px", borderRadius: 6, border: `1px solid ${loginCat === c ? C.acc : C.bd}`, background: loginCat === c ? C.accD : "transparent", color: loginCat === c ? C.acc : C.txM, fontSize: 11, cursor: "pointer" }}>{c}</button>
            ))}
          </div>
          {filteredLogins.map(l => (
            <div key={l.id} style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 10, padding: "12px 16px", marginBottom: 4, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.borderColor = C.acc + "55"} onMouseLeave={e => e.currentTarget.style.borderColor = C.bd}>
              <span style={{ fontSize: 18 }}>🔗</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.tx }}>{l.name}</div>
                <div style={{ fontSize: 11, color: C.b }}>{l.url}</div>
              </div>
              <Badge>{l.cat}</Badge>
              <span style={{ fontSize: 10, padding: "4px 10px", borderRadius: 6, background: C.b + "18", color: C.b, cursor: "pointer" }}>Open</span>
            </div>
          ))}
          <div style={{ fontSize: 10, color: C.txD, marginTop: 10, padding: "8px 12px", background: C.sf, borderRadius: 8 }}>{"🔒 Credentials stored securely — contact IT admin for access. Passwords are never displayed in the portal."}</div>
        </div>
      )}
    </div>
  );
};

// ─── PROJECT MANAGER ──────────────

const PMDashboard = () => {
  const [sel, setSel] = useState(null);
  if (sel) {
    const p = projects.find(x => x.id === sel);
    return (
      <div>
        <button onClick={() => setSel(null)} style={{ background: "none", border: "none", color: C.acc, fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 14 }}>{"<"}- Back</button>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: C.tx, margin: "0 0 16px" }}>{p.name} — {p.loc}</h2>
        <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
          {[["Budget", "€ " + (p.budget/1000).toFixed(0) + "K", "epicor"], ["Spent", "€ " + (p.spent/1000).toFixed(0) + "K", "epicor"], ["Monday", p.mondayId, "monday"], ["Epicor", p.epicorJob, "epicor"], ["Due", p.due, "monday"]].map(([l,v,s]) => (
            <div key={l} style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 10, padding: "12px 16px", minWidth: 110, flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 10, color: C.txD }}>{l}</span><SourceTag source={s} /></div>
              <div style={{ fontSize: 15, fontWeight: 600, color: C.tx, marginTop: 4 }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {(p.id === 1 || p.id === 3) && <div style={{ width: "100%", marginBottom: 4 }}><ShippingTracker project={p} /></div>}
          <div style={{ flex: 1, minWidth: 240 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 10 }}>Quick Actions</h3>
            {[["📋 Create Change Order", "monday"], ["📧 Send Client Update", "m365"], ["📊 Progress Report", "hub"], ["📅 Schedule Site Visit", "m365"], ["✦ AI Summary", "hub"], ["📦 Material Status", "epicor"], ["🔗 Open Monday.com", "monday"], ["💬 Teams Chat", "m365"]].map(([a, s]) => (
              <button key={a} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${C.bd}`, background: C.card, color: C.tx, fontSize: 12, textAlign: "left", cursor: "pointer", marginBottom: 5, display: "flex", justifyContent: "space-between", alignItems: "center" }} onMouseEnter={e => e.currentTarget.style.borderColor = C.acc + "55"} onMouseLeave={e => e.currentTarget.style.borderColor = C.bd}>
                {a}<SourceTag source={s} />
              </button>
            ))}
          </div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 10 }}>Budget</h3>
            <div style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: C.txM }}>
                <span>{((p.spent/p.budget)*100).toFixed(0)}% spent</span>
                <span>{"€ " + (p.spent/1000).toFixed(0) + "K / € " + (p.budget/1000).toFixed(0) + "K"}</span>
              </div>
              <div style={{ height: 8, background: C.bg, borderRadius: 99, overflow: "hidden" }}>
                <div style={{ width: `${(p.spent/p.budget)*100}%`, height: "100%", background: (p.spent/p.budget) > 0.85 ? `linear-gradient(90deg, ${C.o}, ${C.r})` : `linear-gradient(90deg, ${C.acc}, ${C.accL})`, borderRadius: 99 }} />
              </div>
            </div>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 10 }}>Team</h3>
            <div style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 10, padding: 12 }}>
              {p.team.map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: i < p.team.length - 1 ? `1px solid ${C.bd}` : "none" }}>
                  <Avatar name={m} size={28} /><span style={{ fontSize: 12, color: C.tx }}>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: C.tx, margin: 0 }}>Project Manager Hub</h1>
      <p style={{ color: C.txM, fontSize: 13, marginTop: 4, marginBottom: 16 }}>Monday.com tasks, Epicor production, M365 docs.</p>
      <IntegrationBar />
      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
        <Stat label="My Projects" value="5" icon="📐" source="monday" />
        <Stat label="Pending Actions" value="8" icon="⚡" color={C.o} source="monday" />
        <Stat label="Budget Health" value="92%" icon="💰" color={C.g} source="epicor" />
        <Stat label="Teams Unread" value="12" icon="💬" color={C.ms} source="m365" />
      </div>
      {projects.map(p => (
        <div key={p.id} onClick={() => setSel(p.id)} style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 12, padding: "14px 18px", marginBottom: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }} onMouseEnter={e => e.currentTarget.style.borderColor = C.acc + "55"} onMouseLeave={e => e.currentTarget.style.borderColor = C.bd}>
          <div style={{ flex: 2, minWidth: 160 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.tx }}>{p.name}</div>
            <div style={{ fontSize: 11, color: C.txM }}>{p.client} · {p.loc}</div>
          </div>
          <Badge color={stCol(p.status)}>{p.status}</Badge>
          <div style={{ width: 90 }}>
            <div style={{ height: 4, background: C.bg, borderRadius: 99, overflow: "hidden" }}><div style={{ width: `${p.progress}%`, height: "100%", background: `linear-gradient(90deg, ${C.acc}, ${C.accL})`, borderRadius: 99 }} /></div>
            <div style={{ fontSize: 10, color: C.txM, marginTop: 2 }}>{p.progress}%</div>
          </div>
          <span style={{ fontSize: 11, color: C.txM }}>{p.due}</span>
        </div>
      ))}
    </div>
  );
};

// ─── CLIENT PM PORTAL ──────────────

const ClientPortal = () => {
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState("My Projects");
  if (sel) {
    const p = projects.find(x => x.id === sel);
    const pPoints = openPoints.filter(op => op.project === p.name);
    const phases = ["Concept Design","Technical Development","Client Approval","Manufacturing","Quality Control","Logistics","Installation","Handover"];
    const phaseMap = { "Concept Design": 0, "Technical Dev": 1, "Design Review": 1, Manufacturing: 3, Installation: 6, Logistics: 5 };
    const activeIdx = phaseMap[p.phase] !== undefined ? phaseMap[p.phase] : 0;
    return (
      <div>
        <button onClick={() => setSel(null)} style={{ background: "none", border: "none", color: C.acc, fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 14 }}>{"<"}- Back</button>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: C.tx, margin: "0 0 16px" }}>{p.name} — {p.loc}</h2>
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          {[["Status", p.status], ["Phase", p.phase], ["Progress", p.progress + "%"], ["Delivery", p.due]].map(([l, v]) => (
            <div key={l} style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 12, padding: "14px 18px", flex: 1, minWidth: 130 }}>
              <div style={{ fontSize: 10, color: C.txD }}>{l}</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: C.tx, marginTop: 4 }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          <div style={{ flex: 2, minWidth: 260 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 10 }}>Timeline</h3>
            <div style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 14, padding: 20, marginBottom: 18 }}>
              {phases.map((ph, i) => (
                <div key={ph} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 7 ? 5 : 0 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${i < activeIdx ? C.g : i === activeIdx ? C.acc : C.bd}`, background: i < activeIdx ? C.g + "22" : i === activeIdx ? C.accD : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: i < activeIdx ? C.g : i === activeIdx ? C.acc : C.txD, fontWeight: 700, flexShrink: 0 }}>{i < activeIdx ? "✓" : i + 1}</div>
                  <span style={{ fontSize: 12, color: i < activeIdx ? C.g : i === activeIdx ? C.acc : C.txM, fontWeight: i === activeIdx ? 700 : 400 }}>{ph}</span>
                  {i === activeIdx && <span style={{ fontSize: 9, background: C.accD, color: C.acc, padding: "1px 7px", borderRadius: 99, fontWeight: 600 }}>NOW</span>}
                </div>
              ))}
            </div>
            {(activeIdx >= 5 || p.id === 3) && <ShippingTracker project={p} />}
            {pPoints.length > 0 && (
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 10 }}>Open Points ({pPoints.length})</h3>
                {pPoints.map(op => (
                  <div key={op.id} style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 10, padding: "14px 16px", marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, flexWrap: "wrap", gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.tx }}>{op.title}</span>
                      <div style={{ display: "flex", gap: 6 }}>
                        <Badge color={priCol(op.priority)}>{op.priority}</Badge>
                        <Badge color={op.owner === "Client" ? C.o : C.b}>{op.owner}</Badge>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: C.txM, marginBottom: 4 }}>{op.desc}</div>
                    <div style={{ fontSize: 11, color: C.txD }}>Assigned: {op.assignedTo} · Open {op.days} days</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 10 }}>Your Oldenburger Contact</h3>
            <div style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 14, padding: 18, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <Avatar name={p.pm} size={40} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.tx }}>{p.pm}</div>
                  <div style={{ fontSize: 11, color: C.txM }}>Project Manager</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderTop: `1px solid ${C.bd}`, fontSize: 12, color: C.acc }}>{"📧 " + p.pm.split(" ")[0].toLowerCase() + "@oldenburger-interior.com"}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderTop: `1px solid ${C.bd}`, fontSize: 12, color: C.acc }}>{"📞 +31 70 123 4567"}</div>
            </div>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 10 }}>Documents</h3>
            <div style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 14, padding: 12 }}>
              {["📄 Project Proposal", "📐 Design Presentation", "📊 Progress Report", "📋 Material Specs"].map((d, i) => (
                <div key={i} style={{ padding: "8px 4px", borderBottom: i < 3 ? `1px solid ${C.bd}` : "none", fontSize: 12, color: C.tx, cursor: "pointer" }}>{d}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div style={{ textAlign: "center", padding: "12px 0 20px" }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: C.acc, fontWeight: 700, marginBottom: 4 }}>OLDENBURGER INTERIOR</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: C.tx, margin: "0 0 4px" }}>Client Portal</h1>
        <p style={{ color: C.txM, fontSize: 13 }}>Track projects, open points, and stay connected.</p>
      </div>
      <Tab tabs={["My Projects", "Open Points"]} active={tab} set={setTab} />
      {tab === "My Projects" && (
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <Stat label="Active Projects" value="3" icon="📐" color={C.acc} />
            <Stat label="Open Points" value={openPoints.filter(o => o.owner === "Client").length} icon="⚡" color={C.o} sub="Awaiting your action" />
            <Stat label="On Track" value="100%" icon="🎯" color={C.g} />
          </div>
          {projects.slice(0, 3).map(p => {
            const pPoints = openPoints.filter(op => op.project === p.name);
            return (
              <div key={p.id} onClick={() => setSel(p.id)} style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 14, padding: 20, marginBottom: 10, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.borderColor = C.acc + "55"} onMouseLeave={e => e.currentTarget.style.borderColor = C.bd}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: C.tx }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: C.txM }}>{p.loc} · PM: {p.pm}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {pPoints.length > 0 && <Badge color={C.o}>{pPoints.length} open</Badge>}
                    <Badge color={stCol(p.status)}>{p.status}</Badge>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 11, color: C.txM }}><span>Progress</span><span style={{ color: C.acc, fontWeight: 600 }}>{p.progress}%</span></div>
                <div style={{ height: 7, background: C.bg, borderRadius: 99, overflow: "hidden" }}><div style={{ width: `${p.progress}%`, height: "100%", background: `linear-gradient(90deg, ${C.acc}, ${C.accL})`, borderRadius: 99 }} /></div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: C.txM }}><span>{p.phase}</span><span>Due {p.due}</span></div>
              </div>
            );
          })}
        </div>
      )}
      {tab === "Open Points" && (
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <Stat label="Total Open" value={openPoints.filter(o => o.owner === "Client").length} icon="📋" color={C.o} />
            <Stat label="Urgent" value={openPoints.filter(o => o.priority === "Urgent").length} icon="🔴" color={C.r} />
            <Stat label="Awaiting You" value={openPoints.filter(o => o.owner === "Client").length} icon="⏳" color={C.o} />
            <Stat label="Awaiting Oldenburger" value={openPoints.filter(o => o.owner === "Oldenburger").length} icon="🔧" color={C.b} />
          </div>
          {openPoints.filter(o => o.owner === "Client").sort((a,b) => {
            const pri = { Urgent: 0, High: 1, Medium: 2, Low: 3 };
            return (pri[a.priority] || 9) - (pri[b.priority] || 9);
          }).map(op => (
            <div key={op.id} style={{ background: C.card, border: `1px solid ${op.priority === "Urgent" ? C.r + "44" : C.bd}`, borderRadius: 12, padding: "16px 18px", marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, flexWrap: "wrap", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Badge color={priCol(op.priority)}>{op.priority}</Badge>
                  <span style={{ fontSize: 14, fontWeight: 600, color: C.tx }}>{op.title}</span>
                </div>
                <span style={{ fontSize: 11, color: C.txM }}>{op.project}</span>
              </div>
              <div style={{ fontSize: 12, color: C.txM, marginBottom: 6 }}>{op.desc}</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.txD }}>
                <span>Assigned: {op.assignedTo}</span>
                <span style={{ color: op.days > 7 ? C.r : C.txD }}>Open {op.days} days</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── CLIENT TEAM LEAD ──────────────

const ClientTeamLead = () => {
  const [selPM, setSelPM] = useState(null);
  if (selPM) {
    const pm = clientPMs.find(p => p.name === selPM);
    const pmProjects = projects.filter(p => p.contact === pm.name);
    const pmPoints = openPoints.filter(op => op.assignedTo === pm.name);
    return (
      <div>
        <button onClick={() => setSelPM(null)} style={{ background: "none", border: "none", color: C.acc, fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 14 }}>{"<"}- Back to Team</button>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <Avatar name={pm.name} size={48} />
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: C.tx, margin: 0 }}>{pm.name}</h2>
            <div style={{ fontSize: 13, color: C.txM }}>{pm.client} · {pm.email}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
          <Stat label="Projects" value={pm.projects} icon="📐" />
          <Stat label="Open Points" value={pm.openPoints} icon="📋" color={pm.openPoints > 1 ? C.o : C.g} />
          <Stat label="Urgent Items" value={pm.urgent} icon="🔴" color={pm.urgent > 0 ? C.r : C.g} />
          <Stat label="Avg Response" value={pm.avgResponseDays + "d"} icon="⏱️" color={pm.avgResponseDays > 4 ? C.r : C.g} />
        </div>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 10 }}>Projects</h3>
        {pmProjects.map(p => (
          <div key={p.id} style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 12, padding: "14px 18px", marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.tx }}>{p.name} — {p.loc}</div>
                <div style={{ fontSize: 11, color: C.txM }}>{p.phase} · Due {p.due}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Badge color={stCol(p.status)}>{p.status}</Badge>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.acc }}>{p.progress}%</span>
              </div>
            </div>
          </div>
        ))}
        {pmPoints.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 10 }}>Open Points Assigned to {pm.name.split(" ")[0]}</h3>
            {pmPoints.map(op => (
              <div key={op.id} style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 10, padding: "12px 16px", marginBottom: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: C.tx }}>{op.title}</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Badge color={priCol(op.priority)}>{op.priority}</Badge>
                    <span style={{ fontSize: 11, color: op.days > 7 ? C.r : C.txM }}>Open {op.days}d</span>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: C.txM, marginTop: 4 }}>{op.project} · {op.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  return (
    <div>
      <div style={{ textAlign: "center", padding: "12px 0 20px" }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: C.acc, fontWeight: 700, marginBottom: 4 }}>OLDENBURGER INTERIOR</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: C.tx, margin: "0 0 4px" }}>Client Team Overview</h1>
        <p style={{ color: C.txM, fontSize: 13 }}>Monitor your team's projects, response times, and open items.</p>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <Stat label="Team Members" value={clientPMs.length} icon="👥" />
        <Stat label="Total Open Points" value={openPoints.length} icon="📋" color={C.o} />
        <Stat label="Urgent Items" value={openPoints.filter(o => o.priority === "Urgent").length} icon="🔴" color={C.r} />
        <Stat label="Avg Response" value="3.3d" icon="⏱️" color={C.g} />
      </div>
      <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 12 }}>Your Project Managers</h3>
      {clientPMs.map(pm => (
        <div key={pm.name} onClick={() => setSelPM(pm.name)} style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 12, padding: "16px 20px", marginBottom: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }} onMouseEnter={e => e.currentTarget.style.borderColor = C.acc + "55"} onMouseLeave={e => e.currentTarget.style.borderColor = C.bd}>
          <Avatar name={pm.name} size={38} />
          <div style={{ flex: 2, minWidth: 140 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.tx }}>{pm.name}</div>
            <div style={{ fontSize: 11, color: C.txM }}>{pm.client}</div>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            {[["Projects", pm.projects, null], ["Open Pts", pm.openPoints, pm.openPoints > 1 ? C.o : null], ["Urgent", pm.urgent, pm.urgent > 0 ? C.r : C.g], ["Avg Resp", pm.avgResponseDays + "d", pm.avgResponseDays > 4 ? C.r : C.g]].map(([label, val, col]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: col || C.tx }}>{val}</div>
                <div style={{ fontSize: 10, color: C.txD }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 10, marginTop: 20 }}>All Open Points by Priority</h3>
      <Table cols={[{ label: "Item", flex: 2 }, { label: "Project", flex: 1.2 }, { label: "Assigned To", flex: 1 }, { label: "Priority", flex: 0.7 }, { label: "Owner", flex: 0.7 }, { label: "Days", flex: 0.5 }]}
        rows={openPoints.sort((a,b) => {
          const pri = { Urgent: 0, High: 1, Medium: 2, Low: 3 };
          return (pri[a.priority] || 9) - (pri[b.priority] || 9);
        }).map(op => ({
          cells: [
            <span key="t" style={{ fontWeight: 500, fontSize: 12 }}>{op.title}</span>,
            <span key="p" style={{ fontSize: 12, color: C.txM }}>{op.project}</span>,
            <span key="a" style={{ fontSize: 12 }}>{op.assignedTo}</span>,
            <Badge key="pr" color={priCol(op.priority)}>{op.priority}</Badge>,
            <Badge key="o" color={op.owner === "Client" ? C.o : C.b}>{op.owner}</Badge>,
            <span key="d" style={{ fontSize: 12, color: op.days > 7 ? C.r : C.txM, fontWeight: op.days > 7 ? 700 : 400 }}>{op.days}</span>
          ]
        }))}
      />
    </div>
  );
};

// ─── CLIENT AI SUPPORT CHAT ──────────────

const ClientAIChat = () => {
  const [msgs, setMsgs] = useState([{ role: "ai", text: "Welcome to Oldenburger Support! I'm here to help with any questions about your projects, timelines, materials, open points, or deliveries. How can I assist you today?" }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const ref = useRef(null);
  useEffect(() => { ref.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);
  const responses = {
    status: "Here's a quick overview of your active projects:\n\n• Swarovski Flagship Vienna — 72% complete, currently in Manufacturing. On track for Apr 15 delivery.\n• Ganni Store Copenhagen — 35%, in Technical Development. Design review meeting scheduled next week.\n• Gaggenau Showroom Shanghai — 91%, Installation underway. Delivery access confirmation needed urgently (open point).\n\nWould you like details on any specific project?",
    shipping: "For the Swarovski Flagship project, 3 containers departed Den Haag on Mar 28 via DB Schenker road freight. They've cleared customs at the NL/DE border and passed through Duisburg. Currently en route to Munich, with estimated arrival in Vienna on Apr 1.\n\nThe Gaggenau Shanghai shipment has already been delivered — arrived Mar 12 after sea transit via Rotterdam → Suez → Singapore → Shanghai.\n\nI can show you detailed tracking for any shipment.",
    open: "You currently have 6 open points awaiting your team's action:\n\n🔴 URGENT: Delivery access confirmation for Gaggenau Shanghai (open 1 day)\n🟠 HIGH: Display wall finish approval — Swarovski (open 8 days)\n🟡 MEDIUM: Lighting layout feedback — Swarovski (4 days)\n🟡 MEDIUM: Floor plan revision — Ganni (2 days)\n🟡 MEDIUM: Color sample approval — De Bijenkorf (10 days)\n🔵 LOW: Brand guidelines document — Kudos (5 days)\n\nThe Gaggenau item is time-sensitive as it affects the Mar 10-14 installation window. Would you like me to help draft a response?",
    material: "For your active projects, here's the material status:\n\n• Swarovski: FSC-certified European oak veneer — allocated and in production. 3 stain samples sent for your approval on Feb 20.\n• Ganni: Material selection in progress — 3 options presented, your team prefers option B. We're finalizing costing.\n• Gaggenau: All materials delivered and on-site in Shanghai.\n\nAll wood materials carry FSC Chain of Custody certification. I can provide detailed spec sheets for any project.",
    timeline: "Here are your upcoming milestones:\n\n📅 Mar 10-14 — Gaggenau Shanghai installation window (needs your delivery access confirmation)\n📅 Mar 18 — Gaggenau project handover target\n📅 Apr 1 — Swarovski shipment arrives Vienna\n📅 Apr 15 — Swarovski project completion target\n📅 May 30 — De Bijenkorf completion target\n📅 Jun 22 — Ganni completion target\n\nAll projects are currently on schedule. Want me to export a calendar view?",
    invoice: "I can see the following from our finance system:\n\n• Swarovski: 3 of 5 milestone payments received. Next invoice (€168K) due upon shipment departure — now triggered.\n• Ganni: Deposit received. Next payment at design sign-off.\n• Gaggenau: 4 of 5 payments received. Final retention payment (€60K) due after handover.\n\nFor detailed invoices or payment schedules, I can connect you with our accounting team. Would you like me to arrange that?",
    contact: "Here are your Oldenburger project contacts:\n\n• Swarovski Vienna → Lukas Meier (PM)\n  📧 lukas@oldenburger-interior.com | 📞 +31 70 123 4567\n\n• Ganni Copenhagen → Sophie van Dijk (PM)\n  📧 sophie@oldenburger-interior.com | 📞 +31 70 123 4568\n\n• Gaggenau Shanghai → Anna Chen (PM)\n  📧 anna@oldenburger-interior.com | 📞 +86 21 5678 9012\n\nFor urgent matters outside business hours, our operations hotline is +31 70 999 0000.\n\nWould you like me to schedule a call with any of them?",
    fallback: "I'd be happy to help with that. In the full platform, I'd have access to all your project data, documents, and communication history to give you a precise answer. Here are some things I can help with:\n\n• Project status and progress updates\n• Shipping and delivery tracking\n• Open points and action items\n• Material specifications and status\n• Timeline and milestone overview\n• Invoice and payment information\n• Connecting you with your PM\n\nWhat would you like to know?",
  };
  const classify = (q) => {
    const ql = q.toLowerCase();
    if (ql.includes("ship") || ql.includes("deliver") || ql.includes("track") || ql.includes("transport") || ql.includes("logistics") || ql.includes("container")) return "shipping";
    if (ql.includes("open point") || ql.includes("action") || ql.includes("pending") || ql.includes("approval") || ql.includes("waiting") || ql.includes("urgent")) return "open";
    if (ql.includes("material") || ql.includes("wood") || ql.includes("veneer") || ql.includes("fsc") || ql.includes("sample")) return "material";
    if (ql.includes("timeline") || ql.includes("deadline") || ql.includes("milestone") || ql.includes("schedule") || ql.includes("when")) return "timeline";
    if (ql.includes("invoice") || ql.includes("payment") || ql.includes("billing") || ql.includes("cost") || ql.includes("price")) return "invoice";
    if (ql.includes("contact") || ql.includes("call") || ql.includes("email") || ql.includes("reach") || ql.includes("pm") || ql.includes("manager")) return "contact";
    if (ql.includes("status") || ql.includes("project") || ql.includes("progress") || ql.includes("update") || ql.includes("how")) return "status";
    return "fallback";
  };
  const send = () => {
    if (!input.trim()) return;
    const q = input;
    setMsgs(p => [...p, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const key = classify(q);
      setMsgs(p => [...p, { role: "ai", text: responses[key] }]);
      setTyping(false);
    }, 1200);
  };
  const suggestions = ["What's the status of my projects?", "Where is my Swarovski shipment?", "What open points need my attention?", "Show me upcoming deadlines", "Invoice and payment status", "Contact my project manager"];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 48px)" }}>
      <div style={{ textAlign: "center", padding: "8px 0 12px" }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: C.acc, fontWeight: 700, marginBottom: 2 }}>OLDENBURGER INTERIOR</div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: C.tx, margin: "0 0 2px" }}>Client Support</h1>
        <p style={{ color: C.txM, fontSize: 12 }}>AI-powered assistance for your projects</p>
      </div>
      <div style={{ flex: 1, overflowY: "auto", marginBottom: 10, padding: "0 4px" }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
            {m.role === "ai" && <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.accD, border: `1.5px solid ${C.acc}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, marginRight: 8, flexShrink: 0, marginTop: 2 }}>✦</div>}
            <div style={{ maxWidth: "80%", padding: "12px 16px", borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.role === "user" ? C.acc + "22" : C.card, border: `1px solid ${m.role === "user" ? C.acc + "33" : C.bd}`, color: C.tx, fontSize: 13, lineHeight: 1.65, whiteSpace: "pre-line" }}>{m.text}</div>
          </div>
        ))}
        {typing && (
          <div style={{ display: "flex", marginBottom: 12 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.accD, border: `1.5px solid ${C.acc}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, marginRight: 8, flexShrink: 0 }}>✦</div>
            <div style={{ padding: "12px 16px", borderRadius: "14px 14px 14px 4px", background: C.card, border: `1px solid ${C.bd}`, color: C.txM, fontSize: 13 }}>Looking into that for you...</div>
          </div>
        )}
        <div ref={ref} />
      </div>
      {msgs.length <= 1 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => setInput(s)} style={{ padding: "10px 12px", borderRadius: 10, border: `1px solid ${C.bd}`, background: C.card, color: C.txM, fontSize: 12, cursor: "pointer", textAlign: "left", transition: "all .15s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = C.acc + "55"; e.currentTarget.style.color = C.acc; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd; e.currentTarget.style.color = C.txM; }}>{s}</button>
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask about your projects, deliveries, open points..." style={{ flex: 1, padding: "12px 14px", borderRadius: 12, border: `1px solid ${C.bd}`, background: C.card, color: C.tx, fontSize: 13, outline: "none" }} />
        <button onClick={send} style={{ padding: "12px 20px", borderRadius: 12, border: "none", background: `linear-gradient(135deg, ${C.acc}, #B8956A)`, color: C.bg, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Send</button>
      </div>
      <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: C.txD }}>Need a human? Type "connect me" to reach your project manager.</div>
    </div>
  );
};

// ─── ACCOUNTING ──────────────

const AccountingDashboard = () => {
  const [tab, setTab] = useState("Monthly Results");
  const maxR = Math.max(...rev);
  const totalRev = rev.reduce((a, b) => a + b, 0);
  const totalCost = costs.reduce((a, b) => a + b, 0);
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: C.tx, margin: 0 }}>Accounting</h1>
      <p style={{ color: C.txM, fontSize: 13, marginTop: 4, marginBottom: 16 }}>Epicor Kinetic financials · AI-generated reports.</p>
      <IntegrationBar />
      <Tab tabs={["Monthly Results", "Project Budgets"]} active={tab} set={setTab} />
      {tab === "Monthly Results" && (
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <Stat label="Revenue (6mo)" value={"€ " + (totalRev/1000).toFixed(1) + "M"} icon="📈" color={C.g} sub={"up 14% YoY"} source="epicor" />
            <Stat label="Costs (6mo)" value={"€ " + (totalCost/1000).toFixed(1) + "M"} icon="📉" color={C.o} source="epicor" />
            <Stat label="Margin" value={((1 - totalCost/totalRev)*100).toFixed(1) + "%"} icon="💎" color={C.g} source="epicor" />
            <Stat label="Outstanding" value="€ 420K" icon="📄" color={C.o} sub="3 overdue" source="epicor" />
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 14, padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.tx }}>Revenue vs Costs</span>
              <SourceTag source="epicor" />
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 180, padding: "0 8px" }}>
              {months.map((m, i) => (
                <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                  <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 140 }}>
                    <div style={{ width: 16, height: (rev[i] / maxR) * 130, background: `linear-gradient(180deg, ${C.acc}, ${C.acc}66)`, borderRadius: "3px 3px 0 0" }} />
                    <div style={{ width: 16, height: (costs[i] / maxR) * 130, background: `linear-gradient(180deg, ${C.b}88, ${C.b}33)`, borderRadius: "3px 3px 0 0" }} />
                  </div>
                  <span style={{ fontSize: 10, color: C.txM }}>{m}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 14, justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: C.txM }}><div style={{ width: 8, height: 8, borderRadius: 2, background: C.acc }} />Revenue</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: C.txM }}><div style={{ width: 8, height: 8, borderRadius: 2, background: C.b }} />Costs</div>
            </div>
          </div>
        </div>
      )}
      {tab === "Project Budgets" && (
        <Table cols={[{ label: "Project", flex: 1.8 }, { label: "Epicor Job", flex: 1 }, { label: "Budget", flex: 0.8 }, { label: "Spent", flex: 0.8 }, { label: "Usage", flex: 1.2 }]}
          rows={projects.map(p => ({
            cells: [
              <span key="n" style={{ fontWeight: 500 }}>{p.name}</span>,
              <span key="e" style={{ fontFamily: "monospace", fontSize: 11, color: C.epic }}>{p.epicorJob}</span>,
              "€ " + (p.budget/1000).toFixed(0) + "K",
              "€ " + (p.spent/1000).toFixed(0) + "K",
              <div key="u" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ flex: 1, height: 5, background: C.bg, borderRadius: 99, overflow: "hidden" }}><div style={{ width: `${(p.spent/p.budget)*100}%`, height: "100%", background: (p.spent/p.budget) > 0.85 ? `linear-gradient(90deg, ${C.o}, ${C.r})` : `linear-gradient(90deg, ${C.acc}, ${C.accL})`, borderRadius: 99 }} /></div>
                <span style={{ fontSize: 10, color: C.txM }}>{((p.spent/p.budget)*100).toFixed(0)}%</span>
              </div>
            ]
          }))}
        />
      )}
    </div>
  );
};

// ─── OWNER REPORTS ──────────────

const OwnerReports = () => (
  <div>
    <h1 style={{ fontSize: 22, fontWeight: 700, color: C.tx, margin: 0 }}>Owner Reports & KPIs</h1>
    <p style={{ color: C.txM, fontSize: 13, marginTop: 4, marginBottom: 16 }}>AI-generated from Epicor, Monday.com, and M365.</p>
    <IntegrationBar />
    <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
      <Stat label="Annual Revenue" value="€ 8.2M" icon="📈" color={C.g} sub={"up 18% YoY"} source="epicor" />
      <Stat label="Gross Margin" value="32.4%" icon="💎" color={C.g} source="epicor" />
      <Stat label="Delivered" value="14" icon="✅" source="monday" />
      <Stat label="Satisfaction" value="4.7/5" icon="⭐" color={C.y} />
    </div>
    <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
      <Stat label="Team" value="47" icon="👥" color={C.b} source="m365" />
      <Stat label="On-Time" value="94%" icon="🎯" color={C.g} source="monday" />
      <Stat label="Pipeline" value="€ 4.4M" icon="📊" source="epicor" />
      <Stat label="Avg Project" value="€ 888K" icon="💰" sub={"up 12%"} source="epicor" />
    </div>
    <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 12 }}>AI-Generated Reports</h3>
    {[
      ["📊 Q1 2026 Executive Summary", "Mar 01", "Epicor financials + Monday.com project data", ["epicor", "monday"]],
      ["📈 Monthly P&L — February", "Mar 02", "Revenue, costs, margins by project", ["epicor"]],
      ["🌍 Global Operations Review", "Feb 15", "Den Haag, Shanghai, KL performance", ["epicor", "monday", "m365"]],
      ["📋 Client Portfolio Analysis", "Feb 28", "Client retention, pipeline, revenue", ["epicor", "monday"]],
      ["🏗️ Production Capacity", "Feb 22", "Utilization, bottlenecks from Epicor MES", ["epicor"]],
    ].map(([title, date, desc, sources], i) => (
      <div key={i} style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 12, padding: "16px 20px", marginBottom: 8, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.borderColor = C.acc + "55"} onMouseLeave={e => e.currentTarget.style.borderColor = C.bd}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.tx }}>{title}</div>
            <div style={{ fontSize: 11, color: C.txM, marginTop: 3 }}>{desc}</div>
            <div style={{ display: "flex", gap: 4, marginTop: 6 }}>{sources.map(s => <SourceTag key={s} source={s} />)}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: C.txD }}>{date}</div>
            <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
              <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 5, background: C.accD, color: C.acc }}>PDF</span>
              <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 5, background: C.b + "18", color: C.b }}>AI Summary</span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ─── AI CHAT ──────────────

const AIChat = () => {
  const [msgs, setMsgs] = useState([{ role: "ai", text: "Hello! I'm connected to Epicor Kinetic, Monday.com, and Microsoft 365. Ask me about projects, budgets, production, drawings, or open points." }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const ref = useRef(null);
  useEffect(() => { ref.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);
  const send = () => {
    if (!input.trim()) return;
    const q = input;
    setMsgs(p => [...p, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      let r = "In production, I'd query Epicor, Monday.com, and SharePoint in real-time. This is a prototype demo.";
      if (q.toLowerCase().includes("budget") || q.toLowerCase().includes("cost")) r = "From Epicor: Total active budget €4.44M across 5 jobs. €2.79M spent (63%). Gaggenau Shanghai at 91% budget consumed — flagged for review.";
      else if (q.toLowerCase().includes("open") || q.toLowerCase().includes("point")) r = "8 open points across all projects. 1 urgent (Gaggenau — delivery access). 5 awaiting client action. 2 owned by Oldenburger. Longest open: structural engineer report (15 days).";
      else if (q.toLowerCase().includes("production") || q.toLowerCase().includes("epicor")) r = "From Epicor: 5 active jobs. 78% utilization. WIP €1.2M. Gaggenau nearest completion at 91% (Installation phase).";
      else if (q.toLowerCase().includes("draw")) r = "4 drawings in pipeline: 2 Pending Review, 1 Needs Revision, 1 Approved. I can run AI analysis on any drawing against Epicor BOM data.";
      setMsgs(p => [...p, { role: "ai", text: r }]);
      setTyping(false);
    }, 1000);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 48px)" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: C.tx, margin: "0 0 4px" }}>AI Assistant</h1>
      <p style={{ color: C.txM, fontSize: 12, marginBottom: 12 }}>Connected to Epicor + Monday.com + M365</p>
      <div style={{ flex: 1, overflowY: "auto", marginBottom: 10 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 10 }}>
            <div style={{ maxWidth: "82%", padding: "11px 15px", borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.role === "user" ? C.acc + "22" : C.card, border: `1px solid ${m.role === "user" ? C.acc + "33" : C.bd}`, color: C.tx, fontSize: 13, lineHeight: 1.6 }}>
              {m.role === "ai" && <div style={{ fontSize: 10, color: C.acc, fontWeight: 600, marginBottom: 3 }}>✦ AI</div>}
              {m.text}
            </div>
          </div>
        ))}
        {typing && <div style={{ padding: "11px 15px", borderRadius: 14, background: C.card, border: `1px solid ${C.bd}`, color: C.txM, fontSize: 13, display: "inline-block" }}>Searching systems...</div>}
        <div ref={ref} />
      </div>
      {msgs.length <= 1 && (
        <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
          {["Budget status", "Open points summary", "Production update", "Drawing pipeline"].map(s => (
            <button key={s} onClick={() => setInput(s)} style={{ padding: "6px 12px", borderRadius: 99, border: `1px solid ${C.bd}`, background: C.sf, color: C.txM, fontSize: 11, cursor: "pointer" }}>{s}</button>
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask about projects, budgets, open points..." style={{ flex: 1, padding: "11px 14px", borderRadius: 10, border: `1px solid ${C.bd}`, background: C.card, color: C.tx, fontSize: 13, outline: "none" }} />
        <button onClick={send} style={{ padding: "11px 18px", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${C.acc}, #B8956A)`, color: C.bg, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Send</button>
      </div>
    </div>
  );
};

// ─── HUB ACCESS MANAGER ──────────────

const hubEntities = [
  { id: "nl", name: "Oldenburger Interior B.V.", country: "Netherlands", flag: "🇳🇱", hq: "Den Haag", color: "#FF6B35", employees: 28 },
  { id: "cn", name: "Oldenburger Interior (Shanghai) Co.", country: "China", flag: "🇨🇳", hq: "Shanghai", color: "#DE2910", employees: 12 },
  { id: "my", name: "Oldenburger Interior Sdn Bhd", country: "Malaysia", flag: "🇲🇾", hq: "Kuala Lumpur", color: "#010066", employees: 7 },
];

const hubModules = [
  { id: "dashboard", label: "Dashboard & KPIs", icon: "◫", scope: "all" },
  { id: "projects", label: "Project Management", icon: "▦", scope: "all" },
  { id: "drawings", label: "Drawing Reviews", icon: "📐", scope: "all" },
  { id: "ai_drawings", label: "AI Drawing Analysis", icon: "✦", scope: "all" },
  { id: "production", label: "Production Data", icon: "🏭", scope: "all" },
  { id: "contracts", label: "Contracts & Licenses", icon: "📄", scope: "entity" },
  { id: "accounting", label: "Accounting & Finance", icon: "💰", scope: "entity" },
  { id: "reports", label: "AI Reports", icon: "📈", scope: "entity" },
  { id: "knowledge", label: "Knowledge Base", icon: "◉", scope: "all" },
  { id: "shipping", label: "Shipping Tracker", icon: "🚢", scope: "all" },
  { id: "open_points", label: "Open Points", icon: "📋", scope: "all" },
  { id: "client_portal", label: "Client Portal", icon: "🏢", scope: "all" },
  { id: "client_chat", label: "Client Support Chat", icon: "💬", scope: "all" },
  { id: "team_overview", label: "Team Overview", icon: "👥", scope: "entity" },
  { id: "ai_assistant", label: "AI Assistant", icon: "✦", scope: "all" },
  { id: "quick_actions", label: "Quick Actions", icon: "⚡", scope: "all" },
  { id: "entity_admin", label: "Entity Admin", icon: "🏛️", scope: "entity" },
  { id: "cross_entity", label: "Cross-Entity View", icon: "🌍", scope: "global" },
];

const hubOrg = {
  ceo: { id: "ceo", name: "Managing Director", role: "Group Owner", icon: "👑", color: C.acc, entity: "global", entityAccess: ["nl","cn","my"], access: ["dashboard","projects","contracts","accounting","reports","knowledge","shipping","open_points","team_overview","ai_assistant","entity_admin","cross_entity"], children: ["nl_head","cn_head","my_head"] },
  nl_head: { id: "nl_head", name: "Head of Operations NL", role: "GM — Netherlands", icon: "🇳🇱", color: "#FF6B35", entity: "nl", entityAccess: ["nl"], access: ["dashboard","projects","drawings","ai_drawings","production","contracts","accounting","reports","knowledge","shipping","open_points","team_overview","ai_assistant","quick_actions","entity_admin"], children: ["nl_pm1","nl_pm2","nl_tech","nl_fin"] },
  cn_head: { id: "cn_head", name: "Head of Operations CN", role: "GM — China", icon: "🇨🇳", color: "#DE2910", entity: "cn", entityAccess: ["cn"], access: ["dashboard","projects","drawings","ai_drawings","production","contracts","accounting","reports","knowledge","shipping","open_points","team_overview","ai_assistant","quick_actions","entity_admin"], children: ["cn_pm1","cn_prod","cn_fin"] },
  my_head: { id: "my_head", name: "Head of Operations MY", role: "GM — Malaysia", icon: "🇲🇾", color: "#010066", entity: "my", entityAccess: ["my"], access: ["dashboard","projects","drawings","production","knowledge","shipping","open_points","team_overview","ai_assistant","quick_actions","entity_admin"], children: ["my_pm1","my_fin"] },
  nl_pm1: { id: "nl_pm1", name: "Lukas Meier", role: "Senior PM", icon: "📋", color: C.o, entity: "nl", entityAccess: ["nl"], access: ["dashboard","projects","drawings","production","knowledge","shipping","open_points","ai_assistant","quick_actions"], children: ["nl_tech"] },
  nl_pm2: { id: "nl_pm2", name: "Sophie van Dijk", role: "Design Lead / PM", icon: "📋", color: C.o, entity: "nl", entityAccess: ["nl"], access: ["dashboard","projects","drawings","ai_drawings","knowledge","shipping","open_points","ai_assistant","quick_actions"], children: [] },
  nl_tech: { id: "nl_tech", name: "Kai Tanaka", role: "Technical Dev", icon: "🔧", color: C.b, entity: "nl", entityAccess: ["nl"], access: ["drawings","ai_drawings","production","knowledge","ai_assistant"], children: [] },
  nl_fin: { id: "nl_fin", name: "NL Finance", role: "Accounting — NL", icon: "💰", color: C.g, entity: "nl", entityAccess: ["nl"], access: ["accounting","reports","contracts"], children: [] },
  cn_pm1: { id: "cn_pm1", name: "Anna Chen", role: "Project Manager", icon: "📋", color: C.o, entity: "cn", entityAccess: ["cn"], access: ["dashboard","projects","drawings","production","knowledge","shipping","open_points","ai_assistant","quick_actions"], children: [] },
  cn_prod: { id: "cn_prod", name: "Wei Liu", role: "Production Mgr", icon: "🏭", color: C.b, entity: "cn", entityAccess: ["cn"], access: ["drawings","production","knowledge","shipping","ai_assistant"], children: [] },
  cn_fin: { id: "cn_fin", name: "CN Finance", role: "Accounting — CN", icon: "💰", color: C.g, entity: "cn", entityAccess: ["cn"], access: ["accounting","reports","contracts"], children: [] },
  my_pm1: { id: "my_pm1", name: "Ravi Patel", role: "Project Manager", icon: "📋", color: C.o, entity: "my", entityAccess: ["my"], access: ["dashboard","projects","drawings","production","knowledge","shipping","open_points","ai_assistant","quick_actions"], children: [] },
  my_fin: { id: "my_fin", name: "MY Finance", role: "Accounting — MY", icon: "💰", color: C.g, entity: "my", entityAccess: ["my"], access: ["accounting","reports","contracts"], children: [] },
};

const hubExternal = {
  ext_lead: { id: "ext_lead", name: "Client Team Lead", role: "Client — Team Lead", icon: "👔", color: C.y, entity: "external", entityAccess: [], access: ["client_portal","open_points","shipping","team_overview","client_chat"], children: ["ext_m","ext_l","ext_t","ext_j","ext_a"] },
  ext_m: { id: "ext_m", name: "Maria Schmidt", role: "Client PM — Swarovski", icon: "🏢", color: C.txM, entity: "external", entityAccess: [], access: ["client_portal","open_points","shipping","client_chat"], children: [] },
  ext_l: { id: "ext_l", name: "Lars Andersen", role: "Client PM — Ganni", icon: "🏢", color: C.txM, entity: "external", entityAccess: [], access: ["client_portal","open_points","shipping","client_chat"], children: [] },
  ext_t: { id: "ext_t", name: "Thomas Berger", role: "Client PM — Gaggenau", icon: "🏢", color: C.txM, entity: "external", entityAccess: [], access: ["client_portal","open_points","shipping","client_chat"], children: [] },
  ext_j: { id: "ext_j", name: "Jan de Vries", role: "Client PM — De Bijenkorf", icon: "🏢", color: C.txM, entity: "external", entityAccess: [], access: ["client_portal","open_points","shipping","client_chat"], children: [] },
  ext_a: { id: "ext_a", name: "Ahmad Razak", role: "Client PM — Kudos", icon: "🏢", color: C.txM, entity: "external", entityAccess: [], access: ["client_portal","open_points","shipping","client_chat"], children: [] },
};

const allHubPeople = { ...hubOrg, ...hubExternal };

const AccessOrgNode = ({ id, data, selected, setSelected, depth = 0 }) => {
  const person = data[id];
  if (!person) return null;
  const [exp, setExp] = useState(true);
  const has = person.children && person.children.length > 0;
  const entColor = person.entity === "global" ? C.acc : person.entity === "external" ? C.y : (hubEntities.find(e => e.id === person.entity)?.color || C.txM);
  return (
    <div style={{ marginLeft: depth > 0 ? 22 : 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
        {has ? (
          <button onClick={(e) => { e.stopPropagation(); setExp(!exp); }} style={{ width: 16, height: 16, borderRadius: 3, border: `1px solid ${C.bd}`, background: C.sf, color: C.txM, fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{exp ? "−" : "+"}</button>
        ) : <div style={{ width: 16 }} />}
        <div onClick={() => setSelected(selected === id ? null : id)} style={{
          flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8,
          background: selected === id ? C.acc + "10" : C.card, border: `1.5px solid ${selected === id ? C.acc : C.bd}`,
          borderLeft: `3px solid ${entColor}`, cursor: "pointer", transition: "all .15s",
        }} onMouseEnter={e => { if (selected !== id) e.currentTarget.style.borderColor = C.acc + "44"; }}
           onMouseLeave={e => { if (selected !== id) e.currentTarget.style.borderColor = C.bd; }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: entColor + "18", border: `1.5px solid ${entColor}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>{person.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.tx, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{person.name}</div>
            <div style={{ fontSize: 10, color: C.txM, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{person.role}</div>
          </div>
          <span style={{ fontSize: 10, color: C.txD }}>{person.access.length}</span>
        </div>
      </div>
      {exp && has && (
        <div style={{ borderLeft: `1.5px solid ${C.bd}`, marginLeft: 8 }}>
          {person.children.map(cid => <AccessOrgNode key={cid} id={cid} data={data} selected={selected} setSelected={setSelected} depth={depth + 1} />)}
        </div>
      )}
    </div>
  );
};

const HubAccessManager = () => {
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("internal");
  const [showAll, setShowAll] = useState(true);
  const person = selected ? allHubPeople[selected] : null;
  const hasAccess = person ? new Set(person.access) : new Set();
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: C.tx, margin: 0 }}>Hub Access Manager</h1>
          <p style={{ color: C.txM, fontSize: 13, marginTop: 4 }}>3 entities · {hubEntities.reduce((a, e) => a + e.employees, 0)} employees · {hubModules.length} modules</p>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[["internal", "Internal"], ["external", "Clients"]].map(([k, l]) => (
            <button key={k} onClick={() => { setView(k); setSelected(null); }} style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${view === k ? C.acc : C.bd}`, background: view === k ? C.accD : "transparent", color: view === k ? C.acc : C.txM, fontSize: 12, fontWeight: view === k ? 600 : 400, cursor: "pointer" }}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {hubEntities.map(ent => (
          <div key={ent.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10, background: ent.color + "08", border: `1px solid ${ent.color}22`, flex: 1, minWidth: 180 }}>
            <span style={{ fontSize: 20 }}>{ent.flag}</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.tx }}>{ent.country}</div>
              <div style={{ fontSize: 10, color: C.txM }}>{ent.hq} · {ent.employees} staff</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.txD, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{view === "internal" ? "Organization" : "Client Teams"}</div>
          {view === "internal" ? (
            <AccessOrgNode id="ceo" data={hubOrg} selected={selected} setSelected={setSelected} />
          ) : (
            <AccessOrgNode id="ext_lead" data={hubExternal} selected={selected} setSelected={setSelected} />
          )}
        </div>
        <div style={{ flex: 1.3, minWidth: 300 }}>
          {!person ? (
            <div style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 14, padding: 30, textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>👆</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 4 }}>Select a person</div>
              <div style={{ fontSize: 12, color: C.txM }}>Click anyone to see their access permissions.</div>
            </div>
          ) : (
            <div>
              <div style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 14, padding: 18, marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: (person.color || C.acc) + "22", border: `2px solid ${person.color || C.acc}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{person.icon}</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: C.tx }}>{person.name}</div>
                    <div style={{ fontSize: 12, color: C.txM }}>{person.role}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <div style={{ background: C.sf, borderRadius: 8, padding: "6px 12px" }}>
                    <div style={{ fontSize: 9, color: C.txD }}>MODULES</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.g }}>{person.access.length} / {hubModules.length}</div>
                  </div>
                  <div style={{ background: C.sf, borderRadius: 8, padding: "6px 12px" }}>
                    <div style={{ fontSize: 9, color: C.txD }}>REPORTS</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.tx }}>{person.children ? person.children.length : 0}</div>
                  </div>
                </div>
              </div>
              {person.entity !== "external" && (
                <div style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 12, padding: 14, marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.tx, marginBottom: 8 }}>Entity Access</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {hubEntities.map(ent => {
                      const h = person.entityAccess && person.entityAccess.includes(ent.id);
                      return (
                        <div key={ent.id} style={{ flex: 1, background: h ? ent.color + "10" : C.bg, border: `1px solid ${h ? ent.color + "33" : "transparent"}`, borderRadius: 8, padding: "8px 10px", opacity: h ? 1 : 0.3, textAlign: "center" }}>
                          <div style={{ fontSize: 18, marginBottom: 2 }}>{ent.flag}</div>
                          <div style={{ fontSize: 10, fontWeight: 600, color: h ? C.tx : C.txD }}>{ent.country}</div>
                          <div style={{ fontSize: 9, color: h ? C.g : C.r, fontWeight: 600, marginTop: 2 }}>{h ? "✓ Access" : "✕ None"}</div>
                        </div>
                      );
                    })}
                  </div>
                  {person.entityAccess && person.entityAccess.length === 3 && (
                    <div style={{ marginTop: 8, padding: "4px 10px", background: C.acc + "10", borderRadius: 6, fontSize: 10, color: C.acc }}>{"🌍 Cross-entity: sees consolidated data from all 3 companies"}</div>
                  )}
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.tx }}>Module Permissions</span>
                <button onClick={() => setShowAll(!showAll)} style={{ background: "none", border: "none", color: C.acc, fontSize: 10, cursor: "pointer" }}>{showAll ? "Granted only" : "Show all"}</button>
              </div>
              {hubModules.filter(m => showAll || hasAccess.has(m.id)).map(mod => {
                const h = hasAccess.has(mod.id);
                return (
                  <div key={mod.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", marginBottom: 2, borderRadius: 6, background: h ? C.card : "transparent", border: `1px solid ${h ? C.bd : "transparent"}`, opacity: h ? 1 : 0.3 }}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, background: h ? C.g + "22" : C.r + "12", border: `1px solid ${h ? C.g + "33" : C.r + "22"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: h ? C.g : C.r, flexShrink: 0 }}>{h ? "✓" : "✕"}</div>
                    <span style={{ fontSize: 13 }}>{mod.icon}</span>
                    <span style={{ fontSize: 12, color: h ? C.tx : C.txD, flex: 1 }}>{mod.label}</span>
                    <div style={{ display: "flex", gap: 3 }}>
                      {mod.scope === "entity" && <span style={{ fontSize: 8, padding: "1px 5px", borderRadius: 3, background: C.p + "15", color: C.p }}>Entity</span>}
                      {mod.scope === "global" && <span style={{ fontSize: 8, padding: "1px 5px", borderRadius: 3, background: C.acc + "15", color: C.acc }}>Global</span>}
                      <span style={{ fontSize: 8, padding: "1px 5px", borderRadius: 3, background: h ? C.g + "15" : C.r + "10", color: h ? C.g : C.r }}>{h ? "On" : "Off"}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── MAIN ──────────────

const ROLES = {
  tech: { label: "Technical Team", icon: "🔧", pages: [["tech", "Drawings & Production", "📐"]] },
  admin: { label: "Admin", icon: "🔑", pages: [["admin", "Contracts & Licenses", "📄"], ["access", "Hub Access", "🔐"]] },
  pm: { label: "Project Manager", icon: "📋", pages: [["pm", "My Projects", "▦"]] },
  client: { label: "Client PM", icon: "🏢", pages: [["client", "Project Portal", "◫"], ["clientai", "Support Chat", "✦"]] },
  clientlead: { label: "Client Team Lead", icon: "👔", pages: [["clientlead", "Team Overview", "◎"]] },
  accounting: { label: "Accounting", icon: "💰", pages: [["accounting", "Financials", "📊"]] },
  owner: { label: "Owner", icon: "👑", pages: [["owner", "Reports & KPIs", "📈"], ["access", "Hub Access", "🔐"]] },
};

const USERS = {
  "seyberth@oldenburger.com.my": { password: "oldenburger2026", name: "Philipp Seyberth", defaultRole: "owner", entity: "my" },
  "kohns@oldenburger.com.cn": { password: "oldenburger2026", name: "Thomas Kohns", defaultRole: "owner", entity: "cn" },
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("pm");
  const [page, setPage] = useState("pm");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userName, setUserName] = useState("");

  const handleLogin = () => {
    const user = USERS[email.toLowerCase().trim()];
    if (!user) { setLoginError("Unknown email address"); return; }
    if (user.password !== password) { setLoginError("Incorrect password"); return; }
    setLoginError("");
    setUserName(user.name);
    setRole(user.defaultRole);
    setPage(ROLES[user.defaultRole].pages[0][0]);
    setLoggedIn(true);
  };

  if (!loggedIn) {
    return (
      <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.bg}, #0F1625, #121A2B)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" }}>
        <div style={{ width: 400, padding: 40, background: C.sf, borderRadius: 20, border: `1px solid ${C.bd}`, boxShadow: "0 25px 60px rgba(0,0,0,0.5)" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: C.acc, fontWeight: 700, marginBottom: 6 }}>OLDENBURGER</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: C.tx }}>Hub</div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, color: C.txM, display: "block", marginBottom: 6 }}>Email</label>
            <input value={email} onChange={e => { setEmail(e.target.value); setLoginError(""); }} placeholder="you@oldenburger.com.my" style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${loginError ? C.r + "66" : C.bd}`, background: C.bg, color: C.tx, fontSize: 14, outline: "none", boxSizing: "border-box" }} onKeyDown={e => e.key === "Enter" && handleLogin()} />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 11, color: C.txM, display: "block", marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={e => { setPassword(e.target.value); setLoginError(""); }} placeholder="••••••••" style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${loginError ? C.r + "66" : C.bd}`, background: C.bg, color: C.tx, fontSize: 14, outline: "none", boxSizing: "border-box" }} onKeyDown={e => e.key === "Enter" && handleLogin()} />
          </div>
          {loginError && <div style={{ fontSize: 12, color: C.r, marginBottom: 12, padding: "6px 10px", background: C.r + "12", borderRadius: 6 }}>{loginError}</div>}
          {!loginError && <div style={{ height: 16, marginBottom: 12 }} />}
          <button onClick={handleLogin} style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", background: `linear-gradient(135deg, ${C.acc}, #B8956A)`, color: C.bg, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 14 }}>Sign In</button>
          <button onClick={handleLogin} style={{ width: "100%", padding: "12px", borderRadius: 12, border: `1px solid ${C.ms}44`, background: C.ms + "10", color: C.ms, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {"◆ Sign in with Microsoft"}
          </button>
          <div style={{ textAlign: "center", marginTop: 18, fontSize: 11, color: C.txD }}>
            <span style={{ color: C.acc, cursor: "pointer" }}>Forgot password?</span>
          </div>
        </div>
      </div>
    );
  }

  const roleData = ROLES[role];
  const allPages = [...roleData.pages];
  if (role !== "client" && role !== "clientlead") allPages.push(["ai", "AI Assistant", "✦"]);

  return (
    <div style={{ display: "flex", height: "100vh", background: C.bg, fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", color: C.tx, overflow: "hidden" }}>
      <div style={{ width: 200, background: C.sf, borderRight: `1px solid ${C.bd}`, display: "flex", flexDirection: "column", padding: "18px 10px", flexShrink: 0 }}>
        <div style={{ padding: "0 10px", marginBottom: 24 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: C.acc, fontWeight: 700 }}>OLDENBURGER</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.tx }}>Hub</div>
        </div>
        <div style={{ flex: 1 }}>
          {allPages.map(([id, label, icon]) => (
            <button key={id} onClick={() => setPage(id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "9px 10px", borderRadius: 8, border: "none", background: page === id ? C.accD : "transparent", color: page === id ? C.acc : C.txM, fontSize: 12, fontWeight: page === id ? 600 : 400, cursor: "pointer", marginBottom: 2, textAlign: "left" }}>
              <span style={{ fontSize: 13, width: 18, textAlign: "center" }}>{icon}</span>{label}
            </button>
          ))}
        </div>
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 9, color: C.txD, textTransform: "uppercase", letterSpacing: 1, padding: "0 10px", marginBottom: 6 }}>Demo: Switch view</div>
          {Object.entries(ROLES).map(([k, v]) => (
            <button key={k} onClick={() => { setRole(k); setPage(v.pages[0][0]); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 6, border: "none", background: role === k ? C.accD : "transparent", color: role === k ? C.acc : C.txD, fontSize: 10, cursor: "pointer", textAlign: "left", marginBottom: 1 }}>
              <span style={{ fontSize: 11 }}>{v.icon}</span>{v.label}
            </button>
          ))}
        </div>
        {userName && (
          <div style={{ padding: "8px 10px", marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Avatar name={userName} size={24} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.tx }}>{userName}</div>
                <div style={{ fontSize: 9, color: C.txD }}>{email}</div>
              </div>
            </div>
          </div>
        )}
        <button onClick={() => { setLoggedIn(false); setEmail(""); setPassword(""); setUserName(""); }} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.bd}`, background: "transparent", color: C.txM, fontSize: 11, cursor: "pointer", textAlign: "left" }}>Sign Out</button>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "20px 26px" }}>
        {page === "tech" && <TechDashboard />}
        {page === "admin" && <AdminDashboard />}
        {page === "access" && <HubAccessManager />}
        {page === "pm" && <PMDashboard />}
        {page === "client" && <ClientPortal />}
        {page === "clientai" && <ClientAIChat />}
        {page === "clientlead" && <ClientTeamLead />}
        {page === "accounting" && <AccountingDashboard />}
        {page === "owner" && <OwnerReports />}
        {page === "ai" && <AIChat />}
      </div>
    </div>
  );
}
