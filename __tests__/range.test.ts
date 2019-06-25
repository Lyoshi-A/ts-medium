import { RangeCollection } from '../range';

describe('RangeCollection tests', () => {
  let rc: RangeCollection<number> = new RangeCollection<number>();
  //-------------------------ADD method -------------------------
  describe('ADD method', () => {
    //-------------------------CASE #1 -------------------------
    test('CASE #1', () => {
        rc.add([6,8]);
        rc.add([1,3]);
        rc.add([25,31]);
        rc.add([14,18]);
        rc.add([10,11]);
        expect(rc.sprint()).toBe('[[1,3],[6,8],[10,11],[14,18],[25,31]]');
    });
   //-------------------------CASE #2 -------------------------
    test('CASE #2a', () => {
        rc.add([6,9]);
        expect(rc.sprint()).toBe('[[1,3],[6,9],[10,11],[14,18],[25,31]]');
    });
    test('CASE #2b', () => {
        rc.add([5,9]);
        expect(rc.sprint()).toBe('[[1,3],[5,9],[10,11],[14,18],[25,31]]');
    });
    test('CASE #2c', () => {
        rc.add([5,9]);
        expect(rc.sprint()).toBe('[[1,3],[5,9],[10,11],[14,18],[25,31]]');
    });
    test('CASE #2d', () => {
        rc.add([4,12]);
        expect(rc.sprint()).toBe('[[1,3],[4,12],[14,18],[25,31]]');
    });
    test('CASE #2e', () => {
        rc.add([4,18]);
        expect(rc.sprint()).toBe('[[1,3],[4,18],[25,31]]');
    });   
    
    //-------------------------CASE #3 -------------------------
    test('CASE #3a', () => {
        rc.load([ [1,3],[5,8],[14,18],[25,31]]);
        rc.add([7,13]);
        expect(rc.sprint()).toBe('[[1,3],[5,13],[14,18],[25,31]]');
    });
    test('CASE #3b', () => {
        rc.add([ 5, 21 ]);
        expect(rc.sprint()).toBe('[[1,3],[5,21],[25,31]]');
    });  
    
    //-------------------------CASE #4 -------------------------
    test('CASE #4a', () => {
        rc.load([ [ 5, 8 ], [ 9, 11 ], [ 14, 18 ], [ 25, 31 ] ]);
        rc.add([3,7]);
        expect(rc.sprint()).toBe('[[3,8],[9,11],[14,18],[25,31]]');
    });
    test('CASE #4b', () => {
        rc.add([13,15]);
        expect(rc.sprint()).toBe('[[3,8],[9,11],[13,18],[25,31]]');
    }); 
    test('CASE #4c', () => {
        rc.add([12,26]);
        expect(rc.sprint()).toBe('[[3,8],[9,11],[12,31]]');
    }); 
    test('CASE #4d', () => {
        rc.add([2,27]);
        expect(rc.sprint()).toBe('[[2,31]]');
    });             
    //-------------------------CASE #5 -------------------------
    test('CASE #5a', () => {
        rc.load([ [ 5, 8 ], [ 9, 11 ], [ 14, 18 ], [ 25, 31 ] ]);
        rc.add([6,7]);
        expect(rc.sprint()).toBe('[[5,8],[9,11],[14,18],[25,31]]');
    });
    test('CASE #5b', () => {
        rc.add([15,16]);
        expect(rc.sprint()).toBe('[[5,8],[9,11],[14,18],[25,31]]');
    });    
    //-------------------------CASE #6 -------------------------
    test('CASE #6a', () => {
        rc.load([ [ 5, 8 ], [ 9, 11 ], [ 14, 18 ], [ 25, 31 ] ]);
        rc.add([6,10]);
        expect(rc.sprint()).toBe('[[5,11],[14,18],[25,31]]');
    }); 
    test('CASE #6d', () => {
        rc.add([7,28]);
        expect(rc.sprint()).toBe('[[5,31]]');
    });            
  });
  
  //-------------------------REMOVE method -------------------------
  describe('REMOVE method', () => {   
    beforeEach(() => {
        rc.load([ [ 1, 4 ], [ 9, 11 ], [ 14, 18 ], [ 25, 31 ] ]);
    });   
    //-------------------------CASE #1 -------------------------
    test('CASE #1', () => {
        rc.remove([4,8]);
        rc.remove([12,14]);
        rc.remove([32,39]);
        expect(rc.sprint()).toBe('[[1,4],[9,11],[14,18],[25,31]]');
    });
   //-------------------------CASE #2 -------------------------
    test('CASE #2a', () => {
        rc.remove([1,5]);
        expect(rc.sprint()).toBe('[[9,11],[14,18],[25,31]]');
    });
    test('CASE #2b', () => {
        rc.remove([8,18]);
        expect(rc.sprint()).toBe('[[1,4],[25,31]]');
    });  
    //-------------------------CASE #3 -------------------------
    test('CASE #3a', () => {
        rc.remove([10,14]);
        expect(rc.sprint()).toBe('[[1,4],[9,10],[14,18],[25,31]]');
    });
    test('CASE #3b', () => {
        rc.remove([3,24]);
        expect(rc.sprint()).toBe('[[1,3],[25,31]]');
    }); 
    
    //-------------------------CASE #4 -------------------------
    test('CASE #4a', () => {
        rc.remove([4,10]);
        expect(rc.sprint()).toBe('[[1,4],[10,11],[14,18],[25,31]]');
    });
    test('CASE #4b', () => {
        rc.remove([5,27]);
        expect(rc.sprint()).toBe('[[1,4],[27,31]]');
    }); 
    //-------------------------CASE #5 -------------------------
    test('CASE #5a', () => {
        rc.remove([1,3]);
        expect(rc.sprint()).toBe('[[3,4],[9,11],[14,18],[25,31]]');
    });
    test('CASE #5b', () => {
        rc.remove([27,31]);
        expect(rc.sprint()).toBe('[[1,4],[9,11],[14,18],[25,27]]');
    });    
    //-------------------------CASE #6 -------------------------
    test('CASE #6a', () => {
        rc.remove([3,10]);
        expect(rc.sprint()).toBe('[[1,3],[10,11],[14,18],[25,31]]');
    }); 
    test('CASE #6d', () => {
        rc.remove([2,27]);
        expect(rc.sprint()).toBe('[[1,2],[27,31]]');
    }); 
  });
});
