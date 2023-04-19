selector_to_html = {"a[href=\"#program-listing-for-file-grpc-hpp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Program Listing for File grpc.hpp<a class=\"headerlink\" href=\"#program-listing-for-file-grpc-hpp\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"file__workspace_amdinfer_include_amdinfer_clients_grpc.hpp.html#file-workspace-amdinfer-include-amdinfer-clients-grpc-hpp\"><span class=\"std std-ref\">Return to documentation for file</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/include/amdinfer/clients/grpc.hpp</span></code>)</p>", "a[href=\"file__workspace_amdinfer_include_amdinfer_clients_grpc.hpp.html#file-workspace-amdinfer-include-amdinfer-clients-grpc-hpp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">File grpc.hpp<a class=\"headerlink\" href=\"#file-grpc-hpp\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"dir__workspace_amdinfer_include_amdinfer_clients.html#dir-workspace-amdinfer-include-amdinfer-clients\"><span class=\"std std-ref\">Parent directory</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/include/amdinfer/clients</span></code>)</p><p>Defines the methods for interacting with the server with gRPC.</p>"}
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