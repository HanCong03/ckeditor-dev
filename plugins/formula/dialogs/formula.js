/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

( function() {

    var pluginName = 'formula';

	var formulaDialog = function( editor, dialogType ) {

        var inited = false;

        function insertFormula ( info ) {

            var ele = editor.document.createElement( 'img' );
            ele.setAttribute( 'src', info.img );

            editor.insertElement( ele );

            kfEditor.execCommand( "reset" );

        }

        return {
				title: '公式',
				width: 780,
				height: 500,
                resizable: CKEDITOR.DIALOG_RESIZE_NONE,
				onShow: function() {

                    if ( !inited ) {
                        inited = true;
                        this.getElement().addClass( "kity-formula-dialog" );
                    } else if ( window.kfEditor ) {
//                        window.setTimeout( function () {
//                            kfEditor.execCommand( "focus" );
//                        }, 1000 );
                    }

				},
				onOk: function() {

                    if ( window.kfEditor ) {
                        kfEditor.execCommand( "get.image.data", insertFormula );
                    }

				},
                onCancel: function () {

                    if ( window.kfEditor ) {
                        kfEditor.execCommand( "reset" );
                    }

                },
				contents: [
					{
                        id: 'viewEdit',
                        label: '可视化编辑',
                        accessKey: 'F',
                        elements: [ {
                            type: 'html',
                            html: '<div style="width: 780px; height: 500px;"><iframe style="width: 100%;height: 100%;" frameborder="0" src="../plugins/formula/page/index.html"></iframe></div>'
                        } ]
                    },
					{
                        id: 'latexEdit',
                        label: 'LaTeX编辑',
                        elements: [ {
                            type: 'html',
                            html: '<div id="formula"></div>'
                        } ]
                    }
				]
        };

    };

	CKEDITOR.dialog.add( pluginName, function( editor ) {
		return formulaDialog( editor, pluginName );
	} );

} )();
