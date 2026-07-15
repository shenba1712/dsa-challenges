// given a string containing only `()[]{}`, determine whether the brackets are validly paired and nested.

export function isValidParentheses(s: string): boolean {
    const parentheses: string[] = []
    const openingBrackets = ['(', '[', '{'];

    for(let i=0; i < s.length; i++) {
        if (openingBrackets.includes(s[i]!)) {
            parentheses.push(s[i]!);
            continue;
        }
        const lastBracket = parentheses.pop();
        switch (s[i]!) {
            case ')':
                if (lastBracket !== '(') return false;
                break;
            case ']':
                if (lastBracket !== '[') return false;
                break;
            case '}':
                if (lastBracket !== '{') return false;
                break;
            default:
                break;
        }
    }
    // if all brackets are matched, then array should be empty
    return parentheses.length === 0;
}

/* Approach:
* Use array as a stack
* Keep adding opening brackets into the array
* when a closing bracket is found, then pop the last bracket from the array.
* This last opening and the closing bracket should be a match. Otherwise, the brackets are not matched
* In the end if all the opening brackets are popped from the array and matched with the closing brackets, then it's a valid string.
*
* Time complexity: O(n) -> you traverse the whole string
* Space complexity: O(n) -> you store opening brackets in the array
* */