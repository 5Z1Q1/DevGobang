---
title: 动态规划9：区间DP问题
date: 2025-09-14 22:05:22
categories: 技术教程/算法与数据结构
tags: [动态规划, 区间DP, 算法, LeetCode, 矩阵链乘法, 石子合并, Java]
cover: /img/dp-cover.png
description: 深入探讨区间动态规划的核心思想与经典问题，从矩阵链乘法到石子合并，掌握区间DP的状态设计和转移方程。
---

## 动态规划系列第九篇：区间DP问题深度解析

> 本文是动态规划系列的第九篇文章，将深入探讨区间动态规划这一重要分支。区间DP是动态规划的一个经典类型，主要解决在一个区间内进行合并、分割等操作的最优化问题。

## 前言回顾

在前面的文章中，我们已经学习了动态规划的基础概念、经典问题以及各种优化技巧。今天我们将进入一个新的领域——区间动态规划（Interval Dynamic Programming），这是动态规划中一个非常重要且有趣的分支。

## 什么是区间DP？

区间动态规划，简称区间DP，是一种在区间上进行动态规划的方法。它的核心思想是：**对于一个区间，我们可以通过划分子区间，然后合并子区间的结果来得到整个区间的最优解**。

### 区间DP的特点

1. **状态定义**：通常用 `dp[i][j]` 表示区间 `[i, j]` 的最优值
2. **状态转移**：通过枚举分割点 `k`，将区间 `[i, j]` 分解为 `[i, k]` 和 `[k+1, j]`
3. **边界条件**：通常是单个元素或空区间的情况
4. **填表顺序**：按区间长度从小到大填充

### 区间DP的一般框架

```java
// 区间DP的通用模板
public int intervalDP(int[] arr) {
    int n = arr.length;
    // dp[i][j] 表示区间[i, j]的最优值
    int[][] dp = new int[n][n];
    
    // 初始化边界条件
    for (int i = 0; i < n; i++) {
        dp[i][i] = /* 单个元素的初始值 */;
    }
    
    // 按区间长度遍历
    for (int len = 2; len <= n; len++) {
        for (int i = 0; i <= n - len; i++) {
            int j = i + len - 1;
            dp[i][j] = Integer.MAX_VALUE; // 或其他初始值
            
            // 枚举分割点
            for (int k = i; k < j; k++) {
                dp[i][j] = Math.min(dp[i][j], 
                    dp[i][k] + dp[k+1][j] + /* 合并代价 */);
            }
        }
    }
    
    return dp[0][n-1];
}
```

## 经典问题一：矩阵链乘法

### 问题描述

给定一系列矩阵 A1, A2, ..., An，我们想要计算它们的乘积 A1×A2×...×An。矩阵乘法满足结合律，不同的加括号方式会导致不同的计算量。我们的目标是找到最优的加括号方式，使得标量乘法的次数最少。

**LeetCode相关题目**：虽然LeetCode上没有直接的矩阵链乘法题目，但这是算法教材中的经典问题。

### 问题分析

假设矩阵 Ai 的维度是 p[i-1] × p[i]，那么计算矩阵 Ai × Ai+1 需要 p[i-1] × p[i] × p[i+1] 次标量乘法。

对于区间 [i, j]，我们需要找到最优的分割点 k，使得：

- 左半部分：[i, k]
- 右半部分：[k+1, j]  
- 合并代价：p[i-1] × p[k] × p[j]

### 算法实现

