import performance from 'fbjs/lib/performance';

let b,
  i = function () {
    return Date.now();
  };
function a(a) {
  i = a;
}
if (
  performance.now &&
  performance.timing &&
  performance.timing.navigationStart
) {
  var j = performance.timing.navigationStart;
  b = function () {
    return performance.now() + j;
  };
} else
  b = function () {
    return i();
  };
b.setFallback = a;

export const performanceAbsoluteNow = b;
