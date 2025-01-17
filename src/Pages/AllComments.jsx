import { useParams } from "react-router-dom";

const AllComments = () => {
  const { id } = useParams();

  return (
    <div className="space-y-10" >
      <h2>all comments will appear {id}</h2>

      <p>
        The user can Report a comment on the Comment page. Show comments in
        tabular form where each row will have the email of the commenter, the
        comment text, feedback, and a Report button.
      </p>

      <p>
        The user can Report a comment on the Comment page. Show comments in
        tabular form where each row will have the email of the commenter, the
        comment text, feedback, and a Report button.
      </p>

      <p>
        Note: Note: The comment column will text up to 20 characters in length.
        If the said length exceeds, there will be ellipses with the Read More
        link. On clicking the Read More link, he/she will see the full comment
        on a modal.
      </p>
    </div>
  );
};

export default AllComments;
