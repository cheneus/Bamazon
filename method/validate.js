var validateNum = (x) => {
  var reg = /^\d+$/;
  // console.log(letter.match(reg))
  return reg.test(x) || "should be a number"
}