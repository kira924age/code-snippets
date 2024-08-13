# ABC142-D: Disjoint Set of Common Divisors

## 問題

* [https://atcoder.jp/contests/abc142/tasks/abc142_d](https://atcoder.jp/contests/abc142/tasks/abc142_d)

## 解説

正整数 $A$ と $B$ の公約数は $A$ と $B$ の最大公約数の約数である.
したがって「選んだ整数の中のどの異なる2つの整数についても互いに素」という条件がなければ, $\text{gcd}(A, B)$ の約数の個数が答えとなる.

$g = \text{gcd}(A, B)$ を素因数分解することを考える.

$$
  g = p_{1}^{e_1} \cdot p_{2}^{e_2} \cdot  p_{3}^{e_3} \cdot \cdot \cdot p_{k}^{e_k}
$$

このとき, $p_{1}^{i}$ ($1 \leq i \leq e_1$) を選んだとすると, 問題の条件より素因数として
$p_1$ を含む公約数をさらに選ぶことはできなくなる.
素数は互いに素なので, 他の素因数については追加で選ぶことは可能である.

よって, 各素因数について1つずつだけ選ぶことができるので答えは最大公約数の素因数の個数 + 1 となる.

1 は素数ではないが $A$ と $B$ の公約数であるから答えに +1 をする必要がある.

計算量は $O(\sqrt{(\max{(A, B)}}))$ となる.

## 実装例

### C++

* submission: [https://atcoder.jp/contests/abc142/submissions/26210865](https://atcoder.jp/contests/abc142/submissions/26210865)

```cpp
#include <iostream>
#include <map>

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

long long gcd(long long x, long long y) {
  while (y != 0) {
    long long r = x % y;
    x = y;
    y = r;
  }
  return x;
}

int main() {
  long long A, B;
  std::cin >> A >> B;

  long long g = gcd(A, B);
  std::map<long long, int> prime_factors = prime_factor(g);

  std::cout << prime_factors.size() + 1 << "\n";

  return 0;
}
```

### Python

* submission: [https://atcoder.jp/contests/abc142/submissions/26210947](https://atcoder.jp/contests/abc142/submissions/26210947)

```python
#!/usr/bin/env python3


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


def gcd(x, y):
    while y != 0:
        x, y = y, x % y
    return x


A, B = map(int, input().split())

g = gcd(A, B)
prime_factors = prime_factor(g)

print(len(prime_factors) + 1)
```

