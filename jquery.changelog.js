/*
 * jquery.changelog.js
 * https://github.com/mukeshyadav/changelog-form
 
 * required jQuery version 1.9.1 and above
 * Tested on Chrome 26.0.1410.64, IE8, Firefox 20.0.1

 * @author Mukesh Yadav, mukeshyadav@gmail.com  
 
 * Copyright 2013, Mukesh Yadav
 * Released under the MIT license
*/

;( function ( $, window, document, undefined ) {
    "use strict";
    
    var pluginName = "changelog",
    defaults = {
        changeClass: "change", 
        initialClass: "initial",
        highlighter: "highlighter",
        overlay: "overlay",
        elmTag: "li"
    };

    function Changelog ( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
        this.attachEvents();
    };
    
    Changelog.prototype.init = function () {
        this.getInitialValue(); 
    };
    
    Changelog.prototype.getInitialValue = function () {     
        var that = this,
        elm = $( this.element );
        
        elm.find('input[type=text]').each( function(){
            that.setInitialValue( $(this).val(), this );
        });
        
        elm.find('select').each( function(){
            if ( $(this).find( 'option:selected' )) {
                that.setInitialValue( $(this).val(), this );    
            }           
        }); 
        
        elm.find('input:checkbox:checked, input:radio:checked').each(function(){                                
            $(this).attr('data-check','initial');           
        });         
    };  
    
    Changelog.prototype.setInitialValue = function ( setValue, elem ) {     
        $(elem).attr( 'data-initial', setValue );
    };

    Changelog.prototype.attachEvents = function(){
        var that = this,
        elm = $( this.element ),
        inputRadio = $('input:radio');

        elm.find('input[type=text]').on( 'blur', function(){
            that.inputValue( this );
        });

        elm.find('select').on( 'change', function(){
            that.inputValue( this );
        });

        elm.find('input:checkbox').on( 'change', function(){            
            $(this).toggleClass( that.options.changeClass );
            $(this).parents( that.options.elmTag ).toggleClass( that.options.highlighter )
        });
        
        elm.find('input:radio').on( 'change', function() {
            that.radioValue( this );
        });
        
        elm.submit( function( e ){
            if( elm.find(':input.change').length !== 0 ) {
                that.changesDone();
                return false;
            } else {
                return true;
            }
        });     
    };

    Changelog.prototype.inputValue = function ( elem ) {
        var that = this,
        currVal = $(elem).val(),
        initialVal = $(elem).data('initial');
        currVal !== initialVal ? 
        $(elem).addClass( that.options.changeClass ).parents( that.options.elmTag ).addClass( that.options.highlighter ) : 
        $(elem).removeClass( that.options.changeClass ).parents( that.options.elmTag ).removeClass( that.options.highlighter );     
    };
    
    Changelog.prototype.radioValue = function ( elem ) {
        var that = this,
        getName = $(elem).attr('name');     
        if ( ( $(elem).data('check') !== undefined ) && $(elem).is(':checked') ){
            $(that.element).find('input:radio[name="'+ getName +'"]').removeClass( that.options.changeClass )
            .parents( that.options.elmTag ).removeClass( that.options.highlighter );
        } else {
            $(elem).addClass( that.options.changeClass )
            .parents( that.options.elmTag ).addClass( that.options.highlighter )    
        }
    }; 
    
    Changelog.prototype.changesDone = function () {
        var that = this,
        changes = "<li>Following Fields has been changed</li>";
        $(this.element).find(":input.change").each(function(){          
            changes += "<li>" + $(this).parent().find('label').attr('for') + " : " + $(this).val() + "</li>";           
        });
        var ul = $('<ul />').append(changes);
        that.overlay();
        $('.'+this.options.overlay).find('.o-content').append( ul );
        that.closeOverlay();
        that.submitForm();
    };
    
    Changelog.prototype.overlay = function () {
        var div = $('<div />').appendTo('body');
        div.append('<div class="o-content"><a href="#submit" class="o-submit">Submit Form</a><a href="#close" class="o-close">close</a></div>');
        div.attr({
            'class': this.options.overlay
        });
        return false;
    };

    Changelog.prototype.closeOverlay = function () {
        var that = this;
        $('.' + this.options.overlay ).on( 'click', '.o-close', function( e ){
            e.preventDefault();
            $("." + that.options.overlay ).fadeOut(500);
        });
    };

    Changelog.prototype.submitForm = function () {
        var that = this;
        $('.' + this.options.overlay ).on( 'click', '.o-submit', function( e ){
            e.preventDefault();
            that.element.submit();
            return true;
        });
    };

    $.fn[pluginName] = function ( options ) {
        return this.each( function () {
            if ( !$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Changelog( this, options ));
            }   
        });
    };
})(jQuery);
