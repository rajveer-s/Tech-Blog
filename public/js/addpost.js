async function newPost(event) {
  event.preventDefault();

  const title = document.querySelector('#postTitle').value;
  const content = document.querySelector('#postDes').value;

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#newPost').addEventListener('submit', newPost);