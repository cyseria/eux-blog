webpackJsonp([21,40],{929:function(n,a){n.exports={content:'<h3 id="常见的面试题分析"><a href="#%E5%B8%B8%E8%A7%81%E7%9A%84%E9%9D%A2%E8%AF%95%E9%A2%98%E5%88%86%E6%9E%90" aria-hidden="true"><span class="icon icon-link"></span></a>常见的面试题分析</h3>\n<ul>\n<li>直接来几道面试题 看看你能否答对</li>\n</ul>\n<pre><code data-query="{}" data-lang="">var foo=1;\nfunction bar( ) {\nfoo=10;\nreturn function foo() { };\n}\nbar( );\nalert(foo);\n**********分割线***********\nvar foo = 1;\nfunction bar() {\nfoo = 10;\nreturn;\nfunction foo() {}\n}\nbar();\nconsole.log(foo)\n**********分割线***********\nvar a = 1;\nfunction fn() {\nconsole.log(a);\nvar a = 2;\n}\nfn()\nconsole.log(a);\n**********分割线***********\nvar a = 1;\nfunction fn(a) {\nconsole.log(a);\na = 2;\n}\nfn(a)\nconsole.log(a);\n</code></pre>\n<p>如果你能够都答对可以忽略本文的阅读.免得浪费时间  </p>\n<ul>\n<li>接下来我要带大家分析下为什么是这样的结果  </li>\n</ul>\n<p>分析之前你需要明白的是  </p>\n<p>创建应用程序的时候,总免不了要声明变量和函数 解析器（interpreter）是如何以及从哪里找到这些数据（变量，函数）的，  </p>\n<p>当我们引用一个变量时，在解析器内部又发生了什么？</p>\n<p>我们知道 变量和执行上下文相关 那么它就应该知道数据储存在哪里以及如何访问这些数据，这种机制被称为<strong>变量对象（variable object）</strong>。  </p>\n<p>变量对象（简称为 VO）是与某个执行上下文相关的一个特殊对象，并储存了一下数据  </p>\n<ol>\n<li>\n<p>变量（var, VariableDeclaration）  </p>\n</li>\n<li>\n<p>函数声明（FunctionDeclaration, 缩写为FD）  </p>\n</li>\n<li>\n<p>函数形参  </p>\n</li>\n</ol>\n<p>也就是所有的执行中的变量都会存储在 这个<strong>vo</strong>中  </p>\n<ul>\n<li>处理上下文代码的几个阶段 本文最核心的部分了 处理执行上下文代码分为两个阶段:</li>\n<li><strong>进入执行上下文</strong></li>\n<li>当进入执行上下文时（在代码执行前），VO 就会被下列属性填充</li>\n</ul>\n<ol start="2">\n<li>函数的所有形参（如果是在函数执行上下文中）  </li>\n</ol>\n<p>每个形参都对应变量对象中的一个属性，该属性由形参名和对应的实参值构成，如果没有传递实参，那么该属性值就为 undefined\n4. 所有函数声明（FunctionDeclaration, FD）  </p>\n<p>每个函数声明都对应变量对象中的一个属性，这个属性由一个函数对象的名称和值构成，如果变量对象中存在相同的属性名，则完全替换该属性。\n6. 所有变量声明（var, VariableDeclaration）  </p>\n<p>每个变量声明都对应变量对象中的一个属性，该属性的键/值是变量名和 undefined，如果变量名与已经声明的形参或函数相同，则变量声明不会干扰已经存在的这类属性。</p>\n<pre><code data-query="{}" data-lang="">举例说明：\nfunction test(a, b) {\nvar c = 10;\nfunction d() {}\nvar e = function _e() {};\n(function x() {});\n}\n\ntest(10);\n分析: 当进入 test 的执行上下文，并传递了实参 10，(VO)AO(VO 函数上下文中的变量对象) 对象如下：\n在函数上下文中，变量对象（VO）不能直接被访问到，此时活动对象（Activation Object，简称 AO）扮演着 VO 的角色。\n就是 VO(functionContext) === AO;\n在这个时候 AO对象的值是\n\nAO(test) = {\na: 10,\nb: undefined,\nc: undefined,\nd:\ne: undefined\n};\n\n注意：AO 并不包含函数 x，这是因为 x 不是函数声明，而是一个函数表达式（FunctionExpression，简称为 FE），函数表达式不会影响 VO。\n同理，函数 _e 也是函数表达式，就像我们即将看到的那样，因为它分配给了变量 e，所以可以通过名称 e 来访问。\n函数声明与函数表达式的异同.(有时间我在进行分析)\n\n接下来就到了第二个阶段 代码执行阶段\n</code></pre>\n<ul>\n<li><strong>执行代码</strong></li>\n<li>继续以上一例子，到了执行代码阶段，AO/VO 就会修改为如下形式</li>\n</ul>\n<pre><code data-query="{}" data-lang="">AO[\'c\'] = 10;\nAO[\'e\'] = ;\n\n这里需要注意的是\n函数表达式 _e 仍在内存中，它被保存在声明的变量 e 中。\n但函数表达式 x 却不在 AO/VO 中，如果尝试在其定义前或者定义后调用 x 函数，这时会发生“x未定义”的错误\n</code></pre>\n<ul>\n<li>如果你看懂了我上面的分析 接下来我带大家分析几个例子</li>\n</ul>\n<pre><code data-query="{}" data-lang="">console.log(a);\nvar a = 1;\nconsole.log(a);\nfunction a(){alert(2)}\nconsole.log(a);\nvar a = 3;\nconsole.log(a);\nfunction a() {alert(4);}\nconsole.log(a);\n\n分析流程如下:\n1. 进入执行上下文(预解析)给vo对象定义变量\n1. 第二行有var定义的变量a，将其保存为a=undefined;\n2. 第4行有function声明和第二行的a同名此时由于函数的等级高于变量，于是就覆盖变量a，此时a= function a (){ alert(2); }\n3. 第六行又发现一个var定义的变量，名称与第四行的函数相同，但等级低，故a= function a (){ alert(2); }不变。\n4. 同理，由于第八行后定义，又为同一等级的函数，所以a= function a (){ alert(4); }\n5. 浏览器解析完成\n此时的\nvo= {\na:\n}\n\n2. 开始执行\n1. 第一行 a应该是打印function a() {alert(4);}\n2. 第二行表达式修改了a的值，使其为1，所以第三行输出a=1\n3. 第四行定义了一个函数，但没有执行，所以第五行输出还为1\n4. 第六行表达式又一次更改了a的值，现在a=3，此时的a为一个数字，第七行输出3\n5. 同理，第八行没有做更改，第九行还是输出3\n**是不是觉得特别简单 **\n</code></pre>\n<ul>\n<li>转过头来我来和大家一起分析前面的几道面试题</li>\n</ul>\n<pre><code data-query="{}" data-lang="">var a = 1;\nfunction fn() {\nconsole.log(a);\nvar a = 2;\n}\nfn()\nconsole.log(a);\n\n* 解析\n1. 第一行 var定义的变量a=undefined\n2. fn就是函数本身\nvo定义如下:\nvo={\na: undefined\nfn:\n}\n* 开始执行代码\n1. 第一行 表达式将修改 a=1\n2. 第二到五行声明函数\n3. 到了fn() 开始执行函数此时函数为 一作用域，只要存在作用域 就先解析\n所有在函数fn内部\n1. 解析 a=undefined\n在fn内部 ao定义如下:\nao(fn)= { a: undefined}\n2. 执行fn内部第一行 弹出 undefined 第二行 把a赋值为2 (这里的a是在fn中的局部变量 和外包的a全局变量不同)\n4. 最后一行打印全局变量a=1;\n\n说明 如果把\nfunction fn() {\nconsole.log(a);\na = 2; (把var去掉 此事的a 变成了全局变量)\n}\n</code></pre>\n<pre><code data-query="{}" data-lang="">分析这道题\nvar foo = 1;\nfunction bar() {\nfoo = 10;\nreturn;\nfunction foo() {}\n}\nbar();\nconsole.log(foo)\n\n* 解析阶段(进入执行上下文)\n\nvo = {\nfoo: undefined\nbar: &#x3C;Function "bar">\n}\n* 执行代码阶段\n1. 第一行 foo =1;\n2. 第6行执行函数bar() (第二行到第5行的定义的函数)\n在函数bar的内部又有解析和执行阶段\n表示如下:\nvo(bar) = {\nfoo: &#x3C;Function "foo">\n}\n执行阶段\n在函数bar内部的第一行 foo=10 (这里需要注意的是 foo是bar的局部变量 不会影响 外面全局的变量foo)\n3: 最后一行 console.log() foo=1;\n</code></pre>\n<pre><code data-query="{}" data-lang="">var foo=1;\nfunction bar( ) {\nfoo=10;\nreturn function foo() { };\n}\nbar( );\nalert(foo);\n最后对于这道题 为什么结果是10 不是1 你只要明白 return function foo() { }; 其实是一个函数表达式 不是函数定义. 原因就在这里\n\nvar a = 1;\nfunction fn(a) {\nconsole.log(a);\na = 2;\n}\nfn(a)\nconsole.log(a); 这道题关键在于fn(a) 其实就是 fn(1) 在函数内部 解析阶段 a=1 (这里a在函数内部 是形参 a=2 也是改变fn内的局部变量 不影响全局的a )\n</code></pre>\n<ul>\n<li>有一点需要说明的是，我们知道，JS中没有块级作用域，只有函数包含的块才会被当做是作用域。诸如for、if等用花括号包含起来的内容是不算作作用域的。  </li>\n</ul>\n<p>也就是说，其中内容隶属于全局作用域，在全局范围内都可以访问到，如下</p>\n<pre><code data-query="{}" data-lang="">alert(fn);\nif(true){\nvar a = 1;\nfunction fn() {\nalert(123);\n}\n}\n</code></pre>\n<h3 id="总结"><a href="#%E6%80%BB%E7%BB%93" aria-hidden="true"><span class="icon icon-link"></span></a>总结</h3>\n<p>你只要明白了 函数执行分2个阶段 (确定上下文 执行代码) 在确定上下文阶段定义vo(ao)对象值时候 的规则  </p>\n<p>规则如下  </p>\n<p>argument(函数的形参) > function声明 > var声明 (也就之前提高的变量提升Hoisting)  </p>\n<ul>\n<li>函数的所有形参（如果是在函数执行上下文中）  </li>\n</ul>\n<p>每个形参都对应变量对象中的一个属性，该属性由形参名和对应的实参值构成，如果没有传递实参，那么该属性值就为 undefined</p>\n<ul>\n<li>所有函数声明（FunctionDeclaration, FD）  </li>\n</ul>\n<p>每个函数声明都对应变量对象中的一个属性，这个属性由一个函数对象的名称和值构成，如果变量对象中存在相同的属性名，则完全替换该属性。</p>\n<ul>\n<li>所有变量声明（var, VariableDeclaration）  </li>\n</ul>\n<p>每个变量声明都对应变量对象中的一个属性，该属性的键/值是变量名和 undefined，如果变量名与已经声明的形参或函数相同，则变量声明不会干扰已经存在的这类属性。</p>\n',extra:{}}}});