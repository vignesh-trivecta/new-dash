import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { getInstrumentDetails } from "@/app/api/basket/route";

const Selector = () => {
  const [equityList, setEquityList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [showResults, setShowResults] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      let details = await getInstrumentDetails();
      setEquityList(details);
    }
    fetchData();

  }, []);


  return (
    <div className='font-normal text-gray-500' style={{height: '50px'}}>
      <div className='flex items-center justify-between sticky top-0 bg-white rounded-md border border-gray-300 '>
        <div>
        <AiOutlineSearch size={18} className="text-gray-700" />
        </div>
        <input 
          type='text'
          value={inputValue}
          placeholder={'Search stock..'}
          className={`placeholder:text-gray-500 p-2 focus:ring-0 border-none w-40`}
          onChange={(e) => {
            const searchValue = e.target.value.toLowerCase();
            setInputValue(searchValue);
            setShowResults(searchValue !== "");
          }}
          
        />
      </div>
      {showResults && (
        <ul className={`relative bg-white mt-2 overflow-y-auto overflow-x-hidden`} >
          {equityList.map((data, index) => (
            <li
              key={index}
              className={`p-2 text-sm bg-gray-100 hover:bg-sky-600 truncate  ${data.instrumentName && data.instrumentName.toLowerCase().startsWith(inputValue) ? "block" : "hidden" }`}
              onClick={() => {
                if (data.instrumentName.toLowerCase() !== selected.toLowerCase()) {
                  setInputValue(data.instrumentName);
                  setSelected(data.instrumentName);
                  setShowResults(false);
                }
              }}
            >
              {data.instrumentName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Selector;