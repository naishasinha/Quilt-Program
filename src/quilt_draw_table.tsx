import React from 'react';
import { RED, Square, Row, Quilt, rnil, qnil} from './quilt';
import { JsxList, jnil, jcompact, jcons } from './jsx_list';


/** Returns a TD that displays the square orientation as text. */
export const SquareTableElem = (props: {square: Square, key: number}): JSX.Element => {
  if (props.square.color == RED) {
    return <td key={props.key} className="sq-red">{props.square.corner}</td>;
  } else {
    return <td key={props.key} className="sq-green">{props.square.corner}</td>;
  }
}


/** Returns a list of TDs displaying each of the given squares. */
export const RowTableElems = (props: {row: Row, key: number}): JsxList => {

  if (props.row === rnil) {
    return jnil;
  } else {
    const cell = (
      SquareTableElem({square: props.row.hd, key: props.key})
    );

    const rest = RowTableElems({row: props.row.tl, key: props.key + 1});
    return jcons(cell, rest);
  }

}


/** Returns a TR displaying the given row. */
export const RowTableElem = (props: {row: Row, key: number}): JSX.Element => {
  return (<tr key={props.key}>
      {jcompact(RowTableElems({row: props.row, key: 0}))}
    </tr>);
};


/** Returns a list of TRs displaying each of the given rows. */
export const QuiltTableElems = (props: {quilt: Quilt, key: number}): JsxList => {
  if (props.quilt === qnil) {
    return jnil;
  } else {
    const cell = (
      RowTableElem({row: props.quilt.hd, key: props.key})
    );

    const rest = QuiltTableElems({quilt: props.quilt.tl, key: props.key + 1});
    return jcons(cell, rest);
  }
}


/** Returns a TABLE displaying the given quilt. */
export const QuiltTableElem = (props: {quilt: Quilt}): JSX.Element => {
  const rows = QuiltTableElems({ quilt: props.quilt, key: 0 });
  const rowsArray = jcompact(rows);

  return (
    <table>
      <tbody>{rowsArray}</tbody>
    </table>
  );
};
