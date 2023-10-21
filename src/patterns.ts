import { Quilt, qnil, rnil, Row, rcons, NW, qcons, ROUND, STRAIGHT, SE, NE, SW, Color, GREEN} from './quilt';


/** Returns a quilt in pattern "A". */
export const PatternA = (n: number, c?: Color): Quilt => {

  if (n < 0) {
    throw new Error("The number cannot be negative.");
  }

  let col = null;
  if (c === undefined) {
    col = GREEN;
  } else {
    col = c;
  }

  const row: Row = rcons({shape: ROUND, color: col, corner: NW}, rcons({shape: ROUND, color: col, corner: NW}, rnil));

  if (n === 0) {
    return qnil;
  } else {
    const quiltPattern: Quilt = qcons(row, PatternA(n - 1, c));
    return quiltPattern;
  }
  
}

/** Returns a quilt in pattern "B". */
export const PatternB = (n: number, c?: Color): Quilt => {

  if (n < 0) {
    throw new Error("The number cannot be negative.");
  }

  let col = null;
  if (c === undefined) {
    col = GREEN;
  } else {
    col = c;
  }

  const row: Row = rcons({shape: STRAIGHT, color: col, corner: SE}, rcons({shape: STRAIGHT, color: col, corner: NW}, rnil));

  if (n === 0) {
    return qnil;
  } else {
    const quiltPattern: Quilt = qcons(row, PatternB(n - 1, c));
    return quiltPattern;
  }
}

/** Returns a quilt in pattern "C". */
export const PatternC = (n: number, c?: Color): Quilt => {

  if (n < 0 || (n % 2 === 1)) {
    throw new Error("The number cannot be negative or odd.");
  }

  let col = null;
  if (c === undefined) {
    col = GREEN;
  } else {
    col = c;
  }

  // [s_c, t_c]
  const row1: Row = rcons({shape: ROUND, color: col, corner: NE}, rcons({shape: ROUND, color: col, corner: NW}, rnil));

  // [u_c, v_c]
  const row2: Row = rcons({shape: ROUND, color: col, corner: SE}, rcons({shape: ROUND, color: col, corner: SW}, rnil));

  if (n === 0) {
    return qnil;
  } else {
    const quiltPattern: Quilt = qcons(row1, qcons(row2, PatternC(n - 2, c)));
    return quiltPattern;
  }

}

/** Returns a quilt in pattern "D". */
export const PatternD = (n: number, c?: Color): Quilt => {

  if (n < 0 || (n % 2 === 1)) {
    throw new Error("The number cannot be negative or odd.");
  }

  let col = null;
  if (c === undefined) {
    col = GREEN;
  } else {
    col = c;
  }

  const row1: Row = rcons({shape: ROUND, color: col, corner: SE}, rcons({shape: ROUND, color: col, corner: SW}, rnil));
  const row2: Row = rcons({shape: ROUND, color: col, corner: NE}, rcons({shape: ROUND, color: col, corner: NW}, rnil));

  if (n === 0) {
    return qnil;
  } else {
    const quiltPattern: Quilt = qcons(row1, qcons(row2, PatternD(n - 2, c)));
    return quiltPattern;
  }

}

/** Returns a quilt in pattern "E". */
export const PatternE = (n: number, c?: Color): Quilt => {

  if (n < 0) {
    throw new Error("The number cannot be negative.");
  }

  let col = null;
  if (c === undefined) {
    col = GREEN;
  } else {
    col = c;
  }

  // [s_c, t_c]
  const row1: Row = rcons({shape: STRAIGHT, color: col, corner: NW}, rcons({shape: STRAIGHT, color: col, corner: SE}, rnil));

  // [u_c, v_c]
  const row2: Row = rcons({shape: STRAIGHT, color: col, corner: SE}, rcons({shape: STRAIGHT, color: col, corner: NW}, rnil));

  if (n === 0) {
    return qnil;
  } else if (n === 1) {

    const quiltPattern: Quilt = qcons(row1, qnil);
    return quiltPattern;

  } else {

    const quiltPattern: Quilt = qcons(row1, qcons(row2, PatternE(n - 2, c)));
    return quiltPattern;

  }

}
