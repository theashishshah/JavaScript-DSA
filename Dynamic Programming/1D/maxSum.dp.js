class Solution {
    nonAdjacent(nums) {
        function maxSum(index) {
            if (index === 0) return nums[index]
            if (index < 0) return 0
            const pick = nums[index] + maxSum(index - 2)
            const notPick = maxSum(index - 1)
            return Math.max(pick, notPick)
        }

        return maxSum(nums.length - 1)
    }
}


// using memoization
class Solution {
    maxSum(index, nums, memo) {
        if (index === 0) return nums[index]
        if (index < 0) return 0

        if (memo[index] !== -1) return memo[index]
        const pick = nums[index] + this.maxSum(index - 2, nums, memo)
        const notPick = this.maxSum(index - 1, nums, memo)
        return memo[index] = Math.max(pick, notPick)
    }
    nonAdjacent(nums) {
        // tc: o(n)
        // sc: o(n) + o(n)
        const n = nums.length
        if (n === 1) return nums[0]

        const memo = new Array(n).fill(-1)
        return this.maxSum(n - 1, nums, memo)
    }
}


// tabulation 
class Solution {
    nonAdjacent(nums) {
        const n = nums.length
        if (n === 0) return 0
        if (n === 1) return nums[0]

        const dp = new Array(n).fill(-1)
        dp[0] = nums[0]
        for (let i = 1; i < n; i++) {
            let pick = nums[i]
            if (i - 2 >= 0) pick += dp[i - 2]
            let notPick = dp[i - 1]
            dp[i] = Math.max(pick, notPick)
        }

        return dp[n - 1]
    }
}

// space optimization
class Solution {
    nonAdjacent(nums) {
        const n = nums.length
        if (n === 0) return 0
        if (n === 1) return nums[0]

        let prev = nums[0]
        let prev2 = 0
        for (let i = 1; i < n; i++) {
            let pick = nums[i]
            if (i - 2 >= 0) pick += prev2
            let notPick = prev

            // update the prev and prev2
            prev2 = prev
            prev = Math.max(pick, notPick)
        }

        return prev
    }
}