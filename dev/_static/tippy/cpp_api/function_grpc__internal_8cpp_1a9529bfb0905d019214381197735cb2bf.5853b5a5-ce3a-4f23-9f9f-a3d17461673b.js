selector_to_html = {"a[href=\"#function-documentation\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Function Documentation<a class=\"headerlink\" href=\"#function-documentation\" title=\"Permalink to this heading\">\u00b6</a></h2>", "a[href=\"file__workspace_amdinfer_src_amdinfer_clients_grpc_internal.cpp.html#file-workspace-amdinfer-src-amdinfer-clients-grpc-internal-cpp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">File grpc_internal.cpp<a class=\"headerlink\" href=\"#file-grpc-internal-cpp\" title=\"Permalink to this heading\">\u00b6</a></h1><p>\u21b0 <a class=\"reference internal\" href=\"dir__workspace_amdinfer_src_amdinfer_clients.html#dir-workspace-amdinfer-src-amdinfer-clients\"><span class=\"std std-ref\">Parent directory</span></a> (<code class=\"docutils literal notranslate\"><span class=\"pre\">/workspace/amdinfer/src/amdinfer/clients</span></code>)</p><p>Implements the internal objects used for gRPC.</p>", "a[href=\"../cpp_user_api.html#_CPPv48amdinfer\"]": "<dt class=\"sig sig-object cpp\" id=\"_CPPv48amdinfer\">\n<span id=\"_CPPv38amdinfer\"></span><span id=\"_CPPv28amdinfer\"></span><span id=\"amdinfer\"></span><span class=\"target\" id=\"namespaceamdinfer\"></span><span class=\"k\"><span class=\"pre\">namespace</span></span><span class=\"w\"> </span><span class=\"sig-name descname\"><span class=\"n\"><span class=\"pre\">amdinfer</span></span></span><br/></dt><dd></dd>", "a[href=\"classamdinfer_1_1ModelMetadata.html#_CPPv4N8amdinfer13ModelMetadataE\"]": "<dt class=\"sig sig-object cpp\" id=\"_CPPv4N8amdinfer13ModelMetadataE\">\n<span id=\"_CPPv3N8amdinfer13ModelMetadataE\"></span><span id=\"_CPPv2N8amdinfer13ModelMetadataE\"></span><span id=\"amdinfer::ModelMetadata\"></span><span class=\"target\" id=\"classamdinfer_1_1ModelMetadata\"></span><span class=\"k\"><span class=\"pre\">class</span></span><span class=\"w\"> </span><span class=\"sig-name descname\"><span class=\"n\"><span class=\"pre\">ModelMetadata</span></span></span><br/></dt><dd><p>This class holds the metadata associated with a model (per the KServe spec). This allows clients to query this information from the server. </p></dd>", "a[href=\"#_CPPv4N8amdinfer23mapModelMetadataToProtoERK13ModelMetadataRN9inference21ModelMetadataResponseE\"]": "<dt class=\"sig sig-object cpp\" id=\"_CPPv4N8amdinfer23mapModelMetadataToProtoERK13ModelMetadataRN9inference21ModelMetadataResponseE\">\n<span id=\"_CPPv3N8amdinfer23mapModelMetadataToProtoERK13ModelMetadataRN9inference21ModelMetadataResponseE\"></span><span id=\"_CPPv2N8amdinfer23mapModelMetadataToProtoERK13ModelMetadataRN9inference21ModelMetadataResponseE\"></span><span id=\"amdinfer::mapModelMetadataToProto__ModelMetadataCR.inference::ModelMetadataResponseR\"></span><span class=\"target\" id=\"grpc__internal_8cpp_1a9529bfb0905d019214381197735cb2bf\"></span><span class=\"kt\"><span class=\"pre\">void</span></span><span class=\"w\"> </span><span class=\"sig-prename descclassname\"><a class=\"reference internal\" href=\"../cpp_user_api.html#_CPPv48amdinfer\" title=\"amdinfer\"><span class=\"n\"><span class=\"pre\">amdinfer</span></span></a><span class=\"p\"><span class=\"pre\">::</span></span></span><span class=\"sig-name descname\"><span class=\"n\"><span class=\"pre\">mapModelMetadataToProto</span></span></span><span class=\"sig-paren\">(</span><span class=\"k\"><span class=\"pre\">const</span></span><span class=\"w\"> </span><a class=\"reference internal\" href=\"classamdinfer_1_1ModelMetadata.html#_CPPv4N8amdinfer13ModelMetadataE\" title=\"amdinfer::ModelMetadata\"><span class=\"n\"><span class=\"pre\">ModelMetadata</span></span></a><span class=\"w\"> </span><span class=\"p\"><span class=\"pre\">&amp;</span></span><span class=\"n sig-param\"><span class=\"pre\">metadata</span></span>, <span class=\"n\"><span class=\"pre\">inference</span></span><span class=\"p\"><span class=\"pre\">::</span></span><span class=\"n\"><span class=\"pre\">ModelMetadataResponse</span></span><span class=\"w\"> </span><span class=\"p\"><span class=\"pre\">&amp;</span></span><span class=\"n sig-param\"><span class=\"pre\">resp</span></span><span class=\"sig-paren\">)</span><br/></dt><dd></dd>", "a[href=\"#function-amdinfer-mapmodelmetadatatoproto\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Function amdinfer::mapModelMetadataToProto<a class=\"headerlink\" href=\"#function-amdinfer-mapmodelmetadatatoproto\" title=\"Permalink to this heading\">\u00b6</a></h1><h2>Function Documentation<a class=\"headerlink\" href=\"#function-documentation\" title=\"Permalink to this heading\">\u00b6</a></h2>"}
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