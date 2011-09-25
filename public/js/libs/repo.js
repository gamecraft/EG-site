(function(){
    global.repo = function(repoName) {
        return {
            get: function(url, params, callback) {
                var query = "";
                if(params != null && params.length != 0)
                    query = "?"+params.join("&");

                $.ajax({
                    type: "GET",
                    url: global.repo.endpoint+"/"+repoName+url+query,
                    dataType: "json",
                    error: function(ajax, statusCode, errorMsg){
                        callback(new Error(errorMsg+" [code]:"+statusCode));
                    },
                    success: function(data) {
                        callback(null, data);
                    }
                 });
            },
            list: function(pattern, limit, skip, callback) {
                var params = [];

                if(limit != null)
                    params.push("limit="+limit);
                if(skip != null)
                    params.push("skip="+skip);
                
                if(typeof pattern == "object") {
                    url = "";
                    params.push("spec="+encodeURIComponent(JSON.stringify(pattern)));
                }
                else
                if(typeof pattern == "string")
                    url = "/"+pattern;
                    
                this.get(url, params, callback);
            },
            create: function(data, callback) {
                var url = global.repo.endpoint+"/"+repoName;
                $.ajax({
                    type: "POST",
                    url: url,
                    dataType: "json",
                    data: JSON.stringify(data),
                    error: function(ajax, statusCode, errorMsg){
                        callback(new Error(errorMsg+" [code]:"+statusCode));
                    },
                    success: function(data) {
                        callback(null, data);
                    }
                 });
            },
            update: function(pattern, data, limit, skip, callback) {
                var params = [];
                var url = null;
                if(typeof pattern == "object") {
                    url = global.repo.endpoint+"/"+repoName;
                    params.push("spec="+encodeURIComponent(JSON.stringify(pattern)));
                }
                else
                if(typeof pattern == "string")
                    url = global.repo.endpoint+"/"+repoName+"/"+pattern;

                if(limit != null)
                    params.push("limit="+limit);
                if(skip != null)
                    params.push("skip="+skip);
                if(params.length)
                    url += "?"+params.join("&");

                $.ajax({
                    type: "PUT",
                    url: url,
                    dataType: "json",
                    data: JSON.stringify(data),
                    error: function(ajax, statusCode, errorMsg){
                        callback(new Error(errorMsg+" [code]:"+statusCode));
                    },
                    success: function(data) {
                        callback(null, data);
                    }
                 });
            },
            remove: function(pattern, limit, skip, callback) {
                var params = [];
                var url = null;
                if(typeof pattern == "object") {
                    url = global.repo.endpoint+"/"+repoName;
                    params.push("spec="+encodeURIComponent(JSON.stringify(pattern)));
                }
                else
                if(typeof pattern == "string")
                    url = global.repo.endpoint+"/"+repoName+"/"+pattern;

                if(limit != null)
                    params.push("limit="+limit);
                if(skip != null)
                    params.push("skip="+skip);
                if(params.length)
                    url += "?"+params.join("&");

                $.ajax({
                    type: "DELETE",
                    url: url,
                    dataType: "json",
                    error: function(ajax, statusCode, errorMsg){
                        callback(new Error(errorMsg+" [code]:"+statusCode));
                    },
                    success: function(data) {
                        callback(null, data);
                    }
                 });
            }
        }
    };
    global.repo.endpoint = "";
})();
