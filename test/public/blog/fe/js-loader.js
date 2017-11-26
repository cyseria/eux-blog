webpackJsonp([32,40],{918:function(n,e){n.exports={content:'<h3 id="脚本的动态加载"><a href="#%E8%84%9A%E6%9C%AC%E7%9A%84%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BD" aria-hidden="true"><span class="icon icon-link"></span></a>脚本的动态加载</h3>\n<blockquote>\n<blockquote>\n<p>我们平时如何挂载脚本?  </p>\n</blockquote>\n</blockquote>\n<p>众所周知，在web应用中，我们时常需要使用js脚本对应用做这样或者那样的操作。而仙贝们为了解放大家的双手，降低大家的开发成本，创造了很多具有各种用途，或者针对对应问题的解决方案。这些解决方案，被称作框架和库。  </p>\n<p>而作为这些脚本的使用者，我们只需要简单而又传统的将脚本使用script标签插入我们的应用中就行了。  </p>\n<pre><code data-query="{}" data-lang="">&#x3C;!DOCTYPE html>\n&#x3C;html lang="en">\n&#x3C;head>\n    &#x3C;meta charset="UTF-8">\n    &#x3C;title>test&#x3C;/title>\n&#x3C;/head>\n&#x3C;body>\n    &#x3C;script src="myscript.js">&#x3C;/script>\n&#x3C;/body>\n&#x3C;/html>\n</code></pre>\n<p>如上文所说，这是简单而又传统的使用方法。事实上在技术快速迭代的今天，传统方式有时候并不能满足我们的需求。当一个webapp含有过多的功能的时候，我们的脚本可能越来越大。而用户的体验则是：这网站打开真慢啊～～～  </p>\n<p>然而事实上我们功能做得相当的多，效果做得相当的好，大部分用户其实只是使用了其中的某几个基础功能而已。但只是为了所有功能能够使用而增加了加载量，似乎有些得不偿失。  </p>\n<blockquote>\n<blockquote>\n<p>然后，我们有了动态加载脚本的想法  </p>\n</blockquote>\n</blockquote>\n<p>从<em>Netscape Navigator 4.0</em>为起点，浏览器厂商们都开始支持起了不同形态的动态html。通过dom api，程序猿们可以轻松的对节点进行各种操作。于是对我们来说，又有了新的方法去加载脚本。  </p>\n<pre><code data-query="{}" data-lang="">var script = document.createElement(\'script\');\nscript.async = true;\nscript.src = \'myScript.js\';\ndocument.getElementsByTagName(\'head\')[0].appendChild(script);\n</code></pre>\n<p>当然了，这样的写法是最基础的增加方法。在这样的写法下，我们无法得知脚本到底有没有加载完，如果依赖脚本没有加载并解释完毕，那么我们加载它就没有任何意义，还会因此阻断所有相关操作。  </p>\n<p>谢天谢地，天无绝人之路，浏览器老板们还是给我们提供了方法对脚本加载情况进行探知。我们所知的onreadystatechange事件和onload事件可以帮我们判断脚本是否加载完毕～  </p>\n<pre><code data-query="{}" data-lang="">script.onreadystatechange = script.onload = function (evt) {\n    var evt = evt ? evt : window.event;\n    if (!evt.readyState || evt.readyState === \'loaded\' || evt.readyState === \'complete\') {\n        cb &#x26;&#x26; cb();\n        script.onreadystatechange = script.onload ＝ null;\n        script.parent.removeChild(script);\n        script = null;\n    }\n}\n</code></pre>\n<blockquote>\n<blockquote>\n<p>作为一个正常人，我们想不想加载更多东西呢？  </p>\n</blockquote>\n</blockquote>\n<p>想！当然想。作为一个正常人，我们极其希望也load别的东西过来，那现在我们还有什么东西可以通过动态加载呢？css／picture／function都可以成为我们的加载对象。这时候，我们就该有一个简单的加载器了，聚合我们想要的功能，让我们解放双手！  </p>\n<pre><code data-query="{}" data-lang="">var handler = {\n    js: jsHandler,\n    css: cssHandler,\n    fn: fnHandler\n};\n\nvar Loader = function (src, type) {\n\n    if (src === undefined) {\n        throw new Error(\'木有参数\');\n    }\n\n    //  修正参数\n    if (!type) {\n        if (typeof src === \'string\') {\n            if (/\\.css$|\\.css\\?/i.test(src)) {\n                type = \'css\';\n            }\n            if (/\\.js$|\\.js\\?/i.test(src)) {\n                type = \'js\';\n            }\n        }\n        if (typeof src === \'function\') {\n            type = \'fn\'\n        }\n    }\n\n    type = type || \'js\';\n\n    handler[type](src);\n};\n\nfunction jsHandler(src) {}\n\nfunction cssHandler(href) {}\n\nfunction fnHandler(fn) {}\n</code></pre>\n<blockquote>\n<blockquote>\n<p>如何填充我们的函数  </p>\n</blockquote>\n</blockquote>\n<p><img src="http://ww3.sinaimg.cn/large/43b712ebgw1ey33fsbjl3j20hd0lhtfg.jpg"></p>\n<p>我们有了处理不同类型加载项的逻辑，但首先，我们还是要完善jsHandler函数  </p>\n<blockquote>\n<blockquote>\n<p>获取head元素  </p>\n</blockquote>\n</blockquote>\n<pre><code data-query="{}" data-lang="">var doc = document;\nvar head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;\n</code></pre>\n<p>将document和head缓存起来，以便多次使用，这可以提高一点点的性能…  </p>\n<blockquote>\n<blockquote>\n<p>为jsHandler完善加载部分  </p>\n</blockquote>\n</blockquote>\n<pre><code data-query="{}" data-lang="">function jsHandler(src, callback) {\n    var script = doc.createElement(\'script\');\n    script.async = true;\n    script.src = src;\n\n    // 对支持onload事件的浏览器做处理\n    var hasOnload = \'onload\' in script;\n    if (hasOnload) {\n        script.onload = jsOnload;\n        script.onerror = function () {\n            jsOnload(true);\n        }\n    }\n\n    // 对支持onreadystatechange的浏览器做处理\n    else {\n        script.onreadystatechange = function() {\n            if (/loaded|complete/.test(script.readyState)) {\n                jsOnload();\n            }\n        }\n    }\n\n    head.appendChild(script);\n\n    // 当事件\n    function jsOnload(error) {\n        isTimeout = false;\n        script.onload = script.onerror = script.onreadystatechange = null;\n        head.removeChild(script);\n        script = null;\n        callback(error);\n    }\n}\n</code></pre>\n<pre><code data-query="{}" data-lang="">在上面这段代码中，我们为加载js做了一系列处理，由于浏览器厂商的实现问题，我们要对脚本是否加载成功或失败作出判断，这是个很麻烦的事情，尤其是对需要向下兼容的同学来说。\n</code></pre>\n<p>从<a href="http://qianduanblog.com/post/headjs.html">headjs</a>这篇文章的注释来看，脚本是否加载完毕依赖于onload事件，而ie9及以下依赖于对状态标志进行load或者complete字符的检测。  </p>\n<pre><code data-query="{}" data-lang="">// IE 7/8 (2 events on 1st load)\n// 1) event.type = readystatechange, s.readyState = loading\n// 2) event.type = readystatechange, s.readyState = loaded\n\n// IE 7/8 (1 event on reload)\n// 1) event.type = readystatechange, s.readyState = complete \n\n// event.type === \'readystatechange\' &#x26;&#x26; /loaded¦complete/.test(s.readyState)\n\n// IE 9 (3 events on 1st load)\n// 1) event.type = readystatechange, s.readyState = loading\n// 2) event.type = readystatechange, s.readyState = loaded\n// 3) event.type = load            , s.readyState = loaded\n\n// IE 9 (2 events on reload)\n// 1) event.type = readystatechange, s.readyState = complete \n// 2) event.type = load            , s.readyState = complete \n\n// event.type === \'load\'             &#x26;&#x26; /loaded¦complete/.test(s.readyState)\n// event.type === \'readystatechange\' &#x26;&#x26; /loaded¦complete/.test(s.readyState)\n\n// IE 10 (3 events on 1st load)\n// 1) event.type = readystatechange, s.readyState = loading\n// 2) event.type = load            , s.readyState = complete\n// 3) event.type = readystatechange, s.readyState = loaded\n\n// IE 10 (3 events on reload)\n// 1) event.type = readystatechange, s.readyState = loaded\n// 2) event.type = load            , s.readyState = complete\n// 3) event.type = readystatechange, s.readyState = complete \n\n// event.type === \'load\'             &#x26;&#x26; /loaded¦complete/.test(s.readyState)\n// event.type === \'readystatechange\' &#x26;&#x26; /complete/.test(s.readyState)\n\n// Other Browsers (1 event on 1st load)\n// 1) event.type = load, s.readyState = undefined\n\n// Other Browsers (1 event on reload)\n// 1) event.type = load, s.readyState = undefined            \n\n// event.type == \'load\' &#x26;&#x26; s.readyState = undefined\n</code></pre>\n<p>当然，如果遇到了既不支持onload又不支持onreadystatechange的浏览器的时候，我们只能另寻他法了。  </p>\n<p>如果要加载的脚本是你写的，那你自己可以处理～如果加载的脚本不是你写的～哦喽，不在本文讨论范围之内～  </p>\n<blockquote>\n<blockquote>\n<p>当你需要jsHandler检测加载是否超时的时候  </p>\n</blockquote>\n</blockquote>\n<p>我们为jsHandler增加一个参数timeout，并在函数中实现如下逻辑  </p>\n<pre><code data-query="{}" data-lang="">function jsHandler(src, callback, timeout) {\n    ...\n    // 检测是否超时的标志\n    var isTimeout = true;\n    ...\n\n    if (timeout) {\n        setTimeout(timeoutHandler, timeout);\n    }\n\n    head.appendChild(script);\n\n    function jsOnload(error) {\n        // 当在时间内完成操作时，不管是否成功，将超时标志设为false\n        isTimeout = false;\n        script.onload = script.onerror = script.onreadystatechange = null;\n        head.removeChild(script);\n        script = null;\n        callback(error);\n    }\n\n    function timeoutHandler() {\n        // 如果标志未改变，认为其超时\n        if (isTimeout) {\n            jsOnload(true);\n        }\n    }\n}\n</code></pre>\n<blockquote>\n<blockquote>\n<p>当我们同步执行代码的时候  </p>\n</blockquote>\n</blockquote>\n<p>当我们需要加载一个或者多个脚本的时候，我们会发现，“奥我次奥，怎么请求了那么多次呢？这不科学。”  </p>\n<p>这是因为我们的loader在多处被调用或同步调用了，于是我们想啊，搞个map纪录缓存算了。于是乎：  </p>\n<p>－ 我们需要一些变量  </p>\n<pre><code data-query="{}" data-lang="">// 用作存储脚本信息\nvar cache = {};\n// 用作生成不重复的客户端id\nvar _cid = 0;\n// 用作存储其他loader实例需要运行的脚本任务\nvar processCache = {};\n\n// 加载状态标识\nvar DONE = \'done\';\nvar REJECTED = \'rejected\';\nvar PENDING = \'pending\';\n</code></pre>\n<ul>\n<li>我们需要产生不同的存储id</li>\n</ul>\n<pre><code data-query="{}" data-lang="">/**\n * 产生客户端id\n * @return {Number} [description]\n */\nfunction cid() {\n    return _cid++;\n}\n</code></pre>\n<ul>\n<li>我们需要创建一个Script类，new一个实例用于存储任务的基本信息</li>\n</ul>\n<pre><code data-query="{}" data-lang="">/**\n * Script对象，储存需要加载的任务的基本信息\n * @param  {String} uri     uri 地址 | 需要执行的函数\n * @param  {String} type    任务类型\n */\nfunction Script(uri, type) {\n    this.uri = uri;\n    this.type = type;\n    this.cid = cid();\n    this.status = PENDING;\n}\n</code></pre>\n<p>－ 当我们寻找缓存中的任务对象的时候，因该返回正确的对象。怎么寻找缓存呢，当然是通过地址来索引啦  </p>\n<pre><code data-query="{}" data-lang="">/**\n * 从缓存中获取需要的Script对象\n * 如果没有，新建一个\n * @param  {String} uri     uri 地址 | 需要执行的函数\n * @param  {String} type    任务类型\n * @return {Object}         需要的Script对象\n */\nfunction get(uri, type) {\n    // 如果不存在于缓存中，创建一个新的Script对象\n    return cache[uri] || (cache[uri] = new Script(uri, type));\n}\n</code></pre>\n<blockquote>\n<blockquote>\n<p>如果我们的脚本或函数有别名怎么办！  </p>\n</blockquote>\n</blockquote>\n<pre><code data-query="{}" data-lang="">var alias = {};\n/**\n * 获取有别名的Script对象\n * @param  {String} uri     uri 地址 | 需要执行的函数\n * @param  {String} type    任务类型\n * @return {Object}      Script Object\n */\nfunction getCache(uri, type) {\n    var src = getAlias(uri);\n    return  src ? get(src) : get(uri, type);\n}\n\n/**\n * 获取真实地址\n * @param  {String} name [description]\n * @return {[type]}      return uri\n */\nfunction getAlias(name) {\n    return alias[name];\n}\n</code></pre>\n<p>别名的用途在于我们不用多次输入同样长度的uri,或者说是函数。  </p>\n<blockquote>\n<blockquote>\n<p>现在，该填充我们的Loader类了。  </p>\n</blockquote>\n</blockquote>\n<p>我们要很清楚的知道，Loader需要做什么。  </p>\n<p>一个简单的Loader应该可以多次添加需要加载的内容，then或者add方法可以让用户添加任务。那它应该有一个内置的list，可以存储这些待添加的任务。  </p>\n<p>它也应该可以在全部脚本加载完的时候执行我们的callback，那么我们应该实现一个方法接受一个回调，在任务执行完时调用。  </p>\n<p>我们也要可以对某些地址进行别名命名，也需要设置超时时间  </p>\n<ul>\n<li>实现Loader类</li>\n</ul>\n<pre><code data-query="{}" data-lang="">/**\n * Loader类\n */\nvar Loader = function () {\n    this.list = [];\n    this.timeout = 0;\n    this.callback = null;\n};\n</code></pre>\n<ul>\n<li>实现then方法，使用then的时候应该可以连续使用</li>\n</ul>\n<pre><code data-query="{}" data-lang="">/**\n * 实现的then方法\n * @param  {String} src  地址\n * @param  {String} type 类型\n * @return {Object}      Loader对象\n */\nLoader.prototype.then = function(src, type) {\n    if (src === undefined) {\n        throw new Error(\'木有参数\');\n    }\n\n    //  修正参数\n    if (!type) {\n        if (typeof src === \'string\') {\n            if (/\\.css$|\\.css\\?/i.test(src)) {\n                type = \'css\';\n            }\n            if (/\\.js$|\\.js\\?/i.test(src)) {\n                type = \'js\';\n            }\n        }\n        if (typeof src === \'function\') {\n            type = \'fn\'\n        }\n    }\n\n    type = type || \'js\';\n    this.list.push(getCache(src, type));\n    return this;\n};\n</code></pre>\n<ul>\n<li>实现done方法</li>\n</ul>\n<pre><code data-query="{}" data-lang="">/**\n * done方法，接受一个callback，在所有任务完成时调用\n * @param  {Function} cb 完成后的回调\n * @return {Object}      第一次调用done后返回一个新的对象\n */\nLoader.prototype.done = function(cb) {\n    if (this.callback === null) {\n        this.callback = cb;\n    }\n    if (!this.list.length) {\n        this.callback &#x26;&#x26; this.callback();\n        return;\n    }\n    var script = this.list.shift();\n    handler[script.type](this, script);\n    if (!this.called) {\n        this.called = true;\n        return new Loader();\n    }\n};\n</code></pre>\n<ul>\n<li>实现config配置</li>\n</ul>\n<pre><code data-query="{}" data-lang="">Loader.prototype.config = function (opts) {\n    this.timeout = opts.timeout || 0;\n    if (opts.alias &#x26;&#x26; !opts.alias.length) {\n        for (var i = opts.alias.length - 1; i >= 0; i--) {\n            alias[i] = opts.alias[i];\n        }\n    }\n}\n</code></pre>\n<blockquote>\n<blockquote>\n<p>如何让错误集中显示  </p>\n</blockquote>\n</blockquote>\n<p>我们需要接入一个resolve方法，Loader类也应该有一个errors的列表来储存每次错误的信息，最后放到callback中集中显示。  </p>\n<pre><code data-query="{}" data-lang="">function resolve(loader, s) {\n    if (s.error) {\n        loader.errors.push(s);\n    }\n    loader.done();\n    var cache = processCache[s.cid];\n    if (cache &#x26;&#x26; !cache.length) {\n        for (var i = 0, len = cache.length; i &#x3C; len; i++) {\n            cache.shift().loader.done();\n        }\n    }\n}\n\nvar Loader = function () {\n    this.list = [];\n    this.timeout = 0;\n    this.errors = [];\n    this.callback = null;\n};\n</code></pre>\n<blockquote>\n<blockquote>\n<p>最终，我们将所有的思路组装起来  </p>\n</blockquote>\n</blockquote>\n<pre><code data-query="{}" data-lang="">(function (root, factory) {\n    if (typeof define === \'function\' &#x26;&#x26; define.amd) {\n        // AMD. Register as an anonymous module.\n        define(factory);\n    } else {\n        // Browser globals\n        root.Loader = factory();\n    }\n}(this, function () {\n\n    // 用作存储脚本信息\n    var cache = {};\n    // 用作生成不重复的客户端id\n    var _cid = 0;\n    // 用作存储其他loader实例需要运行的脚本任务\n    var processCache = {};\n    // 用作储存别名\n    window.alias = {};\n\n    // 加载状态标识\n    var DONE = \'done\';\n    var REJECTED = \'rejected\';\n    var PENDING = \'pending\';\n\n    // 获取document,head\n    var doc = document;\n    var head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;\n\n    /**\n     * 产生客户端id\n     * @return {Number} [description]\n     */\n    function cid() {\n        return _cid++;\n    }\n\n    /**\n     * Script对象，储存需要加载的任务的基本信息\n     * @param  {String} uri     uri 地址 | 需要执行的函数\n     * @param  {String} type    任务类型\n     */\n    function Script(uri, type) {\n        this.uri = uri;\n        this.type = type;\n        this.cid = cid();\n        this.status = PENDING;\n    }\n\n    /**\n     * 从缓存中获取需要的Script对象\n     * 如果没有，新建一个\n     * @param  {String} uri     uri 地址 | 需要执行的函数\n     * @param  {String} type    任务类型\n     * @return {Object}         需要的Script对象\n     */\n    function get(uri, type) {\n        // 如果不存在于缓存中，创建一个新的Script对象\n        return cache[uri] || (cache[uri] = new Script(uri, type));\n    }\n\n    /**\n     * 获取真实地址\n     * @param  {String} name [description]\n     * @return {[type]}      return uri\n     */\n    function getAlias(name) {\n        return alias[name];\n    }\n\n    function getCache(uri, type) {\n        var opts = getAlias(uri);\n        return  opts ? get(opts.uri, opts.type) : get(uri, type);\n    }\n\n    // 处理\n    var handler = {\n        js: jsHandler,\n        css: cssHandler,\n        fn: fnHandler\n    };\n\n    // 对函数的处理\n    function fnHandler(context, s) {\n        // 函数不需要判断是否为正在加载状态\n        try {\n            s.uri();\n            resolve(context, s);\n        }\n        catch (e) {\n            s.error = e.message;\n            resolve(context, s);\n        }\n    }\n\n    // 对css请求的处理\n    function cssHandler(context, s) {\n        // 当其他Loader实体中的任务已经完成时\n        if (s.status !== PENDING) {\n            resolve(context, s);\n            return;\n        }\n        var link = document.createElement(\'link\');\n        link.type = \'text/css\';\n        link.rel  = \'stylesheet\'\n        link.href = s.uri;\n        head.appendChild(link);\n        resolve(context, s);\n    };\n\n    // 对js动态加载的处理\n    function jsHandler(context, s) {\n\n        // 处理已完成任务\n        if (s.status !== PENDING) {\n            resolve(context, s);\n            return;\n        }\n\n        // 如果非第一个加载，将剩余的任务和任务关联的上下文塞进正在进行的进程中\n        if (s.changeState) {\n            processCache[s.cid] = processCache[s.cid] || [];\n            processCache[s.cid].push({ loader: context, s: s });\n            return;\n        }\n\n        s.changeState = true;\n\n        // 设置超时标志\n        var isTimeout = true;\n        var script = document.createElement(\'script\');\n        script.async = true;\n        script.src = s.uri;\n\n        // 如果支持onload事件\n        var hasOnload = \'onload\' in script;\n\n\n        if (hasOnload) {\n            script.onload = jsOnload;\n            script.onerror = function () {\n                jsOnload(\'ScriptError\');\n            }\n        }\n        else {\n            script.onreadystatechange = function() {\n                if (/loaded|complete/.test(script.readyState)) {\n                    jsOnload();\n                }\n            }\n        }\n\n        // 如果设置了超时，启动一个计时器\n        if (context.timeout) {\n            setTimeout(timeoutHandler, context.timeout);\n        }\n\n        head.appendChild(script);\n\n        function jsOnload(error) {\n            isTimeout = false;\n            script.onload = script.onerror = script.onreadystatechange = null;\n            head.removeChild(script);\n            script = null;\n            if (error &#x26;&#x26; typeof error === \'string\') {\n                s.error = error;\n            }\n            resolve(context, s);\n        }\n\n        function timeoutHandler() {\n            if (isTimeout) {\n                console.log(\'timeout\');\n                jsOnload(\'RequestTimeout\');\n            }\n        }\n    }\n\n    function resolve(loader, s) {\n        if (s.error) {\n            loader.errors.push(s);\n        }\n        loader.done();\n        var cache = processCache[s.cid];\n        if (cache &#x26;&#x26; !cache.length) {\n            for (var i = 0, len = cache.length; i &#x3C; len; i++) {\n                cache.shift().loader.done();\n            }\n        }\n    }\n\n    var Loader = function () {\n        this.list = [];\n        this.errors = [];\n        this.timeout = [];\n        this.callback = null;\n    };\n\n    Loader.prototype.then = function(src, type) {\n        if (src === undefined) {\n            throw new Error(\'木有参数\');\n        }\n\n        //  修正参数\n        if (!type) {\n            if (typeof src === \'string\') {\n                if (/\\.css$|\\.css\\?/i.test(src)) {\n                    type = \'css\';\n                }\n                if (/\\.js$|\\.js\\?/i.test(src)) {\n                    type = \'js\';\n                }\n            }\n            if (typeof src === \'function\') {\n                type = \'fn\'\n            }\n        }\n\n        type = type || \'js\';\n        this.list.push(getCache(src, type));\n        return this;\n    };\n\n    Loader.prototype.done = function(cb) {\n        if (this.callback === null) {\n            this.callback = cb;\n        }\n        if (!this.list.length) {\n            this.callback &#x26;&#x26; this.callback(this.errors);\n            return;\n        }\n        var script = this.list.shift();\n        handler[script.type](this, script);\n        if (!this.called) {\n            this.called = true;\n            return new Loader();\n        }\n    };\n\n    Loader.prototype.config = function (opts) {\n        this.timeout = opts.timeout || 0;\n        if (opts.alias &#x26;&#x26; !opts.alias.length) {\n            for (var i in alias) {\n\n            }\n            for (var i = opts.alias.length - 1; i >= 0; i--) {\n                alias[i] = opts.alias[i]\n            }\n        }\n        return this;\n    };\n\n    return Loader;\n}));\n</code></pre>\n<p>除了此类常规的写法，我们其实还可以使用其他更多的方法来实现脚本动态加载，比如自定义事件，比如模块化加载的实现，比如promise实现等等  </p>\n<p>这篇文章的意义在于开阔思维，回顾基础。  </p>\n<p>下面的observer对象实现了一个简单的事件注册，监听，销毁的功能，对模式有过研究或者码力深厚的同学肯定不陌生。  </p>\n<pre><code data-query="{}" data-lang="">var observer = (function () {\n\n    var list = {};\n\n    var on = function (evt, cb) {\n        if (!list[evt]) {\n            list[evt] = [];\n        }\n        list[evt].push(cb);\n    };\n\n    var trigger = function () {\n        var evtName = Array.prototype.shift.call(arguments);\n        callbacks = list[evtName];\n        if (!callbacks || callbacks.length === 0) {\n            return;\n        }\n        for (var i = 0, len = callbacks.length; i &#x3C; len; i++) {\n            callbacks[i].apply(this, arguments);\n        }\n    };\n\n    var off = function (evt, fn) {\n        var callbacks = list[evt];\n        if (!callbacks) {\n            return;\n        }\n        if (!fn) {\n            callbacks &#x26;&#x26; callbacks.length = 0;\n            return;\n        }\n        for (var i = 0, len = callbacks.length i &#x3C; len; i++) {\n            if (fn === callbacks[i]) {\n                callbacks.splice(i, 1);\n            }\n        }\n    };\n\n    // 暴露对外接口\n    return {\n        trigger: trigger,\n        on: on,\n        off: off\n    }\n})();\n</code></pre>\n<blockquote>\n<blockquote>\n<p>延伸阅读  </p>\n</blockquote>\n</blockquote>\n<p><a href="http://malcolmyu.github.io/malnote/2014/08/30/JavaScript-Promise-In-Wicked-Detail/">JavaScript Promise 探微</a>  </p>\n<p><a href="https://github.com/lifesinger/lifesinger.github.io/issues/170">SeaJs源码解析1</a>  </p>\n<p><a href="https://github.com/lifesinger/lifesinger.github.io/issues/171">SeaJs源码解析2</a>  </p>\n<p><a href="https://github.com/lifesinger/lifesinger.github.io/issues/175">SeaJs源码解析3</a>  </p>\n<p><a href="http://qianduanblog.com/post/headjs.html">HeadJs</a></p>\n',extra:{}}}});