import * as assert from 'assert';
import { NW, NE, SW, SE, GREEN, ROUND, Square, rnil, rcons, qnil, qcons, RED, STRAIGHT, Row} from './quilt';
import { sew, symmetrize, sflip_vert, rflip_vert, qflip_vert, sflip_horz, rflip_horz, qflip_horz} from './quilt_ops';


describe('quilt_ops', function() {

  it('sflip_vert', function() {
    // NW, 2 colors (subdomain), 2 shapes (subdomain)
    assert.deepStrictEqual(sflip_vert({corner: NW, color: GREEN, shape: ROUND}), {corner: SW, color: GREEN, shape: ROUND});
    assert.deepStrictEqual(sflip_vert({corner: NW, color: RED, shape: ROUND}), {corner: SW, color: RED, shape: ROUND});

    assert.deepStrictEqual(sflip_vert({corner: NW, color: GREEN, shape: STRAIGHT}), {corner: SW, color: GREEN, shape: STRAIGHT});
    assert.deepStrictEqual(sflip_vert({corner: NW, color: RED, shape: STRAIGHT}), {corner: SW, color: RED, shape: STRAIGHT});


    // NE, 2 colors (subdomain), 2 shapes (subdomain)
    assert.deepStrictEqual(sflip_vert({corner: NE, color: GREEN, shape: ROUND}), {corner: SE, color: GREEN, shape: ROUND});
    assert.deepStrictEqual(sflip_vert({corner: NE, color: RED, shape: ROUND}), {corner: SE, color: RED, shape: ROUND});

    assert.deepStrictEqual(sflip_vert({corner: NE, color: GREEN, shape: STRAIGHT}), {corner: SE, color: GREEN, shape: STRAIGHT});
    assert.deepStrictEqual(sflip_vert({corner: NE, color: RED, shape: STRAIGHT}), {corner: SE, color: RED, shape: STRAIGHT});


    // SE, 2 colors (subdomain), 2 shapes (subdomain)
    assert.deepStrictEqual(sflip_vert({corner: SE, color: GREEN, shape: ROUND}), {corner: NE, color: GREEN, shape: ROUND});
    assert.deepStrictEqual(sflip_vert({corner: SE, color: RED, shape: ROUND}), {corner: NE, color: RED, shape: ROUND});

    assert.deepStrictEqual(sflip_vert({corner: SE, color: GREEN, shape: STRAIGHT}), {corner: NE, color: GREEN, shape: STRAIGHT});
    assert.deepStrictEqual(sflip_vert({corner: SE, color: RED, shape: STRAIGHT}), {corner: NE, color: RED, shape: STRAIGHT});

    // SW, 2 colors (subdomain), 2 shapes (subdomain)
    assert.deepStrictEqual(sflip_vert({corner: SW, color: GREEN, shape: ROUND}), {corner: NW, color: GREEN, shape: ROUND});
    assert.deepStrictEqual(sflip_vert({corner: SW, color: RED, shape: ROUND}), {corner: NW, color: RED, shape: ROUND});

    assert.deepStrictEqual(sflip_vert({corner: SW, color: GREEN, shape: STRAIGHT}), {corner: NW, color: GREEN, shape: STRAIGHT});
    assert.deepStrictEqual(sflip_vert({corner: SW, color: RED, shape: STRAIGHT}), {corner: NW, color: RED, shape: STRAIGHT});

  });

  it('rflip_vert', function() {

    // rnil case
      assert.deepStrictEqual(rflip_vert(rnil), rnil);

    // Corner #1, Color #1, Shape #1, 1 recursive call
      assert.deepStrictEqual(rflip_vert(rcons({corner: NW, color: GREEN, shape: ROUND}, rnil)), 
          rcons({corner: SW, color: GREEN, shape: ROUND}, rnil));

    // Corner #2, Color #2, Shape #2, 1 recursive call
      assert.deepStrictEqual(rflip_vert(rcons({corner: SE, color: RED, shape: STRAIGHT}, rnil)), 
          rcons({corner: NE, color: RED, shape: STRAIGHT}, rnil));

    /** All of the following tests have varied shape, color, and corner types for maximum test accuracy */

    // Corner #1, Color #1, 2 recursive calls (1st)
    // input: rcons(a, rcons(b, rnil))
    // returns: rcons(s(b), rcons(s(a), rnil))
      assert.deepStrictEqual(rflip_vert(rcons({corner: NW, color: GREEN, shape: STRAIGHT}, rcons({corner: SE, color: RED, shape: ROUND}, rnil))), 
          rcons({corner: SW, color: GREEN, shape: STRAIGHT}, rcons({corner: NE, color: RED, shape: ROUND}, rnil)));

    // Corner #2, Color #2, 2 recursive calls (2nd)
    // input: rcons(a, rcons(b, rnil))
    // returns: rcons(s(b), rcons(s(a), rnil))
      assert.deepStrictEqual(rflip_vert(rcons({corner: SE, color: RED, shape: ROUND}, rcons({corner: NW, color: GREEN, shape: STRAIGHT}, rnil))), 
          rcons({corner: NE, color: RED, shape: ROUND}, rcons({corner: SW, color: GREEN, shape: STRAIGHT}, rnil)));

    // Corner #1, Color #1, 2 recursive calls (1st)
    // input: rcons(a, rcons(b, rcons(c, rnil)))
    // returns: rcons(s(c), rcons(s(b), rcons(s(a), rnil)))
    assert.deepStrictEqual(rflip_vert(rcons({corner: SE, color: GREEN, shape: ROUND}, rcons({corner: NW, color: RED, shape: ROUND}, rcons({corner: SW, color: GREEN, shape: ROUND}, rnil)))), 
    rcons({corner: NE, color: GREEN, shape: ROUND}, rcons({corner: SW, color: RED, shape: ROUND}, rcons({corner: NW, color: GREEN, shape: ROUND}, rnil))));


    // Corner #2, Color #2, 2 recursive calls (2nd)
    // input: rcons(a, rcons(b, rcons(c, rnil)))
    // returns: rcons(s(c), rcons(s(b), rcons(s(a), rnil)))
    assert.deepStrictEqual(rflip_vert(rcons({corner: NW, color: RED, shape: STRAIGHT}, rcons({corner: NE, color: GREEN, shape: STRAIGHT}, rcons({corner: SE, color: RED, shape: STRAIGHT}, rnil)))), 
    rcons({corner: SW, color: RED, shape: STRAIGHT}, rcons({corner: SE, color: GREEN, shape: STRAIGHT}, rcons({corner: NE, color: RED, shape: STRAIGHT}, rnil))));

  });

  it('qflip_vert', function() {
    // rnil case
    assert.deepStrictEqual(qflip_vert(qnil), qnil);

    // Corner #1, Color #1, 1 recursive call
      assert.deepStrictEqual(qflip_vert(qcons(rcons({corner: NW, color: GREEN, shape: STRAIGHT}, rnil), qnil)), 
      (qcons(rcons({corner: SW, color: GREEN, shape: STRAIGHT}, rnil), qnil)));

    // Corner #2, Color #2, 1 recursive call
      assert.deepStrictEqual(qflip_vert(qcons(rcons({corner: SE, color: RED, shape: ROUND}, rnil), qnil)), 
      (qcons(rcons({corner: NE, color: RED, shape: ROUND}, rnil), qnil)));

    // Corner #1, Color #1, 2 recursive calls (1st)
      const u1 : Row =  rcons({corner: SE, color: RED, shape: STRAIGHT}, rcons({corner: NW, color: RED, shape: STRAIGHT}, rnil));
      const u: Row =  rcons({corner: NE, color: RED, shape: STRAIGHT}, rcons({corner: SW, color: RED, shape: STRAIGHT}, rnil));

      assert.deepStrictEqual(qflip_vert(qcons(u1, qcons(u1, qcons(u1, qnil)))), qcons(u, qcons(u, qcons(u, qnil))));

    // Corner #2, Color #2, 2 recursive calls (2nd) 
      const u2 : Row =  rcons({corner: SE, color: RED, shape: STRAIGHT}, rcons({corner: NE, color: GREEN, shape: STRAIGHT}, rnil));
      const v2 : Row = rcons({corner: NW, color: GREEN, shape: STRAIGHT}, rcons({corner: SW, color: GREEN, shape: STRAIGHT}, rnil));
      const w2 : Row = rcons({corner: NE, color: RED, shape: ROUND}, rcons({corner: NW, color: RED, shape: ROUND}, rnil));
      const w2Result : Row = rcons({corner: SE, color: RED, shape: ROUND}, rcons({corner: SW, color: RED, shape: ROUND}, rnil));
      const v2Result : Row = rcons({corner: SW, color: GREEN, shape: STRAIGHT}, rcons({corner: NW, color: GREEN, shape: STRAIGHT}, rnil));
      const u2Result : Row =  rcons({corner: NE, color: RED, shape: STRAIGHT}, rcons({corner: SE, color: GREEN, shape: STRAIGHT}, rnil));


      assert.deepStrictEqual(qflip_vert(qcons(u2, qcons(v2, qcons(w2, qnil)))), qcons(w2Result, qcons(v2Result, qcons(u2Result, qnil))));


   
  });

  it('sflip_horz', function() {
    // NW, 2 colors (subdomain), 2 shapes (subdomain)
    assert.deepStrictEqual(sflip_horz({corner: NW, color: GREEN, shape: ROUND}), {corner: NE, color: GREEN, shape: ROUND});
    assert.deepStrictEqual(sflip_horz({corner: NW, color: RED, shape: ROUND}), {corner: NE, color: RED, shape: ROUND});

    assert.deepStrictEqual(sflip_horz({corner: NW, color: GREEN, shape: STRAIGHT}), {corner: NE, color: GREEN, shape: STRAIGHT});
    assert.deepStrictEqual(sflip_horz({corner: NW, color: RED, shape: STRAIGHT}), {corner: NE, color: RED, shape: STRAIGHT});


    // NE, 2 colors (subdomain), 2 shapes (subdomain)
    assert.deepStrictEqual(sflip_horz({corner: NE, color: GREEN, shape: ROUND}), {corner: NW, color: GREEN, shape: ROUND});
    assert.deepStrictEqual(sflip_horz({corner: NE, color: RED, shape: ROUND}), {corner: NW, color: RED, shape: ROUND});

    assert.deepStrictEqual(sflip_horz({corner: NE, color: GREEN, shape: STRAIGHT}), {corner: NW, color: GREEN, shape: STRAIGHT});
    assert.deepStrictEqual(sflip_horz({corner: NE, color: RED, shape: STRAIGHT}), {corner: NW, color: RED, shape: STRAIGHT});


    // SE, 2 colors (subdomain), 2 shapes (subdomain)
    assert.deepStrictEqual(sflip_horz({corner: SE, color: GREEN, shape: ROUND}), {corner: SW, color: GREEN, shape: ROUND});
    assert.deepStrictEqual(sflip_horz({corner: SE, color: RED, shape: ROUND}), {corner: SW, color: RED, shape: ROUND});

    assert.deepStrictEqual(sflip_horz({corner: SE, color: GREEN, shape: STRAIGHT}), {corner: SW, color: GREEN, shape: STRAIGHT});
    assert.deepStrictEqual(sflip_horz({corner: SE, color: RED, shape: STRAIGHT}), {corner: SW, color: RED, shape: STRAIGHT});

    // SW, 2 colors (subdomain), 2 shapes (subdomain)
    assert.deepStrictEqual(sflip_horz({corner: SW, color: GREEN, shape: ROUND}), {corner: SE, color: GREEN, shape: ROUND});
    assert.deepStrictEqual(sflip_horz({corner: SW, color: RED, shape: ROUND}), {corner: SE, color: RED, shape: ROUND});

    assert.deepStrictEqual(sflip_horz({corner: SW, color: GREEN, shape: STRAIGHT}), {corner: SE, color: GREEN, shape: STRAIGHT});
    assert.deepStrictEqual(sflip_horz({corner: SW, color: RED, shape: STRAIGHT}), {corner: SE, color: RED, shape: STRAIGHT});


  });

  it('rflip_horz', function() {
    // rnil case
    assert.deepStrictEqual(rflip_horz(rnil), rnil);

    // Corner #1, Color #1, Shape #1, 1 recursive call (odd number #1)
      assert.deepStrictEqual(rflip_horz(rcons({corner: NW, color: GREEN, shape: ROUND}, rnil)), 
          rcons({corner: NE, color: GREEN, shape: ROUND}, rnil));

    // Corner #2, Color #2, Shape #2, 1 recursive call
      assert.deepStrictEqual(rflip_horz(rcons({corner: SE, color: RED, shape: STRAIGHT}, rnil)), 
          rcons({corner: SW, color: RED, shape: STRAIGHT}, rnil));

    /** All of the following tests have varied shape, color, and corner types for maximum test accuracy */

    // Corner #1, Color #1, 2 recursive calls (1st) (even number #2)
     assert.deepStrictEqual(rflip_horz(rcons({corner: NW, color: GREEN, shape: STRAIGHT}, rcons({corner: SE, color: RED, shape: ROUND}, rnil))), 
        rcons({corner: SW, color: RED, shape: ROUND}, rcons({corner: NE, color: GREEN, shape: STRAIGHT}, rnil)));

    // Corner #2, Color #2, 2 recursive calls (2nd)
      assert.deepStrictEqual(rflip_horz(rcons({corner: NE, color: RED, shape: STRAIGHT}, rcons({corner: SW, color: GREEN, shape: ROUND}, rnil))), 
        rcons({corner: SE, color: GREEN, shape: ROUND}, rcons({corner: NW, color: RED, shape: STRAIGHT}, rnil)));

    // Corner #1, Color #1, 2 recursive calls (1st) (odd number #2)
    assert.deepStrictEqual(rflip_horz(rcons({corner: NW, color: GREEN, shape: STRAIGHT}, rcons({corner: SE, color: RED, shape: ROUND}, rcons({corner: NE, color: RED, shape: ROUND}, rnil)))), 
        rcons({corner: NW, color: RED, shape: ROUND}, rcons({corner: SW, color: RED, shape: ROUND}, rcons({corner: NE, color: GREEN, shape: STRAIGHT}, rnil))));

    // Corner #2, Color #2, 2 recursive calls (2nd) (even number #2)
    assert.deepStrictEqual(rflip_horz(rcons({corner: NW, color: GREEN, shape: STRAIGHT}, rcons({corner: SE, color: RED, shape: ROUND}, 
                                      rcons({corner: NE, color: RED, shape: ROUND}, rcons({corner: SW, color: GREEN, shape: ROUND}, rnil))))), 
        rcons({corner: SE, color: GREEN, shape: ROUND}, rcons({corner: NW, color: RED, shape: ROUND}, 
        rcons({corner: SW, color: RED, shape: ROUND}, rcons({corner: NE, color: GREEN, shape: STRAIGHT}, rnil)))));
  
  });

  it('qflip_horz', function() {
     // rnil case
     assert.deepStrictEqual(qflip_horz(qnil), qnil);

     // Corner #1, Color #1, 1 recursive call
       assert.deepStrictEqual(qflip_horz(qcons(rcons({corner: NW, color: GREEN, shape: STRAIGHT}, rnil), qnil)), 
       (qcons(rcons({corner: NE, color: GREEN, shape: STRAIGHT}, rnil), qnil)));
 
     // Corner #2, Color #2, 1 recursive call
       assert.deepStrictEqual(qflip_horz(qcons(rcons({corner: SE, color: RED, shape: ROUND}, rnil), qnil)), 
       (qcons(rcons({corner: SW, color: RED, shape: ROUND}, rnil), qnil)));
 
     // Corner #1, Color #1, 2 recursive calls (1st)
       const u1 : Row =  rcons({corner: SE, color: RED, shape: STRAIGHT}, rcons({corner: NW, color: RED, shape: STRAIGHT}, rnil));
       const u: Row =  rcons({corner: NE, color: RED, shape: STRAIGHT}, rcons({corner: SW, color: RED, shape: STRAIGHT}, rnil));
 
       assert.deepStrictEqual(qflip_vert(qcons(u1, qcons(u1, qcons(u1, qnil)))), qcons(u, qcons(u, qcons(u, qnil))));
 
     // Corner #2, Color #2, 2 recursive calls (2nd) 
       const u2 : Row =  rcons({corner: SE, color: RED, shape: STRAIGHT}, rcons({corner: NE, color: GREEN, shape: STRAIGHT}, rnil));
       const v2 : Row = rcons({corner: NW, color: GREEN, shape: STRAIGHT}, rcons({corner: SW, color: GREEN, shape: STRAIGHT}, rnil));
       const w2 : Row = rcons({corner: NE, color: RED, shape: STRAIGHT}, rcons({corner: NW, color: RED, shape: STRAIGHT}, rnil));
       const w2Result : Row = rcons({corner: NW, color: GREEN, shape: STRAIGHT}, rcons({corner: SW, color: RED, shape: STRAIGHT}, rnil));
       const v2Result : Row = rcons({corner: SE, color: GREEN, shape: STRAIGHT}, rcons({corner: NE, color: GREEN, shape: STRAIGHT}, rnil));
       const u2Result : Row =  rcons({corner: NE, color: RED, shape: STRAIGHT}, rcons({corner: NW, color: RED, shape: STRAIGHT}, rnil));
 
 
       assert.deepStrictEqual(qflip_horz(qcons(u2, qcons(v2, qcons(w2, qnil)))), qcons(w2Result, qcons(v2Result, qcons(u2Result, qnil))));

  });

  const nw_sq: Square = {corner: NW, color: GREEN, shape: ROUND};
  const ne_sq: Square = {corner: NE, color: GREEN, shape: ROUND};
  const se_sq: Square = {corner: SE, color: GREEN, shape: ROUND};
  const sw_sq: Square = {corner: SW, color: GREEN, shape: ROUND};

  it('sew', function() {
    const r1 = rcons(nw_sq, rcons(ne_sq, rnil));
    const r12 = rcons(se_sq, rcons(sw_sq, rnil));
    const r2 = rcons(nw_sq, rcons(ne_sq, rcons(nw_sq, rcons(ne_sq, rnil))));
    const r22 = rcons(se_sq, rcons(sw_sq, rcons(se_sq, rcons(sw_sq, rnil))));

    // invalid case: (qnil, !qnil)
    assert.throws(() => sew(qnil, qcons(r1, qnil)), Error);
    assert.throws(() => sew(qnil, qcons(r1, qcons(r1, qnil))), Error);

    // invalid case: (!qnil, qnil)
    assert.throws(() => sew(qcons(r1, qnil), qnil), Error);
    assert.throws(() => sew(qcons(r1, qcons(r1, qnil)), qnil), Error);

    // 0-1-many: base case
    assert.deepStrictEqual(sew(qnil, qnil), qnil);

    // 0-1-many: one recursive call
    assert.deepStrictEqual(sew(qcons(r1, qnil), qcons(r1, qnil)), qcons(r2, qnil));
    assert.deepStrictEqual(sew(qcons(r12, qnil), qcons(r12, qnil)), qcons(r22, qnil));

    // 0-1-many: many recursive calls
    assert.deepStrictEqual(
        sew(qcons(r1, qcons(r1, qnil)), qcons(r1, qcons(r1, qnil))),
        qcons(r2, qcons(r2, qnil)));
    assert.deepStrictEqual(
        sew(qcons(r12, qcons(r12, qcons(r12, qnil))), 
            qcons(r12, qcons(r12, qcons(r12, qnil)))),
        qcons(r22, qcons(r22, qcons(r22, qnil))));
  });

  it('symmetrize', function() {
    // 0-1-many: base case
    assert.deepStrictEqual(symmetrize(qnil), qnil);
    assert.deepStrictEqual(symmetrize(qcons(rcons(nw_sq, rnil), qnil)),
        qcons(rcons(nw_sq, rcons(ne_sq, rnil)),
            qcons(rcons(sw_sq, rcons(se_sq, rnil)), qnil)));

    // 0-1-many: one recursive call
    assert.deepStrictEqual(symmetrize(qcons(rcons(nw_sq, rnil), qnil)),
        qcons(rcons(nw_sq, rcons(ne_sq, rnil)),
            qcons(rcons(sw_sq, rcons(se_sq, rnil)), qnil)));
    assert.deepStrictEqual(symmetrize(qcons(rcons(se_sq, rnil), qnil)),
        qcons(rcons(se_sq, rcons(sw_sq, rnil)),
            qcons(rcons(ne_sq, rcons(nw_sq, rnil)), qnil)));

    // 0-1-many: many recursive calls
    const r1 = rcons(nw_sq, rcons(ne_sq, rnil));
    assert.deepStrictEqual(symmetrize(qcons(r1, qnil)),
        qcons(
            rcons(nw_sq, rcons(ne_sq, rcons(nw_sq, rcons(ne_sq, rnil)))),
            qcons(
                rcons(sw_sq, rcons(se_sq, rcons(sw_sq, rcons(se_sq, rnil)))),
                qnil)));
    const r2 = rcons(sw_sq, rcons(se_sq, rnil));
    assert.deepStrictEqual(symmetrize(qcons(r1, qcons(r2, qnil))),
        qcons(
            rcons(nw_sq, rcons(ne_sq, rcons(nw_sq, rcons(ne_sq, rnil)))),
            qcons(
                rcons(sw_sq, rcons(se_sq, rcons(sw_sq, rcons(se_sq, rnil)))),
                qcons(
                    rcons(nw_sq, rcons(ne_sq, rcons(nw_sq, rcons(ne_sq, rnil)))),
                    qcons(
                        rcons(sw_sq, rcons(se_sq, rcons(sw_sq, rcons(se_sq, rnil)))),
                        qnil)))));
  });

});
