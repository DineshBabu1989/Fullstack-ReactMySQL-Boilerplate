import React from "react";
/**
 * Helper function for rendering Table rows
 * @param {row,deleRow,editRow,id} param from the Table component
 * @returns "A single row containing data from a single object"
 */
const TableRow = ({ row, deleteRow, editRow, id }) => (
  <tr>
    <td>{id}</td>
    <td>{row.id}</td>
    <td>{row.name}</td>
    <td>{row.age}</td>
    <td>{row.job}</td>
    <td>
      <button onClick={() => deleteRow(row.id)}>delete</button>
      <button onClick={() => editRow(row.id)}>update</button>
    </td>
  </tr>
);
/**
 * Table containing all entries in "details" state from detail component
 * @prop {detailProp, passClick,editClick} props "from the details component"
 * @returns "A list of rows containing student information"
 */
const Table = props => {
  return (
    <table>
      <tbody>
        <tr>
          <th>S.No</th>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Job</th>
        </tr>
        {props.detailProp.map((detail, i) => {
          return (
            <TableRow
              id={i}
              key={detail.id}
              row={detail}
              deleteRow={props.passClick}
              editRow={props.editClick}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
