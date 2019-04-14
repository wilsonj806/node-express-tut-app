const deleteBtn = document.querySelector('.delete-art');
const deleteReq = () => {
  const { id } = deleteBtn.dataset;
  const endpoint = `/articles/${id}`;
  fetch(endpoint, {method: 'DELETE'})
    .then((res) => {
      console.log(res);
      window.location.href='/';
    })
    .catch((err) => {
      console.error(err);
    });
}

deleteBtn.addEventListener('click', deleteReq);