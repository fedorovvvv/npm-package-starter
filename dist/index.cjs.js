Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const holla = "HELLO";
const log = (msg) => {
  console.log(msg);
};
log(`${holla} World!!!`);
exports.log = log;
