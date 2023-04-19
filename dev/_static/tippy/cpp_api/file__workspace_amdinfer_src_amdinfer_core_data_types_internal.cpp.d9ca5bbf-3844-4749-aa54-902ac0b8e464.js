selector_to_html = {"a[href=\"#definition-workspace-amdinfer-src-amdinfer-core-data-types-internal-cpp\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Definition (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/src/amdinfer/core/data_types_internal.cpp</span></code>)<a class=\"headerlink\" href=\"#definition-workspace-amdinfer-src-amdinfer-core-data-types-internal-cpp\" title=\"Permalink to this heading\">\u00b6</a></h2>", "a[href=\"program_listing_file__workspace_amdinfer_src_amdinfer_core_data_types_internal.cpp.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Program Listing for File data_types_internal.cpp<a class=\"headerlink\" href=\"#program-listing-for-file-data-types-internal-cpp\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"file__workspace_amdinfer_src_amdinfer_core_data_types_internal.cpp.html#file-workspace-amdinfer-src-amdinfer-core-data-types-internal-cpp\"><span class=\"std std-ref\">Return to documentation for file</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/src/amdinfer/core/data_types_internal.cpp</span></code>)</p>", "a[href=\"#file-data-types-internal-cpp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">File data_types_internal.cpp<a class=\"headerlink\" href=\"#file-data-types-internal-cpp\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"dir__workspace_amdinfer_src_amdinfer_core.html#dir-workspace-amdinfer-src-amdinfer-core\"><span class=\"std std-ref\">Parent directory</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/src/amdinfer/core</span></code>)</p><p>Implements the type-related methods internally.</p>", "a[href=\"file__workspace_amdinfer_src_amdinfer_util_string.hpp.html#file-workspace-amdinfer-src-amdinfer-util-string-hpp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">File string.hpp<a class=\"headerlink\" href=\"#file-string-hpp\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"dir__workspace_amdinfer_src_amdinfer_util.html#dir-workspace-amdinfer-src-amdinfer-util\"><span class=\"std std-ref\">Parent directory</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/src/amdinfer/util</span></code>)</p>", "a[href=\"file__workspace_amdinfer_src_amdinfer_core_data_types_internal.hpp.html#file-workspace-amdinfer-src-amdinfer-core-data-types-internal-hpp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">File data_types_internal.hpp<a class=\"headerlink\" href=\"#file-data-types-internal-hpp\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"dir__workspace_amdinfer_src_amdinfer_core.html#dir-workspace-amdinfer-src-amdinfer-core\"><span class=\"std std-ref\">Parent directory</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/src/amdinfer/core</span></code>)</p><p>Defines the used data types internally.</p>", "a[href=\"dir__workspace_amdinfer_src_amdinfer_core.html#dir-workspace-amdinfer-src-amdinfer-core\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Directory core<a class=\"headerlink\" href=\"#directory-core\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"dir__workspace_amdinfer_src_amdinfer.html#dir-workspace-amdinfer-src-amdinfer\"><span class=\"std std-ref\">Parent directory</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/src/amdinfer</span></code>)</p><p><em>Directory path:</em> <code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/src/amdinfer/core</span></code></p>", "a[href=\"file__workspace_amdinfer_include_amdinfer_core_exceptions.hpp.html#file-workspace-amdinfer-include-amdinfer-core-exceptions-hpp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">File exceptions.hpp<a class=\"headerlink\" href=\"#file-exceptions-hpp\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"dir__workspace_amdinfer_include_amdinfer_core.html#dir-workspace-amdinfer-include-amdinfer-core\"><span class=\"std std-ref\">Parent directory</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/include/amdinfer/core</span></code>)</p><p>Defines the exception classes. Exception classes follow lower-case snake case name syntax of the standard exceptions in std.</p>", "a[href=\"#includes\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Includes<a class=\"headerlink\" href=\"#includes\" title=\"Permalink to this heading\">\u00b6</a></h2>"}
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