import React from "react";

interface IAgeSelector {
  id: string;
  selectValue: number | undefined;
  onChangeHandler: (num: number) => void;
}

const AgeSelector = ({ id, selectValue, onChangeHandler }: IAgeSelector) => {
  return (
    <label htmlFor={id} className="text-white">
      Min Age
      <select
        id={id}
        name={id}
        value={selectValue}
        onChange={(e) => onChangeHandler(parseInt(e.target.value))}
        className="ml-2 border-[1px] border-black rounded-md border-none text-black p-2"
      >
        {[...Array(20)].map((_, index) => (
          <option key={index}>{index}</option>
        ))}
      </select>
    </label>
  );
};

export default AgeSelector;
