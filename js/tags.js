var tags = (function () {
    var item_selector = ".portfolio .itembox";
    var animation_length = 200;

    function clean_visible_items(){
        var tag_selector = ""
        $(".tagmenuitem.locked").each(function(){
            tag_selector += ":contains(" + $(this).text() + ")"
        });
        tag_selector = ":has(.tags" + tag_selector + ")"
        
        //make the unwanted ones disappear
        var unwanted = $(item_selector).not(tag_selector);
        $(unwanted).each(function(){
            $(this).addClass("highlight")
                    .slideUp(animation_length)
                    .removeClass("highlight");
        });

        //restore any wanted ones
        $(item_selector+tag_selector+':hidden').slideDown(animation_length);
    }

    function projects_with_tags(tag_div){
        return $(item_selector
                +":has(.tags:contains("
                +tag_div.text()
                +"))");
    }
    
    function tag_spans(tag_div){
        return $(".tags span:contains("
                +tag_div.text()
                +")");
    }
    
    function highlight_tag(tag_div){
        projects_with_tags(tag_div).addClass("highlight");
        tag_spans(tag_div).addClass("highlight");
    }
    
    function unhighlight_tag(tag_div){
        projects_with_tags(tag_div).removeClass("highlight");
        tag_spans(tag_div).removeClass("highlight");
    }

    function toggle_tag_locked(tag_div){
        tag_div = $(tag_div);
        if(tag_div.hasClass("locked")){
            tag_div.removeClass("locked");
        }
        else{
            tag_div.addClass("locked");
        }
        clean_visible_items();
    }

    function hide_unlocked_tags(){
        disable_tag($(".tagmenuitem:not(.special):not(.locked)"));
    }
    
    function generate_tag_menu(){
        //collect all of the tags
        var seen = {};
        var tags = [];
        var i = 0;
        $(".tags>span").each(function(){
            var txt = $(this).html();
            if (!seen[txt]){//ignore any duplicates
                tags[i] = txt;
                i++;
                seen[txt] = true;
            }
        }); 
        
        tags.sort();
        
        $(tags).each(function(index,value){
        //add each tag to the menu
            $("#autotags").append(//they float right, so prepending ends up in the right order
                $('<div class="tagmenuitem enabled"/>').text(value)
                );
        });
        
        $("#tagchooser").css("visibility","visible");
    }
    
    function init(){
        generate_tag_menu();
        
        //if you click a tag menu item, visibility updates
        $(".tagmenuitem").mouseenter(function(){
            this_jq = $(this);
            highlight_tag(this_jq);
        }).mouseleave(function(){
            this_jq = $(this);
            if (!this_jq.hasClass("locked")){
                unhighlight_tag(this_jq);
            }
        }).click(function(){
            this_jq = $(this);
            toggle_tag_locked(this_jq);
        });
        /*.click(function(){
            this_jq = $(this)
            if(this_jq.hasClass("special")){
                if (this_jq.hasClass("showall")){
                    $(".tagmenuitem:not(.special)").each(function(){
                        enable_tag($(this));
                        this_jq.addClass("locked");
                    });
                }
            };
            
            toggle_tag_locked(this_jq);
            hide_unlocked_tags();
            clean_visible_items();
        })*/
    }
    
	var this_module = {};

	this_module.init = init

	return this_module;
}());
