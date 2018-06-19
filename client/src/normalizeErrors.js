// [{path: 'email', message: 'does not exist'}]
/*
https://www.youtube.com/watch?v=Mj4xJAVs2VQ&list=PLN3n1USn4xlkdRlq3VZ1sT6SGW0-yajjL&index=24
moment -> 28:54
{
  email: ['e1', 'e2'...]
}
*/

export default errors =>
  errors.reduce((acc, cv) => {
    if (cv.path in acc) {
      acc[cv.path].push(cv.message);
    } else {
      acc[cv.path] = [cv.message];
    }

    return acc;
  }, {});
