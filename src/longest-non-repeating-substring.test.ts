import {describe, expect, test} from "vitest";
import {lengthOfLongestNonRepeatingSubstring} from "./longest-non-repeating-substring.js";

type TestCase = [str: string, expectedLength: number];

describe('longest subsctring with non repeating characters', () => {
    const testData: TestCase[] = [
        ['abcabcbb', 3],
        ['', 0],
        ['bbbbb', 1],
        ['pwwkew', 3],
        ['a', 1],
        ['ab', 2],
        ['au', 2],
        ['aab', 2],
        ['dvdf', 3],
        ['tmmzuxt', 5],
        ['abba', 2],
        ['cdd', 2],
        ['abcdef', 6],
        [' ', 1],
        ['  ', 1],
        ['a b c', 3],
        ['1231234', 4],
        ['!@#!@', 3],
    ];

    test.each(testData)(
        'should find the length for string=%p',
        (str, expectedLength) => {
            expect(lengthOfLongestNonRepeatingSubstring(str)).toEqual(expectedLength);
        }
    );
})