import * as assert from 'assert';
import { NW, STRAIGHT, GREEN, ROUND, Row, rnil, rcons, qnil, qcons, RED, SE, NE, SW} from './quilt';
import { PatternA, PatternB, PatternC, PatternD, PatternE} from './patterns';


describe('patterns', function() {

  it('PatternA', function() {

    const rowGreen: Row = rcons({shape: ROUND, color: GREEN, corner: NW}, rcons({shape: ROUND, color: GREEN, corner: NW}, rnil));
    const rowRed: Row = rcons({shape: ROUND, color: RED, corner: NW}, rcons({shape: ROUND, color: RED, corner: NW}, rnil));

    // Invalid (negative) row input #1, defined color #1
        assert.throws(() => PatternA(-5, RED), Error);

    // Invalid (negative) row input #2, defined color #2
        assert.throws(() => PatternA(-4, GREEN), Error);

    // Invalid (negative) row input #1, undefined color
        assert.throws(() => PatternA(-3, undefined), Error);

    // Invalid (negative) row input #2, undefined color
        assert.throws(() => PatternA(-4, undefined), Error);

    // Valid (positive) row input #1, defined color #1, 1 recursive call (only one possible)
        assert.deepStrictEqual(PatternA(1, RED),
            qcons(rowRed, qnil));

    // Valid (positive) row input #2, defined color #2, at least 2 recursive calls (1st)
        assert.deepStrictEqual(PatternA(2, GREEN), 
            qcons(rowGreen, qcons(rowGreen, qnil)));

    // Valid (positive) row input #3, defined color #3, at least 2 recursive calls (2nd) 
        assert.deepStrictEqual(PatternA(3, RED), 
            qcons(rowRed, qcons(rowRed, qcons(rowRed, qnil))));

    // Valid (positive) row input #1, undefined color, 1 recursive call (only one possible)
        assert.deepStrictEqual(PatternA(1, undefined), 
            qcons(rowGreen, qnil));

    // Valid (positive) row input #2, undefined color, at least 2 recursive calls (1st)
        assert.deepStrictEqual(PatternA(2, undefined), 
            qcons(rowGreen, qcons(rowGreen, qnil)));

    // Valid (positive) row input #3, undefined color, at least 2 recursive calls (2nd)
        assert.deepStrictEqual(PatternA(3, undefined), 
            qcons(rowGreen, qcons(rowGreen, qcons(rowGreen, qnil))));

    // 0 rows (base case) input #1, defined color #1
        assert.deepStrictEqual(PatternA(0, RED), qnil);

    // 0 rows (base case) input #2, defined color #2
        assert.deepStrictEqual(PatternA(0, GREEN), qnil);

    // 0 rows (base case), undefined color
        assert.deepStrictEqual(PatternA(0, undefined), qnil);

  });


  it('PatternB', function() {

    const rowGreen: Row = rcons({shape: STRAIGHT, color: GREEN, corner: SE}, rcons({shape: STRAIGHT, color: GREEN, corner: NW}, rnil));
    const rowRed: Row = rcons({shape: STRAIGHT, color: RED, corner: SE}, rcons({shape: STRAIGHT, color: RED, corner: NW}, rnil));

    // Invalid (negative) row input #1, defined color #1
        assert.throws(() => PatternB(-5, RED), Error);

    // Invalid (negative) row input #2, defined color #2
        assert.throws(() => PatternB(-4, GREEN), Error);

    // Invalid (negative) row input #1, undefined color
        assert.throws(() => PatternB(-3, undefined), Error);

    // Invalid (negative) row input #2, undefined color
        assert.throws(() => PatternB(-4, undefined), Error);

    // Valid (positive) row input #1, defined color #1, 1 recursive call (only one possible)
        assert.deepStrictEqual(PatternB(1, RED),
            qcons(rowRed, qnil));

    // Valid (positive) row input #2, defined color #2, at least 2 recursive calls (1st)
        assert.deepStrictEqual(PatternB(2, GREEN), 
            qcons(rowGreen, qcons(rowGreen, qnil)));

    // Valid (positive) row input #3, defined color #3, at least 2 recursive calls (2nd) 
        assert.deepStrictEqual(PatternB(3, RED), 
            qcons(rowRed, qcons(rowRed, qcons(rowRed, qnil))));

    // Valid (positive) row input #1, undefined color, 1 recursive call (only one possible)
        assert.deepStrictEqual(PatternB(1, undefined), 
            qcons(rowGreen, qnil));

    // Valid (positive) row input #2, undefined color, at least 2 recursive calls (1st)
        assert.deepStrictEqual(PatternB(2, undefined), 
            qcons(rowGreen, qcons(rowGreen, qnil)));

    // Valid (positive) row input #3, undefined color, at least 2 recursive calls (2nd)
        assert.deepStrictEqual(PatternB(3, undefined), 
            qcons(rowGreen, qcons(rowGreen, qcons(rowGreen, qnil))));

    // 0 rows (base case) input #1, defined color #1
        assert.deepStrictEqual(PatternB(0, RED), qnil);

    // 0 rows (base case) input #2, defined color #2
        assert.deepStrictEqual(PatternB(0, GREEN), qnil);

    // 0 rows (base case), undefined color
        assert.deepStrictEqual(PatternB(0, undefined), qnil);

  });


  it('PatternC', function() {
      // [s_c, t_c]
      const row1Green: Row = rcons({shape: ROUND, color: GREEN, corner: NE}, rcons({shape: ROUND, color: GREEN, corner: NW}, rnil));
      const row1Red: Row = rcons({shape: ROUND, color: RED, corner: NE}, rcons({shape: ROUND, color: RED, corner: NW}, rnil));


      // [u_c, v_c]
      const row2Green: Row = rcons({shape: ROUND, color: GREEN, corner: SE}, rcons({shape: ROUND, color: GREEN, corner: SW}, rnil));
      const row2Red: Row = rcons({shape: ROUND, color: RED, corner: SE}, rcons({shape: ROUND, color: RED, corner: SW}, rnil));


    // Invalid (negative) row input #1, defined color #1
        assert.throws(() => PatternC(-5, RED), Error);

    // Invalid (negative) row input #2, defined color #2
        assert.throws(() => PatternC(-4, GREEN), Error);

    // Invalid (negative) row input #1, undefined color
        assert.throws(() => PatternC(-3, undefined), Error);

    // Invalid (negative) row input #2, undefined color
        assert.throws(() => PatternC(-4, undefined), Error);

    // Invalid (positive-odd) row input #1, defined color #1
        assert.throws(() => PatternC(1, RED), Error);

    // Invalid (positive-odd) row input #2, defined color #2
        assert.throws(() => PatternC(3, GREEN), Error);

    // Invalid (positive-odd) row input #1, undefined color
        assert.throws(() => PatternC(5, undefined), Error);

    // Invalid (positive-odd) row input #2, undefined color
        assert.throws(() => PatternC(7, undefined), Error);

    // Valid (positive-even) row input #1, defined color #1, 1 recursive call (only one possible)
        assert.deepStrictEqual(PatternC(2, RED),
            qcons(row1Red, qcons(row2Red, qnil)));

    // Valid (positive-even) row input #2, defined color #2, at least 2 recursive calls (1st)
        assert.deepStrictEqual(PatternC(4, GREEN), 
            qcons(row1Green, qcons(row2Green, qcons(row1Green, qcons(row2Green, qnil)))));

    // Valid (positive-even) row input #3, defined color #3, at least 2 recursive calls (2nd) 
        assert.deepStrictEqual(PatternC(6, RED), 
            qcons(row1Red, qcons(row2Red, qcons(row1Red, qcons(row2Red, qcons(row1Red, qcons(row2Red, qnil)))))));

    // Valid (positive-even) row input #1, undefined color, 1 recursive call (only one possible)
        assert.deepStrictEqual(PatternC(2, undefined), 
        qcons(row1Green, qcons(row2Green, qnil)));

    // Valid (positive-even) row input #2, undefined color, at least 2 recursive calls (1st)
        assert.deepStrictEqual(PatternC(4, undefined), 
            qcons(row1Green, qcons(row2Green, qcons(row1Green, qcons(row2Green, qnil)))));

    // Valid (positive-even) row input #3, undefined color, at least 2 recursive calls (2nd)
        assert.deepStrictEqual(PatternC(6, undefined), 
            qcons(row1Green, qcons(row2Green, qcons(row1Green, qcons(row2Green, qcons(row1Green, qcons(row2Green, qnil)))))));

    // 0 rows (base case) input #1, defined color #1
        assert.deepStrictEqual(PatternC(0, RED), qnil);

    // 0 rows (base case) input #2, defined color #2
        assert.deepStrictEqual(PatternC(0, GREEN), qnil);

    // 0 rows (base case), undefined color
        assert.deepStrictEqual(PatternC(0, undefined), qnil);

  });

  it('PatternD', function() {
    // [s_c, t_c]
    const row1Green: Row = rcons({shape: ROUND, color: GREEN, corner: SE}, rcons({shape: ROUND, color: GREEN, corner: SW}, rnil));
    const row1Red: Row = rcons({shape: ROUND, color: RED, corner: SE}, rcons({shape: ROUND, color: RED, corner: SW}, rnil));

    // [u_c, v_c]
    const row2Green: Row = rcons({shape: ROUND, color: GREEN, corner: NE}, rcons({shape: ROUND, color: GREEN, corner: NW}, rnil));
    const row2Red: Row = rcons({shape: ROUND, color: RED, corner: NE}, rcons({shape: ROUND, color: RED, corner: NW}, rnil));


    // Invalid (negative) row input #1, defined color #1
        assert.throws(() => PatternD(-5, RED), Error);

    // Invalid (negative) row input #2, defined color #2
        assert.throws(() => PatternD(-4, GREEN), Error);

    // Invalid (negative) row input #1, undefined color
        assert.throws(() => PatternD(-3, undefined), Error);

    // Invalid (negative) row input #2, undefined color
        assert.throws(() => PatternD(-4, undefined), Error);

    // Invalid (positive-odd) row input #1, defined color #1
        assert.throws(() => PatternD(1, RED), Error);

    // Invalid (positive-odd) row input #2, defined color #2
        assert.throws(() => PatternD(3, GREEN), Error);

    // Invalid (positive-odd) row input #1, undefined color
        assert.throws(() => PatternD(5, undefined), Error);

    // Invalid (positive-odd) row input #2, undefined color
        assert.throws(() => PatternD(7, undefined), Error);

    // Valid (positive-even) row input #1, defined color #1, 1 recursive call (only one possible)
        assert.deepStrictEqual(PatternD(2, RED),
            qcons(row1Red, qcons(row2Red, qnil)));

    // Valid (positive-even) row input #2, defined color #2, at least 2 recursive calls (1st)
        assert.deepStrictEqual(PatternD(4, GREEN), 
            qcons(row1Green, qcons(row2Green, qcons(row1Green, qcons(row2Green, qnil)))));

    // Valid (positive-even) row input #3, defined color #3, at least 2 recursive calls (2nd) 
        assert.deepStrictEqual(PatternD(6, RED), 
            qcons(row1Red, qcons(row2Red, qcons(row1Red, qcons(row2Red, qcons(row1Red, qcons(row2Red, qnil)))))));

    // Valid (positive-even) row input #1, undefined color, 1 recursive call (only one possible)
        assert.deepStrictEqual(PatternD(2, undefined), 
        qcons(row1Green, qcons(row2Green, qnil)));

    // Valid (positive-even) row input #2, undefined color, at least 2 recursive calls (1st)
        assert.deepStrictEqual(PatternD(4, undefined), 
            qcons(row1Green, qcons(row2Green, qcons(row1Green, qcons(row2Green, qnil)))));

    // Valid (positive-even) row input #3, undefined color, at least 2 recursive calls (2nd)
        assert.deepStrictEqual(PatternD(6, undefined), 
            qcons(row1Green, qcons(row2Green, qcons(row1Green, qcons(row2Green, qcons(row1Green, qcons(row2Green, qnil)))))));

    // 0 rows (base case) input #1, defined color #1
        assert.deepStrictEqual(PatternD(0, RED), qnil);

    // 0 rows (base case) input #2, defined color #2
        assert.deepStrictEqual(PatternD(0, GREEN), qnil);

    // 0 rows (base case), undefined color
        assert.deepStrictEqual(PatternD(0, undefined), qnil);

  });

  it('PatternE', function() {

    // [s_c, t_c]
    const row1Green: Row = rcons({shape: STRAIGHT, color: GREEN, corner: NW}, rcons({shape: STRAIGHT, color: GREEN, corner: SE}, rnil));
    const row1Red: Row = rcons({shape: STRAIGHT, color: RED, corner: NW}, rcons({shape: STRAIGHT, color: RED, corner: SE}, rnil));

    // [u_c, v_c]
    const row2Green: Row = rcons({shape: STRAIGHT, color: GREEN, corner: SE}, rcons({shape: STRAIGHT, color: GREEN, corner: NW}, rnil));
    const row2Red: Row = rcons({shape: STRAIGHT, color: RED, corner: SE}, rcons({shape: STRAIGHT, color: RED, corner: NW}, rnil));


    // Invalid (negative) row input #1, defined color #1
        assert.throws(() => PatternE(-5, RED), Error);

    // Invalid (negative) row input #2, defined color #2
        assert.throws(() => PatternE(-4, GREEN), Error);

    // Invalid (negative) row input #1, undefined color
        assert.throws(() => PatternE(-3, undefined), Error);

    // Invalid (negative) row input #2, undefined color
        assert.throws(() => PatternE(-4, undefined), Error);

    // Valid (positive) row input #1, defined color #1, 1 recursive call (only one possible)
        assert.deepStrictEqual(PatternE(2, RED),
            qcons(row1Red, qcons(row2Red, qnil)));

    // Valid (positive) row input #1, defined color #2, 1 recursive call (only one possible)
        assert.deepStrictEqual(PatternE(2, GREEN),
            qcons(row1Green, qcons(row2Green, qnil)));

    // Valid (positive) row input #2, defined color #1, at least 2 recursive calls (1st)
        assert.deepStrictEqual(PatternE(4, GREEN), 
            qcons(row1Green, qcons(row2Green, qcons(row1Green, qcons(row2Green, qnil)))));

    // Valid (positive) row input #3, defined color #2, at least 2 recursive calls (2nd) 
        assert.deepStrictEqual(PatternE(6, RED), 
            qcons(row1Red, qcons(row2Red, qcons(row1Red, qcons(row2Red, qcons(row1Red, qcons(row2Red, qnil)))))));

    // Valid (positive) row input #1, undefined color, 1 recursive call (only one possible)
        assert.deepStrictEqual(PatternE(2, undefined), 
            qcons(row1Green, qcons(row2Green, qnil)));

    // Valid (positive) row input #2, undefined color, at least 2 recursive calls (1st)
        assert.deepStrictEqual(PatternE(4, undefined), 
            qcons(row1Green, qcons(row2Green, qcons(row1Green, qcons(row2Green, qnil)))));

    // Valid (positive) row input #3, undefined color, at least 2 recursive calls (2nd)
        assert.deepStrictEqual(PatternE(6, undefined), 
            qcons(row1Green, qcons(row2Green, qcons(row1Green, qcons(row2Green, qcons(row1Green, qcons(row2Green, qnil)))))));

    // 0 rows (base case) input #1, defined color #1
        assert.deepStrictEqual(PatternE(0, RED), qnil);

    // 0 rows (base case) input #2, defined color #2
        assert.deepStrictEqual(PatternE(0, GREEN), qnil);

    // 0 rows (base case), undefined color
        assert.deepStrictEqual(PatternE(0, undefined), qnil);

    // 1 row (base case) input #1, defined color #1
        assert.deepStrictEqual(PatternE(1, RED),
            qcons(row1Red, qnil));

    // 1 row (base case) input #2, defined color #2
        assert.deepStrictEqual(PatternE(1, GREEN), 
            qcons(row1Green, qnil));
        
    // 1 row (base case), undefined color
        assert.deepStrictEqual(PatternE(1, undefined), 
            qcons(row1Green, qnil));

  });



});
