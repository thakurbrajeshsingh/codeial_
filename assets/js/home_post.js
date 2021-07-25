{

    // method to submit the form data from new post using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data :newPostForm.serialize(),   // serialize converts data to json data key:value
                success:function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create post 
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>
          <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id}"
              >Delete</a>
          </small>
         ${post.content}
          <br/>
          <small>
           ${post.user.name}
            </small>
        </p>
        <div class="post-comments">
        <form action="/comments/create" method="POST">
        <input type="text" name="content" placeholder="Type Here to add comment..." required >
            <input type="hidden" name="post" value="${post._id}" />
            <input type="submit" value="Add Comment" />
          </form>
  
      
          <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
              
            </ul>
          </div>
        </div>
      </li> `)

    }
// creating delete post from dom

let deletePost = function(deleteLink){
$(deleteLink).click(function(e){
  e.preventDefault();
  $.ajax({
    type:'get',
    url:$(deleteLink).prop('href'),
    success:function(data){
      $(`#post-${data.data.post_id}`).remove();

    },error:function(error){
      console.log(error.responseText)
    }
  })
})
}




    createPost();
}