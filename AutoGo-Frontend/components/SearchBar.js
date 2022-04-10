import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBarComponent = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [InitialData, setInitialData] = useState([]);

  
useEffect(()=>{
  console.log("props data ", JSON.stringify(props?.data))
  setInitialData(props?.data);
}, [])

useEffect(()=>{
  onChangeSearch
}, [searchQuery])

  const onChangeSearch = (query) => {
    console.log("InitialData ", InitialData)
    let filteredData = [];
    console.log("query ", query);
    setSearchQuery(query)
    if(InitialData && InitialData!==undefined)
    InitialData?.filter((item) => {
      
      
      if(item.first_name.toString().toLowerCase().includes(searchQuery?.toString().toLowerCase())){
       
        filteredData.push(item);
       

        
      }
      
    });
    console.log(" fil data ----> ", filteredData && JSON.stringify(filteredData))
    if(filteredData && filteredData !=undefined)
    props.setData(filteredData);
    
  };

  
  
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export default SearchBarComponent;
