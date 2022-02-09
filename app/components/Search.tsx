import React, { ChangeEventHandler, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'remix';

type SearchProps = {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  value: string;
  nrOfCardsTurned: number;
};

export default function Search({
  handleSubmit,
  handleChange,
  value,
  nrOfCardsTurned,
}: SearchProps) {
  const navigate = useNavigate();
  return (
    <section className="search-section">
      {nrOfCardsTurned > 0 ? (
        <button className="replay-button" onClick={() => navigate(-1)}>
          Play again!
        </button>
      ) : null}

      <h1 className="heading">Search Giphy to start a game</h1>
      <form className="Form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          aria-label="Enter search term"
          placeholder={'Enter search term'}
          value={value}
          onChange={handleChange}
        />
        <button className="input button" type="submit">
          Go!
        </button>
      </form>
    </section>
  );
}
