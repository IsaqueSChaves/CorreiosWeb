//jshint esversion:6

exports.validate = function validate(texto) {

  const result = [];
  const regex = new RegExp(/[A-Z]{2}[0-9]{9}[A-Z]{2}/);
  var str = texto;
  var s = str.split(" ").join("");
  str = s;
  str = s.split("-").join("");

  for (var i = 0; i < str.length; i++) {
    var p = str.substr(i, 13);
    if (regex.test(p)) {
      result.push(p)
    }

    if (str.Length == i + 13) {
      break;
    }
  }
  return result;
}
