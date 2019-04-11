import React from "react";

export default function Question({ question }) {
  return (
    <div>
      {question.text}

      <div>
        {question.answers.map((answer, index) => (
          <p key={index}>{answer}</p>
        ))}
      </div>
    </div>
  );
}
