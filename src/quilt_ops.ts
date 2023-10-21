import { Square, Row, rconcat, Quilt, qnil, qcons, qconcat, NW, NE, SW, SE, rnil, rcons} from './quilt';


/** Returns the same square but flipped vertically. */
export const sflip_vert = (s: Square): Square => {
  let newSquare: Square = {shape: s.shape, color: s.color, corner: s.corner}


  if (s.corner === NW) {
    newSquare.corner = SW;
  } else if (s.corner === NE) {
    newSquare.corner = SE;
  } else if (s.corner === SW) {
    newSquare.corner = NW;
  } else if (s.corner === SE) {
    newSquare.corner = NE;
  }

  return newSquare;

}

/** Returns the same row but flipped vertically. */
export const rflip_vert = (r: Row): Row => {
    if (r === rnil) {
      return rnil;
    } else {
      const flipped_front = rcons(sflip_vert(r.hd), rnil);
      const L = r.tl;

      return rconcat(flipped_front, rflip_vert(L));


    }
}

/** Returns the same quilt but flipped vertically. */
export const qflip_vert = (q: Quilt): Quilt => {
    if (q === qnil) {
      return qnil;
    } else {
      const flipped_front = qcons(rflip_vert(q.hd), qnil);
      const L = q.tl;

      return qconcat(qflip_vert(L), flipped_front);
    }

}


/** Returns the same square but flipped horizontally. */
export const sflip_horz = (s: Square): Square => {
  let newSquare: Square = {shape: s.shape, color: s.color, corner: s.corner}


  if (s.corner === NW) {
    newSquare.corner = NE;
  } else if (s.corner === NE) {
    newSquare.corner = NW;
  } else if (s.corner === SW) {
    newSquare.corner = SE;
  } else if (s.corner === SE) {
    newSquare.corner = SW;
  }

  return newSquare;
}

/** Returns the same row but flipped horizontally. */
export const rflip_horz = (r: Row): Row => {
  if (r === rnil) {
    return rnil;
  } else {
    const flipped_front = rcons(sflip_horz(r.hd), rnil);
    const L = r.tl;

    return rconcat(rflip_horz(L), flipped_front);

  }
}

/** Returns the same quilt but flipped horizontally. */
export const qflip_horz = (q: Quilt): Quilt => {
  if (q === qnil) {
    return qnil;
  } else {
    const flipped_front = qcons(rflip_horz(q.hd), qnil);
    const L = q.tl;

    return qconcat(flipped_front, qflip_horz(L));
  }
}


/**
 * Returns the result of sewing together q1 and q2 horizontally, i.e.,
 * concatenating each of their rows. Throws an exception if they are not the
 * same length.
 */
export const sew = (q1: Quilt, q2: Quilt): Quilt => {
  if (q1 === qnil) {
    if (q2 === qnil) {
      return qnil;
    } else {
      throw new Error("bad q2 argument: q1 has none rows but q2 has some");
    }
  } else {
    if (q2 === qnil) {
      throw new Error("bad q1 argument: q2 has none rows but q1 has some");
    } else {
      return qcons(rconcat(q1.hd, q2.hd), sew(q1.tl, q2.tl));
    }
  }
};


/**
 * Returns the result of symmetrizing this quilt first vertically, by sewing it
 * together with its horizontally flipped version, and then horizontally, by
 * concatenating its rows with those of its vertically flipped version.
 */
export const symmetrize = (q: Quilt): Quilt => {
  const r = sew(q, qflip_horz(q));
  return qconcat(r, qflip_vert(r));
};