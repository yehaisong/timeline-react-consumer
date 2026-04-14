import ft, { useState as Q, useEffect as K, useMemo as mt, useRef as J, useLayoutEffect as ke } from "react";
const Z = [
  "century",
  "decade",
  "year",
  "quarter",
  "month",
  "week",
  "day"
], pt = {
  century: "decade",
  decade: "year",
  year: "month",
  quarter: "month",
  month: "week",
  week: "day",
  day: null
}, ht = /^([+-]\d{4,}|0000)-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?(Z|[+-]\d{2}:\d{2})?)?$/;
function X(e, n = 0, t = 1, r = 0, o = 0, a = 0, c = 0) {
  const m = /* @__PURE__ */ new Date(0);
  return m.setUTCFullYear(e, n, t), m.setUTCHours(r, o, a, c), m.getTime();
}
function bt(e) {
  const n = e.match(ht);
  if (!n)
    return null;
  const [
    ,
    t,
    r,
    o,
    a,
    c,
    m,
    f,
    h
  ] = n, M = Number(t), k = Number(r), S = Number(o), z = a ? Number(a) : 0, P = c ? Number(c) : 0, x = m ? Number(m) : 0, Y = f ? Number(f.padEnd(3, "0")) : 0;
  if (!Number.isInteger(M) || k < 1 || k > 12 || S < 1 || S > 31 || z > 23 || P > 59 || x > 59)
    return null;
  const _ = /* @__PURE__ */ new Date(0);
  if (_.setUTCFullYear(M, k - 1, S), _.setUTCHours(z, P, x, Y), _.getUTCFullYear() !== M || _.getUTCMonth() !== k - 1 || _.getUTCDate() !== S || _.getUTCHours() !== z || _.getUTCMinutes() !== P || _.getUTCSeconds() !== x || _.getUTCMilliseconds() !== Y)
    return null;
  let D = _.getTime();
  if (h && h !== "Z") {
    const g = h.startsWith("-") ? -1 : 1, [ee, B] = h.slice(1).split(":"), u = Number(ee) * 60 + Number(B);
    D -= g * u * 60 * 1e3;
  }
  return Number.isFinite(D) ? D : null;
}
function Kt() {
  return [...Z];
}
function Qt(e, n) {
  return Z.indexOf(e) - Z.indexOf(n);
}
function Mt(e, n, t) {
  const r = Z.indexOf(e), o = Z.indexOf(n), a = Z.indexOf(t);
  return Z[Math.min(Math.max(r, o), a)];
}
function ye(e, n) {
  const t = Z.indexOf(e), r = Z.indexOf(n);
  return Z[Math.min(t + 1, r)];
}
function Ee(e, n) {
  const t = Z.indexOf(e), r = Z.indexOf(n);
  return Z[Math.max(t - 1, r)];
}
function q(e) {
  if (!e)
    return null;
  if (e instanceof Date) {
    const r = e.getTime();
    return Number.isFinite(r) ? r : null;
  }
  const n = bt(e);
  if (n !== null)
    return n;
  const t = new Date(e).getTime();
  return Number.isFinite(t) ? t : null;
}
function Se(e, n) {
  const t = new Date(e);
  if (n === "century") {
    const r = Math.floor(t.getUTCFullYear() / 100) * 100;
    return X(r, 0, 1, 0, 0, 0, 0);
  }
  if (n === "decade") {
    const r = Math.floor(t.getUTCFullYear() / 10) * 10;
    return X(r, 0, 1, 0, 0, 0, 0);
  }
  if (n === "year")
    return X(t.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
  if (n === "quarter") {
    const r = Math.floor(t.getUTCMonth() / 3) * 3;
    return X(t.getUTCFullYear(), r, 1, 0, 0, 0, 0);
  }
  if (n === "month")
    return X(t.getUTCFullYear(), t.getUTCMonth(), 1, 0, 0, 0, 0);
  if (n === "week") {
    const r = new Date(X(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate())), o = r.getUTCDay(), a = o === 0 ? -6 : 1 - o;
    return r.setUTCDate(r.getUTCDate() + a), r.getTime();
  }
  return X(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate(), 0, 0, 0, 0);
}
function he(e, n, t) {
  const r = new Date(e);
  return n === "century" ? X(r.getUTCFullYear() + t * 100, 0, 1, 0, 0, 0, 0) : n === "decade" ? X(r.getUTCFullYear() + t * 10, 0, 1, 0, 0, 0, 0) : n === "year" ? X(r.getUTCFullYear() + t, 0, 1, 0, 0, 0, 0) : n === "quarter" ? X(r.getUTCFullYear(), r.getUTCMonth() + t * 3, 1, 0, 0, 0, 0) : n === "month" ? X(r.getUTCFullYear(), r.getUTCMonth() + t, 1, 0, 0, 0, 0) : n === "week" ? e + t * 7 * 24 * 60 * 60 * 1e3 : e + t * 24 * 60 * 60 * 1e3;
}
function vt(e, n) {
  const t = Number.isFinite(e) && e > 0 ? e : 800, r = Number.isFinite(n) && n > 0 ? n : 100;
  return Math.max(1, Math.round(t / r));
}
function Ce(e, n, t, r) {
  const o = vt(t, r), a = Se(e, n), c = Math.floor(o / 2), m = he(a, n, -c), f = he(m, n, o);
  return {
    visibleStartMs: m,
    visibleEndMs: f,
    zoomUnit: n
  };
}
function ae(e, n, t) {
  const r = Number.isFinite(n ?? NaN), o = Number.isFinite(t ?? NaN);
  if (!r && !o)
    return e;
  const a = r ? Number(n) : null, c = o ? Number(t) : null, m = e.visibleEndMs - e.visibleStartMs;
  if (a !== null && c !== null && m >= c - a)
    return {
      ...e,
      visibleStartMs: a,
      visibleEndMs: c
    };
  let f = e.visibleStartMs, h = e.visibleEndMs;
  return a !== null && f < a && (f = a, h = a + m), c !== null && h > c && (h = c, f = c - m), {
    ...e,
    visibleStartMs: f,
    visibleEndMs: h
  };
}
function Ie(e, n, t, r) {
  const a = (e.visibleEndMs - e.visibleStartMs) * n;
  return ae(
    {
      ...e,
      visibleStartMs: e.visibleStartMs + a,
      visibleEndMs: e.visibleEndMs + a
    },
    t,
    r
  );
}
function we(e, n, t, r, o, a, c) {
  if (n === e.zoomUnit)
    return e;
  const m = e.visibleEndMs - e.visibleStartMs, f = m <= 0 ? 0.5 : (t - e.visibleStartMs) / m, h = Ce(t, n, r, o), M = h.visibleEndMs - h.visibleStartMs, k = t - f * M, S = k + M;
  return ae(
    {
      visibleStartMs: k,
      visibleEndMs: S,
      zoomUnit: n
    },
    a,
    c
  );
}
function le(e, n, t) {
  const r = e.visibleEndMs - e.visibleStartMs;
  return r <= 0 || t <= 0 ? 0 : (n - e.visibleStartMs) / r * t;
}
function Ae(e, n) {
  const t = new Date(e);
  return n === "century" ? `${Math.floor(t.getUTCFullYear() / 100) * 100}s` : n === "decade" ? `${Math.floor(t.getUTCFullYear() / 10) * 10}s` : n === "year" ? String(t.getUTCFullYear()) : n === "quarter" ? `Q${Math.floor(t.getUTCMonth() / 3) + 1} ${t.getUTCFullYear()}` : n === "month" ? t.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  }) : n === "week" ? t.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }) : t.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  });
}
function xt(e) {
  const n = e.zoomUnit, t = pt[n], r = e.visibleEndMs, o = [];
  let a = Se(e.visibleStartMs, n);
  for (; a <= r; )
    o.push({
      key: `major-${n}-${a}`,
      ts: a,
      label: Ae(a, n),
      kind: "major"
    }), a = he(a, n, 1);
  const c = [];
  if (t) {
    let m = Se(e.visibleStartMs, t);
    for (; m <= r; )
      o.some((h) => h.ts === m) || c.push({
        key: `minor-${t}-${m}`,
        ts: m,
        label: Ae(m, t),
        kind: "minor"
      }), m = he(m, t, 1);
  }
  return { majorTicks: o, minorTicks: c };
}
const gt = /^[+-]?\d{1,6}$/, Tt = /^([+-]?\d{1,6})-(\d{2})$/, yt = /^([+-]?\d{1,6})-(\d{2})-(\d{2})(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})?)?$/, Fe = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function Ne(e) {
  return e < 0 ? `${Math.abs(e)}BC` : e === 0 ? "1BC" : `${e}`;
}
function me(e) {
  if (!e)
    return;
  if (e instanceof Date)
    return e.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC"
    });
  const n = e.trim();
  if (!n)
    return;
  if (gt.test(n))
    return Ne(Number(n));
  const t = n.match(Tt);
  if (t) {
    const o = Number(t[1]), a = Number(t[2]);
    if (a >= 1 && a <= 12)
      return `${Fe[a - 1]} ${Ne(o)}`;
  }
  const r = n.match(yt);
  if (r) {
    const o = Number(r[1]), a = Number(r[2]), c = Number(r[3]);
    if (a >= 1 && a <= 12 && c >= 1 && c <= 31)
      return `${Fe[a - 1]} ${c}, ${Ne(o)}`;
  }
  return n;
}
function Ze(e) {
  return !e.isRange || !e.displayEndLabel || e.displayStartLabel === e.displayEndLabel ? e.displayStartLabel : `${e.displayStartLabel} - ${e.displayEndLabel}`;
}
function Et(e) {
  return e !== null;
}
function wt(e) {
  return e.map((t) => {
    const r = q(t.placementStart ?? t.start), o = q(t.placementEnd ?? t.end), a = me(t.displayStart) ?? me(t.start), c = me(t.displayEnd) ?? me(t.end);
    if (r === null)
      return null;
    const m = o ?? r;
    return m < r || !a ? null : {
      id: t.id,
      title: t.title,
      startMs: r,
      endMs: m,
      displayStartLabel: a,
      displayEndLabel: c,
      isRange: m > r,
      allDay: !!t.allDay,
      description: t.description,
      groupId: t.groupId,
      color: t.color,
      icon: t.icon,
      importance: t.importance ?? 0,
      media: t.media,
      attachments: t.attachments,
      geo: t.geo,
      metadata: t.metadata
    };
  }).filter(Et).sort((t, r) => t.startMs !== r.startMs ? t.startMs - r.startMs : t.importance !== r.importance ? r.importance - t.importance : t.title.localeCompare(r.title));
}
var pe = { exports: {} }, se = {};
var ze;
function Nt() {
  if (ze) return se;
  ze = 1;
  var e = /* @__PURE__ */ Symbol.for("react.transitional.element"), n = /* @__PURE__ */ Symbol.for("react.fragment");
  function t(r, o, a) {
    var c = null;
    if (a !== void 0 && (c = "" + a), o.key !== void 0 && (c = "" + o.key), "key" in o) {
      a = {};
      for (var m in o)
        m !== "key" && (a[m] = o[m]);
    } else a = o;
    return o = a.ref, {
      $$typeof: e,
      type: r,
      key: c,
      ref: o !== void 0 ? o : null,
      props: a
    };
  }
  return se.Fragment = n, se.jsx = t, se.jsxs = t, se;
}
var oe = {};
var Be;
function jt() {
  return Be || (Be = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(i) {
      if (i == null) return null;
      if (typeof i == "function")
        return i.$$typeof === T ? null : i.displayName || i.name || null;
      if (typeof i == "string") return i;
      switch (i) {
        case Y:
          return "Fragment";
        case D:
          return "Profiler";
        case _:
          return "StrictMode";
        case u:
          return "Suspense";
        case L:
          return "SuspenseList";
        case d:
          return "Activity";
      }
      if (typeof i == "object")
        switch (typeof i.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), i.$$typeof) {
          case x:
            return "Portal";
          case ee:
            return i.displayName || "Context";
          case g:
            return (i._context.displayName || "Context") + ".Consumer";
          case B:
            var b = i.render;
            return i = i.displayName, i || (i = b.displayName || b.name || "", i = i !== "" ? "ForwardRef(" + i + ")" : "ForwardRef"), i;
          case I:
            return b = i.displayName || null, b !== null ? b : e(i.type) || "Memo";
          case U:
            b = i._payload, i = i._init;
            try {
              return e(i(b));
            } catch {
            }
        }
      return null;
    }
    function n(i) {
      return "" + i;
    }
    function t(i) {
      try {
        n(i);
        var b = !1;
      } catch {
        b = !0;
      }
      if (b) {
        b = console;
        var N = b.error, v = typeof Symbol == "function" && Symbol.toStringTag && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return N.call(
          b,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          v
        ), n(i);
      }
    }
    function r(i) {
      if (i === Y) return "<>";
      if (typeof i == "object" && i !== null && i.$$typeof === U)
        return "<...>";
      try {
        var b = e(i);
        return b ? "<" + b + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function o() {
      var i = E.A;
      return i === null ? null : i.getOwner();
    }
    function a() {
      return Error("react-stack-top-frame");
    }
    function c(i) {
      if (O.call(i, "key")) {
        var b = Object.getOwnPropertyDescriptor(i, "key").get;
        if (b && b.isReactWarning) return !1;
      }
      return i.key !== void 0;
    }
    function m(i, b) {
      function N() {
        H || (H = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          b
        ));
      }
      N.isReactWarning = !0, Object.defineProperty(i, "key", {
        get: N,
        configurable: !0
      });
    }
    function f() {
      var i = e(this.type);
      return R[i] || (R[i] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), i = this.props.ref, i !== void 0 ? i : null;
    }
    function h(i, b, N, v, y, ne) {
      var C = N.ref;
      return i = {
        $$typeof: P,
        type: i,
        key: b,
        props: N,
        _owner: v
      }, (C !== void 0 ? C : null) !== null ? Object.defineProperty(i, "ref", {
        enumerable: !1,
        get: f
      }) : Object.defineProperty(i, "ref", { enumerable: !1, value: null }), i._store = {}, Object.defineProperty(i._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(i, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(i, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: y
      }), Object.defineProperty(i, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ne
      }), Object.freeze && (Object.freeze(i.props), Object.freeze(i)), i;
    }
    function M(i, b, N, v, y, ne) {
      var C = b.children;
      if (C !== void 0)
        if (v)
          if (p(C)) {
            for (v = 0; v < C.length; v++)
              k(C[v]);
            Object.freeze && Object.freeze(C);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else k(C);
      if (O.call(b, "key")) {
        C = e(i);
        var G = Object.keys(b).filter(function(be) {
          return be !== "key";
        });
        v = 0 < G.length ? "{key: someKey, " + G.join(": ..., ") + ": ...}" : "{key: someKey}", te[C + v] || (G = 0 < G.length ? "{" + G.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          v,
          C,
          G,
          C
        ), te[C + v] = !0);
      }
      if (C = null, N !== void 0 && (t(N), C = "" + N), c(b) && (t(b.key), C = "" + b.key), "key" in b) {
        N = {};
        for (var re in b)
          re !== "key" && (N[re] = b[re]);
      } else N = b;
      return C && m(
        N,
        typeof i == "function" ? i.displayName || i.name || "Unknown" : i
      ), h(
        i,
        C,
        N,
        o(),
        y,
        ne
      );
    }
    function k(i) {
      S(i) ? i._store && (i._store.validated = 1) : typeof i == "object" && i !== null && i.$$typeof === U && (i._payload.status === "fulfilled" ? S(i._payload.value) && i._payload.value._store && (i._payload.value._store.validated = 1) : i._store && (i._store.validated = 1));
    }
    function S(i) {
      return typeof i == "object" && i !== null && i.$$typeof === P;
    }
    var z = ft, P = /* @__PURE__ */ Symbol.for("react.transitional.element"), x = /* @__PURE__ */ Symbol.for("react.portal"), Y = /* @__PURE__ */ Symbol.for("react.fragment"), _ = /* @__PURE__ */ Symbol.for("react.strict_mode"), D = /* @__PURE__ */ Symbol.for("react.profiler"), g = /* @__PURE__ */ Symbol.for("react.consumer"), ee = /* @__PURE__ */ Symbol.for("react.context"), B = /* @__PURE__ */ Symbol.for("react.forward_ref"), u = /* @__PURE__ */ Symbol.for("react.suspense"), L = /* @__PURE__ */ Symbol.for("react.suspense_list"), I = /* @__PURE__ */ Symbol.for("react.memo"), U = /* @__PURE__ */ Symbol.for("react.lazy"), d = /* @__PURE__ */ Symbol.for("react.activity"), T = /* @__PURE__ */ Symbol.for("react.client.reference"), E = z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = Object.prototype.hasOwnProperty, p = Array.isArray, A = console.createTask ? console.createTask : function() {
      return null;
    };
    z = {
      react_stack_bottom_frame: function(i) {
        return i();
      }
    };
    var H, R = {}, W = z.react_stack_bottom_frame.bind(
      z,
      a
    )(), j = A(r(a)), te = {};
    oe.Fragment = Y, oe.jsx = function(i, b, N) {
      var v = 1e4 > E.recentlyCreatedOwnerStacks++;
      return M(
        i,
        b,
        N,
        !1,
        v ? Error("react-stack-top-frame") : W,
        v ? A(r(i)) : j
      );
    }, oe.jsxs = function(i, b, N) {
      var v = 1e4 > E.recentlyCreatedOwnerStacks++;
      return M(
        i,
        b,
        N,
        !0,
        v ? Error("react-stack-top-frame") : W,
        v ? A(r(i)) : j
      );
    };
  })()), oe;
}
var He;
function kt() {
  return He || (He = 1, process.env.NODE_ENV === "production" ? pe.exports = Nt() : pe.exports = jt()), pe.exports;
}
var s = kt();
function We(e) {
  const n = q(e.startBound), t = q(e.endBound), r = q(e.initialStart), o = q(e.initialEnd);
  if (r !== null && o !== null && o > r)
    return ae(
      {
        visibleStartMs: r,
        visibleEndMs: o,
        zoomUnit: e.initialZoomUnit
      },
      n,
      t
    );
  const a = q(e.initialCenter) ?? (e.events.length ? e.events[0].startMs : null) ?? n ?? Date.now();
  return ae(
    Ce(a, e.initialZoomUnit, e.viewportHeight, e.unitHeight),
    n,
    t
  );
}
function St(e) {
  const n = !!e.viewport, [t, r] = Q(
    () => We(e)
  );
  K(() => {
    e.viewport || r(We(e));
  }, []), K(() => {
    n || r((c) => {
      const m = c.visibleStartMs + (c.visibleEndMs - c.visibleStartMs) / 2, f = ae(
        Ce(m, c.zoomUnit, e.viewportHeight, e.unitHeight),
        q(e.startBound),
        q(e.endBound)
      );
      return f.visibleStartMs === c.visibleStartMs && f.visibleEndMs === c.visibleEndMs && f.zoomUnit === c.zoomUnit ? c : f;
    });
  }, [
    n,
    e.viewportHeight,
    e.unitHeight,
    e.startBound,
    e.endBound
  ]);
  const o = e.viewport ?? t;
  function a(c) {
    n || r(c), e.onViewportChange?.(c);
  }
  return {
    viewport: o,
    setViewport: a,
    startBoundMs: q(e.startBound),
    endBoundMs: q(e.endBound)
  };
}
function Ct({
  containerWidth: e
}) {
  return mt(() => e < 768 ? {
    mode: "mobile",
    showMiniMap: !0,
    showMajorTicks: !0,
    showMajorLabels: !0,
    showMinorTicks: !1,
    showMinorLabels: !1,
    cardWidth: 184,
    cardMaxWidth: 204,
    stackOffset: 44,
    labelShift: 8,
    axisWidth: 76,
    axisOffset: -30,
    clusterLaneLimit: 1,
    miniMapWidth: 18,
    detailPanelMode: "sheet",
    clusterRevealMode: "sheet"
  } : e < 1200 ? {
    mode: "tablet",
    showMiniMap: !0,
    showMajorTicks: !0,
    showMajorLabels: !0,
    showMinorTicks: !0,
    showMinorLabels: !0,
    cardWidth: 240,
    cardMaxWidth: 260,
    stackOffset: 180,
    labelShift: 24,
    axisWidth: 104,
    axisOffset: -48,
    clusterLaneLimit: 2,
    miniMapWidth: 108,
    detailPanelMode: "drawer",
    clusterRevealMode: "popover"
  } : {
    mode: "desktop",
    showMiniMap: !0,
    showMajorTicks: !0,
    showMajorLabels: !0,
    showMinorTicks: !0,
    showMinorLabels: !0,
    cardWidth: 236,
    cardMaxWidth: 248,
    stackOffset: 104,
    labelShift: 62,
    axisWidth: 136,
    axisOffset: -70,
    clusterLaneLimit: 3,
    miniMapWidth: 136,
    detailPanelMode: "drawer",
    clusterRevealMode: "popover"
  }, [e]);
}
function Rt({
  viewport: e,
  majorTicks: n,
  minorTicks: t,
  height: r,
  showMajorTicks: o = !0,
  showMajorLabels: a = !0,
  showMinorTicks: c = !0,
  showMinorLabels: m = !0
}) {
  return /* @__PURE__ */ s.jsxs("div", { className: "tl-axis", children: [
    /* @__PURE__ */ s.jsx("div", { className: "tl-axis-line" }),
    o || a ? n.map((f) => {
      const h = le(e, f.ts, r);
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "tl-tick tl-tick-major",
          style: { top: h },
          children: [
            o ? /* @__PURE__ */ s.jsx("div", { className: "tl-tick-mark" }) : null,
            a ? /* @__PURE__ */ s.jsx("div", { className: "tl-tick-label", children: /* @__PURE__ */ s.jsx("span", { className: "tl-tick-label-major", children: f.label }) }) : null
          ]
        },
        f.key
      );
    }) : null,
    c || m ? t.map((f) => {
      const h = le(e, f.ts, r);
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "tl-tick tl-tick-minor",
          style: { top: h },
          children: [
            c ? /* @__PURE__ */ s.jsx("div", { className: "tl-tick-mark" }) : null,
            m ? /* @__PURE__ */ s.jsx("div", { className: "tl-tick-label tl-tick-label-minor", children: f.label }) : null
          ]
        },
        f.key
      );
    }) : null
  ] });
}
const _t = /^(?:\d+|\d+AD|\d+BC|1BC)$/;
function Ot(e) {
  if (_t.test(e.displayStartLabel))
    return e.displayStartLabel;
  const n = e.metadata?.originalYearNum;
  if (typeof n == "number" && Number.isFinite(n)) {
    const r = Math.trunc(n);
    if (r < 0)
      return `${Math.abs(r)}BC`;
    if (r > 0)
      return `${r}AD`;
  }
  const t = new Date(e.startMs).getUTCFullYear();
  return t < 0 ? `${Math.abs(t) + 1}BC` : t === 0 ? "1BC" : `${t}AD`;
}
function $t({ event: e, isActive: n = !1, onClick: t }) {
  const r = Ot(e);
  return /* @__PURE__ */ s.jsx(
    "button",
    {
      type: "button",
      className: `tl-event-card${n ? " tl-event-card-active" : ""}`,
      style: e.color ? { "--tl-event-accent": e.color } : void 0,
      onClick: () => t?.(e),
      children: /* @__PURE__ */ s.jsxs("div", { className: "tl-event-title", children: [
        "(",
        r,
        ") ",
        e.title
      ] })
    }
  );
}
const Ve = 52, Ge = 12, Dt = 26, je = 10;
function Ut(e, n) {
  return e.filter(
    (t) => t.endMs >= n.visibleStartMs && t.startMs <= n.visibleEndMs
  );
}
function Xe(e) {
  return e.groupId?.trim() || "Ungrouped";
}
function Lt(e) {
  return Array.from(new Set(e.map(Xe))).map((t, r) => ({ id: t, label: t, lane: r }));
}
function Pt(e, n, t, r, o, a) {
  const c = [];
  for (const f of o) {
    const h = Ut(e, n).filter((M) => a ? !0 : Xe(M) === f.id).map((M) => ({
      event: M,
      y: le(n, M.startMs, t)
    })).sort((M, k) => M.y - k.y || k.event.importance - M.event.importance);
    for (const M of h) {
      const k = c[c.length - 1];
      if (k && k.groupId === f.id && Math.abs(k.y - M.y) <= 18) {
        k.events.push(M.event), k.y = Math.round((k.y + M.y) / 2);
        continue;
      }
      c.push({
        key: `cluster-${f.id}-${M.event.id}-${M.y}`,
        y: M.y,
        groupId: f.id,
        groupLane: f.lane,
        events: [M.event],
        visibleEvents: [],
        hiddenCount: 0
      });
    }
  }
  for (const f of c)
    f.events.sort((h, M) => h.importance !== M.importance ? M.importance - h.importance : h.startMs !== M.startMs ? h.startMs - M.startMs : h.title.localeCompare(M.title)), f.visibleEvents = f.events.slice(0, r), f.hiddenCount = Math.max(0, f.events.length - r);
  return c;
}
function Yt(e) {
  return e.map((n) => {
    const t = /* @__PURE__ */ new Map();
    return n.visibleEvents.forEach((r, o) => {
      t.set(r.id, { side: "right", lane: o });
    }), {
      cluster: n,
      placements: t,
      badgeSide: "right",
      badgeLane: n.visibleEvents.length
    };
  });
}
function It({
  events: e,
  viewport: n,
  height: t,
  laneLimit: r,
  collapseGroups: o = !1,
  renderEvent: a,
  onEventClick: c
}) {
  const m = J(null), f = J({}), h = J({}), M = J({}), [k, S] = Q({}), [z, P] = Q({}), [x, Y] = Q(null), [_, D] = Q(null), g = o ? [{ id: "__all__", label: "All", lane: 0 }] : Lt(e), ee = Pt(e, n, t, r, g, o), B = Yt(ee);
  return K(() => {
    x && !B.some(({ cluster: u }) => u.key === x) && Y(null);
  }, [B, x]), K(() => {
    _ && !B.some(({ cluster: u }) => u.events.some((L) => L.id === _)) && D(null);
  }, [_, B]), K(() => {
    if (!x)
      return;
    const u = x;
    function L(U) {
      const d = U.target, T = h.current[u];
      T && d && !T.contains(d) && Y(null);
    }
    function I(U) {
      U.key === "Escape" && Y(null);
    }
    return document.addEventListener("pointerdown", L), document.addEventListener("keydown", I), () => {
      document.removeEventListener("pointerdown", L), document.removeEventListener("keydown", I);
    };
  }, [x]), ke(() => {
    const u = m.current;
    if (!u)
      return;
    const L = 12, I = u.clientHeight, U = {};
    for (const { cluster: d } of B) {
      const T = f.current[d.key];
      if (!T) {
        U[d.key] = 0;
        continue;
      }
      const O = T.offsetHeight / 2, p = d.y - O, A = d.y + O, H = L - p, R = I - L - A;
      let W = 0;
      A > I - L && (W = R), W < H && (W = H), U[d.key] = Math.round(W);
    }
    S((d) => {
      const T = Object.keys(d), E = Object.keys(U);
      return T.length !== E.length || E.some((p) => d[p] !== U[p]) ? U : d;
    });
  }, [B, t, x]), ke(() => {
    if (!x) {
      P((R) => Object.keys(R).length ? {} : R);
      return;
    }
    const u = m.current, L = h.current[x], I = M.current[x];
    if (!u || !L || !I)
      return;
    const U = 12, d = u.clientHeight, T = L.offsetTop + I.offsetTop, E = T + I.offsetHeight;
    let O = 0;
    const p = E - (d - U);
    p > 0 && (O -= p);
    const A = U - (T + O);
    A > 0 && (O += A);
    const H = Math.round(O);
    P((R) => R[x] === H && Object.keys(R).length === 1 ? R : { [x]: H });
  }, [x, B, t]), /* @__PURE__ */ s.jsxs("div", { ref: m, className: "tl-event-layer", children: [
    /* @__PURE__ */ s.jsx("div", { className: "tl-group-lanes", "aria-hidden": "true", children: g.map((u) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "tl-group-lane",
        style: {
          left: `calc(${u.lane} * (100% / ${g.length}))`,
          width: `calc(100% / ${g.length})`
        },
        children: /* @__PURE__ */ s.jsx("div", { className: "tl-group-lane-label", children: u.label })
      },
      u.id
    )) }),
    B.map(({ cluster: u, placements: L, badgeSide: I, badgeLane: U }) => {
      const d = u.visibleEvents[0], T = u.events.some((p) => p.id === _), E = u.visibleEvents.length > 1, O = {
        top: u.y + (k[u.key] ?? 0),
        left: `calc(${u.groupLane} * (100% / ${g.length}))`,
        width: `calc(100% / ${g.length})`,
        height: Ve + Math.max(0, u.visibleEvents.length - 1) * je + (u.hiddenCount > 0 ? Ge + Dt : 0),
        zIndex: T ? 350 : x === u.key ? 300 : u.events.length > 1 ? 200 : 10,
        ...d?.color ? { "--tl-event-accent": d.color } : {}
      };
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          ref: (p) => {
            f.current[u.key] = p;
          },
          className: "tl-cluster",
          style: O,
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "tl-cluster-anchor", children: [
              /* @__PURE__ */ s.jsx("div", { className: "tl-point-marker" }),
              /* @__PURE__ */ s.jsx("div", { className: "tl-leader-line" })
            ] }),
            u.visibleEvents.map((p) => {
              const A = L.get(p.id), H = le(n, p.startMs, t), R = le(n, p.endMs, t), W = p.id === _, j = E ? A.lane + 1 : A.lane;
              return /* @__PURE__ */ s.jsxs(
                "div",
                {
                  className: `tl-cluster-item tl-cluster-item-${A.side}`,
                  style: {
                    top: `${j * je}px`,
                    left: `calc(${j} * var(--tl-card-stack-offset))`,
                    zIndex: W ? u.visibleEvents.length + r + 1 : u.visibleEvents.length - A.lane
                  },
                  children: [
                    p.isRange ? /* @__PURE__ */ s.jsx(
                      "div",
                      {
                        className: "tl-range-bar",
                        style: {
                          top: Math.min(H, R) - u.y,
                          height: Math.max(10, Math.abs(R - H))
                        }
                      }
                    ) : null,
                    a ? /* @__PURE__ */ s.jsx(
                      "div",
                      {
                        onClick: () => {
                          D(p.id), c?.(p);
                        },
                        children: a(p)
                      }
                    ) : /* @__PURE__ */ s.jsx(
                      $t,
                      {
                        event: p,
                        isActive: W,
                        onClick: (te) => {
                          D(te.id), c?.(te);
                        }
                      }
                    )
                  ]
                },
                p.id
              );
            }),
            u.hiddenCount > 0 ? /* @__PURE__ */ s.jsxs(
              "div",
              {
                ref: (p) => {
                  h.current[u.key] = p;
                },
                className: "tl-cluster-overlay",
                style: {
                  top: `${Ve + (E ? u.visibleEvents.length : Math.max(0, u.visibleEvents.length - 1)) * je + Ge}px`,
                  left: `calc(${E ? u.visibleEvents.length : Math.max(0, u.visibleEvents.length - 1)} * var(--tl-card-stack-offset))`
                },
                children: [
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `tl-cluster-badge tl-cluster-badge-${I}`,
                      "aria-expanded": x === u.key,
                      onClick: () => Y((p) => p === u.key ? null : u.key),
                      children: [
                        "+",
                        u.hiddenCount,
                        " more"
                      ]
                    }
                  ),
                  x === u.key ? /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      ref: (p) => {
                        M.current[u.key] = p;
                      },
                      className: "tl-cluster-popover",
                      onWheel: (p) => {
                        p.stopPropagation();
                      },
                      style: {
                        transform: `translateY(${z[u.key] ?? 0}px)`
                      },
                      children: [
                        /* @__PURE__ */ s.jsxs("div", { className: "tl-cluster-popover-header", children: [
                          /* @__PURE__ */ s.jsx("span", { className: "tl-cluster-popover-title", children: "Cluster Events" }),
                          /* @__PURE__ */ s.jsxs("span", { className: "tl-cluster-popover-count", children: [
                            u.events.length,
                            " total"
                          ] })
                        ] }),
                        /* @__PURE__ */ s.jsx("div", { className: "tl-cluster-popover-list", children: u.events.map((p) => /* @__PURE__ */ s.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "tl-cluster-popover-item",
                            onClick: () => {
                              c?.(p), Y(null);
                            },
                            children: [
                              /* @__PURE__ */ s.jsx("span", { className: "tl-cluster-popover-item-title", children: p.title }),
                              /* @__PURE__ */ s.jsx("span", { className: "tl-cluster-popover-item-date", children: Ze(p) })
                            ]
                          },
                          p.id
                        )) })
                      ]
                    }
                  ) : null
                ]
              }
            ) : null
          ]
        },
        u.key
      );
    })
  ] });
}
function ce(e) {
  return Math.max(0, Math.min(1, e));
}
function qe(e, n, t, r) {
  const o = t - n;
  return o <= 0 || r <= 0 ? 0 : ce((e - n) / o) * r;
}
function At(e, n, t, r) {
  const o = Math.max(24, Math.min(120, Math.round(r / 4))), a = Array.from({ length: o }, () => 0), c = t - n;
  if (c <= 0 || r <= 0)
    return { bins: a, binCount: o, maxCount: 0 };
  for (const f of e) {
    const h = ce((f.startMs - n) / c), M = ce((f.endMs - n) / c), k = Math.max(0, Math.min(o - 1, Math.floor(h * (o - 1)))), S = Math.max(k, Math.min(o - 1, Math.ceil(M * (o - 1))));
    for (let z = k; z <= S; z += 1)
      a[z] += 1;
  }
  const m = a.reduce((f, h) => Math.max(f, h), 0);
  return { bins: a, binCount: o, maxCount: m };
}
function Ft(e) {
  const n = ce(e);
  return `color-mix(in srgb, var(--tl-color-minimap-density-low) ${(1 - n) * 100}%, var(--tl-color-minimap-density-high) ${n * 100}%)`;
}
function zt(e, n, t, r) {
  const o = r - t, a = n.visibleEndMs - n.visibleStartMs;
  if (o <= 0 || a <= 0)
    return n;
  const c = ce(e), m = t + c * o, f = Math.max(t, r - a), h = Math.min(
    Math.max(t, m - a / 2),
    f
  );
  return {
    ...n,
    visibleStartMs: h,
    visibleEndMs: h + a
  };
}
function Bt({
  events: e,
  viewport: n,
  height: t,
  domainStartMs: r,
  domainEndMs: o,
  variant: a = "default",
  onViewportChange: c
}) {
  const m = J(null), [f, h] = Q(null), [M, k] = Q(t);
  ke(() => {
    const d = m.current;
    if (!d)
      return;
    const T = () => {
      const O = d.clientHeight;
      O > 0 && k(O);
    };
    if (T(), typeof ResizeObserver > "u")
      return;
    const E = new ResizeObserver(() => T());
    return E.observe(d), () => E.disconnect();
  }, [t]);
  const S = M > 0 ? M : t, z = qe(n.visibleStartMs, r, o, S), P = qe(n.visibleEndMs, r, o, S), x = Math.max(18, P - z), Y = Math.min(
    Math.max(0, z),
    Math.max(0, S - x)
  ), _ = n.visibleEndMs - n.visibleStartMs, D = o - r;
  K(() => {
    if (!f)
      return;
    const d = f;
    function T(O) {
      if (!c || D <= _ || S <= x)
        return;
      const p = O.clientY - d.pointerStartY, A = Math.max(0, S - x), H = Math.max(0, Math.min(A, d.viewportTopStart + p)), R = A <= 0 ? 0 : H / A, W = r + R * (D - _), j = W + _;
      c({
        ...n,
        visibleStartMs: W,
        visibleEndMs: j
      });
    }
    function E() {
      h(null);
    }
    return window.addEventListener("pointermove", T), window.addEventListener("pointerup", E), window.addEventListener("pointercancel", E), () => {
      window.removeEventListener("pointermove", T), window.removeEventListener("pointerup", E), window.removeEventListener("pointercancel", E);
    };
  }, [
    f,
    D,
    r,
    S,
    c,
    n,
    _,
    x
  ]);
  const g = [r, (r + o) / 2, o].map(
    (d) => new Date(d).getUTCFullYear()
  ), { bins: ee, binCount: B, maxCount: u } = At(
    e,
    r,
    o,
    S
  ), L = B > 0 ? S / B : S, I = a === "nano";
  function U(d) {
    if (!c || S <= 0)
      return;
    const T = m.current?.getBoundingClientRect();
    if (!T || T.height <= 0)
      return;
    const E = (d - T.top) / T.height;
    c(zt(E, n, r, o));
  }
  return /* @__PURE__ */ s.jsxs("aside", { className: `tl-minimap${I ? " tl-minimap-nano" : ""}`, "aria-label": "Timeline overview", children: [
    I ? null : /* @__PURE__ */ s.jsxs("div", { className: "tl-minimap-header", children: [
      /* @__PURE__ */ s.jsx("span", { children: "Overview" }),
      /* @__PURE__ */ s.jsxs("span", { className: "tl-minimap-range", children: [
        new Date(r).getUTCFullYear(),
        " - ",
        new Date(o).getUTCFullYear()
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        ref: m,
        className: "tl-minimap-body",
        onPointerDown: (d) => {
          U(d.clientY);
        },
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "tl-minimap-track" }),
          /* @__PURE__ */ s.jsx("div", { className: "tl-minimap-density", children: ee.map((d, T) => {
            if (d <= 0 || u <= 0)
              return null;
            const E = d / u, O = T * L, p = Math.min(O, Math.max(0, S - L));
            return /* @__PURE__ */ s.jsx(
              "div",
              {
                className: "tl-minimap-density-bin",
                title: `${d} events`,
                style: {
                  top: p,
                  height: Math.max(3, L),
                  width: I ? "5px" : `${8 + E * 18}px`,
                  backgroundColor: Ft(E)
                }
              },
              `density-${T}`
            );
          }) }),
          /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "tl-minimap-viewport",
              onPointerDown: (d) => {
                d.preventDefault(), d.stopPropagation(), h({
                  pointerStartY: d.clientY,
                  viewportTopStart: Y
                });
              },
              style: {
                top: Y,
                height: x
              }
            }
          ),
          I ? null : g.map((d, T) => /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "tl-minimap-label",
              style: { top: `${T * 50}%` },
              children: d
            },
            `${d}-${T}`
          ))
        ]
      }
    )
  ] });
}
const Ht = 4, Wt = 1.07, Vt = 0.93;
function Gt(e) {
  if (e.type === "Point") {
    const [n, t] = e.coordinates;
    return `Point ${t.toFixed(4)}, ${n.toFixed(4)}`;
  }
  return e.type === "LineString" ? `LineString with ${e.coordinates.length} points` : `Polygon with ${e.coordinates.length} rings`;
}
function qt(e) {
  return e.replace(/[_-]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/\s+/g, " ").trim().replace(/\b\w/g, (n) => n.toUpperCase());
}
function Zt(e) {
  if (e == null)
    return null;
  if (typeof e == "string") {
    const n = e.trim();
    return n.length > 0 ? n : null;
  }
  return typeof e == "number" || typeof e == "boolean" ? String(e) : e instanceof Date ? e.toISOString() : null;
}
function Xt(e) {
  const n = [
    {
      label: "Type",
      value: e.isRange ? "Range event" : "Point event"
    }
  ];
  e.groupId?.trim() && n.push({
    label: "Group",
    value: e.groupId.trim()
  }), e.media?.length && n.push({
    label: "Media",
    value: String(e.media.length)
  }), e.attachments?.length && n.push({
    label: "Attachments",
    value: String(e.attachments.length)
  });
  for (const [t, r] of Object.entries(e.metadata ?? {})) {
    const o = Zt(r);
    o && n.push({
      label: qt(t),
      value: o
    });
  }
  return n;
}
function en({
  events: e,
  startBound: n,
  endBound: t,
  maxZoomUnit: r = "century",
  minZoomUnit: o = "day",
  initialZoomUnit: a = "year",
  initialStart: c,
  initialEnd: m,
  initialCenter: f,
  viewport: h,
  onViewportChange: M,
  renderEvent: k,
  renderDetail: S,
  onEventClick: z,
  detailMode: P = "slide",
  height: x = 800,
  unitHeight: Y = 100,
  clusterLaneLimit: _ = 3,
  display: D,
  theme: g,
  className: ee,
  style: B
}) {
  const u = wt(e), L = new Set(
    u.map((l) => l.groupId?.trim() || "Ungrouped")
  ).size, I = Mt(a, r, o), U = J(null), d = J(null), T = J(/* @__PURE__ */ new Map()), E = J(null), O = J(null), p = J(!1), [A, H] = Q(1200), [R, W] = Q(
    typeof x == "number" ? x : 800
  ), [j, te] = Q(null), [i, b] = Q(!1), N = Ct({ containerWidth: A }), v = {
    ...N,
    showMiniMap: D?.showMiniMap ?? N.showMiniMap,
    showMajorTicks: D?.showMajorTicks ?? N.showMajorTicks,
    showMajorLabels: D?.showMajorLabels ?? N.showMajorLabels,
    showMinorTicks: D?.showMinorTicks ?? N.showMinorTicks,
    showMinorLabels: D?.showMinorLabels ?? N.showMinorLabels,
    miniMapWidth: D?.miniMapWidth ?? N.miniMapWidth,
    clusterLaneLimit: D?.clusterLaneLimit ?? N.clusterLaneLimit
  }, { viewport: y, setViewport: ne, startBoundMs: C, endBoundMs: G } = St({
    events: u,
    startBound: n,
    endBound: t,
    maxZoomUnit: r,
    minZoomUnit: o,
    initialZoomUnit: I,
    viewportHeight: R,
    unitHeight: Y,
    initialStart: c,
    initialEnd: m,
    initialCenter: f,
    viewport: h,
    onViewportChange: M
  });
  K(() => {
    const l = U.current;
    if (!l || ((() => {
      const $ = l.clientWidth, F = typeof x == "number" ? x : l.clientHeight;
      $ > 0 && H($), typeof F == "number" && F > 0 && W(F);
    })(), typeof ResizeObserver > "u"))
      return;
    const V = new ResizeObserver(($) => {
      const F = $[0];
      F?.contentRect && (F.contentRect.width > 0 && H(F.contentRect.width), typeof x != "number" && F.contentRect.height > 0 && W(F.contentRect.height));
    });
    return V.observe(l), () => V.disconnect();
  }, [x]), K(() => () => {
    d.current !== null && window.clearTimeout(d.current);
  }, []), K(() => {
    P === "none" && (d.current !== null && (window.clearTimeout(d.current), d.current = null), b(!1), te(null));
  }, [P]), K(() => {
    if (!j)
      return;
    u.some((w) => w.id === j.id) || (d.current !== null && (window.clearTimeout(d.current), d.current = null), b(!1), te(null));
  }, [j, u]), K(() => {
    if (!j)
      return;
    const l = requestAnimationFrame(() => {
      b(!0);
    });
    function w(V) {
      V.key === "Escape" && ve();
    }
    return document.addEventListener("keydown", w), () => {
      cancelAnimationFrame(l), document.removeEventListener("keydown", w);
    };
  }, [j]);
  const re = xt(y), be = Math.min(
    D?.clusterLaneLimit ?? _,
    v.clusterLaneLimit
  ), Re = j ? Xt(j) : [], _e = v.mode === "mobile" && L > 2, Je = y.visibleEndMs - y.visibleStartMs, Ke = C !== null && Math.abs(y.visibleStartMs - C) < 1, Qe = G !== null && Math.abs(y.visibleEndMs - G) < 1;
  function Oe(l) {
    const w = l === "in" ? ye(y.zoomUnit, o) : Ee(y.zoomUnit, r), V = y.visibleStartMs + (y.visibleEndMs - y.visibleStartMs) / 2;
    ne(
      we(y, w, V, R, Y, C, G)
    );
  }
  function et(l) {
    if (l.ctrlKey || l.metaKey) {
      l.preventDefault();
      const F = l.currentTarget.getBoundingClientRect(), ue = F.height > 0 ? (l.clientY - F.top) / F.height : 0.5, de = y.visibleStartMs + (y.visibleEndMs - y.visibleStartMs) * ue, ie = l.deltaY > 0 ? Ee(y.zoomUnit, r) : ye(y.zoomUnit, o);
      ne(
        we(
          y,
          ie,
          de,
          R,
          Y,
          C,
          G
        )
      );
      return;
    }
    const w = Math.sign(l.deltaY);
    if (w < 0 && Ke || w > 0 && Qe)
      return;
    l.preventDefault();
    const V = l.deltaY / Math.max(R, 1), $ = Math.max(-0.16, Math.min(0.16, V));
    Je <= 0 || $ === 0 || ne(Ie(y, $, C, G));
  }
  function Me() {
    const l = Array.from(T.current.entries()).filter(
      ([, w]) => w.pointerType === "touch"
    );
    return l.length >= 2 ? l.slice(0, 2) : null;
  }
  function tt(l) {
    if (l.pointerType !== "touch" && l.pointerType !== "pen")
      return;
    T.current.set(l.pointerId, {
      clientX: l.clientX,
      clientY: l.clientY,
      pointerType: l.pointerType
    });
    const w = Me();
    if (w) {
      const [, V] = w[0], [, $] = w[1];
      O.current = {
        distance: Math.hypot(
          $.clientX - V.clientX,
          $.clientY - V.clientY
        ),
        viewport: {
          visibleStartMs: y.visibleStartMs,
          visibleEndMs: y.visibleEndMs,
          zoomUnit: y.zoomUnit
        }
      }, E.current = null, p.current = !0, l.preventDefault();
      return;
    }
    l.isPrimary && (E.current = {
      pointerId: l.pointerId,
      startY: l.clientY,
      startViewport: {
        visibleStartMs: y.visibleStartMs,
        visibleEndMs: y.visibleEndMs
      },
      moved: !1
    }, l.currentTarget.setPointerCapture(l.pointerId));
  }
  function nt(l) {
    const w = T.current.get(l.pointerId);
    w && (w.clientX = l.clientX, w.clientY = l.clientY);
    const V = Me(), $ = O.current;
    if (V && $) {
      const [, ie] = V[0], [, xe] = V[1], ge = Math.hypot(
        xe.clientX - ie.clientX,
        xe.clientY - ie.clientY
      );
      if (ge > 0 && $.distance > 0) {
        const Pe = ge / $.distance, Te = l.currentTarget.getBoundingClientRect(), ct = (ie.clientY + xe.clientY) / 2, ut = Te.height > 0 ? (ct - Te.top) / Te.height : 0.5, dt = $.viewport.visibleStartMs + ($.viewport.visibleEndMs - $.viewport.visibleStartMs) * ut;
        let fe = $.viewport.zoomUnit;
        if (Pe >= Wt ? fe = ye($.viewport.zoomUnit, o) : Pe <= Vt && (fe = Ee($.viewport.zoomUnit, r)), fe !== $.viewport.zoomUnit) {
          const Ye = we(
            {
              visibleStartMs: $.viewport.visibleStartMs,
              visibleEndMs: $.viewport.visibleEndMs,
              zoomUnit: $.viewport.zoomUnit
            },
            fe,
            dt,
            R,
            Y,
            C,
            G
          );
          ne(Ye), O.current = {
            distance: ge,
            viewport: Ye
          };
        }
      }
      p.current = !0, l.preventDefault();
      return;
    }
    const F = E.current;
    if (!F || F.pointerId !== l.pointerId)
      return;
    const ue = l.clientY - F.startY;
    Math.abs(ue) > Ht && (F.moved = !0, p.current = !0);
    const de = -ue / Math.max(R, 1);
    de !== 0 && (l.preventDefault(), ne(
      Ie(
        {
          visibleStartMs: F.startViewport.visibleStartMs,
          visibleEndMs: F.startViewport.visibleEndMs,
          zoomUnit: y.zoomUnit
        },
        de,
        C,
        G
      )
    ));
  }
  function $e(l) {
    T.current.delete(l.pointerId);
    const w = E.current;
    w && w.pointerId === l.pointerId && (l.currentTarget.hasPointerCapture(l.pointerId) && l.currentTarget.releasePointerCapture(l.pointerId), E.current = null), Me() || (O.current = null);
  }
  function rt(l) {
    p.current && (p.current = !1, l.preventDefault(), l.stopPropagation());
  }
  const it = {
    ...B,
    height: x,
    "--tl-axis-width": `${g?.axisWidth ?? v.axisWidth}px`,
    "--tl-axis-offset": `${g?.axisOffset ?? v.axisOffset}px`,
    "--tl-card-width": `${g?.cardWidth ?? v.cardWidth}px`,
    "--tl-card-max-width": `${g?.cardMaxWidth ?? v.cardMaxWidth}px`,
    "--tl-card-stack-offset": `${g?.stackOffset ?? v.stackOffset}px`,
    "--tl-label-shift": `${g?.labelShift ?? v.labelShift}px`,
    "--tl-minimap-width": `${v.miniMapWidth}px`,
    "--tl-color-axis": g?.axisColor,
    "--tl-color-major-tick": g?.majorTickColor,
    "--tl-color-minor-tick": g?.minorTickColor,
    "--tl-label-pill-bg": g?.labelPillBg,
    "--tl-label-pill-text": g?.labelPillText,
    "--tl-color-event-card-bg": g?.eventCardBg,
    "--tl-color-event-card-text": g?.eventCardText,
    "--tl-color-event-card-border": g?.eventCardBorder,
    "--tl-color-event-card-hover-bg": g?.eventCardHoverBg,
    "--tl-color-event-card-active-border": g?.eventCardActiveBorder,
    "--tl-color-minimap-bg": g?.miniMapBg,
    "--tl-color-minimap-border": g?.miniMapBorder,
    "--tl-color-minimap-track": g?.miniMapTrackColor,
    "--tl-color-minimap-viewport-border": g?.miniMapViewportBorder,
    "--tl-color-minimap-viewport-bg": g?.miniMapViewportBg,
    "--tl-color-minimap-density-low": g?.miniMapDensityLow,
    "--tl-color-minimap-density-high": g?.miniMapDensityHigh
  }, De = q(n) !== null || q(t) !== null ? `${n ? new Date(q(n)).getUTCFullYear() : "..."} - ${t ? new Date(q(t)).getUTCFullYear() : "..."}` : null, Ue = C ?? u.reduce((l, w) => Math.min(l, w.startMs), Number.POSITIVE_INFINITY), Le = G ?? u.reduce((l, w) => Math.max(l, w.endMs), Number.NEGATIVE_INFINITY), st = Number.isFinite(Ue) ? Ue : y.visibleStartMs, ot = Number.isFinite(Le) ? Le : y.visibleEndMs, at = P !== "none" && j !== null;
  function lt(l) {
    P !== "none" && (d.current !== null && (window.clearTimeout(d.current), d.current = null), te(l), b(!1)), z?.(l);
  }
  function ve() {
    d.current !== null && window.clearTimeout(d.current), b(!1), d.current = window.setTimeout(() => {
      te(null), d.current = null;
    }, 220);
  }
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: U,
      className: `tl-root tl-mode-${v.mode}${v.showMiniMap ? "" : " tl-hide-minimap"}${_e ? " tl-mobile-collapsed-groups" : ""}${ee ? ` ${ee}` : ""}`,
      "data-layout-mode": v.mode,
      style: it,
      onWheel: et,
      onPointerDown: tt,
      onPointerMove: nt,
      onPointerUp: $e,
      onPointerCancel: $e,
      onClickCapture: rt,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "tl-controls", children: [
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "tl-control-button", onClick: () => Oe("out"), children: "-" }),
          /* @__PURE__ */ s.jsxs("div", { className: "tl-zoom-readout", children: [
            /* @__PURE__ */ s.jsx("span", { className: "tl-zoom-unit", children: y.zoomUnit }),
            De ? /* @__PURE__ */ s.jsx("span", { className: "tl-bounds", children: De }) : null
          ] }),
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "tl-control-button", onClick: () => Oe("in"), children: "+" })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "tl-surface", children: [
          /* @__PURE__ */ s.jsx(
            Rt,
            {
              viewport: y,
              majorTicks: re.majorTicks,
              minorTicks: re.minorTicks,
              height: R,
              showMajorTicks: v.showMajorTicks,
              showMajorLabels: v.showMajorLabels,
              showMinorTicks: v.showMinorTicks,
              showMinorLabels: v.showMinorLabels
            }
          ),
          /* @__PURE__ */ s.jsx(
            It,
            {
              events: u,
              viewport: y,
              height: R,
              laneLimit: be,
              collapseGroups: _e,
              renderEvent: k,
              onEventClick: lt
            }
          ),
          v.showMiniMap ? /* @__PURE__ */ s.jsx(
            Bt,
            {
              events: u,
              viewport: y,
              height: R,
              domainStartMs: st,
              domainEndMs: ot,
              variant: v.mode === "mobile" ? "nano" : "default",
              onViewportChange: ne
            }
          ) : null
        ] }),
        at ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
          /* @__PURE__ */ s.jsx(
            "div",
            {
              className: `tl-detail-backdrop${P === "modal" ? " tl-detail-backdrop-visible" : " tl-detail-backdrop-soft"}${i ? " tl-detail-backdrop-open" : ""}`,
              onClick: ve
            }
          ),
          /* @__PURE__ */ s.jsxs(
            "aside",
            {
              className: `tl-detail-surface tl-detail-surface-${P}${i ? " tl-detail-surface-open" : ""}`,
              "aria-modal": P === "modal" ? "true" : void 0,
              role: P === "modal" ? "dialog" : "complementary",
              children: [
                /* @__PURE__ */ s.jsxs("div", { className: "tl-detail-header", children: [
                  /* @__PURE__ */ s.jsxs("div", { children: [
                    /* @__PURE__ */ s.jsx("p", { className: "tl-detail-eyebrow", children: "Event Detail" }),
                    /* @__PURE__ */ s.jsx("h2", { className: "tl-detail-title", children: j.title })
                  ] }),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: "tl-detail-close",
                      onClick: ve,
                      "aria-label": "Close event detail",
                      children: "×"
                    }
                  )
                ] }),
                S ? /* @__PURE__ */ s.jsx("div", { className: "tl-detail-body", children: S(j) }) : /* @__PURE__ */ s.jsxs("div", { className: "tl-detail-body", children: [
                  /* @__PURE__ */ s.jsx("p", { className: "tl-detail-date", children: Ze(j) }),
                  j.description ? /* @__PURE__ */ s.jsxs("section", { className: "tl-detail-section", children: [
                    /* @__PURE__ */ s.jsx("h3", { className: "tl-detail-section-title", children: "Summary" }),
                    /* @__PURE__ */ s.jsx("p", { className: "tl-detail-copy", children: j.description })
                  ] }) : null,
                  Re.length ? /* @__PURE__ */ s.jsxs("section", { className: "tl-detail-section", children: [
                    /* @__PURE__ */ s.jsx("h3", { className: "tl-detail-section-title", children: "Details" }),
                    /* @__PURE__ */ s.jsx("dl", { className: "tl-detail-grid", children: Re.map((l) => /* @__PURE__ */ s.jsxs("div", { children: [
                      /* @__PURE__ */ s.jsx("dt", { children: l.label }),
                      /* @__PURE__ */ s.jsx("dd", { children: l.value })
                    ] }, `${j.id}-${l.label}`)) })
                  ] }) : null,
                  j.geo ? /* @__PURE__ */ s.jsxs("section", { className: "tl-detail-section", children: [
                    /* @__PURE__ */ s.jsx("h3", { className: "tl-detail-section-title", children: "Location" }),
                    /* @__PURE__ */ s.jsxs("p", { className: "tl-detail-copy", children: [
                      j.geo.properties?.label ? `${String(j.geo.properties.label)} · ` : "",
                      Gt(j.geo.geometry)
                    ] })
                  ] }) : null,
                  j.media?.length ? /* @__PURE__ */ s.jsxs("section", { className: "tl-detail-section", children: [
                    /* @__PURE__ */ s.jsx("h3", { className: "tl-detail-section-title", children: "Media" }),
                    /* @__PURE__ */ s.jsx("ul", { className: "tl-detail-list", children: j.media.map((l, w) => /* @__PURE__ */ s.jsx("li", { children: /* @__PURE__ */ s.jsx("a", { href: l.url, target: "_blank", rel: "noreferrer", children: l.title ?? `${l.type} asset ${w + 1}` }) }, l.id ?? `${l.type}-${w}`)) })
                  ] }) : null,
                  j.attachments?.length ? /* @__PURE__ */ s.jsxs("section", { className: "tl-detail-section", children: [
                    /* @__PURE__ */ s.jsx("h3", { className: "tl-detail-section-title", children: "Attachments" }),
                    /* @__PURE__ */ s.jsx("ul", { className: "tl-detail-list", children: j.attachments.map((l, w) => /* @__PURE__ */ s.jsx("li", { children: /* @__PURE__ */ s.jsx("a", { href: l.url, target: "_blank", rel: "noreferrer", children: l.name }) }, l.id ?? `${l.name}-${w}`)) })
                  ] }) : null
                ] })
              ]
            }
          )
        ] }) : null
      ]
    }
  );
}
export {
  en as VerticalTimeline,
  he as addUnits,
  ae as clampViewportToBounds,
  Mt as clampZoomUnit,
  Qt as compareZoomUnits,
  Ce as createViewportAround,
  Ae as formatTickLabel,
  xt as generateTicks,
  vt as getVisibleUnitCount,
  Kt as getZoomUnits,
  ye as getZoomedInUnit,
  Ee as getZoomedOutUnit,
  le as mapTimeToY,
  q as normalizeDateInput,
  wt as normalizeEvents,
  Ie as shiftViewport,
  Se as startOfUnit,
  we as zoomViewport
};
