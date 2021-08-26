import React from "react"
import RecursiveTree from "./components/recursive_tree";
import { mockOrgTreeList } from "./data";

const onSelect = (value) => {
  // You can put whatever here
  // console.log("you clicked: " + value.label)
}

function App() {
  return (
    <>
      <RecursiveTree
        listMeta={mockOrgTreeList}
        onSelectCallback={onSelect}
      />
    </>
  );
}

export default App;

