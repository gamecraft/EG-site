(function(){
	var extractValue = function(key, root) {
		if(key.indexOf(".") == -1)
			return root[key];
		else {
			var firstElem = key.split(".").shift();
			return extractValue(firstElem,root[firstElem]);
		}
	};

    var parseTpl = function(tmpl, variables) {
		for (var key in variables) {
			if(tmpl.indexOf('{'+key+'}')>-1){
				tmpl=tmpl.replace(new RegExp('{'+key+'}','g'), extractValue(key,variables));
			}
		}
		return tmpl;
	}

    global.view = function(tmplPath) {
        return {
            loadView: function(callback) {
                $.get(tmplPath,function(tmplData){
                    var view = { 
                        render: function(data, target, before) {
                            var view = $(parseTpl(tmplData, data));
                            if(before)
                                before(view);
                            return $(target).html(view);
                        },
                        append: function(data, target, before) {
                            var view = $(parseTpl(tmplData, data));
                            if(before)
                                before(view);
                            return $(target).append(view);
                        }
                    };

                    callback(view);
                });
            },
            append: function(data, target, before, after) {
                this.loadView(function(view){
                    var dom = view.append(data, target, before);
                    if(after)
                        after(dom);
                });
            },
            render: function(data, target, before, after) {
                this.loadView(function(view){
                    var dom = view.render(data, target, before);
                    if(after)
                        after(dom);
                });
            }
        }
    };
})();
