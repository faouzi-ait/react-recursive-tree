import React, { Fragment, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Box from '@material-ui/core/Box';

const TreeItem = ({ onSelectCallback, label, isSelected, children }) => {
  const [isOpen, toggleItemOpen] = useState(null);
  const [selected, setSelected] = useState(isSelected);

  return (
    <div>
      <StyledTreeItem>
        {children.length > 0 && (
          <Box
            className="icon-container"
            onClick={() => toggleItemOpen(!isOpen)}>
            {isOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </Box>
        )}
        <StyledLabel
          className="label"
          onClick={(e) => {
            setSelected(!selected);
            onSelectCallback(e);
          }}
          style={{
            marginLeft: `${children.length === 0 ? '24px' : ''}`,
            background: `${selected ? '#d5d5d5' : ''}`,
          }}>
          {label}
        </StyledLabel>
      </StyledTreeItem>
      <StyledTreeChildren>{isOpen && children}</StyledTreeChildren>
    </div>
  );
};

const RecursiveTree = ({ listMeta, onSelectCallback }) => {
  const createTree = (branch) =>
    branch.branches && (
      <TreeItem
        id={branch.id}
        key={branch.id}
        onSelectCallback={(e) => {
          onSelectCallback(branch);
          // LOGIC TO SELECT CURRENT ITEM AND ALL CHILDREN
          /*
            - Check if there children
            - If yes:
              - loop through it and change the state to selected/true (pass the value a state??)
            - If not, only set the state to selected/true to this item
           */
          console.log(branch);
        }}
        isSelected={branch.selected}
        label={branch.label}>
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
  '&:hover': {
    cursor: 'pointer',
  },
});
const StyledTreeItem = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});
const StyledTreeChildren = styled(Box)({
  paddingLeft: '10px',
});