```java
public class MatrixChainMultiplication {
    
    /**
     * 矩阵链乘法 - 区间DP解法
     * @param p 矩阵维度数组，p[i-1] x p[i] 表示第i个矩阵的维度
     * @return 最少的标量乘法次数
     */
    public int matrixChainOrder(int[] p) {
        int n = p.length - 1; // 矩阵个数
        // dp[i][j] 表示计算矩阵 Ai 到 Aj 的最小乘法次数
        int[][] dp = new int[n][n];
        
        // 单个矩阵不需要乘法
        for (int i = 0; i < n; i++) {
            dp[i][i] = 0;
        }
        
        // 按区间长度遍历
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                
                // 尝试所有可能的分割点
                for (int k = i; k < j; k++) {
                    int cost = dp[i][k] + dp[k+1][j] + p[i] * p[k+1] * p[j+1];
                    dp[i][j] = Math.min(dp[i][j], cost);
                }
            }
        }
        
        return dp[0][n-1];
    }
    
    /**
     * 打印最优加括号方案
     */
    public String printOptimalParentheses(int[][] s, int i, int j) {
        if (i == j) {
            return "A" + (i + 1);
        } else {
            return "(" + printOptimalParentheses(s, i, s[i][j]) + 
                   printOptimalParentheses(s, s[i][j] + 1, j) + ")";
        }
    }
    
    /**
     * 完整版本：同时返回最小乘法次数和最优分割方案
     */
    public int matrixChainOrderWithPath(int[] p) {
        int n = p.length - 1;
        int[][] dp = new int[n][n];
        int[][] s = new int[n][n]; // 记录最优分割点
        
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                
                for (int k = i; k < j; k++) {
                    int cost = dp[i][k] + dp[k+1][j] + p[i] * p[k+1] * p[j+1];
                    if (cost < dp[i][j]) {
                        dp[i][j] = cost;
                        s[i][j] = k; // 记录最优分割点
                    }
                }
            }
        }
        
        // 打印最优方案
        System.out.println("最优加括号方案：" + printOptimalParentheses(s, 0, n-1));
        return dp[0][n-1];
    }
    
    public static void main(String[] args) {
        MatrixChainMultiplication mcm = new MatrixChainMultiplication();
        
        // 示例：4个矩阵，维度分别为 1x5, 5x4, 4x6, 6x2
        int[] p = {1, 5, 4, 6, 2};
        
        int result = mcm.matrixChainOrderWithPath(p);
        System.out.println("最少乘法次数: " + result);
    }
}
```

### 算法复杂度分析

- **时间复杂度**：O(n³)，三层循环
- **空间复杂度**：O(n²)，存储DP表

## 经典问题二：石子合并

### 石子合并问题描述

在一个圆形操场的四周摆放着n堆石子。现在要将石子有次序地合并成一堆。规定每次只能选择相邻的两堆石子合并成新的一堆，并将新的一堆石子数记为该次合并的代价。试设计一个算法，计算出将n堆石子合并成一堆的最小代价。

**相关LeetCode题目**：

