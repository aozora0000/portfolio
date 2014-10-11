do (jQuery) ->
    $ = jQuery
    $.fn.myGithubRepos = (user,config) ->
        defaultConfig =
            element: '#github'
        options = $.extend(defaultConfig, config);
        $.ajax "https://api.github.com/users/#{user}/repos",
            type: 'GET'
            dataType: 'json'
            success: (data, textStatus, jqXHR) ->
                console.log(data)
