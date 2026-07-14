// Find 2 indices whose numbers add up to the target value

export function twoSums(nums: number[], target: number): [number, number] {
    const map = new Map<number, number>();
    for (const [index, num] of nums.entries()) {
        const difference = target - num;
        if (map.has(difference)) {
            return [map.get(difference)!, index]; // it's fine because we just checked if map has difference.
        } else {
            map.set(num, index);
        }
    }
    return [-1, -1]; // no pair of indices found
}


/** Approach:
 * Use a hashmap. Keep adding numbers to it (num = key, index = value) till you find the complement number
 * For example [2,3,4] and target =  6. The pair would be [0,2] as 2+4 = 6
 * In the hashmap, we add 2(0), 3(1) because it's difference (4 or 3) is not found.
 * and when 4(2) comes, we already 2 (6-4=2) in the hashmap, so the index is obtained and returned.
 *
 * Time complexity = O(n)
 * Space complexity = O(n)
 */