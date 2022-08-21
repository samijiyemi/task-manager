const sumUpTo = (n) => {
  let total = 0;
  for (let i = 1; i < n; i++) {
    total += 1;
  }
  return total;
};

let t1, t2;

// measure sumUpTo
t1 = Date.now();
sumUpTo(25000000);
t2 = Date.now();
console.log(`The sumUpTo is ${(t2 - t1) / 1000} seconds`);

const sumUpToV2 = (n) => {
  return (n * (n + 1)) / 2;
};

// measure sumV2
t1 = Date.now();
sumUpToV2(25000000);
t2 = Date.now();
console.log(`The sumUpTo is ${(t2 - t1) / 1000} seconds`);
