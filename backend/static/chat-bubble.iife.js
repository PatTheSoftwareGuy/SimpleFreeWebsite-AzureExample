var SimpleChatBubble = (function(exports) {
  "use strict";
  function _mergeNamespaces(n, m) {
    for (var i = 0; i < m.length; i++) {
      const e = m[i];
      if (typeof e !== "string" && !Array.isArray(e)) {
        for (const k in e) {
          if (k !== "default" && !(k in n)) {
            const d = Object.getOwnPropertyDescriptor(e, k);
            if (d) {
              Object.defineProperty(n, k, d.get ? d : {
                enumerable: true,
                get: () => e[k]
              });
            }
          }
        }
      }
    }
    return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
  }
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var jsxRuntime$1 = { exports: {} };
  var reactJsxRuntime_production_min = {};
  var react = { exports: {} };
  var react_production_min = {};
  var hasRequiredReact_production_min;
  function requireReact_production_min() {
    if (hasRequiredReact_production_min) return react_production_min;
    hasRequiredReact_production_min = 1;
    var l = /* @__PURE__ */ Symbol.for("react.element"), n = /* @__PURE__ */ Symbol.for("react.portal"), p = /* @__PURE__ */ Symbol.for("react.fragment"), q = /* @__PURE__ */ Symbol.for("react.strict_mode"), r = /* @__PURE__ */ Symbol.for("react.profiler"), t = /* @__PURE__ */ Symbol.for("react.provider"), u = /* @__PURE__ */ Symbol.for("react.context"), v = /* @__PURE__ */ Symbol.for("react.forward_ref"), w = /* @__PURE__ */ Symbol.for("react.suspense"), x = /* @__PURE__ */ Symbol.for("react.memo"), y = /* @__PURE__ */ Symbol.for("react.lazy"), z = Symbol.iterator;
    function A(a) {
      if (null === a || "object" !== typeof a) return null;
      a = z && a[z] || a["@@iterator"];
      return "function" === typeof a ? a : null;
    }
    var B = { isMounted: function() {
      return false;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } }, C = Object.assign, D = {};
    function E(a, b, e) {
      this.props = a;
      this.context = b;
      this.refs = D;
      this.updater = e || B;
    }
    E.prototype.isReactComponent = {};
    E.prototype.setState = function(a, b) {
      if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, a, b, "setState");
    };
    E.prototype.forceUpdate = function(a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate");
    };
    function F() {
    }
    F.prototype = E.prototype;
    function G(a, b, e) {
      this.props = a;
      this.context = b;
      this.refs = D;
      this.updater = e || B;
    }
    var H = G.prototype = new F();
    H.constructor = G;
    C(H, E.prototype);
    H.isPureReactComponent = true;
    var I = Array.isArray, J = Object.prototype.hasOwnProperty, K = { current: null }, L = { key: true, ref: true, __self: true, __source: true };
    function M(a, b, e) {
      var d, c = {}, k = null, h = null;
      if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
      var g = arguments.length - 2;
      if (1 === g) c.children = e;
      else if (1 < g) {
        for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
        c.children = f;
      }
      if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
      return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
    }
    function N(a, b) {
      return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
    }
    function O(a) {
      return "object" === typeof a && null !== a && a.$$typeof === l;
    }
    function escape(a) {
      var b = { "=": "=0", ":": "=2" };
      return "$" + a.replace(/[=:]/g, function(a2) {
        return b[a2];
      });
    }
    var P = /\/+/g;
    function Q(a, b) {
      return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
    }
    function R(a, b, e, d, c) {
      var k = typeof a;
      if ("undefined" === k || "boolean" === k) a = null;
      var h = false;
      if (null === a) h = true;
      else switch (k) {
        case "string":
        case "number":
          h = true;
          break;
        case "object":
          switch (a.$$typeof) {
            case l:
            case n:
              h = true;
          }
      }
      if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
        return a2;
      })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
      h = 0;
      d = "" === d ? "." : d + ":";
      if (I(a)) for (var g = 0; g < a.length; g++) {
        k = a[g];
        var f = d + Q(k, g);
        h += R(k, b, e, f, c);
      }
      else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
      else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
      return h;
    }
    function S(a, b, e) {
      if (null == a) return a;
      var d = [], c = 0;
      R(a, d, "", "", function(a2) {
        return b.call(e, a2, c++);
      });
      return d;
    }
    function T(a) {
      if (-1 === a._status) {
        var b = a._result;
        b = b();
        b.then(function(b2) {
          if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
        }, function(b2) {
          if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
        });
        -1 === a._status && (a._status = 0, a._result = b);
      }
      if (1 === a._status) return a._result.default;
      throw a._result;
    }
    var U = { current: null }, V = { transition: null }, W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
    function X() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    react_production_min.Children = { map: S, forEach: function(a, b, e) {
      S(a, function() {
        b.apply(this, arguments);
      }, e);
    }, count: function(a) {
      var b = 0;
      S(a, function() {
        b++;
      });
      return b;
    }, toArray: function(a) {
      return S(a, function(a2) {
        return a2;
      }) || [];
    }, only: function(a) {
      if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
      return a;
    } };
    react_production_min.Component = E;
    react_production_min.Fragment = p;
    react_production_min.Profiler = r;
    react_production_min.PureComponent = G;
    react_production_min.StrictMode = q;
    react_production_min.Suspense = w;
    react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
    react_production_min.act = X;
    react_production_min.cloneElement = function(a, b, e) {
      if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
      var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
      if (null != b) {
        void 0 !== b.ref && (k = b.ref, h = K.current);
        void 0 !== b.key && (c = "" + b.key);
        if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
        for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
      }
      var f = arguments.length - 2;
      if (1 === f) d.children = e;
      else if (1 < f) {
        g = Array(f);
        for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
        d.children = g;
      }
      return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
    };
    react_production_min.createContext = function(a) {
      a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
      a.Provider = { $$typeof: t, _context: a };
      return a.Consumer = a;
    };
    react_production_min.createElement = M;
    react_production_min.createFactory = function(a) {
      var b = M.bind(null, a);
      b.type = a;
      return b;
    };
    react_production_min.createRef = function() {
      return { current: null };
    };
    react_production_min.forwardRef = function(a) {
      return { $$typeof: v, render: a };
    };
    react_production_min.isValidElement = O;
    react_production_min.lazy = function(a) {
      return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
    };
    react_production_min.memo = function(a, b) {
      return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
    };
    react_production_min.startTransition = function(a) {
      var b = V.transition;
      V.transition = {};
      try {
        a();
      } finally {
        V.transition = b;
      }
    };
    react_production_min.unstable_act = X;
    react_production_min.useCallback = function(a, b) {
      return U.current.useCallback(a, b);
    };
    react_production_min.useContext = function(a) {
      return U.current.useContext(a);
    };
    react_production_min.useDebugValue = function() {
    };
    react_production_min.useDeferredValue = function(a) {
      return U.current.useDeferredValue(a);
    };
    react_production_min.useEffect = function(a, b) {
      return U.current.useEffect(a, b);
    };
    react_production_min.useId = function() {
      return U.current.useId();
    };
    react_production_min.useImperativeHandle = function(a, b, e) {
      return U.current.useImperativeHandle(a, b, e);
    };
    react_production_min.useInsertionEffect = function(a, b) {
      return U.current.useInsertionEffect(a, b);
    };
    react_production_min.useLayoutEffect = function(a, b) {
      return U.current.useLayoutEffect(a, b);
    };
    react_production_min.useMemo = function(a, b) {
      return U.current.useMemo(a, b);
    };
    react_production_min.useReducer = function(a, b, e) {
      return U.current.useReducer(a, b, e);
    };
    react_production_min.useRef = function(a) {
      return U.current.useRef(a);
    };
    react_production_min.useState = function(a) {
      return U.current.useState(a);
    };
    react_production_min.useSyncExternalStore = function(a, b, e) {
      return U.current.useSyncExternalStore(a, b, e);
    };
    react_production_min.useTransition = function() {
      return U.current.useTransition();
    };
    react_production_min.version = "18.3.1";
    return react_production_min;
  }
  var hasRequiredReact;
  function requireReact() {
    if (hasRequiredReact) return react.exports;
    hasRequiredReact = 1;
    {
      react.exports = requireReact_production_min();
    }
    return react.exports;
  }
  var hasRequiredReactJsxRuntime_production_min;
  function requireReactJsxRuntime_production_min() {
    if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
    hasRequiredReactJsxRuntime_production_min = 1;
    var f = requireReact(), k = /* @__PURE__ */ Symbol.for("react.element"), l = /* @__PURE__ */ Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
    function q(c, a, g) {
      var b, d = {}, e = null, h = null;
      void 0 !== g && (e = "" + g);
      void 0 !== a.key && (e = "" + a.key);
      void 0 !== a.ref && (h = a.ref);
      for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
      if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
      return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
    }
    reactJsxRuntime_production_min.Fragment = l;
    reactJsxRuntime_production_min.jsx = q;
    reactJsxRuntime_production_min.jsxs = q;
    return reactJsxRuntime_production_min;
  }
  var hasRequiredJsxRuntime;
  function requireJsxRuntime() {
    if (hasRequiredJsxRuntime) return jsxRuntime$1.exports;
    hasRequiredJsxRuntime = 1;
    {
      jsxRuntime$1.exports = requireReactJsxRuntime_production_min();
    }
    return jsxRuntime$1.exports;
  }
  var jsxRuntimeExports = requireJsxRuntime();
  const jsxRuntime = /* @__PURE__ */ getDefaultExportFromCjs(jsxRuntimeExports);
  const ReactRuntime = /* @__PURE__ */ _mergeNamespaces({
    __proto__: null,
    default: jsxRuntime
  }, [jsxRuntimeExports]);
  var reactExports = requireReact();
  const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
  const React$1 = /* @__PURE__ */ _mergeNamespaces({
    __proto__: null,
    default: React
  }, [reactExports]);
  var client = {};
  var reactDom = { exports: {} };
  var reactDom_production_min = {};
  var scheduler = { exports: {} };
  var scheduler_production_min = {};
  var hasRequiredScheduler_production_min;
  function requireScheduler_production_min() {
    if (hasRequiredScheduler_production_min) return scheduler_production_min;
    hasRequiredScheduler_production_min = 1;
    (function(exports$1) {
      function f(a, b) {
        var c = a.length;
        a.push(b);
        a: for (; 0 < c; ) {
          var d = c - 1 >>> 1, e = a[d];
          if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
          else break a;
        }
      }
      function h(a) {
        return 0 === a.length ? null : a[0];
      }
      function k(a) {
        if (0 === a.length) return null;
        var b = a[0], c = a.pop();
        if (c !== b) {
          a[0] = c;
          a: for (var d = 0, e = a.length, w = e >>> 1; d < w; ) {
            var m = 2 * (d + 1) - 1, C = a[m], n = m + 1, x = a[n];
            if (0 > g(C, c)) n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);
            else if (n < e && 0 > g(x, c)) a[d] = x, a[n] = c, d = n;
            else break a;
          }
        }
        return b;
      }
      function g(a, b) {
        var c = a.sortIndex - b.sortIndex;
        return 0 !== c ? c : a.id - b.id;
      }
      if ("object" === typeof performance && "function" === typeof performance.now) {
        var l = performance;
        exports$1.unstable_now = function() {
          return l.now();
        };
      } else {
        var p = Date, q = p.now();
        exports$1.unstable_now = function() {
          return p.now() - q;
        };
      }
      var r = [], t = [], u = 1, v = null, y = 3, z = false, A = false, B = false, D = "function" === typeof setTimeout ? setTimeout : null, E = "function" === typeof clearTimeout ? clearTimeout : null, F = "undefined" !== typeof setImmediate ? setImmediate : null;
      "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function G(a) {
        for (var b = h(t); null !== b; ) {
          if (null === b.callback) k(t);
          else if (b.startTime <= a) k(t), b.sortIndex = b.expirationTime, f(r, b);
          else break;
          b = h(t);
        }
      }
      function H(a) {
        B = false;
        G(a);
        if (!A) if (null !== h(r)) A = true, I(J);
        else {
          var b = h(t);
          null !== b && K(H, b.startTime - a);
        }
      }
      function J(a, b) {
        A = false;
        B && (B = false, E(L), L = -1);
        z = true;
        var c = y;
        try {
          G(b);
          for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M()); ) {
            var d = v.callback;
            if ("function" === typeof d) {
              v.callback = null;
              y = v.priorityLevel;
              var e = d(v.expirationTime <= b);
              b = exports$1.unstable_now();
              "function" === typeof e ? v.callback = e : v === h(r) && k(r);
              G(b);
            } else k(r);
            v = h(r);
          }
          if (null !== v) var w = true;
          else {
            var m = h(t);
            null !== m && K(H, m.startTime - b);
            w = false;
          }
          return w;
        } finally {
          v = null, y = c, z = false;
        }
      }
      var N = false, O = null, L = -1, P = 5, Q = -1;
      function M() {
        return exports$1.unstable_now() - Q < P ? false : true;
      }
      function R() {
        if (null !== O) {
          var a = exports$1.unstable_now();
          Q = a;
          var b = true;
          try {
            b = O(true, a);
          } finally {
            b ? S() : (N = false, O = null);
          }
        } else N = false;
      }
      var S;
      if ("function" === typeof F) S = function() {
        F(R);
      };
      else if ("undefined" !== typeof MessageChannel) {
        var T = new MessageChannel(), U = T.port2;
        T.port1.onmessage = R;
        S = function() {
          U.postMessage(null);
        };
      } else S = function() {
        D(R, 0);
      };
      function I(a) {
        O = a;
        N || (N = true, S());
      }
      function K(a, b) {
        L = D(function() {
          a(exports$1.unstable_now());
        }, b);
      }
      exports$1.unstable_IdlePriority = 5;
      exports$1.unstable_ImmediatePriority = 1;
      exports$1.unstable_LowPriority = 4;
      exports$1.unstable_NormalPriority = 3;
      exports$1.unstable_Profiling = null;
      exports$1.unstable_UserBlockingPriority = 2;
      exports$1.unstable_cancelCallback = function(a) {
        a.callback = null;
      };
      exports$1.unstable_continueExecution = function() {
        A || z || (A = true, I(J));
      };
      exports$1.unstable_forceFrameRate = function(a) {
        0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1e3 / a) : 5;
      };
      exports$1.unstable_getCurrentPriorityLevel = function() {
        return y;
      };
      exports$1.unstable_getFirstCallbackNode = function() {
        return h(r);
      };
      exports$1.unstable_next = function(a) {
        switch (y) {
          case 1:
          case 2:
          case 3:
            var b = 3;
            break;
          default:
            b = y;
        }
        var c = y;
        y = b;
        try {
          return a();
        } finally {
          y = c;
        }
      };
      exports$1.unstable_pauseExecution = function() {
      };
      exports$1.unstable_requestPaint = function() {
      };
      exports$1.unstable_runWithPriority = function(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            a = 3;
        }
        var c = y;
        y = a;
        try {
          return b();
        } finally {
          y = c;
        }
      };
      exports$1.unstable_scheduleCallback = function(a, b, c) {
        var d = exports$1.unstable_now();
        "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
        switch (a) {
          case 1:
            var e = -1;
            break;
          case 2:
            e = 250;
            break;
          case 5:
            e = 1073741823;
            break;
          case 4:
            e = 1e4;
            break;
          default:
            e = 5e3;
        }
        e = c + e;
        a = { id: u++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
        c > d ? (a.sortIndex = c, f(t, a), null === h(r) && a === h(t) && (B ? (E(L), L = -1) : B = true, K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z || (A = true, I(J)));
        return a;
      };
      exports$1.unstable_shouldYield = M;
      exports$1.unstable_wrapCallback = function(a) {
        var b = y;
        return function() {
          var c = y;
          y = b;
          try {
            return a.apply(this, arguments);
          } finally {
            y = c;
          }
        };
      };
    })(scheduler_production_min);
    return scheduler_production_min;
  }
  var hasRequiredScheduler;
  function requireScheduler() {
    if (hasRequiredScheduler) return scheduler.exports;
    hasRequiredScheduler = 1;
    {
      scheduler.exports = requireScheduler_production_min();
    }
    return scheduler.exports;
  }
  var hasRequiredReactDom_production_min;
  function requireReactDom_production_min() {
    if (hasRequiredReactDom_production_min) return reactDom_production_min;
    hasRequiredReactDom_production_min = 1;
    var aa = requireReact(), ca = requireScheduler();
    function p(a) {
      for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
      return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var da = /* @__PURE__ */ new Set(), ea = {};
    function fa(a, b) {
      ha(a, b);
      ha(a + "Capture", b);
    }
    function ha(a, b) {
      ea[a] = b;
      for (a = 0; a < b.length; a++) da.add(b[a]);
    }
    var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
    function oa(a) {
      if (ja.call(ma, a)) return true;
      if (ja.call(la, a)) return false;
      if (ka.test(a)) return ma[a] = true;
      la[a] = true;
      return false;
    }
    function pa(a, b, c, d) {
      if (null !== c && 0 === c.type) return false;
      switch (typeof b) {
        case "function":
        case "symbol":
          return true;
        case "boolean":
          if (d) return false;
          if (null !== c) return !c.acceptsBooleans;
          a = a.toLowerCase().slice(0, 5);
          return "data-" !== a && "aria-" !== a;
        default:
          return false;
      }
    }
    function qa(a, b, c, d) {
      if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
      if (d) return false;
      if (null !== c) switch (c.type) {
        case 3:
          return !b;
        case 4:
          return false === b;
        case 5:
          return isNaN(b);
        case 6:
          return isNaN(b) || 1 > b;
      }
      return false;
    }
    function v(a, b, c, d, e, f, g) {
      this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
      this.attributeName = d;
      this.attributeNamespace = e;
      this.mustUseProperty = c;
      this.propertyName = a;
      this.type = b;
      this.sanitizeURL = f;
      this.removeEmptyString = g;
    }
    var z = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
      z[a] = new v(a, 0, false, a, null, false, false);
    });
    [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
      var b = a[0];
      z[b] = new v(b, 1, false, a[1], null, false, false);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
      z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
    });
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
      z[a] = new v(a, 2, false, a, null, false, false);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
      z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
    });
    ["checked", "multiple", "muted", "selected"].forEach(function(a) {
      z[a] = new v(a, 3, true, a, null, false, false);
    });
    ["capture", "download"].forEach(function(a) {
      z[a] = new v(a, 4, false, a, null, false, false);
    });
    ["cols", "rows", "size", "span"].forEach(function(a) {
      z[a] = new v(a, 6, false, a, null, false, false);
    });
    ["rowSpan", "start"].forEach(function(a) {
      z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
    });
    var ra = /[\-:]([a-z])/g;
    function sa(a) {
      return a[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
      var b = a.replace(
        ra,
        sa
      );
      z[b] = new v(b, 1, false, a, null, false, false);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
      var b = a.replace(ra, sa);
      z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
    });
    ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
      var b = a.replace(ra, sa);
      z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
    });
    ["tabIndex", "crossOrigin"].forEach(function(a) {
      z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
    });
    z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
    ["src", "href", "action", "formAction"].forEach(function(a) {
      z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
    });
    function ta(a, b, c, d) {
      var e = z.hasOwnProperty(b) ? z[b] : null;
      if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
    }
    var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = /* @__PURE__ */ Symbol.for("react.element"), wa = /* @__PURE__ */ Symbol.for("react.portal"), ya = /* @__PURE__ */ Symbol.for("react.fragment"), za = /* @__PURE__ */ Symbol.for("react.strict_mode"), Aa = /* @__PURE__ */ Symbol.for("react.profiler"), Ba = /* @__PURE__ */ Symbol.for("react.provider"), Ca = /* @__PURE__ */ Symbol.for("react.context"), Da = /* @__PURE__ */ Symbol.for("react.forward_ref"), Ea = /* @__PURE__ */ Symbol.for("react.suspense"), Fa = /* @__PURE__ */ Symbol.for("react.suspense_list"), Ga = /* @__PURE__ */ Symbol.for("react.memo"), Ha = /* @__PURE__ */ Symbol.for("react.lazy");
    var Ia = /* @__PURE__ */ Symbol.for("react.offscreen");
    var Ja = Symbol.iterator;
    function Ka(a) {
      if (null === a || "object" !== typeof a) return null;
      a = Ja && a[Ja] || a["@@iterator"];
      return "function" === typeof a ? a : null;
    }
    var A = Object.assign, La;
    function Ma(a) {
      if (void 0 === La) try {
        throw Error();
      } catch (c) {
        var b = c.stack.trim().match(/\n( *(at )?)/);
        La = b && b[1] || "";
      }
      return "\n" + La + a;
    }
    var Na = false;
    function Oa(a, b) {
      if (!a || Na) return "";
      Na = true;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        if (b) if (b = function() {
          throw Error();
        }, Object.defineProperty(b.prototype, "props", { set: function() {
          throw Error();
        } }), "object" === typeof Reflect && Reflect.construct) {
          try {
            Reflect.construct(b, []);
          } catch (l) {
            var d = l;
          }
          Reflect.construct(a, [], b);
        } else {
          try {
            b.call();
          } catch (l) {
            d = l;
          }
          a.call(b.prototype);
        }
        else {
          try {
            throw Error();
          } catch (l) {
            d = l;
          }
          a();
        }
      } catch (l) {
        if (l && d && "string" === typeof l.stack) {
          for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; ) h--;
          for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
            if (1 !== g || 1 !== h) {
              do
                if (g--, h--, 0 > h || e[g] !== f[h]) {
                  var k = "\n" + e[g].replace(" at new ", " at ");
                  a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
                  return k;
                }
              while (1 <= g && 0 <= h);
            }
            break;
          }
        }
      } finally {
        Na = false, Error.prepareStackTrace = c;
      }
      return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
    }
    function Pa(a) {
      switch (a.tag) {
        case 5:
          return Ma(a.type);
        case 16:
          return Ma("Lazy");
        case 13:
          return Ma("Suspense");
        case 19:
          return Ma("SuspenseList");
        case 0:
        case 2:
        case 15:
          return a = Oa(a.type, false), a;
        case 11:
          return a = Oa(a.type.render, false), a;
        case 1:
          return a = Oa(a.type, true), a;
        default:
          return "";
      }
    }
    function Qa(a) {
      if (null == a) return null;
      if ("function" === typeof a) return a.displayName || a.name || null;
      if ("string" === typeof a) return a;
      switch (a) {
        case ya:
          return "Fragment";
        case wa:
          return "Portal";
        case Aa:
          return "Profiler";
        case za:
          return "StrictMode";
        case Ea:
          return "Suspense";
        case Fa:
          return "SuspenseList";
      }
      if ("object" === typeof a) switch (a.$$typeof) {
        case Ca:
          return (a.displayName || "Context") + ".Consumer";
        case Ba:
          return (a._context.displayName || "Context") + ".Provider";
        case Da:
          var b = a.render;
          a = a.displayName;
          a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
          return a;
        case Ga:
          return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
        case Ha:
          b = a._payload;
          a = a._init;
          try {
            return Qa(a(b));
          } catch (c) {
          }
      }
      return null;
    }
    function Ra(a) {
      var b = a.type;
      switch (a.tag) {
        case 24:
          return "Cache";
        case 9:
          return (b.displayName || "Context") + ".Consumer";
        case 10:
          return (b._context.displayName || "Context") + ".Provider";
        case 18:
          return "DehydratedFragment";
        case 11:
          return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
        case 7:
          return "Fragment";
        case 5:
          return b;
        case 4:
          return "Portal";
        case 3:
          return "Root";
        case 6:
          return "Text";
        case 16:
          return Qa(b);
        case 8:
          return b === za ? "StrictMode" : "Mode";
        case 22:
          return "Offscreen";
        case 12:
          return "Profiler";
        case 21:
          return "Scope";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 25:
          return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
          if ("function" === typeof b) return b.displayName || b.name || null;
          if ("string" === typeof b) return b;
      }
      return null;
    }
    function Sa(a) {
      switch (typeof a) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return a;
        case "object":
          return a;
        default:
          return "";
      }
    }
    function Ta(a) {
      var b = a.type;
      return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
    }
    function Ua(a) {
      var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
      if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
        var e = c.get, f = c.set;
        Object.defineProperty(a, b, { configurable: true, get: function() {
          return e.call(this);
        }, set: function(a2) {
          d = "" + a2;
          f.call(this, a2);
        } });
        Object.defineProperty(a, b, { enumerable: c.enumerable });
        return { getValue: function() {
          return d;
        }, setValue: function(a2) {
          d = "" + a2;
        }, stopTracking: function() {
          a._valueTracker = null;
          delete a[b];
        } };
      }
    }
    function Va(a) {
      a._valueTracker || (a._valueTracker = Ua(a));
    }
    function Wa(a) {
      if (!a) return false;
      var b = a._valueTracker;
      if (!b) return true;
      var c = b.getValue();
      var d = "";
      a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
      a = d;
      return a !== c ? (b.setValue(a), true) : false;
    }
    function Xa(a) {
      a = a || ("undefined" !== typeof document ? document : void 0);
      if ("undefined" === typeof a) return null;
      try {
        return a.activeElement || a.body;
      } catch (b) {
        return a.body;
      }
    }
    function Ya(a, b) {
      var c = b.checked;
      return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
    }
    function Za(a, b) {
      var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
      c = Sa(null != b.value ? b.value : c);
      a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
    }
    function ab(a, b) {
      b = b.checked;
      null != b && ta(a, "checked", b, false);
    }
    function bb(a, b) {
      ab(a, b);
      var c = Sa(b.value), d = b.type;
      if (null != c) if ("number" === d) {
        if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
      } else a.value !== "" + c && (a.value = "" + c);
      else if ("submit" === d || "reset" === d) {
        a.removeAttribute("value");
        return;
      }
      b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
      null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
    }
    function db(a, b, c) {
      if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
        var d = b.type;
        if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
        b = "" + a._wrapperState.initialValue;
        c || b === a.value || (a.value = b);
        a.defaultValue = b;
      }
      c = a.name;
      "" !== c && (a.name = "");
      a.defaultChecked = !!a._wrapperState.initialChecked;
      "" !== c && (a.name = c);
    }
    function cb(a, b, c) {
      if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
    }
    var eb = Array.isArray;
    function fb(a, b, c, d) {
      a = a.options;
      if (b) {
        b = {};
        for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
        for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
      } else {
        c = "" + Sa(c);
        b = null;
        for (e = 0; e < a.length; e++) {
          if (a[e].value === c) {
            a[e].selected = true;
            d && (a[e].defaultSelected = true);
            return;
          }
          null !== b || a[e].disabled || (b = a[e]);
        }
        null !== b && (b.selected = true);
      }
    }
    function gb(a, b) {
      if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
      return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
    }
    function hb(a, b) {
      var c = b.value;
      if (null == c) {
        c = b.children;
        b = b.defaultValue;
        if (null != c) {
          if (null != b) throw Error(p(92));
          if (eb(c)) {
            if (1 < c.length) throw Error(p(93));
            c = c[0];
          }
          b = c;
        }
        null == b && (b = "");
        c = b;
      }
      a._wrapperState = { initialValue: Sa(c) };
    }
    function ib(a, b) {
      var c = Sa(b.value), d = Sa(b.defaultValue);
      null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
      null != d && (a.defaultValue = "" + d);
    }
    function jb(a) {
      var b = a.textContent;
      b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
    }
    function kb(a) {
      switch (a) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function lb(a, b) {
      return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
    }
    var mb, nb = (function(a) {
      return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
        MSApp.execUnsafeLocalFunction(function() {
          return a(b, c, d, e);
        });
      } : a;
    })(function(a, b) {
      if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
      else {
        mb = mb || document.createElement("div");
        mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
        for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
        for (; b.firstChild; ) a.appendChild(b.firstChild);
      }
    });
    function ob(a, b) {
      if (b) {
        var c = a.firstChild;
        if (c && c === a.lastChild && 3 === c.nodeType) {
          c.nodeValue = b;
          return;
        }
      }
      a.textContent = b;
    }
    var pb = {
      animationIterationCount: true,
      aspectRatio: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      columns: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridArea: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowSpan: true,
      gridRowStart: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnSpan: true,
      gridColumnStart: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true
    }, qb = ["Webkit", "ms", "Moz", "O"];
    Object.keys(pb).forEach(function(a) {
      qb.forEach(function(b) {
        b = b + a.charAt(0).toUpperCase() + a.substring(1);
        pb[b] = pb[a];
      });
    });
    function rb(a, b, c) {
      return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
    }
    function sb(a, b) {
      a = a.style;
      for (var c in b) if (b.hasOwnProperty(c)) {
        var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
        "float" === c && (c = "cssFloat");
        d ? a.setProperty(c, e) : a[c] = e;
      }
    }
    var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
    function ub(a, b) {
      if (b) {
        if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
        if (null != b.dangerouslySetInnerHTML) {
          if (null != b.children) throw Error(p(60));
          if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
        }
        if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
      }
    }
    function vb(a, b) {
      if (-1 === a.indexOf("-")) return "string" === typeof b.is;
      switch (a) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return false;
        default:
          return true;
      }
    }
    var wb = null;
    function xb(a) {
      a = a.target || a.srcElement || window;
      a.correspondingUseElement && (a = a.correspondingUseElement);
      return 3 === a.nodeType ? a.parentNode : a;
    }
    var yb = null, zb = null, Ab = null;
    function Bb(a) {
      if (a = Cb(a)) {
        if ("function" !== typeof yb) throw Error(p(280));
        var b = a.stateNode;
        b && (b = Db(b), yb(a.stateNode, a.type, b));
      }
    }
    function Eb(a) {
      zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
    }
    function Fb() {
      if (zb) {
        var a = zb, b = Ab;
        Ab = zb = null;
        Bb(a);
        if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
      }
    }
    function Gb(a, b) {
      return a(b);
    }
    function Hb() {
    }
    var Ib = false;
    function Jb(a, b, c) {
      if (Ib) return a(b, c);
      Ib = true;
      try {
        return Gb(a, b, c);
      } finally {
        if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
      }
    }
    function Kb(a, b) {
      var c = a.stateNode;
      if (null === c) return null;
      var d = Db(c);
      if (null === d) return null;
      c = d[b];
      a: switch (b) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
          a = !d;
          break a;
        default:
          a = false;
      }
      if (a) return null;
      if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
      return c;
    }
    var Lb = false;
    if (ia) try {
      var Mb = {};
      Object.defineProperty(Mb, "passive", { get: function() {
        Lb = true;
      } });
      window.addEventListener("test", Mb, Mb);
      window.removeEventListener("test", Mb, Mb);
    } catch (a) {
      Lb = false;
    }
    function Nb(a, b, c, d, e, f, g, h, k) {
      var l = Array.prototype.slice.call(arguments, 3);
      try {
        b.apply(c, l);
      } catch (m) {
        this.onError(m);
      }
    }
    var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
      Ob = true;
      Pb = a;
    } };
    function Tb(a, b, c, d, e, f, g, h, k) {
      Ob = false;
      Pb = null;
      Nb.apply(Sb, arguments);
    }
    function Ub(a, b, c, d, e, f, g, h, k) {
      Tb.apply(this, arguments);
      if (Ob) {
        if (Ob) {
          var l = Pb;
          Ob = false;
          Pb = null;
        } else throw Error(p(198));
        Qb || (Qb = true, Rb = l);
      }
    }
    function Vb(a) {
      var b = a, c = a;
      if (a.alternate) for (; b.return; ) b = b.return;
      else {
        a = b;
        do
          b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
        while (a);
      }
      return 3 === b.tag ? c : null;
    }
    function Wb(a) {
      if (13 === a.tag) {
        var b = a.memoizedState;
        null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
        if (null !== b) return b.dehydrated;
      }
      return null;
    }
    function Xb(a) {
      if (Vb(a) !== a) throw Error(p(188));
    }
    function Yb(a) {
      var b = a.alternate;
      if (!b) {
        b = Vb(a);
        if (null === b) throw Error(p(188));
        return b !== a ? null : a;
      }
      for (var c = a, d = b; ; ) {
        var e = c.return;
        if (null === e) break;
        var f = e.alternate;
        if (null === f) {
          d = e.return;
          if (null !== d) {
            c = d;
            continue;
          }
          break;
        }
        if (e.child === f.child) {
          for (f = e.child; f; ) {
            if (f === c) return Xb(e), a;
            if (f === d) return Xb(e), b;
            f = f.sibling;
          }
          throw Error(p(188));
        }
        if (c.return !== d.return) c = e, d = f;
        else {
          for (var g = false, h = e.child; h; ) {
            if (h === c) {
              g = true;
              c = e;
              d = f;
              break;
            }
            if (h === d) {
              g = true;
              d = e;
              c = f;
              break;
            }
            h = h.sibling;
          }
          if (!g) {
            for (h = f.child; h; ) {
              if (h === c) {
                g = true;
                c = f;
                d = e;
                break;
              }
              if (h === d) {
                g = true;
                d = f;
                c = e;
                break;
              }
              h = h.sibling;
            }
            if (!g) throw Error(p(189));
          }
        }
        if (c.alternate !== d) throw Error(p(190));
      }
      if (3 !== c.tag) throw Error(p(188));
      return c.stateNode.current === c ? a : b;
    }
    function Zb(a) {
      a = Yb(a);
      return null !== a ? $b(a) : null;
    }
    function $b(a) {
      if (5 === a.tag || 6 === a.tag) return a;
      for (a = a.child; null !== a; ) {
        var b = $b(a);
        if (null !== b) return b;
        a = a.sibling;
      }
      return null;
    }
    var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
    function mc(a) {
      if (lc && "function" === typeof lc.onCommitFiberRoot) try {
        lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
      } catch (b) {
      }
    }
    var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
    function nc(a) {
      a >>>= 0;
      return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
    }
    var rc = 64, sc = 4194304;
    function tc(a) {
      switch (a & -a) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return a & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return a & 130023424;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 1073741824;
        default:
          return a;
      }
    }
    function uc(a, b) {
      var c = a.pendingLanes;
      if (0 === c) return 0;
      var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
      if (0 !== g) {
        var h = g & ~e;
        0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
      } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
      if (0 === d) return 0;
      if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
      0 !== (d & 4) && (d |= c & 16);
      b = a.entangledLanes;
      if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
      return d;
    }
    function vc(a, b) {
      switch (a) {
        case 1:
        case 2:
        case 4:
          return b + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return b + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function wc(a, b) {
      for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f; ) {
        var g = 31 - oc(f), h = 1 << g, k = e[g];
        if (-1 === k) {
          if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
        } else k <= b && (a.expiredLanes |= h);
        f &= ~h;
      }
    }
    function xc(a) {
      a = a.pendingLanes & -1073741825;
      return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
    }
    function yc() {
      var a = rc;
      rc <<= 1;
      0 === (rc & 4194240) && (rc = 64);
      return a;
    }
    function zc(a) {
      for (var b = [], c = 0; 31 > c; c++) b.push(a);
      return b;
    }
    function Ac(a, b, c) {
      a.pendingLanes |= b;
      536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
      a = a.eventTimes;
      b = 31 - oc(b);
      a[b] = c;
    }
    function Bc(a, b) {
      var c = a.pendingLanes & ~b;
      a.pendingLanes = b;
      a.suspendedLanes = 0;
      a.pingedLanes = 0;
      a.expiredLanes &= b;
      a.mutableReadLanes &= b;
      a.entangledLanes &= b;
      b = a.entanglements;
      var d = a.eventTimes;
      for (a = a.expirationTimes; 0 < c; ) {
        var e = 31 - oc(c), f = 1 << e;
        b[e] = 0;
        d[e] = -1;
        a[e] = -1;
        c &= ~f;
      }
    }
    function Cc(a, b) {
      var c = a.entangledLanes |= b;
      for (a = a.entanglements; c; ) {
        var d = 31 - oc(c), e = 1 << d;
        e & b | a[d] & b && (a[d] |= b);
        c &= ~e;
      }
    }
    var C = 0;
    function Dc(a) {
      a &= -a;
      return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
    }
    var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
    function Sc(a, b) {
      switch (a) {
        case "focusin":
        case "focusout":
          Lc = null;
          break;
        case "dragenter":
        case "dragleave":
          Mc = null;
          break;
        case "mouseover":
        case "mouseout":
          Nc = null;
          break;
        case "pointerover":
        case "pointerout":
          Oc.delete(b.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          Pc.delete(b.pointerId);
      }
    }
    function Tc(a, b, c, d, e, f) {
      if (null === a || a.nativeEvent !== f) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
      a.eventSystemFlags |= d;
      b = a.targetContainers;
      null !== e && -1 === b.indexOf(e) && b.push(e);
      return a;
    }
    function Uc(a, b, c, d, e) {
      switch (b) {
        case "focusin":
          return Lc = Tc(Lc, a, b, c, d, e), true;
        case "dragenter":
          return Mc = Tc(Mc, a, b, c, d, e), true;
        case "mouseover":
          return Nc = Tc(Nc, a, b, c, d, e), true;
        case "pointerover":
          var f = e.pointerId;
          Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
          return true;
        case "gotpointercapture":
          return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), true;
      }
      return false;
    }
    function Vc(a) {
      var b = Wc(a.target);
      if (null !== b) {
        var c = Vb(b);
        if (null !== c) {
          if (b = c.tag, 13 === b) {
            if (b = Wb(c), null !== b) {
              a.blockedOn = b;
              Ic(a.priority, function() {
                Gc(c);
              });
              return;
            }
          } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
            a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
            return;
          }
        }
      }
      a.blockedOn = null;
    }
    function Xc(a) {
      if (null !== a.blockedOn) return false;
      for (var b = a.targetContainers; 0 < b.length; ) {
        var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
        if (null === c) {
          c = a.nativeEvent;
          var d = new c.constructor(c.type, c);
          wb = d;
          c.target.dispatchEvent(d);
          wb = null;
        } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
        b.shift();
      }
      return true;
    }
    function Zc(a, b, c) {
      Xc(a) && c.delete(b);
    }
    function $c() {
      Jc = false;
      null !== Lc && Xc(Lc) && (Lc = null);
      null !== Mc && Xc(Mc) && (Mc = null);
      null !== Nc && Xc(Nc) && (Nc = null);
      Oc.forEach(Zc);
      Pc.forEach(Zc);
    }
    function ad(a, b) {
      a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
    }
    function bd(a) {
      function b(b2) {
        return ad(b2, a);
      }
      if (0 < Kc.length) {
        ad(Kc[0], a);
        for (var c = 1; c < Kc.length; c++) {
          var d = Kc[c];
          d.blockedOn === a && (d.blockedOn = null);
        }
      }
      null !== Lc && ad(Lc, a);
      null !== Mc && ad(Mc, a);
      null !== Nc && ad(Nc, a);
      Oc.forEach(b);
      Pc.forEach(b);
      for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
      for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
    }
    var cd = ua.ReactCurrentBatchConfig, dd = true;
    function ed(a, b, c, d) {
      var e = C, f = cd.transition;
      cd.transition = null;
      try {
        C = 1, fd(a, b, c, d);
      } finally {
        C = e, cd.transition = f;
      }
    }
    function gd(a, b, c, d) {
      var e = C, f = cd.transition;
      cd.transition = null;
      try {
        C = 4, fd(a, b, c, d);
      } finally {
        C = e, cd.transition = f;
      }
    }
    function fd(a, b, c, d) {
      if (dd) {
        var e = Yc(a, b, c, d);
        if (null === e) hd(a, b, d, id, c), Sc(a, d);
        else if (Uc(e, a, b, c, d)) d.stopPropagation();
        else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
          for (; null !== e; ) {
            var f = Cb(e);
            null !== f && Ec(f);
            f = Yc(a, b, c, d);
            null === f && hd(a, b, d, id, c);
            if (f === e) break;
            e = f;
          }
          null !== e && d.stopPropagation();
        } else hd(a, b, d, null, c);
      }
    }
    var id = null;
    function Yc(a, b, c, d) {
      id = null;
      a = xb(d);
      a = Wc(a);
      if (null !== a) if (b = Vb(a), null === b) a = null;
      else if (c = b.tag, 13 === c) {
        a = Wb(b);
        if (null !== a) return a;
        a = null;
      } else if (3 === c) {
        if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
        a = null;
      } else b !== a && (a = null);
      id = a;
      return null;
    }
    function jd(a) {
      switch (a) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 4;
        case "message":
          switch (ec()) {
            case fc:
              return 1;
            case gc:
              return 4;
            case hc:
            case ic:
              return 16;
            case jc:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var kd = null, ld = null, md = null;
    function nd() {
      if (md) return md;
      var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
      for (a = 0; a < c && b[a] === e[a]; a++) ;
      var g = c - a;
      for (d = 1; d <= g && b[c - d] === e[f - d]; d++) ;
      return md = e.slice(a, 1 < d ? 1 - d : void 0);
    }
    function od(a) {
      var b = a.keyCode;
      "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
      10 === a && (a = 13);
      return 32 <= a || 13 === a ? a : 0;
    }
    function pd() {
      return true;
    }
    function qd() {
      return false;
    }
    function rd(a) {
      function b(b2, d, e, f, g) {
        this._reactName = b2;
        this._targetInst = e;
        this.type = d;
        this.nativeEvent = f;
        this.target = g;
        this.currentTarget = null;
        for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
        this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : false === f.returnValue) ? pd : qd;
        this.isPropagationStopped = qd;
        return this;
      }
      A(b.prototype, { preventDefault: function() {
        this.defaultPrevented = true;
        var a2 = this.nativeEvent;
        a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
      }, stopPropagation: function() {
        var a2 = this.nativeEvent;
        a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
      }, persist: function() {
      }, isPersistent: pd });
      return b;
    }
    var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
      return a.timeStamp || Date.now();
    }, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
      return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
    }, movementX: function(a) {
      if ("movementX" in a) return a.movementX;
      a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
      return wd;
    }, movementY: function(a) {
      return "movementY" in a ? a.movementY : xd;
    } }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
      return "clipboardData" in a ? a.clipboardData : window.clipboardData;
    } }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, Nd = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    }, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
    function Pd(a) {
      var b = this.nativeEvent;
      return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
    }
    function zd() {
      return Pd;
    }
    var Qd = A({}, ud, { key: function(a) {
      if (a.key) {
        var b = Md[a.key] || a.key;
        if ("Unidentified" !== b) return b;
      }
      return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
    }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
      return "keypress" === a.type ? od(a) : 0;
    }, keyCode: function(a) {
      return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
    }, which: function(a) {
      return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
    } }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
      deltaX: function(a) {
        return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
      },
      deltaY: function(a) {
        return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
    ia && "documentMode" in document && (be = document.documentMode);
    var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
    function ge(a, b) {
      switch (a) {
        case "keyup":
          return -1 !== $d.indexOf(b.keyCode);
        case "keydown":
          return 229 !== b.keyCode;
        case "keypress":
        case "mousedown":
        case "focusout":
          return true;
        default:
          return false;
      }
    }
    function he(a) {
      a = a.detail;
      return "object" === typeof a && "data" in a ? a.data : null;
    }
    var ie = false;
    function je(a, b) {
      switch (a) {
        case "compositionend":
          return he(b);
        case "keypress":
          if (32 !== b.which) return null;
          fe = true;
          return ee;
        case "textInput":
          return a = b.data, a === ee && fe ? null : a;
        default:
          return null;
      }
    }
    function ke(a, b) {
      if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
      switch (a) {
        case "paste":
          return null;
        case "keypress":
          if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
            if (b.char && 1 < b.char.length) return b.char;
            if (b.which) return String.fromCharCode(b.which);
          }
          return null;
        case "compositionend":
          return de && "ko" !== b.locale ? null : b.data;
        default:
          return null;
      }
    }
    var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
    function me(a) {
      var b = a && a.nodeName && a.nodeName.toLowerCase();
      return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
    }
    function ne(a, b, c, d) {
      Eb(d);
      b = oe(b, "onChange");
      0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
    }
    var pe = null, qe = null;
    function re(a) {
      se(a, 0);
    }
    function te(a) {
      var b = ue(a);
      if (Wa(b)) return a;
    }
    function ve(a, b) {
      if ("change" === a) return b;
    }
    var we = false;
    if (ia) {
      var xe;
      if (ia) {
        var ye = "oninput" in document;
        if (!ye) {
          var ze = document.createElement("div");
          ze.setAttribute("oninput", "return;");
          ye = "function" === typeof ze.oninput;
        }
        xe = ye;
      } else xe = false;
      we = xe && (!document.documentMode || 9 < document.documentMode);
    }
    function Ae() {
      pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
    }
    function Be(a) {
      if ("value" === a.propertyName && te(qe)) {
        var b = [];
        ne(b, qe, a, xb(a));
        Jb(re, b);
      }
    }
    function Ce(a, b, c) {
      "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
    }
    function De(a) {
      if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
    }
    function Ee(a, b) {
      if ("click" === a) return te(b);
    }
    function Fe(a, b) {
      if ("input" === a || "change" === a) return te(b);
    }
    function Ge(a, b) {
      return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
    }
    var He = "function" === typeof Object.is ? Object.is : Ge;
    function Ie(a, b) {
      if (He(a, b)) return true;
      if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
      var c = Object.keys(a), d = Object.keys(b);
      if (c.length !== d.length) return false;
      for (d = 0; d < c.length; d++) {
        var e = c[d];
        if (!ja.call(b, e) || !He(a[e], b[e])) return false;
      }
      return true;
    }
    function Je(a) {
      for (; a && a.firstChild; ) a = a.firstChild;
      return a;
    }
    function Ke(a, b) {
      var c = Je(a);
      a = 0;
      for (var d; c; ) {
        if (3 === c.nodeType) {
          d = a + c.textContent.length;
          if (a <= b && d >= b) return { node: c, offset: b - a };
          a = d;
        }
        a: {
          for (; c; ) {
            if (c.nextSibling) {
              c = c.nextSibling;
              break a;
            }
            c = c.parentNode;
          }
          c = void 0;
        }
        c = Je(c);
      }
    }
    function Le(a, b) {
      return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
    }
    function Me() {
      for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
        try {
          var c = "string" === typeof b.contentWindow.location.href;
        } catch (d) {
          c = false;
        }
        if (c) a = b.contentWindow;
        else break;
        b = Xa(a.document);
      }
      return b;
    }
    function Ne(a) {
      var b = a && a.nodeName && a.nodeName.toLowerCase();
      return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
    }
    function Oe(a) {
      var b = Me(), c = a.focusedElem, d = a.selectionRange;
      if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
        if (null !== d && Ne(c)) {
          if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
          else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
            a = a.getSelection();
            var e = c.textContent.length, f = Math.min(d.start, e);
            d = void 0 === d.end ? f : Math.min(d.end, e);
            !a.extend && f > d && (e = d, d = f, f = e);
            e = Ke(c, f);
            var g = Ke(
              c,
              d
            );
            e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
          }
        }
        b = [];
        for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
        "function" === typeof c.focus && c.focus();
        for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
      }
    }
    var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
    function Ue(a, b, c) {
      var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
      Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
    }
    function Ve(a, b) {
      var c = {};
      c[a.toLowerCase()] = b.toLowerCase();
      c["Webkit" + a] = "webkit" + b;
      c["Moz" + a] = "moz" + b;
      return c;
    }
    var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
    ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
    function Ze(a) {
      if (Xe[a]) return Xe[a];
      if (!We[a]) return a;
      var b = We[a], c;
      for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
      return a;
    }
    var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    function ff(a, b) {
      df.set(a, b);
      fa(b, [a]);
    }
    for (var gf = 0; gf < ef.length; gf++) {
      var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
      ff(jf, "on" + kf);
    }
    ff($e, "onAnimationEnd");
    ff(af, "onAnimationIteration");
    ff(bf, "onAnimationStart");
    ff("dblclick", "onDoubleClick");
    ff("focusin", "onFocus");
    ff("focusout", "onBlur");
    ff(cf, "onTransitionEnd");
    ha("onMouseEnter", ["mouseout", "mouseover"]);
    ha("onMouseLeave", ["mouseout", "mouseover"]);
    ha("onPointerEnter", ["pointerout", "pointerover"]);
    ha("onPointerLeave", ["pointerout", "pointerover"]);
    fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
    fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
    fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
    fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
    fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
    fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
    function nf(a, b, c) {
      var d = a.type || "unknown-event";
      a.currentTarget = c;
      Ub(d, b, void 0, a);
      a.currentTarget = null;
    }
    function se(a, b) {
      b = 0 !== (b & 4);
      for (var c = 0; c < a.length; c++) {
        var d = a[c], e = d.event;
        d = d.listeners;
        a: {
          var f = void 0;
          if (b) for (var g = d.length - 1; 0 <= g; g--) {
            var h = d[g], k = h.instance, l = h.currentTarget;
            h = h.listener;
            if (k !== f && e.isPropagationStopped()) break a;
            nf(e, h, l);
            f = k;
          }
          else for (g = 0; g < d.length; g++) {
            h = d[g];
            k = h.instance;
            l = h.currentTarget;
            h = h.listener;
            if (k !== f && e.isPropagationStopped()) break a;
            nf(e, h, l);
            f = k;
          }
        }
      }
      if (Qb) throw a = Rb, Qb = false, Rb = null, a;
    }
    function D(a, b) {
      var c = b[of];
      void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
      var d = a + "__bubble";
      c.has(d) || (pf(b, a, 2, false), c.add(d));
    }
    function qf(a, b, c) {
      var d = 0;
      b && (d |= 4);
      pf(c, a, d, b);
    }
    var rf = "_reactListening" + Math.random().toString(36).slice(2);
    function sf(a) {
      if (!a[rf]) {
        a[rf] = true;
        da.forEach(function(b2) {
          "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
        });
        var b = 9 === a.nodeType ? a : a.ownerDocument;
        null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
      }
    }
    function pf(a, b, c, d) {
      switch (jd(b)) {
        case 1:
          var e = ed;
          break;
        case 4:
          e = gd;
          break;
        default:
          e = fd;
      }
      c = e.bind(null, b, c, a);
      e = void 0;
      !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
      d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
    }
    function hd(a, b, c, d, e) {
      var f = d;
      if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
        if (null === d) return;
        var g = d.tag;
        if (3 === g || 4 === g) {
          var h = d.stateNode.containerInfo;
          if (h === e || 8 === h.nodeType && h.parentNode === e) break;
          if (4 === g) for (g = d.return; null !== g; ) {
            var k = g.tag;
            if (3 === k || 4 === k) {
              if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
            }
            g = g.return;
          }
          for (; null !== h; ) {
            g = Wc(h);
            if (null === g) return;
            k = g.tag;
            if (5 === k || 6 === k) {
              d = f = g;
              continue a;
            }
            h = h.parentNode;
          }
        }
        d = d.return;
      }
      Jb(function() {
        var d2 = f, e2 = xb(c), g2 = [];
        a: {
          var h2 = df.get(a);
          if (void 0 !== h2) {
            var k2 = td, n = a;
            switch (a) {
              case "keypress":
                if (0 === od(c)) break a;
              case "keydown":
              case "keyup":
                k2 = Rd;
                break;
              case "focusin":
                n = "focus";
                k2 = Fd;
                break;
              case "focusout":
                n = "blur";
                k2 = Fd;
                break;
              case "beforeblur":
              case "afterblur":
                k2 = Fd;
                break;
              case "click":
                if (2 === c.button) break a;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                k2 = Bd;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                k2 = Dd;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                k2 = Vd;
                break;
              case $e:
              case af:
              case bf:
                k2 = Hd;
                break;
              case cf:
                k2 = Xd;
                break;
              case "scroll":
                k2 = vd;
                break;
              case "wheel":
                k2 = Zd;
                break;
              case "copy":
              case "cut":
              case "paste":
                k2 = Jd;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                k2 = Td;
            }
            var t = 0 !== (b & 4), J = !t && "scroll" === a, x = t ? null !== h2 ? h2 + "Capture" : null : h2;
            t = [];
            for (var w = d2, u; null !== w; ) {
              u = w;
              var F = u.stateNode;
              5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));
              if (J) break;
              w = w.return;
            }
            0 < t.length && (h2 = new k2(h2, n, null, c, e2), g2.push({ event: h2, listeners: t }));
          }
        }
        if (0 === (b & 7)) {
          a: {
            h2 = "mouseover" === a || "pointerover" === a;
            k2 = "mouseout" === a || "pointerout" === a;
            if (h2 && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf])) break a;
            if (k2 || h2) {
              h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
              if (k2) {
                if (n = c.relatedTarget || c.toElement, k2 = d2, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag)) n = null;
              } else k2 = null, n = d2;
              if (k2 !== n) {
                t = Bd;
                F = "onMouseLeave";
                x = "onMouseEnter";
                w = "mouse";
                if ("pointerout" === a || "pointerover" === a) t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
                J = null == k2 ? h2 : ue(k2);
                u = null == n ? h2 : ue(n);
                h2 = new t(F, w + "leave", k2, c, e2);
                h2.target = J;
                h2.relatedTarget = u;
                F = null;
                Wc(e2) === d2 && (t = new t(x, w + "enter", n, c, e2), t.target = u, t.relatedTarget = J, F = t);
                J = F;
                if (k2 && n) b: {
                  t = k2;
                  x = n;
                  w = 0;
                  for (u = t; u; u = vf(u)) w++;
                  u = 0;
                  for (F = x; F; F = vf(F)) u++;
                  for (; 0 < w - u; ) t = vf(t), w--;
                  for (; 0 < u - w; ) x = vf(x), u--;
                  for (; w--; ) {
                    if (t === x || null !== x && t === x.alternate) break b;
                    t = vf(t);
                    x = vf(x);
                  }
                  t = null;
                }
                else t = null;
                null !== k2 && wf(g2, h2, k2, t, false);
                null !== n && null !== J && wf(g2, J, n, t, true);
              }
            }
          }
          a: {
            h2 = d2 ? ue(d2) : window;
            k2 = h2.nodeName && h2.nodeName.toLowerCase();
            if ("select" === k2 || "input" === k2 && "file" === h2.type) var na = ve;
            else if (me(h2)) if (we) na = Fe;
            else {
              na = De;
              var xa = Ce;
            }
            else (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
            if (na && (na = na(a, d2))) {
              ne(g2, na, c, e2);
              break a;
            }
            xa && xa(a, h2, d2);
            "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
          }
          xa = d2 ? ue(d2) : window;
          switch (a) {
            case "focusin":
              if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
              break;
            case "focusout":
              Se = Re = Qe = null;
              break;
            case "mousedown":
              Te = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Te = false;
              Ue(g2, c, e2);
              break;
            case "selectionchange":
              if (Pe) break;
            case "keydown":
            case "keyup":
              Ue(g2, c, e2);
          }
          var $a;
          if (ae) b: {
            switch (a) {
              case "compositionstart":
                var ba = "onCompositionStart";
                break b;
              case "compositionend":
                ba = "onCompositionEnd";
                break b;
              case "compositionupdate":
                ba = "onCompositionUpdate";
                break b;
            }
            ba = void 0;
          }
          else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
          ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
          if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
        }
        se(g2, b);
      });
    }
    function tf(a, b, c) {
      return { instance: a, listener: b, currentTarget: c };
    }
    function oe(a, b) {
      for (var c = b + "Capture", d = []; null !== a; ) {
        var e = a, f = e.stateNode;
        5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
        a = a.return;
      }
      return d;
    }
    function vf(a) {
      if (null === a) return null;
      do
        a = a.return;
      while (a && 5 !== a.tag);
      return a ? a : null;
    }
    function wf(a, b, c, d, e) {
      for (var f = b._reactName, g = []; null !== c && c !== d; ) {
        var h = c, k = h.alternate, l = h.stateNode;
        if (null !== k && k === d) break;
        5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
        c = c.return;
      }
      0 !== g.length && a.push({ event: b, listeners: g });
    }
    var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
    function zf(a) {
      return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
    }
    function Af(a, b, c) {
      b = zf(b);
      if (zf(a) !== b && c) throw Error(p(425));
    }
    function Bf() {
    }
    var Cf = null, Df = null;
    function Ef(a, b) {
      return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
    }
    var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
      return Hf.resolve(null).then(a).catch(If);
    } : Ff;
    function If(a) {
      setTimeout(function() {
        throw a;
      });
    }
    function Kf(a, b) {
      var c = b, d = 0;
      do {
        var e = c.nextSibling;
        a.removeChild(c);
        if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
          if (0 === d) {
            a.removeChild(e);
            bd(b);
            return;
          }
          d--;
        } else "$" !== c && "$?" !== c && "$!" !== c || d++;
        c = e;
      } while (c);
      bd(b);
    }
    function Lf(a) {
      for (; null != a; a = a.nextSibling) {
        var b = a.nodeType;
        if (1 === b || 3 === b) break;
        if (8 === b) {
          b = a.data;
          if ("$" === b || "$!" === b || "$?" === b) break;
          if ("/$" === b) return null;
        }
      }
      return a;
    }
    function Mf(a) {
      a = a.previousSibling;
      for (var b = 0; a; ) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("$" === c || "$!" === c || "$?" === c) {
            if (0 === b) return a;
            b--;
          } else "/$" === c && b++;
        }
        a = a.previousSibling;
      }
      return null;
    }
    var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
    function Wc(a) {
      var b = a[Of];
      if (b) return b;
      for (var c = a.parentNode; c; ) {
        if (b = c[uf] || c[Of]) {
          c = b.alternate;
          if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
            if (c = a[Of]) return c;
            a = Mf(a);
          }
          return b;
        }
        a = c;
        c = a.parentNode;
      }
      return null;
    }
    function Cb(a) {
      a = a[Of] || a[uf];
      return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
    }
    function ue(a) {
      if (5 === a.tag || 6 === a.tag) return a.stateNode;
      throw Error(p(33));
    }
    function Db(a) {
      return a[Pf] || null;
    }
    var Sf = [], Tf = -1;
    function Uf(a) {
      return { current: a };
    }
    function E(a) {
      0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
    }
    function G(a, b) {
      Tf++;
      Sf[Tf] = a.current;
      a.current = b;
    }
    var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
    function Yf(a, b) {
      var c = a.type.contextTypes;
      if (!c) return Vf;
      var d = a.stateNode;
      if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
      var e = {}, f;
      for (f in c) e[f] = b[f];
      d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
      return e;
    }
    function Zf(a) {
      a = a.childContextTypes;
      return null !== a && void 0 !== a;
    }
    function $f() {
      E(Wf);
      E(H);
    }
    function ag(a, b, c) {
      if (H.current !== Vf) throw Error(p(168));
      G(H, b);
      G(Wf, c);
    }
    function bg(a, b, c) {
      var d = a.stateNode;
      b = b.childContextTypes;
      if ("function" !== typeof d.getChildContext) return c;
      d = d.getChildContext();
      for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
      return A({}, c, d);
    }
    function cg(a) {
      a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
      Xf = H.current;
      G(H, a);
      G(Wf, Wf.current);
      return true;
    }
    function dg(a, b, c) {
      var d = a.stateNode;
      if (!d) throw Error(p(169));
      c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
      G(Wf, c);
    }
    var eg = null, fg = false, gg = false;
    function hg(a) {
      null === eg ? eg = [a] : eg.push(a);
    }
    function ig(a) {
      fg = true;
      hg(a);
    }
    function jg() {
      if (!gg && null !== eg) {
        gg = true;
        var a = 0, b = C;
        try {
          var c = eg;
          for (C = 1; a < c.length; a++) {
            var d = c[a];
            do
              d = d(true);
            while (null !== d);
          }
          eg = null;
          fg = false;
        } catch (e) {
          throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
        } finally {
          C = b, gg = false;
        }
      }
      return null;
    }
    var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
    function tg(a, b) {
      kg[lg++] = ng;
      kg[lg++] = mg;
      mg = a;
      ng = b;
    }
    function ug(a, b, c) {
      og[pg++] = rg;
      og[pg++] = sg;
      og[pg++] = qg;
      qg = a;
      var d = rg;
      a = sg;
      var e = 32 - oc(d) - 1;
      d &= ~(1 << e);
      c += 1;
      var f = 32 - oc(b) + e;
      if (30 < f) {
        var g = e - e % 5;
        f = (d & (1 << g) - 1).toString(32);
        d >>= g;
        e -= g;
        rg = 1 << 32 - oc(b) + e | c << e | d;
        sg = f + a;
      } else rg = 1 << f | c << e | d, sg = a;
    }
    function vg(a) {
      null !== a.return && (tg(a, 1), ug(a, 1, 0));
    }
    function wg(a) {
      for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
      for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
    }
    var xg = null, yg = null, I = false, zg = null;
    function Ag(a, b) {
      var c = Bg(5, null, null, 0);
      c.elementType = "DELETED";
      c.stateNode = b;
      c.return = a;
      b = a.deletions;
      null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
    }
    function Cg(a, b) {
      switch (a.tag) {
        case 5:
          var c = a.type;
          b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
          return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
        case 6:
          return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
        case 13:
          return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
        default:
          return false;
      }
    }
    function Dg(a) {
      return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
    }
    function Eg(a) {
      if (I) {
        var b = yg;
        if (b) {
          var c = b;
          if (!Cg(a, b)) {
            if (Dg(a)) throw Error(p(418));
            b = Lf(c.nextSibling);
            var d = xg;
            b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
          }
        } else {
          if (Dg(a)) throw Error(p(418));
          a.flags = a.flags & -4097 | 2;
          I = false;
          xg = a;
        }
      }
    }
    function Fg(a) {
      for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
      xg = a;
    }
    function Gg(a) {
      if (a !== xg) return false;
      if (!I) return Fg(a), I = true, false;
      var b;
      (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
      if (b && (b = yg)) {
        if (Dg(a)) throw Hg(), Error(p(418));
        for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
      }
      Fg(a);
      if (13 === a.tag) {
        a = a.memoizedState;
        a = null !== a ? a.dehydrated : null;
        if (!a) throw Error(p(317));
        a: {
          a = a.nextSibling;
          for (b = 0; a; ) {
            if (8 === a.nodeType) {
              var c = a.data;
              if ("/$" === c) {
                if (0 === b) {
                  yg = Lf(a.nextSibling);
                  break a;
                }
                b--;
              } else "$" !== c && "$!" !== c && "$?" !== c || b++;
            }
            a = a.nextSibling;
          }
          yg = null;
        }
      } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
      return true;
    }
    function Hg() {
      for (var a = yg; a; ) a = Lf(a.nextSibling);
    }
    function Ig() {
      yg = xg = null;
      I = false;
    }
    function Jg(a) {
      null === zg ? zg = [a] : zg.push(a);
    }
    var Kg = ua.ReactCurrentBatchConfig;
    function Lg(a, b, c) {
      a = c.ref;
      if (null !== a && "function" !== typeof a && "object" !== typeof a) {
        if (c._owner) {
          c = c._owner;
          if (c) {
            if (1 !== c.tag) throw Error(p(309));
            var d = c.stateNode;
          }
          if (!d) throw Error(p(147, a));
          var e = d, f = "" + a;
          if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;
          b = function(a2) {
            var b2 = e.refs;
            null === a2 ? delete b2[f] : b2[f] = a2;
          };
          b._stringRef = f;
          return b;
        }
        if ("string" !== typeof a) throw Error(p(284));
        if (!c._owner) throw Error(p(290, a));
      }
      return a;
    }
    function Mg(a, b) {
      a = Object.prototype.toString.call(b);
      throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
    }
    function Ng(a) {
      var b = a._init;
      return b(a._payload);
    }
    function Og(a) {
      function b(b2, c2) {
        if (a) {
          var d2 = b2.deletions;
          null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
        }
      }
      function c(c2, d2) {
        if (!a) return null;
        for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
        return null;
      }
      function d(a2, b2) {
        for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
        return a2;
      }
      function e(a2, b2) {
        a2 = Pg(a2, b2);
        a2.index = 0;
        a2.sibling = null;
        return a2;
      }
      function f(b2, c2, d2) {
        b2.index = d2;
        if (!a) return b2.flags |= 1048576, c2;
        d2 = b2.alternate;
        if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
        b2.flags |= 2;
        return c2;
      }
      function g(b2) {
        a && null === b2.alternate && (b2.flags |= 2);
        return b2;
      }
      function h(a2, b2, c2, d2) {
        if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
        b2 = e(b2, c2);
        b2.return = a2;
        return b2;
      }
      function k(a2, b2, c2, d2) {
        var f2 = c2.type;
        if (f2 === ya) return m(a2, b2, c2.props.children, d2, c2.key);
        if (null !== b2 && (b2.elementType === f2 || "object" === typeof f2 && null !== f2 && f2.$$typeof === Ha && Ng(f2) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
        d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
        d2.ref = Lg(a2, b2, c2);
        d2.return = a2;
        return d2;
      }
      function l(a2, b2, c2, d2) {
        if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
        b2 = e(b2, c2.children || []);
        b2.return = a2;
        return b2;
      }
      function m(a2, b2, c2, d2, f2) {
        if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f2), b2.return = a2, b2;
        b2 = e(b2, c2);
        b2.return = a2;
        return b2;
      }
      function q(a2, b2, c2) {
        if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
        if ("object" === typeof b2 && null !== b2) {
          switch (b2.$$typeof) {
            case va:
              return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
            case wa:
              return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
            case Ha:
              var d2 = b2._init;
              return q(a2, d2(b2._payload), c2);
          }
          if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
          Mg(a2, b2);
        }
        return null;
      }
      function r(a2, b2, c2, d2) {
        var e2 = null !== b2 ? b2.key : null;
        if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
        if ("object" === typeof c2 && null !== c2) {
          switch (c2.$$typeof) {
            case va:
              return c2.key === e2 ? k(a2, b2, c2, d2) : null;
            case wa:
              return c2.key === e2 ? l(a2, b2, c2, d2) : null;
            case Ha:
              return e2 = c2._init, r(
                a2,
                b2,
                e2(c2._payload),
                d2
              );
          }
          if (eb(c2) || Ka(c2)) return null !== e2 ? null : m(a2, b2, c2, d2, null);
          Mg(a2, c2);
        }
        return null;
      }
      function y(a2, b2, c2, d2, e2) {
        if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
        if ("object" === typeof d2 && null !== d2) {
          switch (d2.$$typeof) {
            case va:
              return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k(b2, a2, d2, e2);
            case wa:
              return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l(b2, a2, d2, e2);
            case Ha:
              var f2 = d2._init;
              return y(a2, b2, c2, f2(d2._payload), e2);
          }
          if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m(b2, a2, d2, e2, null);
          Mg(b2, d2);
        }
        return null;
      }
      function n(e2, g2, h2, k2) {
        for (var l2 = null, m2 = null, u = g2, w = g2 = 0, x = null; null !== u && w < h2.length; w++) {
          u.index > w ? (x = u, u = null) : x = u.sibling;
          var n2 = r(e2, u, h2[w], k2);
          if (null === n2) {
            null === u && (u = x);
            break;
          }
          a && u && null === n2.alternate && b(e2, u);
          g2 = f(n2, g2, w);
          null === m2 ? l2 = n2 : m2.sibling = n2;
          m2 = n2;
          u = x;
        }
        if (w === h2.length) return c(e2, u), I && tg(e2, w), l2;
        if (null === u) {
          for (; w < h2.length; w++) u = q(e2, h2[w], k2), null !== u && (g2 = f(u, g2, w), null === m2 ? l2 = u : m2.sibling = u, m2 = u);
          I && tg(e2, w);
          return l2;
        }
        for (u = d(e2, u); w < h2.length; w++) x = y(u, e2, w, h2[w], k2), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), g2 = f(x, g2, w), null === m2 ? l2 = x : m2.sibling = x, m2 = x);
        a && u.forEach(function(a2) {
          return b(e2, a2);
        });
        I && tg(e2, w);
        return l2;
      }
      function t(e2, g2, h2, k2) {
        var l2 = Ka(h2);
        if ("function" !== typeof l2) throw Error(p(150));
        h2 = l2.call(h2);
        if (null == h2) throw Error(p(151));
        for (var u = l2 = null, m2 = g2, w = g2 = 0, x = null, n2 = h2.next(); null !== m2 && !n2.done; w++, n2 = h2.next()) {
          m2.index > w ? (x = m2, m2 = null) : x = m2.sibling;
          var t2 = r(e2, m2, n2.value, k2);
          if (null === t2) {
            null === m2 && (m2 = x);
            break;
          }
          a && m2 && null === t2.alternate && b(e2, m2);
          g2 = f(t2, g2, w);
          null === u ? l2 = t2 : u.sibling = t2;
          u = t2;
          m2 = x;
        }
        if (n2.done) return c(
          e2,
          m2
        ), I && tg(e2, w), l2;
        if (null === m2) {
          for (; !n2.done; w++, n2 = h2.next()) n2 = q(e2, n2.value, k2), null !== n2 && (g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
          I && tg(e2, w);
          return l2;
        }
        for (m2 = d(e2, m2); !n2.done; w++, n2 = h2.next()) n2 = y(m2, e2, w, n2.value, k2), null !== n2 && (a && null !== n2.alternate && m2.delete(null === n2.key ? w : n2.key), g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
        a && m2.forEach(function(a2) {
          return b(e2, a2);
        });
        I && tg(e2, w);
        return l2;
      }
      function J(a2, d2, f2, h2) {
        "object" === typeof f2 && null !== f2 && f2.type === ya && null === f2.key && (f2 = f2.props.children);
        if ("object" === typeof f2 && null !== f2) {
          switch (f2.$$typeof) {
            case va:
              a: {
                for (var k2 = f2.key, l2 = d2; null !== l2; ) {
                  if (l2.key === k2) {
                    k2 = f2.type;
                    if (k2 === ya) {
                      if (7 === l2.tag) {
                        c(a2, l2.sibling);
                        d2 = e(l2, f2.props.children);
                        d2.return = a2;
                        a2 = d2;
                        break a;
                      }
                    } else if (l2.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ha && Ng(k2) === l2.type) {
                      c(a2, l2.sibling);
                      d2 = e(l2, f2.props);
                      d2.ref = Lg(a2, l2, f2);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    }
                    c(a2, l2);
                    break;
                  } else b(a2, l2);
                  l2 = l2.sibling;
                }
                f2.type === ya ? (d2 = Tg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Rg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f2), h2.return = a2, a2 = h2);
              }
              return g(a2);
            case wa:
              a: {
                for (l2 = f2.key; null !== d2; ) {
                  if (d2.key === l2) if (4 === d2.tag && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                    c(a2, d2.sibling);
                    d2 = e(d2, f2.children || []);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  } else {
                    c(a2, d2);
                    break;
                  }
                  else b(a2, d2);
                  d2 = d2.sibling;
                }
                d2 = Sg(f2, a2.mode, h2);
                d2.return = a2;
                a2 = d2;
              }
              return g(a2);
            case Ha:
              return l2 = f2._init, J(a2, d2, l2(f2._payload), h2);
          }
          if (eb(f2)) return n(a2, d2, f2, h2);
          if (Ka(f2)) return t(a2, d2, f2, h2);
          Mg(a2, f2);
        }
        return "string" === typeof f2 && "" !== f2 || "number" === typeof f2 ? (f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
      }
      return J;
    }
    var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
    function $g() {
      Zg = Yg = Xg = null;
    }
    function ah(a) {
      var b = Wg.current;
      E(Wg);
      a._currentValue = b;
    }
    function bh(a, b, c) {
      for (; null !== a; ) {
        var d = a.alternate;
        (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
        if (a === c) break;
        a = a.return;
      }
    }
    function ch(a, b) {
      Xg = a;
      Zg = Yg = null;
      a = a.dependencies;
      null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
    }
    function eh(a) {
      var b = a._currentValue;
      if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
        if (null === Xg) throw Error(p(308));
        Yg = a;
        Xg.dependencies = { lanes: 0, firstContext: a };
      } else Yg = Yg.next = a;
      return b;
    }
    var fh = null;
    function gh(a) {
      null === fh ? fh = [a] : fh.push(a);
    }
    function hh(a, b, c, d) {
      var e = b.interleaved;
      null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
      b.interleaved = c;
      return ih(a, d);
    }
    function ih(a, b) {
      a.lanes |= b;
      var c = a.alternate;
      null !== c && (c.lanes |= b);
      c = a;
      for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
      return 3 === c.tag ? c.stateNode : null;
    }
    var jh = false;
    function kh(a) {
      a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
    }
    function lh(a, b) {
      a = a.updateQueue;
      b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
    }
    function mh(a, b) {
      return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
    }
    function nh(a, b, c) {
      var d = a.updateQueue;
      if (null === d) return null;
      d = d.shared;
      if (0 !== (K & 2)) {
        var e = d.pending;
        null === e ? b.next = b : (b.next = e.next, e.next = b);
        d.pending = b;
        return ih(a, c);
      }
      e = d.interleaved;
      null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
      d.interleaved = b;
      return ih(a, c);
    }
    function oh(a, b, c) {
      b = b.updateQueue;
      if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
        var d = b.lanes;
        d &= a.pendingLanes;
        c |= d;
        b.lanes = c;
        Cc(a, c);
      }
    }
    function ph(a, b) {
      var c = a.updateQueue, d = a.alternate;
      if (null !== d && (d = d.updateQueue, c === d)) {
        var e = null, f = null;
        c = c.firstBaseUpdate;
        if (null !== c) {
          do {
            var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
            null === f ? e = f = g : f = f.next = g;
            c = c.next;
          } while (null !== c);
          null === f ? e = f = b : f = f.next = b;
        } else e = f = b;
        c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
        a.updateQueue = c;
        return;
      }
      a = c.lastBaseUpdate;
      null === a ? c.firstBaseUpdate = b : a.next = b;
      c.lastBaseUpdate = b;
    }
    function qh(a, b, c, d) {
      var e = a.updateQueue;
      jh = false;
      var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
      if (null !== h) {
        e.shared.pending = null;
        var k = h, l = k.next;
        k.next = null;
        null === g ? f = l : g.next = l;
        g = k;
        var m = a.alternate;
        null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
      }
      if (null !== f) {
        var q = e.baseState;
        g = 0;
        m = l = k = null;
        h = f;
        do {
          var r = h.lane, y = h.eventTime;
          if ((d & r) === r) {
            null !== m && (m = m.next = {
              eventTime: y,
              lane: 0,
              tag: h.tag,
              payload: h.payload,
              callback: h.callback,
              next: null
            });
            a: {
              var n = a, t = h;
              r = b;
              y = c;
              switch (t.tag) {
                case 1:
                  n = t.payload;
                  if ("function" === typeof n) {
                    q = n.call(y, q, r);
                    break a;
                  }
                  q = n;
                  break a;
                case 3:
                  n.flags = n.flags & -65537 | 128;
                case 0:
                  n = t.payload;
                  r = "function" === typeof n ? n.call(y, q, r) : n;
                  if (null === r || void 0 === r) break a;
                  q = A({}, q, r);
                  break a;
                case 2:
                  jh = true;
              }
            }
            null !== h.callback && 0 !== h.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [h] : r.push(h));
          } else y = { eventTime: y, lane: r, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
          h = h.next;
          if (null === h) if (h = e.shared.pending, null === h) break;
          else r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
        } while (1);
        null === m && (k = q);
        e.baseState = k;
        e.firstBaseUpdate = l;
        e.lastBaseUpdate = m;
        b = e.shared.interleaved;
        if (null !== b) {
          e = b;
          do
            g |= e.lane, e = e.next;
          while (e !== b);
        } else null === f && (e.shared.lanes = 0);
        rh |= g;
        a.lanes = g;
        a.memoizedState = q;
      }
    }
    function sh(a, b, c) {
      a = b.effects;
      b.effects = null;
      if (null !== a) for (b = 0; b < a.length; b++) {
        var d = a[b], e = d.callback;
        if (null !== e) {
          d.callback = null;
          d = c;
          if ("function" !== typeof e) throw Error(p(191, e));
          e.call(d);
        }
      }
    }
    var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
    function xh(a) {
      if (a === th) throw Error(p(174));
      return a;
    }
    function yh(a, b) {
      G(wh, b);
      G(vh, a);
      G(uh, th);
      a = b.nodeType;
      switch (a) {
        case 9:
        case 11:
          b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
          break;
        default:
          a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
      }
      E(uh);
      G(uh, b);
    }
    function zh() {
      E(uh);
      E(vh);
      E(wh);
    }
    function Ah(a) {
      xh(wh.current);
      var b = xh(uh.current);
      var c = lb(b, a.type);
      b !== c && (G(vh, a), G(uh, c));
    }
    function Bh(a) {
      vh.current === a && (E(uh), E(vh));
    }
    var L = Uf(0);
    function Ch(a) {
      for (var b = a; null !== b; ) {
        if (13 === b.tag) {
          var c = b.memoizedState;
          if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
        } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
          if (0 !== (b.flags & 128)) return b;
        } else if (null !== b.child) {
          b.child.return = b;
          b = b.child;
          continue;
        }
        if (b === a) break;
        for (; null === b.sibling; ) {
          if (null === b.return || b.return === a) return null;
          b = b.return;
        }
        b.sibling.return = b.return;
        b = b.sibling;
      }
      return null;
    }
    var Dh = [];
    function Eh() {
      for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
      Dh.length = 0;
    }
    var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
    function P() {
      throw Error(p(321));
    }
    function Mh(a, b) {
      if (null === b) return false;
      for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
      return true;
    }
    function Nh(a, b, c, d, e, f) {
      Hh = f;
      M = b;
      b.memoizedState = null;
      b.updateQueue = null;
      b.lanes = 0;
      Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
      a = c(d, e);
      if (Jh) {
        f = 0;
        do {
          Jh = false;
          Kh = 0;
          if (25 <= f) throw Error(p(301));
          f += 1;
          O = N = null;
          b.updateQueue = null;
          Fh.current = Qh;
          a = c(d, e);
        } while (Jh);
      }
      Fh.current = Rh;
      b = null !== N && null !== N.next;
      Hh = 0;
      O = N = M = null;
      Ih = false;
      if (b) throw Error(p(300));
      return a;
    }
    function Sh() {
      var a = 0 !== Kh;
      Kh = 0;
      return a;
    }
    function Th() {
      var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
      null === O ? M.memoizedState = O = a : O = O.next = a;
      return O;
    }
    function Uh() {
      if (null === N) {
        var a = M.alternate;
        a = null !== a ? a.memoizedState : null;
      } else a = N.next;
      var b = null === O ? M.memoizedState : O.next;
      if (null !== b) O = b, N = a;
      else {
        if (null === a) throw Error(p(310));
        N = a;
        a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
        null === O ? M.memoizedState = O = a : O = O.next = a;
      }
      return O;
    }
    function Vh(a, b) {
      return "function" === typeof b ? b(a) : b;
    }
    function Wh(a) {
      var b = Uh(), c = b.queue;
      if (null === c) throw Error(p(311));
      c.lastRenderedReducer = a;
      var d = N, e = d.baseQueue, f = c.pending;
      if (null !== f) {
        if (null !== e) {
          var g = e.next;
          e.next = f.next;
          f.next = g;
        }
        d.baseQueue = e = f;
        c.pending = null;
      }
      if (null !== e) {
        f = e.next;
        d = d.baseState;
        var h = g = null, k = null, l = f;
        do {
          var m = l.lane;
          if ((Hh & m) === m) null !== k && (k = k.next = { lane: 0, action: l.action, hasEagerState: l.hasEagerState, eagerState: l.eagerState, next: null }), d = l.hasEagerState ? l.eagerState : a(d, l.action);
          else {
            var q = {
              lane: m,
              action: l.action,
              hasEagerState: l.hasEagerState,
              eagerState: l.eagerState,
              next: null
            };
            null === k ? (h = k = q, g = d) : k = k.next = q;
            M.lanes |= m;
            rh |= m;
          }
          l = l.next;
        } while (null !== l && l !== f);
        null === k ? g = d : k.next = h;
        He(d, b.memoizedState) || (dh = true);
        b.memoizedState = d;
        b.baseState = g;
        b.baseQueue = k;
        c.lastRenderedState = d;
      }
      a = c.interleaved;
      if (null !== a) {
        e = a;
        do
          f = e.lane, M.lanes |= f, rh |= f, e = e.next;
        while (e !== a);
      } else null === e && (c.lanes = 0);
      return [b.memoizedState, c.dispatch];
    }
    function Xh(a) {
      var b = Uh(), c = b.queue;
      if (null === c) throw Error(p(311));
      c.lastRenderedReducer = a;
      var d = c.dispatch, e = c.pending, f = b.memoizedState;
      if (null !== e) {
        c.pending = null;
        var g = e = e.next;
        do
          f = a(f, g.action), g = g.next;
        while (g !== e);
        He(f, b.memoizedState) || (dh = true);
        b.memoizedState = f;
        null === b.baseQueue && (b.baseState = f);
        c.lastRenderedState = f;
      }
      return [f, d];
    }
    function Yh() {
    }
    function Zh(a, b) {
      var c = M, d = Uh(), e = b(), f = !He(d.memoizedState, e);
      f && (d.memoizedState = e, dh = true);
      d = d.queue;
      $h(ai.bind(null, c, d, a), [a]);
      if (d.getSnapshot !== b || f || null !== O && O.memoizedState.tag & 1) {
        c.flags |= 2048;
        bi(9, ci.bind(null, c, d, e, b), void 0, null);
        if (null === Q) throw Error(p(349));
        0 !== (Hh & 30) || di(c, b, e);
      }
      return e;
    }
    function di(a, b, c) {
      a.flags |= 16384;
      a = { getSnapshot: b, value: c };
      b = M.updateQueue;
      null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
    }
    function ci(a, b, c, d) {
      b.value = c;
      b.getSnapshot = d;
      ei(b) && fi(a);
    }
    function ai(a, b, c) {
      return c(function() {
        ei(b) && fi(a);
      });
    }
    function ei(a) {
      var b = a.getSnapshot;
      a = a.value;
      try {
        var c = b();
        return !He(a, c);
      } catch (d) {
        return true;
      }
    }
    function fi(a) {
      var b = ih(a, 1);
      null !== b && gi(b, a, 1, -1);
    }
    function hi(a) {
      var b = Th();
      "function" === typeof a && (a = a());
      b.memoizedState = b.baseState = a;
      a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
      b.queue = a;
      a = a.dispatch = ii.bind(null, M, a);
      return [b.memoizedState, a];
    }
    function bi(a, b, c, d) {
      a = { tag: a, create: b, destroy: c, deps: d, next: null };
      b = M.updateQueue;
      null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
      return a;
    }
    function ji() {
      return Uh().memoizedState;
    }
    function ki(a, b, c, d) {
      var e = Th();
      M.flags |= a;
      e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
    }
    function li(a, b, c, d) {
      var e = Uh();
      d = void 0 === d ? null : d;
      var f = void 0;
      if (null !== N) {
        var g = N.memoizedState;
        f = g.destroy;
        if (null !== d && Mh(d, g.deps)) {
          e.memoizedState = bi(b, c, f, d);
          return;
        }
      }
      M.flags |= a;
      e.memoizedState = bi(1 | b, c, f, d);
    }
    function mi(a, b) {
      return ki(8390656, 8, a, b);
    }
    function $h(a, b) {
      return li(2048, 8, a, b);
    }
    function ni(a, b) {
      return li(4, 2, a, b);
    }
    function oi(a, b) {
      return li(4, 4, a, b);
    }
    function pi(a, b) {
      if ("function" === typeof b) return a = a(), b(a), function() {
        b(null);
      };
      if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
        b.current = null;
      };
    }
    function qi(a, b, c) {
      c = null !== c && void 0 !== c ? c.concat([a]) : null;
      return li(4, 4, pi.bind(null, b, a), c);
    }
    function ri() {
    }
    function si(a, b) {
      var c = Uh();
      b = void 0 === b ? null : b;
      var d = c.memoizedState;
      if (null !== d && null !== b && Mh(b, d[1])) return d[0];
      c.memoizedState = [a, b];
      return a;
    }
    function ti(a, b) {
      var c = Uh();
      b = void 0 === b ? null : b;
      var d = c.memoizedState;
      if (null !== d && null !== b && Mh(b, d[1])) return d[0];
      a = a();
      c.memoizedState = [a, b];
      return a;
    }
    function ui(a, b, c) {
      if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
      He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
      return b;
    }
    function vi(a, b) {
      var c = C;
      C = 0 !== c && 4 > c ? c : 4;
      a(true);
      var d = Gh.transition;
      Gh.transition = {};
      try {
        a(false), b();
      } finally {
        C = c, Gh.transition = d;
      }
    }
    function wi() {
      return Uh().memoizedState;
    }
    function xi(a, b, c) {
      var d = yi(a);
      c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
      if (zi(a)) Ai(b, c);
      else if (c = hh(a, b, c, d), null !== c) {
        var e = R();
        gi(c, a, d, e);
        Bi(c, b, d);
      }
    }
    function ii(a, b, c) {
      var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
      if (zi(a)) Ai(b, e);
      else {
        var f = a.alternate;
        if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
          var g = b.lastRenderedState, h = f(g, c);
          e.hasEagerState = true;
          e.eagerState = h;
          if (He(h, g)) {
            var k = b.interleaved;
            null === k ? (e.next = e, gh(b)) : (e.next = k.next, k.next = e);
            b.interleaved = e;
            return;
          }
        } catch (l) {
        } finally {
        }
        c = hh(a, b, e, d);
        null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
      }
    }
    function zi(a) {
      var b = a.alternate;
      return a === M || null !== b && b === M;
    }
    function Ai(a, b) {
      Jh = Ih = true;
      var c = a.pending;
      null === c ? b.next = b : (b.next = c.next, c.next = b);
      a.pending = b;
    }
    function Bi(a, b, c) {
      if (0 !== (c & 4194240)) {
        var d = b.lanes;
        d &= a.pendingLanes;
        c |= d;
        b.lanes = c;
        Cc(a, c);
      }
    }
    var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
      Th().memoizedState = [a, void 0 === b ? null : b];
      return a;
    }, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
      c = null !== c && void 0 !== c ? c.concat([a]) : null;
      return ki(
        4194308,
        4,
        pi.bind(null, b, a),
        c
      );
    }, useLayoutEffect: function(a, b) {
      return ki(4194308, 4, a, b);
    }, useInsertionEffect: function(a, b) {
      return ki(4, 2, a, b);
    }, useMemo: function(a, b) {
      var c = Th();
      b = void 0 === b ? null : b;
      a = a();
      c.memoizedState = [a, b];
      return a;
    }, useReducer: function(a, b, c) {
      var d = Th();
      b = void 0 !== c ? c(b) : b;
      d.memoizedState = d.baseState = b;
      a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
      d.queue = a;
      a = a.dispatch = xi.bind(null, M, a);
      return [d.memoizedState, a];
    }, useRef: function(a) {
      var b = Th();
      a = { current: a };
      return b.memoizedState = a;
    }, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
      return Th().memoizedState = a;
    }, useTransition: function() {
      var a = hi(false), b = a[0];
      a = vi.bind(null, a[1]);
      Th().memoizedState = a;
      return [b, a];
    }, useMutableSource: function() {
    }, useSyncExternalStore: function(a, b, c) {
      var d = M, e = Th();
      if (I) {
        if (void 0 === c) throw Error(p(407));
        c = c();
      } else {
        c = b();
        if (null === Q) throw Error(p(349));
        0 !== (Hh & 30) || di(d, b, c);
      }
      e.memoizedState = c;
      var f = { value: c, getSnapshot: b };
      e.queue = f;
      mi(ai.bind(
        null,
        d,
        f,
        a
      ), [a]);
      d.flags |= 2048;
      bi(9, ci.bind(null, d, f, c, b), void 0, null);
      return c;
    }, useId: function() {
      var a = Th(), b = Q.identifierPrefix;
      if (I) {
        var c = sg;
        var d = rg;
        c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
        b = ":" + b + "R" + c;
        c = Kh++;
        0 < c && (b += "H" + c.toString(32));
        b += ":";
      } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
      return a.memoizedState = b;
    }, unstable_isNewReconciler: false }, Ph = {
      readContext: eh,
      useCallback: si,
      useContext: eh,
      useEffect: $h,
      useImperativeHandle: qi,
      useInsertionEffect: ni,
      useLayoutEffect: oi,
      useMemo: ti,
      useReducer: Wh,
      useRef: ji,
      useState: function() {
        return Wh(Vh);
      },
      useDebugValue: ri,
      useDeferredValue: function(a) {
        var b = Uh();
        return ui(b, N.memoizedState, a);
      },
      useTransition: function() {
        var a = Wh(Vh)[0], b = Uh().memoizedState;
        return [a, b];
      },
      useMutableSource: Yh,
      useSyncExternalStore: Zh,
      useId: wi,
      unstable_isNewReconciler: false
    }, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
      return Xh(Vh);
    }, useDebugValue: ri, useDeferredValue: function(a) {
      var b = Uh();
      return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
    }, useTransition: function() {
      var a = Xh(Vh)[0], b = Uh().memoizedState;
      return [a, b];
    }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
    function Ci(a, b) {
      if (a && a.defaultProps) {
        b = A({}, b);
        a = a.defaultProps;
        for (var c in a) void 0 === b[c] && (b[c] = a[c]);
        return b;
      }
      return b;
    }
    function Di(a, b, c, d) {
      b = a.memoizedState;
      c = c(d, b);
      c = null === c || void 0 === c ? b : A({}, b, c);
      a.memoizedState = c;
      0 === a.lanes && (a.updateQueue.baseState = c);
    }
    var Ei = { isMounted: function(a) {
      return (a = a._reactInternals) ? Vb(a) === a : false;
    }, enqueueSetState: function(a, b, c) {
      a = a._reactInternals;
      var d = R(), e = yi(a), f = mh(d, e);
      f.payload = b;
      void 0 !== c && null !== c && (f.callback = c);
      b = nh(a, f, e);
      null !== b && (gi(b, a, e, d), oh(b, a, e));
    }, enqueueReplaceState: function(a, b, c) {
      a = a._reactInternals;
      var d = R(), e = yi(a), f = mh(d, e);
      f.tag = 1;
      f.payload = b;
      void 0 !== c && null !== c && (f.callback = c);
      b = nh(a, f, e);
      null !== b && (gi(b, a, e, d), oh(b, a, e));
    }, enqueueForceUpdate: function(a, b) {
      a = a._reactInternals;
      var c = R(), d = yi(a), e = mh(c, d);
      e.tag = 2;
      void 0 !== b && null !== b && (e.callback = b);
      b = nh(a, e, d);
      null !== b && (gi(b, a, d, c), oh(b, a, d));
    } };
    function Fi(a, b, c, d, e, f, g) {
      a = a.stateNode;
      return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : true;
    }
    function Gi(a, b, c) {
      var d = false, e = Vf;
      var f = b.contextType;
      "object" === typeof f && null !== f ? f = eh(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
      b = new b(c, f);
      a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
      b.updater = Ei;
      a.stateNode = b;
      b._reactInternals = a;
      d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
      return b;
    }
    function Hi(a, b, c, d) {
      a = b.state;
      "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
      "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
      b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
    }
    function Ii(a, b, c, d) {
      var e = a.stateNode;
      e.props = c;
      e.state = a.memoizedState;
      e.refs = {};
      kh(a);
      var f = b.contextType;
      "object" === typeof f && null !== f ? e.context = eh(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));
      e.state = a.memoizedState;
      f = b.getDerivedStateFromProps;
      "function" === typeof f && (Di(a, b, f, c), e.state = a.memoizedState);
      "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
      "function" === typeof e.componentDidMount && (a.flags |= 4194308);
    }
    function Ji(a, b) {
      try {
        var c = "", d = b;
        do
          c += Pa(d), d = d.return;
        while (d);
        var e = c;
      } catch (f) {
        e = "\nError generating stack: " + f.message + "\n" + f.stack;
      }
      return { value: a, source: b, stack: e, digest: null };
    }
    function Ki(a, b, c) {
      return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
    }
    function Li(a, b) {
      try {
        console.error(b.value);
      } catch (c) {
        setTimeout(function() {
          throw c;
        });
      }
    }
    var Mi = "function" === typeof WeakMap ? WeakMap : Map;
    function Ni(a, b, c) {
      c = mh(-1, c);
      c.tag = 3;
      c.payload = { element: null };
      var d = b.value;
      c.callback = function() {
        Oi || (Oi = true, Pi = d);
        Li(a, b);
      };
      return c;
    }
    function Qi(a, b, c) {
      c = mh(-1, c);
      c.tag = 3;
      var d = a.type.getDerivedStateFromError;
      if ("function" === typeof d) {
        var e = b.value;
        c.payload = function() {
          return d(e);
        };
        c.callback = function() {
          Li(a, b);
        };
      }
      var f = a.stateNode;
      null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
        Li(a, b);
        "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
        var c2 = b.stack;
        this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
      });
      return c;
    }
    function Si(a, b, c) {
      var d = a.pingCache;
      if (null === d) {
        d = a.pingCache = new Mi();
        var e = /* @__PURE__ */ new Set();
        d.set(b, e);
      } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
      e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
    }
    function Ui(a) {
      do {
        var b;
        if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
        if (b) return a;
        a = a.return;
      } while (null !== a);
      return null;
    }
    function Vi(a, b, c, d, e) {
      if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
      a.flags |= 65536;
      a.lanes = e;
      return a;
    }
    var Wi = ua.ReactCurrentOwner, dh = false;
    function Xi(a, b, c, d) {
      b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
    }
    function Yi(a, b, c, d, e) {
      c = c.render;
      var f = b.ref;
      ch(b, e);
      d = Nh(a, b, c, d, f, e);
      c = Sh();
      if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
      I && c && vg(b);
      b.flags |= 1;
      Xi(a, b, d, e);
      return b.child;
    }
    function $i(a, b, c, d, e) {
      if (null === a) {
        var f = c.type;
        if ("function" === typeof f && !aj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, bj(a, b, f, d, e);
        a = Rg(c.type, null, d, b, b.mode, e);
        a.ref = b.ref;
        a.return = b;
        return b.child = a;
      }
      f = a.child;
      if (0 === (a.lanes & e)) {
        var g = f.memoizedProps;
        c = c.compare;
        c = null !== c ? c : Ie;
        if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
      }
      b.flags |= 1;
      a = Pg(f, d);
      a.ref = b.ref;
      a.return = b;
      return b.child = a;
    }
    function bj(a, b, c, d, e) {
      if (null !== a) {
        var f = a.memoizedProps;
        if (Ie(f, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
        else return b.lanes = a.lanes, Zi(a, b, e);
      }
      return cj(a, b, c, d, e);
    }
    function dj(a, b, c) {
      var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
      if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
      else {
        if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
        b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
        d = null !== f ? f.baseLanes : c;
        G(ej, fj);
        fj |= d;
      }
      else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
      Xi(a, b, e, c);
      return b.child;
    }
    function gj(a, b) {
      var c = b.ref;
      if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
    }
    function cj(a, b, c, d, e) {
      var f = Zf(c) ? Xf : H.current;
      f = Yf(b, f);
      ch(b, e);
      c = Nh(a, b, c, d, f, e);
      d = Sh();
      if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
      I && d && vg(b);
      b.flags |= 1;
      Xi(a, b, c, e);
      return b.child;
    }
    function hj(a, b, c, d, e) {
      if (Zf(c)) {
        var f = true;
        cg(b);
      } else f = false;
      ch(b, e);
      if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
      else if (null === a) {
        var g = b.stateNode, h = b.memoizedProps;
        g.props = h;
        var k = g.context, l = c.contextType;
        "object" === typeof l && null !== l ? l = eh(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
        var m = c.getDerivedStateFromProps, q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
        q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Hi(b, g, d, l);
        jh = false;
        var r = b.memoizedState;
        g.state = r;
        qh(b, d, g, e);
        k = b.memoizedState;
        h !== d || r !== k || Wf.current || jh ? ("function" === typeof m && (Di(b, c, m, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
      } else {
        g = b.stateNode;
        lh(a, b);
        h = b.memoizedProps;
        l = b.type === b.elementType ? h : Ci(b.type, h);
        g.props = l;
        q = b.pendingProps;
        r = g.context;
        k = c.contextType;
        "object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
        var y = c.getDerivedStateFromProps;
        (m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && Hi(b, g, d, k);
        jh = false;
        r = b.memoizedState;
        g.state = r;
        qh(b, d, g, e);
        var n = b.memoizedState;
        h !== q || r !== n || Wf.current || jh ? ("function" === typeof y && (Di(b, c, y, d), n = b.memoizedState), (l = jh || Fi(b, c, l, d, r, n, k) || false) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), d = false);
      }
      return jj(a, b, c, d, f, e);
    }
    function jj(a, b, c, d, e, f) {
      gj(a, b);
      var g = 0 !== (b.flags & 128);
      if (!d && !g) return e && dg(b, c, false), Zi(a, b, f);
      d = b.stateNode;
      Wi.current = b;
      var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
      b.flags |= 1;
      null !== a && g ? (b.child = Ug(b, a.child, null, f), b.child = Ug(b, null, h, f)) : Xi(a, b, h, f);
      b.memoizedState = d.state;
      e && dg(b, c, true);
      return b.child;
    }
    function kj(a) {
      var b = a.stateNode;
      b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
      yh(a, b.containerInfo);
    }
    function lj(a, b, c, d, e) {
      Ig();
      Jg(e);
      b.flags |= 256;
      Xi(a, b, c, d);
      return b.child;
    }
    var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
    function nj(a) {
      return { baseLanes: a, cachePool: null, transitions: null };
    }
    function oj(a, b, c) {
      var d = b.pendingProps, e = L.current, f = false, g = 0 !== (b.flags & 128), h;
      (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
      if (h) f = true, b.flags &= -129;
      else if (null === a || null !== a.memoizedState) e |= 1;
      G(L, e & 1);
      if (null === a) {
        Eg(b);
        a = b.memoizedState;
        if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
        g = d.children;
        a = d.fallback;
        return f ? (d = b.mode, f = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = pj(g, d, 0, null), a = Tg(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
      }
      e = a.memoizedState;
      if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
      if (f) {
        f = d.fallback;
        g = b.mode;
        e = a.child;
        h = e.sibling;
        var k = { mode: "hidden", children: d.children };
        0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Pg(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
        null !== h ? f = Pg(h, f) : (f = Tg(f, g, c, null), f.flags |= 2);
        f.return = b;
        d.return = b;
        d.sibling = f;
        b.child = d;
        d = f;
        f = b.child;
        g = a.child.memoizedState;
        g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
        f.memoizedState = g;
        f.childLanes = a.childLanes & ~c;
        b.memoizedState = mj;
        return d;
      }
      f = a.child;
      a = f.sibling;
      d = Pg(f, { mode: "visible", children: d.children });
      0 === (b.mode & 1) && (d.lanes = c);
      d.return = b;
      d.sibling = null;
      null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
      b.child = d;
      b.memoizedState = null;
      return d;
    }
    function qj(a, b) {
      b = pj({ mode: "visible", children: b }, a.mode, 0, null);
      b.return = a;
      return a.child = b;
    }
    function sj(a, b, c, d) {
      null !== d && Jg(d);
      Ug(b, a.child, null, c);
      a = qj(b, b.pendingProps.children);
      a.flags |= 2;
      b.memoizedState = null;
      return a;
    }
    function rj(a, b, c, d, e, f, g) {
      if (c) {
        if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
        if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
        f = d.fallback;
        e = b.mode;
        d = pj({ mode: "visible", children: d.children }, e, 0, null);
        f = Tg(f, e, g, null);
        f.flags |= 2;
        d.return = b;
        f.return = b;
        d.sibling = f;
        b.child = d;
        0 !== (b.mode & 1) && Ug(b, a.child, null, g);
        b.child.memoizedState = nj(g);
        b.memoizedState = mj;
        return f;
      }
      if (0 === (b.mode & 1)) return sj(a, b, g, null);
      if ("$!" === e.data) {
        d = e.nextSibling && e.nextSibling.dataset;
        if (d) var h = d.dgst;
        d = h;
        f = Error(p(419));
        d = Ki(f, d, void 0);
        return sj(a, b, g, d);
      }
      h = 0 !== (g & a.childLanes);
      if (dh || h) {
        d = Q;
        if (null !== d) {
          switch (g & -g) {
            case 4:
              e = 2;
              break;
            case 16:
              e = 8;
              break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              e = 32;
              break;
            case 536870912:
              e = 268435456;
              break;
            default:
              e = 0;
          }
          e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
          0 !== e && e !== f.retryLane && (f.retryLane = e, ih(a, e), gi(d, a, e, -1));
        }
        tj();
        d = Ki(Error(p(421)));
        return sj(a, b, g, d);
      }
      if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
      a = f.treeContext;
      yg = Lf(e.nextSibling);
      xg = b;
      I = true;
      zg = null;
      null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
      b = qj(b, d.children);
      b.flags |= 4096;
      return b;
    }
    function vj(a, b, c) {
      a.lanes |= b;
      var d = a.alternate;
      null !== d && (d.lanes |= b);
      bh(a.return, b, c);
    }
    function wj(a, b, c, d, e) {
      var f = a.memoizedState;
      null === f ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
    }
    function xj(a, b, c) {
      var d = b.pendingProps, e = d.revealOrder, f = d.tail;
      Xi(a, b, d.children, c);
      d = L.current;
      if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
      else {
        if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
          if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
          else if (19 === a.tag) vj(a, c, b);
          else if (null !== a.child) {
            a.child.return = a;
            a = a.child;
            continue;
          }
          if (a === b) break a;
          for (; null === a.sibling; ) {
            if (null === a.return || a.return === b) break a;
            a = a.return;
          }
          a.sibling.return = a.return;
          a = a.sibling;
        }
        d &= 1;
      }
      G(L, d);
      if (0 === (b.mode & 1)) b.memoizedState = null;
      else switch (e) {
        case "forwards":
          c = b.child;
          for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
          c = e;
          null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
          wj(b, false, e, c, f);
          break;
        case "backwards":
          c = null;
          e = b.child;
          for (b.child = null; null !== e; ) {
            a = e.alternate;
            if (null !== a && null === Ch(a)) {
              b.child = e;
              break;
            }
            a = e.sibling;
            e.sibling = c;
            c = e;
            e = a;
          }
          wj(b, true, c, null, f);
          break;
        case "together":
          wj(b, false, null, null, void 0);
          break;
        default:
          b.memoizedState = null;
      }
      return b.child;
    }
    function ij(a, b) {
      0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
    }
    function Zi(a, b, c) {
      null !== a && (b.dependencies = a.dependencies);
      rh |= b.lanes;
      if (0 === (c & b.childLanes)) return null;
      if (null !== a && b.child !== a.child) throw Error(p(153));
      if (null !== b.child) {
        a = b.child;
        c = Pg(a, a.pendingProps);
        b.child = c;
        for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
        c.sibling = null;
      }
      return b.child;
    }
    function yj(a, b, c) {
      switch (b.tag) {
        case 3:
          kj(b);
          Ig();
          break;
        case 5:
          Ah(b);
          break;
        case 1:
          Zf(b.type) && cg(b);
          break;
        case 4:
          yh(b, b.stateNode.containerInfo);
          break;
        case 10:
          var d = b.type._context, e = b.memoizedProps.value;
          G(Wg, d._currentValue);
          d._currentValue = e;
          break;
        case 13:
          d = b.memoizedState;
          if (null !== d) {
            if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
            if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
            G(L, L.current & 1);
            a = Zi(a, b, c);
            return null !== a ? a.sibling : null;
          }
          G(L, L.current & 1);
          break;
        case 19:
          d = 0 !== (c & b.childLanes);
          if (0 !== (a.flags & 128)) {
            if (d) return xj(a, b, c);
            b.flags |= 128;
          }
          e = b.memoizedState;
          null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
          G(L, L.current);
          if (d) break;
          else return null;
        case 22:
        case 23:
          return b.lanes = 0, dj(a, b, c);
      }
      return Zi(a, b, c);
    }
    var zj, Aj, Bj, Cj;
    zj = function(a, b) {
      for (var c = b.child; null !== c; ) {
        if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
        else if (4 !== c.tag && null !== c.child) {
          c.child.return = c;
          c = c.child;
          continue;
        }
        if (c === b) break;
        for (; null === c.sibling; ) {
          if (null === c.return || c.return === b) return;
          c = c.return;
        }
        c.sibling.return = c.return;
        c = c.sibling;
      }
    };
    Aj = function() {
    };
    Bj = function(a, b, c, d) {
      var e = a.memoizedProps;
      if (e !== d) {
        a = b.stateNode;
        xh(uh.current);
        var f = null;
        switch (c) {
          case "input":
            e = Ya(a, e);
            d = Ya(a, d);
            f = [];
            break;
          case "select":
            e = A({}, e, { value: void 0 });
            d = A({}, d, { value: void 0 });
            f = [];
            break;
          case "textarea":
            e = gb(a, e);
            d = gb(a, d);
            f = [];
            break;
          default:
            "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
        }
        ub(c, d);
        var g;
        c = null;
        for (l in e) if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
          var h = e[l];
          for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
        } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
        for (l in d) {
          var k = d[l];
          h = null != e ? e[l] : void 0;
          if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) if (h) {
            for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
            for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
          } else c || (f || (f = []), f.push(
            l,
            c
          )), c = k;
          else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));
        }
        c && (f = f || []).push("style", c);
        var l = f;
        if (b.updateQueue = l) b.flags |= 4;
      }
    };
    Cj = function(a, b, c, d) {
      c !== d && (b.flags |= 4);
    };
    function Dj(a, b) {
      if (!I) switch (a.tailMode) {
        case "hidden":
          b = a.tail;
          for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
          null === c ? a.tail = null : c.sibling = null;
          break;
        case "collapsed":
          c = a.tail;
          for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
          null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
      }
    }
    function S(a) {
      var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
      if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
      else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
      a.subtreeFlags |= d;
      a.childLanes = c;
      return b;
    }
    function Ej(a, b, c) {
      var d = b.pendingProps;
      wg(b);
      switch (b.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return S(b), null;
        case 1:
          return Zf(b.type) && $f(), S(b), null;
        case 3:
          d = b.stateNode;
          zh();
          E(Wf);
          E(H);
          Eh();
          d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
          if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
          Aj(a, b);
          S(b);
          return null;
        case 5:
          Bh(b);
          var e = xh(wh.current);
          c = b.type;
          if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
          else {
            if (!d) {
              if (null === b.stateNode) throw Error(p(166));
              S(b);
              return null;
            }
            a = xh(uh.current);
            if (Gg(b)) {
              d = b.stateNode;
              c = b.type;
              var f = b.memoizedProps;
              d[Of] = b;
              d[Pf] = f;
              a = 0 !== (b.mode & 1);
              switch (c) {
                case "dialog":
                  D("cancel", d);
                  D("close", d);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  D("load", d);
                  break;
                case "video":
                case "audio":
                  for (e = 0; e < lf.length; e++) D(lf[e], d);
                  break;
                case "source":
                  D("error", d);
                  break;
                case "img":
                case "image":
                case "link":
                  D(
                    "error",
                    d
                  );
                  D("load", d);
                  break;
                case "details":
                  D("toggle", d);
                  break;
                case "input":
                  Za(d, f);
                  D("invalid", d);
                  break;
                case "select":
                  d._wrapperState = { wasMultiple: !!f.multiple };
                  D("invalid", d);
                  break;
                case "textarea":
                  hb(d, f), D("invalid", d);
              }
              ub(c, f);
              e = null;
              for (var g in f) if (f.hasOwnProperty(g)) {
                var h = f[g];
                "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f.suppressHydrationWarning && Af(
                  d.textContent,
                  h,
                  a
                ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
              }
              switch (c) {
                case "input":
                  Va(d);
                  db(d, f, true);
                  break;
                case "textarea":
                  Va(d);
                  jb(d);
                  break;
                case "select":
                case "option":
                  break;
                default:
                  "function" === typeof f.onClick && (d.onclick = Bf);
              }
              d = e;
              b.updateQueue = d;
              null !== d && (b.flags |= 4);
            } else {
              g = 9 === e.nodeType ? e : e.ownerDocument;
              "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
              "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
              a[Of] = b;
              a[Pf] = d;
              zj(a, b, false, false);
              b.stateNode = a;
              a: {
                g = vb(c, d);
                switch (c) {
                  case "dialog":
                    D("cancel", a);
                    D("close", a);
                    e = d;
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    D("load", a);
                    e = d;
                    break;
                  case "video":
                  case "audio":
                    for (e = 0; e < lf.length; e++) D(lf[e], a);
                    e = d;
                    break;
                  case "source":
                    D("error", a);
                    e = d;
                    break;
                  case "img":
                  case "image":
                  case "link":
                    D(
                      "error",
                      a
                    );
                    D("load", a);
                    e = d;
                    break;
                  case "details":
                    D("toggle", a);
                    e = d;
                    break;
                  case "input":
                    Za(a, d);
                    e = Ya(a, d);
                    D("invalid", a);
                    break;
                  case "option":
                    e = d;
                    break;
                  case "select":
                    a._wrapperState = { wasMultiple: !!d.multiple };
                    e = A({}, d, { value: void 0 });
                    D("invalid", a);
                    break;
                  case "textarea":
                    hb(a, d);
                    e = gb(a, d);
                    D("invalid", a);
                    break;
                  default:
                    e = d;
                }
                ub(c, e);
                h = e;
                for (f in h) if (h.hasOwnProperty(f)) {
                  var k = h[f];
                  "style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
                }
                switch (c) {
                  case "input":
                    Va(a);
                    db(a, d, false);
                    break;
                  case "textarea":
                    Va(a);
                    jb(a);
                    break;
                  case "option":
                    null != d.value && a.setAttribute("value", "" + Sa(d.value));
                    break;
                  case "select":
                    a.multiple = !!d.multiple;
                    f = d.value;
                    null != f ? fb(a, !!d.multiple, f, false) : null != d.defaultValue && fb(
                      a,
                      !!d.multiple,
                      d.defaultValue,
                      true
                    );
                    break;
                  default:
                    "function" === typeof e.onClick && (a.onclick = Bf);
                }
                switch (c) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    d = !!d.autoFocus;
                    break a;
                  case "img":
                    d = true;
                    break a;
                  default:
                    d = false;
                }
              }
              d && (b.flags |= 4);
            }
            null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
          }
          S(b);
          return null;
        case 6:
          if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
          else {
            if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
            c = xh(wh.current);
            xh(uh.current);
            if (Gg(b)) {
              d = b.stateNode;
              c = b.memoizedProps;
              d[Of] = b;
              if (f = d.nodeValue !== c) {
                if (a = xg, null !== a) switch (a.tag) {
                  case 3:
                    Af(d.nodeValue, c, 0 !== (a.mode & 1));
                    break;
                  case 5:
                    true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
                }
              }
              f && (b.flags |= 4);
            } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
          }
          S(b);
          return null;
        case 13:
          E(L);
          d = b.memoizedState;
          if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
            if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f = false;
            else if (f = Gg(b), null !== d && null !== d.dehydrated) {
              if (null === a) {
                if (!f) throw Error(p(318));
                f = b.memoizedState;
                f = null !== f ? f.dehydrated : null;
                if (!f) throw Error(p(317));
                f[Of] = b;
              } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
              S(b);
              f = false;
            } else null !== zg && (Fj(zg), zg = null), f = true;
            if (!f) return b.flags & 65536 ? b : null;
          }
          if (0 !== (b.flags & 128)) return b.lanes = c, b;
          d = null !== d;
          d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
          null !== b.updateQueue && (b.flags |= 4);
          S(b);
          return null;
        case 4:
          return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
        case 10:
          return ah(b.type._context), S(b), null;
        case 17:
          return Zf(b.type) && $f(), S(b), null;
        case 19:
          E(L);
          f = b.memoizedState;
          if (null === f) return S(b), null;
          d = 0 !== (b.flags & 128);
          g = f.rendering;
          if (null === g) if (d) Dj(f, false);
          else {
            if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
              g = Ch(a);
              if (null !== g) {
                b.flags |= 128;
                Dj(f, false);
                d = g.updateQueue;
                null !== d && (b.updateQueue = d, b.flags |= 4);
                b.subtreeFlags = 0;
                d = c;
                for (c = b.child; null !== c; ) f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                G(L, L.current & 1 | 2);
                return b.child;
              }
              a = a.sibling;
            }
            null !== f.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
          }
          else {
            if (!d) if (a = Ch(g), null !== a) {
              if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f, true), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I) return S(b), null;
            } else 2 * B() - f.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
            f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
          }
          if (null !== f.tail) return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
          S(b);
          return null;
        case 22:
        case 23:
          return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(p(156, b.tag));
    }
    function Ij(a, b) {
      wg(b);
      switch (b.tag) {
        case 1:
          return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
        case 3:
          return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
        case 5:
          return Bh(b), null;
        case 13:
          E(L);
          a = b.memoizedState;
          if (null !== a && null !== a.dehydrated) {
            if (null === b.alternate) throw Error(p(340));
            Ig();
          }
          a = b.flags;
          return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
        case 19:
          return E(L), null;
        case 4:
          return zh(), null;
        case 10:
          return ah(b.type._context), null;
        case 22:
        case 23:
          return Hj(), null;
        case 24:
          return null;
        default:
          return null;
      }
    }
    var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
    function Lj(a, b) {
      var c = a.ref;
      if (null !== c) if ("function" === typeof c) try {
        c(null);
      } catch (d) {
        W(a, b, d);
      }
      else c.current = null;
    }
    function Mj(a, b, c) {
      try {
        c();
      } catch (d) {
        W(a, b, d);
      }
    }
    var Nj = false;
    function Oj(a, b) {
      Cf = dd;
      a = Me();
      if (Ne(a)) {
        if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
        else a: {
          c = (c = a.ownerDocument) && c.defaultView || window;
          var d = c.getSelection && c.getSelection();
          if (d && 0 !== d.rangeCount) {
            c = d.anchorNode;
            var e = d.anchorOffset, f = d.focusNode;
            d = d.focusOffset;
            try {
              c.nodeType, f.nodeType;
            } catch (F) {
              c = null;
              break a;
            }
            var g = 0, h = -1, k = -1, l = 0, m = 0, q = a, r = null;
            b: for (; ; ) {
              for (var y; ; ) {
                q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
                q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
                3 === q.nodeType && (g += q.nodeValue.length);
                if (null === (y = q.firstChild)) break;
                r = q;
                q = y;
              }
              for (; ; ) {
                if (q === a) break b;
                r === c && ++l === e && (h = g);
                r === f && ++m === d && (k = g);
                if (null !== (y = q.nextSibling)) break;
                q = r;
                r = q.parentNode;
              }
              q = y;
            }
            c = -1 === h || -1 === k ? null : { start: h, end: k };
          } else c = null;
        }
        c = c || { start: 0, end: 0 };
      } else c = null;
      Df = { focusedElem: a, selectionRange: c };
      dd = false;
      for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
      else for (; null !== V; ) {
        b = V;
        try {
          var n = b.alternate;
          if (0 !== (b.flags & 1024)) switch (b.tag) {
            case 0:
            case 11:
            case 15:
              break;
            case 1:
              if (null !== n) {
                var t = n.memoizedProps, J = n.memoizedState, x = b.stateNode, w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Ci(b.type, t), J);
                x.__reactInternalSnapshotBeforeUpdate = w;
              }
              break;
            case 3:
              var u = b.stateNode.containerInfo;
              1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
              break;
            case 5:
            case 6:
            case 4:
            case 17:
              break;
            default:
              throw Error(p(163));
          }
        } catch (F) {
          W(b, b.return, F);
        }
        a = b.sibling;
        if (null !== a) {
          a.return = b.return;
          V = a;
          break;
        }
        V = b.return;
      }
      n = Nj;
      Nj = false;
      return n;
    }
    function Pj(a, b, c) {
      var d = b.updateQueue;
      d = null !== d ? d.lastEffect : null;
      if (null !== d) {
        var e = d = d.next;
        do {
          if ((e.tag & a) === a) {
            var f = e.destroy;
            e.destroy = void 0;
            void 0 !== f && Mj(b, c, f);
          }
          e = e.next;
        } while (e !== d);
      }
    }
    function Qj(a, b) {
      b = b.updateQueue;
      b = null !== b ? b.lastEffect : null;
      if (null !== b) {
        var c = b = b.next;
        do {
          if ((c.tag & a) === a) {
            var d = c.create;
            c.destroy = d();
          }
          c = c.next;
        } while (c !== b);
      }
    }
    function Rj(a) {
      var b = a.ref;
      if (null !== b) {
        var c = a.stateNode;
        switch (a.tag) {
          case 5:
            a = c;
            break;
          default:
            a = c;
        }
        "function" === typeof b ? b(a) : b.current = a;
      }
    }
    function Sj(a) {
      var b = a.alternate;
      null !== b && (a.alternate = null, Sj(b));
      a.child = null;
      a.deletions = null;
      a.sibling = null;
      5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
      a.stateNode = null;
      a.return = null;
      a.dependencies = null;
      a.memoizedProps = null;
      a.memoizedState = null;
      a.pendingProps = null;
      a.stateNode = null;
      a.updateQueue = null;
    }
    function Tj(a) {
      return 5 === a.tag || 3 === a.tag || 4 === a.tag;
    }
    function Uj(a) {
      a: for (; ; ) {
        for (; null === a.sibling; ) {
          if (null === a.return || Tj(a.return)) return null;
          a = a.return;
        }
        a.sibling.return = a.return;
        for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
          if (a.flags & 2) continue a;
          if (null === a.child || 4 === a.tag) continue a;
          else a.child.return = a, a = a.child;
        }
        if (!(a.flags & 2)) return a.stateNode;
      }
    }
    function Vj(a, b, c) {
      var d = a.tag;
      if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
      else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
    }
    function Wj(a, b, c) {
      var d = a.tag;
      if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
      else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
    }
    var X = null, Xj = false;
    function Yj(a, b, c) {
      for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
    }
    function Zj(a, b, c) {
      if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
        lc.onCommitFiberUnmount(kc, c);
      } catch (h) {
      }
      switch (c.tag) {
        case 5:
          U || Lj(c, b);
        case 6:
          var d = X, e = Xj;
          X = null;
          Yj(a, b, c);
          X = d;
          Xj = e;
          null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
          break;
        case 18:
          null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
          break;
        case 4:
          d = X;
          e = Xj;
          X = c.stateNode.containerInfo;
          Xj = true;
          Yj(a, b, c);
          X = d;
          Xj = e;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
            e = d = d.next;
            do {
              var f = e, g = f.destroy;
              f = f.tag;
              void 0 !== g && (0 !== (f & 2) ? Mj(c, b, g) : 0 !== (f & 4) && Mj(c, b, g));
              e = e.next;
            } while (e !== d);
          }
          Yj(a, b, c);
          break;
        case 1:
          if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
            d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
          } catch (h) {
            W(c, b, h);
          }
          Yj(a, b, c);
          break;
        case 21:
          Yj(a, b, c);
          break;
        case 22:
          c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
          break;
        default:
          Yj(a, b, c);
      }
    }
    function ak(a) {
      var b = a.updateQueue;
      if (null !== b) {
        a.updateQueue = null;
        var c = a.stateNode;
        null === c && (c = a.stateNode = new Kj());
        b.forEach(function(b2) {
          var d = bk.bind(null, a, b2);
          c.has(b2) || (c.add(b2), b2.then(d, d));
        });
      }
    }
    function ck(a, b) {
      var c = b.deletions;
      if (null !== c) for (var d = 0; d < c.length; d++) {
        var e = c[d];
        try {
          var f = a, g = b, h = g;
          a: for (; null !== h; ) {
            switch (h.tag) {
              case 5:
                X = h.stateNode;
                Xj = false;
                break a;
              case 3:
                X = h.stateNode.containerInfo;
                Xj = true;
                break a;
              case 4:
                X = h.stateNode.containerInfo;
                Xj = true;
                break a;
            }
            h = h.return;
          }
          if (null === X) throw Error(p(160));
          Zj(f, g, e);
          X = null;
          Xj = false;
          var k = e.alternate;
          null !== k && (k.return = null);
          e.return = null;
        } catch (l) {
          W(e, b, l);
        }
      }
      if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
    }
    function dk(a, b) {
      var c = a.alternate, d = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ck(b, a);
          ek(a);
          if (d & 4) {
            try {
              Pj(3, a, a.return), Qj(3, a);
            } catch (t) {
              W(a, a.return, t);
            }
            try {
              Pj(5, a, a.return);
            } catch (t) {
              W(a, a.return, t);
            }
          }
          break;
        case 1:
          ck(b, a);
          ek(a);
          d & 512 && null !== c && Lj(c, c.return);
          break;
        case 5:
          ck(b, a);
          ek(a);
          d & 512 && null !== c && Lj(c, c.return);
          if (a.flags & 32) {
            var e = a.stateNode;
            try {
              ob(e, "");
            } catch (t) {
              W(a, a.return, t);
            }
          }
          if (d & 4 && (e = a.stateNode, null != e)) {
            var f = a.memoizedProps, g = null !== c ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
            a.updateQueue = null;
            if (null !== k) try {
              "input" === h && "radio" === f.type && null != f.name && ab(e, f);
              vb(h, g);
              var l = vb(h, f);
              for (g = 0; g < k.length; g += 2) {
                var m = k[g], q = k[g + 1];
                "style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
              }
              switch (h) {
                case "input":
                  bb(e, f);
                  break;
                case "textarea":
                  ib(e, f);
                  break;
                case "select":
                  var r = e._wrapperState.wasMultiple;
                  e._wrapperState.wasMultiple = !!f.multiple;
                  var y = f.value;
                  null != y ? fb(e, !!f.multiple, y, false) : r !== !!f.multiple && (null != f.defaultValue ? fb(
                    e,
                    !!f.multiple,
                    f.defaultValue,
                    true
                  ) : fb(e, !!f.multiple, f.multiple ? [] : "", false));
              }
              e[Pf] = f;
            } catch (t) {
              W(a, a.return, t);
            }
          }
          break;
        case 6:
          ck(b, a);
          ek(a);
          if (d & 4) {
            if (null === a.stateNode) throw Error(p(162));
            e = a.stateNode;
            f = a.memoizedProps;
            try {
              e.nodeValue = f;
            } catch (t) {
              W(a, a.return, t);
            }
          }
          break;
        case 3:
          ck(b, a);
          ek(a);
          if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
            bd(b.containerInfo);
          } catch (t) {
            W(a, a.return, t);
          }
          break;
        case 4:
          ck(b, a);
          ek(a);
          break;
        case 13:
          ck(b, a);
          ek(a);
          e = a.child;
          e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
          d & 4 && ak(a);
          break;
        case 22:
          m = null !== c && null !== c.memoizedState;
          a.mode & 1 ? (U = (l = U) || m, ck(b, a), U = l) : ck(b, a);
          ek(a);
          if (d & 8192) {
            l = null !== a.memoizedState;
            if ((a.stateNode.isHidden = l) && !m && 0 !== (a.mode & 1)) for (V = a, m = a.child; null !== m; ) {
              for (q = V = m; null !== V; ) {
                r = V;
                y = r.child;
                switch (r.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    Pj(4, r, r.return);
                    break;
                  case 1:
                    Lj(r, r.return);
                    var n = r.stateNode;
                    if ("function" === typeof n.componentWillUnmount) {
                      d = r;
                      c = r.return;
                      try {
                        b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                      } catch (t) {
                        W(d, c, t);
                      }
                    }
                    break;
                  case 5:
                    Lj(r, r.return);
                    break;
                  case 22:
                    if (null !== r.memoizedState) {
                      gk(q);
                      continue;
                    }
                }
                null !== y ? (y.return = r, V = y) : gk(q);
              }
              m = m.sibling;
            }
            a: for (m = null, q = a; ; ) {
              if (5 === q.tag) {
                if (null === m) {
                  m = q;
                  try {
                    e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                  } catch (t) {
                    W(a, a.return, t);
                  }
                }
              } else if (6 === q.tag) {
                if (null === m) try {
                  q.stateNode.nodeValue = l ? "" : q.memoizedProps;
                } catch (t) {
                  W(a, a.return, t);
                }
              } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
                q.child.return = q;
                q = q.child;
                continue;
              }
              if (q === a) break a;
              for (; null === q.sibling; ) {
                if (null === q.return || q.return === a) break a;
                m === q && (m = null);
                q = q.return;
              }
              m === q && (m = null);
              q.sibling.return = q.return;
              q = q.sibling;
            }
          }
          break;
        case 19:
          ck(b, a);
          ek(a);
          d & 4 && ak(a);
          break;
        case 21:
          break;
        default:
          ck(
            b,
            a
          ), ek(a);
      }
    }
    function ek(a) {
      var b = a.flags;
      if (b & 2) {
        try {
          a: {
            for (var c = a.return; null !== c; ) {
              if (Tj(c)) {
                var d = c;
                break a;
              }
              c = c.return;
            }
            throw Error(p(160));
          }
          switch (d.tag) {
            case 5:
              var e = d.stateNode;
              d.flags & 32 && (ob(e, ""), d.flags &= -33);
              var f = Uj(a);
              Wj(a, f, e);
              break;
            case 3:
            case 4:
              var g = d.stateNode.containerInfo, h = Uj(a);
              Vj(a, h, g);
              break;
            default:
              throw Error(p(161));
          }
        } catch (k) {
          W(a, a.return, k);
        }
        a.flags &= -3;
      }
      b & 4096 && (a.flags &= -4097);
    }
    function hk(a, b, c) {
      V = a;
      ik(a);
    }
    function ik(a, b, c) {
      for (var d = 0 !== (a.mode & 1); null !== V; ) {
        var e = V, f = e.child;
        if (22 === e.tag && d) {
          var g = null !== e.memoizedState || Jj;
          if (!g) {
            var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
            h = Jj;
            var l = U;
            Jj = g;
            if ((U = k) && !l) for (V = e; null !== V; ) g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k ? (k.return = g, V = k) : jk(e);
            for (; null !== f; ) V = f, ik(f), f = f.sibling;
            V = e;
            Jj = h;
            U = l;
          }
          kk(a);
        } else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : kk(a);
      }
    }
    function kk(a) {
      for (; null !== V; ) {
        var b = V;
        if (0 !== (b.flags & 8772)) {
          var c = b.alternate;
          try {
            if (0 !== (b.flags & 8772)) switch (b.tag) {
              case 0:
              case 11:
              case 15:
                U || Qj(5, b);
                break;
              case 1:
                var d = b.stateNode;
                if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
                else {
                  var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                  d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                }
                var f = b.updateQueue;
                null !== f && sh(b, f, d);
                break;
              case 3:
                var g = b.updateQueue;
                if (null !== g) {
                  c = null;
                  if (null !== b.child) switch (b.child.tag) {
                    case 5:
                      c = b.child.stateNode;
                      break;
                    case 1:
                      c = b.child.stateNode;
                  }
                  sh(b, g, c);
                }
                break;
              case 5:
                var h = b.stateNode;
                if (null === c && b.flags & 4) {
                  c = h;
                  var k = b.memoizedProps;
                  switch (b.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      k.autoFocus && c.focus();
                      break;
                    case "img":
                      k.src && (c.src = k.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (null === b.memoizedState) {
                  var l = b.alternate;
                  if (null !== l) {
                    var m = l.memoizedState;
                    if (null !== m) {
                      var q = m.dehydrated;
                      null !== q && bd(q);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(p(163));
            }
            U || b.flags & 512 && Rj(b);
          } catch (r) {
            W(b, b.return, r);
          }
        }
        if (b === a) {
          V = null;
          break;
        }
        c = b.sibling;
        if (null !== c) {
          c.return = b.return;
          V = c;
          break;
        }
        V = b.return;
      }
    }
    function gk(a) {
      for (; null !== V; ) {
        var b = V;
        if (b === a) {
          V = null;
          break;
        }
        var c = b.sibling;
        if (null !== c) {
          c.return = b.return;
          V = c;
          break;
        }
        V = b.return;
      }
    }
    function jk(a) {
      for (; null !== V; ) {
        var b = V;
        try {
          switch (b.tag) {
            case 0:
            case 11:
            case 15:
              var c = b.return;
              try {
                Qj(4, b);
              } catch (k) {
                W(b, c, k);
              }
              break;
            case 1:
              var d = b.stateNode;
              if ("function" === typeof d.componentDidMount) {
                var e = b.return;
                try {
                  d.componentDidMount();
                } catch (k) {
                  W(b, e, k);
                }
              }
              var f = b.return;
              try {
                Rj(b);
              } catch (k) {
                W(b, f, k);
              }
              break;
            case 5:
              var g = b.return;
              try {
                Rj(b);
              } catch (k) {
                W(b, g, k);
              }
          }
        } catch (k) {
          W(b, b.return, k);
        }
        if (b === a) {
          V = null;
          break;
        }
        var h = b.sibling;
        if (null !== h) {
          h.return = b.return;
          V = h;
          break;
        }
        V = b.return;
      }
    }
    var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
    function R() {
      return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
    }
    function yi(a) {
      if (0 === (a.mode & 1)) return 1;
      if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
      if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
      a = C;
      if (0 !== a) return a;
      a = window.event;
      a = void 0 === a ? 16 : jd(a.type);
      return a;
    }
    function gi(a, b, c, d) {
      if (50 < yk) throw yk = 0, zk = null, Error(p(185));
      Ac(a, c, d);
      if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
    }
    function Dk(a, b) {
      var c = a.callbackNode;
      wc(a, b);
      var d = uc(a, a === Q ? Z : 0);
      if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
      else if (b = d & -d, a.callbackPriority !== b) {
        null != c && bc(c);
        if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
          0 === (K & 6) && jg();
        }), c = null;
        else {
          switch (Dc(d)) {
            case 1:
              c = fc;
              break;
            case 4:
              c = gc;
              break;
            case 16:
              c = hc;
              break;
            case 536870912:
              c = jc;
              break;
            default:
              c = hc;
          }
          c = Fk(c, Gk.bind(null, a));
        }
        a.callbackPriority = b;
        a.callbackNode = c;
      }
    }
    function Gk(a, b) {
      Ak = -1;
      Bk = 0;
      if (0 !== (K & 6)) throw Error(p(327));
      var c = a.callbackNode;
      if (Hk() && a.callbackNode !== c) return null;
      var d = uc(a, a === Q ? Z : 0);
      if (0 === d) return null;
      if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
      else {
        b = d;
        var e = K;
        K |= 2;
        var f = Jk();
        if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
        do
          try {
            Lk();
            break;
          } catch (h) {
            Mk(a, h);
          }
        while (1);
        $g();
        mk.current = f;
        K = e;
        null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
      }
      if (0 !== b) {
        2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
        if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
        if (6 === b) Ck(a, d);
        else {
          e = a.current.alternate;
          if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Nk(a, f))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
          a.finishedWork = e;
          a.finishedLanes = d;
          switch (b) {
            case 0:
            case 1:
              throw Error(p(345));
            case 2:
              Pk(a, tk, uk);
              break;
            case 3:
              Ck(a, d);
              if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
                if (0 !== uc(a, 0)) break;
                e = a.suspendedLanes;
                if ((e & d) !== d) {
                  R();
                  a.pingedLanes |= a.suspendedLanes & e;
                  break;
                }
                a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
                break;
              }
              Pk(a, tk, uk);
              break;
            case 4:
              Ck(a, d);
              if ((d & 4194240) === d) break;
              b = a.eventTimes;
              for (e = -1; 0 < d; ) {
                var g = 31 - oc(d);
                f = 1 << g;
                g = b[g];
                g > e && (e = g);
                d &= ~f;
              }
              d = e;
              d = B() - d;
              d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
              if (10 < d) {
                a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
                break;
              }
              Pk(a, tk, uk);
              break;
            case 5:
              Pk(a, tk, uk);
              break;
            default:
              throw Error(p(329));
          }
        }
      }
      Dk(a, B());
      return a.callbackNode === c ? Gk.bind(null, a) : null;
    }
    function Nk(a, b) {
      var c = sk;
      a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
      a = Ik(a, b);
      2 !== a && (b = tk, tk = c, null !== b && Fj(b));
      return a;
    }
    function Fj(a) {
      null === tk ? tk = a : tk.push.apply(tk, a);
    }
    function Ok(a) {
      for (var b = a; ; ) {
        if (b.flags & 16384) {
          var c = b.updateQueue;
          if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
            var e = c[d], f = e.getSnapshot;
            e = e.value;
            try {
              if (!He(f(), e)) return false;
            } catch (g) {
              return false;
            }
          }
        }
        c = b.child;
        if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
        else {
          if (b === a) break;
          for (; null === b.sibling; ) {
            if (null === b.return || b.return === a) return true;
            b = b.return;
          }
          b.sibling.return = b.return;
          b = b.sibling;
        }
      }
      return true;
    }
    function Ck(a, b) {
      b &= ~rk;
      b &= ~qk;
      a.suspendedLanes |= b;
      a.pingedLanes &= ~b;
      for (a = a.expirationTimes; 0 < b; ) {
        var c = 31 - oc(b), d = 1 << c;
        a[c] = -1;
        b &= ~d;
      }
    }
    function Ek(a) {
      if (0 !== (K & 6)) throw Error(p(327));
      Hk();
      var b = uc(a, 0);
      if (0 === (b & 1)) return Dk(a, B()), null;
      var c = Ik(a, b);
      if (0 !== a.tag && 2 === c) {
        var d = xc(a);
        0 !== d && (b = d, c = Nk(a, d));
      }
      if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
      if (6 === c) throw Error(p(345));
      a.finishedWork = a.current.alternate;
      a.finishedLanes = b;
      Pk(a, tk, uk);
      Dk(a, B());
      return null;
    }
    function Qk(a, b) {
      var c = K;
      K |= 1;
      try {
        return a(b);
      } finally {
        K = c, 0 === K && (Gj = B() + 500, fg && jg());
      }
    }
    function Rk(a) {
      null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
      var b = K;
      K |= 1;
      var c = ok.transition, d = C;
      try {
        if (ok.transition = null, C = 1, a) return a();
      } finally {
        C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
      }
    }
    function Hj() {
      fj = ej.current;
      E(ej);
    }
    function Kk(a, b) {
      a.finishedWork = null;
      a.finishedLanes = 0;
      var c = a.timeoutHandle;
      -1 !== c && (a.timeoutHandle = -1, Gf(c));
      if (null !== Y) for (c = Y.return; null !== c; ) {
        var d = c;
        wg(d);
        switch (d.tag) {
          case 1:
            d = d.type.childContextTypes;
            null !== d && void 0 !== d && $f();
            break;
          case 3:
            zh();
            E(Wf);
            E(H);
            Eh();
            break;
          case 5:
            Bh(d);
            break;
          case 4:
            zh();
            break;
          case 13:
            E(L);
            break;
          case 19:
            E(L);
            break;
          case 10:
            ah(d.type._context);
            break;
          case 22:
          case 23:
            Hj();
        }
        c = c.return;
      }
      Q = a;
      Y = a = Pg(a.current, null);
      Z = fj = b;
      T = 0;
      pk = null;
      rk = qk = rh = 0;
      tk = sk = null;
      if (null !== fh) {
        for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
          c.interleaved = null;
          var e = d.next, f = c.pending;
          if (null !== f) {
            var g = f.next;
            f.next = e;
            d.next = g;
          }
          c.pending = d;
        }
        fh = null;
      }
      return a;
    }
    function Mk(a, b) {
      do {
        var c = Y;
        try {
          $g();
          Fh.current = Rh;
          if (Ih) {
            for (var d = M.memoizedState; null !== d; ) {
              var e = d.queue;
              null !== e && (e.pending = null);
              d = d.next;
            }
            Ih = false;
          }
          Hh = 0;
          O = N = M = null;
          Jh = false;
          Kh = 0;
          nk.current = null;
          if (null === c || null === c.return) {
            T = 1;
            pk = b;
            Y = null;
            break;
          }
          a: {
            var f = a, g = c.return, h = c, k = b;
            b = Z;
            h.flags |= 32768;
            if (null !== k && "object" === typeof k && "function" === typeof k.then) {
              var l = k, m = h, q = m.tag;
              if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
                var r = m.alternate;
                r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
              }
              var y = Ui(g);
              if (null !== y) {
                y.flags &= -257;
                Vi(y, g, h, f, b);
                y.mode & 1 && Si(f, l, b);
                b = y;
                k = l;
                var n = b.updateQueue;
                if (null === n) {
                  var t = /* @__PURE__ */ new Set();
                  t.add(k);
                  b.updateQueue = t;
                } else n.add(k);
                break a;
              } else {
                if (0 === (b & 1)) {
                  Si(f, l, b);
                  tj();
                  break a;
                }
                k = Error(p(426));
              }
            } else if (I && h.mode & 1) {
              var J = Ui(g);
              if (null !== J) {
                0 === (J.flags & 65536) && (J.flags |= 256);
                Vi(J, g, h, f, b);
                Jg(Ji(k, h));
                break a;
              }
            }
            f = k = Ji(k, h);
            4 !== T && (T = 2);
            null === sk ? sk = [f] : sk.push(f);
            f = g;
            do {
              switch (f.tag) {
                case 3:
                  f.flags |= 65536;
                  b &= -b;
                  f.lanes |= b;
                  var x = Ni(f, k, b);
                  ph(f, x);
                  break a;
                case 1:
                  h = k;
                  var w = f.type, u = f.stateNode;
                  if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Ri || !Ri.has(u)))) {
                    f.flags |= 65536;
                    b &= -b;
                    f.lanes |= b;
                    var F = Qi(f, h, b);
                    ph(f, F);
                    break a;
                  }
              }
              f = f.return;
            } while (null !== f);
          }
          Sk(c);
        } catch (na) {
          b = na;
          Y === c && null !== c && (Y = c = c.return);
          continue;
        }
        break;
      } while (1);
    }
    function Jk() {
      var a = mk.current;
      mk.current = Rh;
      return null === a ? Rh : a;
    }
    function tj() {
      if (0 === T || 3 === T || 2 === T) T = 4;
      null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
    }
    function Ik(a, b) {
      var c = K;
      K |= 2;
      var d = Jk();
      if (Q !== a || Z !== b) uk = null, Kk(a, b);
      do
        try {
          Tk();
          break;
        } catch (e) {
          Mk(a, e);
        }
      while (1);
      $g();
      K = c;
      mk.current = d;
      if (null !== Y) throw Error(p(261));
      Q = null;
      Z = 0;
      return T;
    }
    function Tk() {
      for (; null !== Y; ) Uk(Y);
    }
    function Lk() {
      for (; null !== Y && !cc(); ) Uk(Y);
    }
    function Uk(a) {
      var b = Vk(a.alternate, a, fj);
      a.memoizedProps = a.pendingProps;
      null === b ? Sk(a) : Y = b;
      nk.current = null;
    }
    function Sk(a) {
      var b = a;
      do {
        var c = b.alternate;
        a = b.return;
        if (0 === (b.flags & 32768)) {
          if (c = Ej(c, b, fj), null !== c) {
            Y = c;
            return;
          }
        } else {
          c = Ij(c, b);
          if (null !== c) {
            c.flags &= 32767;
            Y = c;
            return;
          }
          if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
          else {
            T = 6;
            Y = null;
            return;
          }
        }
        b = b.sibling;
        if (null !== b) {
          Y = b;
          return;
        }
        Y = b = a;
      } while (null !== b);
      0 === T && (T = 5);
    }
    function Pk(a, b, c) {
      var d = C, e = ok.transition;
      try {
        ok.transition = null, C = 1, Wk(a, b, c, d);
      } finally {
        ok.transition = e, C = d;
      }
      return null;
    }
    function Wk(a, b, c, d) {
      do
        Hk();
      while (null !== wk);
      if (0 !== (K & 6)) throw Error(p(327));
      c = a.finishedWork;
      var e = a.finishedLanes;
      if (null === c) return null;
      a.finishedWork = null;
      a.finishedLanes = 0;
      if (c === a.current) throw Error(p(177));
      a.callbackNode = null;
      a.callbackPriority = 0;
      var f = c.lanes | c.childLanes;
      Bc(a, f);
      a === Q && (Y = Q = null, Z = 0);
      0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
        Hk();
        return null;
      }));
      f = 0 !== (c.flags & 15990);
      if (0 !== (c.subtreeFlags & 15990) || f) {
        f = ok.transition;
        ok.transition = null;
        var g = C;
        C = 1;
        var h = K;
        K |= 4;
        nk.current = null;
        Oj(a, c);
        dk(c, a);
        Oe(Df);
        dd = !!Cf;
        Df = Cf = null;
        a.current = c;
        hk(c);
        dc();
        K = h;
        C = g;
        ok.transition = f;
      } else a.current = c;
      vk && (vk = false, wk = a, xk = e);
      f = a.pendingLanes;
      0 === f && (Ri = null);
      mc(c.stateNode);
      Dk(a, B());
      if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
      if (Oi) throw Oi = false, a = Pi, Pi = null, a;
      0 !== (xk & 1) && 0 !== a.tag && Hk();
      f = a.pendingLanes;
      0 !== (f & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
      jg();
      return null;
    }
    function Hk() {
      if (null !== wk) {
        var a = Dc(xk), b = ok.transition, c = C;
        try {
          ok.transition = null;
          C = 16 > a ? 16 : a;
          if (null === wk) var d = false;
          else {
            a = wk;
            wk = null;
            xk = 0;
            if (0 !== (K & 6)) throw Error(p(331));
            var e = K;
            K |= 4;
            for (V = a.current; null !== V; ) {
              var f = V, g = f.child;
              if (0 !== (V.flags & 16)) {
                var h = f.deletions;
                if (null !== h) {
                  for (var k = 0; k < h.length; k++) {
                    var l = h[k];
                    for (V = l; null !== V; ) {
                      var m = V;
                      switch (m.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Pj(8, m, f);
                      }
                      var q = m.child;
                      if (null !== q) q.return = m, V = q;
                      else for (; null !== V; ) {
                        m = V;
                        var r = m.sibling, y = m.return;
                        Sj(m);
                        if (m === l) {
                          V = null;
                          break;
                        }
                        if (null !== r) {
                          r.return = y;
                          V = r;
                          break;
                        }
                        V = y;
                      }
                    }
                  }
                  var n = f.alternate;
                  if (null !== n) {
                    var t = n.child;
                    if (null !== t) {
                      n.child = null;
                      do {
                        var J = t.sibling;
                        t.sibling = null;
                        t = J;
                      } while (null !== t);
                    }
                  }
                  V = f;
                }
              }
              if (0 !== (f.subtreeFlags & 2064) && null !== g) g.return = f, V = g;
              else b: for (; null !== V; ) {
                f = V;
                if (0 !== (f.flags & 2048)) switch (f.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Pj(9, f, f.return);
                }
                var x = f.sibling;
                if (null !== x) {
                  x.return = f.return;
                  V = x;
                  break b;
                }
                V = f.return;
              }
            }
            var w = a.current;
            for (V = w; null !== V; ) {
              g = V;
              var u = g.child;
              if (0 !== (g.subtreeFlags & 2064) && null !== u) u.return = g, V = u;
              else b: for (g = w; null !== V; ) {
                h = V;
                if (0 !== (h.flags & 2048)) try {
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qj(9, h);
                  }
                } catch (na) {
                  W(h, h.return, na);
                }
                if (h === g) {
                  V = null;
                  break b;
                }
                var F = h.sibling;
                if (null !== F) {
                  F.return = h.return;
                  V = F;
                  break b;
                }
                V = h.return;
              }
            }
            K = e;
            jg();
            if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
              lc.onPostCommitFiberRoot(kc, a);
            } catch (na) {
            }
            d = true;
          }
          return d;
        } finally {
          C = c, ok.transition = b;
        }
      }
      return false;
    }
    function Xk(a, b, c) {
      b = Ji(c, b);
      b = Ni(a, b, 1);
      a = nh(a, b, 1);
      b = R();
      null !== a && (Ac(a, 1, b), Dk(a, b));
    }
    function W(a, b, c) {
      if (3 === a.tag) Xk(a, a, c);
      else for (; null !== b; ) {
        if (3 === b.tag) {
          Xk(b, a, c);
          break;
        } else if (1 === b.tag) {
          var d = b.stateNode;
          if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
            a = Ji(c, a);
            a = Qi(b, a, 1);
            b = nh(b, a, 1);
            a = R();
            null !== b && (Ac(b, 1, a), Dk(b, a));
            break;
          }
        }
        b = b.return;
      }
    }
    function Ti(a, b, c) {
      var d = a.pingCache;
      null !== d && d.delete(b);
      b = R();
      a.pingedLanes |= a.suspendedLanes & c;
      Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
      Dk(a, b);
    }
    function Yk(a, b) {
      0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
      var c = R();
      a = ih(a, b);
      null !== a && (Ac(a, b, c), Dk(a, c));
    }
    function uj(a) {
      var b = a.memoizedState, c = 0;
      null !== b && (c = b.retryLane);
      Yk(a, c);
    }
    function bk(a, b) {
      var c = 0;
      switch (a.tag) {
        case 13:
          var d = a.stateNode;
          var e = a.memoizedState;
          null !== e && (c = e.retryLane);
          break;
        case 19:
          d = a.stateNode;
          break;
        default:
          throw Error(p(314));
      }
      null !== d && d.delete(b);
      Yk(a, c);
    }
    var Vk;
    Vk = function(a, b, c) {
      if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
      else {
        if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
        dh = 0 !== (a.flags & 131072) ? true : false;
      }
      else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
      b.lanes = 0;
      switch (b.tag) {
        case 2:
          var d = b.type;
          ij(a, b);
          a = b.pendingProps;
          var e = Yf(b, H.current);
          ch(b, c);
          e = Nh(null, b, d, a, e, c);
          var f = Sh();
          b.flags |= 1;
          "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = true, cg(b)) : f = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f, c)) : (b.tag = 0, I && f && vg(b), Xi(null, b, e, c), b = b.child);
          return b;
        case 16:
          d = b.elementType;
          a: {
            ij(a, b);
            a = b.pendingProps;
            e = d._init;
            d = e(d._payload);
            b.type = d;
            e = b.tag = Zk(d);
            a = Ci(d, a);
            switch (e) {
              case 0:
                b = cj(null, b, d, a, c);
                break a;
              case 1:
                b = hj(null, b, d, a, c);
                break a;
              case 11:
                b = Yi(null, b, d, a, c);
                break a;
              case 14:
                b = $i(null, b, d, Ci(d.type, a), c);
                break a;
            }
            throw Error(p(
              306,
              d,
              ""
            ));
          }
          return b;
        case 0:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
        case 1:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
        case 3:
          a: {
            kj(b);
            if (null === a) throw Error(p(387));
            d = b.pendingProps;
            f = b.memoizedState;
            e = f.element;
            lh(a, b);
            qh(b, d, null, c);
            var g = b.memoizedState;
            d = g.element;
            if (f.isDehydrated) if (f = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
              e = Ji(Error(p(423)), b);
              b = lj(a, b, d, c, e);
              break a;
            } else if (d !== e) {
              e = Ji(Error(p(424)), b);
              b = lj(a, b, d, c, e);
              break a;
            } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
            else {
              Ig();
              if (d === e) {
                b = Zi(a, b, c);
                break a;
              }
              Xi(a, b, d, c);
            }
            b = b.child;
          }
          return b;
        case 5:
          return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
        case 6:
          return null === a && Eg(b), null;
        case 13:
          return oj(a, b, c);
        case 4:
          return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
        case 11:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
        case 7:
          return Xi(a, b, b.pendingProps, c), b.child;
        case 8:
          return Xi(a, b, b.pendingProps.children, c), b.child;
        case 12:
          return Xi(a, b, b.pendingProps.children, c), b.child;
        case 10:
          a: {
            d = b.type._context;
            e = b.pendingProps;
            f = b.memoizedProps;
            g = e.value;
            G(Wg, d._currentValue);
            d._currentValue = g;
            if (null !== f) if (He(f.value, g)) {
              if (f.children === e.children && !Wf.current) {
                b = Zi(a, b, c);
                break a;
              }
            } else for (f = b.child, null !== f && (f.return = b); null !== f; ) {
              var h = f.dependencies;
              if (null !== h) {
                g = f.child;
                for (var k = h.firstContext; null !== k; ) {
                  if (k.context === d) {
                    if (1 === f.tag) {
                      k = mh(-1, c & -c);
                      k.tag = 2;
                      var l = f.updateQueue;
                      if (null !== l) {
                        l = l.shared;
                        var m = l.pending;
                        null === m ? k.next = k : (k.next = m.next, m.next = k);
                        l.pending = k;
                      }
                    }
                    f.lanes |= c;
                    k = f.alternate;
                    null !== k && (k.lanes |= c);
                    bh(
                      f.return,
                      c,
                      b
                    );
                    h.lanes |= c;
                    break;
                  }
                  k = k.next;
                }
              } else if (10 === f.tag) g = f.type === b.type ? null : f.child;
              else if (18 === f.tag) {
                g = f.return;
                if (null === g) throw Error(p(341));
                g.lanes |= c;
                h = g.alternate;
                null !== h && (h.lanes |= c);
                bh(g, c, b);
                g = f.sibling;
              } else g = f.child;
              if (null !== g) g.return = f;
              else for (g = f; null !== g; ) {
                if (g === b) {
                  g = null;
                  break;
                }
                f = g.sibling;
                if (null !== f) {
                  f.return = g.return;
                  g = f;
                  break;
                }
                g = g.return;
              }
              f = g;
            }
            Xi(a, b, e.children, c);
            b = b.child;
          }
          return b;
        case 9:
          return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
        case 14:
          return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
        case 15:
          return bj(a, b, b.type, b.pendingProps, c);
        case 17:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
        case 19:
          return xj(a, b, c);
        case 22:
          return dj(a, b, c);
      }
      throw Error(p(156, b.tag));
    };
    function Fk(a, b) {
      return ac(a, b);
    }
    function $k(a, b, c, d) {
      this.tag = a;
      this.key = c;
      this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
      this.index = 0;
      this.ref = null;
      this.pendingProps = b;
      this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
      this.mode = d;
      this.subtreeFlags = this.flags = 0;
      this.deletions = null;
      this.childLanes = this.lanes = 0;
      this.alternate = null;
    }
    function Bg(a, b, c, d) {
      return new $k(a, b, c, d);
    }
    function aj(a) {
      a = a.prototype;
      return !(!a || !a.isReactComponent);
    }
    function Zk(a) {
      if ("function" === typeof a) return aj(a) ? 1 : 0;
      if (void 0 !== a && null !== a) {
        a = a.$$typeof;
        if (a === Da) return 11;
        if (a === Ga) return 14;
      }
      return 2;
    }
    function Pg(a, b) {
      var c = a.alternate;
      null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
      c.flags = a.flags & 14680064;
      c.childLanes = a.childLanes;
      c.lanes = a.lanes;
      c.child = a.child;
      c.memoizedProps = a.memoizedProps;
      c.memoizedState = a.memoizedState;
      c.updateQueue = a.updateQueue;
      b = a.dependencies;
      c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
      c.sibling = a.sibling;
      c.index = a.index;
      c.ref = a.ref;
      return c;
    }
    function Rg(a, b, c, d, e, f) {
      var g = 2;
      d = a;
      if ("function" === typeof a) aj(a) && (g = 1);
      else if ("string" === typeof a) g = 5;
      else a: switch (a) {
        case ya:
          return Tg(c.children, e, f, b);
        case za:
          g = 8;
          e |= 8;
          break;
        case Aa:
          return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
        case Ea:
          return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
        case Fa:
          return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
        case Ia:
          return pj(c, e, f, b);
        default:
          if ("object" === typeof a && null !== a) switch (a.$$typeof) {
            case Ba:
              g = 10;
              break a;
            case Ca:
              g = 9;
              break a;
            case Da:
              g = 11;
              break a;
            case Ga:
              g = 14;
              break a;
            case Ha:
              g = 16;
              d = null;
              break a;
          }
          throw Error(p(130, null == a ? a : typeof a, ""));
      }
      b = Bg(g, c, b, e);
      b.elementType = a;
      b.type = d;
      b.lanes = f;
      return b;
    }
    function Tg(a, b, c, d) {
      a = Bg(7, a, d, b);
      a.lanes = c;
      return a;
    }
    function pj(a, b, c, d) {
      a = Bg(22, a, d, b);
      a.elementType = Ia;
      a.lanes = c;
      a.stateNode = { isHidden: false };
      return a;
    }
    function Qg(a, b, c) {
      a = Bg(6, a, null, b);
      a.lanes = c;
      return a;
    }
    function Sg(a, b, c) {
      b = Bg(4, null !== a.children ? a.children : [], a.key, b);
      b.lanes = c;
      b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
      return b;
    }
    function al(a, b, c, d, e) {
      this.tag = b;
      this.containerInfo = a;
      this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
      this.timeoutHandle = -1;
      this.callbackNode = this.pendingContext = this.context = null;
      this.callbackPriority = 0;
      this.eventTimes = zc(0);
      this.expirationTimes = zc(-1);
      this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
      this.entanglements = zc(0);
      this.identifierPrefix = d;
      this.onRecoverableError = e;
      this.mutableSourceEagerHydrationData = null;
    }
    function bl(a, b, c, d, e, f, g, h, k) {
      a = new al(a, b, c, h, k);
      1 === b ? (b = 1, true === f && (b |= 8)) : b = 0;
      f = Bg(3, null, null, b);
      a.current = f;
      f.stateNode = a;
      f.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
      kh(f);
      return a;
    }
    function cl(a, b, c) {
      var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
      return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
    }
    function dl(a) {
      if (!a) return Vf;
      a = a._reactInternals;
      a: {
        if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
        var b = a;
        do {
          switch (b.tag) {
            case 3:
              b = b.stateNode.context;
              break a;
            case 1:
              if (Zf(b.type)) {
                b = b.stateNode.__reactInternalMemoizedMergedChildContext;
                break a;
              }
          }
          b = b.return;
        } while (null !== b);
        throw Error(p(171));
      }
      if (1 === a.tag) {
        var c = a.type;
        if (Zf(c)) return bg(a, c, b);
      }
      return b;
    }
    function el(a, b, c, d, e, f, g, h, k) {
      a = bl(c, d, true, a, e, f, g, h, k);
      a.context = dl(null);
      c = a.current;
      d = R();
      e = yi(c);
      f = mh(d, e);
      f.callback = void 0 !== b && null !== b ? b : null;
      nh(c, f, e);
      a.current.lanes = e;
      Ac(a, e, d);
      Dk(a, d);
      return a;
    }
    function fl(a, b, c, d) {
      var e = b.current, f = R(), g = yi(e);
      c = dl(c);
      null === b.context ? b.context = c : b.pendingContext = c;
      b = mh(f, g);
      b.payload = { element: a };
      d = void 0 === d ? null : d;
      null !== d && (b.callback = d);
      a = nh(e, b, g);
      null !== a && (gi(a, e, g, f), oh(a, e, g));
      return g;
    }
    function gl(a) {
      a = a.current;
      if (!a.child) return null;
      switch (a.child.tag) {
        case 5:
          return a.child.stateNode;
        default:
          return a.child.stateNode;
      }
    }
    function hl(a, b) {
      a = a.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        var c = a.retryLane;
        a.retryLane = 0 !== c && c < b ? c : b;
      }
    }
    function il(a, b) {
      hl(a, b);
      (a = a.alternate) && hl(a, b);
    }
    function jl() {
      return null;
    }
    var kl = "function" === typeof reportError ? reportError : function(a) {
      console.error(a);
    };
    function ll(a) {
      this._internalRoot = a;
    }
    ml.prototype.render = ll.prototype.render = function(a) {
      var b = this._internalRoot;
      if (null === b) throw Error(p(409));
      fl(a, b, null, null);
    };
    ml.prototype.unmount = ll.prototype.unmount = function() {
      var a = this._internalRoot;
      if (null !== a) {
        this._internalRoot = null;
        var b = a.containerInfo;
        Rk(function() {
          fl(null, a, null, null);
        });
        b[uf] = null;
      }
    };
    function ml(a) {
      this._internalRoot = a;
    }
    ml.prototype.unstable_scheduleHydration = function(a) {
      if (a) {
        var b = Hc();
        a = { blockedOn: null, target: a, priority: b };
        for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
        Qc.splice(c, 0, a);
        0 === c && Vc(a);
      }
    };
    function nl(a) {
      return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
    }
    function ol(a) {
      return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
    }
    function pl() {
    }
    function ql(a, b, c, d, e) {
      if (e) {
        if ("function" === typeof d) {
          var f = d;
          d = function() {
            var a2 = gl(g);
            f.call(a2);
          };
        }
        var g = el(b, d, a, 0, null, false, false, "", pl);
        a._reactRootContainer = g;
        a[uf] = g.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        Rk();
        return g;
      }
      for (; e = a.lastChild; ) a.removeChild(e);
      if ("function" === typeof d) {
        var h = d;
        d = function() {
          var a2 = gl(k);
          h.call(a2);
        };
      }
      var k = bl(a, 0, false, null, null, false, false, "", pl);
      a._reactRootContainer = k;
      a[uf] = k.current;
      sf(8 === a.nodeType ? a.parentNode : a);
      Rk(function() {
        fl(b, k, c, d);
      });
      return k;
    }
    function rl(a, b, c, d, e) {
      var f = c._reactRootContainer;
      if (f) {
        var g = f;
        if ("function" === typeof e) {
          var h = e;
          e = function() {
            var a2 = gl(g);
            h.call(a2);
          };
        }
        fl(b, g, a, e);
      } else g = ql(c, b, a, e, d);
      return gl(g);
    }
    Ec = function(a) {
      switch (a.tag) {
        case 3:
          var b = a.stateNode;
          if (b.current.memoizedState.isDehydrated) {
            var c = tc(b.pendingLanes);
            0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
          }
          break;
        case 13:
          Rk(function() {
            var b2 = ih(a, 1);
            if (null !== b2) {
              var c2 = R();
              gi(b2, a, 1, c2);
            }
          }), il(a, 1);
      }
    };
    Fc = function(a) {
      if (13 === a.tag) {
        var b = ih(a, 134217728);
        if (null !== b) {
          var c = R();
          gi(b, a, 134217728, c);
        }
        il(a, 134217728);
      }
    };
    Gc = function(a) {
      if (13 === a.tag) {
        var b = yi(a), c = ih(a, b);
        if (null !== c) {
          var d = R();
          gi(c, a, b, d);
        }
        il(a, b);
      }
    };
    Hc = function() {
      return C;
    };
    Ic = function(a, b) {
      var c = C;
      try {
        return C = a, b();
      } finally {
        C = c;
      }
    };
    yb = function(a, b, c) {
      switch (b) {
        case "input":
          bb(a, c);
          b = c.name;
          if ("radio" === c.type && null != b) {
            for (c = a; c.parentNode; ) c = c.parentNode;
            c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
            for (b = 0; b < c.length; b++) {
              var d = c[b];
              if (d !== a && d.form === a.form) {
                var e = Db(d);
                if (!e) throw Error(p(90));
                Wa(d);
                bb(d, e);
              }
            }
          }
          break;
        case "textarea":
          ib(a, c);
          break;
        case "select":
          b = c.value, null != b && fb(a, !!c.multiple, b, false);
      }
    };
    Gb = Qk;
    Hb = Rk;
    var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
    var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
      a = Zb(a);
      return null === a ? null : a.stateNode;
    }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
    if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
      var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!vl.isDisabled && vl.supportsFiber) try {
        kc = vl.inject(ul), lc = vl;
      } catch (a) {
      }
    }
    reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
    reactDom_production_min.createPortal = function(a, b) {
      var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      if (!nl(b)) throw Error(p(200));
      return cl(a, b, null, c);
    };
    reactDom_production_min.createRoot = function(a, b) {
      if (!nl(a)) throw Error(p(299));
      var c = false, d = "", e = kl;
      null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
      b = bl(a, 1, false, null, null, c, false, d, e);
      a[uf] = b.current;
      sf(8 === a.nodeType ? a.parentNode : a);
      return new ll(b);
    };
    reactDom_production_min.findDOMNode = function(a) {
      if (null == a) return null;
      if (1 === a.nodeType) return a;
      var b = a._reactInternals;
      if (void 0 === b) {
        if ("function" === typeof a.render) throw Error(p(188));
        a = Object.keys(a).join(",");
        throw Error(p(268, a));
      }
      a = Zb(b);
      a = null === a ? null : a.stateNode;
      return a;
    };
    reactDom_production_min.flushSync = function(a) {
      return Rk(a);
    };
    reactDom_production_min.hydrate = function(a, b, c) {
      if (!ol(b)) throw Error(p(200));
      return rl(null, a, b, true, c);
    };
    reactDom_production_min.hydrateRoot = function(a, b, c) {
      if (!nl(a)) throw Error(p(405));
      var d = null != c && c.hydratedSources || null, e = false, f = "", g = kl;
      null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
      b = el(b, null, a, 1, null != c ? c : null, e, false, f, g);
      a[uf] = b.current;
      sf(a);
      if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
        c,
        e
      );
      return new ml(b);
    };
    reactDom_production_min.render = function(a, b, c) {
      if (!ol(b)) throw Error(p(200));
      return rl(null, a, b, false, c);
    };
    reactDom_production_min.unmountComponentAtNode = function(a) {
      if (!ol(a)) throw Error(p(40));
      return a._reactRootContainer ? (Rk(function() {
        rl(null, null, a, false, function() {
          a._reactRootContainer = null;
          a[uf] = null;
        });
      }), true) : false;
    };
    reactDom_production_min.unstable_batchedUpdates = Qk;
    reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
      if (!ol(c)) throw Error(p(200));
      if (null == a || void 0 === a._reactInternals) throw Error(p(38));
      return rl(a, b, c, false, d);
    };
    reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
    return reactDom_production_min;
  }
  var hasRequiredReactDom;
  function requireReactDom() {
    if (hasRequiredReactDom) return reactDom.exports;
    hasRequiredReactDom = 1;
    function checkDCE() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
        return;
      }
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
      } catch (err) {
        console.error(err);
      }
    }
    {
      checkDCE();
      reactDom.exports = requireReactDom_production_min();
    }
    return reactDom.exports;
  }
  var hasRequiredClient;
  function requireClient() {
    if (hasRequiredClient) return client;
    hasRequiredClient = 1;
    var m = requireReactDom();
    {
      client.createRoot = m.createRoot;
      client.hydrateRoot = m.hydrateRoot;
    }
    return client;
  }
  var clientExports = requireClient();
  const __GLOBAL__ = typeof window === "undefined" ? global : window;
  const __NAMESPACE_PREFIX__ = "@griffel/";
  function getGlobalVar(name, defaultValue) {
    if (!__GLOBAL__[/* @__PURE__ */ Symbol.for(__NAMESPACE_PREFIX__ + name)]) {
      __GLOBAL__[/* @__PURE__ */ Symbol.for(__NAMESPACE_PREFIX__ + name)] = defaultValue;
    }
    return __GLOBAL__[/* @__PURE__ */ Symbol.for(__NAMESPACE_PREFIX__ + name)];
  }
  const DEFINITION_LOOKUP_TABLE = /* @__PURE__ */ getGlobalVar("DEFINITION_LOOKUP_TABLE", {});
  const DATA_BUCKET_ATTR = "data-make-styles-bucket";
  const DATA_PRIORITY_ATTR = "data-priority";
  const SEQUENCE_HASH_LENGTH = 7;
  const SEQUENCE_PREFIX = "___";
  const SEQUENCE_SIZE = SEQUENCE_PREFIX.length + SEQUENCE_HASH_LENGTH;
  const LOOKUP_DEFINITIONS_INDEX = 0;
  const LOOKUP_DIR_INDEX = 1;
  function murmur2(str) {
    var h = 0;
    var k, i = 0, len = str.length;
    for (; len >= 4; ++i, len -= 4) {
      k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
      k = /* Math.imul(k, m): */
      (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
      k ^= /* k >>> r: */
      k >>> 24;
      h = /* Math.imul(k, m): */
      (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
      (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
    }
    switch (len) {
      case 3:
        h ^= (str.charCodeAt(i + 2) & 255) << 16;
      case 2:
        h ^= (str.charCodeAt(i + 1) & 255) << 8;
      case 1:
        h ^= str.charCodeAt(i) & 255;
        h = /* Math.imul(h, m): */
        (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
    }
    h ^= h >>> 13;
    h = /* Math.imul(h, m): */
    (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
    return ((h ^ h >>> 15) >>> 0).toString(36);
  }
  function padEndHash(value) {
    const hashLength = value.length;
    if (hashLength === SEQUENCE_HASH_LENGTH) {
      return value;
    }
    for (let i = hashLength; i < SEQUENCE_HASH_LENGTH; i++) {
      value += "0";
    }
    return value;
  }
  function hashSequence(classes, dir, sequenceIds = []) {
    {
      return SEQUENCE_PREFIX + padEndHash(murmur2(classes + dir));
    }
  }
  function reduceToClassName(classMap, dir) {
    let classString = "";
    let hashString = "";
    for (const propertyHash in classMap) {
      const classNameMapping = classMap[propertyHash];
      if (classNameMapping === 0) {
        hashString += propertyHash + " ";
        continue;
      }
      const hasRTLClassName = Array.isArray(classNameMapping);
      const className = dir === "rtl" ? (hasRTLClassName ? classNameMapping[1] : classNameMapping) + " " : (hasRTLClassName ? classNameMapping[0] : classNameMapping) + " ";
      classString += className;
      hashString += className;
    }
    return [classString.slice(0, -1), hashString.slice(0, -1)];
  }
  function reduceToClassNameForSlots(classesMapBySlot, dir) {
    const classNamesForSlots = {};
    for (const slotName in classesMapBySlot) {
      const [slotClasses, slotClassesHash] = reduceToClassName(classesMapBySlot[slotName], dir);
      if (slotClassesHash === "") {
        classNamesForSlots[slotName] = "";
        continue;
      }
      const sequenceHash = hashSequence(slotClassesHash, dir);
      const resultSlotClasses = sequenceHash + (slotClasses === "" ? "" : " " + slotClasses);
      DEFINITION_LOOKUP_TABLE[sequenceHash] = [classesMapBySlot[slotName], dir];
      classNamesForSlots[slotName] = resultSlotClasses;
    }
    return classNamesForSlots;
  }
  const mergeClassesCachedResults = {};
  function mergeClasses() {
    let dir = null;
    let resultClassName = "";
    let sequenceMatch = "";
    const sequencesIds = new Array(arguments.length);
    for (let i = 0; i < arguments.length; i++) {
      const className = arguments[i];
      if (typeof className === "string" && className !== "") {
        const sequenceIndex = className.indexOf(SEQUENCE_PREFIX);
        if (sequenceIndex === -1) {
          resultClassName += className + " ";
        } else {
          const sequenceId = className.substr(sequenceIndex, SEQUENCE_SIZE);
          if (sequenceIndex > 0) {
            resultClassName += className.slice(0, sequenceIndex);
          }
          sequenceMatch += sequenceId;
          sequencesIds[i] = sequenceId;
        }
      }
    }
    if (sequenceMatch === "") {
      return resultClassName.slice(0, -1);
    }
    const mergeClassesResult = mergeClassesCachedResults[sequenceMatch];
    if (mergeClassesResult !== void 0) {
      return resultClassName + mergeClassesResult;
    }
    const sequenceMappings = [];
    for (let i = 0; i < arguments.length; i++) {
      const sequenceId = sequencesIds[i];
      if (sequenceId) {
        const sequenceMapping = DEFINITION_LOOKUP_TABLE[sequenceId];
        if (sequenceMapping) {
          sequenceMappings.push(sequenceMapping[LOOKUP_DEFINITIONS_INDEX]);
          dir = sequenceMapping[LOOKUP_DIR_INDEX];
        }
      }
    }
    const resultClassesMap = Object.assign.apply(
      Object,
      // .assign() mutates the first object, we can't mutate mappings as it will produce invalid results later
      [{}].concat(sequenceMappings)
    );
    const [atomicClasses, classesMapHash] = reduceToClassName(resultClassesMap, dir);
    const newSequenceHash = hashSequence(classesMapHash, dir, sequencesIds);
    const newClassName = newSequenceHash + " " + atomicClasses;
    mergeClassesCachedResults[sequenceMatch] = newClassName;
    DEFINITION_LOOKUP_TABLE[newSequenceHash] = [resultClassesMap, dir];
    return resultClassName + newClassName;
  }
  function normalizeCSSBucketEntry(entry) {
    if (!Array.isArray(entry)) {
      return [entry];
    }
    return entry;
  }
  function createIsomorphicStyleSheet(styleElement, bucketName, priority, elementAttributes) {
    const __cssRulesForSSR = [];
    elementAttributes[DATA_BUCKET_ATTR] = bucketName;
    elementAttributes[DATA_PRIORITY_ATTR] = String(priority);
    if (styleElement) {
      for (const attrName in elementAttributes) {
        styleElement.setAttribute(attrName, elementAttributes[attrName]);
      }
    }
    function insertRule(rule) {
      if (styleElement === null || styleElement === void 0 ? void 0 : styleElement.sheet) {
        return styleElement.sheet.insertRule(rule, styleElement.sheet.cssRules.length);
      }
      return __cssRulesForSSR.push(rule);
    }
    return {
      elementAttributes,
      insertRule,
      element: styleElement,
      bucketName,
      cssRules() {
        if (styleElement === null || styleElement === void 0 ? void 0 : styleElement.sheet) {
          return Array.from(styleElement.sheet.cssRules).map((cssRule) => cssRule.cssText);
        }
        return __cssRulesForSSR;
      }
    };
  }
  const styleBucketOrdering = [
    // reset styles
    "r",
    // catch-all
    "d",
    // link
    "l",
    // visited
    "v",
    // focus-within
    "w",
    // focus
    "f",
    // focus-visible
    "i",
    // hover
    "h",
    // active
    "a",
    // at rules for reset styles
    "s",
    // keyframes
    "k",
    // at-rules
    "t",
    // @media rules
    "m",
    // @container rules
    "c"
  ];
  const styleBucketOrderingMap = /* @__PURE__ */ styleBucketOrdering.reduce((acc, cur, j) => {
    acc[cur] = j;
    return acc;
  }, {});
  function getStyleSheetKey(bucketName, media, priority) {
    return (bucketName === "m" ? bucketName + media : bucketName) + priority;
  }
  function getStyleSheetForBucket(bucketName, targetDocument, insertionPoint, renderer, metadata = {}) {
    var _a, _b;
    const isMediaBucket = bucketName === "m";
    const media = (_a = metadata["m"]) !== null && _a !== void 0 ? _a : "0";
    const priority = (_b = metadata["p"]) !== null && _b !== void 0 ? _b : 0;
    const stylesheetKey = getStyleSheetKey(bucketName, media, priority);
    if (!renderer.stylesheets[stylesheetKey]) {
      const tag = targetDocument && targetDocument.createElement("style");
      const stylesheet = createIsomorphicStyleSheet(tag, bucketName, priority, Object.assign({}, renderer.styleElementAttributes, isMediaBucket && {
        media
      }));
      renderer.stylesheets[stylesheetKey] = stylesheet;
      if ((targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.head) && tag) {
        targetDocument.head.insertBefore(tag, findInsertionPoint(targetDocument, insertionPoint, bucketName, renderer, metadata));
      }
    }
    return renderer.stylesheets[stylesheetKey];
  }
  function isSameInsertionKey(element, bucketName, metadata) {
    var _a, _b;
    const targetKey = bucketName + ((_a = metadata["m"]) !== null && _a !== void 0 ? _a : "");
    const elementKey = element.getAttribute(DATA_BUCKET_ATTR) + ((_b = element.media) !== null && _b !== void 0 ? _b : "");
    return targetKey === elementKey;
  }
  function findInsertionPoint(targetDocument, insertionPoint, targetBucket, renderer, metadata = {}) {
    var _a, _b;
    const targetOrder = styleBucketOrderingMap[targetBucket];
    const media = (_a = metadata["m"]) !== null && _a !== void 0 ? _a : "";
    const priority = (_b = metadata["p"]) !== null && _b !== void 0 ? _b : 0;
    let comparer = (el) => targetOrder - styleBucketOrderingMap[el.getAttribute(DATA_BUCKET_ATTR)];
    let styleElements = targetDocument.head.querySelectorAll(`[${DATA_BUCKET_ATTR}]`);
    if (targetBucket === "m") {
      const mediaElements = targetDocument.head.querySelectorAll(`[${DATA_BUCKET_ATTR}="${targetBucket}"]`);
      if (mediaElements.length) {
        styleElements = mediaElements;
        comparer = (el) => renderer.compareMediaQueries(media, el.media);
      }
    }
    const comparerWithPriority = (el) => {
      if (isSameInsertionKey(el, targetBucket, metadata)) {
        return priority - Number(el.getAttribute("data-priority"));
      }
      return comparer(el);
    };
    const length = styleElements.length;
    let index = length - 1;
    while (index >= 0) {
      const styleElement = styleElements.item(index);
      if (comparerWithPriority(styleElement) > 0) {
        return styleElement.nextSibling;
      }
      index--;
    }
    if (length > 0) {
      return styleElements.item(0);
    }
    return insertionPoint ? insertionPoint.nextSibling : null;
  }
  function safeInsertRule(sheet, ruleCSS) {
    try {
      sheet.insertRule(ruleCSS);
    } catch (e) {
    }
  }
  let lastIndex = 0;
  const defaultCompareMediaQueries = (a, b) => a < b ? -1 : a > b ? 1 : 0;
  function createDOMRenderer(targetDocument = typeof document === "undefined" ? void 0 : document, options = {}) {
    const {
      classNameHashSalt,
      unstable_filterCSSRule,
      insertionPoint,
      styleElementAttributes,
      compareMediaQueries = defaultCompareMediaQueries
    } = options;
    const renderer = {
      classNameHashSalt,
      insertionCache: {},
      stylesheets: {},
      styleElementAttributes: Object.freeze(styleElementAttributes),
      compareMediaQueries,
      id: `d${lastIndex++}`,
      insertCSSRules(cssRules) {
        for (const styleBucketName in cssRules) {
          const cssRulesForBucket = cssRules[styleBucketName];
          for (let i = 0, l = cssRulesForBucket.length; i < l; i++) {
            const [ruleCSS, metadata] = normalizeCSSBucketEntry(cssRulesForBucket[i]);
            const sheet = getStyleSheetForBucket(styleBucketName, targetDocument, insertionPoint || null, renderer, metadata);
            if (renderer.insertionCache[ruleCSS]) {
              continue;
            }
            renderer.insertionCache[ruleCSS] = styleBucketName;
            if (unstable_filterCSSRule) {
              if (unstable_filterCSSRule(ruleCSS)) {
                safeInsertRule(sheet, ruleCSS);
              }
            } else {
              safeInsertRule(sheet, ruleCSS);
            }
          }
        }
      }
    };
    return renderer;
  }
  const insertionFactory$1 = () => {
    const insertionCache = {};
    return function insertStyles(renderer, cssRules) {
      if (insertionCache[renderer.id] === void 0) {
        renderer.insertCSSRules(cssRules);
        insertionCache[renderer.id] = true;
      }
    };
  };
  function __styles$1(classesMapBySlot, cssRules, factory = insertionFactory$1) {
    const insertStyles = factory();
    let ltrClassNamesForSlots = null;
    let rtlClassNamesForSlots = null;
    function computeClasses(options) {
      const {
        dir,
        renderer
      } = options;
      const isLTR = dir === "ltr";
      if (isLTR) {
        if (ltrClassNamesForSlots === null) {
          ltrClassNamesForSlots = reduceToClassNameForSlots(classesMapBySlot, dir);
        }
      } else {
        if (rtlClassNamesForSlots === null) {
          rtlClassNamesForSlots = reduceToClassNameForSlots(classesMapBySlot, dir);
        }
      }
      insertStyles(renderer, cssRules);
      const classNamesForSlots = isLTR ? ltrClassNamesForSlots : rtlClassNamesForSlots;
      return classNamesForSlots;
    }
    return computeClasses;
  }
  function __resetStyles$1(ltrClassName, rtlClassName, cssRules, factory = insertionFactory$1) {
    const insertStyles = factory();
    function computeClassName(options) {
      const {
        dir,
        renderer
      } = options;
      const className = dir === "ltr" ? ltrClassName : rtlClassName || ltrClassName;
      insertStyles(renderer, Array.isArray(cssRules) ? {
        r: cssRules
      } : cssRules);
      return className;
    }
    return computeClassName;
  }
  function canUseDOM$1() {
    return typeof window !== "undefined" && !!(window.document && window.document.createElement);
  }
  const useInsertionEffect$1 = (
    // @ts-expect-error Hack to make sure that `useInsertionEffect` will not cause bundling issues in older React versions
    // eslint-disable-next-line no-useless-concat
    React$1["useInsertionEffect"] ? React$1["useInsertionEffect"] : void 0
  );
  const insertionFactory = () => {
    const insertionCache = {};
    return function insert(renderer, cssRules) {
      if (useInsertionEffect$1 && canUseDOM$1()) {
        useInsertionEffect$1(() => {
          renderer.insertCSSRules(cssRules);
        }, [renderer, cssRules]);
        return;
      }
      if (insertionCache[renderer.id] === void 0) {
        renderer.insertCSSRules(cssRules);
        insertionCache[renderer.id] = true;
      }
    };
  };
  const RendererContext = /* @__PURE__ */ reactExports.createContext(/* @__PURE__ */ createDOMRenderer());
  function useRenderer() {
    return reactExports.useContext(RendererContext);
  }
  const TextDirectionContext = /* @__PURE__ */ reactExports.createContext("ltr");
  const TextDirectionProvider = ({
    children,
    dir
  }) => {
    return /* @__PURE__ */ reactExports.createElement(TextDirectionContext.Provider, {
      value: dir
    }, children);
  };
  function useTextDirection() {
    return reactExports.useContext(TextDirectionContext);
  }
  function __styles(classesMapBySlot, cssRules) {
    const getStyles = __styles$1(classesMapBySlot, cssRules, insertionFactory);
    return function useClasses() {
      const dir = useTextDirection();
      const renderer = useRenderer();
      return getStyles({
        dir,
        renderer
      });
    };
  }
  function __resetStyles(ltrClassName, rtlClassName, cssRules) {
    const getStyles = __resetStyles$1(ltrClassName, rtlClassName, cssRules, insertionFactory);
    return function useClasses() {
      const dir = useTextDirection();
      const renderer = useRenderer();
      return getStyles({
        dir,
        renderer
      });
    };
  }
  const CSS_ESCAPE_MAP = {
    "<": "\\3C ",
    ">": "\\3E "
  };
  function escapeForStyleTag(value) {
    return value.replace(/[<>]/g, (match) => CSS_ESCAPE_MAP[match]);
  }
  function createCSSRuleFromTheme(selector, theme) {
    if (theme) {
      const cssVarsAsString = Object.keys(theme).reduce((cssVarRule, cssVar) => {
        return `${cssVarRule}--${cssVar}: ${theme[cssVar]}; `;
      }, "");
      return `${selector} { ${escapeForStyleTag(cssVarsAsString)} }`;
    }
    return `${selector} {}`;
  }
  const SLOT_RENDER_FUNCTION_SYMBOL = /* @__PURE__ */ Symbol.for("fui.slotRenderFunction");
  const SLOT_ELEMENT_TYPE_SYMBOL = /* @__PURE__ */ Symbol.for("fui.slotElementType");
  const SLOT_CLASS_NAME_PROP_SYMBOL = /* @__PURE__ */ Symbol.for("fui.slotClassNameProp");
  function always(value, options) {
    const { defaultProps, elementType } = options;
    const props = resolveShorthand(value);
    const propsWithMetadata = {
      ...defaultProps,
      ...props,
      [SLOT_ELEMENT_TYPE_SYMBOL]: elementType,
      [SLOT_CLASS_NAME_PROP_SYMBOL]: (props === null || props === void 0 ? void 0 : props.className) || (defaultProps === null || defaultProps === void 0 ? void 0 : defaultProps.className)
    };
    if (props && typeof props.children === "function") {
      propsWithMetadata[SLOT_RENDER_FUNCTION_SYMBOL] = props.children;
      propsWithMetadata.children = defaultProps === null || defaultProps === void 0 ? void 0 : defaultProps.children;
    }
    return propsWithMetadata;
  }
  function optional(value, options) {
    if (value === null || value === void 0 && !options.renderByDefault) {
      return void 0;
    }
    return always(value, options);
  }
  function resolveShorthand(value) {
    if (typeof value === "string" || typeof value === "number" || isIterable(value) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reactExports.isValidElement(value)) {
      return {
        children: value
      };
    }
    return value;
  }
  const isIterable = (value) => typeof value === "object" && value !== null && Symbol.iterator in value;
  function isSlot(element) {
    return Boolean(element === null || element === void 0 ? void 0 : element.hasOwnProperty(SLOT_ELEMENT_TYPE_SYMBOL));
  }
  const toObjectMap = (...items) => {
    const result = {};
    for (const item of items) {
      const keys = Array.isArray(item) ? item : Object.keys(item);
      for (const key of keys) {
        result[key] = 1;
      }
    }
    return result;
  };
  const baseElementEvents = toObjectMap([
    "onAuxClick",
    "onAnimationEnd",
    "onAnimationStart",
    "onCopy",
    "onCut",
    "onPaste",
    "onCompositionEnd",
    "onCompositionStart",
    "onCompositionUpdate",
    "onFocus",
    "onFocusCapture",
    "onBlur",
    "onBlurCapture",
    "onChange",
    "onInput",
    "onSubmit",
    "onLoad",
    "onError",
    "onKeyDown",
    "onKeyDownCapture",
    "onKeyPress",
    "onKeyUp",
    "onAbort",
    "onCanPlay",
    "onCanPlayThrough",
    "onDurationChange",
    "onEmptied",
    "onEncrypted",
    "onEnded",
    "onLoadedData",
    "onLoadedMetadata",
    "onLoadStart",
    "onPause",
    "onPlay",
    "onPlaying",
    "onProgress",
    "onRateChange",
    "onSeeked",
    "onSeeking",
    "onStalled",
    "onSuspend",
    "onTimeUpdate",
    "onVolumeChange",
    "onWaiting",
    "onClick",
    "onClickCapture",
    "onContextMenu",
    "onDoubleClick",
    "onDrag",
    "onDragEnd",
    "onDragEnter",
    "onDragExit",
    "onDragLeave",
    "onDragOver",
    "onDragStart",
    "onDrop",
    "onMouseDown",
    "onMouseDownCapture",
    "onMouseEnter",
    "onMouseLeave",
    "onMouseMove",
    "onMouseOut",
    "onMouseOver",
    "onMouseUp",
    "onMouseUpCapture",
    "onSelect",
    "onTouchCancel",
    "onTouchEnd",
    "onTouchMove",
    "onTouchStart",
    "onScroll",
    "onWheel",
    "onPointerCancel",
    "onPointerDown",
    "onPointerEnter",
    "onPointerLeave",
    "onPointerMove",
    "onPointerOut",
    "onPointerOver",
    "onPointerUp",
    "onGotPointerCapture",
    "onLostPointerCapture"
  ]);
  const baseElementProperties = toObjectMap([
    "accessKey",
    "children",
    "className",
    "contentEditable",
    "dir",
    "draggable",
    "hidden",
    "htmlFor",
    "id",
    "lang",
    "popover",
    "focusgroup",
    "ref",
    "role",
    "style",
    "tabIndex",
    "title",
    "translate",
    "spellCheck",
    "name"
  ]);
  const microdataProperties = toObjectMap([
    "itemID",
    "itemProp",
    "itemRef",
    "itemScope",
    "itemType"
  ]);
  const htmlElementProperties = toObjectMap(baseElementProperties, baseElementEvents, microdataProperties);
  const labelProperties = toObjectMap(htmlElementProperties, [
    "form"
  ]);
  const audioProperties = toObjectMap(htmlElementProperties, [
    "height",
    "loop",
    "muted",
    "preload",
    "src",
    "width"
  ]);
  const videoProperties = toObjectMap(audioProperties, [
    "poster"
  ]);
  const olProperties = toObjectMap(htmlElementProperties, [
    "start"
  ]);
  const liProperties = toObjectMap(htmlElementProperties, [
    "value"
  ]);
  const anchorProperties = toObjectMap(htmlElementProperties, [
    "download",
    "href",
    "hrefLang",
    "media",
    "referrerPolicy",
    "rel",
    "target",
    "type"
  ]);
  const timeProperties = toObjectMap(htmlElementProperties, [
    "dateTime"
  ]);
  const buttonProperties = toObjectMap(htmlElementProperties, [
    "autoFocus",
    "disabled",
    "form",
    "formAction",
    "formEncType",
    "formMethod",
    "formNoValidate",
    "formTarget",
    "popoverTarget",
    "popoverTargetAction",
    "type",
    "value"
  ]);
  const inputProperties = toObjectMap(buttonProperties, [
    "accept",
    "alt",
    "autoCorrect",
    "autoCapitalize",
    "autoComplete",
    "checked",
    "dirname",
    "form",
    "height",
    "inputMode",
    "list",
    "max",
    "maxLength",
    "min",
    "minLength",
    "multiple",
    "pattern",
    "placeholder",
    "readOnly",
    "required",
    "src",
    "step",
    "size",
    "type",
    "value",
    "width"
  ]);
  const textAreaProperties = toObjectMap(buttonProperties, [
    "autoCapitalize",
    "cols",
    "dirname",
    "form",
    "maxLength",
    "placeholder",
    "readOnly",
    "required",
    "rows",
    "wrap"
  ]);
  const selectProperties = toObjectMap(buttonProperties, [
    "form",
    "multiple",
    "required"
  ]);
  const optionProperties = toObjectMap(htmlElementProperties, [
    "selected",
    "value"
  ]);
  const tableProperties = toObjectMap(htmlElementProperties, [
    "cellPadding",
    "cellSpacing"
  ]);
  const trProperties = htmlElementProperties;
  const thProperties = toObjectMap(htmlElementProperties, [
    "colSpan",
    "rowSpan",
    "scope"
  ]);
  const tdProperties = toObjectMap(htmlElementProperties, [
    "colSpan",
    "headers",
    "rowSpan",
    "scope"
  ]);
  const colGroupProperties = toObjectMap(htmlElementProperties, [
    "span"
  ]);
  const colProperties = toObjectMap(htmlElementProperties, [
    "span"
  ]);
  const fieldsetProperties = toObjectMap(htmlElementProperties, [
    "disabled",
    "form"
  ]);
  const formProperties = toObjectMap(htmlElementProperties, [
    "acceptCharset",
    "action",
    "encType",
    "encType",
    "method",
    "noValidate",
    "target"
  ]);
  const iframeProperties = toObjectMap(htmlElementProperties, [
    "allow",
    "allowFullScreen",
    "allowPaymentRequest",
    "allowTransparency",
    "csp",
    "height",
    "importance",
    "referrerPolicy",
    "sandbox",
    "src",
    "srcDoc",
    "width"
  ]);
  const imgProperties = toObjectMap(htmlElementProperties, [
    "alt",
    "crossOrigin",
    "height",
    "src",
    "srcSet",
    "useMap",
    "width"
  ]);
  const dialogProperties = toObjectMap(htmlElementProperties, [
    "open",
    "onCancel",
    "onClose"
  ]);
  function getNativeProps(props, allowedPropNames, excludedPropNames) {
    const isArray = Array.isArray(allowedPropNames);
    const result = {};
    const keys = Object.keys(props);
    for (const key of keys) {
      const isNativeProp = !isArray && allowedPropNames[key] || isArray && allowedPropNames.indexOf(key) >= 0 || key.indexOf("data-") === 0 || key.indexOf("aria-") === 0;
      if (isNativeProp && (!excludedPropNames || (excludedPropNames === null || excludedPropNames === void 0 ? void 0 : excludedPropNames.indexOf(key)) === -1)) {
        result[key] = props[key];
      }
    }
    return result;
  }
  const nativeElementMap = {
    label: labelProperties,
    audio: audioProperties,
    video: videoProperties,
    ol: olProperties,
    li: liProperties,
    a: anchorProperties,
    button: buttonProperties,
    input: inputProperties,
    textarea: textAreaProperties,
    select: selectProperties,
    option: optionProperties,
    table: tableProperties,
    tr: trProperties,
    th: thProperties,
    td: tdProperties,
    colGroup: colGroupProperties,
    col: colProperties,
    fieldset: fieldsetProperties,
    form: formProperties,
    iframe: iframeProperties,
    img: imgProperties,
    time: timeProperties,
    dialog: dialogProperties
  };
  function getNativeElementProps(tagName, props, excludedPropNames) {
    const allowedPropNames = tagName && nativeElementMap[tagName] || htmlElementProperties;
    allowedPropNames.as = 1;
    return getNativeProps(props, allowedPropNames, excludedPropNames);
  }
  const getPartitionedNativeProps = ({ primarySlotTagName, props, excludedPropNames }) => {
    return {
      root: {
        style: props.style,
        className: props.className
      },
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      primary: getNativeElementProps(primarySlotTagName, props, [
        ...excludedPropNames || [],
        "style",
        "className"
      ])
    };
  };
  const getIntrinsicElementProps = (tagName, props, excludedPropNames) => {
    var _props_as;
    return getNativeElementProps((_props_as = props.as) !== null && _props_as !== void 0 ? _props_as : tagName, props, excludedPropNames);
  };
  function useBrowserTimer(setTimer, cancelTimer) {
    const id = reactExports.useRef(void 0);
    const set = reactExports.useCallback((fn, delay) => {
      if (id.current !== void 0) {
        cancelTimer(id.current);
      }
      id.current = setTimer(fn, delay);
      return id.current;
    }, [
      cancelTimer,
      setTimer
    ]);
    const cancel = reactExports.useCallback(() => {
      if (id.current !== void 0) {
        cancelTimer(id.current);
        id.current = void 0;
      }
    }, [
      cancelTimer
    ]);
    reactExports.useEffect(() => cancel, [
      cancel
    ]);
    return [
      set,
      cancel
    ];
  }
  const ThemeContext = reactExports.createContext(void 0);
  const ThemeProvider = ThemeContext.Provider;
  const ThemeClassNameContext = reactExports.createContext(void 0);
  const ThemeClassNameProvider = ThemeClassNameContext.Provider;
  const TooltipVisibilityContext = reactExports.createContext(void 0);
  const TooltipVisibilityProvider = TooltipVisibilityContext.Provider;
  const ProviderContext = reactExports.createContext(void 0);
  const providerContextDefaultValue = {
    // eslint-disable-next-line @nx/workspace-no-restricted-globals -- expected ignore ( SSR friendly acquisition of globals )
    targetDocument: typeof document === "object" ? document : void 0,
    dir: "ltr"
  };
  const Provider = ProviderContext.Provider;
  function useFluent() {
    var _React_useContext;
    return (_React_useContext = reactExports.useContext(ProviderContext)) !== null && _React_useContext !== void 0 ? _React_useContext : providerContextDefaultValue;
  }
  const OverridesContext = reactExports.createContext(void 0);
  const OverridesProvider = OverridesContext.Provider;
  function useOverrides() {
    var _React_useContext;
    return (_React_useContext = reactExports.useContext(OverridesContext)) !== null && _React_useContext !== void 0 ? _React_useContext : {};
  }
  const CustomStyleHooksContext = reactExports.createContext(void 0);
  const noop = () => {
  };
  const CustomStyleHooksProvider = CustomStyleHooksContext.Provider;
  const useCustomStyleHook = (hook) => {
    var _React_useContext;
    var _React_useContext_hook;
    return (_React_useContext_hook = (_React_useContext = reactExports.useContext(CustomStyleHooksContext)) === null || _React_useContext === void 0 ? void 0 : _React_useContext[hook]) !== null && _React_useContext_hook !== void 0 ? _React_useContext_hook : noop;
  };
  function isFactoryDispatch(newState) {
    return typeof newState === "function";
  }
  const useControllableState = (options) => {
    "use no memo";
    const [internalState, setInternalState] = reactExports.useState(() => {
      if (options.defaultState === void 0) {
        return options.initialState;
      }
      return isInitializer(options.defaultState) ? options.defaultState() : options.defaultState;
    });
    const stateValueRef = reactExports.useRef(options.state);
    reactExports.useEffect(() => {
      stateValueRef.current = options.state;
    }, [
      options.state
    ]);
    const setControlledState = reactExports.useCallback((newState) => {
      if (isFactoryDispatch(newState)) {
        newState(stateValueRef.current);
      }
    }, []);
    return useIsControlled(options.state) ? [
      options.state,
      setControlledState
    ] : [
      internalState,
      setInternalState
    ];
  };
  function isInitializer(value) {
    return typeof value === "function";
  }
  const useIsControlled = (controlledValue) => {
    "use no memo";
    const [isControlled] = reactExports.useState(() => controlledValue !== void 0);
    return isControlled;
  };
  function canUseDOM() {
    return (
      /* eslint-disable @nx/workspace-no-restricted-globals -- expected ignore ( SSR friendly acquisition of globals )*/
      typeof window !== "undefined" && !!(window.document && // eslint-disable-next-line @typescript-eslint/no-deprecated
      window.document.createElement)
    );
  }
  const defaultSSRContextValue = {
    current: 0
  };
  const SSRContext = /* @__PURE__ */ reactExports.createContext(void 0);
  function useSSRContext() {
    var _React_useContext;
    return (_React_useContext = reactExports.useContext(SSRContext)) !== null && _React_useContext !== void 0 ? _React_useContext : defaultSSRContextValue;
  }
  const useIsomorphicLayoutEffect = canUseDOM() ? reactExports.useLayoutEffect : reactExports.useEffect;
  const useEventCallback = (fn) => {
    const callbackRef = reactExports.useRef(() => {
      throw new Error("Cannot call an event handler while rendering");
    });
    useIsomorphicLayoutEffect(() => {
      callbackRef.current = fn;
    }, [
      fn
    ]);
    return reactExports.useCallback((...args) => {
      const callback = callbackRef.current;
      return callback(...args);
    }, [
      callbackRef
    ]);
  };
  const IdPrefixContext = reactExports.createContext(void 0);
  IdPrefixContext.Provider;
  function useIdPrefix() {
    return reactExports.useContext(IdPrefixContext) || "";
  }
  function useId(prefix = "fui-", providedId) {
    "use no memo";
    const contextValue = useSSRContext();
    const idPrefix = useIdPrefix();
    const _useId = React$1["useId"];
    if (_useId) {
      const generatedId = _useId();
      const escapedId = reactExports.useMemo(() => generatedId.replace(/:/g, ""), [
        generatedId
      ]);
      return providedId || `${idPrefix}${prefix}${escapedId}`;
    }
    return reactExports.useMemo(() => {
      return `${idPrefix}${prefix}${++contextValue.current}`;
    }, [
      idPrefix,
      prefix,
      providedId,
      contextValue
    ]);
  }
  function useMergedRefs(...refs) {
    "use no memo";
    const mergedCallback = reactExports.useCallback(
      (value) => {
        mergedCallback.current = value;
        for (const ref of refs) {
          if (typeof ref === "function") {
            ref(value);
          } else if (ref) {
            ref.current = value;
          }
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps -- already exhaustive
      [
        ...refs
      ]
    );
    return mergedCallback;
  }
  const setTimeoutNoop = (_callback) => -1;
  const clearTimeoutNoop = (_handle) => void 0;
  function useTimeout() {
    const { targetDocument } = useFluent();
    const win = targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.defaultView;
    const setTimerFn = win ? win.setTimeout : setTimeoutNoop;
    const clearTimerFn = win ? win.clearTimeout : clearTimeoutNoop;
    return useBrowserTimer(setTimerFn, clearTimerFn);
  }
  function isHTMLElement(element, options) {
    var _typedElement_ownerDocument;
    const typedElement = element;
    var _options_constructorName;
    return Boolean((typedElement === null || typedElement === void 0 ? void 0 : (_typedElement_ownerDocument = typedElement.ownerDocument) === null || _typedElement_ownerDocument === void 0 ? void 0 : _typedElement_ownerDocument.defaultView) && typedElement instanceof typedElement.ownerDocument.defaultView[(_options_constructorName = void 0) !== null && _options_constructorName !== void 0 ? _options_constructorName : "HTMLElement"]);
  }
  function createCompatSlotComponent(type, props) {
    return {
      ...props,
      [SLOT_ELEMENT_TYPE_SYMBOL]: type
    };
  }
  function createJSX(runtime, slotRuntime) {
    return function jsx2(type, overrideProps, key, source, self) {
      if (isSlot(overrideProps)) {
        return slotRuntime(createCompatSlotComponent(type, overrideProps), null, key, source, self);
      }
      if (isSlot(type)) {
        return slotRuntime(type, overrideProps, key, source, self);
      }
      return runtime(type, overrideProps, key, source, self);
    };
  }
  function getMetadataFromSlotComponent(type) {
    const { as, [SLOT_CLASS_NAME_PROP_SYMBOL]: _classNameProp, [SLOT_ELEMENT_TYPE_SYMBOL]: baseElementType, [SLOT_RENDER_FUNCTION_SYMBOL]: renderFunction, ...propsWithoutMetadata } = type;
    const props = propsWithoutMetadata;
    const elementType = typeof baseElementType === "string" ? as !== null && as !== void 0 ? as : baseElementType : baseElementType;
    if (typeof elementType !== "string" && as) {
      props.as = as;
    }
    return {
      elementType,
      props,
      renderFunction
    };
  }
  const Runtime = ReactRuntime;
  const jsxSlot = (type, overrideProps, key) => {
    const { elementType, renderFunction, props: slotProps } = getMetadataFromSlotComponent(type);
    const props = {
      ...slotProps,
      ...overrideProps
    };
    if (renderFunction) {
      return Runtime.jsx(reactExports.Fragment, {
        children: renderFunction(elementType, props)
      }, key);
    }
    return Runtime.jsx(elementType, props, key);
  };
  const jsxsSlot = (type, overrideProps, key) => {
    const { elementType, renderFunction, props: slotProps } = getMetadataFromSlotComponent(type);
    const props = {
      ...slotProps,
      ...overrideProps
    };
    if (renderFunction) {
      return Runtime.jsx(reactExports.Fragment, {
        children: renderFunction(elementType, {
          ...props,
          children: Runtime.jsxs(reactExports.Fragment, {
            children: props.children
          }, void 0)
        })
      }, key);
    }
    return Runtime.jsxs(elementType, props, key);
  };
  const jsx = createJSX(Runtime.jsx, jsxSlot);
  const jsxs = createJSX(Runtime.jsxs, jsxsSlot);
  const IconDirectionContext = reactExports.createContext(void 0);
  const IconDirectionContextProvider = IconDirectionContext.Provider;
  const renderFluentProvider_unstable = (state, contextValues) => {
    return /* @__PURE__ */ jsx(Provider, {
      value: contextValues.provider,
      children: /* @__PURE__ */ jsx(ThemeProvider, {
        value: contextValues.theme,
        children: /* @__PURE__ */ jsx(ThemeClassNameProvider, {
          value: contextValues.themeClassName,
          children: /* @__PURE__ */ jsx(CustomStyleHooksProvider, {
            value: contextValues.customStyleHooks_unstable,
            children: /* @__PURE__ */ jsx(TooltipVisibilityProvider, {
              value: contextValues.tooltip,
              children: /* @__PURE__ */ jsx(TextDirectionProvider, {
                dir: contextValues.textDirection,
                children: /* @__PURE__ */ jsx(IconDirectionContextProvider, {
                  value: contextValues.iconDirection,
                  children: /* @__PURE__ */ jsx(OverridesProvider, {
                    value: contextValues.overrides_unstable,
                    children: /* @__PURE__ */ jsxs(state.root, {
                      children: [
                        canUseDOM() ? null : /* @__PURE__ */ jsx("style", {
                          // Using dangerous HTML because react can escape characters
                          // which can lead to invalid CSS.
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML: {
                            __html: state.serverStyleProps.cssRule
                          },
                          ...state.serverStyleProps.attributes
                        }),
                        state.root.children
                      ]
                    })
                  })
                })
              })
            })
          })
        })
      })
    });
  };
  var _canUseWeakRef = typeof WeakRef !== "undefined";
  var WeakRefInstance = class {
    constructor(instance) {
      if (_canUseWeakRef && typeof instance === "object") {
        this._weakRef = new WeakRef(instance);
      } else {
        this._instance = instance;
      }
    }
    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef/deref}
     */
    deref() {
      var _a, _b;
      let instance;
      if (this._weakRef) {
        instance = (_a = this._weakRef) == null ? void 0 : _a.deref();
        if (!instance) {
          delete this._weakRef;
        }
      } else {
        instance = this._instance;
        if ((_b = instance == null ? void 0 : instance.isDisposed) == null ? void 0 : _b.call(instance)) {
          delete this._instance;
        }
      }
      return instance;
    }
  };
  var KEYBORG_FOCUSIN = "keyborg:focusin";
  var KEYBORG_FOCUSOUT = "keyborg:focusout";
  function canOverrideNativeFocus(win) {
    const HTMLElement = win.HTMLElement;
    const origFocus = HTMLElement.prototype.focus;
    let isCustomFocusCalled = false;
    HTMLElement.prototype.focus = function focus() {
      isCustomFocusCalled = true;
    };
    const btn = win.document.createElement("button");
    btn.focus();
    HTMLElement.prototype.focus = origFocus;
    return isCustomFocusCalled;
  }
  var _canOverrideNativeFocus = false;
  function setupFocusEvent(win) {
    const kwin = win;
    if (!_canOverrideNativeFocus) {
      _canOverrideNativeFocus = canOverrideNativeFocus(kwin);
    }
    const origFocus = kwin.HTMLElement.prototype.focus;
    if (origFocus.__keyborgNativeFocus) {
      return;
    }
    kwin.HTMLElement.prototype.focus = focus;
    const shadowTargets = /* @__PURE__ */ new Set();
    const focusOutHandler = (e) => {
      const target = e.target;
      if (!target) {
        return;
      }
      const event = new CustomEvent(KEYBORG_FOCUSOUT, {
        cancelable: true,
        bubbles: true,
        // Allows the event to bubble past an open shadow root
        composed: true,
        detail: {
          originalEvent: e
        }
      });
      target.dispatchEvent(event);
    };
    const focusInHandler = (e) => {
      const target = e.target;
      if (!target) {
        return;
      }
      let node = e.composedPath()[0];
      const currentShadows = /* @__PURE__ */ new Set();
      while (node) {
        if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          currentShadows.add(node);
          node = node.host;
        } else {
          node = node.parentNode;
        }
      }
      for (const shadowRootWeakRef of shadowTargets) {
        const shadowRoot = shadowRootWeakRef.deref();
        if (!shadowRoot || !currentShadows.has(shadowRoot)) {
          shadowTargets.delete(shadowRootWeakRef);
          if (shadowRoot) {
            shadowRoot.removeEventListener("focusin", focusInHandler, true);
            shadowRoot.removeEventListener("focusout", focusOutHandler, true);
          }
        }
      }
      onFocusIn(target, e.relatedTarget || void 0);
    };
    const onFocusIn = (target, relatedTarget, originalEvent) => {
      var _a;
      const shadowRoot = target.shadowRoot;
      if (shadowRoot) {
        for (const shadowRootWeakRef of shadowTargets) {
          if (shadowRootWeakRef.deref() === shadowRoot) {
            return;
          }
        }
        shadowRoot.addEventListener("focusin", focusInHandler, true);
        shadowRoot.addEventListener("focusout", focusOutHandler, true);
        shadowTargets.add(new WeakRefInstance(shadowRoot));
        return;
      }
      const details = {
        relatedTarget,
        originalEvent
      };
      const event = new CustomEvent(KEYBORG_FOCUSIN, {
        cancelable: true,
        bubbles: true,
        // Allows the event to bubble past an open shadow root
        composed: true,
        detail: details
      });
      event.details = details;
      if (_canOverrideNativeFocus || data.lastFocusedProgrammatically) {
        details.isFocusedProgrammatically = target === ((_a = data.lastFocusedProgrammatically) == null ? void 0 : _a.deref());
        data.lastFocusedProgrammatically = void 0;
      }
      target.dispatchEvent(event);
    };
    const data = kwin.__keyborgData = {
      focusInHandler,
      focusOutHandler,
      shadowTargets
    };
    kwin.document.addEventListener(
      "focusin",
      kwin.__keyborgData.focusInHandler,
      true
    );
    kwin.document.addEventListener(
      "focusout",
      kwin.__keyborgData.focusOutHandler,
      true
    );
    function focus() {
      const keyborgNativeFocusEvent = kwin.__keyborgData;
      if (keyborgNativeFocusEvent) {
        keyborgNativeFocusEvent.lastFocusedProgrammatically = new WeakRefInstance(
          this
        );
      }
      return origFocus.apply(this, arguments);
    }
    let activeElement = kwin.document.activeElement;
    while (activeElement && activeElement.shadowRoot) {
      onFocusIn(activeElement);
      activeElement = activeElement.shadowRoot.activeElement;
    }
    focus.__keyborgNativeFocus = origFocus;
  }
  function disposeFocusEvent(win) {
    const kwin = win;
    const proto = kwin.HTMLElement.prototype;
    const origFocus = proto.focus.__keyborgNativeFocus;
    const keyborgNativeFocusEvent = kwin.__keyborgData;
    if (keyborgNativeFocusEvent) {
      kwin.document.removeEventListener(
        "focusin",
        keyborgNativeFocusEvent.focusInHandler,
        true
      );
      kwin.document.removeEventListener(
        "focusout",
        keyborgNativeFocusEvent.focusOutHandler,
        true
      );
      for (const shadowRootWeakRef of keyborgNativeFocusEvent.shadowTargets) {
        const shadowRoot = shadowRootWeakRef.deref();
        if (shadowRoot) {
          shadowRoot.removeEventListener(
            "focusin",
            keyborgNativeFocusEvent.focusInHandler,
            true
          );
          shadowRoot.removeEventListener(
            "focusout",
            keyborgNativeFocusEvent.focusOutHandler,
            true
          );
        }
      }
      keyborgNativeFocusEvent.shadowTargets.clear();
      delete kwin.__keyborgData;
    }
    if (origFocus) {
      proto.focus = origFocus;
    }
  }
  var _dismissTimeout = 500;
  var _lastId = 0;
  var KeyborgCore = class {
    constructor(win, props) {
      this._isNavigatingWithKeyboard_DO_NOT_USE = false;
      this._onFocusIn = (e) => {
        if (this._isMouseOrTouchUsedTimer) {
          return;
        }
        if (this.isNavigatingWithKeyboard) {
          return;
        }
        const details = e.detail;
        if (!details.relatedTarget) {
          return;
        }
        if (details.isFocusedProgrammatically || details.isFocusedProgrammatically === void 0) {
          return;
        }
        this.isNavigatingWithKeyboard = true;
      };
      this._onMouseDown = (e) => {
        if (e.buttons === 0 || e.clientX === 0 && e.clientY === 0 && e.screenX === 0 && e.screenY === 0) {
          return;
        }
        this._onMouseOrTouch();
      };
      this._onMouseOrTouch = () => {
        const win2 = this._win;
        if (win2) {
          if (this._isMouseOrTouchUsedTimer) {
            win2.clearTimeout(this._isMouseOrTouchUsedTimer);
          }
          this._isMouseOrTouchUsedTimer = win2.setTimeout(() => {
            delete this._isMouseOrTouchUsedTimer;
          }, 1e3);
        }
        this.isNavigatingWithKeyboard = false;
      };
      this._onKeyDown = (e) => {
        const isNavigatingWithKeyboard = this.isNavigatingWithKeyboard;
        if (isNavigatingWithKeyboard) {
          if (this._shouldDismissKeyboardNavigation(e)) {
            this._scheduleDismiss();
          }
        } else {
          if (this._shouldTriggerKeyboardNavigation(e)) {
            this.isNavigatingWithKeyboard = true;
          }
        }
      };
      this.id = "c" + ++_lastId;
      this._win = win;
      const doc = win.document;
      if (props) {
        const triggerKeys = props.triggerKeys;
        const dismissKeys = props.dismissKeys;
        if (triggerKeys == null ? void 0 : triggerKeys.length) {
          this._triggerKeys = new Set(triggerKeys);
        }
        if (dismissKeys == null ? void 0 : dismissKeys.length) {
          this._dismissKeys = new Set(dismissKeys);
        }
      }
      doc.addEventListener(KEYBORG_FOCUSIN, this._onFocusIn, true);
      doc.addEventListener("mousedown", this._onMouseDown, true);
      win.addEventListener("keydown", this._onKeyDown, true);
      doc.addEventListener("touchstart", this._onMouseOrTouch, true);
      doc.addEventListener("touchend", this._onMouseOrTouch, true);
      doc.addEventListener("touchcancel", this._onMouseOrTouch, true);
      setupFocusEvent(win);
    }
    get isNavigatingWithKeyboard() {
      return this._isNavigatingWithKeyboard_DO_NOT_USE;
    }
    set isNavigatingWithKeyboard(val) {
      if (this._isNavigatingWithKeyboard_DO_NOT_USE !== val) {
        this._isNavigatingWithKeyboard_DO_NOT_USE = val;
        this.update();
      }
    }
    dispose() {
      const win = this._win;
      if (win) {
        if (this._isMouseOrTouchUsedTimer) {
          win.clearTimeout(this._isMouseOrTouchUsedTimer);
          this._isMouseOrTouchUsedTimer = void 0;
        }
        if (this._dismissTimer) {
          win.clearTimeout(this._dismissTimer);
          this._dismissTimer = void 0;
        }
        disposeFocusEvent(win);
        const doc = win.document;
        doc.removeEventListener(KEYBORG_FOCUSIN, this._onFocusIn, true);
        doc.removeEventListener("mousedown", this._onMouseDown, true);
        win.removeEventListener("keydown", this._onKeyDown, true);
        doc.removeEventListener("touchstart", this._onMouseOrTouch, true);
        doc.removeEventListener("touchend", this._onMouseOrTouch, true);
        doc.removeEventListener("touchcancel", this._onMouseOrTouch, true);
        delete this._win;
      }
    }
    isDisposed() {
      return !!this._win;
    }
    /**
     * Updates all keyborg instances with the keyboard navigation state
     */
    update() {
      var _a, _b;
      const keyborgs = (_b = (_a = this._win) == null ? void 0 : _a.__keyborg) == null ? void 0 : _b.refs;
      if (keyborgs) {
        for (const id of Object.keys(keyborgs)) {
          Keyborg.update(keyborgs[id], this.isNavigatingWithKeyboard);
        }
      }
    }
    /**
     * @returns whether the keyboard event should trigger keyboard navigation mode
     */
    _shouldTriggerKeyboardNavigation(e) {
      var _a;
      if (e.key === "Tab") {
        return true;
      }
      const activeElement = (_a = this._win) == null ? void 0 : _a.document.activeElement;
      const isTriggerKey = !this._triggerKeys || this._triggerKeys.has(e.keyCode);
      const isEditable = activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable);
      return isTriggerKey && !isEditable;
    }
    /**
     * @returns whether the keyboard event should dismiss keyboard navigation mode
     */
    _shouldDismissKeyboardNavigation(e) {
      var _a;
      return (_a = this._dismissKeys) == null ? void 0 : _a.has(e.keyCode);
    }
    _scheduleDismiss() {
      const win = this._win;
      if (win) {
        if (this._dismissTimer) {
          win.clearTimeout(this._dismissTimer);
          this._dismissTimer = void 0;
        }
        const was = win.document.activeElement;
        this._dismissTimer = win.setTimeout(() => {
          this._dismissTimer = void 0;
          const cur = win.document.activeElement;
          if (was && cur && was === cur) {
            this.isNavigatingWithKeyboard = false;
          }
        }, _dismissTimeout);
      }
    }
  };
  var Keyborg = class _Keyborg {
    constructor(win, props) {
      this._cb = [];
      this._id = "k" + ++_lastId;
      this._win = win;
      const current = win.__keyborg;
      if (current) {
        this._core = current.core;
        current.refs[this._id] = this;
      } else {
        this._core = new KeyborgCore(win, props);
        win.__keyborg = {
          core: this._core,
          refs: { [this._id]: this }
        };
      }
    }
    static create(win, props) {
      return new _Keyborg(win, props);
    }
    static dispose(instance) {
      instance.dispose();
    }
    /**
     * Updates all subscribed callbacks with the keyboard navigation state
     */
    static update(instance, isNavigatingWithKeyboard) {
      instance._cb.forEach((callback) => callback(isNavigatingWithKeyboard));
    }
    dispose() {
      var _a;
      const current = (_a = this._win) == null ? void 0 : _a.__keyborg;
      if (current == null ? void 0 : current.refs[this._id]) {
        delete current.refs[this._id];
        if (Object.keys(current.refs).length === 0) {
          current.core.dispose();
          delete this._win.__keyborg;
        }
      }
      this._cb = [];
      delete this._core;
      delete this._win;
    }
    /**
     * @returns Whether the user is navigating with keyboard
     */
    isNavigatingWithKeyboard() {
      var _a;
      return !!((_a = this._core) == null ? void 0 : _a.isNavigatingWithKeyboard);
    }
    /**
     * @param callback - Called when the keyboard navigation state changes
     */
    subscribe(callback) {
      this._cb.push(callback);
    }
    /**
     * @param callback - Registered with subscribe
     */
    unsubscribe(callback) {
      const index = this._cb.indexOf(callback);
      if (index >= 0) {
        this._cb.splice(index, 1);
      }
    }
    /**
     * Manually set the keyboard navigtion state
     */
    setVal(isNavigatingWithKeyboard) {
      if (this._core) {
        this._core.isNavigatingWithKeyboard = isNavigatingWithKeyboard;
      }
    }
  };
  function createKeyborg(win, props) {
    return Keyborg.create(win, props);
  }
  function disposeKeyborg(instance) {
    Keyborg.dispose(instance);
  }
  const FOCUS_VISIBLE_ATTR = "data-fui-focus-visible";
  function applyFocusVisiblePolyfill(scope, targetWindow) {
    if (alreadyInScope(scope)) {
      return () => void 0;
    }
    const state = {
      current: void 0
    };
    const keyborg = createKeyborg(targetWindow);
    function registerElementIfNavigating(el) {
      if (keyborg.isNavigatingWithKeyboard() && isHTMLElement(el)) {
        state.current = el;
        el.setAttribute(FOCUS_VISIBLE_ATTR, "");
      }
    }
    function disposeCurrentElement() {
      if (state.current) {
        state.current.removeAttribute(FOCUS_VISIBLE_ATTR);
        state.current = void 0;
      }
    }
    keyborg.subscribe((isNavigatingWithKeyboard) => {
      if (!isNavigatingWithKeyboard) {
        disposeCurrentElement();
      } else {
        registerElementIfNavigating(targetWindow.document.activeElement);
      }
    });
    const keyborgListener = (e) => {
      disposeCurrentElement();
      const target = e.composedPath()[0];
      registerElementIfNavigating(target);
    };
    const blurListener = (e) => {
      if (!e.relatedTarget || isHTMLElement(e.relatedTarget) && !scope.contains(e.relatedTarget)) {
        disposeCurrentElement();
      }
    };
    scope.addEventListener(KEYBORG_FOCUSIN, keyborgListener);
    scope.addEventListener("focusout", blurListener);
    scope.focusVisible = true;
    if (scope.contains(targetWindow.document.activeElement)) {
      registerElementIfNavigating(targetWindow.document.activeElement);
    }
    return () => {
      disposeCurrentElement();
      scope.removeEventListener(KEYBORG_FOCUSIN, keyborgListener);
      scope.removeEventListener("focusout", blurListener);
      scope.focusVisible = void 0;
      disposeKeyborg(keyborg);
    };
  }
  function alreadyInScope(el) {
    if (!el) {
      return false;
    }
    if (el.focusVisible) {
      return true;
    }
    return alreadyInScope(el === null || el === void 0 ? void 0 : el.parentElement);
  }
  function useFocusVisible(options = {}) {
    const contextValue = useFluent();
    const scopeRef = reactExports.useRef(null);
    var _options_targetDocument;
    const targetDocument = (_options_targetDocument = options.targetDocument) !== null && _options_targetDocument !== void 0 ? _options_targetDocument : contextValue.targetDocument;
    reactExports.useEffect(() => {
      if ((targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.defaultView) && scopeRef.current) {
        return applyFocusVisiblePolyfill(scopeRef.current, targetDocument.defaultView);
      }
    }, [
      scopeRef,
      targetDocument
    ]);
    return scopeRef;
  }
  const grey = {
    "12": "#1f1f1f",
    "14": "#242424",
    "16": "#292929",
    "20": "#333333",
    "22": "#383838",
    "24": "#3d3d3d",
    "26": "#424242",
    "30": "#4d4d4d",
    "34": "#575757",
    "38": "#616161",
    "44": "#707070",
    "70": "#b3b3b3",
    "74": "#bdbdbd",
    "78": "#c7c7c7",
    "82": "#d1d1d1",
    "84": "#d6d6d6",
    "86": "#dbdbdb",
    "88": "#e0e0e0",
    "90": "#e6e6e6",
    "92": "#ebebeb",
    "94": "#f0f0f0",
    "96": "#f5f5f5",
    "98": "#fafafa",
    "99": "#fcfcfc"
  };
  const whiteAlpha = {
    "10": "rgba(255, 255, 255, 0.1)",
    "20": "rgba(255, 255, 255, 0.2)",
    "40": "rgba(255, 255, 255, 0.4)",
    "50": "rgba(255, 255, 255, 0.5)",
    "70": "rgba(255, 255, 255, 0.7)",
    "80": "rgba(255, 255, 255, 0.8)"
  };
  const blackAlpha = {
    "5": "rgba(0, 0, 0, 0.05)",
    "10": "rgba(0, 0, 0, 0.1)",
    "20": "rgba(0, 0, 0, 0.2)",
    "30": "rgba(0, 0, 0, 0.3)",
    "40": "rgba(0, 0, 0, 0.4)",
    "50": "rgba(0, 0, 0, 0.5)"
  };
  const white = "#ffffff";
  const black = "#000000";
  const darkRed = {
    shade50: "#130204",
    shade40: "#230308",
    shade30: "#420610",
    shade20: "#590815",
    shade10: "#690a19",
    primary: "#750b1c",
    tint10: "#861b2c",
    tint20: "#962f3f",
    tint30: "#ac4f5e",
    tint40: "#d69ca5",
    tint50: "#e9c7cd",
    tint60: "#f9f0f2"
  };
  const cranberry = {
    shade50: "#200205",
    shade40: "#3b0509",
    shade30: "#6e0811",
    shade20: "#960b18",
    shade10: "#b10e1c",
    primary: "#c50f1f",
    tint10: "#cc2635",
    tint20: "#d33f4c",
    tint30: "#dc626d",
    tint40: "#eeacb2",
    tint50: "#f6d1d5",
    tint60: "#fdf3f4"
  };
  const red = {
    shade50: "#210809",
    shade40: "#3f1011",
    shade30: "#751d1f",
    shade20: "#9f282b",
    shade10: "#bc2f32",
    primary: "#d13438",
    tint10: "#d7494c",
    tint20: "#dc5e62",
    tint30: "#e37d80",
    tint40: "#f1bbbc",
    tint50: "#f8dadb",
    tint60: "#fdf6f6"
  };
  const darkOrange = {
    shade50: "#230900",
    shade40: "#411200",
    shade30: "#7a2101",
    shade20: "#a62d01",
    shade10: "#c43501",
    primary: "#da3b01",
    tint10: "#de501c",
    tint20: "#e36537",
    tint30: "#e9835e",
    tint40: "#f4bfab",
    tint50: "#f9dcd1",
    tint60: "#fdf6f3"
  };
  const pumpkin = {
    shade50: "#200d03",
    shade40: "#3d1805",
    shade30: "#712d09",
    shade20: "#9a3d0c",
    shade10: "#b6480e",
    primary: "#ca5010",
    tint10: "#d06228",
    tint20: "#d77440",
    tint30: "#df8e64",
    tint40: "#efc4ad",
    tint50: "#f7dfd2",
    tint60: "#fdf7f4"
  };
  const orange = {
    shade50: "#271002",
    shade40: "#4a1e04",
    shade30: "#8a3707",
    shade20: "#bc4b09",
    shade10: "#de590b",
    primary: "#f7630c",
    tint10: "#f87528",
    tint20: "#f98845",
    tint30: "#faa06b",
    tint40: "#fdcfb4",
    tint50: "#fee5d7",
    tint60: "#fff9f5"
  };
  const peach = {
    shade50: "#291600",
    shade40: "#4d2a00",
    shade30: "#8f4e00",
    shade20: "#c26a00",
    shade10: "#e67e00",
    primary: "#ff8c00",
    tint10: "#ff9a1f",
    tint20: "#ffa83d",
    tint30: "#ffba66",
    tint40: "#ffddb3",
    tint50: "#ffedd6",
    tint60: "#fffaf5"
  };
  const marigold = {
    shade50: "#251a00",
    shade40: "#463100",
    shade30: "#835b00",
    shade20: "#b27c00",
    shade10: "#d39300",
    primary: "#eaa300",
    tint10: "#edad1c",
    tint20: "#efb839",
    tint30: "#f2c661",
    tint40: "#f9e2ae",
    tint50: "#fcefd3",
    tint60: "#fefbf4"
  };
  const yellow = {
    shade50: "#282400",
    shade40: "#4c4400",
    shade30: "#817400",
    shade20: "#c0ad00",
    shade10: "#e4cc00",
    primary: "#fde300",
    tint10: "#fde61e",
    tint20: "#fdea3d",
    tint30: "#feee66",
    tint40: "#fef7b2",
    tint50: "#fffad6",
    tint60: "#fffef5"
  };
  const gold = {
    shade50: "#1f1900",
    shade40: "#3a2f00",
    shade30: "#6c5700",
    shade20: "#937700",
    shade10: "#ae8c00",
    primary: "#c19c00",
    tint10: "#c8a718",
    tint20: "#d0b232",
    tint30: "#dac157",
    tint40: "#ecdfa5",
    tint50: "#f5eece",
    tint60: "#fdfbf2"
  };
  const brass = {
    shade50: "#181202",
    shade40: "#2e2103",
    shade30: "#553e06",
    shade20: "#745408",
    shade10: "#89640a",
    primary: "#986f0b",
    tint10: "#a47d1e",
    tint20: "#b18c34",
    tint30: "#c1a256",
    tint40: "#e0cea2",
    tint50: "#efe4cb",
    tint60: "#fbf8f2"
  };
  const brown = {
    shade50: "#170e07",
    shade40: "#2b1a0e",
    shade30: "#50301a",
    shade20: "#6c4123",
    shade10: "#804d29",
    primary: "#8e562e",
    tint10: "#9c663f",
    tint20: "#a97652",
    tint30: "#bb8f6f",
    tint40: "#ddc3b0",
    tint50: "#edded3",
    tint60: "#faf7f4"
  };
  const forest = {
    shade50: "#0c1501",
    shade40: "#162702",
    shade30: "#294903",
    shade20: "#376304",
    shade10: "#427505",
    primary: "#498205",
    tint10: "#599116",
    tint20: "#6ba02b",
    tint30: "#85b44c",
    tint40: "#bdd99b",
    tint50: "#dbebc7",
    tint60: "#f6faf0"
  };
  const seafoam = {
    shade50: "#002111",
    shade40: "#003d20",
    shade30: "#00723b",
    shade20: "#009b51",
    shade10: "#00b85f",
    primary: "#00cc6a",
    tint10: "#19d279",
    tint20: "#34d889",
    tint30: "#5ae0a0",
    tint40: "#a8f0cd",
    tint50: "#cff7e4",
    tint60: "#f3fdf8"
  };
  const lightGreen = {
    shade50: "#031a02",
    shade40: "#063004",
    shade30: "#0b5a08",
    shade20: "#0e7a0b",
    shade10: "#11910d",
    primary: "#13a10e",
    tint10: "#27ac22",
    tint20: "#3db838",
    tint30: "#5ec75a",
    tint40: "#a7e3a5",
    tint50: "#cef0cd",
    tint60: "#f2fbf2"
  };
  const green = {
    shade50: "#031403",
    shade40: "#052505",
    shade30: "#094509",
    shade20: "#0c5e0c",
    shade10: "#0e700e",
    primary: "#107c10",
    tint10: "#218c21",
    tint20: "#359b35",
    tint30: "#54b054",
    tint40: "#9fd89f",
    tint50: "#c9eac9",
    tint60: "#f1faf1"
  };
  const darkGreen = {
    shade50: "#021102",
    shade40: "#032003",
    shade30: "#063b06",
    shade20: "#085108",
    shade10: "#0a5f0a",
    primary: "#0b6a0b",
    tint10: "#1a7c1a",
    tint20: "#2d8e2d",
    tint30: "#4da64d",
    tint40: "#9ad29a",
    tint50: "#c6e7c6",
    tint60: "#f0f9f0"
  };
  const lightTeal = {
    shade50: "#001d1f",
    shade40: "#00373a",
    shade30: "#00666d",
    shade20: "#008b94",
    shade10: "#00a5af",
    primary: "#00b7c3",
    tint10: "#18bfca",
    tint20: "#32c8d1",
    tint30: "#58d3db",
    tint40: "#a6e9ed",
    tint50: "#cef3f5",
    tint60: "#f2fcfd"
  };
  const teal = {
    shade50: "#001516",
    shade40: "#012728",
    shade30: "#02494c",
    shade20: "#026467",
    shade10: "#037679",
    primary: "#038387",
    tint10: "#159195",
    tint20: "#2aa0a4",
    tint30: "#4cb4b7",
    tint40: "#9bd9db",
    tint50: "#c7ebec",
    tint60: "#f0fafa"
  };
  const steel = {
    shade50: "#000f12",
    shade40: "#001b22",
    shade30: "#00333f",
    shade20: "#004555",
    shade10: "#005265",
    primary: "#005b70",
    tint10: "#0f6c81",
    tint20: "#237d92",
    tint30: "#4496a9",
    tint40: "#94c8d4",
    tint50: "#c3e1e8",
    tint60: "#eff7f9"
  };
  const blue = {
    shade50: "#001322",
    shade40: "#002440",
    shade30: "#004377",
    shade20: "#005ba1",
    shade10: "#006cbf",
    primary: "#0078d4",
    tint10: "#1a86d9",
    tint20: "#3595de",
    tint30: "#5caae5",
    tint40: "#a9d3f2",
    tint50: "#d0e7f8",
    tint60: "#f3f9fd"
  };
  const royalBlue = {
    shade50: "#000c16",
    shade40: "#00172a",
    shade30: "#002c4e",
    shade20: "#003b6a",
    shade10: "#00467e",
    primary: "#004e8c",
    tint10: "#125e9a",
    tint20: "#286fa8",
    tint30: "#4a89ba",
    tint40: "#9abfdc",
    tint50: "#c7dced",
    tint60: "#f0f6fa"
  };
  const cornflower = {
    shade50: "#0d1126",
    shade40: "#182047",
    shade30: "#2c3c85",
    shade20: "#3c51b4",
    shade10: "#4760d5",
    primary: "#4f6bed",
    tint10: "#637cef",
    tint20: "#778df1",
    tint30: "#93a4f4",
    tint40: "#c8d1fa",
    tint50: "#e1e6fc",
    tint60: "#f7f9fe"
  };
  const navy = {
    shade50: "#00061d",
    shade40: "#000c36",
    shade30: "#001665",
    shade20: "#001e89",
    shade10: "#0023a2",
    primary: "#0027b4",
    tint10: "#173bbd",
    tint20: "#3050c6",
    tint30: "#546fd2",
    tint40: "#a3b2e8",
    tint50: "#ccd5f3",
    tint60: "#f2f4fc"
  };
  const lavender = {
    shade50: "#120f25",
    shade40: "#221d46",
    shade30: "#3f3682",
    shade20: "#5649b0",
    shade10: "#6656d1",
    primary: "#7160e8",
    tint10: "#8172eb",
    tint20: "#9184ee",
    tint30: "#a79cf1",
    tint40: "#d2ccf8",
    tint50: "#e7e4fb",
    tint60: "#f9f8fe"
  };
  const purple = {
    shade50: "#0f0717",
    shade40: "#1c0e2b",
    shade30: "#341a51",
    shade20: "#46236e",
    shade10: "#532982",
    primary: "#5c2e91",
    tint10: "#6b3f9e",
    tint20: "#7c52ab",
    tint30: "#9470bd",
    tint40: "#c6b1de",
    tint50: "#e0d3ed",
    tint60: "#f7f4fb"
  };
  const grape = {
    shade50: "#160418",
    shade40: "#29072e",
    shade30: "#4c0d55",
    shade20: "#671174",
    shade10: "#7a1589",
    primary: "#881798",
    tint10: "#952aa4",
    tint20: "#a33fb1",
    tint30: "#b55fc1",
    tint40: "#d9a7e0",
    tint50: "#eaceef",
    tint60: "#faf2fb"
  };
  const berry = {
    shade50: "#1f091d",
    shade40: "#3a1136",
    shade30: "#6d2064",
    shade20: "#932b88",
    shade10: "#af33a1",
    primary: "#c239b3",
    tint10: "#c94cbc",
    tint20: "#d161c4",
    tint30: "#da7ed0",
    tint40: "#edbbe7",
    tint50: "#f5daf2",
    tint60: "#fdf5fc"
  };
  const lilac = {
    shade50: "#1c0b1f",
    shade40: "#35153a",
    shade30: "#63276d",
    shade20: "#863593",
    shade10: "#9f3faf",
    primary: "#b146c2",
    tint10: "#ba58c9",
    tint20: "#c36bd1",
    tint30: "#cf87da",
    tint40: "#e6bfed",
    tint50: "#f2dcf5",
    tint60: "#fcf6fd"
  };
  const pink = {
    shade50: "#24091b",
    shade40: "#441232",
    shade30: "#80215d",
    shade20: "#ad2d7e",
    shade10: "#cd3595",
    primary: "#e43ba6",
    tint10: "#e750b0",
    tint20: "#ea66ba",
    tint30: "#ef85c8",
    tint40: "#f7c0e3",
    tint50: "#fbddf0",
    tint60: "#fef6fb"
  };
  const magenta = {
    shade50: "#1f0013",
    shade40: "#390024",
    shade30: "#6b0043",
    shade20: "#91005a",
    shade10: "#ac006b",
    primary: "#bf0077",
    tint10: "#c71885",
    tint20: "#ce3293",
    tint30: "#d957a8",
    tint40: "#eca5d1",
    tint50: "#f5cee6",
    tint60: "#fcf2f9"
  };
  const plum = {
    shade50: "#13000c",
    shade40: "#240017",
    shade30: "#43002b",
    shade20: "#5a003b",
    shade10: "#6b0045",
    primary: "#77004d",
    tint10: "#87105d",
    tint20: "#98246f",
    tint30: "#ad4589",
    tint40: "#d696c0",
    tint50: "#e9c4dc",
    tint60: "#faf0f6"
  };
  const beige = {
    shade50: "#141313",
    shade40: "#252323",
    shade30: "#444241",
    shade20: "#5d5958",
    shade10: "#6e6968",
    primary: "#7a7574",
    tint10: "#8a8584",
    tint20: "#9a9594",
    tint30: "#afabaa",
    tint40: "#d7d4d4",
    tint50: "#eae8e8",
    tint60: "#faf9f9"
  };
  const mink = {
    shade50: "#0f0e0e",
    shade40: "#1c1b1a",
    shade30: "#343231",
    shade20: "#474443",
    shade10: "#54514f",
    primary: "#5d5a58",
    tint10: "#706d6b",
    tint20: "#84817e",
    tint30: "#9e9b99",
    tint40: "#cecccb",
    tint50: "#e5e4e3",
    tint60: "#f8f8f8"
  };
  const platinum = {
    shade50: "#111314",
    shade40: "#1f2426",
    shade30: "#3b4447",
    shade20: "#505c60",
    shade10: "#5f6d71",
    primary: "#69797e",
    tint10: "#79898d",
    tint20: "#89989d",
    tint30: "#a0adb2",
    tint40: "#cdd6d8",
    tint50: "#e4e9ea",
    tint60: "#f8f9fa"
  };
  const anchor = {
    shade50: "#090a0b",
    shade40: "#111315",
    shade30: "#202427",
    shade20: "#2b3135",
    shade10: "#333a3f",
    primary: "#394146",
    tint10: "#4d565c",
    tint20: "#626c72",
    tint30: "#808a90",
    tint40: "#bcc3c7",
    tint50: "#dbdfe1",
    tint60: "#f6f7f8"
  };
  const statusSharedColors = {
    red,
    green,
    darkOrange,
    yellow,
    berry,
    lightGreen,
    marigold
  };
  const personaSharedColors = {
    darkRed,
    cranberry,
    pumpkin,
    peach,
    gold,
    brass,
    brown,
    forest,
    seafoam,
    darkGreen,
    lightTeal,
    teal,
    steel,
    blue,
    royalBlue,
    cornflower,
    navy,
    lavender,
    purple,
    grape,
    lilac,
    pink,
    magenta,
    plum,
    beige,
    mink,
    platinum,
    anchor
  };
  const mappedStatusColors = {
    cranberry,
    green,
    orange
  };
  const statusSharedColorNames = [
    "red",
    "green",
    "darkOrange",
    "yellow",
    "berry",
    "lightGreen",
    "marigold"
  ];
  const personaSharedColorNames = [
    "darkRed",
    "cranberry",
    "pumpkin",
    "peach",
    "gold",
    "brass",
    "brown",
    "forest",
    "seafoam",
    "darkGreen",
    "lightTeal",
    "teal",
    "steel",
    "blue",
    "royalBlue",
    "cornflower",
    "navy",
    "lavender",
    "purple",
    "grape",
    "lilac",
    "pink",
    "magenta",
    "plum",
    "beige",
    "mink",
    "platinum",
    "anchor"
  ];
  const statusColorMapping = {
    success: "green",
    warning: "orange",
    danger: "cranberry"
  };
  const statusColorPaletteTokens = statusSharedColorNames.reduce((acc, sharedColor) => {
    const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
    const sharedColorTokens = {
      [`colorPalette${color}Background1`]: statusSharedColors[sharedColor].tint60,
      [`colorPalette${color}Background2`]: statusSharedColors[sharedColor].tint40,
      [`colorPalette${color}Background3`]: statusSharedColors[sharedColor].primary,
      [`colorPalette${color}Foreground1`]: statusSharedColors[sharedColor].shade10,
      [`colorPalette${color}Foreground2`]: statusSharedColors[sharedColor].shade30,
      [`colorPalette${color}Foreground3`]: statusSharedColors[sharedColor].primary,
      [`colorPalette${color}BorderActive`]: statusSharedColors[sharedColor].primary,
      [`colorPalette${color}Border1`]: statusSharedColors[sharedColor].tint40,
      [`colorPalette${color}Border2`]: statusSharedColors[sharedColor].primary
    };
    return Object.assign(acc, sharedColorTokens);
  }, {});
  statusColorPaletteTokens.colorPaletteYellowForeground1 = statusSharedColors.yellow.shade30;
  statusColorPaletteTokens.colorPaletteRedForegroundInverted = statusSharedColors.red.tint20;
  statusColorPaletteTokens.colorPaletteGreenForegroundInverted = statusSharedColors.green.tint20;
  statusColorPaletteTokens.colorPaletteYellowForegroundInverted = statusSharedColors.yellow.tint40;
  const personaColorPaletteTokens = personaSharedColorNames.reduce((acc, sharedColor) => {
    const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
    const sharedColorTokens = {
      [`colorPalette${color}Background2`]: personaSharedColors[sharedColor].tint40,
      [`colorPalette${color}Foreground2`]: personaSharedColors[sharedColor].shade30,
      [`colorPalette${color}BorderActive`]: personaSharedColors[sharedColor].primary
    };
    return Object.assign(acc, sharedColorTokens);
  }, {});
  const colorPaletteTokens = {
    ...statusColorPaletteTokens,
    ...personaColorPaletteTokens
  };
  const colorStatusTokens = Object.entries(statusColorMapping).reduce((acc, [statusColor, sharedColor]) => {
    const color = statusColor.slice(0, 1).toUpperCase() + statusColor.slice(1);
    const statusColorTokens = {
      [`colorStatus${color}Background1`]: mappedStatusColors[sharedColor].tint60,
      [`colorStatus${color}Background2`]: mappedStatusColors[sharedColor].tint40,
      [`colorStatus${color}Background3`]: mappedStatusColors[sharedColor].primary,
      [`colorStatus${color}Foreground1`]: mappedStatusColors[sharedColor].shade10,
      [`colorStatus${color}Foreground2`]: mappedStatusColors[sharedColor].shade30,
      [`colorStatus${color}Foreground3`]: mappedStatusColors[sharedColor].primary,
      [`colorStatus${color}ForegroundInverted`]: mappedStatusColors[sharedColor].tint30,
      [`colorStatus${color}BorderActive`]: mappedStatusColors[sharedColor].primary,
      [`colorStatus${color}Border1`]: mappedStatusColors[sharedColor].tint40,
      [`colorStatus${color}Border2`]: mappedStatusColors[sharedColor].primary
    };
    return Object.assign(acc, statusColorTokens);
  }, {});
  colorStatusTokens.colorStatusDangerBackground3Hover = mappedStatusColors[statusColorMapping.danger].shade10;
  colorStatusTokens.colorStatusDangerBackground3Pressed = mappedStatusColors[statusColorMapping.danger].shade20;
  colorStatusTokens.colorStatusWarningForeground1 = mappedStatusColors[statusColorMapping.warning].shade20;
  colorStatusTokens.colorStatusWarningForeground3 = mappedStatusColors[statusColorMapping.warning].shade20;
  colorStatusTokens.colorStatusWarningBorder2 = mappedStatusColors[statusColorMapping.warning].shade20;
  const generateColorTokens = (brand) => ({
    colorNeutralForeground1: grey[14],
    colorNeutralForeground1Hover: grey[14],
    colorNeutralForeground1Pressed: grey[14],
    colorNeutralForeground1Selected: grey[14],
    colorNeutralForeground2: grey[26],
    colorNeutralForeground2Hover: grey[14],
    colorNeutralForeground2Pressed: grey[14],
    colorNeutralForeground2Selected: grey[14],
    colorNeutralForeground2BrandHover: brand[80],
    colorNeutralForeground2BrandPressed: brand[70],
    colorNeutralForeground2BrandSelected: brand[80],
    colorNeutralForeground3: grey[38],
    colorNeutralForeground3Hover: grey[26],
    colorNeutralForeground3Pressed: grey[26],
    colorNeutralForeground3Selected: grey[26],
    colorNeutralForeground3BrandHover: brand[80],
    colorNeutralForeground3BrandPressed: brand[70],
    colorNeutralForeground3BrandSelected: brand[80],
    colorNeutralForeground4: grey[44],
    colorNeutralForeground5: grey[38],
    colorNeutralForeground5Hover: grey[14],
    colorNeutralForeground5Pressed: grey[14],
    colorNeutralForeground5Selected: grey[14],
    colorNeutralForegroundDisabled: grey[74],
    colorNeutralForegroundInvertedDisabled: whiteAlpha[40],
    colorBrandForegroundLink: brand[70],
    colorBrandForegroundLinkHover: brand[60],
    colorBrandForegroundLinkPressed: brand[40],
    colorBrandForegroundLinkSelected: brand[70],
    colorNeutralForeground2Link: grey[26],
    colorNeutralForeground2LinkHover: grey[14],
    colorNeutralForeground2LinkPressed: grey[14],
    colorNeutralForeground2LinkSelected: grey[14],
    colorCompoundBrandForeground1: brand[80],
    colorCompoundBrandForeground1Hover: brand[70],
    colorCompoundBrandForeground1Pressed: brand[60],
    colorBrandForeground1: brand[80],
    colorBrandForeground2: brand[70],
    colorBrandForeground2Hover: brand[60],
    colorBrandForeground2Pressed: brand[30],
    colorNeutralForeground1Static: grey[14],
    colorNeutralForegroundStaticInverted: white,
    colorNeutralForegroundInverted: white,
    colorNeutralForegroundInvertedHover: white,
    colorNeutralForegroundInvertedPressed: white,
    colorNeutralForegroundInvertedSelected: white,
    colorNeutralForegroundInverted2: white,
    colorNeutralForegroundOnBrand: white,
    colorNeutralForegroundInvertedLink: white,
    colorNeutralForegroundInvertedLinkHover: white,
    colorNeutralForegroundInvertedLinkPressed: white,
    colorNeutralForegroundInvertedLinkSelected: white,
    colorBrandForegroundInverted: brand[100],
    colorBrandForegroundInvertedHover: brand[110],
    colorBrandForegroundInvertedPressed: brand[100],
    colorBrandForegroundOnLight: brand[80],
    colorBrandForegroundOnLightHover: brand[70],
    colorBrandForegroundOnLightPressed: brand[50],
    colorBrandForegroundOnLightSelected: brand[60],
    colorNeutralBackground1: white,
    colorNeutralBackground1Hover: grey[96],
    colorNeutralBackground1Pressed: grey[88],
    colorNeutralBackground1Selected: grey[92],
    colorNeutralBackground2: grey[98],
    colorNeutralBackground2Hover: grey[94],
    colorNeutralBackground2Pressed: grey[86],
    colorNeutralBackground2Selected: grey[90],
    colorNeutralBackground3: grey[96],
    colorNeutralBackground3Hover: grey[92],
    colorNeutralBackground3Pressed: grey[84],
    colorNeutralBackground3Selected: grey[88],
    colorNeutralBackground4: grey[94],
    colorNeutralBackground4Hover: grey[98],
    colorNeutralBackground4Pressed: grey[96],
    colorNeutralBackground4Selected: white,
    colorNeutralBackground5: grey[92],
    colorNeutralBackground5Hover: grey[96],
    colorNeutralBackground5Pressed: grey[94],
    colorNeutralBackground5Selected: grey[98],
    colorNeutralBackground6: grey[90],
    colorNeutralBackground7: "#00000000",
    colorNeutralBackground7Hover: grey[92],
    colorNeutralBackground7Pressed: grey[84],
    colorNeutralBackground7Selected: "#00000000",
    colorNeutralBackground8: grey[99],
    colorNeutralBackgroundInverted: grey[16],
    colorNeutralBackgroundInvertedHover: grey[24],
    colorNeutralBackgroundInvertedPressed: grey[12],
    colorNeutralBackgroundInvertedSelected: grey[22],
    colorNeutralBackgroundStatic: grey[20],
    colorNeutralBackgroundAlpha: whiteAlpha[50],
    colorNeutralBackgroundAlpha2: whiteAlpha[80],
    colorSubtleBackground: "transparent",
    colorSubtleBackgroundHover: grey[96],
    colorSubtleBackgroundPressed: grey[88],
    colorSubtleBackgroundSelected: grey[92],
    colorSubtleBackgroundLightAlphaHover: whiteAlpha[70],
    colorSubtleBackgroundLightAlphaPressed: whiteAlpha[50],
    colorSubtleBackgroundLightAlphaSelected: "transparent",
    colorSubtleBackgroundInverted: "transparent",
    colorSubtleBackgroundInvertedHover: blackAlpha[10],
    colorSubtleBackgroundInvertedPressed: blackAlpha[30],
    colorSubtleBackgroundInvertedSelected: blackAlpha[20],
    colorTransparentBackground: "transparent",
    colorTransparentBackgroundHover: "transparent",
    colorTransparentBackgroundPressed: "transparent",
    colorTransparentBackgroundSelected: "transparent",
    colorNeutralBackgroundDisabled: grey[94],
    colorNeutralBackgroundDisabled2: white,
    colorNeutralBackgroundInvertedDisabled: whiteAlpha[10],
    colorNeutralStencil1: grey[90],
    colorNeutralStencil2: grey[98],
    colorNeutralStencil1Alpha: blackAlpha[10],
    colorNeutralStencil2Alpha: blackAlpha[5],
    colorBackgroundOverlay: blackAlpha[40],
    colorScrollbarOverlay: blackAlpha[50],
    colorBrandBackground: brand[80],
    colorBrandBackgroundHover: brand[70],
    colorBrandBackgroundPressed: brand[40],
    colorBrandBackgroundSelected: brand[60],
    colorCompoundBrandBackground: brand[80],
    colorCompoundBrandBackgroundHover: brand[70],
    colorCompoundBrandBackgroundPressed: brand[60],
    colorBrandBackgroundStatic: brand[80],
    colorBrandBackground2: brand[160],
    colorBrandBackground2Hover: brand[150],
    colorBrandBackground2Pressed: brand[130],
    colorBrandBackground3Static: brand[60],
    colorBrandBackground4Static: brand[40],
    colorBrandBackgroundInverted: white,
    colorBrandBackgroundInvertedHover: brand[160],
    colorBrandBackgroundInvertedPressed: brand[140],
    colorBrandBackgroundInvertedSelected: brand[150],
    colorNeutralCardBackground: grey[98],
    colorNeutralCardBackgroundHover: white,
    colorNeutralCardBackgroundPressed: grey[96],
    colorNeutralCardBackgroundSelected: grey[92],
    colorNeutralCardBackgroundDisabled: grey[94],
    colorNeutralStrokeAccessible: grey[38],
    colorNeutralStrokeAccessibleHover: grey[34],
    colorNeutralStrokeAccessiblePressed: grey[30],
    colorNeutralStrokeAccessibleSelected: brand[80],
    colorNeutralStroke1: grey[82],
    colorNeutralStroke1Hover: grey[78],
    colorNeutralStroke1Pressed: grey[70],
    colorNeutralStroke1Selected: grey[74],
    colorNeutralStroke2: grey[88],
    colorNeutralStroke3: grey[94],
    colorNeutralStroke4: grey[92],
    colorNeutralStroke4Hover: grey[88],
    colorNeutralStroke4Pressed: grey[84],
    colorNeutralStroke4Selected: grey[92],
    colorNeutralStrokeSubtle: grey[88],
    colorNeutralStrokeOnBrand: white,
    colorNeutralStrokeOnBrand2: white,
    colorNeutralStrokeOnBrand2Hover: white,
    colorNeutralStrokeOnBrand2Pressed: white,
    colorNeutralStrokeOnBrand2Selected: white,
    colorBrandStroke1: brand[80],
    colorBrandStroke2: brand[140],
    colorBrandStroke2Hover: brand[120],
    colorBrandStroke2Pressed: brand[80],
    colorBrandStroke2Contrast: brand[140],
    colorCompoundBrandStroke: brand[80],
    colorCompoundBrandStrokeHover: brand[70],
    colorCompoundBrandStrokePressed: brand[60],
    colorNeutralStrokeDisabled: grey[88],
    colorNeutralStrokeDisabled2: grey[92],
    colorNeutralStrokeInvertedDisabled: whiteAlpha[40],
    colorTransparentStroke: "transparent",
    colorTransparentStrokeInteractive: "transparent",
    colorTransparentStrokeDisabled: "transparent",
    colorNeutralStrokeAlpha: blackAlpha[5],
    colorNeutralStrokeAlpha2: whiteAlpha[20],
    colorStrokeFocus1: white,
    colorStrokeFocus2: black,
    colorNeutralShadowAmbient: "rgba(0,0,0,0.12)",
    colorNeutralShadowKey: "rgba(0,0,0,0.14)",
    colorNeutralShadowAmbientLighter: "rgba(0,0,0,0.06)",
    colorNeutralShadowKeyLighter: "rgba(0,0,0,0.07)",
    colorNeutralShadowAmbientDarker: "rgba(0,0,0,0.20)",
    colorNeutralShadowKeyDarker: "rgba(0,0,0,0.24)",
    colorBrandShadowAmbient: "rgba(0,0,0,0.30)",
    colorBrandShadowKey: "rgba(0,0,0,0.25)"
  });
  const borderRadius = {
    borderRadiusNone: "0",
    borderRadiusSmall: "2px",
    borderRadiusMedium: "4px",
    borderRadiusLarge: "6px",
    borderRadiusXLarge: "8px",
    borderRadius2XLarge: "12px",
    borderRadius3XLarge: "16px",
    borderRadius4XLarge: "24px",
    borderRadius5XLarge: "32px",
    borderRadius6XLarge: "40px",
    borderRadiusCircular: "10000px"
  };
  const curves = {
    curveAccelerateMax: "cubic-bezier(0.9,0.1,1,0.2)",
    curveAccelerateMid: "cubic-bezier(1,0,1,1)",
    curveAccelerateMin: "cubic-bezier(0.8,0,0.78,1)",
    curveDecelerateMax: "cubic-bezier(0.1,0.9,0.2,1)",
    curveDecelerateMid: "cubic-bezier(0,0,0,1)",
    curveDecelerateMin: "cubic-bezier(0.33,0,0.1,1)",
    curveEasyEaseMax: "cubic-bezier(0.8,0,0.2,1)",
    curveEasyEase: "cubic-bezier(0.33,0,0.67,1)",
    curveLinear: "cubic-bezier(0,0,1,1)"
  };
  const durations = {
    durationUltraFast: "50ms",
    durationFaster: "100ms",
    durationFast: "150ms",
    durationNormal: "200ms",
    durationGentle: "250ms",
    durationSlow: "300ms",
    durationSlower: "400ms",
    durationUltraSlow: "500ms"
  };
  const fontSizes = {
    fontSizeBase100: "10px",
    fontSizeBase200: "12px",
    fontSizeBase300: "14px",
    fontSizeBase400: "16px",
    fontSizeBase500: "20px",
    fontSizeBase600: "24px",
    fontSizeHero700: "28px",
    fontSizeHero800: "32px",
    fontSizeHero900: "40px",
    fontSizeHero1000: "68px"
  };
  const lineHeights = {
    lineHeightBase100: "14px",
    lineHeightBase200: "16px",
    lineHeightBase300: "20px",
    lineHeightBase400: "22px",
    lineHeightBase500: "28px",
    lineHeightBase600: "32px",
    lineHeightHero700: "36px",
    lineHeightHero800: "40px",
    lineHeightHero900: "52px",
    lineHeightHero1000: "92px"
  };
  const fontWeights = {
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemibold: 600,
    fontWeightBold: 700
  };
  const fontFamilies = {
    fontFamilyBase: "'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif",
    fontFamilyMonospace: "Consolas, 'Courier New', Courier, monospace",
    fontFamilyNumeric: "Bahnschrift, 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif"
  };
  const spacings = {
    none: "0",
    xxs: "2px",
    xs: "4px",
    sNudge: "6px",
    s: "8px",
    mNudge: "10px",
    m: "12px",
    l: "16px",
    xl: "20px",
    xxl: "24px",
    xxxl: "32px"
  };
  const horizontalSpacings = {
    spacingHorizontalNone: spacings.none,
    spacingHorizontalXXS: spacings.xxs,
    spacingHorizontalXS: spacings.xs,
    spacingHorizontalSNudge: spacings.sNudge,
    spacingHorizontalS: spacings.s,
    spacingHorizontalMNudge: spacings.mNudge,
    spacingHorizontalM: spacings.m,
    spacingHorizontalL: spacings.l,
    spacingHorizontalXL: spacings.xl,
    spacingHorizontalXXL: spacings.xxl,
    spacingHorizontalXXXL: spacings.xxxl
  };
  const verticalSpacings = {
    spacingVerticalNone: spacings.none,
    spacingVerticalXXS: spacings.xxs,
    spacingVerticalXS: spacings.xs,
    spacingVerticalSNudge: spacings.sNudge,
    spacingVerticalS: spacings.s,
    spacingVerticalMNudge: spacings.mNudge,
    spacingVerticalM: spacings.m,
    spacingVerticalL: spacings.l,
    spacingVerticalXL: spacings.xl,
    spacingVerticalXXL: spacings.xxl,
    spacingVerticalXXXL: spacings.xxxl
  };
  const strokeWidths = {
    strokeWidthThin: "1px",
    strokeWidthThick: "2px",
    strokeWidthThicker: "3px",
    strokeWidthThickest: "4px"
  };
  function createShadowTokens(ambientColor, keyColor, tokenSuffix = "") {
    return {
      [`shadow2${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 1px 2px ${keyColor}`,
      [`shadow4${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 2px 4px ${keyColor}`,
      [`shadow8${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 4px 8px ${keyColor}`,
      [`shadow16${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 8px 16px ${keyColor}`,
      [`shadow28${tokenSuffix}`]: `0 0 8px ${ambientColor}, 0 14px 28px ${keyColor}`,
      [`shadow64${tokenSuffix}`]: `0 0 8px ${ambientColor}, 0 32px 64px ${keyColor}`
    };
  }
  const createLightTheme = (brand) => {
    const colorTokens = generateColorTokens(brand);
    return {
      ...borderRadius,
      ...fontSizes,
      ...lineHeights,
      ...fontFamilies,
      ...fontWeights,
      ...strokeWidths,
      ...horizontalSpacings,
      ...verticalSpacings,
      ...durations,
      ...curves,
      ...colorTokens,
      ...colorPaletteTokens,
      ...colorStatusTokens,
      ...createShadowTokens(colorTokens.colorNeutralShadowAmbient, colorTokens.colorNeutralShadowKey),
      ...createShadowTokens(colorTokens.colorBrandShadowAmbient, colorTokens.colorBrandShadowKey, "Brand")
    };
  };
  const brandWeb = {
    30: `#0a2e4a`,
    40: `#0c3b5e`,
    50: `#0e4775`,
    60: `#0f548c`,
    70: `#115ea3`,
    80: `#0f6cbd`,
    100: `#479ef5`,
    110: `#62abf5`,
    120: `#77b7f7`,
    130: `#96c6fa`,
    140: `#b4d6fa`,
    150: `#cfe4fa`,
    160: `#ebf3fc`
  };
  const webLightTheme = createLightTheme(brandWeb);
  const fluentProviderClassNames = {
    root: "fui-FluentProvider"
  };
  const useStyles$2 = /* @__PURE__ */ __styles$1({
    root: {
      sj55zd: "f19n0e5",
      De3pzq: "fxugw4r",
      fsow6f: ["f1o700av", "fes3tcz"],
      Bahqtrf: "fk6fouc",
      Be2twd7: "fkhj508",
      Bhrd7zp: "figsok6",
      Bg96gwp: "f1i3iumi"
    }
  }, {
    d: [".f19n0e5{color:var(--colorNeutralForeground1);}", ".fxugw4r{background-color:var(--colorNeutralBackground1);}", ".f1o700av{text-align:left;}", ".fes3tcz{text-align:right;}", ".fk6fouc{font-family:var(--fontFamilyBase);}", ".fkhj508{font-size:var(--fontSizeBase300);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".f1i3iumi{line-height:var(--lineHeightBase300);}"]
  });
  const useFluentProviderStyles_unstable = (state) => {
    "use no memo";
    const renderer = useRenderer();
    const styles = useStyles$2({
      dir: state.dir,
      renderer
    });
    state.root.className = mergeClasses(fluentProviderClassNames.root, state.themeClassName, styles.root, state.root.className);
    return state;
  };
  const useInsertionEffect = reactExports.useInsertionEffect ? reactExports.useInsertionEffect : useIsomorphicLayoutEffect;
  const createStyleTag = (target, elementAttributes) => {
    if (!(target === null || target === void 0 ? void 0 : target.head)) {
      return void 0;
    }
    const tag = target.createElement("style");
    Object.keys(elementAttributes).forEach((attrName) => {
      tag.setAttribute(attrName, elementAttributes[attrName]);
    });
    target.head.appendChild(tag);
    return tag;
  };
  const insertSheet = (tag, rule) => {
    const sheet = tag.sheet;
    if (sheet) {
      if (sheet.cssRules.length > 0) {
        sheet.deleteRule(0);
      }
      sheet.insertRule(rule, 0);
    }
  };
  const useFluentProviderThemeStyleTag = (options) => {
    "use no memo";
    const { targetDocument, theme, rendererAttributes } = options;
    const styleTag = reactExports.useRef(void 0);
    const styleTagId = useId(fluentProviderClassNames.root);
    const styleElementAttributes = rendererAttributes;
    const rule = reactExports.useMemo(() => createCSSRuleFromTheme(`.${styleTagId}`, theme), [
      theme,
      styleTagId
    ]);
    useHandleSSRStyleElements(targetDocument, styleTagId);
    useInsertionEffect(() => {
      const ssrStyleElement = targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.getElementById(styleTagId);
      if (ssrStyleElement) {
        styleTag.current = ssrStyleElement;
      } else {
        styleTag.current = createStyleTag(targetDocument, {
          ...styleElementAttributes,
          id: styleTagId
        });
        if (styleTag.current) {
          insertSheet(styleTag.current, rule);
        }
      }
      return () => {
        var _styleTag_current;
        (_styleTag_current = styleTag.current) === null || _styleTag_current === void 0 ? void 0 : _styleTag_current.remove();
      };
    }, [
      styleTagId,
      targetDocument,
      rule,
      styleElementAttributes
    ]);
    return {
      styleTagId,
      rule
    };
  };
  function useHandleSSRStyleElements(targetDocument, styleTagId) {
    reactExports.useState(() => {
      if (!targetDocument) {
        return;
      }
      const themeStyleElement = targetDocument.getElementById(styleTagId);
      if (themeStyleElement) {
        targetDocument.head.append(themeStyleElement);
      }
    });
  }
  const DEFAULT_STYLE_HOOKS = {};
  const DEFAULT_RENDERER_ATTRIBUTES = {};
  const useFluentProvider_unstable = (props, ref) => {
    "use no memo";
    const parentContext = useFluent();
    const parentTheme = useTheme();
    const parentOverrides = useOverrides();
    const parentCustomStyleHooks = reactExports.useContext(CustomStyleHooksContext) || DEFAULT_STYLE_HOOKS;
    const {
      applyStylesToPortals = true,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      customStyleHooks_unstable,
      dir = parentContext.dir,
      targetDocument = parentContext.targetDocument,
      theme,
      overrides_unstable: overrides = {}
    } = props;
    const mergedTheme = shallowMerge(parentTheme, theme);
    const mergedOverrides = shallowMerge(parentOverrides, overrides);
    const mergedCustomStyleHooks = shallowMerge(parentCustomStyleHooks, customStyleHooks_unstable);
    const renderer = useRenderer();
    var _renderer_styleElementAttributes;
    const { styleTagId, rule } = useFluentProviderThemeStyleTag({
      theme: mergedTheme,
      targetDocument,
      rendererAttributes: (_renderer_styleElementAttributes = renderer.styleElementAttributes) !== null && _renderer_styleElementAttributes !== void 0 ? _renderer_styleElementAttributes : DEFAULT_RENDERER_ATTRIBUTES
    });
    return {
      applyStylesToPortals,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      customStyleHooks_unstable: mergedCustomStyleHooks,
      dir,
      targetDocument,
      theme: mergedTheme,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      overrides_unstable: mergedOverrides,
      themeClassName: styleTagId,
      components: {
        root: "div"
      },
      root: always(getIntrinsicElementProps("div", {
        ...props,
        dir,
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs(ref, useFocusVisible({
          targetDocument
        }))
      }), {
        elementType: "div"
      }),
      serverStyleProps: {
        cssRule: rule,
        attributes: {
          ...renderer.styleElementAttributes,
          id: styleTagId
        }
      }
    };
  };
  function shallowMerge(a, b) {
    if (a && b) {
      return {
        ...a,
        ...b
      };
    }
    if (a) {
      return a;
    }
    return b;
  }
  function useTheme() {
    return reactExports.useContext(ThemeContext);
  }
  function useFluentProviderContextValues_unstable(state) {
    const {
      applyStylesToPortals,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      customStyleHooks_unstable,
      dir,
      root,
      targetDocument,
      theme,
      themeClassName,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      overrides_unstable
    } = state;
    const provider = reactExports.useMemo(() => ({
      dir,
      targetDocument
    }), [
      dir,
      targetDocument
    ]);
    const [tooltip] = reactExports.useState(() => ({}));
    const iconDirection = reactExports.useMemo(() => ({
      textDirection: dir
    }), [
      dir
    ]);
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      customStyleHooks_unstable,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      overrides_unstable,
      provider,
      textDirection: dir,
      iconDirection,
      tooltip,
      theme,
      themeClassName: applyStylesToPortals ? root.className : themeClassName
    };
  }
  const FluentProvider = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
    const state = useFluentProvider_unstable(props, ref);
    useFluentProviderStyles_unstable(state);
    const contextValues = useFluentProviderContextValues_unstable(state);
    return renderFluentProvider_unstable(state, contextValues);
  });
  FluentProvider.displayName = "FluentProvider";
  const Enter = "Enter";
  const Space = " ";
  function useARIAButtonProps(type, props) {
    const { disabled, disabledFocusable = false, ["aria-disabled"]: ariaDisabled, onClick, onKeyDown, onKeyUp, ...rest } = props !== null && props !== void 0 ? props : {};
    const normalizedARIADisabled = typeof ariaDisabled === "string" ? ariaDisabled === "true" : ariaDisabled;
    const isDisabled = disabled || disabledFocusable || normalizedARIADisabled;
    const handleClick = useEventCallback((ev) => {
      if (isDisabled) {
        ev.preventDefault();
        ev.stopPropagation();
      } else {
        onClick === null || onClick === void 0 ? void 0 : onClick(ev);
      }
    });
    const handleKeyDown = useEventCallback((ev) => {
      onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(ev);
      if (ev.isDefaultPrevented()) {
        return;
      }
      const key = ev.key;
      if (isDisabled && (key === Enter || key === Space)) {
        ev.preventDefault();
        ev.stopPropagation();
        return;
      }
      if (key === Space) {
        ev.preventDefault();
        return;
      } else if (key === Enter) {
        ev.preventDefault();
        ev.currentTarget.click();
      }
    });
    const handleKeyUp = useEventCallback((ev) => {
      onKeyUp === null || onKeyUp === void 0 ? void 0 : onKeyUp(ev);
      if (ev.isDefaultPrevented()) {
        return;
      }
      const key = ev.key;
      if (isDisabled && (key === Enter || key === Space)) {
        ev.preventDefault();
        ev.stopPropagation();
        return;
      }
      if (key === Space) {
        ev.preventDefault();
        ev.currentTarget.click();
      }
    });
    if (type === "button" || type === void 0) {
      return {
        ...rest,
        disabled: disabled && !disabledFocusable,
        "aria-disabled": disabledFocusable ? true : normalizedARIADisabled,
        // onclick should still use internal handler to ensure prevention if disabled
        // if disabledFocusable then there's no requirement for handlers as those events should not be propagated
        onClick: disabledFocusable ? void 0 : handleClick,
        onKeyUp: disabledFocusable ? void 0 : onKeyUp,
        onKeyDown: disabledFocusable ? void 0 : onKeyDown
      };
    } else {
      const isLink = !!rest.href;
      let roleOverride = isLink ? void 0 : "button";
      if (!roleOverride && isDisabled) {
        roleOverride = "link";
      }
      const resultProps = {
        role: roleOverride,
        tabIndex: disabledFocusable || !isLink && !disabled ? 0 : void 0,
        ...rest,
        // If it's not a <button> than listeners are required even with disabledFocusable
        // Since you cannot assure the default behavior of the element
        // E.g: <a> will redirect on click
        onClick: handleClick,
        onKeyUp: handleKeyUp,
        onKeyDown: handleKeyDown,
        "aria-disabled": isDisabled
      };
      if (type === "a" && isDisabled) {
        resultProps.href = void 0;
      }
      return resultProps;
    }
  }
  const renderButton_unstable = (state) => {
    const { iconOnly, iconPosition } = state;
    return /* @__PURE__ */ jsxs(state.root, {
      children: [
        iconPosition !== "after" && state.icon && /* @__PURE__ */ jsx(state.icon, {}),
        !iconOnly && state.root.children,
        iconPosition === "after" && state.icon && /* @__PURE__ */ jsx(state.icon, {})
      ]
    });
  };
  const buttonContext = reactExports.createContext(void 0);
  const buttonContextDefaultValue = {};
  buttonContext.Provider;
  const useButtonContext = () => {
    var _React_useContext;
    return (_React_useContext = reactExports.useContext(buttonContext)) !== null && _React_useContext !== void 0 ? _React_useContext : buttonContextDefaultValue;
  };
  const useButton_unstable = (props, ref) => {
    const { size: contextSize } = useButtonContext();
    const { appearance = "secondary", shape = "rounded", size = contextSize !== null && contextSize !== void 0 ? contextSize : "medium", ...buttonProps } = props;
    const state = useButtonBase_unstable(buttonProps, ref);
    return {
      appearance,
      shape,
      size,
      ...state
    };
  };
  const useButtonBase_unstable = (props, ref) => {
    const { icon, iconPosition = "before", ...buttonProps } = props;
    const iconShorthand = optional(icon, {
      elementType: "span"
    });
    var _props_disabled, _props_disabledFocusable;
    return {
      disabled: (_props_disabled = props.disabled) !== null && _props_disabled !== void 0 ? _props_disabled : false,
      disabledFocusable: (_props_disabledFocusable = props.disabledFocusable) !== null && _props_disabledFocusable !== void 0 ? _props_disabledFocusable : false,
      iconPosition,
      iconOnly: Boolean((iconShorthand === null || iconShorthand === void 0 ? void 0 : iconShorthand.children) && !props.children),
      components: {
        root: "button",
        icon: "span"
      },
      root: always(useARIAButtonProps(buttonProps.as, buttonProps), {
        elementType: "button",
        defaultProps: {
          ref,
          type: props.as !== "a" ? "button" : void 0
        }
      }),
      icon: iconShorthand
    };
  };
  const buttonClassNames = {
    root: "fui-Button",
    icon: "fui-Button__icon"
  };
  const useRootBaseClassName$1 = /* @__PURE__ */ __resetStyles("r1f29ykk", null, {
    r: [".r1f29ykk{align-items:center;box-sizing:border-box;display:inline-flex;justify-content:center;text-decoration-line:none;vertical-align:middle;margin:0;overflow:hidden;background-color:var(--colorNeutralBackground1);color:var(--colorNeutralForeground1);border:var(--strokeWidthThin) solid var(--colorNeutralStroke1);font-family:var(--fontFamilyBase);outline-style:none;padding:5px var(--spacingHorizontalM);min-width:96px;border-radius:var(--borderRadiusMedium);font-size:var(--fontSizeBase300);font-weight:var(--fontWeightSemibold);line-height:var(--lineHeightBase300);transition-duration:var(--durationFaster);transition-property:background,border,color;transition-timing-function:var(--curveEasyEase);}", ".r1f29ykk:hover{background-color:var(--colorNeutralBackground1Hover);border-color:var(--colorNeutralStroke1Hover);color:var(--colorNeutralForeground1Hover);cursor:pointer;}", ".r1f29ykk:hover:active,.r1f29ykk:active:focus-visible{background-color:var(--colorNeutralBackground1Pressed);border-color:var(--colorNeutralStroke1Pressed);color:var(--colorNeutralForeground1Pressed);outline-style:none;}", ".r1f29ykk[data-fui-focus-visible]{border-color:var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);border-width:1px;outline:var(--strokeWidthThick) solid var(--colorTransparentStroke);box-shadow:0 0 0 var(--strokeWidthThin) var(--colorStrokeFocus2) inset;z-index:1;}"],
    s: ["@media screen and (prefers-reduced-motion: reduce){.r1f29ykk{transition-duration:0.01ms;}}", "@media (forced-colors: active){.r1f29ykk:focus{border-color:ButtonText;}.r1f29ykk:hover{background-color:HighlightText;border-color:Highlight;color:Highlight;forced-color-adjust:none;}.r1f29ykk:hover:active,.r1f29ykk:active:focus-visible{background-color:HighlightText;border-color:Highlight;color:Highlight;forced-color-adjust:none;}}", "@supports (-moz-appearance:button){.r1f29ykk[data-fui-focus-visible]{box-shadow:0 0 0 calc(var(--strokeWidthThin) + 0.25px) var(--colorStrokeFocus2) inset;}}"]
  });
  const useIconBaseClassName = /* @__PURE__ */ __resetStyles("rywnvv2", null, [".rywnvv2{align-items:center;display:inline-flex;justify-content:center;font-size:20px;height:20px;width:20px;--fui-Button__icon--spacing:var(--spacingHorizontalSNudge);}"]);
  const useRootStyles$2 = /* @__PURE__ */ __styles({
    outline: {
      De3pzq: "f1c21dwh",
      Jwef8y: "fjxutwb",
      Bpjbzib: "fkoldzo"
    },
    primary: {
      De3pzq: "ffp7eso",
      g2u3we: "f1p3nwhy",
      h3c5rm: ["f11589ue", "f1pdflbu"],
      B9xav0g: "f1q5o8ev",
      zhjwy3: ["f1pdflbu", "f11589ue"],
      sj55zd: "f1phragk",
      Jwef8y: "f15wkkf3",
      Bgoe8wy: "f1s2uweq",
      Bwzppfd: ["fr80ssc", "fecsdlb"],
      oetu4i: "f1ukrpxl",
      gg5e9n: ["fecsdlb", "fr80ssc"],
      Bi91k9c: "f1rq72xc",
      Bpjbzib: "f1ksv2xa",
      im15vp: "fhvnf4x",
      Hjvxdg: ["fb6swo4", "f232fm2"],
      Gpfmf1: "f1klyf7k",
      ustxxc: ["f232fm2", "fb6swo4"],
      Brsut9c: "f1d6mv4x",
      By8wz76: "f1nz3ub2",
      Bcq6wej: "fag2qd2",
      Jcjdmf: ["fmvhcg7", "f14bpyus"],
      sc4o1m: "f1o3dhpw",
      Bosien3: ["f14bpyus", "fmvhcg7"],
      B7iucu3: "fqc85l4",
      B8gzw0y: "f1h3a8gf",
      Bbkh6qg: "fkiggi6",
      F230oe: "f8gmj8i",
      Bdw8ktp: ["f1ap8nzx", "fjag8bx"],
      Bj1xduy: "f1igan7k",
      Bhh2cfd: ["fjag8bx", "f1ap8nzx"],
      Bahaeuw: "f1v3eptx",
      Bv2bamp: "f1ysmecq",
      vxuvv6: "faulsx",
      Bli9q98: ["f79t15f", "f8qmx7k"],
      Bx2tt8t: "fbtzoaq",
      yad0b3: ["f8qmx7k", "f79t15f"],
      j2fop7: "fd4bjan"
    },
    secondary: {},
    subtle: {
      De3pzq: "fhovq9v",
      g2u3we: "f1p3nwhy",
      h3c5rm: ["f11589ue", "f1pdflbu"],
      B9xav0g: "f1q5o8ev",
      zhjwy3: ["f1pdflbu", "f11589ue"],
      sj55zd: "fkfq4zb",
      Jwef8y: "f1t94bn6",
      Bgoe8wy: "f1s2uweq",
      Bwzppfd: ["fr80ssc", "fecsdlb"],
      oetu4i: "f1ukrpxl",
      gg5e9n: ["fecsdlb", "fr80ssc"],
      Bi91k9c: "fnwyq0v",
      Bk3fhr4: "ft1hn21",
      Bmfj8id: "fuxngvv",
      Bbdnnc7: "fy5bs14",
      Bpjbzib: "f1q1yqic",
      im15vp: "fhvnf4x",
      Hjvxdg: ["fb6swo4", "f232fm2"],
      Gpfmf1: "f1klyf7k",
      ustxxc: ["f232fm2", "fb6swo4"],
      Brsut9c: "fwga7ee",
      Bqou3pl: "f1nhwcv0",
      Bsnehw8: "f1gm6xmp",
      wsxvnf: "f1xxsver",
      Bahaeuw: "f1v3eptx",
      Buhizc3: "fivsta0",
      j2fop7: "fd4bjan",
      Bqabnb4: "f3m6zum"
    },
    transparent: {
      De3pzq: "f1c21dwh",
      g2u3we: "f1p3nwhy",
      h3c5rm: ["f11589ue", "f1pdflbu"],
      B9xav0g: "f1q5o8ev",
      zhjwy3: ["f1pdflbu", "f11589ue"],
      sj55zd: "fkfq4zb",
      Jwef8y: "fjxutwb",
      Bgoe8wy: "f1s2uweq",
      Bwzppfd: ["fr80ssc", "fecsdlb"],
      oetu4i: "f1ukrpxl",
      gg5e9n: ["fecsdlb", "fr80ssc"],
      Bi91k9c: "f139oj5f",
      Bk3fhr4: "ft1hn21",
      Bmfj8id: "fuxngvv",
      Bpjbzib: "fkoldzo",
      im15vp: "fhvnf4x",
      Hjvxdg: ["fb6swo4", "f232fm2"],
      Gpfmf1: "f1klyf7k",
      ustxxc: ["f232fm2", "fb6swo4"],
      Brsut9c: "f1l983o9",
      Bqou3pl: "f1nhwcv0",
      Bsnehw8: "f1gm6xmp",
      Bbkh6qg: "fxoo9op",
      Bahaeuw: "f1v3eptx",
      Bv2bamp: "f1i0gk12",
      j2fop7: "fd4bjan"
    },
    circular: {
      Beyfa6y: 0,
      Bbmb7ep: 0,
      Btl43ni: 0,
      B7oj6ja: 0,
      Dimara: "f44lkw9"
    },
    rounded: {},
    square: {
      Beyfa6y: 0,
      Bbmb7ep: 0,
      Btl43ni: 0,
      B7oj6ja: 0,
      Dimara: "f1fabniw"
    },
    small: {
      Bf4jedk: "fh7ncta",
      Byoj8tv: 0,
      uwmqm3: 0,
      z189sj: 0,
      z8tnut: 0,
      B0ocmuz: "fneth5b",
      Beyfa6y: 0,
      Bbmb7ep: 0,
      Btl43ni: 0,
      B7oj6ja: 0,
      Dimara: "ft85np5",
      Be2twd7: "fy9rknc",
      Bhrd7zp: "figsok6",
      Bg96gwp: "fwrc4pm"
    },
    smallWithIcon: {
      Byoj8tv: "f1brlhvm",
      z8tnut: "f1sl3k7w"
    },
    medium: {},
    large: {
      Bf4jedk: "f14es27b",
      Byoj8tv: 0,
      uwmqm3: 0,
      z189sj: 0,
      z8tnut: 0,
      B0ocmuz: "f4db1ww",
      Beyfa6y: 0,
      Bbmb7ep: 0,
      Btl43ni: 0,
      B7oj6ja: 0,
      Dimara: "ft85np5",
      Be2twd7: "fod5ikn",
      Bhrd7zp: "fl43uef",
      Bg96gwp: "faaz57k"
    },
    largeWithIcon: {
      Byoj8tv: "fy7v416",
      z8tnut: "f1a1bwwz"
    }
  }, {
    d: [".f1c21dwh{background-color:var(--colorTransparentBackground);}", ".ffp7eso{background-color:var(--colorBrandBackground);}", ".f1p3nwhy{border-top-color:transparent;}", ".f11589ue{border-right-color:transparent;}", ".f1pdflbu{border-left-color:transparent;}", ".f1q5o8ev{border-bottom-color:transparent;}", ".f1phragk{color:var(--colorNeutralForegroundOnBrand);}", ".fhovq9v{background-color:var(--colorSubtleBackground);}", ".fkfq4zb{color:var(--colorNeutralForeground2);}", [".f44lkw9{border-radius:var(--borderRadiusCircular);}", {
      p: -1
    }], [".f1fabniw{border-radius:var(--borderRadiusNone);}", {
      p: -1
    }], ".fh7ncta{min-width:64px;}", [".fneth5b{padding:3px var(--spacingHorizontalS);}", {
      p: -1
    }], [".ft85np5{border-radius:var(--borderRadiusMedium);}", {
      p: -1
    }], ".fy9rknc{font-size:var(--fontSizeBase200);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".fwrc4pm{line-height:var(--lineHeightBase200);}", ".f1brlhvm{padding-bottom:1px;}", ".f1sl3k7w{padding-top:1px;}", ".f14es27b{min-width:96px;}", [".f4db1ww{padding:8px var(--spacingHorizontalL);}", {
      p: -1
    }], [".ft85np5{border-radius:var(--borderRadiusMedium);}", {
      p: -1
    }], ".fod5ikn{font-size:var(--fontSizeBase400);}", ".fl43uef{font-weight:var(--fontWeightSemibold);}", ".faaz57k{line-height:var(--lineHeightBase400);}", ".fy7v416{padding-bottom:7px;}", ".f1a1bwwz{padding-top:7px;}"],
    h: [".fjxutwb:hover{background-color:var(--colorTransparentBackgroundHover);}", ".fkoldzo:hover:active,.fkoldzo:active:focus-visible{background-color:var(--colorTransparentBackgroundPressed);}", ".f15wkkf3:hover{background-color:var(--colorBrandBackgroundHover);}", ".f1s2uweq:hover{border-top-color:transparent;}", ".fr80ssc:hover{border-right-color:transparent;}", ".fecsdlb:hover{border-left-color:transparent;}", ".f1ukrpxl:hover{border-bottom-color:transparent;}", ".f1rq72xc:hover{color:var(--colorNeutralForegroundOnBrand);}", ".f1ksv2xa:hover:active,.f1ksv2xa:active:focus-visible{background-color:var(--colorBrandBackgroundPressed);}", ".fhvnf4x:hover:active,.fhvnf4x:active:focus-visible{border-top-color:transparent;}", ".fb6swo4:hover:active,.fb6swo4:active:focus-visible{border-right-color:transparent;}", ".f232fm2:hover:active,.f232fm2:active:focus-visible{border-left-color:transparent;}", ".f1klyf7k:hover:active,.f1klyf7k:active:focus-visible{border-bottom-color:transparent;}", ".f1d6mv4x:hover:active,.f1d6mv4x:active:focus-visible{color:var(--colorNeutralForegroundOnBrand);}", ".f1t94bn6:hover{background-color:var(--colorSubtleBackgroundHover);}", ".fnwyq0v:hover{color:var(--colorNeutralForeground2Hover);}", ".ft1hn21:hover .fui-Icon-filled{display:inline;}", ".fuxngvv:hover .fui-Icon-regular{display:none;}", ".fy5bs14:hover .fui-Button__icon{color:var(--colorNeutralForeground2BrandHover);}", ".f1q1yqic:hover:active,.f1q1yqic:active:focus-visible{background-color:var(--colorSubtleBackgroundPressed);}", ".fwga7ee:hover:active,.fwga7ee:active:focus-visible{color:var(--colorNeutralForeground2Pressed);}", ".f1nhwcv0:hover:active .fui-Icon-filled,.f1nhwcv0:active:focus-visible .fui-Icon-filled{display:inline;}", ".f1gm6xmp:hover:active .fui-Icon-regular,.f1gm6xmp:active:focus-visible .fui-Icon-regular{display:none;}", ".f1xxsver:hover:active .fui-Button__icon,.f1xxsver:active:focus-visible .fui-Button__icon{color:var(--colorNeutralForeground2BrandPressed);}", ".f139oj5f:hover{color:var(--colorNeutralForeground2BrandHover);}", ".f1l983o9:hover:active,.f1l983o9:active:focus-visible{color:var(--colorNeutralForeground2BrandPressed);}"],
    m: [["@media (forced-colors: active){.f1nz3ub2{background-color:Highlight;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.fag2qd2{border-top-color:HighlightText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f14bpyus{border-left-color:HighlightText;}.fmvhcg7{border-right-color:HighlightText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f1o3dhpw{border-bottom-color:HighlightText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.fqc85l4{color:HighlightText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f1h3a8gf{forced-color-adjust:none;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.fkiggi6:hover{background-color:HighlightText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f8gmj8i:hover{border-top-color:Highlight;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f1ap8nzx:hover{border-right-color:Highlight;}.fjag8bx:hover{border-left-color:Highlight;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f1igan7k:hover{border-bottom-color:Highlight;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f1v3eptx:hover{color:Highlight;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f1ysmecq:hover:active,.f1ysmecq:active:focus-visible{background-color:HighlightText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.faulsx:hover:active,.faulsx:active:focus-visible{border-top-color:Highlight;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f79t15f:hover:active,.f79t15f:active:focus-visible{border-right-color:Highlight;}.f8qmx7k:hover:active,.f8qmx7k:active:focus-visible{border-left-color:Highlight;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.fbtzoaq:hover:active,.fbtzoaq:active:focus-visible{border-bottom-color:Highlight;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.fd4bjan:hover:active,.fd4bjan:active:focus-visible{color:Highlight;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.fivsta0:hover .fui-Button__icon{color:Highlight;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f3m6zum:hover:active .fui-Button__icon,.f3m6zum:active:focus-visible .fui-Button__icon{color:Highlight;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.fxoo9op:hover{background-color:var(--colorTransparentBackground);}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f1i0gk12:hover:active,.f1i0gk12:active:focus-visible{background-color:var(--colorTransparentBackground);}}", {
      m: "(forced-colors: active)"
    }]]
  });
  const useRootDisabledStyles = /* @__PURE__ */ __styles({
    base: {
      De3pzq: "f1bg9a2p",
      g2u3we: "f1jj8ep1",
      h3c5rm: ["f15xbau", "fy0fskl"],
      B9xav0g: "f4ikngz",
      zhjwy3: ["fy0fskl", "f15xbau"],
      sj55zd: "f1s2aq7o",
      Bceei9c: "fdrzuqr",
      Bfinmwp: "f15x8b5r",
      Jwef8y: "f1falr9n",
      Bgoe8wy: "f12mpcsy",
      Bwzppfd: ["f1gwvigk", "f18rmfxp"],
      oetu4i: "f1jnshp0",
      gg5e9n: ["f18rmfxp", "f1gwvigk"],
      Bi91k9c: "fvgxktp",
      eoavqd: "fphbwmw",
      Bk3fhr4: "f19vpps7",
      Bmfj8id: "fv5swzo",
      Bbdnnc7: "f1al02dq",
      Bpjbzib: "f1jct5ie",
      im15vp: "f13txml0",
      Hjvxdg: ["f1ncddno", "f1axfvow"],
      Gpfmf1: "f1z04ada",
      ustxxc: ["f1axfvow", "f1ncddno"],
      Brsut9c: "f1uhomfy",
      Bses4qk: "fy9mucy",
      Bqou3pl: "f1g9va8i",
      Bsnehw8: "fwgvudy",
      wsxvnf: "fom6jww"
    },
    highContrast: {
      By8wz76: "f14ptb23",
      Bcq6wej: "f9dbb4x",
      Jcjdmf: ["f3qs60o", "f5u9ap2"],
      sc4o1m: "fwd1oij",
      Bosien3: ["f5u9ap2", "f3qs60o"],
      B7iucu3: "f1cyfu5x",
      Grqk0h: "f127ot8j",
      h3ptyc: "f19etb0b",
      Buw724y: ["f4f984j", "fw441p0"],
      Buk7464: "f3d22hf",
      Hwei09: ["fw441p0", "f4f984j"],
      Bbkh6qg: "fj8k9ua",
      F230oe: "fifrq0d",
      Bdw8ktp: ["f196mwp7", "fnekfq"],
      Bj1xduy: "f1l6uprw",
      Bhh2cfd: ["fnekfq", "f196mwp7"],
      Bahaeuw: "fa9u7a5",
      Buhizc3: "f1m71e0y",
      Bv2bamp: "fw24f3",
      vxuvv6: "f1nznrny",
      Bli9q98: ["fq8nxuu", "f1ao3jkc"],
      Bx2tt8t: "ftoixeo",
      yad0b3: ["f1ao3jkc", "fq8nxuu"],
      j2fop7: "fpmuzpx",
      Bqabnb4: "f168odog"
    },
    outline: {
      De3pzq: "f1c21dwh",
      Jwef8y: "f9ql6rf",
      Bpjbzib: "f9r0db0"
    },
    primary: {
      g2u3we: "f1p3nwhy",
      h3c5rm: ["f11589ue", "f1pdflbu"],
      B9xav0g: "f1q5o8ev",
      zhjwy3: ["f1pdflbu", "f11589ue"],
      Bgoe8wy: "f1s2uweq",
      Bwzppfd: ["fr80ssc", "fecsdlb"],
      oetu4i: "f1ukrpxl",
      gg5e9n: ["fecsdlb", "fr80ssc"],
      im15vp: "fhvnf4x",
      Hjvxdg: ["fb6swo4", "f232fm2"],
      Gpfmf1: "f1klyf7k",
      ustxxc: ["f232fm2", "fb6swo4"]
    },
    secondary: {},
    subtle: {
      De3pzq: "f1c21dwh",
      g2u3we: "f1p3nwhy",
      h3c5rm: ["f11589ue", "f1pdflbu"],
      B9xav0g: "f1q5o8ev",
      zhjwy3: ["f1pdflbu", "f11589ue"],
      Jwef8y: "f9ql6rf",
      Bgoe8wy: "f1s2uweq",
      Bwzppfd: ["fr80ssc", "fecsdlb"],
      oetu4i: "f1ukrpxl",
      gg5e9n: ["fecsdlb", "fr80ssc"],
      Bpjbzib: "f9r0db0",
      im15vp: "fhvnf4x",
      Hjvxdg: ["fb6swo4", "f232fm2"],
      Gpfmf1: "f1klyf7k",
      ustxxc: ["f232fm2", "fb6swo4"]
    },
    transparent: {
      De3pzq: "f1c21dwh",
      g2u3we: "f1p3nwhy",
      h3c5rm: ["f11589ue", "f1pdflbu"],
      B9xav0g: "f1q5o8ev",
      zhjwy3: ["f1pdflbu", "f11589ue"],
      Jwef8y: "f9ql6rf",
      Bgoe8wy: "f1s2uweq",
      Bwzppfd: ["fr80ssc", "fecsdlb"],
      oetu4i: "f1ukrpxl",
      gg5e9n: ["fecsdlb", "fr80ssc"],
      Bpjbzib: "f9r0db0",
      im15vp: "fhvnf4x",
      Hjvxdg: ["fb6swo4", "f232fm2"],
      Gpfmf1: "f1klyf7k",
      ustxxc: ["f232fm2", "fb6swo4"]
    }
  }, {
    d: [".f1bg9a2p{background-color:var(--colorNeutralBackgroundDisabled);}", ".f1jj8ep1{border-top-color:var(--colorNeutralStrokeDisabled);}", ".f15xbau{border-right-color:var(--colorNeutralStrokeDisabled);}", ".fy0fskl{border-left-color:var(--colorNeutralStrokeDisabled);}", ".f4ikngz{border-bottom-color:var(--colorNeutralStrokeDisabled);}", ".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}", ".fdrzuqr{cursor:not-allowed;}", ".f15x8b5r .fui-Button__icon{color:var(--colorNeutralForegroundDisabled);}", ".f1c21dwh{background-color:var(--colorTransparentBackground);}", ".f1p3nwhy{border-top-color:transparent;}", ".f11589ue{border-right-color:transparent;}", ".f1pdflbu{border-left-color:transparent;}", ".f1q5o8ev{border-bottom-color:transparent;}"],
    h: [".f1falr9n:hover{background-color:var(--colorNeutralBackgroundDisabled);}", ".f12mpcsy:hover{border-top-color:var(--colorNeutralStrokeDisabled);}", ".f1gwvigk:hover{border-right-color:var(--colorNeutralStrokeDisabled);}", ".f18rmfxp:hover{border-left-color:var(--colorNeutralStrokeDisabled);}", ".f1jnshp0:hover{border-bottom-color:var(--colorNeutralStrokeDisabled);}", ".fvgxktp:hover{color:var(--colorNeutralForegroundDisabled);}", ".fphbwmw:hover{cursor:not-allowed;}", ".f19vpps7:hover .fui-Icon-filled{display:none;}", ".fv5swzo:hover .fui-Icon-regular{display:inline;}", ".f1al02dq:hover .fui-Button__icon{color:var(--colorNeutralForegroundDisabled);}", ".f1jct5ie:hover:active,.f1jct5ie:active:focus-visible{background-color:var(--colorNeutralBackgroundDisabled);}", ".f13txml0:hover:active,.f13txml0:active:focus-visible{border-top-color:var(--colorNeutralStrokeDisabled);}", ".f1ncddno:hover:active,.f1ncddno:active:focus-visible{border-right-color:var(--colorNeutralStrokeDisabled);}", ".f1axfvow:hover:active,.f1axfvow:active:focus-visible{border-left-color:var(--colorNeutralStrokeDisabled);}", ".f1z04ada:hover:active,.f1z04ada:active:focus-visible{border-bottom-color:var(--colorNeutralStrokeDisabled);}", ".f1uhomfy:hover:active,.f1uhomfy:active:focus-visible{color:var(--colorNeutralForegroundDisabled);}", ".fy9mucy:hover:active,.fy9mucy:active:focus-visible{cursor:not-allowed;}", ".f1g9va8i:hover:active .fui-Icon-filled,.f1g9va8i:active:focus-visible .fui-Icon-filled{display:none;}", ".fwgvudy:hover:active .fui-Icon-regular,.fwgvudy:active:focus-visible .fui-Icon-regular{display:inline;}", ".fom6jww:hover:active .fui-Button__icon,.fom6jww:active:focus-visible .fui-Button__icon{color:var(--colorNeutralForegroundDisabled);}", ".f9ql6rf:hover{background-color:var(--colorTransparentBackground);}", ".f9r0db0:hover:active,.f9r0db0:active:focus-visible{background-color:var(--colorTransparentBackground);}", ".f1s2uweq:hover{border-top-color:transparent;}", ".fr80ssc:hover{border-right-color:transparent;}", ".fecsdlb:hover{border-left-color:transparent;}", ".f1ukrpxl:hover{border-bottom-color:transparent;}", ".fhvnf4x:hover:active,.fhvnf4x:active:focus-visible{border-top-color:transparent;}", ".fb6swo4:hover:active,.fb6swo4:active:focus-visible{border-right-color:transparent;}", ".f232fm2:hover:active,.f232fm2:active:focus-visible{border-left-color:transparent;}", ".f1klyf7k:hover:active,.f1klyf7k:active:focus-visible{border-bottom-color:transparent;}"],
    m: [["@media (forced-colors: active){.f14ptb23{background-color:ButtonFace;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f9dbb4x{border-top-color:GrayText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f3qs60o{border-right-color:GrayText;}.f5u9ap2{border-left-color:GrayText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.fwd1oij{border-bottom-color:GrayText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f1cyfu5x{color:GrayText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f127ot8j .fui-Button__icon{color:GrayText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f19etb0b:focus{border-top-color:GrayText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f4f984j:focus{border-right-color:GrayText;}.fw441p0:focus{border-left-color:GrayText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f3d22hf:focus{border-bottom-color:GrayText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.fj8k9ua:hover{background-color:ButtonFace;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.fifrq0d:hover{border-top-color:GrayText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f196mwp7:hover{border-right-color:GrayText;}.fnekfq:hover{border-left-color:GrayText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f1l6uprw:hover{border-bottom-color:GrayText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.fa9u7a5:hover{color:GrayText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f1m71e0y:hover .fui-Button__icon{color:GrayText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.fw24f3:hover:active,.fw24f3:active:focus-visible{background-color:ButtonFace;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f1nznrny:hover:active,.f1nznrny:active:focus-visible{border-top-color:GrayText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f1ao3jkc:hover:active,.f1ao3jkc:active:focus-visible{border-left-color:GrayText;}.fq8nxuu:hover:active,.fq8nxuu:active:focus-visible{border-right-color:GrayText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.ftoixeo:hover:active,.ftoixeo:active:focus-visible{border-bottom-color:GrayText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.fpmuzpx:hover:active,.fpmuzpx:active:focus-visible{color:GrayText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f168odog:hover:active .fui-Button__icon,.f168odog:active:focus-visible .fui-Button__icon{color:GrayText;}}", {
      m: "(forced-colors: active)"
    }]]
  });
  const useRootFocusStyles = /* @__PURE__ */ __styles({
    circular: {
      Bw81rd7: 0,
      kdpuga: 0,
      dm238s: 0,
      B6xbmo0: 0,
      B3whbx2: "f1062rbf"
    },
    rounded: {},
    square: {
      Bw81rd7: 0,
      kdpuga: 0,
      dm238s: 0,
      B6xbmo0: 0,
      B3whbx2: "fj0ryk1"
    },
    primary: {
      B8q5s1w: "f17t0x8g",
      Bci5o5g: ["f194v5ow", "fk7jm04"],
      n8qw10: "f1qgg65p",
      Bdrgwmp: ["fk7jm04", "f194v5ow"],
      j6ew2k: ["fhgccpy", "fjo7pq6"],
      he4mth: "f32wu9k",
      Byr4aka: "fu5nqqq",
      lks7q5: ["f13prjl2", "f1nl83rv"],
      Bnan3qt: "f1czftr5",
      k1dn9: ["f1nl83rv", "f13prjl2"],
      Bqsb82s: ["fixhny3", "f18mfu3r"],
      jg1oma: "feygou5"
    },
    small: {
      Bw81rd7: 0,
      kdpuga: 0,
      dm238s: 0,
      B6xbmo0: 0,
      B3whbx2: "fazmxh"
    },
    medium: {},
    large: {
      Bw81rd7: 0,
      kdpuga: 0,
      dm238s: 0,
      B6xbmo0: 0,
      B3whbx2: "f1b6alqh"
    }
  }, {
    d: [[".f1062rbf[data-fui-focus-visible]{border-radius:var(--borderRadiusCircular);}", {
      p: -1
    }], [".fj0ryk1[data-fui-focus-visible]{border-radius:var(--borderRadiusNone);}", {
      p: -1
    }], ".f17t0x8g[data-fui-focus-visible]{border-top-color:var(--colorStrokeFocus2);}", ".f194v5ow[data-fui-focus-visible]{border-right-color:var(--colorStrokeFocus2);}", ".fk7jm04[data-fui-focus-visible]{border-left-color:var(--colorStrokeFocus2);}", ".f1qgg65p[data-fui-focus-visible]{border-bottom-color:var(--colorStrokeFocus2);}", ".fhgccpy[data-fui-focus-visible]{box-shadow:var(--shadow2),0 0 0 var(--strokeWidthThin) var(--colorStrokeFocus2) inset,0 0 0 var(--strokeWidthThick) var(--colorNeutralForegroundOnBrand) inset;}", ".fjo7pq6[data-fui-focus-visible]{box-shadow:var(--shadow2),0 0 0 var(--strokeWidthThin) var(--colorStrokeFocus2) inset,0 0 0 var(--strokeWidthThick) var(--colorNeutralForegroundOnBrand) inset;}", ".f32wu9k[data-fui-focus-visible]:hover{box-shadow:var(--shadow2),0 0 0 var(--strokeWidthThin) var(--colorStrokeFocus2) inset;}", ".fu5nqqq[data-fui-focus-visible]:hover{border-top-color:var(--colorStrokeFocus2);}", ".f13prjl2[data-fui-focus-visible]:hover{border-right-color:var(--colorStrokeFocus2);}", ".f1nl83rv[data-fui-focus-visible]:hover{border-left-color:var(--colorStrokeFocus2);}", ".f1czftr5[data-fui-focus-visible]:hover{border-bottom-color:var(--colorStrokeFocus2);}", [".fazmxh[data-fui-focus-visible]{border-radius:var(--borderRadiusSmall);}", {
      p: -1
    }], [".f1b6alqh[data-fui-focus-visible]{border-radius:var(--borderRadiusLarge);}", {
      p: -1
    }]],
    t: ["@supports (-moz-appearance:button){.f18mfu3r[data-fui-focus-visible]{box-shadow:var(--shadow2),0 0 0 calc(var(--strokeWidthThin) + 0.25px) var(--colorStrokeFocus2) inset,0 0 0 var(--strokeWidthThick) var(--colorNeutralForegroundOnBrand) inset;}.fixhny3[data-fui-focus-visible]{box-shadow:var(--shadow2),0 0 0 calc(var(--strokeWidthThin) + 0.25px) var(--colorStrokeFocus2) inset,0 0 0 var(--strokeWidthThick) var(--colorNeutralForegroundOnBrand) inset;}}", "@supports (-moz-appearance:button){.feygou5[data-fui-focus-visible]:hover{box-shadow:var(--shadow2),0 0 0 calc(var(--strokeWidthThin) + 0.25px) var(--colorStrokeFocus2) inset;}}"]
  });
  const useRootIconOnlyStyles = /* @__PURE__ */ __styles({
    small: {
      Byoj8tv: 0,
      uwmqm3: 0,
      z189sj: 0,
      z8tnut: 0,
      B0ocmuz: "fu97m5z",
      Bf4jedk: "f17fgpbq",
      B2u0y6b: "f1jt17bm"
    },
    medium: {
      Byoj8tv: 0,
      uwmqm3: 0,
      z189sj: 0,
      z8tnut: 0,
      B0ocmuz: "f18ktai2",
      Bf4jedk: "fwbmr0d",
      B2u0y6b: "f44c6la"
    },
    large: {
      Byoj8tv: 0,
      uwmqm3: 0,
      z189sj: 0,
      z8tnut: 0,
      B0ocmuz: "f1hbd1aw",
      Bf4jedk: "f12clzc2",
      B2u0y6b: "fjy1crr"
    }
  }, {
    d: [[".fu97m5z{padding:1px;}", {
      p: -1
    }], ".f17fgpbq{min-width:24px;}", ".f1jt17bm{max-width:24px;}", [".f18ktai2{padding:5px;}", {
      p: -1
    }], ".fwbmr0d{min-width:32px;}", ".f44c6la{max-width:32px;}", [".f1hbd1aw{padding:7px;}", {
      p: -1
    }], ".f12clzc2{min-width:40px;}", ".fjy1crr{max-width:40px;}"]
  });
  const useIconStyles = /* @__PURE__ */ __styles({
    small: {
      Be2twd7: "fe5j1ua",
      Bqenvij: "fjamq6b",
      a9b677: "f64fuq3",
      Bqrlyyl: "fbaiahx"
    },
    medium: {},
    large: {
      Be2twd7: "f1rt2boy",
      Bqenvij: "frvgh55",
      a9b677: "fq4mcun",
      Bqrlyyl: "f1exjqw5"
    },
    before: {
      t21cq0: ["f1nizpg2", "f1a695kz"]
    },
    after: {
      Frg6f3: ["f1a695kz", "f1nizpg2"]
    }
  }, {
    d: [".fe5j1ua{font-size:20px;}", ".fjamq6b{height:20px;}", ".f64fuq3{width:20px;}", ".fbaiahx{--fui-Button__icon--spacing:var(--spacingHorizontalXS);}", ".f1rt2boy{font-size:24px;}", ".frvgh55{height:24px;}", ".fq4mcun{width:24px;}", ".f1exjqw5{--fui-Button__icon--spacing:var(--spacingHorizontalSNudge);}", ".f1nizpg2{margin-right:var(--fui-Button__icon--spacing);}", ".f1a695kz{margin-left:var(--fui-Button__icon--spacing);}"]
  });
  const useButtonStyles_unstable = (state) => {
    "use no memo";
    const rootBaseClassName = useRootBaseClassName$1();
    const iconBaseClassName = useIconBaseClassName();
    const rootStyles = useRootStyles$2();
    const rootDisabledStyles = useRootDisabledStyles();
    const rootFocusStyles = useRootFocusStyles();
    const rootIconOnlyStyles = useRootIconOnlyStyles();
    const iconStyles = useIconStyles();
    const {
      appearance,
      disabled,
      disabledFocusable,
      icon,
      iconOnly,
      iconPosition,
      shape,
      size
    } = state;
    state.root.className = mergeClasses(
      buttonClassNames.root,
      rootBaseClassName,
      appearance && rootStyles[appearance],
      rootStyles[size],
      icon && size === "small" && rootStyles.smallWithIcon,
      icon && size === "large" && rootStyles.largeWithIcon,
      rootStyles[shape],
      // Disabled styles
      (disabled || disabledFocusable) && rootDisabledStyles.base,
      (disabled || disabledFocusable) && rootDisabledStyles.highContrast,
      appearance && (disabled || disabledFocusable) && rootDisabledStyles[appearance],
      // Focus styles
      appearance === "primary" && rootFocusStyles.primary,
      rootFocusStyles[size],
      rootFocusStyles[shape],
      // Icon-only styles
      iconOnly && rootIconOnlyStyles[size],
      // User provided class name
      state.root.className
    );
    if (state.icon) {
      state.icon.className = mergeClasses(buttonClassNames.icon, iconBaseClassName, !!state.root.children && iconStyles[iconPosition], iconStyles[size], state.icon.className);
    }
    return state;
  };
  const Button = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
    const state = useButton_unstable(props, ref);
    useButtonStyles_unstable(state);
    useCustomStyleHook("useButtonStyles_unstable")(state);
    return renderButton_unstable(state);
  });
  Button.displayName = "Button";
  const FieldContext = reactExports.createContext(void 0);
  FieldContext.Provider;
  const useFieldContext_unstable = () => reactExports.useContext(FieldContext);
  function useFieldControlProps_unstable(props, options) {
    return getFieldControlProps(useFieldContext_unstable(), props, options);
  }
  function getFieldControlProps(context, props, options) {
    if (!context) {
      return props;
    }
    props = {
      ...props
    };
    const { generatedControlId, hintId, labelFor, labelId, required, validationMessageId, validationState } = context;
    if (generatedControlId) {
      var _props;
      var _id;
      (_id = (_props = props).id) !== null && _id !== void 0 ? _id : _props.id = generatedControlId;
    }
    if (labelId && (!(options === null || options === void 0 ? void 0 : options.supportsLabelFor) || labelFor !== props.id)) {
      var _props1, _arialabelledby;
      var _;
      (_ = (_props1 = props)[_arialabelledby = "aria-labelledby"]) !== null && _ !== void 0 ? _ : _props1[_arialabelledby] = labelId;
    }
    if (validationMessageId || hintId) {
      props["aria-describedby"] = [
        validationMessageId,
        hintId,
        props === null || props === void 0 ? void 0 : props["aria-describedby"]
      ].filter(Boolean).join(" ");
    }
    if (validationState === "error") {
      var _props2, _ariainvalid;
      var _1;
      (_1 = (_props2 = props)[_ariainvalid = "aria-invalid"]) !== null && _1 !== void 0 ? _1 : _props2[_ariainvalid] = true;
    }
    if (required) {
      if (options === null || options === void 0 ? void 0 : options.supportsRequired) {
        var _props3;
        var _required;
        (_required = (_props3 = props).required) !== null && _required !== void 0 ? _required : _props3.required = true;
      } else {
        var _props4, _ariarequired;
        var _2;
        (_2 = (_props4 = props)[_ariarequired = "aria-required"]) !== null && _2 !== void 0 ? _2 : _props4[_ariarequired] = true;
      }
    }
    if (options === null || options === void 0 ? void 0 : options.supportsSize) {
      var _props5;
      var _size;
      (_size = (_props5 = props).size) !== null && _size !== void 0 ? _size : _props5.size = context.size;
    }
    return props;
  }
  const useLabel_unstable = (props, ref) => {
    const { weight = "regular", size = "medium", ...baseProps } = props;
    const state = useLabelBase_unstable(baseProps, ref);
    return {
      weight,
      size,
      ...state
    };
  };
  const useLabelBase_unstable = (props, ref) => {
    const { disabled = false, required = false, ...rest } = props;
    return {
      disabled,
      required: optional(required === true ? "*" : required || void 0, {
        defaultProps: {
          "aria-hidden": "true"
        },
        elementType: "span"
      }),
      components: {
        root: "label",
        required: "span"
      },
      root: always(getIntrinsicElementProps("label", {
        ref,
        ...rest
      }), {
        elementType: "label"
      })
    };
  };
  const renderLabel_unstable = (state) => {
    return /* @__PURE__ */ jsxs(state.root, {
      children: [
        state.root.children,
        state.required && /* @__PURE__ */ jsx(state.required, {})
      ]
    });
  };
  const labelClassNames = {
    root: "fui-Label",
    required: "fui-Label__required"
  };
  const useStyles$1 = /* @__PURE__ */ __styles({
    root: {
      Bahqtrf: "fk6fouc",
      sj55zd: "f19n0e5"
    },
    disabled: {
      sj55zd: "f1s2aq7o",
      B7iucu3: "f1cyfu5x"
    },
    required: {
      sj55zd: "f1whyuy6",
      uwmqm3: ["fruq291", "f7x41pl"]
    },
    small: {
      Be2twd7: "fy9rknc",
      Bg96gwp: "fwrc4pm"
    },
    medium: {
      Be2twd7: "fkhj508",
      Bg96gwp: "f1i3iumi"
    },
    large: {
      Be2twd7: "fod5ikn",
      Bg96gwp: "faaz57k",
      Bhrd7zp: "fl43uef"
    },
    semibold: {
      Bhrd7zp: "fl43uef"
    }
  }, {
    d: [".fk6fouc{font-family:var(--fontFamilyBase);}", ".f19n0e5{color:var(--colorNeutralForeground1);}", ".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}", ".f1whyuy6{color:var(--colorPaletteRedForeground3);}", ".fruq291{padding-left:var(--spacingHorizontalXS);}", ".f7x41pl{padding-right:var(--spacingHorizontalXS);}", ".fy9rknc{font-size:var(--fontSizeBase200);}", ".fwrc4pm{line-height:var(--lineHeightBase200);}", ".fkhj508{font-size:var(--fontSizeBase300);}", ".f1i3iumi{line-height:var(--lineHeightBase300);}", ".fod5ikn{font-size:var(--fontSizeBase400);}", ".faaz57k{line-height:var(--lineHeightBase400);}", ".fl43uef{font-weight:var(--fontWeightSemibold);}"],
    m: [["@media (forced-colors: active){.f1cyfu5x{color:GrayText;}}", {
      m: "(forced-colors: active)"
    }]]
  });
  const useLabelStyles_unstable = (state) => {
    "use no memo";
    const styles = useStyles$1();
    state.root.className = mergeClasses(labelClassNames.root, styles.root, state.disabled && styles.disabled, styles[state.size], state.weight === "semibold" && styles.semibold, state.root.className);
    if (state.required) {
      state.required.className = mergeClasses(labelClassNames.required, styles.required, state.disabled && styles.disabled, state.required.className);
    }
    return state;
  };
  const Label = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
    const state = useLabel_unstable(props, ref);
    useLabelStyles_unstable(state);
    useCustomStyleHook("useLabelStyles_unstable")(state);
    return renderLabel_unstable(state);
  });
  Label.displayName = "Label";
  const SpinnerContext = reactExports.createContext(void 0);
  const SpinnerContextDefaultValue = {};
  SpinnerContext.Provider;
  const useSpinnerContext = () => {
    var _React_useContext;
    return (_React_useContext = reactExports.useContext(SpinnerContext)) !== null && _React_useContext !== void 0 ? _React_useContext : SpinnerContextDefaultValue;
  };
  const useSpinner_unstable = (props, ref) => {
    const { size: contextSize } = useSpinnerContext();
    const { appearance = "primary", size = contextSize !== null && contextSize !== void 0 ? contextSize : "medium", ...baseProps } = props;
    const baseState = useSpinnerBase_unstable(baseProps, ref);
    return {
      ...baseState,
      appearance,
      size
    };
  };
  const useSpinnerBase_unstable = (props, ref) => {
    const { delay = 0, labelPosition = "after" } = props;
    const baseId = useId("spinner");
    const { role = "progressbar", ...rest } = props;
    const nativeRoot = always(getIntrinsicElementProps("div", {
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref,
      role,
      ...rest
    }), {
      elementType: "div"
    });
    const [isShownAfterDelay, setIsShownAfterDelay] = reactExports.useState(false);
    const [setDelayTimeout, clearDelayTimeout] = useTimeout();
    reactExports.useEffect(() => {
      if (delay <= 0) {
        return;
      }
      setDelayTimeout(() => {
        setIsShownAfterDelay(true);
      }, delay);
      return () => {
        clearDelayTimeout();
      };
    }, [
      setDelayTimeout,
      clearDelayTimeout,
      delay
    ]);
    const labelShorthand = optional(props.label, {
      defaultProps: {
        id: baseId
      },
      renderByDefault: false,
      elementType: Label
    });
    const spinnerShortHand = optional(props.spinner, {
      renderByDefault: true,
      elementType: "span"
    });
    if (labelShorthand && nativeRoot && !nativeRoot["aria-labelledby"]) {
      nativeRoot["aria-labelledby"] = labelShorthand.id;
    }
    const state = {
      delay,
      labelPosition,
      shouldRenderSpinner: !delay || isShownAfterDelay,
      components: {
        root: "div",
        spinner: "span",
        spinnerTail: "span",
        label: Label
      },
      root: nativeRoot,
      spinner: spinnerShortHand,
      spinnerTail: always(props.spinnerTail, {
        elementType: "span"
      }),
      label: labelShorthand
    };
    return state;
  };
  const renderSpinner_unstable = (state) => {
    const { labelPosition, shouldRenderSpinner } = state;
    return /* @__PURE__ */ jsxs(state.root, {
      children: [
        state.label && shouldRenderSpinner && (labelPosition === "above" || labelPosition === "before") && /* @__PURE__ */ jsx(state.label, {}),
        state.spinner && shouldRenderSpinner && /* @__PURE__ */ jsx(state.spinner, {
          children: state.spinnerTail && /* @__PURE__ */ jsx(state.spinnerTail, {})
        }),
        state.label && shouldRenderSpinner && (labelPosition === "below" || labelPosition === "after") && /* @__PURE__ */ jsx(state.label, {})
      ]
    });
  };
  const spinnerClassNames = {
    root: "fui-Spinner",
    spinner: "fui-Spinner__spinner",
    spinnerTail: "fui-Spinner__spinnerTail",
    label: "fui-Spinner__label"
  };
  const useRootBaseClassName = /* @__PURE__ */ __resetStyles("rpp59a7", null, [".rpp59a7{display:flex;align-items:center;justify-content:center;line-height:0;gap:8px;overflow:hidden;min-width:min-content;}"]);
  const useRootStyles$1 = /* @__PURE__ */ __styles({
    vertical: {
      Beiy3e4: "f1vx9l62"
    }
  }, {
    d: [".f1vx9l62{flex-direction:column;}"]
  });
  const useSpinnerBaseClassName = /* @__PURE__ */ __resetStyles("rvgcg50", "r15nd2jo", {
    r: [".rvgcg50{position:relative;flex-shrink:0;-webkit-mask-image:radial-gradient(closest-side, transparent calc(100% - var(--fui-Spinner--strokeWidth) - 1px), white calc(100% - var(--fui-Spinner--strokeWidth)) calc(100% - 1px), transparent 100%);mask-image:radial-gradient(closest-side, transparent calc(100% - var(--fui-Spinner--strokeWidth) - 1px), white calc(100% - var(--fui-Spinner--strokeWidth)) calc(100% - 1px), transparent 100%);background-color:var(--colorBrandStroke2Contrast);color:var(--colorBrandStroke1);animation-duration:1.5s;animation-iteration-count:infinite;animation-timing-function:linear;animation-name:rb7n1on;}", "@keyframes rb7n1on{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}", ".r15nd2jo{position:relative;flex-shrink:0;-webkit-mask-image:radial-gradient(closest-side, transparent calc(100% - var(--fui-Spinner--strokeWidth) - 1px), white calc(100% - var(--fui-Spinner--strokeWidth)) calc(100% - 1px), transparent 100%);mask-image:radial-gradient(closest-side, transparent calc(100% - var(--fui-Spinner--strokeWidth) - 1px), white calc(100% - var(--fui-Spinner--strokeWidth)) calc(100% - 1px), transparent 100%);background-color:var(--colorBrandStroke2Contrast);color:var(--colorBrandStroke1);animation-duration:1.5s;animation-iteration-count:infinite;animation-timing-function:linear;animation-name:r1gx3jof;}", "@keyframes r1gx3jof{0%{transform:rotate(0deg);}100%{transform:rotate(-360deg);}}"],
    s: ["@media screen and (forced-colors: active){.rvgcg50{background-color:HighlightText;color:Highlight;forced-color-adjust:none;}}", "@media screen and (prefers-reduced-motion: reduce){.rvgcg50{animation-duration:1.8s;}}", "@media screen and (forced-colors: active){.r15nd2jo{background-color:HighlightText;color:Highlight;forced-color-adjust:none;}}", "@media screen and (prefers-reduced-motion: reduce){.r15nd2jo{animation-duration:1.8s;}}"]
  });
  const useSpinnerTailBaseClassName = /* @__PURE__ */ __resetStyles("rxov3xa", "r1o544mv", {
    r: [".rxov3xa{position:absolute;display:block;width:100%;height:100%;-webkit-mask-image:conic-gradient(transparent 105deg, white 105deg);mask-image:conic-gradient(transparent 105deg, white 105deg);animation-duration:1.5s;animation-iteration-count:infinite;animation-timing-function:var(--curveEasyEase);animation-name:r15mim6k;}", '.rxov3xa::before,.rxov3xa::after{content:"";position:absolute;display:block;width:100%;height:100%;animation:inherit;background-image:conic-gradient(currentcolor 135deg, transparent 135deg);}', "@keyframes r15mim6k{0%{transform:rotate(-135deg);}50%{transform:rotate(0deg);}100%{transform:rotate(225deg);}}", ".rxov3xa::before{animation-name:r18vhmn8;}", "@keyframes r18vhmn8{0%{transform:rotate(0deg);}50%{transform:rotate(105deg);}100%{transform:rotate(0deg);}}", ".rxov3xa::after{animation-name:rkgrvoi;}", "@keyframes rkgrvoi{0%{transform:rotate(0deg);}50%{transform:rotate(225deg);}100%{transform:rotate(0deg);}}", ".r1o544mv{position:absolute;display:block;width:100%;height:100%;-webkit-mask-image:conic-gradient(transparent 105deg, white 105deg);mask-image:conic-gradient(transparent 105deg, white 105deg);animation-duration:1.5s;animation-iteration-count:infinite;animation-timing-function:var(--curveEasyEase);animation-name:r109gmi5;}", '.r1o544mv::before,.r1o544mv::after{content:"";position:absolute;display:block;width:100%;height:100%;animation:inherit;background-image:conic-gradient(currentcolor 135deg, transparent 135deg);}', "@keyframes r109gmi5{0%{transform:rotate(135deg);}50%{transform:rotate(0deg);}100%{transform:rotate(-225deg);}}", ".r1o544mv::before{animation-name:r17whflh;}", "@keyframes r17whflh{0%{transform:rotate(0deg);}50%{transform:rotate(-105deg);}100%{transform:rotate(0deg);}}", ".r1o544mv::after{animation-name:re4odhl;}", "@keyframes re4odhl{0%{transform:rotate(0deg);}50%{transform:rotate(-225deg);}100%{transform:rotate(0deg);}}"],
    s: ["@media screen and (prefers-reduced-motion: reduce){.rxov3xa{animation-iteration-count:0;background-image:conic-gradient(transparent 120deg, currentcolor 360deg);}.rxov3xa::before,.rxov3xa::after{content:none;}}", "@media screen and (prefers-reduced-motion: reduce){.r1o544mv{animation-iteration-count:0;background-image:conic-gradient(transparent 120deg, currentcolor 360deg);}.r1o544mv::before,.r1o544mv::after{content:none;}}"]
  });
  const useSpinnerStyles = /* @__PURE__ */ __styles({
    inverted: {
      De3pzq: "fr407j0",
      sj55zd: "f1f7voed"
    },
    rtlTail: {
      btxmck: "f179dep3",
      gb5jj2: "fbz9ihp",
      Bdya8wy: "f1pme1qz"
    },
    "extra-tiny": {
      Bqenvij: "fd461yt",
      a9b677: "fjw5fx7",
      qmp6fs: "f1v3ph3m"
    },
    tiny: {
      Bqenvij: "fjamq6b",
      a9b677: "f64fuq3",
      qmp6fs: "f1v3ph3m"
    },
    "extra-small": {
      Bqenvij: "frvgh55",
      a9b677: "fq4mcun",
      qmp6fs: "f1v3ph3m"
    },
    small: {
      Bqenvij: "fxldao9",
      a9b677: "f1w9dchk",
      qmp6fs: "f1v3ph3m"
    },
    medium: {
      Bqenvij: "f1d2rq10",
      a9b677: "f1szoe96",
      qmp6fs: "fb52u90"
    },
    large: {
      Bqenvij: "f8ljn23",
      a9b677: "fpdz1er",
      qmp6fs: "fb52u90"
    },
    "extra-large": {
      Bqenvij: "fbhnoac",
      a9b677: "feqmc2u",
      qmp6fs: "fb52u90"
    },
    huge: {
      Bqenvij: "f1ft4266",
      a9b677: "fksc0bp",
      qmp6fs: "fa3u9ii"
    }
  }, {
    d: [".fr407j0{background-color:var(--colorNeutralStrokeAlpha2);}", ".f1f7voed{color:var(--colorNeutralStrokeOnBrand2);}", ".f179dep3{-webkit-mask-image:conic-gradient(white 255deg, transparent 255deg);mask-image:conic-gradient(white 255deg, transparent 255deg);}", ".fbz9ihp::before,.fbz9ihp::after{background-image:conic-gradient(transparent 225deg, currentcolor 225deg);}", ".fd461yt{height:16px;}", ".fjw5fx7{width:16px;}", ".f1v3ph3m{--fui-Spinner--strokeWidth:var(--strokeWidthThick);}", ".fjamq6b{height:20px;}", ".f64fuq3{width:20px;}", ".frvgh55{height:24px;}", ".fq4mcun{width:24px;}", ".fxldao9{height:28px;}", ".f1w9dchk{width:28px;}", ".f1d2rq10{height:32px;}", ".f1szoe96{width:32px;}", ".fb52u90{--fui-Spinner--strokeWidth:var(--strokeWidthThicker);}", ".f8ljn23{height:36px;}", ".fpdz1er{width:36px;}", ".fbhnoac{height:40px;}", ".feqmc2u{width:40px;}", ".f1ft4266{height:44px;}", ".fksc0bp{width:44px;}", ".fa3u9ii{--fui-Spinner--strokeWidth:var(--strokeWidthThickest);}"],
    m: [["@media screen and (prefers-reduced-motion: reduce){.f1pme1qz{background-image:conic-gradient(currentcolor 0deg, transparent 240deg);}}", {
      m: "screen and (prefers-reduced-motion: reduce)"
    }]]
  });
  const useLabelStyles = /* @__PURE__ */ __styles({
    inverted: {
      sj55zd: "fonrgv7"
    },
    "extra-tiny": {
      Bahqtrf: "fk6fouc",
      Be2twd7: "fkhj508",
      Bhrd7zp: "figsok6",
      Bg96gwp: "f1i3iumi"
    },
    tiny: {
      Bahqtrf: "fk6fouc",
      Be2twd7: "fkhj508",
      Bhrd7zp: "figsok6",
      Bg96gwp: "f1i3iumi"
    },
    "extra-small": {
      Bahqtrf: "fk6fouc",
      Be2twd7: "fkhj508",
      Bhrd7zp: "figsok6",
      Bg96gwp: "f1i3iumi"
    },
    small: {
      Bahqtrf: "fk6fouc",
      Be2twd7: "fkhj508",
      Bhrd7zp: "figsok6",
      Bg96gwp: "f1i3iumi"
    },
    medium: {
      Bahqtrf: "fk6fouc",
      Be2twd7: "fod5ikn",
      Bhrd7zp: "fl43uef",
      Bg96gwp: "faaz57k"
    },
    large: {
      Bahqtrf: "fk6fouc",
      Be2twd7: "fod5ikn",
      Bhrd7zp: "fl43uef",
      Bg96gwp: "faaz57k"
    },
    "extra-large": {
      Bahqtrf: "fk6fouc",
      Be2twd7: "fod5ikn",
      Bhrd7zp: "fl43uef",
      Bg96gwp: "faaz57k"
    },
    huge: {
      Bahqtrf: "fk6fouc",
      Be2twd7: "f1pp30po",
      Bhrd7zp: "fl43uef",
      Bg96gwp: "f106mvju"
    }
  }, {
    d: [".fonrgv7{color:var(--colorNeutralForegroundStaticInverted);}", ".fk6fouc{font-family:var(--fontFamilyBase);}", ".fkhj508{font-size:var(--fontSizeBase300);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".f1i3iumi{line-height:var(--lineHeightBase300);}", ".fod5ikn{font-size:var(--fontSizeBase400);}", ".fl43uef{font-weight:var(--fontWeightSemibold);}", ".faaz57k{line-height:var(--lineHeightBase400);}", ".f1pp30po{font-size:var(--fontSizeBase500);}", ".f106mvju{line-height:var(--lineHeightBase500);}"]
  });
  const useSpinnerStyles_unstable = (state) => {
    "use no memo";
    const {
      labelPosition,
      size,
      appearance
    } = state;
    const {
      dir
    } = useFluent();
    const rootBaseClassName = useRootBaseClassName();
    const rootStyles = useRootStyles$1();
    const spinnerBaseClassName = useSpinnerBaseClassName();
    const spinnerStyles = useSpinnerStyles();
    const spinnerTailBaseClassName = useSpinnerTailBaseClassName();
    const labelStyles = useLabelStyles();
    state.root.className = mergeClasses(spinnerClassNames.root, rootBaseClassName, (labelPosition === "above" || labelPosition === "below") && rootStyles.vertical, state.root.className);
    if (state.spinner) {
      state.spinner.className = mergeClasses(spinnerClassNames.spinner, spinnerBaseClassName, spinnerStyles[size], appearance === "inverted" && spinnerStyles.inverted, state.spinner.className);
    }
    if (state.spinnerTail) {
      state.spinnerTail.className = mergeClasses(spinnerClassNames.spinnerTail, spinnerTailBaseClassName, dir === "rtl" && spinnerStyles.rtlTail, state.spinnerTail.className);
    }
    if (state.label) {
      state.label.className = mergeClasses(spinnerClassNames.label, labelStyles[size], appearance === "inverted" && labelStyles.inverted, state.label.className);
    }
    return state;
  };
  const Spinner = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
    const state = useSpinner_unstable(props, ref);
    useSpinnerStyles_unstable(state);
    useCustomStyleHook("useSpinnerStyles_unstable")(state);
    return renderSpinner_unstable(state);
  });
  Spinner.displayName = "Spinner";
  const useText_unstable = (props, ref) => {
    const { wrap, truncate, block, italic, underline, strikethrough, size, font, weight, align } = props;
    const state = {
      align: align !== null && align !== void 0 ? align : "start",
      block: block !== null && block !== void 0 ? block : false,
      font: font !== null && font !== void 0 ? font : "base",
      italic: italic !== null && italic !== void 0 ? italic : false,
      size: size !== null && size !== void 0 ? size : 300,
      strikethrough: strikethrough !== null && strikethrough !== void 0 ? strikethrough : false,
      truncate: truncate !== null && truncate !== void 0 ? truncate : false,
      underline: underline !== null && underline !== void 0 ? underline : false,
      weight: weight !== null && weight !== void 0 ? weight : "regular",
      wrap: wrap !== null && wrap !== void 0 ? wrap : true,
      components: {
        root: "span"
      },
      root: always(getIntrinsicElementProps("span", {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLHeadingElement & HTMLPreElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref,
        ...props
      }), {
        elementType: "span"
      })
    };
    return state;
  };
  const renderText_unstable = (state) => {
    return /* @__PURE__ */ jsx(state.root, {});
  };
  const textClassNames = {
    root: "fui-Text"
  };
  const useStyles = /* @__PURE__ */ __styles({
    root: {
      Bahqtrf: "fk6fouc",
      Be2twd7: "fkhj508",
      Bg96gwp: "f1i3iumi",
      Bhrd7zp: "figsok6",
      fsow6f: "fpgzoln",
      mc9l5x: "f1w7gpdv",
      Huce71: "f6juhto",
      B68tc82: 0,
      Bmxbyg5: 0,
      Bpg54ce: "f1gl81tg",
      ygn44y: "f2jf649"
    },
    nowrap: {
      Huce71: "fz5stix",
      B68tc82: 0,
      Bmxbyg5: 0,
      Bpg54ce: "f1a3p1vp"
    },
    truncate: {
      ygn44y: "f1cmbuwj"
    },
    block: {
      mc9l5x: "ftgm304"
    },
    italic: {
      B80ckks: "f1j4dglz"
    },
    underline: {
      w71qe1: "f13mvf36"
    },
    strikethrough: {
      w71qe1: "fv5q2k7"
    },
    strikethroughUnderline: {
      w71qe1: "f1drk4o6"
    },
    base100: {
      Be2twd7: "f13mqy1h",
      Bg96gwp: "fcpl73t"
    },
    base200: {
      Be2twd7: "fy9rknc",
      Bg96gwp: "fwrc4pm"
    },
    base400: {
      Be2twd7: "fod5ikn",
      Bg96gwp: "faaz57k"
    },
    base500: {
      Be2twd7: "f1pp30po",
      Bg96gwp: "f106mvju"
    },
    base600: {
      Be2twd7: "f1x0m3f5",
      Bg96gwp: "fb86gi6"
    },
    hero700: {
      Be2twd7: "fojgt09",
      Bg96gwp: "fcen8rp"
    },
    hero800: {
      Be2twd7: "fccw675",
      Bg96gwp: "f1ebx5kk"
    },
    hero900: {
      Be2twd7: "f15afnhw",
      Bg96gwp: "fr3w3wp"
    },
    hero1000: {
      Be2twd7: "fpyltcb",
      Bg96gwp: "f1ivgwrt"
    },
    monospace: {
      Bahqtrf: "f1fedwem"
    },
    numeric: {
      Bahqtrf: "f1uq0ln5"
    },
    weightMedium: {
      Bhrd7zp: "fdj6btp"
    },
    weightSemibold: {
      Bhrd7zp: "fl43uef"
    },
    weightBold: {
      Bhrd7zp: "flh3ekv"
    },
    alignCenter: {
      fsow6f: "f17mccla"
    },
    alignEnd: {
      fsow6f: "f12ymhq5"
    },
    alignJustify: {
      fsow6f: "f1j59e10"
    }
  }, {
    d: [".fk6fouc{font-family:var(--fontFamilyBase);}", ".fkhj508{font-size:var(--fontSizeBase300);}", ".f1i3iumi{line-height:var(--lineHeightBase300);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".fpgzoln{text-align:start;}", ".f1w7gpdv{display:inline;}", ".f6juhto{white-space:normal;}", [".f1gl81tg{overflow:visible;}", {
      p: -1
    }], ".f2jf649{text-overflow:clip;}", ".fz5stix{white-space:nowrap;}", [".f1a3p1vp{overflow:hidden;}", {
      p: -1
    }], ".f1cmbuwj{text-overflow:ellipsis;}", ".ftgm304{display:block;}", ".f1j4dglz{font-style:italic;}", ".f13mvf36{text-decoration-line:underline;}", ".fv5q2k7{text-decoration-line:line-through;}", ".f1drk4o6{text-decoration-line:line-through underline;}", ".f13mqy1h{font-size:var(--fontSizeBase100);}", ".fcpl73t{line-height:var(--lineHeightBase100);}", ".fy9rknc{font-size:var(--fontSizeBase200);}", ".fwrc4pm{line-height:var(--lineHeightBase200);}", ".fod5ikn{font-size:var(--fontSizeBase400);}", ".faaz57k{line-height:var(--lineHeightBase400);}", ".f1pp30po{font-size:var(--fontSizeBase500);}", ".f106mvju{line-height:var(--lineHeightBase500);}", ".f1x0m3f5{font-size:var(--fontSizeBase600);}", ".fb86gi6{line-height:var(--lineHeightBase600);}", ".fojgt09{font-size:var(--fontSizeHero700);}", ".fcen8rp{line-height:var(--lineHeightHero700);}", ".fccw675{font-size:var(--fontSizeHero800);}", ".f1ebx5kk{line-height:var(--lineHeightHero800);}", ".f15afnhw{font-size:var(--fontSizeHero900);}", ".fr3w3wp{line-height:var(--lineHeightHero900);}", ".fpyltcb{font-size:var(--fontSizeHero1000);}", ".f1ivgwrt{line-height:var(--lineHeightHero1000);}", ".f1fedwem{font-family:var(--fontFamilyMonospace);}", ".f1uq0ln5{font-family:var(--fontFamilyNumeric);}", ".fdj6btp{font-weight:var(--fontWeightMedium);}", ".fl43uef{font-weight:var(--fontWeightSemibold);}", ".flh3ekv{font-weight:var(--fontWeightBold);}", ".f17mccla{text-align:center;}", ".f12ymhq5{text-align:end;}", ".f1j59e10{text-align:justify;}"]
  });
  const useTextStyles_unstable = (state) => {
    "use no memo";
    const styles = useStyles();
    state.root.className = mergeClasses(textClassNames.root, styles.root, state.wrap === false && styles.nowrap, state.truncate && styles.truncate, state.block && styles.block, state.italic && styles.italic, state.underline && styles.underline, state.strikethrough && styles.strikethrough, state.underline && state.strikethrough && styles.strikethroughUnderline, state.size === 100 && styles.base100, state.size === 200 && styles.base200, state.size === 400 && styles.base400, state.size === 500 && styles.base500, state.size === 600 && styles.base600, state.size === 700 && styles.hero700, state.size === 800 && styles.hero800, state.size === 900 && styles.hero900, state.size === 1e3 && styles.hero1000, state.font === "monospace" && styles.monospace, state.font === "numeric" && styles.numeric, state.weight === "medium" && styles.weightMedium, state.weight === "semibold" && styles.weightSemibold, state.weight === "bold" && styles.weightBold, state.align === "center" && styles.alignCenter, state.align === "end" && styles.alignEnd, state.align === "justify" && styles.alignJustify, state.root.className);
    return state;
  };
  const Text = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
    const state = useText_unstable(props, ref);
    useTextStyles_unstable(state);
    useCustomStyleHook("useTextStyles_unstable")(state);
    return renderText_unstable(state);
  });
  Text.displayName = "Text";
  const renderTextarea_unstable = (state) => {
    return /* @__PURE__ */ jsx(state.root, {
      children: /* @__PURE__ */ jsx(state.textarea, {})
    });
  };
  const useTextarea_unstable = (props, ref) => {
    const overrides = useOverrides();
    var _overrides_inputDefaultAppearance;
    const { size = "medium", appearance = (_overrides_inputDefaultAppearance = overrides.inputDefaultAppearance) !== null && _overrides_inputDefaultAppearance !== void 0 ? _overrides_inputDefaultAppearance : "outline", ...baseProps } = props;
    const baseState = useTextareaBase_unstable(baseProps, ref);
    return {
      ...baseState,
      size,
      appearance
    };
  };
  const useTextareaBase_unstable = (props, ref) => {
    props = useFieldControlProps_unstable(props, {
      supportsLabelFor: true,
      supportsRequired: true,
      supportsSize: true
    });
    const { resize = "none", onChange } = props;
    const [value, setValue] = useControllableState({
      state: props.value,
      defaultState: props.defaultValue,
      initialState: void 0
    });
    const nativeProps = getPartitionedNativeProps({
      props,
      primarySlotTagName: "textarea",
      excludedPropNames: [
        "onChange",
        "value",
        "defaultValue"
      ]
    });
    const state = {
      resize,
      components: {
        root: "span",
        textarea: "textarea"
      },
      textarea: always(props.textarea, {
        defaultProps: {
          ref,
          ...nativeProps.primary
        },
        elementType: "textarea"
      }),
      root: always(props.root, {
        defaultProps: nativeProps.root,
        elementType: "span"
      })
    };
    state.textarea.value = value;
    state.textarea.onChange = useEventCallback((ev) => {
      const newValue = ev.target.value;
      onChange === null || onChange === void 0 ? void 0 : onChange(ev, {
        value: newValue
      });
      setValue(newValue);
    });
    return state;
  };
  const textareaClassNames = {
    root: "fui-Textarea",
    textarea: "fui-Textarea__textarea"
  };
  const useRootStyles = /* @__PURE__ */ __styles({
    base: {
      mc9l5x: "ftuwxu6",
      B7ck84d: "f1ewtqcl",
      qhf8xq: "f10pi13n",
      Byoj8tv: 0,
      uwmqm3: 0,
      z189sj: 0,
      z8tnut: 0,
      B0ocmuz: "f1yiegib",
      jrapky: 0,
      Frg6f3: 0,
      t21cq0: 0,
      B6of3ja: 0,
      B74szlk: "f1s184ao",
      Beyfa6y: 0,
      Bbmb7ep: 0,
      Btl43ni: 0,
      B7oj6ja: 0,
      Dimara: "ft85np5",
      ha4doy: "f12kltsn"
    },
    disabled: {
      De3pzq: "f1c21dwh",
      Bgfg5da: 0,
      B9xav0g: 0,
      oivjwe: 0,
      Bn0qgzm: 0,
      B4g9neb: 0,
      zhjwy3: 0,
      wvpqe5: 0,
      ibv6hh: 0,
      u1mtju: 0,
      h3c5rm: 0,
      vrafjx: 0,
      Bekrc4i: 0,
      i8vvqc: 0,
      g2u3we: 0,
      icvyot: 0,
      B4j52fo: 0,
      irswps: "ff3nzm7",
      Bcq6wej: "f9dbb4x",
      Jcjdmf: ["f3qs60o", "f5u9ap2"],
      sc4o1m: "fwd1oij",
      Bosien3: ["f5u9ap2", "f3qs60o"]
    },
    interactive: {
      li1rpt: "f1gw3sf2",
      Bsft5z2: "f13zj6fq",
      E3zdtr: "f1mdlcz9",
      Eqx8gd: ["f1a7op3", "f1cjjd47"],
      By385i5: "f1gboi2j",
      B1piin3: ["f1cjjd47", "f1a7op3"],
      Dlnsje: "ffyw7fx",
      d9w3h3: ["f1kp91vd", "f1ibwz09"],
      B3778ie: ["f1ibwz09", "f1kp91vd"],
      B1q35kw: 0,
      Bw17bha: 0,
      Bcgy8vk: 0,
      Bjuhk93: "f1mnjydx",
      Gjdm7m: "fj2g8qd",
      b1kco5: "f1yk9hq",
      Ba2ppi3: "fhwpy7i",
      F2fol1: "f14ee0xe",
      lck23g: "f1xhbsuh",
      wi16st: "fsrmcvb",
      ywj3b2: "f1t3k7v9",
      umuwi5: "fjw5xc1",
      Blcqepd: "f1xdyd5c",
      nplu4u: "fatpbeo",
      Bioka5o: "fb7uyps",
      Bnupc0a: "fx04xgm",
      bing71: "f1c7in40",
      Bercvud: "f1ibeo51",
      Bbr2w1p: "f1vnc8sk",
      Bduesf4: "f3e99gv",
      Bpq79vn: "fhljsf7"
    },
    filled: {
      Bgfg5da: 0,
      B9xav0g: 0,
      oivjwe: 0,
      Bn0qgzm: 0,
      B4g9neb: 0,
      zhjwy3: 0,
      wvpqe5: 0,
      ibv6hh: 0,
      u1mtju: 0,
      h3c5rm: 0,
      vrafjx: 0,
      Bekrc4i: 0,
      i8vvqc: 0,
      g2u3we: 0,
      icvyot: 0,
      B4j52fo: 0,
      irswps: "f88035w",
      q7v0qe: "ftmjh5b",
      kmh5ft: ["f17blpuu", "fsrcdbj"],
      nagaa4: "f1tpwn32",
      B1yhkcb: ["fsrcdbj", "f17blpuu"]
    },
    "filled-darker": {
      De3pzq: "f16xq7d1"
    },
    "filled-lighter": {
      De3pzq: "fxugw4r"
    },
    "filled-darker-shadow": {
      De3pzq: "f16xq7d1",
      Bgfg5da: 0,
      B9xav0g: 0,
      oivjwe: 0,
      Bn0qgzm: 0,
      B4g9neb: 0,
      zhjwy3: 0,
      wvpqe5: 0,
      ibv6hh: 0,
      u1mtju: 0,
      h3c5rm: 0,
      vrafjx: 0,
      Bekrc4i: 0,
      i8vvqc: 0,
      g2u3we: 0,
      icvyot: 0,
      B4j52fo: 0,
      irswps: "f1gmd7mu",
      E5pizo: "fyed02w"
    },
    "filled-lighter-shadow": {
      De3pzq: "fxugw4r",
      Bgfg5da: 0,
      B9xav0g: 0,
      oivjwe: 0,
      Bn0qgzm: 0,
      B4g9neb: 0,
      zhjwy3: 0,
      wvpqe5: 0,
      ibv6hh: 0,
      u1mtju: 0,
      h3c5rm: 0,
      vrafjx: 0,
      Bekrc4i: 0,
      i8vvqc: 0,
      g2u3we: 0,
      icvyot: 0,
      B4j52fo: 0,
      irswps: "f1gmd7mu",
      E5pizo: "fyed02w"
    },
    outline: {
      De3pzq: "fxugw4r",
      Bgfg5da: 0,
      B9xav0g: "f1c1zstj",
      oivjwe: 0,
      Bn0qgzm: 0,
      B4g9neb: 0,
      zhjwy3: 0,
      wvpqe5: 0,
      ibv6hh: 0,
      u1mtju: 0,
      h3c5rm: 0,
      vrafjx: 0,
      Bekrc4i: 0,
      i8vvqc: 0,
      g2u3we: 0,
      icvyot: 0,
      B4j52fo: 0,
      irswps: "fhz96rm"
    },
    outlineInteractive: {
      kzujx5: 0,
      oetu4i: "f1l4zc64",
      gvrnp0: 0,
      xv9156: 0,
      jek2p4: 0,
      gg5e9n: 0,
      Beu9t3s: 0,
      dt87k2: 0,
      Bt1vbvt: 0,
      Bwzppfd: 0,
      Bop6t4b: 0,
      B2zwrfe: 0,
      Bwp2tzp: 0,
      Bgoe8wy: 0,
      Bf40cpq: 0,
      ckks6v: 0,
      Baalond: "f9mts5e",
      v2iqwr: 0,
      wmxk5l: "f1z0osm6",
      Bj33j0h: 0,
      Bs0cc2w: 0,
      qwjtx1: 0,
      B50zh58: 0,
      f7epvg: 0,
      e1hlit: 0,
      B7mkhst: 0,
      ak43y8: 0,
      Bbcopvn: 0,
      Bvecx4l: 0,
      lwioe0: 0,
      B6oc9vd: 0,
      e2sjt0: 0,
      uqwnxt: 0,
      asj8p9: "f1acnei2",
      Br8fjdy: 0,
      zoxjo1: "f1so894s",
      Bt3ojkv: 0,
      B7pmvfx: 0,
      Bfht2n1: 0,
      an54nd: 0,
      t1ykpo: 0,
      Belqbek: 0,
      bbt1vd: 0,
      Brahy3i: 0,
      r7b1zc: 0,
      rexu52: 0,
      ovtnii: 0,
      Bvq3b66: 0,
      Bawrxx6: 0,
      Bbs6y8j: 0,
      B2qpgjt: "f19ezbcq"
    },
    invalid: {
      tvckwq: "fs4k3qj",
      gk2u95: ["fcee079", "fmyw78r"],
      hhx65j: "f1fgmyf4",
      Bxowmz0: ["fmyw78r", "fcee079"]
    }
  }, {
    d: [".ftuwxu6{display:inline-flex;}", ".f1ewtqcl{box-sizing:border-box;}", ".f10pi13n{position:relative;}", [".f1yiegib{padding:0 0 var(--strokeWidthThick) 0;}", {
      p: -1
    }], [".f1s184ao{margin:0;}", {
      p: -1
    }], [".ft85np5{border-radius:var(--borderRadiusMedium);}", {
      p: -1
    }], ".f12kltsn{vertical-align:top;}", ".f1c21dwh{background-color:var(--colorTransparentBackground);}", [".ff3nzm7{border:var(--strokeWidthThin) solid var(--colorNeutralStrokeDisabled);}", {
      p: -2
    }], ".f1gw3sf2::after{box-sizing:border-box;}", '.f13zj6fq::after{content:"";}', ".f1mdlcz9::after{position:absolute;}", ".f1a7op3::after{left:-1px;}", ".f1cjjd47::after{right:-1px;}", ".f1gboi2j::after{bottom:-1px;}", ".ffyw7fx::after{height:max(var(--strokeWidthThick), var(--borderRadiusMedium));}", ".f1kp91vd::after{border-bottom-left-radius:var(--borderRadiusMedium);}", ".f1ibwz09::after{border-bottom-right-radius:var(--borderRadiusMedium);}", [".f1mnjydx::after{border-bottom:var(--strokeWidthThick) solid var(--colorCompoundBrandStroke);}", {
      p: -1
    }], ".fj2g8qd::after{clip-path:inset(calc(100% - var(--strokeWidthThick)) 0 0 0);}", ".f1yk9hq::after{transform:scaleX(0);}", ".fhwpy7i::after{transition-property:transform;}", ".f14ee0xe::after{transition-duration:var(--durationUltraFast);}", ".f1xhbsuh::after{transition-delay:var(--curveAccelerateMid);}", [".f88035w{border:var(--strokeWidthThin) solid var(--colorTransparentStroke);}", {
      p: -2
    }], ".f16xq7d1{background-color:var(--colorNeutralBackground3);}", ".fxugw4r{background-color:var(--colorNeutralBackground1);}", [".f1gmd7mu{border:var(--strokeWidthThin) solid var(--colorTransparentStrokeInteractive);}", {
      p: -2
    }], ".fyed02w{box-shadow:var(--shadow2);}", [".f1gmd7mu{border:var(--strokeWidthThin) solid var(--colorTransparentStrokeInteractive);}", {
      p: -2
    }], [".fhz96rm{border:var(--strokeWidthThin) solid var(--colorNeutralStroke1);}", {
      p: -2
    }], ".f1c1zstj{border-bottom-color:var(--colorNeutralStrokeAccessible);}", ".fs4k3qj:not(:focus-within),.fs4k3qj:hover:not(:focus-within){border-top-color:var(--colorPaletteRedBorder2);}", ".fcee079:not(:focus-within),.fcee079:hover:not(:focus-within){border-right-color:var(--colorPaletteRedBorder2);}", ".fmyw78r:not(:focus-within),.fmyw78r:hover:not(:focus-within){border-left-color:var(--colorPaletteRedBorder2);}", ".f1fgmyf4:not(:focus-within),.f1fgmyf4:hover:not(:focus-within){border-bottom-color:var(--colorPaletteRedBorder2);}"],
    m: [["@media (forced-colors: active){.f9dbb4x{border-top-color:GrayText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.f3qs60o{border-right-color:GrayText;}.f5u9ap2{border-left-color:GrayText;}}", {
      m: "(forced-colors: active)"
    }], ["@media (forced-colors: active){.fwd1oij{border-bottom-color:GrayText;}}", {
      m: "(forced-colors: active)"
    }], ["@media screen and (prefers-reduced-motion: reduce){.fsrmcvb::after{transition-duration:0.01ms;}}", {
      m: "screen and (prefers-reduced-motion: reduce)"
    }], ["@media screen and (prefers-reduced-motion: reduce){.f1t3k7v9::after{transition-delay:0.01ms;}}", {
      m: "screen and (prefers-reduced-motion: reduce)"
    }], ["@media screen and (prefers-reduced-motion: reduce){.fx04xgm:focus-within::after{transition-duration:0.01ms;}}", {
      m: "screen and (prefers-reduced-motion: reduce)"
    }], ["@media screen and (prefers-reduced-motion: reduce){.f1c7in40:focus-within::after{transition-delay:0.01ms;}}", {
      m: "screen and (prefers-reduced-motion: reduce)"
    }]],
    w: [".fjw5xc1:focus-within::after{transform:scaleX(1);}", ".f1xdyd5c:focus-within::after{transition-property:transform;}", ".fatpbeo:focus-within::after{transition-duration:var(--durationNormal);}", ".fb7uyps:focus-within::after{transition-delay:var(--curveDecelerateMid);}", ".f1ibeo51:focus-within:active::after{border-bottom-color:var(--colorCompoundBrandStrokePressed);}", ".f1vnc8sk:focus-within{outline-width:var(--strokeWidthThick);}", ".f3e99gv:focus-within{outline-style:solid;}", ".fhljsf7:focus-within{outline-color:transparent;}", [".f19ezbcq:focus-within{border:var(--strokeWidthThin) solid var(--colorNeutralStroke1Pressed);}", {
      p: -2
    }], ".f1so894s:focus-within{border-bottom-color:var(--colorCompoundBrandStroke);}"],
    h: [".ftmjh5b:hover,.ftmjh5b:focus-within{border-top-color:var(--colorTransparentStrokeInteractive);}", ".f17blpuu:hover,.f17blpuu:focus-within{border-right-color:var(--colorTransparentStrokeInteractive);}", ".fsrcdbj:hover,.fsrcdbj:focus-within{border-left-color:var(--colorTransparentStrokeInteractive);}", ".f1tpwn32:hover,.f1tpwn32:focus-within{border-bottom-color:var(--colorTransparentStrokeInteractive);}", [".f9mts5e:hover{border:var(--strokeWidthThin) solid var(--colorNeutralStroke1Hover);}", {
      p: -2
    }], ".f1l4zc64:hover{border-bottom-color:var(--colorNeutralStrokeAccessibleHover);}"],
    a: [[".f1acnei2:active{border:var(--strokeWidthThin) solid var(--colorNeutralStroke1Pressed);}", {
      p: -2
    }], ".f1z0osm6:active{border-bottom-color:var(--colorNeutralStrokeAccessiblePressed);}"]
  });
  const useTextareaStyles = /* @__PURE__ */ __styles({
    base: {
      icvyot: "f1ern45e",
      vrafjx: ["f1n71otn", "f1deefiw"],
      oivjwe: "f1h8hb77",
      wvpqe5: ["f1deefiw", "f1n71otn"],
      jrapky: 0,
      Frg6f3: 0,
      t21cq0: 0,
      B6of3ja: 0,
      B74szlk: "f1s184ao",
      De3pzq: "f3rmtva",
      B7ck84d: "f1ewtqcl",
      sj55zd: "f19n0e5",
      Bh6795r: "fqerorx",
      Bahqtrf: "fk6fouc",
      Bqenvij: "f1l02sjl",
      yvdlaj: "fwyc1cq",
      B3o7kgh: "f13ta7ih",
      oeaueh: "f1s6fcnf"
    },
    disabled: {
      sj55zd: "f1s2aq7o",
      Bceei9c: "fdrzuqr",
      yvdlaj: "fahhnxm"
    },
    small: {
      sshi5w: "f1w5jphr",
      Byoj8tv: 0,
      uwmqm3: 0,
      z189sj: 0,
      z8tnut: 0,
      B0ocmuz: "f1pnffij",
      Bxyxcbc: "f192z54u",
      Bahqtrf: "fk6fouc",
      Be2twd7: "fy9rknc",
      Bhrd7zp: "figsok6",
      Bg96gwp: "fwrc4pm"
    },
    medium: {
      sshi5w: "fvmd9f",
      Byoj8tv: 0,
      uwmqm3: 0,
      z189sj: 0,
      z8tnut: 0,
      B0ocmuz: "f1ww82xo",
      Bxyxcbc: "f1if7ixc",
      Bahqtrf: "fk6fouc",
      Be2twd7: "fkhj508",
      Bhrd7zp: "figsok6",
      Bg96gwp: "f1i3iumi"
    },
    large: {
      sshi5w: "f1kfson",
      Byoj8tv: 0,
      uwmqm3: 0,
      z189sj: 0,
      z8tnut: 0,
      B0ocmuz: "f15hvtkj",
      Bxyxcbc: "f3kip1f",
      Bahqtrf: "fk6fouc",
      Be2twd7: "fod5ikn",
      Bhrd7zp: "figsok6",
      Bg96gwp: "faaz57k"
    }
  }, {
    d: [".f1ern45e{border-top-style:none;}", ".f1n71otn{border-right-style:none;}", ".f1deefiw{border-left-style:none;}", ".f1h8hb77{border-bottom-style:none;}", [".f1s184ao{margin:0;}", {
      p: -1
    }], ".f3rmtva{background-color:transparent;}", ".f1ewtqcl{box-sizing:border-box;}", ".f19n0e5{color:var(--colorNeutralForeground1);}", ".fqerorx{flex-grow:1;}", ".fk6fouc{font-family:var(--fontFamilyBase);}", ".f1l02sjl{height:100%;}", ".fwyc1cq::-webkit-input-placeholder{color:var(--colorNeutralForeground4);}", ".fwyc1cq::-moz-placeholder{color:var(--colorNeutralForeground4);}", ".f13ta7ih::-webkit-input-placeholder{opacity:1;}", ".f13ta7ih::-moz-placeholder{opacity:1;}", ".f1s6fcnf{outline-style:none;}", ".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}", ".fdrzuqr{cursor:not-allowed;}", ".fahhnxm::-webkit-input-placeholder{color:var(--colorNeutralForegroundDisabled);}", ".fahhnxm::-moz-placeholder{color:var(--colorNeutralForegroundDisabled);}", ".f1w5jphr{min-height:40px;}", [".f1pnffij{padding:var(--spacingVerticalXS) calc(var(--spacingHorizontalSNudge) + var(--spacingHorizontalXXS));}", {
      p: -1
    }], ".f192z54u{max-height:200px;}", ".fy9rknc{font-size:var(--fontSizeBase200);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".fwrc4pm{line-height:var(--lineHeightBase200);}", ".fvmd9f{min-height:52px;}", [".f1ww82xo{padding:var(--spacingVerticalSNudge) calc(var(--spacingHorizontalMNudge) + var(--spacingHorizontalXXS));}", {
      p: -1
    }], ".f1if7ixc{max-height:260px;}", ".fkhj508{font-size:var(--fontSizeBase300);}", ".f1i3iumi{line-height:var(--lineHeightBase300);}", ".f1kfson{min-height:64px;}", [".f15hvtkj{padding:var(--spacingVerticalS) calc(var(--spacingHorizontalM) + var(--spacingHorizontalXXS));}", {
      p: -1
    }], ".f3kip1f{max-height:320px;}", ".fod5ikn{font-size:var(--fontSizeBase400);}", ".faaz57k{line-height:var(--lineHeightBase400);}"]
  });
  const useTextareaResizeStyles = /* @__PURE__ */ __styles({
    none: {
      B3rzk8w: "f1o1s39h"
    },
    both: {
      B3rzk8w: "f1pxm0xe"
    },
    horizontal: {
      B3rzk8w: "fq6nmtn"
    },
    vertical: {
      B3rzk8w: "f1f5ktr4"
    }
  }, {
    d: [".f1o1s39h{resize:none;}", ".f1pxm0xe{resize:both;}", ".fq6nmtn{resize:horizontal;}", ".f1f5ktr4{resize:vertical;}"]
  });
  const useTextareaStyles_unstable = (state) => {
    "use no memo";
    const {
      size,
      appearance,
      resize
    } = state;
    const disabled = state.textarea.disabled;
    const invalid = `${state.textarea["aria-invalid"]}` === "true";
    const filled = appearance.startsWith("filled");
    const rootStyles = useRootStyles();
    state.root.className = mergeClasses(textareaClassNames.root, rootStyles.base, disabled && rootStyles.disabled, !disabled && filled && rootStyles.filled, !disabled && rootStyles[appearance], !disabled && rootStyles.interactive, !disabled && appearance === "outline" && rootStyles.outlineInteractive, !disabled && invalid && rootStyles.invalid, state.root.className);
    const textareaStyles = useTextareaStyles();
    const textareaResizeStyles = useTextareaResizeStyles();
    state.textarea.className = mergeClasses(textareaClassNames.textarea, textareaStyles.base, textareaStyles[size], textareaResizeStyles[resize], disabled && textareaStyles.disabled, state.textarea.className);
    return state;
  };
  const Textarea = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
    const state = useTextarea_unstable(props, ref);
    useTextareaStyles_unstable(state);
    useCustomStyleHook("useTextareaStyles_unstable")(state);
    return renderTextarea_unstable(state);
  });
  Textarea.displayName = "Textarea";
  function ChatBubble({ apiBaseUrl, title = "Agent Plane Talk", description = "Aviation humor, clear skies, text-only comms." }) {
    const [isOpen, setIsOpen] = reactExports.useState(false);
    const [isBusy, setIsBusy] = reactExports.useState(false);
    const [draft, setDraft] = reactExports.useState("");
    const [messages, setMessages] = reactExports.useState([
      {
        role: "assistant",
        content: "Tower online. Agent Plane Talk is parked at gate C3 and ready for your request."
      }
    ]);
    const canSend = draft.trim().length > 0 && !isBusy;
    const streamEndpoint = reactExports.useMemo(() => `${apiBaseUrl.replace(/\/$/, "")}/api/chat/stream`, [apiBaseUrl]);
    async function sendMessage() {
      var _a, _b;
      const text = draft.trim();
      if (!text || isBusy) {
        return;
      }
      const nextMessages = [...messages, { role: "user", content: text }];
      setMessages(nextMessages);
      setDraft("");
      setIsBusy(true);
      try {
        const response = await fetch(streamEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextMessages })
        });
        if (!response.ok) {
          throw new Error(`Chat request failed with status ${response.status}`);
        }
        const contentType = (_a = response.headers.get("content-type")) != null ? _a : "";
        const isEventStream = contentType.includes("text/event-stream");
        if (!isEventStream || !response.body) {
          const payload = await response.json();
          setMessages((prev) => [...prev, { role: "assistant", content: payload.assistant_message }]);
          return;
        }
        let assistantIndex = -1;
        setMessages((prev) => {
          assistantIndex = prev.length;
          return [...prev, { role: "assistant", content: "" }];
        });
        const appendAssistantText = (delta) => {
          if (!delta) {
            return;
          }
          setMessages((prev) => {
            if (assistantIndex < 0 || assistantIndex >= prev.length) {
              return prev;
            }
            const next = [...prev];
            const current = next[assistantIndex];
            next[assistantIndex] = { role: "assistant", content: `${current.content}${delta}` };
            return next;
          });
        };
        const setAssistantText = (text2) => {
          setMessages((prev) => {
            if (assistantIndex < 0 || assistantIndex >= prev.length) {
              return prev;
            }
            const next = [...prev];
            next[assistantIndex] = { role: "assistant", content: text2 };
            return next;
          });
        };
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          buffer += decoder.decode(value, { stream: true });
          let boundary = buffer.indexOf("\n\n");
          while (boundary >= 0) {
            const rawEvent = buffer.slice(0, boundary);
            buffer = buffer.slice(boundary + 2);
            let eventType = "message";
            let eventData = "";
            for (const line of rawEvent.split(/\r?\n/)) {
              if (line.startsWith("event:")) {
                eventType = line.slice(6).trim();
              } else if (line.startsWith("data:")) {
                eventData += line.slice(5).trim();
              }
            }
            if (eventData) {
              const payload = JSON.parse(eventData);
              if (eventType === "delta" && typeof payload.content === "string") {
                appendAssistantText(payload.content);
              } else if (eventType === "done" && typeof payload.assistant_message === "string") {
                setAssistantText(payload.assistant_message);
              } else if (eventType === "error") {
                throw new Error((_b = payload.message) != null ? _b : "Chat stream failed.");
              }
            }
            boundary = buffer.indexOf("\n\n");
          }
        }
      } catch (error) {
        const fallback = "The tower lost radio contact. Please retry this transmission.";
        console.error(error);
        setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
      } finally {
        setIsBusy(false);
      }
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FluentProvider, { theme: webLightTheme, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chatbubble-shell", children: [
      isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "chatbubble-panel", "aria-label": "AI Chat", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "chatbubble-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "chatbubble-header-title", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "chatbubble-header-subtitle", children: description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chatbubble-log", children: [
          messages.map((item, index) => {
            const isEmptyAssistantPlaceholder = item.role === "assistant" && item.content.trim().length === 0;
            if (isEmptyAssistantPlaceholder) {
              return null;
            }
            return /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: `chatbubble-message ${item.role}`, children: item.content }, `${item.role}-${index}`);
          }),
          isBusy && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chatbubble-message assistant", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: "tiny", labelPosition: "after", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: "Agent Plane Talk is taxiing for a response..." }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chatbubble-compose", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              resize: "vertical",
              value: draft,
              placeholder: "Send a message to the tower",
              onChange: (_, data) => setDraft(data.value),
              onKeyDown: (event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void sendMessage();
                }
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { appearance: "primary", onClick: () => void sendMessage(), disabled: !canSend, children: "Send" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "chatbubble-button",
          "aria-label": isOpen ? "Close chat" : "Open chat",
          onClick: () => setIsOpen((prev) => !prev),
          type: "button",
          children: isOpen ? "×" : "✈"
        }
      )
    ] }) });
  }
  let widgetRoot = null;
  function mount(options = {}) {
    var _a, _b, _c, _d;
    const host = (_a = options.container) != null ? _a : document.body;
    const mountNode = document.createElement("div");
    host.appendChild(mountNode);
    widgetRoot = clientExports.createRoot(mountNode);
    widgetRoot.render(
      /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ChatBubble,
        {
          apiBaseUrl: (_b = options.apiBaseUrl) != null ? _b : window.location.origin,
          title: (_c = options.title) != null ? _c : "Agent Plane Talk",
          description: (_d = options.description) != null ? _d : "Aviation humor, clear skies, text-only comms."
        }
      ) })
    );
  }
  function unmount() {
    if (widgetRoot) {
      widgetRoot.unmount();
      widgetRoot = null;
    }
  }
  window.SimpleChatBubble = {
    mount,
    unmount
  };
  exports.mount = mount;
  exports.unmount = unmount;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  return exports;
})({});
