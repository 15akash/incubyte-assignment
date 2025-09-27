import { StringCalculator } from './services/StringCalculator';

describe('StringCalculator', () => {
  let calculator: StringCalculator;

  beforeEach(() => {
    calculator = new StringCalculator();
  });

  it('should return 0 for empty string', () => {
    expect(calculator.add('')).toBe(0);
  });

  it('should return the number itself for single number', () => {
    expect(calculator.add('1')).toBe(1);
    expect(calculator.add('5')).toBe(5);
  });

  it('should extract and sum numbers from any string with delimiters', () => {
    expect(calculator.add('1,2')).toBe(3);
    expect(calculator.add('5,10')).toBe(15);
    expect(calculator.add('1,2,3')).toBe(6);
    expect(calculator.add('1,2,3,4,5')).toBe(15);
  });

  it('should extract numbers ignoring any non-numeric characters', () => {
    expect(calculator.add('1\n2,3')).toBe(6);
    expect(calculator.add('1\n2\n3')).toBe(6);
    expect(calculator.add('1abc2def3')).toBe(6);
    expect(calculator.add('a1b2c3d')).toBe(6);
  });

  it('should handle any custom delimiters by extracting only numbers', () => {
    expect(calculator.add('//;\n1;2')).toBe(3);
    expect(calculator.add('//|\n1|2|3')).toBe(6);
    expect(calculator.add('//[;]\n1;2')).toBe(3);
    expect(calculator.add('//[|]\n1|2|3')).toBe(6);
    expect(calculator.add('//[***]\n1***2***3')).toBe(6);
    expect(calculator.add('1;2;3')).toBe(6);
    expect(calculator.add('1|2|3')).toBe(6);
    expect(calculator.add('1***2***3')).toBe(6);
  });

  it('should handle mixed delimiters and extract all numbers', () => {
    expect(calculator.add('1,2;3|4\n5')).toBe(15);
    expect(calculator.add('abc1def2ghi3jkl')).toBe(6);
    expect(calculator.add('//[***]\n1***2,3;4|5\n6')).toBe(21);
  });

  it('should throw exception for negative numbers', () => {
    expect(() => calculator.add('-1,2')).toThrow('negative numbers not allowed -1');
    expect(() => calculator.add('1,-2')).toThrow('negative numbers not allowed -2');
    expect(() => calculator.add('abc-5def2')).toThrow('negative numbers not allowed -5');
  });

  it('should throw exception with all negative numbers', () => {
    expect(() => calculator.add('-1,-2,3')).toThrow('negative numbers not allowed -1,-2');
    expect(() => calculator.add('1,-2,-3,-4')).toThrow('negative numbers not allowed -2,-3,-4');
    expect(() => calculator.add('abc-1def-2ghi3')).toThrow('negative numbers not allowed -1,-2');
  });
});