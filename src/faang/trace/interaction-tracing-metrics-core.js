import performanceNowSinceAppStart from 'fbjs/lib/performanceNow';
import { addAnnotations } from '@/faang/utils/add-annotations';
import { HeroTracingPlaceholder } from './hero-tracing-placeholder';

var h = new Map(),
  i = new Map(),
  j = new Map(),
  k = {
    string: {},
    int: {},
    double: {},
    bool: {},
    string_array: {},
    int_array: {},
    double_array: {},
    bool_array: {},
  },
  l = {
    interactionCount: 0,
  };

const a = function () {
  var a = new Map(j),
    b = function (b) {
      a.forEach(function (a) {
        b(a);
      });
    },
    d = {
      addGlobalMetadata: function (a, b) {
        if (typeof b === 'number') {
          var e;
          addAnnotations(k, {
            int: ((e = {}), (e[a] = b), e),
          });
        } else if (typeof b === 'string') {
          addAnnotations(k, {
            string: ((e = {}), (e[a] = b), e),
          });
        } else if (typeof b === 'boolean') {
          addAnnotations(k, {
            bool: ((e = {}), (e[a] = b), e),
          });
        }
        d.addMetadata(a, b);
      },
      addMetadata: function (a, d) {
        b(function (b) {
          if (typeof d === 'number') {
            var e;
            addAnnotations(b.annotations, {
              int: ((e = {}), (e[a] = d), e),
            });
          } else if (typeof d === 'string') {
            addAnnotations(b.annotations, {
              string: ((e = {}), (e[a] = d), e),
            });
          } else if (typeof d === 'boolean') {
            addAnnotations(b.annotations, {
              bool: ((e = {}), (e[a] = d), e),
            });
          }
        });
      },
      addRequireDeferred: function (a, c) {
        var d = [];
        b(function (b) {
          if (b.requireDeferreds[a] != null) return;
          b = b.requireDeferreds[a] = {
            start: c,
          };
          d.push(b);
        });
        return function (a, b) {
          d.forEach(function (d) {
            (d.end = a), (d.duration = a - c), b && (d.alreadyRequired = !0);
          });
        };
      },
      forEach: function (a) {
        b(function (b) {
          a(b);
        });
      },
    };
  return d;
};

