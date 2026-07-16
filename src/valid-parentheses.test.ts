import {describe, expect, it} from "vitest";
import {isValidParentheses} from "./valid-parentheses.js";

type TestCase = [str: string, result: boolean];

describe('valid parentheses test', () => {
    const testData: TestCase[] = [
        ['()', true],
        ['[]', true],
        ['{}', true],
        ['({[]})', true],
        ['()[]{}', true],
        ['(]', false],
        ['([)]', false],
        ['{[]}', true],
        ['{{}}]', false],
        ['{([])', false],
        [')', false],
        ['{', false],
        ['[test]', true],
        ['test[]', true],
        ['[test}', false]
    ];

    it.each(testData)
    ('should validate parentheses order', (str, expectedResult) => {
        expect(isValidParentheses(str)).toBe(expectedResult);
    })
})