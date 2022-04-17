async function newComment(e) {
  e.preventDefault();

  const post = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
  ];
  const comment_data = document.querySelector('#commentText').value.trim();

  const response = await fetch("/api/comments", {
          method: "POST",
          body: JSON.stringify({
            comment_data,
              post,
          }),
          headers: {
              'Content-Type': 'application/json',
          },
      });
      console.log(response);
  
  if (response.ok) {
      document.location.reload("/homepage");
  } else {
      console.log(response.statusText);
  }
}

document.querySelector("#commentform").addEventListener("submit", newComment);