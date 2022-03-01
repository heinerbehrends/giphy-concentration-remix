import Search from '../components/Search';
import { useSearch } from '../logic/useSearch';
import styles from '~/styles/index.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function Home() {
  const { input, handleChange, handleSubmit } = useSearch();
  return (
    <Search
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      value={input}
    />
  );
}
