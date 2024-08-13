# JOI 春合宿 2007 day1-2 Factorial

## 問題

* [https://atcoder.jp/contests/joisc2007/tasks/joisc2007_factor](https://atcoder.jp/contests/joisc2007/tasks/joisc2007_factor)

## 解説

n を以下のように素因数分解したときのことを考える.

$$
  n = p_{1}^{e_1} \cdot p_{2}^{e_2} \cdot p_{3}^{e_3} \cdot \cdot \cdot p_{k}^{e_k}
$$

このとき, もし指数 $e_i$ が全て 1 ならば,

$$
  n = p_{1} \cdot p_{2} \cdot p_{3} \cdot \cdot \cdot p_{k}
$$

となり, $m!$ が $n$ で割り切れる最小の $m$ は素因数 $p_i$ の最大値となる.

$n = 12 = 2^2 \cdot 3$ のときのように 指数 $e_i$ に1ではないものがある場合もある.
求める $m$ の必要条件は, $m!$ が $p_{i}^{e_i}$ で割り切れることである.
これを満たす最小の $m$ は次のように求めることができる.
$m = p_i, 2p_i, 3p_i, ... kp_i$ のように $p_i$ の整数倍を順に試していき, $m!$ の $p$ の素因数の指数を数えて初めて $e_i$ 以上となった $m$ を採用する.

この操作を全ての素因数に対して行い, それらの最大値を取れば求める答えが得られる.

## 実装例

### C++

* submission: [https://atcoder.jp/contests/joisc2007/submissions/26205383](https://atcoder.jp/contests/joisc2007/submissions/26205383)

```cpp
#include <algorithm>
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

int main() {
  int n;
  std::cin >> n;

  std::map<long long, int> prime_factors = prime_factor(n);

  long long ans = 0;
  for (auto it = prime_factors.begin(); it != prime_factors.end(); it++) {
    long long prime = it->first;
    int e = it->second;

    int cnt = 0;
    for (int i = 1; i <= n; i++) {
      long long m = prime * i;
      ans = std::max(ans, m);

      while (m % prime == 0) {
        cnt++;
        m /= prime;
      }

      if (cnt >= e) {
        break;
      }
    }
  }

  std::cout << ans << "\n";

  return 0;
}
```

### Python

* submission: [https://atcoder.jp/contests/joisc2007/submissions/26205492](https://atcoder.jp/contests/joisc2007/submissions/26205492)

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


n = int(input())
prime_factors = prime_factor(n)

ans = 0
for prime, e in prime_factors.items():
    cnt = 0
    x = 1
    while cnt < e:
        m = prime * x
        x += 1
        ans = max(ans, m)

        while m % prime == 0:
            cnt += 1
            m //= prime

print(ans)
```

## 参考文献

* [https://drken1215.hatenablog.com/entry/2020/12/22/151500](https://drken1215.hatenablog.com/entry/2020/12/22/151500)

