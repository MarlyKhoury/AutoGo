import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBarComponent = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [InitialData, setInitialData] = useState([]);

  // console.log("search props ", props);
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
      // console.log("item ", JSON.stringify(item.first_name));
      // console.log("search query ", searchQuery)
      console.log("-------------------------------")
      if(item.first_name.toString().toLowerCase().includes(searchQuery?.toString().toLowerCase())){
        // console.log("item ---> ", JSON.stringify(item));
        filteredData.push(item);
        console.log("-------------------------------2")

        
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


  // return searchQuery?.some((newItem) => {
        // console.log("new item ", newItem)
          // return (
          //     item[newItem]
          //         .toString()
          //         .toLowerCase()
          //         .indexOf(q.toLowerCase()) > -1
          // );
      // });