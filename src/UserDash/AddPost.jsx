const AddPost = () => {
  return (
    <div>
      This page will have a form with the following fields: Author Image Author
      Name Author Email Post Title Post Description Tag (Select a tag from the
      dropdown. Use the React-select npm package. Implementing this package is
      optional.) UpVote (By default zero) (you can take this as an input field
      or direct add to the object) DownVote (By default zero) (you can take this
      as an input field or direct add to the object) Note: A normal user can add
      up to 5 posts. If he/she exceeds the post count, the Add Post Page will
      only show the Become a Member button with a relevant message. Hide the
      form. On clicking the Become a Member, users will be redirected to the
      Membership Page. Hints: When the user visits this “Add Post” page hit an
      API to get the count of posts he made from the posts collection then
      render this “Become a Member” button or post form depending on the post
      count.
    </div>
  );
};

export default AddPost;
