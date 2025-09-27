export class StringCalculator {
  add(numbers: string): number {
    if (numbers === '') {
      return 0;
    }

    // matches integers (positive and negative)
    const numberMatches = numbers.match(/-?\d+/g);

    if (!numberMatches) {
      return 0;
    }

    const parsedNumbers = numberMatches.map(num => parseInt(num, 10));

    const negativeNumbers = parsedNumbers.filter(num => num < 0);
    if (negativeNumbers.length > 0) {
      throw new Error(`negative numbers not allowed ${negativeNumbers.join(',')}`);
    }

    return parsedNumbers.reduce((sum, num) => sum + num, 0);
  }
}