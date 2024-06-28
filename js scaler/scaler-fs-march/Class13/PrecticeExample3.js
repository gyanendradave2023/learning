const list = [
  {
    id: 1,
    title: "Product 1",
    description: "Awesome product",
  },
  {
    id: 2,
    title: "Product 2",
    description: "Awesome product",
  },
  {
    id: 3,
    title: "Product 3",
    description: "Awesome product",
  },
];

const fetchList = (delay, limit) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (limit > list.length) {
        reject("Out of limit");
      } else {
        const data = list.slice(0, limit);
        resolve(data);
      }
    }, delay);
  });
};

// fetchList(3000, 5)
//     .then(data => console.log(data))
//     .catch(err => console.error(err));

//Old way for handle error
// async function fetchListData1() {
//   const data = await fetchList(10000, 3);
//   console.log(data);
// }

// fetchListData1().catch((err) => {
//   console.error(err);
// });

//New way for handle error
// async function fetchListData() {
//   try {
//     const data = await fetchList(5000, 2);
//     console.log(data);
//   } catch (e) {
//     console.log(e);
//   }
// }
// fetchListData();

// myFetch(3000, 3)
// myFetch(1000, 1)
// myFetch(2000, 2)

// A. Chaining

// fetchList(3000, 3)
//     .then((data) => {
//         console.log(data);
//         return fetchList(5000, 1);
//     })
//     .then((data) => {
//         console.log(data);
//         return fetchList(8000, 2);
//     })
//     .then((data) => {
//         console.log(data);      
//     })
//     .catch(err => console.error(err));
  
// async function fetchListData() {
//   try {
//     const data = await fetchList(2000, 2);
//     console.log(data);

//     const data1 = await fetchList(5000, 1);
//     console.log(data1);

//     const data2 = await fetchList(1000, 3);
//     console.log(data2);
//   } catch (e) {
//     console.log(e);
//   }
// }
// fetchListData();



//Promise.all([fetchList(2000, 5), fetchList(5000, 2), fetchList(3000, 3)])
//Promise.allSettled([fetchList(2000, 5), fetchList(5000, 2), fetchList(3000, 3)])
//Promise.race([fetchList(2000, 5), fetchList(5000, 2), fetchList(3000, 3)])
Promise.any([fetchList(2000, 1), fetchList(5000, 5), fetchList(1000, 3)])
.then(data => {console.log(data)})
.catch(err => console.error(err));
// A function to take (delay, limit),
// which return data with limit
// in case limit > 3, through error
/*
const myFetch = function(delay, limit) {
    // code goes here
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (limit > list.length) {
                reject("Out of limit");
            } else {
                const data = list.slice(0, limit);
                resolve(data);
            }
        }, delay);
    })
}
*/
// Promise Chaining
// myFetch(3000, 4)
//     .then((data) => console.log(data))
//     .catch(err => console.log(err));
// Product1, Product 2

// ES6 - async/await
// async function fetchListData() {
//     try {
//         const data = await myFetch(3000, 5);
//         console.log(data);
//     } catch(e) {
//         console.log(e);
//     }
// }

// fetchListData();

// Scenario 1: Fetch below data in sequence

// myFetch(3000, 3)
// myFetch(1000, 1)
// myFetch(2000, 2)

// A. Chaining
/*
myFetch(6000, 3)
    .then(function(data) {
        console.log(data)
        return myFetch(4000, 1);
    })
    .then(function(data) {
        console.log(data)
        return myFetch(5000, 2);
    })
    .then(function(data) {
        console.log(data)
        console.log('Done!')
    })
    .catch((e) => {
        console.log(e);
    })
    .finally(function() {
        console.log('Finally Done!');
    });
    */

// B. async/await

// async function getData() {
//     try {
//         const data1 = await myFetch(6000, 3);
//         console.log(data1);

//         const data2 = await myFetch(4000, 1)
//         console.log(data2);

//         const data3 = await myFetch(5000, 2)
//         console.log(data3);
//     } catch(e) {
//         console.log(e);
//     }
// }

// getData();

// Scenario 2: Fetch below data in parallel (terminate asap)

// myFetch(3000, 3)
// myFetch(1000, 1)
// myFetch(2000, 2)

// Promise.all([myFetch(5000, 3),myFetch(1000, 5), myFetch(3000, 2) ])
//     .then(function(data) {
//         console.log(data); // array of results
//     })
//     .catch(function(e) {
//         console.log(e);
//     });

// Scenario 3: Fetch below data in parallel (don't terminate)

// Promise.allSettled([myFetch(5000, 3),myFetch(1000, 5), myFetch(3000, 2) ])
//     .then(function(data) {
//         console.log(data); // array of results
//     });

// Scenario 3: Fetch below data in parallel (return result asap)

// Promise.race([myFetch(10000, 3),myFetch(2000, 3), myFetch(2000, 5) ])
//     .then(function(data) {
//         console.log(data); // array of results
//     })
//     .catch(function(e) {
//         console.log(e);
//     });

// Scenario 4: Fetch below data in parallel (return any success)

// Promise.any([myFetch(10000, 3),myFetch(2000, 5), myFetch(5000, 3) ])
//     .then(function(data) {
//         console.log(data); // array of results
//     })
//     .catch(function(e) {
//         console.log(e);
//     });
