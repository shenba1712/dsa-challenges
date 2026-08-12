import {describe, expect, test} from "vitest";
import {groupAnagrams1, groupAnagrams2, groupAnagrams3} from "./anagram-group.js";

type TestCase = [strs: string[], expectedGroups: string[][]];

// Grouping order (and order within a group) isn't part of the contract,
// so normalize before comparing: sort each group's contents, then sort
// the groups themselves.
function normalize(groups: string[][]): string[][] {
    return groups
        .map((group) => [...group].sort())
        .sort((a, b) => a.join(',').localeCompare(b.join(',')));
}

// a long, highly repetitive string (few distinct characters, d << k) reordered
// into an anagram of itself, plus an unrelated singleton
const longRepetitive = "a".repeat(50) + "b".repeat(30) + "c".repeat(20);
const longRepetitiveReordered = "c".repeat(20) + "a".repeat(50) + "b".repeat(30);

const testData: TestCase[] = [
    [[], []],
    [[""], [[""]]],
    [["", ""], [["", ""]]],
    [["eat", "tea", "tan", "ate", "nat", "bat"], [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]],
    [["a"], [["a"]]],
    [["a", "a", "a"], [["a", "a", "a"]]],
    [["abc", "bca", "cab", "xyz"], [["abc", "bca", "cab"], ["xyz"]]],
    [["ab", "ba", "abc"], [["ab", "ba"], ["abc"]]],
    [["ab", "ba", "abcaabcbc", "bcaaaccbb"], [["ab", "ba"], ["abcaabcbc", "bcaaaccbb"]]],
    [["a", "b", "c"], [["a"], ["b"], ["c"]]],
    [["listen", "silent", "enlist", "google", "gooogle"], [["listen", "silent", "enlist"], ["google"], ["gooogle"]]],
    [[longRepetitive, longRepetitiveReordered, "xyz"], [[longRepetitive, longRepetitiveReordered], ["xyz"]]],
];

describe("group anagrams", () => {
    describe('group anagrams 1st approach', () => {
        test.each(testData)(
            'should group anagrams for strs=%p',
            (strs, expectedGroups) => {
                expect(normalize(groupAnagrams1(strs))).toEqual(normalize(expectedGroups));
            }
        );
        // additional case about spaces
        test('should group anagrams with spaces', () => {
            expect(normalize(groupAnagrams1(["", "  ", " ", "", " "]))).toEqual(normalize([["", ""], [" "," "],["  "]]));
        })

        test('should be case-insensitive', () => {
            expect(normalize(groupAnagrams1(["Eat", "tea", "ATE"]))).toEqual(normalize([["Eat", "tea", "ATE"]]));
        });
    });

    describe('group anagrams 2nd approach', () => {
        test.each(testData)(
            'should group anagrams for strs=%p',
            (strs, expectedGroups) => {
                expect(normalize(groupAnagrams2(strs))).toEqual(normalize(expectedGroups));
            }
        );

        test('should be case-insensitive', () => {
            expect(normalize(groupAnagrams2(["Eat", "tea", "ATE"]))).toEqual(normalize([["Eat", "tea", "ATE"]]));
        });

        // known limitation: only a-z (lowercased) contributes to the key, so any
        // non a-z character is silently dropped and these end up in a single
        // group even though "", " " and "  " are not actually anagrams of each other.
        test('should incorrectly merge strings that only differ by spaces (known limitation)', () => {
            expect(normalize(groupAnagrams2(["", "  ", " ", "", " "]))).toEqual(normalize([["", "  ", " ", "", " "]]));
        });
    });

    describe('group anagrams 3rd approach', () => {
        test.each(testData)(
            'should group anagrams for strs=%p',
            (strs, expectedGroups) => {
                expect(normalize(groupAnagrams3(strs))).toEqual(normalize(expectedGroups));
            }
        );

        // unlike approach 2, approach 3 supports any character, not just a-z
        test('should group anagrams with spaces', () => {
            expect(normalize(groupAnagrams3(["", "  ", " ", "", " "]))).toEqual(normalize([["", ""], [" "," "],["  "]]));
        });

        test('should group anagrams with mixed case and digits', () => {
            expect(normalize(groupAnagrams3(["a1", "1a", "aa", "Aa", "aA"]))).toEqual(normalize([["a1", "1a"], ["aa"], ["Aa", "aA"]]));
        });
    });
})

