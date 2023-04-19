selector_to_html = {"a[href=\"#typedef-amdinfer-util-timepoint\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Typedef amdinfer::util::TimePoint<a class=\"headerlink\" href=\"#typedef-amdinfer-util-timepoint\" title=\"Permalink to this heading\">\u00b6</a></h1><h2>Typedef Documentation<a class=\"headerlink\" href=\"#typedef-documentation\" title=\"Permalink to this heading\">\u00b6</a></h2>", "a[href=\"#_CPPv4N8amdinfer4util9TimePointE\"]": "<dt class=\"sig sig-object cpp\" id=\"_CPPv4N8amdinfer4util9TimePointE\">\n<span id=\"_CPPv3N8amdinfer4util9TimePointE\"></span><span id=\"_CPPv2N8amdinfer4util9TimePointE\"></span><span class=\"target\" id=\"timer_8hpp_1ac892ad2b905321f7e3be6dea415c4794\"></span><span class=\"k\"><span class=\"pre\">using</span></span><span class=\"w\"> </span><span class=\"sig-prename descclassname\"><a class=\"reference internal\" href=\"../cpp_user_api.html#_CPPv48amdinfer\" title=\"amdinfer\"><span class=\"n\"><span class=\"pre\">amdinfer</span></span></a><span class=\"p\"><span class=\"pre\">::</span></span><span class=\"n\"><span class=\"pre\">util</span></span><span class=\"p\"><span class=\"pre\">::</span></span></span><span class=\"sig-name descname\"><span class=\"n\"><span class=\"pre\">TimePoint</span></span></span><span class=\"w\"> </span><span class=\"p\"><span class=\"pre\">=</span></span><span class=\"w\"> </span><span class=\"n\"><span class=\"pre\">std</span></span><span class=\"p\"><span class=\"pre\">::</span></span><span class=\"n\"><span class=\"pre\">chrono</span></span><span class=\"p\"><span class=\"pre\">::</span></span><span class=\"n\"><span class=\"pre\">_V2</span></span><span class=\"p\"><span class=\"pre\">::</span></span><span class=\"n\"><span class=\"pre\">system_clock</span></span><span class=\"p\"><span class=\"pre\">::</span></span><span class=\"n\"><span class=\"pre\">time_point</span></span><br/></dt><dd></dd>", "a[href=\"file__workspace_amdinfer_src_amdinfer_util_timer.hpp.html#file-workspace-amdinfer-src-amdinfer-util-timer-hpp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">File timer.hpp<a class=\"headerlink\" href=\"#file-timer-hpp\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"dir__workspace_amdinfer_src_amdinfer_util.html#dir-workspace-amdinfer-src-amdinfer-util\"><span class=\"std std-ref\">Parent directory</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/src/amdinfer/util</span></code>)</p><p>Defines a helper timer class.</p>", "a[href=\"#typedef-documentation\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Typedef Documentation<a class=\"headerlink\" href=\"#typedef-documentation\" title=\"Permalink to this heading\">\u00b6</a></h2>", "a[href=\"../cpp_user_api.html#_CPPv48amdinfer\"]": "<dt class=\"sig sig-object cpp\" id=\"_CPPv48amdinfer\">\n<span id=\"_CPPv38amdinfer\"></span><span id=\"_CPPv28amdinfer\"></span><span id=\"amdinfer\"></span><span class=\"target\" id=\"namespaceamdinfer\"></span><span class=\"k\"><span class=\"pre\">namespace</span></span><span class=\"w\"> </span><span class=\"sig-name descname\"><span class=\"n\"><span class=\"pre\">amdinfer</span></span></span><br/></dt><dd></dd>"}
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