if (typeof(Vue) != 'undefined') {

    Vue.component('ListView', {
        data: function() {
          return {
              currentIndex: 0,
              valueAttrib: 'key'
          }
        },
        mounted: function(){
            if (typeof this.data != 'undefined' && this.data.length > 0) {
                this.$emit('selectionchange', {key: this.data[this.currentIndex][this.keyAttribute], value: this.data[this.currentIndex][this.valueAttribute]});
            }
        },
        props: ['data', 'keyAttribute', 'valueAttribute'],
        template: '<ul @keydown.prevent.enter="onkeyenter" @keydown.prevent.down="onkeydown" class="list-view" @keydown.prevent.up="onkeyup" tabindex="0">' +
            '<li v-for="(item,index) in data" :class="{active: index == currentIndex}" @click="onClick(index)">{{item[valueAttribute]}}</li>' +
            '</ul>',
        methods: {
            onkeyenter: function() {
                console.log("List View key press down");
                this.$emit('keyenter');
            },
            onkeydown: function() {
                this.currentIndex++
                if (this.currentIndex >= this.data.length) {
                    this.currentIndex = 0;
                }
                this.$emit('selectionchange', {key: this.data[this.currentIndex][this.keyAttribute], value: this.data[this.currentIndex][this.valueAttribute]})
            },
            onkeyup: function() {
                this.currentIndex--;
                if (this.currentIndex < 0 && this.data.length > 0) {
                    this.currentIndex = this.data.length -1;
                }
                this.$emit('selectionchange', {key: this.data[this.currentIndex][this.keyAttribute], value: this.data[this.currentIndex][this.valueAttribute]})
            },
            onClick: function (e) {
                this.currentIndex = e;
                this.$emit('selectionchange', {key: this.data[this.currentIndex][this.keyAttribute], value: this.data[this.currentIndex][this.valueAttribute]})
            }
        }
    })

}