/**
 * String templates: the Mustache template content. e.g hello.html
 * Map model: the model in controller
 * String url: the templates url (since 4.2.2)
 */
function render(template, model, url) {
    return Mustache.render(template, toJsonObject(model));
}

// Some Java objects may not support in JS directly, need conversion.
function toJsonObject(model) {
    var o = {};
    for (var k in model) {

        //Convert Object String to Javascript JSON
        if (k.indexOf("_json") > -1) {
            o[k] = JSON.parse(model[k]);
            continue;
        }

        // Convert Iterable like List to real JSON array
        if (model[k] instanceof Java.type("java.lang.Iterable")) {
            o[k] = Java.from(model[k]);
        }
        else {
            o[k] = model[k];
        }
    }
    return o;
}