selector_to_html = {"a[href=\"file__workspace_amdinfer_src_amdinfer_workers_invert_video.cpp.html#file-workspace-amdinfer-src-amdinfer-workers-invert-video-cpp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">File invert_video.cpp<a class=\"headerlink\" href=\"#file-invert-video-cpp\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"dir__workspace_amdinfer_src_amdinfer_workers.html#dir-workspace-amdinfer-src-amdinfer-workers\"><span class=\"std std-ref\">Parent directory</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/src/amdinfer/workers</span></code>)</p><p>Implements the InvertVideo worker.</p>", "a[href=\"#variable-documentation\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Variable Documentation<a class=\"headerlink\" href=\"#variable-documentation\" title=\"Permalink to this heading\">\u00b6</a></h2>", "a[href=\"../cpp_user_api.html#_CPPv48amdinfer\"]": "<dt class=\"sig sig-object cpp\" id=\"_CPPv48amdinfer\">\n<span id=\"_CPPv38amdinfer\"></span><span id=\"_CPPv28amdinfer\"></span><span id=\"amdinfer\"></span><span class=\"target\" id=\"namespaceamdinfer\"></span><span class=\"k\"><span class=\"pre\">namespace</span></span><span class=\"w\"> </span><span class=\"sig-name descname\"><span class=\"n\"><span class=\"pre\">amdinfer</span></span></span><br/></dt><dd></dd>", "a[href=\"#_CPPv4N8amdinfer7workers13kMaxUrlLengthE\"]": "<dt class=\"sig sig-object cpp\" id=\"_CPPv4N8amdinfer7workers13kMaxUrlLengthE\">\n<span id=\"_CPPv3N8amdinfer7workers13kMaxUrlLengthE\"></span><span id=\"_CPPv2N8amdinfer7workers13kMaxUrlLengthE\"></span><span id=\"amdinfer::workers::kMaxUrlLength__autoC\"></span><span class=\"target\" id=\"invert__video_8cpp_1ad040ac198e6b944c664091b286f73212\"></span><span class=\"k\"><span class=\"pre\">const</span></span><span class=\"w\"> </span><span class=\"kt\"><span class=\"pre\">auto</span></span><span class=\"w\"> </span><span class=\"sig-prename descclassname\"><a class=\"reference internal\" href=\"../cpp_user_api.html#_CPPv48amdinfer\" title=\"amdinfer\"><span class=\"n\"><span class=\"pre\">amdinfer</span></span></a><span class=\"p\"><span class=\"pre\">::</span></span><span class=\"n\"><span class=\"pre\">workers</span></span><span class=\"p\"><span class=\"pre\">::</span></span></span><span class=\"sig-name descname\"><span class=\"n\"><span class=\"pre\">kMaxUrlLength</span></span></span><span class=\"w\"> </span><span class=\"p\"><span class=\"pre\">=</span></span><span class=\"w\"> </span><span class=\"m\"><span class=\"pre\">128</span></span><br/></dt><dd></dd>", "a[href=\"#variable-amdinfer-workers-kmaxurllength\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Variable amdinfer::workers::kMaxUrlLength<a class=\"headerlink\" href=\"#variable-amdinfer-workers-kmaxurllength\" title=\"Permalink to this heading\">\u00b6</a></h1><h2>Variable Documentation<a class=\"headerlink\" href=\"#variable-documentation\" title=\"Permalink to this heading\">\u00b6</a></h2>"}
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