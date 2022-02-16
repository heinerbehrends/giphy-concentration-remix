import { ChangeEventHandler, FormEventHandler } from 'react';
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
}: SearchProps) {
  return (
    <section className="search-section">
      <h1>Search Giphy to start a game</h1>
      <Form className="Form" onSubmit={handleSubmit}>
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
      </Form>
    </section>
  );
}
