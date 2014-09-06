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

            editor.on( "instanceReady", function ( evt ) {
                // register editor object to document object
                evt.editor.document.$.editor = editor;
                evt.editor.document.$.reopenFormula = function ( source, frameEle ) {
                    window.TMP_KF_SOURCE = source;
                    window.TMP_KF_FRAME = frameEle;
                    editor.openDialog( pluginName );
                };
            } );

            // Abort when Image2 is to be loaded since both plugins
            // share the same button, command, etc. names (#11222).
            // Register the dialog.
            CKEDITOR.dialog.add( pluginName, this.path + 'dialogs/formula.js' );

            // Register the command.
            editor.addCommand( commandName, new CKEDITOR.dialogCommand( pluginName ) );

            // Register the toolbar button.
            editor.ui.addButton && editor.ui.addButton( 'Formula', {
                label: '公式',
                command: commandName,
                toolbar: 'insert'
            } );

        }
    } );

} )();
