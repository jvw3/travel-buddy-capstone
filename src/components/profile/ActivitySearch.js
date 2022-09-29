

export const ActivitySearch = ({ setterFunction }) => {
  return (
    <div className="search_header">
      <div>
        <label htmlFor="search">What candy are you looking for?</label>
      </div>
      <div>
        <input
          onChange={(changeEvent) => {
            setterFunction(changeEvent.target.value);
          }}
          type="text"
          placeholder="Search Activities"
        />
      </div>
    </div>
  );
};