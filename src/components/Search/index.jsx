import Input from '../ui/Input';

const Search = ({ search, setSearch, className }) => {
  return (
    <form
      className={className}
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        id="search"
        type="text"
        role="searchbox"
        placeholder="Пошук"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default Search;
