selector_to_html = {"a[href=\"file__workspace_amdinfer_src_amdinfer_batching_soft.cpp.html#file-workspace-amdinfer-src-amdinfer-batching-soft-cpp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">File soft.cpp<a class=\"headerlink\" href=\"#file-soft-cpp\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"dir__workspace_amdinfer_src_amdinfer_batching.html#dir-workspace-amdinfer-src-amdinfer-batching\"><span class=\"std std-ref\">Parent directory</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/src/amdinfer/batching</span></code>)</p><p>Implements the soft batcher.</p>", "a[href=\"#variable-kdefaulttimeout\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Variable kDefaultTimeout<a class=\"headerlink\" href=\"#variable-kdefaulttimeout\" title=\"Permalink to this heading\">\u00b6</a></h1><h2>Variable Documentation<a class=\"headerlink\" href=\"#variable-documentation\" title=\"Permalink to this heading\">\u00b6</a></h2>", "a[href=\"#variable-documentation\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Variable Documentation<a class=\"headerlink\" href=\"#variable-documentation\" title=\"Permalink to this heading\">\u00b6</a></h2>"}
skip_classes = ["headerlink", "sd-stretched-link"]

window.onload = function () {
    for (const [select, tip_html] of Object.entries(selector_to_html)) {
        const links = document.querySelectorAll(` ${select}`);
        for (const link of links) {
            if (skip_classes.some(c => link.classList.contains(c))) {
                continue;
            }

            tippy(link, {
                content: tip_html,
                allowHTML: true,
                arrow: true,
                placement: 'auto-start', maxWidth: 500, interactive: false,

            });
        };
    };
    console.log("tippy tips loaded!");
};