webpackJsonp([35,40],{915:function(n,e){n.exports={content:'<h2 id="前言"><a href="#%E5%89%8D%E8%A8%80" aria-hidden="true"><span class="icon icon-link"></span></a>前言</h2>\n<p>简单的讲，分形是具有自相似性的图形，不论怎么放大分形图形都能保持它局部的细节。另外分形还有个更精确的定义：维数可以是非整数。假如曲线是一维图形，平面是二维图形，立方体是三维图形；利用分形的技术可以画出维数介于整数维之间的图形。  </p>\n<p>这篇文章主要介绍了如何用js画分形几何及分形艺术图形，同时也适用于任何具有绘图API的语言。  </p>\n<h2 id="用递归画分形"><a href="#%E7%94%A8%E9%80%92%E5%BD%92%E7%94%BB%E5%88%86%E5%BD%A2" aria-hidden="true"><span class="icon icon-link"></span></a>用递归画分形</h2>\n<p>递归即调用自身，我们很容易就可以想到用递归来实现自相似性。  </p>\n<p>这里需要先介绍一下乌龟绘图（LOGO），它是一个简单的绘图工具，仅有几个基本的绘图命令：FORWARD、MOVE、TURN、RESIZE。跟我们熟悉的canvas，svg图形不同，LOGO绘图没有坐标的概念，程序保存一个当前向量，通过向量和命令来确定移动的方向和步长。  </p>\n<p>利用LOGO命令可以简单的画出多边形、五角星等基本的几何图形。下面是利用canvasAPI实现的版本：  </p>\n<pre><code data-query="{}" data-lang="">forward: function (D) {\n    this.x = this.x + this.vector[0] * D;\n    this.y = this.y + this.vector[1] * D;\n    this.ctx.lineTo(this.x, this.y);\n    this.ctx.stroke();\n},\nmove: function (D) {\n    this.x = this.x + this.vector[0] * D;\n    this.y = this.y + this.vector[1] * D;\n    this.ctx.moveTo(this.x, this.y);\n},\nturn: function (A) {\n    var newV0 = this.vector[0] * Math.cos(-A) - this.vector[1] * Math.sin(-A);\n    var newV1 = this.vector[0] * Math.sin(-A) + this.vector[1] * Math.cos(-A);\n    this.vector[0] = newV0;\n    this.vector[1] = newV1;\n},\nresize: function (S) {\n    if (S &#x3C; 0) {\n        this.turn(Math.PI);\n        S = -S;\n    }\n    this.vector[0] *= S;\n    this.vector[1] *= S;\n},\n</code></pre>\n<h3 id="分形地垫"><a href="#%E5%88%86%E5%BD%A2%E5%9C%B0%E5%9E%AB" aria-hidden="true"><span class="icon icon-link"></span></a>分形地垫</h3>\n<p>分形地垫也可以叫多边形地垫，即不断的绘制多边形。下图是一个具有代表性的分形地垫——sierpinki地垫。  </p>\n<p><img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey52auxjvuj20ag09a74b.jpg"></p>\n<p>第1层  </p>\n<p><img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey529t7tllj20af09574s.jpg"></p>\n<p>第6层  </p>\n<p>Sierpinski地垫递归算法伪代码：  </p>\n<pre><code data-query="{}" data-lang="">SIERPINSKI(level)\n  if level = 0 \n    POLY(3, 2∏/3)\n  else\n    repeat 3 times\n      RESIZE 1/2\n      SIERPINSKI (level - 1)\n      RESIZE 2\n      MOVE 1\n      TURN 2∏/3\n</code></pre>\n<p>可以看出，在第0层程序画的是一个正三角形，第1层时，递归调用了三次自身，每次都画了一个边长为原来的1/2的小三角形。随着递归层数的增加，绘制的三角形数量会以3的指数幂方式增长。  </p>\n<p>利用同样的方法我们还可以画出其它的分形地垫：  </p>\n<p><img src="http://ww1.sinaimg.cn/large/699ef9c0jw1ey52fzt7q1j20a709yt8q.jpg"></p>\n<p>分形台阶  </p>\n<p><img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey52kssmsvj20cs0bjgmh.jpg"></p>\n<p>分形瑞士国旗  </p>\n<h3 id="凹凸分形"><a href="#%E5%87%B9%E5%87%B8%E5%88%86%E5%BD%A2" aria-hidden="true"><span class="icon icon-link"></span></a>凹凸分形</h3>\n<p>凹凸分形是另一种经典的分形几何图形，下图是一个具有代表性的凹凸分形——Koch曲线  </p>\n<p><img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey52mjctbzj209s05odfn.jpg"></p>\n<p>第1层  </p>\n<p><img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey52m0wiipj20a0044wef.jpg"></p>\n<p>第5层  </p>\n<p>Koch曲线递归算法伪代码：  </p>\n<pre><code data-query="{}" data-lang="">KOCH(level)\n  if level = 0 \n    FORWARD 1\n  else\n    RESIZE 1/3\n    KOCH(level - 1)\n    TURN ∏/3\n    KOCH(level - 1)\n    TURN -2∏/3\n    KOCH(level - 1)\n    TURN ∏/3\n    KOCH(level - 1)\n    RESIZE 3\n</code></pre>\n<p>可以看出koch曲线的第0层画的是一条直线，第1层调用了4次自身，画了4直线，长度是原来的1/3。  </p>\n<p>利用同样的方法可以画出其它一些分形曲线：  </p>\n<p><img src="http://ww1.sinaimg.cn/large/699ef9c0jw1ey52o1ioauj20ce07kaat.jpg"></p>\n<p>C曲线  </p>\n<p><img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey52og2wwbj20a8069q30.jpg"></p>\n<p>方形曲线  </p>\n<p>将凹凸分形作为多边形的边即可画出koch雪花及星形图案：  </p>\n<p><img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey52ou64dhj206c057aa0.jpg">\n <img src="http://ww1.sinaimg.cn/large/699ef9c0jw1ey52phwmroj209y096aal.jpg"></p>\n<h3 id="分形植物"><a href="#%E5%88%86%E5%BD%A2%E6%A4%8D%E7%89%A9" aria-hidden="true"><span class="icon icon-link"></span></a>分形植物</h3>\n<p>分形植物是一类较复杂的分形几何图形，下图是几个简单的分形植物图形，完全利用上文介绍的方法生成。也可以通过L系统等符号递归方法生成更复杂的分形植物图形，这里不再详细介绍。  </p>\n<p><img src="http://ww4.sinaimg.cn/large/699ef9c0jw1ey52rewovij209007kq37.jpg"></p>\n<p><strong>分形藤条</strong>  </p>\n<p><img src="http://ww1.sinaimg.cn/large/699ef9c0jw1ey52rmkj5jj207j074aab.jpg"></p>\n<p><strong>分形灌木</strong>  </p>\n<p><img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey52rvix9wj209h083t93.jpg"></p>\n<p><strong>分形树</strong>  </p>\n<h2 id="用迭代函数系统画分形"><a href="#%E7%94%A8%E8%BF%AD%E4%BB%A3%E5%87%BD%E6%95%B0%E7%B3%BB%E7%BB%9F%E7%94%BB%E5%88%86%E5%BD%A2" aria-hidden="true"><span class="icon icon-link"></span></a>用迭代函数系统画分形</h2>\n<p>迭代函数系统（Iterate Function System, IFS）即用一组迭代函数来替代递归实现分形的迭代过程。斐波那契数列即是一个简单的迭代函数系统：  </p>\n<pre><code data-query="{}" data-lang="">F（0）=  0\nF（1）=  1\nF（n）=  F(n-1)+F(n-2)     （n≥2，n∈N*）\n</code></pre>\n<p>我们可以很容易的写出相应的递归程序和非递归的迭代程序。迭代函数系统需要用公式来表示递归绘图中的旋转、放缩、平移等几何变换过程，其好处是迭代函数系统方式比递归方式性能更高，而且可以应用随机参数生成更丰富的图形。  </p>\n<p>在迭代函数系统中，我们需要用坐标表示点和向量，并利用公式对点和坐标进行迭代以确定最终需要绘制的坐标点。下述是坐标表示的迭代函数：  </p>\n<pre><code data-query="{}" data-lang="">xn  =  a × xn-1 + c × yn-1 + e\nyn  =  b × xn-1 + d × yn-1 + f\n</code></pre>\n<p>也可以表示成矩阵形式  </p>\n<pre><code data-query="{}" data-lang="">                                 a   b   0\n(xn, yn, 1) = (xn-1, yn-1, 1) ·  c   d   0\n                                 e   f   1\n</code></pre>\n<p><span style="line-height: 1.5;">对于任意的旋转、放缩、平移等几何变换，我们都可以利用公式对点和向量进行计算以得到对应的变换矩阵，而且可以通过矩阵计算简单的将变换叠加起来。具体的公式这里不再详细介绍，可以参考文章结尾处的相关书籍。</span>  </p>\n<p>CSS和Canvas中的transform方法都是通过变换矩阵来实现图形变形的。下图是canvas的transform函数文档，可以看到变换矩阵中的每个字母都有其几何上的意义。  </p>\n<p><img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey52svao9aj20ie0hctaw.jpg"></p>\n<h2 id="分形之间的转换"><a href="#%E5%88%86%E5%BD%A2%E4%B9%8B%E9%97%B4%E7%9A%84%E8%BD%AC%E6%8D%A2" aria-hidden="true"><span class="icon icon-link"></span></a>分形之间的转换</h2>\n<p>分形之间是可以相互转换的，用M表示变换矩阵，我们可以利用下述公式在两个变换矩阵之间插值，通过不断改变x值大小使分形从原有形状变成另一个样子。  </p>\n<pre><code data-query="{}" data-lang="">M = （1 - x)M旧 + xM新\n</code></pre>\n<p>关键代码：  </p>\n<pre><code data-query="{}" data-lang="">var MSe = [], MTr = [];\nMSe[0] = M.image(\n    new Affine(200, 400),\n    new Affine(300, 400),\n    new Affine(200, 300),\n    new Affine(200, 300),\n    new Affine(250, 300),\n    new Affine(200, 250)\n);\nMSe[1] = M.image(\n    new Affine(200, 400),\n    new Affine(300, 400),\n    new Affine(200, 300),\n    new Affine(300, 400),\n    new Affine(350, 400),\n    new Affine(300, 350)\n);\n\nMTr[0] = M.scale(0.75, new Affine(250, 400))\n    .compose(M.rot(Math.PI / 6, new Affine(250, 400)))\n    .compose(M.trans(new Affine(0, -100, true)));\nMTr[1] = M.scale(0.75, new Affine(250, 400))\n    .compose(M.rot(-Math.PI / 6, new Affine(250, 400)))\n    .compose(M.trans(new Affine(0, -100, true)));\n\nvar x = 0;\nvar that = this;\nvar timer = setInterval(function() {\n    var M0 = M.add(M.multi(1 - x, MSe[0]), M.multi(x, MTr[0]));\n    var M1 = M.add(M.multi(1 - x, MSe[1]), M.multi(x, MTr[1]));\n</code></pre>\n<p>可以看到有两组变换矩阵MSe和MTr，目标矩阵M0和M1由MSe和MTr插值生成，x从0开始，每次增加一定值直到1即完成了从原有分形到新分形的转换。为了生成更平滑的动画，可以减小x每次增加的值，或采用更平滑的插值方法，如球面线性插值，Bezier曲线插值等。  </p>\n<p><strong>从三角形地垫转换到分形藤条：</strong>  </p>\n<p><img src="http://ww1.sinaimg.cn/large/699ef9c0jw1ey52thbyxrj20d10bzmy1.jpg">\n<img src="http://ww1.sinaimg.cn/large/699ef9c0jw1ey52tvjek7j20d80axaar.jpg">\n<img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey52ubsbqhj20ct0bedgg.jpg">\n<img src="http://ww4.sinaimg.cn/large/699ef9c0jw1ey52umqc6sj20dl0cxab7.jpg"></p>\n<p><strong>从koch曲线转换到分形灌木：</strong>  </p>\n<p><img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey52uw03jtj208709ojrc.jpg">\n <img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey52v7v36aj206x0ac0sp.jpg">\n <img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey52vj5uarj206q09jt8q.jpg">\n <img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey52vyebxfj207o09nmxd.jpg">\n <img src="http://ww4.sinaimg.cn/large/699ef9c0jw1ey52w72pbuj208g09pjs2.jpg"></p>\n<p><strong>从台阶地垫转换到分形树：</strong>  </p>\n<p><img src="http://ww4.sinaimg.cn/large/699ef9c0jw1ey52xcvpltj2080083dfr.jpg">\n <img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey52xjzpp0j207w07tdfx.jpg">\n <img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey52xsfij9j209908vaak.jpg">\n <img src="http://ww4.sinaimg.cn/large/699ef9c0jw1ey52y0waxlj20dm0bfabt.jpg"></p>\n<p>Flash动画就是根据这种方法生成的，我们可以在第1帧时创建一些图形，在第10帧时对图形做一些平移放缩等变换，软件可以自动生成第1至10帧之间的动画。方法即是在两个帧所确定的变换矩阵之间进行插值生成中间图形。  </p>\n<p>需要注意的一点是相互转换的分形之间，迭代函数的个数必须相同。即三角形地垫和分形藤条都是由三个迭代函数组成的迭代函数系统，递归时也是调用了三次自身。  </p>\n<h2 id="分形网球算法"><a href="#%E5%88%86%E5%BD%A2%E7%BD%91%E7%90%83%E7%AE%97%E6%B3%95" aria-hidden="true"><span class="icon icon-link"></span></a>分形网球算法</h2>\n<p>之前所画的分形都是具有对称性的规则的几何图形，其原因是我们在每次迭代时都以固定次序计算了迭代函数系统中的所有函数。分形网球算法是另一种分形画法，每次迭代时根据参数随机选择迭代函数系统中的一个进行迭代。  </p>\n<p>关键代码：  </p>\n<pre><code data-query="{}" data-lang="">var p1 = p, p2 = 1 - p;\nvar r, Pn, M;\nvar result = [[P0.x, P0.y]];\nfor (var i = 0; i &#x3C; n; i++) {\n    r = Math.random();\n    if (r &#x3C; p1) {\n        M = M1;\n    }\n    else if (r &#x3C; p1 + p2) {\n        M = M2;\n    }\n    Pn = P0.transform(M);\n    result.push([Pn.x, Pn.y]);\n    P0 = Pn;\n}\n</code></pre>\n<p>代码中使用了两个变换M1和M2，对应控制参数p1和1—p1。迭代时我们生成随机数r并根据r的大小来决定使用M1还是M2来生成新点。下图是M1和M2绘制出的图形，通过不同的随机参数控制，可以画出形状完全不同的图形。也可以通过不断改变参数大小生成分形动画。  </p>\n<p><img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey52yeac7sj20ee0e7dhh.jpg"></p>\n<p><strong>P1=0.5</strong>  </p>\n<p><img src="http://ww1.sinaimg.cn/large/699ef9c0jw1ey52yt9iivj20e80ebwgq.jpg"></p>\n<p><strong>p1=0.8</strong>  </p>\n<p><img src="http://ww1.sinaimg.cn/large/699ef9c0jw1ey52z237gcj20dz0dbq4j.jpg"></p>\n<p><strong>P1=0.95</strong>  </p>\n<p>著名的巴恩斯利蕨（Barnsley Fern）就是用分形网球算法画的，顺便一提，迭代函数系统方法就是巴恩斯利提出的。  </p>\n<p><img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey52zr8u4xj20870crmxz.jpg"></p>\n<h2 id="创造任意图形"><a href="#%E5%88%9B%E9%80%A0%E4%BB%BB%E6%84%8F%E5%9B%BE%E5%BD%A2" aria-hidden="true"><span class="icon icon-link"></span></a>创造任意图形</h2>\n<p>关于变换矩阵还有一个重要的定理：任意三点确定一个变换。即如果确定一个初始三角形，并且确定经过变换后，三角形的三个点的最终位置，用这六个点就可以求出对应的变换矩阵。可以很直观的看到巴恩斯利蕨的生成由五个三角形决定。其中红色三角形表示初始三角形；紫色的小三角形决定了叶子的茎；而两个蓝色的三角形决定了左右两片子叶；绿色的三角形将茎和两片子叶往上复制，形成整片叶子。  </p>\n<p><img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey530hc13ij20a107gq3r.jpg"></p>\n<p>利用这种方法你可以画出任何想要的图形，只要通过获取点坐标确定变换矩阵以及对应的控制随机参数。  </p>\n<p><img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey52zgql1ij20e50bc75y.jpg"></p>\n<p><strong>心形</strong>  </p>\n<p>通过改变控制参数，或者利用上一节的图形转换的技术，我们可以在此基础上创造出更加有趣的分形动画。  </p>\n<h2 id="分形的艺术mandelbrot集和julia集"><a href="#%E5%88%86%E5%BD%A2%E7%9A%84%E8%89%BA%E6%9C%AFmandelbrot%E9%9B%86%E5%92%8Cjulia%E9%9B%86" aria-hidden="true"><span class="icon icon-link"></span></a>分形的艺术——Mandelbrot集和Julia集</h2>\n<p>如果在网上搜索分形的话，会出现许多像下面这样的图形，它们跟我们之前看到的分形图形差别很大，更加复杂而具有随机性。  </p>\n<p><img src="http://ww1.sinaimg.cn/large/699ef9c0jw1ey530uzw54j20ds0dtzmm.jpg">\n<img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey5315rgwqj20dw0duq4k.jpg"></p>\n<p><strong>Julia集</strong>  </p>\n<p><img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey531f9t3gj20dx0duwf1.jpg">\n<img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey531p53a0j20dv0dudgk.jpg"></p>\n<p><strong>Mandelbrot集</strong>  </p>\n<p>这些图形都是利用Mandelbrot集和Julia集方法画的，其实质也是利用迭代方法计算图形中每个像素点的色值，只不过迭代函数是非线性函数：f(Z) = Z2 + C 。其中Z, C均为复数，利用复数的计算法则进行迭代。Julia集是C值取常数，所有使f(Z)序列不发散的Z值的集合；  </p>\n<p>Mandelbrot集是Z值取常数，所有使f(Z)序列不发散的C值的集合。  </p>\n<p>我们看到的复杂的分形艺术都是利用Mandelbrot集和Julia集生成的，绘图软件可能使用更复杂的非线性函数生成，或者有更绚丽的配色，但实现原理都是一样的。具体的实现方法是采用逃逸时间算法，计算出每个像素点所代表复数值的逃逸速度（通过多少次迭代模大于固定值），最后根据迭代次数给像素点分配不同的色值即生成相应的分形图形。  </p>\n<p>关键代码：  </p>\n<pre><code data-query="{}" data-lang="">// d: pixel distance, s: amplify size\njulia: function (d, s, c, n) {\n    var Z0, Z1;\n    var C = new Complex(c[0], c[1]);\n    var ZSet = [];\n    for (var i = -d; i &#x3C;= d; i++) {\n        for (var j = -d; j &#x3C;= d; j++) {\n            Z0 = new Complex(i / d * s, j / d * s);\n            for (var k = 0; k &#x3C; n; k++) {\n                Z1 = Z0.multiply(Z0).add(C);\n                if (Z1.module() &#x3C; 2) {\n                    Z0 = Z1;\n                }\n                else {\n                    break;\n                }\n            }\n            ZSet.push(k);\n        }\n    }\n    return ZSet;\n},\n// q: the central point, d: pixel distance, s: amplify size\nmandelbrot: function (d, s, q, n) {\n    var Z0, C;\n    var ZSet = [];\n    for (var i = -d; i &#x3C;= d; i++) {\n        for (var j = -d; j &#x3C;= d; j++) {\n            Z0 = new Complex(0, 0);\n            C = new Complex(i / d * s + q[0], j / d * s + q[1]);\n            for (var k = 0; k &#x3C; n; k++) {\n                Z1 = Z0.multiply(Z0).add(C);\n                if (Z1.module() &#x3C; 2) {\n                    Z0 = Z1;\n                }\n                else {\n                    break;\n                }\n            }\n            ZSet.push(k);\n        }\n    }\n    return ZSet;\n}\n</code></pre>\n<p>可以看到生成julia集和Mandelbrot集的代码非常简短，程序对Z进行迭代，当Z的模大于2时记录下迭代次数k。d表示所画图形的像素大小/2，d为250则生成500*500大小的数组。S表示取值范围，取值越小则图像越放大。  </p>\n<p>因为Mandelbrot集和Julia集需要对每个像素点进行迭代，所以程序的执行时间跟所绘制的图形大小以及最大迭代次数都相关。在浏览器环境下绘制一个500*500像素的图像需要10秒左右。  </p>\n<h2 id="参考"><a href="#%E5%8F%82%E8%80%83" aria-hidden="true"><span class="icon icon-link"></span></a>参考</h2>\n<ul>\n<li>关于分形几何变换矩阵及相关公式定理，可以参考“计算机图形学与几何造型导论（Ronald Goldman）”第四章</li>\n<li>关于Mandelbrot集和Julia集可以参考这篇文章 再谈Julia集与Mandelbrot集</li>\n<li>关于分形相关理论可以参考科普书籍 蝴蝶效应之谜:走近分形与混沌(张天蓉)</li>\n<li>代码地址 <a href="https://github.com/walliychao/fractal">https://github.com/walliychao/fractal</a></li>\n</ul>\n',extra:{}}}});