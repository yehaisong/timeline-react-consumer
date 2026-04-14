import dt, { useState as Q, useEffect as K, useMemo as ft, useRef as J, useLayoutEffect as ke } from "react";
const X = [
  "century",
  "decade",
  "year",
  "quarter",
  "month",
  "week",
  "day"
], mt = {
  century: "decade",
  decade: "year",
  year: "month",
  quarter: "month",
  month: "week",
  week: "day",
  day: null
}, ht = /^([+-]\d{4,}|0000)-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?(Z|[+-]\d{2}:\d{2})?)?$/;
function Z(e, n = 0, t = 1, r = 0, o = 0, a = 0, c = 0) {
  const m = /* @__PURE__ */ new Date(0);
  return m.setUTCFullYear(e, n, t), m.setUTCHours(r, o, a, c), m.getTime();
}
function pt(e) {
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
    p
  ] = n, v = Number(t), k = Number(r), C = Number(o), z = a ? Number(a) : 0, L = c ? Number(c) : 0, x = m ? Number(m) : 0, Y = f ? Number(f.padEnd(3, "0")) : 0;
  if (!Number.isInteger(v) || k < 1 || k > 12 || C < 1 || C > 31 || z > 23 || L > 59 || x > 59)
    return null;
  const _ = /* @__PURE__ */ new Date(0);
  if (_.setUTCFullYear(v, k - 1, C), _.setUTCHours(z, L, x, Y), _.getUTCFullYear() !== v || _.getUTCMonth() !== k - 1 || _.getUTCDate() !== C || _.getUTCHours() !== z || _.getUTCMinutes() !== L || _.getUTCSeconds() !== x || _.getUTCMilliseconds() !== Y)
    return null;
  let U = _.getTime();
  if (p && p !== "Z") {
    const T = p.startsWith("-") ? -1 : 1, [ee, B] = p.slice(1).split(":"), u = Number(ee) * 60 + Number(B);
    U -= T * u * 60 * 1e3;
  }
  return Number.isFinite(U) ? U : null;
}
function qt() {
  return [...X];
}
function Xt(e, n) {
  return X.indexOf(e) - X.indexOf(n);
}
function bt(e, n, t) {
  const r = X.indexOf(e), o = X.indexOf(n), a = X.indexOf(t);
  return X[Math.min(Math.max(r, o), a)];
}
function ge(e, n) {
  const t = X.indexOf(e), r = X.indexOf(n);
  return X[Math.min(t + 1, r)];
}
function Ee(e, n) {
  const t = X.indexOf(e), r = X.indexOf(n);
  return X[Math.max(t - 1, r)];
}
function q(e) {
  if (!e)
    return null;
  if (e instanceof Date) {
    const r = e.getTime();
    return Number.isFinite(r) ? r : null;
  }
  const n = pt(e);
  if (n !== null)
    return n;
  const t = new Date(e).getTime();
  return Number.isFinite(t) ? t : null;
}
function Ce(e, n) {
  const t = new Date(e);
  if (n === "century") {
    const r = Math.floor(t.getUTCFullYear() / 100) * 100;
    return Z(r, 0, 1, 0, 0, 0, 0);
  }
  if (n === "decade") {
    const r = Math.floor(t.getUTCFullYear() / 10) * 10;
    return Z(r, 0, 1, 0, 0, 0, 0);
  }
  if (n === "year")
    return Z(t.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
  if (n === "quarter") {
    const r = Math.floor(t.getUTCMonth() / 3) * 3;
    return Z(t.getUTCFullYear(), r, 1, 0, 0, 0, 0);
  }
  if (n === "month")
    return Z(t.getUTCFullYear(), t.getUTCMonth(), 1, 0, 0, 0, 0);
  if (n === "week") {
    const r = new Date(Z(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate())), o = r.getUTCDay(), a = o === 0 ? -6 : 1 - o;
    return r.setUTCDate(r.getUTCDate() + a), r.getTime();
  }
  return Z(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate(), 0, 0, 0, 0);
}
function pe(e, n, t) {
  const r = new Date(e);
  return n === "century" ? Z(r.getUTCFullYear() + t * 100, 0, 1, 0, 0, 0, 0) : n === "decade" ? Z(r.getUTCFullYear() + t * 10, 0, 1, 0, 0, 0, 0) : n === "year" ? Z(r.getUTCFullYear() + t, 0, 1, 0, 0, 0, 0) : n === "quarter" ? Z(r.getUTCFullYear(), r.getUTCMonth() + t * 3, 1, 0, 0, 0, 0) : n === "month" ? Z(r.getUTCFullYear(), r.getUTCMonth() + t, 1, 0, 0, 0, 0) : n === "week" ? e + t * 7 * 24 * 60 * 60 * 1e3 : e + t * 24 * 60 * 60 * 1e3;
}
function vt(e, n) {
  const t = Number.isFinite(e) && e > 0 ? e : 800, r = Number.isFinite(n) && n > 0 ? n : 100;
  return Math.max(1, Math.round(t / r));
}
function Se(e, n, t, r) {
  const o = vt(t, r), a = Ce(e, n), c = Math.floor(o / 2), m = pe(a, n, -c), f = pe(m, n, o);
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
  let f = e.visibleStartMs, p = e.visibleEndMs;
  return a !== null && f < a && (f = a, p = a + m), c !== null && p > c && (p = c, f = c - m), {
    ...e,
    visibleStartMs: f,
    visibleEndMs: p
  };
}
function Ye(e, n, t, r) {
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
  const m = e.visibleEndMs - e.visibleStartMs, f = m <= 0 ? 0.5 : (t - e.visibleStartMs) / m, p = Se(t, n, r, o), v = p.visibleEndMs - p.visibleStartMs, k = t - f * v, C = k + v;
  return ae(
    {
      visibleStartMs: k,
      visibleEndMs: C,
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
function Ie(e, n) {
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
function Mt(e) {
  const n = e.zoomUnit, t = mt[n], r = e.visibleEndMs, o = [];
  let a = Ce(e.visibleStartMs, n);
  for (; a <= r; )
    o.push({
      key: `major-${n}-${a}`,
      ts: a,
      label: Ie(a, n),
      kind: "major"
    }), a = pe(a, n, 1);
  const c = [];
  if (t) {
    let m = Ce(e.visibleStartMs, t);
    for (; m <= r; )
      o.some((p) => p.ts === m) || c.push({
        key: `minor-${t}-${m}`,
        ts: m,
        label: Ie(m, t),
        kind: "minor"
      }), m = pe(m, t, 1);
  }
  return { majorTicks: o, minorTicks: c };
}
const xt = /^[+-]?\d{1,6}$/, Tt = /^([+-]?\d{1,6})-(\d{2})$/, yt = /^([+-]?\d{1,6})-(\d{2})-(\d{2})(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})?)?$/, Ae = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function je(e) {
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
  if (xt.test(n))
    return je(Number(n));
  const t = n.match(Tt);
  if (t) {
    const o = Number(t[1]), a = Number(t[2]);
    if (a >= 1 && a <= 12)
      return `${Ae[a - 1]} ${je(o)}`;
  }
  const r = n.match(yt);
  if (r) {
    const o = Number(r[1]), a = Number(r[2]), c = Number(r[3]);
    if (a >= 1 && a <= 12 && c >= 1 && c <= 31)
      return `${Ae[a - 1]} ${c}, ${je(o)}`;
  }
  return n;
}
function qe(e) {
  return !e.isRange || !e.displayEndLabel || e.displayStartLabel === e.displayEndLabel ? e.displayStartLabel : `${e.displayStartLabel} - ${e.displayEndLabel}`;
}
function gt(e) {
  return e !== null;
}
function Et(e) {
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
  }).filter(gt).sort((t, r) => t.startMs !== r.startMs ? t.startMs - r.startMs : t.importance !== r.importance ? r.importance - t.importance : t.title.localeCompare(r.title));
}
var he = { exports: {} }, se = {};
var Fe;
function wt() {
  if (Fe) return se;
  Fe = 1;
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
var ze;
function jt() {
  return ze || (ze = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(i) {
      if (i == null) return null;
      if (typeof i == "function")
        return i.$$typeof === y ? null : i.displayName || i.name || null;
      if (typeof i == "string") return i;
      switch (i) {
        case Y:
          return "Fragment";
        case U:
          return "Profiler";
        case _:
          return "StrictMode";
        case u:
          return "Suspense";
        case P:
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
          case T:
            return (i._context.displayName || "Context") + ".Consumer";
          case B:
            var b = i.render;
            return i = i.displayName, i || (i = b.displayName || b.name || "", i = i !== "" ? "ForwardRef(" + i + ")" : "ForwardRef"), i;
          case I:
            return b = i.displayName || null, b !== null ? b : e(i.type) || "Memo";
          case $:
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
        var N = b.error, M = typeof Symbol == "function" && Symbol.toStringTag && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return N.call(
          b,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          M
        ), n(i);
      }
    }
    function r(i) {
      if (i === Y) return "<>";
      if (typeof i == "object" && i !== null && i.$$typeof === $)
        return "<...>";
      try {
        var b = e(i);
        return b ? "<" + b + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function o() {
      var i = w.A;
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
    function p(i, b, N, M, g, ne) {
      var S = N.ref;
      return i = {
        $$typeof: L,
        type: i,
        key: b,
        props: N,
        _owner: M
      }, (S !== void 0 ? S : null) !== null ? Object.defineProperty(i, "ref", {
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
        value: g
      }), Object.defineProperty(i, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ne
      }), Object.freeze && (Object.freeze(i.props), Object.freeze(i)), i;
    }
    function v(i, b, N, M, g, ne) {
      var S = b.children;
      if (S !== void 0)
        if (M)
          if (h(S)) {
            for (M = 0; M < S.length; M++)
              k(S[M]);
            Object.freeze && Object.freeze(S);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else k(S);
      if (O.call(b, "key")) {
        S = e(i);
        var G = Object.keys(b).filter(function(be) {
          return be !== "key";
        });
        M = 0 < G.length ? "{key: someKey, " + G.join(": ..., ") + ": ...}" : "{key: someKey}", te[S + M] || (G = 0 < G.length ? "{" + G.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          M,
          S,
          G,
          S
        ), te[S + M] = !0);
      }
      if (S = null, N !== void 0 && (t(N), S = "" + N), c(b) && (t(b.key), S = "" + b.key), "key" in b) {
        N = {};
        for (var re in b)
          re !== "key" && (N[re] = b[re]);
      } else N = b;
      return S && m(
        N,
        typeof i == "function" ? i.displayName || i.name || "Unknown" : i
      ), p(
        i,
        S,
        N,
        o(),
        g,
        ne
      );
    }
    function k(i) {
      C(i) ? i._store && (i._store.validated = 1) : typeof i == "object" && i !== null && i.$$typeof === $ && (i._payload.status === "fulfilled" ? C(i._payload.value) && i._payload.value._store && (i._payload.value._store.validated = 1) : i._store && (i._store.validated = 1));
    }
    function C(i) {
      return typeof i == "object" && i !== null && i.$$typeof === L;
    }
    var z = dt, L = /* @__PURE__ */ Symbol.for("react.transitional.element"), x = /* @__PURE__ */ Symbol.for("react.portal"), Y = /* @__PURE__ */ Symbol.for("react.fragment"), _ = /* @__PURE__ */ Symbol.for("react.strict_mode"), U = /* @__PURE__ */ Symbol.for("react.profiler"), T = /* @__PURE__ */ Symbol.for("react.consumer"), ee = /* @__PURE__ */ Symbol.for("react.context"), B = /* @__PURE__ */ Symbol.for("react.forward_ref"), u = /* @__PURE__ */ Symbol.for("react.suspense"), P = /* @__PURE__ */ Symbol.for("react.suspense_list"), I = /* @__PURE__ */ Symbol.for("react.memo"), $ = /* @__PURE__ */ Symbol.for("react.lazy"), d = /* @__PURE__ */ Symbol.for("react.activity"), y = /* @__PURE__ */ Symbol.for("react.client.reference"), w = z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = Object.prototype.hasOwnProperty, h = Array.isArray, A = console.createTask ? console.createTask : function() {
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
    )(), E = A(r(a)), te = {};
    oe.Fragment = Y, oe.jsx = function(i, b, N) {
      var M = 1e4 > w.recentlyCreatedOwnerStacks++;
      return v(
        i,
        b,
        N,
        !1,
        M ? Error("react-stack-top-frame") : W,
        M ? A(r(i)) : E
      );
    }, oe.jsxs = function(i, b, N) {
      var M = 1e4 > w.recentlyCreatedOwnerStacks++;
      return v(
        i,
        b,
        N,
        !0,
        M ? Error("react-stack-top-frame") : W,
        M ? A(r(i)) : E
      );
    };
  })()), oe;
}
var Be;
function Nt() {
  return Be || (Be = 1, process.env.NODE_ENV === "production" ? he.exports = wt() : he.exports = jt()), he.exports;
}
var s = Nt();
function He(e) {
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
    Se(a, e.initialZoomUnit, e.viewportHeight, e.unitHeight),
    n,
    t
  );
}
function kt(e) {
  const n = !!e.viewport, [t, r] = Q(
    () => He(e)
  );
  K(() => {
    e.viewport || r(He(e));
  }, []), K(() => {
    n || r((c) => {
      const m = c.visibleStartMs + (c.visibleEndMs - c.visibleStartMs) / 2, f = ae(
        Se(m, c.zoomUnit, e.viewportHeight, e.unitHeight),
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
  return ft(() => e < 768 ? {
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
function St({
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
      const p = le(e, f.ts, r);
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "tl-tick tl-tick-major",
          style: { top: p },
          children: [
            o ? /* @__PURE__ */ s.jsx("div", { className: "tl-tick-mark" }) : null,
            a ? /* @__PURE__ */ s.jsx("div", { className: "tl-tick-label", children: /* @__PURE__ */ s.jsx("span", { className: "tl-tick-label-major", children: f.label }) }) : null
          ]
        },
        f.key
      );
    }) : null,
    c || m ? t.map((f) => {
      const p = le(e, f.ts, r);
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "tl-tick tl-tick-minor",
          style: { top: p },
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
const Rt = /^(?:\d+|\d+AD|\d+BC|1BC)$/;
function _t(e) {
  if (Rt.test(e.displayStartLabel))
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
function Ot({ event: e, isActive: n = !1, onClick: t }) {
  const r = _t(e);
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
const We = 52, Ve = 12, Dt = 26, Ne = 10;
function Ut(e, n) {
  return e.filter(
    (t) => t.endMs >= n.visibleStartMs && t.startMs <= n.visibleEndMs
  );
}
function Xe(e) {
  return e.groupId?.trim() || "Ungrouped";
}
function $t(e) {
  return Array.from(new Set(e.map(Xe))).map((t, r) => ({ id: t, label: t, lane: r }));
}
function Pt(e, n, t, r, o, a) {
  const c = [];
  for (const f of o) {
    const p = Ut(e, n).filter((v) => a ? !0 : Xe(v) === f.id).map((v) => ({
      event: v,
      y: le(n, v.startMs, t)
    })).sort((v, k) => v.y - k.y || k.event.importance - v.event.importance);
    for (const v of p) {
      const k = c[c.length - 1];
      if (k && k.groupId === f.id && Math.abs(k.y - v.y) <= 18) {
        k.events.push(v.event), k.y = Math.round((k.y + v.y) / 2);
        continue;
      }
      c.push({
        key: `cluster-${f.id}-${v.event.id}-${v.y}`,
        y: v.y,
        groupId: f.id,
        groupLane: f.lane,
        events: [v.event],
        visibleEvents: [],
        hiddenCount: 0
      });
    }
  }
  for (const f of c)
    f.events.sort((p, v) => p.importance !== v.importance ? v.importance - p.importance : p.startMs !== v.startMs ? p.startMs - v.startMs : p.title.localeCompare(v.title)), f.visibleEvents = f.events.slice(0, r), f.hiddenCount = Math.max(0, f.events.length - r);
  return c;
}
function Lt(e) {
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
function Yt({
  events: e,
  viewport: n,
  height: t,
  laneLimit: r,
  collapseGroups: o = !1,
  renderEvent: a,
  onEventClick: c
}) {
  const m = J(null), f = J({}), p = J({}), v = J({}), [k, C] = Q({}), [z, L] = Q({}), [x, Y] = Q(null), [_, U] = Q(null), T = o ? [{ id: "__all__", label: "All", lane: 0 }] : $t(e), ee = Pt(e, n, t, r, T, o), B = Lt(ee);
  return K(() => {
    x && !B.some(({ cluster: u }) => u.key === x) && Y(null);
  }, [B, x]), K(() => {
    _ && !B.some(({ cluster: u }) => u.events.some((P) => P.id === _)) && U(null);
  }, [_, B]), K(() => {
    if (!x)
      return;
    const u = x;
    function P($) {
      const d = $.target, y = p.current[u];
      y && d && !y.contains(d) && Y(null);
    }
    function I($) {
      $.key === "Escape" && Y(null);
    }
    return document.addEventListener("pointerdown", P), document.addEventListener("keydown", I), () => {
      document.removeEventListener("pointerdown", P), document.removeEventListener("keydown", I);
    };
  }, [x]), ke(() => {
    const u = m.current;
    if (!u)
      return;
    const P = 12, I = u.clientHeight, $ = {};
    for (const { cluster: d } of B) {
      const y = f.current[d.key];
      if (!y) {
        $[d.key] = 0;
        continue;
      }
      const O = y.offsetHeight / 2, h = d.y - O, A = d.y + O, H = P - h, R = I - P - A;
      let W = 0;
      A > I - P && (W = R), W < H && (W = H), $[d.key] = Math.round(W);
    }
    C((d) => {
      const y = Object.keys(d), w = Object.keys($);
      return y.length !== w.length || w.some((h) => d[h] !== $[h]) ? $ : d;
    });
  }, [B, t, x]), ke(() => {
    if (!x) {
      L((R) => Object.keys(R).length ? {} : R);
      return;
    }
    const u = m.current, P = p.current[x], I = v.current[x];
    if (!u || !P || !I)
      return;
    const $ = 12, d = u.clientHeight, y = P.offsetTop + I.offsetTop, w = y + I.offsetHeight;
    let O = 0;
    const h = w - (d - $);
    h > 0 && (O -= h);
    const A = $ - (y + O);
    A > 0 && (O += A);
    const H = Math.round(O);
    L((R) => R[x] === H && Object.keys(R).length === 1 ? R : { [x]: H });
  }, [x, B, t]), /* @__PURE__ */ s.jsxs("div", { ref: m, className: "tl-event-layer", children: [
    /* @__PURE__ */ s.jsx("div", { className: "tl-group-lanes", "aria-hidden": "true", children: T.map((u) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "tl-group-lane",
        style: {
          left: `calc(${u.lane} * (100% / ${T.length}))`,
          width: `calc(100% / ${T.length})`
        },
        children: /* @__PURE__ */ s.jsx("div", { className: "tl-group-lane-label", children: u.label })
      },
      u.id
    )) }),
    B.map(({ cluster: u, placements: P, badgeSide: I, badgeLane: $ }) => {
      const d = u.visibleEvents[0], y = u.events.some((h) => h.id === _), w = u.visibleEvents.length > 1, O = {
        top: u.y + (k[u.key] ?? 0),
        left: `calc(${u.groupLane} * (100% / ${T.length}))`,
        width: `calc(100% / ${T.length})`,
        height: We + Math.max(0, u.visibleEvents.length - 1) * Ne + (u.hiddenCount > 0 ? Ve + Dt : 0),
        zIndex: y ? 350 : x === u.key ? 300 : u.events.length > 1 ? 200 : 10,
        ...d?.color ? { "--tl-event-accent": d.color } : {}
      };
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          ref: (h) => {
            f.current[u.key] = h;
          },
          className: "tl-cluster",
          style: O,
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "tl-cluster-anchor", children: [
              /* @__PURE__ */ s.jsx("div", { className: "tl-point-marker" }),
              /* @__PURE__ */ s.jsx("div", { className: "tl-leader-line" })
            ] }),
            u.visibleEvents.map((h) => {
              const A = P.get(h.id), H = le(n, h.startMs, t), R = le(n, h.endMs, t), W = h.id === _, E = w ? A.lane + 1 : A.lane;
              return /* @__PURE__ */ s.jsxs(
                "div",
                {
                  className: `tl-cluster-item tl-cluster-item-${A.side}`,
                  style: {
                    top: `${E * Ne}px`,
                    left: `calc(${E} * var(--tl-card-stack-offset))`,
                    zIndex: W ? u.visibleEvents.length + r + 1 : u.visibleEvents.length - A.lane
                  },
                  children: [
                    h.isRange ? /* @__PURE__ */ s.jsx(
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
                          U(h.id), c?.(h);
                        },
                        children: a(h)
                      }
                    ) : /* @__PURE__ */ s.jsx(
                      Ot,
                      {
                        event: h,
                        isActive: W,
                        onClick: (te) => {
                          U(te.id), c?.(te);
                        }
                      }
                    )
                  ]
                },
                h.id
              );
            }),
            u.hiddenCount > 0 ? /* @__PURE__ */ s.jsxs(
              "div",
              {
                ref: (h) => {
                  p.current[u.key] = h;
                },
                className: "tl-cluster-overlay",
                style: {
                  top: `${We + (w ? u.visibleEvents.length : Math.max(0, u.visibleEvents.length - 1)) * Ne + Ve}px`,
                  left: `calc(${w ? u.visibleEvents.length : Math.max(0, u.visibleEvents.length - 1)} * var(--tl-card-stack-offset))`
                },
                children: [
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `tl-cluster-badge tl-cluster-badge-${I}`,
                      "aria-expanded": x === u.key,
                      onClick: () => Y((h) => h === u.key ? null : u.key),
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
                      ref: (h) => {
                        v.current[u.key] = h;
                      },
                      className: "tl-cluster-popover",
                      onWheel: (h) => {
                        h.stopPropagation();
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
                        /* @__PURE__ */ s.jsx("div", { className: "tl-cluster-popover-list", children: u.events.map((h) => /* @__PURE__ */ s.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "tl-cluster-popover-item",
                            onClick: () => {
                              c?.(h), Y(null);
                            },
                            children: [
                              /* @__PURE__ */ s.jsx("span", { className: "tl-cluster-popover-item-title", children: h.title }),
                              /* @__PURE__ */ s.jsx("span", { className: "tl-cluster-popover-item-date", children: qe(h) })
                            ]
                          },
                          h.id
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
function Ge(e, n, t, r) {
  const o = t - n;
  return o <= 0 || r <= 0 ? 0 : ce((e - n) / o) * r;
}
function It(e, n, t, r) {
  const o = Math.max(24, Math.min(120, Math.round(r / 4))), a = Array.from({ length: o }, () => 0), c = t - n;
  if (c <= 0 || r <= 0)
    return { bins: a, binCount: o, maxCount: 0 };
  for (const f of e) {
    const p = ce((f.startMs - n) / c), v = ce((f.endMs - n) / c), k = Math.max(0, Math.min(o - 1, Math.floor(p * (o - 1)))), C = Math.max(k, Math.min(o - 1, Math.ceil(v * (o - 1))));
    for (let z = k; z <= C; z += 1)
      a[z] += 1;
  }
  const m = a.reduce((f, p) => Math.max(f, p), 0);
  return { bins: a, binCount: o, maxCount: m };
}
function At(e) {
  const n = ce(e);
  return `color-mix(in srgb, var(--tl-color-minimap-density-low) ${(1 - n) * 100}%, var(--tl-color-minimap-density-high) ${n * 100}%)`;
}
function Ft(e, n, t, r) {
  const o = r - t, a = n.visibleEndMs - n.visibleStartMs;
  if (o <= 0 || a <= 0)
    return n;
  const c = ce(e), m = t + c * o, f = Math.max(t, r - a), p = Math.min(
    Math.max(t, m - a / 2),
    f
  );
  return {
    ...n,
    visibleStartMs: p,
    visibleEndMs: p + a
  };
}
function zt({
  events: e,
  viewport: n,
  height: t,
  domainStartMs: r,
  domainEndMs: o,
  variant: a = "default",
  onViewportChange: c
}) {
  const m = J(null), [f, p] = Q(null), [v, k] = Q(t);
  ke(() => {
    const d = m.current;
    if (!d)
      return;
    const y = () => {
      const O = d.clientHeight;
      O > 0 && k(O);
    };
    if (y(), typeof ResizeObserver > "u")
      return;
    const w = new ResizeObserver(() => y());
    return w.observe(d), () => w.disconnect();
  }, [t]);
  const C = v > 0 ? v : t, z = Ge(n.visibleStartMs, r, o, C), L = Ge(n.visibleEndMs, r, o, C), x = Math.max(18, L - z), Y = Math.min(
    Math.max(0, z),
    Math.max(0, C - x)
  ), _ = n.visibleEndMs - n.visibleStartMs, U = o - r;
  K(() => {
    if (!f)
      return;
    const d = f;
    function y(O) {
      if (!c || U <= _ || C <= x)
        return;
      const h = O.clientY - d.pointerStartY, A = Math.max(0, C - x), H = Math.max(0, Math.min(A, d.viewportTopStart + h)), R = A <= 0 ? 0 : H / A, W = r + R * (U - _), E = W + _;
      c({
        ...n,
        visibleStartMs: W,
        visibleEndMs: E
      });
    }
    function w() {
      p(null);
    }
    return window.addEventListener("pointermove", y), window.addEventListener("pointerup", w), window.addEventListener("pointercancel", w), () => {
      window.removeEventListener("pointermove", y), window.removeEventListener("pointerup", w), window.removeEventListener("pointercancel", w);
    };
  }, [
    f,
    U,
    r,
    C,
    c,
    n,
    _,
    x
  ]);
  const T = [r, (r + o) / 2, o].map(
    (d) => new Date(d).getUTCFullYear()
  ), { bins: ee, binCount: B, maxCount: u } = It(
    e,
    r,
    o,
    C
  ), P = B > 0 ? C / B : C, I = a === "nano";
  function $(d) {
    if (!c || C <= 0)
      return;
    const y = m.current?.getBoundingClientRect();
    if (!y || y.height <= 0)
      return;
    const w = (d - y.top) / y.height;
    c(Ft(w, n, r, o));
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
          $(d.clientY);
        },
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "tl-minimap-track" }),
          /* @__PURE__ */ s.jsx("div", { className: "tl-minimap-density", children: ee.map((d, y) => {
            if (d <= 0 || u <= 0)
              return null;
            const w = d / u, O = y * P, h = Math.min(O, Math.max(0, C - P));
            return /* @__PURE__ */ s.jsx(
              "div",
              {
                className: "tl-minimap-density-bin",
                title: `${d} events`,
                style: {
                  top: h,
                  height: Math.max(3, P),
                  width: I ? "5px" : `${8 + w * 18}px`,
                  backgroundColor: At(w)
                }
              },
              `density-${y}`
            );
          }) }),
          /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "tl-minimap-viewport",
              onPointerDown: (d) => {
                d.preventDefault(), d.stopPropagation(), p({
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
          I ? null : T.map((d, y) => /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "tl-minimap-label",
              style: { top: `${y * 50}%` },
              children: d
            },
            `${d}-${y}`
          ))
        ]
      }
    )
  ] });
}
const Bt = 4, Ht = 1.07, Wt = 0.93;
function Vt(e) {
  if (e.type === "Point") {
    const [n, t] = e.coordinates;
    return `Point ${t.toFixed(4)}, ${n.toFixed(4)}`;
  }
  return e.type === "LineString" ? `LineString with ${e.coordinates.length} points` : `Polygon with ${e.coordinates.length} rings`;
}
function Zt({
  events: e,
  startBound: n,
  endBound: t,
  maxZoomUnit: r = "century",
  minZoomUnit: o = "day",
  initialZoomUnit: a = "year",
  initialStart: c,
  initialEnd: m,
  initialCenter: f,
  viewport: p,
  onViewportChange: v,
  renderEvent: k,
  renderDetail: C,
  onEventClick: z,
  detailMode: L = "slide",
  height: x = 800,
  unitHeight: Y = 100,
  clusterLaneLimit: _ = 3,
  display: U,
  theme: T,
  className: ee,
  style: B
}) {
  const u = Et(e), P = new Set(
    u.map((l) => l.groupId?.trim() || "Ungrouped")
  ).size, I = bt(a, r, o), $ = J(null), d = J(null), y = J(/* @__PURE__ */ new Map()), w = J(null), O = J(null), h = J(!1), [A, H] = Q(1200), [R, W] = Q(
    typeof x == "number" ? x : 800
  ), [E, te] = Q(null), [i, b] = Q(!1), N = Ct({ containerWidth: A }), M = {
    ...N,
    showMiniMap: U?.showMiniMap ?? N.showMiniMap,
    showMajorTicks: U?.showMajorTicks ?? N.showMajorTicks,
    showMajorLabels: U?.showMajorLabels ?? N.showMajorLabels,
    showMinorTicks: U?.showMinorTicks ?? N.showMinorTicks,
    showMinorLabels: U?.showMinorLabels ?? N.showMinorLabels,
    miniMapWidth: U?.miniMapWidth ?? N.miniMapWidth,
    clusterLaneLimit: U?.clusterLaneLimit ?? N.clusterLaneLimit
  }, { viewport: g, setViewport: ne, startBoundMs: S, endBoundMs: G } = kt({
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
    viewport: p,
    onViewportChange: v
  });
  K(() => {
    const l = $.current;
    if (!l || ((() => {
      const D = l.clientWidth, F = typeof x == "number" ? x : l.clientHeight;
      D > 0 && H(D), typeof F == "number" && F > 0 && W(F);
    })(), typeof ResizeObserver > "u"))
      return;
    const V = new ResizeObserver((D) => {
      const F = D[0];
      F?.contentRect && (F.contentRect.width > 0 && H(F.contentRect.width), typeof x != "number" && F.contentRect.height > 0 && W(F.contentRect.height));
    });
    return V.observe(l), () => V.disconnect();
  }, [x]), K(() => () => {
    d.current !== null && window.clearTimeout(d.current);
  }, []), K(() => {
    L === "none" && (d.current !== null && (window.clearTimeout(d.current), d.current = null), b(!1), te(null));
  }, [L]), K(() => {
    if (!E)
      return;
    u.some((j) => j.id === E.id) || (d.current !== null && (window.clearTimeout(d.current), d.current = null), b(!1), te(null));
  }, [E, u]), K(() => {
    if (!E)
      return;
    const l = requestAnimationFrame(() => {
      b(!0);
    });
    function j(V) {
      V.key === "Escape" && Me();
    }
    return document.addEventListener("keydown", j), () => {
      cancelAnimationFrame(l), document.removeEventListener("keydown", j);
    };
  }, [E]);
  const re = Mt(g), be = Math.min(
    U?.clusterLaneLimit ?? _,
    M.clusterLaneLimit
  ), Re = M.mode === "mobile" && P > 2, Ze = g.visibleEndMs - g.visibleStartMs, Je = S !== null && Math.abs(g.visibleStartMs - S) < 1, Ke = G !== null && Math.abs(g.visibleEndMs - G) < 1;
  function _e(l) {
    const j = l === "in" ? ge(g.zoomUnit, o) : Ee(g.zoomUnit, r), V = g.visibleStartMs + (g.visibleEndMs - g.visibleStartMs) / 2;
    ne(
      we(g, j, V, R, Y, S, G)
    );
  }
  function Qe(l) {
    if (l.ctrlKey || l.metaKey) {
      l.preventDefault();
      const F = l.currentTarget.getBoundingClientRect(), ue = F.height > 0 ? (l.clientY - F.top) / F.height : 0.5, de = g.visibleStartMs + (g.visibleEndMs - g.visibleStartMs) * ue, ie = l.deltaY > 0 ? Ee(g.zoomUnit, r) : ge(g.zoomUnit, o);
      ne(
        we(
          g,
          ie,
          de,
          R,
          Y,
          S,
          G
        )
      );
      return;
    }
    const j = Math.sign(l.deltaY);
    if (j < 0 && Je || j > 0 && Ke)
      return;
    l.preventDefault();
    const V = l.deltaY / Math.max(R, 1), D = Math.max(-0.16, Math.min(0.16, V));
    Ze <= 0 || D === 0 || ne(Ye(g, D, S, G));
  }
  function ve() {
    const l = Array.from(y.current.entries()).filter(
      ([, j]) => j.pointerType === "touch"
    );
    return l.length >= 2 ? l.slice(0, 2) : null;
  }
  function et(l) {
    if (l.pointerType !== "touch" && l.pointerType !== "pen")
      return;
    y.current.set(l.pointerId, {
      clientX: l.clientX,
      clientY: l.clientY,
      pointerType: l.pointerType
    });
    const j = ve();
    if (j) {
      const [, V] = j[0], [, D] = j[1];
      O.current = {
        distance: Math.hypot(
          D.clientX - V.clientX,
          D.clientY - V.clientY
        ),
        viewport: {
          visibleStartMs: g.visibleStartMs,
          visibleEndMs: g.visibleEndMs,
          zoomUnit: g.zoomUnit
        }
      }, w.current = null, h.current = !0, l.preventDefault();
      return;
    }
    l.isPrimary && (w.current = {
      pointerId: l.pointerId,
      startY: l.clientY,
      startViewport: {
        visibleStartMs: g.visibleStartMs,
        visibleEndMs: g.visibleEndMs
      },
      moved: !1
    }, l.currentTarget.setPointerCapture(l.pointerId));
  }
  function tt(l) {
    const j = y.current.get(l.pointerId);
    j && (j.clientX = l.clientX, j.clientY = l.clientY);
    const V = ve(), D = O.current;
    if (V && D) {
      const [, ie] = V[0], [, xe] = V[1], Te = Math.hypot(
        xe.clientX - ie.clientX,
        xe.clientY - ie.clientY
      );
      if (Te > 0 && D.distance > 0) {
        const Pe = Te / D.distance, ye = l.currentTarget.getBoundingClientRect(), lt = (ie.clientY + xe.clientY) / 2, ct = ye.height > 0 ? (lt - ye.top) / ye.height : 0.5, ut = D.viewport.visibleStartMs + (D.viewport.visibleEndMs - D.viewport.visibleStartMs) * ct;
        let fe = D.viewport.zoomUnit;
        if (Pe >= Ht ? fe = ge(D.viewport.zoomUnit, o) : Pe <= Wt && (fe = Ee(D.viewport.zoomUnit, r)), fe !== D.viewport.zoomUnit) {
          const Le = we(
            {
              visibleStartMs: D.viewport.visibleStartMs,
              visibleEndMs: D.viewport.visibleEndMs,
              zoomUnit: D.viewport.zoomUnit
            },
            fe,
            ut,
            R,
            Y,
            S,
            G
          );
          ne(Le), O.current = {
            distance: Te,
            viewport: Le
          };
        }
      }
      h.current = !0, l.preventDefault();
      return;
    }
    const F = w.current;
    if (!F || F.pointerId !== l.pointerId)
      return;
    const ue = l.clientY - F.startY;
    Math.abs(ue) > Bt && (F.moved = !0, h.current = !0);
    const de = -ue / Math.max(R, 1);
    de !== 0 && (l.preventDefault(), ne(
      Ye(
        {
          visibleStartMs: F.startViewport.visibleStartMs,
          visibleEndMs: F.startViewport.visibleEndMs,
          zoomUnit: g.zoomUnit
        },
        de,
        S,
        G
      )
    ));
  }
  function Oe(l) {
    y.current.delete(l.pointerId);
    const j = w.current;
    j && j.pointerId === l.pointerId && (l.currentTarget.hasPointerCapture(l.pointerId) && l.currentTarget.releasePointerCapture(l.pointerId), w.current = null), ve() || (O.current = null);
  }
  function nt(l) {
    h.current && (h.current = !1, l.preventDefault(), l.stopPropagation());
  }
  const rt = {
    ...B,
    height: x,
    "--tl-axis-width": `${T?.axisWidth ?? M.axisWidth}px`,
    "--tl-axis-offset": `${T?.axisOffset ?? M.axisOffset}px`,
    "--tl-card-width": `${T?.cardWidth ?? M.cardWidth}px`,
    "--tl-card-max-width": `${T?.cardMaxWidth ?? M.cardMaxWidth}px`,
    "--tl-card-stack-offset": `${T?.stackOffset ?? M.stackOffset}px`,
    "--tl-label-shift": `${T?.labelShift ?? M.labelShift}px`,
    "--tl-minimap-width": `${M.miniMapWidth}px`,
    "--tl-color-axis": T?.axisColor,
    "--tl-color-major-tick": T?.majorTickColor,
    "--tl-color-minor-tick": T?.minorTickColor,
    "--tl-label-pill-bg": T?.labelPillBg,
    "--tl-label-pill-text": T?.labelPillText,
    "--tl-color-event-card-bg": T?.eventCardBg,
    "--tl-color-event-card-text": T?.eventCardText,
    "--tl-color-event-card-border": T?.eventCardBorder,
    "--tl-color-event-card-hover-bg": T?.eventCardHoverBg,
    "--tl-color-event-card-active-border": T?.eventCardActiveBorder,
    "--tl-color-minimap-bg": T?.miniMapBg,
    "--tl-color-minimap-border": T?.miniMapBorder,
    "--tl-color-minimap-track": T?.miniMapTrackColor,
    "--tl-color-minimap-viewport-border": T?.miniMapViewportBorder,
    "--tl-color-minimap-viewport-bg": T?.miniMapViewportBg,
    "--tl-color-minimap-density-low": T?.miniMapDensityLow,
    "--tl-color-minimap-density-high": T?.miniMapDensityHigh
  }, De = q(n) !== null || q(t) !== null ? `${n ? new Date(q(n)).getUTCFullYear() : "..."} - ${t ? new Date(q(t)).getUTCFullYear() : "..."}` : null, Ue = S ?? u.reduce((l, j) => Math.min(l, j.startMs), Number.POSITIVE_INFINITY), $e = G ?? u.reduce((l, j) => Math.max(l, j.endMs), Number.NEGATIVE_INFINITY), it = Number.isFinite(Ue) ? Ue : g.visibleStartMs, st = Number.isFinite($e) ? $e : g.visibleEndMs, ot = L !== "none" && E !== null;
  function at(l) {
    L !== "none" && (d.current !== null && (window.clearTimeout(d.current), d.current = null), te(l), b(!1)), z?.(l);
  }
  function Me() {
    d.current !== null && window.clearTimeout(d.current), b(!1), d.current = window.setTimeout(() => {
      te(null), d.current = null;
    }, 220);
  }
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: $,
      className: `tl-root tl-mode-${M.mode}${M.showMiniMap ? "" : " tl-hide-minimap"}${Re ? " tl-mobile-collapsed-groups" : ""}${ee ? ` ${ee}` : ""}`,
      "data-layout-mode": M.mode,
      style: rt,
      onWheel: Qe,
      onPointerDown: et,
      onPointerMove: tt,
      onPointerUp: Oe,
      onPointerCancel: Oe,
      onClickCapture: nt,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "tl-controls", children: [
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "tl-control-button", onClick: () => _e("out"), children: "-" }),
          /* @__PURE__ */ s.jsxs("div", { className: "tl-zoom-readout", children: [
            /* @__PURE__ */ s.jsx("span", { className: "tl-zoom-unit", children: g.zoomUnit }),
            De ? /* @__PURE__ */ s.jsx("span", { className: "tl-bounds", children: De }) : null
          ] }),
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "tl-control-button", onClick: () => _e("in"), children: "+" })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "tl-surface", children: [
          /* @__PURE__ */ s.jsx(
            St,
            {
              viewport: g,
              majorTicks: re.majorTicks,
              minorTicks: re.minorTicks,
              height: R,
              showMajorTicks: M.showMajorTicks,
              showMajorLabels: M.showMajorLabels,
              showMinorTicks: M.showMinorTicks,
              showMinorLabels: M.showMinorLabels
            }
          ),
          /* @__PURE__ */ s.jsx(
            Yt,
            {
              events: u,
              viewport: g,
              height: R,
              laneLimit: be,
              collapseGroups: Re,
              renderEvent: k,
              onEventClick: at
            }
          ),
          M.showMiniMap ? /* @__PURE__ */ s.jsx(
            zt,
            {
              events: u,
              viewport: g,
              height: R,
              domainStartMs: it,
              domainEndMs: st,
              variant: M.mode === "mobile" ? "nano" : "default",
              onViewportChange: ne
            }
          ) : null
        ] }),
        ot ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
          /* @__PURE__ */ s.jsx(
            "div",
            {
              className: `tl-detail-backdrop${L === "modal" ? " tl-detail-backdrop-visible" : " tl-detail-backdrop-soft"}${i ? " tl-detail-backdrop-open" : ""}`,
              onClick: Me
            }
          ),
          /* @__PURE__ */ s.jsxs(
            "aside",
            {
              className: `tl-detail-surface tl-detail-surface-${L}${i ? " tl-detail-surface-open" : ""}`,
              "aria-modal": L === "modal" ? "true" : void 0,
              role: L === "modal" ? "dialog" : "complementary",
              children: [
                /* @__PURE__ */ s.jsxs("div", { className: "tl-detail-header", children: [
                  /* @__PURE__ */ s.jsxs("div", { children: [
                    /* @__PURE__ */ s.jsx("p", { className: "tl-detail-eyebrow", children: "Event Detail" }),
                    /* @__PURE__ */ s.jsx("h2", { className: "tl-detail-title", children: E.title })
                  ] }),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: "tl-detail-close",
                      onClick: Me,
                      "aria-label": "Close event detail",
                      children: "×"
                    }
                  )
                ] }),
                C ? /* @__PURE__ */ s.jsx("div", { className: "tl-detail-body", children: C(E) }) : /* @__PURE__ */ s.jsxs("div", { className: "tl-detail-body", children: [
                  /* @__PURE__ */ s.jsx("p", { className: "tl-detail-date", children: qe(E) }),
                  E.description ? /* @__PURE__ */ s.jsxs("section", { className: "tl-detail-section", children: [
                    /* @__PURE__ */ s.jsx("h3", { className: "tl-detail-section-title", children: "Summary" }),
                    /* @__PURE__ */ s.jsx("p", { className: "tl-detail-copy", children: E.description })
                  ] }) : null,
                  /* @__PURE__ */ s.jsxs("section", { className: "tl-detail-section", children: [
                    /* @__PURE__ */ s.jsx("h3", { className: "tl-detail-section-title", children: "Details" }),
                    /* @__PURE__ */ s.jsxs("dl", { className: "tl-detail-grid", children: [
                      /* @__PURE__ */ s.jsxs("div", { children: [
                        /* @__PURE__ */ s.jsx("dt", { children: "ID" }),
                        /* @__PURE__ */ s.jsx("dd", { children: E.id })
                      ] }),
                      /* @__PURE__ */ s.jsxs("div", { children: [
                        /* @__PURE__ */ s.jsx("dt", { children: "Type" }),
                        /* @__PURE__ */ s.jsx("dd", { children: E.isRange ? "Range event" : "Point event" })
                      ] }),
                      /* @__PURE__ */ s.jsxs("div", { children: [
                        /* @__PURE__ */ s.jsx("dt", { children: "Importance" }),
                        /* @__PURE__ */ s.jsx("dd", { children: E.importance })
                      ] }),
                      /* @__PURE__ */ s.jsxs("div", { children: [
                        /* @__PURE__ */ s.jsx("dt", { children: "All day" }),
                        /* @__PURE__ */ s.jsx("dd", { children: E.allDay ? "Yes" : "No" })
                      ] }),
                      /* @__PURE__ */ s.jsxs("div", { children: [
                        /* @__PURE__ */ s.jsx("dt", { children: "Media" }),
                        /* @__PURE__ */ s.jsx("dd", { children: E.media?.length ?? 0 })
                      ] }),
                      /* @__PURE__ */ s.jsxs("div", { children: [
                        /* @__PURE__ */ s.jsx("dt", { children: "Attachments" }),
                        /* @__PURE__ */ s.jsx("dd", { children: E.attachments?.length ?? 0 })
                      ] })
                    ] })
                  ] }),
                  E.geo ? /* @__PURE__ */ s.jsxs("section", { className: "tl-detail-section", children: [
                    /* @__PURE__ */ s.jsx("h3", { className: "tl-detail-section-title", children: "Location" }),
                    /* @__PURE__ */ s.jsxs("p", { className: "tl-detail-copy", children: [
                      E.geo.properties?.label ? `${String(E.geo.properties.label)} · ` : "",
                      Vt(E.geo.geometry)
                    ] })
                  ] }) : null,
                  E.media?.length ? /* @__PURE__ */ s.jsxs("section", { className: "tl-detail-section", children: [
                    /* @__PURE__ */ s.jsx("h3", { className: "tl-detail-section-title", children: "Media" }),
                    /* @__PURE__ */ s.jsx("ul", { className: "tl-detail-list", children: E.media.map((l, j) => /* @__PURE__ */ s.jsx("li", { children: /* @__PURE__ */ s.jsx("a", { href: l.url, target: "_blank", rel: "noreferrer", children: l.title ?? `${l.type} asset ${j + 1}` }) }, l.id ?? `${l.type}-${j}`)) })
                  ] }) : null,
                  E.attachments?.length ? /* @__PURE__ */ s.jsxs("section", { className: "tl-detail-section", children: [
                    /* @__PURE__ */ s.jsx("h3", { className: "tl-detail-section-title", children: "Attachments" }),
                    /* @__PURE__ */ s.jsx("ul", { className: "tl-detail-list", children: E.attachments.map((l, j) => /* @__PURE__ */ s.jsx("li", { children: /* @__PURE__ */ s.jsx("a", { href: l.url, target: "_blank", rel: "noreferrer", children: l.name }) }, l.id ?? `${l.name}-${j}`)) })
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
  Zt as VerticalTimeline,
  pe as addUnits,
  ae as clampViewportToBounds,
  bt as clampZoomUnit,
  Xt as compareZoomUnits,
  Se as createViewportAround,
  Ie as formatTickLabel,
  Mt as generateTicks,
  vt as getVisibleUnitCount,
  qt as getZoomUnits,
  ge as getZoomedInUnit,
  Ee as getZoomedOutUnit,
  le as mapTimeToY,
  q as normalizeDateInput,
  Et as normalizeEvents,
  Ye as shiftViewport,
  Ce as startOfUnit,
  we as zoomViewport
};
