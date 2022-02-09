import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useSearch() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  // const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(encodeURIComponent(input));
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }
  return { input, handleChange, handleSubmit };
}
