export function ifRequired(a, b, c) {
  var e;
  // BUG
  // d &&
  //   d.call(null, [a], function (a) {
  //     e = a;
  //   });
  if (e && b) return b(e);
  else if (!e && c) return c();
}
