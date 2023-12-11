function getMarkerId(a) {
  return a.i;
}
function getSampleRate(a) {
  return (a = a.r) != null ? a : 0;
}
function getSamplingMethod(a) {
  return (a = a.m) != null ? a : 1;
}

export const QPLEvent = {
  getMarkerId,
  getSampleRate,
  getSamplingMethod,
};
