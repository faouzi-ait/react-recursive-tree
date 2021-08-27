import React, { useState } from 'react';
import RecursiveTree from './components/recursive_tree';
import { mockOrgTreeList } from './data';

function App() {
  const [selectedItem, setSelectedItem] = useState([]);

  const onSelect = (value) => {
    // HERE WE CHECK IF THE ITEM IS IN THE SELECTED LIST
    // IF YES, WE REMOVE IT, IF NO, WE ADD IT (WITH A SINGLE CLICK)
    // NOTE THAT THIS WILL BE MOVED INTO A UTILITY FUNCTION
    if (selectedItem.some((item) => item.id === value.id)) {
      let updatedSelectedList = [...selectedItem];
      updatedSelectedList = updatedSelectedList.filter(
        (item) => item.id !== value.id
      );
      setSelectedItem(updatedSelectedList);
    } else {
      setSelectedItem([...selectedItem, value]);
    }
  };

  // WE JUST CONSOLE LOG THE LIST OF ITEMS CHECKED
  console.log(selectedItem);

  return (
    <RecursiveTree
      listMeta={mockOrgTreeList}
      onSelectCallback={onSelect}
      list={selectedItem}
    />
  );
}

export default App;
