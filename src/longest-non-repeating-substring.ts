// Problem: Longest Substring Without Repeating Characters

export function lengthOfLongestNonRepeatingSubstring(s: string): number {
    let currIndex = 0;
    let substringStartIndex = 0;
    let maxLength = 0;
    const charMap = new Map<string, number>();

    while(currIndex < s.length) {
        if (!charMap.has(s.charAt(currIndex))) {
            charMap.set(s.charAt(currIndex), currIndex);
            currIndex++;
        } else {
            const repeatedCharIndex =  charMap.get(s.charAt(currIndex))!;
            charMap.set(s.charAt(currIndex), currIndex);
            if (repeatedCharIndex >= substringStartIndex) {
                maxLength = Math.max(maxLength, (currIndex - substringStartIndex));
                substringStartIndex = repeatedCharIndex + 1;
            }
            currIndex++;
        }
    }
    return  Math.max(maxLength, (currIndex - substringStartIndex));
}

/** Approach:
 * Sliding window
 * You keep track of what characters were seen and when in a map (char, index)
 * As a repeated char is encountered,
 *     1. you increase the index in the map
 *     2. if your repeated char index is after the longest substring start index,
 *          i. Calculate the max length based on the current substring length
 *          ii. move the longest substring start index to after the first occurrence of the repeated char, so the sequence can be built from there.
 *        Otherwise, don't do anything because the older occurrence is not counted anymore. the new substring doesn't include that old occurrence from before the starting point.
 * Run till the end of the string
 * Calculate max length again to see if the value has changed.
 * Time complexity: O(n)
 * Space complexity: 0(n) because of the map
 */