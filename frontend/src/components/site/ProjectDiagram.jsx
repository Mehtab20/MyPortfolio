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

/** Stable id for a node: "column-row". */
export const nodeId = (ci, ni) => `${ci}-${ni}`;

/**
 * Edges: a column with several nodes funnels into the next column's hub
 * (its hot node, or its first); a single-node column fans out to every node
 * of the next column. Edges between two hot nodes are animated.
 */
function buildEdges(L) {
  const edges = [];
  for (let i = 0; i < L.nodes.length - 1; i++) {
    const cur = L.nodes[i];
    const next = L.nodes[i + 1];
    if (cur.length > 1) {
      const hi = Math.max(0, next.findIndex((n) => n.hot));
      cur.forEach((n, ni) => edges.push({ d: edgePath(n, next[hi], L.dir), hot: Boolean(n.hot && next[hi].hot), a: nodeId(i, ni), b: nodeId(i + 1, hi) }));
    } else {
      next.forEach((n, ni) => edges.push({ d: edgePath(cur[0], n, L.dir), hot: Boolean(cur[0].hot && n.hot), a: nodeId(i, 0), b: nodeId(i + 1, ni) }));
    }
  }
  return edges;
}

/**
 * `selected` + `onSelect` make the nodes keyboard-focusable buttons; without
 * them the diagram is a static picture.
 */
export default function ProjectDiagram({ project, hideCaption = false, selected = null, onSelect = null }) {
  const narrow = useMediaQuery('(max-width: 640px)');
  const titleId = useId();
  const { diagram } = project;
  const interactive = typeof onSelect === 'function';

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

  const edges = buildEdges(L);
  const fs = L.fontScale;
  const flat = L.nodes.flatMap((col, ci) => col.map((n, ni) => ({ ...n, id: nodeId(ci, ni), col: diagram.columns[ci].label })));
  const linked = new Set(selected ? edges.filter((e) => e.a === selected || e.b === selected).flatMap((e) => [e.a, e.b]) : []);
  const order = flat.map((n) => n.id);

  const onKey = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(id);
      return;
    }
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = order[(order.indexOf(id) + step + order.length) % order.length];
    onSelect(next);
    e.currentTarget.ownerSVGElement?.querySelector(`[data-node="${next}"]`)?.focus();
  };

  return (
    <svg
      viewBox={`0 0 ${L.W} ${L.H}`}
      role={interactive ? 'group' : 'img'}
      aria-labelledby={titleId}
      preserveAspectRatio="xMidYMid meet"
      className={`${interactive ? 'pv-interactive' : ''}${selected ? ' pv-has-sel' : ''}`}
    >
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
      {edges.map((e, i) => {
        const on = selected && (e.a === selected || e.b === selected);
        return <path key={i} className={`pv-edge${e.hot ? ' pv-edge--hot' : ''}${on ? ' pv-edge--on' : ''}`} d={e.d} />;
      })}
      {flat.map((n) => {
        const sel = n.id === selected;
        const cls = `pv-node${n.hot ? ' pv-node--hot' : ''}${sel ? ' pv-node--sel' : ''}`;
        const body = (
          <>
            <rect className={cls} x={n.x} y={n.y} width={n.w} height={n.h} rx="9" />
            {n.hot && <circle className="pv-dot" cx={n.x + n.w - 12} cy={n.y + 12} r="3" />}
            <text className="pv-node-text" x={n.x + 12} y={n.y + (n.s && n.showSub ? 23 : n.h / 2 + 4.5)} style={{ fontSize: 13 * fs }}>
              {n.t}
            </text>
            {n.s && n.showSub && (
              <text className="pv-node-sub" x={n.x + 12} y={n.y + 41}>
                {n.s}
              </text>
            )}
          </>
        );
        if (!interactive) return <g key={n.id}>{body}</g>;
        return (
          <g
            key={n.id}
            data-node={n.id}
            className={`pv-hit${sel ? ' is-sel' : ''}${selected && !sel && !linked.has(n.id) ? ' is-dim' : ''}`}
            role="button"
            tabIndex={sel || (!selected && n.id === order[0]) ? 0 : -1}
            aria-pressed={sel}
            aria-label={`${n.t}, ${n.col}`}
            onClick={() => onSelect(n.id)}
            onKeyDown={(e) => onKey(e, n.id)}
          >
            {body}
          </g>
        );
      })}
    </svg>
  );
}
