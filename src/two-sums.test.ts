import {describe, expect, test} from "vitest";
import {twoSums} from "./two-sums.js";

type TestCase = [nums: number[], target: number, expected: number[]];

describe('two sums', () => {
    const testData: TestCase[] = [
        [[2, 7, 11, 15], 9, [0,1]],
        [[3, 2, 4], 6, [1, 2]],
        [[3, 3], 6, [0,1]],
        [[4,8], 100, [-1, -1]],
        [[-3, 4, 3, 90], 0, [0, 2]],
        [[0, 4, 3, 0], 0, [0, 3]],
        [[1, 5, 7, -1, 5], 6, [0, 1]],
        [[10, 20, 30, 40, 50], 90, [3, 4]],
        [[], 5, [-1, -1]],
        [[5], 5, [-1, -1]],
        [[3, 5, 3], 6, [0, 2]],
        [[-5, -2, -3], -5, [1, 2]],
        [[1, 2, 3], 100, [-1, -1]]
    ];

    test.each(testData)(
        'should find the pair for nums=%p target=%p',
        (numbers, target, expectedResult) => {
            expect(twoSums(numbers, target)).toEqual(expectedResult);
        }
    );
})