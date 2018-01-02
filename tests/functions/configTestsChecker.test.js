import { simpleAdd } from '../../app/configTestsChecker';

test('this is the simple config checker - add two numbers', ()=>{
  const result = simpleAdd(2,2);
  expect(result).toBe(4);
})