- [1000. Minimum Cost to Merge Stones](https://leetcode.com/problems/minimum-cost-to-merge-stones/)
- [312. Burst Balloons](https://leetcode.com/problems/burst-balloons/)

### 线性版本实现

```java
public class StoneGame {
    
    /**
     * 线性石子合并 - 区间DP
     * @param stones 石子数量数组
     * @return 最小合并代价
     */
    public int stoneGameLinear(int[] stones) {
        int n = stones.length;
        if (n <= 1) return 0;
        
        // 计算前缀和
        int[] prefixSum = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + stones[i];
        }
        
        // dp[i][j] 表示合并区间[i, j]的最小代价
        int[][] dp = new int[n][n];
        
        // 按区间长度遍历
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                
                // 枚举分割点
                for (int k = i; k < j; k++) {
                    int cost = dp[i][k] + dp[k+1][j] + 
                              (prefixSum[j+1] - prefixSum[i]);
                    dp[i][j] = Math.min(dp[i][j], cost);
                }
            }
        }
        
        return dp[0][n-1];
    }
    
    /**
     * 环形石子合并 - 断环为链
     */
    public int stoneGameCircular(int[] stones) {
        int n = stones.length;
        if (n <= 1) return 0;
        
        // 复制数组形成环
        int[] extended = new int[2 * n];
        for (int i = 0; i < n; i++) {
            extended[i] = extended[i + n] = stones[i];
        }
        
        int minCost = Integer.MAX_VALUE;
        
        // 尝试每个可能的起始点
        for (int start = 0; start < n; start++) {
            int[] subArray = new int[n];
            System.arraycopy(extended, start, subArray, 0, n);
            minCost = Math.min(minCost, stoneGameLinear(subArray));
        }
        
        return minCost;
    }
    
    public static void main(String[] args) {
        StoneGame sg = new StoneGame();
        
        // 测试线性版本
        int[] stones1 = {3, 4, 3, 1, 5, 8};
        System.out.println("线性石子合并最小代价: " + sg.stoneGameLinear(stones1));
        
        // 测试环形版本
        int[] stones2 = {4, 1, 8, 7};
        System.out.println("环形石子合并最小代价: " + sg.stoneGameCircular(stones2));
    }
}
```

### 状态转移方程详解

对于石子合并问题：

```text
dp[i][j] = min(dp[i][k] + dp[k+1][j] + sum[i][j])
```

其中：

- `dp[i][j]`：合并区间[i, j]的最小代价
- `sum[i][j]`：区间[i, j]所有石子的总和
- `k`：分割点，i ≤ k < j

## 经典问题三：戳气球

### 戳气球问题描述

**LeetCode 312. Burst Balloons**

给定n个气球，编号为0到n-1，每个气球上都标有一个数字，这些数字存在数组nums中。现在要求你戳破所有的气球。戳破第i个气球，你可以获得 `nums[left] * nums[i] * nums[right]` 个硬币。这里的left和right代表和i相邻的两个气球的序号。

### 算法思路

这个问题的关键在于：我们不是考虑先戳破哪个气球，而是考虑最后戳破哪个气球。

对于区间[i, j]，如果最后戳破气球k，那么：

- 此时区间[i, k-1]和[k+1, j]的气球都已经被戳破
- 戳破气球k的收益为：`nums[i-1] * nums[k] * nums[j+1]`

```java
public class BurstBalloons {
    
    /**
     * LeetCode 312. Burst Balloons
     * @param nums 气球数组
     * @return 最大硬币数
     */
    public int maxCoins(int[] nums) {
        int n = nums.length;
        // 在数组两端添加虚拟气球，值为1
        int[] arr = new int[n + 2];
        arr[0] = arr[n + 1] = 1;
        for (int i = 0; i < n; i++) {
            arr[i + 1] = nums[i];
        }
        
        // dp[i][j] 表示戳破开区间(i, j)内所有气球的最大收益
        int[][] dp = new int[n + 2][n + 2];
        
        // 按区间长度遍历
        for (int len = 3; len <= n + 2; len++) {
            for (int i = 0; i <= n + 2 - len; i++) {
                int j = i + len - 1;
                
                // 枚举最后戳破的气球k (i < k < j)
                for (int k = i + 1; k < j; k++) {
                    dp[i][j] = Math.max(dp[i][j], 
                        dp[i][k] + dp[k][j] + arr[i] * arr[k] * arr[j]);
                }
            }
        }
        
        return dp[0][n + 1];
    }
    
    /**
     * 记忆化搜索版本
     */
    public int maxCoinsWithMemo(int[] nums) {
        int n = nums.length;
        int[] arr = new int[n + 2];
        arr[0] = arr[n + 1] = 1;
        for (int i = 0; i < n; i++) {
            arr[i + 1] = nums[i];
        }
        
        Integer[][] memo = new Integer[n + 2][n + 2];
        return dfs(arr, 0, n + 1, memo);
    }
    
    private int dfs(int[] arr, int i, int j, Integer[][] memo) {
        if (i >= j - 1) return 0;
        
        if (memo[i][j] != null) return memo[i][j];
        
        int maxCoins = 0;
        for (int k = i + 1; k < j; k++) {
            maxCoins = Math.max(maxCoins,
                dfs(arr, i, k, memo) + dfs(arr, k, j, memo) + 
                arr[i] * arr[k] * arr[j]);
        }
        
        return memo[i][j] = maxCoins;
    }
    
    public static void main(String[] args) {
        BurstBalloons bb = new BurstBalloons();
        
        int[] nums1 = {3, 1, 5, 8};
        System.out.println("最大硬币数: " + bb.maxCoins(nums1)); // 输出: 167
        
        int[] nums2 = {1, 5};
        System.out.println("最大硬币数: " + bb.maxCoinsWithMemo(nums2)); // 输出: 10
    }
}
```

### 算法复杂度

- **时间复杂度**：O(n³)
- **空间复杂度**：O(n²)

## 区间DP的变形与扩展

### 1. 回文串相关问题

```java
/**
 * 最长回文子序列 - LeetCode 516
 */
public int longestPalindromeSubseq(String s) {
    int n = s.length();
    // dp[i][j] 表示s[i...j]的最长回文子序列长度
    int[][] dp = new int[n][n];
    
    // 单个字符是回文
    for (int i = 0; i < n; i++) {
        dp[i][i] = 1;
    }
    
    // 按区间长度遍历
    for (int len = 2; len <= n; len++) {
        for (int i = 0; i <= n - len; i++) {
            int j = i + len - 1;
            
            if (s.charAt(i) == s.charAt(j)) {
                dp[i][j] = dp[i + 1][j - 1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[0][n - 1];
}
```

### 2. 括号匹配问题

```java
/**
 * 最长有效括号子序列
 */
public int longestValidParentheses(String s) {
    int n = s.length();
    if (n <= 1) return 0;
    
    // dp[i][j] 表示s[i...j]中最长有效括号的长度
    int[][] dp = new int[n][n];
    
    for (int len = 2; len <= n; len += 2) { // 只考虑偶数长度
        for (int i = 0; i <= n - len; i++) {
            int j = i + len - 1;
            
            // 情况1：s[i]和s[j]匹配
            if (s.charAt(i) == '(' && s.charAt(j) == ')') {
                dp[i][j] = dp[i + 1][j - 1] + 2;
            }
            
            // 情况2：在中间分割
            for (int k = i + 1; k < j; k += 2) {
                dp[i][j] = Math.max(dp[i][j], dp[i][k] + dp[k + 1][j]);
            }
        }
    }
    
    return dp[0][n - 1];
}
```

## 区间DP的优化技巧

### 1. 四边形不等式优化

对于某些特殊的区间DP问题，如果满足四边形不等式的性质，可以将时间复杂度从O(n³)优化到O(n²)。

```java
/**
 * 满足四边形不等式的区间DP优化
 */
public int optimizedIntervalDP(int[] arr) {
    int n = arr.length;
    int[][] dp = new int[n][n];
    int[][] opt = new int[n][n]; // 记录最优分割点
    
    // 初始化
    for (int i = 0; i < n - 1; i++) {
        opt[i][i + 1] = i;
    }
    
    // 按区间长度遍历
    for (int len = 2; len < n; len++) {
        for (int i = 0; i < n - len; i++) {
            int j = i + len;
            dp[i][j] = Integer.MAX_VALUE;
            
            // 利用四边形不等式缩小搜索范围
            for (int k = opt[i][j - 1]; k <= opt[i + 1][j]; k++) {
                int cost = dp[i][k] + dp[k][j] + cost(i, k, j);
                if (cost < dp[i][j]) {
                    dp[i][j] = cost;
                    opt[i][j] = k;
                }
            }
        }
    }
    
    return dp[0][n - 1];
}

private int cost(int i, int k, int j) {
    // 具体的代价函数
    return 0;
}
```

### 2. 空间优化

对于某些问题，可以利用滚动数组来优化空间复杂度。

## 区间DP解题思路总结

### 1. 识别区间DP问题的特征

- 问题涉及一个序列或数组的连续子区间
- 可以通过合并子区间来解决原问题
- 最优子结构性质明显
- 常见关键词：合并、分割、区间、最优等

### 2. 状态设计

```java
// 基本状态定义
dp[i][j] = 区间[i, j]的最优值

// 常见的状态变形
dp[i][j][k] = 区间[i, j]在某种约束k下的最优值
```

### 3. 状态转移

```java
// 基本转移方程
dp[i][j] = min/max(dp[i][k] + dp[k+1][j] + cost(i, k, j))
// 其中 i <= k < j

// 边界条件
dp[i][i] = base_case
```

### 4. 遍历顺序

```java
// 按区间长度从小到大
for (int len = 1; len <= n; len++) {
    for (int i = 0; i <= n - len; i++) {
        int j = i + len - 1;
        // 更新dp[i][j]
    }
}
```

## 实战练习推荐

### 初级练习

1. [516. Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/)
2. [647. Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/)

### 中级练习

1. [312. Burst Balloons](https://leetcode.com/problems/burst-balloons/)
2. [1000. Minimum Cost to Merge Stones](https://leetcode.com/problems/minimum-cost-to-merge-stones/)

### 高级练习

1. [664. Strange Printer](https://leetcode.com/problems/strange-printer/)
2. [1039. Minimum Score Triangulation of Polygon](https://leetcode.com/problems/minimum-score-triangulation-of-polygon/)

## 总结

区间DP是动态规划中一个重要而优雅的分支，它的核心思想是将大区间分解为小区间，通过合并子问题的解来获得原问题的最优解。

### 关键要点回顾

1. **状态定义**：`dp[i][j]` 表示区间 `[i, j]` 的最优值
2. **转移方程**：通过枚举分割点来转移状态  
3. **遍历顺序**：按区间长度从小到大遍历
4. **时间复杂度**：通常为 O(n³)
5. **应用场景**：矩阵链乘法、石子合并、括号匹配、回文问题等

### 学习建议

1. **掌握模板**：熟练掌握区间DP的基本模板和框架
2. **理解本质**：深入理解"分治+记忆化"的思想
3. **多做练习**：通过大量练习来熟悉各种变形
4. **优化意识**：学会识别可以优化的特殊情况

区间DP虽然看起来复杂，但只要掌握了基本思路和模板，就能够灵活应对各种相关问题。在后续的学习中，我们还将继续探讨动态规划的其他重要分支，如树形DP、数位DP等。

希望这篇文章能够帮助大家深入理解区间动态规划，在算法学习的道路上更进一步！
