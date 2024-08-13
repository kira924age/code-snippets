# 素因数分解

## 概要

正整数 $N$ を以下のように素因数分解して, 素数 $p_i$ を key その指数 $e_i$ を value とした連想配列を返す.

$$
  N = p_{1}^{e_1} \cdot p_{2}^{e_2} \cdot p_{3}^{e_3} \cdot \cdot \cdot p_{k}^{e_k}
$$

## 計算量

* $O(\sqrt{N})$

## Snippet

### C++

```cpp
std::map<long long, int> prime_factor(long long n) {
  std::map<long long, int> res;
  for (long long x = 2; x * x <= n; x++) {
    while (n % x == 0) {
      ++res[x];
      n /= x;
    }
  }
  if (n != 1) {
    res[n] = 1;
  }
  return res;
}
```

### Python

```python
def prime_factor(n):
    res, x = {}, 2
    while x * x <= n:
        while n % x == 0:
            res[x] = res.get(x, 0) + 1
            n //= x
        x += 1
    if n != 1:
        res[n] = 1

    return res
```

## 解説

整数を2から順番に小さい方から見ていき, $n$ を割り切るならば割るという単純な操作をしている.
この方法は試し割り法と呼ばれる単純なアルゴリズムである.

整数を小さい方から貪欲に $n$ を割れるまで割るという操作をすると, 合成数で割り切れてしまうことはありえない.
なぜなら合成数はその数より小さい素数の約数を持つはずなので, 小さい方から割っていけば先に素数で割られるはずだからである.

また, 割り算を試行する正整数 $x$ は $\sqrt{n}$ まで試せば十分である.

割り算の回数が $\log{n}$ 回程度で, $\sqrt{n}$ 回の素数の候補で割るので, 合計で $O(\log{n} + \sqrt{n}) = O(\sqrt{n})$ となる.

## 検証

* [AOJ NTL1-A: 素因数分解](../solution/AOJ-NTL1-A.html)
* [ABC142-D: Disjoint Set of Common Divisors](../solution/ABC142-D.html)
* [JOI 春合宿 2007 day1-2 Factorial](../solution/JOI-SC2007-B.html)

## 参考文献

* プログラミングコンテストチャレンジブック

