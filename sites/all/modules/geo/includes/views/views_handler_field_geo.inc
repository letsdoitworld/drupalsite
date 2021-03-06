<?php //$Id: views_handler_field_geo.inc,v 1.10 2010/04/26 05:40:43 vauxia Exp $

class views_handler_field_geo extends views_handler_field {

  function init(&$view, $options) {
    parent::init($view, $options);
    $this->geo = geo_load(array('gid' => $this->definition['geo_gid']));
  }

  function options_definition() {
    $options = parent::option_definition();
    $options['function'] = array('default' => 'AsText');
    $options['target'] = array(
      'value' => array('default' => array()),
    );
    $options['input'] = array('default' => '');
    $options['simplify'] = array('default' => '0');
    return $options;
  }

  function options_form(&$form, &$form_state) {
    // Call my parent's options_form method.
    parent::options_form($form, $form_state);

    // Use the geo_views helper function to display the target settings.
    geo_views_target_form($form, $form_state, $this, 'display');

    // Add a "simplify" option, which will reduce the number of data points.
    $form['simplify'] = array(
      '#type' => 'checkbox',
      '#title' => t('Simplify results'),
      '#default_value' => $this->options['simplify'],
    );
  }

  function query() {

    // The GIS Function we'll be using to query the database.
    $function = $this->options['function'];
    if (!$function) return;

    // Figure out whether or not we need a target value to compare against.
    if (FALSE === ($target = geo_views_set_target($this, $this->value))) {
      // Return if target = FALSE to prevent an erroneous query.
      return;
    }

    $this->geo->setTableName($this->ensure_my_table(), TRUE);
    $this->geo->setColumnName($this->real_field);

    $alias = $this->real_field .'_'. strtolower($function);

    // Add the field, using the Geo API method for getting it.
    $field = $this->geo->$function($this->geo, $target);
    $this->field_alias = $this->query->add_field(NULL, $field, $alias);
  }
}
