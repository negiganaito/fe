import { PromiseAnnotate } from '@/faang/utils';
import { JSResourceEvents } from './js-resource-events';
import { ifRequireable } from './if-requireable';
import { ifRequired } from './if-required';

let j = function (a) {
    return a;
  },
  k = [],
  l = null;
function m(a) {
  l ? a(l) : k.push(a);
}
let n = 'JSResource: unknown caller';

export const JSResourceReferenceImpl = (function () {
  a.setBootloader = function (a) {
    l = a;
    for (a = 0; a < k.length; a++) {
      var b = k[a];
      b(l);
    }
    k = [];
  };
  function a(a) {
    this.$1 = a;
  }
  var e = a.prototype;
  e.getModuleId = function () {
    var a = this.$1;
    return a;
  };
  e.getModuleIdAsRef = function () {
    return this.$1;
  };
  e.load = function () {
    var a = this,
      c = this.$2;
    JSResourceEvents.notify(this.$1, c, 'LOADED');
    var e = new Promise(function (b) {
      m(function (e) {
        return e.loadModules(
          [a.getModuleIdAsRef()],
          function (e) {
            JSResourceEvents.notify(a.$1, c, 'PROMISE_RESOLVED'), b(e);
          },
          (e = a.$2) != null ? e : n
        );
      });
    });
    PromiseAnnotate.setDisplayName(e, 'Bootload(' + this.getModuleId() + ')');
    return e;
  };
  e.preload = function () {
    var a,
      b = this,
      c = (a = this.$2) != null ? a : n;
    m(function (a) {
      return a.loadModules(
        [b.getModuleIdAsRef()],
        function () {},
        'preload: ' + c
      );
    });
  };
  e.equals = function (a) {
    return this === a || this.$1 == a.$1;
  };
  e.getModuleIfRequireable = function () {
    JSResourceEvents.notify(this.$1, this.$2, 'ACCESSED');
    return ifRequireable.call(null, this.$1, j);
  };
  e.getModuleIfRequired = function () {
    JSResourceEvents.notify(this.$1, this.$2, 'ACCESSED');
    return ifRequired.call(null, this.$1, j);
  };
  a.disableForSSR_DO_NOT_USE = function () {
    this.$3 = !1;
  };
  e.isAvailableInSSR_DO_NOT_USE = function () {
    return this.constructor.$3;
  };
  e.__setRef = function (a) {
    this.$2 = a;
    JSResourceEvents.notify(this.$1, this.$2, 'CREATED');
    return this;
  };
  a.loadAll = function (a, b) {
    var c = {},
      e = !1;
    for (
      var f = a,
        g = Array.isArray(f),
        h = 0,
        // eslint-disable-next-line no-redeclare
        f = g
          ? f
          : f[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();
      ;

    ) {
      var i;
      if (g) {
        if (h >= f.length) break;
        i = f[h++];
      } else {
        h = f.next();
        if (h.done) break;
        i = h.value;
      }
      // eslint-disable-next-line no-self-assign
      i = i;
      var j = i.$2;
      j && ((e = !0), (c[j] = !0));
      JSResourceEvents.notify(i.$1, j, 'LOADED');
    }
    m(function (d) {
      return d.loadModules(
        a.map(function (a) {
          return a.getModuleId();
        }),
        b,
        e ? Object.keys(c).join(':') : 'JSResource: unknown caller'
      );
    });
  };
  return a;
})();

JSResourceReferenceImpl.$3 = !0;
