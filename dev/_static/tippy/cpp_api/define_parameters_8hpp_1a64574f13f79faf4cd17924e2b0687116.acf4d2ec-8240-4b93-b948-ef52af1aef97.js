selector_to_html = {"a[href=\"#define-guard-amdinfer-core-parameters\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Define GUARD_AMDINFER_CORE_PARAMETERS<a class=\"headerlink\" href=\"#define-guard-amdinfer-core-parameters\" title=\"Permalink to this heading\">\u00b6</a></h1><h2>Define Documentation<a class=\"headerlink\" href=\"#define-documentation\" title=\"Permalink to this heading\">\u00b6</a></h2>", "a[href=\"#define-documentation\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Define Documentation<a class=\"headerlink\" href=\"#define-documentation\" title=\"Permalink to this heading\">\u00b6</a></h2>", "a[href=\"file__workspace_amdinfer_include_amdinfer_core_parameters.hpp.html#file-workspace-amdinfer-include-amdinfer-core-parameters-hpp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">File parameters.hpp<a class=\"headerlink\" href=\"#file-parameters-hpp\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"dir__workspace_amdinfer_include_amdinfer_core.html#dir-workspace-amdinfer-include-amdinfer-core\"><span class=\"std std-ref\">Parent directory</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/include/amdinfer/core</span></code>)</p><p>Defines the Parameter object and associated containers.</p>", "a[href=\"#c.GUARD_AMDINFER_CORE_PARAMETERS\"]": "<dt class=\"sig sig-object cpp\" id=\"c.GUARD_AMDINFER_CORE_PARAMETERS\">\n<span class=\"target\" id=\"parameters_8hpp_1a64574f13f79faf4cd17924e2b0687116\"></span><span class=\"sig-name descname\"><span class=\"n\"><span class=\"pre\">GUARD_AMDINFER_CORE_PARAMETERS</span></span></span><br/></dt><dd></dd>"}
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