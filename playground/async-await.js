const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        reject("Number must be a positive value");
      }

      resolve(a + b);
    }, 1000);
  });
};

const dowork = async () => {
  const sum = await add(1, 99);
  const sum2 = await add(sum, 50);
  const sum3 = await add(sum2, -3);
  return sum3;
};

dowork()
  .then((result) => {
    console.log("Result:", result);
  })
  .catch((err) => {
    console.log("Error:", err);
  });
