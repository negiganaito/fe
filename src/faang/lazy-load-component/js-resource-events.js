/* eslint-disable no-self-assign */
/* eslint-disable no-redeclare */
import { performanceAbsoluteNow } from '@/faang/utils/performance-absolute-now';

let i = 50,
  j = new Map();
function a(a, b, d) {
  a = a;
  b = (b = b) != null ? b : '';
  var e = j.get(a);
  e || j.set(a, (e = new Map()));
  a = e.get(b);
  a || e.set(b, (a = new Map()));
  e = a.get(d);
  e || a.set(d, (e = [0, []]));
  e[1][e[0]++ % i] = performanceAbsoluteNow();
}
function k(a, b, c) {
  var d = j.get(a);
  if (!d) return [];
  var e = [];
  for (
    var d = d,
      g = Array.isArray(d),
      h = 0,
      d = g
        ? d
        : d[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();
    ;

  ) {
    var i;
    if (g) {
      if (h >= d.length) break;
      i = d[h++];
    } else {
      h = d.next();
      if (h.done) break;
      i = h.value;
    }
    i = i;
    var k = i[0];
    i = i[1];
    for (
      var i = i,
        l = Array.isArray(i),
        m = 0,
        i = l
          ? i
          : i[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();
      ;

    ) {
      var n;
      if (l) {
        if (m >= i.length) break;
        n = i[m++];
      } else {
        m = i.next();
        if (m.done) break;
        n = m.value;
      }
      n = n;
      var o = n[0];
      n = n[1];
      for (
        var n = n[1],
          p = Array.isArray(n),
          q = 0,
          n = p
            ? n
            : n[
                typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'
              ]();
        ;

      ) {
        var r;
        if (p) {
          if (q >= n.length) break;
          r = n[q++];
        } else {
          q = n.next();
          if (q.done) break;
          r = q.value;
        }
        r = r;
        r >= b &&
          r <= c &&
          e.push({
            module: a,
            ref: k || null,
            type: o,
            time: r,
          });
      }
    }
  }
  return e.sort(function (a, b) {
    return a.time - b.time;
  });
}
function b(a, b) {
  var c = new Map();
  for (
    var d = j.keys(),
      e = Array.isArray(d),
      f = 0,
      d = e
        ? d
        : d[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();
    ;

  ) {
    var g;
    if (e) {
      if (f >= d.length) break;
      g = d[f++];
    } else {
      f = d.next();
      if (f.done) break;
      g = f.value;
    }
    g = g;
    var h = k(g, a, b);
    h.length && c.set(g, h);
  }
  return c;
}

export const JSResourceEvents = {
  notify: a,
  getEvents: k,
  getAllModuleEvents: b,
};