var m = {
  addFactoryTiming: function (a, b) {
    a = i.get(a);
    if (!a) return;
    a.factoryTimings.push(b);
  },
  addGlobalMetadata: function (a, b, d) {
    if (typeof d === 'number') {
      var e;
      addAnnotations(k, {
        int: ((e = {}), (e[b] = d), e),
      });
      m.addAnnotationInt(a, b, d);
    } else if (typeof d === 'string') {
      addAnnotations(k, {
        string: ((e = {}), (e[b] = d), e),
      });
      m.addAnnotation(a, b, d);
    } else if (typeof d === 'boolean') {
      addAnnotations(k, {
        bool: ((e = {}), (e[b] = d), e),
      });
      m.addAnnotationBoolean(a, b, d);
    }
  },
  addHeroBootload: function (a, b) {
    a = i.get(a);
    if (!a) return;
    a.heroBootloads.push(b);
  },
  addHeroRelay: function (a, b) {
    a = i.get(a);
    if (!a) return;
    a.heroRelay.push(b);
  },
  addHeroPendingPlaceholders: function (a, b) {
    a = i.get(a);
    if (!a) return;
    a.pendingPlaceholders = a.pendingPlaceholders.concat(b);
  },
  addHiddenTiming: function (a, b) {
    a = i.get(a);
    if (!a) return;
    a.hiddenTimings = b;
  },
  addImagePreloader: function (a, b, c) {
    a = i.get(a);
    if (!a) return;
    a.imagePreloaderTimings[b] = c;
  },
  addMarkerPoint: function (a, b, d, e, f) {
    e === void 0 && (e = performanceNowSinceAppStart());
    a = i.get(a);
    if (!a) return;
    e >= a.start &&
      ((a.markerPoints[b] = {
        timestamp: e,
        type: d,
      }),
      f && (a.markerPoints[b].data = f));
  },
  addFirstMarkerPoint: function (a, b, c, d, e) {
    e === void 0 && (e = {});
    a = i.get(a);
    if (!a) return;
    var f = a.markerPoints[b];
    d >= a.start &&
      (!f || f.timestamp > d) &&
      ((a.markerPoints[b] = {
        timestamp: d,
        type: c,
      }),
      e && (a.markerPoints[b].data = e));
  },
  addMetadata: function (a, b, d) {
    a = i.get(a);
    if (!a) return;
    if (typeof d === 'number') {
      var e;
      addAnnotations(a.annotations, {
        int: ((e = {}), (e[b] = d), e),
      });
    } else if (typeof d === 'string') {
      addAnnotations(a.annotations, {
        string: ((e = {}), (e[b] = d), e),
      });
    } else if (typeof d === 'boolean') {
      addAnnotations(a.annotations, {
        bool: ((e = {}), (e[b] = d), e),
      });
    }
  },
  addAnnotation: function (a, b, d) {
    a = i.get(a);
    if (a) {
      addAnnotations(a.annotations, {
        string: ((a = {}), (a[b] = d), a),
      });
    }
  },
  addAnnotationInt: function (a, b, d) {
    a = i.get(a);
    if (a) {
      addAnnotations(a.annotations, {
        int: ((a = {}), (a[b] = d), a),
      });
    }
  },
  addAnnotationDouble: function (a, b, d) {
    a = i.get(a);
    if (a) {
      addAnnotations(a.annotations, {
        double: ((a = {}), (a[b] = d), a),
      });
    }
  },
  addAnnotationBoolean: function (a, b, d) {
    a = i.get(a);
    if (a) {
      addAnnotations(a.annotations, {
        bool: ((a = {}), (a[b] = d), a),
      });
    }
  },
  addAnnotationStringArray: function (a, b, d) {
    a = i.get(a);
    if (a) {
      addAnnotations(a.annotations, {
        string_array: ((a = {}), (a[b] = d), a),
      });
    }
  },
  addAnnotationIntArray: function (a, b, d) {
    a = i.get(a);
    if (a) {
      addAnnotations(a.annotations, {
        int_array: ((a = {}), (a[b] = d), a),
      });
    }
  },
  addAnnotationDoubleArray: function (a, b, d) {
    a = i.get(a);
    if (a) {
      addAnnotations(a.annotations, {
        double_array: ((a = {}), (a[b] = d), a),
      });
    }
  },
  addAnnotationBooleanArray: function (a, b, d) {
    a = i.get(a);
    if (a) {
      addAnnotations(a.annotations, {
        bool_array: ((a = {}), (a[b] = d), a),
      });
    }
  },
  addOfflineTiming: function (a, b) {
    a = i.get(a);
    if (!a) return;
    a.offlineTimings = b;
  },
  addPayloadResource: function (a, b, c) {
    a = i.get(a);
    if (!a) return;
    a.payloadResources[b] = c;
  },
  addPayloadTiming: function (a, b, c) {
    a = i.get(a);
    if (!a) return;
    a.payloadTimings[b] = c;
  },
  addReactRender: function (a, b, c, d, e, f, g) {
    a = i.get(a);
    if (!a) return;
    e = {
      actualDuration: e,
      baseDuration: f,
      duration: d - c,
      end: d,
      phase: g,
      start: c,
    };
    a.reactRender[b] ? a.reactRender[b].push(e) : (a.reactRender[b] = [e]);
    a.commitSet.add(d);
  },
  addSubspan: function (a, b, c, d, e, f) {
    a = i.get(a);
    if (!a) return;
    f = {
      data: f,
      end: e,
      start: d,
      type: c,
    };
    a.subSpans[b] ? a.subSpans[b].push(f) : (a.subSpans[b] = [f]);
  },
  addMountPoint: function (a, b, c) {
    c = 'Mount_' + c;
    m.addFirstMarkerPoint(a, c, 'VisualCompletion', b);
  },
  addMountPointMetadata: function (a, b, c) {
    a = m.get(a);
    b = 'Mount_' + b;
    a = a == null ? void 0 : a.markerPoints[b];
    if (a) {
      var d = a.data || {};
      a.data = d;
      Object.keys(c).forEach(function (a) {
        d[a] = c[a];
      });
    }
  },
  addTag: function (a, b, c) {
    a = i.get(a);
    if (!a) return;
    a.tagSet[b] || (a.tagSet[b] = new Set());
    a.tagSet[b].add(c);
  },
  addTracedInteraction: function (a, b, c) {
    b = {
      annotations: {
        string: {},
        int: {},
        double: {},
        bool: {},
        string_array: {},
        int_array: {},
        double_array: {},
        bool_array: {},
      },
      commitSet: new Set(),
      factoryTimings: [],
      hasVcReport: !1,
      heroBootloads: [],
      heroRelay: [],
      hiddenTimings: [],
      imagePreloaderTimings: {},
      lateMutationIgnoreElements: new Set(),
      markerPoints: {},
      navigationTiming: {},
      offlineTimings: [],
      payloadResources: {},
      payloadTimings: {},
      pendingPlaceholders: [],
      reactRender: {},
      requireDeferreds: {},
      start: b,
      subSpans: {},
      tagSet: {},
      traceId: a,
      vcStateLog: null,
      wasCanceled: !1,
      wasOffline: !1,
    };
    for (var d in k) for (var e in k[d]) b.annotations[d][e] = k[d][e];
    i.set(a, b);
    j.set(a, b);
    h.set(a, c);
    l.interactionCount++;
    return b;
  },
  complete: function (a) {
    var b = i.get(a);
    if (b && b.completed == null) {
      addAnnotations(b.annotations, {
        int: {
          endedByHeroComplete: 1,
        },
      });
      b.completed = performanceNowSinceAppStart();
      var d = h.get(a);
      d && d(b);
      h['delete'](a);
      j['delete'](a);
    }
  },
  currentInteractionLogger: a,
  dump: function () {
    var a = {},
      b = Array.from(i.values());
    b.sort(function (a, b) {
      return a.start - b.start;
    }).forEach(function (b) {
      var c = b.traceId,
        e = HeroTracingPlaceholder.HeroPendingPlaceholderTracker.dump(
          b.traceId
        );
      a[c] = Object.assign({}, b, {
        pendingPlaceholders: e,
        e2e:
          b.completed != null
            ? ((b.completed - b.start) / 1e3).toFixed(2)
            : '?',
      });
    });
    return a;
  },
  get: function (a) {
    return i.get(a);
  },
  removeMarkerPoint: function (a, b) {
    a = i.get(a);
    a && delete a.markerPoints[b];
  },
  setInteractionClass: function (a, b) {
    a = i.get(a);
    a && (a.interactionClass = b);
  },
  setInteractionType: function (a, b, c, d) {
    a = i.get(a);
    a && ((a.interactionClass = b), (a.type = c), (a.qplEvent = d));
  },
  delete: function (a) {
    i['delete'](a);
  },
  getInteractionStat: function () {
    return l;
  },
};

export const InteractionTracingMetricsCore = m;
