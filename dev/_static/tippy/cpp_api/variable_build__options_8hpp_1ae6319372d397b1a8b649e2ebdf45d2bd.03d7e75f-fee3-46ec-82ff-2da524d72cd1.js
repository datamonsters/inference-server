selector_to_html = {"a[href=\"#_CPPv418kMaxClientBodySize\"]": "<dt class=\"sig sig-object cpp\" id=\"_CPPv418kMaxClientBodySize\">\n<span id=\"_CPPv318kMaxClientBodySize\"></span><span id=\"_CPPv218kMaxClientBodySize\"></span><span id=\"kMaxClientBodySize__auto\"></span><span class=\"target\" id=\"build__options_8hpp_1ae6319372d397b1a8b649e2ebdf45d2bd\"></span><span class=\"k\"><span class=\"pre\">constexpr</span></span><span class=\"w\"> </span><span class=\"kt\"><span class=\"pre\">auto</span></span><span class=\"w\"> </span><span class=\"sig-name descname\"><span class=\"n\"><span class=\"pre\">kMaxClientBodySize</span></span></span><span class=\"w\"> </span><span class=\"p\"><span class=\"pre\">=</span></span><span class=\"w\"> </span><span class=\"m\"><span class=\"pre\">419430400</span></span><br/></dt><dd><p>Maximum size of a HTTP request body in MiB. Arbitrarily set to 400MiB. </p></dd>", "a[href=\"#variable-kmaxclientbodysize\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Variable kMaxClientBodySize<a class=\"headerlink\" href=\"#variable-kmaxclientbodysize\" title=\"Permalink to this heading\">\u00b6</a></h1><h2>Variable Documentation<a class=\"headerlink\" href=\"#variable-documentation\" title=\"Permalink to this heading\">\u00b6</a></h2>", "a[href=\"#variable-documentation\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Variable Documentation<a class=\"headerlink\" href=\"#variable-documentation\" title=\"Permalink to this heading\">\u00b6</a></h2>", "a[href=\"file__workspace_amdinfer_include_amdinfer_build_options.hpp.html#file-workspace-amdinfer-include-amdinfer-build-options-hpp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">File build_options.hpp<a class=\"headerlink\" href=\"#file-build-options-hpp\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"dir__workspace_amdinfer_include_amdinfer.html#dir-workspace-amdinfer-include-amdinfer\"><span class=\"std std-ref\">Parent directory</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/include/amdinfer</span></code>)</p><p>Defines the build information. This file is updated automatically by CMake. To update, recompile the amdinfer source code.</p>"}
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