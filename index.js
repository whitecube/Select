export default class Select {
	constructor($el, parentClass = false) {
		this.isMultiple = false
		this.setConf(parentClass)
		this.setElement($el)
		this.setEvents()
		this.generateMarkup()
	}

	setConf(parentClass) {
		let classname = parentClass || 'select'
		this.conf = {
			main: classname,
			old: classname + '__old',
			container: classname + '__container',
			active: classname + '__active',
			dropdown: classname + '__dropdown',
			options: classname + '__options',
			optionsHidden: classname + '__options--hidden',
			option: classname + '__option',
			selected: classname + '__option--selected'
		}
	}

    setElement($el) {
        if(typeof $el == 'string') return this.$el = document.querySelector($el)
        if($el.jquery) return this.$el = $el.get()[0]
        if($el[0]) return this.$el = $el[0]
        return this.$el = $el
    }

    setEvents() {
    	document.addEventListener('click', (e) => {
    		if(!this.$optionsContainer.contains(e.target) && !this.$active.contains(e.target)) {
    			this.e_hideDropdown()
    		} 
		})
    }

    generateMarkup() {
    	// Container that holds everything
    	let mainContainer = document.createElement('div')
    	mainContainer.classList.add(this.conf.main)

    	// Old select tag we want to replace
    	this.$el.parentNode.replaceChild(mainContainer, this.$el)
    	this.$el.classList.add(this.conf.old)
    	mainContainer.appendChild(this.$el)

    	// New markup to replace the select tag
    	let newContainer = document.createElement('div')
    	newContainer.classList.add(this.conf.container)
    	mainContainer.appendChild(newContainer)

    	// Active option
    	this.$active = document.createElement('a')
    	this.$active.classList.add(this.conf.active)
    	this.$active.innerHTML = (this.getSelectedOption()).innerHTML
    	this.$active.addEventListener('click', (e) => this.e_toggleDropdown(e))
    	newContainer.appendChild(this.$active)
    	
    	// Container for option items
    	this.$optionsContainer = document.createElement('div')
    	this.$optionsContainer.classList.add(this.conf.options)
    	this.$optionsContainer.classList.add(this.conf.optionsHidden)
    	this.$optionsContainer.setAttribute('role', 'listbox')
    	newContainer.appendChild(this.$optionsContainer)


    	// Option items
    	for(var i = 0; i < this.$el.children.length; i++) {
    		this.$optionsContainer.appendChild(this.generateOption(this.$el.children[i]))
    	}
    }

    setText(text) {
    	this.$active.innerHTML = text
    }

    e_toggleDropdown(e) {
    	if(e) e.preventDefault()
    	this.$optionsContainer.classList.toggle(this.conf.optionsHidden)
    }

    e_hideDropdown() {
    	this.$optionsContainer.classList.add(this.conf.optionsHidden)
    }

    getSelectedOption() {
    	return this.$el.children[this.$el.selectedIndex]
    }

    e_select(e) {
    	if(!this.isMultiple) this.deselectAll()
    	e.target.classList.add(this.conf.selected)
    	this.$el.value = e.target.dataset.value
    	this.$el.dispatchEvent(new Event('change'))
    	this.setText(e.target.innerHTML)
    	this.e_hideDropdown(e)
    }

    generateOption(el) {
    	let $new = document.createElement('a')
    	$new.classList.add(this.conf.option)
    	if(this.$el.value == el.value) $new.classList.add(this.conf.selected)
    	$new.innerHTML = el.innerHTML
    	$new.dataset.value = el.value
    	$new.setAttribute('role', 'option')
    	$new.addEventListener('click', (e) => this.e_select(e), false)
    	return $new
    }

    findOptionByValue(value) {
    	let options = this.$el.children
    	for(var i = 0; i < options.length; i++) {
    		if(options[i].value == value) {
    			return options[i]
    		}
    	}
    }

    deselectAll() {
    	for(var i = 0; i < this.$el.children.length; i++) {
    		this.$el.children[i].selected = false
    		this.$optionsContainer.children[i].classList.remove(this.conf.selected)
    	}
    }
}