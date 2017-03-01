# Select

This utility creates dropdown modules that mimic your `select` inputs.
The nice thing is that unlike your `select` inputs, you can style them!
When you click on the option items of the module, it will change the value of your select tag automatically to match it, so that when you submit your form, everything's just right.

## Documentation
#### To create a new Select, do
```javascript
let select = new Select($el,[class])
```

where `$el` represents the DOM node you want to bind the timer to.
`$el` can be the following:
- A vanilla javascript DOM node
- A jQuery element
- A selector string

and class is an optional custom class you want to use for the dropdown.


It will result in the following markup:
```html
<div class="select">
  <select class="select__old">...</select> // your old select tag
  <div class="select__container">
    <a class="select__active">Pick an option...</a>
    <div class="select__options select__options--hidden" role="listbox">
      <a data-value="value1" class="select__option select__option--selected" role="option">Option 1</a>
      <a data-value="value2" class="select__option" role="option">Option 2</a>
    </div>
  </div>
</div>
```

It does not come with any styles, you have to provide them yourself.  
Please see the above snippet to know which class names to reference in your CSS (if you have provided a custom class in the constructor, it will replace the "select" part of each of those class names).

<br>

### Methods

#### `select.setText(text)`
Changes the active/placeholder text.

<br>