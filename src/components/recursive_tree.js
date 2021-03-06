import React, { Fragment, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';

import '../app.css';

const TreeItem = ({ onSelectCallback, label, isSelected, children }) => {
  const [isOpen, toggleItemOpen] = useState(true);
  const [selected, setSelected] = useState(isSelected);

  return (
    <div>
      <StyledTreeItem>
        {children.length > 0 && (
          <Box onClick={() => toggleItemOpen(!isOpen)}>
            {isOpen ? (
              <ExpandMoreIcon className="chevron" />
            ) : (
              <ChevronRightIcon className="chevron" />
            )}
          </Box>
        )}
        <StyledLabel
          onClick={(e) => {
            setSelected(!selected);
            onSelectCallback(e);
          }}
          style={{
            marginLeft: `${children.length === 0 ? '24px' : ''}`,
            background: `${selected ? 'yellow' : ''}`,
          }}>
          {label}
        </StyledLabel>
      </StyledTreeItem>
      <StyledTreeChildren>{isOpen && children}</StyledTreeChildren>
    </div>
  );
};

const RecursiveTree = ({ listMeta, onSelectCallback, list }) => {
  // SELECTED ITEMS PASSED HERE 
  console.log(list);

  const createTree = (branch) =>
    branch.branches && (
      <TreeItem
        id={branch.id}
        key={branch.id}
        onSelectCallback={(e) => onSelectCallback(branch)}
        isSelected={branch.selected}
        label={
          <div>
            <input type="checkbox" className="checkbox" /* checkbox state TBD here */ /> {branch.label}
          </div>
        }>
        {branch.branches.map((branch) => {
          return <Fragment key={branch.id}>{createTree(branch)}</Fragment>;
        })}
      </TreeItem>
    );

  return (
    <Box>
      {listMeta.map((branch, i) => (
        <Box key={i}>{createTree(branch)}</Box>
      ))}
    </Box>
  );
};

export default RecursiveTree;

// styles
const StyledLabel = styled(Box)({
  height: '24px',
  fontSize: '13px',
  '&:hover': {
    cursor: 'pointer',
  },
});
const StyledTreeItem = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: '-7px',
});
const StyledTreeChildren = styled(Box)({
  paddingLeft: '10px',
});
