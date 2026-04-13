import Ve, { useState as Z, useEffect as q, useMemo as Ge, useRef as te, useLayoutEffect as be } from "react";
const V = [
  "century",
  "decade",
  "year",
  "quarter",
  "month",
  "week",
  "day"
], qe = {
  century: "decade",
  decade: "year",
  year: "month",
  quarter: "month",
  month: "week",
  week: "day",
  day: null
}, Ze = /^([+-]\d{4,}|0000)-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?(Z|[+-]\d{2}:\d{2})?)?$/;
function G(e, n = 0, t = 1, i = 0, o = 0, a = 0, l = 0) {
  const m = /* @__PURE__ */ new Date(0);
  return m.setUTCFullYear(e, n, t), m.setUTCHours(i, o, a, l), m.getTime();
}
function Je(e) {
  const n = e.match(Ze);
  if (!n)
    return null;
  const [
    ,
    t,
    i,
    o,
    a,
    l,
    m,
    d,
    f
  ] = n, v = Number(t), g = Number(i), N = Number(o), U = a ? Number(a) : 0, D = l ? Number(l) : 0, M = m ? Number(m) : 0, A = d ? Number(d.padEnd(3, "0")) : 0;
  if (!Number.isInteger(v) || g < 1 || g > 12 || N < 1 || N > 31 || U > 23 || D > 59 || M > 59)
    return null;
  const C = /* @__PURE__ */ new Date(0);
  if (C.setUTCFullYear(v, g - 1, N), C.setUTCHours(U, D, M, A), C.getUTCFullYear() !== v || C.getUTCMonth() !== g - 1 || C.getUTCDate() !== N || C.getUTCHours() !== U || C.getUTCMinutes() !== D || C.getUTCSeconds() !== M || C.getUTCMilliseconds() !== A)
    return null;
  let R = C.getTime();
  if (f && f !== "Z") {
    const T = f.startsWith("-") ? -1 : 1, [J, B] = f.slice(1).split(":"), c = Number(J) * 60 + Number(B);
    R -= T * c * 60 * 1e3;
  }
  return Number.isFinite(R) ? R : null;
}
function kt() {
  return [...V];
}
function Ct(e, n) {
  return V.indexOf(e) - V.indexOf(n);
}
function Ke(e, n, t) {
  const i = V.indexOf(e), o = V.indexOf(n), a = V.indexOf(t);
  return V[Math.min(Math.max(i, o), a)];
}
function Ee(e, n) {
  const t = V.indexOf(e), i = V.indexOf(n);
  return V[Math.min(t + 1, i)];
}
function je(e, n) {
  const t = V.indexOf(e), i = V.indexOf(n);
  return V[Math.max(t - 1, i)];
}
function H(e) {
  if (!e)
    return null;
  if (e instanceof Date) {
    const i = e.getTime();
    return Number.isFinite(i) ? i : null;
  }
  const n = Je(e);
  if (n !== null)
    return n;
  const t = new Date(e).getTime();
  return Number.isFinite(t) ? t : null;
}
function ve(e, n) {
  const t = new Date(e);
  if (n === "century") {
    const i = Math.floor(t.getUTCFullYear() / 100) * 100;
    return G(i, 0, 1, 0, 0, 0, 0);
  }
  if (n === "decade") {
    const i = Math.floor(t.getUTCFullYear() / 10) * 10;
    return G(i, 0, 1, 0, 0, 0, 0);
  }
  if (n === "year")
    return G(t.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
  if (n === "quarter") {
    const i = Math.floor(t.getUTCMonth() / 3) * 3;
    return G(t.getUTCFullYear(), i, 1, 0, 0, 0, 0);
  }
  if (n === "month")
    return G(t.getUTCFullYear(), t.getUTCMonth(), 1, 0, 0, 0, 0);
  if (n === "week") {
    const i = new Date(G(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate())), o = i.getUTCDay(), a = o === 0 ? -6 : 1 - o;
    return i.setUTCDate(i.getUTCDate() + a), i.getTime();
  }
  return G(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate(), 0, 0, 0, 0);
}
function de(e, n, t) {
  const i = new Date(e);
  return n === "century" ? G(i.getUTCFullYear() + t * 100, 0, 1, 0, 0, 0, 0) : n === "decade" ? G(i.getUTCFullYear() + t * 10, 0, 1, 0, 0, 0, 0) : n === "year" ? G(i.getUTCFullYear() + t, 0, 1, 0, 0, 0, 0) : n === "quarter" ? G(i.getUTCFullYear(), i.getUTCMonth() + t * 3, 1, 0, 0, 0, 0) : n === "month" ? G(i.getUTCFullYear(), i.getUTCMonth() + t, 1, 0, 0, 0, 0) : n === "week" ? e + t * 7 * 24 * 60 * 60 * 1e3 : e + t * 24 * 60 * 60 * 1e3;
}
function Xe(e, n) {
  const t = Number.isFinite(e) && e > 0 ? e : 800, i = Number.isFinite(n) && n > 0 ? n : 100;
  return Math.max(1, Math.round(t / i));
}
function xe(e, n, t, i) {
  const o = Xe(t, i), a = ve(e, n), l = Math.floor(o / 2), m = de(a, n, -l), d = de(m, n, o);
  return {
    visibleStartMs: m,
    visibleEndMs: d,
    zoomUnit: n
  };
}
function oe(e, n, t) {
  const i = Number.isFinite(n ?? NaN), o = Number.isFinite(t ?? NaN);
  if (!i && !o)
    return e;
  const a = i ? Number(n) : null, l = o ? Number(t) : null, m = e.visibleEndMs - e.visibleStartMs;
  if (a !== null && l !== null && m >= l - a)
    return {
      ...e,
      visibleStartMs: a,
      visibleEndMs: l
    };
  let d = e.visibleStartMs, f = e.visibleEndMs;
  return a !== null && d < a && (d = a, f = a + m), l !== null && f > l && (f = l, d = l - m), {
    ...e,
    visibleStartMs: d,
    visibleEndMs: f
  };
}
function Qe(e, n, t, i) {
  const a = (e.visibleEndMs - e.visibleStartMs) * n;
  return oe(
    {
      ...e,
      visibleStartMs: e.visibleStartMs + a,
      visibleEndMs: e.visibleEndMs + a
    },
    t,
    i
  );
}
function Ne(e, n, t, i, o, a, l) {
  if (n === e.zoomUnit)
    return e;
  const m = e.visibleEndMs - e.visibleStartMs, d = m <= 0 ? 0.5 : (t - e.visibleStartMs) / m, f = xe(t, n, i, o), v = f.visibleEndMs - f.visibleStartMs, g = t - d * v, N = g + v;
  return oe(
    {
      visibleStartMs: g,
      visibleEndMs: N,
      zoomUnit: n
    },
    a,
    l
  );
}
function ae(e, n, t) {
  const i = e.visibleEndMs - e.visibleStartMs;
  return i <= 0 || t <= 0 ? 0 : (n - e.visibleStartMs) / i * t;
}
function we(e, n) {
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
function et(e) {
  const n = e.zoomUnit, t = qe[n], i = e.visibleEndMs, o = [];
  let a = ve(e.visibleStartMs, n);
  for (; a <= i; )
    o.push({
      key: `major-${n}-${a}`,
      ts: a,
      label: we(a, n),
      kind: "major"
    }), a = de(a, n, 1);
  const l = [];
  if (t) {
    let m = ve(e.visibleStartMs, t);
    for (; m <= i; )
      o.some((f) => f.ts === m) || l.push({
        key: `minor-${t}-${m}`,
        ts: m,
        label: we(m, t),
        kind: "minor"
      }), m = de(m, t, 1);
  }
  return { majorTicks: o, minorTicks: l };
}
const tt = /^[+-]?\d{1,6}$/, nt = /^([+-]?\d{1,6})-(\d{2})$/, rt = /^([+-]?\d{1,6})-(\d{2})-(\d{2})(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})?)?$/, ke = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function he(e) {
  return e < 0 ? `${Math.abs(e)}BC` : e === 0 ? "1BC" : `${e}`;
}
function ce(e) {
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
  if (tt.test(n))
    return he(Number(n));
  const t = n.match(nt);
  if (t) {
    const o = Number(t[1]), a = Number(t[2]);
    if (a >= 1 && a <= 12)
      return `${ke[a - 1]} ${he(o)}`;
  }
  const i = n.match(rt);
  if (i) {
    const o = Number(i[1]), a = Number(i[2]), l = Number(i[3]);
    if (a >= 1 && a <= 12 && l >= 1 && l <= 31)
      return `${ke[a - 1]} ${l}, ${he(o)}`;
  }
  return n;
}
function Le(e) {
  return !e.isRange || !e.displayEndLabel || e.displayStartLabel === e.displayEndLabel ? e.displayStartLabel : `${e.displayStartLabel} - ${e.displayEndLabel}`;
}
function it(e) {
  return e !== null;
}
function st(e) {
  return e.map((t) => {
    const i = H(t.placementStart ?? t.start), o = H(t.placementEnd ?? t.end), a = ce(t.displayStart) ?? ce(t.start), l = ce(t.displayEnd) ?? ce(t.end);
    if (i === null)
      return null;
    const m = o ?? i;
    return m < i || !a ? null : {
      id: t.id,
      title: t.title,
      startMs: i,
      endMs: m,
      displayStartLabel: a,
      displayEndLabel: l,
      isRange: m > i,
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
  }).filter(it).sort((t, i) => t.startMs !== i.startMs ? t.startMs - i.startMs : t.importance !== i.importance ? i.importance - t.importance : t.title.localeCompare(i.title));
}
var ue = { exports: {} }, ie = {};
var Ce;
function ot() {
  if (Ce) return ie;
  Ce = 1;
  var e = /* @__PURE__ */ Symbol.for("react.transitional.element"), n = /* @__PURE__ */ Symbol.for("react.fragment");
  function t(i, o, a) {
    var l = null;
    if (a !== void 0 && (l = "" + a), o.key !== void 0 && (l = "" + o.key), "key" in o) {
      a = {};
      for (var m in o)
        m !== "key" && (a[m] = o[m]);
    } else a = o;
    return o = a.ref, {
      $$typeof: e,
      type: i,
      key: l,
      ref: o !== void 0 ? o : null,
      props: a
    };
  }
  return ie.Fragment = n, ie.jsx = t, ie.jsxs = t, ie;
}
var se = {};
var Se;
function at() {
  return Se || (Se = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(r) {
      if (r == null) return null;
      if (typeof r == "function")
        return r.$$typeof === y ? null : r.displayName || r.name || null;
      if (typeof r == "string") return r;
      switch (r) {
        case A:
          return "Fragment";
        case R:
          return "Profiler";
        case C:
          return "StrictMode";
        case c:
          return "Suspense";
        case O:
          return "SuspenseList";
        case u:
          return "Activity";
      }
      if (typeof r == "object")
        switch (typeof r.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), r.$$typeof) {
          case M:
            return "Portal";
          case J:
            return r.displayName || "Context";
          case T:
            return (r._context.displayName || "Context") + ".Consumer";
          case B:
            var b = r.render;
            return r = r.displayName, r || (r = b.displayName || b.name || "", r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef"), r;
          case L:
            return b = r.displayName || null, b !== null ? b : e(r.type) || "Memo";
          case _:
            b = r._payload, r = r._init;
            try {
              return e(r(b));
            } catch {
            }
        }
      return null;
    }
    function n(r) {
      return "" + r;
    }
    function t(r) {
      try {
        n(r);
        var b = !1;
      } catch {
        b = !0;
      }
      if (b) {
        b = console;
        var j = b.error, k = typeof Symbol == "function" && Symbol.toStringTag && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return j.call(
          b,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          k
        ), n(r);
      }
    }
    function i(r) {
      if (r === A) return "<>";
      if (typeof r == "object" && r !== null && r.$$typeof === _)
        return "<...>";
      try {
        var b = e(r);
        return b ? "<" + b + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function o() {
      var r = E.A;
      return r === null ? null : r.getOwner();
    }
    function a() {
      return Error("react-stack-top-frame");
    }
    function l(r) {
      if (w.call(r, "key")) {
        var b = Object.getOwnPropertyDescriptor(r, "key").get;
        if (b && b.isReactWarning) return !1;
      }
      return r.key !== void 0;
    }
    function m(r, b) {
      function j() {
        F || (F = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          b
        ));
      }
      j.isReactWarning = !0, Object.defineProperty(r, "key", {
        get: j,
        configurable: !0
      });
    }
    function d() {
      var r = e(this.type);
      return Y[r] || (Y[r] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), r = this.props.ref, r !== void 0 ? r : null;
    }
    function f(r, b, j, k, Q, ne) {
      var $ = j.ref;
      return r = {
        $$typeof: D,
        type: r,
        key: b,
        props: j,
        _owner: k
      }, ($ !== void 0 ? $ : null) !== null ? Object.defineProperty(r, "ref", {
        enumerable: !1,
        get: d
      }) : Object.defineProperty(r, "ref", { enumerable: !1, value: null }), r._store = {}, Object.defineProperty(r._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(r, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(r, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: Q
      }), Object.defineProperty(r, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ne
      }), Object.freeze && (Object.freeze(r.props), Object.freeze(r)), r;
    }
    function v(r, b, j, k, Q, ne) {
      var $ = b.children;
      if ($ !== void 0)
        if (k)
          if (h($)) {
            for (k = 0; k < $.length; k++)
              g($[k]);
            Object.freeze && Object.freeze($);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else g($);
      if (w.call(b, "key")) {
        $ = e(r);
        var K = Object.keys(b).filter(function(me) {
          return me !== "key";
        });
        k = 0 < K.length ? "{key: someKey, " + K.join(": ..., ") + ": ...}" : "{key: someKey}", S[$ + k] || (K = 0 < K.length ? "{" + K.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          k,
          $,
          K,
          $
        ), S[$ + k] = !0);
      }
      if ($ = null, j !== void 0 && (t(j), $ = "" + j), l(b) && (t(b.key), $ = "" + b.key), "key" in b) {
        j = {};
        for (var re in b)
          re !== "key" && (j[re] = b[re]);
      } else j = b;
      return $ && m(
        j,
        typeof r == "function" ? r.displayName || r.name || "Unknown" : r
      ), f(
        r,
        $,
        j,
        o(),
        Q,
        ne
      );
    }
    function g(r) {
      N(r) ? r._store && (r._store.validated = 1) : typeof r == "object" && r !== null && r.$$typeof === _ && (r._payload.status === "fulfilled" ? N(r._payload.value) && r._payload.value._store && (r._payload.value._store.validated = 1) : r._store && (r._store.validated = 1));
    }
    function N(r) {
      return typeof r == "object" && r !== null && r.$$typeof === D;
    }
    var U = Ve, D = /* @__PURE__ */ Symbol.for("react.transitional.element"), M = /* @__PURE__ */ Symbol.for("react.portal"), A = /* @__PURE__ */ Symbol.for("react.fragment"), C = /* @__PURE__ */ Symbol.for("react.strict_mode"), R = /* @__PURE__ */ Symbol.for("react.profiler"), T = /* @__PURE__ */ Symbol.for("react.consumer"), J = /* @__PURE__ */ Symbol.for("react.context"), B = /* @__PURE__ */ Symbol.for("react.forward_ref"), c = /* @__PURE__ */ Symbol.for("react.suspense"), O = /* @__PURE__ */ Symbol.for("react.suspense_list"), L = /* @__PURE__ */ Symbol.for("react.memo"), _ = /* @__PURE__ */ Symbol.for("react.lazy"), u = /* @__PURE__ */ Symbol.for("react.activity"), y = /* @__PURE__ */ Symbol.for("react.client.reference"), E = U.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, w = Object.prototype.hasOwnProperty, h = Array.isArray, p = console.createTask ? console.createTask : function() {
      return null;
    };
    U = {
      react_stack_bottom_frame: function(r) {
        return r();
      }
    };
    var F, Y = {}, I = U.react_stack_bottom_frame.bind(
      U,
      a
    )(), W = p(i(a)), S = {};
    se.Fragment = A, se.jsx = function(r, b, j) {
      var k = 1e4 > E.recentlyCreatedOwnerStacks++;
      return v(
        r,
        b,
        j,
        !1,
        k ? Error("react-stack-top-frame") : I,
        k ? p(i(r)) : W
      );
    }, se.jsxs = function(r, b, j) {
      var k = 1e4 > E.recentlyCreatedOwnerStacks++;
      return v(
        r,
        b,
        j,
        !0,
        k ? Error("react-stack-top-frame") : I,
        k ? p(i(r)) : W
      );
    };
  })()), se;
}
var Re;
function lt() {
  return Re || (Re = 1, process.env.NODE_ENV === "production" ? ue.exports = ot() : ue.exports = at()), ue.exports;
}
var s = lt();
function _e(e) {
  const n = H(e.startBound), t = H(e.endBound), i = H(e.initialStart), o = H(e.initialEnd);
  if (i !== null && o !== null && o > i)
    return oe(
      {
        visibleStartMs: i,
        visibleEndMs: o,
        zoomUnit: e.initialZoomUnit
      },
      n,
      t
    );
  const a = H(e.initialCenter) ?? (e.events.length ? e.events[0].startMs : null) ?? n ?? Date.now();
  return oe(
    xe(a, e.initialZoomUnit, e.viewportHeight, e.unitHeight),
    n,
    t
  );
}
function ct(e) {
  const n = !!e.viewport, [t, i] = Z(
    () => _e(e)
  );
  q(() => {
    e.viewport || i(_e(e));
  }, []), q(() => {
    n || i((l) => {
      const m = l.visibleStartMs + (l.visibleEndMs - l.visibleStartMs) / 2, d = oe(
        xe(m, l.zoomUnit, e.viewportHeight, e.unitHeight),
        H(e.startBound),
        H(e.endBound)
      );
      return d.visibleStartMs === l.visibleStartMs && d.visibleEndMs === l.visibleEndMs && d.zoomUnit === l.zoomUnit ? l : d;
    });
  }, [
    n,
    e.viewportHeight,
    e.unitHeight,
    e.startBound,
    e.endBound
  ]);
  const o = e.viewport ?? t;
  function a(l) {
    n || i(l), e.onViewportChange?.(l);
  }
  return {
    viewport: o,
    setViewport: a,
    startBoundMs: H(e.startBound),
    endBoundMs: H(e.endBound)
  };
}
function ut({
  containerWidth: e
}) {
  return Ge(() => e < 768 ? {
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
function dt({
  viewport: e,
  majorTicks: n,
  minorTicks: t,
  height: i,
  showMajorTicks: o = !0,
  showMajorLabels: a = !0,
  showMinorTicks: l = !0,
  showMinorLabels: m = !0
}) {
  return /* @__PURE__ */ s.jsxs("div", { className: "tl-axis", children: [
    /* @__PURE__ */ s.jsx("div", { className: "tl-axis-line" }),
    o || a ? n.map((d) => {
      const f = ae(e, d.ts, i);
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "tl-tick tl-tick-major",
          style: { top: f },
          children: [
            o ? /* @__PURE__ */ s.jsx("div", { className: "tl-tick-mark" }) : null,
            a ? /* @__PURE__ */ s.jsx("div", { className: "tl-tick-label", children: /* @__PURE__ */ s.jsx("span", { className: "tl-tick-label-major", children: d.label }) }) : null
          ]
        },
        d.key
      );
    }) : null,
    l || m ? t.map((d) => {
      const f = ae(e, d.ts, i);
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "tl-tick tl-tick-minor",
          style: { top: f },
          children: [
            l ? /* @__PURE__ */ s.jsx("div", { className: "tl-tick-mark" }) : null,
            m ? /* @__PURE__ */ s.jsx("div", { className: "tl-tick-label tl-tick-label-minor", children: d.label }) : null
          ]
        },
        d.key
      );
    }) : null
  ] });
}
const mt = /^(?:\d+|\d+AD|\d+BC|1BC)$/;
function ft(e) {
  if (mt.test(e.displayStartLabel))
    return e.displayStartLabel;
  const n = e.metadata?.originalYearNum;
  if (typeof n == "number" && Number.isFinite(n)) {
    const i = Math.trunc(n);
    if (i < 0)
      return `${Math.abs(i)}BC`;
    if (i > 0)
      return `${i}AD`;
  }
  const t = new Date(e.startMs).getUTCFullYear();
  return t < 0 ? `${Math.abs(t) + 1}BC` : t === 0 ? "1BC" : `${t}AD`;
}
function ht({ event: e, isActive: n = !1, onClick: t }) {
  const i = ft(e);
  return /* @__PURE__ */ s.jsx(
    "button",
    {
      type: "button",
      className: `tl-event-card${n ? " tl-event-card-active" : ""}`,
      style: e.color ? { "--tl-event-accent": e.color } : void 0,
      onClick: () => t?.(e),
      children: /* @__PURE__ */ s.jsxs("div", { className: "tl-event-title", children: [
        "(",
        i,
        ") ",
        e.title
      ] })
    }
  );
}
const $e = 52, Oe = 12, pt = 26, pe = 10;
function bt(e, n) {
  return e.filter(
    (t) => t.endMs >= n.visibleStartMs && t.startMs <= n.visibleEndMs
  );
}
function Ue(e) {
  return e.groupId?.trim() || "Ungrouped";
}
function vt(e) {
  return Array.from(new Set(e.map(Ue))).map((t, i) => ({ id: t, label: t, lane: i }));
}
function xt(e, n, t, i, o, a) {
  const l = [];
  for (const d of o) {
    const f = bt(e, n).filter((v) => a ? !0 : Ue(v) === d.id).map((v) => ({
      event: v,
      y: ae(n, v.startMs, t)
    })).sort((v, g) => v.y - g.y || g.event.importance - v.event.importance);
    for (const v of f) {
      const g = l[l.length - 1];
      if (g && g.groupId === d.id && Math.abs(g.y - v.y) <= 18) {
        g.events.push(v.event), g.y = Math.round((g.y + v.y) / 2);
        continue;
      }
      l.push({
        key: `cluster-${d.id}-${v.event.id}-${v.y}`,
        y: v.y,
        groupId: d.id,
        groupLane: d.lane,
        events: [v.event],
        visibleEvents: [],
        hiddenCount: 0
      });
    }
  }
  for (const d of l)
    d.events.sort((f, v) => f.importance !== v.importance ? v.importance - f.importance : f.startMs !== v.startMs ? f.startMs - v.startMs : f.title.localeCompare(v.title)), d.visibleEvents = d.events.slice(0, i), d.hiddenCount = Math.max(0, d.events.length - i);
  return l;
}
function Mt(e) {
  return e.map((n) => {
    const t = /* @__PURE__ */ new Map();
    return n.visibleEvents.forEach((i, o) => {
      t.set(i.id, { side: "right", lane: o });
    }), {
      cluster: n,
      placements: t,
      badgeSide: "right",
      badgeLane: n.visibleEvents.length
    };
  });
}
function Tt({
  events: e,
  viewport: n,
  height: t,
  laneLimit: i,
  collapseGroups: o = !1,
  renderEvent: a,
  onEventClick: l
}) {
  const m = te(null), d = te({}), f = te({}), v = te({}), [g, N] = Z({}), [U, D] = Z({}), [M, A] = Z(null), [C, R] = Z(null), T = o ? [{ id: "__all__", label: "All", lane: 0 }] : vt(e), J = xt(e, n, t, i, T, o), B = Mt(J);
  return q(() => {
    M && !B.some(({ cluster: c }) => c.key === M) && A(null);
  }, [B, M]), q(() => {
    C && !B.some(({ cluster: c }) => c.events.some((O) => O.id === C)) && R(null);
  }, [C, B]), q(() => {
    if (!M)
      return;
    const c = M;
    function O(_) {
      const u = _.target, y = f.current[c];
      y && u && !y.contains(u) && A(null);
    }
    function L(_) {
      _.key === "Escape" && A(null);
    }
    return document.addEventListener("pointerdown", O), document.addEventListener("keydown", L), () => {
      document.removeEventListener("pointerdown", O), document.removeEventListener("keydown", L);
    };
  }, [M]), be(() => {
    const c = m.current;
    if (!c)
      return;
    const O = 12, L = c.clientHeight, _ = {};
    for (const { cluster: u } of B) {
      const y = d.current[u.key];
      if (!y) {
        _[u.key] = 0;
        continue;
      }
      const w = y.offsetHeight / 2, h = u.y - w, p = u.y + w, F = O - h, Y = L - O - p;
      let I = 0;
      p > L - O && (I = Y), I < F && (I = F), _[u.key] = Math.round(I);
    }
    N((u) => {
      const y = Object.keys(u), E = Object.keys(_);
      return y.length !== E.length || E.some((h) => u[h] !== _[h]) ? _ : u;
    });
  }, [B, t, M]), be(() => {
    if (!M) {
      D((Y) => Object.keys(Y).length ? {} : Y);
      return;
    }
    const c = m.current, O = f.current[M], L = v.current[M];
    if (!c || !O || !L)
      return;
    const _ = 12, u = c.clientHeight, y = O.offsetTop + L.offsetTop, E = y + L.offsetHeight;
    let w = 0;
    const h = E - (u - _);
    h > 0 && (w -= h);
    const p = _ - (y + w);
    p > 0 && (w += p);
    const F = Math.round(w);
    D((Y) => Y[M] === F && Object.keys(Y).length === 1 ? Y : { [M]: F });
  }, [M, B, t]), /* @__PURE__ */ s.jsxs("div", { ref: m, className: "tl-event-layer", children: [
    /* @__PURE__ */ s.jsx("div", { className: "tl-group-lanes", "aria-hidden": "true", children: T.map((c) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "tl-group-lane",
        style: {
          left: `calc(${c.lane} * (100% / ${T.length}))`,
          width: `calc(100% / ${T.length})`
        },
        children: /* @__PURE__ */ s.jsx("div", { className: "tl-group-lane-label", children: c.label })
      },
      c.id
    )) }),
    B.map(({ cluster: c, placements: O, badgeSide: L, badgeLane: _ }) => {
      const u = c.visibleEvents[0], y = c.events.some((h) => h.id === C), E = c.visibleEvents.length > 1, w = {
        top: c.y + (g[c.key] ?? 0),
        left: `calc(${c.groupLane} * (100% / ${T.length}))`,
        width: `calc(100% / ${T.length})`,
        height: $e + Math.max(0, c.visibleEvents.length - 1) * pe + (c.hiddenCount > 0 ? Oe + pt : 0),
        zIndex: y ? 350 : M === c.key ? 300 : c.events.length > 1 ? 200 : 10,
        ...u?.color ? { "--tl-event-accent": u.color } : {}
      };
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          ref: (h) => {
            d.current[c.key] = h;
          },
          className: "tl-cluster",
          style: w,
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "tl-cluster-anchor", children: [
              /* @__PURE__ */ s.jsx("div", { className: "tl-point-marker" }),
              /* @__PURE__ */ s.jsx("div", { className: "tl-leader-line" })
            ] }),
            c.visibleEvents.map((h) => {
              const p = O.get(h.id), F = ae(n, h.startMs, t), Y = ae(n, h.endMs, t), I = h.id === C, W = E ? p.lane + 1 : p.lane;
              return /* @__PURE__ */ s.jsxs(
                "div",
                {
                  className: `tl-cluster-item tl-cluster-item-${p.side}`,
                  style: {
                    top: `${W * pe}px`,
                    left: `calc(${W} * var(--tl-card-stack-offset))`,
                    zIndex: I ? c.visibleEvents.length + i + 1 : c.visibleEvents.length - p.lane
                  },
                  children: [
                    h.isRange ? /* @__PURE__ */ s.jsx(
                      "div",
                      {
                        className: "tl-range-bar",
                        style: {
                          top: Math.min(F, Y) - c.y,
                          height: Math.max(10, Math.abs(Y - F))
                        }
                      }
                    ) : null,
                    a ? /* @__PURE__ */ s.jsx(
                      "div",
                      {
                        onClick: () => {
                          R(h.id), l?.(h);
                        },
                        children: a(h)
                      }
                    ) : /* @__PURE__ */ s.jsx(
                      ht,
                      {
                        event: h,
                        isActive: I,
                        onClick: (S) => {
                          R(S.id), l?.(S);
                        }
                      }
                    )
                  ]
                },
                h.id
              );
            }),
            c.hiddenCount > 0 ? /* @__PURE__ */ s.jsxs(
              "div",
              {
                ref: (h) => {
                  f.current[c.key] = h;
                },
                className: "tl-cluster-overlay",
                style: {
                  top: `${$e + (E ? c.visibleEvents.length : Math.max(0, c.visibleEvents.length - 1)) * pe + Oe}px`,
                  left: `calc(${E ? c.visibleEvents.length : Math.max(0, c.visibleEvents.length - 1)} * var(--tl-card-stack-offset))`
                },
                children: [
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `tl-cluster-badge tl-cluster-badge-${L}`,
                      "aria-expanded": M === c.key,
                      onClick: () => A((h) => h === c.key ? null : c.key),
                      children: [
                        "+",
                        c.hiddenCount,
                        " more"
                      ]
                    }
                  ),
                  M === c.key ? /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      ref: (h) => {
                        v.current[c.key] = h;
                      },
                      className: "tl-cluster-popover",
                      onWheel: (h) => {
                        h.stopPropagation();
                      },
                      style: {
                        transform: `translateY(${U[c.key] ?? 0}px)`
                      },
                      children: [
                        /* @__PURE__ */ s.jsxs("div", { className: "tl-cluster-popover-header", children: [
                          /* @__PURE__ */ s.jsx("span", { className: "tl-cluster-popover-title", children: "Cluster Events" }),
                          /* @__PURE__ */ s.jsxs("span", { className: "tl-cluster-popover-count", children: [
                            c.events.length,
                            " total"
                          ] })
                        ] }),
                        /* @__PURE__ */ s.jsx("div", { className: "tl-cluster-popover-list", children: c.events.map((h) => /* @__PURE__ */ s.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "tl-cluster-popover-item",
                            onClick: () => {
                              l?.(h), A(null);
                            },
                            children: [
                              /* @__PURE__ */ s.jsx("span", { className: "tl-cluster-popover-item-title", children: h.title }),
                              /* @__PURE__ */ s.jsx("span", { className: "tl-cluster-popover-item-date", children: Le(h) })
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
        c.key
      );
    })
  ] });
}
function le(e) {
  return Math.max(0, Math.min(1, e));
}
function De(e, n, t, i) {
  const o = t - n;
  return o <= 0 || i <= 0 ? 0 : le((e - n) / o) * i;
}
function yt(e, n, t, i) {
  const o = Math.max(24, Math.min(120, Math.round(i / 4))), a = Array.from({ length: o }, () => 0), l = t - n;
  if (l <= 0 || i <= 0)
    return { bins: a, binCount: o, maxCount: 0 };
  for (const d of e) {
    const f = le((d.startMs - n) / l), v = le((d.endMs - n) / l), g = Math.max(0, Math.min(o - 1, Math.floor(f * (o - 1)))), N = Math.max(g, Math.min(o - 1, Math.ceil(v * (o - 1))));
    for (let U = g; U <= N; U += 1)
      a[U] += 1;
  }
  const m = a.reduce((d, f) => Math.max(d, f), 0);
  return { bins: a, binCount: o, maxCount: m };
}
function gt(e) {
  const n = le(e);
  return `color-mix(in srgb, var(--tl-color-minimap-density-low) ${(1 - n) * 100}%, var(--tl-color-minimap-density-high) ${n * 100}%)`;
}
function Et(e, n, t, i) {
  const o = i - t, a = n.visibleEndMs - n.visibleStartMs;
  if (o <= 0 || a <= 0)
    return n;
  const l = le(e), m = t + l * o, d = Math.max(t, i - a), f = Math.min(
    Math.max(t, m - a / 2),
    d
  );
  return {
    ...n,
    visibleStartMs: f,
    visibleEndMs: f + a
  };
}
function jt({
  events: e,
  viewport: n,
  height: t,
  domainStartMs: i,
  domainEndMs: o,
  variant: a = "default",
  onViewportChange: l
}) {
  const m = te(null), [d, f] = Z(null), [v, g] = Z(t);
  be(() => {
    const u = m.current;
    if (!u)
      return;
    const y = () => {
      const w = u.clientHeight;
      w > 0 && g(w);
    };
    if (y(), typeof ResizeObserver > "u")
      return;
    const E = new ResizeObserver(() => y());
    return E.observe(u), () => E.disconnect();
  }, [t]);
  const N = v > 0 ? v : t, U = De(n.visibleStartMs, i, o, N), D = De(n.visibleEndMs, i, o, N), M = Math.max(18, D - U), A = Math.min(
    Math.max(0, U),
    Math.max(0, N - M)
  ), C = n.visibleEndMs - n.visibleStartMs, R = o - i;
  q(() => {
    if (!d)
      return;
    const u = d;
    function y(w) {
      if (!l || R <= C || N <= M)
        return;
      const h = w.clientY - u.pointerStartY, p = Math.max(0, N - M), F = Math.max(0, Math.min(p, u.viewportTopStart + h)), Y = p <= 0 ? 0 : F / p, I = i + Y * (R - C), W = I + C;
      l({
        ...n,
        visibleStartMs: I,
        visibleEndMs: W
      });
    }
    function E() {
      f(null);
    }
    return window.addEventListener("pointermove", y), window.addEventListener("pointerup", E), window.addEventListener("pointercancel", E), () => {
      window.removeEventListener("pointermove", y), window.removeEventListener("pointerup", E), window.removeEventListener("pointercancel", E);
    };
  }, [
    d,
    R,
    i,
    N,
    l,
    n,
    C,
    M
  ]);
  const T = [i, (i + o) / 2, o].map(
    (u) => new Date(u).getUTCFullYear()
  ), { bins: J, binCount: B, maxCount: c } = yt(
    e,
    i,
    o,
    N
  ), O = B > 0 ? N / B : N, L = a === "nano";
  function _(u) {
    if (!l || N <= 0)
      return;
    const y = m.current?.getBoundingClientRect();
    if (!y || y.height <= 0)
      return;
    const E = (u - y.top) / y.height;
    l(Et(E, n, i, o));
  }
  return /* @__PURE__ */ s.jsxs("aside", { className: `tl-minimap${L ? " tl-minimap-nano" : ""}`, "aria-label": "Timeline overview", children: [
    L ? null : /* @__PURE__ */ s.jsxs("div", { className: "tl-minimap-header", children: [
      /* @__PURE__ */ s.jsx("span", { children: "Overview" }),
      /* @__PURE__ */ s.jsxs("span", { className: "tl-minimap-range", children: [
        new Date(i).getUTCFullYear(),
        " - ",
        new Date(o).getUTCFullYear()
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        ref: m,
        className: "tl-minimap-body",
        onPointerDown: (u) => {
          _(u.clientY);
        },
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "tl-minimap-track" }),
          /* @__PURE__ */ s.jsx("div", { className: "tl-minimap-density", children: J.map((u, y) => {
            if (u <= 0 || c <= 0)
              return null;
            const E = u / c, w = y * O, h = Math.min(w, Math.max(0, N - O));
            return /* @__PURE__ */ s.jsx(
              "div",
              {
                className: "tl-minimap-density-bin",
                title: `${u} events`,
                style: {
                  top: h,
                  height: Math.max(3, O),
                  width: L ? "5px" : `${8 + E * 18}px`,
                  backgroundColor: gt(E)
                }
              },
              `density-${y}`
            );
          }) }),
          /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "tl-minimap-viewport",
              onPointerDown: (u) => {
                u.preventDefault(), u.stopPropagation(), f({
                  pointerStartY: u.clientY,
                  viewportTopStart: A
                });
              },
              style: {
                top: A,
                height: M
              }
            }
          ),
          L ? null : T.map((u, y) => /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "tl-minimap-label",
              style: { top: `${y * 50}%` },
              children: u
            },
            `${u}-${y}`
          ))
        ]
      }
    )
  ] });
}
function Nt(e) {
  if (e.type === "Point") {
    const [n, t] = e.coordinates;
    return `Point ${t.toFixed(4)}, ${n.toFixed(4)}`;
  }
  return e.type === "LineString" ? `LineString with ${e.coordinates.length} points` : `Polygon with ${e.coordinates.length} rings`;
}
function St({
  events: e,
  startBound: n,
  endBound: t,
  maxZoomUnit: i = "century",
  minZoomUnit: o = "day",
  initialZoomUnit: a = "year",
  initialStart: l,
  initialEnd: m,
  initialCenter: d,
  viewport: f,
  onViewportChange: v,
  renderEvent: g,
  renderDetail: N,
  onEventClick: U,
  detailMode: D = "slide",
  height: M = 800,
  unitHeight: A = 100,
  clusterLaneLimit: C = 3,
  display: R,
  theme: T,
  className: J,
  style: B
}) {
  const c = st(e), O = new Set(
    c.map((x) => x.groupId?.trim() || "Ungrouped")
  ).size, L = Ke(a, i, o), _ = te(null), u = te(null), [y, E] = Z(1200), [w, h] = Z(
    typeof M == "number" ? M : 800
  ), [p, F] = Z(null), [Y, I] = Z(!1), W = ut({ containerWidth: y }), S = {
    ...W,
    showMiniMap: R?.showMiniMap ?? W.showMiniMap,
    showMajorTicks: R?.showMajorTicks ?? W.showMajorTicks,
    showMajorLabels: R?.showMajorLabels ?? W.showMajorLabels,
    showMinorTicks: R?.showMinorTicks ?? W.showMinorTicks,
    showMinorLabels: R?.showMinorLabels ?? W.showMinorLabels,
    miniMapWidth: R?.miniMapWidth ?? W.miniMapWidth,
    clusterLaneLimit: R?.clusterLaneLimit ?? W.clusterLaneLimit
  }, { viewport: r, setViewport: b, startBoundMs: j, endBoundMs: k } = ct({
    events: c,
    startBound: n,
    endBound: t,
    maxZoomUnit: i,
    minZoomUnit: o,
    initialZoomUnit: L,
    viewportHeight: w,
    unitHeight: A,
    initialStart: l,
    initialEnd: m,
    initialCenter: d,
    viewport: f,
    onViewportChange: v
  });
  q(() => {
    const x = _.current;
    if (!x || ((() => {
      const ee = x.clientWidth, z = typeof M == "number" ? M : x.clientHeight;
      ee > 0 && E(ee), typeof z == "number" && z > 0 && h(z);
    })(), typeof ResizeObserver > "u"))
      return;
    const X = new ResizeObserver((ee) => {
      const z = ee[0];
      z?.contentRect && (z.contentRect.width > 0 && E(z.contentRect.width), typeof M != "number" && z.contentRect.height > 0 && h(z.contentRect.height));
    });
    return X.observe(x), () => X.disconnect();
  }, [M]), q(() => () => {
    u.current !== null && window.clearTimeout(u.current);
  }, []), q(() => {
    D === "none" && (u.current !== null && (window.clearTimeout(u.current), u.current = null), I(!1), F(null));
  }, [D]), q(() => {
    if (!p)
      return;
    c.some((P) => P.id === p.id) || (u.current !== null && (window.clearTimeout(u.current), u.current = null), I(!1), F(null));
  }, [p, c]), q(() => {
    if (!p)
      return;
    const x = requestAnimationFrame(() => {
      I(!0);
    });
    function P(X) {
      X.key === "Escape" && fe();
    }
    return document.addEventListener("keydown", P), () => {
      cancelAnimationFrame(x), document.removeEventListener("keydown", P);
    };
  }, [p]);
  const Q = et(r), ne = Math.min(
    R?.clusterLaneLimit ?? C,
    S.clusterLaneLimit
  ), $ = S.mode === "mobile" && O > 2, K = r.visibleEndMs - r.visibleStartMs, re = j !== null && Math.abs(r.visibleStartMs - j) < 1, me = k !== null && Math.abs(r.visibleEndMs - k) < 1;
  function Me(x) {
    const P = x === "in" ? Ee(r.zoomUnit, o) : je(r.zoomUnit, i), X = r.visibleStartMs + (r.visibleEndMs - r.visibleStartMs) / 2;
    b(
      Ne(r, P, X, w, A, j, k)
    );
  }
  function Ae(x) {
    if (x.ctrlKey || x.metaKey) {
      x.preventDefault();
      const z = x.currentTarget.getBoundingClientRect(), We = z.height > 0 ? (x.clientY - z.top) / z.height : 0.5, He = r.visibleStartMs + (r.visibleEndMs - r.visibleStartMs) * We, ze = x.deltaY > 0 ? je(r.zoomUnit, i) : Ee(r.zoomUnit, o);
      b(
        Ne(
          r,
          ze,
          He,
          w,
          A,
          j,
          k
        )
      );
      return;
    }
    const P = Math.sign(x.deltaY);
    if (P < 0 && re || P > 0 && me)
      return;
    x.preventDefault();
    const X = x.deltaY / Math.max(w, 1), ee = Math.max(-0.16, Math.min(0.16, X));
    K <= 0 || ee === 0 || b(Qe(r, ee, j, k));
  }
  const Ye = {
    ...B,
    height: M,
    "--tl-axis-width": `${T?.axisWidth ?? S.axisWidth}px`,
    "--tl-axis-offset": `${T?.axisOffset ?? S.axisOffset}px`,
    "--tl-card-width": `${T?.cardWidth ?? S.cardWidth}px`,
    "--tl-card-max-width": `${T?.cardMaxWidth ?? S.cardMaxWidth}px`,
    "--tl-card-stack-offset": `${T?.stackOffset ?? S.stackOffset}px`,
    "--tl-label-shift": `${T?.labelShift ?? S.labelShift}px`,
    "--tl-minimap-width": `${S.miniMapWidth}px`,
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
  }, Te = H(n) !== null || H(t) !== null ? `${n ? new Date(H(n)).getUTCFullYear() : "..."} - ${t ? new Date(H(t)).getUTCFullYear() : "..."}` : null, ye = j ?? c.reduce((x, P) => Math.min(x, P.startMs), Number.POSITIVE_INFINITY), ge = k ?? c.reduce((x, P) => Math.max(x, P.endMs), Number.NEGATIVE_INFINITY), Ie = Number.isFinite(ye) ? ye : r.visibleStartMs, Pe = Number.isFinite(ge) ? ge : r.visibleEndMs, Fe = D !== "none" && p !== null;
  function Be(x) {
    D !== "none" && (u.current !== null && (window.clearTimeout(u.current), u.current = null), F(x), I(!1)), U?.(x);
  }
  function fe() {
    u.current !== null && window.clearTimeout(u.current), I(!1), u.current = window.setTimeout(() => {
      F(null), u.current = null;
    }, 220);
  }
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: _,
      className: `tl-root tl-mode-${S.mode}${S.showMiniMap ? "" : " tl-hide-minimap"}${$ ? " tl-mobile-collapsed-groups" : ""}${J ? ` ${J}` : ""}`,
      "data-layout-mode": S.mode,
      style: Ye,
      onWheel: Ae,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "tl-controls", children: [
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "tl-control-button", onClick: () => Me("out"), children: "-" }),
          /* @__PURE__ */ s.jsxs("div", { className: "tl-zoom-readout", children: [
            /* @__PURE__ */ s.jsx("span", { className: "tl-zoom-unit", children: r.zoomUnit }),
            Te ? /* @__PURE__ */ s.jsx("span", { className: "tl-bounds", children: Te }) : null
          ] }),
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "tl-control-button", onClick: () => Me("in"), children: "+" })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "tl-surface", children: [
          /* @__PURE__ */ s.jsx(
            dt,
            {
              viewport: r,
              majorTicks: Q.majorTicks,
              minorTicks: Q.minorTicks,
              height: w,
              showMajorTicks: S.showMajorTicks,
              showMajorLabels: S.showMajorLabels,
              showMinorTicks: S.showMinorTicks,
              showMinorLabels: S.showMinorLabels
            }
          ),
          /* @__PURE__ */ s.jsx(
            Tt,
            {
              events: c,
              viewport: r,
              height: w,
              laneLimit: ne,
              collapseGroups: $,
              renderEvent: g,
              onEventClick: Be
            }
          ),
          S.showMiniMap ? /* @__PURE__ */ s.jsx(
            jt,
            {
              events: c,
              viewport: r,
              height: w,
              domainStartMs: Ie,
              domainEndMs: Pe,
              variant: S.mode === "mobile" ? "nano" : "default",
              onViewportChange: b
            }
          ) : null
        ] }),
        Fe ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
          /* @__PURE__ */ s.jsx(
            "div",
            {
              className: `tl-detail-backdrop${D === "modal" ? " tl-detail-backdrop-visible" : " tl-detail-backdrop-soft"}${Y ? " tl-detail-backdrop-open" : ""}`,
              onClick: fe
            }
          ),
          /* @__PURE__ */ s.jsxs(
            "aside",
            {
              className: `tl-detail-surface tl-detail-surface-${D}${Y ? " tl-detail-surface-open" : ""}`,
              "aria-modal": D === "modal" ? "true" : void 0,
              role: D === "modal" ? "dialog" : "complementary",
              children: [
                /* @__PURE__ */ s.jsxs("div", { className: "tl-detail-header", children: [
                  /* @__PURE__ */ s.jsxs("div", { children: [
                    /* @__PURE__ */ s.jsx("p", { className: "tl-detail-eyebrow", children: "Event Detail" }),
                    /* @__PURE__ */ s.jsx("h2", { className: "tl-detail-title", children: p.title })
                  ] }),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: "tl-detail-close",
                      onClick: fe,
                      "aria-label": "Close event detail",
                      children: "×"
                    }
                  )
                ] }),
                N ? /* @__PURE__ */ s.jsx("div", { className: "tl-detail-body", children: N(p) }) : /* @__PURE__ */ s.jsxs("div", { className: "tl-detail-body", children: [
                  /* @__PURE__ */ s.jsx("p", { className: "tl-detail-date", children: Le(p) }),
                  p.description ? /* @__PURE__ */ s.jsxs("section", { className: "tl-detail-section", children: [
                    /* @__PURE__ */ s.jsx("h3", { className: "tl-detail-section-title", children: "Summary" }),
                    /* @__PURE__ */ s.jsx("p", { className: "tl-detail-copy", children: p.description })
                  ] }) : null,
                  /* @__PURE__ */ s.jsxs("section", { className: "tl-detail-section", children: [
                    /* @__PURE__ */ s.jsx("h3", { className: "tl-detail-section-title", children: "Details" }),
                    /* @__PURE__ */ s.jsxs("dl", { className: "tl-detail-grid", children: [
                      /* @__PURE__ */ s.jsxs("div", { children: [
                        /* @__PURE__ */ s.jsx("dt", { children: "ID" }),
                        /* @__PURE__ */ s.jsx("dd", { children: p.id })
                      ] }),
                      /* @__PURE__ */ s.jsxs("div", { children: [
                        /* @__PURE__ */ s.jsx("dt", { children: "Type" }),
                        /* @__PURE__ */ s.jsx("dd", { children: p.isRange ? "Range event" : "Point event" })
                      ] }),
                      /* @__PURE__ */ s.jsxs("div", { children: [
                        /* @__PURE__ */ s.jsx("dt", { children: "Importance" }),
                        /* @__PURE__ */ s.jsx("dd", { children: p.importance })
                      ] }),
                      /* @__PURE__ */ s.jsxs("div", { children: [
                        /* @__PURE__ */ s.jsx("dt", { children: "All day" }),
                        /* @__PURE__ */ s.jsx("dd", { children: p.allDay ? "Yes" : "No" })
                      ] }),
                      /* @__PURE__ */ s.jsxs("div", { children: [
                        /* @__PURE__ */ s.jsx("dt", { children: "Media" }),
                        /* @__PURE__ */ s.jsx("dd", { children: p.media?.length ?? 0 })
                      ] }),
                      /* @__PURE__ */ s.jsxs("div", { children: [
                        /* @__PURE__ */ s.jsx("dt", { children: "Attachments" }),
                        /* @__PURE__ */ s.jsx("dd", { children: p.attachments?.length ?? 0 })
                      ] })
                    ] })
                  ] }),
                  p.geo ? /* @__PURE__ */ s.jsxs("section", { className: "tl-detail-section", children: [
                    /* @__PURE__ */ s.jsx("h3", { className: "tl-detail-section-title", children: "Location" }),
                    /* @__PURE__ */ s.jsxs("p", { className: "tl-detail-copy", children: [
                      p.geo.properties?.label ? `${String(p.geo.properties.label)} · ` : "",
                      Nt(p.geo.geometry)
                    ] })
                  ] }) : null,
                  p.media?.length ? /* @__PURE__ */ s.jsxs("section", { className: "tl-detail-section", children: [
                    /* @__PURE__ */ s.jsx("h3", { className: "tl-detail-section-title", children: "Media" }),
                    /* @__PURE__ */ s.jsx("ul", { className: "tl-detail-list", children: p.media.map((x, P) => /* @__PURE__ */ s.jsx("li", { children: /* @__PURE__ */ s.jsx("a", { href: x.url, target: "_blank", rel: "noreferrer", children: x.title ?? `${x.type} asset ${P + 1}` }) }, x.id ?? `${x.type}-${P}`)) })
                  ] }) : null,
                  p.attachments?.length ? /* @__PURE__ */ s.jsxs("section", { className: "tl-detail-section", children: [
                    /* @__PURE__ */ s.jsx("h3", { className: "tl-detail-section-title", children: "Attachments" }),
                    /* @__PURE__ */ s.jsx("ul", { className: "tl-detail-list", children: p.attachments.map((x, P) => /* @__PURE__ */ s.jsx("li", { children: /* @__PURE__ */ s.jsx("a", { href: x.url, target: "_blank", rel: "noreferrer", children: x.name }) }, x.id ?? `${x.name}-${P}`)) })
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
  St as VerticalTimeline,
  de as addUnits,
  oe as clampViewportToBounds,
  Ke as clampZoomUnit,
  Ct as compareZoomUnits,
  xe as createViewportAround,
  we as formatTickLabel,
  et as generateTicks,
  Xe as getVisibleUnitCount,
  kt as getZoomUnits,
  Ee as getZoomedInUnit,
  je as getZoomedOutUnit,
  ae as mapTimeToY,
  H as normalizeDateInput,
  st as normalizeEvents,
  Qe as shiftViewport,
  ve as startOfUnit,
  Ne as zoomViewport
};
