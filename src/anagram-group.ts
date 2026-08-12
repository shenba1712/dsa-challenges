/* Group strings that are anagrams of each other.
 * Example:
 * Input:  strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
*/

// Approach 1: sort the char in string before grouping
export function groupAnagrams1(strs: string[]): string[][] {
    const map = new Map<string, string[]>();

    // do the sorting and grouping in hashmap
    for (const str of strs) {
        const key = Array.from(str.toLowerCase()).sort().join('');

        // update hashmap
        const group = map.get(key) ?? [];
        group.push(str);
        map.set(key, group);
    }

    // build the result
    return Array.from(map.values());
}

/** Approach:
 * Take each string in the array and sort the characters.
 * Then put it in a hashmap with the character sorted string as the key and the actual string as the value.
 * So, [ate, tea, eat] all have "aet" as the character sorted string (key) and the map entry would be aet -> [ate, tea, eat]
 * Finally return the map values as an array.
 *
 * Time complexity: O(n. k log k) -> because of running sorting on n items of length k
 * Space complexity: O(n.k) -> hashmap (store n values in k sorted strings)
 */

// Approach 2: user frequency counting method
export function groupAnagrams2(strs: string[]): string[][] {
    const map = new Map<string, string[]>();

    // do the sorting and grouping in hashmap
    for (const str of strs) {

        const key = new Array(26).fill(0);

        for (const ch of str.toLowerCase()) {
            key[ch.charCodeAt(0) - 97]++;
        }

        // update hashmap
        const keyJoined = key.join();
        const group = map.get(keyJoined) ?? [];
        group.push(str);
        map.set(keyJoined, group);
    }

    // build the result
    return Array.from(map.values());
}

/** Approach:
 * Take each string in the array and fill the frequency array.
 * Frequency array is all 26 characters in an array with 0 as the value in the corresponding positon.
 * Filling the array means -> add 1 to the corresponding position. "abc" will be [1,1,1,0...] -> with positions 0,1 and 2 set while others are zero.
 *
 * Then put it in a hashmap with the frequency map string as the key and the actual string as the value.
 * So, [ate, tea, eat] all have "1, 0, 0, 0, 1, 0 ...., 1, 0 ..." as the character sorted string and the map entry would be aet -> [ate, tea, eat]
 * Finally return the map values as an array.
 *
 * catch: only a-z in lowercase is considered. everything else is skipped
 *
 * Time complexity: O(nk) -> running frequency map on n items with k length
 * Space complexity: O(n.k) -> hashmap (store n values in k sorted strings)
 */

// Approach 3: frequency counting with a Map, so any character (not just a-z) is supported
export function groupAnagrams3(strs: string[]): string[][] {
    const map = new Map<string, string[]>();

    for (const str of strs) {
        const freq = new Map<string, number>();

        for (const ch of str) {
            freq.set(ch, (freq.get(ch) ?? 0) + 1);
        }

        // build a canonical key from the frequency map, sorted by character
        // so the same multiset of characters always produces the same key
        // regardless of insertion order.
        const key = Array.from(freq.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([ch, count]) => `${ch}${count}`)
            .join(',');

        const group = map.get(key) ?? [];
        group.push(str);
        map.set(key, group);
    }

    // build the result
    return Array.from(map.values());
}

/** Approach:
 * Take each string in the array and build a frequency map of its characters (any character, not just a-z).
 *   e.g. "eat" -> {e:1, a:1, t:1}   "tea" -> {t:1, e:1, a:1}
 * Both maps hold the same counts, but Map iteration follows insertion order, so "eat" and "tea"
 * would produce entries in a different order ([e,a,t] vs [t,e,a]) if joined as-is.
 * Sorting the entries by character first removes that ordering difference, so both become [a,e,t]
 * before joining into the key "a1,e1,t1" - giving "eat" and "tea" the same canonical key.
 * The count in each token also distinguishes strings with different multiplicities, e.g. "aab" -> "a2,b1"
 * stays separate from "ab" -> "a1,b1".
 * Then put it in a hashmap with that key and the actual string as the value.
 * Finally return the map values as an array.
 *
 * Time complexity: O(n.(k + d log d)) -> building the frequency map is O(k); sorting its entries is O(d log d),
 *   where d is the number of distinct characters in the string (d <= k). Degenerates to O(n.k log k) only
 *   when every character is distinct (d = k); strictly better than approach 1 whenever d << k.
 * Space complexity: O(n.k) -> hashmap (store n values plus their keys)
 */