<?php
/** Branded WordPress editor experience. */
if ( ! defined( 'ABSPATH' ) ) { exit; }
function ip_editor_styles(): void { add_editor_style( 'assets/css/editor.css' ); }
add_action( 'after_setup_theme', 'ip_editor_styles', 20 );
