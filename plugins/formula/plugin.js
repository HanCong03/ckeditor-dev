/**
 * Kity Formula Plugin
 */

( function () {

    var pluginName = 'formula',
        commandName = 'insertformula';

    CKEDITOR.plugins.add( pluginName, {
        requires: 'dialog',
        icons: 'formula', // %REMOVE_LINE_CORE%
        hidpi: true, // %REMOVE_LINE_CORE%
        init: function( editor ) {
            // Abort when Image2 is to be loaded since both plugins
            // share the same button, command, etc. names (#11222).
            // Register the dialog.
            CKEDITOR.dialog.add( pluginName, this.path + 'dialogs/formula.js' );
//
//            var allowed = 'img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}',
//                required = 'img[alt,src]';
//
//            if ( CKEDITOR.dialog.isTabEnabled( editor, pluginName, 'advanced' ) )
//                allowed = 'img[alt,dir,id,lang,longdesc,!src,title]{*}(*)';

            // Register the command.
            editor.addCommand( commandName, new CKEDITOR.dialogCommand( pluginName ) );

            // Register the toolbar button.
            editor.ui.addButton && editor.ui.addButton( 'Formula', {
                label: '公式',
                command: commandName,
                toolbar: 'insert'
            } );

//            editor.on( 'doubleclick', function( evt ) {
//                var element = evt.data.element;
//
//                if ( element.is( 'img' ) && !element.data( 'cke-realelement' ) && !element.isReadOnly() )
//                    evt.data.dialog = 'image';
//            } );
//
//            // If the "menu" plugin is loaded, register the menu items.
//            if ( editor.addMenuItems ) {
//                editor.addMenuItems( {
//                    image: {
//                        label: editor.lang.image.menu,
//                        command: 'image',
//                        group: 'image'
//                    }
//                } );
//            }

            // If the "contextmenu" plugin is loaded, register the listeners.
//            if ( editor.contextMenu ) {
//                editor.contextMenu.addListener( function( element, selection ) {
//                    if ( getSelectedImage( editor, element ) )
//                        return { image: CKEDITOR.TRISTATE_OFF };
//                } );
//            }
        }
    } );

} )();
