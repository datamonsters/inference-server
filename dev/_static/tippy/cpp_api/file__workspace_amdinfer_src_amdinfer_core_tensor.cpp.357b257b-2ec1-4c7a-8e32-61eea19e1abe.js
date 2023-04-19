selector_to_html = {"a[href=\"file__workspace_amdinfer_src_amdinfer_util_containers.hpp.html#file-workspace-amdinfer-src-amdinfer-util-containers-hpp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">File containers.hpp<a class=\"headerlink\" href=\"#file-containers-hpp\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"dir__workspace_amdinfer_src_amdinfer_util.html#dir-workspace-amdinfer-src-amdinfer-util\"><span class=\"std std-ref\">Parent directory</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/src/amdinfer/util</span></code>)</p><p>Implements helpful functions for working with containers in the standard library.</p>", "a[href=\"#classes\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Classes<a class=\"headerlink\" href=\"#classes\" title=\"Permalink to this heading\">\u00b6</a></h2>", "a[href=\"#namespaces\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Namespaces<a class=\"headerlink\" href=\"#namespaces\" title=\"Permalink to this heading\">\u00b6</a></h2>", "a[href=\"structamdinfer_1_1TensorSizes.html#exhale-struct-structamdinfer-1-1tensorsizes\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Struct TensorSizes<a class=\"headerlink\" href=\"#struct-tensorsizes\" title=\"Permalink to this heading\">\u00b6</a></h1><h2>Struct Documentation<a class=\"headerlink\" href=\"#struct-documentation\" title=\"Permalink to this heading\">\u00b6</a></h2>", "a[href=\"namespace_amdinfer.html#namespace-amdinfer\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Namespace amdinfer<a class=\"headerlink\" href=\"#namespace-amdinfer\" title=\"Permalink to this heading\">\u00b6</a></h1><h2>Namespaces<a class=\"headerlink\" href=\"#namespaces\" title=\"Permalink to this heading\">\u00b6</a></h2>", "a[href=\"#definition-workspace-amdinfer-src-amdinfer-core-tensor-cpp\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Definition (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/src/amdinfer/core/tensor.cpp</span></code>)<a class=\"headerlink\" href=\"#definition-workspace-amdinfer-src-amdinfer-core-tensor-cpp\" title=\"Permalink to this heading\">\u00b6</a></h2>", "a[href=\"program_listing_file__workspace_amdinfer_src_amdinfer_core_tensor.cpp.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Program Listing for File tensor.cpp<a class=\"headerlink\" href=\"#program-listing-for-file-tensor-cpp\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"file__workspace_amdinfer_src_amdinfer_core_tensor.cpp.html#file-workspace-amdinfer-src-amdinfer-core-tensor-cpp\"><span class=\"std std-ref\">Return to documentation for file</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/src/amdinfer/core/tensor.cpp</span></code>)</p>", "a[href=\"file__workspace_amdinfer_src_amdinfer_util_memory.hpp.html#file-workspace-amdinfer-src-amdinfer-util-memory-hpp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">File memory.hpp<a class=\"headerlink\" href=\"#file-memory-hpp\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"dir__workspace_amdinfer_src_amdinfer_util.html#dir-workspace-amdinfer-src-amdinfer-util\"><span class=\"std std-ref\">Parent directory</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/src/amdinfer/util</span></code>)</p><p>Defines helper functions associated with managing memory.</p>", "a[href=\"dir__workspace_amdinfer_src_amdinfer_core.html#dir-workspace-amdinfer-src-amdinfer-core\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Directory core<a class=\"headerlink\" href=\"#directory-core\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"dir__workspace_amdinfer_src_amdinfer.html#dir-workspace-amdinfer-src-amdinfer\"><span class=\"std std-ref\">Parent directory</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/src/amdinfer</span></code>)</p><p><em>Directory path:</em> <code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/src/amdinfer/core</span></code></p>", "a[href=\"file__workspace_amdinfer_include_amdinfer_core_tensor.hpp.html#file-workspace-amdinfer-include-amdinfer-core-tensor-hpp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">File tensor.hpp<a class=\"headerlink\" href=\"#file-tensor-hpp\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"dir__workspace_amdinfer_include_amdinfer_core.html#dir-workspace-amdinfer-include-amdinfer-core\"><span class=\"std std-ref\">Parent directory</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/include/amdinfer/core</span></code>)</p>", "a[href=\"#file-tensor-cpp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">File tensor.cpp<a class=\"headerlink\" href=\"#file-tensor-cpp\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"dir__workspace_amdinfer_src_amdinfer_core.html#dir-workspace-amdinfer-src-amdinfer-core\"><span class=\"std std-ref\">Parent directory</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/src/amdinfer/core</span></code>)</p>", "a[href=\"#includes\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Includes<a class=\"headerlink\" href=\"#includes\" title=\"Permalink to this heading\">\u00b6</a></h2>"}
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