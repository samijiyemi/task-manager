const add = (a, b) => {
  return new Promise((resolve, reject) => {
    resolve(a + b);
  });
};

const dowork = async () => {
  return "ogbenisamu";
};

console.log(dowork());
