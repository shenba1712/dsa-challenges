// Problem: Longest Substring Without Repeating Characters

export function lengthOfLongestNonRepeatingSubstring(s: string): number {
    let maxLengthString = '';
    let currentString = s.charAt(0);

    for(let i= 1; i < s.length; i++) {
        const currChar = s.charAt(i);
        if (!currentString.includes(currChar)) {
            currentString = currentString.concat(currChar);
        } else {
            if (maxLengthString.length < currentString.length) {
                maxLengthString = currentString;
            }
            const repeatedCharIndex = currentString.indexOf(currChar);
            if (repeatedCharIndex == currentString.length - 1) {
                currentString = currentString.slice(repeatedCharIndex);
            } else {
                currentString = currentString.slice(repeatedCharIndex + 1).concat(currChar);
            }
            }
        }

    if (currentString.length > maxLengthString.length) {
        maxLengthString = currentString;
    }
    return maxLengthString.length;
}


/** Approach:
 * start by adding the first char to the string
 * keep adding char to the current string if they are unique
 * if a char is repeated
 *  1. check the length with maxLengthString. If more, update maxLengthString
 *  2. Chop off the current string till the repeating character. so, if currString = abc and char = b, then the chopped new string will be c
 *      If the index is the last one, it means the whole currString has to be discarded.
 *  3. To this newly chopped string, add the curr character to build the next sequence
 *  4. Repeat the checks
 *
 * Time complexity: O(nk) n is the length of the string (outer for loop) and k is the length of curr string (for includes operation and indexOf operation)
 * Space complexity: O(n)
 */