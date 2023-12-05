async function catchAsync(func, errFunc) {
  try {
    func();
  } catch(err) {
    errFunc(err);
  }
}