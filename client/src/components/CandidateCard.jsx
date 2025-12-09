import React from "react";
import "./CandidateCard.css"; // animations + responsive styles

const CandidateCard = ({ candidate, onVote }) => {
  return (
    <div
      className="candidate-card"
      onClick={() => onVote(candidate._id || candidate.id)}
    >
      <div className="candidate-image-wrapper">
        {<img
  src={`${process.env.PUBLIC_URL}/img/${candidate.logo}`}
  alt={candidate.name}
  className="candidate-image"
/>

        }
      </div>

      <h3 className="candidate-name">{candidate.name}</h3>
      <p className="candidate-party">{candidate.party}</p>

      <button
        className="vote-button"
        onClick={(e) => {
          e.stopPropagation(); // prevents card click triggering vote
          onVote(candidate._id || candidate.id);
        }}
      >
        🗳️ Vote
      </button>
    </div>
  );
};

export default CandidateCard;

