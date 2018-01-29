Vue.config.devtools = true;

Vue.options.delimiters = ['{%', '%}'];


var data_page = new Vue({
    el: '#data_page',
    data: {
        initialized: false,
        filters_headers: [],
        filters: [],
        filters_inputs: [],
        bases: {},
        toggle_states: []
    },
    mounted: function(){
        this.get_concepts();
        this.get_base();
    },
    updated: function(){
        if (!this.$data.initialized) {
            $.material.init();
            this.$data.initialized = true;
        }
    },
    methods: {
        get_concepts: function(){
            var self = this;
            axios.post(BASE + 'shopper_profiles/get_filters')

                .then(function(response) {
                    self.$data.filters_headers = response.data.filters_headers;
                    self.$data.filters = response.data.filters;

                    _.map(response.data.filters_headers, function(e){
                        self.$set(self.$data.toggle_states, e.filter_group, true);
                    });

                    _.map(response.data.filters, function(e){
                        self.$set(self.$data.filters_inputs, e.id, true);
                    });

                });
        },
        run: function(){
            var self = this;
            window.location.href = BASE + 'shopper_profiles/explore_across?f=';
        },
        toggle_check: function(gid){
            var self = this;
            var filters = self.$data.filters;

            self.$set(self.$data.toggle_states, gid, !self.$data.toggle_states[gid]);

            var group_data = _.filter(self.$data.filters, {'filter_group': gid});
            _.map(group_data, function(e){
                self.$set(self.filters_inputs, e.id, self.$data.toggle_states[gid]);
            });
            self.get_base();
        },
        input_change: function(gid){
            var self = this;
            self.check_group(gid);
            self.get_base();
        },
        get_base: function(){
            var self = this;
            axios.post(BASE + 'shopper_profiles/get_base', self.$data)
                .then(function(response) {
                    _.each(response.data, function(value, key){
                        self.$set(self.bases, key, value);
                    });
                });
        },
        check_group: function(gid){
            var self = this;
            var filters = self.$data.filters;
            var checkboxes = self.$data.filters_inputs;

            var group_data = _.filter(self.$data.filters, {'filter_group': gid});
            var data = _.map(group_data, function(e) {return checkboxes[e.id];});
            var true_data = _.filter(data, function(e) {if (e) return e;}).length;

            self.$set(self.$data.toggle_states, gid, true_data > 0);
        },

        ready: function() {
        }
    }
});
