const getTemplate = (data = [], placeholder) => {
   const text = placeholder ?? 'Default placeholder'

   const items = data.map(item => {
      return `
         <li class="select__item" data-type="item" data-id="${item.id}">${item.value}</li>
      `
   })

   return `
   <div class="select__input" data-type="input">
      <span class="select__text" data-type="value">${text}</span>
      <div class="select__icon">
         <?xml version="1.0" encoding="iso-8859-1"?>
         <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
         <svg version="1.1" id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px" y="0px"
            viewBox="0 0 240.811 240.811"
            style="enable-background:new 0 0 240.811 240.811;"
            xml:space="preserve">
            <g>
               <path id="Expand_More"
                  d="M220.088,57.667l-99.671,99.695L20.746,57.655c-4.752-4.752-12.439-4.752-17.191,0
                  		c-4.74,4.752-4.74,12.451,0,17.203l108.261,108.297l0,0l0,0c4.74,4.752,12.439,4.752,17.179,0L237.256,74.859
                  		c4.74-4.752,4.74-12.463,0-17.215C232.528,52.915,224.828,52.915,220.088,57.667z" />
            </g>

         </svg>
      </div>
      </div>
      <div class="select__dropdown">
         <ul class="select__list">
         ${items.join('')}
         </ul>
      </div>
   `
}

class Select {
   constructor(selector, options) {
      this.$el = document.querySelector(selector)
      this.options = options
      this.selectedId = null

      this.#render()
      this.#setup()
   }

   #render() {
      const { placeholder, data } = this.options
      this.$el.classList.add('select')
      this.$el.innerHTML = getTemplate(data, placeholder)
   }

   #setup() {
      this.clickHandler = this.clickHandler.bind(this)
      this.$el.addEventListener('click', this.clickHandler)
      this.$value = this.$el.querySelector('[data-type="value"]')
   }

   get isOpen() {
      return this.$el.classList.contains('open')
   }

   toggle() {
      this.isOpen ? this.close() : this.open()
   }

   clickHandler(event) {
      const { type } = event.target.dataset
      if (type === 'input') {
         this.toggle()
      } else if (type === 'item') {
         const id = event.target.dataset.id
         this.select(id)
      }
   }

   get current() {
      return this.options.data.find(item => item.id === this.selectedId)
   }

   select(id) {
      this.selectedId = id
      this.$value.textContent = this.current.value
      this.close()
   }


   open() {
      this.$el.classList.add('open')
   }

   close() {
      this.$el.classList.remove('open')
   }

}


