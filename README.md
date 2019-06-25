
#Task: Implement a 'Range Collection' class.
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range collection is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)

#Theory
//   Below are considered all possible cases that may occur.

//   Source set: 
//    ...[...R1...]...[...R1...]...[...R1...]... ...[...RN...]...

// CASE #0: new range begin equals end - skipped
//   ----------------------------------------------------------------------------------------------

// CASE #1: insert new range - new range before(a), between(b) or behind(c) of existing ones without any intersections
//    [NR]...[...R1...]...[...R1...]..[NR]..[...R1...]... ...[...RN...]...[NR]
//    ---------------------------------------------------------------------------------------------

// CASE #2: new range outer  - new range completely overlaps one(a) or more(b) existing ranges
//    ...[...R1...]...[...R1...]...[...R1...]... ...[...RN...]...
//    [...NR.......](...........])
//    ---------------------------------------------------------------------------------------------

// CASE #3: new left join - new range begin intersects with one of the existing range(a) (and completely overlaps one or more from right(b))
//   ...[...R1...]...[...R1...]...[...R1...]... ...[...RN...]...
//   .....[...NR..](...........])
//   ---------------------------------------------------------------------------------------------

// CASE #4: new right join - new range end intersects with one of the existing range(a) (and completely overlaps one or more from left(b)) 
//  ...[...R1...]...[...R1...]...[...R1...]... ...[...RN...]...
//  ([...........)[...NR..]
//  ---------------------------------------------------------------------------------------------

// CASE #5: new inner join - new range begin and end are inside with one of the existing range
//  ...[...R1...]...[...R1...]...[...R1...]... ...[...RN...]...
// .....[.NR.]       ([.NR.])
//  ---------------------------------------------------------------------------------------------

//  CASE #6: new complex join - new range begin intersects with one of the existing range and end intersects with another one(a) (and overlaps one or more between(b))
//  ...[...R1...]...[...R1...]...[...R1...]... ...[...RN...]...
//  ......[......NR......](...........]) 
//  ---------------------------------------------------------------------------------------------



#USAGE
npm install

run tests
npm run test

manual testing
./tsrun range.ts