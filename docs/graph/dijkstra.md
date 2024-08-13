# 最短経路問題 (ダイクストラ法)

## 概要

隣接リストで表された<font color="SkyBlue">全ての辺についてコストが負でない</font>重み付き有向グラフおよび始点となる頂点番号を引数として受け取り, 始点から各頂点への最短経路の距離の配列を返す.

ただし到達が不可能な頂点への距離は便宜上何かしら大きな値代入する. (C++, Go の場合は $10^{18} + 18$, Python の場合は float("inf"))

## 計算量

辺の数を $|E|$, 頂点数を $|V|$ として,

* $O(|E| \log{|V|})$

## Snippet

### C++

```cpp
struct Edge {
  int dst;
  long long cost;
  Edge() {}
  Edge(int x, long long y) : dst(x), cost(y) {}
};

std::vector<long long> dijkstra(int sv, std::vector<std::vector<Edge>> &graph) {
  const long long LINF = 1000000000000000018;

  std::vector<long long> dist(graph.size(), LINF);
  dist[sv] = 0;

  typedef std::pair<long long, int> PLI;
  std::priority_queue<PLI, std::vector<PLI>, std::greater<PLI>> que;

  que.push(make_pair(0, sv));

  while (!que.empty()) {
    std::pair<long long, int> cur = que.top();
    que.pop();

    if (dist[cur.second] < cur.first) {
      continue;
    }

    for (int i = 0; i < graph[cur.second].size(); i++) {
      Edge edge = graph[cur.second][i];
      if (dist[cur.second] + edge.cost < dist[edge.dst]) {
        dist[edge.dst] = dist[cur.second] + edge.cost;
        que.push(make_pair(dist[edge.dst], edge.dst));
      }
    }
  }

  return dist;
}
```

### Python

```python
def dijkstra(start_vertex, graph):
    dist = [
        0 if i == start_vertex else float("inf") for i in range(len(graph))
    ]
    que = []
    heapq.heappush(que, (0, start_vertex))

    while que:
        cur_distance, cur_vertex = heapq.heappop(que)
        if dist[cur_vertex] < cur_distance:
            continue

        for nxt_vertex, cost in graph[cur_vertex]:
            if dist[cur_vertex] + cost < dist[nxt_vertex]:
                dist[nxt_vertex] = dist[cur_vertex] + cost
                heapq.heappush(que, (dist[nxt_vertex], nxt_vertex))

    return dist
```

### Go

```go
type Edge struct {
	Dst  int
	Cost int64
}

type DijkstraNode struct {
	Distance int64
	Vertex   int
}

type DijkstraNodeHeap []DijkstraNode

func (h DijkstraNodeHeap) Len() int           { return len(h) }
func (h DijkstraNodeHeap) Less(i, j int) bool { return h[i].Distance < h[j].Distance }
func (h DijkstraNodeHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *DijkstraNodeHeap) Push(x interface{}) {
	*h = append(*h, x.(DijkstraNode))
}

func (h *DijkstraNodeHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

func dijkstra(start int, graph [][]Edge) []int64 {
	const INF64 int64 = 1000000000000000018

	var n int = len(graph)

	var dist []int64 = make([]int64, n)
	for i := 0; i < n; i++ {
		dist[i] = INF64
	}
	dist[start] = 0

	h := &DijkstraNodeHeap{}
	heap.Init(h)

	heap.Push(h, DijkstraNode{Distance: 0, Vertex: start})

	for h.Len() > 0 {
		cur := heap.Pop(h).(DijkstraNode)
		if dist[cur.Vertex] < cur.Distance {
			continue
		}
		for _, v := range graph[cur.Vertex] {
			var next_vertex int = v.Dst
			var cost int64 = v.Cost

			if dist[cur.Vertex]+cost < dist[next_vertex] {
				dist[next_vertex] = dist[cur.Vertex] + cost
				heap.Push(h, DijkstraNode{Distance: dist[next_vertex], Vertex: next_vertex})
			}
		}
	}

	return dist
}
```

## 解説

ダイクストラ法では以下のような手順で最短経路を求めます.

* 始点から各頂点への暫定的な最短経路の距離の配列 $d$ を用意して初期値として始点の場合は0それ以外は $\infty$ (プログラム上では適当な大きな値などが主に使われる) を設定する
* 始点に対する暫定的な距離と頂点番号を1つの組みとしたデータを適当なデータ構造 Queue に追加
  * このときデータ構造として二分ヒープで実装される優先度付きキューを用いると計算量が $O(|E|\log{|V|})$ となる
* Queue が空になるまで以下の操作を繰り返す
  * Queue から暫定的な距離が最小となるものを1つ取り出す
    * <font color="SkyBlue">Queue から取り出したときに暫定的な距離は最短距離として確定される</font>
  * 取り出した要素の頂点を $v$, $v$ と隣接する頂点を $u$ として, $u$ の暫定的な距離を更新して, $u$ を Queue に追加

このアルゴリズムで重要な点は上述する手順を行えば最短距離であるかどうかが未確定な暫定的な最短距離について最小のものを最短経路とし確定してもよいというところです.

以下の図は左端の頂点を始点としてダイクストラ法を途中まで適用した例です.

左端の頂点に隣接する3つの頂点に対して, 前提的な最短距離 $d$ を更新しています.
このとき, $d = 2$ の頂点が最短距離であるかどうかが未確定な前提的な最短距離の中で最小なので最短経路として決定しても良いことになります.

確定した頂点は赤で表示しています.

<div style="text-align: center">
  <img src="/images/dijkstra.png">
</div>

このアルゴリズムの正当性を示すには以下の事実を示せばよいです.

* 始点からの最短距離が小さい順に$k$番目まで確定していて, 確定した頂点に隣接する頂点の暫定的な最短距離をすべて更新したときその中で最小の暫定的な最短距離は $k+1$ 番目に小さい最短距離である.

辺のコストが負ではないので $k+1$ 番目に小さい最短距離は必ず最短距離が $k$ 番目以下の頂点から遷移するはずです.
そして最短距離の値が $k$ 番目以下の頂点についてそれぞれ暫定的な最短距離の更新が行われているため $k+1$ 番目の最短距離が正しく求めることができていることが保証されます.

以上によりこのアルゴリズムの正当性が示されました.

このようにダイクストラ法は最短距離の値が小さい方から順に求めていく動的計画法的なアルゴリズムと捉えることができそうです.

## 検証

* [AOJ-ALDS1-12-C: Single Source Shortest Path II](../solution/AOJ-ALDS1-12-C.html)

## 参考文献

* 最強最速アルゴリズムマー養成講座

