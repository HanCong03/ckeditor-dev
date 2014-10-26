/**
 * Kity Formula Plugin
 */

( function () {

    var pluginName = 'formula',
        commandName = 'insertformula';

    CKEDITOR.plugins.add( pluginName, {
        icons: 'formula', // %REMOVE_LINE_CORE%
        hidpi: true, // %REMOVE_LINE_CORE%
        init: function( editor ) {

            editor.on( "instanceReady", function ( evt ) {
                // register editor object to document object
                evt.editor.document.$.editor = editor;
                evt.editor.document.$.reopenFormula = function ( source, frameEle ) {
                    window.TMP_KF_SOURCE = source;
                    window.TMP_KF_FRAME = frameEle;
                    editor.openDialog( pluginName );
                };
            } );
            editor.on( "focus", function () {

                if ( !editor.__open_state && !editor.__kf_editor ) {
                    return;
                }

                var value = editor.__kf_editor.execCommand( "get.source" );

                if ( !!value.trim() ) {
                    editor.__kf_editor.okFn();
                    editor.focus();
                }

            } );

            // Register the command.
            editor.addCommand( commandName, new CKEDITOR.command( editor, {
                exec: function( editor ) {

                    var src = '../plugins/formula/page/index.html';

                    if ( editor.__kf_cache ) {
                        src += '#source=' + encodeURIComponent( editor.__kf_cache.source );
                    }

                    if ( !editor.__kfEditorFrame ) {
                        editor.container.setStyles( {
                            'line-height': 0,
                            'font-size': 0
                        } );
                        var doc = new CKEDITOR.dom.document( document ),
                            frame = doc.createElement( 'iframe', {
                                attributes: {
                                    width: editor.container.getSize( 'width' ) - 2,
                                    height: 550,
                                    frameborder: 0
                                },
                                styles: {
                                    display: 'none'
                                }
                            } );
                        editor.container.getChild(0).insertBeforeMe( frame );
                        editor.__kfEditorFrame = frame;
                    }

                    if ( editor.__kf_cache || editor.__kfEditorFrame.getComputedStyle( 'display' ) === 'none' ) {
                        if ( src.indexOf( '#' ) !== -1 ) {
                            src += '&';
                        } else{
                            src += '#';
                        }

                        src += 'id=' + currentId + '&time=' + (+new Date());
                        editor.__kfEditorFrame.setAttribute( "src", src );
                        editor.__kfEditorFrame.show();
                        editor.__open_state = true;
                    } else {
                        editor.__open_state = false;
                        editor.__kfEditorFrame.hide();
                    }

                }

            } ) );

            var currentId = Math.floor( Math.random() * 100 ) + "" + ( + new Date() );

            if ( !window.__ckEditor_poll ) {
                window.__ckEditor_poll = {};
            }

            window.__ckEditor_poll[ currentId ] = editor;

            editor.once( "instanceReady", function () {
                editor.document.$.__ckEditor = editor;
            } );

            editor.clear = function () {
                editor.__kf_cache = null;
            };

            editor.__kf_notify_size = function ( height ) {
                editor.__kfEditorFrame.setStyle( 'height', parseInt( editor.__kfEditorFrame.getComputedStyle( 'height' ), 10 ) + height + 'px' );
            };

            editor.reopenFormula = function ( source, targetFrame ) {
                editor.__kf_cache = {
                    source: source,
                    target: targetFrame
                };
                editor.execCommand( 'insertformula' );
            };

            editor.__kf_close = function () {
                editor.__kfEditorFrame.hide();
                editor.__open_state = false;
            };

            // Register the toolbar button.
            editor.ui.addButton && editor.ui.addButton( 'Formula', {
                label: '公式',
                command: commandName,
                toolbar: 'insert'
            } );

        }
    } );

} )();
