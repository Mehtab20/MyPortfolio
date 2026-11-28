import { useId, useMemo } from 'react';
import { useMediaQuery } from './hooks';

/*
 * Architecture schematic for a project, drawn from its `diagram` data.
 * Wide screens get a left-to-right flow; narrow screens get a top-to-bottom
 * version with larger type so it stays legible on a phone.
 */

function layoutWide(columns) {
  const W = 800;
  const mx = 36;
  const gap = 28;
  const colW = (W - mx * 2 - gap * (columns.length - 1)) / columns.length;
  const top = 128;
  // Height follows the tallest column, so the drawing has no dead space.
  const tallest = Math.max(...columns.map((c) => c.nodes.reduce((a, n) => a + (n.s ? 56 : 42) + 12, -12)));
  const H = Math.max(300, top + tallest + 48);
  const bottom = H - 48;
  const nodes = columns.map((col, ci) => {
    const x = mx + ci * (colW + gap);
    const hs = col.nodes.map((n) => (n.s ? 56 : 42));
    const vgap = 12;
    const total = hs.reduce((a, b) => a + b, 0) + vgap * (hs.length - 1);
    let y = top + (bottom - top - total) / 2;
    return col.nodes.map((n, ni) => {
      const r = { ...n, x, y, w: colW, h: hs[ni], showSub: true };
      y += hs[ni] + vgap;
      return r;
    });
  });
  const labels = columns.map((col, ci) => ({ text: col.label, x: mx + ci * (colW + gap), y: 100 }));
  return { W, H, nodes, labels, dir: 'x', fontScale: 1 };
}

function layoutTall(columns) {
  const W = 400;
  const mx = 20;
  const perRow = 2;
  const gap = 10;
  const nodeW = (W - mx * 2 - gap * (perRow - 1)) / perRow;
  const nodeH = 40;
  let y = 64;
  const labels = [];
  const nodes = columns.map((col) => {
    labels.push({ text: col.label, x: mx, y: y + 4 });
    y += 18;
    const rows = Math.ceil(col.nodes.length / perRow);
    const placed = col.nodes.map((n, ni) => {
      const r = Math.floor(ni / perRow);
      const inRow = Math.min(perRow, col.nodes.length - r * perRow);
      const rowW = inRow * nodeW + (inRow - 1) * gap;
      const c = ni % perRow;
      return { ...n, x: (W - rowW) / 2 + c * (nodeW + gap), y: y + r * (nodeH + gap), w: nodeW, h: nodeH, showSub: false };
    });
    y += rows * nodeH + (rows - 1) * gap + 34;
    return placed;
  });
  return { W, H: y - 6, nodes, labels, dir: 'y', fontScale: 1.08 };
}

function edgePath(a, b, dir) {
  if (dir === 'x') {
    const x1 = a.x + a.w;
    const y1 = a.y + a.h / 2;
    const x2 = b.x;
    const y2 = b.y + b.h / 2;
    const mx = (x1 + x2) / 2;
    return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
  }
  const x1 = a.x + a.w / 2;
  const y1 = a.y + a.h;
  const x2 = b.x + b.w / 2;
  const y2 = b.y;
  const my = (y1 + y2) / 2;
  return `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`;
}

export default function ProjectDiagram({ project, hideCaption = false }) {
  const narrow = useMediaQuery('(max-width: 640px)');
  const titleId = useId();
  const { diagram } = project;

  const L = useMemo(
    () => (diagram ? (narrow ? layoutTall(diagram.columns) : layoutWide(diagram.columns)) : null),
    [diagram, narrow],
  );

  if (!diagram || !L) {
    return (
      <div className="s-placeholder" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
        </svg>
      </div>
    );
  }

  // Edges: a column with several nodes funnels into the next column's hub
  // (its hot node, or its first); a single-node column fans out to every
  // node of the next column. Edges between two hot nodes are animated.
  const edges = [];
  for (let i = 0; i < L.nodes.length - 1; i++) {
    const cur = L.nodes[i];
    const next = L.nodes[i + 1];
    if (cur.length > 1) {
      const hub = next.find((n) => n.hot) || next[0];
      cur.forEach((n) => edges.push({ d: edgePath(n, hub, L.dir), hot: Boolean(n.hot && hub.hot) }));
    } else {
      next.forEach((n) => edges.push({ d: edgePath(cur[0], n, L.dir), hot: Boolean(cur[0].hot && n.hot) }));
    }
  }

  const fs = L.fontScale;
  const flat = L.nodes.flat();

  return (
    <svg viewBox={`0 0 ${L.W} ${L.H}`} role="img" aria-labelledby={titleId} preserveAspectRatio="xMidYMid meet">
      <title id={titleId}>
        {`${project.title} architecture: ${diagram.columns.map((c) => `${c.label} (${c.nodes.map((n) => n.t).join(', ')})`).join(' → ')}`}
      </title>
      <rect className="pv-bg" x="0" y="0" width={L.W} height={L.H} />
      {L.dir === 'x' &&
        Array.from({ length: 9 }).map((_, i) => (
          <line key={i} className="pv-grid" x1={(L.W / 8) * i} y1="0" x2={(L.W / 8) * i} y2={L.H} opacity="0.5" />
        ))}
      {!hideCaption && (
        <text className="pv-caption" x={L.dir === 'x' ? 36 : 20} y={L.dir === 'x' ? 48 : 34} style={{ fontSize: 10.5 * fs }}>
          {project.index} — {diagram.caption}
        </text>
      )}
      {L.labels.map((l) => (
        <text key={l.text} className="pv-col-label" x={l.x} y={l.y} style={{ fontSize: 10.5 * fs }}>
          {l.text}
        </text>
      ))}
      {edges.map((e, i) => (
        <path key={i} className={`pv-edge${e.hot ? ' pv-edge--hot' : ''}`} d={e.d} />
      ))}
      {flat.map((n, i) => (
        <g key={i}>
          <rect className={`pv-node${n.hot ? ' pv-node--hot' : ''}`} x={n.x} y={n.y} width={n.w} height={n.h} rx="9" />
          {n.hot && <circle className="pv-dot" cx={n.x + n.w - 12} cy={n.y + 12} r="3" />}
          <text
            className="pv-node-text"
            x={n.x + 12}
            y={n.y + (n.s && n.showSub ? 23 : n.h / 2 + 4.5)}
            style={{ fontSize: 13 * fs }}
          >
            {n.t}
          </text>
          {n.s && n.showSub && (
            <text className="pv-node-sub" x={n.x + 12} y={n.y + 41}>
              {n.s}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
