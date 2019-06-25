const PosLeft = 'LEFT';
const PosBoth = 'Both';
const PosRight = 'Right';

export interface TActionFunction<T> {
  (detect:string, item:T[]) : void;
}
/**
 * RangeCollection class
 * NOTE: Feel free to add any extra member variables/functions you like.
 */
export class RangeCollection<T> {

  private ranges:T[][] = [];
  private pos:number = 0;
  private deleteItems:number = 0;

  /**
   * Validates a range to the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  private validate(range: T[]):boolean {
    if (range.length === 2) {
      if (range[0] === range[1]) return false;  //skiped CASE #0
  // if (Number.isInteger(range[0]) && Number.isInteger(range[1])) {
          if (range[0] > range[1]) range = range.reverse();
        return true;
  // } else return false;
    }
    else return false;
  }

    /**
   * Cleans the collection
   */
  public clean():void {
    this.ranges = [];
  }

  /**
   * Fast loads the collection from array[][] for TEST PURPOSES ONLY, no verification
   * @param {Array<number>} range - Array of array of two integers that specify beginning and end of range.
   */
  public load(init: T[][]):void {
    this.ranges = init;
  }

  /**
   * Logic method to merge a range to the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  private logic(range:T[], item:T[], index:number, action: TActionFunction<T>):boolean {
    const [leftNew, rightNew] = [...range];
    const [leftItem, rightItem] = [...item];
    let result = false;
    if (leftNew < leftItem) {             //CASE #1(a,b), #2, #4 start
      if (rightNew < leftItem) {          //CASE #1(a,b), #2(a,b), #3(a,b) finish
        result = true;
      } else { //(rightNew >= leftItem) 
        if (rightNew <= rightItem) {      //CASE #4, #6 finish
          action(PosRight, item);
          result = true;
        } else { //(rightNew > rightItem) //CASE #2,#3, #6 continue
        }
        if (!this.deleteItems) this.pos = index;
        this.deleteItems++;
      }
    } else {  // (leftNew >= leftItem)    //CASE #1(b,c), #3(a,b), #5, #6 start
      if (leftNew <= rightItem) {         //CASE #5, #6 continue
        if (rightNew <= rightItem) {      //CASE #5 finish
          action(PosBoth, item);
          result = true;
        } else { // (rightNew > rightItem) //CASE #3, #6 continue
          action(PosLeft, item);
        }
        if (!this.deleteItems) this.pos = index;
        this.deleteItems++;
      } else { // (leftNew > rightItem)  //CASE #1(b,c), #6 continue
        this.pos = index+1;
      }
    }
    return result;
  }  


  /**
   * Merges a new range to the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  private merge(range:T[], action: TActionFunction<T>):void {
    this.pos = 0;
    this.deleteItems = 0;
    this.ranges.some((item: T[], index) => this.logic(range, item, index, action))
  }

  /**
   * Adds a range to the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  public add(range: T[]):void {
    if (this.validate(range)) {
      let newRange = range;
      this.merge(range, (detect:string, item:T[]) => {
        switch(detect) {
          case PosLeft:
            newRange[0] = item[0];
            break;
          case PosBoth :
            newRange = item;
            break;
          case PosRight:
            newRange[1] = item[1];
            break;            
        }           
      }); 
      this.ranges.splice(this.pos, this.deleteItems, newRange)
    }
  }

  /**
   * Removes a range from the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  public remove(range: T[]):void {
    if (this.validate(range)) {
      let newRanges:T[][] = [];
      this.merge(range, (detect:string, item:T[]) => {
        switch(detect) {
          case PosLeft:
            if (range[0] !== item[0] ) newRanges.push([item[0], range[0]]);
            break;
          case PosBoth :
            if (range[0] !== item[0] ) newRanges.push([item[0], range[0]]);
            if (range[1] !== item[1] ) newRanges.push([range[1], item[1]]);
            break;
          case PosRight:
          if (range[1] !== item[1] ) newRanges.push([range[1], item[1]]);
            break;            
        } 
      });   
      if (newRanges.length) 
        this.ranges.splice(this.pos, this.deleteItems, ...newRanges)
      else  
        this.ranges.splice(this.pos, this.deleteItems);
    }
  }      

  /**
   * Prints out the list of ranges in the range collection
   */
  public print() {
    // TODO: implement this
		return console.log(this.sprint());
  }

    /**
   * Stringify the list of ranges in the range collection
   */
  public sprint() {
    // TODO: implement this
		return JSON.stringify(this.ranges);
  }
}

// Example run
const rc:RangeCollection<number> = new RangeCollection();

rc.add([1, 5]);
rc.print();
// Should display: [1, 5)

rc.add([10, 20]);
rc.print();
// Should display: [1, 5) [10, 20)

rc.add([20, 20]);
rc.print();
// Should display: [1, 5) [10, 20)

rc.add([20, 21]);
rc.print();
// Should display: [1, 5) [10, 21)

rc.add([2, 4]);
rc.print();
// Should display: [1, 5) [10, 21)

rc.add([3, 8]);
rc.print();
// Should display: [1, 8) [10, 21)

rc.remove([10, 10]);
rc.print();
// Should display: [1, 8) [10, 21)

rc.remove([10, 11]);
rc.print();
// Should display: [1, 8) [11, 21)

rc.remove([15, 17]);
rc.print();
// Should display: [1, 8) [11, 15) [17, 21)

rc.remove([3, 19]);
rc.print();
// Should display: [1, 3) [19, 21)
