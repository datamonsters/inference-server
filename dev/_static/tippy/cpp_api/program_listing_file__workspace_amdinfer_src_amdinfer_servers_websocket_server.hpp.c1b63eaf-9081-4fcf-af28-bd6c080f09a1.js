selector_to_html = {"a[href=\"#program-listing-for-file-websocket-server-hpp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Program Listing for File websocket_server.hpp<a class=\"headerlink\" href=\"#program-listing-for-file-websocket-server-hpp\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"file__workspace_amdinfer_src_amdinfer_servers_websocket_server.hpp.html#file-workspace-amdinfer-src-amdinfer-servers-websocket-server-hpp\"><span class=\"std std-ref\">Return to documentation for file</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/src/amdinfer/servers/websocket_server.hpp</span></code>)</p>", "a[href=\"file__workspace_amdinfer_src_amdinfer_servers_websocket_server.hpp.html#file-workspace-amdinfer-src-amdinfer-servers-websocket-server-hpp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">File websocket_server.hpp<a class=\"headerlink\" href=\"#file-websocket-server-hpp\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"dir__workspace_amdinfer_src_amdinfer_servers.html#dir-workspace-amdinfer-src-amdinfer-servers\"><span class=\"std std-ref\">Parent directory</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/src/amdinfer/servers</span></code>)</p>"}
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