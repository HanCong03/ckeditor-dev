/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

( function() {

    var pluginName = 'formula';

	var formulaDialog = function( editor, uniqueId ) {

        var inited = false,
            formulaEditor = null,
            dialog = this;

        function insertFormula ( dialog, source ) {

            var ele = null;

            if ( window.TMP_KF_SOURCE ) {
                ele = window.TMP_KF_FRAME;
                ele.setAttribute( "data-source", source );
                ele.setAttribute( "src", getMathjaxPath( dialog, source ) );
            } else {
                ele = editor.document.createElement( 'iframe' );
                ele.addClass( "kf-formula-expression" );
                ele.setAttribute( "contenteditable", "false" );
                ele.setAttribute( "frameborder", "0" );
                ele.setAttribute( "style", "vertical-align: middle; width: 100px; height: 18px;" );
                ele.setAttribute( "data-source", source );
                window.TMP_KF_SOURCE = source;
                ele.setAttribute( "src", getMathjaxPath( dialog, source ) );
                editor.insertHtml( ele.$.outerHTML, "unfiltered_html" );
            }

        }

        // return Mathjax page URL
        function getMathjaxPath ( dialog, source ) {

            var url = dialog.getElement().find("iframe").getItem(0).$.src;

            url = url.split( "#" )[0];
            url = url.split( "?" )[0];
            url = url.split( "/" );

            url.length -= 1;

            return encodeURI( url.join( "/" ) + "/mathjax.html?" + source );

        }

        return {
				title: '公式',
				width: 780,
				height: 500,
                resizable: CKEDITOR.DIALOG_RESIZE_NONE,
				onShow: function() {

                    var dialog = this;

                    if ( !top.KF_EDITOR ) {
                        top.KF_EDITOR = [];
                    }

                    if ( !inited ) {
                        inited = true;
                        // 注册引用, 获取ckeditor
                        top.KF_EDITOR[ uniqueId ] = {
                            setFormulaEditor: function ( editor ) {
                                formulaEditor = editor;
                                editor.execCommand( "resize.notify", function ( val ) {

                                    if ( !editor._ck_lastHeight ) {
                                        editor._ck_lastHeight = 500;
                                    }

                                    editor._ck_lastHeight += val;

                                    dialog.resize( 780, editor._ck_lastHeight );

                                    dialog.getElement().findOne( ".kf-ck-container" ).setSize( 'height', editor._ck_lastHeight );

                                } );
                            }
                        };

                        this.getElement().addClass( "kity-formula-dialog" );

                    } else {

                        if ( !formulaEditor ) {
                            return ;
                        }

                        if ( window.TMP_KF_SOURCE ) {
                            formulaEditor.execCommand( "render", window.TMP_KF_SOURCE );
                            window.tt = formulaEditor;
                        }

                        window.setTimeout( function () {
                            formulaEditor.execCommand( "focus" );
                        }, 0 );

                    }

				},
				onOk: function() {

                    if ( formulaEditor ) {
                        insertFormula( this, formulaEditor.execCommand( "get.source" ) );
                        formulaEditor.execCommand( "reset" );
                    }

				},
                onHide: function () {
                    window.TMP_KF_SOURCE = null;
                    window.TMP_KF_FRAME = null;
                    if ( formulaEditor ) {
                        formulaEditor.execCommand( "reset" );
                    }
                },
				contents: [
					{
                        id: 'viewEdit',
                        label: '可视化编辑',
                        accessKey: 'F',
                        elements: [ {
                            type: 'html',
                            html: '<div class="kf-ck-container" style="width: 780px; height: 500px;"><iframe style="width: 100%;height: 100%;" frameborder="0" src="' + getHTML( '../plugins/formula/page/index.html', uniqueId ) +'"></iframe></div>'
                        } ]
                    }
				]
        };

    };

    function getHTML ( url, uniqueId ) {

        return url + ( window.TMP_KF_SOURCE ? '?' + encodeURI( window.TMP_KF_SOURCE ) : '' ) +'#'+ uniqueId;

    }


	CKEDITOR.dialog.add( pluginName, function( editor ) {
		return formulaDialog( editor, (+new Date() + "" + Math.random()).replace( ".", "" ) );
	} );

} )();
