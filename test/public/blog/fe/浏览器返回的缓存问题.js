webpackJsonp([18,40],{932:function(n,a){n.exports={content:'<h3 id="缘起"><a href="#%E7%BC%98%E8%B5%B7" aria-hidden="true"><span class="icon icon-link"></span></a>缘起</h3>\n<p><span class="md-line md-end-block">写这篇文章源于一个需求：我们在账号注册、找回、设置的时候往往需要</span>  </p>\n<pre><code data-query="{}" data-lang="">entry => step1 => step2 => step3 => entry\n</code></pre>\n<p><span class="md-line md-end-block">那么到了entry页面之后，如果我们点击浏览器的返回，那么按理说是不能返回的</span>  </p>\n<pre><code data-query="{}" data-lang="">entey => step3 => step2 => step1 => entey\n</code></pre>\n<p><span class="md-line md-end-block">为了解决这个问题，我们需要用到history API，实现：</span>  </p>\n<pre><code data-query="{}" data-lang="">entey => step3 => step2 => step1 ———\n  |                                |\n  ———————————————back———————————————\n</code></pre>\n<p><span class="md-line md-end-block">浏览器的history API支持负数让我们返回指定索引的历史页面，因为我的这个需求是在手机APP里，可以保证entry一定是第一个页面，所以就比较好处理了：</span>  </p>\n<pre><code data-query="{}" data-lang="">history.go(-(history.length-1));\n</code></pre>\n<p><span class="md-line md-end-block">这样就实现了我们想要的效果，但是新的问题又出现了……</span>  </p>\n<h3 id="新的问题，浏览器返回机制不同"><a href="#%E6%96%B0%E7%9A%84%E9%97%AE%E9%A2%98%EF%BC%8C%E6%B5%8F%E8%A7%88%E5%99%A8%E8%BF%94%E5%9B%9E%E6%9C%BA%E5%88%B6%E4%B8%8D%E5%90%8C" aria-hidden="true"><span class="icon icon-link"></span></a>新的问题，浏览器返回机制不同</h3>\n<p><span class="md-line md-end-block">我们在entry页展示了用户的手机号，当用户修改完返回entry页，应该看到的是修改后的手机号。但是在不同浏览器下，其表现并不一致。某些浏览器（safari、baidu T7、UC等）下，返回后JS初始化代码不执行，所以不会从服务器拉取新的手机号（注意，这是浏览器机制，和缓存无关）。</span>  </p>\n<p><span class="md-line md-end-block">举个更简单的例子：</span>  </p>\n<pre><code data-query="{}" data-lang="">alert(\'init\');\n$btn.on(\'click\', function() {\n    console(\'btn click\');\n});\n</code></pre>\n<p><span class="md-line md-end-block">返回后，alert不会执行，但是点击按钮后，console可以执行。</span>  </p>\n<p><span class="md-line md-end-block">其实这些浏览器的机制也是有一定道理的：</span><span class="md-line md-end-block">比如page1已经访问过了，返回后是之前访问时的状态，当我从page1 => page2, 如果在page1里的input填过东西，返回后就不用重新填写了，体验会比较好，可惜在这里成为了开发上的一个坑。</span>  </p>\n<p><span class="md-line md-end-block">而我们熟悉的Chrome浏览器，在返回的时候仅仅是静态资源会走缓存，页面还是会初始化，所以不存在这个问题。</span>  </p>\n<h4 id="如何解决"><a href="#%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3" aria-hidden="true"><span class="icon icon-link"></span></a>如何解决</h4>\n<h5 id="1-想办法让初始化js执行（多页应用）"><a href="#1-%E6%83%B3%E5%8A%9E%E6%B3%95%E8%AE%A9%E5%88%9D%E5%A7%8B%E5%8C%96js%E6%89%A7%E8%A1%8C%EF%BC%88%E5%A4%9A%E9%A1%B5%E5%BA%94%E7%94%A8%EF%BC%89" aria-hidden="true"><span class="icon icon-link"></span></a>1. 想办法让初始化JS执行（多页应用）</h5>\n<p><span class="md-line md-end-block">凡是会保存history快照的浏览器都不会真正销毁页面，当离开这个页面的时候，如果调用一个setTimeout延迟执行的函数，setTimeout内注册的回调函数会在再次进入该页面时入栈执行。所以可以这样解决：</span>  </p>\n<pre><code data-query="{}" data-lang="">var unload = isSafari ? \'pagehide\' : \'unload\'; //safari对unload的支持有问题，当然也可以直接使用pagehide\nwindow.addEventListener(unload, function() {\n    setTimeout(function () {\n        init(); //页面初始化函数\n    }, 200);\n});\n</code></pre>\n<h5 id="2-想办法监听到用户点返回的动作（对于单页应用）"><a href="#2-%E6%83%B3%E5%8A%9E%E6%B3%95%E7%9B%91%E5%90%AC%E5%88%B0%E7%94%A8%E6%88%B7%E7%82%B9%E8%BF%94%E5%9B%9E%E7%9A%84%E5%8A%A8%E4%BD%9C%EF%BC%88%E5%AF%B9%E4%BA%8E%E5%8D%95%E9%A1%B5%E5%BA%94%E7%94%A8%EF%BC%89" aria-hidden="true"><span class="icon icon-link"></span></a>2. 想办法监听到用户点返回的动作（对于单页应用）</h5>\n<p><span class="md-line md-end-block">返回操作会触发浏览器的<span spellcheck="false"><code>popstate</code></span>事件，因此可以在这方面想办法，没有实践过，不过参考<span class=""><a spellcheck="false" href="https://github.com/luokuning/blogs/issues/3">如何监听用户点击浏览器后退按钮</a></span>这篇文章应该是可以做到的。</span>  </p>\n<h4 id="参考资料"><a href="#%E5%8F%82%E8%80%83%E8%B5%84%E6%96%99" aria-hidden="true"><span class="icon icon-link"></span></a>参考资料</h4>\n<ul>\n<li><span class="md-line md-end-block"><span class=""><a spellcheck="false" href="http://harttle.com/2017/03/12/backward-forward-cache.html">浏览器前进/后退缓存（BF Cache）</a></span></span></li>\n<li><span class="md-line md-end-block"><span class=""><a spellcheck="false" href="https://segmentfault.com/a/1190000000692440">UC浏览器返回不更新页面的解决办法</a></span></span></li>\n<li><span class="md-line md-end-block"><span class=""><a spellcheck="false" href="https://github.com/luokuning/blogs/issues/3">如何监听用户点击浏览器后退按钮</a></span></span></li>\n<li><span class="md-line md-end-block"><span class=""><a spellcheck="false" href="https://developer.mozilla.org/zh-CN/docs/Web/Events/popstate">MDN-popstate</a></span></span></li>\n<li><span class="md-line md-end-block"><span class=""><a spellcheck="false" href="http://whutzkj.space/2017/01/14/H5%E6%B5%8F%E8%A7%88%E5%99%A8%E5%92%8Cwebview%E5%90%8E%E9%80%80%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6/">H5浏览器和webview后退缓存机制</a></span></span></li>\n</ul>\n',extra:{}}}});